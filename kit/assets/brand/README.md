# Brand assets

The Wenxin brand system has two visual signatures:

## 1. The Cinnabar Seal (朱砂印章) — the logo

A red square base with a white negative-space stamp punched through it. The system treats it like an actual ink stamp on paper, not a corporate mark.

**Absolute rules** (from `../source/.opencode/agents/wenxin/brand.md`):

- Base color is `#8B3525` cinnabar, **not** the dark-mode accent. The seal does **not** swap colors in dark mode — the red-on-white contrast carries across every environment.
- Base corner radius is `rx="4"`. Right angles are too sharp; larger is too soft.
- Negative-space stroke is `2.5 px` (heavier than the system's 1.5 px UI icons — this is a brand mark, not a UI icon, and earns the extra weight).
- All line caps and joins are `round`.
- The interior geometry must be **abstract**, not literal. No books, no light bulbs, no gears. Use intersections, forks, networks, lattices.

| File | Use |
|---|---|
| `logo-wanxing.svg` | Generic Wanxing seal — square inside square + cross + center dot. The "origin / convergence" mark used on the F1 reference site. |
| `logo-wenxin.svg` | Wenxin variant — branching tree (roots → trunk → limbs). Knowledge / growth metaphor. |
| `logo-mono.svg` | A `currentColor` source file. An external `<img>` cannot inherit the page colour, so a consumer must resolve its colour in its own delivery pipeline before using it; the web docs do not embed it directly. |

## 2. The brand mark `■`

A solid 8 px (desktop) / 6 px (mobile) cinnabar square that sits at the baseline of the brand name like a signature seal. It breathes — `opacity 1 → 0.6 → 1` on a 4-second `ease-in-out` cycle. It is the **only** looping animation the system allows.

The web implementation lives in `kit/components/seal.css` as `.wx-seal`:

```html
<span class="wx-seal" aria-hidden="true"></span>
```

`brand-mark.svg` is included for static contexts (print, slides, mock thumbnails) where the CSS animation cannot run.

## Why no PNG export?

The source repository ships zero raster assets, on purpose. Every mark is small inline SVG. PNGs would invite scale-blur, transparency edge problems, and the temptation to add shadows in the export step.
