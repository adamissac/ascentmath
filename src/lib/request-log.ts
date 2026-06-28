import { sanitizeForLog } from "./sanitize";

export type RequestLogEntry = {
  ip: string;
  path: string;
  method: string;
  status: number;
  durationMs: number;
  userAgent: string;
};

export function logRequest(entry: RequestLogEntry): void {
  const safe = {
    ip: sanitizeForLog(entry.ip, 45),
    path: sanitizeForLog(entry.path, 120),
    method: entry.method,
    status: entry.status,
    durationMs: Math.round(entry.durationMs),
    userAgent: sanitizeForLog(entry.userAgent, 160),
  };
  console.info(JSON.stringify({ type: "request", ...safe }));
}

export function logSecurityEvent(
  event: string,
  details: Record<string, string | number | boolean>
): void {
  console.warn(JSON.stringify({ type: "security", event, ...details }));
}
