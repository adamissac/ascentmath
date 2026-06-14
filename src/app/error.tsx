"use client";

import { useEffect } from "react";
import Section from "../components/Section";
import Button from "../components/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section tone="hero" size="lg" containerSize="md">
      <div className="text-center max-w-xl mx-auto">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="h-display mt-3">Oops - that didn&apos;t load.</h1>
        <p className="lede mt-4">
          Try again, or head back home. If this keeps happening, let Adam or Alan know.
        </p>
        <div className="mt-7 btn-stack-mobile justify-center">
          <Button onClick={reset}>Try again</Button>
          <Button href="/" variant="outline">Go home</Button>
        </div>
      </div>
    </Section>
  );
}
