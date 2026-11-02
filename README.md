# @slayerlabs/ui-design

The Fabryka design system. This repository describes the identity already published at
https://fabryka.ai — tokens only, no components and no runtime. The full description of the identity
is in [`Fabryka Design System-2/readme.md`](Fabryka%20Design%20System-2/readme.md).

## Install

The package is `"private": true` and is not published. A consuming application vendors a tarball:

```bash
npm pack                      # produces slayerlabs-ui-design-<version>.tgz
```

Copy it into the application, point the dependency at the file and record the sha512:

```json
"@slayerlabs/ui-design": "file:vendor/slayerlabs-ui-design-0.1.1.tgz"
```

```bash
node -e 'const {createHash}=require("node:crypto"),fs=require("node:fs");const b=fs.readFileSync(process.argv[1]);console.log("sha512-"+createHash("sha512").update(b).digest("base64"))' vendor/slayerlabs-ui-design-0.1.1.tgz
```

## Use

```css
@import "@slayerlabs/ui-design/tokens.css";
```

`tokens.css` declares on `:root` and on `[data-theme="carbon"]`. `tokens.scoped.css` is the same
declarations scoped under `[data-fabryka-ds]`, for a page that cannot own `:root`. Import one or the
other, never both.

Consume semantic roles (`--surface`, `--text-body`, `--text-accent`, `--space-*`, `--size-*`,
`--weight-*`, `--radius-*`, `--z-*`) rather than the palette. The palette names are compatibility
aliases.

## Build and test

```bash
npm run build:tokens     # regenerate dist/tokens.css and dist/tokens.scoped.css
npm run test:tokens      # node:test — build, hygiene and contrast gates
npm run sync:manifest    # regenerate Fabryka Design System-2/_ds_manifest.json and _adherence.oxlintrc.json
```

`dist/` is generated and git-ignored. Run `build:tokens` before `npm pack`: `prepack` does it, but a
consistency check on CI needs the files on disk.

Sources: `Fabryka Design System-2/tokens/{colors,spacing,borders,motion,typography,effects,stacking}.css`,
concatenated in that order. `tokens/base.css` (a reset) and `tokens/fonts.css` (a Google Fonts import)
are excluded on purpose, and `--font-*`/`--serif`/`--sans`/`--mono` declarations are stripped because a
consuming application supplies those through `next/font`.

## Versioning

A patch release fixes a value without renaming a token. A minor release may add tokens, but a rename
is a breaking change and waits for `0.2.0`. Every consuming application upgrades in its own pull
request that reads `CHANGELOG.md` first.
