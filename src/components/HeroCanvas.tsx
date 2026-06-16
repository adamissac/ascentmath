import MathBackdrop from "./MathBackdrop";

/** Static math-symbol wash for hero sections (no canvas animation). */
export default function HeroCanvas() {
  return (
    <MathBackdrop
      variant="paper"
      density="medium"
      contentSafe
      fadeEdges
      clipart={false}
    />
  );
}
