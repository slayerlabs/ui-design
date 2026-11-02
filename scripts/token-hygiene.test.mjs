import assert from "node:assert/strict";
import { test } from "node:test";
import { ROOT, resolveToken, sourceTokens } from "./tokens.mjs";

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
  ["--weight-medium", "--weight-section"],
  ["--weight-semibold", "--weight-feature"],
  ["--size-meta", "--size-mono"],
];

test("a synonym aliases the canonical token instead of copying its value", () => {
  const tokens = sourceTokens(ROOT);
  for (const [alias, canonical] of SYNONYMS) {
    assert.equal(tokens.get(alias), `var(${canonical})`, `${alias} must be var(${canonical})`);
    assert.equal(resolveToken(alias), resolveToken(canonical), `${alias} must resolve like ${canonical}`);
  }
});
