# 文心 Wenxin

> Category: Editorial & Content
> Restrained, serif-first, single-accent design language for content-centric surfaces. Distilled from [`wenxin/`](../../wenxin/README.md) (soul) and [`wanxing/`](../../wanxing/README.md) (form) in this repo.

## 1. Visual Theme & Atmosphere

Wenxin ("文心" — the heart/mind of writing) treats **content as the primary visual subject**. Every UI decision exists to let a reader enter the text quietly, never to announce itself. The core proposition: *text is the interface, whitespace is the design, restraint is the power.*

The palette is a warm, un-bleached "vellum" — never pure white, never pure black. Background reads like uncoated paper (`#F2F0EB`), body text reads like warm charcoal (`#3A3837`), never `#000000`. Dark mode is not an inversion; it's the same vellum dimmed at night (`#1A1816` background, `#E8E3DC` text — still warm, still never pure).

Typography is serif-first: display and body copy use humanist serifs (Lora, EB Garamond) whose stroke contrast "breathes," with sans-serif reserved strictly for functional UI chrome (nav labels, metadata, timestamps). Chinese content falls back to Noto Serif SC / Songti SC, chosen because its temperament matches the Latin serif stack — the mix should read as one voice, not two systems glued together.

Exactly **one accent color exists** — a cinnabar/vermillion red (`#8B3525`, light — `#C4533E`, dark), capped at **two occurrences per page** (title + one more, or title + signature). Everything else is grayscale. This is the "single seal on an ink painting" principle: the rarer the color, the more weight it carries. There is no secondary or tertiary brand color, and none should be invented.

Motion is nearly silent: hover transitions, a single entrance fade-up, list items staggering in at 60ms intervals, and one deliberate exception — the ■ brand mark's 4-second breathing loop. Nothing spins, bounces, or moves more than 16px. Motion should feel like the resistance of a turning page — noticed, never admired.

**Key characteristics:**
- Warm off-white/off-black surfaces, never pure `#FFF`/`#000` for large areas or primary text
- Serif-first type (Lora/EB Garamond + Noto Serif SC), sans-serif (`--font-ui`) confined to UI chrome only
- Single accent (`#8B3525` light / `#C4533E` dark), hard-capped at 2 occurrences per page
- No cards, no shadows, no gradients, no filled rounded buttons — whitespace is the only separator
- Motion limited to hover/entrance/stagger + the brand mark's infinite 4s breath (the sole permitted loop)
- One brand mark: a solid ■ square, fixed shape, never substituted

## 2. Color Palette & Roles

**Authoritative source:** [`tokens.css`](./tokens.css) in this folder (copied verbatim from [`wenxin/tokens.css`](../../wenxin/tokens.css)). If this section and the CSS ever disagree, the CSS wins.

### Light mode
| Role | Token | Hex | Use |
|---|---|---|---|
| Background — warm | `--color-bg-warm` | `#F2F0EB` | Hero/showcase surfaces, warm paper feel |
| Background — base | `--color-bg-base` | `#FAFAF8` | Inner page background |
| Background — pure | `--color-bg-pure` | `#FFFFFF` | Article body surface |
| Background — subtle | `--color-bg-subtle` | `#F0EDE7` | Code block / blockquote / tag tint |
| Text — primary | `--color-text-primary` | `#3A3837` | Body text, warm charcoal, never pure black |
| Text — secondary | `--color-text-secondary` | `#888580` | Metadata, dates |
| Text — muted | `--color-text-muted` | `#B0ABA4` | Placeholder, copyright |
| Text — tertiary | `--color-text-tertiary` | `#C8C3BA` | Third-level muted (same value as `--color-border-strong`) |
| Text — heading | `--color-text-heading` | `#2C2B29` | Headings, slightly darker than body |
| Accent | `--color-accent` | `#8B3525` | **≤ 2 occurrences per page** |
| Accent — hover | `--color-accent-hover` | `#A84030` | Accent hover state |
| Accent — subtle | `--color-accent-subtle` | `#F5E8E5` | Accent's pale background variant |
| Border — subtle | `--color-border-subtle` | `#E5E1DA` | Default hairline border |
| Border — strong | `--color-border-strong` | `#C8C3BA` | Emphasis border (buttons, code block left rule) |
| Link | `--color-link` | `#3A3837` | Same as body — doesn't compete for attention |
| Link — hover | `--color-link-hover` | `#8B3525` | Accent on hover |
| Focus ring | `--color-focus` | `rgba(139,53,37,0.4)` | Keyboard focus outline only |

