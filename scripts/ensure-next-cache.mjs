/**
 * Detects a broken .next cache (missing manifests or orphaned webpack chunks)
 * and removes it before `next dev` — fixes "Cannot find module './331.js'" and similar.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const nextDir = path.join(root, ".next");

function removeNext(reason) {
  console.warn(`[dev] ${reason}`);
  console.warn("[dev] Removing .next for a clean start…");
  try {
    fs.rmSync(nextDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
  } catch {
    console.warn("[dev] Could not remove .next — run: npm run dev:clean");
    process.exit(1);
  }
}

if (!fs.existsSync(nextDir)) {
  process.exit(0);
}

const manifestOk =
  fs.existsSync(path.join(nextDir, "routes-manifest.json")) &&
  fs.existsSync(path.join(nextDir, "prerender-manifest.json"));

if (!manifestOk) {
  removeNext("Incomplete .next manifests.");
  process.exit(0);
}

/** Webpack runtime lists chunks like require("./331.js") — file must exist under server/. */
function webpackChunksOk() {
  const serverDir = path.join(nextDir, "server");
  const runtimePath = path.join(serverDir, "webpack-runtime.js");
  if (!fs.existsSync(runtimePath)) return true;

  const runtime = fs.readFileSync(runtimePath, "utf8");
  const ids = [...runtime.matchAll(/require\("\.\/(\d+)\.js"\)/g)].map((m) => m[1]);
  if (ids.length === 0) return true;

  for (const id of ids) {
    const inServer = path.join(serverDir, `${id}.js`);
    const inChunks = path.join(serverDir, "chunks", `${id}.js`);
    if (!fs.existsSync(inServer) && !fs.existsSync(inChunks)) {
      return false;
    }
  }
  return true;
}

if (!webpackChunksOk()) {
  removeNext("Stale webpack chunks (e.g. missing ./331.js).");
}
