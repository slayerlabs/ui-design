import React from "react";

/* Measurement table — hairline rules, mono figures, right-aligned numerics.
   Looks like a table in an equipment manual, not a dashboard widget. */
export function SpecTable({ columns = [], rows = [], caption, figure, dense = false, style, ...rest }) {
  const pad = dense ? "5px 10px" : "9px 12px";
  return (
    <div style={{ ...style }} {...rest}>
      {(figure || caption) && (
        <div style={{ display: "flex", gap: 12, alignItems: "baseline", marginBottom: 8, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "var(--track-label)", textTransform: "uppercase" }}>
          {figure && <span style={{ color: "var(--red)" }}>{figure}</span>}
          {caption && <span style={{ color: "var(--text-muted)" }}>{caption}</span>}
        </div>
      )}
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-mono)", fontSize: 12.5 }}>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i} style={{ textAlign: c.align || (i === 0 ? "left" : "right"), padding: pad, borderTop: "1.5px solid var(--rule)", borderBottom: "1px solid var(--rule)", fontSize: 10.5, letterSpacing: "var(--track-label)", textTransform: "uppercase", fontWeight: 500, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{c.label || c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {columns.map((c, ci) => {
                const key = c.key || c;
                const cell = r[key];
                return (
                  <td key={ci} style={{ textAlign: c.align || (ci === 0 ? "left" : "right"), padding: pad, borderBottom: "1px solid var(--rule-faint)", color: ci === 0 ? "var(--text-body)" : "var(--text-body)", whiteSpace: "nowrap" }}>
                    {typeof cell === "object" && cell !== null ? cell : cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
