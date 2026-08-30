# F6 · Documentation

> 属于 [spec](../README.md) 形态层 — Form layer
> 轨道 Track：`editorial`（其中表单与搜索按[第三层](../tracks.md)走惯例） · 动效 Motion：`E9-0` 静水

## 身份与边界 · Identity

F6 交付**可浏览、可搜索、可导航的文档站**：API 文档、Wiki、知识库。

与 F1 的边界：**F1 是内容，F6 是被检索的知识。**
判据很简单 —— 需不需要侧栏 + 全文搜索 + 版本切换。需要，就是 F6。

**F6 组件负担是九个形态里最重的**，因此它是组件库设计与新示例的第一个目标。

## 布局 · Layout

```
┌──────────────────────────────────────────┐
│ Header: Logo · Search · Version          │  --header-height 56px
├──────────┬───────────────────────────────┤
│ Sidebar  │  Breadcrumb                   │
│  240px   │  h1                           │
│  · Nav   │  正文 --width-article         │
│  · TOC   │  代码块可溢至 --width-content  │
│          │  ← 上一篇      下一篇 →        │
├──────────┴───────────────────────────────┤
│ Footer                                    │
└──────────────────────────────────────────┘
```

**侧栏**：`--sidebar-width` 240px 固定；底色 `--color-bg-base`；右侧 1px `--color-border-subtle`；
`--font-ui` `--text-sm`；**当前项 accent + 左侧 2px 竖线**；hover 180ms。

**响应式**：desktop 双栏 / tablet 侧栏折叠为汉堡 / mobile 抽屉式全屏侧栏
（从左滑入 420ms `--ease-out`，遮罩 `rgba(0,0,0,0.3)`）。

## 组件 · Components

必备三件套：**`wx-sidebar` + `wx-toc` + `wx-search`**

其余：`wx-code`（含标题栏与复制按钮）· `wx-note`（admonition 五级）·
`wx-crumbs` · `wx-pager`（上下篇）· `wx-table` · `wx-tag`

### Admonition

五级，2px 左边线 + 极淡底色 `--color-bg-subtle`：

| 级别 | 语义色 |
|---|---|
| note | `--color-text-muted` |
| info | `--color-text-secondary` |
| tip | `--color-success` |
| warn | `--color-warning` |
| danger | `--color-danger` |

**颜色必须与文字标签同时出现**（[第一层底线](../tracks.md)）。

### 代码高亮

暖调语法色板，见 `kit/markdown/syntax.css`。底色 `--color-bg-subtle`。

## 动效 · Motion — E9-0 静水

只允许必要的状态反馈（hover、侧栏展开折叠 260ms、移动端抽屉滑入）。
**无进场动画** —— 文档是用来查的，不是用来看动画的。

## 惯例覆盖 · Convention Override

F6 整体在阅读轨，但**搜索框、反馈表单、错误提示走[第三层](../tracks.md)惯例处理**：
完整语义色、清晰可供性、标准交互反馈。表单就是表单。

## 最小可交付物 · Minimum Deliverable

- [ ] 侧栏 + TOC + 搜索三件套
- [ ] 五级 admonition
- [ ] 代码块含语言标注与复制
- [ ] 上一篇/下一篇导航
- [ ] 三档响应式（含移动端抽屉）
- [ ] 暗色模式
- [ ] 渲染契约 `profile: F6`，`sidebarRequired: true`，`searchRequired: true`，`intensity: "E9-0"`

## 不做 · Out of scope

进场动画 · 营销式着陆页（F1）· 幻灯片（F5）
