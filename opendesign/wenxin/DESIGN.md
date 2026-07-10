---
version: alpha
name: Wenxin 文心
description: >
  A restrained, serif-first, single-accent design language for content-centric
  surfaces (blogs, docs, portfolios, presentations, print, diagrams). Core
  proposition: text is the interface, whitespace is the design, restraint is
  the power. Distilled from wenxin/ (soul) and wanxing/ (form) in this repo.
colors:
  bg-warm: "#F2F0EB"
  bg-base: "#FAFAF8"
  bg-pure: "#FFFFFF"
  bg-subtle: "#F0EDE7"
  text-primary: "#3A3837"
  text-secondary: "#888580"
  text-muted: "#B0ABA4"
  text-tertiary: "#C8C3BA"
  text-heading: "#2C2B29"
  accent: "#8B3525"
  accent-hover: "#A84030"
  accent-subtle: "#F5E8E5"
  border-subtle: "#E5E1DA"
  border-strong: "#C8C3BA"
  link: "#3A3837"
  link-hover: "#8B3525"
  focus-ring: "rgba(139, 53, 37, 0.4)"
  dark-bg-warm: "#1A1816"
  dark-bg-base: "#201E1B"
  dark-bg-pure: "#242220"
  dark-bg-subtle: "#2A2724"
  dark-text-primary: "#E8E3DC"
  dark-text-secondary: "#8A857D"
  dark-text-muted: "#5A5550"
  dark-text-heading: "#F0EBE3"
  dark-accent: "#C4533E"
  dark-accent-hover: "#D9614A"
  dark-accent-subtle: "#2E1A16"
  dark-border-subtle: "#2E2B27"
  dark-border-strong: "#403C37"
typography:
  display:
    fontFamily: "Lora, Georgia, Noto Serif SC, Source Han Serif SC, serif"
    fontSize: 72px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.02em
  h1:
    fontFamily: "Lora, Georgia, Noto Serif SC, serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.02em
  h2:
    fontFamily: "EB Garamond, Crimson Text, Noto Serif SC, serif"
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.25
  h3:
    fontFamily: "EB Garamond, Crimson Text, Noto Serif SC, serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.45
  body:
    fontFamily: "EB Garamond, Crimson Text, Noto Serif SC, Source Han Serif SC, serif"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.85
  body-base:
    fontFamily: "EB Garamond, Crimson Text, Noto Serif SC, serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  ui-label:
    fontFamily: "SF Pro Text, system-ui, Noto Sans SC, PingFang SC, sans-serif"
    fontSize: 13px
    fontWeight: 400
    letterSpacing: 0.15em
  metadata:
    fontFamily: "SF Pro Text, system-ui, Noto Sans SC, PingFang SC, sans-serif"
    fontSize: 13px
    fontWeight: 400
  mono:
    fontFamily: "JetBrains Mono, Fira Code, SF Mono, monospace"
    fontSize: 13px
    fontWeight: 400
rounded:
  none: 0px
  sm: 2px
  md: 4px
  full: 9999px
spacing:
  "1": 4px
  "2": 8px
  "3": 12px
  "4": 16px
  "5": 20px
  "6": 24px
  "8": 32px
  "10": 40px
  "12": 48px
  "16": 64px
  "24": 96px
  "32": 128px
components:
  link-inline:
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
  link-inline-hover:
    textColor: "{colors.accent}"
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "{spacing.3} {spacing.6}"
  button-outline-hover:
    textColor: "{colors.accent}"
  input:
    backgroundColor: "{colors.bg-pure}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "{spacing.3} {spacing.4}"
  code-block:
    backgroundColor: "{colors.bg-subtle}"
    textColor: "{colors.text-primary}"
    typography: "{typography.mono}"
    padding: "{spacing.4}"
  code-inline:
    backgroundColor: "{colors.bg-subtle}"
    typography: "{typography.mono}"
    rounded: "{rounded.sm}"
  tag:
    backgroundColor: transparent
    textColor: "{colors.text-secondary}"
    typography: "{typography.ui-label}"
    rounded: "{rounded.sm}"
    padding: "2px {spacing.3}"
  blockquote:
    backgroundColor: "{colors.bg-subtle}"
    textColor: "{colors.text-secondary}"
    padding: "{spacing.4} {spacing.6}"
  brand-mark:
    backgroundColor: "{colors.accent}"
    width: 8px
    height: 8px
    rounded: "{rounded.none}"