### Dark mode — "night vellum," not an inversion
| Role | Hex |
|---|---|
| Background warm/base/pure/subtle | `#1A1816` / `#201E1B` / `#242220` / `#2A2724` |
| Text primary/secondary/muted/heading | `#E8E3DC` / `#8A857D` / `#5A5550` / `#F0EBE3` |
| Accent / hover / subtle | `#C4533E` / `#D9614A` / `#2E1A16` |
| Border subtle/strong | `#2E2B27` / `#403C37` |

### Constraints
- Accent appears **≤ 2 times per page**; icon active/selected states are exempt from this cap.
- Forbidden: high-saturation blue/green/purple/orange; any gradient background; a second brand color.
- Body text contrast ≥ 7:1 (WCAG AAA); secondary text ≥ 4.5:1 (WCAG AA).

## 3. Typography Rules

### Families (language-agnostic stacks — Latin serif leads, CJK serif follows)
```css
--font-display: "Lora", "Georgia", "Noto Serif SC", "Source Han Serif SC", serif;
--font-body:    "EB Garamond", "Crimson Text", "Noto Serif SC", "Source Han Serif SC", serif;
--font-ui:      "SF Pro Text", system-ui, "Noto Sans SC", "PingFang SC", sans-serif;
--font-mono:    "JetBrains Mono", "Fira Code", "SF Mono", monospace;
```
Serif is expressive (display, body — long-form reading); sans (`--font-ui`) is strictly functional (nav labels, metadata, timestamps) — never used for reading-length content.

### Type scale
| Token | Size | Use |
|---|---|---|
| `--text-xs` | 11px | Tiny labels, copyright |
| `--text-sm` | 13px | Metadata, tags, breadcrumb |
| `--text-base` | 16px | Baseline |
| `--text-md` | 17px | Recommended body reading size |
| `--text-lg` | 20px | Lede, section intro |
| `--text-xl` | 24px | h3 |
| `--text-2xl` | 30px | h2 |
| `--text-3xl` | 36px | h1 / article title |
| `--text-4xl` | 48px | Nav display, section |
| `--text-5xl` | 72px | Brand / hero |

Ratio logic: Major Third (1.250) — every form-specific scale (presentation, print pt, poster) derives from this, never invents new ratios.

### Leading & tracking
`--leading-tight` 1.25 (large display) · `--leading-snug` 1.45 (small headings/UI) · `--leading-normal` 1.6 (lists, secondary) · `--leading-relaxed` 1.85 (CJK body) · `--leading-loose` 2.0 (Latin long-form).
`--tracking-tight` -0.02em (large display) · `--tracking-normal` 0 · `--tracking-wide` 0.05em · `--tracking-wider` 0.15em (Latin all-caps labels) · `--tracking-chinese` 0.1em (CJK display, loosened).

### Usage table
| Context | Family | Weight | Size | Notes |
|---|---|---|---|---|
| Brand / hero title | `--font-display` | 700 | `--text-4xl`/`5xl` | `--tracking-chinese` or `--tracking-tight` |
| h1 page title | `--font-display` | 700 | `--text-3xl` | `--leading-tight` |
| h2 section | `--font-body` | 700 | `--text-2xl` | margin-top `--space-16`, bottom `--space-6` |
| h3 subsection | `--font-body` | 700 | `--text-xl` | margin-top `--space-12`, bottom `--space-4` |
| h4 | `--font-body` | 600 | `--text-lg` | `--color-text-secondary` |
| h5/h6 | `--font-ui` | 600 | `--text-base` | uppercase + `--tracking-wider` |
| Body | `--font-body` | 400 | `--text-md` | `--leading-relaxed`, paragraph gap `--space-5` |
| UI label / nav | `--font-ui` | 400 | `--text-sm` | uppercase + `--tracking-wider` |
| Metadata / date | `--font-ui` | 400 | `--text-sm` | `--color-text-secondary` |
| Code | `--font-mono` | 400 | `--text-sm` | |

