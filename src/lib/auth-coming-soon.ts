/**
 * When true, /login and /signup show a coming-soon modal and block sign-in.
 * Set NEXT_PUBLIC_AUTH_COMING_SOON=false in .env.local to test real auth.
 */
export function isAuthComingSoon(): boolean {
  return process.env.NEXT_PUBLIC_AUTH_COMING_SOON !== "false";
}
