# 文心设计语言 · 规范总览 (Wenxin Design Language Specification)

> Version: 1.0.0 | 2026-05-20 | Wanxing Refactoring

---

## 1. 设计哲学 (Design Philosophy)

**核心命题：文字即界面，留白即设计，克制即力量。**

内容本身是最重要的视觉主体。所有 UI 决策服务于同一目标：让用户最自然、最安静地进入内容——而不是被界面打断。

### 水的原则 · 两层结构

文心设计语言由两个层次构成：

**第一层 · 灵魂（Soul）— 永远不变**
色彩系统、字体哲学、留白密度、点睛之色、动效节奏。任何场景、任何产品类型，灵魂层不妥协。

**第二层 · 形态（Form）— 随境而化**
布局结构、导航形式、内容组织方式。跟随该类型产品的行业 UX 最佳惯例，不强行套用统一形状。

水的本质（H₂O）不因容器而改变，但在杯子里是杯子的形，在河道里是河道的形。用户感受到的不是「风格统一」，而是「说不出的舒服」。这就是润物细无声。

### 三项灵魂原则

**减法优先 (Reduction First)** — 任何元素若无法让内容更清晰，就不应存在。没有装饰阴影，没有多余边框，没有视觉噪声。

**克制的惊喜 (Restrained Surprise)** — 动效的存在如同书页翻动时纸张的阻力：你感到用心，但不会停下来欣赏它。用户感受到「顺」，而非「炫」。品牌标识符 `■` 是这一原则的具象化——全页唯一的几何强调，出现越少，力量越大。

**点睛之色 (Accent as Focal Point)** — 全页只允许一个强调色（砖红 `#8B3525`），它是整个设计的灵魂签名。就像水墨画里的朱砂印章——其他一切是黑白灰，它是唯一有温度的存在。频率越低，力量越大。全页出现 **≤ 2 处**（图标激活/选中态除外）。

### 适用范围

**适用**（以内容/信息为核心）：博客、个人网站、知识库、文档站、作品集、简历、Landing Page、轻量工具。

**不适用**：数据密集型 Dashboard、电商、游戏、娱乐类产品。

---

## 2. 维度映射 (Dimension Mapping)

文心设计语言对应 7 个维度的固定值。每个值的选择都有其哲学理由，并在设计 Token 中有具体体现。

| 维度 | 标识 | 值 | 选择理由 |
|------|------|-----|----------|
| A · 设计哲学 | A9 | 克制之美 (Restrained Elegance) | 设计的力量来自克制而非张扬。通过精心控制的留白、温暖的色调和微妙的排版细节，创造一种安静而有力的视觉体验 |
| B · 视觉性格 | B9 | 温暖极简 (Warm Minimal) | 极简但不冰冷——暖色调（而非纯黑白）、衬线字体的温度（而非几何无衬线的冷峻）、有呼吸感的留白 |
| C · 排版节奏 | C9 | 温暖衬线 (Warm Serif) | 衬线优先，舒适行高（≥1.7 CJK），温暖阅读体验。衬线字体的笔画有起伏、有呼吸，与文心气质吻合 |
| D · 色彩基调 | D9 | 暖土调 (Warm Earth) | 暖白底 + 砖红/赭石强调，东方自然美学。色彩来自泥土、陶器、茶叶、宣纸 |
| E · 动效理念 | E9 | 温和流动 (Gentle Flow) | 微妙、呼吸感、水一般的流动。动效像自然界的运动——流畅而不突兀 |
| F · 输出形态 | F1 | HTML Web | 默认 Web 交付，可演化为 Mobile/Brand 形态 |
| G · 文化语境 | G2 | 东亚 (East Asia) | CJK 排版规范（行高 ≥1.6、标点挤压、避头尾），东亚色彩语义 |

### A9 · 克制之美 — 在设计 Token 中的体现

- 无装饰阴影、无渐变背景、无填充色按钮
- 留白密度极高：大区块间距 `--space-24`（96px）起步
- 当觉得「间距是不是太大了」时，往往才是刚好

### B9 · 温暖极简 — 在设计 Token 中的体现

