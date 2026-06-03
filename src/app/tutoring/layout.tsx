import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutoring",
  description:
    "Three tutoring tiers by grade band: K-6, middle school, and high school & college. Rates vary by tier and are confirmed on call or email.",
};

export default function TutoringLayout({ children }: { children: React.ReactNode }) {
  return children;
}
