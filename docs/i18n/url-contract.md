# Fabryka AI — i18n URL contract

Status: proposal (E0 task 821)
Applies to: `fabryka.ai` (static), `slayer` (Next.js 15 App Router), `fabryka-track` (Vite + React Router 7).
Languages: `pl`, `en`.

This contract fixes the URL shape, `hreflang`, canonical and sitemap rules for the
three fronts. It does not describe implementation; the concrete Next/Vite/static
wiring is done in E1–E3.

## 1. Default language per front

| Front | Default | Stable URL | Alternate | Alternate URL |
|---|---|---|---|---|
| `fabryka.ai` | pl | `/` | en | `/en` |
| `slayer` | pl | `/zadania` | en | `/en/zadania` |
| `track.fabryka.ai` | en | `/runs` | pl | `/pl/runs` |

Rule: the **default language carries no prefix**; the other language lives under its
two-letter prefix (`/pl` or `/en`). The prefix is the only place language is encoded
in the URL.

`track.fabryka.ai` keeps English at stable URLs because all its current, indexed URLs
are English. `fabryka.ai` and `slayer` are Polish-default: `fabryka.ai` generalizes
its existing `/mission` (pl) + `/mission/en` (en) page; `slayer` is Polish throughout.

## 2. Path segments

- Path segments are **language-neutral**: the same slug is used in both languages
  (`/research` and `/en/research`, not `/en/badania`).
- A translated slug is only allowed when it is explicitly declared in a per-front
  mapping table. Until such a table exists, do not invent translated slugs.
- The historical `slayer` redirect `/tasks` → `/zadania` stays as is; the English
  variant of that page is `/en/zadania`.

Rationale: 29 `slayer` routes and 34 `fabryka.ai` URLs would otherwise need a
hand-maintained translation map before anything ships. Language is carried by the
prefix; slug translation is a later, per-page decision.

## 3. `hreflang` and canonical

Every page emits:

- a **self-referencing canonical** (`<link rel="canonical">`),
- one `hreflang` per language plus `x-default`,
- `x-default` points at the **default-language** URL.

### `fabryka.ai` (pl default)

```html
<link rel="canonical" href="https://fabryka.ai/research">
<link rel="alternate" hreflang="pl" href="https://fabryka.ai/research">
<link rel="alternate" hreflang="en" href="https://fabryka.ai/en/research">
<link rel="alternate" hreflang="x-default" href="https://fabryka.ai/research">
```

### `slayer` (pl default)

```html
<link rel="canonical" href="https://slayer.fabryka.ai/zadania">
<link rel="alternate" hreflang="pl" href="https://slayer.fabryka.ai/zadania">
<link rel="alternate" hreflang="en" href="https://slayer.fabryka.ai/en/zadania">
<link rel="alternate" hreflang="x-default" href="https://slayer.fabryka.ai/zadania">
```

> `slayer.fabryka.ai` currently 301-redirects to `fabryka.ai`; the host above is the
> intended canonical host for the Next.js site. Confirm the live host before E2 ships.

### `track.fabryka.ai` (en default)

```html
<link rel="canonical" href="https://track.fabryka.ai/runs">
<link rel="alternate" hreflang="en" href="https://track.fabryka.ai/runs">
<link rel="alternate" hreflang="pl" href="https://track.fabryka.ai/pl/runs">
<link rel="alternate" hreflang="x-default" href="https://track.fabryka.ai/runs">
```

`<html lang>` follows the page language (`pl` or `en`). The live `/mission` page
already does this correctly and is the reference implementation.

## 4. Sitemap

Each front lists **both** variants of every public page as separate `<loc>` entries.
Add `<xhtml:link rel="alternate" hreflang>` blocks when the sitemap generator makes
it cheap; they are not required for correctness if the page-level `hreflang` is present.

Private/authenticated Track routes (`/account`, `/new`, `/runs`, `/checkpoints`,
`/run/:id`, `/compare/:ids`, `/benchmarks`) are **not** listed; public routes
(`/`, `/overview`, `/goals`, `/benchmark-results`, `/leaderboard`, `/models`,
`/guide`, `/agents`, `/login`) are.

## 5. Switcher link rule

Given the current page at path `P` in language `L`, the switcher links to the
counterpart of `P` in the other language:

- `fabryka.ai` / `slayer`: `pl` ⇄ `en` by adding/removing the `/en` prefix.
- `track.fabryka.ai`: `en` ⇄ `pl` by adding/removing the `/pl` prefix.

The switcher must never link to the same language as the current page, and must point
at the counterpart URL, not the site root.

## 6. Migration, redirects, backward compatibility

- **Path-preserving pages.** A page that already exists at path `P` keeps `P`; if its
  current language differs from the new default, the same URL starts serving the
  default language and the old language moves under the prefix. Same URL → **no
  redirect**; the change is signalled by updated `hreflang`, canonical and sitemap.
- **`fabryka.ai/mission`.** Keeps `https://fabryka.ai/mission` (pl). Its English
  counterpart moves from the suffix form `/mission/en` to the prefix form
  `/en/mission`; add `301 /mission/en → /en/mission`. This is the only existing
  bilingual URL on the site.
- **`slayer` `/tasks`.** Existing `301 /tasks → /zadania` stays; the English page is
  `/en/zadania`.
