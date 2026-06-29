import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logRequest, logSecurityEvent } from "./lib/request-log";
import { ALLOWED_ORIGINS } from "./lib/site-url";
import { clientIp } from "./lib/client-ip";

const MAX_BODY_BYTES = 1_048_576; // 1 MB

const API_METHODS: Record<string, Set<string>> = {
  "/api/contact": new Set(["GET", "POST", "OPTIONS"]),
};

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true;
  return (ALLOWED_ORIGINS as readonly string[]).includes(origin);
}

function corsHeaders(origin: string | null): HeadersInit {
  const allowed = origin && isAllowedOrigin(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export async function middleware(req: NextRequest) {
  const start = Date.now();
  const { pathname } = req.nextUrl;
  const method = req.method;
  const ip = clientIp(req);
  const userAgent = req.headers.get("user-agent") || "";
  const origin = req.headers.get("origin");

  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const allowedMethods = API_METHODS[pathname];
  if (allowedMethods && !allowedMethods.has(method)) {
    logSecurityEvent("method_not_allowed", { path: pathname, method, ip });
    return NextResponse.json(
      { ok: false, error: "Method not allowed." },
      { status: 405, headers: corsHeaders(origin) }
    );
  }

  if (method === "OPTIONS") {
    if (origin && !isAllowedOrigin(origin)) {
      return new NextResponse(null, { status: 403 });
    }
    return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (origin && !isAllowedOrigin(origin)) {
    logSecurityEvent("cors_rejected", { path: pathname, origin, ip });
    return NextResponse.json(
      { ok: false, error: "Forbidden." },
      { status: 403, headers: corsHeaders(origin) }
    );
  }

  if (method === "POST") {
    const contentLength = req.headers.get("content-length");
    if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
      logSecurityEvent("payload_too_large", { path: pathname, ip });
      return NextResponse.json(
        { ok: false, error: "Request body too large." },
        { status: 413, headers: corsHeaders(origin) }
      );
    }
  }

  const response = NextResponse.next({
    headers: corsHeaders(origin),
  });

  logRequest({
    ip,
    path: pathname,
    method,
    status: response.status,
    durationMs: Date.now() - start,
    userAgent,
  });

  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
