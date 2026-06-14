"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { useAuth } from "./AuthProvider";

/**
 * Wrap any client page that requires an authenticated user. While auth
 * state resolves we render a calm loading placeholder; if the resolution
 * shows no user we redirect. A visitor who was never signed in is sent to
 * /signup (preserving the original destination as `?next=`); a user who
 * signed out or whose session ended while on the page is sent home - this
 * also keeps the sign-out redirect deterministic instead of racing the
 * page's own `router.replace("/")`.
 */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading, configured } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const wasAuthedRef = useRef(false);

  useEffect(() => {
    if (user) wasAuthedRef.current = true;
  }, [user]);

  useEffect(() => {
    if (!configured) return; // surface a setup banner instead of redirecting
    if (loading) return;
    if (!user) {
      if (wasAuthedRef.current) {
        router.replace("/");
        return;
      }
      const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
      router.replace(`/signup${next}`);
    }
  }, [configured, loading, user, router, pathname]);

  if (!configured) {
    return <FirebaseNotConfiguredNotice />;
  }

  if (loading || !user) {
    return <AuthLoading />;
  }

  return <>{children}</>;
}

function AuthLoading() {
  return (
    <div className="min-h-[60vh] grid place-items-center page-x">
      <div className="flex items-center gap-3 text-[var(--color-ink-muted)]">
        <Spinner />
        <span className="small">Checking your session…</span>
      </div>
    </div>
  );
}

function FirebaseNotConfiguredNotice() {
  return (
    <div className="min-h-[60vh] grid place-items-center page-x">
      <div className="max-w-md w-full card p-6">
        <p className="caption font-semibold tracking-wider uppercase text-[var(--color-warning)]">
          Setup needed
        </p>
        <h2 className="font-display font-bold text-xl mt-2">
          Firebase isn&apos;t configured yet
        </h2>
        <p className="small text-[var(--color-ink-muted)] mt-3 leading-relaxed">
          Accounts and the dashboard are powered by Firebase Authentication.
          Copy <code className="text-[var(--color-ink)]">.env.example</code> to{" "}
          <code className="text-[var(--color-ink)]">.env.local</code>, paste in
          your Firebase web config, and restart the dev server. Full
          step-by-step instructions are in the README.
        </p>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden
      className="animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
