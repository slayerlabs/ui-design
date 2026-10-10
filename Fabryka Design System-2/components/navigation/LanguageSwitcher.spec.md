# LanguageSwitcher — spec

Status: proposal (E0 task 824)
System: Fabryka Design System — `components/navigation/`
Companions: `docs/i18n/url-contract.md` (821), `docs/i18n/negotiation.md` (823).
Reference: `components/navigation/language-switcher.html`.

One switcher design reusable across plain HTML, Next.js and Vite. It links to
the counterpart of the current page in the other language (URL rule from task
821), works without JavaScript, and meets keyboard and screen-reader basics.

## 1. Visual spec

- **Placement:** top navigation, far right, last item before any primary CTA.
- **Labels:** the two-letter codes `PL` and `EN`; full names `Polski` /
  `English` in `aria-label` and `title`. The current language is rendered as a
  non-link element (never the self-link the URL contract forbids).
- **Active state:** the current language is visually marked (filled
  background / underline) and carries `aria-current="page"`.
- **Mobile:** both codes remain visible side by side; each hit target is at
  least 44×44 px. No dropdown.

## 2. Markup contract

```html
<nav aria-label="Język">
  <a href="/en/research" hreflang="en" lang="en"
     aria-label="Switch to English" title="English">EN</a>
  <span lang="pl" aria-current="page" title="Polski">PL</span>
</nav>
```

- The target language is a plain `<a>` link — the switcher works with
  JavaScript disabled; the current language is a non-interactive `<span>`
  (the URL contract forbids a same-language link).
- `aria-current="page"` marks the active language; `aria-label` gives the full
  language name on the link.
- `href` is the counterpart of the current page in the other language,
  following the URL contract (add/remove the `/en` or `/pl` prefix; never link
  to the site root unless the current page is the root).
- Focus: default visible focus ring on the link.

## 3. Adoption notes

- **Static (`fabryka.ai`):** copy the reference block verbatim per page; the
  build generates the two `href`s from the page path.
- **Next (`slayer`):** wrap with `next/link` (`<Link href="/en/zadania">`),
  keep `hreflang`/`lang`; the switcher receives the current locale as a prop
  and renders the active one as a `<span aria-current="page">`.
- **Vite (`track`):** wrap with React Router `Link` to the counterpart route
  (`/pl/runs` ⇄ `/runs`); the component computes the target from the current
  route name. First-visit detection (`navigator.languages[0] === 'pl'`) is the
  entry point's job (task 823), never the switcher's.
- Persisting the choice: on switch the switcher writes the `fabryka_lang`
  cookie (`Domain=.fabryka.ai`, `Path=/`, `SameSite=Lax`, `Secure`, 1 year, not
  `HttpOnly` since it is client-written), so the choice carries across all
  fronts (task 823's storage rule).