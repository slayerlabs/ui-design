import React from "react";
import { Icon } from "../identity/Icon.jsx";

/* Square icon button. Same chassis as Button, 1:1 footprint. */
export function IconButton({ icon, label, variant = "secondary", size = "md", disabled, style, ...rest }) {
  const dim = size === "sm" ? 28 : size === "lg" ? 46 : 36;
  const [over, setOver] = React.useState(false);
  const variants = {
    primary: { background: "var(--carbon)", color: "var(--paper)", borderColor: "var(--carbon)" },
    accent: { background: "var(--red)", color: "var(--paper)", borderColor: "var(--red)" },
    solid: { background: "var(--carbon)", color: "var(--paper)", borderColor: "var(--carbon)" },
    secondary: { background: "transparent", color: "var(--text-body)", borderColor: "var(--rule)" },
    ghost: { background: "transparent", color: "var(--text-muted)", borderColor: "transparent" }
  };
  const hovered = over && !disabled ? (variant === "accent" ? { background: "var(--red-dark)" } : variant === "primary" ? { background: "var(--carbon-3)" } : variant === "ghost" ? { color: "var(--red)" } : { background: "var(--carbon)", color: "var(--surface)", borderColor: "var(--carbon)" }) : null;
  return (
    <button type="button" aria-label={label} title={label} disabled={disabled}
      onMouseEnter={() => setOver(true)} onMouseLeave={() => setOver(false)}
      style={{ display: "inline-grid", placeItems: "center", width: dim, height: dim, border: "1px solid var(--rule)", borderRadius: 0, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.38 : 1, transition: "var(--transition-control)", ...variants[variant], ...hovered, ...style }}
      {...rest}>
      {typeof icon === "string" ? <Icon name={icon} size={size === "sm" ? 13 : 16} /> : icon}
    </button>
  );
}
