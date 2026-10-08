# Fabryka AI — PL/EN glossary and dictionary conventions

Status: proposal (E0 task 825)
Applies to: `fabryka.ai`, `slayer`, `fabryka-track` (frontend).
Companion to `docs/i18n/url-contract.md` (task 821) and the design-system rule
"Use one language per screen" in `readme.md`.

## 1. Two rules

1. **One language per screen.** A Polish page uses Polish for navigation, labels
   and copy; an English page uses English. Do not mix within one screen.
2. **Technical names keep their spelling.** Model names, repository names, code,
   identifiers and licence names are never translated or inflected. The same
   holds for the common technical terms marked *keep* in the table (run, dataset,
   leaderboard, loss, benchmark, checkpoint, tokenizer, prompt, embedding,
   pipeline, token): PL copy borrows them in English, declining only when Polish
   grammar requires.

## 2. Tone

- **PL:** rzeczowo i konkretnie, krótkie zdania, bez marketingu i powtarzalnych
  sloganów. Nagłówki w sentence case (nie wersalikami). Głos „my" (budujemy,
  mierzymy) — spójny ze `slayer`.
- **EN:** factual and concrete, short sentences, no marketing filler, sentence
  case. "We" voice. Reserve ALL-CAPS for eyebrow labels and section markers.

Both languages state a measured number only together with its source and scope.

## 3. Fixed term table

Use these pairs consistently. Where a term is marked *keep*, it stays in the
original spelling in both languages; PL copy borrows it in English. Terms not
marked *keep* have a standard Polish equivalent and are translated.

| Concept | PL | EN | Notes |
|---|---|---|---|
| model | model | model | |
| training | trening | training | |
| run | run | run | *keep*; one tracked execution; see *experiment* |
| experiment | eksperyment | experiment | a question; a run is one execution of it |
| data mix / recipe | miks danych | data mix | |
| dataset | dataset | dataset | *keep* |
| checkpoint | checkpoint | checkpoint | *keep* |
| evaluation | ewaluacja | evaluation | |
| benchmark | benchmark | benchmark | *keep* |
| leaderboard | leaderboard | leaderboard | *keep* |
| metrics | metryki | metrics | |
| loss | loss | loss | *keep* |
| tokenizer | tokenizer | tokenizer | *keep* |
| token | token | token | |
| corpus | korpus | corpus | |
| weights | wagi | weights | |
| fine-tuning | dostrajanie | fine-tuning | |
| quantization | kwantyzacja | quantization | |
| distillation | destylacja | distillation | |
| inference | inferencja | inference | |
| latency | opóźnienie | latency | |
| throughput | przepustowość | throughput | |
| pipeline | potok | pipeline | *pipeline* stays in code/identifiers |
| prompt | prompt | prompt | *keep* |
| embedding | embedding | embedding | *keep* |
| research protocol | protokół badawczy | research protocol | |
| contributor ladder | drabina kontrybutora | contributor ladder | |

### Action forms

| PL | EN |
|---|---|
| uruchomić trening | start training |
| zapisać checkpoint | save a checkpoint |
| opublikować wynik | publish a result |
| dołączyć | join |

## 4. Do not translate

Brand and product names, model/repo names and identifiers, licences, and code.

`Fabryka` · `Fabryka AI` · `Fabryka Track` · `Slayer` · `CodeSOTA` · `DynaWord` ·
`Pollock Mini LM` · `Bielik` · `Qwen` · `GoLLeM` · `NERGAL` · `Hugging Face` ·
`Discord` · `GitHub` · model IDs (`Bielik-11B-v3`, `Qwen3.5-9B`) · repository and
slug names · command names, file paths, code identifiers · licence names
(`Apache 2.0`, `MIT`).

## 5. Dictionary format and keys

Runtime format is JSON (task 821; no `.po` at this stage). Layout per front:

```
fabryka.ai (static):   i18n/pl.json        i18n/en.json
slayer (next-intl):    messages/pl.json    messages/en.json
track (react-i18next): src/locales/pl/<ns>.json   src/locales/en/<ns>.json
```

Key rules:

- Dot-nested keys, segments in `lowerCamelCase`: `nav.research`, `hero.title`,
  `experiments.empty`, `experiment.actions.saveCheckpoint`.
- Keys are **stable identifiers**, never English sentences.
- Never build a sentence by concatenating fragments; use one full string with
  placeholders.
- Placeholders use ICU braces: `{name}`. Plurals use ICU `plural`
  (`one/few/many/other` for PL, `one/other` for EN) — never `"1 item(s)"`.
- Numbers, dates, times and percentages are formatted with `Intl` per locale,
  not hand-built strings.
- Values contain no HTML. Rich text with markup is rendered through `Trans` /
  components with placeholder slots, not by embedding tags in JSON.
- Lists that render as lists use JSON arrays, not `\n`-joined strings.

### Example

`i18n/pl.json`

```json
{
  "nav": { "research": "Badania", "publications": "Publikacje" },
  "hero": { "title": "Budujemy modele.", "subtitle": "Potem wdrażamy je do pracy." },
  "experiments": {
    "empty": "Brak eksperymentów.",
    "count": "{count, plural, one {# eksperyment} few {# eksperymenty} many {# eksperymentów} other {# eksperymentu}}"
  }
}
```

`i18n/en.json`

```json
{
  "nav": { "research": "Research", "publications": "Publications" },
  "hero": { "title": "We build models.", "subtitle": "Then put them to work." },
  "experiments": {
    "empty": "No experiments yet.",
    "count": "{count, plural, one {# experiment} other {# experiments}}"
  }
}
```

## 6. Kept terms policy

`run`, `dataset` and `leaderboard` are kept in English in both languages
(2026-10-08, owner decision): generally-known technical terms are not translated.
The same principle already applied to the other *keep* rows in the table.
