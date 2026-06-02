import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a class",
  description:
    "Request a free 1-on-1 math session with Adam - online via Zoom or in-person in the Atlanta area.",
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
