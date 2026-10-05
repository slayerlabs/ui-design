import React from "react";

export function Select({ label, options = [], hint, size = "md", style, wrapStyle, ...rest }) {
  const h = size === "sm" ? "var(--control-h-sm)" : size === "lg" ? "var(--control-h-lg)" : "var(--control-h)";
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, ...wrapStyle }}>
      {label && <span style={{ fontFamily: "var(--font-text)", fontSize: 11, letterSpacing: "normal", textTransform: "none", color: "var(--text-muted)" }}>{label}</span>}
      <span style={{ position: "relative", display: "block" }}>
        <select style={{ appearance: "none", width: "100%", height: h, padding: "0 30px 0 10px", background: "var(--surface-raised)", border: "1px solid var(--rule-soft)", borderRadius: 0, color: "var(--text-body)", fontFamily: "var(--font-text)", fontSize: 13, cursor: "pointer", ...style }} {...rest}>
          {options.map((o) => {
            const v = typeof o === "string" ? o : o.value;
            const l = typeof o === "string" ? o : o.label;
            return <option key={v} value={v}>{l}</option>;
          })}
        </select>
        <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", fontFamily: "var(--font-text)", fontSize: 11, color: "var(--text-muted)" }}>▾</span>
      </span>
      {hint && <span style={{ fontFamily: "var(--font-text)", fontSize: 11, color: "var(--text-faint)" }}>{hint}</span>}
    </label>
  );
}