- No existing URL may be silently dropped without a `301` to its replacement.

### Currently-EN `fabryka.ai` pages moving to `/en/…`

These URLs currently serve English. After migration they serve Polish, and their
English content lives under `/en/…`:

| Current (en) | Becomes (pl) | English (new) |
|---|---|---|
| `/` | `/` | `/en` |
| `/research` | `/research` | `/en/research` |
| `/publications` | `/publications` | `/en/publications` |
| `/story` | `/story` | `/en/story` |
| `/platform` | `/platform` | `/en/platform` |
| `/vision` | `/vision` | `/en/vision` |
| `/dynaword` | `/dynaword` | `/en/dynaword` |
| `/media` | `/media` | `/en/media` |
| `/usage` | `/usage` | `/en/usage` |
| `/arr` | `/arr` | `/en/arr` |

Pages already Polish (`/basal`, `/gov`, `/robotyka`, `/mission`) keep their URL and
gain an English counterpart under `/en/…`.

## 7. Appendix A — full address table

### `fabryka.ai` (pl default; source: live `sitemap.xml`, 2026-10-08)

`/docs` is an application route (FastAPI/generated API documentation, JSON, no
`<html lang>`); it is out of the content set. All other rows are content pages.

| Path | Today | PL URL | EN URL |
|---|---|---|---|
| `/` | en | `/` | `/en` |
| `/basal` | pl | `/basal` | `/en/basal` |
| `/story` | en | `/story` | `/en/story` |
| `/dynaword` | en | `/dynaword` | `/en/dynaword` |
| `/research` | en | `/research` | `/en/research` |
| `/publications` | en | `/publications` | `/en/publications` |
| `/platform` | en | `/platform` | `/en/platform` |
| `/platform/terms` | en | `/platform/terms` | `/en/platform/terms` |
| `/chat` | en | `/chat` | `/en/chat` |
| `/hermes` | en | `/hermes` | `/en/hermes` |
| `/logprobs` | en | `/logprobs` | `/en/logprobs` |
| `/router` | en | `/router` | `/en/router` |
| `/vision` | en | `/vision` | `/en/vision` |
| `/mission` | pl | `/mission` | `/en/mission` (301 from `/mission/en`) |
| `/media` | en | `/media` | `/en/media` |
| `/usage` | en | `/usage` | `/en/usage` |
| `/arr` | en | `/arr` | `/en/arr` |
| `/status` | en | `/status` | `/en/status` |
| `/changelog` | en | `/changelog` | `/en/changelog` |
| `/trust.html` | en | `/trust.html` | `/en/trust.html` |
| `/regulamin.html` | pl | `/regulamin.html` | `/en/regulamin.html` |
| `/polityka-prywatnosci.html` | pl | `/polityka-prywatnosci.html` | `/en/polityka-prywatnosci.html` |
| `/ai-act.html` | pl | `/ai-act.html` | `/en/ai-act.html` |
| `/research/notes` | en | `/research/notes` | `/en/research/notes` |
| `/research/methodology` | en | `/research/methodology` | `/en/research/methodology` |
| `/research/articles/gollem-v5/` | en | same path | `/en/research/articles/gollem-v5/` |
| `/research/articles/data-queue/` | en | same path | `/en/research/articles/data-queue/` |
| `/research/articles/bach-micro-models/` | en | same path | `/en/research/articles/bach-micro-models/` |
| `/research/articles/polish-tokenizers/` | en | same path | `/en/research/articles/polish-tokenizers/` |
| `/research/articles/polish-agreement-probe/` | en | same path | `/en/research/articles/polish-agreement-probe/` |
| `/gov` | pl | `/gov` | `/en/gov` |
| `/robotyka` | pl | `/robotyka` | `/en/robotyka` |

### `slayer` (pl default; source: `app/**/page.jsx`)

All routes are Polish today; each gains an `/en` counterpart, same slug.

`/` · `/bench-explorer` · `/bench-explorer/nowy` · `/benchmarks` ·
`/closed-benchmarks` · `/datasety` · `/drabina` · `/eksperymenty` · `/eng-log` ·
`/eng-log/[slug]` · `/kierunki` · `/leaderboard` · `/polityka-prywatnosci` ·
`/progress` · `/propozycja` · `/regulamin` · `/regulamin-discord` · `/roadmap` ·
`/rules` · `/sota` · `/styl` · `/team` · `/trening` · `/update` · `/v3` · `/v4` ·
`/wiedza` · `/wspolpraca` · `/zadania` · `/zespol` · `/zgoda`

### `track.fabryka.ai` (en default; source: `frontend/src/App.tsx`)

All routes are English today; each gains a `/pl` counterpart, same slug.
Public (in sitemap): `/` · `/overview` · `/goals` · `/goals/250m-english-base-model` ·
`/benchmark-results` · `/leaderboard` · `/models` · `/guide` · `/agents` · `/login`.
Private (not in sitemap): `/status` · `/new` · `/runs` · `/checkpoints` · `/benchmarks` ·
`/run/:id` · `/compare/:ids` · `/account`.

## 8. Non-goals

- Backend/API strings (out of scope).
- The switcher visual component (task 824).
- Language negotiation and persistence (task 823).
- Per-page translated slugs (see §2).
- The `.po` format (JSON runtime only; see task 825).
