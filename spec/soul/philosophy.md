# 设计哲学 · Philosophy

> 属于 [spec](../README.md) 灵魂层 — Soul layer
> 这是整套体系的第一性原理。其余灵魂层文件都是它在某个具体维度上的展开。

## 核心命题 · Core Proposition

> **文字即界面，留白即设计，克制即力量。**
> **Text is the interface. Whitespace is the design. Restraint is the power.**

内容本身是最重要的视觉主体。所有设计决策服务于同一目标：让读者最自然、最安静地进入内容 ——
而不是被界面打断。

Content itself is the primary visual subject. Every decision serves one goal: let the reader enter
the content naturally and quietly, never interrupted by the interface.

---

## 水的原则 · The Water Principle

水的分子式不因容器而改变，但在杯中是杯的形，在河道里是河道的形。
读者感受到的不是"风格统一"，而是"说不出的舒服"。

Water's molecule never changes; in a cup it takes the cup's shape, in a river the river's.
What the reader feels is not "consistent styling" but an inexplicable comfort.

| 层 Layer | 内容 | 可变性 | 归属 |
|---|---|---|---|
| **灵魂 Soul** | 色彩、字体哲学、留白密度、点睛之色、动效节奏 | 永远不变 | `spec/soul/` |
| **形态 Form** | 布局结构、导航形式、内容组织 | 随容器而变 | `spec/media.md` 与 `spec/page-archetypes.md` |

这就是 `soul/` 与 `forms/` 分工的理论依据 —— 也是"万形"这个名字的由来：
**一个魂，一万种形。**

---

## 三项灵魂原则 · Three Soul Principles

**减法优先 · Subtraction First**
任何元素若无法让内容更清晰，就不应存在。没有装饰阴影，没有多余边框，没有视觉噪声。
Any element that fails to make content clearer should not exist.

**克制的惊喜 · Restrained Delight**
动效应当像书页翻动时纸张的阻力：你感到用心，但不会停下来欣赏它。读者感受到"顺"，而非"炫"。
Motion should feel like the resistance of a turning page — you sense the care, but never stop to admire it.

**点睛之色 · The Single Accent**
阅读轨的内容页把强调色视为整页的签名；它应当稀少，默认预算见
[双轨仲裁](../tracks.md)。就像水墨画上的朱砂印 —— 其余一切是黑白灰，
它是唯一有温度的存在。应用轨的任务状态与提交边界由同一仲裁规则单列，
不把这条审美原则误解为对所有交互的盲目禁令。**频率越低，力量越大。**
Like the cinnabar seal on an ink painting: the rarer it appears, the more power it holds.

---

## 七维度模型 · The Seven-Dimension Model

上面三条是散文。要让它可讨论、可审计、可演化，需要一个坐标系。

文心不是一种"风格"，而是**设计空间里的一个具体坐标**。七个维度各取一个值，
共同定义了这套语言的身份：

Wenxin is not a *style*; it is a specific point in a design space. Seven dimensions, seven values.

| 维度 | 值 | 含义 | 在 token 中的体现 |
|---|---|---|---|
| **A · 设计哲学** | **A9 克制之美** | 力量来自克制而非张扬 | 无阴影/渐变；阅读轨导航不用填充按钮；大区块间距从 `--space-24`(96px) 起步 |
| **B · 视觉性格** | **B9 温暖极简** | 极简但不冰冷 | 底色暖白 `#F2F0EB` 而非纯白；文字深炭 `#3A3837` 而非纯黑；边框 1px 暖灰 |
| **C · 排版节奏** | **C9 温暖衬线** | 衬线的笔画有起伏、有呼吸 | 正文 EB Garamond + Noto Serif SC；中文行高 1.85，英文 2.0 |
| **D · 色彩基调** | **D9 暖土调** | 色彩来自泥土、陶器、茶叶、宣纸 | 暖白底 + 砖红 `#8B3525` accent + 深炭文字；禁高饱和蓝绿紫橙 |
| **E · 动效理念** | **E9 温和流动** | 动效像自然界的运动 | `--duration-base: 260ms`；列表 stagger 60ms；尊重 reduced-motion |
| **F · 输出形态** | **F1–F9** | **主要可变维度** | 九种形态，见 `spec/media.md` |
| **G · 文化语境** | **G2 东亚** | CJK 排版规范 | 行高 ≥1.6；中文展示字距 `0.1em`；最小字号 12px；避免斜体强调 |

### 为什么这个模型重要

1. **它让"文心是什么"可以被精确回答** —— A9+B9+C9+D9+E9+G2，F 可变。
2. **它让偏离可以被指认** —— 一个提案不是"感觉不对"，而是"它把 D9 换成了高饱和色"。
3. **系统自己的代号出自这里** —— 渲染契约里的 `E8` / `E9-0` / `E9-1` / `E9-2` 是 E 维度的强度分级，
   不是随手编的字符串。见 [motion.md](./motion.md)。

---

## 不变之魂与可变之形 · Invariant Soul, Flexible Form

七个维度里，有三个动了就不再是文心：

Three dimensions are load-bearing. Change them and it is no longer Wenxin.

### 不变之魂 Invariant（A9 · B9 · D9）

- **A9 克制之美** —— 第一性原理，不可妥协。
- **B9 温暖极简** —— 核心识别。冷色极简是另一套语言，不是文心。
- **D9 暖土调** —— 定义了色彩边界：暖白底 + 砖红强调。

### 可变之形 Flexible（C · E · F · G）

- **F 输出形态** —— 形随容器变，这是万形的全部工作。
- **G 文化语境** —— 东亚 → 全球中性 → 本地化混合。
- **C 排版节奏** —— 针对平台微调（移动端更小的阶梯、更紧凑的行高）。
- **E 动效理念** —— 平台特定的强度（印刷完全静止，移动端需要触觉反馈）。

**演化的边界**：演化不是范式切换。所有维度值必须留在文心的美学边界内。
一个把 A9 换成"张扬"的提案不是"文心的演化"，是另一套东西。

Evolution is not paradigm-switching. A proposal that swaps A9 for exuberance is not an evolution of
Wenxin — it is a different language wearing its name.

---

## 适用范围 · Scope

**适用**：博客、文档站、作品集、简历、着陆页、幻灯片、印刷品、图解、报告 ——
一切**以内容为中心**的表面。

**不适用**：仪表盘、电商、游戏、CRM、邮件通讯。
这不是能力不足，是**设计上的排除** —— 这些场景的核心诉求（信息密度、转化率、即时反馈）
与"留白即设计"存在根本张力，硬套只会两边都不讨好。

Not a capability gap — a deliberate exclusion. These domains have a fundamental tension with
"whitespace is the design," and forcing the fit serves neither.

九种输出形态的清单在 F9 处封闭，见 [../forms/DECISIONS-MATRIX.md](../media.md)。

---

## 哲学的边界 · Where Philosophy Stops

这套哲学占设计决策的主体，但**不是唯一标准**。

无障碍、基本可用性、以及数据录入与反馈类组件的行为，遵循主流社区的约定俗成 ——
不因为哲学而打折。一个读屏器用不了的页面、一个看不出是错误的错误提示，
谈不上任何美学。

规则见 [../tracks.md](../tracks.md)。**克制之美从不以牺牲可达性为代价。**

Restraint never comes at the cost of access.