## 4. Component Stylings

**No component here uses a shadow, a filled rounded background, or a gradient. If you're about to add one, stop — it's not Wenxin.**

**Links** — inline: same color as body (`--color-text-primary`), no underline by default, hover → `--color-accent` + 1px underline, `--duration-fast`. Pure-nav areas may rely on color alone. CTAs are plain text + arrow ("Explore more →"), never a filled button.

**Buttons (use only when unavoidable)** — outline style: `border: 1px solid var(--color-border-strong)`, transparent background, radius ≤ 4px, padding `--space-3` vertical / `--space-6` horizontal. Hover: border + text → `--color-accent`. Filled backgrounds are forbidden except an unavoidable primary form-submit button.

**Form inputs** — `border: 1px solid var(--color-border-subtle)`, radius ≤ 4px or none, background `--color-bg-pure`, padding `--space-3`/`--space-4`. Focus: `outline: 2px solid var(--color-focus); outline-offset: 2px`. Placeholder: `--color-text-muted`.

**Code block** — background `--color-bg-subtle`, left border only `3px solid var(--color-border-strong)` (no border on other sides), `--font-mono` / `--text-sm`, padding `--space-4` all sides. Inline code: background `--color-bg-subtle`, padding `2px 6px`, `0.9em`, radius 3px, no border.

**Images** — width 100% of content column, no radius, no shadow, vertical margin `--space-8`. Caption: `--font-ui` / `--text-sm` / `--color-text-muted`, centered.

**Tables** — no outer border; row divider `1px solid var(--color-border-subtle)` (horizontal only); header bold + bottom `1px solid var(--color-border-strong)`; cell padding `--space-3`.

**Tags** — outline only, `border: 1px solid var(--color-border-subtle)`, no fill, radius 2px, `--font-ui`/`--text-xs`/`--tracking-wide`, color `--color-text-secondary`.

**Breadcrumb** — `/Home /Parent /Current`, leading slash separator, `--font-ui`/`--text-sm`/`--color-text-secondary`, current page `--color-text-primary`, no decoration.

**Focus state (global, never remove)**
```css
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
  border-radius: 2px;
}
```

**Brand mark ■** — solid square (never `·` or another glyph), 8×8px desktop / 6×6px mobile, color `--color-accent`, sits immediately after the brand name/signature, baseline-aligned or 2px above. Must appear once in the brand/signature area; may appear once more elsewhere on the page (optional, rare); never in body paragraphs, buttons, or list items. Motion: `opacity 1→0.6→1`, 4s cycle, ease-in-out, infinite — the **only** permitted loop in the whole system.

**Icons** — stroke-only, 1.5px uniform stroke width, never filled, never scaled with size. Default `--color-text-secondary`, hover `--color-text-primary`, active/selected `--color-accent`, disabled `--color-text-muted`. Pick exactly one icon library per product (Lucide for tool/functional UI, Phosphor Light/Regular for editorial/content) — never mix two on one page. When you can omit icons entirely (e.g. plain Unicode `→`/`↓`), that is the more Wenxin-correct choice.

## 5. Layout Principles

### Spacing — 4px grid
`--space-1` 4px · `--space-2` 8px · `--space-3` 12px · `--space-4` 16px · `--space-5` 20px (paragraph gap) · `--space-6` 24px · `--space-8` 32px · `--space-10` 40px · `--space-12` 48px · `--space-16` 64px · `--space-24` 96px (min section gap) · `--space-32` 128px.

Whitespace-density rule: **when a gap feels "too big," it's usually exactly right.** Large sections never sit closer than `--space-24` (96px).

### Content widths
`--width-article` clamp(520,55vw,640px) for reading-focused pages · `--width-content` clamp(620,65vw,760px) for list/index pages · `--width-showcase` clamp(700,72vw,920px) for résumé/portfolio/landing · `--padding-page-x` clamp(20,5vw,72px) responsive page padding.

