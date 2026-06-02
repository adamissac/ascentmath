/**
 * Translate Firebase Auth error codes into messages a real human would
 * understand. The default Firebase messages leak implementation details
 * (`auth/wrong-password`, `auth/user-not-found`) and don't read well in
 * a UI. Keep this table exhaustive and grow it as new codes come up.
 */

import { FirebaseError } from "firebase/app";

const MESSAGES: Record<string, string> = {
  "auth/email-already-in-use":
    "An account with this email already exists. Try logging in instead.",
  "auth/invalid-email": "That email address doesn't look right.",
  "auth/operation-not-allowed":
    "This sign-in method isn't turned on in Firebase. Open the Firebase Console → Authentication → Sign-in method and enable it.",
  "auth/weak-password":
    "That password is too easy to guess. Use at least 8 characters.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/user-not-found":
    "No account uses that email. Want to create one?",
  "auth/wrong-password": "That password isn't right. Try again or reset it.",
  "auth/invalid-credential":
    "Email or password is incorrect. Try again, or reset your password.",
  "auth/too-many-requests":
    "Too many attempts. Take a short break and try again.",
  "auth/network-request-failed":
    "Network hiccup - check your connection and try again.",
  /* --- popup / OAuth --- */
  "auth/popup-closed-by-user":
    "Sign-in window closed before finishing. Try once more.",
  "auth/popup-blocked":
    "Your browser blocked the Google sign-in popup. Allow popups for this site (or we'll fall back to a full-page redirect).",
  "auth/cancelled-popup-request":
    "Another sign-in popup was already open. Close it and try once more.",
  "auth/unauthorized-domain":
    "This site's domain isn't in Firebase's allow-list. In the Firebase Console go to Authentication → Settings → Authorized domains and add it.",
  "auth/account-exists-with-different-credential":
    "An account with that email already exists, signed in with a different method (e.g. email/password). Use that method instead.",
  "auth/credential-already-in-use":
    "This Google account is already linked to a different user.",
  "auth/web-storage-unsupported":
    "Your browser is blocking the storage Firebase needs (often third-party cookies). Disable strict tracking protection for this site and retry.",
  "auth/requires-recent-login":
    "For security, please log out and back in, then try again.",
  "auth/internal-error":
    "Firebase hit an internal error. Double-check your project config and try again.",
};

export function friendlyAuthError(err: unknown): string {
  if (err instanceof FirebaseError) {
    return MESSAGES[err.code] || `Something went wrong (${err.code}).`;
  }
  if (err instanceof Error && err.message) {
    return err.message;
  }
  return "Something went wrong. Please try again.";
}
