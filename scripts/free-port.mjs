/**
 * Frees a TCP port before `next dev` (avoids stale servers on :3000).
 * Usage: node scripts/free-port.mjs 3000
 */
import { execSync } from "node:child_process";

const port = Number(process.argv[2] || 3000);
if (!Number.isFinite(port)) process.exit(0);

const isWin = process.platform === "win32";

try {
  if (isWin) {
    const out = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf8" });
    const pids = new Set();
    for (const line of out.split(/\r?\n/)) {
      if (!line.includes("LISTENING")) continue;
      const pid = line.trim().split(/\s+/).pop();
      if (pid && /^\d+$/.test(pid)) pids.add(pid);
    }
    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
      } catch {
        /* already gone */
      }
    }
  } else {
    execSync(`lsof -ti tcp:${port} | xargs -r kill -9`, { stdio: "ignore", shell: true });
  }
} catch {
  /* port already free */
}
