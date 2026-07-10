# F5 Presentation · Wenxin slide templates

The F5 kit — **文心演示**. Seven canonical slide types on a 1920 × 1080 canvas, scaling to any viewport via `deck-stage`.

## Demo

`index.html` runs the seven-slide reference deck. Navigate with `← →`, click the page-number overlay to jump, or `P` to print to PDF. Speaker notes are stored in the `<script id="speaker-notes">` tag and are shown by the host.

## Slide types

| # | Type | When |
|---|---|---|
| 01 | **Title** | First slide. Hero serif title + italic English subtitle + meta line. The 36 px breathing `■` appears once, big, beside the title. |
| 02 | **Section divider** | Between major sections. Lower-case `Part one · Philosophy` eyebrow with cinnabar `■` prefix, then the section title. |
| 03 | **Content — text** | The workhorse. Eyebrow + h2 + em-dashed list. Max 5 items, each ≤ 2 lines, never bullets. |
| 04 | **Two-column** | Text + visual. The visual slot is a square — fill it with a real image, screenshot, or diagram. Never decorative. |
| 05 | **Quote** | Pull-quote pattern: oversized opening 「, italic display serif, 80 px hairline rule, attribution name + role. |
| 06 | **Accent (full cinnabar)** | The one per-deck cinnabar moment. Use for the headline number, the conclusion, the final ask. Not for chapter intros. |
| 07 | **Closing** | Thanks + contact fields. Keep this on screen during Q&A. |

## Spec compliance

The deck stays within the F5 spec from `source/.opencode/agents/wenxin/presentation.md`:

- ✓ Title ≤ 30 CJK characters / slide
- ✓ Display-first scale (88 px section titles, 36–38 px body)
- ✓ List items prefixed with em-dash, never bullets
- ✓ Page number + brand line in `--fg-4` at fixed corners
- ✓ Single accent slide (slide 6)
- ✓ Per-slide accent budget ≤ 2 — `■` brand mark + (optional) one other moment
- ✓ Breathing `■` runs on 4 s `ease-in-out` infinite loop

## Adapting

To remix:
1. Copy `<section class="slide …">` blocks inside `<deck-stage>`.
2. Reuse the seven type classes (`title`, `section`, `content`, `two-col`, `quote`, `accent`, `closing`).
3. Update `data-num="…"` for the page-number overlay.
4. Update `#speaker-notes` so its array length matches the slide count.

Static HTML markup is preferred — it lets you direct-edit any heading or list item without round-tripping through chat.

## Files

```
index.html        the full reference deck (7 slides + per-slide CSS)
deck-stage.js     the host shell (vendored from the starter library)
```
