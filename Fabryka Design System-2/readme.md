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

- EB Garamond: editorial headlines, natural width, weight 400–600, sentence case.
- Inter: navigation, controls and body copy. Navigation defaults to 16px and must
  remain readable on mobile. Product/project headings may also use Inter.
- JetBrains Mono: measurements, labels, provenance and code. Labels may use caps;
  body text and buttons do not inherit a global uppercase transform.
- The separate Research page currently uses Geist. `--font-research` records that
  existing variant; it is not a replacement for the primary media-kit identity.

Never compress headlines, force all titles into caps or make controls tiny to
fit a desktop rail on a phone. Navigation may wrap into a second row.

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
