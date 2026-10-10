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
| `fabryka.ai` | en | `/` | pl | `/pl` |
| `slayer` | en | `/zadania` | pl | `/pl/zadania` |
| `track.fabryka.ai` | en | `/` | pl | `/pl/` |

Rule: the **default language (EN) carries no prefix**; PL lives under the `/pl`
prefix. The prefix is the only place language is encoded in the URL. This rule is
**identical on all three fronts — no per-front exceptions** (decision 2026-10-10:
one language everywhere, one choice logic, one URL scheme).

## 2. Path segments

- Path segments are **language-neutral**: the same slug is used in both languages
  (`/research` and `/pl/research`, not `/pl/badania`).
- A translated slug is only allowed when it is explicitly declared in a per-front
  mapping table. Until such a table exists, do not invent translated slugs.
- The historical `slayer` redirect `/tasks` → `/zadania` stays as is; the Polish
  variant of that page is `/pl/zadania`.

Rationale: 31 `slayer` routes and 34 `fabryka.ai` URLs (32 content pages, plus the
`/docs` application route) would otherwise need a hand-maintained translation map
before anything ships. Language is carried by the prefix; slug translation is a
later, per-page decision.

## 3. `hreflang` and canonical

Every page emits:

- a **self-referencing canonical** (`<link rel="canonical">`),
- one `hreflang` per language plus `x-default`,
- `x-default` points at the **default-language (EN)** URL.

### `fabryka.ai` (en default)

```html
<link rel="canonical" href="https://fabryka.ai/research">
<link rel="alternate" hreflang="en" href="https://fabryka.ai/research">
<link rel="alternate" hreflang="pl" href="https://fabryka.ai/pl/research">
<link rel="alternate" hreflang="x-default" href="https://fabryka.ai/research">
```

### `slayer` (en default)

```html
<link rel="canonical" href="https://slayer.fabryka.ai/zadania">
<link rel="alternate" hreflang="en" href="https://slayer.fabryka.ai/zadania">
<link rel="alternate" hreflang="pl" href="https://slayer.fabryka.ai/pl/zadania">
<link rel="alternate" hreflang="x-default" href="https://slayer.fabryka.ai/zadania">
```

> `slayer.fabryka.ai` currently 301-redirects to `fabryka.ai`; the host above is the
> intended canonical host for the Next.js site. Confirm the live host before E2 ships.

### `track.fabryka.ai` (en default)

```html
<link rel="canonical" href="https://track.fabryka.ai/">
<link rel="alternate" hreflang="en" href="https://track.fabryka.ai/">
<link rel="alternate" hreflang="pl" href="https://track.fabryka.ai/pl/">
<link rel="alternate" hreflang="x-default" href="https://track.fabryka.ai/">
```

`<html lang>` follows the page language (`pl` or `en`) — the full
`x-default`/canonical block is added in E1.

## 4. Sitemap

Each front lists **both** variants of every public page as separate `<loc>` entries.
Add `<xhtml:link rel="alternate" hreflang>` blocks when the sitemap generator makes
it cheap; they are not required for correctness if the page-level `hreflang` is present.

Private/authenticated Track routes (`/account`, `/new`, `/runs`, `/status`,
`/checkpoints`, `/run/:id`, `/compare/:ids`, `/benchmarks`) are **not** listed;
public routes (`/`, `/overview`, `/goals`, `/goals/250m-english-base-model`,
`/benchmark-results`, `/leaderboard`, `/models`, `/guide`, `/agents`, `/login`)
are.

## 5. Switcher link rule

Given the current page at path `P` in language `L`, the switcher links to the
counterpart of `P` in the other language:

- **All fronts:** `en` ⇄ `pl` by adding/removing the `/pl` prefix.

The switcher must never link to the same language as the current page, and must point
at the counterpart URL, not the site root.

## 6. Migration, redirects, backward compatibility

- **Path-preserving pages.** A page that already exists at path `P` keeps `P`; if its
  current language differs from the new default (EN), the same URL starts serving
  EN and the old language moves under `/pl`. Same URL → **no redirect**; the change
  is signalled by updated `hreflang`, canonical and sitemap.
- **`fabryka.ai/mission`.** Today `/mission` serves PL and `/mission/en` serves EN.
  Under the unified rule `/mission` serves EN and `/pl/mission` serves PL; the old
  `/mission/en` gets a `301` to `/mission`. No suffix-form exception remains.
