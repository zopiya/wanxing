---
name: wanxing-design
description: Use this skill to generate well-branded interfaces and assets for Wanxing / Wenxin (文心) — the warm-paper, serif-first, cinnabar-accent design language. Use for production code or for throwaway prototypes, mocks, decks, and visual artifacts. Contains essential guidelines, the canonical token system, fonts, the cinnabar-seal brand assets, and UI-kit components for F1 (web), F6 (documentation), and F5 (slides).
user-invocable: true
---

Read `README.md` at the root of this skill first — it gives you the soul of the design language (content fundamentals, visual foundations, iconography) and lists everything else in this folder.

Then read whichever of these you need for the task at hand:

- `colors_and_type.css` — friendly semantic aliases (`--bg-1`, `--fg-2`, `--accent`, `--serif-display`, etc.) layered on top of the canonical Wenxin token system. Drop this into a page and you have the baseline.
- `assets/` — the cinnabar-seal logo (red base, white stamp) and the breathing `■` brand mark. Use the SVGs directly; do not redraw them.
- `source/.opencode/agents/wenxin/design.md` — the authoritative design spec. When in doubt about a rule, this file wins.
- `source/.opencode/agents/wenxin/brand.md` — the absolute rules for the cinnabar seal (rx=4, 2.5 px stroke, never changes color in dark mode).
- `source/.opencode/agents/wenxin/components.md` — component-level specs (button, form, blockquote, tag, breadcrumb, icon system).
- `source/.opencode/agents/wenxin/presentation.md`, `documentation.md`, `poster.md`, `diagrams.md` — format-specific rules for F5 / F6 / F7 / F8.
- `source/.opencode/tokens/wenxin-tokens.css` — the three-layer canonical tokens (reference → semantic → component). `colors_and_type.css` mirrors the values; this file is authoritative.
- `preview/` — small standalone HTML cards illustrating every visual primitive. Useful when deciding what something should look like.
- `ui_kits/f1-web/` — React components for the canonical responsive site (header, hero, principle grid, post list, article). Read `ui_kits/f1-web/README.md` for the component index.
- `ui_kits/f6-documentation/` — React components for the docs surface (sidebar, code block with warm syntax, five callout variants, sticky TOC).
- `slides/` — F5 deck with seven canonical slide types (title, section, content, two-col, quote, accent, closing) as static HTML inside a `<deck-stage>`.

## How to apply this skill

### For visual artifacts (slides, mocks, throwaway prototypes, marketing pages)

1. Create static HTML files for the user to view.
2. Reference `colors_and_type.css` as a stylesheet rather than re-declaring the tokens.
3. Copy needed brand SVGs out of `assets/` into your output, never link by URL across project boundaries.
4. Lift whole components from `ui_kits/` when you can — they already encode the spec correctly.
5. For decks, use the static HTML pattern in `slides/index.html` — one `<section class="slide …">` per slide inside `<deck-stage>`.

### For production code

1. Copy `colors_and_type.css` (or `source/.opencode/tokens/wenxin-tokens.css` for the original prefixed token names) into the project.
2. Load the four Google Fonts: Lora, EB Garamond, Noto Serif SC, JetBrains Mono. Self-host if performance matters.
3. Build components against the semantic layer (`--accent`, `--fg-1`, etc.) — never inline a hex value. This is what makes dark mode and theming survive.
4. Cross-check against `source/.opencode/agents/wenxin/design.md` §9 "Forbidden list" before shipping — it is short and unforgiving.

## Hard rules to remember (the most-violated ones)

- **Accent ≤ 2 occurrences per page.** Icon active/selected states are exempt. Anything else past two breaks the spec.
- **No shadows. No filled buttons. No gradients. No card-with-rounded-corner-and-colored-left-border.** These are the four most common AI-design tropes; the system explicitly forbids all of them.
- **Stroke icons only, 1.5 px at every size, one library per product.** Lucide for tools, Phosphor Light for content.
- **The cinnabar seal logo never changes color in dark mode.** It is `#8B3525` base + `#FFFFFF` stamp, always.
- **Body is serif. UI labels are sans. Never invert that.**
- **No emoji.** The only repeated glyph is `■`.

## When the user invokes this skill with no other guidance

Ask what they want to build or design. Useful clarifiers:

- Which format — F1 web, F5 slides, F6 docs, something else (and is "something else" actually Wenxin territory, or do they want a dashboard / e-commerce thing the system explicitly doesn't cover)?
- Light mode, dark mode, or both?
- Chinese, English, or bilingual?
- Real content to drop in, or should you write placeholder copy in the Wenxin voice (aphoristic, sentence case, no emoji, full-width CJK punctuation)?

Then act as an expert designer who outputs HTML artifacts or production code depending on the need.
