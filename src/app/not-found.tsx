import type { Metadata } from "next";
import Section from "../components/Section";
import Button from "../components/Button";
import { STUDY_PATHS_HREF } from "../lib/site-paths";
import { buildPageMetadata } from "../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Page not found",
  description: "That page does not exist. Head home or browse the free Grades 6-8 study paths.",
  path: "/",
  index: false,
});

export default function NotFound() {
  return (
    <Section tone="hero" size="lg" containerSize="md">
      <div className="text-center max-w-xl mx-auto">
        <p className="eyebrow">404</p>
        <h1 className="h-display mt-3">We can&apos;t find that page.</h1>
        <p className="lede mt-4">
          The link may be broken or the page may have moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-7 btn-stack-mobile justify-center">
          <Button href="/">Take me home</Button>
          <Button href={STUDY_PATHS_HREF} variant="outline">Browse study paths</Button>
        </div>
      </div>
    </Section>
  );
}
