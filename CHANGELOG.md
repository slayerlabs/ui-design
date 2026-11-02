# Changelog

## 0.1.1 — 2026-11-02

Patch release. No token was renamed, removed or added. Every `:root` value is unchanged. In the
`[data-theme="carbon"]` scope `--focus-ring` changes (it was failing WCAG 1.4.11 on `--surface-card`),
and two tokens stop depending on where `data-theme="carbon"` is placed; see below.

### Fixed

- A colour literal is declared once. `--surface-raised` and `--surface-card` are `var(--paper)`,
  `--rule` and `--grey-light` are `var(--paper-4)`, `--ink-2` is `var(--carbon-3)`.
- Synonym tokens are aliases instead of copies of the same value: `--radius-card` → `--radius-0`,
  `--track-mono` → `--track-eyebrow`, `--leading-hero-lead` → `--leading-lead`,
  `--weight-section` → `--weight-medium`, `--weight-feature` → `--weight-semibold`,
  `--size-meta` → `--size-mono`. The weight roles alias the scale steps, not the reverse, so retuning
  a role does not move every generic `--weight-medium` / `--weight-semibold` use.
- Ten declarations in `[data-theme="carbon"]` resolved to their `:root` value and were removed:
  `--border-accent`, `--border-accent-heavy`, `--figure-accent`, `--rule-accent`, `--rule-accent-hover`,
  `--surface-accent-hover`, `--surface-footer`, `--surface-hero`, `--swatch-steel`, `--text-footer`.
  They keep working through `:root`.
- `--focus-ring` in the carbon scope is `var(--text-accent-on-carbon)` (`#F08A68`) instead of `--red`,
  which gave 2.94:1 on `--surface-card` and now gives 7.10:1.
- Two tokens resolved differently on a nested `[data-theme="carbon"]` element than with carbon on
  `<html>`, because a nested element inherits a root-only token already resolved against `:root`.
  `--surface-translucent` is re-declared in carbon, so a nested carbon band gets the dark translucent
  surface. `--rule-on-image` is `var(--paper-4)`-based instead of `var(--rule)`-based, because imagery
  does not change with the theme. Neither token sits inside a carbon section in the app today.

### Added

- `scripts/tokens.mjs`, one reader shared by the token tests, and `scripts/token-hygiene.test.mjs`,
  which fails on a new copied colour literal, a new synonym that copies instead of aliasing, a carbon
  declaration that changes nothing, a root-only token whose value depends on where carbon is applied,
  or a focus ring below 3:1 on any surface.

## 0.1.0

The first tokens-only package: `dist/tokens.css` and `dist/tokens.scoped.css`.
