# F3 · 文心品牌 Brand Identity

> 属于 [wanxing](./README.md) 形态层 — Form layer
> 参考实例 References: [`examples/f3-brand/`](./examples/f3-brand/)

朱砂印章 Logo 体系、名片、品牌手册。**F3 负责「品牌是什么」，具体应用形态（网页头部多大、印刷品信头怎么摆）交给 F1/F4/F7 等消费方。**

The cinnabar-seal logo system, stationery, brand books. **F3 owns "what the brand is"; concrete placement (how big in a web header, where on letterhead) belongs to consuming forms like F1/F4/F7.**

## 与灵魂层的边界 · Boundary with the Soul Layer

Logo 与 ■ 标记的**设计规格**（色彩、圆角、线宽、动效、去具象化原则）已定义在 [`wenxin/brand.md`](../wenxin/brand.md)——那是不变的部分。这里只讲**品牌系统如何应用**：Logo 的变体、品牌页面如何组织、品牌手册长什么样。

The **design spec** of the logo and ■ mark (color, radius, stroke, motion, anti-literalism) is defined in wenxin's brand doc — that's the unchanging part. Here we cover **how the brand system is applied**: logo variants, how a brand page is organized, what a brand guide looks like.

## Logo 变体 · Logo Variants

参考实例中的品牌页展示了四种变体（见 render-contract `brand.logoVariants`）：

The reference brand page demonstrates four variants (see the render-contract's `brand.logoVariants`):

```json
{ "logoVariants": ["horizontal", "vertical", "monochrome", "reversed"] }
```

- **horizontal** — Logo + 品牌名横向排列，用于导航栏、页眉 nav bars, page headers
- **vertical** — Logo 在上、品牌名在下，用于封面、社交头像 covers, social avatars
- **monochrome** — 单色版本，用于印刷单色场景（见 [`f4-print.md`](./f4-print.md) 的单色印刷策略）
- **reversed** — 反色版本，用于深色背景

资产文件 Asset files: [`examples/f3-brand/assets/`](./examples/f3-brand/assets/)（`logo-wenxin.svg`, `brand-mark.svg`, `logo-mono.svg`, `logo-wanxing.svg`）。

## 品牌页结构 · Brand Page Structure

参考 [`examples/f3-brand/index.html`](./examples/f3-brand/index.html) 的章节顺序，这是品牌手册页的推荐组织方式：

Section order recommended for a brand-guide page, from the reference instance:

```
1. 品牌哲学 Brand philosophy
2. Logo 系统（含朱砂印章·主标识 主展示）Logo system (cinnabar seal, primary mark)
3. 品牌标识符 ■  The ■ brand mark
4. 色彩系统 Color system
5. 字体系统 Typography system
6. 品牌应用示例 Brand application examples
7. 禁止清单（分 Logo/色彩/字体三类）Forbidden list (logo / color / type)
```

## 与其他形态的边界 · Boundaries with Other Forms

| 领域 Domain | F3 负责 F3 owns | 消费方负责 Consumer owns |
|------|-------------|-------------|
| Logo 系统 Logo system | 设计、变体、禁止清单 design, variants, forbidden list | 在具体产出中的放置位置和大小 placement & size in a specific output |
| 色彩系统 Color system | HEX/RGB/CMYK/PANTONE 定义 definitions | 色彩在具体产出中的应用 application in a specific output |
| 名片/信头纸 Business cards/letterhead | Logo 放置和品牌色 logo placement, brand color | 页面布局、边距、正文排版（见 [`f4-print.md`](./f4-print.md)）layout, margins, body type |
| 海报中的品牌元素 Brand elements in posters | Logo 定义本身 the logo's definition itself | 构图中的位置和大小（见 [`f7-poster.md`](./f7-poster.md)）composition placement |

**原则 Principle：** F3 定义「品牌是什么」，其他形态定义「品牌在这种载体上怎么排」。

F3 defines what the brand *is*; every other form defines how the brand is *laid out* on that medium.

## 移动端与响应式 · Responsive

品牌页本身遵循 F1 的响应式策略（`viewports: desktop/tablet/mobile`），无独立的品牌专属断点。

The brand page itself follows F1's responsive strategy — no brand-specific breakpoints of its own.
