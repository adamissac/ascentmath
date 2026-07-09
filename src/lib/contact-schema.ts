import { z } from "zod";

export const MIN_FORM_SUBMIT_MS = 3000;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address.")
    .max(200),
  school: z.string().trim().max(160).optional().or(z.literal("")),
  grade: z.string().trim().max(60).optional().or(z.literal("")),
  sessionType: z.enum(["tutoring", "demo", "partnership", "general"]),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a bit more (at least 10 characters).")
    .max(2000),
  adultAttestation: z.literal(true, {
    message: "Please confirm you are 18+ and agree to the Terms and Privacy Policy.",
  }),
  website: z.string().optional(),
  formLoadedAt: z.number().int().positive().optional(),
  turnstileToken: z.string().optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export function validateMinSubmitTime(formLoadedAt: number | undefined): string | null {
  if (!formLoadedAt) return "Invalid submission.";
  const elapsed = Date.now() - formLoadedAt;
  if (elapsed < MIN_FORM_SUBMIT_MS) {
    return "Please take a moment to review your message before submitting.";
  }
  return null;
}
