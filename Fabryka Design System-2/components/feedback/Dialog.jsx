import React from "react";
import { IconButton } from "../core/IconButton.jsx";

/* Square modal on a carbon scrim. Header is a mono rail with a document number. */
export function Dialog({ open = true, title, docNumber, children, footer, onClose, width = 520, style, ...rest }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(17,17,17,.62)", display: "grid", placeItems: "center", zIndex: 100, padding: 24 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width, maxWidth: "100%", background: "var(--surface-raised)", border: "1px solid var(--rule)", boxShadow: "var(--shadow-overlay)", ...style }} {...rest}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "10px 12px", borderBottom: "1px solid var(--rule)", background: "var(--carbon)", color: "var(--paper)" }}>
          <span style={{ display: "flex", gap: 12, alignItems: "baseline", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "var(--track-label)", textTransform: "uppercase" }}>
            <span>{title}</span>{docNumber && <span style={{ color: "var(--grey)" }}>{docNumber}</span>}
          </span>
          {onClose && <IconButton icon="x" label="Close" variant="ghost" size="sm" onClick={onClose} style={{ color: "var(--paper)" }} />}
        </div>
        <div style={{ padding: 20 }}>{children}</div>
        {footer && <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, padding: 12, borderTop: "1px solid var(--rule-soft)", background: "var(--paper-2)" }}>{footer}</div>}
      </div>
    </div>
  );
}
