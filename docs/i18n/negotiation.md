# Language negotiation and persistence rules

Status: proposal (E0 task 823)
Applies to: `fabryka.ai`, `slayer`, `fabryka-track` (frontends).
Companion to `docs/i18n/url-contract.md` (task 821) and `docs/i18n/glossary.md`
(task 825).

**Unified choice logic (decision 2026-10-10):** one rule on every front —
`stored cookie → clearly-PL browser → EN`. Exception-less and identical across
fronts so a single visitor gets the same language on `fabryka.ai`,
`slayer.fabryka.ai` and `track.fabryka.ai` (the shared `fabryka_lang` cookie
carries the choice once made). The URL scheme is equally uniform: **EN is the
default language at no-prefix URLs, PL lives under `/pl` on every front** (task
821). No per-front exceptions.

## 1. Behavior matrix

| Case | What happens |
|---|---|
| `/` with no stored choice | Default **EN**, except a clearly-PL browser (server: `Accept-Language`; Track SPA: `navigator.languages[0]` = `pl`) gets the PL variant. No redirect when the front is already at the EN URL. |
| `/` with stored choice | Redirect to the stored choice language, no negotiation. |
| Direct URL in either language (`/x`, `/pl/x`) | Serve exactly as addressed. Never re-guess from headers or `navigator`. |
| Unknown prefix (`/fr/...`) | 404 (or a 404 page in the default language); never a silent redirect into a guessed language. |
| Bot without cookies / `Accept-Language` | Same as "no stored choice"; server-side decision (per D-006, only `/` redirects, protecting deep links and SEO). |

D-006 (proposed): redirect **only from `/`**. Deep links and indexed URLs are
never redirected into another language, so a shared link always lands on the
language its author addressed.

> D-006 governs **negotiation** redirects (re-guessing a visitor's language from
> headers/cookie). **Migration** redirects — one-time `301`/`302` moves of content
> to a new path (e.g. the legal pages' `302` to `/pl/…`, `/mission/en` → `/mission`)
> — are a separate category, documented in `url-contract.md` §6, and are not
> subject to D-006.

## 2. Storage rule

One mechanism for all fronts, documented once here:

- **Name:** `fabryka_lang`
- **Values:** `pl` | `en`
- **Kind:** cookie, `Domain=.fabryka.ai`, `path=/`, `max-age=31536000`
  (1 year), `SameSite=Lax`, `Secure` in production, **not** `HttpOnly` (the
  switcher writes it from JavaScript). `Domain=.fabryka.ai`
  makes the choice **shared across all fronts** (`fabryka.ai`,
  `slayer.fabryka.ai`, `track.fabryka.ai`). (`localStorage` is host-scoped,
  so the Vite front must read/write the shared **cookie**; keep
  `localStorage` only as a fallback for blocked cookies, knowing it won't
  carry across hosts on its own.)
- **Precedence:** stored choice **beats** the browser signal everywhere; the
  browser signal (`Accept-Language`, or `navigator.languages` on Track) decides
  only on the first visit with no stored choice, and only when it clearly says
  `pl` — anything else lands on the EN default.
- **Cross-front:** a choice made on any front carries to the others, because
  the cookie is shared on the `.fabryka.ai` domain. `track.fabryka.ai`'s root
  then honors it (`pl` → `/pl/`, `en` → `/`); deep, indexed URLs still serve
  the language they address (no-guess rule, §3).
- **Write side:** the switcher and the negotiation script; the server never
  clears it.

## 3. No-guess rule

- A request that addresses a language explicitly (`/pl/...`) is served in that
  language no matter what headers or storage say.
- Only `/` may redirect, and it honors: stored choice → clearly-PL browser →
  EN default.
- Never set `hreflang` or `canonical` referencing a redirected/re-guessed URL.

## 4. Per-stack notes

- **`fabryka.ai` (Caddy/static):** `handle` on `/` evaluates the
  `fabryka_lang` cookie first, then `Accept-Language` (clearly `pl` wins);
  issues a `301` to `/pl` (PL) or stays on `/` (EN default). All other
  `handle` blocks serve the addressed path directly. The `pl/` prefix tree
  serves PL; anything else serves EN. When setting the cookie, write
  `Domain=.fabryka.ai`.
- **`slayer` (Next.js middleware):** `[locale]` routing. Middleware on `/`
  reads the cookie, then `Accept-Language` (clearly `pl` wins); both map to
  the locale and it redirects to the existing route. Middleware must **not**
  rewrite explicit `/pl/...` requests. Set the cookie via the response when
  the switcher is used.
- **`track.fabryka.ai` (Vite / React Router):** the entry point reads
  `fabryka_lang` (cookie or localStorage) **before first render**: if absent,
  `navigator.languages[0] === 'pl'` sends PL (`/pl/`), everything else stays
  on the default EN root; explicit `/pl/...` routes are declared, not
  redirected.

## 5. curl examples (static front, EN default)

```sh
# No choice, Accept-Language: en → English home (already at the EN URL)
curl -H 'Accept-Language: en' -I https://fabryka.ai/          # 200 /

# No choice, Accept-Language clearly pl → Polish home
curl -H 'Accept-Language: pl' -I https://fabryka.ai/          # 301 → /pl

# Stored pl beats Accept-Language: en
curl -H 'Accept-Language: en' -H 'Cookie: fabryka_lang=pl' -I https://fabryka.ai/   # 301 → /pl

# Deep link is never re-guessed
curl -H 'Accept-Language: pl' -I https://fabryka.ai/research  # 200, EN content

# Unknown prefix → 404
curl -I https://fabryka.ai/fr/                                # 404
```