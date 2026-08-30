# 组件通用原则 · Generic Component Principles

> 属于 [spec](../README.md) 灵魂层 — Soul layer
> 实现 Implementation：`kit/components/` · 分轨规则 Track rules：[../tracks.md](../tracks.md)

这里定义**跨形态通用的组件规则与清单**。任何形态里出现链接、按钮、表单、代码块，
都遵循这里的规定。形态特有的组件（文档站侧栏、幻灯片页码、海报构图）见[形态文件](../media.md)。

---

## 命名与状态约定 · Naming & State

```
.wx-note              块 Block
.wx-note__title       元素 Element —— 只允许一层 __
.wx-note--warn        修饰符 Modifier
```

- **`wx-` 前缀是强制的** —— 组件要能落进 Hugo 主题、幻灯片、第三方页面而不冲突。
- **只允许一层 `__`**。完整 BEM 会产出 `wx-article__header__title--large`，
  正是这套系统在别处禁止的"产品味"。需要第二层，说明你需要的是一个新块。
- **状态一律走 ARIA 或原生属性，不用状态类**：

```html
<a class="wx-toc__link" aria-current="page">      <!-- 不是 .is-active -->
<button class="wx-btn" disabled>                  <!-- 不是 .is-disabled -->
<details class="wx-collapse" open>                <!-- 不是 .is-open -->
```

这条规则不是洁癖，是从 [forbidden.md](./forbidden.md)「禁止仅用颜色区分状态」推导而来：
**把 CSS 状态绑定到无障碍树上，就在结构上不可能出现读屏器感知不到的状态。**
样式表与可访问性树无法漂移。

Binding CSS state to the accessibility tree makes it structurally impossible to style a state a
screen reader cannot perceive.

---

## 三条通用规则 · Three Universal Rules

**1 · 描边优先，填充例外**
默认 `transparent` 背景 + 1px 边框。填充只出现在两处：每视图至多一个主按钮、应用轨的分组表面。

**2 · 分隔靠线与留白，不靠盒子**
`wx-rule`（发丝线）与 `--space-*` 是这套系统的主要结构手段。
需要"把一组东西装起来"时，用 `wx-entry` 而不是卡片。

**3 · 焦点态全局统一**
```css
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```
仅键盘导航触发。**永不 `outline: none`**。

---

## 组件清单 · Component Inventory

标 **[应用轨]** 的变体只在应用轨可用；标 **[惯例]** 的组件无论所在轨道都按主流惯例处理
（[双轨仲裁](../tracks.md)第三层）。

### 布局 Layout

| 组件 | 类 | 说明 |
|---|---|---|
| 页面 | `wx-page` | 底色、`--padding-page-x` |
| 容器 | `wx-container--article/content/showcase` | 三档内容宽度 |
| 堆叠 | `wx-stack--tight/loose` | 垂直节奏，取代 ad-hoc margin |
| **分隔线** | **`wx-rule`** | **发丝线。系统最主要的结构手段** |
| 两端分布 | `wx-spread` | |
| 分栏 | `wx-cols--2/--3` | grid，无竖向分隔线 |

### 导航 Navigation

`wx-nav` · `wx-sidebar` · `wx-toc`（含滚动高亮）· `wx-crumbs` · `wx-pager` · `wx-skip`（跳至主内容）

面包屑格式：`/首页 /上级 /当前页`，分隔符前置，`--font-ui` · `--text-sm`。

### 数据录入 Data Entry **[惯例]**

`wx-input` · `wx-field`（label / hint / error 三槽）· `wx-select`（原生 `<select>`，不做自定义下拉）·
`wx-check` · `wx-radio` · `wx-btn`

**这一类无论在哪条轨道都按惯例处理。** 表单就是表单：
必填用文字标注而非仅颜色，错误同时给颜色与文字，label 在输入框上方。

