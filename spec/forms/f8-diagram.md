# F8 · Diagram & Knowledge Map

> 属于 [spec](../README.md) 形态层 — Form layer
> 轨道 Track：`editorial` · 动效 Motion：`E9-0`（交互式时仅高亮路径） · 画布 Canvas：`diagram`

## 身份与边界 · Identity

F8 交付**可独立存在的图解**：关系图、流程图、架构图、知识地图、方法论框架。

核心不是装饰性插图，而是**用文字、线条、留白和拓扑关系解释复杂结构**。

- F8 负责图解本身；**F6 只负责承载图解的文档站**。
- F8 求**结构可读**；**F5 求演讲节奏**。
- F8 求理解；**F7 求单页传播视觉**。

## 图解哲学 · Philosophy

**杂志编辑化** —— 图解不是机器生成的说明书，而是书籍的一页插图。必须包含：
定调的衬线体大标题、全大写无衬线副标题、以及一句注入判断的**编辑型引语**。

**呼吸空间** —— 彻底摒弃传统软件为省空间制造的拥挤感。
**文字与线条必须物理隔离，图表宁可拉长，也绝不让线条穿透文字的垂直空间。**

**克制的焦点** —— 全图 95% 是黑白灰与暖白底，accent ≤2 处，只标记原点、终点或高价值闭环。

## 四种图解类型 · Types

| 类型 | 用途 | 核心规则 |
|---|---|---|
| Architecture | 系统架构、模块边界 | 分层清晰，边界线轻，不用云状/拟物图标 |
| Flow | 流程、状态迁移 | 方向明确，箭头轻量，条件文字浮于水平线段上方 |
| Knowledge Map | 知识地图、概念网络 | 中心概念少，分支留白充足，**避免蛛网式拥挤** |
| Framework | 方法论框架、矩阵 | 网格克制，文字为主，**不用彩色象限** |

## 视觉规则 · Visual Rules

- 背景 `--color-bg-warm` 或透明；节点底 `--color-bg-pure`
- 普通线条 `--stroke-hairline` 1px；关键节点边框 `--stroke-mark` 1.5px
- accent ≤2 处
- SVG 必须用 `vector-effect: non-scaling-stroke` —— 保证缩放后描边仍是 1.5px

## 与数据可视化的关系 · Relation to data-viz

F8 是**拓扑图解**（节点与关系）；[data-viz.md](../soul/data-viz.md) 是**数据图表**（量的编码）。
两者共享美学约束，但解决不同问题。一张架构图属于 F8；一张折线图属于 data-viz，
可以出现在任何形态里。

## Mermaid

Mermaid 源可用，但**必须套用由 token 生成的文心主题**（`kit/charts/recipes/mermaid-theme.mjs`）。
禁止默认彩虹色块与粗黑箭头。

## 最小可交付物 · Minimum Deliverable

- [ ] 图解标题 + 类型声明 + 编辑型引语
- [ ] 节点、连线、分组边界清晰
- [ ] **线条不穿过文字**
- [ ] 关系方向 3 秒内可识别
- [ ] accent ≤2 处
- [ ] SVG/HTML 可独立打开
- [ ] 渲染契约 `profile: F8`，含 `diagram.type` 与节点/连线计数

## 不做 · Out of scope

Mermaid 默认样式残留 · 彩色象限 · 装饰性图标 · 裸流程图（无标题无引语）
