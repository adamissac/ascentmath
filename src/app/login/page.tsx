"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
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

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <RedirectIfAuthed>
        <LoginForm />
      </RedirectIfAuthed>
    </Suspense>
  );
}

function LoginForm() {
  const { signIn, signInWithGoogle, configured, bootstrapError, clearBootstrapError } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const { comingSoon, dialogOpen, setDialogOpen, blockAction } = useAuthComingSoonGate();

  const target = next && next.startsWith("/") ? next : "/dashboard";

  useEffect(() => {
    if (bootstrapError) setError(bootstrapError);
  }, [bootstrapError]);

  function validate() {
    const fe: typeof fieldErrors = {};
    if (!email.trim()) fe.email = "Enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fe.email = "That email looks off.";
    if (!password) fe.password = "Enter your password.";
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
      await signIn({ email: email.trim(), password, remember });
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
      await signInWithGoogle(remember);
      router.replace(target);
    } catch (err) {
      setError(friendlyAuthError(err));
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Log in to your account."
      subtitle="Pick up where you left off and book paid 1-on-1 sessions with Adam & Alan."
      panelTitle="Pick up right where you left off."
      panelSubtitle="Accounts are free. Book paid tutoring with Adam & Alan anytime; sign in to save progress on self-paced study paths."
      footer={
        <p>
          New here?{" "}
          <Link href={`/signup${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="link font-semibold">
            Create an account
          </Link>
        </p>
      }
    >
      <AuthComingSoonNotice
        dialogOpen={dialogOpen}
        onOpenDialog={() => setDialogOpen(true)}
        onCloseDialog={() => setDialogOpen(false)}
      />

      <form onSubmit={onSubmit} noValidate {...authFormComingSoonAttrs(comingSoon)}>
        {!configured && !comingSoon && <FirebaseSetupNotice />}
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
        <AuthInput
          id="password"
          label="Password"
          type="password"
          required
          value={password}
          onChange={setPassword}
          error={fieldErrors.password}
          placeholder="••••••••"
          autoComplete="current-password"
          rightHint={
            <Link href="/forgot-password" className="link font-medium text-xs">
              Forgot password?
            </Link>
          }
        />

        <label className="flex items-center gap-2 text-sm text-[var(--color-ink-muted)] select-none">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="accent-[var(--color-brand-500)] w-4 h-4"
          />
          Remember me on this device
        </label>

        {error && <Alert title="Couldn't sign in">{error}</Alert>}

        <SubmitButton loading={submitting}>Log in</SubmitButton>

        <OrDivider />

        <GoogleButton onClick={onGoogle} disabled={submitting} label="Continue with Google" />
      </form>
    </AuthShell>
  );
}
