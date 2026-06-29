#!/usr/bin/env node
/**
 * Guided Resend setup for the /book page.
 */

import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const envLocal = join(root, ".env.local");
const envExample = join(root, ".env.example");

const PLACEHOLDERS = new Set(["", "re_yourApiKeyHere", "re_your_real_key_here"]);

function upsertEnvValue(text, key, value) {
  const line = `${key}=${value}`;
  const re = new RegExp(`^${key}=.*$`, "m");
  if (re.test(text)) return text.replace(re, line);
  return `${text.trimEnd()}\n${line}\n`;
}

function hasValidKey(text) {
  const match = text.match(/^RESEND_API_KEY=(.+)$/m);
  const key = match?.[1]?.trim() ?? "";
  return key.startsWith("re_") && key.length > 12 && !PLACEHOLDERS.has(key);
}

async function main() {
  console.log("\nAscent Math - Book a class (Resend) setup\n");

  if (!existsSync(envLocal)) {
    copyFileSync(envExample, envLocal);
    console.log("Created .env.local from .env.example\n");
  }

  let envText = readFileSync(envLocal, "utf8");
  if (hasValidKey(envText)) {
    console.log("RESEND_API_KEY already set in .env.local.");
    console.log("Restart `npm run dev` if you changed it recently.");
    console.log("Test with: npm run book:test\n");
    return;
  }

  console.log("Resend sends booking requests to adamissac08@gmail.com.\n");
  console.log("Before pasting your API key:");
  console.log("  1. Sign up at https://resend.com");
  console.log("  2. Settings → Verified Emails → verify adamissac08@gmail.com");
  console.log("  3. API Keys → Create API Key → copy the re_… value\n");

  const rl = readline.createInterface({ input, output });
  const apiKey = (await rl.question("Paste your Resend API key (re_…): ")).trim();
  rl.close();

  if (!apiKey.startsWith("re_") || apiKey.length < 12) {
    console.error("\nThat doesn't look like a valid Resend API key.\n");
    process.exit(1);
  }

  envText = upsertEnvValue(envText, "RESEND_API_KEY", apiKey);
  envText = upsertEnvValue(envText, "BOOKING_RECIPIENT_EMAIL", "adamissac08@gmail.com");
  envText = upsertEnvValue(
    envText,
    "BOOKING_FROM_EMAIL",
    '"Adam\'s Alphabet <onboarding@resend.dev>"'
  );

  writeFileSync(envLocal, envText, "utf8");

  console.log("\nSaved to .env.local");
  console.log("Restart the dev server, then run: npm run book:test");
  console.log("Or submit the form at http://127.0.0.1:3000/#book-session\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
