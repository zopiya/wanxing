# 输出形态 (Output Formats)

> Version: 4.0.0 | 2026-05-24 | Wenxin-Specific

---

## 目的 (Purpose)

本文件定义文心(Wenxin)设计语言在九种输出形态中的具体规范。所有值已从文心核心设计 Token 派生，不再需要"维度选择"。

This file defines the concrete specifications of the Wenxin design language across nine output forms. All values are derived from the core Wenxin design tokens — no further "dimension selection" is needed.

**具体值参见 `.opencode/rules/wenxin-spec.md` 与 `.opencode/agents/wenxin/design.md`。**

**Concrete values are defined in `.opencode/rules/wenxin-spec.md` and `.opencode/agents/wenxin/design.md`.**

---

## 九种正式输出形态 (Nine Stable Output Forms)

| 形态 | 文心演化配置 | 适用场景 | 章节数 |
|------|-------------|----------|--------|
| **HTML Web** | 文心正典 (Canonical Wenxin) | 响应式网站、Web 应用、文档站、Landing Page | 10 章 |
| **Mobile App** | 文心移动 (Wenxin Mobile) | 原生或混合移动应用（iOS / Android） | 11 章 |
| **Brand Identity** | 文心品牌 (Wenxin Brand) | Logo、品牌视觉识别系统、品牌指南 | 10 章 |
| **Print & Editorial** | 文心书卷 (Wenxin Print) | 书籍、论文、杂志、Zine、信头纸 | 9 章 |
| **Presentation** | 文心演示 (Wenxin Presentation) | 路演、会议演讲、课堂讲座、内部汇报 | 8 章 |
| **Documentation** | 文心文档 (Wenxin Documentation) | API 文档、知识库、Wiki、技术手册 | 8 章 |
| **Poster & Cover** | 文心海报 (Wenxin Poster) | 活动海报、书籍封面、宣传单页 | 8 章 |
| **Diagram & Knowledge Map** | 文心图解 (Wenxin Diagram) | 架构图、流程图、知识地图、概念关系图 | 7 章 |
| **Report & LaTeX Typesetting** | 文心报告 (Wenxin Report) | 研究报告、策略报告、白皮书、项目复盘 | 9 章 |

## 形态上限 (Form Limit)

文心正式输出形态固定为 F1-F9，不再继续扩张。新增需求必须映射到既有 F1-F9，或明确标记为文心正式形态之外。

**不纳入正式形态：** Newsletter/Email、Form/Wizard、Social Cards/Carousel、Dashboard、电商、游戏、复杂 3D 展示、重 CRM。这些要么可被 F1/F2/F7 覆盖，要么与「文字即界面，留白即设计，克制即力量」冲突。

---

## 与文心设计语言的关系 (Relationship to Wenxin Design Language)

文心设计语言对应 7 个维度的固定值：A9(克制之美) + B9(温暖极简) + C9(温暖衬线) + D9(暖土调) + E9(温和流动) + G2(东亚)。输出形态 F 是主要可变维度：

Wenxin design language corresponds to fixed values across 7 dimensions: A9 + B9 + C9 + D9 + E9 + G2. Output form F is the main flexible dimension:

```
文心灵魂 (Invariant Soul): A9 + B9 + D9 — 任何形态不可改变
文心形态 (Flexible Form):  F1 Web / F2 Mobile / F3 Brand / F4 Print / F5 Presentation / F6 Documentation / F7 Poster / F8 Diagram / F9 Report
```

- **文心正典 (Canonical Wenxin)**: F1 Web + G2 东亚 — 完整设计规范
- **文心移动 (Wenxin Mobile)**: F2 Mobile App + G2 东亚 — 移动端适配
- **文心品牌 (Wenxin Brand)**: F3 Brand Identity — 品牌标识系统
- **文心书卷 (Wenxin Print)**: F4 Print & Editorial + G2 东亚 — 印刷与编辑排版
- **文心演示 (Wenxin Presentation)**: F5 Presentation + G2 东亚 — 演示文稿与幻灯片
- **文心文档 (Wenxin Documentation)**: F6 Documentation + G2 东亚 — 文档站与知识库
- **文心海报 (Wenxin Poster)**: F7 Poster & Cover + G2 东亚 — 海报与封面
- **文心图解 (Wenxin Diagram)**: F8 Diagram & Knowledge Map + G2 东亚 — 图解、流程、知识地图
- **文心报告 (Wenxin Report)**: F9 Report & LaTeX Typesetting + G2 东亚 — Markdown 到 LaTeX/PDF 的报告排版

参考：`wenxin-spec.md` §3 演化框架

---

## 如何使用 (How to Use)

1. **选择输出形态** — 根据产品类型选择 F1-F9
2. **打开对应规范** — 每个形态已填入文心具体值
3. **执行完整审计** — 每次产物都进入 Render Contract 与 Audit Agent 多层审计；偏离文心灵魂层（A9/B9/D9）时标记为高风险
4. **输出完整设计** — 本文件即为该项目的完整设计规范

1. **Select output form** — Choose F1-F9 based on product type
2. **Open the corresponding specification** — Each form is pre-filled with Wenxin concrete values
3. **Run full audit** — Every output enters Render Contract and Audit Agent review; deviations from the Wenxin soul layer (A9/B9/D9) are high risk
4. **Output complete design** — This file is the complete design specification for the project

---

# HTML Web 文心规范

> Version: 3.0.0 | 2026-05-20 | Wenxin-Specific

---

## 1. 概述 (Overview)

### 目的 (Purpose)

本规范定义文心设计语言在 HTML Web 形态中的具体值。所有 Token 从 `.opencode/agents/wenxin/design.md` 派生。

This specification defines the concrete values of the Wenxin design language in HTML Web form. All tokens are derived from `.opencode/agents/wenxin/design.md`.

### 适用范围 (Scope)

- 响应式网站（Responsive Websites）
- Web 应用（Web Applications）
- 文档站（Documentation Sites）
- Landing Page / 营销页（Marketing Pages）
- 博客与内容站（Blogs & Content Sites）

### 文心维度映射 (Wenxin Dimension Mapping)

| 维度 | 值 | 在设计中的体现 |
|------|-----|---------------|
| A9 克制之美 | 无装饰阴影、无渐变背景、无填充色按钮；留白密度极高 |
| B9 温暖极简 | 暖白 `#F2F0EB` 底色、深炭色 `#3A3837` 文字、1px 暖灰边框 |
| C9 温暖衬线 | EB Garamond / Noto Serif SC 正文，Lora 展示，中文行高 1.85 |
| D9 暖土调 | 暖白底 + 砖红 `#8B3525` 强调（全页 ≤ 2 处） |
| E9 温和流动 | 180ms 颜色过渡、420ms 进场、stagger 60ms |
| G2 东亚 | CJK 行高 ≥ 1.6、中文展示字距 0.1em、Noto Serif SC 回退 |

参考：`wenxin-spec.md` §2 维度映射

---

## 2. 布局系统 (Layout System)

### 2.1 容器宽度 (Container Width)

文心使用 `clamp()` 实现流体响应式内容宽度：

```css
:root {
  --width-article:  clamp(520px, 55vw, 640px);   /* 纯阅读型·长文章/文档正文 */
  --width-content:  clamp(620px, 65vw, 760px);   /* 内容列表型·博客列表/搜索结果 */
  --width-showcase: clamp(700px, 72vw, 920px);   /* 展示型·简历/作品集/Landing */
  --padding-page-x: clamp(20px, 5vw, 72px);      /* 页面水平内边距·响应式 */
}
```

- **内容居中策略**: `margin: 0 auto` 或 flex center
- **全宽区域**: Hero 区使用 `--color-bg-warm` 全宽背景，内容仍受 `--width-showcase` 约束

### 2.2 栅格系统 (Grid System)

- **基础网格**: 4px 单位（`--space-1` 到 `--space-32`）
- **列数**: 12 列通用栅格，gutter `--space-4`（16px）
- **Container Queries**: 优先使用 `@container` 实现组件级响应式
- **Intrinsic Grid**: 使用 `auto-fit/auto-fill + minmax()` 实现内在响应式

### 2.3 响应式断点策略 (Responsive Breakpoint Strategy)

```css
/* Mobile:  < 640px        */
/* Tablet:  640px ~ 1024px */
/* Desktop: > 1024px       */
```

- **断点命名**: mobile / tablet / desktop
- **Mobile-first**: 默认移动端样式，断点向上增强
- **视口单位**: 移动端使用 `dvh` 替代 `100vh`

### 2.4 区域划分 (Zone Division)

- **Header**: 透明叠加或固定，`--font-ui` · `--text-sm` · 全大写 · `--tracking-wider`
- **Main**: 单列居中，使用 `--width-article` / `--width-content` / `--width-showcase`
- **Aside / Sidebar**: 文心倾向单列布局，侧边栏仅在文档站等场景使用
- **Footer**: 单栏，`--color-text-secondary`，低视觉权重
- **Hero**: `--color-bg-warm` 背景，`--font-display` · `--text-5xl`/`--text-4xl`

---

## 3. 字体系统 (Typography System)

### 3.1 字号阶梯 (Type Scale)

```css
:root {
  --text-xs:   0.694rem;   /* ~11px · 极小标注、版权 */
  --text-sm:   0.833rem;   /* ~13px · 元数据、标签、面包屑 */
  --text-base: 1rem;       /* 16px  · 基准 */
  --text-md:   1.0625rem;  /* 17px  · 正文阅读推荐 */
  --text-lg:   1.25rem;    /* 20px  · 摘要、小节引导 */
  --text-xl:   1.5rem;     /* 24px  · h3 */
  --text-2xl:  1.875rem;   /* 30px  · h2 */
  --text-3xl:  2.25rem;    /* 36px  · h1、文章标题 */
  --text-4xl:  3rem;       /* 48px  · 导航大字、章节 */
  --text-5xl:  4.5rem;     /* 72px  · 品牌/英雄区 */
}
```

阶梯比例: Major Third (1.250)。实现方式: CSS 变量 + `clamp()` 响应式。

### 3.2 行高 (Line Height)

```css
:root {
  --leading-tight:   1.25;   /* 大号展示标题 */
  --leading-snug:    1.45;   /* 小标题、UI 元素 */
  --leading-normal:  1.6;    /* 列表项、辅助文字 */
  --leading-relaxed: 1.85;   /* 中文正文阅读 */
  --leading-loose:   2.0;    /* 英文长文阅读 */
}
```

段落间距: `--space-5`（20px）。

### 3.2.1 字距 (Tracking)

```css
:root {
  --tracking-tight:   -0.02em;  /* 大号展示标题微收紧 */
  --tracking-normal:   0;
  --tracking-wide:     0.05em;
  --tracking-wider:    0.15em;  /* 英文全大写标注 */
  --tracking-chinese:  0.1em;   /* 中文展示大字舒展 */
}
```

### 3.3 字重使用规则 (Font Weight Usage)

| 场景 | 字重 | 字号 |
|------|------|------|
| 正文 | 400 (Regular) | `--text-md` |
| 强调 | 400 + 斜体 | `--text-md` |
| h4 细分标题 | 600 (Semi-bold) | `--text-lg` |
| h1-h3 标题 | 700 (Bold) | `--text-xl` ~ `--text-3xl` |
| UI 标签 | 400 (Regular) | `--text-sm` |

### 3.4 字体栈 (Font Stack)

```css
:root {
  --font-display: "Lora", "Georgia", "Noto Serif SC", "Source Han Serif SC", serif;
  --font-body: "EB Garamond", "Crimson Text", "Noto Serif SC", "Source Han Serif SC", serif;
  --font-ui: "SF Pro Text", system-ui, "Noto Sans SC", "PingFang SC", sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", "SF Mono", monospace;
}
```

字体加载策略: `font-display: swap`，关键字体 preload，CJK 字体 unicode-range 子集化。

### 3.5 CJK 中文排版特殊规则 (CJK Typography Rules)

- **中文行高**: `--leading-relaxed: 1.85`（≥ 1.6）
- **字间距**: 中文展示大字使用 `--tracking-chinese: 0.1em`
- **中英文混排**: 字体栈中拉丁衬线在前，中文衬线在后，气质相近
- **标点悬挂**: 遵循 CJK 避头尾规则
- **最小字号**: 12px（`--text-xs`）
- **禁止斜体强调**: CJK 用字重/字号代替斜体

### 3.6 字体加载策略 (Font Loading Strategy)

- `font-display: swap`（底线）
- 关键字体 `<link rel="preload" as="font">`
- CJK 字体 `unicode-range` 子集化
- `size-adjust / ascent-override` 减少 CLS
- 可变字体优先（1 个可变字体文件 vs 4-6 个固定字重）
- 全局字体平滑: `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`

---

## 4. 色彩应用 (Color Application)

### 4.1 语义色 Token 清单 (Semantic Color Tokens)

**亮色模式:**

