# 形态 × 决策对照表 · Form × Decision Matrix

> 属于 [spec](../README.md) 形态层 — Form layer
> 提炼自 `archive/wanxing/.opencode/rules/output-formats.md`（2630 行，commit `93fba710`）。
> **只取决策，不搬正文**——正文在 `f1-web.md` … `f9-report.md` 里按新标准重写。

这张表回答一个问题：**同一个灵魂进入九个容器，各自被迫做了哪些不同的决定。**
它是九份形态规范的骨架，也是审计器按形态分派规则集的依据。

This table answers one question: *when the same soul enters nine containers, which decisions is each forced to make differently.*

---

## 一、身份与边界 · Identity & Boundaries

| | 形态 | 交付物 Primary artifact | 存在理由 Reason to exist | 与谁最容易混淆 |
|---|---|---|---|---|
| **F1** | Web | 响应式 HTML 站点 | 可浏览、可链接的内容 | F6（F1 是内容，F6 是被检索的知识） |
| **F2** | Mobile | iOS/Android 应用界面 | 拇指可达的原生体验 | F1（F2 有平台惯例与触觉） |
| **F3** | Brand | Logo 系统、品牌手册 | 定义"我是谁" | F4（F3 定义品牌，F4 定义品牌怎么排） |
| **F4** | Print | 书籍/期刊内页 PDF | 出版级静态排版 | F9（F4 是出版系统，F9 是判断型报告） |
| **F5** | Presentation | 16:9 幻灯片 | 现场讲述的节奏 | F7（F5 是多页叙事，F7 是单页传播） |
| **F6** | Documentation | 可搜索文档站 | 可导航、可检索的知识 | F1（F6 有侧栏、搜索、版本） |
| **F7** | Poster | 单页强视觉画布 | 一眼抓住的传播 | F3（F7 是应用，F3 是识别系统） |
| **F8** | Diagram | 独立图解 SVG/HTML | 用拓扑解释结构 | F5（F8 求结构可读，F5 求演讲节奏） |
| **F9** | Report | Markdown→XeLaTeX→PDF | 论证：证据到建议 | F4（F9 强调判断，不承担出版系统） |

**清单在 F9 处封闭**。Dashboard、电商、游戏、CRM、邮件通讯不在范围内 —— 是设计上的排除，不是遗漏。

---

## 二、画布与布局 · Canvas & Layout

| | 画布 | 内容宽度 | 栅格 | 关键布局决策 |
|---|---|---|---|---|
| **F1** | 流体，响应式 | `--width-article/content/showcase` 三档 `clamp()` | 12 列，gutter `--space-4` | 单列居中为主；Hero 全宽底色但内容仍受约束 |
| **F2** | 393×852 基准 | 全宽减安全区 | 4px 网格，与 Web 一致 | `env(safe-area-inset-*)` 避让刘海与 Home 条 |
| **F3** | 随载体而变 | — | — | 不定版式，定的是标识本身与最小留白 |
| **F4** | A5/B5/A4/Letter/16K | Van de Graaf 版面 | 顶:底:内:外 = 2:3:3:2 | 奇偶页镜像边距；出血 3mm，文字距裁切 ≥5mm；装订侧 ≥20mm |
| **F5** | **16:9 固定** 1920×1080 | 距边 5%，上下 8% | 12 列，gutter 24px | 标题占上 1/3，内容占下 2/3；页码右下距边 3% |
| **F6** | 流体，双栏 | `--width-article`，代码块可溢到 `--width-content` | — | 侧栏 240px 固定；`--header-height` 56px |
| **F7** | **多比例**：2:3 3:4 1:1 16:9 4:3 + A 系列 | 满画布 | — | 四种构图：居中对称 / 左对齐 / 对角分布 / 全出血文字 |
| **F8** | 自适应，`ratio: auto` | — | — | 节点与连线必须物理分离，线不穿文字；宁可拉长也不挤 |
| **F9** | A4/Letter | `--width-report` `clamp(640px,58vw,780px)` | — | 宽松页边距；PDF 不铺底色，用纸张本色 |

---

## 三、字体决策 · Typography

| | 字号基准 | 阶梯 | 特殊决策 |
|---|---|---|---|
| **F1/F6** | `rem`，正文 `--text-md` | Major Third 1.250 | 衬线正文，无衬线仅用于 UI 标签/元数据 |
| **F2** | `pt`/`sp`，正文 **≥16px** | 8 级（caption→display） | 必须支持 Dynamic Type |
| **F4** | **`pt`** | **10 级：7 / 8.5 / 10 / 11 / 13 / 16 / 20 / 26 / 36 / 48pt** | 行高 5 级：1.2 / 1.35 / 1.5 / 1.8 / 1.9 |
| **F5** | `vw`/`vh` 相对画布 | 展示优先，标题 `--text-5xl` 起 | 正文 `--text-lg` 起，要能从后排看清 |
| **F7** | 相对画布 | **展示优先，极大字号** | 中文标题字距舒展 `0.1em` |
| **F9** | `pt` | 复用 F4 印刷阶梯 | 标题/正文衬线，元数据无衬线 |

---

## 四、色彩与 accent 预算 · Color & Accent Budget

