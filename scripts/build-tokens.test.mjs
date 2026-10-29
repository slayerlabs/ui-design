import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
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
    "--hero-min-h:740px",
    "--hero-pad-top:85px",
    "--hero-pad-bottom:100px",
    "--hero-measure:680px",
    "--hero-eyebrow-measure:560px",
    "--hero-lead-measure:505px",
    "--hero-caption-inset:30px",
    "--header-bar-h:85px",
    "--section-bar-h:47px",
    "--scrim-strong:color-mix(in srgb,var(--overlay-ink) 91%,transparent)",
    "--scrim-medium:color-mix(in srgb,var(--overlay-ink) 72%,transparent)",
    "--scrim-soft:color-mix(in srgb,var(--overlay-ink) 40%,transparent)",
    "--scrim-faint:color-mix(in srgb,var(--overlay-ink) 3%,transparent)",
    "--scrim-edge:color-mix(in srgb,var(--overlay-ink) 62%,transparent)",
    "--surface-translucent:color-mix(in srgb,var(--surface) 97%,transparent)",
    "--surface-on-image:color-mix(in srgb,var(--overlay-ink) 38%,transparent)",
    "--rule-on-image:color-mix(in srgb,var(--rule) 67%,transparent)",
    "--shadow-caption:0 1px 8px var(--overlay-ink)",
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
    "max-width: 1800px": ["--size-hero-caption:12px"],
    "max-width: 1600px": ["--size-hero-caption:14px"],
    "max-width: 1100px": ["--col-output-kind:140px"],
    "max-width: 1000px": [
      "--size-hero:60px",
      "--scrim-strong:color-mix(in srgb,var(--overlay-ink) 85%,transparent)",
      "--scrim-medium:color-mix(in srgb,var(--overlay-ink) 70%,transparent)",
      "--scrim-soft:color-mix(in srgb,var(--overlay-ink) 55%,transparent)",
    ],
    "max-width: 900px": ["--header-bar-h:73px"],
    "max-width: 760px": [
      "--size-hero:clamp(43px,8.5vw,62px)",
      "--size-hero-lead:17px",
      "--size-caption:11px",
      "--hero-pad-top:55px",
      "--hero-pad-bottom:65px",
      "--hero-eyebrow-measure:345px",
      "--hero-lead-measure:420px",
    ],
    "max-width: 480px": ["--size-count:42px", "--size-person-title:25px", "--role-min-h:0"],
    "max-width: 450px": ["--consent-offset:56px"],
  };
  for (const [css, selector] of [[root, ":root{"], [scoped, `${SCOPE}{`]]) {
    for (const [query, tokens] of Object.entries(expected)) {
      const blocks = mediaBlocks(css, query);
      for (const { text } of blocks) assert.ok(text.includes(selector), `${query} block is not on ${selector}`);
      const declarations = blocks.map(({ text }) => text).join("");
      for (const token of tokens) assert.ok(declarations.includes(`${token};`), `${query}: ${token}`);
    }
    for (const name of ["--size-hero", "--hero-pad-top", "--size-count", "--col-output-kind", "--size-hero-caption"]) {
      const positions = ["max-width: 1800px", "max-width: 1600px", "max-width: 1100px", "max-width: 1000px", "max-width: 760px", "max-width: 480px"].flatMap((query) =>
        mediaBlocks(css, query).filter(({ text }) => text.includes(`${name}:`)).map(({ at }) => at),
      );
      assert.deepEqual(positions, [...positions].sort((a, b) => a - b), name);
    }
  }
});

