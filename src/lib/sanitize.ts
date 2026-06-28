/** Strip HTML tags from user input before logging or plain-text use. */
export function stripHtml(raw: string): string {
  return raw.replace(/<[^>]*>/g, "").trim();
}

/** Remove control characters that could corrupt logs. */
export function sanitizeForLog(raw: string, maxLen = 200): string {
  return stripHtml(raw)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .slice(0, maxLen);
}
