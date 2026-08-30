# F3 · Brand Identity

> 属于 [spec](../README.md) 形态层 — Form layer
> 轨道 Track：`editorial` · 动效 Motion：`E9-2` 微澜 · 画布 Canvas：`responsive`

## 身份与边界 · Identity

F3 定义**品牌是什么** —— Logo 系统、色彩、字体、图形语言。

> **品牌标识是"我是谁"，UI 设计是"我怎么用"。**
> **Brand identity is "who I am"; UI design is "how I work".**

| 领域 | F3 负责 | 其他形态负责 |
|---|---|---|
| Logo | 设计、变体、禁止清单 | F4：logo 在印刷品上的放置规则 |
| 名片 | 视觉设计 | F4：排版参数 |
| 色彩 | HEX / RGB / **CMYK / PANTONE** 定义 | F4：CMYK 在具体印刷品的应用 |

**封面设计属于 F7，不属于 F3。**

## 标识系统 · Logo System

■ 标识与朱砂印章 logo 的**定义**在[灵魂层 brand.md](../soul/brand.md)。
F3 负责的是**变体、尺度与应用规则**：

- 多尺度变体：favicon → 户外广告
- 单色版、反白版、最小尺寸限制
- 安全留白：标识周围至少留出标识自身高度的空白
- 品牌字体：Lora / EB Garamond / Noto Serif SC

## 色彩交付 · Color Deliverable

F3 是唯一需要交付**完整跨介质色彩映射**的形态：

| | 用途 |
|---|---|
| HEX / RGB | 数字介质 |
| **CMYK** | 四色印刷 |
| **PANTONE 近似** | 专色印刷，砖红建议用专色 |

## 动效 · Motion

**E9-2 微澜** —— F3 是全系统唯一允许**循环动画**的形态：
■ 标识呼吸 `opacity 1 → 0.6 → 1`，`--duration-breath` 4s，`--ease-in-out`。

这是[禁止循环动效](../soul/forbidden.md)的唯一豁免，也是九份渲染契约里唯一把
`maxDurationMs` 开到 4000 的一处。

## 最小可交付物 · Minimum Deliverable

- [ ] Logo 主形与变体（单色 / 反白 / 最小尺寸）
- [ ] 安全留白规则
- [ ] 完整色彩映射：HEX / RGB / CMYK / PANTONE
- [ ] 品牌字体与字号关系
- [ ] Logo 禁止清单（拉伸、改色、加阴影、旋转、描边）
- [ ] 渲染契约 `profile: F3`，`motion.intent: "brand-breath"`

## 不做 · Out of scope

封面设计（F7）· 印刷内页排版（F4）· 产品 UI 组件（F1/F2）