```css
:root {
  /* 背景层 */
  --color-bg-warm:    #F2F0EB;  /* 暖白·羊皮纸质感·首页/展示型 */
  --color-bg-base:    #FAFAF8;  /* 内页背景·内容列表/详情页 */
  --color-bg-pure:    #FFFFFF;  /* 纯白·文章正文区 */
  --color-bg-subtle:  #F0EDE7;  /* 微弱底色·代码块/引用块/标签 */

  /* 文字层 */
  --color-text-primary:   #3A3837;  /* 主体·深炭色·带暖调 */
  --color-text-secondary: #888580;  /* 辅助·日期/元数据 */
  --color-text-muted:     #B0ABA4;  /* 弱化·版权/占位符 */
  --color-text-heading:   #2C2B29;  /* 标题·比正文略深 */

  /* 点睛之色·全页 ≤ 2 处 */
  --color-accent:        #8B3525;
  --color-accent-hover:  #A84030;
  --color-accent-subtle: #F5E8E5;

  /* 边界 */
  --color-border-subtle: #E5E1DA;
  --color-border-strong: #C8C3BA;

  /* 交互 */
  --color-link:       #3A3837;
  --color-link-hover: #8B3525;
  --color-focus:      rgba(139, 53, 37, 0.4);
}
```

**暗色模式·夜晚的羊皮纸:**

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-warm:    #1A1816;
    --color-bg-base:    #201E1B;
    --color-bg-pure:    #242220;
    --color-bg-subtle:  #2A2724;

    --color-text-primary:   #E8E3DC;  /* 暖象牙白 */
    --color-text-secondary: #8A857D;
    --color-text-muted:     #5A5550;
    --color-text-heading:   #F0EBE3;

    --color-accent:        #C4533E;  /* 暗色下略亮 */
    --color-accent-hover:  #D9614A;
    --color-accent-subtle: #2E1A16;

    --color-border-subtle: #2E2B27;
    --color-border-strong: #403C37;

    --color-link:       #E8E3DC;
    --color-link-hover: #C4533E;
    --color-focus:      rgba(196, 83, 62, 0.4);
  }
}
```

### 4.2 暗色模式映射策略 (Dark Mode Mapping)

- **切换方式**: `@media (prefers-color-scheme: dark)` 自动切换
- **映射策略**: 重新定义调色板（非简单反转）
- **暗色模式对比度**: 暖暗色 `#1A1816` 背景 + 暖象牙白 `#E8E3DC` 文字，避免纯黑纯白
- **暗色模式强调色**: `#C4533E`（通过 OKLCH 保持感知亮度，比亮色模式略亮）

### 4.3 对比度要求 (Contrast Requirements)

- **正文对比度**: ≥ 7:1（WCAG AAA）— `#3A3837` on `#F2F0EB` = 12.4:1
- **辅助文字对比度**: ≥ 4.5:1（WCAG AA）— `#888580` on `#F2F0EB` = 4.6:1
- **UI 组件对比度**: ≥ 3:1（WCAG AA）
- **暗色模式**: 同等满足上述标准

### 4.4 色彩 Token 架构 (Color Token Architecture)

- **参考层**: 原始色值定义（如 `--color-accent: #8B3525`）
- **语义层**: 功能性命名（如 `--color-text-primary`、`--color-border-subtle`）
- **组件层**: 组件级绑定（如按钮 hover 使用 `--color-accent`）
- **暗色模式映射**: `@media (prefers-color-scheme: dark)` 覆盖语义层值
- **OKLCH**: 暗色模式强调色使用 OKLCH 感知均匀映射

**色彩约束:**
- Accent 全页出现 ≤ 2 处（图标激活/选中态除外）
- 禁止：高饱和蓝、绿、紫、橙；任何渐变色背景

---

## 5. 组件规范 (Component Library)

### 5.1 按钮 (Buttons)

文心按钮仅在必要场景使用，倾向线框型：

```
样式：线框，border: 1px solid --color-border-strong
背景：transparent
圆角：≤ 4px
内边距：--space-3 垂直，--space-6 水平
Hover：border + text → --color-accent，--duration-fast 过渡
Focus：outline: 2px solid --color-focus; outline-offset: 2px
禁止：填充色背景（除表单绝对必要的主提交按钮）
```

CTA 行动链接：纯文字 + 箭头（如「查看更多 →」），不使用填充按钮。

### 5.2 表单元素 (Form Elements)

```
Input:
  border: 1px solid --color-border-subtle
  圆角：≤ 4px（或无圆角）
  背景：--color-bg-pure
  内边距：--space-3 垂直，--space-4 水平
  Focus：outline: 2px solid --color-focus; outline-offset: 2px
  Placeholder：--color-text-muted

Label:
  --font-ui · --text-sm · --color-text-secondary
  位置：输入框上方
  必填标记：使用文字"必填"而非仅颜色

Error state:
  border → --color-accent
  错误文字：--color-accent · --text-sm
  同时使用颜色 + 文字说明（不纯靠颜色传递信息）
```

### 5.3 导航 (Navigation)

**Header Nav:**
- 布局：左（Logo/品牌名）+ 中（导航链接）+ 右（可选操作）
- 字体：`--font-ui` · `--text-sm` · 全大写 · `--tracking-wider`
- 响应式折叠：hamburger 菜单，移动端单列
- 背景：透明或 `--color-bg-warm`

**Breadcrumb:**
```
格式：/首页  /上级  /当前页
分隔符：/（前置）
字体：--font-ui · --text-sm · --color-text-secondary
当前页：--color-text-primary
```

**Tabs:** 下划线样式，激活态 `--color-accent` 下划线，hover `--color-text-primary`。

### 5.4 卡片 (Cards)

文心**禁止卡片 + 阴影**。使用留白和分隔线建立层次：

```
Content Card（替代方案）:
  无边框、无阴影
  用 --space-8 或 --space-12 间距分隔内容区块
  标题区：--font-body · --text-xl · --color-text-heading
  内容区：--font-body · --text-md · --leading-relaxed
  操作区：线框按钮或纯文字 CTA
```

### 5.5 反馈组件 (Feedback)

- **Toast**: 底部居中，`--color-bg-base` 背景，`--color-text-primary` 文字，自动消失 3s
- **Modal**: `--color-bg-pure` 背景，遮罩层 `rgba(0,0,0,0.3)`，关闭按钮右上角
- **Alert**: 使用 `--color-accent-subtle` 背景 + `--color-accent` 左边线 2px
- **Empty State**: 纯文字说明 + 线框 CTA 按钮，无插图
- **Tooltip**: `--color-text-heading` 背景 + `--color-bg-pure` 文字，`--text-xs`

### 5.6 数据展示 (Data Display)

**Table:**
```
无外边框
行分隔：1px solid --color-border-subtle（仅水平线）
表头：--font-body bold + 底部 1px solid --color-border-strong
表头背景：--color-bg-subtle（可选）
单元格内边距：--space-3 水平，--space-3 垂直
字体：--font-body · --text-sm 或 --text-base
```

**Tag:**
```
样式：线框，border: 1px solid --color-border-subtle，无背景色
圆角：2px
内边距：2px --space-3
字体：--font-ui · --text-xs · --tracking-wide
颜色：--color-text-secondary
Hover（可交互时）：border + color → --color-accent
```

---

## 6. 交互状态 (Interaction States)

### 6.1 五种标准状态 (Five Standard States)

| 状态 | 视觉表现 |
|------|---------|
| Default | `--color-text-primary` / `--color-border-subtle` |
| Hover | `--color-accent`，`--duration-fast`（180ms）过渡 |
| Focus | `outline: 2px solid --color-focus; outline-offset: 2px`，仅 `:focus-visible` |
| Active | 颜色加深或透明度 0.8 |
| Disabled | `--color-text-muted`，pointer-events: none |

### 6.2 加载状态 (Loading States)

- **Skeleton**: `--color-bg-subtle` 背景，微妙的 opacity 脉冲动画
- **Spinner**: 最小化使用，`--color-accent` 颜色
- **Progress Bar**: `--color-accent` 填充，`--color-border-subtle` 轨道

### 6.3 空状态 (Empty States)

- 设计原则：说明原因 + 提供行动指引
- 视觉元素：纯文字，无插图
- 行动按钮：线框 CTA

### 6.4 错误状态 (Error States)

- **Form Error**: 行内错误文字 `--color-accent` · `--text-sm`，border → `--color-accent`
- **404 Page**: 说明文字 + 返回首页线框链接
- **500 Page**: 说明文字 + 重试线框按钮

---

## 7. 动效与过渡 (Motion & Transitions)

### 7.1 过渡时长 (Transition Duration)

```css
:root {
  --duration-instant: 80ms;   /* 即时反馈·checkbox/toggle */
  --duration-fast:   180ms;   /* 颜色/透明度过渡 */
  --duration-base:   260ms;   /* 标准交互·hover/展开 */
  --duration-slow:   420ms;   /* 进场·重要状态变化 */
  --duration-crawl:  600ms;   /* 特殊仪式感动效 */
}
```

### 7.2 缓动函数 (Easing Functions)

```css
:root {
  --ease-default: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-out:     cubic-bezier(0, 0, 0.2, 1);   /* 进场·先快后慢 */
  --ease-in:      cubic-bezier(0.4, 0, 1, 1);   /* 退场·先慢后快 */
}
```

### 7.3 微交互 (Micro-interactions)

| 场景 | 动效 | 参数 |
|------|------|------|
| 链接/按钮 Hover | `color` 过渡 | `--duration-fast`, `--ease-default` |
| 图标 Hover | `opacity` 0.6↔1 | `--duration-fast` |
| 页面/组件进场 | `opacity 0→1` + `translateY(6px→0)` | `--duration-slow`, `--ease-out` |
| 列表项进场 | stagger fadeUp | 每项间隔 60ms |
| 品牌标记呼吸 | `opacity 1↔0.6` | 周期 4s，`ease-in-out`，循环 |
| 深/亮色模式切换 | 全局 `color`/`background` | `--duration-base` |

**禁止的动效:** 旋转、弹跳、位移超过 16px、循环动效（品牌标记呼吸和 loading 除外）、主动抢夺注意力的动效。

**尊重用户动效偏好:**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. 响应式策略 (Responsive Strategy)

### 8.1 断点定义 (Breakpoint Definition)

```css
/* Mobile:  < 640px        */
/* Tablet:  640px ~ 1024px */
/* Desktop: > 1024px       */
```

Mobile-first 策略。

### 8.2 各断点的关键布局变化 (Key Layout Changes per Breakpoint)

**@media (max-width: 1024px):**
```css
--text-5xl: 3.5rem;    /* 72 → 56px */
--text-4xl: 2.5rem;    /* 48 → 40px */
```

**@media (max-width: 640px):**
```css
--text-5xl: 2.5rem;    /* 72 → 40px */
--text-4xl: 2rem;      /* 48 → 32px */
--text-3xl: 1.625rem;  /* 36 → 26px */
--text-2xl: 1.5rem;    /* 30 → 24px */
--padding-page-x: 20px;
```

- 导航：桌面水平导航 → 移动端 hamburger 菜单
- 双列布局：折叠为单列
- 大区块间距：`--space-24`（96px）→ 56px（手动覆盖）
- 段落间距 `--space-5` 保持不变

### 8.3 图片与媒体适配 (Image & Media Adaptation)

- 宽度：100%（撑满内容列宽）
- 无圆角、无阴影
- 上下外边距：`--space-8`
- 图注：`--font-ui` · `--text-sm` · `--color-text-muted` · 居中 · 上间距 `--space-3`
- 懒加载：`loading="lazy"`

### 8.4 字体响应式 (Responsive Typography)

- 流体排版：`clamp()` 已内置于内容宽度变量
- 最小字号：16px（正文），确保可读性
- 行高：保持不变（是阅读舒适度的核心）

---

## 9. 无障碍 (Accessibility)

### 9.1 键盘导航 (Keyboard Navigation)

- Tab 顺序：从上到下，从左到右，符合视觉阅读顺序
- 焦点可见性：`:focus-visible` 始终可见，禁止 `outline: none`
- 键盘操作：所有交互可通过 Enter / Space / Escape / Arrow 完成
- Skip Link：跳过导航直达主内容

### 9.2 屏幕阅读器 (Screen Reader Support)

- 语义 HTML：`<nav>`, `<main>`, `<article>`, `<aside>`
- `aria-label`：为无文字的图标按钮提供标签
- `alt` 属性：所有有意义的图片提供替代文字，装饰性图片 `alt=""`
- `aria-live`：动态内容实时更新通知
- Heading 层级：正确的 h1 → h2 → h3，页面有且仅有一个 `<h1>`

### 9.3 焦点管理 (Focus Management)

- 模态打开时：焦点移入模态，背景不可聚焦
- 模态关闭时：焦点返回触发元素
- 路由切换时：焦点移至新页面标题
- 表单错误时：焦点移至第一个错误字段

### 9.4 对比度与色彩 (Contrast & Color)