---

## Overview

Wenxin ("文心" — the heart/mind of writing) treats **content as the primary visual subject**. Every UI decision exists to let a reader enter the text quietly, never to announce itself. Core proposition: *text is the interface, whitespace is the design, restraint is the power.*

Background reads like warm, uncoated paper (`{colors.bg-warm}`), never pure white. Body text is warm charcoal (`{colors.text-primary}`), never pure black (`#000000`). Dark mode is not an inversion — it's the same "vellum," dimmed for night (`{colors.dark-bg-warm}` / `{colors.dark-text-primary}`), still warm on both ends.

Exactly **one accent color** exists (`{colors.accent}`), capped at **≤ 2 occurrences per page** (e.g. title + signature). This is the "single seal on an ink painting" principle — the rarer the color, the more weight it carries. Never invent a second brand color.

Motion is nearly silent: hover transitions, one entrance fade-up, list items staggering in at 60ms intervals, and a single deliberate exception — the ■ brand mark's 4-second breathing loop (the only permitted loop in the system). Nothing spins, bounces, or moves more than 16px.

## Colors

| Role | Token | Light | Dark | Use |
|---|---|---|---|---|
| Background — warm | `bg-warm` | `#F2F0EB` | `dark-bg-warm` `#1A1816` | Hero/showcase surfaces |
| Background — base | `bg-base` | `#FAFAF8` | `dark-bg-base` `#201E1B` | Inner page background |
| Background — pure | `bg-pure` | `#FFFFFF` | `dark-bg-pure` `#242220` | Article body surface |
| Background — subtle | `bg-subtle` | `#F0EDE7` | `dark-bg-subtle` `#2A2724` | Code block / quote / tag tint |
| Text — primary | `text-primary` | `#3A3837` | `dark-text-primary` `#E8E3DC` | Body text — never pure black/white |
| Text — secondary | `text-secondary` | `#888580` | `dark-text-secondary` `#8A857D` | Metadata, dates |
| Text — muted | `text-muted` | `#B0ABA4` | `dark-text-muted` `#5A5550` | Placeholder, copyright |
| Text — heading | `text-heading` | `#2C2B29` | `dark-text-heading` `#F0EBE3` | Headings |
| Accent | `accent` | `#8B3525` | `dark-accent` `#C4533E` | **≤ 2 occurrences per page** |
| Border — subtle | `border-subtle` | `#E5E1DA` | `dark-border-subtle` `#2E2B27` | Default hairline |
| Border — strong | `border-strong` | `#C8C3BA` | `dark-border-strong` `#403C37` | Buttons, code-block rule |

**Constraints:** `{colors.accent}` appears ≤ 2 times per page (icon active/selected states exempt). No high-saturation blue/green/purple/orange. No gradients. Body text contrast ≥ 7:1 (WCAG AAA); secondary text ≥ 4.5:1 (WCAG AA).

## Typography

Serif is expressive (`{typography.display}`, `{typography.h1}`, `{typography.body}` — anything meant to be read start-to-finish). Sans (`{typography.ui-label}`, `{typography.metadata}`) is strictly functional — nav labels, timestamps, breadcrumbs — never used for reading-length content. Latin serif leads each font stack; CJK serif (Noto Serif SC) follows, chosen because its temperament matches the Latin serif — the mix should read as one voice.

Scale ratio: Major Third (1.250). Body uses `lineHeight: 1.85` for CJK long-form reading (`{typography.body}`); presentation/print/poster scales derive from this same ratio but are defined per-medium (see Layout).

## Layout

**Spacing** is a 4px grid (`{spacing.1}`…`{spacing.32}`). Paragraph gap is always `{spacing.5}` (20px). Large section gaps never sit closer than `{spacing.24}` (96px) — when a gap feels "too big," it's usually exactly right.

**Content-type archetypes** (independent of output medium): A-Reading (single column, breadcrumb), B-List (item rows, stagger entrance, no cards), C-Showcase (résumé/portfolio, ■ mark follows the name), D-Landing (hero display type, plain-text CTA, `{spacing.24}`+ section gaps), E-Tool (prominent input, outline button).

