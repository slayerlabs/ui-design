import assert from "node:assert/strict";
import { test } from "node:test";
import { CARBON, ROOT, contrast, resolveToken, sourceTokens } from "./tokens.mjs";

test("resolves a token through its aliases", () => {
  assert.equal(resolveToken("--paper"), "#FCFAF6");
  assert.equal(sourceTokens(ROOT).get("--surface"), "var(--paper)");
  assert.equal(resolveToken("--surface"), "#FCFAF6");
});

test("resolves in the carbon scope and falls back to the root scope", () => {
  assert.equal(sourceTokens(CARBON).get("--surface"), "var(--carbon)");
  assert.equal(resolveToken("--surface"), "#FCFAF6");
  assert.equal(resolveToken("--surface", CARBON), "#1A1512");
  assert.equal(resolveToken("--paper", CARBON), "#FCFAF6");
});

test("resolves inside a composite value", () => {
  assert.equal(resolveToken("--border"), "1px solid #D7D1CA");
  assert.equal(resolveToken("--border", CARBON), "1px solid rgba(252,250,246,.9)");
});

test("reports the contrast ratio of two hex colours", () => {
  assert.equal(contrast("#000000", "#FFFFFF").toFixed(2), "21.00");
  assert.equal(contrast("#FCFAF6", "#FCFAF6").toFixed(2), "1.00");
});

test("throws on a token nobody declares", () => {
  assert.throws(() => resolveToken("--not-a-token"), /unknown token/);
});
