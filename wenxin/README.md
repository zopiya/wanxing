# 文心 · Wenxin Design Spec

> 设计规范 · 只讲方向，不给形态
> Design specification — direction only, no concrete form.

---

## 这是什么 · What this is

**wenxin/** 是这套设计语言的「魂」——色彩、字体、留白、动效、品牌标识、组件通用原则。它回答的问题是：**这套体系的审美取舍是什么**，而不是「某个具体页面/文档/海报应该长什么样」。后者是 [`wanxing/`](../wanxing/README.md) 的职责。

**wenxin/** is the "soul" of this design language — color, type, whitespace, motion, brand identity, and generic component principles. It answers *what this system's aesthetic commitments are*, not *what a specific webpage, document, or poster should look like*. The latter is what [`wanxing/`](../wanxing/README.md) is for.

本文档整理自 `archive/gemini-gem/wenxin-spec.md`（v2.0，最权威的规范文本），并以 `archive/wenxin`（Hugo 主题，真实代码落地）的 `assets/css/variables.css` 校验过所有 token 数值——绝大多数完全一致，仅发现两处代码比规范文字多出的 token（`--color-text-tertiary`、`--stagger-1`～`--stagger-8`），已按"以代码为准"补进 [`color.md`](./color.md) 和 [`motion.md`](./motion.md)，[`tokens.css`](./tokens.css) 里两者都在。

Distilled from `archive/gemini-gem/wenxin-spec.md` (v2.0, the most authoritative spec text), cross-checked against the real code implementation in `archive/wenxin/assets/css/variables.css`. Values matched almost exactly — two tokens exist in the code but not in the spec prose (`--color-text-tertiary`, `--stagger-1`–`--stagger-8`); both were added to `color.md`/`motion.md` per "code wins," and both are present in `tokens.css`.

---

## 核心命题 · Core Proposition

**文字即界面，留白即设计，克制即力量。**
*Text is the interface. Whitespace is the design. Restraint is the power.*

内容本身是最重要的视觉主体。所有 UI 决策服务于同一目标：让用户最自然、最安静地进入内容——而不是被界面打断。

Content itself is the primary visual subject. Every UI decision serves one goal: let the reader enter the content naturally and quietly — never interrupted by the interface.

---

## 水的原则 · The Water Principle

这套设计语言由两个层次构成，这也是 `wenxin/` 与 `wanxing/` 分工的理论依据：

This design language has two layers — and this is the theoretical basis for the wenxin/wanxing split:

| 层 Layer | 内容 Contents | 可变性 Mutable? |
|---|---|---|
| **第一层 · 灵魂 Soul** | 色彩系统、字体哲学、留白密度、点睛之色、动效节奏<br>Color system, typographic philosophy, whitespace density, the accent color, motion rhythm | **永远不变，属于 `wenxin/`**<br>**Never — lives in `wenxin/`** |
| **第二层 · 形态 Form** | 布局结构、导航形式、内容组织方式<br>Layout structure, navigation pattern, content organization | **随场景而变，属于 `wanxing/`**<br>**Per scenario — lives in `wanxing/`** |

水的本质（H₂O）不因容器而改变，但在杯子里是杯子的形，在河道里是河道的形。用户感受到的不是「风格统一」，而是「说不出的舒服」。这就是润物细无声。

Water's molecule never changes — but in a cup it takes the cup's shape, in a river it takes the river's shape. What the user feels is not "consistent style" but an inexplicable comfort. That is how it nourishes without a sound.

---

## 三项灵魂原则 · Three Soul Principles

**减法优先 · Subtraction First**
任何元素若无法让内容更清晰，就不应存在。没有装饰阴影，没有多余边框，没有视觉噪声。
Any element that fails to make content clearer should not exist. No decorative shadows, no superfluous borders, no visual noise.

**克制的惊喜 · Restrained Delight**
动效的存在如同书页翻动时纸张的阻力：你感到用心，但不会停下来欣赏它。用户感受到「顺」，而非「炫」。
Motion should feel like the resistance of a turning page: you sense the care, but never stop to admire it. The user feels "smooth," not "flashy."

**点睛之色 · The Single Accent**
全页只允许一个强调色，它是整个设计的灵魂签名。就像水墨画里的朱砂印章——其他一切是黑白灰，它是唯一有温度的存在。频率越低，力量越大。
Only one accent color is allowed per page — the signature of the whole design. Like the cinnabar seal on an ink painting: everything else is black, white, gray; it is the only warmth. The rarer it appears, the more power it holds.

---

## 适用范围 · Scope

**适用**（以内容/信息为核心）：博客、个人网站、知识库、文档站、作品集、简历、Landing Page、轻量工具、演示文稿、印刷出版物、图解、判断型报告。

**Applicable** (content/information-centric): blogs, personal sites, knowledge bases, documentation sites, portfolios, résumés, landing pages, light tools, presentations, print publications, diagrams, judgment-oriented reports.

**不适用**：数据密集型 Dashboard、电商、游戏、娱乐类产品、Newsletter、CRM。这条边界由 `wanxing/` 的 F1–F9 封闭清单具体执行。

**Not applicable**: data-dense dashboards, e-commerce, games, entertainment products, newsletters, CRM. This boundary is enforced concretely by wanxing's closed F1–F9 list.

---

## 目录 · Contents

| 文件 File | 内容 Content |
|---|---|
| [`tokens.css`](./tokens.css) | **权威 token 源文件**——机器可读，直接 import，不要从其他 `.md` 里手抄数值。**The authoritative token file** — machine-readable, import it directly; never hand-copy values from the other `.md` files. |
| [`color.md`](./color.md) | 色彩系统（亮/暗色 token、约束）Color system (light/dark tokens, constraints) |
| [`typography.md`](./typography.md) | 字体系统（字族、字号、行高字距）Typography (families, scale, leading/tracking) |
| [`spacing.md`](./spacing.md) | 间距与栅格（4px 网格、内容宽度 token）Spacing & grid (4px grid, content-width tokens) |
| [`motion.md`](./motion.md) | 动效系统（时长、缓动、允许/禁止的动效）Motion (durations, easing, allowed/forbidden) |
| [`brand.md`](./brand.md) | 品牌标识（■ 标记 + 朱砂印章 Logo）Brand identity (■ mark + cinnabar seal logo) |
| [`components.md`](./components.md) | 组件通用原则（链接/按钮/表单/代码/图片/表格）Generic component principles |
| [`icons.md`](./icons.md) | 图标系统（使用原则、视觉规格、推荐库）Icon system (usage, visual spec, libraries) |
| [`rhythm.md`](./rhythm.md) | 排版节奏（留白即标点、视觉锚点、引语规范）Typographic rhythm (whitespace as punctuation) |
| [`accessibility.md`](./accessibility.md) | 无障碍基线 Accessibility baseline |
| [`forbidden.md`](./forbidden.md) | 禁用清单 Forbidden list |

> **注意 Note：** 原规范文档第 10 节「页面原型」（阅读型/列表型/展示型/着陆型/工具型五种页面布局）描述的是具体形态，已整体移至 [`wanxing/page-archetypes.md`](../wanxing/page-archetypes.md)。这里不再重复。
>
> The original spec's §10 "Page Archetypes" (five layout patterns: reading, list, showcase, landing, tool) describes concrete form, and has been moved wholesale to [`wanxing/page-archetypes.md`](../wanxing/page-archetypes.md). It is not duplicated here.

---

## 版本记录 · Version History

整理自 `archive/gemini-gem/wenxin-spec.md` v2.0.0（2026-04-23）。历次版本变更详见原文件第 14 节；本次整理是内容重组（按主题拆分 + 剥离形态层内容至 wanxing/），不是新的规范版本。

Distilled from `archive/gemini-gem/wenxin-spec.md` v2.0.0 (2026-04-23). See the original file's §14 for version history. This reorganization splits content by topic and moves form-layer content to wanxing/ — it is a restructuring, not a new spec version.
