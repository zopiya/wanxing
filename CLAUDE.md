# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

**文心 · 万形 (Wenxin · Wanxing)** is a bilingual (Chinese-first, English-parallel) design system.
It ships both a **specification** and **reusable artifacts** — it is not documentation-only.

Core proposition: **文字即界面，留白即设计，克制即力量** — *Text is the interface. Whitespace is the
design. Restraint is the power.*

Two layers, the "water principle" (水的原则): **文心 wenxin** is the invariant soul (tokens,
principles); **万形 wanxing** is the form it takes across nine closed output media (F1–F9). One soul,
ten thousand forms.

## Repository Structure

```
spec/      说什么 — the specification (bilingual prose)
kit/       给什么 — reusable artifacts: tokens, base CSS, components, patterns, markdown, charts
examples/  长什么样 — nine form examples (built on kit/)
scripts/   怎么校验 — build and audit
```

### `spec/`

- **`spec/README.md`** — the index. Start here.
- **`spec/tracks.md`** — **the two-track arbitration rule. Read this before resolving any conflict
  between the design philosophy and mainstream convention.** It is the newest and most load-bearing
  mechanism in the system.
- **`spec/soul/`** — the invariant layer. `philosophy.md` (七维度模型 A–G), `aesthetics.md`
  (34 auditable criteria), `color.md`, `typography.md`, `spacing.md`, `rhythm.md`, `motion.md`
  (intensity levels E8/E9-0/E9-1/E9-2), `components.md`, `data-viz.md`, `brand.md`, `icons.md`,
  `accessibility.md`, `forbidden.md`.
- **`spec/forms/`** — F1–F9 plus `DECISIONS-MATRIX.md` (**the entry point** — one table showing what
  each of the nine forms is forced to decide differently), `page-archetypes.md`,
  `render-contract.md`, `cross-form-matrix.md`.
- **`spec/DECISIONS.md`** — the conflict-judgment log. Every philosophy-vs-convention call, with
  reasoning and which arbitration layer decided it.
- **`spec/PROVENANCE.md`** — where the current content was harvested from, and the SHA where the
  deleted historical material still lives.
- **`spec/_harvest/`** — transient Phase-0 artifacts. Consumed and deleted by later phases.

### `kit/`

`tokens/core.css` is the **single source of truth for every numeric value.** The `.md` files quote
excerpts for readability; on any conflict, `core.css` wins. Never hand-copy a value from Markdown
into code, and never edit a token only in prose.

```
kit/
  index.css        import this for everything
  layers.css       cascade order — declared once, so nothing downstream fights
  tokens/          core.css + dark.css, forms/fN-*.css, generated/
  base/            reset, typography, a11y, motion, layout, print, self-hosted fonts
  components/      ~34 v1 components + js/ behaviours
  patterns/        five copyable A–E page-archetype skeletons
  markdown/        .wx-md prose, syntax highlighting, Hugo render hooks
  charts/          ink-encoded chart styles + SVG conventions
  dist/            unminified, import-free wenxin.css + wenxin-f1…f9.css
  assets/brand/    logo SVGs
```

Tokens sit in three tiers, and the tier is the architecture: **core** (cross-form), **forms/fN**
(form-scoped, e.g. `--print-text-*`, `--sidebar-width`), and **component-scoped** (declared with
the component that owns them).

## Working in this repo

### The two-track rule is the thing to internalize

The philosophy is opinionated (no cards, no shadows, no gradients, no filled buttons, ≤2 accent
occurrences per page). That opinionation collides with mainstream convention in predictable places.
`spec/tracks.md` resolves this in three layers, checked top-down:

1. **Global floor** — accessibility and basic usability. Convention wins unconditionally, in every
   form and both tracks. WCAG 2.2 AA, visible focus, keyboard reach, touch targets, never
   color-alone, `prefers-reduced-motion`.
2. **Track by form** — *editorial* (F1, F3–F9) applies the visual constraints in full; *application*
   (F2, and any page using archetype E) relaxes them. Declared per page in the render contract as
   `"track"`. **An archetype-E page flips the track of whatever form hosts it.**
3. **Component-category override** — data-entry and feedback components always follow convention,
   in either track. A form is a form.

Roughly 60% philosophy, 40% convention — but the split is produced by those three layers, not
by taste.

### Authoring conventions

- **Chinese first, English immediately after** — sentence-by-sentence or paragraph-by-paragraph, not
  side-by-side columns. Headings are `中文 · English`.
