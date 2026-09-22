import React from "react";

/* Industrial rocker switch: square travel, ON/OFF legend, no easing bounce. */
export function Switch({ checked, defaultChecked, onChange, label, legend = true, disabled, style, ...rest }) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked === undefined ? inner : checked;
  const toggle = () => { if (disabled) return; if (checked === undefined) setInner(!on); onChange && onChange(!on); };
  return (
    <label onClick={toggle} style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1, ...style }} {...rest}>
      <span style={{ position: "relative", width: 44, height: 22, border: "1px solid var(--rule)", background: on ? "var(--carbon)" : "var(--paper-3)", transition: "background-color var(--dur-fast) var(--ease-mech)" }}>
        <span style={{ position: "absolute", top: 2, left: on ? 24 : 2, width: 16, height: 16, background: on ? "var(--paper)" : "var(--carbon)", transition: "left var(--dur-fast) var(--ease-mech)" }} />
      </span>
      {(label || legend) && <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "var(--track-label)", textTransform: "uppercase", color: "var(--text-body)" }}>{label || (on ? "ON" : "OFF")}</span>}
    </label>
  );
}
