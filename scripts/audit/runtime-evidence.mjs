import { chromium } from "playwright";
import fs from "node:fs/promises";

const ORIGIN = process.env.AUDIT_ORIGIN || "http://127.0.0.1:3000";

const PAGES = [
  { name: "home", path: "/" },
  { name: "grade-6", path: "/mathematics/grade-6" },
  { name: "topic", path: "/mathematics/grade-6/unit-1/factors-multiples-gcf-lcm" },
  { name: "book", path: "/#book-session" },
];

function hostname(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  /** @type {Set<string>} */
  const requestHosts = new Set();
  /** @type {Set<string>} */
  const thirdPartyHosts = new Set();

  page.on("request", (req) => {
    const h = hostname(req.url());
    if (!h) return;
    requestHosts.add(h);
    if (h !== "127.0.0.1" && h !== "localhost") thirdPartyHosts.add(h);
  });

  /** @type {Record<string, any>} */
  const results = {};

  for (const p of PAGES) {
    const url = `${ORIGIN}${p.path}`;
    await page.goto(url, { waitUntil: "networkidle" });

    // Record a representative progress key by emulating the real persisted shape.
    // (The UI writes keys like `aa.progress.<unitId>` once a user marks topics complete.)
    if (p.name === "topic") {
      await page.evaluate(() => {
        try {
          localStorage.setItem(
            "aa.progress.unit-1",
            JSON.stringify({ unitId: "unit-1", completed: { "u1-t1": true } })
          );
        } catch {
          /* ignore */
        }
      });
    }

    const cookies = await context.cookies();
    const storage = await page.evaluate(() => {
      const lsKeys = [];
      const ssKeys = [];
      for (let i = 0; i < localStorage.length; i++) lsKeys.push(localStorage.key(i));
      for (let i = 0; i < sessionStorage.length; i++) ssKeys.push(sessionStorage.key(i));
      return {
        localStorageKeys: lsKeys.filter(Boolean).sort(),
        sessionStorageKeys: ssKeys.filter(Boolean).sort(),
        documentCookie: document.cookie || "",
      };
    });

    results[p.name] = {
      url,
      cookies: cookies.map((c) => ({
        name: c.name,
        domain: c.domain,
        path: c.path,
        httpOnly: c.httpOnly,
        secure: c.secure,
        sameSite: c.sameSite,
        expires: c.expires,
      })),
      storage,
    };
  }

  const out = {
    origin: ORIGIN,
    timestamp: new Date().toISOString(),
    requestHosts: Array.from(requestHosts).sort(),
    thirdPartyHosts: Array.from(thirdPartyHosts).sort(),
    pages: results,
  };

  await fs.mkdir("artifacts", { recursive: true });
  await fs.writeFile("artifacts/runtime-evidence.json", JSON.stringify(out, null, 2), "utf8");
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

