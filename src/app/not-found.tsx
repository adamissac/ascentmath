import Section from "../components/Section";
import Button from "../components/Button";

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
          <Button href="/mathematics" variant="outline">Open the math library</Button>
        </div>
      </div>
    </Section>
  );
}
