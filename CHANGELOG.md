# Changelog

## 0.1.1 — 2026-11-02

Patch release. No token was renamed, removed or added. Every resolved value is unchanged except
`--focus-ring` in the `[data-theme="carbon"]` scope, which was failing WCAG 1.4.11 on `--surface-card`.

### Fixed

- A colour literal is declared once. `--surface-raised` and `--surface-card` are `var(--paper)`,
  `--rule` and `--grey-light` are `var(--paper-4)`, `--ink-2` is `var(--carbon-3)`.
- Synonym tokens are aliases instead of copies of the same value: `--radius-card` → `--radius-0`,
  `--track-mono` → `--track-eyebrow`, `--leading-hero-lead` → `--leading-lead`,
  `--weight-medium` → `--weight-section`, `--weight-semibold` → `--weight-feature`,
  `--size-meta` → `--size-mono`.
- Ten declarations in `[data-theme="carbon"]` resolved to their `:root` value and were removed:
  `--border-accent`, `--border-accent-heavy`, `--figure-accent`, `--rule-accent`, `--rule-accent-hover`,
  `--surface-accent-hover`, `--surface-footer`, `--surface-hero`, `--swatch-steel`, `--text-footer`.
  They keep working through `:root`.
- `--focus-ring` in the carbon scope is `var(--text-accent-on-carbon)` (`#F08A68`) instead of `--red`,
  which gave 2.94:1 on `--surface-card` and now gives 7.10:1.

### Added

- `scripts/tokens.mjs`, one reader shared by the token tests, and `scripts/token-hygiene.test.mjs`,
  which fails on a new copied colour literal, a new synonym that copies instead of aliasing, a carbon
  declaration that changes nothing, or a focus ring below 3:1 on any surface.

## 0.1.0

The first tokens-only package: `dist/tokens.css` and `dist/tokens.scoped.css`.
