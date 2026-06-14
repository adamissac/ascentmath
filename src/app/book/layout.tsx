import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a session",
  description:
    "Book a paid 1-on-1 math tutoring session with Adam & Alan. Choose from four tiers (K-5, middle school, high school & SAT/ACT, college). Your first session is free for new clients.",
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
