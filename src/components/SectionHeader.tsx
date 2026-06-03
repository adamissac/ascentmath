"use client";

import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  actions?: ReactNode;
  /** Light text for dark / brand bands */
  dark?: boolean;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  actions,
  dark = false,
}: Props) {
  const isCenter = align === "center";
  return (
    <header className={isCenter ? "text-center max-w-2xl mx-auto" : ""}>
      {eyebrow && (
        <p className={`eyebrow ${dark ? "text-[var(--color-brand-300)]" : ""}`}>{eyebrow}</p>
      )}
      <h2 className={`h2 ${eyebrow ? "mt-2" : ""} ${dark ? "text-white" : ""}`}>{title}</h2>
      {description && (
        <p className={`lede mt-3 ${dark ? "text-white/75" : ""}`}>{description}</p>
      )}
      {actions && (
        <div className={`mt-5 flex gap-3 flex-wrap ${isCenter ? "justify-center" : ""}`}>
          {actions}
        </div>
      )}
    </header>
  );
}
