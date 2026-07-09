#!/usr/bin/env node
/**
 * Prints the exact Firebase + Vercel steps for Google sign-in on production.
 * Usage: npm run auth:production
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const envLocal = join(root, ".env.local");

function readEnv(key) {
  if (!existsSync(envLocal)) return "";
  const match = readFileSync(envLocal, "utf8").match(new RegExp(`^${key}=(.+)$`, "m"));
  return match?.[1]?.trim().replace(/^["']|["']$/g, "") ?? "";
}

const projectId = readEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID") || "adams-alphabet";
const vercelHost = process.argv[2] || "joinascentmath.vercel.app";
const customDomain = process.argv[3] || "joinascentmath.com";

console.log(`
Ascent Math - Google sign-in on production
==============================================

Firebase project: ${projectId}

1) ENABLE GOOGLE SIGN-IN
   https://console.firebase.google.com/project/${projectId}/authentication/providers
   • Open "Google" → Enable → pick support email → Save
   • Enable "Email/Password" too if you want email accounts

2) AUTHORIZED DOMAINS (required or Google login fails)
   https://console.firebase.google.com/project/${projectId}/authentication/settings
   Add each hostname (no https://):
   • ${vercelHost}
   • ${customDomain}
   • www.${customDomain.replace(/^www\./, "")}

3) VERCEL ENVIRONMENT VARIABLES (required on live site)
   Vercel → Project → Settings → Environment Variables
   Add for Production + Preview + Development, then Redeploy:

   NEXT_PUBLIC_FIREBASE_API_KEY
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   NEXT_PUBLIC_FIREBASE_PROJECT_ID
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   NEXT_PUBLIC_FIREBASE_APP_ID

   Copy values from your local .env.local file.

4) TEST
   • Visit https://${customDomain}/login
   • Click "Continue with Google"
   • You should return signed in to /dashboard

If you see "unauthorized-domain", step 2 is missing your exact hostname.
If you see "Firebase isn't configured", step 3 is missing or needs redeploy.
`);
