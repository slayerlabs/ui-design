import React from "react";

/* Square box, red fill, hard tick. Inspection-form logic. */
export function Checkbox({ label, checked, defaultChecked, onChange, disabled, hint, style, ...rest }) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked === undefined ? inner : checked;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInner(!on);
    onChange && onChange(!on);
  };
  return (
    <label onClick={toggle} style={{ display: "inline-flex", gap: 10, alignItems: "flex-start", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1, ...style }} {...rest}>
      <span style={{ width: 16, height: 16, flex: "0 0 auto", marginTop: 1, border: "1.5px solid var(--rule)", background: on ? "var(--red)" : "var(--surface-raised)", display: "grid", placeItems: "center", transition: "var(--transition-control)" }}>
        {on && <span style={{ width: 8, height: 8, background: "var(--paper)" }} />}
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "var(--track-mono)", color: "var(--text-body)" }}>{label}</span>
        {hint && <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)" }}>{hint}</span>}
      </span>
    </label>
  );
}
