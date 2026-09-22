import React from "react";

const STATES = {
  live: { label: "LIVE", color: "var(--status-live)", pulse: true },
  running: { label: "RUNNING", color: "var(--status-live)", pulse: true },
  pass: { label: "PASS", color: "var(--status-pass)" },
  fail: { label: "FAIL", color: "var(--status-fail)" },
  warn: { label: "DEGRADED", color: "var(--status-warn)" },
  queued: { label: "QUEUED", color: "var(--status-idle)" },
  offline: { label: "OFFLINE", color: "var(--status-idle)" }
};

/* State, not decoration. Green appears ONLY through this component. */
export function StatusBadge({ state = "live", label, showDot = true, style, ...rest }) {
  const s = STATES[state] || STATES.live;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "var(--track-label)", textTransform: "uppercase", color: "var(--text-body)", ...style }} {...rest}>
      {showDot && <span style={{ width: "var(--dot-size)", height: "var(--dot-size)", borderRadius: "var(--radius-dot)", background: s.color, animation: s.pulse ? "f-blink var(--blink) steps(2,end) infinite" : "none" }} />}
      <span>{label || s.label}</span>
      <style>{"@keyframes f-blink{0%,60%{opacity:1}61%,100%{opacity:.25}}"}</style>
    </span>
  );
}
