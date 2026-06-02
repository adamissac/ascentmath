/**
 * Booking-email composition.
 *
 * Two outputs:
 *   • `text`  - plain-text body (used as fallback + as preview content)
 *   • `html`  - branded HTML body for clients that render markup
 *
 * Kept framework-agnostic so this module can be unit-tested or reused on
 * the edge runtime without pulling in React.
 */

export type BookingPayload = {
  name: string;
  email: string;
  phone?: string;
  mode: "zoom" | "in_person";
  grade?: string;
  topic?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
};

const escapeHtml = (raw: string) =>
  raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const labelMode = (mode: BookingPayload["mode"]) =>
  mode === "zoom" ? "Zoom (online)" : "In-person";

const fmtDate = (iso?: string) => {
  if (!iso) return "-";
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export function renderBookingEmail(p: BookingPayload) {
  const subject = `New booking request - ${p.name}`;

  const text = [
    "New booking request from adamsalphabet.com",
    "",
    `Name:       ${p.name}`,
    `Email:      ${p.email}`,
    `Phone:      ${p.phone || "-"}`,
    `Mode:       ${labelMode(p.mode)}`,
    `Grade:      ${p.grade || "-"}`,
    `Topic:      ${p.topic || "-"}`,
    `Date:       ${fmtDate(p.preferredDate)}`,
    `Time:       ${p.preferredTime || "-"}`,
    "",
    "Notes",
    "─────",
    p.notes?.trim() || "(none)",
    "",
    "-",
    "Adam's Alphabet · adamsalphabet.com",
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
              <p style="margin:0;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;opacity:0.85;">Adam&apos;s Alphabet</p>
              <h1 style="margin:6px 0 0;font-size:22px;line-height:1.25;font-weight:700;">New booking request</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <p style="margin:0 0 18px;font-size:15px;line-height:1.55;color:#5B6068;">
                You have a new tutoring request from <strong style="color:#1B1D21;">${escapeHtml(
                  p.name
                )}</strong>. Reply to this email to confirm a time.
              </p>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;font-size:14px;line-height:1.5;">
                ${row("Name", escapeHtml(p.name))}
                ${row(
                  "Email",
                  `<a href="mailto:${escapeHtml(p.email)}" style="color:#1F3CB1;text-decoration:none;">${escapeHtml(
                    p.email
                  )}</a>`
                )}
                ${row("Phone", p.phone ? escapeHtml(p.phone) : "-")}
                ${row("Mode", labelMode(p.mode))}
                ${row("Grade", p.grade ? escapeHtml(p.grade) : "-")}
                ${row("Topic", p.topic ? escapeHtml(p.topic) : "-")}
                ${row("Date", escapeHtml(fmtDate(p.preferredDate)))}
                ${row("Time", p.preferredTime ? escapeHtml(p.preferredTime) : "-")}
              </table>

              <h2 style="margin:24px 0 8px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#1F3CB1;font-weight:700;">Notes</h2>
              <div style="background:#F5F3EE;border:1px solid #E6E2DA;border-radius:10px;padding:14px 16px;font-size:14px;line-height:1.6;white-space:pre-wrap;color:#1B1D21;">${
                p.notes?.trim() ? escapeHtml(p.notes) : '<span style="color:#8A8F98;">(none)</span>'
              }</div>

              <p style="margin:24px 0 0;font-size:12px;color:#8A8F98;">
                Submitted ${new Date().toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })} via adamsalphabet.com
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
