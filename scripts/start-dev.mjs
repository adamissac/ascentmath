/**
 * Start Next.js dev on :3000 with a clean port and helpful status output.
 */
import { spawn, execSync } from "node:child_process";
import http from "node:http";

const PORT = 3000;
const URL = `http://localhost:${PORT}/`;

function run(script) {
  execSync(`node ${script}`, { stdio: "inherit" });
}

run("scripts/kill-next.mjs");
run("scripts/ensure-next-cache.mjs");
execSync(`node scripts/free-port.mjs ${PORT}`, { stdio: "inherit" });

console.log("\n  Adam's Alphabet — dev server");
console.log(`  → ${URL}`);
console.log("\n  First visit compiles the app (often 10–30s). Keep this terminal open.\n");

const child = spawn("npx", ["next", "dev", "--turbo", "--port", String(PORT)], {
  stdio: "inherit",
  shell: true,
});

function ping() {
  return new Promise((resolve) => {
    const req = http.get(URL, (res) => {
      res.resume();
      resolve(res.statusCode === 200);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(3000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

setTimeout(async () => {
  for (let attempt = 0; attempt < 45; attempt++) {
    if (await ping()) {
      console.log(`\n  ✓ Ready — open ${URL}\n`);
      return;
    }
    if (attempt === 4) {
      console.log("  … still compiling (this is normal on first load)");
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
  console.log("\n  ⚠ Taking longer than usual — check for errors above.\n");
}, 1500);

child.on("exit", (code) => process.exit(code ?? 0));
