// ================================================================
// FIREBASE CONFIG
// ================================================================
// HOW TO FILL THIS IN:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project (call it "solvesheet" or anything you like)
// 3. Click the </> icon to add a Web App
// 4. Copy the firebaseConfig object values into the fields below
// 5. Save this file
// ================================================================

const firebaseConfig = {
  apiKey:            "PASTE_YOUR_API_KEY_HERE",
  authDomain:        "PASTE_YOUR_AUTH_DOMAIN_HERE",       // e.g. solvesheet.firebaseapp.com
  projectId:         "PASTE_YOUR_PROJECT_ID_HERE",        // e.g. solvesheet-abc12
  storageBucket:     "PASTE_YOUR_STORAGE_BUCKET_HERE",    // e.g. solvesheet-abc12.appspot.com
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID_HERE",
  appId:             "PASTE_YOUR_APP_ID_HERE"
};

// ================================================================
// ADMIN EMAILS
// Add any email address here that should get free admin access.
// These users skip Stripe entirely and get full access on login.
// ================================================================
const ADMIN_EMAILS = [
  "YOUR_EMAIL_HERE@gmail.com",   // <-- replace with your real email
  // "friend@email.com",         // add more admins any time
];

// ================================================================
// STRIPE CONFIG
// ================================================================
// 1. Go to https://dashboard.stripe.com
// 2. Get your publishable key from Developers > API Keys
// 3. Create two Products in Stripe:
//    - "SolveSheet Monthly" at $4.99/month  → copy the Price ID
//    - "SolveSheet Semester" at $12.99       → copy the Price ID
// ================================================================
const STRIPE_PUBLISHABLE_KEY = "PASTE_YOUR_STRIPE_PUBLISHABLE_KEY_HERE";

const STRIPE_PRICES = {
  monthly:  "PASTE_MONTHLY_PRICE_ID_HERE",    // e.g. price_1OaBcDEfGhIjKlMn
  semester: "PASTE_SEMESTER_PRICE_ID_HERE",   // e.g. price_1OaBcDEfGhIjKlMo
};

// ================================================================
// DO NOT EDIT BELOW THIS LINE
// ================================================================
export { firebaseConfig, ADMIN_EMAILS, STRIPE_PUBLISHABLE_KEY, STRIPE_PRICES };
