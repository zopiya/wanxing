# 万形 · Wanxing — Wenxin (文心) Design System

> *万种形态，同出一源。*
> Ten thousand forms, one source. The Wenxin design language.
>
> **文字即界面，留白即设计，克制即力量。**
> Text is the interface. Whitespace is the design. Restraint is the power.

---

## What this is

**Wanxing (万形)** is an OpenCode design-engineering project built around a single design language called **Wenxin (文心)**. The same language flows into nine output formats — F1 through F9 — without ever changing its soul:

| | Form | What it covers |
|---|---|---|
| **F1** | 文心正典 · HTML Web | Responsive websites, blogs, landing pages, portfolios |
| **F2** | 文心移动 · Mobile App | iOS / Android native-feel adaptation |
| **F3** | 文心品牌 · Brand Identity | The cinnabar-seal logo system, stationery, brand book |
| **F4** | 文心书卷 · Print & Editorial | Books, journals, magazines, zines (pt units, CMYK) |
| **F5** | 文心演示 · Presentation | 16:9 slide decks (display-first type scale) |
| **F6** | 文心文档 · Documentation | API docs, wikis, knowledge bases (240 px sidebar, warm syntax) |
| **F7** | 文心海报 · Poster & Cover | Single-page strong visual (6 ratios, display type) |
| **F8** | 文心图解 · Diagram | Architecture / flow / knowledge maps |
| **F9** | 文心报告 · Report & LaTeX | Markdown → XeLaTeX → PDF research reports |

The list is closed at F9 by spec — Newsletter, dashboards, e-commerce, games, CRM are explicitly **out of scope**.

### Two-layer architecture (the water principle)

> *Water in a cup takes the shape of the cup. In a river, the shape of the river. The molecule never changes.*

| Layer | Contents | Mutable? |
|---|---|---|
| **Soul** | Color palette · serif-first typography · cinnabar accent · breathing motion · "less is more" density | **Never** |
| **Form** | Layout · navigation pattern · component composition | **Per format** |

The soul is what makes a Wanxing webpage and a Wanxing print poster feel like siblings even though they share no markup.

### Sources used to build this kit

This design system was built directly from a single source of truth:

