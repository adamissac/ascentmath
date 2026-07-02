"use client";

import type { ReactNode } from "react";
import Container from "./Container";
import MathBackdrop, { type BackdropDensity } from "./MathBackdrop";
import Reveal from "./Reveal";

type BandVariant = "dark" | "brand";
type BandSize = "sm" | "md" | "lg" | "xl";

const PADDING: Record<BandSize, string> = {
  sm: "py-8 sm:py-12",
  md: "py-10 sm:py-14",
  lg: "py-12 sm:py-16",
  xl: "py-14 sm:py-20",
};

const VARIANT: Record<
  BandVariant,
  { shell: string; backdrop: "dark" | "brand"; density: BackdropDensity }
> = {
  dark: {
    shell: "bg-[var(--color-ink)] text-white",
    backdrop: "dark",
    density: "medium",
  },
  brand: {
    shell: "bg-[var(--color-brand-700)] text-white",
    backdrop: "brand",
    density: "light",
  },
};

/**
 * Full-width contrast section - dark ink or deep brand blue,
 * with math backdrop. Use between lighter sections for rhythm.
 */
export default function ColorBand({
  variant = "dark",
  size = "md",
  containerSize = "xl",
  reveal = true,
  /** Dot grid only: skips symbols and clipart (smoother scroll). */
  minimalBackdrop = false,
  /** Faint edge symbols only (brand/dark bands). */
  faintSymbols = false,
  id,
  className = "",
  children,
}: {
  variant?: BandVariant;
  size?: BandSize;
  containerSize?: "sm" | "md" | "lg" | "xl" | "2xl";
  reveal?: boolean;
  minimalBackdrop?: boolean;
  faintSymbols?: boolean;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const v = VARIANT[variant];
  const inner = reveal ? <Reveal variant="fade">{children}</Reveal> : children;
  const gridColor =
    variant === "brand" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.06)";

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${v.shell} ${className}`.trim()}
      style={{ contain: "layout paint" }}
    >
      {minimalBackdrop ? (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${gridColor} 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
      ) : (
        <MathBackdrop
          variant={v.backdrop}
          density={faintSymbols ? "light" : v.density}
          contentSafe={faintSymbols}
          clipart={!faintSymbols}
          fadeEdges={faintSymbols}
          faint={faintSymbols}
        />
      )}
      <Container size={containerSize} className={`relative z-[1] ${PADDING[size]}`}>
        {inner}
      </Container>
    </section>
  );
}
