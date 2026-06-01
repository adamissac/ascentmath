"use client";

import { useState } from "react";
import ComingSoonDialog from "./ComingSoonDialog";
import { isAuthComingSoon } from "../lib/auth-coming-soon";

export function useAuthComingSoonGate() {
  const comingSoon = isAuthComingSoon();
  const [dialogOpen, setDialogOpen] = useState(true);

  function blockAction() {
    if (!comingSoon) return false;
    setDialogOpen(true);
    return true;
  }

  return { comingSoon, dialogOpen, setDialogOpen, blockAction };
}

export function AuthComingSoonNotice({
  dialogOpen,
  onOpenDialog,
  onCloseDialog,
}: {
  dialogOpen: boolean;
  onOpenDialog: () => void;
  onCloseDialog: () => void;
}) {
  if (!isAuthComingSoon()) return null;

  return (
    <>
      <ComingSoonDialog open={dialogOpen} onClose={onCloseDialog} />
      <div
        role="status"
        className="mb-5 rounded-lg p-4 border border-[var(--color-brand-200)] bg-[var(--color-brand-50)]"
      >
        <p className="small font-semibold text-[var(--color-brand-700)]">
          Accounts coming soon
        </p>
        <p className="caption text-[var(--color-ink-muted)] mt-1 leading-relaxed">
          Sign-up isn&apos;t open yet. Every unit, video, and quiz works without an account.
        </p>
        <button
          type="button"
          onClick={onOpenDialog}
          className="mt-3 text-sm font-semibold text-[var(--color-brand-600)] hover:text-[var(--color-brand-700)] underline-offset-2 hover:underline"
        >
          Read more
        </button>
      </div>
    </>
  );
}

export function authFormComingSoonAttrs(comingSoon: boolean) {
  return {
    className: comingSoon ? "grid gap-5 opacity-50 pointer-events-none select-none" : "grid gap-5",
    "aria-hidden": comingSoon ? (true as const) : undefined,
  };
}