- 正文对比度 ≥ 7:1（WCAG AAA）
- 辅助文字对比度 ≥ 4.5:1（WCAG AA）
- 不纯靠颜色传递信息：错误状态同时使用颜色 + 图标 + 文字
- 暗色模式同等满足对比度要求

---

## 10. 最小可交付物标准 (Minimum Deliverable)

### 必须交付 (Required — 15 Items)

- [x] 容器最大宽度与内边距：`--width-article/content/showcase` + `--padding-page-x`
- [x] 栅格系统：12 列，4px 基础单位，gutter 16px
- [x] 响应式断点定义：640px / 1024px
- [x] 字号阶梯：10 级（xs ~ 5xl）
- [x] 正文字体栈：EB Garamond + Noto Serif SC + 系统回退
- [x] 正文行高：`--leading-relaxed: 1.85`（中文），`--leading-loose: 2.0`（英文）
- [x] 语义色 Token：完整亮色/暗色模式色板
- [x] 暗色模式映射策略：`@media (prefers-color-scheme: dark)` 重新定义
- [x] 按钮组件：线框型，hover → accent
- [x] 表单输入组件：含 focus/error 态
- [x] 导航组件：header nav + 移动端 hamburger
- [x] 五种交互状态：default / hover / focus-visible / active / disabled
- [x] 加载状态：skeleton + spinner
- [x] 焦点环样式：`:focus-visible` 2px solid `--color-focus`
- [x] 对比度验证：正文 ≥ 7:1，辅助 ≥ 4.5:1（WCAG AAA/AA 通过）

### 可选交付 (Optional — 5 Items)

- [ ] 自定义缓动曲线（品牌化动效）
- [ ] 完整的卡片组件库（文心倾向用留白替代卡片）
- [ ] 数据展示组件（table / list / tag / badge / avatar）
- [ ] 反馈组件（toast / modal / alert / tooltip）
- [ ] 空状态与错误页面设计（404 / 500 / empty）

---

# Mobile App 文心规范

> Version: 3.0.0 | 2026-05-20 | Wenxin-Specific

---

## 1. 概述 (Overview)

### 目的 (Purpose)

本规范定义文心设计语言在 Mobile App 形态中的具体值。文心移动 (Wenxin Mobile) 在保持灵魂层不变的前提下，适配移动端的交互模式和平台惯例。

This specification defines the concrete values of the Wenxin design language in Mobile App form. Wenxin Mobile adapts to mobile interaction patterns and platform conventions while keeping the soul layer invariant.

### 适用范围 (Scope)

- 原生 iOS 应用（Native iOS Apps）
- 原生 Android 应用（Native Android Apps）
- 跨平台混合应用（Cross-platform Hybrid Apps: React Native / Flutter）
- Progressive Web App（PWA）

### 文心移动维度映射 (Wenxin Mobile Dimension Mapping)

| 维度 | 值 | 在移动端中的体现 |
|------|-----|-----------------|
| A9 克制之美 | 信息密度低，无装饰，内容优先 |
| B9 温暖极简 | 暖白底色，极简 UI 元素，触控友好 |
| C9 温暖衬线 | 移动端字号阶梯适配，正文 ≥ 16px |
| D9 暖土调 | 同 Web 色板，移动端对比度优化 |
| E9 温和流动 | 平台弹簧物理 + 文心缓动，触觉反馈映射 |
| G2 东亚 | CJK 行高 ≥ 1.6，PingFang SC / Noto Sans CJK 回退 |

参考：`wenxin-spec.md` §3.3 文心移动

---

## 2. 平台适配 (Platform Adaptation)

### 2.1 iOS HIG 适配要点 (iOS Human Interface Guidelines)

- **导航栏样式**: Standard Title（文心倾向克制，不使用 Large Title）
- **Tab Bar 图标**: 线条型图标（Lucide 或 Phosphor Light），1.5px 描边
- **系统控件使用**: 优先原生控件，样式注入文心色彩
- **手势规范**: 滑动返回、下拉刷新（文心风格：柔和过渡）
- **Tint Color**: `--color-accent`（`#8B3525` 亮色 / `#C4533E` 暗色）

### 2.2 Android Material Design 适配要点 (Android Material Design)

- **Top App Bar**: 标准高度，滚动时不隐藏（文心倾向稳定）
- **Bottom Navigation**: 3-5 个 Tab，文心风格线条图标
- **Floating Action Button (FAB)**: 不使用（文心倾向克制，避免过多视觉权重）
- **系统控件使用**: Material Components，色彩映射到文心色板
- **Dynamic Color**: 不跟随 Material You（文心色彩灵魂不可妥协）

### 2.3 跨平台统一性 vs 平台原生性 (Cross-platform Consistency vs Platform Native)

- **统一策略**: 核心统一（色彩、字体、间距），边缘适配（导航模式、手势）
- **导航差异处理**: iOS Tab Bar 与 Android Bottom Navigation 统一为文心风格底部导航
- **组件差异处理**: 同一组件在两个平台的外观差异容忍度低——文心灵魂必须一致
- **手势差异处理**: 保留平台特有手势（滑动返回等），但过渡动效使用文心缓动

---

## 3. 导航模式 (Navigation Patterns)

### 3.1 底部导航 (Bottom Navigation)

- **Tab 数量**: 3-5 个（建议不超过 5 个）
- **Tab 图标**: 线条型，1.5px 描边，默认 `--color-text-secondary`，激活 `--color-accent`
- **Tab 标签**: `--font-ui` · 12px · 始终显示
- **Badge**: 未读计数使用 `--color-accent` 圆点

### 3.2 导航栈 (Navigation Stack)

- **Push / Pop 动画**: 标准滑动，过渡时长 `--duration-slow`（420ms），`--ease-out`
- **导航栏行为**: 始终显示，不隐藏
- **返回按钮**: 系统返回 + 手势返回
- **深层链接**: 支持直接跳转到深层页面

### 3.3 模态策略 (Modal Patterns)

- **Sheet（半屏模态）**: 高度可拖拽，背景遮罩 `rgba(0,0,0,0.3)`，过渡 `--duration-slow`
- **Full Screen Modal**: 仅在内容需要全屏展示时使用
- **Alert / Dialog**: 确认对话框使用平台默认样式，色彩映射文心
- **模态堆叠**: 不允许

### 3.4 Drawer / Sidebar

- **使用场景**: 导航项超过 5 个或设置入口
- **打开方式**: 边缘滑动或汉堡按钮
- **内容结构**: 用户信息 + 导航项 + 设置

---

## 4. 触控目标与间距 (Touch Targets & Spacing)

### 4.1 最小触控区域 (Minimum Touch Target)

- **iOS**: 44pt × 44pt
- **Android**: 48dp × 48dp
- **跨平台统一值**: 48pt（取较大值）
- **触控区域扩展**: 视觉元素小于最小触控区域时，使用 `padding` 或伪元素扩展 hit area

### 4.2 间距系统 (Spacing System)

基于 4px 网格，与 Web 一致：

```
--space-1:  4px    --space-2:  8px    --space-3:  12px
--space-4:  16px   --space-5:  20px   --space-6:  24px
--space-8:  32px   --space-10: 40px   --space-12: 48px
--space-16: 64px   --space-24: 96px
```

- **组件内间距**: 按钮 `--space-3` 垂直 / `--space-6` 水平
- **组件间间距**: 列表项 `--space-4`，卡片 `--space-6`，区块 `--space-12`

### 4.3 安全区域 (Safe Area)

- **Safe Area 适配**: 使用 `env(safe-area-inset-*)` 避开 Notch / Dynamic Island / Home Indicator
- **状态栏**: 浅色文字（`--color-text-primary` 暗色模式下）或深色文字（亮色模式下），透明背景
- **底部安全区域**: Home Indicator 上方额外 `--space-2`（8px）间距
- **横屏适配**: 横屏模式下安全区域同样适用

---

## 5. 字体系统 (Typography System)

### 5.1 移动端字号阶梯 (Mobile Type Scale)

移动端正文字号不低于 16px，展示型字号激进缩小但气质不变：

| 层级 | 值 | 用途 |
|------|-----|------|
| caption | `--text-xs` (11px) | 辅助文字、标签 |
| body-sm | `--text-sm` (13px) | 次要正文、元数据 |
| body | `--text-base` (16px) | 正文默认大小 |
| body-lg | `--text-md` (17px) | 强调正文 |
| title-sm | `--text-lg` (20px) | 小标题、列表标题 |
| title | `--text-xl` (24px) | 页面标题 |
| title-lg | `--text-2xl` (30px) | 大标题 |
| display | `--text-3xl` (36px) | Hero / 展示文字 |

阶梯比例: Major Third (1.250)。

### 5.2 Dynamic Type 适配 (Dynamic Type / Font Scaling)

- **iOS Dynamic Type**: 支持系统字体大小设置
- **Android Font Scaling**: 支持系统字体缩放
- **最大缩放限制**: 限制最大字号为默认值的 1.5 倍（防止布局崩坏）
- **布局适配**: 字号变大时换行而非截断

### 5.3 中文字体在移动端 (CJK Fonts on Mobile)

- **iOS 中文字体**: PingFang SC → Noto Serif SC → Source Han Serif SC
- **Android 中文字体**: Noto Sans CJK → 系统回退
- **中文行高**: `--leading-relaxed: 1.85`（≥ 1.6）
- **小字号中文可读性**: 12px 以下中文需测试可读性，建议正文不低于 16px

---

## 6. 色彩与主题 (Color & Theme)

### 6.1 语义色 Token (Semantic Color Tokens)

与 Web 语义一致，值相同（移动端使用精简名称：`--color-bg` → `--color-bg-warm` 等）：

| Token | 亮色模式 | 暗色模式 |
|-------|----------|----------|
| `--color-bg` | `#F2F0EB` | `#1A1816` |
| `--color-bg-secondary` | `#FAFAF8` | `#201E1B` |
| `--color-fg` | `#3A3837` | `#E8E3DC` |
| `--color-fg-muted` | `#888580` | `#8A857D` |
| `--color-accent` | `#8B3525` | `#C4533E` |
| `--color-separator` | `#E5E1DA` | `#2E2B27` |

### 6.2 浅色/深色模式 (Light / Dark Mode)

- **自动切换**: 跟随系统设置 `@media (prefers-color-scheme: dark)`
- **手动切换**: 应用内切换开关（可选）
- **暗色模式调色板**: 重新定义（非简单反转），暖暗色 + 暖象牙白
- **平台暗色模式适配**: iOS / Android 各自的暗色模式规范，文心色板覆盖

### 6.3 平台着色 (Platform Coloring)

- **iOS Tint Color**: `--color-accent` 影响系统控件（按钮、链接、开关）
- **Android Dynamic Color**: 不跟随 Material You（文心色彩灵魂不可妥协）
- **品牌色与平台色的冲突处理**: 文心色板优先于平台默认色

---

## 7. 组件规范 (Component Library)

### 7.1 按钮 (Buttons)

- **变体**: outlined（线框）/ text（纯文字）
- **触控尺寸**: 最小 48pt × 48pt
- **状态**: default / pressed / disabled / loading
- **全宽按钮**: 表单提交、主要行动时使用
- **样式**: 同 Web 规范——线框，`border: 1px solid --color-border-strong`，圆角 ≤ 4px

### 7.2 列表与卡片 (Lists & Cards)

- **列表样式**: plain（文心倾向无分组背景）
- **列表项**: 左标题 + 右箭头/副标题，`--space-4` 内间距
- **卡片样式**: 无阴影、无圆角（或 ≤ 4px），用 `--space-6` 间距分隔
- **列表与卡片的选择**: 内容密集型用列表，展示型用留白分隔区块

### 7.3 输入控件 (Input Controls)

- **键盘类型**: 根据输入类型选择（text / number / email / phone / URL / search）
- **输入框样式**: 圆角矩形（≤ 4px），`border: 1px solid --color-border-subtle`
- **键盘附件栏**: 完成按钮（iOS）/ 回车键（Android）
- **自动完成/建议**: 搜索建议下拉，文心风格线框

### 7.4 底部面板与抽屉 (Bottom Sheets & Drawers)

- **底部面板高度**: 可拖拽，多段式（半屏 / 3/4 / 全屏）
- **背景遮罩**: `rgba(0,0,0,0.3)`，点击关闭
- **抽屉方向**: 底部为主
- **手势交互**: 拖拽关闭、滑动展开

### 7.5 通知与反馈 (Notifications & Feedback)

- **Snackbar / Toast**: 底部居中，持续 3s，`--color-bg-base` 背景
- **Alert / Dialog**: 标题 + 内容 + 按钮（线框），平台默认布局
- **HUD / Loading Overlay**: 全屏加载遮罩，`--color-accent` spinner
- **Badge / 角标**: App Icon 角标使用 `--color-accent`

---

## 8. 交互状态与触觉 (Interaction States & Haptics)

### 8.1 触控反馈（视觉）(Touch Feedback — Visual)

- **按下态**: 透明度 0.8 或颜色变深，`--duration-instant`（80ms）
- **长按态**: 轻微缩放（0.98），`--duration-fast`
- **滑动态**: 列表项滑动操作（删除、归档），文心风格柔和过渡

