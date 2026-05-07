// ================================================================
// netlify/functions/billing-portal.js
// Opens Stripe's customer portal so users can manage/cancel.
// ================================================================

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const admin  = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId:   process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey:  process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { uid } = JSON.parse(event.body);
    if (!uid) return { statusCode: 400, body: "Missing uid" };

    // Get the user's Stripe customer ID from Firestore
    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      return { statusCode: 404, body: "User not found" };
    }

    const { stripeCustomerId } = userDoc.data();
    if (!stripeCustomerId) {
      return { statusCode: 400, body: "No Stripe customer found for this user" };
    }

    // Create a billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer:   stripeCustomerId,
      return_url: `${process.env.URL}/dashboard`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };

  } catch (error) {
    console.error("Billing portal error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
