"use client";

/**
 * Root error boundary — required so production builds don't fail looking for /_error.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#0B2046",
          color: "#fff",
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "28rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Something went wrong</h1>
          <p style={{ opacity: 0.8, lineHeight: 1.6, marginBottom: "1.5rem" }}>
            The page didn&apos;t load. Try again, or go back home.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                padding: "0.625rem 1.25rem",
                borderRadius: "999px",
                border: "none",
                background: "#0B2046",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            {/* Plain <a> on purpose: global-error renders outside the app
                router, so a full reload is the reliable way home. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                padding: "0.625rem 1.25rem",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "#fff",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Go home
            </a>
          </div>
          {process.env.NODE_ENV === "development" && error?.message ? (
            <pre
              style={{
                marginTop: "1.5rem",
                textAlign: "left",
                fontSize: "0.75rem",
                opacity: 0.65,
                overflow: "auto",
                padding: "0.75rem",
                background: "rgba(0,0,0,0.25)",
                borderRadius: "0.5rem",
              }}
            >
              {error.message}
            </pre>
          ) : null}
        </div>
      </body>
    </html>
  );
}