**Output media**: this repo's `wanxing/` directory holds nine medium-specific files (web, mobile, brand identity, print, presentation, documentation, poster, diagram, report) that apply the tokens above to each medium's real constraints — grids, canvas ratios, nav patterns. Read the matching `wanxing/fN-*.md` file for any concrete layout decision; this DESIGN.md only defines the medium-agnostic soul.

## Elevation & Depth

**There is no elevation system, deliberately.** No shadow scale, no "raised card" background tint. Sibling elements are separated by whitespace, not simulated depth. The only depth-adjacent devices allowed:

- `{colors.bg-subtle}` background tint — a color shift, not a shadow (code blocks, blockquotes, tags)
- A 1px hairline border (`{colors.border-subtle}`) — row dividers, table headers, never wrapping all four sides of a "card"
- A left-only accent/strong border (`3px solid {colors.border-strong}` or `{colors.accent}`) — signals "quoted/different," not "elevated"

If a design calls for a shadow or a card, that's a signal to use whitespace instead.

## Shapes

Corner radii are deliberately small and rare: `{rounded.none}` (0px, default for most elements — brand mark, images, tags), `{rounded.sm}` (2px, tags, inline code), `{rounded.md}` (4px, buttons, inputs — the practical ceiling), `{rounded.full}` (9999px, reserved — not used by default components here). No large "friendly" radii; no pill-shaped buttons. The brand mark ■ is a hard-edged solid square, never rounded.

## Components

- **Link (inline)** `{components.link-inline}` — no underline by default; hover → `{components.link-inline-hover}` + 1px underline, 180ms.
- **Button (outline, use only when unavoidable)** `{components.button-outline}` — never filled, except an unavoidable primary form-submit button.
- **Input** `{components.input}` — focus: `outline: 2px solid {colors.focus-ring}; outline-offset: 2px`. Placeholder: `{colors.text-muted}`.
- **Code block** `{components.code-block}` — left border only `3px solid {colors.border-strong}`, no border on other sides.
- **Code (inline)** `{components.code-inline}` — padding `2px 6px`, `0.9em`.
- **Tag** `{components.tag}` — outline only, no fill.
- **Blockquote** `{components.blockquote}` — left border `2px solid {colors.accent}`.
- **Brand mark ■** `{components.brand-mark}` — fixed 8×8px (6×6px mobile) solid square, `{colors.accent}` fill, sits immediately after the brand name/signature. `opacity 1→0.6→1`, 4s, ease-in-out, infinite — the only loop allowed anywhere in the system. Never in body paragraphs, buttons, or list items; appears once in the signature, optionally once more elsewhere (rare).
- **Icons** — stroke-only, 1.5px uniform, never filled, never scaled with size. One icon library per product (Lucide for tool UI, Phosphor Light/Regular for editorial) — never mixed on one page. Prefer no icon at all (plain Unicode `→`/`↓`) when the meaning is clear without one.

## Do's and Don'ts

**Do:** one accent, ≤ 2 occurrences per page · serif for reading, sans for chrome only · separate sections with whitespace (`{spacing.24}`+) · keep the ■ mark's shape/size/4s-breath exact · respect `prefers-reduced-motion` · body contrast ≥ 7:1.

**Don't — the four most commonly violated AI-design tropes:** no shadows · no filled buttons · no gradients · no "rounded-card + colored-left-border + icon" combo.

**Full list:** cards+shadows (manufactures hierarchy) · gradient backgrounds · high-saturation blue/green/purple/orange (only one accent allowed) · filled rounded buttons (too "product") · purely decorative images · borders thicker than 1px · color-block section dividers (use whitespace) · filled icons (stroke only) · two icon libraries on one page · looping/flashing animation (except brand mark, loading) · accent used more than twice · centered long-form body text · 3+ long paragraphs with no visual anchor · `outline: none` · color-only state distinction · link text "click here".

Medium-specific prohibitions (presentations forbid >80 chars/slide, print forbids sub-7pt text) live in the matching `wanxing/fN-*.md` file, not here.

---

### Agent notes (non-standard appendix — kept for this repo's own workflow)

Before generating anything: (1) classify the content archetype (Layout §, A–E), (2) pick the output medium and read the matching `wanxing/fN-*.md` file, (3) decide where the ≤2 accent occurrences go *before* writing markup — it's the single most load-bearing constraint here. Full self-audit checklist: [`wanxing/how-to-use.md`](../../wanxing/how-to-use.md) in this repo.
