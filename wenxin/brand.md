# 品牌标识 · Brand Identity

> 属于 [wenxin](./README.md) 灵魂层 — Soul layer
> 合并自 `archive/gemini-gem/logo.md` 与 `archive/wanxing/.opencode/agents/wenxin/brand.md`
> Merged from `archive/gemini-gem/logo.md` and `archive/wanxing/.opencode/agents/wenxin/brand.md`

这是整套语言里最具定义性的单个元素。

This is the single most defining element in the whole language.

---

## 1. 品牌标识符 ■ · The Brand Mark

```
形态 Form：实心小方块 ■（固定，不用 · 或其他符号替代）solid square, fixed — never substitute · or another glyph
尺寸 Size：8×8px（桌面 desktop）/ 6×6px（移动端 mobile）
颜色 Color：--color-accent（亮色）/ 暗色模式自动跟随 --color-accent 暗色值
位置 Position：紧随品牌名/署名之后，基线对齐或略高 2px
              immediately after the brand name/signature, baseline-aligned or 2px above
动效 Motion：opacity 1→0.6→1，周期 4s，ease-in-out，无限循环
             opacity 1→0.6→1, 4s cycle, ease-in-out, infinite loop
```

**使用约束 Constraints**
- ✅ 必须出现在品牌 Logo / 署名区。Must appear in the brand logo/signature area.
- ✅ 可在全页追加出现 1 次（可选，慎用）。May appear once more elsewhere on the page (optional, use sparingly).
- ❌ 不可出现在正文段落、按钮、列表项中。Never in body paragraphs, buttons, or list items.
- ❌ 不可复制多个分散页面各处。Never scattered in multiple places across a page.

它是签名，不是装饰。出现越少，力量越大。

It is a signature, not decoration. The rarer it appears, the more power it holds.

Logo 用于品牌展示/标题区，■ 符号紧随品牌名后用于署名，二者各司其职。

The logo is for brand display/title areas; the ■ mark follows the brand name for signatures — each has its own job.

---

## 2. Logo 设计 · 朱砂印章 Cinnabar Seal Logo

### 图腾哲学 · Philosophy of the Totem

**朱砂印章（The Cinnabar Seal）** 文心风格的 Logo 不是传统的商业商标，而是一枚「印章」。它代表着创作者的署名、背书与思想的重量。它必须能够在最复杂的背景、最极端的明暗模式下，依然保持绝对的清晰与权威感。

The Wenxin logo is not a conventional commercial trademark — it is a "seal." It represents the creator's signature, endorsement, and the weight of an idea. It must stay absolutely legible and authoritative against any background, in any light/dark condition.

**硬质冲压（Hard Stamping）** 抛弃传统 UI 中依靠透明度、阴影来融入环境的做法。Logo 必须以实心色块作为底座，通过纯白的负空间（反白）将几何图形「冲压」出来。这种强烈的对比度本身就是一种视觉宣言。

Hard Stamping: abandon the usual UI trick of blending in via transparency and shadow. The logo must sit on a solid-color base, with geometry "stamped" out through pure-white negative space. The high contrast is itself a visual statement.

**去具象化（Anti-Literalism）** 禁止使用具象的物品（如书本代表知识、齿轮代表工程、电脑代表计算）。必须向上抽象为几何关系（如交汇、分叉、网络、矩阵、涌现）。

Anti-Literalism: no literal objects (a book for knowledge, a gear for engineering, a computer for computing). Abstract upward into geometric relationships (convergence, branching, networks, matrices, emergence).

### 视觉绝对法则 · Absolute Visual Spec

文心 Logo 属于「品牌标识符」，它**被允许且必须**偏离 UI 图标的常规设定，以获取足够的物理重量。

The logo is brand identity — it **is allowed and required** to deviate from normal UI icon rules to gain physical weight.

**色彩·绝对对比度 Color — Absolute Contrast**

放弃 CSS 媒体查询（`@media prefers-color-scheme`）。通过绝对的实心高对比度，实现全天候的清晰。Abandon dark-mode media queries entirely — solid high contrast reads clearly around the clock.

