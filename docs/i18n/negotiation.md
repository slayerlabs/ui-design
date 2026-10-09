# Language negotiation and persistence rules

Status: proposal (E0 task 823)
Applies to: `fabryka.ai`, `slayer`, `fabryka-track` (frontends).
Companion to `docs/i18n/url-contract.md` (task 821) and `docs/i18n/glossary.md`
(task 825). Defaults per front come from the URL contract: `fabryka.ai`/`slayer`
default to `pl`, `track.fabryka.ai` defaults to `en`.

## 1. Behavior matrix

| Case | What happens |
|---|---|
| `/` with no stored choice | Redirect to the default-language URL (no redirect when the front is already at its default URL). `Accept-Language` is considered only if it is clearly `pl` or `en` and the default differs; otherwise the default wins. |
| `/` with stored choice | Redirect to the stored choice language, no negotiation. |
| Direct URL in either language (`/x`, `/en/x`, `/pl/x`) | Serve exactly as addressed. Never re-guess from headers. |
| Unknown prefix (`/fr/...`) | 404 (or a 404 page in the default language); never a silent redirect into a guessed language. |
| Bot without cookies / `Accept-Language` | Same as "no stored choice"; server-side decision (per D-006, only `/` redirects, protecting deep links and SEO). |

D-006 (proposed): redirect **only from `/`**. Deep links and indexed URLs are
never redirected into another language, so a shared link always lands on the
language its author addressed.

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
- **Precedence:** stored choice **beats** `Accept-Language` everywhere.
- **Cross-front:** a choice made on any front carries to the others, because
  the cookie is shared on the `.fabryka.ai` domain. `track.fabryka.ai`'s root
  then honors it (`pl` → `/pl/`, `en` → `/`); deep, indexed URLs still serve
  the language they address (no-guess rule, §3).
- **Write side:** the switcher and the negotiation script; the server never
  clears it.

## 3. No-guess rule

- A request that addresses a language explicitly (`/en/...`, `/pl/...`) is
  served in that language no matter what headers or storage say.
- Only `/` may redirect, and it honors: stored choice → explicit
  `Accept-Language` (`pl`/`en` only) → default language.
- Never set `hreflang` or `canonical` referencing a redirected/re-guessed URL.

## 4. Per-stack notes

- **`fabryka.ai` (Caddy/static):** `handle` on `/` evaluates the
  `fabryka_lang` cookie first, then `Accept-Language`; issues a `308`/
  `301` to `/` (pl) or `/en` (en). All other `handle` blocks serve the
  addressed path directly. The `en/` prefix tree serves EN; anything else
  serves PL. When setting the cookie, write `Domain=.fabryka.ai`.
- **`slayer` (Next.js middleware):** `[locale]` routing. Middleware on `/`
  reads the cookie, then `Accept-Language`; both map to the locale and it
  redirects to the existing route. Middleware must **not** rewrite explicit
  `/en/...` requests. Set the cookie via the response when the switcher is
  used.
- **`track.fabryka.ai` (Vite / React Router):** the entry point reads
  `fabryka_lang` (cookie or localStorage) on `/` before the first render and
  navigates to the counterpart of the default page; explicit `/pl/...` routes
  are declared, not redirected.

## 5. curl examples (static front, pl default)

```sh
# No choice, Accept-Language: en → English home
curl -H 'Accept-Language: en' -I https://fabryka.ai/          # 301 → /en

# Stored pl beats Accept-Language: en
curl -H 'Accept-Language: en' -H 'Cookie: fabryka_lang=pl' -I https://fabryka.ai/   # 200 /

# Deep link is never re-guessed
curl -H 'Accept-Language: en' -I https://fabryka.ai/research  # 200, PL content

# Unknown prefix → 404
curl -I https://fabryka.ai/fr/                                # 404
```