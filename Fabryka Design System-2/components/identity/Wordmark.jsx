import React from "react";

/* FABRYKA. wordmark — set in type, not an image. The period is part of the mark. */
export function Wordmark({ size = 32, color, periodColor = "var(--red)", unit, place, tone = "auto", as = "span", style, ...rest }) {
  const Tag = as;
  const fg = color || (tone === "inverse" ? "var(--paper)" : tone === "paper" ? "var(--carbon)" : "currentColor");
  return (
    <Tag style={{ display: "inline-flex", alignItems: "flex-end", gap: Math.round(size * 0.42), color: fg, ...style }} {...rest}>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStretch: "66%", textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 0.8, fontSize: size }}>
        Fabryka<span style={{ color: periodColor }}>.</span>
      </span>
      {(unit || place) && (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: Math.max(9, Math.round(size * 0.26)), letterSpacing: "var(--track-label)", textTransform: "uppercase", lineHeight: 1, paddingBottom: Math.round(size * 0.06), color: "var(--text-muted)", display: "flex", gap: 8 }}>
          {unit && <span>{unit}</span>}
          {place && <span>{place}</span>}
        </span>
      )}
    </Tag>
  );
}

/* The secondary mark: F. — stamped on machines, avatars, repos, stickers. */
export function Fmark({ size = 40, tone = "red", style, ...rest }) {
  const bg = tone === "red" ? "var(--red)" : tone === "carbon" ? "var(--carbon)" : "transparent";
  const fg = tone === "outline" ? "var(--carbon)" : "var(--paper)";
  return (
    <span style={{ display: "inline-grid", placeItems: "center", width: size, height: size, background: bg, color: fg, border: tone === "outline" ? "var(--border-heavy) solid var(--carbon)" : "none", ...style }} {...rest}>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStretch: "66%", fontSize: size * 0.62, lineHeight: 1, letterSpacing: "-0.03em", transform: `translateY(${size * 0.02}px)` }}>F.</span>
    </span>
  );
}
