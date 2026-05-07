// ================================================================
// netlify/functions/create-checkout.js
// Creates a Stripe Checkout Session server-side.
// This runs on Netlify's servers — your secret key stays safe.
// ================================================================

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { priceId, plan, uid, email } = JSON.parse(event.body);

    if (!priceId || !uid || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing required fields." }),
      };
    }

    // Create or retrieve Stripe customer
    // Check if customer already exists for this email
    const existing = await stripe.customers.list({ email, limit: 1 });
    let customer;
    if (existing.data.length > 0) {
      customer = existing.data[0];
    } else {
      customer = await stripe.customers.create({
        email,
        metadata: { firebaseUid: uid },
      });
    }

    // Determine if this is a recurring (monthly) or one-time (semester) payment
    // Monthly = subscription, Semester = one-time payment
    const isSemester = plan === "semester";

    let session;
    if (isSemester) {
      // One-time payment for semester
      session = await stripe.checkout.sessions.create({
        customer:    customer.id,
        mode:        "payment",
        line_items:  [{ price: priceId, quantity: 1 }],
        success_url: `${process.env.URL}/dashboard?payment=success&plan=${plan}`,
        cancel_url:  `${process.env.URL}/paywall?payment=cancelled`,
        metadata: {
          firebaseUid: uid,
          plan:        plan,
        },
      });
    } else {
      // Recurring subscription for monthly
      session = await stripe.checkout.sessions.create({
        customer:    customer.id,
        mode:        "subscription",
        line_items:  [{ price: priceId, quantity: 1 }],
        // 7-day free trial on the subscription
        subscription_data: {
          trial_period_days: 7,
          metadata: { firebaseUid: uid, plan },
        },
        success_url: `${process.env.URL}/dashboard?payment=success&plan=${plan}`,
        cancel_url:  `${process.env.URL}/paywall?payment=cancelled`,
        metadata: {
          firebaseUid: uid,
          plan:        plan,
        },
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    };

  } catch (error) {
    console.error("Stripe checkout error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
