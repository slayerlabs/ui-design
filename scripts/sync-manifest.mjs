import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ds = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "Fabryka Design System-2");
const TOKEN_FILES = ["colors", "typography", "spacing", "borders", "motion", "effects", "stacking"];
const CARBON = '[data-theme="carbon"]';
const BRAND_FONT_TOKENS = ["--font-display", "--font-text", "--font-mono"];
const manifestPath = path.join(ds, "_ds_manifest.json");
const adherencePath = path.join(ds, "_adherence.oxlintrc.json");

function declarationsIn(css, wanted) {
  const found = [];
  const context = [];
  let start = 0;
  for (let i = 0; i < css.length; i++) {
    if (css.startsWith("/*", i)) {
      i = css.indexOf("*/", i) + 1;
    } else if (css[i] === "{") {
      context.push(css.slice(start, i).replace(/\/\*[\s\S]*?\*\//g, "").trim());
      start = i + 1;
    } else if (css[i] === "}") {
      if (context.pop() === wanted && context.length === 0) {
        for (const m of css.slice(start, i).matchAll(/(--[a-z0-9-]+)\s*:([^;]*);([ \t]*\/\*[^*]*\*\/)?/g)) {
          found.push({ name: m[1], value: m[2].replace(/\/\*[\s\S]*?\*\//g, "").trim(), annotation: (m[3] ?? "").match(/@kind (\w+)/)?.[1] });
        }
      }
      start = i + 1;
    }
  }
  return found;
}

function inferKind(file, name) {
  if (file === "colors") return "color";
  if (file === "typography") return name.startsWith("--size-") ? "spacing" : "font";
  if (file === "spacing") return "spacing";
  if (file === "borders") {
    if (name.startsWith("--radius-")) return "radius";
    if (name.startsWith("--shadow-")) return "shadow";
    if (name.startsWith("--dash-")) return "other";
    if (/^--border-(hair|rule|mid|heavy)$|^--focus-|^--stroke-/.test(name)) return "spacing";
    return "color";
  }
  return "other";
}

// The manifest has always escaped non-ASCII; keeping that avoids rewriting untouched lines.
const asciiJson = (value) => JSON.stringify(value, null, 2).replace(/[\u007f-￿]/g, (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, "0")}`);

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const adherence = JSON.parse(readFileSync(adherencePath, "utf8"));
const previousKind = Object.fromEntries(manifest.tokens.map((t) => [t.name, t.kind]));

const root = [];
const listed = [];
for (const file of TOKEN_FILES) {
  const definedIn = `tokens/${file}.css`;
  const css = readFileSync(path.join(ds, definedIn), "utf8");
  for (const { name, value, annotation } of declarationsIn(css, ":root")) {
    if (root.some((t) => t.name === name)) continue;
    const token = { name, value, kind: annotation ?? previousKind[name] ?? inferKind(file, name), definedIn, ...(annotation && { annotation }) };
    root.push(token);
    listed.push(token);
  }
  for (const { name, value } of declarationsIn(css, CARBON)) {
    listed.push({ name, value, kind: root.find((t) => t.name === name).kind, definedIn, scope: CARBON });
  }
}

const families = BRAND_FONT_TOKENS.map((token) => [root.find((t) => t.name === token).value.split(",")[0].replace(/^["']|["']$/g, ""), token]);
manifest.tokens = listed;
manifest.brandFonts = families.map(([family, token]) => ({ family, status: "ok", tokens: [token], path: "tokens/typography.css" }));
manifest.globalCssPaths = ["tokens/fonts.css", ...TOKEN_FILES.map((file) => `tokens/${file}.css`), "tokens/base.css", "styles.css"];

const omelette = adherence["x-omelette"];
omelette.tokens = root.map((t) => t.name).sort();
omelette.tokenKinds = Object.fromEntries(root.map((t) => [t.name, t.kind]));
omelette.fontFamilies = families.map(([family]) => family).sort();
const fontRule = adherence.rules["no-restricted-syntax"].find((rule) => rule.message?.startsWith("Font not provided"));
const names = families.map(([family]) => family);
fontRule.selector = `Literal[value=/font-family\\s*:\\s*(?!['\\"]?(?:${names.join("|")}|var\\(--))/i]`;
fontRule.message = `Font not provided by the design system. Available: ${names.join(", ")} (or a --font-*/--family-* token).`;

writeFileSync(manifestPath, `${asciiJson(manifest)}\n`);
writeFileSync(adherencePath, JSON.stringify(adherence, null, 2));
console.log(`Listed ${root.length} tokens and ${listed.length - root.length} carbon re-declarations`);
