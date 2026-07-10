# 间距与栅格 · Spacing & Grid

> 属于 [wenxin](./README.md) 灵魂层 — Soul layer
> 权威源 Authoritative source：[`tokens.css`](./tokens.css)——下方为摘录，冲突以该文件为准。Excerpts below; `tokens.css` wins on conflict.

## 基础间距 · Base Spacing — 4px 网格 grid

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --space-32: 128px;
}
```

## 内容宽度 · Content Widths

这些是抽象的宽度阶梯 token；具体哪种内容类型的页面用哪个宽度，属于形态层，见 [wanxing](../wanxing/README.md) 的 `page-archetypes.md`。

These are abstract width-scale tokens; which content type uses which width is a form-layer decision — see wanxing's `page-archetypes.md`.

```css
:root {
  /* 纯阅读型 reading-focused (long article/doc body) */
  --width-article:  clamp(520px, 55vw, 640px);

  /* 内容列表型 list-focused (blog list/search results/index) */
  --width-content:  clamp(620px, 65vw, 760px);

  /* 展示型 showcase (résumé/portfolio/About/landing) */
  --width-showcase: clamp(700px, 72vw, 920px);

  /* 页面水平内边距·响应式 responsive page padding */
  --padding-page-x: clamp(20px, 5vw, 72px);
}
```

## 图标尺寸 · Icon Sizes

```css
:root {
  --icon-sm: 16px;  /* 行内文字配图 inline with text */
  --icon-md: 20px;  /* 标准 UI 元素 standard UI (nav, buttons) */
  --icon-lg: 24px;  /* 独立功能图标 standalone (toolbar, sidebar) */
}
```

## 间距语义参考 · Semantic Reference

| 变量 Token | 典型用途 Typical use |
|------|----------|
| `--space-1` | 极细间隙 hairline gap |
| `--space-2` | 图标与文字间距、行内元素间隙 icon-to-text, inline gaps |
| `--space-3` | 表格单元格、小标签内边距 table cells, small tag padding |
| `--space-4` | 引用块/代码块内边距、按钮内边距 quote/code block padding, button padding |
| `--space-5` | **正文段落间距**（p 的 margin-bottom）**body paragraph gap** |
| `--space-6` | 列表项间距、面包屑 list item gap, breadcrumb |
| `--space-8` | 标题与下方正文 heading-to-body |
| `--space-12` | h3 与上方内容 |
| `--space-16` | h2 与上方内容、小区块间距 |
| `--space-24` | **大区块间距（section gap）** **large section gap** |
| `--space-32` | 页面顶部 padding page top padding |

**留白密度原则 · Whitespace density principle：** 当你觉得「这个间距是不是太大了」，往往才是刚好。大区块之间不低于 `--space-24`（96px）。

When you think "isn't this gap too big," it's usually exactly right. Large sections should never sit closer than `--space-24` (96px).

## 断点 · Breakpoints

```css
/* Mobile:  < 640px        */
/* Tablet:  640px ~ 1024px */
/* Desktop: > 1024px       */
```

移动端字号/间距的具体缩放规则（哪个 token 在哪个断点变成多少）是形态层的响应式策略，属于各 [wanxing](../wanxing/README.md) 形态文件；这里只定义断点本身和阶梯。

The concrete responsive scaling rules (which token becomes what at which breakpoint) are a form-layer responsive strategy that belongs to each wanxing form file; here we only define the breakpoints and the scale itself.
