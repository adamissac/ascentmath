/**
 * Frees a TCP port before `next dev` (avoids stale servers on :3000).
 * Usage: node scripts/free-port.mjs 3000
 */
import { execSync } from "node:child_process";

const port = Number(process.argv[2] || 3000);
if (!Number.isFinite(port)) process.exit(0);

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
      /* port free */
    }
    return pids;
  }

  // netstat works in sandboxes where lsof often cannot see listeners
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
      /* port free */
    }
  }

  return pids;
}

function killPid(pid) {
  try {
    if (isWin) execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
    else execSync(`kill -9 ${pid}`, { stdio: "ignore" });
  } catch {
    /* already gone */
  }
}

for (const pid of getPidsOnPort(port)) {
  killPid(pid);
}
