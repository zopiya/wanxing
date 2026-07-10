# Wenxin for Open Design

This directory packages [`wenxin/`](../wenxin/README.md) (design spec / soul) and [`wanxing/`](../wanxing/README.md) (form reference) as a **`DESIGN.md`** — the open, machine-readable format ([`google-labs-code/design.md`](https://github.com/google-labs-code/design.md)) that Open Design (nexu-io/open-design), Google's Stitch, and a growing set of AI design tools read directly.

## The actual format (confirmed against Open Design's UI)

A `DESIGN.md` file is **YAML frontmatter (machine-readable tokens) + a Markdown body (human-readable rationale)**:

```yaml
---
name: <string>            # required
description: <string>     # optional
colors:
  <token-name>: <CSS color>
typography:
  <token-name>: { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, ... }
rounded:
  <scale-level>: <dimension>
spacing:
  <scale-level>: <dimension|number>
components:
  <component-name>:
    <property>: <value or {colors.x} / {typography.x} reference>
---

## Overview
## Colors
## Typography
## Layout
## Elevation & Depth
## Shapes
## Components
## Do's and Don'ts
```

`{path.to.token}` is the cross-reference syntax — write `{colors.accent}` in a component definition instead of repeating the hex value. This is the format Open Design's "粘贴 DESIGN.md" import box expects (confirmed by its own UI example: `name` / `colors: primary / tertiary` / `typography: h1: ...`).

## How to actually build the template (step by step)

1. Open [`opendesign/wenxin/DESIGN.md`](./wenxin/DESIGN.md) in this repo — it's already written to this spec, with every token distilled from [`wenxin/tokens.css`](../wenxin/tokens.css) and every rule cross-referenced back to `wenxin/*.md`.
2. In Open Design, go to the creation screen shown in your screenshot ("从 GitHub、网站或源素材提取").
3. Use the **"粘贴 DESIGN.md"** box — paste the full contents of `wenxin/DESIGN.md` (frontmatter included) directly in. This is the precise path: it uses our already-curated tokens and rules as-is, instead of Open Design guessing them from a URL crawl.
4. Optionally also use **"添加文件"** to upload the brand SVGs in [`wenxin/assets/`](./wenxin/assets/) (logo-wenxin.svg, brand-mark.svg, etc.) so Open Design has the real logo files, not just a text description of them.
5. You can *also* fill in the top **"GitHub 或网站"** field with this repo's URL — Open Design will crawl it and auto-derive a starting system — but that path re-derives colors/type from scratch and will not carry over the deliberate constraints (single accent, no shadows, no cards, the ■ mark's exact behavior). Prefer step 3 for fidelity; use the URL field only if you want Open Design's own auto-extraction as a starting point instead.

## What's here

```
opendesign/wenxin/
├── DESIGN.md          — the file to paste into Open Design (frontmatter + 8-section body)
├── tokens.css          — verbatim copy of wenxin/tokens.css, for local reference/dev use
├── components.html     — a fixture rendering the components with real CSS, for visual sanity-checking outside Open Design
├── manifest.json        — optional bookkeeping entry for this repo; Open Design's own import flow doesn't require it
└── assets/               — brand mark + logo SVGs (upload alongside DESIGN.md via "添加文件")
```

`DESIGN.md`'s body follows the canonical 8-section order (Overview → Colors → Typography → Layout → Elevation & Depth → Shapes → Components → Do's and Don'ts), plus one extra "Agent notes" appendix at the end — that appendix isn't part of the spec, it's just this repo's own pointer back to `wanxing/how-to-use.md` and is safe to ignore if a stricter tool trims unknown sections.

`DESIGN.md`'s **Layout** section intentionally does not try to encode all nine `wanxing/fN-*.md` output-medium files — `design.md`'s schema has no "medium" concept. Layout instead links out to `wanxing/` for anything medium-specific (web nav, print grids, poster canvas ratios). Once a design system is loaded into Open Design, tell the agent which medium you're targeting and point it at the matching `wanxing/fN-*.md` file for the concrete layout rules; `DESIGN.md` alone only carries the soul.

## Keeping this in sync

`tokens.css` here is a copy, not a symlink — if [`wenxin/tokens.css`](../wenxin/tokens.css) changes, re-copy it and update the matching values in `DESIGN.md`'s frontmatter. If `wenxin/*.md` rules change, update `DESIGN.md`'s body to match — this file should always be a distillation, never a second source of truth.

## Caveat

The frontmatter schema above is the real, confirmed `design.md` spec (verified against `google-labs-code/design.md`'s own spec doc and cross-checked against a screenshot of Open Design's own paste-in UI). What's still unverified is Open Design-specific behavior beyond that: which frontmatter fields it actually reads vs. ignores, whether it validates strictly, and what its auto-extraction (GitHub/website URL path) produces. Treat step 3 above as the reliable path and steps 2/5 as things to sanity-check once you're in the actual product.
