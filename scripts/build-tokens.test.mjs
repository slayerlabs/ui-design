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
  let depth = 0;
  let start = 0;
  for (let i = 0; i < css.length; i++) {
    if (css[i] === "{") {
      if (depth === 0) selectors.push(...css.slice(start, i).split(",").map((s) => s.trim()));
      depth++;
    } else if (css[i] === "}") {
      depth--;
      if (depth === 0) start = i + 1;
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
    assert.match(css, /--leading-body:1\.5/);
    assert.match(css, /--size-nav:16px/);
    for (const name of excluded) assert.doesNotMatch(css, new RegExp(`(?<![\\w-])--${name}\\s*:`), name);
  }
  assert.match(scoped, /\[data-fabryka-ds\]\{[^}]*--size-body:16px/);
  assert.doesNotMatch(scoped, /:root/);
});
