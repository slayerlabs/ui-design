import React from "react";

/* Machine-label tag: mono, caps, hairline box. Used for routes, quantizations, lines. */
export function Tag({ children, tone = "default", size = "md", style, ...rest }) {
  const tones = {
    default: { color: "var(--text-body)", borderColor: "var(--rule-soft)", background: "transparent" },
    muted: { color: "var(--text-muted)", borderColor: "var(--rule-faint)", background: "transparent" },
    red: { color: "var(--paper)", borderColor: "var(--red)", background: "var(--red)" },
    carbon: { color: "var(--surface)", borderColor: "var(--carbon)", background: "var(--carbon)" },
    outlineRed: { color: "var(--red)", borderColor: "var(--red)", background: "transparent" }
  };
  const pad = size === "sm" ? "2px 5px" : "3px 7px";
  return (
    <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: size === "sm" ? 10 : 11, letterSpacing: "var(--track-label)", textTransform: "uppercase", lineHeight: 1.3, padding: pad, border: "1px solid", borderRadius: 0, ...tones[tone], ...style }} {...rest}>{children}</span>
  );
}
