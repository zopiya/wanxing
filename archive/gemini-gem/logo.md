# Wenxin · Logo Design Extension

> Version: 1.0.0 | Date: 2026-05-05
>
> This extension is subordinate to the canonical [Wenxin Design Spec](../wenxin-spec.md).

> **核心理念：将品牌标识降维为纯粹的几何，升维为精神的图腾。**

## 目录

- [1. 图腾哲学 (Philosophy of the Totem)](#1-图腾哲学-philosophy-of-the-totem)
- [2. 视觉绝对法则 (Absolute Visual Spec)](#2-视觉绝对法则-absolute-visual-spec)
- [3. 意象与抽象转换 (Metaphor & Abstraction)](#3-意象与抽象转换-metaphor--abstraction)
- [4. 标准代码模板 (Boilerplate)](#4-标准代码模板-boilerplate)
- [5. 禁止清单 (Forbidden List)](#5-禁止清单-forbidden-list)

## 1. 图腾哲学 (Philosophy of the Totem)

**朱砂印章（The Cinnabar Seal）** 文心风格的 Logo 不是传统的商业商标，而是一枚「印章」。它代表着创作者的署名、背书与思想的重量。它必须能够在最复杂的背景、最极端的明暗模式下，依然保持绝对的清晰与权威感。

**硬质冲压（Hard Stamping）** 抛弃传统 UI 中依靠透明度、阴影来融入环境的做法。Logo 必须以实心色块作为底座，通过纯白的负空间（反白）将几何图形「冲压」出来。这种强烈的对比度本身就是一种视觉宣言。

**去具象化（Anti-Literalism）** 禁止使用具象的物品（如书本代表知识、齿轮代表工程、电脑代表计算）。必须向上抽象为几何关系（如交汇、分叉、网络、矩阵、涌现）。

## 2. 视觉绝对法则 (Absolute Visual Spec)

文心 Logo 属于「品牌标识符（Brand Identity）」，它**被允许且必须**偏离 UI 图标的常规设定，以获取足够的物理重量。

### 色彩：绝对对比度

放弃 CSS 媒体查询（`@media prefers-color-scheme`）。通过绝对的实心高对比度，实现全天候的清晰。

- **底座背景**：`#8B3525`（文心 Accent 砖红）。它是全页唯一的精神焦点。
- **冲压线条**：`#FFFFFF`（纯白）。作为负空间呈现。

### 形态与重量

- **底座圆角**：`rx="4"`。严格遵守主规范中「微小圆角 ≤ 4px」的克制原则，既有力量又不锋利。
- **线条粗细**：`stroke-width="2.5"`。突破 UI 图标的 1.5px 限制，赋予图形足够的抓地力与品牌重量。
- **端点与折角**：必须使用 `stroke-linecap="round"` 和 `stroke-linejoin="round"`，让硬朗的几何带有温润的触感。

## 3. 意象与抽象转换 (Metaphor & Abstraction)

在设计具体的 Logo 路径时，执行以下心智翻译：

| 领域/概念         | 传统具象表达（废弃） | 文心抽象意象（推荐） | 几何形态                     |
| ----------------- | -------------------- | -------------------- | ---------------------------- |
| **起源 / 元数据** | 圆点、零、发源地     | 孕育、边界、破壳     | 同心圆、虚线包围的实心点     |
| **知识 / 学习**   | 书本、大脑、灯泡     | 枝桠、生长、分叉     | 向上延伸的 Y 型或树状折线    |
| **工程 / 计算机** | 代码符号 `< >`、齿轮 | 架构、矩阵、秩序     | 正交的直线、网格、等距立方体 |
| **跨学科 / 融合** | 拼图、握手           | 交织、共振、透镜     | 相互穿插的路径、交叠的圆     |
| **社会 / 网络**   | 人群图标、地球       | 节点、星图、连线     | 散落的圆点与虚实相间的连线   |

## 4. 标准代码模板 (Boilerplate)

每次新建文心风格 Logo，复制此代码作为底座。不需要外部 CSS，不需要媒体查询，保证绝对的便携性。

```
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)">
  <!-- 1. 朱砂底座：纯正文心红，4px 克制圆角 -->
  <rect width="64" height="64" rx="4" fill="#8B3525"/>

  <!-- 2. 图腾冲压：纯白反色，2.5px 品牌重量，圆润转角 -->
  <!-- 下方 path 替换为具体的几何路径 -->
  <path
    d="M 32 56 L 32 40 M 32 40 L 16 24 M 32 40 L 48 24 M 40 32 L 32 24 M 24 32 L 24 16 M 40 32 L 48 16"
    stroke="#FFFFFF"
    stroke-width="2.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
```

## 5. 禁止清单 (Forbidden List)

对照此清单自审，出现以下情况一律视为不合格：

- [ ] **禁止透明底座**：主 Logo 严禁使用透明背景，必须是 `#8B3525` 实心底座（UI 辅助图标除外）。
- [ ] **禁止使用细线**：严禁在主 Logo 中使用 `1.5px` 的常规 UI 线宽，必须加粗至 `2.5px`。
- [ ] **禁止直角底座**：严禁 `rx="0"` 的绝对直角底座，必须带有 `rx="4"` 的微圆角以保持温润。
- [ ] **禁止媒体查询变色**：严禁为主 Logo 编写 Dark Mode 变色逻辑，红底白线已具备全场景通行能力。
- [ ] **禁止具象图标**：严禁直接使用如 FontAwesome, Lucide 中的具象图标（如放大镜、书本、用户头像）作为 Logo 核心。