const NEW_TOKENS = [
  ["--bar-thickness", "6px"],
  ["--border", "var(--border-hair) solid var(--rule)", { carbon: "var(--border-hair) solid var(--rule)" }],
  ["--border-accent", "var(--border-hair) solid var(--rule-accent)", { carbon: "var(--border-hair) solid var(--rule-accent)" }],
  ["--border-accent-heavy", "var(--border-heavy) solid var(--rule-accent)", { carbon: "var(--border-heavy) solid var(--rule-accent)" }],
  ["--border-button", "var(--border-hair) solid"],
  ["--border-chip", "var(--border-rule) solid var(--rule-strong)", { carbon: "var(--border-rule) solid var(--rule-strong)" }],
  ["--border-control", "var(--border-hair) solid var(--rule-control)", { carbon: "var(--border-hair) solid var(--rule-control)" }],
  ["--border-faint", "var(--border-hair) solid var(--rule-faint)", { carbon: "var(--border-hair) solid var(--rule-faint)" }],
  ["--border-figure", "var(--border-hair) solid var(--figure-faint)", { carbon: "var(--border-hair) solid var(--figure-faint)" }],
  ["--border-heavy-solid", "var(--border-heavy) solid var(--rule)", { carbon: "var(--border-heavy) solid var(--rule)" }],
  ["--border-indicator", "var(--border-mid) solid transparent"],
  ["--border-mid", "2px"],
  ["--border-on-inverse", "var(--border-hair) solid var(--rule-on-inverse)", { carbon: "var(--border-hair) solid var(--rule-on-inverse)" }],
  ["--border-planned", "var(--border-hair) dashed var(--figure-line-muted)", { carbon: "var(--border-hair) dashed var(--figure-line-muted)" }],
  ["--border-ring", "var(--border-rule) solid var(--figure-ink-muted)", { carbon: "var(--border-rule) solid var(--figure-ink-muted)" }],
  ["--border-soft", "var(--border-hair) solid var(--rule-soft)", { carbon: "var(--border-hair) solid var(--rule-soft)" }],
  ["--border-step", "var(--border-mid) solid var(--rule-strong)", { carbon: "var(--border-mid) solid var(--rule-strong)" }],
  ["--border-strong", "var(--border-hair) solid var(--rule-strong)", { carbon: "var(--border-hair) solid var(--rule-strong)" }],
  ["--border-warn", "var(--border-rule) solid var(--status-warn)"],
  ["--box-code-baseline", "22px"],
  ["--box-name-baseline", "45px"],
  ["--brand-mark-accent", "#E85A28"],
  ["--brand-mark-ground", "#132126"],
  ["--brand-mark-paper", "#FBF8F2"],
  ["--canvas-min-graph", "760px"],
  ["--cell-h", "22px"],
  ["--col-dossier-index", "32px"],
  ["--col-min-artifact", "180px"],
  ["--col-min-card", "240px"],
  ["--col-min-detail", "420px"],
  ["--col-min-field", "260px"],
  ["--col-min-footer-intro", "240px"],
  ["--col-min-label", "160px"],
  ["--col-min-note", "220px"],
  ["--col-min-paper", "300px"],
  ["--col-min-step", "110px"],
  ["--col-min-swatch", "160px"],
  ["--col-programme-number", "64px", { media: ["max-width: 900px", "40px"] }],
  ["--col-publication-kind", "9rem"],
  ["--col-publication-link", "14rem"],
  ["--col-row-head", "120px"],
  ["--consent-gap", "10px"],
  ["--consent-inset", "20px"],
  ["--consent-offset", "58px", { media: ["max-width: 450px", "56px"] }],
  ["--control-pad-x", "20px"],
  ["--control-pad-x-compact", "13px"],
  ["--control-pad-x-sm", "10px"],
  ["--control-pad-y", "15px"],
  ["--control-pad-y-compact", "9px"],
  ["--control-pad-y-sm", "7px"],
  ["--dash-concept", "6 5"],
  ["--dash-dotted", "2 6"],
  ["--dash-feedback", "5 4"],
  ["--dash-fine", "3 3"],
  ["--dash-grid", "4 5"],
  ["--dash-roadmap", "3 4"],
  ["--dash-run", "7 5"],
  ["--dash-threshold", "4 4"],
  ["--data-blue", "#3D5D91"],
  ["--data-green", "#385440"],
  ["--data-sage", "#B7C2B0"],
  ["--data-sage-wash", "#E7EBDF"],
  ["--family-mono", "var(--font-mono), ui-monospace, monospace"],
  ["--family-mono-asset", "'JetBrains Mono', ui-monospace, monospace"],
  ["--family-sans", "var(--font-sans), system-ui, sans-serif"],
  ["--family-sans-asset", "Inter, system-ui, sans-serif"],
  ["--family-serif", "var(--font-serif), Georgia, serif"],
  ["--family-serif-asset", "'EB Garamond', Georgia, serif"],
  ["--feature-gap", "50px", { media: ["max-width: 760px", "28px"] }],
  ["--feature-kicker-inset", "11px"],
  ["--feature-pad-y", "72px", { media: ["max-width: 760px", "42px"] }],
  ["--feature-title-gap", "22px"],
  ["--figure-accent", "var(--red)", { carbon: "var(--red)" }],
  ["--figure-accent-strong", "var(--red-dark)", { carbon: "var(--red)" }],
  ["--figure-faint", "var(--grey)", { carbon: "var(--grey-dark)" }],
  ["--figure-fill", "var(--paper-3)", { carbon: "var(--carbon-3)" }],
  ["--figure-ink", "var(--carbon)", { carbon: "var(--paper)" }],
  ["--figure-ink-muted", "var(--carbon-4)", { carbon: "var(--grey)" }],
  ["--figure-ink-soft", "var(--carbon-3)", { carbon: "var(--paper-3)" }],
  ["--figure-line-muted", "var(--grey-dark)", { carbon: "var(--grey)" }],
  ["--figure-paper", "var(--paper)", { carbon: "var(--carbon)" }],
  ["--figure-tint", "var(--paper-2)", { carbon: "var(--carbon-2)" }],
  ["--focus-offset", "2px"],
  ["--focus-ring-inverse", "var(--paper)", { carbon: "var(--carbon)" }],
  ["--focus-width", "2px"],
  ["--hero-crop-x", "60%", { media: ["max-width: 760px", "64%"] }],
  ["--hero-scrim-factor-1", "0.85"],
  ["--hero-scrim-factor-2", "1.2"],
  ["--hero-scrim-factor-3", "1.6"],
  ["--hero-scrim-stop-1", "29%"],
  ["--hero-scrim-stop-2", "48%"],
  ["--hero-scrim-stop-3", "75%"],
  ["--hero-scrim-stop-edge", "40%"],
  ["--hero-title-gap", "28px"],
  ["--icon-asset-preview", "320px"],
  ["--icon-avatar-preview", "56px"],
  ["--icon-lockup", "28px"],
  ["--icon-lockup-sm", "24px"],
  ["--icon-mark-preview", "96px"],
  ["--icon-poster", "240px"],
  ["--icon-signature", "72px"],
  ["--icon-step", "28px"],
  ["--icon-swatch", "10px"],
  ["--leading-compact", "1.5"],
  ["--leading-feature-title", "1.12"],
  ["--leading-label", "1.6"],
  ["--leading-meta", "1.8"],
  ["--leading-none", "1"],
  ["--leading-relaxed", "1.7"],
  ["--leading-snug", "1.4"],
  ["--legend-line", "16px"],
  ["--marker-size", "7px"],
  ["--measure-article", "56rem"],
  ["--measure-feature", "620px"],
  ["--measure-figure", "520px"],
  ["--measure-narrow", "40rem"],
  ["--measure-panel", "640px"],
  ["--measure-prose", "42rem"],
  ["--measure-stat-label", "155px"],
  ["--measure-statement", "20ch"],
  ["--measure-tagline", "30ch"],
  ["--measure-wide", "48rem"],
  ["--node-kicker-baseline", "28px"],
  ["--node-status-baseline", "131px"],
  ["--node-subtitle-baseline", "92px"],
  ["--node-title-baseline", "66px"],
  ["--opacity-band", "0.07"],
  ["--person-link-gap", "14px"],
  ["--point-radius", "4.5px"],
  ["--portrait-crop", "26%"],
  ["--radius-figure", "2px"],
  ["--radius-header-control", "6px"],
  ["--radius-node", "3px"],
  ["--radius-panel", "8px"],
  ["--rule-accent", "var(--red)", { carbon: "var(--red)" }],
  ["--rule-accent-hover", "var(--red-dark)", { carbon: "var(--red-dark)" }],
  ["--rule-control", "var(--grey-dark)", { carbon: "var(--grey)" }],
  ["--rule-on-inverse", "color-mix(in srgb, var(--paper) 16%, transparent)", { carbon: "color-mix(in srgb, var(--carbon) 16%, transparent)" }],
  ["--rule-strong", "var(--carbon)", { carbon: "var(--paper)" }],
  ["--section-heading-gap", "55px", { media: ["max-width: 760px", "36px"] }],
  ["--section-pad-y", "80px", { media: ["max-width: 760px", "55px"] }],
  ["--shadow-outline-soft", "inset 0 0 0 var(--border-hair) var(--rule-soft)", { carbon: "inset 0 0 0 var(--border-hair) var(--rule-soft)" }],
  ["--shadow-outline-strong", "inset 0 0 0 var(--border-hair) var(--rule-strong)", { carbon: "inset 0 0 0 var(--border-hair) var(--rule-strong)" }],
  ["--shadow-popover", "0 8px 35px color-mix(in srgb, var(--carbon) 13%, transparent)"],
  ["--size-body-compact", "15px"],
  ["--size-body-lg", "18px"],
  ["--size-card-title", "18px"],
  ["--size-closing", "clamp(1.4rem, 2.6vw, 1.9rem)"],
  ["--size-code", "0.9em"],
  ["--size-control-sm", "12px"],
  ["--size-count", "52px", { media: [["max-width: 760px", "44px"], ["max-width: 480px", "42px"]] }],
  ["--size-feature-title", "clamp(30px,3.5vw,51px)", { media: ["max-width: 760px", "34px"] }],
  ["--size-figure", "10.5px"],
  ["--size-figure-lg", "26px"],
  ["--size-figure-md", "20px"],
  ["--size-figure-sm", "10px"],
  ["--size-fine", "0.85rem"],
  ["--size-initials", "64px"],
  ["--size-lockup", "28px"],
  ["--size-lockup-sm", "24px"],
  ["--size-meta", "13px"],
  ["--size-page-title", "clamp(2.6rem, 6vw, 4.75rem)"],
  ["--size-stat", "clamp(2.2rem, 4vw, 3rem)"],
  ["--size-stat-label", "14px", { media: ["max-width: 760px", "13px"] }],
  ["--size-stat-lg", "clamp(3rem, 7vw, 5rem)"],
  ["--size-statement", "clamp(1.1rem, 2vw, 1.35rem)"],
  ["--skip-offset", "100px"],
  ["--sr-only-size", "1px"],
  ["--stage-h", "180px"],
  ["--step-title-gap", "28px", { media: ["max-width: 760px", "18px"] }],
  ["--stroke-bold", "4px"],
  ["--stroke-halo", "8px"],
  ["--stroke-regular", "var(--border-rule)"],
  ["--stroke-strong", "var(--border-mid)"],
  ["--surface-accent-hover", "var(--red-dark)", { carbon: "var(--red-dark)" }],
  ["--surface-footer", "var(--carbon-2)", { carbon: "var(--carbon-2)" }],
  ["--surface-hero", "#514437", { carbon: "#514437" }],
  ["--surface-inverse-hover", "var(--carbon-3)", { carbon: "var(--paper-3)" }],
  ["--swatch-h", "160px"],
  ["--swatch-steel", "var(--grey-dark)", { carbon: "var(--grey-dark)" }],
  ["--table-min-ablation", "440px"],
  ["--table-min-register", "560px"],
  ["--table-min-steps", "770px"],
  ["--text-accent-on-inverse", "var(--red-wash)", { carbon: "var(--red)" }],
  ["--text-footer", "var(--paper-4)", { carbon: "var(--paper-4)" }],
  ["--tile-h", "92px"],
  ["--track-accent", "-0.01em"],
  ["--track-heading", "-0.02em"],
  ["--track-lockup", "var(--track-heading)"],
  ["--track-stat", "-2px"],
  ["--underline-offset", "3px"],
  ["--viewport-h", "100dvh"],
  ["--z-above", "1"],
  ["--z-below", "-1"],
  ["--z-consent", "30"],
  ["--z-consent-toggle", "29"],
  ["--actions-gap", "12px", { media: ["max-width: 760px", "14px"] }],
  ["--actions-offset", "30px"],
  ["--card-pad-top", "29px", { media: ["max-width: 760px", "28px"] }],
  ["--card-title-gap", "15px"],
  ["--detail-pad-top", "21px"],
  ["--eyebrow-gap", "26px"],
  ["--feature-actions-offset", "25px"],
  ["--leading-card-title", "1.25"],
  ["--leading-lead", "1.75"],
  ["--leading-list-title", "1.3"],
  ["--list-title-gap", "10px"],
  ["--hero-min-h", "740px"],
  ["--hero-pad-top", "85px", { media: ["max-width: 760px", "55px"] }],
  ["--more-link-gap", "28px"],
  ["--subsection-gap", "58px"],
  ["--subsection-pad-top", "36px"],
  ["--output-row-pad-y", "30px"],
  ["--output-kind-inset", "5px", { media: ["max-width: 760px", "0"] }],
  ["--paragraph-gap", "18px"],
  ["--portrait-gap", "22px"],
  ["--size-list-title", "24px"],
  ["--size-step-title", "26px", { media: ["max-width: 760px", "25px"] }],
  ["--size-subsection-title", "34px"],
  ["--leading-subsection-title", "1.2"],
  ["--size-person-title", "23px", { media: [["max-width: 760px", "21px"], ["max-width: 480px", "25px"]] }],
  ["--size-ribbon", "15px", { media: ["max-width: 760px", "12px"] }],
  ["--size-status", "12px"],
  ["--surface-placeholder", "#E3DED3"],
  ["--text-accent-on-image", "#F0D4C0", { media: ["max-width: 760px", "var(--paper)"] }],
  ["--text-status", "#69675D"],
  ["--track-card-title", "-0.7px"],
  ["--track-eyebrow", "0.02em"],
  ["--track-feature-title", "-0.04em"],
  ["--track-kicker", "0.07em"],
  ["--track-list-title", "-0.6px"],
  ["--track-ribbon", "0.045em"],
  ["--track-subsection-title", "-1px"],
  ["--surface-feature", "#F3EEE4"],
  ["--weight-section", "500"],
  ["--weight-feature", "600"],
  ["--overlay-ink", "#211C18"],
  ["--radius-media", "3px"],
  ["--feature-inset", "20px"],
  ["--size-hero-caption", "14px", { media: [["max-width: 1800px", "12px"], ["max-width: 1600px", "14px"]] }],
  ["--feature-max", "1400px"],
  ["--split-gap", "70px", { media: [["max-width: 1000px", "40px"], ["max-width: 760px", "28px"]] }],
  ["--split-pad-y", "95px", { media: ["max-width: 760px", "60px"] }],
  ["--card-pad-x", "30px", { media: ["max-width: 1000px", "20px"] }],
  ["--col-output-kind", "180px", { media: ["max-width: 1100px", "140px"] }],
  ["--col-output-link", "205px"],
  ["--output-gap", "30px", { media: ["max-width: 760px", "14px"] }],
  ["--stats-row-gap", "28px", { media: ["max-width: 760px", "24px"] }],
  ["--stats-col-gap", "65px", { media: ["max-width: 760px", "24px"] }],
  ["--stats-offset", "44px"],
  ["--roster-row-gap", "42px", { media: ["max-width: 760px", "32px"] }],
  ["--roster-col-gap", "24px", { media: ["max-width: 760px", "18px"] }],
  ["--role-min-h", "34px", { media: ["max-width: 480px", "0"] }],
  ["--subsection-offset", "28px"],
  ["--ribbon-pad-y", "25px"],
  ["--ribbon-gap", "25px", { media: ["max-width: 760px", "14px"] }],
  ["--ribbon-step-gap", "24px", { media: ["max-width: 760px", "10px"] }],
  ["--links-row-gap", "18px"],
];

