# SolveSheet — Setup & Launch Guide

This document walks you through every step to get SolveSheet live and taking payments.
Follow in order. Each step takes 5–15 minutes.

---

## What You're Setting Up

```
SolveSheet (your HTML/JS)
       ↓
Firebase Auth        ← handles login / signup
Firestore Database   ← stores who has paid
       ↓
Stripe               ← handles payments
       ↓
Netlify              ← hosts the site + runs payment webhook
```

---

## STEP 1 — Create a Firebase Project (10 min)

1. Go to https://console.firebase.google.com
2. Click **"Add project"** → name it `solvesheet` → click through setup
3. Once created, click the **</>** icon (Web App) to register a web app
4. Name it `solvesheet-web` → click Register
5. You'll see a `firebaseConfig` object. **Copy these values** into `public/index.html`:

```javascript
const firebaseConfig = {
  apiKey:            "copy from Firebase",
  authDomain:        "copy from Firebase",
  projectId:         "copy from Firebase",
  storageBucket:     "copy from Firebase",
  messagingSenderId: "copy from Firebase",
  appId:             "copy from Firebase"
};
```

### Enable Email/Password Auth
1. In Firebase Console → **Authentication** → **Sign-in method**
2. Click **Email/Password** → Enable → Save

### Create Firestore Database
1. In Firebase Console → **Firestore Database** → **Create database**
2. Choose **Start in production mode** → pick a region close to you → Done
3. Go to **Rules** tab and paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
4. Click **Publish**

### Add Your Admin Email
In `public/index.html`, find this line and replace with your email:
```javascript
const ADMIN_EMAILS = [
  "YOUR_EMAIL@gmail.com",  // ← your email goes here
];
```

---

## STEP 2 — Create a Stripe Account (15 min)

