#!/usr/bin/env node
/**
 * Send a test contact email through /api/contact (dev server must be running).
 */

const payload = {
  name: "Booking test",
  email: "test@example.com",
  school: "Setup verification",
  grade: "6th grade",
  sessionType: "tutoring",
  message: "This is an automated test from npm run book:test. You can ignore it.",
  website: "",
};

const base = process.env.BOOK_TEST_URL || "http://127.0.0.1:3000";

async function main() {
  console.log(`POST ${base}/api/contact …\n`);

  const health = await fetch(`${base}/api/contact`);
  const healthData = await health.json().catch(() => null);
  if (!healthData?.configured) {
    console.error("Contact form is not configured:", healthData?.hint || "unknown");
    console.error("\nRun: npm run book:setup\n");
    process.exit(1);
  }

  const res = await fetch(`${base}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.ok) {
    console.error(`Failed (${res.status}):`, data?.error || "unknown error");
    process.exit(1);
  }

  console.log("Success - test contact email sent.");
  console.log("Check adamissac08@gmail.com and alanmozhoor@gmail.com (and spam).\n");
}

main().catch((err) => {
  console.error("Could not reach the dev server. Is `npm run dev` running?\n", err.message);
  process.exit(1);
});
