# 无障碍访问 · Accessibility

> 属于 [spec](../README.md) 灵魂层 — Soul layer

文心设计语言将可访问性视为基本要求，而非附加项。

Wenxin treats accessibility as a baseline requirement, not an add-on.

## 色彩对比度 · Color Contrast

- 正文（primary）对背景：≥ 7:1（WCAG AAA）
  Body text against background: ≥ 7:1 (WCAG AAA)
- 辅助文字（secondary）对背景：≥ 4.5:1（WCAG AA）
  Secondary text against background: ≥ 4.5:1 (WCAG AA)
- 禁止：仅用颜色区分状态，必须同时有形状/图案/文字辅助
  Forbidden: color-only state distinction — always pair with shape/pattern/text

## 键盘导航 · Keyboard Navigation

- 所有可交互元素可用 Tab 键访问。All interactive elements reachable via Tab.
- 焦点顺序符合视觉阅读顺序（从上到下，从左到右）。Focus order matches visual reading order.
- 使用 `:focus-visible`，禁止 `outline: none`。Use `:focus-visible`; never `outline: none`.

## 语义化标记 · Semantic Markup

- 页面有且仅有一个 `<h1>`。Exactly one `<h1>` per page.
- 标题层级不跳跃（h1 → h2 → h3，不跳过）。No skipped heading levels.
- 图标单独使用时必须有 `aria-label` 或 `title`。Standalone icons need `aria-label` or `title`.
- 图片必须有 `alt` 属性（装饰性图片用 `alt=""`）。Images require `alt` (decorative images use `alt=""`).
- 链接文字必须有意义，避免「点击这里」独立使用。Link text must be meaningful — never a lone "click here."

## 屏幕阅读器 · Screen Readers

- 使用语义化 HTML（`<nav>`, `<main>`, `<article>`, `<aside>` 等）。Use semantic HTML elements.
- 纯装饰性内容使用 `aria-hidden="true"`。Purely decorative content gets `aria-hidden="true"`.
- 图标按钮必须有可读标签。Icon-only buttons need a readable label.

## 动效偏好 · Motion Preference

见 [motion.md](./motion.md) 中的 `prefers-reduced-motion` 实现。See the `prefers-reduced-motion` implementation in [motion.md](./motion.md).

---

这是所有形态共享的最低基线。移动端触控目标（≥ 44×44px）等形态特有的无障碍要求见对应的 [形态层 forms](../media.md) 形态文件。

This is the shared floor across all forms. Form-specific accessibility requirements (e.g. ≥ 44×44px mobile touch targets) live in the corresponding wanxing form file.
