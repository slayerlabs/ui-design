import React from "react";

/* Production text signature. Official factory marks are distributed under assets/. */
export function Wordmark({ size = 32, color, periodColor = "var(--red)", unit, place, tone = "auto", as = "span", style, ...rest }) {
  const Tag = as;
  const fg = color || (tone === "inverse" ? "var(--paper)" : tone === "paper" ? "var(--carbon)" : "currentColor");
  return (
    <Tag style={{ display: "inline-flex", alignItems: "flex-end", gap: Math.round(size * 0.42), color: fg, ...style }} {...rest}>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontStretch: "normal", textTransform: "none", letterSpacing: "-0.02em", lineHeight: 1, fontSize: size }}>
        Fabryka<span style={{ color: periodColor }}>.</span>
      </span>
      {(unit || place) && (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: Math.max(9, Math.round(size * 0.26)), letterSpacing: "var(--track-label)", textTransform: "none", lineHeight: 1, paddingBottom: Math.round(size * 0.06), color: "var(--text-muted)", display: "flex", gap: 8 }}>
          {unit && <span>{unit}</span>}
          {place && <span>{place}</span>}
        </span>
      )}
    </Tag>
  );
}

/* Compatibility component: renders the official factory symbol, never an invented F. badge. */
export function Fmark({ size = 40, tone = "red", assetBase = "https://fabryka.ai/assets/brand", style, ...rest }) {
  const inverse = tone === "carbon";
  const file = inverse ? "fabryka-mark-paper.svg" : "fabryka-mark-ink.svg";
  return <span style={{display:"inline-flex",padding:Math.round(size * .2),background:inverse?"var(--carbon)":"transparent",...style}} {...rest}><img src={`${assetBase}/${file}`} width={size} height={size} alt="Fabryka" style={{objectFit:"contain"}} /></span>;
}
