# 字体排印 · Typography

> 属于 [wenxin](./README.md) 灵魂层 — Soul layer
> 权威源 Authoritative source：[`tokens.css`](./tokens.css)——下方为摘录，冲突以该文件为准。Excerpts below; `tokens.css` wins on conflict.

## 字体哲学 · Philosophy — 衬线优先 Serif-First

衬线字体的笔画有起伏、有呼吸，与本语言的气质吻合。无衬线字体仅用于 UI 标签、元数据——它们是功能性的，非表达性的。

Serif strokes rise and fall, breathe — matching this language's temperament. Sans-serif is reserved for UI labels and metadata only: functional, not expressive.

## 字族定义 · Font Families（语言无关 language-agnostic）

```css
:root {
  /* 展示型衬线·大标题/品牌名 Display serif — hero titles, brand name */
  --font-display: "Lora", "Georgia", "Noto Serif SC", "Source Han Serif SC", serif;

  /* 正文衬线·长文阅读 Body serif — long-form reading */
  --font-body: "EB Garamond", "Crimson Text", "Noto Serif SC", "Source Han Serif SC", serif;

  /* 功能性无衬线·UI 标签/元数据 Functional sans — UI labels, metadata */
  --font-ui: "SF Pro Text", system-ui, "Noto Sans SC", "PingFang SC", sans-serif;

  /* 等宽·代码 Monospace — code */
  --font-mono: "JetBrains Mono", "Fira Code", "SF Mono", monospace;
}
```

拉丁衬线在前，中文衬线在后。英文内容优先 Lora/Garamond，中文回退到 Noto Serif SC，两者气质相近，视觉统一。

Latin serif leads, CJK serif follows in the stack. English prefers Lora/Garamond; Chinese falls back to Noto Serif SC — both share a similar temperament, so the mix stays visually unified.

```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

## 字号阶梯 · Type Scale

```css
:root {
  --text-xs:   0.694rem;   /* ~11px · 极小标注、版权 tiny label, copyright */
  --text-sm:   0.833rem;   /* ~13px · 元数据、标签、面包屑 metadata, tags, breadcrumb */
  --text-base: 1rem;       /* 16px  · 基准 baseline */
  --text-md:   1.0625rem;  /* 17px  · 正文阅读推荐 recommended body */
  --text-lg:   1.25rem;    /* 20px  · 摘要、小节引导 lede, intro */
  --text-xl:   1.5rem;     /* 24px  · h3 */
  --text-2xl:  1.875rem;   /* 30px  · h2 */
  --text-3xl:  2.25rem;    /* 36px  · h1、文章标题 h1, article title */
  --text-4xl:  3rem;       /* 48px  · 导航大字、章节 nav display, section */
  --text-5xl:  4.5rem;     /* 72px  · 品牌/英雄区 brand, hero */
}
```

## 行高与字距 · Leading & Tracking

```css
:root {
  --leading-tight:   1.25;   /* 大号展示标题 large display titles */
  --leading-snug:    1.45;   /* 小标题、UI 元素 small headings, UI */
  --leading-normal:  1.6;    /* 列表项、辅助文字 list items, secondary text */
  --leading-relaxed: 1.85;   /* 中文正文阅读 CJK body reading */
  --leading-loose:   2.0;    /* 英文长文阅读 Latin long-form reading */

  --tracking-tight:   -0.02em;  /* 大号展示标题微收紧 large display, slightly tightened */
  --tracking-normal:   0;
  --tracking-wide:     0.05em;
  --tracking-wider:    0.15em;  /* 英文全大写标注 Latin all-caps labels */
  --tracking-chinese:  0.1em;   /* 中文展示大字舒展 CJK display, loosened */
}
```

## 字体使用规则 · Usage Rules

| 场景 Context | 字族 Family | 字重 Weight | 字号 Size | 备注 Notes |
|------|------|------|------|------|
| 品牌名/英雄标题 Brand/hero | `--font-display` | 700 | `--text-4xl`/`5xl` | `--tracking-chinese` 或 `--tracking-tight` |
| h1 页面标题 Page title | `--font-display` | 700 | `--text-3xl` | `--leading-tight` |
| h2 章节标题 Section | `--font-body` | 700 | `--text-2xl` | 上 `--space-16`，下 `--space-6` |
| h3 小节标题 Subsection | `--font-body` | 700 | `--text-xl` | 上 `--space-12`，下 `--space-4` |
| h4 细分标题 | `--font-body` | 600 | `--text-lg` | `--color-text-secondary` |
| h5 / h6 | `--font-ui` | 600 | `--text-base` | 全大写 + `--tracking-wider` |
| 正文 Body | `--font-body` | 400 | `--text-md` | `--leading-relaxed`，段落间距 `--space-5` |
| UI 标签/辅助导航 | `--font-ui` | 400 | `--text-sm` | 全大写 + `--tracking-wider` |
| 日期/元数据 Metadata | `--font-ui` | 400 | `--text-sm` | `--color-text-secondary` |
| 代码 Code | `--font-mono` | 400 | `--text-sm` | |

各具体形态（演示文稿更大的字号阶梯、印刷用 pt 单位、海报超大字号）在 [wanxing](../wanxing/README.md) 对应形态文件中定义，均以此处的比例逻辑（Major Third, 1.250）为基准派生。

Form-specific type scales (presentation's larger scale, print's pt units, poster's oversized scale) are defined in the corresponding [wanxing](../wanxing/README.md) form files, all derived from this scale's ratio logic (Major Third, 1.250).
