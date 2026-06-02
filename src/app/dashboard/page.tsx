"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Container from "../../components/Container";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import ProtectedRoute from "../../components/ProtectedRoute";
import MathBackdrop from "../../components/MathBackdrop";
import ColorBand from "../../components/ColorBand";
import Reveal from "../../components/Reveal";
import { useAuth } from "../../components/AuthProvider";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

function Dashboard() {
  const { user, profile, signOut } = useAuth();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  if (!user) return null; // ProtectedRoute already handles the redirect

  const displayName =
    profile?.displayName?.trim() ||
    user.displayName?.trim() ||
    (user.email ? user.email.split("@")[0] : "there");
  const firstName = displayName.split(" ")[0];
  const initial = (firstName[0] || "?").toUpperCase();

  const createdAt =
    profile?.createdAt ||
    (user.metadata.creationTime ? new Date(user.metadata.creationTime).toISOString() : null);
  const lastSeen = user.metadata.lastSignInTime
    ? new Date(user.metadata.lastSignInTime).toISOString()
    : null;

  async function onSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await signOut();
      router.replace("/");
    } catch {
      setSigningOut(false);
    }
  }

  return (
    <>
    <section className="relative overflow-hidden bg-[var(--color-bg)]">
      <MathBackdrop variant="paper" density="medium" contentSafe />
      <Container size="xl" className="relative py-12 sm:py-16 lg:py-20">
        {/* --- Hero / welcome --- */}
        <Reveal>
        <div className="grid grid-cols-12 gap-6 items-center mb-10">
          <div className="col-span-12 sm:col-span-8 flex items-center gap-4">
            <span
              aria-hidden
              className="w-14 h-14 rounded-full bg-[var(--color-brand-500)] text-white grid place-items-center font-display font-bold text-xl"
            >
              {initial}
            </span>
            <div>
              <p className="eyebrow">Account · {profile?.role ?? "student"}</p>
              <h1 className="font-display font-bold text-2xl sm:text-3xl leading-[1.2] tracking-[-0.02em] mt-1">
                Welcome back, {firstName}.
              </h1>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-4 sm:text-right">
            <button
              type="button"
              onClick={onSignOut}
              disabled={signingOut}
              className="btn btn-outline btn-sm w-full sm:w-auto"
            >
              {signingOut ? "Signing out…" : "Sign out"}
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
        </Reveal>

        {/* --- Account details + quick actions --- */}
        <Reveal delay={80}>
        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          <Card className="col-span-12 lg:col-span-8 p-6 sm:p-8 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Account details</p>
                <h2 className="font-display font-bold text-xl mt-2">Your profile</h2>
              </div>
              <Badge tone={user.emailVerified ? "brand" : "neutral"}>
                {user.emailVerified ? "Verified" : "Unverified"}
              </Badge>
            </div>

            <dl className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-5">
              <DetailRow label="Name" value={displayName} />
              <DetailRow label="Email" value={user.email || "-"} mono />
              <DetailRow
                label="User ID"
                value={shorten(user.uid)}
                hint={user.uid}
                mono
              />
              <DetailRow
                label="Account created"
                value={fmtDate(createdAt)}
              />
              <DetailRow
                label="Last sign-in"
                value={fmtDate(lastSeen, true)}
              />
              <DetailRow
                label="Role"
                value={titleCase(profile?.role ?? "student")}
              />
            </dl>

            <hr className="divider my-7" />

            <p className="caption text-[var(--color-ink-muted)] leading-relaxed">
              Need to change your name, email, or password? Use the &ldquo;Forgot
              password&rdquo; flow to reset, or contact Adam directly - full
              account-management UI is on the roadmap.
            </p>
          </Card>

          <div className="col-span-12 lg:col-span-4 grid gap-6 lg:pl-4 xl:pl-6 lg:border-l lg:border-[var(--color-border)]">
            <Card className="p-6">
              <p className="eyebrow">Quick actions</p>
              <div className="mt-4 grid gap-2">
                <Link href="/mathematics" className="btn btn-primary btn-sm justify-between">
                  Continue learning <span aria-hidden>→</span>
                </Link>
                <Link href="/book" className="btn btn-outline btn-sm justify-between">
                  Book a free 1-on-1 <span aria-hidden>→</span>
                </Link>
                <Link href="/about" className="btn btn-ghost btn-sm justify-between">
                  About Adam <span aria-hidden>→</span>
                </Link>
              </div>
            </Card>

            <Card className="p-6 bg-[var(--color-brand-50)] border-[var(--color-brand-100)]">
              <p className="eyebrow">Tip</p>
              <p className="small text-[var(--color-ink)] mt-2 leading-relaxed">
                Keep this tab open while you study. Your progress through each
                unit will save automatically on every device you&apos;re signed
                in on.
              </p>
            </Card>
          </div>
        </div>
        </Reveal>
      </Container>
    </section>

    <ColorBand variant="dark" size="sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="caption font-semibold tracking-wider uppercase text-[var(--color-brand-300)]">Your sessions</p>
          <h2 className="font-display font-bold text-xl sm:text-2xl mt-1 text-white">Book a free 1-on-1 with Adam</h2>
          <p className="small text-[#C8C9CC] mt-2 max-w-lg">Bring a topic from any unit - Zoom or in-person in the Atlanta area.</p>
        </div>
        <Link href="/book" className="btn btn-lg bg-white text-[var(--color-brand-700)] hover:bg-white/90 shrink-0 w-full sm:w-auto">
          Book a session →
        </Link>
      </div>
    </ColorBand>
    </>
  );
}

/* -------------------------------------------------------------------- */

function DetailRow({
  label,
  value,
  hint,
  mono,
}: {
  label: string;
  value: string;
  hint?: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="caption uppercase tracking-wider text-[var(--color-ink-soft)] font-semibold">
        {label}
      </dt>
      <dd
        title={hint}
        className={`mt-1 font-semibold text-[var(--color-ink)] break-all ${
          mono ? "font-mono text-sm" : "text-base"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function shorten(uid: string) {
  if (uid.length <= 14) return uid;
  return `${uid.slice(0, 8)}…${uid.slice(-4)}`;
}

function fmtDate(iso: string | null, withTime = false): string {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
  });
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
