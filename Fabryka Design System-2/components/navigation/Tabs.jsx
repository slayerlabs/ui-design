import React from "react";

/* Numbered tabs — 01 / 02 / 03. Active tab is carbon-underlined, mono caps. */
export function Tabs({ tabs = [], value, defaultValue, onChange, numbered = true, style, ...rest }) {
  const first = typeof tabs[0] === "string" ? tabs[0] : tabs[0] && tabs[0].value;
  const [inner, setInner] = React.useState(defaultValue || first);
  const sel = value === undefined ? inner : value;
  return (
    <div style={{ display: "flex", borderBottom: "1px solid var(--rule)", gap: 0, ...style }} {...rest}>
      {tabs.map((t, i) => {
        const v = typeof t === "string" ? t : t.value;
        const l = typeof t === "string" ? t : t.label;
        const on = sel === v;
        return (
          <button key={v} type="button" onClick={() => { if (value === undefined) setInner(v); onChange && onChange(v); }}
            style={{ appearance: "none", border: 0, borderBottom: on ? "3px solid var(--red)" : "3px solid transparent", background: "transparent", cursor: "pointer", padding: "8px 16px 7px", marginBottom: -1, display: "inline-flex", alignItems: "baseline", gap: 8, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "var(--track-label)", textTransform: "uppercase", color: on ? "var(--text-body)" : "var(--text-muted)", transition: "var(--transition-control)" }}>
            {numbered && <span style={{ fontSize: 10, color: on ? "var(--red)" : "var(--text-faint)" }}>{String(i + 1).padStart(2, "0")}</span>}
            <span>{l}</span>
          </button>
        );
      })}
    </div>
  );
}
