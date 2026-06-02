#!/usr/bin/env node
/**
 * Send a test booking email through /api/book (dev server must be running).
 */

const payload = {
  name: "Booking test",
  email: "test@example.com",
  phone: "",
  mode: "zoom",
  grade: "6th grade",
  topic: "Setup verification",
  preferredDate: "",
  preferredTime: "",
  notes: "This is an automated test from npm run book:test. You can ignore it.",
  website: "",
};

const base = process.env.BOOK_TEST_URL || "http://localhost:3000";

async function main() {
  console.log(`POST ${base}/api/book …\n`);

  const health = await fetch(`${base}/api/book`);
  const healthData = await health.json().catch(() => null);
  if (!healthData?.configured) {
    console.error("Booking is not configured:", healthData?.hint || "unknown");
    console.error("\nRun: npm run book:setup\n");
    process.exit(1);
  }

  const res = await fetch(`${base}/api/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.ok) {
    console.error(`Failed (${res.status}):`, data?.error || "unknown error");
    process.exit(1);
  }

  console.log("Success - test booking email sent.");
  console.log("Check adamissac08@gmail.com (and spam).\n");
}

main().catch((err) => {
  console.error("Could not reach the dev server. Is `npm run dev` running?\n", err.message);
  process.exit(1);
});