```
wx-btn            默认 ghost 线框，hover 时 border + text → accent
wx-btn--primary   填充，仅用于真正的主操作，每视图 ≤1 个
wx-btn--text      纯文字 + 箭头，如「查看更多 →」
```

CTA 优先用 `--text` 变体，而不是按钮。

### 数据展示 Data Display

| 组件 | 类 | 要点 |
|---|---|---|
| 表格 | `wx-table` | **只有水平分隔线，无外框、无竖线**；表头下 1px `--color-border-strong` |
| 列表 | `wx-list--bare/ruled` | `--grouped` **[应用轨]** |
| **条目** | **`wx-entry`** | **卡片的替代品**，见下 |
| 描述列表 | `wx-desc` | `<dl>` |
| 标签 | `wx-tag` | 线框无底色，圆角 2px |
| 数字 | `wx-stat` | 大号衬线数字 + sans-ui 标签 |
| 图 | `wx-figure__caption` | |
| 引用 | `wx-quote` / `wx-pullquote` | 两者语义不同，见 [rhythm.md](./rhythm.md) |
| 代码 | `wx-code__title/copy` | |
| 按键 | `wx-kbd` | `<kbd>`，em 尺寸随所在文字缩放 |
| 计数 | `wx-badge` | 表格数字对齐；**数字本身即信息**，不靠颜色 |
| 状态 | `wx-status--live/warn/down/idle` | 圆点 **+ 文字标签**，标签是组件的一部分而非选项 |
| 头像 | `wx-avatar--sm/lg/round` | 方形发丝线框 + 显示体首字；`--round` 供照片使用 |
| 进度 | `wx-progress` / `wx-meter` | 原生元素；**无不确定态**，见下 |
| 步骤 | `wx-steps--row` | `aria-current="step"` + `[data-complete]` |
| 品牌标识 | `wx-seal` | ■，见 [brand.md](./brand.md) |

### 反馈 Feedback **[惯例]**

`wx-note--note/tip/warn/danger/info`（admonition，`--stroke-mark` 左边线 + 极淡底色）·
`wx-alert` · `wx-empty`（纯文字 + ghost CTA，**无插图**）·
`wx-toast`（`aria-live="polite"`，语义级别由左边线**与文字标签**共同承担）

### 浮层 Overlay **[惯例]**

`wx-modal`（原生 `<dialog>`）· `wx-drawer` · `wx-tooltip`

浮层是全系统唯一真正需要"面"的地方，这个例外是有理由的而不是图方便 ——
见 [DECISIONS.md](../DECISIONS.md) **D-21**。三者都走原生 `<dialog>` 或 `aria-describedby`，
焦点陷阱、Esc、`inert` 背景与朗读都交给平台，而不是自己实现。

**仍然不借用的**：阴影、渐变、超过 `--radius-md` 的圆角。分层靠发丝线边缘 + 暖色遮罩
`--color-scrim`，与系统其余部分同一套语汇。

`wx-tooltip` 有一条硬规则：**永远不得作为信息的唯一载体**。它在触屏上不可达、
打印时不存在、极易被错过。读者必须知道的东西写进正文。

### 控件 Controls **[应用轨]**

`wx-segmented` · `wx-toolbar`

分段控件的选中态用**反相墨色 + 字重 + `aria-checked`**，不是填充药丸 ——
灰度打印和读屏器下都成立。`wx-toolbar` 用 `role="toolbar"`，方向键导航由平台提供。

### 内容编辑 Content

`wx-eyebrow`（全大写 sans-ui + `--tracking-wider`）· `wx-lede` · `wx-attr`（归因区）·
`wx-fn`（脚注）· `wx-cite`

这一类是 Ant Design 之类的产品组件库没有的，但编辑型系统必须有。

### 第二批 v2 —— 已全部落地 Complete

`wx-tabs` · `wx-steps` · `wx-timeline` · `wx-collapse`（原生 `<details>`，零 JS）· `wx-tooltip` ·
`wx-avatar` · `wx-toast` · `wx-modal`（原生 `<dialog>`）· `wx-drawer` · `wx-progress` ·
`wx-switch` · `wx-search` · `wx-dropcap` · `wx-marginal`

