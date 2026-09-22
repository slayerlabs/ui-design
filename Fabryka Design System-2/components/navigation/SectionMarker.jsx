import React from "react";

/* §-numbered section head with a full-width rule. The spine of every long page. */
export function SectionMarker({ number, title, meta, rule = "heavy", style, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, ...style }} {...rest}>
      <div style={{ borderTop: rule === "heavy" ? "var(--border-heavy) solid var(--rule)" : "1px solid var(--rule)" }} />
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          {number && <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "var(--track-label)", color: "var(--red)" }}>§{number}</span>}
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontStretch: "68%", textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 0.9, fontSize: 34 }}>{title}</span>
        </div>
        {meta && <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "var(--track-label)", textTransform: "uppercase", color: "var(--text-muted)" }}>{meta}</span>}
      </div>
    </div>
  );
}
