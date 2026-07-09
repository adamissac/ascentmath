import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";

const ORIGIN = process.env.AUDIT_ORIGIN || "http://127.0.0.1:3000";

const TARGETS = [
  { name: "home", url: `${ORIGIN}/` },
  { name: "grade-6", url: `${ORIGIN}/mathematics/grade-6` },
  { name: "topic", url: `${ORIGIN}/mathematics/grade-6/unit-1/factors-multiples-gcf-lcm` },
  { name: "book", url: `${ORIGIN}/#book-session` },
];

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  /** @type {Record<string, any>} */
  const out = { origin: ORIGIN, timestamp: new Date().toISOString(), results: {} };

  for (const t of TARGETS) {
    await page.goto(t.url, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page }).analyze();
    out.results[t.name] = {
      url: t.url,
      violations: results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        help: v.help,
        helpUrl: v.helpUrl,
        nodes: v.nodes.map((n) => ({
          html: n.html,
          target: n.target,
          failureSummary: n.failureSummary,
        })),
      })),
    };
  }

  await fs.mkdir("artifacts", { recursive: true });
  await fs.writeFile("artifacts/axe-results.json", JSON.stringify(out, null, 2), "utf8");

  const total = Object.values(out.results).reduce((sum, r) => sum + r.violations.length, 0);
  if (total > 0) {
    console.error(`Axe found ${total} violation group(s). See artifacts/axe-results.json`);
    process.exitCode = 2;
  }

  await context.close();
  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

