/** Local dev/preview — override with DEV_PORT / DEV_HOST in the environment. */
export const DEV_PORT = Number(process.env.DEV_PORT || 3000);
/** Interface Next.js binds to (`0.0.0.0` accepts localhost + forwarded ports). */
export const DEV_HOST = process.env.DEV_HOST || "0.0.0.0";
/** Host used for readiness checks (loopback is reliable even when bound to 0.0.0.0). */
export const DEV_CHECK_HOST = process.env.DEV_CHECK_HOST || "127.0.0.1";
export const DEV_URL = `http://${DEV_CHECK_HOST}:${DEV_PORT}/`;
export const DEV_BROWSER_URL = `http://localhost:${DEV_PORT}/`;
