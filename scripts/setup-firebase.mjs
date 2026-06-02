#!/usr/bin/env node
/**
 * Guided Firebase setup - creates .env.local if missing and prints next steps.
 * After `firebase login`, can pull web SDK config via the Firebase CLI.
 */

import { execSync, spawnSync } from "node:child_process";
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const envLocal = join(root, ".env.local");
const envExample = join(root, ".env.example");

function hasFirebaseKeys(text) {
  const required = [
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    "NEXT_PUBLIC_FIREBASE_APP_ID",
  ];
  return required.every((key) => {
    const match = text.match(new RegExp(`^${key}=(.+)$`, "m"));
    return match && match[1].trim().length > 0;
  });
}

function upsertEnvValue(text, key, value) {
  const line = `${key}=${value}`;
  const re = new RegExp(`^${key}=.*$`, "m");
  if (re.test(text)) return text.replace(re, line);
  return `${text.trimEnd()}\n${line}\n`;
}

function tryFirebaseSdkConfig(projectId) {
  try {
    const raw = execSync(`npx firebase apps:sdkconfig WEB --project ${projectId}`, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    const pick = (name) => {
      const m = raw.match(new RegExp(`${name}:\\s*["']([^"']+)["']`));
      return m?.[1] ?? "";
    };
    return {
      apiKey: pick("apiKey"),
      authDomain: pick("authDomain"),
      projectId: pick("projectId"),
      storageBucket: pick("storageBucket"),
      messagingSenderId: pick("messagingSenderId"),
      appId: pick("appId"),
    };
  } catch {
    return null;
  }
}

async function main() {
  console.log("\nAdam's Alphabet - Firebase auth setup\n");

  if (!existsSync(envLocal)) {
    copyFileSync(envExample, envLocal);
    console.log("Created .env.local from .env.example");
  }

  let envText = readFileSync(envLocal, "utf8");
  if (hasFirebaseKeys(envText)) {
    console.log("Firebase keys already present in .env.local.");
    console.log("Restart `npm run dev` if you changed them recently.\n");
    return;
  }

  const rl = readline.createInterface({ input, output });

  console.log("Choose how to add your Firebase web config:\n");
  console.log("  1) Paste values manually (from Firebase Console → Project settings → Web app)");
  console.log("  2) Pull via Firebase CLI (requires `firebase login` + an existing web app)\n");

  const choice = (await rl.question("Option [1/2]: ")).trim() || "1";

  if (choice === "2") {
    const login = spawnSync("npx", ["firebase", "login"], { cwd: root, stdio: "inherit", shell: true });
    if (login.status !== 0) {
      console.error("\nFirebase login failed or was cancelled.");
      rl.close();
      process.exit(1);
    }

    const projectId = (await rl.question("Firebase project ID: ")).trim();
    if (!projectId) {
      console.error("Project ID is required.");
      rl.close();
      process.exit(1);
    }

    const cfg = tryFirebaseSdkConfig(projectId);
    if (!cfg?.apiKey) {
      console.error(
        "\nCould not read SDK config. Register a Web app in Firebase Console first,\n" +
          "or paste values manually (option 1).\n"
      );
      rl.close();
      process.exit(1);
    }

    envText = upsertEnvValue(envText, "NEXT_PUBLIC_FIREBASE_API_KEY", cfg.apiKey);
    envText = upsertEnvValue(envText, "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", cfg.authDomain);
    envText = upsertEnvValue(envText, "NEXT_PUBLIC_FIREBASE_PROJECT_ID", cfg.projectId);
    envText = upsertEnvValue(envText, "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET", cfg.storageBucket);
    envText = upsertEnvValue(
      envText,
      "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
      cfg.messagingSenderId
    );
    envText = upsertEnvValue(envText, "NEXT_PUBLIC_FIREBASE_APP_ID", cfg.appId);
  } else {
    console.log("\nPaste each value from your firebaseConfig object:\n");
    const apiKey = await rl.question("apiKey: ");
    const authDomain = await rl.question("authDomain: ");
    const projectId = await rl.question("projectId: ");
    const storageBucket = await rl.question("storageBucket: ");
    const messagingSenderId = await rl.question("messagingSenderId: ");
    const appId = await rl.question("appId: ");

    envText = upsertEnvValue(envText, "NEXT_PUBLIC_FIREBASE_API_KEY", apiKey.trim());
    envText = upsertEnvValue(envText, "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", authDomain.trim());
    envText = upsertEnvValue(envText, "NEXT_PUBLIC_FIREBASE_PROJECT_ID", projectId.trim());
    envText = upsertEnvValue(envText, "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET", storageBucket.trim());
    envText = upsertEnvValue(
      envText,
      "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
      messagingSenderId.trim()
    );
    envText = upsertEnvValue(envText, "NEXT_PUBLIC_FIREBASE_APP_ID", appId.trim());
  }

  writeFileSync(envLocal, envText, "utf8");
  rl.close();

  console.log("\nSaved Firebase config to .env.local");
  console.log("\nLast steps in Firebase Console:");
  console.log("  • Authentication → Sign-in method → enable Email/Password + Google");
  console.log("  • Authentication → Settings → Authorized domains → add localhost + your live domain");
  console.log("  • (Optional) Firestore → Create database, then deploy rules: npm run firebase:rules");
  console.log("\nRestart the dev server: npm run dev\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
