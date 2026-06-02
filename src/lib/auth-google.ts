/**
 * Google sign-in helpers - production hosts use redirect (popups are
 * unreliable on custom domains, mobile Safari, and strict browsers).
 */

/**
 * Returns true when the current host should use `signInWithRedirect` instead
 * of `signInWithPopup`. Popups are blocked or unreliable on custom domains,
 * mobile Safari, and browsers with strict third-party-cookie policies.
 */
export function preferGoogleRedirect(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host !== "localhost" && host !== "127.0.0.1";
}

/**
 * Returns a human-readable message explaining why Firebase Auth is not working
 * on the current host, with environment-specific setup instructions.
 */
export function authNotConfiguredMessage(): string {
  if (typeof window === "undefined") {
    return "Firebase is not configured.";
  }
  const local =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  if (local) {
    return "Auth is not configured yet. Add your Firebase keys to .env.local and restart the dev server.";
  }
  return "Firebase is not configured on this site. In Vercel \u2192 Settings \u2192 Environment Variables, add all NEXT_PUBLIC_FIREBASE_* keys, then redeploy.";
}
