import React from "react";

/* Lucide (stroke 1.5) loaded from CDN as a CSS mask so the glyph inherits currentColor.
   Fabryka uses icons sparingly — labels and numbers do most of the work. */
export function Icon({ name, size = 16, strokeWidth, style, ...rest }) {
  const url = `https://unpkg.com/lucide-static@0.469.0/icons/${name}.svg`;
  return (
    <span
      aria-hidden="true"
      style={{ display: "inline-block", width: size, height: size, background: "currentColor", WebkitMaskImage: `url(${url})`, maskImage: `url(${url})`, WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskSize: "contain", maskSize: "contain", flex: "0 0 auto", opacity: strokeWidth ? 1 : 1, ...style }}
      {...rest}
    />
  );
}
