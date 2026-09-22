import React from "react";

/* Carbon mono tooltip, square, instant. Appears on hover with no fade-in delay theatre. */
export function Tooltip({ content, side = "top", children, style, ...rest }) {
  const [over, setOver] = React.useState(false);
  const pos = {
    top: { bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)" },
    left: { right: "calc(100% + 6px)", top: "50%", transform: "translateY(-50%)" },
    right: { left: "calc(100% + 6px)", top: "50%", transform: "translateY(-50%)" }
  }[side];
  return (
    <span style={{ position: "relative", display: "inline-flex", ...style }} onMouseEnter={() => setOver(true)} onMouseLeave={() => setOver(false)} {...rest}>
      {children}
      {over && (
        <span style={{ position: "absolute", ...pos, zIndex: 50, whiteSpace: "nowrap", background: "var(--carbon)", color: "var(--paper)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "var(--track-mono)", padding: "4px 7px", border: "1px solid var(--carbon)" }}>{content}</span>
      )}
    </span>
  );
}