- Every `soul/` file opens with `> 属于 [spec](../README.md) 灵魂层 — Soul layer`; every `forms/`
  file with the form-layer equivalent plus its track and motion intensity.
- **Flag gaps and contradictions candidly rather than smoothing them over.** This is an explicit
  convention of the system — see how `cross-form-matrix.md` records its own earlier misjudgment.
- CSS custom properties: `--color-*` `--text-*` `--space-*` (4px grid) `--duration-*` `--ease-*`
  `--font-*` `--leading-*` `--tracking-*` `--width-*` `--icon-*` `--radius-*` `--stroke-*`
  `--stagger-N`.
- Component classes: `wx-` prefix, BEM-lite with **only one `__` level**, and **state expressed
  through ARIA or native attributes** (`aria-current`, `disabled`, `open`) — never a `.is-active`
  class. That rule is derived from the ban on color-only state distinction: binding CSS state to the
  accessibility tree makes an imperceptible state structurally impossible.

### Load-bearing constraints

The single-accent rule (≤2 per page) and the ■ cinnabar-seal mark are cross-referenced from many
files. If you touch either, update every reference.

**There is no card component.** Use `wx-entry` — single-edge rule plus whitespace. The prohibition
targets the *geometry* (a four-sided box: border, shadow, or fill + radius), not the noun; do not
reintroduce it as `.panel`, `.box`, `.tile`, or `.surface`.

## Commands

Zero runtime dependencies; everything is plain Node. Artifacts ship unminified — engineering
concerns come after the system is complete.

```sh
npm run build            # tokens + chart themes + unminified CSS bundles
npm run build:css        # flatten kit into unminified single-file bundles
npm run check            # token resolution + forbidden patterns + audit all examples
npm run audit <file>     # render-audit one page
python3 -m http.server 8899   # examples need http; file:// blocks @import and fonts
```

**`npm run check` is currently green: 0 failures, 0 warnings across all nine form examples.**

Six checks, each of which caught a real defect. Two of them caught defects in the checking itself,
which is the failure mode to watch here: **a check that cannot fail is worse than no check**, because
its green output gets cited as evidence. Negative-control anything you are about to call passing.

- `check:tokens` — every `var(--x)` resolves. The pre-rebuild examples referenced 52 tokens that
  were never defined anywhere, and nothing noticed because nothing looked. For HTML it scans only
  `<style>` blocks and style attributes, so `var(--x)` written inside a `<code>` element is treated
  as prose, not a reference.
- `check:forbidden` — makes `forbidden.md` executable: shadows, gradients, `outline:none`, bouncy
  easing, over-thick borders, spinners. It is comment-aware, because a checker with false positives
  gets ignored, which is worse than not having one.
- `audit:examples` — the render contract per page, dispatched by `track`. Every declared
  `profileSpecificCheck` dispatches to a real assertion and an unknown name is a hard failure;
  pages carrying no contract are listed as `skip` rather than silently dropped.
- `check:colors` — measures every light/dark text, semantic, accent, and focus pair, plus pairwise
  ΔE. Field audit found production greys at 1.54–3.23:1 — and the same failing values had been
  shipped in `core.css`; this prevents them returning as text tokens.
- `audit:selftest` — submits an intentionally invalid F6 page, proving a declared sidebar check and
  the generic focus check both reject it. This exists because `audit-all` once read the wrong report
  field and falsely printed a green matrix.

## Status

All nine forms are built and passing. The v1 and v2 component inventories are both complete —
64 block-level `wx-` classes spanning layout, navigation, data entry, data display, feedback,
overlay, controls, and content, across 29 stylesheets and 7 behaviour scripts — plus all five
archetype patterns. The optional React wrapper stays deferred
until the HTML/ARIA contracts have production use; do not create placeholders to complete a count.

Overlays (`wx-modal`/`wx-drawer`/`wx-toast`) are the one place a bounded surface is legal, and the
exception is argued in DECISIONS **D-21** rather than assumed. Text has exactly four tiers because
the AA floor bounds how many are distinguishable (**D-20**).

`archive/`, `opendesign/`, and the old examples were deleted after harvesting, and remain in git at
`93fba710`. Open Design packaging is intended as a future project *derived from* this one — do not
re-add an adapter layer here.

When you change a token, run `npm run build` and commit the regenerated files; when you change
anything under `kit/`, run `npm run check` before committing. If a CSS edit seems to have no
effect in the browser, it is almost certainly the cached `kit/index.css` — append `?v=2`.
