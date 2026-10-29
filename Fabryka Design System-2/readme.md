# Fabryka design system

This repository describes the identity already published at https://fabryka.ai,
not a redesign of the website. https://fabryka.ai/media is the source for official
marks, palette and font roles. The homepage's base stylesheet and its research
layout provide production examples. Source snapshots and checksums are in assets/.

## Identity

| Role | Value |
| --- | --- |
| Paper | `#FCFAF6` |
| Secondary paper | `#F3EFE9` |
| Ink | `#1A1512` |
| Secondary ink | `#49423D` |
| Furnace orange | `#B33B00` |
| Accent hover | `#963200` |
| Steel / muted text | `#766E68` |
| Rules | `#D7D1CA` |

Use warm paper surfaces, readable dark text and restrained orange accents.
Green is reserved for an actual status, never a decorative page theme. Existing
`--carbon` and `--red` variables remain compatible aliases for Ink and Furnace.
Components consume semantic tokens rather than repeating literal colours.

## Typography

- Inter: headings, navigation, controls and body copy. Headings are sentence case,
  weight 500. Navigation defaults to 16px and must remain readable on mobile.
- EB Garamond: serif accents only — `em` inside a heading (`--family-serif`,
  `--track-accent`) and the lockup word mark.
- JetBrains Mono: measurements, labels, provenance and code. Labels may use caps;
  body text and buttons do not inherit a global uppercase transform.
- The separate Research page currently uses Geist. `--font-research` records that
  existing variant; it is not a replacement for the primary media-kit identity.

Never compress headlines, force all titles into caps or make controls tiny to
fit a desktop rail on a phone. Navigation may wrap into a second row.

### Live type scale