| | accent 预算 | 暗色模式 | 色彩特殊决策 |
|---|---|---|---|
| **F1** | ≤2 处/页 | **必须** | — |
| **F2** | ≤2 处/屏 | **必须**（跟随系统） | Tint `#8B3525` 亮 / `#C4533E` 暗；**不跟随 Material You** |
| **F3** | 定义者 | 提供映射 | 完整 HEX/RGB/**CMYK/PANTONE** 映射 |
| **F4** | ≤2 类用途 | **禁止**（印刷无暗色） | CMYK 9 色映射；专色可选 |
| **F5** | ≤2 处/页 | 三种模式：light / dark / accent | 分隔页编号旁的 ■ 算 accent 第二次出现 |
| **F6** | ≤2 处/页 | **必须** | 语法高亮暖调；admonition 五级语义色 |
| **F7** | **规则不同**：标题 1 + 署名 1 | 暖白底或暖暗底 | **标题可用 accent —— 这是海报的点睛**，Web 形态不允许 |
| **F8** | ≤2 处/全图 | 底色 `#F2F0EB` 或透明 | 只标记原点、终点或核心闭环；节点底 `#FAFAF8` |
| **F9** | ≤2 类用途 | 无（纸张本色） | 只用于封面标识、关键引文、极少数结论标记 |

**F7 是唯一一处 accent 规则被形态改写的地方**，且原文给了理由：单页画布的"全页"语义与滚动页面不同。这不是违规，是形态层对灵魂层的合法适配 —— 但必须显式声明。

---

## 五、动效强度 · Motion Intensity

| 强度 | 含义 | 形态 |
|---|---|---|
| **E8** 印刷静止 | 无 transition / animation / hover / focus 态，无暗色模式 | **F4**；F7 印刷海报 |
| **E9-0** 静水 | 仅必要的状态反馈，无进场动画 | **F9**；F6 倾向克制 |
| **E9-1** 春雨 | 单次进场 fade-up 420ms，stagger 60ms，无循环 | **F1** **F6**；F7 数字海报 |
| **E9-2** 微澜 | 允许品牌标识 4s 呼吸循环 | **F3**；F5 换页 |

- **F2 例外**：移动端必须有触控反馈（视觉 + 触觉），push/pop 420ms `--ease-out`，Sheet 420ms。E8 在 F2 上不可接受 —— 这正是 `aesthetics.md` C-4「动效-交互一致」准则点名的情况。
- **F5**：换页过渡，不做元素级花哨动画。
- **F8**：图解静态；若为交互式，仅高亮路径。

> 这张表关掉了 `render-contract.md` 自己承认的未知（「E9 代号定义找不到」），也解释了 `cross-form-matrix.md` 标为"不一致"的 F4 vs F9 —— **它们本就应该不同**：F4 是印刷静止，F9 是静水，两个不同的强度等级。

---

## 六、组件负担 · Component Load

| | 必须的组件 | 明确不要的 |
|---|---|---|
| **F1** | nav crumbs btn input table tag entry quote code figure pager | 卡片容器、填充按钮（主提交除外）、FAB |
| **F2** | 底部导航(3–5 Tab) 导航栈 Sheet 列表 输入 触控反馈 | **FAB**、模态堆叠、Large Title |
| **F3** | logo 变体、名片、信头、品牌手册版式 | — |
| **F4** | 首字下沉、页眉页码、脚注、结尾装饰、print CSS | 所有交互态、暗色模式 |
| **F5** | 7 种幻灯片类型、页码、分隔页 | 元素级动画、圆点列表标记（用短横线） |
| **F6** | **侧栏 TOC 搜索 代码块 admonition 上下篇** | — |
| **F7** | 标题组、署名组、画幅框 | 一切非必需元素 |
| **F8** | 节点、连线、分组边界、标题+编辑型引语 | Mermaid 默认彩虹色、粗黑箭头、装饰图标、裸流程图 |
| **F9** | 封面、摘要、图表编号+caption、脚注、引用、附录 | Dashboard 图表、模板化封面、装饰性分隔页 |

**F6 组件负担最重** —— 它会一次性暴露约 70% 的组件库需求，因此是组件设计与新示例的第一个目标。

---

## 七、最小可交付物 · Minimum Deliverable

每个形态在原文里都有一份 checklist。共性抽取如下，差异见各形态文件：

**九形态共有**
- [ ] Render Contract 声明 `profile: FN` 且与 `data-wanxing-profile` 一致
- [ ] accent 预算未超
- [ ] 通过渲染审计
- [ ] 无障碍底线（对比度、焦点态、键盘可达）—— 见 `../tracks.md` 第一层

**形态独有的硬性项**
| | 硬性项 |
|---|---|
| F2 | 触控目标 ≥48pt；安全区适配；Dynamic Type；VoiceOver/TalkBack |
| F4 | 10 级 pt 阶梯；CMYK 映射；Van de Graaf 版面；奇偶页规则；`@media print` |
| F5 | 16:9 声明；7 种幻灯片类型齐备 |
| F6 | 侧栏 + TOC + 搜索三件套 |
| F8 | 图解类型声明；节点/连线计数；线不穿文字 |
| F9 | Markdown frontmatter schema；LaTeX/PDF target 声明；摘要/发现/建议三章节必备 |

---

## 八、本表带出的、需在 `DECISIONS.md` 里显式判定的问题

1. **F7 的 accent 例外**如何在审计器里表达 —— 走 `allowedDeviations` 还是按形态分派不同预算？
2. **F4 与 F7 印刷版共用 E8**，但 F7 数字版是 E9-1 —— 同一形态两种强度，契约里需要一个字段区分交付介质。
3. 原文 F1 §5.4 标题写着「卡片 (Cards)」而正文在禁止卡片 —— **标题本身就是需要修掉的措辞**，新写时不得沿用。
4. F2 的「卡片 `--space-6`」措辞同样需要按 `wx-entry` 的新命名重写。
