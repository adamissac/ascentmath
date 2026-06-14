/**
 * Stop Next.js servers by freeing their usual ports so .next can be removed safely.
 */
import { execSync } from "node:child_process";

const PORTS = [3000, 3001, 3002];

for (const port of PORTS) {
  execSync(`node scripts/free-port.mjs ${port}`, { stdio: "inherit" });
}
