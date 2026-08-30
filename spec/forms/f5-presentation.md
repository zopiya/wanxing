# F5 · Presentation

> 属于 [spec](../README.md) 形态层 — Form layer
> 轨道 Track：`editorial` · 动效 Motion：`E9-1` · 画布 Canvas：**`fixed` 16:9**

## 身份与边界 · Identity

F5 交付**面向现场讲述的 16:9 幻灯片**。

与 F7 的边界：**F5 是多页叙事，F7 是单页传播。** 一张需要被讲解的图是 F5；
一张需要被一眼看懂的图是 F7。

## 画布 · Canvas

```
比例：16:9 固定
像素：1920 × 1080
布局：vw / vh 或百分比，不用固定 px
安全区：距边缘 ≥5% 画布宽度（96px）
```

**栅格**：12 列，gutter 24px。内容距左右边缘各 5%、上下各 8%。
**标题区占上 1/3，内容区占下 2/3。** 页码在右下，距边 3%。

## 七种幻灯片类型 · Slide Types

| 类型 | 要点 |
|---|---|
| 标题页 | 垂直居中；■ 紧随标题；`--font-display` `--text-5xl`；底色 `--color-bg-warm` |
| 章节分隔 | 章节编号 `--font-ui` 全大写 `--tracking-wider`；标题 `--text-4xl`；■ 可作为 accent 第二次出现 |
| 内容 · 纯文字 | 标题 ≤30 字；**要点每项 ≤2 行，最多 5 项**；列表标记用短横线 `—`，**不用圆点** |
| 内容 · 文字 + 图 | 图文各占一半或 1:2 |
| 内容 · 全图 | 图占满，文字压在留白处 |
| 数据 | 遵循 [data-viz.md](../soul/data-viz.md)：墨色编码 + 单一 accent |
| 结束页 | 与标题页呼应 |

## 三种页面模式 · Slide Modes

`light`（`--color-bg-warm`）· `dark`（`#1A1816` 舞台底）· `accent`（砖红满版，全场至多一次）

## 排版 · Typography

**展示优先**：标题 `--text-5xl` 起，正文 `--text-lg` 起 —— **要能从后排看清**。
每页字数 **≤80 字**。

## 动效 · Motion

**E9-1**：换页过渡，`--duration-slow` 420ms。
**不做元素级花哨动画** —— 幻灯片的节奏由讲述者掌握，不由动画掌握。

## 最小可交付物 · Minimum Deliverable

- [ ] 16:9 声明（`canvas.aspectRatio: "16:9"`，审计器强制）
- [ ] 七种幻灯片类型齐备
- [ ] 三种模式的色彩映射
- [ ] 安全区与页码位置
- [ ] 每页 ≤80 字
- [ ] 渲染契约 `profile: F5`，`canvas.kind: "fixed"`

## 不做 · Out of scope

逐字动画 · 转场特效 · 演讲者备注排版（属于工具，不属于设计） · 单页海报（F7）
