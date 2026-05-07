// ================================================================
// STRIPE.JS — Checkout Session & Subscription Management
// ================================================================

import { STRIPE_PUBLISHABLE_KEY, STRIPE_PRICES } from "./firebase-config.js";
import { auth } from "./auth.js";

// ── Load Stripe.js from CDN ──────────────────────────────────────
let stripeInstance = null;
async function getStripe() {
  if (stripeInstance) return stripeInstance;
  // Dynamically load Stripe.js
  await loadScript("https://js.stripe.com/v3/");
  stripeInstance = window.Stripe(STRIPE_PUBLISHABLE_KEY);
  return stripeInstance;
}

// ================================================================
// startCheckout
// Redirects to Stripe Checkout for the selected plan.
// After payment, Stripe redirects back to /dashboard
// and the webhook marks the user as subscribed.
// ================================================================
export async function startCheckout(plan) {
  const stripe = await getStripe();
  const user   = auth.currentUser;

  if (!user) {
    throw new Error("User must be logged in to subscribe.");
  }

  const priceId = STRIPE_PRICES[plan];
  if (!priceId || priceId.startsWith("PASTE_")) {
    throw new Error("Stripe Price ID not configured. See firebase-config.js.");
  }

  // Call our Netlify function to create a Stripe Checkout Session
  const response = await fetch("/.netlify/functions/create-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      priceId:  priceId,
      plan:     plan,
      uid:      user.uid,
      email:    user.email,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to create checkout session.");
  }

  const { sessionId } = await response.json();

  // Redirect to Stripe's hosted checkout page
  const result = await stripe.redirectToCheckout({ sessionId });
  if (result.error) {
    throw new Error(result.error.message);
  }
}

// ================================================================
// openBillingPortal
// Opens Stripe's customer portal so users can manage/cancel.
// ================================================================
export async function openBillingPortal() {
  const user = auth.currentUser;
  if (!user) return;

  const response = await fetch("/.netlify/functions/billing-portal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid: user.uid }),
  });

  const { url } = await response.json();
  window.location.href = url;
}

// ================================================================
// HELPER
// ================================================================
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const script = document.createElement("script");
    script.src = src;
    script.onload  = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
