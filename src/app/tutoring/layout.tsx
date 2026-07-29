import type { Metadata } from "next";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Tutoring",
  description:
    "Four tutoring tiers by grade band: K-5, middle school, high school & SAT/ACT, and college. Free consultation call for new clients.",
  path: "/tutoring",
  index: false,
});

export default function TutoringLayout({ children }: { children: React.ReactNode }) {
  return children;
}