### 8.2 触觉反馈（Haptics）(Haptic Feedback)

文心动效理念映射到触觉反馈：

| 交互 | 触觉类型 | 说明 |
|------|---------|------|
| 按钮按下 | Light Impact | 轻微确认感 |
| 开关切换 | Selection | 滚轮选择感 |
| 重要操作确认 | Medium Impact | 中等确认感 |
| 删除/错误 | Heavy Impact | 重反馈 |
| 操作完成 | Success | 成功反馈 |
| Tab 切换 | Selection | 轻微选择感 |

**何时不使用触觉**: 连续快速操作（如快速滚动列表）避免过度反馈。

### 8.3 加载与空状态 (Loading & Empty States)

- **加载指示**: 页面级 loading（`--color-accent` spinner）/ 局部 skeleton
- **空状态**: 纯文字说明 + 线框 CTA 按钮
- **首次使用引导**: 简洁的 2-3 步引导，文心风格（无填充色按钮）

---

## 9. 屏幕过渡 (Screen Transitions)

### 9.1 Push / Pop

- **Push 动画**: 从右滑入（标准），`--duration-slow`（420ms），`--ease-out`
- **Pop 动画**: 向右滑出（标准）/ 手势返回
- **过渡时长**: 420ms
- **缓动函数**: `--ease-out: cubic-bezier(0, 0, 0.2, 1)`

### 9.2 Modal Present / Dismiss

- **Present 动画**: 从底部滑入（Sheet），`--duration-slow`（420ms）
- **Dismiss 动画**: 向下滑动 / 点击遮罩 / 按钮关闭
- **过渡时长**: Sheet 420ms，Dialog 260ms（`--duration-base`）

### 9.3 共享元素过渡 (Shared Element Transitions)

- **适用场景**: 列表项 → 详情页的图片放大
- **实现方式**: Hero 动画 / 共享元素过渡
- **回退策略**: 不支持时降级为标准 push/pop 过渡

---

## 10. 无障碍 (Accessibility)

### 10.1 VoiceOver / TalkBack

- **Accessibility Label**: 所有交互元素的语音标签
- **Accessibility Hint**: 复杂操作的额外说明
- **Accessibility Value**: 进度、评分等数值信息
- **元素分组**: 相关元素的组合朗读

### 10.2 Dynamic Type 适配 (Dynamic Type Support)

- **字号跟随系统**: 响应系统字体大小设置
- **布局适配**: 大字号下换行而非截断
- **截断策略**: 文字过长时换行，不截断

### 10.3 Reduce Motion

- **系统 Reduce Motion 设置**: 响应系统减少动效设置
- **降级策略**: 将动画替换为淡入淡出或无动画
- **必要动效保留**: 页面过渡方向指示保留（淡入淡出）

---

## 11. 最小可交付物标准 (Minimum Deliverable)

### 必须交付 (Required)

- [x] 平台适配策略：iOS HIG + Android Material，核心统一边缘适配
- [x] 底部导航设计：3-5 个 Tab，线条图标，accent 激活态
- [x] 导航栈与模态策略：标准 push/pop + Sheet 模态
- [x] 最小触控区域定义：≥ 48pt（跨平台统一）
- [x] 间距系统：4pt 基础网格，与 Web 一致
- [x] 安全区域适配方案：`env(safe-area-inset-*)`
- [x] 移动端字号阶梯：8 级（caption ~ display），正文 ≥ 16px
- [x] 正文字体栈：EB Garamond + Noto Serif SC + PingFang SC 回退
- [x] 语义色 Token：与 Web 一致的完整色板
- [x] 浅色/深色模式支持：自动跟随系统
- [x] 按钮组件：outlined + text 两种变体
- [x] 列表/卡片组件：plain 列表，留白分隔
- [x] 输入控件：含键盘类型选择
- [x] 触控反馈：视觉 + 触觉策略映射
- [x] 屏幕过渡动画定义：push/pop 420ms + Sheet 420ms
- [x] 无障碍支持：VoiceOver/TalkBack + Dynamic Type + Reduce Motion

### 可选交付 (Optional)

- [ ] 触觉反馈详细映射表（每个交互的 haptic 类型）
- [ ] 共享元素过渡设计
- [ ] 首次使用引导（Onboarding）流程
- [ ] 推送通知样式与权限策略
- [ ] 横屏/折叠屏适配方案

---

# Brand Identity 文心规范

> Version: 3.0.0 | 2026-05-20 | Wenxin-Specific

---

## 1. 概述 (Overview)

### 品牌标识与 UI 设计的区别 (Brand Identity vs UI Design)

品牌标识（Brand Identity）关注的是品牌的视觉符号系统——Logo、色彩、字体、图形语言——这些元素在所有媒介中保持一致，建立品牌认知。UI 设计关注的是用户与产品的交互界面——布局、组件、导航、反馈。

Brand Identity focuses on the brand's visual symbol system — Logo, color, typography, graphic language — these elements remain consistent across all media to build brand recognition. UI Design focuses on the user-product interaction interface — layout, components, navigation, feedback.

**品牌标识是"我是谁"，UI 设计是"我怎么用"。**

**Brand Identity is "who I am", UI Design is "how I work".**

### 适用范围 (Scope)

- 企业/产品 Logo 设计（Corporate / Product Logo Design）
- 品牌视觉识别系统（Visual Identity System）
- 品牌指南文档（Brand Guidelines Document）
- 品牌在数字与实体媒介中的应用（Brand Application across Digital & Physical Media）

### 文心品牌维度映射 (Wenxin Brand Dimension Mapping)

| 维度 | 值 | 在品牌中的体现 |
|------|-----|---------------|
| A9 克制之美 | 品牌表达克制、不张扬 |
| B9 温暖极简 | Logo 简洁有力，留白充裕 |
| C9 温暖衬线 | 品牌字体使用衬线体 |
| D9 暖土调 | 暖白 + 砖红 + 墨色 |
| G2 东亚 | 朱砂印章意象，东方美学 |

参考：`wenxin-spec.md` §3.3 文心品牌，`brand.md`

---

## 2. 品牌哲学与定位 (Brand Philosophy & Positioning)

### 2.1 品牌核心价值 (Core Brand Values)

- **品牌使命**: 让内容自然呈现，设计退居幕后
- **核心价值**: 克制、温暖、精确、安静
- **品牌承诺**: 每一次接触都让人感到"顺"而非"炫"

### 2.2 品牌个性关键词 (Brand Personality Keywords)

- 内敛 ↔ 张扬 → **内敛**
- 传统 ↔ 现代 → **现代中带有传统温度**
- 奢华 ↔ 亲民 → **亲和但不廉价**
- 理性 ↔ 感性 → **理性框架中的感性表达**
- 严肃 ↔ 活泼 → **安静而有力量**

**3-5 个个性关键词**: 克制的、温暖的、安静的、精确的

### 2.3 目标受众画像 (Target Audience Profile)

- **人口统计**: 25-45 岁，知识工作者、创意从业者、内容创作者
- **心理特征**: 重视品质、偏好极简、对设计有敏感度
- **使用场景**: 个人网站、作品集、博客、知识库
- **竞品差异化**: 不同于商业 SaaS 的产品感，文心是"创作者的语言"

---

## 3. Logo 系统 (Logo System)

### 3.1 主 Logo — 朱砂印章 (Primary Logo — Cinnabar Seal)

文心主 Logo 是一枚「朱砂印章」，代表创作者的署名、背书与思想的重量。

```xml
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- 朱砂底座：纯正文心红，4px 克制圆角 -->
  <rect width="64" height="64" rx="4" fill="#8B3525"/>
  <!-- 图腾冲压：纯白反色，2.5px 品牌重量，圆润转角 -->
  <path d="..." stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

- **底座背景**: `#8B3525`（文心 Accent 砖红）
- **冲压线条**: `#FFFFFF`（纯白负空间）
- **底座圆角**: `rx="4"`
- **线条粗细**: `stroke-width="2.5"`（突破 UI 图标 1.5px 限制，赋予品牌重量）
- **端点与折角**: `stroke-linecap="round"` + `stroke-linejoin="round"`
- **横版**: 图标在左，品牌名在右（Lora / Noto Serif SC）
- **竖版**: 图标在上，品牌名在下
- **最小使用尺寸**: 24×24px（确保可识别）
- **安全区域**: Logo 周围最小留白 = Logo 高度的 50%

### 3.2 次 Logo — 纯文字版 (Secondary Logo — Wordmark)

- **纯文字版**: 仅品牌名称，使用 `--font-display`（Lora / Noto Serif SC）
- **使用场景**: 空间受限时的替代方案
- **与主 Logo 的一致性**: 字体、比例、间距保持一致

### 3.3 Mark — 品牌标识符 (Logo Mark — Brand Identity Mark)

```
形态：■ 实心小方块
尺寸：8×8px（桌面）/ 6×6px（移动端）
颜色：--color-accent（亮色 #8B3525 / 暗色 #C4533E）
位置：紧随品牌名/署名之后，基线对齐或略高 2px
动效：opacity 1→0.6→1，周期 4s，ease-in-out，无限循环
```

**使用场景**: App Icon、Favicon、社交媒体头像、署名区

### 3.4 Favicon / App Icon

- **Favicon 尺寸**: 16×16 / 32×32 / 48×48 — 使用朱砂印章 Mark
- **App Icon 尺寸**: iOS 各尺寸 / Android 各尺寸 — 朱砂印章 Mark
- **设计适配**: 极小尺寸下简化图腾路径，保留砖红底座 + 白色几何图形

### 3.5 变体 (Variants)

- **横版 / 竖版**: 不同布局场景适配
- **单色版 (Monochrome)**: 纯黑 `#3A3837` 底座 + 白色冲压（单色印刷场景）
- **反色版 (Reversed)**: 深色背景上使用，底座 `#8B3525` 不变（红底白线已具备全场景通行能力）
- **禁用变体**: 透明底座、直角底座（rx="0"）、细线（1.5px）、具象图标

---

## 4. 色彩系统 (Color Palette)

### 4.1 主色 (Primary Color)

- **品牌主色**: `#8B3525`（砖红·朱砂）
- **色值定义**:
  - HEX: `#8B3525`
  - RGB: `rgb(139, 53, 37)`
  - CMYK: `C20 M70 Y75 K30`（印刷用，近似值，需打样确认）
  - PANTONE: PANTONE 7621 C（近似值，需打样确认）
- **使用比例**: 主色在品牌物料中占比 ≤ 15%（稀少才有力量）

### 4.2 辅色 (Secondary Colors)

- **辅色数量**: 0 个（文心只允许一个强调色）
- **使用场景**: 不适用

### 4.3 中性色 (Neutral Colors)

| 名称 | HEX | RGB | CMYK | 用途 |
|------|-----|-----|------|------|
| 暖白 | `#F2F0EB` | `rgb(242, 240, 235)` | `C3 M3 Y6 K0` | 背景、纸张 |
| 纯白 | `#FFFFFF` | `rgb(255, 255, 255)` | `C0 M0 Y0 K0` | Logo 冲压线条 |
| 深炭 | `#3A3837` | `rgb(58, 56, 55)` | `C45 M40 Y40 K65` | 主文字、墨色 |
| 暖灰 | `#888580` | `rgb(136, 133, 128)` | `C25 M22 Y22 K35` | 辅助文字 |
| 浅暖灰 | `#E5E1DA` | `rgb(229, 225, 218)` | `C5 M5 Y8 K5` | 边框、分隔线 |

> 品牌物料默认为亮色优先；暗色模式下参照 Web 部分 §4.1 的暗色映射表取值。

### 4.4 扩展色 (Extended Colors)

- **功能色**: 不使用（文心色彩灵魂不可扩展）
- **装饰色**: 不使用
- **季节/活动色**: 不使用

### 4.5 色彩使用规则与比例 (Color Usage Rules & Proportions)

- **60-30-10 法则（文心变体）**: 暖白 80% / 深炭 15% / 砖红 5%
- **禁止组合**: 砖红 + 高饱和蓝/绿/紫/橙
- **背景色限制**: 砖红 `#8B3525` 仅用于 Logo 底座，不作为大面积背景

---

## 5. 字体系统 (Typography)

### 5.1 标题字体 (Display / Heading Font)

- **字体选择**: Lora（拉丁）/ Noto Serif SC（中文）
- **字重**: Bold (700) 用于品牌名、标题
- **使用场景**: Logo 文字、标题、大字号展示文字
- **授权**: 开源字体（OFL），全平台可用

### 5.2 正文字体 (Body Font)

- **字体选择**: EB Garamond（拉丁）/ Noto Serif SC（中文）
- **字重范围**: Regular (400) / Semi-bold (600) / Bold (700)
- **使用场景**: 品牌文档、营销文案、产品界面正文

### 5.3 品牌专用字体的考量 (Custom / Branded Font Considerations)

