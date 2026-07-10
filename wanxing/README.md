# 万形 · Wanxing — 设计形态参考

> 万种形态，同出一源。Ten thousand forms, one source.
> 以文心为地基 — Built on the Wenxin foundation.

---

## 这是什么 · What this is

**wanxing/** 是 [`wenxin/`](../wenxin/README.md) 规范在具体场景下的**形态参考**——回答「网页/移动端/品牌/印刷/演示/文档/海报/图解/报告，具体应该长什么样」。

**wanxing/** is the **form reference** for how the [`wenxin/`](../wenxin/README.md) spec plays out in concrete scenarios — it answers *what a specific web page, mobile screen, brand system, print layout, slide deck, docs site, poster, diagram, or report should actually look like*.

按水的原则（见 [`wenxin/README.md`](../wenxin/README.md#水的原则--the-water-principle)）：wenxin 是「灵魂」，永远不变；wanxing 是「形」，随场景而化。同一份色彩/字体/间距/动效 token，流入九种不同的输出形态，但分子不变。

Per the water principle (see wenxin's README): wenxin is the "soul," unchanging; wanxing is the "form," shaped by context. The same color/type/spacing/motion tokens flow into nine different output forms, but the molecule never changes.

本目录里所有 HTML/CSS/JSX 参考示例都已从 `archive/` 复制到 [`examples/`](./examples/) 下，自成一体——不依赖 `archive/` 目录，`archive/` 保持原样不动。

Every HTML/CSS/JSX reference example in this directory has been copied from `archive/` into [`examples/`](./examples/) — self-contained, with no dependency on `archive/`, which remains untouched.

---

## F1–F9 · 九种正式输出形态（封闭清单）Nine Formal Output Forms (Closed List)

| | 形态 Form | 覆盖 Covers | 状态 Status |
|---|---|---|---|
| **F1** | 文心正典 · HTML Web | 响应式网站、博客、Landing Page、作品集 responsive sites, blogs, landing pages, portfolios | ✅ 完整实例 full instance — Hugo 主题 + React UI kit |
| **F2** | 文心移动 · Mobile App | iOS/Android 原生感适配 iOS/Android native-feel | ✅ 完整实例 full instance |
| **F3** | 文心品牌 · Brand Identity | 朱砂印章 Logo 体系、名片、品牌手册 logo system, stationery, brand book | ✅ 完整实例 full instance |
| **F4** | 文心书卷 · Print & Editorial | 书籍、期刊、杂志、Zine（pt 单位、CMYK）books, journals, zines | ✅ 完整实例 full instance |
| **F5** | 文心演示 · Presentation | 16:9 幻灯片（展示优先字号）16:9 slide decks | ✅ 完整实例 full instance |
| **F6** | 文心文档 · Documentation | API 文档、Wiki、知识库（240px 侧边栏）docs, wikis, knowledge bases | ✅ 完整实例 full instance |
| **F7** | 文心海报 · Poster & Cover | 单页强视觉（6 种比例）single-page, 6 canvas ratios | ✅ 完整实例 full instance |
| **F8** | 文心图解 · Diagram | 架构图/流程图/知识地图 architecture/flow/knowledge maps | ✅ 完整实例 full instance |
| **F9** | 文心报告 · Report & LaTeX | Markdown → XeLaTeX → PDF 判断型报告 judgment-oriented reports | ✅ 完整实例 full instance |

**清单在 F9 处封闭 The list is closed at F9.** Newsletter、Dashboard、电商、游戏、CRM 明确不在范围内——不要为这些场景扩展这套语言。

Newsletter, dashboards, e-commerce, games, CRM are explicitly **out of scope**. Do not stretch this language to cover them.

> **关于「已有实例」的说明 A note on "existing instances":** 早前的一份整理（`archive/Wanxing · Wenxin Design System` 技能包快照）只导出了 F1/F3/F5/F6 四种形态的 HTML/React 示例，让人误以为其余形态只有规范文字。实际上源项目 `archive/wanxing/docs/` 下 **F1–F9 全部九种形态都有完整的渲染示例**（每份 472–1790 行，带完整的 render-contract 元数据），只是技能包快照没有把全部九份都收进去。本次整理已把全部九份示例复制进 [`examples/`](./examples/)。

> An earlier snapshot (the `archive/Wanxing · Wenxin Design System` skill-package export) only carried over HTML/React examples for F1/F3/F5/F6, giving the impression the rest were spec-only. In fact, the source project's `archive/wanxing/docs/` has **complete rendered examples for all nine forms** (472–1790 lines each, with full render-contract metadata) — the skill-package snapshot just didn't carry all nine over. This reorganization copies all nine into [`examples/`](./examples/).

---

## 文件索引 · File Index

| 文件 File | 内容 Content |
|---|---|
| [`how-to-use.md`](./how-to-use.md) | **给 AI 看的操作闭环**——理解需求→决策确认→执行→交付前自审→反馈处理 **The operating loop for an AI agent** — clarify → confirm → execute → self-audit → handle feedback |
| [`render-contract.md`](./render-contract.md) | 跨 F1–F9 共用的机器可读元数据合同（`wanxing-render-contract` JSON schema）Shared machine-readable metadata contract across all nine forms |
| [`cross-form-matrix.md`](./cross-form-matrix.md) | 同一条灵魂层规则在九种形态里分别怎么体现的对照表 How the same soul-layer rule manifests differently across all nine forms |
| [`page-archetypes.md`](./page-archetypes.md) | 页面原型 A–E（阅读/列表/展示/着陆/工具型）——跨内容类型的布局模式，主要应用于 F1/F6 Page archetypes A–E, layout patterns cutting across content types |
| [`f1-web.md`](./f1-web.md) | F1 网页 Web |
| [`f2-mobile.md`](./f2-mobile.md) | F2 移动端 Mobile |
| [`f3-brand.md`](./f3-brand.md) | F3 品牌识别 Brand Identity |
| [`f4-print.md`](./f4-print.md) | F4 印刷排版 Print & Editorial |
| [`f5-presentation.md`](./f5-presentation.md) | F5 演示文稿 Presentation |
| [`f6-documentation.md`](./f6-documentation.md) | F6 文档站 Documentation |
| [`f7-poster.md`](./f7-poster.md) | F7 海报（含小红书卡片版式变体）Poster (incl. Xiaohongshu card variant) |
| [`f8-diagram.md`](./f8-diagram.md) | F8 图解（含 Mermaid 翻译法则）Diagram (incl. Mermaid translation rules) |
| [`f9-report.md`](./f9-report.md) | F9 报告/LaTeX Report & LaTeX |
| [`examples/`](./examples/) | 所有形态的自包含参考代码 Self-contained reference code for every form |

## 阅读顺序建议 · Suggested Reading Order

**如果你是执行设计任务的 AI，从 [`how-to-use.md`](./how-to-use.md) 开始**——它是操作闭环，其余文件都是它引用的参考资料。

**If you are an AI carrying out a design task, start with [`how-to-use.md`](./how-to-use.md)** — it's the operating loop; every other file here is reference material it points into.

当在场景不确定该属于「魂」还是「形」时，先读 `wenxin/README.md` 的水的原则；决定好要产出哪种具体形态后，读对应的 F 文件 + `examples/` 下的示例代码。跨内容类型的页面布局问题（这篇文章该怎么排）先查 `page-archetypes.md`。产出 HTML 时记得声明 `render-contract.md` 里的合同 JSON。

When unsure whether something is "soul" or "form," start with the water principle in `wenxin/README.md`. Once you know which concrete form you're producing, read the matching F-file plus its `examples/` code. For content-type layout questions ("how should this article be laid out"), check `page-archetypes.md` first. When producing HTML, declare the contract JSON from `render-contract.md`.
