"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { FirebaseError } from "firebase/app";
import AuthShell from "../../components/AuthShell";
import { useAuth } from "../../components/AuthProvider";
import RedirectIfAuthed from "../../components/RedirectIfAuthed";
import { Alert, AuthInput, SubmitButton } from "../../components/AuthFormParts";
import {
  AuthComingSoonNotice,
  authFormComingSoonAttrs,
  useAuthComingSoonGate,
} from "../../components/AuthComingSoonGate";
import { friendlyAuthError } from "../../lib/auth-errors";

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={null}>
      <RedirectIfAuthed>
        <ForgotPasswordForm />
      </RedirectIfAuthed>
    </Suspense>
  );
}

function ForgotPasswordForm() {
  const { sendPasswordReset, configured } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | undefined>();
  const { comingSoon, dialogOpen, setDialogOpen, blockAction } = useAuthComingSoonGate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || blockAction()) return;
    setError(null);
    setFieldError(undefined);

    if (!email.trim()) return setFieldError("Enter your email.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setFieldError("That email looks off.");

    if (!configured) {
      setError(
        "Auth is not configured yet. Add your Firebase keys to .env.local and restart the dev server."
      );
      return;
    }

    setSubmitting(true);
    try {
      await sendPasswordReset(email.trim());
      setSent(true);
    } catch (err) {
      if (err instanceof FirebaseError && err.code === "auth/user-not-found") {
        setSent(true);
        return;
      }
      setError(friendlyAuthError(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Password reset"
      title={sent ? "Check your inbox." : "Reset your password."}
      subtitle={
        sent
          ? "If an account uses that email, we just sent a reset link. The email may take a minute to land. Check your spam folder too."
          : "Enter the email you used to sign up and we'll send a reset link."
      }
      footer={
        <p>
          Remembered it?{" "}
          <Link href="/" className="link font-semibold">
            Back to home
          </Link>
        </p>
      }
    >
      <AuthComingSoonNotice
        dialogOpen={dialogOpen}
        onOpenDialog={() => setDialogOpen(true)}
        onCloseDialog={() => setDialogOpen(false)}
      />

      {sent ? (
        <Alert tone="success" title="Reset link sent">
          If an account uses{" "}
          <span className="font-medium text-[var(--color-ink)]">{email}</span>, we sent a
          password-reset email. Follow the link in that message to set a new password.
        </Alert>
      ) : (
        <form onSubmit={onSubmit} noValidate {...authFormComingSoonAttrs(comingSoon)}>
          <AuthInput
            id="email"
            label="Email"
            type="email"
            required
            value={email}
            onChange={setEmail}
            error={fieldError}
            placeholder="you@example.com"
            autoComplete="email"
          />

          {error && <Alert title="Couldn't send reset email">{error}</Alert>}

          <SubmitButton loading={submitting}>Send reset link</SubmitButton>
        </form>
      )}
    </AuthShell>
  );
}
