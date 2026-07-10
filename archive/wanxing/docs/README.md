# 万形 · 九形态成品示例

> 文字即界面，留白即设计，克制即力量。

## 关于万形

**万形 (Wanxing)** 是围绕**文心 (Wenxin)** 设计语言构建的 OpenCode 设计工程。文心是一套以「温暖极简」为核心气质的东方设计范式——暖白底色、衬线字体、砖红点睛、春雨般的动效，所有决策服务于同一目标：让用户最自然、最安静地进入内容。

### 设计哲学

文心由两层结构组成：

| 层次 | 内容 | 可变性 |
|------|------|--------|
| **灵魂层** | A9 克制之美 · B9 温暖极简 · D9 暖土调 | 不可变 |
| **形态层** | F1–F9 输出形态 · C 排版节奏 · E 动效强度 | 随场景演化 |

水在杯子里是杯子的形，在河道里是河道的形——本质不变，容器不同。文心在 Web 上是网站，在手机上就是 App，在海报上就是单页视觉，但那份「说不出的舒服」始终如一。

### 色彩系统

```
暖白底 #F2F0EB  ·  深炭字 #3A3837  ·  砖红点睛 #8B3525  ·  全页强调 ≤ 2 处
```

### 字体系统

```
展示衬线: Lora → Georgia → Noto Serif SC
正文衬线: EB Garamond → Crimson Text → Noto Serif SC
UI 无衬线: SF Pro Text → system-ui → PingFang SC
等宽: JetBrains Mono → Fira Code → SF Mono
```

---

## 九种形态

每个目录包含一个独立的 `index.html`，可在浏览器中直接打开。所有形态共享文心灵魂，但在布局、组件和交付格式上各有侧重。

### F1 · 文心正典 — HTML Web

📁 `wanxing-f1-web/`

响应式网站、博客、作品集、Landing Page。单列居中布局，`clamp()` 流体宽度，暗色模式自动切换，移动端至桌面端三断点适配。这是文心最完整的表达形态，也是其他形态的基准。

### F2 · 文心移动 — Mobile App

📁 `wanxing-f2-mobile/`

原生/混合移动应用适配。触控目标 ≥ 48pt，安全区域适配（刘海屏/灵动岛），底部导航栏，平台弹簧物理与文心缓动结合。字号阶梯针对小屏微调，正文不低于 16px。

### F3 · 文心品牌 — Brand Identity

📁 `wanxing-f3-brand/`

品牌视觉识别系统。核心是「朱砂印章」Logo——砖红实心底座 + 纯白负空间冲压，搭配品牌标识符 `■`（8×8px 呼吸动效）。包含 Logo 多尺度变体、色彩规范、字体系统、名片/信头纸设计。

### F4 · 文心书卷 — Print & Editorial

📁 `wanxing-f4-print/`

书籍、论文、杂志、Zine 的印刷内页排版。使用 pt 单位，Van de Graaf 经典版面，CMYK 色彩映射，砖红建议使用专色。E8 印刷静止——无动效、无交互、无暗色模式，所有层级通过静态排版实现。

### F5 · 文心演示 — Presentation

📁 `wanxing-f5-presentation/`

路演、演讲、课堂讲座的幻灯片。16:9 固定画布（1920×1080），展示优先字号（14px–88px），6 种幻灯片类型，构建动画（渐显/上移渐显/列表渐显），支持亮色/暗色/强调三种模式。每张标题 ≤ 30 字。

### F6 · 文心文档 — Documentation

📁 `wanxing-f6-documentation/`

API 文档、知识库、Wiki、技术手册。240px 侧边栏 + 内容区双栏布局，暖色调语法高亮（棕/金/红/灰，禁止冷色），增强代码块（标题栏/复制/行号），5 种提示框，滚动跟踪目录。

### F7 · 文心海报 — Poster & Cover

📁 `wanxing-f7-poster/`

活动海报、书籍封面、宣传单页。6 种画布比例（2:3 / 3:4 / 1:1 / 16:9 / 4:3 / A 系列），4 种构图模式（居中对称/左对齐/对角/全出血），展示优先字号（12px–192px）。单页 accent ≤ 2 处，其余皆为留白。

### F8 · 文心图解 — Diagram & Knowledge Map

📁 `wanxing-f8-diagram/`

架构图、流程图、知识地图、概念关系图。SVG/HTML 独立交付，线条 1px，节点暖白底，accent 仅标记结构焦点（原点/终点/核心闭环）。可替代 Mermaid 默认彩虹色块方案，转换为文心克制风格。

### F9 · 文心报告 — Report & LaTeX

📁 `wanxing-f9-report/`

研究/策略报告的排版编译。主路径：Markdown → XeLaTeX → PDF，HTML 仅作预览。核心章节：Executive Summary / Findings / Recommendations，图表服务论证而非装饰，accent ≤ 2 类用途。

---

## 快速使用

每个形态的 HTML 文件可独立在浏览器中打开：

```bash
# 在项目根目录启动本地服务器
WANXING_ROOT=. just serve

# 然后访问对应形态
open http://localhost:8000/examples/wanxing-f1-web/index.html
```

所有文件为单文件交付（HTML + 内联 CSS），无外部依赖。

---

## 设计 Token 速查

| 类别 | Token | 亮色 | 暗色 |
|------|-------|------|------|
| 背景 | `--color-bg-warm` | `#F2F0EB` | `#1A1816` |
| 文字 | `--color-text-primary` | `#3A3837` | `#E8E3DC` |
| 点睛 | `--color-accent` | `#8B3525` | `#C4533E` |
| 边框 | `--color-border-subtle` | `#E5E1DA` | `#2E2B27` |
| 动效 | `--duration-slow` | `420ms` | — |
| 正文 | `--leading-relaxed` | `1.85` (CJK) | — |
| 内容宽 | `--width-article` | `clamp(520px, 55vw, 640px)` | — |

---

> 文心不是「一套 UI 组件库」，而是一种让内容自己说话的设计态度。
