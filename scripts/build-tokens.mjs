import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// base.css is a global reset and fonts.css a Google Fonts @import; neither may leak into consuming pages.
const SOURCES = ["colors", "spacing", "borders", "motion"].map((name) =>
  path.join(root, "Fabryka Design System-2", "tokens", `${name}.css`),
);

export const SCOPE = "[data-fabryka-ds]";

export function scopeTokens(css, scope) {
  return css.replace(/:root\s*\{/g, `${scope}{`);
}

export function buildTokens() {
  const css = SOURCES.map((file) => readFileSync(file, "utf8")).join("\n");
  return { root: css, scoped: scopeTokens(css, SCOPE) };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dist = path.join(root, "dist");
  mkdirSync(dist, { recursive: true });
  const { root: rootCss, scoped } = buildTokens();
  writeFileSync(path.join(dist, "tokens.css"), rootCss);
  writeFileSync(path.join(dist, "tokens.scoped.css"), scoped);
}
