# F6 · 文心文档 Documentation

> 属于 [wanxing](./README.md) 形态层 — Form layer
> 参考实例 References: [`examples/f6-documentation/`](./examples/f6-documentation/)
> 完整规范源 Full source spec: `archive/wanxing/.opencode/agents/wenxin/documentation.md`

API 文档、知识库、Wiki、SDK 指南、技术博客、内部手册。F6 是 F1 网页最自然的延伸——复用 F1 的大部分 token 和组件，增加文档站特有的导航、搜索、代码高亮和提示组件。

API docs, knowledge bases, wikis, SDK guides, technical blogs, internal manuals. F6 is F1's most natural extension — it reuses most of F1's tokens and components, adding docs-specific nav, search, code highlighting, and admonitions.

**为什么文心天然适合文档 Why Wenxin fits docs naturally：** 文档站的核心需求——清晰的标题层级、充足的呼吸空间、温暖的阅读体验——正是 [`wenxin/rhythm.md`](../wenxin/rhythm.md) 排版节奏系统最擅长的领域（h2/h3 视觉锚点每 400–600 字一次，段落间距给读者换气的节拍）。

## 双栏布局 · Two-Column Layout

```
┌─────────────────────────────────────────┐
│ Header: Logo · Search · Version Selector │
├──────────┬────────────────────────────────┤
│ Sidebar  │ Content Area                  │
│ 240px    │ --width-article (max 640px)   │
│          │ Breadcrumb → h1 → 正文         │
│          │ ┌ Code Block ┐ ┌ Admonition ┐  │
│          │ ← Prev   Next →               │
├──────────┴────────────────────────────────┤
│ Footer                                    │
└─────────────────────────────────────────┘
```

侧边栏 Sidebar：240px，`--color-bg-base` 背景，右侧 1px 边框，当前项左侧 2px accent 竖线。

响应式 Responsive：桌面 >1024px 双栏；平板 640–1024px 侧边栏折叠为 hamburger；移动 <640px 全屏抽屉式侧边栏（从左滑入，`--duration-slow`，遮罩 `rgba(0,0,0,0.3)`）。

内容宽度 Content width：`--width-article`（同阅读型原型 A）；代码块可溢出到 `--width-content`。

## 暖色调语法高亮 · Warm-Tone Syntax Highlighting

禁止蓝/绿/紫色高亮——所有色值来自暖色调范围：

| Token 角色 | 亮色 Light | 暗色 Dark |
|-----------|------|------|
| 关键字 keyword | `#8B3525`（accent） | `#C4533E` |
| 字符串 string | `#6B5B3E` | `#C4A87A` |
| 注释 comment | `#9A948D` | `#5A5550` |
| 函数名 function | `#5C4A2F` | `#D4B88A` |
| 数字 number | `#7A5C3A` | `#B8976A` |
| 运算符/变量 operator/variable | `#3A3837`（正文色）| `#E8E3DC` |

## 文档特有组件 · Docs-Specific Components

- **搜索栏 Search**：Header 右侧（桌面）/全宽（移动），Cmd/Ctrl+K 聚焦，结果高亮匹配文字用 accent
- **增强代码块 Enhanced code block**：左侧 3px 边线，文件名标题栏（`--text-xs` · `--color-text-muted`），行号可选，复制按钮 hover 显现
- **提示框 Admonitions**（5 种）：`tip`(accent) / `warning`(暖金 `#8B6914`) / `danger`(accent 加粗) / `info`(暖灰) / `note`(弱化灰)，左侧 2px 竖线 + 图标 + 标题 + 内容，背景统一 `--color-bg-subtle`
- **版本选择器 Version selector**：Header 右侧，线框下拉
- **目录 TOC**：内容区右侧（桌面）/顶部折叠（移动），Intersection Observer 滚动跟踪当前章节
- **上/下页导航 Prev/Next**：内容区底部全宽，线框按钮

## 动效（极简版）· Motion (minimal subset)

F6 只保留必要交互动效：侧边栏展开/折叠（`--duration-base`）、搜索结果淡入（`--duration-fast`）、代码块复制按钮、TOC 当前项切换、移动端侧边栏滑入、锚点平滑滚动。**禁止**：页面进场动画、列表 stagger、品牌标记呼吸、任何循环动画——文档站的动效比 F1 更克制。

## 参考实例 · Reference Instances

[`examples/f6-documentation/index.html`](./examples/f6-documentation/index.html) — 完整渲染示例。
[`examples/f6-documentation/ui-kit/`](./examples/f6-documentation/ui-kit/) — `Sidebar.jsx` / `CodeBlock.jsx` / `Callout.jsx`（提示框）/ `Toc.jsx` / `ColorPage.jsx` 组件。
