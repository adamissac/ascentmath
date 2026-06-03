/**
 * Fully remove Next.js build output so webpack chunk refs (e.g. ./331.js) stay in sync.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const targets = [".next"];

for (const dir of targets) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) continue;
  try {
    fs.rmSync(full, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
    console.log(`[clean] removed ${dir}/`);
  } catch (err) {
    console.error(
      `[clean] Could not remove ${dir}/ — stop all "next dev" / "next start" terminals and retry.`,
    );
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }
}
