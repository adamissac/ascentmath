import type { Metadata } from "next";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Book a session",
  description:
    "Book a paid 1-on-1 math tutoring session with Adam & Alan. Choose from four tiers (K-5, middle school, high school & SAT/ACT, college). Your first session is free for new clients.",
  path: "/book",
  index: false,
});

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