- 背景色为暖白 `#F2F0EB` 而非纯白 `#FFFFFF`
- 文字色为深炭色 `#3A3837` 而非纯黑 `#000000`
- 边框极细（1px），颜色为暖灰 `#E5E1DA` / `#C8C3BA`

### C9 · 温暖衬线 — 在设计 Token 中的体现

- 正文字体：`"EB Garamond", "Crimson Text", "Noto Serif SC", "Source Han Serif SC", serif`
- 展示字体：`"Lora", "Georgia", "Noto Serif SC", "Source Han Serif SC", serif`
- UI 标签使用无衬线回退：`"SF Pro Text", system-ui, "Noto Sans SC", "PingFang SC", sans-serif`
- 中文正文行高 `--leading-relaxed: 1.85`，英文 `--leading-loose: 2.0`

### D9 · 暖土调 — 在设计 Token 中的体现

- 暖白底色：`--color-bg-warm: #F2F0EB`（羊皮纸质感）
- 砖红强调：`--color-accent: #8B3525`（全页 ≤ 2 处）
- 深炭文字：`--color-text-primary: #3A3837`
- 禁止：高饱和蓝、绿、紫、橙；任何渐变色背景

### E9 · 温和流动 — 在设计 Token 中的体现

- 标准过渡：`--duration-base: 260ms`, `--ease-default: cubic-bezier(0.25, 0.1, 0.25, 1)`
- 进场动效：`--duration-slow: 420ms`, `--ease-out: cubic-bezier(0, 0, 0.2, 1)`
- 列表项 stagger：每项间隔 60ms
- 尊重 `prefers-reduced-motion`

### F1 · HTML Web — 在设计 Token 中的体现

- 响应式断点：Mobile < 640px / Tablet 640–1024px / Desktop > 1024px
- 内容宽度使用 `clamp()` 实现流体响应式
- 暗色模式通过 `@media (prefers-color-scheme: dark)` 自动切换

### G2 · 东亚 — 在设计 Token 中的体现

- CJK 行高 ≥ 1.6（正文 `--leading-relaxed: 1.85`）
- 中文展示大字使用 `--tracking-chinese: 0.1em` 舒展字距
- 字体栈中中文衬线回退：`"Noto Serif SC", "Source Han Serif SC"`
- 最小字号 12px，避免斜体强调（用字重/字号代替）

---

## 3. 演化框架 (Evolution Profiles)

文心不是单一冻结的设计——它是一种设计语言，可以在保持灵魂不变的前提下，演化为不同的输出形态和文化语境。

### 3.1 不变之魂 (Invariant Soul)

以下维度在文心的任何演化中 **不可改变**，改变即破坏文心身份：

- **A9 (克制之美)**: 克制哲学是文心的第一性原理，不可妥协
- **B9 (温暖极简)**: 温暖极简的视觉性格是文心的核心识别
- **D9 (暖土调)**: 暖土色调范围定义了文心的色彩边界——暖白底 + 砖红强调

### 3.2 可变之形 (Flexible Form)

以下维度可以针对不同语境进行适配：

- **F (输出形态)**: Web → Mobile App → Brand Identity，形态随容器而变
- **G (文化语境)**: 东亚 → 全球中性 → 本地化混合，语境随市场而变
- **C (排版节奏)**: 针对平台的微调（移动端需要更小的字号阶梯、更紧凑的行高）
- **E (动效理念)**: 平台特定的动效（移动端需要触觉反馈映射到温和流动）

### 3.3 演化配置 (Evolution Profiles)

#### 文心正典 (Canonical Wenxin)

- **F1 Web + G2 东亚**
- 完整的文心设计规范（参见 `design.md`）
- 响应式 Web，支持暗色模式
- 内容宽度：`--width-article` / `--width-content` / `--width-showcase`
- 排版节奏：中文行高 1.85，英文 2.0
- 点睛之色：砖红 `#8B3525`，全页 ≤ 2 处

#### 文心暗色 (Wenxin Dark)

- 灵魂不变，暗色优先的色彩映射
- 背景：暖暗色 `#1A1816`（而非简单反转纯黑）
- 文字：暖象牙白 `#E8E3DC`（而非纯白）
- 强调色：`#C4533E`（暗色下略亮，通过 OKLCH 保持感知亮度）
- 所有其他 Token 不变

#### 文心移动 (Wenxin Mobile)