- **底座背景 Base**：`#8B3525`（文心 Accent 砖红，全页唯一的精神焦点 the one spiritual focal point on the page）
- **冲压线条 Stamped lines**：`#FFFFFF`（纯白，作为负空间呈现 pure white, as negative space）

**形态与重量 Form & Weight**

- **底座圆角 Base corner radius**：`rx="4"`（微圆角，克制原则 restrained, small radius）
- **线条粗细 Stroke width**：`2.5px`（突破 UI 图标的 1.5px 限制，赋予品牌重量 breaks past the 1.5px UI-icon limit for brand weight）
- **端点与折角 Caps & joins**：`stroke-linecap="round"` + `stroke-linejoin="round"`（硬朗的几何带有温润的触感 hard geometry, soft touch）

### 意象与抽象转换 · Metaphor & Abstraction

| 领域/概念 Domain | 传统具象（废弃）Literal (discard) | 文心抽象意象（推荐）Wenxin abstraction (use) | 几何形态 Geometry |
| ----------------- | -------------------- | -------------------- | ---------------------------- |
| 起源 / 元数据 Origin/metadata | 圆点、零、发源地 | 孕育、边界、破壳 | 同心圆、虚线包围的实心点 |
| 知识 / 学习 Knowledge/learning | 书本、大脑、灯泡 | 枝桠、生长、分叉 | 向上延伸的 Y 型或树状折线 |
| 工程 / 计算机 Engineering/computing | 代码符号 `< >`、齿轮 | 架构、矩阵、秩序 | 正交的直线、网格、等距立方体 |
| 跨学科 / 融合 Cross-discipline | 拼图、握手 | 交织、共振、透镜 | 相互穿插的路径、交叠的圆 |
| 社会 / 网络 Social/network | 人群图标、地球 | 节点、星图、连线 | 散落的圆点与虚实相间的连线 |

### 标准代码模板 · Boilerplate

不需要外部 CSS，不需要媒体查询，保证绝对的便携性。No external CSS, no media queries — fully portable.

```xml
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- 朱砂底座 cinnabar base -->
  <rect width="64" height="64" rx="4" fill="#8B3525"/>
  <!-- 图腾冲压 stamped totem — replace path with the specific geometry -->
  <path
    d="M 32 56 L 32 40 M 32 40 L 16 24 M 32 40 L 48 24 M 40 32 L 32 24 M 24 32 L 24 16 M 40 32 L 48 16"
    stroke="#FFFFFF"
    stroke-width="2.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
```

参考实现 Reference implementation: [`wanxing/examples/f3-brand/assets/`](../wanxing/examples/f3-brand/assets/) — 已复制的 logo SVG 文件（logo-wenxin.svg, brand-mark.svg, logo-mono.svg, logo-wanxing.svg）。

---

## 3. Logo 禁止清单 · Logo Forbidden List

- ❌ 禁止透明底座 — 必须是 `#8B3525` 实心底座（UI 辅助图标除外）。No transparent base.
- ❌ 禁止使用 1.5px 常规 UI 线宽 — 必须加粗至 2.5px。No 1.5px UI stroke weight.
- ❌ 禁止 `rx="0"` 绝对直角 — 必须 `rx="4"` 微圆角。No sharp right-angle base.
- ❌ 禁止为主 Logo 编写 Dark Mode 变色逻辑 — 红底白线已具备全场景通行能力。No dark-mode color logic for the primary logo.
- ❌ 禁止具象图标（放大镜、书本、用户头像等）作为 Logo 核心。No literal icons as the logo's core shape.

---

## 与形态层的边界 · Boundary with the Form Layer

品牌标识符 ■ 与 Logo 的**定义**（形态、色彩、圆角、线宽、动效）属于这里（灵魂层）。Logo/■ 在某个具体产出（网页头部、印刷品信头、名片、海报角落）里**放在哪里、多大**，属于形态层，见 [wanxing](../wanxing/README.md) 的 `f3-brand.md`（品牌应用形态）以及各 F1–F9 文件里对品牌元素位置的说明。

The **definition** of the ■ mark and the logo (shape, color, radius, stroke, motion) lives here. **Where and how large** it sits in a specific output (a webpage header, letterhead, business card, poster corner) is a form-layer decision — see wanxing's `f3-brand.md` and the placement notes in each F1–F9 file.
