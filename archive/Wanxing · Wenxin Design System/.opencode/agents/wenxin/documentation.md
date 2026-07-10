# 文心文档 · Documentation (F6)

> Version: 1.0.0 | Date: 2026-05-20 | Wenxin v1.1

---

## 设计哲学

**信息层级是文心的核心优势。**

文档站的核心需求——清晰的标题层级、充足的呼吸空间、温暖的阅读体验——正是文心设计语言最擅长的领域。文心的排版节奏系统（`design.md` §6）天然适合长文档：

- h2/h3 小标题作为视觉锚点，每 400-600 字出现一次
- 段落间距 `--space-5`（20px）给读者换气的节拍
- 留白即标点——空行不是浪费，而是句读

F6 是 F1 Web 最自然的延伸。它复用 F1 的大部分 Token 和组件，增加文档站特有的导航、搜索、代码高亮和提示组件。

### 适用场景

| 场景 | 说明 |
|------|------|
| API 文档 | REST/GraphQL API 参考 |
| 知识库 | 产品帮助中心、FAQ |
| Wiki | 团队知识库、内部文档 |
| 开发者指南 | SDK/库的使用文档 |
| 技术博客 | 长篇技术文章（带代码） |
| 内部手册 | 操作手册、流程文档 |

### 维度映射

| 维度 | 值 | F6 适配说明 |
|------|-----|------------|
| A9 | 克制之美 | 不变。文档站无装饰，信息优先 |
| B9 | 温暖极简 | 不变。暖白底色 + 深炭文字 |
| C9 | 温暖衬线 | 不变。正文衬线，代码等宽，UI 无衬线 |
| D9 | 暖土调 | 不变。增加暖色调语法高亮方案 |
| E9 | 温和流动 | **极简适配**。仅侧边栏展开/折叠、搜索结果淡入等必要动效 |
| F6 | Documentation | 双栏布局（侧边导航 + 内容），文档特有组件 |
| G2 | 东亚 | CJK 排版规范，中文代码注释 |

---

## 布局系统

### 双栏布局

```
┌─────────────────────────────────────────────────┐
│  Header: Logo · Search · Version Selector       │
├──────────┬──────────────────────────────────────┤
│          │                                      │
│ Sidebar  │  Content Area                        │
│ 240px    │  --width-article (max 640px)         │
│          │                                      │
│ · Nav    │  Breadcrumb                          │
│ · TOC    │  h1 Title                             │
│ · Links  │  Content...                          │
│          │                                      │
│          │  ┌─ Code Block ──────────────────┐   │
│          │  │                                │   │
│          │  └────────────────────────────────┘   │
│          │                                      │
│          │  ┌─ Admonition ──────────────────┐   │
│          │  │  ⚠ Warning: ...               │   │
│          │  └────────────────────────────────┘   │
│          │                                      │
│          │  ← Prev          Next →             │
│          │                                      │
├──────────┴──────────────────────────────────────┤
│  Footer                                          │
└─────────────────────────────────────────────────┘
```

### 侧边栏 (Sidebar)

```
宽度：240px（桌面端），固定定位
背景：--color-bg-base
边框：右侧 1px solid --color-border-subtle
字体：--font-ui · --text-sm
当前项：--color-accent · 左侧 2px 竖线
Hover：--color-text-primary · --duration-fast
折叠组：点击展开/折叠，--duration-base 过渡
```

### 响应式策略

```css
/* Desktop: > 1024px — 双栏布局 */
/* Tablet: 640px ~ 1024px — 侧边栏折叠为 hamburger 菜单 */
/* Mobile: < 640px — 全屏侧边栏（抽屉式），内容区全宽 */
```

- 移动端侧边栏：从左侧滑入（`--duration-slow`, `--ease-out`），遮罩层 `rgba(0,0,0,0.3)`
- 搜索框：移动端全宽，桌面端在 Header 中

### 内容宽度

文档内容区使用 `--width-article`（`clamp(520px, 55vw, 640px)`），与阅读型页面原型一致。代码块可溢出到 `--width-content`（`clamp(620px, 65vw, 760px)`）。

---

## 字体系统

### 文档字号阶梯