- **F2 Mobile App + G2 东亚**
- 适配字号阶梯（移动端略小，但正文不低于 16px）
- 触控目标：≥ 44pt (iOS) / ≥ 48dp (Android)
- 平台特定的导航模式，同时保持文心灵魂
- 触觉反馈映射到温和流动动效理念
- 安全区域适配（刘海屏、灵动岛、底部手势条）
- 支持 Dynamic Type / Font Scaling

#### 文心品牌 (Wenxin Brand)

- **F3 Brand Identity**
- Logo 系统：朱砂印章（Cinnabar Seal）——砖红 `#8B3525` 实心底座 + 纯白负空间冲压
- 色彩提取：暖白 `#F2F0EB`、砖红 `#8B3525`、墨色 `#3A3837`
- 品牌标识符 `■`：8×8px（桌面）/ 6×6px（移动端），砖红色，呼吸动效（4s 周期）
- 多尺度 Logo 变体（favicon → 户外广告）
- 品牌字体：Lora / EB Garamond / Noto Serif SC
- 印刷 CMYK 色值定义（品牌指南文档）

#### 文心书卷 (Wenxin Print)

- **F4 Print & Editorial + G2 东亚**
- 适用场景：书籍、学术论文、杂志、诗歌、独立出版物 (Zine)、信头纸
- 关键适配：
  - **pt 单位**：印刷使用 pt（点）而非 rem，1pt = 1/72 英寸
  - **CMYK 映射**：RGB 色值转换为印刷 CMYK 色值，砖红建议使用专色（Spot Color）
  - **Van de Graaf 版面**：经典版面比例，内边距:外边距 = 2:3（对开页）
  - **E8 印刷静止**：无动效、无交互状态、无暗色模式，所有视觉层级通过静态排版实现
- 交付物：
  - Print CSS（`@page` 规则、奇偶页处理、出血 3mm / 安全区域 5mm）
  - 印刷字号阶梯：10 级（7pt ~ 48pt），Major Third 比例
  - CMYK 色值映射表：9 色完整映射（HEX → CMYK → PANTONE 近似）
  - 标准页面尺寸：A5 / B5 / A4 / Letter / 16K
  - 印刷特有组件：首字下沉、页眉、页码、脚注、结尾装饰

#### 文心文档 (Wenxin Documentation)

- **F6 Documentation + G2 东亚**
- 适用场景：API 文档、知识库、Wiki、开发者指南、技术博客、内部手册
- 关键适配：
  - **双栏布局**：侧边栏 240px（固定）+ 内容区（`--width-article`），桌面端双栏 / 移动端抽屉式
  - **暖色调语法高亮**：禁止冷色调（蓝/绿/紫），使用棕/金/红/灰暖色方案
  - **文档特有组件**：侧边栏导航、搜索栏（Cmd/Ctrl+K）、增强代码块（标题栏/复制按钮/行号）、提示框（5 种类型）、版本选择器、目录（滚动跟踪）
  - **E9 极简动效**：仅保留必要的状态切换动效（侧边栏展开/折叠、搜索结果淡入、代码复制按钮）
- 交付物：
  - 文档模板（双栏布局 + 响应式策略）
  - 侧边栏导航组件（240px，当前项 accent 标记，可折叠组）
  - 增强代码块（暖色调语法高亮，亮色 + 暗色双模式）
  - 提示框组件（tip / warning / danger / info / note）
  - 行内代码 Token（`--text-code: 0.875em`）

#### 文心演示 (Wenxin Presentation)

- **F5 Presentation + G2 东亚**
- 适用场景：路演演示 (Pitch Deck)、会议演讲 (Conference Talk)、课堂讲座 (Lecture)、内部汇报 (Internal Presentation)、产品发布 (Product Launch)
- 关键适配：
  - **16:9 画布**：标准 1920×1080，安全区域 ≥ 5% 画布边缘
  - **展示优先字号**：8 级阶梯（14px ~ 88px），Major Third 比例，确保远距离可读性
  - **幻灯片组件系统**：7 种幻灯片类型（标题 / 章节分隔 / 纯文字 / 文字+图片 / 引用 / 结尾 / 演讲者备注）
  - **构建动画**：渐显 (Fade In)、上移渐显 (Fade Up)、列表渐显 (Stagger 60ms)
  - **演讲者备注**：独立区域，不显示在投影中，`--font-ui` · `--text-sm`
