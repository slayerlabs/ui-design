import React from "react";

/* Inspection stamp: F / test number / pass-fail lines. Never stars, never scores out of 10. */
export function TestStamp({ code = "F/WAW", number = "0271", checks = [], tone = "red", style, ...rest }) {
  const c = tone === "red" ? "var(--red)" : "var(--carbon)";
  return (
    <div style={{ display: "inline-block", border: `2px solid ${c}`, color: c, padding: "8px 10px", background: "transparent", ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${c}`, paddingBottom: 6, marginBottom: 6 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStretch: "66%", fontSize: 26, lineHeight: 0.8, textTransform: "uppercase" }}>F.</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "var(--track-label)", textTransform: "uppercase", lineHeight: 1.3 }}>
          {code}<br />Tested {number}
        </span>
      </div>
      <div style={{ display: "grid", gap: 2 }}>
        {checks.map((ch, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 14, fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "var(--track-label)", textTransform: "uppercase" }}>
            <span>{ch.k}</span><span>{ch.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
