import React from "react";

/* Annotated figure frame: hard-flash hardware photography or a technical chart,
   captioned like a plate in an equipment manual. `src` optional — an empty frame
   renders the annotation block only, ready for a real photograph. */
export function FigureFrame({ src, alt = "", figure = "FIG. 01", caption, annotations = [], ratio = "3 / 2", grayscale = true, style, ...rest }) {
  return (
    <figure style={{ margin: 0, ...style }} {...rest}>
      <div style={{ position: "relative", aspectRatio: ratio, border: "1px solid var(--rule)", background: "var(--paper-3)", overflow: "hidden" }}>
        {src ? (
          <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", filter: grayscale ? "grayscale(1) contrast(1.08)" : "none", display: "block" }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", backgroundImage: "linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px)", backgroundSize: "24px 24px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "var(--track-label)", textTransform: "uppercase", color: "var(--text-muted)" }}>Hardware photograph</span>
          </div>
        )}
        <span style={{ position: "absolute", top: 0, left: 0, background: "var(--red)", color: "var(--paper)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "var(--track-label)", textTransform: "uppercase", padding: "3px 6px" }}>{figure}</span>
      </div>
      {(caption || annotations.length > 0) && (
        <figcaption style={{ borderTop: "1px solid var(--rule)", marginTop: -1, padding: "8px 0 0", display: "flex", flexWrap: "wrap", gap: "4px 20px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "var(--track-label)", textTransform: "uppercase", color: "var(--text-muted)" }}>
          {caption && <span style={{ color: "var(--text-body)" }}>{caption}</span>}
          {annotations.map((a, i) => <span key={i}>{a}</span>)}
        </figcaption>
      )}
    </figure>
  );
}