- 交付物：
  - HTML/CSS 幻灯片框架（16:9 固定比例，键盘导航 ←→，演讲者备注窗口）
  - 6 种幻灯片类型布局规范（标题 ≤ 30 字，正文 ≤ 80 字）
  - 幻灯片切换动效（淡入淡出 420ms / 推入 420ms / 无切换 0ms）
  - 亮色 / 暗色 / 强调三种幻灯片模式（强调模式全演示 ≤ 1 张）

#### 文心海报 (Wenxin Poster)

- **F7 Poster & Cover + G2 东亚**
- 适用场景：活动海报、书籍封面、专辑封面、数字横幅、宣传单页、展览海报
- 关键适配：
  - **单页画布**：最强单页表达——一个视觉锚点抓住注意力，其余皆为留白
  - **多比例支持**：6 种画布比例（2:3 / 3:4 / 1:1 / 16:9 / 4:3 / A 系列 ISO 216）
  - **4 种构图模式**：居中对称 / 左对齐 / 对角分布 / 全出血文字
  - **展示优先字号**：10 级阶梯（12px ~ 192px），Major Third 比例，比 F5 演示更大
  - **Accent 放宽**：标题可使用 accent（海报的"点睛"），标题 + 署名各 1 处 = ≤ 2 处
  - **E8/E9 双模式**：印刷海报静止（E8），数字海报单次进场动画（E9）
- 交付物：
  - HTML/CSS 海报模板（6 种画布比例）
  - 4 种构图模式布局规范（居中对称 / 左对齐 / 对角分布 / 全出血文字）
  - 海报字号阶梯：10 级（0.75rem ~ 12rem），Major Third 比例
  - 安全区域与出血规范（印刷 3mm / 数字 ≥ 8% 安全边距）
  - 单页 accent 使用规则（标题 + 署名 ≤ 2 处）

#### 文心图解 (Wenxin Diagram)

- **F8 Diagram & Knowledge Map + G2 东亚**
- 适用场景：架构图、流程图、知识地图、概念关系图、方法论框架图
- 关键适配：
  - **关系即界面**：文字、线条、节点和留白共同构成解释界面
  - **SVG/HTML 独立交付**：图解本身是交付物，不依赖文档站或演示文稿
  - **Mermaid 重绘**：可将 Mermaid 源转译为文心 SVG，禁用默认彩虹色块和粗黑箭头
  - **拓扑审计**：线条不穿字、节点间距充足、关系方向 3 秒内可识别
- 交付物：
  - HTML/SVG 单文件图解
  - 图解类型声明：architecture / flow / knowledge-map / framework
  - Render Contract：`profile: F8`、`canvas.kind: diagram`、`diagram.type`、`nodes.count`、`edges.count`

#### 文心报告 (Wenxin Report)

- **F9 Report & LaTeX Typesetting + G2 东亚**
- 适用场景：研究报告、策略报告、白皮书、项目复盘、分析文档
- 关键适配：
  - **论证即界面**：摘要、问题、方法、发现、证据、结论、建议构成阅读路径
  - **LaTeX/PDF 主路径**：Markdown → Wenxin Report LaTeX → PDF，HTML 仅作预览或辅助
  - **区别于 F4**：F4 是出版内页排版，F9 是判断型报告排版编译
  - **区别于 Dashboard**：F9 只处理少量关键数据与证据，不做实时密集数据面板
- 交付物：
  - Markdown frontmatter schema
  - LaTeX/PDF target 声明与 XeLaTeX 排版约定
  - 核心章节：Executive Summary / Findings / Recommendations
  - Render Contract：`profile: F9`、`source.format: markdown`、`target.format: latex-pdf`、`report.sections`

### 3.3.1 形态上限 (Form Limit)

文心正式输出形态固定为 F1-F9，不再继续扩张。Newsletter/Email、Form/Wizard、Social Cards/Carousel、Dashboard、电商、游戏、复杂 3D 展示、重 CRM 不进入正式形态。

### 演化审计规则 (Evolution Audit Rules)

创建文心演化版本时，必须遵循以下流程：

