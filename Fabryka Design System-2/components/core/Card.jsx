import React from "react";

/* Hairline square panel. Optional mono header rail and corner index. */
export function Card({ label, index, children, tone = "paper", pad = "var(--card-pad)", hoverable, style, ...rest }) {
  const [over, setOver] = React.useState(false);
  const tones = {
    paper: { background: "var(--surface-card)", color: "var(--text-body)" },
    flat: { background: "transparent", color: "var(--text-body)" },
    carbon: { background: "var(--carbon)", color: "var(--paper)" },
    red: { background: "var(--red)", color: "var(--paper)" }
  };
  return (
    <div onMouseEnter={() => setOver(true)} onMouseLeave={() => setOver(false)}
      style={{ border: "1px solid var(--rule)", borderRadius: 0, transition: "var(--transition-control)", ...tones[tone], ...(hoverable && over ? { background: tone === "carbon" ? "var(--carbon-3)" : "var(--paper-2)" } : null), ...style }} {...rest}>
      {(label || index) && (
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "7px 12px", borderBottom: "1px solid var(--rule-soft)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "var(--track-label)", textTransform: "uppercase", opacity: 0.85 }}>
          <span>{label}</span><span>{index}</span>
        </div>
      )}
      <div style={{ padding: pad }}>{children}</div>
    </div>
  );
}
