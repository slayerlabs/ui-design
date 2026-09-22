# ź

## Sources

This system was authored from a single written brand brief supplied in chat (strategy, territory, palette, typography, devices, tone), which references:

- `https://fabryka.ai/` — the live site (strategic source of the production loop, named machines, §-numbered sections, "we turn GPUs into intelligence", "more intelligence per GPU"). Not machine-readable from this project.
- `https://github.com/slayerlabs/slayer` — the predecessor open-lab project (provenance only).

**No codebase, Figma file, font binaries, photography or logo files were provided.** Everything here is built from the brief. Values that were named in the brief (`#F1EFE8`, `#111111`, `#E43D26`, `#A7A7A2`) are used verbatim; everything else (scales, states, semantic aliases) was derived and is flagged below as a decision to confirm.

---

# CONTENT FUNDAMENTALS

**Voice: laconic, technical, economical.** Fabryka reports; it does not persuade. If a number can replace an adjective, it replaces it.

| Don't | Do |
| --- | --- |
| "Unlock the transformative power of AI." | "Qwen3.8 entered production today." |
| "State-of-the-art solutions built for tomorrow." | "27B parameters. 2 GPUs. 74 tok/s. Warsaw." |
| "Our mission is to democratize AI." | "More intelligence per GPU." |

Rules:

- **Casing.** Display headlines and all mono labels are UPPERCASE. Body prose is sentence case. Never Title Case A Heading Like This.
- **Person.** Mostly no person at all — the factory states facts ("Enters production 03 Sep 2026"). "We" appears only in the campaign line and in first-person laboratory notes ("We reverted the AWQ recalibration"). "You" only in docs and product UI ("Your API key is stored locally").
- **Sentence length.** Short. One clause preferred. Fragments are legitimate: "Open weights. Known hardware. Published cost."
- **Numbers are content.** Always with a unit, always tabular, never rounded up for effect: `82.4 tok/s`, `0.21 PLN / 1M`, `131,072`, `99.94%`, `118 ms`. Dates as `03 SEP 2026`; times as `02:31:08 CET`; coordinates as `52°13′N 21°00′E`.
- **Naming is serialised.** Releases are manufactured objects: `PRODUCTION 005`, `EXPERIMENT 021`, `TEST 014`, `FIG. 04`, `TAB. 02`, `§01`. Machines are named: `F-WAW-3090-04`. Plates carry serials: `F-00482`.
- **The period.** "Fabryka." is written with its full stop everywhere in brand contexts — it reads as a complete statement / terminal endpoint. Do not write "Fabryka AI".
- **No emoji. Ever.** No exclamation marks. No "🚀 shipped". No "we're excited to announce".
- **Announcement pattern:**

  ```
  PRODUCTION 005
  QWEN3.8 / 27B
  STATUS     ENTERED PRODUCTION
  LINE       AGENTS
  LOCATION   WARSAW
  INTERFACE  OPENAI COMPATIBLE
  ```
- **Buttons and labels** are mono uppercase and verb-first: `READ THE DOCS`, `ENTER PRODUCTION`, `RUN TEST`, `RAW RESULTS (JSON)`. Never "Learn more →" alone, never "Get started for free".
- **Error/state copy is machine-flavoured:** "Unreachable — machine offline", "Reverted. Notes published.", "FAIL 3/12".

---

# VISUAL FOUNDATIONS

## Colour

95% paper / carbon / grey. Red only when something matters.

| Role | Value | Use |
| --- | --- | --- |
| Paper | `#F1EFE8` (+ `#FAF9F5`, `#E7E4DA`, `#DAD6C9`, `#C9C5B6`) | default ground; slightly dirty engineering paper, never pure white |
| Carbon | `#111111` (+ `#1B1B19`, `#262623`, `#3A3A36`) | inverse sections, terminal blocks, machine panels |
| Fabryka Red | `#E43D26` (hover `#B92E1B`) | the wordmark period, one primary action, serials, figure numbers, the single number that matters |
| Machine grey | `#A7A7A2` / `#6E6E68` / `#C9C8C1` | meta, muted labels, inactive state |
| Signal green | `#1E9E4A` | **state only** — LIVE / RUNNING / PASS |
| Amber / grey signals | `#C88A05` / `#8C8C86` | DEGRADED / QUEUED, OFFLINE |

