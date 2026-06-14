/**
 * Stop Next.js servers by freeing dev ports (including legacy :3000).
 */
import { execSync } from "node:child_process";
import { DEV_PORT } from "./dev-port.mjs";

for (const port of [3000, DEV_PORT, 3002]) {
  execSync(`node scripts/free-port.mjs ${port}`, { stdio: "inherit" });
}
