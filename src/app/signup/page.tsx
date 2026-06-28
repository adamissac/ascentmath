"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import AuthShell from "../../components/AuthShell";
import { useAuth } from "../../components/AuthProvider";
import RedirectIfAuthed from "../../components/RedirectIfAuthed";
import {
  AuthInput,
  Alert,
  GoogleButton,
  OrDivider,
  SubmitButton,
} from "../../components/AuthFormParts";
import FirebaseSetupNotice from "../../components/FirebaseSetupNotice";
import {
  AuthComingSoonNotice,
  authFormComingSoonAttrs,
  useAuthComingSoonGate,
} from "../../components/AuthComingSoonGate";
import { authNotConfiguredMessage } from "../../lib/auth-google";
import { friendlyAuthError } from "../../lib/auth-errors";

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <RedirectIfAuthed>
        <SignupForm />
      </RedirectIfAuthed>
    </Suspense>
  );
}

function SignupForm() {
  const { signUp, signInWithGoogle, configured, bootstrapError, clearBootstrapError } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next");
  const target = next && next.startsWith("/") ? next : "/dashboard";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { comingSoon, dialogOpen, setDialogOpen, blockAction } = useAuthComingSoonGate();

  const strength = useMemo(() => passwordStrength(password), [password]);

  useEffect(() => {
    if (bootstrapError) setError(bootstrapError);
  }, [bootstrapError]);

  function validate() {
    const fe: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) fe.name = "What should we call you?";
    if (!email.trim()) fe.email = "Enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fe.email = "That email looks off.";
    if (!password) fe.password = "Pick a password.";
    else if (password.length < 8) fe.password = "Use at least 8 characters.";
    if (confirm !== password) fe.confirm = "Passwords don't match.";
    setFieldErrors(fe);
    return Object.keys(fe).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (blockAction()) return;
    if (submitting) return;
    setError(null);
    clearBootstrapError();
    if (!validate()) return;
    if (!configured) {
      setError(authNotConfiguredMessage());
      return;
    }

    setSubmitting(true);
    try {
      await signUp({ email: email.trim(), password, displayName: name.trim() });
      router.replace(target);
    } catch (err) {
      setError(friendlyAuthError(err));
      setSubmitting(false);
    }
  }

  async function onGoogle() {
    if (blockAction()) return;
    if (submitting) return;
    setError(null);
    clearBootstrapError();
    if (!configured) {
      setError(authNotConfiguredMessage());
      return;
    }
    setSubmitting(true);
    try {
      await signInWithGoogle(true);
      router.replace(target);
    } catch (err) {
      setError(friendlyAuthError(err));
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Create your account"
      title="Start learning, save your progress."
      subtitle="Accounts are free. Use them to track units, book paid sessions with Adam & Alan, and pick up across devices."
      panelTitle="Math tutoring with Adam & Alan."
      panelSubtitle="Create a free account to book tutoring and save progress on Grades 6-8 self-paced paths."
    >
      <AuthComingSoonNotice
        dialogOpen={dialogOpen}
        onOpenDialog={() => setDialogOpen(true)}
        onCloseDialog={() => setDialogOpen(false)}
      />

      <form onSubmit={onSubmit} noValidate {...authFormComingSoonAttrs(comingSoon)}>
        {!configured && !comingSoon && <FirebaseSetupNotice />}
        <AuthInput
          id="name"
          label="Your name"
          required
          value={name}
          onChange={setName}
          error={fieldErrors.name}
          placeholder="Alex Garcia"
          autoComplete="name"
        />
        <AuthInput
          id="email"
          label="Email"
          type="email"
          required
          value={email}
          onChange={setEmail}
          error={fieldErrors.email}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <div>
          <AuthInput
            id="password"
            label="Password"
            type="password"
            required
            value={password}
            onChange={setPassword}
            error={fieldErrors.password}
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />
          {password && <PasswordStrengthMeter score={strength.score} label={strength.label} />}
        </div>
        <AuthInput
          id="confirm"
          label="Confirm password"
          type="password"
          required
          value={confirm}
          onChange={setConfirm}
          error={fieldErrors.confirm}
          placeholder="Re-type your password"
          autoComplete="new-password"
        />

        {error && <Alert title="Couldn't create your account">{error}</Alert>}

        <SubmitButton loading={submitting}>Create account</SubmitButton>

        <OrDivider />

        <GoogleButton onClick={onGoogle} disabled={submitting} label="Sign up with Google" />

        <p className="caption text-[var(--color-ink-muted)] leading-relaxed">
          By creating an account you agree to our{" "}
          <Link href="/terms" className="link font-semibold">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="link font-semibold">
            Privacy Policy
          </Link>
          . We don&apos;t sell data and there are no ads.
        </p>
      </form>
    </AuthShell>
  );
}

/* -------------------------------------------------------------------- */

function passwordStrength(p: string): { score: number; label: string } {
  if (!p) return { score: 0, label: "" };
  let score = 0;
  if (p.length >= 8) score++;
  if (p.length >= 12) score++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
  if (/\d/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  const label =
    score <= 1 ? "Too weak" : score === 2 ? "Okay" : score === 3 ? "Good" : "Strong";
  return { score: Math.min(score, 4), label };
}

function PasswordStrengthMeter({ score, label }: { score: number; label: string }) {
  const palette = ["#E6E2DA", "#B8261C", "#C58515", "#7E97F0", "#1F3CB1"];
  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="flex-1 grid grid-cols-4 gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="h-1 rounded-full transition-colors"
            style={{ background: i < score ? palette[score] : palette[0] }}
          />
        ))}
      </div>
      <span
        className="caption font-semibold tabular-nums"
        style={{ color: score >= 3 ? "var(--color-success)" : "var(--color-ink-muted)" }}
      >
        {label}
      </span>
    </div>
  );
}
