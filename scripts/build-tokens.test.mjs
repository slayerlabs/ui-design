import assert from "node:assert/strict";
import { test } from "node:test";
import { SCOPE, buildTokens, scopeTokens } from "./build-tokens.mjs";

test("scopes every :root block", () => {
  assert.equal(scopeTokens(":root{--a:1}\n:root {--b:2}", "[x]"), "[x]{--a:1}\n[x]{--b:2}");
  assert.equal(
    scopeTokens('[data-theme="carbon"] {--a:1}', "[x]"),
    '[x][data-theme="carbon"],[x] [data-theme="carbon"]{--a:1}',
  );
});

test("every top-level selector of the scoped output starts with the scope", () => {
  const css = buildTokens().scoped.replace(/\/\*[\s\S]*?\*\//g, "");
  const selectors = [];
  // Each entry says whether that open block is an at-rule; rules nested only in at-rules count as top level.
  const open = [];
  let start = 0;
  for (let i = 0; i < css.length; i++) {
    if (css[i] === "{") {
      const prelude = css.slice(start, i).trim();
      const atRule = prelude.startsWith("@");
      if (!atRule && open.every(Boolean)) selectors.push(...prelude.split(",").map((s) => s.trim()));
      open.push(atRule);
      start = i + 1;
    } else if (css[i] === "}") {
      open.pop();
      start = i + 1;
    }
  }
  assert.ok(selectors.length > 0);
  for (const selector of selectors) assert.ok(selector.startsWith(SCOPE), `unscoped selector: ${selector}`);
});

test("tokens carry the production palette and no resets or font imports", () => {
  const { root, scoped } = buildTokens();
  for (const css of [root, scoped]) {
    assert.match(css, /--paper:#FCFAF6/);
    assert.match(css, /--red:#B33B00/);
    assert.match(css, /--space-4:16px/);
    assert.doesNotMatch(css, /@import/);
    assert.doesNotMatch(css, /(^|\})\s*(\*|html|body|a|p|h1|::selection)\s*[{,]/m);
  }
  assert.doesNotMatch(scoped, /:root/);
  assert.ok(scoped.includes(`${SCOPE}{`));
});

test("typography tokens are built without font-family variables", () => {
  const { root, scoped } = buildTokens();
  const excluded = ["font-display", "font-text", "font-mono", "font-ui", "font-research", "serif", "sans", "mono"];
  for (const css of [root, scoped]) {
    assert.match(css, /--size-body:16px/);
    assert.match(css, /--display-weight:500/);
    assert.match(css, /--leading-body:1\.65;/);
    assert.match(css, /--size-nav:16px/);
    for (const name of excluded) assert.doesNotMatch(css, new RegExp(`(?<![\\w-])--${name}\\s*:`), name);
  }
  assert.match(scoped, /\[data-fabryka-ds\]\{[^}]*--size-body:16px/);
  assert.doesNotMatch(scoped, /:root/);
});

test("secondary text role and mono typography tokens are built", () => {
  const { root, scoped } = buildTokens();
  for (const css of [root, scoped]) {
    assert.match(css, /--text-secondary:var\(--carbon-3\)/);
    assert.match(css, /--text-secondary:var\(--paper-3\)/);
    assert.match(css, /--size-mono:13px/);
    assert.match(css, /--leading-mono:1\.55/);
    assert.match(css, /--track-mono:0\.02em/);
  }
  assert.match(root, /\[data-theme="carbon"\]\s*\{[^}]*--text-secondary:var\(--paper-3\)/);
  assert.match(scoped, /\[data-fabryka-ds\]\{[^}]*--text-secondary:var\(--carbon-3\)/);
  assert.match(scoped, /\[data-fabryka-ds\]\[data-theme="carbon"\][^{]*\{[^}]*--text-secondary:var\(--paper-3\)/);
});

function mediaBlocks(css, query) {
  const blocks = [];
  for (let at = css.indexOf(`@media (${query})`); at >= 0; at = css.indexOf(`@media (${query})`, at + 1)) {
    let depth = 0;
    let end = css.indexOf("{", at);
    do {
      if (css[end] === "{") depth++;
      else if (css[end] === "}") depth--;
      end++;
    } while (depth > 0);
    blocks.push({ at, text: css.slice(at, end) });
  }
  assert.ok(blocks.length > 0, `missing @media (${query})`);
  return blocks;
}

test("template typography, layout, effect and stacking tokens are built", () => {
  const { root, scoped } = buildTokens();
  const tokens = [
    "--leading-body:1.65",
    "--display-leading:1.04",
    "--display-tracking:-0.055em",
    "--size-hero:clamp(48px,5.1vw,78px)",
    "--size-hero-lead:18px",
    "--leading-hero-lead:1.75",
    "--size-section:clamp(34px,3.6vw,52px)",
    "--leading-section:1.13",
    "--track-section:-0.045em",
    "--size-caption:12px",
    "--track-caption:0.06em",
    "--hero-min-h:720px",
    "--hero-pad-top:85px",
    "--hero-pad-bottom:100px",
    "--hero-measure:680px",
    "--hero-eyebrow-measure:530px",
    "--hero-lead-measure:460px",
    "--hero-caption-inset:30px",
    "--header-bar-h:86px",
    "--section-bar-h:47px",
    "--scrim-strong:color-mix(in srgb,var(--carbon-2) 91%,transparent)",
    "--scrim-medium:color-mix(in srgb,var(--carbon-2) 72%,transparent)",
    "--scrim-soft:color-mix(in srgb,var(--carbon-2) 40%,transparent)",
    "--scrim-faint:color-mix(in srgb,var(--carbon-2) 3%,transparent)",
    "--scrim-edge:color-mix(in srgb,var(--carbon-2) 62%,transparent)",
    "--surface-translucent:color-mix(in srgb,var(--surface) 97%,transparent)",
    "--surface-on-image:color-mix(in srgb,var(--carbon-2) 38%,transparent)",
    "--rule-on-image:color-mix(in srgb,var(--rule) 67%,transparent)",
    "--shadow-caption:0 1px 8px var(--carbon-2)",
    "--blur-translucent:10px",
    "--blur-on-image:5px",
    "--z-header:20",
    "--z-skip:30",
  ];
  for (const css of [root, scoped]) {
    for (const token of tokens) assert.ok(css.includes(`${token};`), token);
    for (const old of ["--leading-body:1.5;", "--display-leading:0.96;", "--display-tracking:-0.035em;", "--header-bar-pad-y:"]) {
      assert.ok(!css.includes(old), old);
    }
  }
  assert.match(scoped, /\[data-fabryka-ds\]\{[^}]*--z-header:20;/);
  assert.match(scoped, /\[data-fabryka-ds\]\{[^}]*--blur-translucent:10px;/);
});

test("breakpoint tokens change inside the app's media queries, in cascade order", () => {
  const { root, scoped } = buildTokens();
  const expected = {
    "max-width: 1000px": [
      "--size-hero:60px",
      "--hero-min-h:700px",
      "--scrim-strong:color-mix(in srgb,var(--carbon-2) 85%,transparent)",
      "--scrim-medium:color-mix(in srgb,var(--carbon-2) 70%,transparent)",
      "--scrim-soft:color-mix(in srgb,var(--carbon-2) 55%,transparent)",
    ],
    "max-width: 900px": ["--header-bar-h:74px"],
    "max-width: 760px": [
      "--size-hero:clamp(43px,8.5vw,62px)",
      "--size-hero-lead:17px",
      "--size-caption:11px",
      "--hero-min-h:750px",
      "--hero-pad-top:70px",
      "--hero-pad-bottom:90px",
      "--hero-eyebrow-measure:320px",
      "--hero-lead-measure:420px",
    ],
    "max-width: 380px": ["--hero-pad-top:50px"],
  };
  for (const [css, selector] of [[root, ":root{"], [scoped, `${SCOPE}{`]]) {
    for (const [query, tokens] of Object.entries(expected)) {
      const blocks = mediaBlocks(css, query);
      for (const { text } of blocks) assert.ok(text.includes(selector), `${query} block is not on ${selector}`);
      const declarations = blocks.map(({ text }) => text).join("");
      for (const token of tokens) assert.ok(declarations.includes(`${token};`), `${query}: ${token}`);
    }
    for (const name of ["--size-hero", "--hero-min-h", "--hero-pad-top"]) {
      const positions = ["max-width: 1000px", "max-width: 760px", "max-width: 380px"].flatMap((query) =>
        mediaBlocks(css, query).filter(({ text }) => text.includes(`${name}:`)).map(({ at }) => at),
      );
      assert.deepEqual(positions, [...positions].sort((a, b) => a - b), name);
    }
  }
});