1. **声明可变维度**：明确哪些维度正在被调整（仅限「可变之形」中的维度）
2. **说明调整理由**：对每个被调整的维度，解释为什么需要调整以及如何调整
3. **执行 34 条美学审计**：对照 `modern-aesthetics.md` 中的 5 大类 34 条准则逐项检查
4. **确保不变之魂完整**：A9、B9、D9 三个维度必须保持原值，不可妥协
5. **Token 派生原则**：所有演化版本的 Token 值必须从文心正典派生，不可独立发明新色值或新字号

---

## 4. 设计 Token 索引 (Design Token Index)

以下是文心设计语言的核心 Token 快速参考。详细值定义参见 `design.md` 和各子规范文件。

### 色彩 (Color)

| Category | Token | 亮色模式 | 暗色模式 |
|----------|-------|----------|----------|
| Background | `--color-bg-warm` | `#F2F0EB` | `#1A1816` |
| Background | `--color-bg-base` | `#FAFAF8` | `#201E1B` |
| Background | `--color-bg-pure` | `#FFFFFF` | `#242220` |
| Background | `--color-bg-subtle` | `#F0EDE7` | `#2A2724` |
| Text | `--color-text-primary` | `#3A3837` | `#E8E3DC` |
| Text | `--color-text-secondary` | `#888580` | `#8A857D` |
| Text | `--color-text-muted` | `#B0ABA4` | `#5A5550` |
| Text | `--color-text-heading` | `#2C2B29` | `#F0EBE3` |
| Accent | `--color-accent` | `#8B3525` | `#C4533E` |
| Accent | `--color-accent-hover` | `#A84030` | `#D9614A` |
| Accent | `--color-accent-subtle` | `#F5E8E5` | `#2E1A16` |
| Border | `--color-border-subtle` | `#E5E1DA` | `#2E2B27` |
| Border | `--color-border-strong` | `#C8C3BA` | `#403C37` |
| Interaction | `--color-link` | `#3A3837` | `#E8E3DC` |
| Interaction | `--color-link-hover` | `#8B3525` | `#C4533E` |
| Focus | `--color-focus` | `rgba(139, 53, 37, 0.4)` | `rgba(196, 83, 62, 0.4)` |

### 字体 (Typography)

| Category | Token | Value |
|----------|-------|-------|
| Display Serif | `--font-display` | `"Lora", "Georgia", "Noto Serif SC", "Source Han Serif SC", serif` |
| Body Serif | `--font-body` | `"EB Garamond", "Crimson Text", "Noto Serif SC", "Source Han Serif SC", serif` |
| UI Sans | `--font-ui` | `"SF Pro Text", system-ui, "Noto Sans SC", "PingFang SC", sans-serif` |
| Monospace | `--font-mono` | `"JetBrains Mono", "Fira Code", "SF Mono", monospace` |

### 字号阶梯 (Type Scale)

| Token | Value | 用途 |
|-------|-------|------|
| `--text-xs` | `0.694rem` (~11px) | 极小标注、版权 |
| `--text-sm` | `0.833rem` (~13px) | 元数据、标签、面包屑 |
| `--text-base` | `1rem` (16px) | 基准 |
| `--text-md` | `1.0625rem` (17px) | 正文阅读推荐 |
| `--text-lg` | `1.25rem` (20px) | 摘要、小节引导 |
| `--text-xl` | `1.5rem` (24px) | h3 |
| `--text-2xl` | `1.875rem` (30px) | h2 |
| `--text-3xl` | `2.25rem` (36px) | h1、文章标题 |
| `--text-4xl` | `3rem` (48px) | 导航大字、章节 |
| `--text-5xl` | `4.5rem` (72px) | 品牌/英雄区 |

### 行高与字距 (Leading & Tracking)

| Token | Value | 用途 |
|-------|-------|------|
| `--leading-tight` | `1.25` | 大号展示标题 |
| `--leading-snug` | `1.45` | 小标题、UI 元素 |
| `--leading-normal` | `1.6` | 列表项、辅助文字 |
| `--leading-relaxed` | `1.85` | 中文正文阅读 |
| `--leading-loose` | `2.0` | 英文长文阅读 |
| `--tracking-tight` | `-0.02em` | 大号展示标题微收紧 |
| `--tracking-normal` | `0` | 默认字距 |
| `--tracking-wide` | `0.05em` | 标签、元数据 |
| `--tracking-wider` | `0.15em` | 英文全大写标注 |
| `--tracking-chinese` | `0.1em` | 中文展示大字舒展 |

