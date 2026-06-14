import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutoring",
  description:
    "Four tutoring tiers by grade band: K-5, middle school, high school & SAT/ACT, and college. First session free for new clients.",
};

export default function TutoringLayout({ children }: { children: React.ReactNode }) {
  return children;
}
