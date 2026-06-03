"use client";

import type { HTMLAttributes, ReactNode } from "react";

type Tone = "neutral" | "brand" | "accent" | "info" | "success" | "warning" | "danger";

const TONE: Record<Tone, string> = {
  neutral: "pill",
  brand: "pill pill-brand",
  accent: "pill pill-accent",
  info: "pill pill-info",
  success: "pill pill-success",
  warning: "pill pill-warning",
  danger: "pill pill-danger",
};

type Props = HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
  icon?: ReactNode;
};

export default function Badge({
  tone = "neutral",
  icon,
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <span className={`${TONE[tone]} ${className}`} {...rest}>
      {icon ? <span aria-hidden className="inline-flex">{icon}</span> : null}
      {children}
    </span>
  );
}
