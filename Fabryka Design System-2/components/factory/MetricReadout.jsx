import React from "react";

/* Giant measured number + mono caption. The primary "hero graphic" of the brand. */
export function MetricReadout({ value, unit, label, note, size = "lg", align = "left", accent = false, style, ...rest }) {
  const fs = size === "xl" ? 96 : size === "lg" ? 64 : size === "md" ? 44 : 30;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: align === "right" ? "flex-end" : "flex-start", textAlign: align, ...style }} {...rest}>
      {label && <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "var(--track-label)", textTransform: "uppercase", color: "var(--text-muted)" }}>{label}</span>}
      <span style={{ display: "flex", alignItems: "baseline", gap: 8, color: accent ? "var(--red)" : "var(--text-heading)" }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontStretch: "66%", fontSize: fs, lineHeight: 0.82, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{value}</span>
        {unit && <span style={{ fontFamily: "var(--font-mono)", fontSize: Math.max(11, fs * 0.2), letterSpacing: "var(--track-label)", textTransform: "uppercase" }}>{unit}</span>}
      </span>
      {note && <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)", letterSpacing: "var(--track-mono)" }}>{note}</span>}
    </div>
  );
}
