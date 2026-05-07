// ================================================================
// netlify/functions/stripe-webhook.js
// Listens for Stripe events and updates Firestore accordingly.
// This is the critical link between "payment received" and "user has access".
// ================================================================

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const admin  = require("firebase-admin");

// ── Initialize Firebase Admin (server-side SDK) ─────────────────
// This only runs once even if the function is called multiple times
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId:   process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Netlify stores the private key with literal \n — replace them
      privateKey:  process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

// ================================================================
// HANDLER
// ================================================================
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const sig     = event.headers["stripe-signature"];
  const secret  = process.env.STRIPE_WEBHOOK_SECRET;
  let stripeEvent;

  // Verify the webhook came from Stripe (not a fake request)
  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, secret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  // ── Handle each event type ────────────────────────────────────
  try {
    switch (stripeEvent.type) {

      // ── One-time payment completed (semester plan) ─────────────
      case "checkout.session.completed": {
        const session = stripeEvent.data.object;
        const uid     = session.metadata?.firebaseUid;
        const plan    = session.metadata?.plan;

        if (uid && session.payment_status === "paid") {
          await db.collection("users").doc(uid).update({
            subscribed:           true,
            plan:                 plan || "semester",
            stripeCustomerId:     session.customer,
            stripeSubscriptionId: session.subscription || null,
            subscribedAt:         admin.firestore.FieldValue.serverTimestamp(),
            updatedAt:            admin.firestore.FieldValue.serverTimestamp(),
          });
          console.log(`User ${uid} marked as subscribed (${plan})`);
        }
        break;
      }

      // ── Subscription activated / renewed (monthly plan) ────────
      case "customer.subscription.updated":
      case "invoice.payment_succeeded": {
        const obj = stripeEvent.data.object;
        // Get the customer to find the Firebase UID
        const customerId = obj.customer || obj.lines?.data?.[0]?.subscription;
        if (!customerId) break;

        const customer = await stripe.customers.retrieve(customerId);
        const uid = customer.metadata?.firebaseUid;
        if (!uid) break;

        await db.collection("users").doc(uid).update({
          subscribed:  true,
          updatedAt:   admin.firestore.FieldValue.serverTimestamp(),
        });
        break;
      }

      // ── Subscription cancelled / payment failed ────────────────
      case "customer.subscription.deleted":
      case "invoice.payment_failed": {
        const obj = stripeEvent.data.object;
        const customerId = obj.customer;
        if (!customerId) break;

        const customer = await stripe.customers.retrieve(customerId);
        const uid = customer.metadata?.firebaseUid;
        if (!uid) break;

        await db.collection("users").doc(uid).update({
          subscribed:  false,
          plan:        null,
          updatedAt:   admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log(`User ${uid} subscription ended`);
        break;
      }

      default:
        // Ignore other event types
        break;
    }

    return { statusCode: 200, body: JSON.stringify({ received: true }) };

  } catch (error) {
    console.error("Webhook handler error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
