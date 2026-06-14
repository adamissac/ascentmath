import { GRADES } from "../src/data/units.ts";

const base = process.argv[2] ?? "http://localhost:3000";
const paths = [
  "/",
  "/book",
  "/tutoring",
  "/mathematics",
  "/mathematics/find-your-start",
  "/mathematics/curriculum-frameworks",
  "/signup",
  "/forgot-password",
  "/dashboard",
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

let failed = 0;
for (const p of paths) {
  const res = await fetch(`${base}${p}`);
  if (!res.ok) {
    console.log(`${res.status} ${p}`);
    failed++;
  }
}
console.log(`Checked ${paths.length} routes; ${failed} failures.`);
process.exit(failed ? 1 : 0);