### Page archetypes (content-type axis, independent of output medium)
| Archetype | Content | Width token | Key trait |
|---|---|---|---|
| A · Reading | Blog post, doc page, wiki | `--width-article` | Single centered column, breadcrumb, no distraction |
| B · List | Blog index, search results, TOC | `--width-content` | Item rows, stagger fade-up entrance, no cards |
| C · Showcase | Résumé, portfolio, About | `--width-showcase` | ■ mark follows the name; skill tags are outline chips |
| D · Landing | Landing page, product home | `--width-showcase` | Hero display type, plain-text CTA, `--space-24`+ section gaps |
| E · Tool | Input/query/generation UI | — | Prominent input, outline button, simple result area |

These are a different axis from *output medium* — the same archetype (e.g. "reading") appears inside a web page, a docs site, or a print chapter. Medium-specific layout rules (nav bars, page grids, canvas ratios) belong to the medium files below, not here.

### Output media (F1–F9)
This repo's [`wanxing/`](../../wanxing/README.md) directory is the form-layer counterpart to this DESIGN.md — nine files, one per concrete output medium, each specifying how to apply the palette/type/spacing/motion above to that medium's real constraints:

[`f1-web.md`](../../wanxing/f1-web.md) (web) · [`f2-mobile.md`](../../wanxing/f2-mobile.md) (native/mobile) · [`f3-brand.md`](../../wanxing/f3-brand.md) (brand identity/letterhead/business card) · [`f4-print.md`](../../wanxing/f4-print.md) (books, papers, zines) · [`f5-presentation.md`](../../wanxing/f5-presentation.md) (slides) · [`f6-documentation.md`](../../wanxing/f6-documentation.md) (docs sites) · [`f7-poster.md`](../../wanxing/f7-poster.md) (posters, social cards) · [`f8-diagram.md`](../../wanxing/f8-diagram.md) (diagrams) · [`f9-report.md`](../../wanxing/f9-report.md) (reports, LaTeX).

Out of scope for this system entirely: data-dense dashboards, e-commerce, games, entertainment products, newsletters, CRM.

## 6. Depth & Elevation

**Wenxin has no elevation system, deliberately.** There is no shadow scale, no card background tint for "raised" elements. Sibling elements are separated by whitespace, not by simulated depth. The only depth-adjacent devices allowed:

| Device | Use |
|---|---|
| `--color-bg-subtle` background tint | Code blocks, blockquotes, inline tags — a *color* shift, not a shadow |
| Hairline border (`--color-border-subtle`, 1px) | Row dividers, table headers — never on all four sides of a "card" |
| Left-only accent border (`3px solid --color-border-strong` or `--color-accent`) | Code blocks, blockquotes — signals "this is quoted/different," not "this is elevated" |

If a design calls for a shadow or a card, that is a signal to re-examine the layout — whitespace should be doing that job instead.

## 7. Do's and Don'ts

### Do
- Keep exactly one accent color, capped at 2 occurrences per page (icon active-states exempt)
- Use serif for anything meant to be *read*; sans only for UI chrome
- Separate elements with whitespace (`--space-24`+ between major sections)
- Keep the ■ brand mark's shape, size, and 4s breathing motion exactly as specified
- Respect `prefers-reduced-motion` globally
- Keep body text contrast ≥ 7:1

### Don't — the four most commonly violated AI-design tropes
- **No shadows.**
- **No filled buttons.**
- **No gradients.**
- **No "rounded card + colored left border + icon" combo.**

### Full forbidden list
| Forbidden | Reason |
|---|---|
| Cards + shadows | Manufactures unnecessary visual hierarchy |
| Gradient backgrounds | Breaks the temperament |
| High-saturation blue/green/purple/orange | Only one accent is allowed |
| Filled rounded buttons | Too much "product" feel |
| Purely decorative images | Only content imagery is allowed |
| Thick borders (>1px) | Visual noise |
| Color-block section dividers | Use whitespace instead |
| Filled icons | Stroke only |
| Two icon libraries on one page | Clashing stroke personalities |
| Looping/flashing animation | Distracting (except the brand mark and loading states) |
| Accent appearing >2 times | Rarity is the whole point (icon active state exempt) |
| Centered long-form body text | Hurts readability |
| 3+ long paragraphs with no visual anchor | Reader feels crowded |
| `outline: none` | Breaks keyboard accessibility |
| Color-only state distinction | Imperceptible to colorblind users |
| Link text "click here" | No semantic meaning for screen readers |

