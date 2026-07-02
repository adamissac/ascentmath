const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export function isTurnstileConfigured(): boolean {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  return Boolean(secret && secret.length > 10);
}

export function isTurnstileClientConfigured(): boolean {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  return Boolean(siteKey && siteKey.length > 10);
}

export async function verifyTurnstileToken(
  token: string | undefined,
  remoteIp: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isTurnstileConfigured()) {
    if (process.env.NODE_ENV === "production") {
      console.warn("[turnstile] TURNSTILE_SECRET_KEY missing — skipping CAPTCHA check");
    }
    return { ok: true };
  }

  if (!token?.trim()) {
    return { ok: false, error: "Please complete the security check." };
  }

  const secret = process.env.TURNSTILE_SECRET_KEY!.trim();
  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: remoteIp === "unknown" ? "" : remoteIp,
  });

  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };

    if (data.success) return { ok: true };

    console.warn("[turnstile] verification failed:", data["error-codes"]);
    return { ok: false, error: "Security check failed. Please try again." };
  } catch (err) {
    console.error("[turnstile] siteverify error:", err);
    return { ok: false, error: "Security check could not be completed. Please try again." };
  }
}