- **GitHub:** [`zopiya/wanxing`](https://github.com/zopiya/wanxing) — the OpenCode project, agents, design spec, tokens, and `docs/wanxing-f1-web` through `docs/wanxing-f9-report` example outputs.
- Related: [`zopiya/wenxin`](https://github.com/zopiya/wenxin) — a Hugo blog theme that is the original embodiment of the Wenxin reading experience.

We pulled the canonical design spec (`design.md`), the brand spec (`brand.md`), the component spec (`components.md`), the format-specific specs (presentation, documentation, poster, diagram), and the three-layer CSS token system into `source/`. The two reference HTML examples (`docs/wanxing-f1-web` and `docs/wanxing-f6-documentation`) live there too — they're the highest-fidelity reference for how the language renders in practice.

> If you have access to the repo, **read those files first** before stretching into new territory. The spec is detailed, and it disagrees with most modern design conventions on purpose.

---

## Content fundamentals

Wenxin treats *the content itself* as the visual primary. Copy is written, not generated — and certain habits run through every piece of writing in the system.

### Voice & register

- **Bilingual but Chinese-first.** Headings often appear in both 中文 and English; sometimes only Chinese. English is treated with the same care, not as filler. The reading order is usually CJK → Latin.
- **Aphoristic.** Short, balanced, often four-character phrases. "文字即界面，留白即设计，克制即力量。" — three clauses, each three characters + 即 + two characters, almost as rhythmic as a couplet.
- **Lowercase, no exclamation.** Western copy uses sentence case and full stops; UI labels go ALL CAPS with `letter-spacing: 0.15em`. Never `!`, never emoji decoration, never the word "amazing".
- **Author-present, not chummy.** Specs read like an editor's letter — "我们" / "we" used sparingly, "你" / "you" only in onboarding. First person is mostly absent; the reader is addressed through the work.
- **Punctuation is part of the typography.** Chinese full-width punctuation (，。：「」) is honored. The brand mark `■` is its own piece of punctuation, used after a signature like a seal.

### Tone examples (lifted from the source)

| Where | English | Chinese |
|---|---|---|
| Hero subtitle | *Ten thousand forms, one source.* | 万种形态，同出一源 |
| Section eyebrow | `01 · DESIGN PHILOSOPHY` | `01 · 设计哲学` |
| Principle title | Text is the interface | 文字即界面 |
| Principle body | "Content itself is the visual subject. Every UI decision serves the same goal: let the user enter the content naturally and quietly — not be interrupted by the interface." | 内容本身是最重要的视觉主体。所有 UI 决策服务于同一目标：让用户最自然、最安静地进入内容。 |
| Forbidden item | "Cards with shadows — creates unnecessary visual hierarchy." | 卡片 + 阴影 — 制造不必要的视觉层级。 |
| CTA | `Explore the forms →` | `探索形态 →` |

### Casing & emoji

- **Display type:** sentence case in both languages.
- **UI labels, eyebrows, nav items:** `UPPERCASE` with `--tr-wider` (0.15em).
- **Emoji:** **none.** Not in marketing copy, not in headings, not in UI. The only "icon" the brand uses recurrently is the breathing `■`.
- **Unicode marks that ARE used:** `■` (brand mark), `·` (separator in eyebrows like `01 · PHILOSOPHY`), `→`, `↓`, `>>`, em dashes `—`, full-width 「」 quotes for CJK pull quotes.

### Hierarchy of feeling

Every page is asked to behave like a printed page: one big idea at the top, restful whitespace, a single moment of color, then the reader leaves. The system actively penalizes "more is more" — see the **Forbidden List** in `source/.opencode/agents/wenxin/design.md` §9.

---

## Visual foundations

### Color

| Role | Light | Dark |
|---|---|---|
| Canvas (warm) | `#F2F0EB` | `#1A1816` |
| Surface | `#FAFAF8` | `#201E1B` |
| Pure (article) | `#FFFFFF` | `#242220` |
| Tint (code/quote) | `#F0EDE7` | `#2A2724` |
| Ink (body) | `#3A3837` | `#E8E3DC` |
| Ink (heading) | `#2C2B29` | `#F0EBE3` |
| Warm gray (meta) | `#888580` | `#8A857D` |
| Muted | `#B0ABA4` | `#5A5550` |
| **Accent (cinnabar)** | **`#8B3525`** | **`#C4533E`** |
| Border subtle | `#E5E1DA` | `#2E2B27` |
| Border strong | `#C8C3BA` | `#403C37` |

**Hard rules.**
- **Accent ≤ 2 occurrences per page.** Icon active/selected states are exempt. Past two, accent stops being a stamp and becomes decoration.
- Body text contrast ≥ 7:1 (WCAG AAA), secondary ≥ 4.5:1 (AA).
- **No gradients.** Not in backgrounds, not in buttons, not in CTAs. The system reads gradients as a violation of "温暖极简".
- **No high-saturation blue/green/purple/orange.** The palette is "warm earth" only.

The dark mode is called *夜晚的羊皮纸* — "night vellum". It is not pure black on pure white inverted; it is the same vellum, dimmed.

### Type

- **Display serif:** Lora (Latin) → Noto Serif SC (CJK fallback)
- **Body serif:** EB Garamond (Latin) → Noto Serif SC (CJK fallback)
- **UI sans:** SF Pro Text → system-ui → PingFang SC — *only* for labels, metadata, nav
- **Mono:** JetBrains Mono → Fira Code → SF Mono

Latin-first stacks with CJK fallback are deliberate. The two pair because both are humanist, slightly old-style, and warm in color — they share temperature where they don't share script.

Scale (Major Third, 1.250): `11 · 13 · 16 · 17 · 20 · 24 · 30 · 36 · 48 · 72px`. The body default sits at 17px (`--t-md`) with `--lh-relaxed` (1.85) — generous for CJK reading.

### Spacing & rhythm

- 4 px grid: `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 96 · 128`.
- **Paragraph gap = 20 px.** Section gap ≥ 96 px. *"When you feel the gap is too big, it's usually just right."*
- Content widths use `clamp()` — article 520–640 px, content 620–760 px, showcase 700–920 px. Page padding 20–72 px responsive.
- One paragraph ≤ 5–7 lines. After 3 long paragraphs you insert an anchor — h3 / pull-quote / blockquote / image — to let the reader breathe.

### Backgrounds & imagery

- **Solid warm-paper fields only.** No textures, no patterns, no gradients, no hero photography on the home page.
- When imagery appears in F4 / F5 / F7, it is content imagery, never decoration — full bleed *only* for cover-class poster work, otherwise it sits inside the content column at 100% width with no rounding, no shadow, no border, and a `--font-ui --t-sm --fg-4` caption.
- Color vibe of imagery: warm, slightly desaturated, never cold or candy. Black & white is welcome. Grain is fine.

### Borders, shadows, radii

- **No shadows. Anywhere.** Cards do not exist as a visual primitive — separation is achieved through whitespace.
- **Radii ≤ 4 px.** `--r-sm` (2 px) is for chips/tags. `--r-md` (4 px) is the absolute ceiling. The cinnabar seal logo uses `rx="4"`. No pill buttons, no `border-radius: 9999px` except for the brand mark animation.
- **Borders are 1 px, period.** `--line-1` for sometimes; `--line-2` for special. Thicker is forbidden.
- **No left-colored-border cards.** That trope (rounded card + colored 4-px left border + icon) is explicitly listed as AI-design noise and never used.

### Motion — *春雨润物*

"Spring rain nourishes; details have a sound." Animations only exist at hover, state-change, page-enter, and the 4-second breath of `■`.

| Duration | Use |
|---|---|
| `--d-instant` 80 ms | checkbox / toggle / pressed |
| `--d-fast` 180 ms | color / opacity hover |
| `--d-base` 260 ms | expand / collapse / theme swap |
| `--d-slow` 420 ms | entrance, fade-up (translate ≤ 8 px) |
| `--d-crawl` 600 ms | the absolute ceiling — one ceremony per page |

Easings: `cubic-bezier(0.25,0.1,0.25,1)` default, `ease-out` for entrance, `ease-in` for exit, `ease-in-out` only for the `■` breath. **Forbidden:** rotation, bounce, parallax, scale, 3D, loops (the brand mark and loading spinners are the only exceptions), translates over 16 px, durations over 600 ms.

### States

| State | Treatment |
|---|---|
| **Link hover** | `color` → `--accent`, 180 ms |
| **Icon hover** | `opacity 0.6 → 1`, 180 ms |
| **Button hover** | border + text → `--accent`, 180 ms (no fill change, ever) |
| **Press** | no scale, no shrink, no shadow shift — instant color settle (80 ms) |
| **Focus** | `outline: 2px solid var(--focus-ring)` + 2 px offset. **Never** `outline: none`. |
| **Disabled** | border + text → `--muted`, no opacity tricks |
| **Active / selected (nav/icon)** | `--accent` (this is the one case where accent budget doesn't apply) |

### Transparency, blur, layering

- **No `backdrop-filter`.** No frosted glass. The system has nothing to layer.
- Transparency is used in exactly one place: the focus ring (`rgba(139,53,37,0.4)`).
- No floating headers, no sticky CTAs that drift over content. Headers and footers are part of the document flow.

### Cards (anti-pattern)

There is no "card component". Where other systems would use a card, Wenxin uses:
- Whitespace between siblings (`--s-8` to `--s-16`)
- A 1-px hairline (`--line-1`) at the top of an article
- A short 40-px attribution rule above a signature

If you find yourself reaching for `box-shadow`, you're off the path.

### Layout rules

- Single-column reading by default. Two columns reserved for résumé-style timelines (date left, content right) and F4 magazine spreads.
- Content centered in a `clamp()` column. Body copy is **never** centered.
- Page hits a fixed top padding `--s-32` (128 px) on desktop; mobile drops to `--padding-page-x` 20 px.

---

## Iconography

### Approach

Wenxin is intentionally **light on iconography**. Icons are a substitute for words, not a decoration of them. The system uses an icon only when:

1. The symbol is globally settled (search 🔍 in *idea*, close ✕, menu ☰, user, settings, arrow).
2. Space genuinely demands it (toolbars, dense nav).
3. It runs beside a text label so meaning is doubled.

Otherwise: the word wins.

### Visual rules

- **Stroke only.** No filled icons, ever.
- **1.5 px strokes** at all sizes (no scaling-up of stroke).
- **Three sizes only:** `--icon-sm` 16 px (inline with body), `--icon-md` 20 px (UI controls), `--icon-lg` 24 px (toolbar / sidebar).
- **One library per product.** Mixing Lucide and Phosphor on the same page is a hard violation — the stroke personality differs.
- **Color follows text:** secondary → primary on hover → accent on active. No icon ever uses a custom color outside this table.

### Recommended sources

| Library | When | Notes |
|---|---|---|
| **Lucide** (lucide.dev) | Tools, dashboards, sidebars, nav | Geometric, even strokes; biggest set; React/Vue bindings |
| **Phosphor Icons** Light/Regular (phosphoricons.com) | Editorial, content sites, F1 reading layouts | Multi-weight; the Light weight matches the system's airiness |

Use **one** per product. F1/F6 in this kit reach for Phosphor Light by default; the F5 slide demo uses bare Unicode arrows because slides should be even quieter than the web.

In the source repository, the F1 example HTML uses no icon library at all — only Unicode `↓` and `→`. That is the most Wenxin-correct choice when you can get away with it. **Substitution flag:** we have not packaged Phosphor or Lucide locally; if you need icons in production, install them from npm or CDN and constrain to the rules above.

### Emoji & Unicode

- **No emoji.** Period. They carry the wrong temperature.
- Recurring Unicode glyphs that the system *does* use: `■` (brand mark only), `·` (separator in `01 · PHILOSOPHY`), `—` (em dash, often as list bullet), `→ ↓ >>` (CTA arrows), `「」` (CJK pull quotes).

### Brand assets

The cinnabar-seal logo and the breathing `■` brand mark are the only "icon" treatments unique to this system. They are documented in `source/.opencode/agents/wenxin/brand.md` and the recipe is reproduced in `assets/README.md`. Both ship as inline SVG — there is no PNG export in the source repo, by design.

---

## Index — what's in this project

```
README.md                       this file
colors_and_type.css             friendly aliases on the canonical tokens
SKILL.md                        agent-skill entry point

assets/                         logo + brand-mark SVGs, README
preview/                        ≈ 18 design-system cards (Type / Colors / Spacing / Components / Brand)
ui_kits/
  f1-web/                       F1 — the canonical responsive website kit
    index.html                  interactive demo
    *.jsx                       header, hero, nav, philosophy grid, etc.
    README.md
  f6-documentation/             F6 — docs site (sidebar + content)
    index.html
    README.md
slides/                         F5 — six representative slide templates
  index.html, *.jsx

source/                         imported source-of-truth files
  SOURCE_README.md              the original repo README
  AGENTS.md                     the original OpenCode agent config
  .opencode/                    spec / tokens / rules / agent definitions
    agents/wenxin/              design.md, brand.md, components.md, presentation.md, ...
    tokens/wenxin-tokens.css    the canonical three-layer token system
    rules/                      wenxin-spec.md, motion-spec.md
  docs/                         the two highest-fidelity reference HTML examples
    wanxing-f1-web/index.html
    wanxing-f3-brand/index.html
    wanxing-f5-presentation/index.html
    wanxing-f6-documentation/index.html
```

When in doubt, the order of authority is:

1. `source/.opencode/agents/wenxin/design.md` — the spec
2. `source/.opencode/tokens/wenxin-tokens.css` — the tokens
3. `source/docs/wanxing-f1-web/index.html` — how it actually renders
4. This kit's UI kits — pixel-faithful but simplified for prototyping
5. This kit's `colors_and_type.css` — friendly aliases on top of (2)

---

## Caveats & notes for the reader

- **Webfonts via Google Fonts CDN.** Lora, EB Garamond, Noto Serif SC, and JetBrains Mono are loaded from Google Fonts in `colors_and_type.css`. They are the same families the source spec names — no substitution. If you need self-hosted woff2 files for production, fetch them from the families above. We did *not* package them locally to keep this kit small.
- **Icon library not vendored.** The source repo deliberately uses zero icon-library imports; this kit follows suit. If your product needs icons, install Phosphor Light or Lucide per the rules above.
- **Mobile (F2) is not built out.** The source repo describes F2 in spec but the public docs do not include an F2 example HTML. Treat that surface as: same tokens, native control patterns, ≥ 44 pt touch targets.
- **F4 / F7 / F8 / F9 are described in spec only.** Build them from `source/.opencode/agents/wenxin/{print,poster,diagrams,report}.md` — those documents are precise.
- **English copy in this README** is a translation alongside the original Chinese — keep both when you can.
