# 文心 · 万形 — 设计规范

> **文字即界面，留白即设计，克制即力量。**
> **Text is the interface. Whitespace is the design. Restraint is the power.**

一套以内容为中心的双语设计语言。**文心**是不变的魂，**万形**是随容器而变的形。

A bilingual, content-centric design language. *Wenxin* is the invariant soul; *Wanxing* is the
form it takes in each of nine containers.

---

## 从哪里开始 · Where to start

| 你想做什么 | 读这个 |
|---|---|
| 理解这套语言是什么 | [soul/philosophy.md](./soul/philosophy.md) |
| 知道哲学和惯例冲突时听谁的 | **[tracks.md](./tracks.md)** |
| 做一个具体的东西（网页/海报/报告…） | [forms/DECISIONS-MATRIX.md](./forms/DECISIONS-MATRIX.md) → 对应形态文件 |
| 直接开始写代码 | [`kit/`](../kit/) —— 引 `kit/index.css` 即可，不必从哲学重新推导 |
| 看组件长什么样 | [`examples/gallery/`](../examples/gallery/) |
| 看某个形态怎么落地 | [`examples/`](../examples/) —— 九形态各一份 |
| 知道什么绝对不能做 | [soul/forbidden.md](./soul/forbidden.md) |
| 检查产出是否合规 | `npm run check` |

---

## 结构 · Structure

```
spec/     说什么 —— 规范正文
kit/      给什么 —— 可直接复用的产物
examples/ 长什么样 —— 九形态示例
scripts/  怎么校验 —— 构建与审计
```

### 灵魂层 · Soul（不变）

| 文件 | 内容 |
|---|---|
| [philosophy.md](./soul/philosophy.md) | 核心命题、水的原则、**七维度模型 A–G**、不变之魂/可变之形、适用范围 |
| [aesthetics.md](./soul/aesthetics.md) | **34 条可审计的当代美学准则**（一致性/当代性/比例/文化/无障碍） |
| [color.md](./soul/color.md) | 亮色与暗色调色板、色彩约束 |
| [typography.md](./soul/typography.md) | 衬线优先、字族、字号阶梯、行高字距 |
| [spacing.md](./soul/spacing.md) | 4px 网格、内容宽度、断点 |
| [rhythm.md](./soul/rhythm.md) | 留白即标点、段落密度、视觉锚点、引用的两种形态 |
| [motion.md](./soul/motion.md) | **动效强度 E8/E9-0/E9-1/E9-2**、时长缓动、允许与禁止 |
| [components.md](./soul/components.md) | 命名与状态约定、组件清单、**不用卡片怎么分组** |
| [data-viz.md](./soul/data-viz.md) | **图表四规则**：墨色编码、accent 标记论点、直接标注、装饰做减法 |
| [brand.md](./soul/brand.md) | ■ 标识与朱砂印章 logo |
| [icons.md](./soul/icons.md) | 线条图标、1.5px 描边、图标库选择 |
| [accessibility.md](./soul/accessibility.md) | 无障碍基线 |
| [forbidden.md](./soul/forbidden.md) | 跨形态禁令，**构建会失败的检查项** |

### 形态层 · Form（随容器而变）

[**DECISIONS-MATRIX.md**](./forms/DECISIONS-MATRIX.md) 是入口 —— 一张表看完九个形态各自被迫做的不同决定。

F1 Web · F2 Mobile · F3 Brand · F4 Print · F5 Presentation ·
F6 Documentation · F7 Poster · F8 Diagram · F9 Report

外加三份跨形态规范：[page-archetypes.md](./forms/page-archetypes.md)（5 种内容原型）、
[render-contract.md](./forms/render-contract.md)（可机器校验的渲染契约）、
[cross-form-matrix.md](./forms/cross-form-matrix.md)。

**清单在 F9 处封闭。** 仪表盘、电商、游戏、CRM、邮件通讯是设计上的排除，不是遗漏。

### 跨层 · Cross-cutting

| 文件 | 内容 |
|---|---|
| [**tracks.md**](./tracks.md) | **双轨仲裁** —— 哲学与主流惯例冲突时的三层规则 |
| [DECISIONS.md](./DECISIONS.md) | 逐条判定日志 |
| [PROVENANCE.md](./PROVENANCE.md) | 取材来源，供日后考古 |

---

## 两条核心机制 · Two Mechanisms

**水的原则** —— 魂不变，形随器变。这是 `soul/` 与 `forms/` 分工的理论依据，
也是"万形"这个名字的由来：**一个魂，一万种形**。

**双轨仲裁** —— 设计哲学占主体（约 60%），但不为哲学而哲学。
无障碍与基本可用性无条件优先；阅读类形态哲学全量生效，应用类形态放宽视觉约束；
表单与反馈永远按惯例处理。**克制之美从不以牺牲可达性为代价。**

---

## 写作约定 · Authoring Conventions

- **中文在前，英文紧随** —— 逐段或逐句对照，不做左右分栏。标题格式 `中文 · English`。
- 每个 `soul/` 文件以 `> 属于 [spec](../README.md) 灵魂层 — Soul layer` 开头。
- **数值以 `kit/tokens/core.css` 为唯一真源** ——
  `.md` 里的数值是为方便阅读的摘录，冲突时以 core.css 为准，不要从 Markdown 手抄进代码。
- 坦白标注缺口与矛盾，而不是抹平它们。
