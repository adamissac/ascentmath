/** Slow, subtle math symbols for the homepage study paths section only (CSS, no canvas). */
export default function HomeStudyPathsBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="home-study-paths-float-layer">
        <span className="home-study-paths-glyph home-study-paths-glyph--a">△</span>
        <span className="home-study-paths-glyph home-study-paths-glyph--b">Σ</span>
        <span className="home-study-paths-glyph home-study-paths-glyph--c">√</span>
        <span className="home-study-paths-glyph home-study-paths-glyph--d">∫</span>
        <span className="home-study-paths-glyph home-study-paths-glyph--e">□</span>
        <span className="home-study-paths-glyph home-study-paths-glyph--f">x²</span>
        <span className="home-study-paths-glyph home-study-paths-glyph--g">∠</span>
        <span className="home-study-paths-glyph home-study-paths-glyph--h">½</span>
      </div>
    </div>
  );
}
