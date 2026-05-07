// ================================================================
// DB.JS — Firestore User & Subscription Management
// ================================================================

import { firebaseConfig } from "./firebase-config.js";
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── Initialize (reuse existing app if already initialized) ───────
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db  = getFirestore(app);

export { db };

// ================================================================
// ensureUserDoc
// Creates a user document if it doesn't exist yet.
// If it exists, only updates fields explicitly passed in
// (won't overwrite existing subscribed/plan with undefined).
// ================================================================
export async function ensureUserDoc(uid, data) {
  const ref  = doc(db, "users", uid);
  const snap = await getDoc(ref);

  // Strip undefined values so we don't overwrite existing data
  const clean = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined)
  );

  if (!snap.exists()) {
    await setDoc(ref, { ...clean, updatedAt: serverTimestamp() });
  } else {
    // Only update fields that were explicitly provided
    await updateDoc(ref, { ...clean, updatedAt: serverTimestamp() });
  }
}

// ================================================================
// getUserData
// Returns the full user document from Firestore.
// ================================================================
export async function getUserData(uid) {
  const ref  = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { uid, ...snap.data() };
}

// ================================================================
// setSubscribed
// Called by the Stripe webhook (via Netlify function) after payment.
// Also callable manually from Firebase console for comp accounts.
// ================================================================
export async function setSubscribed(uid, plan, stripeData = {}) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, {
    subscribed:           true,
    plan:                 plan,         // "monthly" | "semester" | "admin"
    stripeCustomerId:     stripeData.customerId     || null,
    stripeSubscriptionId: stripeData.subscriptionId || null,
    subscribedAt:         new Date().toISOString(),
    updatedAt:            serverTimestamp(),
  });
}

// ================================================================
// setUnsubscribed
// Called when Stripe subscription is cancelled/expired.
// ================================================================
export async function setUnsubscribed(uid) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, {
    subscribed:  false,
    plan:        null,
    updatedAt:   serverTimestamp(),
  });
}

// ================================================================
// setAdminRole
// Use this from Firebase console or an admin panel to give
// anyone free access. Just call setAdminRole(uid) with their uid.
// ================================================================
export async function setAdminRole(uid) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, {
    role:        "admin",
    subscribed:  true,
    plan:        "admin",
    updatedAt:   serverTimestamp(),
  });
}

// ================================================================
// FIRESTORE SECURITY RULES
// Copy these into Firebase Console > Firestore > Rules
// ================================================================
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      // Users can only read/write their own document
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
*/