Red is never a section background wash and never a gradient. Green is never decorative — it may only report a real machine state, and only via `StatusBadge`. Inverse surfaces are done by setting `data-theme="carbon"` on a section, which flips every semantic alias.

## Typography

- **Display** — condensed grotesk, `font-stretch: 66–68%`, weight 800–900, ALL CAPS, tracking `-0.015em`, leading `0.86`. Sizes 132 / 88 / 56 / 38 px. Headlines are meant to be enormous and to break lines deliberately.
- **Text** — neutral grotesk, 19 / 16 / 14 px, leading 1.5, measure capped at 66ch, sentence case.
- **Machine layer** — mono everywhere data appears: measurements, machine names, serials, states, code, table cells, buttons, labels. Mono caps at 11px / `0.14em` tracking is the connective tissue of every layout (`.f-label`).
- Numerals are always `tabular-nums`.

## Layout

12 columns, 24px gutters, 40px page gutter, 1440px max. Sections open with a **3px carbon rule** and a `§NN` marker; subsections use 1px. Vertical section padding 96px+. Pages read like a technical document top-to-bottom: rail → headline → measured band → figure → numbered sections. Fixed elements: only the top rail (sticky, 56px, hairline bottom border). No floating action buttons, no sticky CTAs, no cookie-style overlays.

## Surfaces, borders, radii

- **Radius is 0.** Everywhere. The only round things are status LEDs (8px circles) and, rarely, a pill counter.
- Four rule weights only: 3px (section openers) · 1.5px (plate frames, table heads) · 1px @22% (panels, fields) · 1px @11% (row separators). Hairlines are carbon at low alpha, never grey.
- **Cards** = hairline square panels on `#FAF9F5` with an optional mono header rail (label left, index right). No shadow, no radius, no coloured left border.
- **Shadows:** none by default. The only allowed shadow is a hard 3px offset "stamp" shadow (`--shadow-stamp`) and a single overlay shadow for modals. No blur glows, no layered elevation system.
- **Transparency & blur:** essentially unused. Scrim behind dialogs (`rgba(17,17,17,.62)`) is the one exception — no frosted glass, no backdrop-filter.
- **Texture:** a 24px engineering-paper grid at 8% carbon (`.f-grid`) for empty frames and figure placeholders. No noise overlays, no gradients of any kind.

## Motion

Mechanical and short: 60 / 110 / 180 / 320 ms on `cubic-bezier(.2,0,.2,1)`. Things switch state; nothing floats.

- **Hover:** fill inverts — secondary buttons go carbon-on-paper, primary goes `--red-dark`, ghost turns red. Links darken to `--red-dark`. Cards shift one paper step.
- **Press:** `translateY(1px)`. No scale, no ripple.
- **Status LEDs** blink in `steps(2,end)` over 1.6s — a relay, not a breath.
- Banned: bounce, spring, parallax, scale-in card reveals, sliding gradients, typewriter effects.

## Imagery

Documentary hardware photography: 3090 heatsinks, fans, cables, test benches, power meters, crates, PCB macro, hands replacing hardware, Warsaw workshop. **Very hard flash**, black-and-white or heavily desaturated (`grayscale(1) contrast(1.08)` by default in `FigureFrame`), annotated like a manual plate:

```
MACHINE F-WAW-002
NVIDIA RTX 3090 × 2
48 GB VRAM
PHOTOGRAPHED 2026-09-03
```

No stock datacenter imagery, no 3D renders, no illustration. **The evidence is the illustration** — throughput traces, latency histograms, routing matrices and benchmark tables are the hero graphics, drawn like figures from a technical paper (hairlines, mono captions, `FIG.` / `TAB.` numbers), never like dashboard widgets.

**No photography was supplied**, so `FigureFrame` renders a gridded empty plate with the caption block intact. Drop real photographs in; do not fill these with stock.

---

# ICONOGRAPHY

Fabryka is a **near-iconless** system: numbers, labels and rules carry meaning. Where a glyph is genuinely needed, the rules are:

