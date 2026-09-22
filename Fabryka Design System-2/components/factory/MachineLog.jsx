import React from "react";

/* Terminal/console block: aligned key–value machine output on carbon.
   Pass `lines` as [{k,v}] or raw strings. */
export function MachineLog({ title, lines = [], tone = "carbon", pad = 14, style, ...rest }) {
  const carbon = tone === "carbon";
  const fg = carbon ? "var(--paper)" : "var(--carbon)";
  const width = lines.reduce((m, l) => (l && l.k ? Math.max(m, String(l.k).length) : m), 0);
  return (
    <div style={{ background: carbon ? "var(--carbon)" : "var(--paper-2)", color: fg, border: carbon ? "1px solid var(--carbon)" : "1px solid var(--rule-soft)", fontFamily: "var(--font-mono)", fontSize: 12.5, lineHeight: "var(--leading-mono)", ...style }} {...rest}>
      {title && <div style={{ padding: `${pad - 6}px ${pad}px`, borderBottom: `1px solid ${carbon ? "rgba(241,239,232,.2)" : "var(--rule-faint)"}`, fontSize: 11, letterSpacing: "var(--track-label)", textTransform: "uppercase", color: carbon ? "var(--grey)" : "var(--text-muted)" }}>{title}</div>}
      <pre style={{ margin: 0, padding: pad, whiteSpace: "pre", overflowX: "auto", fontFamily: "inherit", fontSize: "inherit", lineHeight: "inherit" }}>
        {lines.map((l, i) => {
          if (typeof l === "string") return l + (i < lines.length - 1 ? "\n" : "");
          const key = String(l.k).toUpperCase().padEnd(width + 4, " ");
          return (
            <span key={i}>
              <span style={{ color: carbon ? "var(--grey)" : "var(--text-muted)" }}>{key}</span>
              <span style={{ color: l.accent ? "var(--red)" : l.ok ? "var(--signal-green)" : fg }}>{l.v}</span>
              {i < lines.length - 1 ? "\n" : ""}
            </span>
          );
        })}
      </pre>
    </div>
  );
}
