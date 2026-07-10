# 组件通用原则 · Generic Component Principles

> 属于 [wenxin](./README.md) 灵魂层 — Soul layer

这些是跨形态通用的组件规范——任何形态（网页、文档、演示）里出现链接、按钮、表单、代码块，都应遵循这里的规则。形态特有的组件（文档站侧边栏、演示文稿页码、海报构图）见 [wanxing](../wanxing/README.md) 对应文件。

These are cross-form component rules — links, buttons, forms, and code blocks should follow these rules in any form (web, docs, presentation). Form-specific components (a docs sidebar, a slide's page number, a poster's composition) live in the corresponding wanxing file.

## 链接 · Links

```
正文内链接 Inline in body text:
  默认色 Default: --color-text-primary（同正文色，不抢焦 same as body, doesn't compete）
  Hover: --color-accent, --duration-fast 过渡
  正文中无下划线（Hover 时可出现 1px 下划线）No underline by default (may appear on hover)

纯导航区域（无正文混排）Pure nav areas:
  可无下划线，依赖颜色区分 may rely on color alone

CTA 行动链接 CTA links:
  纯文字 + 箭头，如「查看更多 →」，不使用填充按钮
  Plain text + arrow, e.g. "Explore more →" — never a filled button
```

## 按钮（仅必要场景）· Buttons (only when necessary)

```
样式 Style: 线框 outline, border: 1px solid --color-border-strong
背景 Background: transparent
圆角 Radius: ≤ 4px
内边距 Padding: --space-3 垂直, --space-6 水平
Hover: border + text → --color-accent, --duration-fast
禁止 Forbidden: 填充色背景（除表单绝对必要的主提交按钮）
             filled background (except an unavoidable primary form-submit button)
```

## 表单输入框 · Form Inputs

```
border: 1px solid --color-border-subtle
圆角 radius: ≤ 4px（或无圆角 or none）
背景 background: --color-bg-pure
内边距 padding: --space-3 垂直, --space-4 水平
Focus: outline: 2px solid --color-focus; outline-offset: 2px
Placeholder: --color-text-muted
```

## 代码组件 · Code

**代码块 Code block**
```
背景 background: --color-bg-subtle
边线 border: 左侧 3px solid --color-border-strong（无四周边框 no border on other sides）
字体 font: --font-mono · --text-sm
内边距 padding: --space-4 全向 all sides
复制按钮 copy button: 默认 opacity 0, hover → opacity 1, 右上角, --text-xs
```

**行内代码 Inline code**
```
背景 background: --color-bg-subtle
内边距 padding: 2px 6px
字体 font: --font-mono · 0.9em
圆角 radius: 3px
无边框 no border
```

## 图片 · Images

```
宽度 width: 100%（撑满内容列宽 fills the content column）
无圆角、无阴影 no radius, no shadow
上下外边距 vertical margin: --space-8
图注 caption: --font-ui · --text-sm · --color-text-muted · 居中 centered · 上间距 --space-3
```

## 表格 · Tables

```
无外边框 no outer border
行分隔 row divider: 1px solid --color-border-subtle（仅水平线 horizontal only）
表头 header: --font-body bold + 底部 1px solid --color-border-strong
表头背景 header bg: --color-bg-subtle（可选 optional）
单元格内边距 cell padding: --space-3 水平, --space-3 垂直
字体 font: --font-body · --text-sm 或 --text-base
```

## 标签 · Tags

```
样式 style: 线框 outline, border: 1px solid --color-border-subtle, 无背景色 no fill
圆角 radius: 2px
内边距 padding: 2px --space-3
字体 font: --font-ui · --text-xs · --tracking-wide
颜色 color: --color-text-secondary
Hover（可交互时 if interactive）: border + color → --color-accent
```

## 面包屑导航 · Breadcrumb

```
格式 format: /首页  /上级  /当前页 · /Home /Parent /Current
分隔符 separator: /（前置 leading）
字体 font: --font-ui · --text-sm · --color-text-secondary
当前页 current: --color-text-primary
无装饰 no decoration
```

## 焦点态（全局）· Focus State (global)

```css
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
  border-radius: 2px;
}
/* 仅键盘导航时显示，鼠标点击不触发 keyboard-only, not on mouse click */
/* 禁止使用 outline: none — never remove the outline */
```

---

反面参照 · Anti-pattern reminder: 卡片 + 阴影不是一个组件——文心用留白分隔兄弟元素，不用卡片。见 [forbidden.md](./forbidden.md)。

There is no "card" component — Wenxin separates sibling elements with whitespace, not cards. See [forbidden.md](./forbidden.md).