- **是否需要定制字体**: 暂不需要，开源字体力气质已满足
- **定制范围**: 如未来需要，仅定制 Logo 文字（品牌名）
- **成本与维护**: 开源字体零成本，维护简单

### 5.4 Web-safe 回退栈 (Web-safe Fallback Stack)

- **标题字体回退栈**: Lora → Georgia → Noto Serif SC → Source Han Serif SC → serif
- **正文字体回退栈**: EB Garamond → Crimson Text → Noto Serif SC → Source Han Serif SC → serif
- **CJK 回退**: Noto Serif SC → Source Han Serif SC → 系统默认衬线

---

## 6. 网格与版式原则 (Grid & Layout Principles)

### 6.1 品牌版式网格 (Brand Typographic Grid)

- **网格基础**: 8pt 网格（品牌物料标准）
- **栏数**: 12 栏（宣传物料）/ 单栏（名片、信头）
- **基线网格**: 文字对齐基线间距 8pt

### 6.2 留白比例 (Whitespace Ratio)

- **留白风格**: 宽松（文心核心原则——留白即设计）
- **Logo 周围留白**: 安全区域 = Logo 高度的 50%
- **版面留白比例**: 内容区域 40% / 留白区域 60%

### 6.3 对齐规则 (Alignment Rules)

- **主要对齐方式**: 左对齐（文心倾向）/ 居中对齐（名片、信头）
- **Logo 与文字的对齐**: 图标与品牌名基线对齐
- **多元素对齐**: 品牌物料中多个元素沿 8pt 网格对齐

---

## 7. 图标与图形风格 (Iconography & Graphic Style)

### 7.1 图标风格 (Icon Style)

- **风格类型**: 线性 (Outline)
- **线条粗细**: 1.5px（统一，不随尺寸变化）
- **圆角**: 与图标库默认保持一致
- **尺寸规范**: 16 / 20 / 24px
- **网格对齐**: 在像素网格上对齐
- **推荐库**: Lucide（功能型 UI）/ Phosphor Light（展示型页面）

### 7.2 插画风格指引 (Illustration Style Guide)

- **风格**: 抽象几何（去具象化），不使用具象物品
- **色彩使用**: 仅文心色板（暖白、深炭、砖红）
- **使用场景**: Landing Page、空状态（文心倾向纯文字，插画极少使用）

### 7.3 摄影风格指引 (Photography Style Guide)

- **色调**: 暖调、自然光
- **构图**: 留白构图、人物居中或偏一侧
- **光线**: 自然光为主
- **后期处理**: 低饱和度、暖色调
- **禁用风格**: 过度修饰、高饱和、冷色调

---

## 8. 应用示例 (Application Examples)

### 8.1 名片设计规范 (Business Card)

- **尺寸**: 90mm × 54mm（中国标准）
- **正面**: 朱砂印章 Logo（居中或左上）+ 姓名 + 职位
- **背面**: 联系方式（`--font-ui` · 10pt）+ 暖白底色
- **材质建议**: 250g 哑光纸，不覆膜（保持纸张触感）

### 8.2 信头纸 (Letterhead)

- **Logo 位置**: 页眉左上角
- **联系信息**: 页脚右下角，`--font-ui` · 8pt · `--color-text-secondary`
- **边距**: 上下左右各 20mm 打印安全边距

### 8.3 社交媒体模板 (Social Media Templates)

- **头像 (Profile Picture)**: 朱砂印章 Mark
- **封面图 (Cover/Banner)**: 暖白底色 + 品牌名（Lora）+ `■` 标识符
- **帖子模板**: 暖白背景 + 深炭文字 + 砖红强调（极少使用）
- **故事/Reels 模板**: 竖版，暖白底色，内容居中

### 8.4 PPT 模板 (Presentation Template)

- **封面页**: 暖白 `#F2F0EB` 背景 + 朱砂印章 Logo + 标题（Lora Bold）
- **内容页**: 暖白背景 + 深炭标题 + 正文（EB Garamond / Noto Serif SC）
- **结束页**: 联系方式 + Logo
- **配色方案**: 暖白 / 深炭 / 砖红（仅用于强调）
- **字体嵌入**: 确保 Lora / EB Garamond / Noto Serif SC 嵌入 PPT

### 8.5 包装（如适用）(Packaging — If Applicable)

- **包装结构**: 简约盒型
- **Logo 位置**: 正面居中
- **色彩与材质**: 暖白纸张 + 砖红烫印（Logo）
- **法规信息**: 背面底部，`--font-ui` · 6pt

---

## 9. 禁止清单 (Do/Don't Guidelines)

### 9.1 Logo 使用禁止事项 (Logo Usage — Don'ts)

- ❌ 禁止透明底座：主 Logo 必须使用 `#8B3525` 实心底座（UI 辅助图标除外）
- ❌ 禁止使用细线：主 Logo 中严禁 1.5px 线宽，必须 2.5px
- ❌ 禁止直角底座：严禁 `rx="0"`，必须 `rx="4"`
- ❌ 禁止媒体查询变色：主 Logo 不编写 Dark Mode 变色逻辑，红底白线全场景通行
- ❌ 禁止具象图标：严禁直接使用 FontAwesome / Lucide 中的具象图标作为 Logo 核心
- ❌ 禁止拉伸或压缩 Logo 比例
- ❌ 禁止旋转 Logo
- ❌ 禁止在 Logo 上添加阴影、描边、渐变等效果
- ❌ 禁止将 Logo 放置在复杂背景上导致不可识别
- ❌ 禁止修改 Logo 中的文字或图形

### 9.2 色彩使用禁止事项 (Color Usage — Don'ts)

- ❌ 禁止使用文心色板之外的颜色作为主色
- ❌ 禁止高饱和蓝、绿、紫、橙
- ❌ 禁止任何渐变色背景
- ❌ 禁止在印刷中使用 RGB 色值（必须使用 CMYK / PANTONE）
- ❌ 禁止砖红作为大面积背景（仅用于 Logo 底座和强调）

### 9.3 字体使用禁止事项 (Typography — Don'ts)

- ❌ 禁止使用文心字体规范之外的字体
- ❌ 禁止对品牌字体添加描边、阴影、变形等效果
- ❌ 禁止将标题字体用于正文（或反之）
- ❌ 禁止在 Logo 中替换品牌专用字体
- ❌ 禁止大段正文居中对齐（伤害可读性）

---

## 10. 最小可交付物标准 (Minimum Deliverable)

### 必须交付的设计产物 (Required Deliverables)

- [x] 主 Logo — 朱砂印章（横版 + 竖版）— SVG 格式
- [x] 次 Logo — 纯文字版 — SVG 格式
- [x] Logo Mark — 品牌标识符 `■` — SVG 格式
- [x] Favicon — PNG 格式（16×16 / 32×32）
- [x] App Icon — PNG 格式（iOS / Android 各尺寸）
- [x] 品牌色彩规范 — HEX / RGB / CMYK / PANTONE 色值
- [x] 品牌字体规范 — Lora / EB Garamond / Noto Serif SC + 回退栈
- [x] Logo 安全区域与最小尺寸定义（50% Logo 高度）
- [x] Logo 变体清单（单色 / 反色）
- [x] 禁止清单（Logo / 色彩 / 字体）

### 文件格式要求 (File Format Requirements)

| 用途 | 格式 | 说明 |
|------|------|------|
| 矢量源文件 | SVG | 可无限缩放，数字通用 |
| 数字使用 | PNG | 透明背景（Mark），多分辨率 |
| 印刷使用 | PDF / CMYK PNG | 印刷色彩模式 |
| 品牌指南文档 | PDF | 完整的品牌使用规范文档 |

### 可选交付 (Optional Deliverables)

- [ ] 品牌指南文档（完整 PDF）
- [ ] 社交媒体模板套件
- [ ] PPT / Keynote 模板
- [ ] 名片与信头纸设计文件
- [ ] 图标库（SVG / PNG 多尺寸）

---

# Print & Editorial 文心规范

---

## 1. 概述 (Overview)

### 目的 (Purpose)

本规范定义文心设计语言在 Print & Editorial 形态中的具体值。文心书卷 (Wenxin Print) 在保持灵魂层不变的前提下，适配印刷排版的单位、色彩和版面惯例。

This specification defines the concrete values of the Wenxin design language in Print & Editorial form. Wenxin Print adapts to print typography units, color, and layout conventions while keeping the soul layer invariant.

### 适用范围 (Scope)

- 书籍（Books）：文学、学术、设计类书籍内页排版
- 学术论文（Academic Papers）：期刊论文、学位论文
- 杂志（Magazines）：编辑型杂志、文化类刊物
- 诗歌（Poetry）：诗集、文学小册子
- 独立出版物 (Zine)：小规模独立印刷品

### 文心书卷维度映射 (Wenxin Print Dimension Mapping)

| 维度 | 值 | 在印刷中的体现 |
|------|-----|---------------|
| A9 克制之美 | 印刷排版天然克制，留白充裕 |
| B9 温暖极简 | 暖白纸张 + 深炭墨色，1px 暖灰边框 |
| C9 温暖衬线 | 衬线字体在印刷中表现最佳，pt 单位 |
| D9 暖土调 | CMYK 映射，砖红建议使用专色 |
| E8 印刷静止 | 无动效、无交互、无暗色模式 |
| G2 东亚 | CJK 避头尾、标点挤压、Noto Serif SC 回退 |

参考：`wenxin-spec.md` §3.3 文心书卷

---

## 2. 布局系统 (Layout System)

### 2.1 页面比例 — Van de Graaf 经典版面

文心书卷采用 Van de Graaf 经典版面确定页面边距比例。在 2:3 页面比例下产生内边距:外边距 = 2:3 的黄金比例关系。

```
Van de Graaf Canon:
  ┌─────────────────────────────┐
  │         顶部边距              │
  │   ┌─────────────────────┐   │
  │   │     文字区域          │   │
  │左 │                     │右 │
  │边 │                     │边 │
  │距 │                     │距 │
  │   │                     │   │
  │   └─────────────────────┘   │
  │         底部边距              │
  └─────────────────────────────┘

  比例：顶部:底部:内侧:外侧 = 2:3:2:3（对开页）
  单页：顶部:底部:内侧:外侧 = 2:3:3:2
```

### 2.2 标准页面尺寸

| 尺寸 | 宽 × 高 | 用途 |
|------|---------|------|
| A5 | 148mm × 210mm | 小型书籍、诗集、手册 |
| B5 | 176mm × 250mm | 学术期刊、杂志 |
| A4 | 210mm × 297mm | 论文、报告、信头纸 |
| Letter | 8.5" × 11" (216mm × 279mm) | 北美标准 |
| 16K | 185mm × 260mm | 中文书籍常用 |

### 2.3 边距系统

基于 Van de Graaf Canon，使用 CSS `@page` 规则：

```css
@page {
  size: A5;
  margin: 30mm 25mm 40mm 20mm; /* 顶:内:底:外 = 2:3:3:2 近似 */
}

@page :left {
  margin: 30mm 20mm 40mm 25mm; /* 左页：内侧(右)窄，外侧(左)宽 */
}

@page :right {
  margin: 30mm 25mm 40mm 20mm; /* 右页：内侧(左)窄，外侧(右)宽 */
}
```

### 2.4 出血与安全区域

- **出血 (Bleed)**: 3mm（标准印刷出血）
- **安全区域 (Safe Area)**: 文字区域距裁切线 ≥ 5mm
- **装订侧内边距**: 单页 ≥ 20mm，确保装订后文字不被遮挡

---

## 3. 字体系统 (Typography System)

### 3.1 印刷字号阶梯（pt 单位）

印刷使用 pt（点）而非 rem。1pt = 1/72 英寸。

| Token | 值 | 用途 |
|-------|-----|------|
| `--print-text-xs` | 7pt | 极小标注、版权、页脚 |
| `--print-text-sm` | 8.5pt | 页眉/页脚、脚注、图注 |
| `--print-text-base` | 10pt | 基准字号（书籍正文） |
| `--print-text-md` | 11pt | 正文阅读推荐 |
| `--print-text-lg` | 13pt | 摘要、小节引导 |
| `--print-text-xl` | 16pt | h4 细分标题 |
| `--print-text-2xl` | 20pt | h3 小节标题 |
| `--print-text-3xl` | 26pt | h2 章节标题 |
| `--print-text-4xl` | 36pt | h1 书籍标题 |
| `--print-text-5xl` | 48pt | 章节起始页大标题 |

阶梯比例：Major Third (1.250)，与 Web 形态一致。

### 3.2 印刷行高

| Token | 值 | 用途 |
|-------|-----|------|
| `--print-leading-tight` | 1.2 | 大号展示标题 |
| `--print-leading-snug` | 1.35 | 小标题 |
| `--print-leading-normal` | 1.5 | 列表项、辅助文字 |
| `--print-leading-relaxed` | 1.8 | 中文正文阅读 |
| `--print-leading-loose` | 1.9 | 英文长文阅读 |

### 3.3 印刷特有排版元素

