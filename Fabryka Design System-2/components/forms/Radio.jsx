import React from "react";

/* Radio group. Square dots — the system has no circles except status LEDs. */
export function Radio({ name, options = [], value, defaultValue, onChange, direction = "column", disabled, style, ...rest }) {
  const [inner, setInner] = React.useState(defaultValue);
  const sel = value === undefined ? inner : value;
  return (
    <div role="radiogroup" style={{ display: "flex", flexDirection: direction, gap: direction === "row" ? 20 : 10, ...style }} {...rest}>
      {options.map((o) => {
        const v = typeof o === "string" ? o : o.value;
        const l = typeof o === "string" ? o : o.label;
        const on = sel === v;
        return (
          <label key={v} onClick={() => { if (disabled) return; if (value === undefined) setInner(v); onChange && onChange(v); }}
            style={{ display: "inline-flex", gap: 10, alignItems: "center", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1 }}>
            <span style={{ width: 16, height: 16, flex: "0 0 auto", border: "1.5px solid var(--rule)", background: "var(--surface-raised)", display: "grid", placeItems: "center" }}>
              {on && <span style={{ width: 8, height: 8, background: "var(--red)" }} />}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-body)" }}>{l}</span>
          </label>
        );
      })}
    </div>
  );
}