- **No icon set was supplied.** Substituted: **Lucide** (1.5px stroke, square caps) loaded from CDN — `https://unpkg.com/lucide-static@0.469.0/icons/<name>.svg` — masked to `currentColor` by the `Icon` component. ⚠️ Flagged substitution: swap in the real set if one exists.
- Vocabulary limited to hardware/measurement/navigation: `cpu`, `activity`, `gauge`, `arrow-right`, `check`, `x`, `copy`, `download`, `external-link`, `play`. If an icon needs a metaphor for "intelligence", don't use one.
- Icon size 13–18px, inline with mono labels, colour inherited. Never coloured icons, never filled icon chips, never duotone.
- **Unicode is used as iconography** where it reads as machine notation: `§` (sections), `·` (separators), `×` (multiplication in specs: `2 × RTX 3090`), `●` (state LED), `▾` (select caret), `→`, `°′″` (coordinates), `─` (rules in mono blocks).
- **No emoji, ever.** No brain, chip, rocket or sparkle glyphs.
- **No logo files were supplied**, and none were invented: the identity is the **FABRYKA.** wordmark set in type (`Wordmark`) and the square **F.** badge (`Fmark`). `assets/` therefore contains no marks — see the note in `assets/README.md`.

---

# FONTS — FLAGGED SUBSTITUTIONS

No font binaries were supplied. The brief named licensed families; each is substituted with the nearest Google Fonts equivalent, loaded from the Google CSS API in `tokens/fonts.css`:

| Role | Brief asks for | Shipped here |
| --- | --- | --- |
| Display | DIN Condensed / Druk / Trade Gothic Condensed / Helvetica Inserat | **Archivo** at `font-stretch: 66–68%`, weight 800–900 |
| Text | Suisse Int'l / Neue Haas Grotesk / Graphik (open alt: Instrument Sans) | **Instrument Sans** |
| Machine | Berkeley Mono (open alt: Commit Mono / IBM Plex Mono) | **IBM Plex Mono** |

**Please send Berkeley Mono + the licensed display face if you have them** — the display substitution is the biggest visual compromise in this system; Archivo compressed is close in weight but softer than Druk/DIN.

---

# INDEX

**Root**

- `styles.css` — the only file consumers link; `@import`s everything below.
- `thumbnail.html` — homepage tile.
- `SKILL.md` — Agent-Skills wrapper so this folder works as a Claude Code skill.
- `readme.md` — this file.

**Tokens** (`tokens/`): `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `borders.css`, `motion.css`, `base.css` (element resets + `.f-label` / `.f-mono` / `.f-display` / `.f-grid` helpers).

**Guidelines** (`guidelines/`): 17 specimen cards — Colors (paper, carbon, red, grey, status), Type (display, scale, text, machine layer, labels), Spacing (scale, grid in use), Brand (wordmark, F. mark, rules, grid & stamp shadow, motion).

**Components** (`components/`)

- `identity/` — **Wordmark**, **Fmark**, **Icon**
- `core/` — **Button**, **IconButton**, **Tag**, **StatusBadge**, **Card**
- `forms/` — **Input**, **Select**, **Checkbox**, **Radio**, **Switch**
- `navigation/` — **Tabs**, **SectionMarker**
- `feedback/` — **Dialog**, **Tooltip**
- `factory/` — **ProductionPlate**, **TestStamp**, **MetricReadout**, **MachineLog**, **SpecTable**, **FigureFrame**

**Intentional additions.** No component source existed, so the standard primitive set was authored from the brief. The `factory/` group is the brand-specific layer the brief explicitly calls for: `ProductionPlate` is "the most important design device"; `TestStamp` is the certification mark; `MetricReadout`, `MachineLog`, `SpecTable` and `FigureFrame` implement "the evidence is the illustration". `Icon` exists only to wrap the substituted Lucide set behind one swappable component.

**UI kits** (`ui_kits/`)

- `website/` — fabryka.ai: home (`Home.jsx`), production and laboratory (`Pages.jsx`), rail + footer (`Chrome.jsx`), click-through in `index.html`.
- `codesota/` — CodeSOTA leaderboard with suite tabs and per-model test plates (`Leaderboard.jsx`).

No slide template was supplied, so no sample deck was authored — the `ProductionPlate` + `SectionMarker` + `MetricReadout` set is what a Fabryka deck should be built from.
