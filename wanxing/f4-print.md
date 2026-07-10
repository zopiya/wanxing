# F4 · 文心书卷 Print & Editorial

> 属于 [wanxing](./README.md) 形态层 — Form layer
> 参考实例 References: [`examples/f4-print/`](./examples/f4-print/)
> 完整规范源 Full source spec: `archive/wanxing/.opencode/agents/wenxin/print.md`

书籍、学术论文、杂志、诗集、独立出版物（Zine）内页排版。信头纸与 F3 品牌重叠（见 [`f3-brand.md`](./f3-brand.md) 的边界表）。

Books, academic papers, magazines, poetry collections, zine interiors. Letterhead overlaps with F3 brand (see the boundary table there).

## 设计哲学 · Philosophy

印刷是文心设计语言的原乡。衬线字体的笔画起伏（见 [wenxin/typography.md](../wenxin/typography.md) 的衬线优先原则）在印刷页面上比屏幕上更自然——衬线字体本就是为印刷而生的。暖白底色（`#F2F0EB`）本质上映射到未涂布纸张（uncoated paper）的视觉质感。砖红强调色（`#8B3525`）在印刷语境中对应朱砂/vermillion——东亚传统印刷中最具标志性的色彩。

Print is Wenxin's native homeland. Serif's rise and fall reads more naturally on paper than on screen — serif type was born for print. The warm-paper background (`#F2F0EB`) maps to the look of uncoated paper. The cinnabar accent (`#8B3525`) corresponds to vermillion — the most iconic color in East Asian traditional printing.

**关键洞察 Key insight：** F4 是唯一使用**印刷静止**的形态——没有动效、没有暗色模式、没有交互状态，是文心最纯粹的形态。

F4 is the only form using **print stillness** — no motion, no dark mode, no interactive states. It is Wenxin at its purest.

## 版面系统 · Layout — Van de Graaf Canon

文心书卷采用 Van de Graaf 经典版面确定页边距比例——对开页顶:底:内:外 = 2:3:2:3，与文心的留白哲学高度一致。

```css
@page { size: A5; margin: 30mm 25mm 40mm 20mm; }
@page :left  { margin: 30mm 20mm 40mm 25mm; }
@page :right { margin: 30mm 25mm 40mm 20mm; }
```

标准尺寸 Standard sizes：A5（诗集/手册）、B5（学术期刊）、A4（论文/报告）、Letter、16K（中文书籍）。

出血 Bleed：3mm；安全区域 Safe area：≥ 5mm；装订侧内边距 Binding-side margin：单页 ≥ 20mm。

## 印刷字号阶梯（pt）· Print Type Scale

Major Third (1.250) 比例，与 Web 一致，但单位换成 pt：

| Token | 值 Value | 用途 Use |
|-------|-----|------|
| `--print-text-xs` | 7pt | 版权、页脚 copyright, footer |
| `--print-text-sm` | 8.5pt | 页眉/页脚、脚注、图注 running head, footnote, caption |
| `--print-text-base` | 10pt | 基准（书籍正文）baseline body |
| `--print-text-md` | 11pt | 正文阅读推荐 recommended reading |
| `--print-text-lg` | 13pt | 摘要 lede |
| `--print-text-xl` | 16pt | h4 |
| `--print-text-2xl` | 20pt | h3 |
| `--print-text-3xl` | 26pt | h2 |
| `--print-text-4xl` | 36pt | h1/书籍标题 book title |
| `--print-text-5xl` | 48pt | 章节起始页大标题 chapter opener |

行高 Leading：tight 1.2 / snug 1.35 / normal 1.5 / relaxed 1.8（中文）/ loose 1.9（英文）。

## 印刷特有元素 · Print-Specific Elements

- **首字下沉 Drop cap**：`--font-display` · 3.2em · `--color-accent`，全章仅首字使用 accent，唯一处出现的 accent。
- **页眉 Running head**：页面顶部外侧对齐，`--font-ui` · 8.5pt · 全大写 · `--tracking-wider`；奇数页显示章节标题，偶数页显示书名。
- **页码 Folio**：页面底部，`--font-ui` · 8.5pt，奇右偶左。
- **脚注 Footnote**：40px 短横线分隔，`--font-body` · 8pt。
- **小型大写字母 Small caps**：`font-variant: small-caps`，用于页眉标题、版权页、归因名称。
- **结尾装饰 End ornament**：`§` 或 `✦`（全书统一选一），居中，`--text-lg`。

## CMYK 色值映射 · CMYK Mapping

| Token | HEX | CMYK | PANTONE（近似）|
|-------|-----|------|------|
| `--color-bg-warm` | `#F2F0EB` | C3 M3 Y6 K0 | — 建议用纸张本色 use paper stock color |
| `--color-text-primary` | `#3A3837` | C45 M40 Y40 K65 | PANTONE 432 C |
| `--color-accent` | `#8B3525` | C20 M70 Y75 K30 | PANTONE 7621 C — 建议专色印刷 recommend spot color |

单色印刷：黑 + 灰度，accent 用 60% 网点模拟。双色印刷：黑 + PANTONE 7621 C。

## 印刷禁止事项 · Print Forbidden List

| 禁止 Forbidden | 原因 Reason |
|------|------|
| 全出血图片（除封面）Full-bleed images (except cover) | 与留白哲学冲突 |
| 多色背景色块 Multi-color background blocks | 印刷成本高，冲突克制美学 |
| 小于 7pt 的文字 Text below 7pt | 印刷可读性不足 |
| 纯黑 `#000000` 文字 Pure black text | 与暖炭色气质不符 |
| 装饰性边框和花纹 Decorative borders/patterns | 违反减法优先 |

## 边界 · Boundaries

见 [`f3-brand.md`](./f3-brand.md)（Logo/名片/信头纸边界）与 [`f7-poster.md`](./f7-poster.md)（封面已独立为 F7，F4 只负责内页）。

## 参考实例 · Reference Instance

[`examples/f4-print/index.html`](./examples/f4-print/index.html) — 完整 F4 render-contract 渲染示例。