function declarations(css) {
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

const SCOPES = [
  ["root", ":root", '[data-theme="carbon"]'],
  ["scoped", SCOPE, `${SCOPE}[data-theme="carbon"],${SCOPE} [data-theme="carbon"]`],
];

for (const [name, value, { media, carbon } = {}] of NEW_TOKENS) {
  test(`${name} is built with its value in every scope`, () => {
    const built = buildTokens();
    for (const [output, base, carbonSelector] of SCOPES) {
      const all = declarations(built[output]).filter((d) => d.name === name);
      const atBase = all.filter((d) => d.media === null && d.selector === base);
      assert.deepEqual(atBase.map((d) => d.value), [value], `${output} ${base}`);
      const inMedia = all.filter((d) => d.media !== null).map((d) => [d.media, d.selector, d.value]);
      const pairs = !media ? [] : Array.isArray(media[0]) ? media : [media];
      assert.deepEqual(inMedia, pairs.map(([query, v]) => [`@media (${query})`, base, v]), `${output} @media`);
      const atCarbon = all.filter((d) => d.media === null && d.selector === carbonSelector);
      assert.deepEqual(atCarbon.map((d) => d.value), carbon ? [carbon] : [], `${output} ${carbonSelector}`);
      const elsewhere = all.filter((d) => d.media === null && d.selector !== base && d.selector !== carbonSelector);
      assert.deepEqual(elsewhere.map((d) => d.selector), [], `${output} other selectors`);
    }
  });
}

test("font stacks survive the font-family filter", () => {
  const { root, scoped } = buildTokens();
  for (const css of [root, scoped]) {
    for (const name of ["sans", "serif", "mono"]) {
      assert.match(css, new RegExp(`--family-${name}:var\\(--font-${name}\\),`), name);
      assert.match(css, new RegExp(`--family-${name}-asset:`), `${name}-asset`);
    }
  }
});

const DS = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "Fabryka Design System-2");
const TOKEN_FILES = ["colors", "spacing", "borders", "motion", "typography", "effects", "stacking"];

