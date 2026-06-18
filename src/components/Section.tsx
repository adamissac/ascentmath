"use client";

import type { HTMLAttributes } from "react";
import Container from "./Container";
import MathBackdrop, { type BackdropDensity, type BackdropVariant } from "./MathBackdrop";
import FloatingMathCanvas, { type FloatingMathVariant } from "./FloatingMathCanvas";
import Reveal from "./Reveal";

type Tone = "default" | "muted" | "brand" | "hero" | "dark";

const TONE: Record<Tone, string> = {
  default: "bg-[var(--color-bg)]",
  muted: "bg-[var(--color-bg)]",
  brand: "bg-[var(--color-brand-50)]",
  hero: "hero-surface",
  dark: "bg-[var(--color-ink)] text-white",
};

type Props = HTMLAttributes<HTMLElement> & {
  tone?: Tone;
  size?: "sm" | "md" | "lg" | "xl";
  containerSize?: "sm" | "md" | "lg" | "xl";
  /** Scatter math symbols + clipart behind the section content. */
  decorated?: false | BackdropVariant;
  decoratedDensity?: BackdropDensity;
  /** Keep symbols in the margins so they don't cover text. */
  decoratedContentSafe?: boolean;
  /** Faint symbols only, no clipart or large watermark. */
  decoratedMinimal?: boolean;
  /** Fade/slide section content in when scrolled into view. */
  reveal?: boolean;
  /** Animated floating symbols in the hero (replaces static MathBackdrop for this section). */
  floatingVariant?: FloatingMathVariant;
};

const PADDING = {
  sm: "py-8 sm:py-10",
  md: "py-10 sm:py-14",
  lg: "py-12 sm:py-16",
  xl: "py-14 sm:py-20",
};

export default function Section({
  tone = "default",
  size = "md",
  containerSize = "xl",
  decorated = false,
  decoratedDensity = "dense",
  decoratedContentSafe = false,
  decoratedMinimal = false,
  reveal = true,
  floatingVariant,
  className = "",
  children,
  ...rest
}: Props) {
  const showFloating = Boolean(floatingVariant);
  const showBackdrop = !showFloating && (Boolean(decorated) || tone === "dark");
  const showOverlay = showFloating || showBackdrop;
  const backdropVariant: BackdropVariant =
    tone === "dark" ? "dark" : (decorated as BackdropVariant);

  const inner = reveal ? <Reveal variant="up">{children}</Reveal> : children;

  return (
    <section
      className={`${TONE[tone]} ${PADDING[size]} ${showOverlay ? "relative overflow-hidden" : ""} ${className}`}
      {...rest}
    >
      {showFloating && <FloatingMathCanvas variant={floatingVariant!} />}
      {showBackdrop && (
        <MathBackdrop
          variant={backdropVariant}
          density={decoratedMinimal ? "light" : tone === "dark" ? "medium" : decoratedDensity}
          contentSafe={decoratedContentSafe || decoratedMinimal || tone === "dark"}
          clipart={!decoratedMinimal}
        />
      )}
      <Container size={containerSize} className={showOverlay ? "relative z-[1]" : undefined}>
        {inner}
      </Container>
    </section>
  );
}
