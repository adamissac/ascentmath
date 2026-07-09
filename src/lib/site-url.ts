/** Canonical production origin — always use www. */
export const SITE_URL = "https://www.joinascentmath.com";

/** Allowed origins for CORS (apex + www, plus legacy domain during transition). */
export const ALLOWED_ORIGINS = [
  SITE_URL,
  "https://joinascentmath.com",
  "https://www.adamsalphabet.com",
  "https://adamsalphabet.com",
] as const;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function siteHost(): string {
  return new URL(SITE_URL).host;
}
