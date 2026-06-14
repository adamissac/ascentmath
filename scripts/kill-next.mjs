/**
 * Stop Next.js servers by freeing their usual ports so .next can be removed safely.
 * Port-based only — avoids killing the npm process that invoked this script.
 */
import { execSync } from "node:child_process";

const isWin = process.platform === "win32";
const PORTS = [3000, 3001, 3002];

function freePort(port) {
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
          /* gone */
        }
      }
    } else {
      execSync(`lsof -ti tcp:${port} | xargs -r kill -9`, { stdio: "ignore", shell: true });
    }
  } catch {
    /* port already free */
  }
}

for (const port of PORTS) {
  freePort(port);
}
