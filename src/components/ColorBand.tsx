import type { ReactNode } from "react";
import Container from "./Container";
import MathBackdrop, { type BackdropDensity } from "./MathBackdrop";
import Reveal from "./Reveal";

type BandVariant = "dark" | "brand";
type BandSize = "sm" | "md" | "lg";

const PADDING: Record<BandSize, string> = {
  sm: "py-10 sm:py-16",
  md: "py-14 sm:py-20",
  lg: "py-16 sm:py-24",
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
  children,
}: {
  variant?: BandVariant;
  size?: BandSize;
  containerSize?: "sm" | "md" | "lg" | "xl";
  reveal?: boolean;
  children: ReactNode;
}) {
  const v = VARIANT[variant];
  const inner = reveal ? <Reveal variant="fade">{children}</Reveal> : children;

  return (
    <section className={`relative overflow-hidden ${v.shell}`}>
      <MathBackdrop
        variant={v.backdrop}
        density={v.density}
        watermark={false}
        contentSafe
      />
      <Container size={containerSize} className={`relative z-[1] ${PADDING[size]}`}>
        {inner}
      </Container>
    </section>
  );
}