Form-specific prohibitions (e.g. presentations forbid >80 characters/slide, print forbids sub-7pt text) live in the matching `wanxing/fN-*.md` file, not here.

## 8. Responsive Behavior

### Breakpoints
Mobile < 640px · Tablet 640–1024px · Desktop > 1024px.

Only the breakpoints and the type/spacing *scale itself* are soul-layer. Which token becomes what value at which breakpoint (nav collapse points, grid column counts, mobile type scaling) is a per-medium decision — see [`f1-web.md`](../../wanxing/f1-web.md) for web and [`f2-mobile.md`](../../wanxing/f2-mobile.md) for native/mobile (including `env(safe-area-inset-*)` handling for notches/home-indicators).

### General collapsing strategy
- Hero display type steps down through the type scale (e.g. `--text-5xl` → `--text-4xl` → `--text-3xl`) as viewport shrinks, tracking relaxes toward normal below `--text-2xl`.
- Multi-column grids (showcase/portfolio) collapse to single column below tablet.
- Section gaps (`--space-24`+) may compress toward `--space-12`/`--space-16` on mobile, never below.
- Navigation: horizontal links → hamburger/stacked links at the mobile breakpoint; never hide the ■ mark.

## 9. Agent Prompt Guide

### Quick reference
- Page background: `--color-bg-warm` (`#F2F0EB`) or `--color-bg-base` (`#FAFAF8`)
- Body text: `--color-text-primary` (`#3A3837`) — never `#000`
- Heading: `--color-text-heading` (`#2C2B29`)
- Secondary/metadata: `--color-text-secondary` (`#888580`)
- The one accent: `--color-accent` (`#8B3525`) — budget it before you place anything else
- Body font: `--font-body` (Lora/EB Garamond → Noto Serif SC), UI font: `--font-ui` (system-ui → Noto Sans SC/PingFang SC)
- Focus ring: `2px solid var(--color-focus)`, never `outline: none`

### Before generating anything, decide
1. **Which content archetype is this?** (A reading / B list / C showcase / D landing / E tool — §5)
2. **Which output medium is this?** (F1–F9 — pick the matching `wanxing/fN-*.md` file for concrete layout rules)
3. **Where do the ≤2 accent occurrences go?** Decide this before writing any markup — it is the single most load-bearing constraint in the whole system.

### Example component prompts
- "Build an article page: `--color-bg-pure` background, `--width-article` column, centered. h1 in `--font-display` 700 `--text-3xl` `--color-text-heading`. Body in `--font-body` 400 `--text-md`, `--leading-relaxed`, paragraph gap `--space-5`, color `--color-text-primary`. Breadcrumb above title: `--font-ui` `--text-sm` `--color-text-secondary`."
- "Build a blog index list: `--width-content` column. Each row: `[date, --font-ui --text-sm --color-text-secondary, fixed width]  [title, --color-text-primary]`. Hover: title → `--color-accent`, `--duration-fast`. No cards, no borders, no shadows. Entrance: stagger fade-up, `--stagger-1..8` (60ms each)."
- "Build the brand mark: 8×8px solid square, `--color-accent` fill, positioned 2px above baseline right after the brand name. Animate `opacity 1→0.6→1`, 4s, ease-in-out, infinite — this is the only loop allowed anywhere on the page."
- "Build a code block: `--color-bg-subtle` background, left border only `3px solid var(--color-border-strong)`, `--font-mono` `--text-sm`, padding `--space-4`. No border on the other three sides."

### Iteration guide
1. Always check the accent count before shipping — if it's used a third time, remove it, don't add a second color instead.
2. If you're about to add a shadow or a filled button, stop — re-read §6/§7; whitespace or an outline style is almost always the actual answer.
3. Serif for anything meant to be read start-to-finish; sans only for nav/labels/metadata — never mix roles.
4. When picking a page layout, first classify it by content archetype (§5), then look up the matching `wanxing/fN-*.md` for the concrete medium rules — this DESIGN.md gives the soul, the `wanxing/` files give the shape.
5. Respect `prefers-reduced-motion: reduce` on every animated property, no exceptions.
6. For the full self-audit checklist (color/type/whitespace/motion/brand-mark/components/form-layer) used before shipping any output, see [`wanxing/how-to-use.md`](../../wanxing/how-to-use.md).