先由田野审计推动落地六个真实站点直接需要的组件（`wx-tabs`、`wx-timeline`、`wx-collapse`、
`wx-switch`、`wx-search`、`wx-marginal`），其余随本批补齐，并新增
`wx-kbd`、`wx-badge`、`wx-status`、`wx-meter`、`wx-segmented`、`wx-toolbar`。

v2 is complete. Six components were promoted by field evidence; the remainder shipped with this
batch, together with six additions the inventory had not previously named.

**进度条没有不确定态。** 系统禁止 spinner，而不确定进度条正是一个永不停止的循环动画。
`<progress>` 无 `value` 时渲染为一根静止的线，由旁边的文字说明正在发生什么 ——
一个句子能传达的东西，不需要一个永远转下去的形状。

`wx-timeline` 是 `wx-entry` 的连续流变体：单线 + 圆点 + 留白，不包围内容；起止处不用渐变。
`wx-tabs` 只认 `role="tab"` + `aria-selected`，`wx-switch` 只认 `role="switch"` +
`aria-checked`，`wx-collapse` 只认原生 `open`。这三者都不得另造 `.active` / `.open` 状态类。

### 明确不做 —— 两种排除，不可混为一谈

见 [DECISIONS.md](../DECISIONS.md) **D-23**。

**哲学性排除**（不随范围扩大而放开，它们就是这套系统的身份）：

| 组件 | 冲突于 |
|---|---|
| 卡片 card | A9 —— 四边包围的方框不携带信息。用 `wx-entry` |
| 加载动画 spin | 动效禁令 —— 旋转是被禁的循环动画。用文字说明 |
| 骨架屏 skeleton | 静态占位就是一根线；shimmer 是被禁的循环 |
| 自动轮播 carousel | 移动读者正在读的内容。用 `wx-gallery`（手动滚动） |
| 水印 watermark | 纯装饰性叠加 |

**工程性排除**（范围判断，不是价值判断）：颜色选择器 · 级联选择 · 提及输入 ——
需要大量 JS 且有可用的原生替代品。**有需要时可以做，不需要任何哲学让步。**

滑块、上传、日期、树、气泡卡片曾属于这一类，范围扩展到完整组件库后已全部实现。

---

## 没有卡片，那怎么分组 · Grouping Without Cards

这是最常被追问的一点，正面回答。

`wx-entry` 是唯一的分组原语：

```html
<article class="wx-entry">
  <p class="wx-eyebrow">2026 · 设计</p>
  <h3 class="wx-entry__title">标题</h3>
  <p class="wx-entry__desc">描述</p>
  <p class="wx-entry__meta">元数据</p>
</article>
```

- **无边框、无阴影、无填充底色**
- 条目之间靠 `--space-8` / `--space-12` 分隔
- 需要更强的分隔时，加**单边** `border-top`（`wx-entry--ruled`）

为什么这样够用：卡片解决的是"哪些内容属于一组"，
而**留白本身就是最强的分组信号** —— 格式塔的邻近原则比一个方框有效得多，
且不需要引入任何视觉噪声。方框是把分组问题**外包给边界**，留白是**直接解决它**。

Whitespace *is* the grouping signal. A box outsources the problem to a border; spacing solves it.

> 取材数据显示 `card` 在 9 个形态示例中出现于 4 个 —— **分组的需求是真实且跨形态的**，
> 被否定的只是它的几何形态。`wx-entry` 必须真的好用到能顶替它，
> 否则同样的需求会以别的名字再长出来。

---

## 反面参照 · Anti-pattern

不要重新发明卡片。以下都是同一个东西换名字：
`.panel` `.box` `.tile` `.surface` `.container--bordered`。

判据只有一条：**它是不是四边包围的方框？** 是，就不行。
