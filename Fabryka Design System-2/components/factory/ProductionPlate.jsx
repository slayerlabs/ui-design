import React from "react";
import { StatusBadge } from "../core/StatusBadge.jsx";

/* THE core brand device. A riveted machine plate, rendered in HTML.
   Header rail (brand + territory) → plate title + serial → spec rows → footer stamp. */
export function ProductionPlate({ title = "Production Plate", serial, territory = "PL/WAW", rows = [], status, tested, tone = "paper", width, style, ...rest }) {
  const carbon = tone === "carbon";
  const fg = carbon ? "var(--paper)" : "var(--carbon)";
  const bg = carbon ? "var(--carbon)" : "var(--surface-raised)";
  const rule = carbon ? "rgba(241,239,232,.28)" : "rgba(17,17,17,.22)";
  const mono = { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "var(--track-label)", textTransform: "uppercase" };
  return (
    <div style={{ width, background: bg, color: fg, border: `1.5px solid ${carbon ? "var(--paper)" : "var(--carbon)"}`, position: "relative", ...style }} {...rest}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", borderBottom: `1px solid ${rule}` }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStretch: "66%", fontSize: 17, textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 1 }}>
          Fabryka<span style={{ color: "var(--red)" }}>.</span>
        </span>
        <span style={{ ...mono, color: carbon ? "var(--grey)" : "var(--text-muted)" }}>{territory}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, padding: "10px 12px", borderBottom: `1px solid ${rule}`, background: carbon ? "rgba(241,239,232,.04)" : "var(--plate-tint)" }}>
        <span style={{ ...mono, fontSize: 12 }}>{title}</span>
        {serial && <span style={{ ...mono, fontSize: 12, color: "var(--red)" }}>{serial}</span>}
      </div>
      <div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "minmax(96px,38%) 1fr", gap: 12, padding: "6px 12px", borderBottom: i === rows.length - 1 ? "none" : `1px solid ${carbon ? "rgba(241,239,232,.14)" : "rgba(17,17,17,.09)"}` }}>
            <span style={{ ...mono, color: carbon ? "var(--grey)" : "var(--text-muted)" }}>{r.k}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, letterSpacing: "var(--track-mono)", color: r.accent ? "var(--red)" : fg, textAlign: "right" }}>{r.v}</span>
          </div>
        ))}
      </div>
      {(status || tested) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "8px 12px", borderTop: `1px solid ${rule}` }}>
          {status ? <StatusBadge state={status} /> : <span />}
          {tested && <span style={{ ...mono, color: carbon ? "var(--grey)" : "var(--text-muted)" }}>Tested {tested}</span>}
        </div>
      )}
    </div>
  );
}
