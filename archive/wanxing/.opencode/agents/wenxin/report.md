# 文心报告 (Wenxin Report) · Report & LaTeX Typesetting (F9)

> Version: 1.0.0 | Date: 2026-05-24 | Wenxin F9

---

## 设计哲学

F9 的核心命题是：**论证即界面**。

报告不是网页，也不是幻灯片。它是一种判断型文档：通过摘要、问题、方法、发现、证据、解释和建议，让读者安静地进入一个结论。文心报告将 Markdown 草稿转化为 LaTeX/PDF，把文字结构、留白、脚注、图表说明和引用系统作为界面本身。

F9 继承文心的三条灵魂原则：

- **文字即界面**：标题、段落、脚注、图表 caption 就是主要交互路径。
- **留白即设计**：页边距、段前段后、图表间距决定阅读节奏。
- **克制即力量**：报告不炫技，不做模板化封面，不使用高饱和彩色 Dashboard 图。

## 适用场景

| 场景 | 说明 |
|------|------|
| 研究报告 | 用户研究、行业研究、技术研究 |
| 策略报告 | 产品策略、内容策略、增长策略 |
| 项目复盘 | 里程碑复盘、实验复盘、事故复盘 |
| 白皮书 | 方法论、产品方案、组织方案 |
| 分析文档 | 少量关键数据 + 文字解释 + 建议 |

**不适用：** 实时 Dashboard、BI 报表、销售表格、邮件 newsletter、社交长图、演示 deck。

## 与其他形态的边界

| 形态 | 负责内容 |
|------|----------|
| F4 Print & Editorial | 书籍、杂志、论文、Zine 的出版内页排版 |
| F5 Presentation | 面向现场讲述的多页幻灯片 |
| F6 Documentation | 可浏览、可搜索、可导航的文档站 |
| F8 Diagram | 图解、流程、知识地图本身 |
| F9 Report | Markdown 到 LaTeX/PDF 的判断型报告 |

F9 可以复用 F4 的印刷 token 和页边距思想，但它不承担书籍出版系统。F9 可以包含图解，但图解本身必须遵循 F8。

## 输入与输出

主路径：

```
Markdown / structured notes
    ↓
Wenxin Report frontmatter + section normalization
    ↓
LaTeX template / class
    ↓
PDF
```

| Target | 说明 |
|--------|------|
| `latex-pdf` | 主目标，使用 XeLaTeX 支持 CJK |
| `latex-template` | 只交付 `.tex` 模板与样式约定 |
| `html-preview` | 可选预览，不是主交付 |
| `print-css-html` | 可选浏览器导出路径 |

## Markdown Frontmatter

```yaml
---
title: "报告标题"
subtitle: "可选副标题"
author: "作者"
date: "2026-05-24"
language: "zh-CN"
profile: "F9"
source_format: "markdown"
target_format: "latex-pdf"
sections:
  - executive_summary
  - findings
  - recommendations
citation_required: false
---
```

## 标准报告结构

| Section | 必需 | 说明 |
|---------|------|------|
| Title Page | 是 | 标题、副标题、作者、日期 |
| Executive Summary | 是 | 先给结论，不铺垫 |
| Question / Context | 视情况 | 问题背景与判断边界 |
| Method / Sources | 视情况 | 方法、样本、来源 |
| Findings | 是 | 主要发现，按重要性排序 |
| Evidence / Figures | 视情况 | 证据、图表、表格 |
| Interpretation | 视情况 | 对发现的解释 |
| Recommendations | 是 | 可执行建议 |
| Appendix | 视情况 | 附录、数据、引用 |

核心要求：任何 F9 报告至少包含 `Executive Summary`、`Findings`、`Recommendations`。

## LaTeX 排版规则

- 引擎：默认 XeLaTeX，确保 CJK 可用。
- 页面：A4 或 Letter；默认 A4，宽松页边距。
- 字体：标题/正文衬线优先，元数据和页眉页脚使用无衬线。
- 色彩：PDF 默认不铺暖白背景，使用纸张本色；accent 只用于封面标识、关键引文或极少数结论标记。
- 图表：所有 figure/table 必须有编号、caption 和正文引用。
- 脚注：用于来源、限定条件和短注，不用于堆积正文。
- 引用：如 `citation_required: true`，必须保留 bibliography 区域。

## Render Contract

F9 的 HTML preview 或构建说明必须包含：

```json
{
  "profile": "F9",
  "source": { "format": "markdown" },
  "target": { "format": "latex-pdf", "engine": "xelatex" },
  "report": {
    "sections": ["executive_summary", "findings", "recommendations"],
    "citationRequired": false
  },
  "theme": { "accentBudget": 2 }
}
```

## 审计清单

- [ ] 是否有明确的问题、发现、证据和建议？
- [ ] 是否保留 `Executive Summary`、`Findings`、`Recommendations`？
- [ ] Markdown frontmatter 是否足以驱动 LaTeX/PDF 输出？
- [ ] 图表和表格是否服务论证，而非装饰？
- [ ] 是否避免 Dashboard 化、高饱和彩色图表、模板化封面？
- [ ] 是否声明 Render Contract `profile: F9`？

## 禁止事项

- 不做实时 Dashboard
- 不做 slide deck
- 不做 newsletter/email
- 不做社交长图
- 不使用高饱和彩色图表
- 不把 HTML preview 当作主交付物
