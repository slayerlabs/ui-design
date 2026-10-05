import React from "react";

/* Field label sits above in mono caps; the input itself is a hairline box, no radius. */
export function Input({ label, hint, error, prefix, suffix, size = "md", style, wrapStyle, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const h = size === "sm" ? "var(--control-h-sm)" : size === "lg" ? "var(--control-h-lg)" : "var(--control-h)";
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, ...wrapStyle }}>
      {label && <span style={{ fontFamily: "var(--font-text)", fontSize: 11, letterSpacing: "normal", textTransform: "none", color: "var(--text-muted)" }}>{label}</span>}
      <span style={{ display: "flex", alignItems: "center", height: h, background: "var(--surface-raised)", border: `1px solid ${error ? "var(--red)" : focus ? "var(--carbon)" : "var(--rule-soft)"}`, boxShadow: focus ? "inset 0 0 0 1px var(--carbon)" : "none" }}>
        {prefix && <span style={{ padding: "0 8px", fontFamily: "var(--font-text)", fontSize: 12, color: "var(--text-faint)" }}>{prefix}</span>}
        <input onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ flex: 1, minWidth: 0, height: "100%", padding: "0 10px", border: 0, outline: "none", background: "transparent", color: "var(--text-body)", fontFamily: "var(--font-text)", fontSize: 13, letterSpacing: "var(--track-mono)", ...style }} {...rest} />
        {suffix && <span style={{ padding: "0 8px", fontFamily: "var(--font-text)", fontSize: 11, letterSpacing: "normal", textTransform: "none", color: "var(--text-faint)" }}>{suffix}</span>}
      </span>
      {(hint || error) && <span style={{ fontFamily: "var(--font-text)", fontSize: 11, color: error ? "var(--red)" : "var(--text-faint)" }}>{error || hint}</span>}
    </label>
  );
}
