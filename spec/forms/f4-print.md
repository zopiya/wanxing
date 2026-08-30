# F4 · Print & Editorial

> 属于 [spec](../README.md) 形态层 — Form layer
> 轨道 Track：`editorial` · 动效 Motion：**`E8` 印刷静止** · 画布 Canvas：`print`

## 身份与边界 · Identity

F4 交付**出版级静态内页排版**：书籍、学术论文、杂志、诗集、独立出版物、信头纸。

与 F9 的边界：**F4 是出版系统，F9 是判断型报告。** F9 可以复用 F4 的印刷 token 与页边距思想，
但 F4 不承担"摘要—证据—建议"的论证结构。
封面属于 **F7**，不属于 F4。

## 页面版面 · Van de Graaf Canon

采用 Van de Graaf 经典版面确定边距比例：

```
对开页 Spread：顶 : 底 : 内侧 : 外侧 = 2 : 3 : 2 : 3
单页  Single：顶 : 底 : 内侧 : 外侧 = 2 : 3 : 3 : 2
```

```css
@page       { size: A5; margin: 30mm 25mm 40mm 20mm; }
@page :left { margin: 30mm 20mm 40mm 25mm; }
@page :right{ margin: 30mm 25mm 40mm 20mm; }
```

**标准尺寸**：A5 148×210mm（小型书籍、诗集）· B5 176×250mm（学术期刊）·
A4 210×297mm（论文）· Letter 216×279mm · 16K 185×260mm（中文书籍常用）

**出血 3mm**，文字距裁切线 **≥5mm**，装订侧内边距 **≥20mm**。

## 排版 · Typography

**F4 使用 pt，不用 rem。** 完整十级阶梯（Major Third）：

| Token | 值 | | Token | 值 |
|---|---|---|---|---|
| `--print-text-xs` | 7pt | | `--print-text-xl` | 16pt |
| `--print-text-sm` | 8.5pt | | `--print-text-2xl` | 20pt |
| `--print-text-base` | 10pt | | `--print-text-3xl` | 26pt |
| `--print-text-md` | 11pt | | `--print-text-4xl` | 36pt |
| `--print-text-lg` | 13pt | | `--print-text-5xl` | 48pt |

行高五级：`tight 1.2` · `snug 1.35` · `normal 1.5` · `relaxed 1.8` · `loose 1.9`

**禁止 7pt 以下文字。**

## 色彩 · Color

**完整 CMYK 映射表**（9 色），砖红建议用专色。
**无暗色模式** —— 纸张没有暗色模式。

## 动效 · Motion — E8 印刷静止

F4 是**唯一整体使用 E8 的形态**。含义：

- 不使用任何 `transition` / `animation`
- **不使用 `:hover` / `:focus` 样式** —— 纸上不存在这些状态
- 不需要暗色模式映射
- 所有视觉层级通过字号、字重、间距、色彩**静态**实现
- **■ 标识不呼吸**，仅静态呈现

`<html data-motion="E8">` 会在 `kit/base/motion.css` 里结构性地关闭一切动效。

## 组件 · Components

`wx-dropcap`（首字下沉）· 页眉页码 · `wx-fn`（脚注）· 结尾装饰 · `wx-figure`

## 最小可交付物 · Minimum Deliverable

- [ ] 10 级 pt 字号阶梯
- [ ] 5 级行高
- [ ] CMYK 色值映射表（9 色）
- [ ] Van de Graaf 版面系统
- [ ] 标准页面尺寸声明
- [ ] 奇偶页镜像边距规则
- [ ] 首字下沉 / 页眉页码 / 脚注 / 结尾装饰
- [ ] `@media print` 样式表
- [ ] 渲染契约 `profile: F4`，`darkModeRequired: false`，`intensity: "E8"`

## 不做 · Out of scope

一切交互态与动效 · 暗色模式 · 封面（F7）· 论证型报告结构（F9）
