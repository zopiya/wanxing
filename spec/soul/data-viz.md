# 数据可视化 · Data Visualization

> 属于 [spec](../README.md) 灵魂层 — Soul layer
> 实现 Implementation：`kit/charts/`
> 相关 See also：[color.md](./color.md)、[forbidden.md](./forbidden.md)、[../forms/f8-diagram.md](../media.md)

## 核心立场 · The Thesis

> **文心的图表是文章里的一张插图，不是仪表盘上的一个控件。**
> **A Wenxin chart is a figure in an essay, not a widget on a dashboard.**

[philosophy.md](./philosophy.md) 已把仪表盘明确排除在适用范围外。所以这套图表规范
不追求仪表盘图表（高密度、多系列、实时、交互探索），
而追求**编辑型图表**：嵌在正文里、被认真读一次、只论证一个观点。

参照系是《经济学人》和报纸图形版，不是 BI 工具。

---

## 四条规则 · Four Rules

每一条都从既有约束推导而来，不是新发明的。

### R1 · 用墨色编码，不用色相
**Encode in ink, not in hue.**

序列之间靠**墨色阶梯**区分，并用线型加强：

| 序列 | 墨色 | 线型 |
|---|---|---|
| 1 | `--color-text-heading` | 实线 |
| 2 | `--color-text-primary` | 长虚线 `6 3` |
| 3 | `--color-text-secondary` | 点线 `2 3` |
| 4 | `--color-text-functional` | 点划线 `10 3 2 3` |
| 基线/网格 | `--color-border-subtle` | — |

这是让图表在本系统内**得以成立**的关键决策。禁高饱和色不是图表的障碍 ——
色相本来就不是这套语言里的分类通道。

### R2 · accent 标记论点，不标记类别
**The accent marks the argument, not a category.**

全图**只有一个**序列、一根柱或一个点可以是 `--color-accent` ——
就是 caption 正在讲的那一个。其余全部是墨色。

这是"克制即力量"在数据上的表达。阅读轨内容页中，**一张图消耗页面两处 accent 预算中的一处**；
应用轨按页面合同分配强调，但图表本身仍不把 accent 变成普通分类色。审计器可统计声明产物中的出现次数，
不能代替动作与业务语义的人工判断。

### R3 · 直接标注，不用图例
**Direct labeling. No legends.**

图例强迫视线在色键与数据之间往返。改为在序列右端直接标注，
`--font-ui` · `--text-sm` · 与该序列同色。

这是"文字即界面"在数据上的应用 —— 标签本身就是界面。

### R4 · 装饰做减法
**Chrome is subtractive.**

- 无网格线 —— 只保留一根基线
- 无坐标轴外框
- 无刻度线 —— **标签即刻度**
- 无背景填充、无阴影、无圆角柱帽
- 只留数据墨迹（data ink）

---

## 可用图表 · Sanctioned Charts

| 类型 | 约束 |
|---|---|
| 折线 Line | ≤4 序列 |
| 面积 Area | **仅单序列**（叠加面积会强迫引入色相） |
| 柱 Column / 排行条 Bar | — |
| 点 / 棒棒糖 Dot / Lollipop | 稀疏数据优于柱 |
| 斜率 Slope | 两个时点的对比，编辑型图表的主力 |
| 迷你图 Sparkline | 嵌在正文或表格单元格内 |
| 小倍数 Small multiples | **替代多系列的首选方案** |
| 分布带 Distribution strip | — |
| 占比堆叠 Stacked bar | ≤3 段 |
| 表内条 Bar-in-table | — |
| 时间线 Timeline | — |

## 明确不做 · Forbidden

饼图 / 环形图（用排行条或 ≤3 段堆叠替代）· 雷达图 · 仪表盘 · 3D 任何形式 ·
词云 · 树图 · 按面积编码的气泡图 · 双 Y 轴 · 渐变填充 · 阴影 · 圆角柱帽

其中多数已被 [forbidden.md](./forbidden.md) 的既有禁令隐含 ——
这一节主要是把既有禁令**应用到新媒介**，而不是新增禁令。

---

## 诚实的代价 · The Honest Cost

**墨色阶梯在 ≥5 个序列时区分度不足。** 这是真的，不粉饰。

处理方式是**在规范层承认边界**，而不是引入分类色板：
需要五个以上可区分序列的密集图表，属于仪表盘范畴 ——
而仪表盘[已在适用范围之外](./philosophy.md#适用范围--scope)。

若确实需要展示多个系列，优先改用**小倍数**（每个系列一张小图），
这既解决了区分问题，通常也是更好的图表设计。

If you need five distinguishable series, use small multiples. It solves the problem and is usually
the better chart anyway.

---

## 图表的框 · The Chart Frame

图表是一个 `<figure>`，不只是一张 SVG：

```
编辑型标题     --font-display · --text-lg      定调
副标题        --font-ui · --text-sm · 全大写   说明量纲与范围
[ SVG ]
来源/注释      --text-xs · --color-text-functional
```

**裸图表不可交付。** 一张没有标题、没有量纲说明的图，
不是克制，是没做完。这与 [f8-diagram](../media.md) 的"杂志编辑化"要求一脉相承。

---

## 三种消费方式 · Three Consumers

| 方式 | 面向 | 产物 |
|---|---|---|
| **手写 SVG** | F4 / F5 / F7 / F9 等印刷向形态 | `kit/charts/chart.css` + `svg-conventions.md` |
| **Mermaid** | F8 图解 | 由 token 生成的主题，取代手写转换表 |
| **JS 图表库** | F1 / F6 交互场景 | 生成的 echarts / vega 主题 JSON |

**SVG 约定中最关键的一条**：`vector-effect: non-scaling-stroke`。
这是 1.5px 描边在海报尺度下**仍然是 1.5px** 的唯一保证 ——
否则 viewBox 缩放会把签名笔画放大成粗线。

本仓库不引入任何图表库运行时依赖；主题文件是给**使用者**喂给自己的库的。
