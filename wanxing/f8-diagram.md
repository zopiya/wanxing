# F8 · 文心图解 Diagram

> 属于 [wanxing](./README.md) 形态层 — Form layer
> 参考实例 References: [`examples/f8-diagram/`](./examples/f8-diagram/)
> 完整规范源 Full source spec: `archive/wanxing/.opencode/agents/wenxin/diagrams.md`

架构图、流程图、知识地图本身。F8 交付的是图解本身，不是文档站中的配图、幻灯片素材或海报视觉——那些场景直接引用 F6/F5/F7 各自的规则。

Architecture, flow, and knowledge-map diagrams as a deliverable in their own right — not the illustrations embedded in a docs page, slide, or poster (those defer to F6/F5/F7's own rules).

## 图表哲学 · Diagram Philosophy

**杂志编辑化 Editorial design**：图表不是机器生成的说明书，而是书籍的一页插图。必须包含：定调的衬线体大标题、全大写无衬线副标题、以及一句注入灵魂的「编辑型引语」。

**呼吸空间 Breathing space**：彻底摒弃传统软件为了节省空间而制造的拥挤感。文字与线条必须物理隔离，图表高度宁可拉长，也绝不让线条穿透文字的垂直空间。

**克制的焦点 Restrained focus**：整张图表 95% 应当是黑白灰与暖白底色。全图只允许出现一到两处 accent，用于标记「原点」「终点」或「高价值闭环」。

## 全局视觉规范 · Global Visual Spec

```
画布背景 Canvas bg：#F2F0EB（暖白，羊皮纸质感）
普通节点底色 Node bg：#FAFAF8（仅比背景亮一点）
核心节点底色 Accent node bg：#F5E8E5（accent 的极淡背景版）
主体文字 Primary text：#3A3837
辅助文字/连线 Secondary/lines：#C8C3BA（让骨架退后）
点睛之色 Accent：#8B3525

主标题 Title：Serif Bold, 16–28px
副标题/条件标签 Subtitle/label：UI Sans Uppercase, 10–11px, letter-spacing 0.1em
```

## 连线与空间拓扑 · Topology & Routing

**悬浮阶梯法则 Shelf routing**：连线带文字标签时，禁止用带背景框的文字遮挡线条。正确做法：线条完成上下转折后留出一段绝对水平的直线段（阶梯），文字悬浮于水平线上方 15px 处。

**贝塞尔曲线 Bézier curves**：废弃直角转折，层级变化时用三次贝塞尔曲线画出「S 型」弧线或「漏斗型」汇聚线。

**错落汇聚 Staggered convergence**：多分支汇聚同一节点时，禁止所有箭头指向同一坐标点，需在 Y/X 轴错开 20–60px，让线条像排队一样平行插入目标节点边界。

## Mermaid 翻译法则 · Mermaid Translation Rules

| Mermaid 语法 | 文心视觉翻译 |
| :--------------------- | :---------------------------------------------------------------------------- |
| `graph TD`（自上而下）| 引入隐形中心对称轴，或演变为左右蜿蜒的「花园小径」 |
| `graph LR`（自左向右）| 演变为「发散-收敛」漏斗模型，强调流转与生命周期 |
| `style A fill:#ff9999` | 剥离彩色，转为灰线框；核心目标用 accent 描边 + `#F5E8E5` 浅底 |
| `A -->|文字| B` | 转化为悬浮阶梯排版，线条变灰，箭头改为极简 1.5px 线条型 |
| `A -.-> B`（虚线）| 赋予特殊语义：反馈回流、底层基础设施，或即将归档的状态 |

完整对照表与 SVG 组件模板（标准画布外壳、基础内容节点、高光节点、悬浮判定线）已复制在 [`examples/f8-diagram/mermaid-translation-rules.md`](./examples/f8-diagram/mermaid-translation-rules.md)——与本文件正文内容同源（`archive/gemini-gem/mermaid-diagrams.md` 与 `archive/wanxing/.opencode/agents/wenxin/diagrams.md` 是同一份规范的两次留存，内容完全一致）。

## 禁止清单 · Forbidden List

严禁 Mermaid 原生彩虹色块/实心粗黑箭头；严禁连线穿过文字；严禁没有主标题和编辑型引语的裸图表；accent 不超过 2 处；严禁 > 1.5px 边框和任何 Drop Shadow。

## 参考实例 · Reference Instance

[`examples/f8-diagram/index.html`](./examples/f8-diagram/index.html) — 完整 F8 render-contract 渲染示例。
