# SVG 约定 · SVG Conventions

> 手写图表用。图表库主题见 `kit/tokens/generated/{mermaid,echarts,vega}-wenxin.json`。

## 一条必须遵守的规则

```xml
vector-effect="non-scaling-stroke"
```

**每一根线都要带。** 这是 1.5px 签名描边在海报尺度下**仍然是 1.5px** 的唯一保证 ——
否则 viewBox 缩放会把它乘成粗线，标志性的笔画就不再是它自己了。
`chart.css` 已经对 `[class*="wx-chart__"]` 统一设置，手写内联样式时别忘了。

## 骨架 · Skeleton

```html
<figure class="wx-chart">
  <h3 class="wx-chart__title">定调的编辑型标题</h3>
  <p class="wx-chart__subtitle">量纲 · 范围 · 单位</p>

  <svg class="wx-chart__svg" viewBox="0 0 640 260"
       role="img" aria-labelledby="c1t c1d" preserveAspectRatio="xMidYMid meet">
    <title id="c1t">图表标题</title>
    <desc id="c1d">用一句话说明这张图在讲什么 —— 给读屏器，也给没加载出图的人。</desc>

    <line class="wx-chart__baseline" x1="0" y1="220" x2="640" y2="220"/>
    <path class="wx-chart__line" d="…"/>
    <path class="wx-chart__line wx-chart__line--accent" d="…"/>
    <text class="wx-chart__series-label wx-chart__series-label--accent" x="600" y="60">结论项</text>
  </svg>

  <p class="wx-chart__note">来源：…</p>
</figure>
```

## 五条约定

**1 · viewBox 用整数，不设 width/height**
让 CSS 决定尺寸。`.wx-chart__svg` 已经是 `width: 100%`。

**2 · 文字永远是 `<text>`，不转曲**
转曲的文字不可选中、不可搜索、读屏器读不到，且在暗色模式下无法换色。

**3 · `role="img"` + `<title>` + `<desc>`**
`<title>` 是名字，`<desc>` 是这张图在论证什么。
**这不是可选项** —— 一张读屏器读不出来的图，等于对一部分读者不存在。

**4 · 类名承载语义，内联样式只放坐标**
颜色、线宽、虚线全部走 class；`x`/`y`/`d` 这类几何值才写在元素上。
这样暗色模式与印刷才能自动跟随。

**5 · 序列在右端直接标注，不画图例**
图例强迫视线在色键与数据之间往返。标签用序列自己的颜色，
`dominant-baseline="middle"` 对齐终点。

## 序列编码 · Series Encoding

| 序列 | class | 墨色 | 线型 |
|---|---|---|---|
| 1 | `wx-chart__line` | heading | 实线 |
| 2 | `wx-chart__line--2` | secondary | 长虚 `6 3` |
| 3 | `wx-chart__line--3` | muted | 点线 `2 3` |
| 4 | `wx-chart__line--4` | border-strong | 点划 `10 3 2 3` |
| 结论项 | `--accent` | 砖红 | 实线 |

**墨色 + 线型是双通道。** 只靠墨色，在黑白复印或低对比屏幕上会糊在一起；
加上线型，编码就冗余了 —— 这同时满足「颜色不作为唯一信息载体」。

**超过 4 个序列请改用小倍数** `wx-chart-grid`。
这不是能力缺失，是[规范层的明确边界](../../spec/soul/data-viz.md#诚实的代价--the-honest-cost)：
需要五个以上可区分序列的密集图表属于仪表盘，而仪表盘不在适用范围内。
何况小倍数通常本来就是更好的图表设计。

## 无障碍 · Accessibility

- 复杂图表：在 `<figcaption>` 或相邻段落给出**文字版结论**，
  而不是指望读者解析 SVG。
- 数据密集时，考虑同时提供一个 `wx-table` —— 表格对读屏器友好得多。
- 不要用颜色单独区分序列（线型已经解决了这一点）。