与 F1 Web 完全一致，增加一个代码专用 Token：

```css
:root {
  /* 新增：行内代码字号 */
  --wenxin-text-code: 0.875em;  /* 相对于父元素，约 14px 在 --text-md 上下文中 */
}
```

### 代码排版

| 元素 | 字体 | 字号 | 行高 | 背景 |
|------|------|------|------|------|
| 行内代码 | `--font-mono` | `--text-code` (0.875em) | 继承 | `--color-bg-subtle` |
| 代码块 | `--font-mono` | `--text-sm` (13px) | `--leading-normal` (1.6) | `--color-bg-subtle` |
| 代码块标题 | `--font-ui` | `--text-xs` (11px) | — | `--color-bg-subtle` |
| 代码块行号 | `--font-mono` | `--text-sm` | `--leading-normal` | 透明 |
| 复制按钮 | `--font-ui` | `--text-xs` | — | 透明 |

---

## 色彩与语法高亮

### 文档色彩

与 F1 Web 完全一致，增加暖色调语法高亮方案。

### 语法高亮方案 — 暖色调 (Warm-Tone Syntax Highlighting)

文心文档禁止使用冷色调（蓝/绿/紫）语法高亮。使用暖色调方案：

**亮色模式：**

| Token 角色 | 色值 | 说明 |
|-----------|------|------|
| 关键字 (keyword) | `#8B3525` | 砖红·accent 色 |
| 字符串 (string) | `#6B5B3E` | 暖棕·深土色 |
| 注释 (comment) | `#9A948D` | 暖灰·弱化 |
| 函数名 (function) | `#5C4A2F` | 深棕 |
| 数字 (number) | `#7A5C3A` | 中棕 |
| 运算符 (operator) | `#3A3837` | 深炭·正文色 |
| 变量 (variable) | `#3A3837` | 深炭·正文色 |
| 类型 (type) | `#6B5B3E` | 暖棕·同字符串 |
| 标点 (punctuation) | `#888580` | 辅助文字色 |
| 属性名 (property) | `#5C4A2F` | 深棕·同函数名 |

**暗色模式：**

| Token 角色 | 色值 | 说明 |
|-----------|------|------|
| 关键字 (keyword) | `#C4533E` | 暗色 accent |
| 字符串 (string) | `#C4A87A` | 暖金 |
| 注释 (comment) | `#5A5550` | 暗色弱化 |
| 函数名 (function) | `#D4B88A` | 暖金·亮 |
| 数字 (number) | `#B8976A` | 中暖金 |
| 运算符 (operator) | `#E8E3DC` | 暗色正文 |
| 变量 (variable) | `#E8E3DC` | 暗色正文 |
| 类型 (type) | `#C4A87A` | 暖金·同字符串 |
| 标点 (punctuation) | `#8A857D` | 暗色辅助 |
| 属性名 (property) | `#D4B88A` | 暖金·亮 |

**语法高亮约束：**
- 全部色值来自暖色调范围（棕/金/红/灰）
- 禁止使用蓝、绿、紫作为语法高亮色
- 关键字使用 accent 色（砖红），与文心品牌一致
- 注释使用弱化色，降低视觉权重

---

## 组件

### 文档特有组件

**侧边栏导航 (Sidebar Navigation)**

```
宽度：240px（桌面端）
背景：--color-bg-base
边框：右侧 1px solid --color-border-subtle
字体：--font-ui · --text-sm
当前项：--color-accent · 左侧 2px 竖线 · font-weight: 600
Hover：--color-text-primary · --duration-fast
折叠组：点击展开/折叠，--duration-base 过渡
层级缩进：每级 --space-4 (16px)
```

**搜索栏 (Search Bar)**

```
位置：Header 右侧（桌面端）/ 全宽（移动端）
样式：与 Web 表单输入框一致
图标：搜索图标（Lucide `search`）· --icon-md
快捷键：Cmd/Ctrl + K 聚焦
搜索结果：下拉面板，--color-bg-pure 背景
结果高亮：匹配文字 --color-accent
```

**增强代码块 (Enhanced Code Block)**

