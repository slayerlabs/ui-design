import React from "react";

const SIZES = {
  sm: { h: "var(--control-h-sm)", px: 10, fs: 11, gap: 6 },
  md: { h: "var(--control-h)", px: 16, fs: 12, gap: 8 },
  lg: { h: "var(--control-h-lg)", px: 22, fs: 13, gap: 10 }
};

/* Square, mono-labelled, uppercase. No radius, no gradient, no soft shadow. */
export function Button({ variant = "primary", size = "md", disabled, block, href, children, iconLeft, iconRight, style, ...rest }) {
  const s = SIZES[size] || SIZES.md;
  const base = {
    display: block ? "flex" : "inline-flex",
    width: block ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    height: s.h,
    padding: `0 ${s.px}px`,
    fontFamily: "var(--font-text)",
    fontSize: s.fs,
    fontWeight: 500,
    letterSpacing: "normal",
    textTransform: "none",
    borderRadius: 0,
    border: "1px solid var(--rule)",
    cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: "none",
    transition: "var(--transition-control)",
    opacity: disabled ? 0.38 : 1,
    whiteSpace: "nowrap"
  };
  const variants = {
    primary: { background: "var(--carbon)", color: "var(--paper)", borderColor: "var(--carbon)" },
    accent: { background: "var(--red)", color: "var(--paper)", borderColor: "var(--red)" },
    solid: { background: "var(--carbon)", color: "var(--paper)", borderColor: "var(--carbon)" },
    secondary: { background: "transparent", color: "var(--text-body)", borderColor: "var(--rule)" },
    ghost: { background: "transparent", color: "var(--text-body)", borderColor: "transparent" }
  };
  const hover = {
    primary: { background: "var(--carbon-3)", borderColor: "var(--carbon-3)" },
    accent: { background: "var(--red-dark)", borderColor: "var(--red-dark)" },
    solid: { background: "var(--carbon-3)", borderColor: "var(--carbon-3)" },
    secondary: { background: "var(--carbon)", color: "var(--surface)", borderColor: "var(--carbon)" },
    ghost: { color: "var(--red)" }
  };
  const [over, setOver] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const st = { ...base, ...variants[variant], ...(over && !disabled ? hover[variant] : null), ...(down && !disabled ? { transform: "translateY(1px)" } : null), ...style };
  const handlers = {
    onMouseEnter: () => setOver(true),
    onMouseLeave: () => { setOver(false); setDown(false); },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false)
  };
  const inner = <>{iconLeft}{children}{iconRight}</>;
  if (href && !disabled) return <a href={href} style={st} {...handlers} {...rest}>{inner}</a>;
  return <button type="button" disabled={disabled} style={st} {...handlers} {...rest}>{inner}</button>;
}
