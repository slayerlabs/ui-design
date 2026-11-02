import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const DS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "Fabryka Design System-2");
export const TOKEN_FILES = ["colors", "spacing", "borders", "motion", "typography", "effects", "stacking"];
export const ROOT = ":root";
export const CARBON = '[data-theme="carbon"]';

export function declarations(css) {
  const found = [];
  const context = [];
  let start = 0;
  const text = css.replace(/\/\*[\s\S]*?\*\//g, "");
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "{") {
      context.push(text.slice(start, i).trim());
      start = i + 1;
    } else if (text[i] === "}") {
      const selector = context.pop();
      if (!selector.startsWith("@")) {
        const media = context.find((prelude) => prelude.startsWith("@media")) ?? null;
        for (const declaration of text.slice(start, i).split(";")) {
          const colon = declaration.indexOf(":");
          if (colon > 0) found.push({ media, selector, name: declaration.slice(0, colon).trim(), value: declaration.slice(colon + 1).trim() });
        }
      }
      start = i + 1;
    }
  }
  return found;
}

export function sourceTokens(scope) {
  const tokens = new Map();
  for (const file of TOKEN_FILES) {
    for (const { media, selector, name, value } of declarations(readFileSync(path.join(DS, "tokens", `${file}.css`), "utf8"))) {
      if (media === null && selector === scope && !tokens.has(name)) tokens.set(name, value);
    }
  }
  return tokens;
}

// var() resolves where the property is declared, so a carbon lookup falls back to :root for
// anything the carbon scope does not re-declare.
export function resolveToken(name, scope = ROOT) {
  const root = sourceTokens(ROOT);
  const carbon = scope === CARBON ? sourceTokens(CARBON) : null;
  const raw = (token) => (carbon?.has(token) ? carbon.get(token) : root.get(token));
  const expand = (text, depth) => {
    if (depth > 32) throw new Error(`cyclic token reference while resolving ${name}`);
    return text.replace(/var\(\s*(--[a-z0-9-]+)\s*\)/g, (_, reference) => {
      const value = raw(reference);
      return value === undefined ? `var(${reference})` : expand(value, depth + 1);
    });
  };
  const value = raw(name);
  if (value === undefined) throw new Error(`unknown token: ${name}`);
  return expand(value, 0);
}

export const resolveCarbon = (name) => resolveToken(name, CARBON);

export const luminance = (hex) => {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

export const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
