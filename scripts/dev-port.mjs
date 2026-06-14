/** Local dev/preview — override with DEV_PORT / DEV_HOST in the environment. */
export const DEV_PORT = Number(process.env.DEV_PORT || 3000);
export const DEV_HOST = process.env.DEV_HOST || "127.0.0.1";
export const DEV_URL = `http://${DEV_HOST}:${DEV_PORT}/`;