**首字下沉 (Drop Cap)**

```css
.drop-cap::first-letter {
  font-family: var(--wenxin-font-display);
  font-size: 3.2em;
  float: left;
  line-height: 0.8;
  margin-right: 0.1em;
  margin-top: 0.05em;
  color: var(--wenxin-color-accent); /* 全章仅首字使用 accent */
}
```

**页眉 (Running Head)**

```
位置：页面顶部，外侧对齐
字体：--font-ui · 8.5pt · --tracking-wider · 全大写
颜色：--color-text-muted
奇数页（右页）：章节标题
偶数页（左页）：书名
```

**页码 (Folio)**

```
位置：页面底部，居中或外侧对齐
字体：--font-ui · 8.5pt
颜色：--color-text-muted
奇数页（右页）：右侧
偶数页（左页）：左侧
章节起始页：无页码（或底部居中）
```

**脚注 (Footnote)**

```
分隔线：40px 短横线，--color-border-strong，1px
脚注文字：--font-body · 8pt · --leading-normal
脚注编号：上标，--color-accent
脚注区域与正文间距：--space-4 (16pt)
```

**小型大写字母 (Small Caps)**

```css
.small-caps {
  font-variant: small-caps;
  letter-spacing: 0.05em;
}
```

用于：页眉标题、版权页标题、归因名称。

**结尾装饰 (End Ornament)**

```
符号：§ 或 ✦（选择其一，全书统一）
位置：章节末尾，居中
大小：--text-lg
颜色：--color-text-muted
与上文间距：--space-8 (32pt)
```

### 3.4 奇偶页处理 (Verso / Recto)

- **奇数页 (Recto / 右页)**：章节起始页，页眉显示章节标题
- **偶数页 (Verso / 左页)**：页眉显示书名
- **章节起始页**：无页眉，页码位于底部居中
- **空白页**：完全空白，无页眉、无页码（用于章节间补页）

---

## 4. 色彩系统 (Color System)

### 4.1 CMYK 色值映射

文心 Web 色值到印刷 CMYK 的映射：

| Token | HEX (Web) | CMYK (印刷) | PANTONE (近似) | 用途 |
|-------|-----------|-------------|---------------|------|
| `--color-bg-warm` | `#F2F0EB` | C3 M3 Y6 K0 | — | 暖白纸张（建议使用纸张本色） |
| `--color-bg-pure` | `#FFFFFF` | C0 M0 Y0 K0 | — | 纯白纸张 |
| `--color-text-primary` | `#3A3837` | C45 M40 Y40 K65 | PANTONE 432 C | 主文字·深炭墨色 |
| `--color-text-secondary` | `#888580` | C25 M22 Y22 K35 | PANTONE 7540 C | 辅助文字 |
| `--color-text-muted` | `#B0ABA4` | C15 M12 Y14 K28 | — | 弱化文字 |
| `--color-text-heading` | `#2C2B29` | C50 M45 Y42 K70 | PANTONE 431 C | 标题 |
| `--color-accent` | `#8B3525` | C20 M70 Y75 K30 | PANTONE 7621 C | 砖红·朱砂 |
| `--color-border-subtle` | `#E5E1DA` | C5 M5 Y8 K5 | — | 细边框 |
| `--color-border-strong` | `#C8C3BA` | C10 M10 Y12 K20 | — | 明显边框 |

**印刷色彩约束：**
- 暖白背景色（`#F2F0EB`）在印刷中建议使用纸张本色（uncoated paper），不额外印刷底色
- 砖红强调色（`#8B3525`）建议使用专色（Spot Color）印刷，确保色彩准确
- 四色印刷时，砖红色需打样确认，CMYK 值为近似参考
- 禁止使用任何渐变色（与 Web 形态一致）

### 4.2 印刷专色策略

| 场景 | 策略 |
|------|------|
| 单色印刷 | 黑色 + 灰度层次，砖红色使用 60% 网点模拟 |
| 双色印刷 | 黑色 + PANTONE 7621 C（砖红专色） |
| 四色印刷 (CMYK) | 标准 CMYK 映射，砖红色打样确认 |
| 数码印刷 | 使用 RGB 色值，打印机色彩管理 |

---

## 5. 组件规范 (Component Library)

### 5.1 印刷特有组件

| 组件 | 规范 |
|------|------|
| **首字下沉 (Drop Cap)** | `--font-display` · 3.2em · `--color-accent` · 全章仅首字 |
| **页眉 (Running Head)** | `--font-ui` · 8.5pt · 全大写 · `--tracking-wider` · `--color-text-muted` |
| **页码 (Folio)** | `--font-ui` · 8.5pt · `--color-text-muted` · 奇右偶左 |
| **脚注 (Footnote)** | `--font-body` · 8pt · `--leading-normal` · 短横线分隔 |
| **结尾装饰 (End Ornament)** | `§` 或 `✦` · `--text-lg` · `--color-text-muted` · 居中 |
| **Pull Quote** | 与 Web 形态一致，但使用 pt 单位 |
| **Blockquote** | 与 Web 形态一致，但使用 pt 单位 |

### 5.2 印刷禁止事项

| 禁止 | 原因 |
|------|------|
| 全出血图片（除封面外） | 与文心留白哲学冲突 |
| 多色背景色块 | 印刷成本高且与克制美学冲突 |
| 小于 7pt 的文字 | 印刷可读性不足 |
| 纯黑（`#000000`）文字 | 与暖炭色（`#3A3837`）气质不符 |
| 装饰性边框和花纹 | 违反 A9 克制之美 |

---

## 6. 动效理念 (Motion Philosophy)

### E8 印刷静止

F4 是唯一使用 E8（印刷静止）的形态。

**含义：** 印刷页面没有动效、没有交互状态、没有暗色模式。所有信息通过静态排版传达。

**对设计系统的影响：**
- 不使用任何 `transition`、`animation`、`:hover`、`:focus` 样式
- 不需要暗色模式色彩映射
- 不需要交互状态（default/hover/focus/active/disabled）
- 所有视觉层级通过字号、字重、间距、色彩静态实现
- 品牌标识符 `■` 不使用呼吸动效，仅静态呈现

---

## 7. 与 F3 Brand 的边界 (Boundary with F3 Brand)

| 领域 | F3 Brand 负责 | F4 Print 负责 |
|------|-------------|-------------|
| Logo 系统 | Logo 设计、变体、禁止清单 | Logo 在印刷品中的放置规则 |
| 名片 | 名片的视觉设计 | 名片的排版参数（字号、间距） |
| 信头纸 | 信头纸的 Logo 放置和品牌色 | 信头纸的页面布局、边距、正文排版 |
| 品牌指南 | 品牌指南文档的整体设计 | 品牌指南文档的印刷参数 |
| 色彩系统 | HEX / RGB / CMYK / PANTONE 定义 | CMYK 色值在具体印刷品中的应用 |

**原则：** F3 定义"品牌是什么"，F4 定义"品牌在印刷页面上怎么排"。

> **注：** 封面设计已独立为 F7 文心海报。F4 仅负责内页排版，F7 负责封面/海报设计。

---

## 8. 最小可交付物标准 (Minimum Deliverable)

### 必须交付 (Required — 12 Items)

- [ ] 印刷字号阶梯：10 级（7pt ~ 48pt），Major Third 比例
- [ ] 印刷行高：5 级（1.2 ~ 1.9）
- [ ] CMYK 色值映射表：完整 9 色映射
- [ ] Van de Graaf 页面版面系统
- [ ] 标准页面尺寸定义：A5 / B5 / A4 / Letter / 16K
- [ ] 奇偶页处理规则
- [ ] 首字下沉组件
- [ ] 页眉/页码组件
- [ ] 脚注组件
- [ ] 结尾装饰组件
- [ ] Print CSS (`@media print`) 样式表
- [ ] 印刷色彩约束规则

### 可选交付 (Optional — 6 Items)

- [ ] InDesign 段落样式规范
- [ ] PDF 输出约定（PDF/X-1a 或 PDF/X-4）
- [ ] 封面设计规范
- [ ] 目录排版规范
- [ ] 索引排版规范
- [ ] 专色印刷打样指南

---

# Documentation 文心规范

---

## 1. 概述 (Overview)

### 目的 (Purpose)

本规范定义文心设计语言在 Documentation 形态中的具体值。文心文档 (Wenxin Documentation) 在保持灵魂层不变的前提下，适配文档站特有的双栏布局、代码高亮和导航组件。

This specification defines the concrete values of the Wenxin design language in Documentation form. Wenxin Documentation adapts to documentation-specific two-column layout, syntax highlighting, and navigation components while keeping the soul layer invariant.

### 适用范围 (Scope)

- API 文档（REST / GraphQL API 参考）
- 知识库（产品帮助中心、FAQ）
- Wiki（团队知识库、内部文档）
- 开发者指南（SDK / 库的使用文档）
- 技术博客（长篇技术文章，带代码）
- 内部手册（操作手册、流程文档）

### 文心文档维度映射 (Wenxin Documentation Dimension Mapping)

| 维度 | 值 | 在文档站中的体现 |
|------|-----|-----------------|
| A9 克制之美 | 文档站无装饰，信息优先，留白充裕 |
| B9 温暖极简 | 暖白底色 + 深炭文字，1px 暖灰边框 |
| C9 温暖衬线 | 正文衬线，代码等宽，UI 无衬线 |
| D9 暖土调 | 暖色调语法高亮（棕/金/红/灰），禁止冷色调 |
| E9 温和流动 | 极简适配：仅侧边栏展开/折叠、搜索结果淡入等必要动效 |
| G2 东亚 | CJK 行高 ≥ 1.6、中文展示字距 0.1em、Noto Serif SC 回退 |

参考：`wenxin-spec.md` §3.3 文心文档

---

## 2. 布局系统 (Layout System)

### 2.1 双栏布局 (Two-Column Layout)

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

### 2.2 侧边栏 (Sidebar)

```
宽度：240px（桌面端），固定定位
背景：--color-bg-base
边框：右侧 1px solid --color-border-subtle
字体：--font-ui · --text-sm
当前项：--color-accent · 左侧 2px 竖线
Hover：--color-text-primary · --duration-fast
折叠组：点击展开/折叠，--duration-base 过渡
```

### 2.3 响应式策略 (Responsive Strategy)

```css
/* Desktop: > 1024px — 双栏布局 */
/* Tablet: 640px ~ 1024px — 侧边栏折叠为 hamburger 菜单 */
/* Mobile: < 640px — 全屏侧边栏（抽屉式），内容区全宽 */
```

- 移动端侧边栏：从左侧滑入（`--duration-slow`, `--ease-out`），遮罩层 `rgba(0,0,0,0.3)`
- 搜索框：移动端全宽，桌面端在 Header 中

### 2.4 内容宽度 (Content Width)

文档内容区使用 `--width-article`（`clamp(520px, 55vw, 640px)`），与阅读型页面原型一致。代码块可溢出到 `--width-content`（`clamp(620px, 65vw, 760px)`）。

---

## 3. 字体系统 (Typography System)

### 3.1 文档字号阶梯 (Documentation Type Scale)

与 F1 Web 完全一致，增加一个代码专用 Token：

```css
:root {
  /* 新增：行内代码字号 */
  --wenxin-text-code: 0.875em;  /* 相对于父元素，约 14px 在 --text-md 上下文中 */
}
```

### 3.2 代码排版 (Code Typography)

| 元素 | 字体 | 字号 | 行高 | 背景 |
|------|------|------|------|------|
| 行内代码 | `--font-mono` | `--text-code` (0.875em) | 继承 | `--color-bg-subtle` |
| 代码块 | `--font-mono` | `--text-sm` (13px) | `--leading-normal` (1.6) | `--color-bg-subtle` |
| 代码块标题 | `--font-ui` | `--text-xs` (11px) | — | `--color-bg-subtle` |
| 代码块行号 | `--font-mono` | `--text-sm` | `--leading-normal` | 透明 |
| 复制按钮 | `--font-ui` | `--text-xs` | — | 透明 |

---

## 4. 色彩系统 (Color System)

### 4.1 文档色彩 (Documentation Colors)

与 F1 Web 完全一致，增加暖色调语法高亮方案。

### 4.2 语法高亮方案 — 暖色调 (Warm-Tone Syntax Highlighting)

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

## 5. 组件规范 (Component Library)

### 5.1 文档特有组件 (Documentation-Specific Components)

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
语法高亮：暖色调方案（见 §4.2）
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

## 6. 动效系统 (Motion System)

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

## 7. 最小可交付物标准 (Minimum Deliverable)

### 必须交付 (Required — 13 Items)

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

### 可选交付 (Optional — 5 Items)

- [ ] 全文搜索集成规范
- [ ] 多语言文档切换
- [ ] 代码块语言标签
- [ ] 代码块 diff 高亮
- [ ] 文档版本 diff 视图

---

# Presentation 文心规范

---

## 1. 概述 (Overview)

### 目的 (Purpose)

