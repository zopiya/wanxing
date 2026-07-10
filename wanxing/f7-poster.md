# F7 · 文心海报 Poster & Cover

> 属于 [wanxing](./README.md) 形态层 — Form layer
> 参考实例 References: [`examples/f7-poster/`](./examples/f7-poster/)
> 完整规范源 Full source spec: `archive/wanxing/.opencode/agents/wenxin/poster.md`

单页强视觉，6 种画布比例。海报是文心「克制之美」在单页尺度上的最强表达——与 F4 书卷互补（书卷管「怎么读」，海报管「怎么看」）。

Single-page, strong visual, six canvas ratios. The poster is Wenxin's strongest single-page expression of restraint — complementary to F4 (the book manages "how to read," the poster manages "how to look").

**核心命题 Core proposition：** 在一张画布上，用一个视觉锚点抓住注意力——文心「点睛之色」的终极形态，整张海报只有一个 accent 焦点，其他地方都是留白。克制不是「什么都不放」，而是「只放必须放的」。

## 画布比例 · Canvas Ratios

| 比例 | 尺寸（基准）| 用途 |
|------|------------|------|
| 2:3 | 1200×1800 | 书籍封面、竖版海报（标准）|
| 3:4 | 1200×1600 | 竖版海报、宣传单页 |
| 1:1 | 1200×1200 | 专辑封面、社交媒体头像 |
| 16:9 | 1920×1080 | 横幅、社交头图 |
| 4:3 | 1600×1200 | 横版海报 |
| A 系列 | A4/A3/A2/A1 | 印刷海报 |

## 构图模式 · Composition Modes

居中对称（活动海报/书籍封面）、左对齐（宣传单页/学术海报）、对角分布（展览海报/专辑封面）、全出血文字（极简/品牌海报）。

安全区域 Safe area：重要文字距边缘 ≥ 8%；空白区域 ≥ 50% 画布面积；Logo/署名位置右下角或底部居中（可被裁切不影响识别）。

## 海报字号阶梯 · Poster Type Scale

比 F5 演示更大，因观看距离更远，Major Third (1.250)：

`--poster-text-xs` 12px（ISBN/条形码）→ `--poster-text-sm` 14px（日期/署名）→ `--poster-text-base` 18px → `--poster-text-md` 24px → `--poster-text-lg` 32px → `--poster-text-xl` 48px → `--poster-text-2xl` 72px → `--poster-text-3xl` 96px（标准主标题）→ `--poster-text-4xl` 128px → `--poster-text-5xl` 192px（全出血标题）。

文字约束 Text constraints：主标题 ≤ 15 字/8 词；总文字元素 ≤ 5 个（标题/副标题/日期/地点/署名）；每种字重 ≤ 2 种；每种字号 ≤ 3 种。

## Accent 使用规则 · Accent Rule

**整张海报 accent 出现在标题（1 处）+ 署名（1 处）= 总共 ≤ 2 处。** 其余所有信息使用中性色。数字海报可用暗色模式；印刷海报不需要暗色模式。

## 动效 · Motion

印刷海报（印刷静止）：无动效、无交互态、无暗色模式。数字海报：单次进场 fade-up（`--duration-slow`），■ 可用呼吸动效，禁止除 ■ 外的任何循环动效。

## 与 F3 品牌的边界 · Boundary with F3 Brand

同 [`f3-brand.md`](./f3-brand.md)：F3 定义「品牌是什么」（Logo 设计、色彩/字体系统定义），F7 定义「品牌在海报上怎么排」（Logo 位置大小、色彩字体的层级组合）。

---

## 变体：小红书卡片版式协议 · Variant: Xiaohongshu Card Layout Protocol

> 源 Source: `archive/gemini-gem/xiaohongshu.md`（v2.0）

这是 F7 的一个特定子类型——3:4 比例的社交媒体卡片，服务于国内社交平台的图文笔记场景。**与主 F7 规范的一处偏离需要注意**：该协议允许每套卡片从三种 accent 中选一（朱砂红 `#8B3525` / 黛石蓝 `#1E3A4C` / 松石绿 `#2A4D3E`），而不是 [wenxin](../wenxin/README.md) 规定的单一全局 accent。这是社交卡片场景下的例外扩展，不代表 wenxin 灵魂层允许多 accent——若用于 F1/F4/F5 等其他形态，仍须遵守单一 accent 原则。

One deviation worth flagging: this protocol lets a card set pick from three accent choices (cinnabar / indigo / evergreen) rather than wenxin's single global accent. This is a scenario-specific exception for social cards, not a relaxation of the soul-layer single-accent rule for any other form.

**版式弹药库 Layout arsenal**：5 大板块 × 3 种变体 = 15 种非对称版式：

| 板块 Category | 变体 Variants |
|---|---|
| P1 封面 Cover | A1 重力偏移 / A2 巨字水印 / A3 竖分面板 |
| P2 对比 Contrast | B1 高低错落 / B2 显微焦距 / B3 对角剪影 |
| P3 列举 List | C1 左右交错 / C2 进度刻度虚线 / C3 1大4小锚点 |
| P4 金句 Quote | D1 双色切割 / D2 极端负空间 / D3 印章图腾叠 |
| P5 行动 Action | E1 极简等线 / E2 三栏竖切 / E3 S型蛇形流 |

**反疲劳原则 Anti-fatigue mandate**：连续 5 张卡片（P1–P5）**禁止重复同一版式属性**（如连续全白/全黑/全等距），每一板块随机挑选其中一种变体，制造"冲突波动"的视觉节奏。

**通用约束 Shared constraints**：画布 3:4，最大宽度 380px；工作台背景 `#F2F0EB`；卡片底色 `#FAFAF8`/`#FFFFFF`；正文 `#3A3837`；字体栈 Lora/Noto Serif SC（表达性）+ Inter/Fira Code（元数据）；每张卡片 accent ≤ 2 处；禁止阴影/渐变/拟物贴纸/粗边框（除 1px 分隔线）。

完整的 15 种版式 Tailwind 代码模板见 [`examples/f7-poster/xiaohongshu-card-protocol.md`](./examples/f7-poster/xiaohongshu-card-protocol.md)（已复制，自成一体）。

The full 15-variant Tailwind code templates are copied in full at [`examples/f7-poster/xiaohongshu-card-protocol.md`](./examples/f7-poster/xiaohongshu-card-protocol.md) — self-contained.

## 参考实例 · Reference Instances

[`examples/f7-poster/index.html`](./examples/f7-poster/index.html) — 完整 F7 render-contract 渲染示例（主协议，2:3 比例）。
[`examples/f7-poster/xiaohongshu-card-protocol.md`](./examples/f7-poster/xiaohongshu-card-protocol.md) — 小红书卡片变体的完整版式代码。