The production home page (https://fabryka.ai/) is the template; every page uses
these sizes.

| Token | Value | Use |
| --- | --- | --- |
| `--size-hero` | `clamp(48px,5.1vw,78px)`; 60px ≤1000px; `clamp(43px,8.5vw,62px)` ≤760px | home hero h1 |
| `--size-page-title` | `clamp(2.6rem, 6vw, 4.75rem)` | h1 of every other page |
| `--size-section` | `clamp(34px,3.6vw,52px)` | section h2 |
| `--size-stat-lg` | `clamp(3rem, 7vw, 5rem)` | oversized spec value |
| `--size-stat` | `clamp(2.2rem, 4vw, 3rem)` | big numbers, swatch labels, prices |
| `--size-count` | 52px; 44px ≤760px; 42px ≤450px | the home team counts |
| `--size-initials` | 64px | portrait initials when a person has no photo |
| `--size-feature-title` | `clamp(30px,3.5vw,51px)`; 34px ≤760px | h2 of the home feature band (Basal Omni) |
| `--size-stat-label` | 14px; 13px ≤760px | the label next to a big number |
| `--size-closing` | `clamp(1.4rem, 2.6vw, 1.9rem)` | closing lines, headings inside long prose |
| `--size-statement` | `clamp(1.1rem, 2vw, 1.35rem)` | statement / standfirst paragraph |
| `--size-subsection-title` | 34px | the home sub-section heading (advisers) |
| `--size-step-title` | 26px; 25px ≤760px | titles of the home step cards (use cases, programmes, infrastructure) |
| `--size-list-title` | 24px | titles of the home output rows |
| `--size-person-title` | 23px; 21px ≤760px; 25px ≤450px | names in the home team roster |
| `--size-heading` | 22px | sub-section heading on other pages |
| `--size-card-title` | 18px | card and list-item titles, small h3/h4 on other pages |
| `--size-body-lg` | 18px | lead paragraph on every page except the home hero (no narrow value) |
| `--size-hero-lead` | 18px; 17px ≤760px | the home hero's own lead only |
| `--size-body` / `--size-nav` | 16px | body text, navigation (`--size-nav-mobile` 15px) |
| `--size-body-compact` | 15px | card, notice and list body text |
| `--size-body-sm` | 14px | small body text |
| `--size-meta` / `--size-mono` | 13px | small sans text / mono text and labels |
| `--size-ribbon` | 15px; 12px ≤760px | the home ribbon of research steps |
| `--size-caption` | 12px; 11px ≤760px | captions, figure legends and notes, stamps, small mono labels |
| `--size-status` | 12px | the status line under the home feature band's actions |
| `--size-control-sm` | 12px | small control label |
| `--size-mono-sm` / `--size-label` | 11.5px / 11px | small mono, uppercase eyebrow labels |
| `--size-code` / `--size-fine` | 0.9em / 0.85rem | inline code / small print inside a price |
| `--size-lockup` / `--size-lockup-sm` | 28px / 24px | lockup word mark (small at ≤900px) |
| `--size-figure-lg` / `-md` / `--size-figure` / `-sm` | 26 / 20 / 10.5 / 10px | text in research figures |

Line heights: `--leading-none` 1, `--display-leading` 1.04, `--leading-section`
1.13, `--leading-snug` 1.4, `--leading-mono` 1.55, `--leading-label` 1.6,
`--leading-body` 1.65, `--leading-hero-lead` and `--leading-lead` 1.75 (section leads), `--leading-card-title`
1.25, `--leading-list-title` 1.3, `--leading-subsection-title` 1.2. Tracking: `--display-tracking`
−0.055em (home hero h1), `--track-section` −0.045em, `--track-feature-title` −0.04em, `--track-heading`
−0.02em (also `--track-lockup`), `--track-accent` −0.01em, `--track-card-title` −0.7px,
`--track-list-title` −0.6px, `--track-subsection-title` −1px, `--track-mono` and `--track-eyebrow` 0.02em
(eyebrows, step labels, tags), `--track-ribbon` 0.045em, `--track-caption` 0.06em, `--track-kicker` 0.07em,
`--track-label` 0.14em. Weights: 400, 500, 600, 700, 900, plus `--weight-section` 450 (home section h2) and
`--weight-feature` 550 (home feature title); the app loads Inter and EB Garamond with their variable weight axis.

`--size-display-1…4` (108/86/66/42px) are the specimen display sizes: `tokens/base.css`
sets them on the specimen h1–h3 (h4 uses `--size-heading`), and the print kit and
the Display Scale card show them; the social image headline uses `--size-display-2`.
Product pages use the live scale above.

`tokens/base.css` is the reset for the cards and kits in this folder and is not part
of the npm package. Its h1–h4 use EB Garamond with `--display-tracking` (the hero h1
tracking); that is specimen styling only. Product headings follow the rules above.

## Logo

Use the official factory SVGs in assets/: full ink/paper signatures and original
or monochrome symbols. Preserve aspect ratio and at least one chimney-width of
clear space. `Wordmark` provides the production text signature “Fabryka.”.
The compatibility `Fmark` component renders the official factory symbol.
Do not invent a square F. logo or describe it as the primary identity.

## Interface

Keep panels and tables quiet: thin rules, spacious content and mostly square
corners. The production hero uses 4px action corners, so `--radius-control`
provides that option. Inverse sections use Ink. Avoid unnecessary elevation.
Navigation and controls use Inter and descriptive text. An account/editor entry
must be a readable link such as “Edytuj plan”, not an unexplained icon.

Use one language per screen. Polish pages use Polish navigation and controls;
English pages use English. Technical model names, code and identifiers retain
their original spelling. Write short factual copy. Remove repeated introductory
slogans and helper text when the action is already clear.

Report a measured result only with its source and scope. Do not label a service
LIVE merely because a specimen contains a status badge. Demo metrics, charts and
legacy templates are examples, not current Fabryka telemetry or legal facts.

## Spacing, controls and breakpoints

Section blocks use `--section-pad-y` (80px, 55px at ≤760px), `--section-title-gap` (28px) between a
section h2 and its lead and `--section-heading-gap` (55px, 36px at ≤760px) between the heading block and the content. The home feature band uses `--feature-pad-y` (72px, 42px at ≤760px), `--feature-gap`
(50px, 28px at ≤760px), `--feature-kicker-inset` (11px), `--feature-title-gap` (22px) and
`--feature-actions-offset` (25px). Home rhythm: `--eyebrow-gap` 26px under an eyebrow, `--paragraph-gap` 18px under a
section paragraph, `--actions-offset` 30px above a row of actions and `--actions-gap` (12px, 14px at ≤760px) between
them, `--more-link-gap` 28px above a section's "more" link, `--card-pad-top` (29px, 28px at ≤760px) under a card rule,
`--card-title-gap` 15px and `--list-title-gap` 10px under titles, `--output-row-gap` 14px and `--output-row-pad-y` 30px, `--output-kind-inset`
(5px, 0 at ≤760px), `--detail-pad-top` 21px under a detail rule, `--portrait-gap` 22px, `--subsection-gap` 58px and
`--subsection-pad-top` 36px around a sub-section rule, `--subsection-offset` 28px under a sub-section heading. Home
structure: `--split-gap` (70px, 40px at ≤1000px, 28px at ≤760px) between the two heading columns and in the split
bands, `--split-pad-y` (95px, 60px at ≤760px) for the split bands, `--feature-max` 1400px for the feature band,
`--card-pad-x` (30px, 20px at ≤1000px) beside the card dividers, `--col-output-kind` (180px, 140px at ≤1000px),
`--col-output-link` 205px and `--output-gap` (30px, 14px at ≤760px) for output rows, `--stats-row-gap` /
`--stats-col-gap` (28px / 65px, 24px at ≤760px) and `--stats-offset` 44px for the counts row, `--roster-row-gap` /
`--roster-col-gap` (42px / 24px, 32px / 18px at ≤760px) and `--role-min-h` (34px, 0 at ≤450px) for the roster,
`--ribbon-pad-y` 25px, `--ribbon-gap` (25px, 14px at ≤760px) and `--ribbon-step-gap` (24px, 10px at ≤760px) for the
ribbon, `--links-row-gap` 18px for a row of links. Page gutters are `--gutter` 24px and `--gutter-lg` 56px.

| Tokens | Value | Use |
| --- | --- | --- |
| `--control-pad-y` / `--control-pad-x` | 15px / 20px | buttons (home primary and secondary actions = production), outline buttons, stamps, select fields, capability chips, the PDF link, result badges, picker links |
| `--control-pad-y-compact` / `--control-pad-x-compact` | 9px / 13px | compact controls: consent buttons (= production), the header call to action, language-switch options |
| `--control-pad-y-sm` / `--control-pad-x-sm` | 7px / 10px | small controls: the consent settings toggle (= production), the header call to action at ≤900px |

Media queries cannot read custom properties, so consumers write these widths
literally (`max-width`, in this order) and the tokens change inside the same
`@media` blocks of the token files:

| Breakpoint | Token changes |
| --- | --- |
| 1000px | hero size, hero scrims, `--split-gap` 40px, `--card-pad-x` 20px, `--col-output-kind` 140px |
| 900px | `--header-bar-h` 73px, `--col-programme-number` 40px |
| 760px | hero layout and caption, `--section-pad-y` 55px, `--hero-crop-x` 64%, `--step-title-gap` 18px, feature band (`--feature-pad-y` 42px, `--feature-gap` 28px, `--size-feature-title` 34px), `--size-count` 44px, `--size-stat-label` 13px, `--size-step-title` 25px, `--size-person-title` 21px, `--size-ribbon` 12px, `--card-pad-top` 28px, `--output-kind-inset` 0, `--actions-gap` 14px, `--section-heading-gap` 36px, `--split-gap` 28px, `--split-pad-y` 60px, `--output-gap` 14px, `--stats-row-gap` / `--stats-col-gap` 24px, `--roster-row-gap` 32px, `--roster-col-gap` 18px, `--ribbon-gap` 14px, `--ribbon-step-gap` 10px, `--text-accent-on-image` paper |
| 450px | narrow phone (production consent panel): `--consent-offset` 56px, `--size-count` 42px, `--size-person-title` 25px, `--role-min-h` 0 |

## Token families

- Roles: `--surface-*`, `--text-*`, `--rule-*`, `--focus-ring*` (home template roles: `--surface-hero` #514437
  behind the hero image, `--surface-placeholder` #E3DED3 for portraits without a photo, `--surface-feature` #F3EEE4 for the home feature band, `--text-accent-on-image`
  #F0D4C0 for the hero eyebrow (paper at ≤760px, where the tint falls below 4.5:1), `--text-status` #69675D for the feature band's status line); `--figure-*` for
  research figures; `--data-*` for categorical series no palette colour carries;
  `--brand-mark-*` for the official mark (assets/fabryka-mark.svg).
- Borders: widths `--border-hair` 1px, `--border-rule` 1.5px, `--border-mid` 2px,
  `--border-heavy` 3px; shorthands `--border`, `-soft`, `-faint`, `-strong`,
  `-control`, `-accent`, `-accent-heavy`, `-on-inverse`, `-step`, `-chip`, `-figure`,
  `-planned`, `-ring`, `-warn`; `--border-button` and `--border-indicator` leave the
  colour to the element or state. `--shadow-outline-soft`/`-strong` draw inset outlines.
- Figures: `--stroke-*` widths in px (`--stroke-regular` 1.5px, `--stroke-strong` 2px, `--stroke-bold` 4px,
  `--stroke-halo` 8px), `--dash-*` patterns, `--radius-figure`, `--opacity-band`.
- Layout: `--measure-*`, `--col-min-*` grid minimums, `--col-*` fixed columns,
  `--table-min-*`, `--icon-*`, `--z-*` layers, hero scrim stops and factors.
- `[data-theme="carbon"]` re-declares the roles and every border or outline built on
  them: a custom property resolves `var()` where it is declared.

## Packaged tokens

`npm pack` ships `dist/tokens.css` (`:root`) and `dist/tokens.scoped.css`
(`[data-fabryka-ds]`). The build drops the specimen font variables `--font-display`,
`--font-text`, `--font-mono`, `--font-ui`, `--font-research`, `--serif`, `--sans` and
`--mono`: the app loads its fonts through next/font as `--font-sans`, `--font-serif` and
`--font-mono`, and `--family-sans`, `--family-serif` and `--family-mono` put them
first with system fallbacks. `--family-*-asset` stacks name the fonts literally for
standalone SVG and PNG files. `npm run test:tokens` checks every token in both
outputs and that `_ds_manifest.json` and `_adherence.oxlintrc.json` list them all;
after changing a token file, run `npm run sync:manifest` to regenerate both lists.

## Components and consumption

Link styles.css for the tokens and basic typography. Components under components/
remain React primitives with their existing APIs. The generated _ds_bundle.js
supports the included HTML specimens. Run `npm ci` and `npm run build` at the
repository root after changing component sources; commit the regenerated bundle.
Run `npm run check` to verify source hashes and load all exported components.

The website kit provides a factual Polish example for the current research
positioning. Historical industrial templates remain under _archive/ and are not
the authoritative website design. Production ownership/legal wording must come
from the current website rather than a fictional company in a specimen.