```
背景：--color-bg-subtle
左侧边线：3px solid --color-border-strong（无四周边框）
字体：--font-mono · --text-sm
内边距：--space-4 全向
标题栏：文件名 · --font-ui · --text-xs · --color-text-muted · 左上角
复制按钮：默认 opacity 0，hover → opacity 1，右上角
行号：--color-text-muted · 右对齐 · 可选显示/隐藏
语法高亮：暖色调方案（见色彩与语法高亮）
```

**提示框 (Admonitions)**

```
类型：tip / warning / danger / info / note
结构：左侧 2px 竖线 + 图标 + 标题 + 内容
竖线颜色：
  tip:    --color-accent (砖红)
  warning: #8B6914 (暖金·警告)
  danger:  #8B3525 (砖红·accent·加粗)
  info:    --color-text-secondary (暖灰)
  note:    --color-text-muted (弱化灰)
图标：Lucide 对应图标，--icon-md
标题：--font-ui · --text-sm · font-weight: 600
内容：--font-body · --text-base · --leading-relaxed
背景：--color-bg-subtle（所有类型统一）
内边距：--space-4 全向
```

**版本选择器 (Version Selector)**

```
位置：Header 右侧，搜索栏旁
样式：线框下拉，与 Web 表单组件一致
字体：--font-ui · --text-sm
当前版本：--color-text-primary
下拉选项：--color-bg-pure 背景
```

**面包屑 (Breadcrumb)**

```
格式：/首页  /上级  /当前页
分隔符：/（前置）
字体：--font-ui · --text-sm · --color-text-secondary
当前页：--color-text-primary
```

**上/下页导航 (Prev/Next Navigation)**

```
位置：内容区底部，全宽
布局：左（← 上一页）/ 右（下一页 →）
样式：线框按钮，与 Web 按钮组件一致
字体：--font-ui · --text-sm
标签：页面标题，--color-text-primary
```

**目录 (Table of Contents)**

```
位置：内容区右侧（桌面端）/ 折叠在内容区顶部（移动端）
字体：--font-ui · --text-sm
当前章节：--color-accent · 左侧 2px 竖线
层级缩进：每级 --space-3 (12px)
Hover：--color-text-primary · --duration-fast
滚动跟踪：Intersection Observer，当前章节自动高亮
```

---

## 动效

F6 使用 E9 温和流动的极简版本——仅保留文档站必要的交互动效：

| 场景 | 动效 | 参数 |
|------|------|------|
| 侧边栏展开/折叠 | `height` 过渡 | `--duration-base`, `--ease-default` |
| 搜索结果淡入 | `opacity 0→1` | `--duration-fast`, `--ease-out` |
| 代码块复制按钮 | `opacity 0→1` | `--duration-fast` |
| 目录当前项切换 | `color` 过渡 | `--duration-fast`, `--ease-default` |
| 移动端侧边栏滑入 | `translateX(-100%→0)` | `--duration-slow`, `--ease-out` |
| 页面内锚点滚动 | `scroll-behavior: smooth` | — |

**禁止的动效：** 页面进场动画、列表 stagger、品牌标记呼吸动效、任何循环动画。

---

## 交付物

### 必须交付

- [ ] 双栏布局系统（侧边栏 240px + 内容区）
- [ ] 侧边栏导航组件
- [ ] 搜索栏组件
- [ ] 增强代码块组件（标题栏、复制按钮、行号）
- [ ] 暖色调语法高亮方案（亮色 + 暗色）
- [ ] 提示框组件（5 种类型）
- [ ] 版本选择器组件
- [ ] 面包屑组件
- [ ] 上/下页导航组件
- [ ] 目录组件（滚动跟踪）
- [ ] 响应式策略（桌面双栏 / 移动端抽屉式侧边栏）
- [ ] 行内代码 Token (`--text-code`)
- [ ] 文档特有动效规范

### 可选交付

- [ ] 全文搜索集成规范
- [ ] 多语言文档切换
- [ ] 代码块语言标签
- [ ] 代码块 diff 高亮
- [ ] 文档版本 diff 视图

---

## 参考

- 文心规范: `wenxin-spec.md`
- 核心设计: `design.md`
- 输出形态: `output-formats.md` §Documentation
