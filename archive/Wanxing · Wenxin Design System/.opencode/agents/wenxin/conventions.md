# 文心 (Wenxin) · SVG 与绘图通用规范

> Version: 1.0.0 | Date: 2026-05-20

---

## 目录

- [1. SVG 通用约定 (SVG Conventions)](#1-svg-通用约定-svg-conventions)
- [2. 线条绘制规则 (Line Drawing Rules)](#2-线条绘制规则-line-drawing-rules)
- [3. 色彩映射 (Color Mapping for SVG)](#3-色彩映射-color-mapping-for-svg)
- [4. 通用绘图原则 (Universal Drawing Principles)](#4-通用绘图原则-universal-drawing-principles)

---

## 1. SVG 通用约定 (SVG Conventions)

### 基础模板结构

所有 SVG 图形遵循统一的基础结构：

```xml
<svg width="..." height="..." viewBox="0 0 ..." fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- 背景（如需要） -->
  <rect width="..." height="..." fill="..."/>

  <!-- 内联样式（便携性，不依赖外部 CSS） -->
  <style>
    /* 字体类 */
    .serif { font-family: "Noto Serif SC", "Source Han Serif SC", serif; }
    .serif-bold { font-family: "Noto Serif SC", "Source Han Serif SC", serif; font-weight: 700; }
    .ui-sans { font-family: "Noto Sans SC", system-ui, sans-serif; }

    /* 色彩类 */
    .text-primary { fill: #3A3837; }
    .text-secondary { fill: #888580; }
    .text-accent { fill: #8B3525; }
    .line-subtle { stroke: #C8C3BA; stroke-width: 1px; fill: none; }
    .line-accent { stroke: #8B3525; stroke-width: 1px; fill: none; }
  </style>

  <!-- 可复用定义（箭头标记等） -->
  <defs>
    <marker id="arrow-subtle" ...>
      <path d="..." fill="none" stroke="..." stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <!-- 图形内容 -->
</svg>
```

### SVG 属性约定

- **`fill="none"`**：默认填充为 none，除非明确需要填充色
- **`xmlns`**：始终包含 `xmlns="http://www.w3.org/2000/svg"`
- **`viewBox`**：始终定义，确保可缩放
- **内联样式优先**：不依赖外部 CSS，保证 SVG 的便携性和独立性

### 圆角约定

- **Logo 底座**：`rx="4"`（微圆角，克制原则）
- **图表节点**：`rx="2"`（更小圆角）
- **UI 组件**：`≤ 4px`（遵循主规范）
- **禁止**：`rx="0"` 的绝对直角（除非有特殊设计理由）

---

## 2. 线条绘制规则 (Line Drawing Rules)

### 线宽层级

| 用途 | 线宽 | 说明 |
|------|------|------|
| UI 图标 | `1.5px` | 统一标准，不随尺寸变化 |
| Logo 冲压线条 | `2.5px` | 品牌重量，突破 UI 限制 |
| 图表连线 | `1px` | 退后的骨架线条 |
| 图表 Accent 连线 | `1px` | 关键路径，颜色区分 |
| 图表 Accent 节点边框 | `1.5px` | 高亮节点 |
| Blockquote 左侧线 | `2px` | 引用块标识 |
| 分隔线 | `1px` | 短横线、底部分隔 |

### 端点与折角

- **`stroke-linecap="round"`**：线条端点圆润（Logo、图表连线）
- **`stroke-linejoin="round"`**：折角圆润（Logo、图表连线）
- UI 图标跟随图标库默认，不额外修改

### 箭头规范

```xml
<marker id="arrow-subtle" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
  <path d="M 0 1 L 8 5 L 0 9" fill="none" stroke="#C8C3BA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</marker>
```

- 箭头为极简线条型，非实心三角
- 颜色使用 `--color-border-strong`（`#C8C3BA`）
- 线宽 `1.5px`，与图标线宽一致

### 贝塞尔曲线

当需要平滑过渡时，使用三次贝塞尔曲线：

```xml
<path d="M 200 360 C 250 360, 260 200, 300 200 L 400 200" />
```

- 废弃直角转折（Orthogonal）
- 控制点距离影响曲线弧度，通常取转折距离的 50%-100%

---

## 3. 色彩映射 (Color Mapping for SVG)

### 文心色彩在 SVG 中的使用

| 角色 | 色值 | 用途 |
|------|------|------|
| 画布背景 | `#F2F0EB` | 图表/Logo 暖白底色 |
| 节点背景 | `#FAFAF8` | 普通内容节点 |
| Accent 节点背景 | `#F5E8E5` | 高亮/核心节点 |
| 主体文字 | `#3A3837` | 标题、正文 |
| 辅助文字 | `#888580` | 标签、说明 |
| 弱化文字 | `#B0ABA4` | 装饰引号、占位 |
| 连线/骨架 | `#C8C3BA` | 普通连接线 |
| Accent 强调 | `#8B3525` | 关键路径、品牌标记 |
| Logo 底座 | `#8B3525` | 朱砂印章实心底座 |
| Logo 冲压线 | `#FFFFFF` | 负空间反白线条 |

### 暗色模式 SVG 色彩

SVG 图形通常不跟随系统暗色模式（尤其是 Logo），但图表可选择适配：

- **Logo**：不编写媒体查询变色逻辑，红底白线全天候通行
- **图表**：可选择在暗色模式下调整背景色和文字色，保持对比度

### 色彩使用约束

- SVG 中禁止使用文心色彩系统之外的颜色
- Accent 色（`#8B3525`）在单张图表中不超过 2 处
- 禁止高饱和蓝、绿、紫、橙
- 禁止渐变色

---

## 4. 通用绘图原则 (Universal Drawing Principles)

### 去具象化 (Anti-Literalism)

禁止使用具象的物品来表达抽象概念。必须向上抽象为几何关系：

| 概念 | 废弃（具象） | 推荐（抽象） |
|------|-------------|-------------|
| 知识 | 书本、大脑、灯泡 | 枝桠、生长、分叉 |
| 工程 | 齿轮、代码符号 | 正交直线、网格、立方体 |
| 网络 | 人群、地球 | 节点、星图、连线 |
| 融合 | 拼图、握手 | 穿插路径、交叠圆 |

### 克制原则

- **留白优先**：宁可画布更大，也不让元素拥挤
- **最少颜色**：95% 黑白灰 + 暖白，Accent 仅用于关键标记
- **最少装饰**：不添加无功能的装饰元素
- **一致性**：同一项目内 SVG 风格统一，不混用不同线宽和圆角

### 可读性底线

- 文字字号不小于 10px（辅助标签）
- 连线不穿过文字（使用悬浮阶梯法则分离）
- 节点之间保持足够间距（Y 轴/X 轴错开 20px-60px）
- 对比度满足 WCAG AA 标准

### 品牌重量 vs UI 轻量

- **Logo**：使用 `2.5px` 线宽，获取品牌重量和视觉抓地力
- **UI 图标**：使用 `1.5px` 线宽，保持轻盈不抢焦
- **图表连线**：使用 `1px` 线宽，让骨架退后

三者不可混用线宽——每种场景有其特定的重量级别。
