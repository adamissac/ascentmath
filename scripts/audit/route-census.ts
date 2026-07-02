#!/usr/bin/env npx tsx
/** Quick route census against a running server. Usage: npx tsx scripts/audit/route-census.ts [baseUrl] */
import { GRADES } from "../../src/data/units";

const base = process.argv[2] ?? "http://127.0.0.1:3001";

const paths: string[] = [
  "/",
  "/mathematics",
  "/mathematics/find-your-start",
  "/mathematics/curriculum-frameworks",
  "/privacy",
  "/terms",
];

for (const g of GRADES) {
  paths.push(`/mathematics/${g.slug}`);
  for (const u of g.units) {
    paths.push(`/mathematics/${g.slug}/${u.slug}`);
    for (const t of u.topics) {
      paths.push(`/mathematics/${g.slug}/${u.slug}/${t.slug}`);
    }
  }
}

async function main() {
  let failed = 0;
  for (const p of paths) {
    const res = await fetch(`${base}${p}`);
    if (!res.ok) {
      console.log(`${res.status} ${p}`);
      failed++;
    }
  }

  console.log(`Census: ${paths.length} Gen-2 routes checked, ${failed} failures.`);
  process.exit(failed ? 1 : 0);
}

main();
