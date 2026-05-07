// ================================================================
// AUTH.JS — Login, Signup, Logout, Session Management
// Uses Firebase Auth + Firestore role check
// ================================================================

import { firebaseConfig, ADMIN_EMAILS } from "./firebase-config.js";
import { initializeApp }        from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
         signOut, onAuthStateChanged, updateProfile }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { ensureUserDoc, getUserData } from "./db.js";

// ── Initialize Firebase App ──────────────────────────────────────
const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ── Export auth for use in db.js / stripe.js ────────────────────
export { auth };

// ================================================================
// SIGN UP
// Creates Firebase Auth user, then creates their Firestore doc.
// Admin emails automatically get role:"admin" and subscribed:true.
// ================================================================
export async function signUp(name, email, password) {
  // 1. Create the Firebase Auth account
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const user = credential.user;

  // 2. Set display name
  await updateProfile(user, { displayName: name });

  // 3. Determine role
  const isAdmin = ADMIN_EMAILS.map(e => e.toLowerCase()).includes(email.toLowerCase());

  // 4. Create Firestore user document
  await ensureUserDoc(user.uid, {
    name:        name,
    email:       email,
    role:        isAdmin ? "admin" : "user",
    subscribed:  isAdmin ? true : false,
    plan:        isAdmin ? "admin" : null,
    trialStart:  isAdmin ? null : new Date().toISOString(),
    trialEnd:    isAdmin ? null : getTrialEndDate(),
    createdAt:   new Date().toISOString(),
    stripeCustomerId: null,
    stripeSubscriptionId: null,
  });

  return user;
}

// ================================================================
// LOG IN
// Signs in and returns the user's Firestore data (role, subscribed, plan).
// ================================================================
export async function logIn(email, password) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const user = credential.user;

  // Check if this is an admin email that doesn't have a doc yet
  // (handles case where admin was added to ADMIN_EMAILS after account creation)
  const isAdmin = ADMIN_EMAILS.map(e => e.toLowerCase()).includes(email.toLowerCase());
  await ensureUserDoc(user.uid, {
    name:       user.displayName || email.split("@")[0],
    email:      email,
    role:       isAdmin ? "admin" : "user",
    subscribed: isAdmin ? true : undefined,  // only set if admin; don't overwrite existing
    plan:       isAdmin ? "admin" : undefined,
  });

  const userData = await getUserData(user.uid);
  return { user, userData };
}

// ================================================================
// LOG OUT
// ================================================================
export async function logOut() {
  await signOut(auth);
}

// ================================================================
// AUTH STATE LISTENER
// Call this once on app load. Fires whenever login state changes.
// Callback receives: { user, userData } or null if logged out.
// ================================================================
export function onAuthChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      callback(null);
      return;
    }
    try {
      const userData = await getUserData(user.uid);
      callback({ user, userData });
    } catch (e) {
      console.error("Error fetching user data:", e);
      callback({ user, userData: null });
    }
  });
}

// ================================================================
// HELPERS
// ================================================================
function getTrialEndDate() {
  const d = new Date();
  d.setDate(d.getDate() + 7); // 7-day trial
  return d.toISOString();
}

export function isTrialActive(userData) {
  if (!userData?.trialEnd) return false;
  return new Date() < new Date(userData.trialEnd);
}

export function hasAccess(userData) {
  if (!userData) return false;
  if (userData.role === "admin") return true;
  if (userData.subscribed === true) return true;
  if (isTrialActive(userData)) return true;
  return false;
}
