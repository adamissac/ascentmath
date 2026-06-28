/**
 * Reliable local dev (default http://127.0.0.1:3000)
 *
 * Usage:
 *   node scripts/dev.mjs          — start (reuse .next if valid)
 *   node scripts/dev.mjs --clean  — wipe .next then start
 */
import { spawn, execSync } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { DEV_HOST, DEV_PORT, DEV_URL } from "./dev-port.mjs";

const PORT = DEV_PORT;
const HOST = DEV_HOST;
const URL = DEV_URL;
const clean = process.argv.includes("--clean");
const isWin = process.platform === "win32";

function getPidsOnPort(targetPort) {
  const pids = new Set();
  if (isWin) {
    try {
      const out = execSync(`netstat -ano | findstr :${targetPort}`, { encoding: "utf8" });
      for (const line of out.split(/\r?\n/)) {
        if (!line.includes("LISTENING")) continue;
        const pid = line.trim().split(/\s+/).pop();
        if (pid && /^\d+$/.test(pid)) pids.add(pid);
      }
    } catch {
      /* free */
    }
    return pids;
  }

  try {
    const out = execSync("netstat -tlnp 2>/dev/null", { encoding: "utf8" });
    for (const line of out.split(/\r?\n/)) {
      if (!line.includes("LISTEN") || !line.includes(`:${targetPort}`)) continue;
      const match = line.match(/LISTEN\s+(\d+)\//);
      if (match) pids.add(match[1]);
    }
  } catch {
    /* try lsof */
  }

  if (pids.size === 0) {
    try {
      const out = execSync(`lsof -nP -iTCP:${targetPort} -sTCP:LISTEN -t 2>/dev/null`, {
        encoding: "utf8",
      });
      for (const line of out.split(/\r?\n/)) {
        const pid = line.trim();
        if (/^\d+$/.test(pid)) pids.add(pid);
      }
    } catch {
      /* free */
    }
  }

  return pids;
}

function killPort(targetPort) {
  for (const pid of getPidsOnPort(targetPort)) {
    try {
      if (isWin) execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
      else execSync(`kill -9 ${pid}`, { stdio: "ignore" });
    } catch {
      /* gone */
    }
  }
}

function removeNextDir(reason) {
  const nextDir = path.join(process.cwd(), ".next");
  if (!fs.existsSync(nextDir)) return;
  console.warn(`[dev] ${reason}`);
  console.warn("[dev] Removing .next …");
  fs.rmSync(nextDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
}

function ensureDevCache() {
  if (clean) {
    removeNextDir("--clean requested");
    return;
  }

  const nextDir = path.join(process.cwd(), ".next");
  if (!fs.existsSync(nextDir)) return;

  const isProduction =
    fs.existsSync(path.join(nextDir, "BUILD_ID")) ||
    fs.existsSync(path.join(nextDir, "export-marker.json"));
  if (isProduction) {
    removeNextDir("Production build cache found — dev needs a fresh .next");
    return;
  }

  const manifestOk =
    fs.existsSync(path.join(nextDir, "routes-manifest.json")) ||
    fs.existsSync(path.join(nextDir, "dev", "routes-manifest.json"));
  if (!manifestOk) {
    removeNextDir("Incomplete .next cache");
  }
}

for (const port of [3000, 3001, 3002]) {
  killPort(port);
}

ensureDevCache();

console.log("\n  Ascent Math — dev server");
console.log(`  → ${URL}`);
console.log("  Keep this terminal open while you browse.\n");

const child = spawn(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["next", "dev", "--port", String(PORT), "--hostname", HOST],
  { stdio: "inherit", shell: isWin },
);

function ping() {
  return new Promise((resolve) => {
    const req = http.get(URL, (res) => {
      res.resume();
      resolve(res.statusCode === 200);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

let announced = false;
async function waitForReady() {
  for (let i = 0; i < 60; i++) {
    if (await ping()) {
      if (!announced) {
        announced = true;
        console.log(`\n  ✓ Site is up → ${URL}\n`);
      }
      return;
    }
    if (i === 5) console.log("  … compiling (first load can take ~30s)");
    await new Promise((r) => setTimeout(r, 2000));
  }
  console.error("\n  ✗ Server started but page did not respond. Check errors above.\n");
}

setTimeout(waitForReady, 2000);

child.on("exit", (code) => process.exit(code ?? 0));
