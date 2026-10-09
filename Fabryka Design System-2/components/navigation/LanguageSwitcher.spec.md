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
  `English` in `aria-label` and `title`. The current language is not a link.
- **Active state:** the current language is visually marked (filled
  background / underline) and carries `aria-current="true"`.
- **Mobile:** both codes remain visible side by side; each hit target is at
  least 44×44 px. No dropdown.

## 2. Markup contract

```html
<nav aria-label="Language">
  <a href="/en/research" hreflang="en" lang="en"
     aria-label="Switch to English (for example)" title="English">
    EN
  </a>
  <a href="/research" aria-current="true" hreflang="pl" lang="pl">PL</a>
</nav>
```

- Plain `<a>` links to the language variants — the switcher works with
  JavaScript disabled.
- `aria-current="true"` marks the active language; `aria-label` gives the full
  language name on each link.
- `href` is the counterpart of the current page in the other language,
  following the URL contract (add/remove the `/en` or `/pl` prefix; never link
  to the site root unless the current page is the root).
- Focus: default visible focus ring on both links.

## 3. Adoption notes

- **Static (`fabryka.ai`):** copy the reference block verbatim per page; the
  build generates the two `href`s from the page path.
- **Next (`slayer`):** wrap with `next/link` (`<Link href="/en/zadania">`),
  keep `hreflang`/`lang`/`aria-current`; the switcher receives the current
  locale as a prop.
- **Vite (`track`):** wrap with React Router `Link` to the counterpart route
  (`/pl/runs` ⇄ `/runs`); the component computes the target from the current
  route name.
- Persisting the choice: the switcher writes the `fabryka_lang` cookie
  (`Domain=.fabryka.ai`, `Path=/`, 1 year) when the user switches, so the
  choice carries across all fronts (task 823's contract); navigation itself is
  the only job of the switcher.