本规范定义文心设计语言在 Presentation 形态中的具体值。文心演示 (Wenxin Presentation) 在保持灵魂层不变的前提下，适配演示文稿特有的 16:9 画布、展示型字号和幻灯片组件系统。

This specification defines the concrete values of the Wenxin design language in Presentation form. Wenxin Presentation adapts to presentation-specific 16:9 canvas, display-first type scale, and slide component system while keeping the soul layer invariant.

### 适用范围 (Scope)

- 路演演示 (Pitch Deck)
- 会议演讲 (Conference Talk)
- 课堂讲座 (Lecture)
- 内部汇报 (Internal Presentation)
- 产品发布 (Product Launch)

### 文心演示维度映射 (Wenxin Presentation Dimension Mapping)

| 维度 | 值 | 在演示中的体现 |
|------|-----|---------------|
| A9 克制之美 | 文字即界面 — 幻灯片是纯文字 + 呼吸空间，每张 ≤ 30 字标题 |
| B9 温暖极简 | 暖白底色 + 深炭文字，1px 暖灰边框 |
| C9 温暖衬线 | 展示优先适配：标题 `--font-display`（Lora），正文 `--font-body`（EB Garamond） |
| D9 暖土调 | 双模式适配：亮色与 Web 一致；暗色演示模式使用暖暗色 |
| E9 温和流动 | 幻灯片适配：页面切换和构建动画使用温和缓动 |
| G2 东亚 | CJK 排版规范，中文标题舒展字距 0.1em |

参考：`wenxin-spec.md` §3.3 文心演示

---

## 2. 布局系统 (Layout System)

### 2.1 画布尺寸 (Canvas)

```
标准画布：16:9 比例
像素尺寸：1920 × 1080（高清）
逻辑尺寸：使用 vw/vh 或百分比布局
安全区域：距边缘 ≥ 5% 画布宽度（96px）
```

### 2.2 幻灯片网格 (Slide Grid)

```
12 列网格，gutter 24px（逻辑像素）
内容区域：距左右边缘各 5%，距上下边缘各 8%
标题区域：上方 1/3
内容区域：下方 2/3
页码位置：右下角，距边缘 3%
```

### 2.3 幻灯片类型与布局 (Slide Types & Layouts)

**标题幻灯片 (Title Slide)**

```
布局：垂直居中
品牌标识符 ■：紧随标题后
标题：--font-display · --text-5xl · --tracking-chinese（中文）/ --tracking-tight（英文）
副标题：--font-body · --text-lg · --color-text-secondary
日期/地点：--font-ui · --text-sm · --color-text-muted · --tracking-wider
背景：--color-bg-warm
```

**章节分隔幻灯片 (Section Divider)**

```
布局：垂直居中
章节编号：--font-ui · --text-sm · --tracking-wider · 全大写 · --color-text-muted
章节标题：--font-display · --text-4xl
背景：--color-bg-warm
装饰：章节编号旁可使用 ■ 标识符（accent 的第二次出现）
```

**内容幻灯片 — 纯文字 (Content Slide: Text)**

```
标题：--font-display · --text-2xl · ≤ 30 字
正文：--font-body · --text-lg · --leading-relaxed
要点列表：每项 ≤ 2 行，最多 5 项
列表标记：短横线（—）或无标记，不使用圆点
背景：--color-bg-pure 或 --color-bg-base
```

**内容幻灯片 — 文字+图片 (Content Slide: Text + Image)**

```
布局：左文右图（60/40）或上图下文
图片：无圆角、无阴影、无边框
图片说明：--font-ui · --text-sm · --color-text-muted
背景：--color-bg-pure
```

**引用幻灯片 (Quote Slide)**

```
布局：垂直居中
引语：--font-display · --text-3xl · italic · --color-text-heading
归因：归因区排版模式（短横线 + 名称 + 说明）
背景：--color-bg-warm
```

**结尾幻灯片 (Closing Slide)**

```
布局：垂直居中
内容：感谢语 + 联系方式
品牌标识符 ■：感谢语后
背景：--color-bg-warm
```

**演讲者备注 (Speaker Notes)**

```
位置：幻灯片下方独立区域（不显示在投影中）
字体：--font-ui · --text-sm
颜色：--color-text-secondary
背景：--color-bg-subtle
```

---

## 3. 字体系统 (Typography System)

### 3.1 演示字号阶梯 (Presentation Type Scale)

演示字号比 Web 更大，确保远距离可读性：

| Token | 值 | 用途 |
|-------|-----|------|
| `--slide-text-sm` | `0.875rem` (~14px) | 演讲者备注、页脚 |
| `--slide-text-base` | `1.125rem` (~18px) | 辅助说明、图注 |
| `--slide-text-md` | `1.375rem` (~22px) | 要点列表正文 |
| `--slide-text-lg` | `1.75rem` (~28px) | 副标题 |
| `--slide-text-xl` | `2.25rem` (~36px) | 小节标题 |
| `--slide-text-2xl` | `3rem` (~48px) | 幻灯片标题 |
| `--slide-text-3xl` | `4rem` (~64px) | 章节标题 |
| `--slide-text-4xl` | `5.5rem` (~88px) | 标题幻灯片大标题 |

阶梯比例：Major Third (1.250)，与 Web 形态一致。

### 3.2 演示文字约束 (Text Constraints)

- **标题每张幻灯片 ≤ 30 字**（中文）/ ≤ 8 词（英文）
- **要点列表每项 ≤ 2 行**，每张幻灯片最多 5 项
- **正文幻灯片总字数 ≤ 80 字**（中文）/ ≤ 50 词（英文）
- **引用幻灯片引语 ≤ 50 字**（中文）/ ≤ 30 词（英文）

---

## 4. 色彩系统 (Color System)

### 4.1 亮色模式（默认）

与 F1 Web 亮色模式完全一致。所有 Token 值不变。

### 4.2 暗色演示模式

演示场景常需要暗色背景（投影环境、强调氛围）。暗色演示模式与 Web 暗色模式一致：

```css
/* 暗色演示模式 — 与 Web 暗色模式一致 */
[data-slide-theme="dark"] {
  --wenxin-color-bg-warm:   #1A1816;
  --wenxin-color-bg-base:   #201E1B;
  --wenxin-color-bg-pure:   #242220;
  --wenxin-color-bg-subtle:  #2A2724;
  /* ... 完整暗色映射同 Web ... */
}
```

### 4.3 强调幻灯片模式

```css
/* 强调幻灯片 — 砖红背景（极少数使用，全演示 ≤ 1 张） */
[data-slide-theme="accent"] {
  --slide-bg:    #8B3525;  /* 砖红全屏背景 */
  --slide-color: #FFFFFF;  /* 纯白文字 */
}
```

**强调幻灯片使用约束：**
- 全演示 ≤ 1 张强调幻灯片
- 仅用于关键结论、核心数据、最终 CTA
- 不用于章节分隔（章节分隔使用 `--color-bg-warm`）

---

## 5. 动效系统 (Motion System)

### 5.1 幻灯片切换 (Slide Transitions)

| 切换类型 | 参数 | 说明 |
|---------|------|------|
| 淡入淡出 (Fade) | `--duration-slow` (420ms), `--ease-out` | 默认切换方式 |
| 推入 (Push) | `--duration-slow` (420ms), `--ease-out` | 章节间切换 |
| 无切换 (Cut) | 0ms | 连续内容幻灯片间快速切换 |

**禁止的切换效果：** 旋转、翻转、缩放、弹跳、3D 变换、任何超过 420ms 的切换。

### 5.2 构建动画 (Build Animations)

幻灯片内元素的渐次显现：

| 动画类型 | 参数 | 说明 |
|---------|------|------|
| 渐显 (Fade In) | `opacity 0→1`, `--duration-slow`, `--ease-out` | 默认构建动画 |
| 上移渐显 (Fade Up) | `opacity 0→1` + `translateY(8px→0)`, `--duration-slow`, `--ease-out` | 要点列表项 |
| 列表渐显 (Stagger) | 每项间隔 60ms | 要点列表逐项显现 |

**禁止的构建动画：** 旋转、弹跳、位移超过 16px、循环动画。

### 5.3 演讲者备注切换

- 演讲者备注不使用动画
- 幻灯片切换时备注即时更新

---

## 6. 组件规范 (Component Library)

### 6.1 演示特有组件 (Presentation-Specific Components)

| 组件 | 规范 |
|------|------|
| **幻灯片页码** | `--font-ui` · `--slide-text-sm` · `--color-text-muted` · 右下角 |
| **进度指示器** | 底部细线，`--color-border-subtle`，当前位置 `--color-accent` |
| **要点列表** | 短横线（—）标记，每项 `--slide-text-md`，间距 `--space-4` |
| **代码展示** | `--font-mono` · `--slide-text-base` · `--color-bg-subtle` 背景 · 左侧 3px `--color-border-strong` |
| **数据表格** | 与 Web 形态一致，但字号增大至 `--slide-text-base` |
| **图片** | 无圆角、无阴影、无边框，宽度 ≤ 40% 画布宽度 |

### 6.2 演示禁止事项 (Presentation Don'ts)

| 禁止 | 原因 |
|------|------|
| 每张幻灯片 > 80 字 | 违反 A9 克制之美 |
| 填充色按钮 | 违反文心按钮规范 |
| 渐变背景 | 违反 D9 暖土调 |
| 装饰性图片 | 仅内容型图片 |
| 项目符号圆点 | 使用短横线（—）替代 |
| 动画切换效果 | 仅允许淡入淡出和推入 |

---

## 7. 响应式与输出 (Responsive & Output)

### 7.1 输出格式 (Output Formats)

| 格式 | 说明 |
|------|------|
| HTML/CSS | 主要交付格式，使用 CSS Scroll Snap 或 JS 框架 |
| PPTX 模板规范 | 字体、色彩、布局参数定义，供手动创建 |
| Keynote 模板规范 | 同上 |
| PDF 导出 | 从 HTML 导出，16:9 比例 |

### 7.2 HTML 幻灯片框架要求 (HTML Slide Framework Requirements)

- 16:9 固定比例，居中显示
- 支持键盘导航（← → 翻页，Esc 概览）
- 支持演讲者备注窗口
- 支持 `prefers-reduced-motion`
- 支持亮色/暗色模式切换

---

## 8. 最小可交付物标准 (Minimum Deliverable)

### 必须交付 (Required — 9 Items)

- [ ] 幻灯片画布尺寸与网格系统定义
- [ ] 演示字号阶梯：8 级（14px ~ 88px）
- [ ] 6 种幻灯片类型布局规范
- [ ] 亮色/暗色/强调三种幻灯片模式
- [ ] 幻灯片切换动效规范
- [ ] 构建动画规范
- [ ] 演讲者备注规范
- [ ] HTML/CSS 幻灯片框架
- [ ] 文字密度约束规则（≤30 字标题 / ≤80 字正文）

### 可选交付 (Optional — 4 Items)

- [ ] PPTX 模板文件
- [ ] Keynote 模板文件
- [ ] PDF 导出配置
- [ ] 演示文稿示例（5-10 张）

---

# Poster & Cover 文心规范

---

## 1. 概述 (Overview)

### 目的 (Purpose)

本规范定义文心设计语言在 Poster & Cover 形态中的具体值。文心海报 (Wenxin Poster) 在保持灵魂层不变的前提下，适配单页海报/封面特有的画布比例、构图模式和展示型字号。

This specification defines the concrete values of the Wenxin design language in Poster & Cover form. Wenxin Poster adapts to poster-specific canvas ratios, composition modes, and display-first type scale while keeping the soul layer invariant.

### 哲学 (Philosophy)

海报是文心"克制之美"在单页尺度上的最强表达。克制不是"什么都不放"，而是"只放必须放的"。整张海报只有一个 accent 焦点，其他地方都是留白。

The poster is the strongest expression of Wenxin "restrained beauty" at single-page scale. Restraint is not "putting nothing" — it is "putting only what must be there." The entire poster has one accent focal point; everything else is whitespace.

### 适用范围 (Scope)

- 活动海报（Event Posters）：讲座、展览、音乐会、工作坊
- 书籍封面（Book Covers）：文学、学术、设计类书籍封面
- 专辑封面（Album Covers）：音乐专辑、播客封面
- 数字横幅（Digital Banners）：网页头图、活动横幅、品牌展示横幅
- 宣传单页（Flyers）：品牌宣传单页、产品介绍单页
- 展览海报（Exhibition Posters）：美术馆、博物馆展览主视觉

### 文心海报维度映射 (Wenxin Poster Dimension Mapping)

| 维度 | 值 | 在海报中的体现 |
|------|-----|---------------|
| A9 克制之美 | 单页极简，一个视觉锚点，其余留白 |
| B9 温暖极简 | 暖白底或暖暗底，极简 UI 元素 |
| C9 温暖衬线 | 展示优先：标题 `--font-display`（Lora），极大字号 |
| D9 暖土调 | 单页 accent 可放宽：标题 + 署名各 1 处 = ≤ 2 处 |
| E8 印刷静止 | 印刷海报无动效（与 F4 一致） |
| E9 温和流动 | 数字海报：单次进场动画（fade-up, 420ms），无循环 |
| F7 | Poster & Cover | 单页固定画布，多比例支持 |
| G2 东亚 | CJK 排版，中文标题舒展字距 0.1em |