function sourceTokens(scope) {
  const tokens = new Map();
  for (const file of TOKEN_FILES) {
    for (const { media, selector, name, value } of declarations(readFileSync(path.join(DS, "tokens", `${file}.css`), "utf8"))) {
      if (media === null && selector === scope && !tokens.has(name)) tokens.set(name, value);
    }
  }
  return tokens;
}

test("unused legacy tokens are removed", () => {
  const { root, scoped } = buildTokens();
  for (const css of [root, scoped]) {
    for (const name of ["--leading-tight", "--col-min-output-kind", "--col-min-output-link", "--col-min-person", "--output-row-gap", "--section-title-gap"]) {
      assert.ok(!css.includes(`${name}:`), name);
    }
  }
});

const SYNC = "out of sync with the token files; run npm run sync:manifest";

test("the manifest and the adherence config list every token with its value", () => {
  const tokens = sourceTokens(":root");
  const carbon = sourceTokens('[data-theme="carbon"]');
  const manifest = JSON.parse(readFileSync(path.join(DS, "_ds_manifest.json"), "utf8"));
  const adherence = JSON.parse(readFileSync(path.join(DS, "_adherence.oxlintrc.json"), "utf8"))["x-omelette"];
  const names = [...tokens.keys()].sort();
  assert.deepEqual(manifest.tokens.filter((t) => !t.scope).map((t) => t.name).sort(), names, `_ds_manifest.json ${SYNC}`);
  assert.deepEqual([...adherence.tokens].sort(), names, `_adherence.oxlintrc.json ${SYNC}`);
  assert.deepEqual(Object.keys(adherence.tokenKinds).sort(), names, `_adherence.oxlintrc.json ${SYNC}`);
  const listed = manifest.tokens.filter((t) => !t.scope);
  const carbonListed = manifest.tokens.filter((t) => t.scope === '[data-theme="carbon"]');
  assert.equal(listed.length, tokens.size, `_ds_manifest.json ${SYNC}`);
  assert.deepEqual(carbonListed.map((t) => t.name).sort(), [...carbon.keys()].sort(), `_ds_manifest.json carbon entries ${SYNC}`);
  for (const { name, value, kind } of listed) {
    assert.equal(value, tokens.get(name), `${name}: _ds_manifest.json ${SYNC}`);
    assert.equal(adherence.tokenKinds[name], kind, `${name}: _adherence.oxlintrc.json ${SYNC}`);
  }
  for (const { name, value } of carbonListed) assert.equal(value, carbon.get(name), `carbon ${name}: _ds_manifest.json ${SYNC}`);
});
