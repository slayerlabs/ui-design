import assert from "node:assert/strict";
import { test } from "node:test";
import { CARBON, ROOT, contrast, resolveToken, sourceTokens } from "./tokens.mjs";

const HEX = /^#[0-9a-f]{3,8}$/i;

test("a colour literal is declared once and every other token aliases it", () => {
  const owners = new Map();
  const offenders = [];
  for (const [name, value] of sourceTokens(ROOT)) {
    if (!HEX.test(value)) continue;
    const owner = owners.get(value.toLowerCase());
    if (owner === undefined) owners.set(value.toLowerCase(), name);
    else offenders.push(`${name}: ${value} copies ${owner}`);
  }
  assert.deepEqual(offenders, []);
});

// alias, canonical token. Both keep their name; only the value becomes a reference.
const SYNONYMS = [
  ["--surface-raised", "--paper"],
  ["--surface-card", "--paper"],
  ["--rule", "--paper-4"],
  ["--grey-light", "--paper-4"],
  ["--ink-2", "--carbon-3"],
  ["--radius-card", "--radius-0"],
  ["--track-mono", "--track-eyebrow"],
  ["--leading-hero-lead", "--leading-lead"],
  ["--weight-section", "--weight-medium"],
  ["--weight-feature", "--weight-semibold"],
  ["--size-meta", "--size-mono"],
];

test("a synonym aliases the canonical token instead of copying its value", () => {
  const tokens = sourceTokens(ROOT);
  for (const [alias, canonical] of SYNONYMS) {
    assert.equal(tokens.get(alias), `var(${canonical})`, `${alias} must be var(${canonical})`);
    assert.equal(resolveToken(alias), resolveToken(canonical), `${alias} must resolve like ${canonical}`);
  }
});

// A carbon declaration exists to re-declare a token whose ingredients change in that scope.
// If it resolves to the root value it is dead weight: :root already supplies that value.
test("every carbon declaration changes the token's value", () => {
  const redundant = [...sourceTokens(CARBON).keys()].filter(
    (name) => resolveToken(name, ROOT) === resolveToken(name, CARBON),
  );
  assert.deepEqual(redundant.sort(), []);
});

// WCAG 1.4.11: a focus indicator needs 3:1 against the surface it sits on.
test("the focus ring passes 3:1 on every surface in both scopes", () => {
  for (const scope of [ROOT, CARBON]) {
    for (const surface of ["--surface", "--surface-raised", "--surface-sunken", "--surface-card"]) {
      const ratio = contrast(resolveToken("--focus-ring", scope), resolveToken(surface, scope));
      assert.ok(ratio >= 3, `--focus-ring on ${surface} in ${scope}: ${ratio.toFixed(2)}:1`);
    }
  }
});
