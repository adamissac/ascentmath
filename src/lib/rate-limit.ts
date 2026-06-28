import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export type RateLimitResult = {
  ok: boolean;
  remaining?: number;
  retryAfter?: number;
  limiter: string;
};

const buckets = new Map<string, { count: number; resetAt: number }>();

function memoryRateLimit(
  key: string,
  max: number,
  windowMs: number,
  limiter: string
): RateLimitResult {
  const now = Date.now();
  const bucketKey = `${limiter}:${key}`;
  const b = buckets.get(bucketKey);
  if (!b || b.resetAt < now) {
    buckets.set(bucketKey, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: max - 1, limiter };
  }
  if (b.count >= max) {
    return {
      ok: false,
      retryAfter: Math.ceil((b.resetAt - now) / 1000),
      limiter,
    };
  }
  b.count += 1;
  return { ok: true, remaining: max - b.count, limiter };
}

function createUpstashLimiter(tokens: number, window: `${number} ${"s" | "m" | "h" | "d"}`, prefix: string) {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;

  const redis = new Redis({ url, token });
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(tokens, window),
    prefix: `ascent:${prefix}`,
    analytics: true,
  });
}

const burstLimiter = createUpstashLimiter(5, "10 s", "burst");
const contactLimiter = createUpstashLimiter(30, "1 m", "contact");
const tutoringLimiter = createUpstashLimiter(10, "1 m", "tutoring");
const apiLimiter = createUpstashLimiter(100, "1 m", "api");
const aiLimiter = createUpstashLimiter(5, "1 m", "ai");

async function checkUpstash(
  limiter: Ratelimit | null,
  key: string,
  fallbackMax: number,
  fallbackWindowMs: number,
  limiterName: string
): Promise<RateLimitResult> {
  if (!limiter) {
    if (process.env.NODE_ENV === "production") {
      console.warn(`[rate-limit] Upstash not configured; using in-memory fallback for ${limiterName}`);
    }
    return memoryRateLimit(key, fallbackMax, fallbackWindowMs, limiterName);
  }

  const { success, remaining, reset } = await limiter.limit(key);
  if (!success) {
    const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
    return { ok: false, retryAfter, limiter: limiterName };
  }
  return { ok: true, remaining, limiter: limiterName };
}

export async function rateLimitBurst(ip: string): Promise<RateLimitResult> {
  return checkUpstash(burstLimiter, ip, 5, 10_000, "burst");
}

export async function rateLimitContact(ip: string): Promise<RateLimitResult> {
  return checkUpstash(contactLimiter, ip, 30, 60_000, "contact");
}

export async function rateLimitTutoring(ip: string): Promise<RateLimitResult> {
  return checkUpstash(tutoringLimiter, ip, 10, 60_000, "tutoring");
}

export async function rateLimitApi(ip: string): Promise<RateLimitResult> {
  return checkUpstash(apiLimiter, ip, 100, 60_000, "api");
}

/** Scaffold for future AI endpoints. */
export async function rateLimitAi(ip: string): Promise<RateLimitResult> {
  return checkUpstash(aiLimiter, ip, 5, 60_000, "ai");
}

export function rateLimitResponse(retryAfter: number) {
  return {
    ok: false as const,
    error: "Too many requests. Please wait a moment and try again.",
    retryAfter,
  };
}
