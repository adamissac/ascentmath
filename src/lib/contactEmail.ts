/**
 * Contact-email composition for the "Book a Session" form.
 *
 * Two outputs:
 *   • `text`  - plain-text body (used as fallback + as preview content)
 *   • `html`  - branded HTML body for clients that render markup
 *
 * Kept framework-agnostic so this module can be unit-tested or reused on
 * the edge runtime without pulling in React.
 */

import { SITE_BRAND_NAME } from "./site-brand";
import { absoluteUrl, siteHost } from "./site-url";

export type SessionType = "tutoring" | "demo" | "partnership" | "general";

export const SESSION_TYPE_LABELS: Record<SessionType, string> = {
  tutoring: "Student Tutoring",
  demo: "Class Demo",
  partnership: "School Partnership",
  general: "General Inquiry",
};

export type ContactPayload = {
  name: string;
  email: string;
  school?: string;
  grade?: string;
  sessionType: SessionType;
  message: string;
};

export const escapeHtml = (raw: string) =>
  raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export function renderContactEmail(p: ContactPayload) {
  const typeLabel = SESSION_TYPE_LABELS[p.sessionType];
  const subject = `New ${typeLabel} inquiry — ${p.name}`;
  const siteLink = absoluteUrl("/");

  const text = [
    `New booking request from ${siteHost()}`,
    "",
    `Name:       ${p.name}`,
    `Email:      ${p.email}`,
    `School:     ${p.school || "-"}`,
    `Grade:      ${p.grade || "-"}`,
    `Type:       ${typeLabel}`,
    "",
    "Message",
    "───────",
    p.message.trim(),
    "",
    "-",
    `${SITE_BRAND_NAME} · ${siteLink}`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#F5F3EE;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1B1D21;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F5F3EE;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;background:#FFFFFF;border:1px solid #E6E2DA;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:24px 28px;background:#1F3CB1;color:#FFFFFF;">
              <p style="margin:0;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;opacity:0.85;">${escapeHtml(SITE_BRAND_NAME)}</p>
              <h1 style="margin:6px 0 0;font-size:22px;line-height:1.25;font-weight:700;">New booking request</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <p style="margin:0 0 18px;font-size:15px;line-height:1.55;color:#5B6068;">
                You have a new <strong style="color:#1B1D21;">${escapeHtml(
                  typeLabel
                )}</strong> inquiry from <strong style="color:#1B1D21;">${escapeHtml(
                  p.name
                )}</strong>. Reply to this email to respond directly.
              </p>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;font-size:14px;line-height:1.5;">
                ${row("Name", escapeHtml(p.name))}
                ${row("Email", escapeHtml(p.email))}
                ${row("School", p.school ? escapeHtml(p.school) : "-")}
                ${row("Grade", p.grade ? escapeHtml(p.grade) : "-")}
                ${row("Type", escapeHtml(typeLabel))}
              </table>

              <h2 style="margin:24px 0 8px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#1F3CB1;font-weight:700;">Message</h2>
              <div style="background:#F5F3EE;border:1px solid #E6E2DA;border-radius:10px;padding:14px 16px;font-size:14px;line-height:1.6;white-space:pre-wrap;color:#1B1D21;">${escapeHtml(
                p.message
              )}</div>

              <p style="margin:24px 0 0;font-size:12px;color:#8A8F98;">
                Submitted ${new Date().toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })} via ${siteHost()}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:6px 0;width:88px;color:#8A8F98;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;vertical-align:top;">${label}</td>
      <td style="padding:6px 0 6px 12px;color:#1B1D21;font-weight:500;">${value}</td>
    </tr>
  `;
}
