# Internal Data Handling & Child-Safety Runbook (Ascent Math)

**Audience**: Internal only (Adam Issac & Alan Mozhoor).  
**Last updated**: 2026-07-09  
**Do not link publicly.** This file exists so we can actually follow what our Privacy Policy promises.

## 1) Where personal data lives

### Booking/contact inquiries (primary)
- **What it is**: Adult requester name/email + optional school/grade + message (may include student details).
- **How it arrives**: Website form → `POST /api/contact` → Resend email delivery.
- **Where it ends up**:
  - **Adam Gmail**: `adamissac08@gmail.com` (inbox + sent/replies)
  - **Alan Gmail**: `alanmozhoor@gmail.com` (cc; inbox + sent/replies)
  - **Resend dashboard**: sent-email logs and email content (provider retention is controlled by Resend).
- **Who can access it**: Adam + Alan only.

### Website analytics (aggregate)
- **Provider**: Vercel Analytics (anonymized/aggregate).
- **What it is**: aggregate site performance and page-view metrics (not a contact list).

### Logs (should contain no PII)
- **Provider**: Vercel logs for API requests.
- **What should be logged**: request metadata (path, status, duration) and security events (rate limits), not form contents.

### Study-path progress (device-only)
- **What it is**: progress checkmarks stored in browser local storage.
- **Where it lives**: user device only (no server storage).

## 2) Access control checklist (P0)

These are “kid business” basics. Do them now.

- **Gmail 2FA**: confirm 2-factor auth is enabled for both Gmail accounts.
- **Resend 2FA**: enable 2FA if available; restrict access to Adam + Alan.
- **Vercel 2FA**: enable 2FA and use least-privilege access.
- **Cloudflare 2FA**: enable 2FA for Turnstile and DNS controls.
- **Domain registrar 2FA**: enable 2FA; protect from hijack.

## 3) Deletion SOP (privacy requests)

Our policy promises that a parent/guardian can request deletion. Here is how to actually do it.

### When a deletion request arrives
1. **Confirm identity**:
   - Reply and ask the requester to confirm the email address used on the inquiry, and (if applicable) the student name/grade mentioned.
   - Keep the response minimal: do not ask for sensitive identifiers.
2. **Search and delete in both Gmail inboxes**:
   - Search for the requester’s email address.
   - Search for common subject lines (e.g., “New Student Tutoring inquiry”).
   - Delete the entire conversation thread(s).
   - **Empty Trash** (Gmail keeps Trash for 30 days unless emptied).
3. **Resend dashboard cleanup**:
   - Search the sent-email log for the matching recipient/inquiry (if the UI supports it).
   - Delete the message/log entry if Resend allows deletion.
   - If deletion isn’t supported, note that it may remain per provider retention.
4. **Confirm completion**:
   - Reply to requester confirming deletion actions taken and what systems may still retain provider logs.
5. **Timing**:
   - Respond within **30 days** (sooner is better).

## 4) Incident response mini-plan

If you suspect an account compromise or data exposure:
1. **Contain**: change passwords, revoke sessions, rotate API keys/secrets (Resend, Turnstile, Upstash if used).
2. **Assess**: what data could have been accessed (inquiries in Gmail, Resend logs, admin dashboards).
3. **Recover**: restore access, verify 2FA, remove unknown devices, audit forwarding rules in Gmail.
4. **Notify**: if personal information was affected, notify impacted users promptly consistent with applicable law.
5. **Document**: write a short timeline and actions taken.

## 5) Retention (operational)

- **Default**: keep inquiry threads only as long as needed to respond/provide tutoring and maintain basic records.
- **Yearly cleanup**: once per year, search for stale inquiries (e.g., older than 12 months) and delete them unless there is an active relationship.

## 6) Child-safety communication policy (operational)

These are house rules. Write them down so we can follow them consistently, especially for school partnerships.

- **Under 13**:
  - Booking/contact requests must be submitted by a parent/guardian/educator.
  - Scheduling and logistics go through the parent/guardian.
- **Sessions with minors**:
  - Encourage parent awareness for all minors; for younger students, a parent nearby is recommended.
  - No private social-media DMs with minor students.
  - Use official channels (email/phone) and keep communications professional.
- **Recording**:
  - Do not record sessions by default.
  - If recording is ever requested, obtain written parent consent first. (See `docs/drafts/parent-enrollment-form.md`.)

