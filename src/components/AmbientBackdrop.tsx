"use client";

type Tone = "cream" | "white" | "warm";

const BLOBS: Record<Tone, { a: string; b: string; c: string }> = {
  cream: {
    a: "bg-[#2A4BCB]/[0.1]",
    b: "bg-[#F47B16]/[0.11]",
    c: "bg-[#7E97F0]/[0.09]",
  },
  white: {
    a: "bg-[#2A4BCB]/[0.06]",
    b: "bg-[#F47B16]/[0.07]",
    c: "bg-[#2A4BCB]/[0.04]",
  },
  warm: {
    a: "bg-[#F47B16]/[0.1]",
    b: "bg-[#2A4BCB]/[0.08]",
    c: "bg-[#FFDEC0]/[0.35]",
  },
};

/** Soft drifting gradients, decorative only, no pointer events. */
export default function AmbientBackdrop({ tone = "cream" }: { tone?: Tone }) {
  const colors = BLOBS[tone];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`ambient-blob ambient-blob--a absolute -left-[12%] top-[8%] h-[42%] w-[48%] rounded-full blur-3xl ${colors.a}`}
      />
      <div
        className={`ambient-blob ambient-blob--b absolute -right-[8%] top-[35%] h-[38%] w-[44%] rounded-full blur-3xl ${colors.b}`}
      />
      <div
        className={`ambient-blob ambient-blob--c absolute bottom-[5%] left-[30%] h-[32%] w-[40%] rounded-full blur-3xl ${colors.c}`}
      />
    </div>
  );
}