1. Go to https://stripe.com → Create account
2. Complete verification (you'll need your bank info for payouts)

### Create Products in Stripe
1. In Stripe Dashboard → **Products** → **Add product**
2. **Product 1 — Monthly:**
   - Name: `SolveSheet Monthly`
   - Price: `$4.99` → Recurring → Monthly
   - Save. Copy the **Price ID** (starts with `price_`)

3. **Product 2 — Semester:**
   - Name: `SolveSheet Semester`
   - Price: `$12.99` → One time
   - Save. Copy the **Price ID**

### Add Price IDs to index.html
```javascript
const STRIPE_PRICES = {
  monthly:  "price_PASTE_HERE",   // from step above
  semester: "price_PASTE_HERE",   // from step above
};
```

### Get Your Publishable Key
- Stripe Dashboard → **Developers** → **API Keys**
- Copy **Publishable key** (starts with `pk_`)
```javascript
const STRIPE_PUBLISHABLE_KEY = "pk_live_PASTE_HERE";
```

---

## STEP 3 — Set Up Netlify (15 min)

1. Go to https://github.com → Create a new repository called `solvesheet`
2. Push this entire project folder to that repo:
```bash
cd /path/to/solvesheet
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/solvesheet.git
git push -u origin main
```

3. Go to https://app.netlify.com → **Add new site** → **Import from Git**
4. Connect to GitHub → Select your `solvesheet` repo
5. Build settings:
   - Build command: *(leave blank)*
   - Publish directory: `public`
6. Click **Deploy site**

### Install Node Dependencies for Functions
In your local project folder:
```bash
npm install
```
Then push the `node_modules` folder (or Netlify will install automatically).

---

## STEP 4 — Set Environment Variables in Netlify (10 min)

In Netlify → Your site → **Site settings** → **Environment variables** → **Add variable**

Add each of these:

| Variable | Value | Where to get it |
|---|---|---|
| `STRIPE_SECRET_KEY` | `sk_live_...` | Stripe → Developers → API Keys |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Set up in Step 5 below |
| `FIREBASE_PROJECT_ID` | `your-project-id` | Firebase Console → Project Settings |
| `FIREBASE_CLIENT_EMAIL` | `firebase-adminsdk-...@...` | See below |
| `FIREBASE_PRIVATE_KEY` | `-----BEGIN PRIVATE KEY-----\n...` | See below |
| `URL` | `https://your-site.netlify.app` | Your Netlify site URL |

### Get Firebase Admin SDK Credentials
1. Firebase Console → **Project Settings** → **Service Accounts**
2. Click **Generate new private key** → Download JSON file
3. Open the JSON file:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (paste the entire thing including `-----BEGIN PRIVATE KEY-----`)

---

## STEP 5 — Set Up Stripe Webhook (10 min)

This is what tells your app "payment received — unlock this user."

1. Stripe Dashboard → **Developers** → **Webhooks** → **Add endpoint**
2. Endpoint URL: `https://YOUR-SITE.netlify.app/.netlify/functions/stripe-webhook`
3. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Click **Add endpoint**
5. Click the webhook → **Reveal signing secret** → Copy it
6. Add to Netlify environment variables as `STRIPE_WEBHOOK_SECRET`

---

## STEP 6 — Enable Stripe Customer Portal

This lets users cancel/manage their subscription themselves.

1. Stripe Dashboard → **Settings** → **Billing** → **Customer portal**
2. Turn it on, configure the settings
3. Set the return URL to: `https://YOUR-SITE.netlify.app/dashboard`

---

## STEP 7 — Test Everything

### Test your admin access
1. Go to your live site
2. Sign up with your admin email
3. You should go directly to the dashboard with no payment required
4. Check Firebase Console → Firestore → users → your document should show `role: "admin"`

### Test a payment (use Stripe test mode first)
1. In Stripe Dashboard, switch to **Test mode**
2. Use test card: `4242 4242 4242 4242` with any future expiry and any CVC
3. Complete a signup and payment
4. Check Firestore — the user should now have `subscribed: true`

### Switch to live mode
When ready to accept real payments:
1. Switch Stripe to Live mode
2. Update `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY` in Netlify to your live keys
3. Create a new live webhook (same as Step 5 but with live mode URL)
4. Update `STRIPE_WEBHOOK_SECRET` to the new live webhook secret

---

## STEP 8 — Custom Domain (Optional, 10 min)

1. Buy a domain (e.g. `solvesheet.app`) from Namecheap, Google Domains, etc.
2. In Netlify → **Domain management** → **Add custom domain**
3. Follow the DNS instructions Netlify provides
4. Netlify provides free HTTPS automatically
5. Update the `URL` environment variable to your new domain

---

## Giving Someone Free Admin Access

To give anyone free access (beta testers, professors, friends):

**Option A — Add their email to the code:**
In `public/index.html`, add their email to `ADMIN_EMAILS`:
```javascript
const ADMIN_EMAILS = [
  "youremail@gmail.com",
  "professor@university.edu",  // ← add here
];
```
Then redeploy (push to GitHub).

**Option B — Set role in Firebase Console (no code change needed):**
1. Firebase Console → Firestore Database → users
2. Find their document (by their UID or email)
3. Edit: set `role` to `"admin"`, `subscribed` to `true`, `plan` to `"admin"`
4. Done — they have access immediately

---

## Adding a New Course

1. Open `public/index.html`
2. Find the `const TABS = {` object
3. Add a new array entry (same format as the existing courses)
4. Add the course to the dashboard course grid in the HTML
5. Push to GitHub → Netlify deploys automatically in ~30 seconds

---

## File Structure

```
solvesheet/
├── public/
│   └── index.html              ← your entire front-end (edit this)
├── netlify/
│   └── functions/
│       ├── create-checkout.js  ← creates Stripe payment session
│       ├── stripe-webhook.js   ← marks users as paid after payment
│       └── billing-portal.js   ← lets users manage their subscription
├── js/                         ← reference files (logic is in index.html)
│   ├── firebase-config.js
│   ├── auth.js
│   ├── db.js
│   └── stripe.js
├── netlify.toml                ← Netlify config
├── package.json                ← Node dependencies for functions
└── README.md                   ← this file
```

---

## Monthly Revenue Tracking

Check your Stripe Dashboard → **Revenue** at any time.
- Monthly subscribers: recurring revenue
- Semester subscribers: one-time but higher value

---

## Support / Questions

If something isn't working:
1. Check Netlify → **Functions** tab → click a function → view logs
2. Check Stripe → **Developers** → **Webhooks** → click your webhook → view recent deliveries
3. Check Firebase Console → **Authentication** → make sure your user exists
4. Check Firebase Console → **Firestore** → open your user document → check `subscribed` field
#   s o l v e s h e e t  
 