- **`fabryka.ai` legal pages.** `/regulamin.html`, `/polityka-prywatnosci.html` and
  `/ai-act.html` are single-language Polish for now: the no-prefix path
  `302`-redirects to `/pl/…` and no English version exists yet. English is deferred;
  when it arrives it takes the no-prefix URL (the `302` is removed) and the Polish
  version stays under `/pl/…`. The `302` (not `301`) keeps the no-prefix URL alive
  for that future English version.
- **`slayer` `/tasks`.** Existing `301 /tasks → /zadania` stays; the Polish page is
  `/pl/zadania`.
- No existing URL may be silently dropped without a `301` to its replacement.

### `fabryka.ai` pages: EN at the stable path, PL under `/pl/…`

Every content page keeps its stable path (now serving EN) and its Polish content
moves under the `/pl/…` prefix. The authoritative classification is **Appendix A**:
the `Today` column records the current language (which pages already have EN content
vs. which need it translated); the `EN URL`/`PL URL` columns are the target. That
table — not this section — is the single source of truth.

## 7. Appendix A — full address table

### `fabryka.ai` (en default; source: live `sitemap.xml`, 2026-10-08)

`/docs` is an application route (FastAPI-generated API documentation served as
Swagger UI HTML with no `<html lang>`); it is out of the content set and keeps a
single, non-localized sitemap entry. All other rows are content pages.

| Path | Today | EN URL | PL URL |
|---|---|---|---|
| `/` | en | `/` | `/pl` |
| `/basal` | pl | `/basal` | `/pl/basal` |
| `/story` | en | `/story` | `/pl/story` |
| `/dynaword` | en | `/dynaword` | `/pl/dynaword` |
| `/research` | en | `/research` | `/pl/research` |
| `/publications` | en | `/publications` | `/pl/publications` |
| `/platform` | en | `/platform` | `/pl/platform` |
| `/platform/terms` | en | `/platform/terms` | `/pl/platform/terms` |
| `/chat` | en | `/chat` | `/pl/chat` |
| `/hermes` | en | `/hermes` | `/pl/hermes` |
| `/logprobs` | en | `/logprobs` | `/pl/logprobs` |
| `/router` | en | `/router` | `/pl/router` |
| `/vision` | en | `/vision` | `/pl/vision` |
| `/mission` | pl | `/mission` | `/pl/mission` |
| `/media` | en | `/media` | `/pl/media` |
| `/usage` | en | `/usage` | `/pl/usage` |
| `/arr` | en | `/arr` | `/pl/arr` |
| `/status` | en | `/status` | `/pl/status` |
| `/changelog` | en | `/changelog` | `/pl/changelog` |
| `/trust.html` | en | `/trust.html` | `/pl/trust.html` |
| `/regulamin.html` | pl | deferred | `/pl/regulamin.html` |
| `/polityka-prywatnosci.html` | pl | deferred | `/pl/polityka-prywatnosci.html` |
| `/ai-act.html` | pl | deferred | `/pl/ai-act.html` |
| `/research/notes` | en | `/research/notes` | `/pl/research/notes` |
| `/research/methodology` | en | `/research/methodology` | `/pl/research/methodology` |
| `/research/articles/gollem-v5/` | en | same path | `/pl/research/articles/gollem-v5/` |
| `/research/articles/data-queue/` | en | same path | `/pl/research/articles/data-queue/` |
| `/research/articles/bach-micro-models/` | en | same path | `/pl/research/articles/bach-micro-models/` |
| `/research/articles/polish-tokenizers/` | en | same path | `/pl/research/articles/polish-tokenizers/` |
| `/research/articles/polish-agreement-probe/` | en | same path | `/pl/research/articles/polish-agreement-probe/` |
| `/gov` | pl | `/gov` | `/pl/gov` |
| `/robotyka` | pl | `/robotyka` | `/pl/robotyka` |

`/mission/en` (today's EN page) → `301 /mission`.

Legal pages (`/regulamin.html`, `/polityka-prywatnosci.html`, `/ai-act.html`) are
single-language Polish for now: the no-prefix path `302`-redirects to `/pl/…`, no
English version yet (`EN URL` = deferred). English is deferred and will later take
the no-prefix URL.

### `slayer` (en default; source: `app/**/page.jsx`)

All routes are Polish today; each keeps its slug, serves EN at the stable path and
PL under `/pl`.

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