> **注**：F7 的 accent 约束与 Web 形态不同。Web 形态全页 accent ≤ 2 处，但对单页海报而言，"全页"就是一张画布，accent 可以更集中但总体仍克制。标题使用 accent 是允许的——这是海报的"点睛"。

参考：`wenxin-spec.md` §3.3 文心海报

---

## 2. 布局系统 (Layout System)

### 2.1 画布比例 (Canvas Ratios)

| 比例 | 尺寸（基准） | 用途 |
|------|------------|------|
| 2:3 | 1200×1800 | 书籍封面、竖版海报（标准） |
| 3:4 | 1200×1600 | 竖版海报、宣传单页 |
| 1:1 | 1200×1200 | 专辑封面、社交媒体头像 |
| 16:9 | 1920×1080 | 横幅、社交媒体头图、横版海报 |
| 4:3 | 1600×1200 | 横版海报 |
| A 系列 | A4 / A3 / A2 / A1 | 印刷海报（ISO 216 标准） |

### 2.2 构图模式 (Composition Modes)

| 模式 | 说明 | 适用场景 |
|------|------|---------|
| **居中对称** | 所有元素垂直+水平居中 | 活动海报、书籍封面 |
| **左对齐** | 文字组左对齐，上方 1/3 或下方 2/3 | 宣传单页、学术海报 |
| **对角分布** | 主标题占上方，署名/日期占右下 | 展览海报、专辑封面 |
| **全出血文字** | 极大字号标题占满画布 | 极简海报、品牌海报 |

### 2.3 安全区域与出血 (Safe Area & Bleed)

- **裁切出血**：3mm（印刷海报），数字海报不需要
- **安全区域**：重要文字距边缘 ≥ 8% 画布边长
- **Logo/署名位置**：右下角或底部居中
- **空白区域**：≥ 50% 画布面积（留白即设计）

---

## 3. 字体系统 (Typography System)

### 3.1 海报字号阶梯 (Poster Type Scale)

海报字号比演示（F5）更大，因为观看距离更远：

| Token | 值 | 用途 |
|-------|-----|------|
| `--poster-text-xs` | `0.75rem` (12px) | 极小标注、ISBN、条形码 |
| `--poster-text-sm` | `0.875rem` (14px) | 日期、地点、署名、网址 |
| `--poster-text-base` | `1.125rem` (18px) | 辅助说明 |
| `--poster-text-md` | `1.5rem` (24px) | 副标题、次要信息 |
| `--poster-text-lg` | `2rem` (32px) | 小标题、标签 |
| `--poster-text-xl` | `3rem` (48px) | 中等标题 |
| `--poster-text-2xl` | `4.5rem` (72px) | 大标题 |
| `--poster-text-3xl` | `6rem` (96px) | 主标题（标准海报） |
| `--poster-text-4xl` | `8rem` (128px) | 极大标题（展览海报） |
| `--poster-text-5xl` | `12rem` (192px) | 全出血标题 |

阶梯比例：Major Third (1.250)，与所有形态一致。

### 3.2 文字约束 (Text Constraints)

- **主标题** ≤ 15 字（中文）/ ≤ 8 词（英文）
- **总文字元素** ≤ 5 个（标题、副标题、日期、地点、署名）
- **每种字重** ≤ 2 种（Bold 标题 + Regular 信息）
- **每种字号** ≤ 3 种

---

## 4. 色彩系统 (Color System)

### 4.1 色彩应用 (Color Application)

与 F1 Web 完全一致。单页海报 accent 使用策略：

```css
/* 海报 accent 使用规则 */
.poster-title       { color: var(--wenxin-color-accent); }       /* 允许：标题用 accent */
.poster-subtitle    { color: var(--wenxin-color-text-heading); }
.poster-meta        { color: var(--wenxin-color-text-secondary); }
.poster-attribution { color: var(--wenxin-color-accent); }       /* 允许：署名用 accent */
```

### 4.2 海报 Accent 约束 (Poster Accent Constraints)

**整张海报 accent 出现在标题（1 处）+ 署名（1 处）= 总共 ≤ 2 处。** 其余所有信息使用中性色。

---

## 5. 动效系统 (Motion System)

### 5.1 印刷海报 (Print Posters)

- **E8 印刷静止**：无动效、无交互状态、无暗色模式
- 所有视觉层级通过字号、字重、间距、色彩静态实现

### 5.2 数字海报 (Digital Posters)

- **单次进场动画**：fade-up `opacity 0→1` + `translateY(12px→0)`
- **过渡时长**：`--duration-slow` (420ms), `--ease-out`
- **品牌标识符 ■**：使用呼吸动效（与 F3 一致），`opacity 1→0.6→1`，周期 4s
- **无循环动效**：除 ■ 呼吸外，禁止任何循环动画
- **尊重动效偏好**：`@media (prefers-reduced-motion: reduce)` 变为静态

---

## 6. 与 F3 Brand 的边界 (Boundary with F3 Brand)

| 领域 | F3 Brand 负责 | F7 Poster 负责 |
|------|-------------|-------------|
| Logo 系统 | Logo 设计、变体、禁止清单 | Logo 在海报中的放置位置和大小 |
| 色彩系统 | HEX/RGB/CMYK/PANTONE 定义 | 色彩在海报中的具体应用 |
| 字体系统 | Lora/EB Garamond/Noto Serif SC + 回退栈 | 字体在海报中的层级和组合 |
| 品牌标识符 ■ | 定义（8×8px, accent, 呼吸动效） | ■ 在海报构图中的位置 |

**原则：** F3 定义"品牌是什么"，F7 定义"品牌在海报上怎么排"。

---

## 7. 最小可交付物标准 (Minimum Deliverable)

### 必须交付 (Required — 8 Items)

- [ ] 海报画布比例定义（6 种比例）
- [ ] 海报字号阶梯（10 级，12px ~ 192px）
- [ ] 4 种构图模式布局规范
- [ ] 单页 accent 使用规则（标题 + 署名 ≤ 2 处）
- [ ] 安全区域与出血规范
- [ ] 数字海报进场动画规范
- [ ] HTML/CSS 海报模板
- [ ] 文字密度约束规则（≤ 5 个文字元素）

### 可选交付 (Optional — 3 Items)

- [ ] 各比例海报模板
- [ ] 印刷海报 CMYK 导出配置
- [ ] 数字横幅特定尺寸模板

---

# Diagram & Knowledge Map 文心规范

> Version: 1.0.0 | 2026-05-24 | Wenxin-Specific

---

## 1. 概述 (Overview)

F8 文心图解用于交付可独立存在的关系图、流程图、架构图、知识地图和方法论框架图。它的核心不是装饰性插图，而是用文字、线条、留白和拓扑关系解释复杂结构。

**边界：**

- F8 负责图解本身；F6 Documentation 只负责承载图解的文档站。
- F8 负责关系理解；F5 Presentation 负责多页演讲节奏。
- F8 追求结构可读；F7 Poster 追求单页传播视觉。

## 2. 交付格式

- 主格式：单文件 HTML + 内联 SVG/CSS，输出到 `dist/<project-slug>/index.html`
- 可选格式：独立 SVG、Mermaid 源到 Wenxin SVG 的重绘说明
- 所有 SVG 规则继承 `.opencode/agents/wenxin/diagrams.md` 与 `conventions.md`

## 3. 图解结构

| 类型 | 用途 | 核心规则 |
|------|------|----------|
| Architecture | 系统架构、模块边界 | 分层清晰，边界线轻，不使用云状/拟物图标 |
| Flow | 流程、状态迁移 | 方向明确，箭头轻量，条件文字悬浮在水平线段上方 |
| Knowledge Map | 知识地图、概念网络 | 中心概念少，分支留白充足，避免蛛网式拥挤 |
| Framework | 方法论框架、矩阵 | 网格克制，文字为主，不用彩色象限 |

## 4. 视觉规则

- 背景使用 `#F2F0EB` 或透明；节点底色使用 `#FAFAF8`
- 普通线条 `1px`，关键节点边框 `1.5px`
- Accent ≤ 2 处，仅用于原点、终点或核心闭环
- 禁止 Mermaid 默认彩虹色块、粗黑箭头、线条穿过文字、装饰性图标
- 图解必须有标题、副标题或编辑型引语，避免成为裸流程图

## 5. Render Contract

F8 HTML 必须声明：

```json
{
  "profile": "F8",
  "canvas": { "kind": "diagram", "ratio": "auto" },
  "diagram": {
    "type": "architecture | flow | knowledge-map | framework",
    "nodes": { "count": 0 },
    "edges": { "count": 0 }
  },
  "theme": { "accentBudget": 2 }
}
```

## 6. 审计重点

- 节点与连线是否分离，线条不穿过文字
- 关系方向是否 3 秒内可识别
- Accent 是否只标记真正的结构焦点
- 是否存在默认 Mermaid 样式残留

## 7. 最小可交付物标准

- [ ] 图解标题与类型声明
- [ ] 节点、连线、分组边界清晰
- [ ] Accent ≤ 2 处
- [ ] Render Contract `profile: F8`
- [ ] SVG/HTML 可独立打开
- [ ] 通过 Render Contract 审计与 Audit Agent 多层审计

---

# Report & LaTeX Typesetting 文心规范

> Version: 1.0.0 | 2026-05-24 | Wenxin-Specific

---

## 1. 概述 (Overview)

F9 文心报告用于将 Markdown、研究草稿或结构化笔记整理为可独立阅读的报告，并以 LaTeX/PDF 为主交付目标。它不是 Web report，也不是 Dashboard，而是“论证结构 + 排版编译”的文心形态。

**核心路径：** Markdown → Wenxin Report LaTeX → PDF。

## 2. 与 F4/F5/F6 的边界

| 形态 | 负责内容 |
|------|----------|
| F4 Print & Editorial | 书籍、杂志、论文、Zine 的出版内页排版 |
| F5 Presentation | 面向现场讲述的多页幻灯片 |
| F6 Documentation | 可浏览、可搜索、可导航的文档站 |
| F9 Report | 可独立阅读的判断型报告，强调摘要、证据、洞察、建议 |

F9 可复用 F4 的印刷 token 和页边距思想，但不承担书籍出版系统；F9 可包含图表，但图解本身仍遵循 F8。

## 3. 报告结构

标准章节顺序：

1. Title Page
2. Executive Summary
3. Question / Context
4. Method / Sources
5. Findings
6. Evidence / Figures
7. Interpretation
8. Recommendations
9. Appendix

允许删除不适用章节，但必须保留 `Executive Summary`、`Findings`、`Recommendations` 三个核心结构。

## 4. Markdown Frontmatter

```yaml
---
title: "报告标题"
subtitle: "可选副标题"
author: "作者"
date: "2026-05-24"
language: "zh-CN"
profile: "F9"
source_format: "markdown"
target_format: "latex-pdf"
sections:
  - executive_summary
  - findings
  - recommendations
---
```

## 5. LaTeX 排版规则

- 主模板使用 XeLaTeX，优先支持 CJK
- 正文衬线优先，UI/元数据使用无衬线
- 页面使用暖白纸张语义；PDF 背景默认不铺色，保留纸张本色
- Accent 仅用于封面标识、关键引文或极少数结论标记，总量 ≤ 2 类用途
- 图表、表格、脚注、引用、附录必须有清晰编号和 caption
- 禁止彩色 Dashboard 图表、模板化封面、装饰性分割页

## 6. Render Contract

F9 预览 HTML 或构建说明必须声明：

```json
{
  "profile": "F9",
  "source": { "format": "markdown" },
  "target": { "format": "latex-pdf", "engine": "xelatex" },
  "report": {
    "sections": ["executive_summary", "findings", "recommendations"],
    "citationRequired": false
  },
  "theme": { "accentBudget": 2 }
}
```

## 7. 审计重点

- 报告是否有明确问题、证据、判断与建议
- Markdown frontmatter 是否足以驱动 LaTeX/PDF 输出
- 核心章节是否齐全
- 图表/表格是否服务论证，而非装饰
- F9 是否被误用为 Dashboard 或 slide deck

## 8. 最小可交付物标准

- [ ] Markdown frontmatter schema
- [ ] LaTeX/PDF target 声明
- [ ] Executive Summary / Findings / Recommendations 三个核心结构
- [ ] 图表、表格、引用、附录规则
- [ ] Render Contract `profile: F9`
- [ ] 可选 HTML preview，但 PDF/LaTeX 为主路径

## 9. 禁止事项

- [ ] 不做实时 Dashboard
- [ ] 不用高饱和彩色数据图
- [ ] 不把 F9 当普通 Landing Page
- [ ] 不用邮件、社交长图、表单向导等场景扩张 F9

---
