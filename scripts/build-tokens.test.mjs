import assert from "node:assert/strict";
import { test } from "node:test";
import { SCOPE, buildTokens, scopeTokens } from "./build-tokens.mjs";

test("scopes every :root block", () => {
  assert.equal(scopeTokens(":root{--a:1}\n:root {--b:2}", "[x]"), "[x]{--a:1}\n[x]{--b:2}");
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