### 间距 (Spacing) — 基于 4px 网格

| Token | Value | 典型用途 |
|-------|-------|----------|
| `--space-1` | `4px` | 极细间隙 |
| `--space-2` | `8px` | 图标与文字间距 |
| `--space-3` | `12px` | 表格单元格、小标签内边距 |
| `--space-4` | `16px` | 引用块/代码块内边距、按钮内边距 |
| `--space-5` | `20px` | **正文段落间距** |
| `--space-6` | `24px` | 列表项间距、面包屑 |
| `--space-8` | `32px` | 标题与下方正文 |
| `--space-10` | `2.5rem` | 40px |
| `--space-12` | `48px` | h3 与上方内容 |
| `--space-16` | `64px` | h2 与上方内容、小区块间距 |
| `--space-24` | `96px` | **大区块间距** |
| `--space-32` | `128px` | 页面顶部 padding |

### 内容宽度 (Content Width)

| Token | Value | 用途 |
|-------|-------|------|
| `--width-article` | `clamp(520px, 55vw, 640px)` | 纯阅读型正文 |
| `--width-content` | `clamp(620px, 65vw, 760px)` | 内容列表型 |
| `--width-showcase` | `clamp(700px, 72vw, 920px)` | 展示型页面 |
| `--padding-page-x` | `clamp(20px, 5vw, 72px)` | 页面水平内边距 |

### 动效 (Motion)

| Token | Value | 用途 |
|-------|-------|------|
| `--duration-instant` | `80ms` | 即时反馈（checkbox/toggle） |
| `--duration-fast` | `180ms` | 颜色/透明度过渡 |
| `--duration-base` | `260ms` | 标准交互（hover/展开） |
| `--duration-slow` | `420ms` | 进场、重要状态变化 |
| `--duration-crawl` | `600ms` | 特殊仪式感动效 |
| `--ease-default` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | 通用缓动 |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | 进场（先快后慢） |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | 退场（先慢后快） |

### 图标 (Icons)

| Token | Value | 用途 |
|-------|-------|------|
| `--icon-sm` | `16px` | 行内文字配图 |
| `--icon-md` | `20px` | 标准 UI 元素 |
| `--icon-lg` | `24px` | 独立功能图标 |

---

## 5. 参考文件 (Reference Files)

| 文件 | 内容 |
|------|------|
| `.opencode/agents/wenxin/design.md` | 核心设计规范（哲学/色彩/字体/间距/动效摘要/排版/响应式/无障碍/禁止清单） |
| `.opencode/rules/motion-spec.md` | 文心动效源规范（春雨润物、细节有声、静态与运行时审计边界） |
| `.opencode/agents/wenxin/brand.md` | 品牌标识规范（品牌标识符 `■` / 朱砂印章 Logo / Logo 禁止清单） |
| `.opencode/agents/wenxin/components.md` | 组件规范（链接/按钮/表单/代码/图片/表格/标签/面包屑/焦点态/图标系统/页面原型） |
| `.opencode/agents/wenxin/diagrams.md` | 图表规范（Mermaid 转 SVG 的编辑质感图表规则） |
| `.opencode/agents/wenxin/conventions.md` | SVG 绘图规范（通用约定/线条绘制/色彩映射/绘图原则） |
| `.opencode/agents/wenxin/print.md` | F4 印刷排版规范 |
| `.opencode/agents/wenxin/documentation.md` | F6 文档站规范 |
| `.opencode/agents/wenxin/presentation.md` | F5 演示文稿规范 |
| `.opencode/agents/wenxin/poster.md` | F7 海报/封面规范 |
| `.opencode/rules/modern-aesthetics.md` | 34 条当代美学准则（一致性/当代性/比例与层次/文化敏感度/无障碍） |
| `.opencode/rules/audit-protocol.md` | 美学审计流程（6 步审计闭环） |

---

> Version: 1.0.0 | 2026-05-20
