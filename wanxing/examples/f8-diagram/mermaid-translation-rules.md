# Wenxin · Mermaid Diagram Extension

> Version: 1.0.0 | Date: 2026-04-23
> This extension is subordinate to the canonical [Wenxin Design Spec](../wenxin-spec.md).

> 核心理念：将功能性的思维导图，升格为具备编辑质感的视觉读物。

---

## 目录

- [1. 图表哲学 (Diagram Philosophy)](#1-图表哲学-diagram-philosophy)
- [2. 全局视觉规范 (Global Visual Spec)](#2-全局视觉规范-global-visual-spec)
- [3. 连线与空间拓扑 (Topology & Routing)](#3-连线与空间拓扑-topology--routing)
- [4. Mermaid 翻译法则 (Translation Rules)](#4-mermaid-翻译法则-translation-rules)
- [5. 标准组件库 (Component Library)](#5-标准组件库-component-library)
- [6. 禁止清单 (Forbidden List)](#6-禁止清单-forbidden-list)

---

## 1. 图表哲学 (Diagram Philosophy)

**1. 杂志编辑化（Editorial Design）**
图表不是机器生成的说明书，而是书籍的一页插图。必须包含：定调的衬线体大标题、全大写无衬线副标题、以及一句注入灵魂的「编辑型引语」。

**2. 呼吸空间（Breathing Space）**
彻底摒弃传统软件为了节省空间而制造的拥挤感。文字与线条必须物理隔离，图表高度宁可拉长，也绝不让线条穿透文字的垂直空间。

**3. 克制的焦点（Restrained Focus）**
整张图表 95% 应当是黑白灰与暖白底色。全图只允许出现一到两处 `Accent`（砖红色），用于标记图表的「原点」、「终点」或「高价值闭环」。

---

## 2. 全局视觉规范 (Global Visual Spec)

### 1. 色彩映射 (Color Mapping)

图表应严格继承文心色彩系统，脱离传统 Mermaid 的高饱和色块：

- **画布背景**：`#F2F0EB` (暖白，赋予羊皮纸质感)
- **普通节点底色**：`#FAFAF8` (内页白，仅比背景亮一点，制造微弱的层次)
- **核心节点底色**：`#F5E8E5` (Accent 的极淡背景版)
- **主体文字**：`#3A3837` (深炭色)
- **辅助文字/连线**：`#C8C3BA` (浅灰，让骨架退后)
- **点睛之色/关键连线**：`#8B3525` (砖红)

### 2. 字体排版 (Typography)

- **主标题**：`Serif Bold`，16px-28px，沉稳清晰。
- **副标题/英文/条件标签**：`UI Sans Uppercase` (无衬线全大写)，10px-11px，拉开字距 (`letter-spacing: 0.1em`)，制造高级感。

---

## 3. 连线与空间拓扑 (Topology & Routing)

### 1. 悬浮阶梯法则（Shelf Routing）

当连线带有文字标签（如 `-->|条件|`）时，**禁止使用带背景框的文字去遮挡线条**。

- **正确做法**：线条先完成上下转折，留出一段**绝对水平的直线段（阶梯）**，将文字精准悬浮于该水平线上方 `15px` 处。

### 2. 贝塞尔曲线平滑过渡（Bézier Curves）

- 废弃直角转折（Orthogonal）。
- 当层级发生改变时，使用带有控制点的三次贝塞尔曲线（SVG `<path d="M... C..."/>`）画出优雅的「S 型」弧线或「漏斗型」汇聚线。

### 3. 错落汇聚防拥挤（Staggered Convergence）

- 当多个分支汇聚到同一个节点时，禁止所有箭头指向同一个坐标点。
- **正确做法**：在 Y 轴或 X 轴上错开 `20px-60px` 的距离，让线条像排队一样，均匀、平行地插入目标节点的边界。

---

## 4. Mermaid 翻译法则 (Translation Rules)

在将一段 Mermaid 代码转化为文心 SVG 时，执行以下心智翻译：

| Mermaid 语法           | 文心视觉翻译                                                                  |
| :--------------------- | :---------------------------------------------------------------------------- |
| `graph TD` (自上而下)  | 引入一条隐形的**中心对称轴**，或者演变为左右蜿蜒的「花园小径」。              |
| `graph LR` (自左向右)  | 演变为「发散-收敛」的漏斗模型，强调信息的**流转与生命周期**。                 |
| `style A fill:#ff9999` | 剥离彩色！转为灰线框。若确为核心目标，使用 Accent 描边 + `#F5E8E5` 极浅底色。 |
| `A -->|文字| B`        | 转化为**悬浮阶梯排版**，线条变灰，箭头改为极简 1.5px 线条型箭头。 |
| `A -.-> B` (虚线)      | 赋予特殊语义：表示「反馈回流」、「底层基础设施」或「即将消亡/归档的状态」。   |

---

## 5. 标准组件库 (Component Library)

### 1. 标准画布外壳 (Boilerplate)

每次新建图表，复制此代码作为底座：

```xml
<svg width="1000" height="800" viewBox="0 0 1000 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1000" height="800" fill="#F2F0EB"/>
  <style>
    .serif { font-family: "Noto Serif SC", "Source Han Serif SC", serif; font-weight: 400; }
    .serif-bold { font-family: "Noto Serif SC", "Source Han Serif SC", serif; font-weight: 700; }
    .ui-sans { font-family: "Noto Sans SC", system-ui, sans-serif; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; }
    .label { fill: #888580; }
    .text-primary { fill: #3A3837; }
    .text-secondary { fill: #888580; }
    .text-accent { fill: #8B3525; }
    .line-subtle { stroke: #C8C3BA; stroke-width: 1px; fill: none; }
    .line-accent { stroke: #8B3525; stroke-width: 1px; fill: none; }
  </style>

  <defs>
    <marker id="arrow-subtle" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1 L 8 5 L 0 9" fill="none" stroke="#C8C3BA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <g transform="translate(500, 60)">
    <text text-anchor="middle" class="serif-bold text-primary" style="font-size: 28px;">主标题</text>
    <text y="28" text-anchor="middle" class="ui-sans label">ENGLISH SUBTITLE</text>
  </g>
  <g transform="translate(500, 140)">
    <text text-anchor="middle" class="serif text-secondary" style="font-size: 16px;">" 编辑型核心引语。 "</text>
  </g>
</svg>
```

### 2. 基础内容节点

尺寸建议：`宽 130px`，`高 70px`，内文绝对居中。

```xml
<g transform="translate(X, Y)">
  <rect x="-65" y="-35" width="130" height="70" rx="2" class="line-subtle" fill="#FAFAF8"/>
  <text text-anchor="middle" y="-4" class="serif-bold text-primary" style="font-size: 16px;">节点名称</text>
  <text text-anchor="middle" y="18" class="ui-sans label" style="font-size: 11px;">补充说明</text>
</g>
```

### 3. 高光/终极目标节点 (Accent Node)

用于全图最重要的 1-2 个节点。

```xml
<g transform="translate(X, Y)">
  <rect x="-70" y="-40" width="140" height="80" rx="2" stroke="#8B3525" stroke-width="1.5" fill="#F5E8E5"/>
  <text text-anchor="middle" y="-4" class="serif-bold text-accent" style="font-size: 18px;">核心结论</text>
  <text text-anchor="middle" y="20" class="ui-sans text-accent" style="font-size: 11px;">FINAL GOAL</text>
</g>
```

### 4. 悬浮判定线与文字

带有说明文字的连接线，文字在水平线上方 `15px` 处。

```xml
<path d="M 200 360 C 250 360, 260 200, 300 200 L 400 200" class="line-subtle" marker-end="url(#arrow-subtle)" />
<text x="350" y="185" text-anchor="middle" class="ui-sans label" style="font-size: 11px;">条件说明</text>
```

---

## 6. 禁止清单 (Forbidden List)

对照此清单自审，出现以下情况一律视为不合格：

- [ ] **禁止使用默认填充色**：严禁使用 Mermaid 原生的彩虹色块、实心粗黑箭头。
- [ ] **禁止交叉拥挤**：严禁任何连线直接穿过文字。必须使用"悬浮阶梯法则"分离线与字。
- [ ] **禁止孤立图表**：严禁没有主标题和"编辑型引语"的裸图表，那是说明书，不是文心排版。
- [ ] **禁止滥用红色**：`Accent` 色不可超过 2 处（不包括同一闭环中的辅助虚线）。
- [ ] **禁止加粗边框**：严禁使用大于 `1.5px` 的边框和任何 Drop Shadow（阴影），保持极简通透。
