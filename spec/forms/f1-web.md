# F1 · Web

> 属于 [spec](../README.md) 形态层 — Form layer
> 轨道 Track：`editorial` · 动效 Motion：`E9-1` 春雨 · 画布 Canvas：`responsive`
> 实现 Implementation：`kit/dist/wenxin-f1.css`

## 身份与边界 · Identity

F1 交付**可浏览、可链接的响应式 HTML 站点**：博客、文章、作品集、简历、着陆页。

与 F6 的边界：**F1 是内容，F6 是被检索的知识。** 一旦需要侧栏导航 + 全文搜索 + 版本切换，
它就是 F6，不是 F1。

## 画布与布局 · Canvas & Layout

内容宽度三档，全部用 `clamp()` 流体响应：

| Token | 值 | 用于 |
|---|---|---|
| `--width-article` | `clamp(520px, 55vw, 640px)` | 纯阅读：长文、文档正文 |
| `--width-content` | `clamp(620px, 65vw, 760px)` | 内容列表：博客列表、搜索结果 |
| `--width-showcase` | `clamp(700px, 72vw, 920px)` | 展示：简历、作品集、着陆页 |
| `--padding-page-x` | `clamp(20px, 5vw, 72px)` | 页面水平内边距 |

- **单列居中为主。** 侧栏是 F6 的手段，不是 F1 的默认。
- **Hero 可用 `--color-bg-warm` 全宽底色，但内容仍受宽度约束** —— 底色全宽，文字不全宽。
- 栅格：12 列，gutter `--space-4`。优先 `auto-fit/auto-fill + minmax()` 而非固定列数
  （[aesthetics.md](../soul/aesthetics.md) **M-7**）。
- 组件级响应优先用 `@container` 而非全局视口断点。
- 断点：mobile `<640px` / tablet `640–1024px` / desktop `>1024px`，mobile-first。
- 移动端用 `dvh` 而非 `100vh`。

区域：Header（透明叠加或固定，`--font-ui` 全大写 `--tracking-wider`）· Main · Footer（低视觉权重）。

## 排版 · Typography

衬线正文，无衬线仅用于 UI 标签与元数据。字号阶梯 Major Third 1.250。
行长控制在拉丁 60–75 字符 / CJK 30–40 字（**P-5**）。

## 色彩与 accent · Color

accent 预算 **≤2 处/页**（图标激活态除外）。**必须支持暗色模式**。

## 动效 · Motion

**E9-1 春雨**：允许单次进场 fade-up（420ms，位移 ≤8px）、列表 stagger（≤60ms/项，总时长 ≤600ms）、
hover 色彩过渡（180ms）、主题切换（260ms）。

`<html data-motion="E9-1">`，并引 `kit/components/js/animations-complete.js`。

## 组件 · Components

`wx-nav` `wx-crumbs` `wx-btn` `wx-input` `wx-table` `wx-tag` `wx-entry` `wx-quote` `wx-code`
`wx-figure` `wx-pager` `wx-seal`

CTA 用 `wx-btn--text`（纯文字 + 箭头「查看更多 →」），不用填充按钮。

## 页面原型 · Archetypes

F1 覆盖全部五种[页面原型](./page-archetypes.md) A–E。
**采用原型 E 工具型的页面轨道翻转为 `application`** —— 见 [tracks.md](../tracks.md)。

## 最小可交付物 · Minimum Deliverable

- [ ] 三档内容宽度已使用，未硬编码像素宽度
- [ ] 320px → 2560px 全程有意设计
- [ ] 暗色模式完整映射
- [ ] accent ≤2 处
- [ ] 渲染契约 `profile: F1` + `track` + `data-motion`
- [ ] 跳至主内容链接、焦点态、键盘可达
- [ ] 通过 `npm run audit`

## 不做 · Out of scope

侧栏 + 搜索 + 版本切换（那是 F6）· 仪表盘 · 电商列表 · 邮件模板
