# 文心 (Wenxin) · 核心设计规范

> Version: 2.0.0 | Date: 2026-05-20

---

## 目录

- [1. 哲学原则 (Philosophy)](#1-哲学原则-philosophy)
- [2. 色彩系统 (Color System)](#2-色彩系统-color-system)
- [3. 字体系统 (Typography)](#3-字体系统-typography)
- [4. 间距与栅格 (Spacing & Grid)](#4-间距与栅格-spacing--grid)
- [5. 动效系统 (Motion)](#5-动效系统-motion)
- [6. 排版节奏与阅读密度 (Typography Rhythm)](#6-排版节奏与阅读密度-typography-rhythm)
- [7. 响应式规范 (Responsive)](#7-响应式规范-responsive)
- [8. 无障碍访问 (Accessibility)](#8-无障碍访问-accessibility)
- [9. 禁止清单 (Forbidden List)](#9-禁止清单-forbidden-list)
- [10. 版本记录 (Version History)](#10-版本记录-version-history)

---

## 1. 哲学原则 (Philosophy)

### 核心命题

**文字即界面，留白即设计，克制即力量。**

内容本身是最重要的视觉主体。所有 UI 决策服务于同一目标：让用户最自然、最安静地进入内容——而不是被界面打断。

### 水的原则·两层结构

这套设计语言由两个层次构成：

**第一层·灵魂（Soul）— 永远不变**
色彩系统、字体哲学、留白密度、点睛之色、动效节奏。
任何场景、任何产品类型，灵魂层不妥协。

**第二层·形态（Form）— 随境而化**
布局结构、导航形式、内容组织方式。
跟随该类型产品的行业 UX 最佳惯例，不强行套用统一形状。

水的本质（H₂O）不因容器而改变，但在杯子里是杯子的形，在河道里是河道的形。用户感受到的不是「风格统一」，而是「说不出的舒服」。这就是润物细无声。

### 三项灵魂原则

**减法优先** — 任何元素若无法让内容更清晰，就不应存在。没有装饰阴影，没有多余边框，没有视觉噪声。

**克制的惊喜** — 动效的存在如同书页翻动时纸张的阻力：你感到用心，但不会停下来欣赏它。用户感受到「顺」，而非「炫」。

**点睛之色** — 全页只允许一个强调色，它是整个设计的灵魂签名。就像水墨画里的朱砂印章——其他一切是黑白灰，它是唯一有温度的存在。频率越低，力量越大。

### 适用范围

**适用**（以内容/信息为核心）：博客、个人网站、知识库、文档站、作品集、简历、Landing Page、轻量工具。

**不适用**：数据密集型 Dashboard、电商、游戏、娱乐类产品。

---

## 2. 色彩系统 (Color System)

### 亮色模式

```css
:root {
  /* 背景层 */
  --color-bg-warm:    #F2F0EB;  /* 暖白·羊皮纸质感·首页/展示型 */
  --color-bg-base:    #FAFAF8;  /* 内页背景·内容列表/详情页 */
  --color-bg-pure:    #FFFFFF;  /* 纯白·文章正文区 */
  --color-bg-subtle:  #F0EDE7;  /* 微弱底色·代码块/引用块/标签 */

  /* 文字层 */
  --color-text-primary:   #3A3837;  /* 主体·深炭色·带暖调·非纯黑 */
  --color-text-secondary: #888580;  /* 辅助·日期/元数据/次级说明 */
  --color-text-muted:     #B0ABA4;  /* 弱化·版权/占位/装饰文字 */
  --color-text-heading:   #2C2B29;  /* 标题·比正文略深 */

  /* 点睛之色·全页 ≤ 2 处（图标激活态除外）*/
  --color-accent:        #8B3525;
  --color-accent-hover:  #A84030;
  --color-accent-subtle: #F5E8E5;  /* accent 的极淡背景版 */

  /* 边界 */
  --color-border-subtle: #E5E1DA;  /* 极细·谨慎使用 */
  --color-border-strong: #C8C3BA;  /* 较明显·极少使用 */

  /* 交互 */
  --color-link:       #3A3837;
  --color-link-hover: #8B3525;
  --color-focus:      rgba(139, 53, 37, 0.4);  /* accent 40% 透明度，兼容性写法 */
}
```

### 暗色模式·夜晚的羊皮纸

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-warm:    #1A1816;
    --color-bg-base:    #201E1B;
    --color-bg-pure:    #242220;
    --color-bg-subtle:  #2A2724;

    --color-text-primary:   #E8E3DC;  /* 暖象牙白·非纯白 */
    --color-text-secondary: #8A857D;
    --color-text-muted:     #5A5550;
    --color-text-heading:   #F0EBE3;

    --color-accent:        #C4533E;  /* 暗色下略亮·保持可见性 */
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

### 色彩约束

- Accent 全页出现 **≤ 2 处**；图标激活/选中态使用 Accent 不计入此限制
- 禁止：高饱和蓝、绿、紫、橙；任何渐变色背景
- 正文文字对比度 ≥ 7:1（WCAG AAA），辅助文字 ≥ 4.5:1（WCAG AA）

---

## 3. 字体系统 (Typography)

### 字体哲学·衬线优先

衬线字体的笔画有起伏、有呼吸，与本语言的气质吻合。无衬线字体仅用于 UI 标签、元数据——它们是功能性的，非表达性的。

### 字族定义（语言无关）

```css
:root {
  /* 展示型衬线·大标题/品牌名 */
  --font-display: "Lora", "Georgia", "Noto Serif SC", "Source Han Serif SC", serif;

  /* 正文衬线·长文阅读 */
  --font-body: "EB Garamond", "Crimson Text", "Noto Serif SC", "Source Han Serif SC", serif;

  /* 功能性无衬线·UI 标签/元数据/辅助 */
  --font-ui: "SF Pro Text", system-ui, "Noto Sans SC", "PingFang SC", sans-serif;

  /* 等宽·代码 */
  --font-mono: "JetBrains Mono", "Fira Code", "SF Mono", monospace;
}
```

字体栈中，拉丁衬线在前，中文衬线在后。英文内容优先 Lora/Garamond，中文回退到 Noto Serif SC，两者气质相近，视觉统一。

建议全局开启字体平滑渲染，衬线字体在屏幕上显示更清晰：

```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 字体加载策略

- `font-display: swap` 为底线要求
- 关键字体使用 `<link rel="preload" as="font">` 预加载
- CJK 字体使用 `unicode-range` 子集化减小文件体积
- `size-adjust / ascent-override` 减少 CLS
- 可变字体优先（1 个可变字体文件 vs 4-6 个固定字重）

### 字号阶梯

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

### 行高与字距

```css
:root {
  --leading-tight:   1.25;   /* 大号展示标题 */
  --leading-snug:    1.45;   /* 小标题、UI 元素 */
  --leading-normal:  1.6;    /* 列表项、辅助文字 */
  --leading-relaxed: 1.85;   /* 中文正文阅读 */
  --leading-loose:   2.0;    /* 英文长文阅读 */

  --tracking-tight:   -0.02em;  /* 大号展示标题微收紧 */
  --tracking-normal:   0;
  --tracking-wide:     0.05em;
  --tracking-wider:    0.15em;  /* 英文全大写标注 */
  --tracking-chinese:  0.1em;   /* 中文展示大字舒展 */
}
```

### 字体使用规则

| 场景 | 字族 | 字重 | 字号 | 备注 |
|------|------|------|------|------|
| 品牌名/英雄标题 | `--font-display` | 700 | `--text-4xl`/`5xl` | `--tracking-chinese` 或 `--tracking-tight` |
| h1 页面标题 | `--font-display` | 700 | `--text-3xl` | `--leading-tight` |
| h2 章节标题 | `--font-body` | 700 | `--text-2xl` | 上 `--space-16`，下 `--space-6` |
| h3 小节标题 | `--font-body` | 700 | `--text-xl` | 上 `--space-12`，下 `--space-4` |
| h4 细分标题 | `--font-body` | 600 | `--text-lg` | `--color-text-secondary` |
| h5 / h6 | `--font-ui` | 600 | `--text-base` | 全大写 + `--tracking-wider` |
| 正文 | `--font-body` | 400 | `--text-md` | `--leading-relaxed`，段落间距 `--space-5` |
| UI 标签/辅助导航 | `--font-ui` | 400 | `--text-sm` | 全大写 + `--tracking-wider` |
| 日期/元数据 | `--font-ui` | 400 | `--text-sm` | `--color-text-secondary` |
| 代码 | `--font-mono` | 400 | `--text-sm` | |

---

## 4. 间距与栅格 (Spacing & Grid)

### 基础间距

基于 4px 网格：

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

### 内容宽度

```css
:root {
  /* 纯阅读型·长文章/文档正文 */
  --width-article:  clamp(520px, 55vw, 640px);

  /* 内容列表型·博客列表/搜索结果/目录 */
  --width-content:  clamp(620px, 65vw, 760px);

  /* 展示型·简历/作品集/About/Landing */
  --width-showcase: clamp(700px, 72vw, 920px);

  /* 页面水平内边距·响应式 */
  --padding-page-x: clamp(20px, 5vw, 72px);
}
```

### 图标尺寸

```css
:root {
  --icon-sm: 16px;  /* 行内文字配图 */
  --icon-md: 20px;  /* 标准 UI 元素（导航、按钮旁）*/
  --icon-lg: 24px;  /* 独立功能图标（工具栏、侧边栏）*/
}
```

### 间距语义参考

| 变量 | 典型用途 |
|------|----------|
| `--space-1` | 极细间隙 |
| `--space-2` | 图标与文字间距、行内元素间隙 |
| `--space-3` | 表格单元格、小标签内边距 |
| `--space-4` | 引用块/代码块内边距、按钮内边距 |
| `--space-5` | **正文段落间距（p 的 margin-bottom）** |
| `--space-6` | 列表项间距、面包屑 |
| `--space-8` | 标题与下方正文 |
| `--space-12` | h3 与上方内容 |
| `--space-16` | h2 与上方内容、小区块间距 |
| `--space-24` | **大区块间距（section gap）** |
| `--space-32` | 页面顶部 padding |

**留白密度原则：** 当你觉得「这个间距是不是太大了」，往往才是刚好。大区块之间不低于 `--space-24`（96px）。

---

## 5. 动效系统 (Motion)

文心动效的完整规范以 `.opencode/rules/motion-spec.md` 为准。本节只保留核心摘要，避免与审计规则产生两套标准。

### 核心原则

**春雨润物，细节有声。** 动效不表演，不炫技，不抢夺阅读。它只在 hover、状态变化、页面/组件进场、主题切换、loading、品牌标识符呼吸等细节处让界面更顺、更暖。

### 时间与缓动

| Token | 值 | 用途 |
|-------|----|------|
| `--duration-instant` | `80ms` | checkbox、toggle、pressed 状态 |
| `--duration-fast` | `180ms` | hover、颜色、透明度 |
| `--duration-base` | `260ms` | 展开、折叠、局部状态变化 |
| `--duration-slow` | `420ms` | 页面/组件进场、重要状态变化 |
| `--duration-crawl` | `600ms` | 极少数仪式感动效上限 |

允许的 easing：`--ease-default`、`--ease-out`、`--ease-in`、品牌标识符呼吸使用 `ease-in-out`。

### 允许范围

| 场景 | 动效 | 参数 |
|------|------|------|
| 链接/按钮 Hover | `color` 过渡 | `--duration-fast`, `--ease-default` |
| 图标 Hover | `opacity` 0.6↔1 | `--duration-fast` |
| 页面/组件进场 | `opacity 0→1` + `translateY(6px→0)` | `--duration-slow`, 位移 ≤ 8px |
| 列表项进场 | stagger fade-up | 每项间隔 ≤ 60ms，总时长 ≤ 600ms |
| 品牌标记呼吸 | `opacity 1↔0.6` | 周期 4s，`ease-in-out`，循环 |
| 深/亮色模式切换 | 全局 `color`/`background` | `--duration-base` |

### 禁止的动效

- 旋转、弹跳、强回弹、视差滚动
- 位移超过 16px
- duration 超过 600ms（品牌标识符 4s 呼吸除外）
- 循环动效（品牌标记呼吸和 loading 状态除外）
- 任何主动抢夺用户注意力、只为展示技巧的动效

### 尊重用户动效偏好

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 动画完成信号 (Animation Completion Signal)

所有包含动效的 HTML 输出必须在 `<html>` 元素上提供动画完成信号，供自动化工具（如 Audit Agent）判断截图与运行时采样时机：

- **初始状态**：`<html data-animations-complete="false">`
- **完成状态**：所有进场动效（fade-in、stagger、translateY 等）完成后设置为 `"true"`
- **实现方式**：通过 `document.getAnimations()` API 监听所有 CSS/JS 动画的 `finished` Promise
- **安全超时**：3 秒后强制设置为 `"true"`，防止无限等待
- **无动画页面**：`DOMContentLoaded` 后直接设置为 `"true"`
- **`prefers-reduced-motion`**：动画被跳过时，信号仍需正常设置

此信号确保 Audit Agent 截图与运行时采样时页面已完全渲染，避免截取到动画中间状态。具体实现脚本参见 `AGENT.md` 输出规则部分。

---

## 6. 排版节奏与阅读密度 (Typography Rhythm)

*这一节定义「文字如何呼吸」——不是元素长什么样，而是元素之间怎么组织，让读者不感到压迫。*

### 核心意识：留白即标点

空行不是浪费，而是句读。段落之间的留白是给读者换气的节拍。文字密度的控制和音乐里的节奏一样重要——没有停顿的音符，不是音乐，是噪声。

### 段落密度控制

- 每段正文控制在 **5～7 行**以内（以桌面端内容宽度为基准）
- 连续出现超过 3 个长段落，主动插入视觉锚点（见下）
- 单句成段是允许的——短句有时比长段更有力量
- 段落间距统一使用 `--space-5`（20px）

### 视觉锚点·读者的呼吸站

长文中每隔一定密度，应出现一个视觉重量不同的元素，让眼睛有地方停顿：

| 锚点类型 | 视觉重量 | 建议频率 |
|----------|----------|----------|
| h2 / h3 小标题 | 中 | 每 400～600 字一次 |
| Pull Quote 编辑型引语 | 高 | 每篇长文 1～2 次 |
| Blockquote 引用块 | 中 | 按内容需要 |
| 代码块 | 中 | 按内容需要 |
| 单句强调段 | 低～中 | 灵活 |
| 图片 | 高 | 按内容需要，不强求 |

### 字号层级的悬殊感

在一个区块内，不同层级的字号比例应该足够悬殊，不要让所有文字挤在相近的字号范围里。

以编辑型引语为例：
```
分类标签：--text-sm（13px）  ← 极小
引语正文：--text-3xl（36px） ← 极大
归因来源：--text-base（16px）← 居中
```

三个层级的跨度创造了呼吸感，比任何装饰都有效。

### Blockquote 与 Pull Quote 的区别

两者都是引用类组件，但用途不同，不可互换：

**Blockquote·段落引用**
嵌套在正文流中，用于引用他人言论或资料内容。

```css
blockquote {
  border-left: 2px solid var(--color-accent);
  background: var(--color-bg-subtle);
  padding: var(--space-4) var(--space-6);
  margin: var(--space-8) 0;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-style: italic;
  font-size: var(--text-md);
}
```

**Pull Quote·编辑型引语**
独立于正文流，用于提炼全文核心观点，具有强烈编辑感。字号远大于正文，是页面视觉节奏的「高重量锚点」。

```
结构：
  [分类标签]  ·  [子标签]        ← --font-ui, --text-sm, --tracking-wider, 全大写

  "（装饰引号，--color-text-muted，纯装饰，无语义）

  [引语正文]                      ← --font-display, --text-3xl, 斜体

  ──────────                      ← 短横线 40px，--color-border-strong，1px
  [来源名称]                      ← --font-body, bold, --color-text-heading
  [来源说明]                      ← --font-ui, --text-sm, --color-text-secondary

  ───────────────────────────     ← 底部分隔线，--color-border-subtle
  [注释/免责说明]                 ← --font-ui, --text-xs, --color-text-muted

背景：--color-bg-warm 或 --color-bg-base
无边框、无阴影，用留白界定区域
```

### 归因区·通用排版模式

凡需要标注来源、作者、出处的场景，统一使用：

```
──────────     ← 短横线，宽 40px，--color-border-strong，1px
来源名称       ← --font-body 或 --font-ui，bold，--color-text-heading
来源说明       ← --font-ui，--text-sm，--color-text-secondary
```

适用于：文章署名、引语归因、脚注来源、数据出处。

---

## 7. 响应式规范 (Responsive)

### 断点

```css
/* Mobile:  < 640px        */
/* Tablet:  640px ~ 1024px */
/* Desktop: > 1024px       */
```

### 字号响应式

```css
@media (max-width: 1024px) {
  :root {
    --text-5xl: 3.5rem;    /* 72 → 56px */
    --text-4xl: 2.5rem;    /* 48 → 40px */
  }
}

@media (max-width: 640px) {
  :root {
    --text-5xl: 2.5rem;    /* 72 → 40px */
    --text-4xl: 2rem;      /* 48 → 32px */
    --text-3xl: 1.625rem;  /* 36 → 26px */
    --text-2xl: 1.5rem;    /* 30 → 24px */
  }
}
```

### 间距响应式

```css
@media (max-width: 640px) {
  :root {
    --padding-page-x: 20px;
    /* 大区块间距：96px → 56px（在使用处手动覆盖）*/
    /* 段落间距 --space-5 保持不变 */
  }
}
```

### 内容宽度

`clamp()` 已内置响应式逻辑，移动端无需额外覆盖，自动收窄至视口宽度减去左右内边距。

### 移动端行为原则

| 属性 | 处理方式 |
|------|----------|
| 展示型大标题字号 | 激进缩小，气质不变 |
| 正文字号 | ≥ 16px，不低于桌面端 |
| 行高 | 保持不变，是阅读舒适度的核心 |
| 动效 | 全量保留（`prefers-reduced-motion` 另行处理）|
| 双列布局（简历等）| 折叠为单列，日期移至标题上方 |
| 所有可交互元素触控目标 | 最小 24×24px（Web）/ 44×44pt（iOS）/ 48×48dp（Android）|

---

## 8. 无障碍访问 (Accessibility)

文心设计语言将可访问性视为基本要求，而非附加项。

### 色彩对比度

- 正文（primary）对背景：≥ 7:1（WCAG AAA）
- 辅助文字（secondary）对背景：≥ 4.5:1（WCAG AA）
- 禁止：仅用颜色区分状态，必须同时有形状/图案/文字辅助

### 键盘导航

- 所有可交互元素可用 Tab 键访问
- 焦点顺序符合视觉阅读顺序（从上到下，从左到右）
- 使用 `:focus-visible`，禁止 `outline: none`

### 语义化标记

- 页面有且仅有一个 `<h1>`
- 标题层级不跳跃（h1 → h2 → h3，不跳过）
- 图标单独使用时必须有 `aria-label` 或 `title`
- 图片必须有 `alt` 属性（装饰性图片用 `alt=""`）
- 链接文字必须有意义，避免「点击这里」独立使用

### 屏幕阅读器

- 使用语义化 HTML（`<nav>`, `<main>`, `<article>`, `<aside>` 等）
- 纯装饰性内容使用 `aria-hidden="true"`
- 图标按钮必须有可读标签

### 动效偏好

见第五节 `prefers-reduced-motion` 实现。

---

## 9. 禁止清单 (Forbidden List)

| 禁止 | 原因 |
|------|------|
| 卡片 + 阴影 | 制造不必要的视觉层级 |
| 渐变色背景 | 破坏气质 |
| 高饱和色（蓝/绿/紫/橙） | 只允许一个 Accent |
| 填充色圆角按钮 | 引入过多产品感 |
| 纯装饰性图片 | 仅内容型图片 |
| 粗边框（> 1px） | 视觉噪声 |
| 色块背景分区 | 用留白分区 |
| 填充型图标 | 仅线条型 |
| 两个图标库同页混用 | 描边风格不一致 |
| 循环/闪烁动效 | 分散注意力（品牌标记和 loading 除外）|
| Accent 出现超过 2 次 | 稀少才有力量（图标激活态除外）|
| 大段正文居中对齐 | 伤害可读性 |
| 连续超过 3 个长段落不插锚点 | 读者会感到压迫 |
| 同区块字号层级过于接近 | 失去呼吸感 |
| `outline: none` | 破坏键盘可访问性 |
| 仅颜色区分交互状态 | 色盲用户无法感知 |
| 链接文字为「点击这里」 | 无语义，屏幕阅读器无法理解 |

---

## 10. 版本记录 (Version History)

| 版本 | 日期 | 主要变更 |
|------|------|----------|
| 1.0 | 2026-04 | 初版：哲学/色彩/字体/间距/动效/品牌标记/页面原型/通用组件/响应式/禁止清单 |
| 1.1 | 2026-04 | 新增排版节奏章节；新增图标系统章节 |
| 2.0 | 2026-04 | 系统审计重写：修复 focus 颜色兼容性写法；补充 --space-5/--space-10 缺失项；内容宽度统一为 CSS 变量；完善 h4～h6 定义；图标 CSS 变量集中定义；拆分 blockquote/pull quote 并明确区别；补充响应式平板断点；新增无障碍访问章节；新增 prefers-reduced-motion；新增输入框/标签/焦点态组件；新增 font-smoothing；新增间距语义参考表；新增版本记录章节 |
