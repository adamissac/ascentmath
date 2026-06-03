import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a session",
  description:
    "Book a paid 1-on-1 math tutoring session with Adam. Choose Tier 1 (K-6), Tier 2 (middle school), or Tier 3 (high school & college). Rates vary by tier and are confirmed on call or email.",
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
