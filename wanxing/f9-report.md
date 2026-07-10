# F9 · 文心报告 Report & LaTeX

> 属于 [wanxing](./README.md) 形态层 — Form layer
> 参考实例 References: [`examples/f9-report/`](./examples/f9-report/)
> 完整规范源 Full source spec: `archive/wanxing/.opencode/agents/wenxin/report.md`

Markdown 草稿到 LaTeX/PDF 的判断型文档。**论证即界面**——报告不是网页，也不是幻灯片，而是通过摘要、问题、方法、发现、证据、解释和建议，让读者安静地进入一个结论。

Markdown drafts turned into LaTeX/PDF judgment documents. **The argument is the interface** — a report is neither a webpage nor a slide deck; it lets the reader arrive quietly at a conclusion through summary, question, method, findings, evidence, interpretation, and recommendations.

## 适用场景 · Scope

用户研究、行业研究、技术研究、产品/内容/增长策略报告、项目复盘、白皮书、少量关键数据+文字解释+建议的分析文档。

**不适用 Not applicable：** 实时 Dashboard、BI 报表、销售表格、邮件 newsletter、社交长图、演示 deck。

## 与其他形态的边界 · Boundaries with Other Forms

| 形态 | 负责内容 |
|------|----------|
| F4 印刷 | 书籍/杂志/论文/Zine 的出版内页排版 |
| F5 演示 | 面向现场讲述的多页幻灯片 |
| F6 文档 | 可浏览、可搜索、可导航的文档站 |
| F8 图解 | 图解、流程、知识地图本身 |
| **F9 报告** | Markdown 到 LaTeX/PDF 的判断型报告 |

F9 可复用 F4 的印刷 token 和页边距思想，但不承担书籍出版系统；F9 可包含图解，但图解本身须遵循 F8。

## 输入与输出 · Input & Output

```
Markdown / structured notes
    ↓ Wenxin Report frontmatter + section normalization
LaTeX template / class
    ↓
PDF
```

| Target | 说明 |
|--------|------|
| `latex-pdf` | 主目标，XeLaTeX 支持 CJK primary target, XeLaTeX for CJK |
| `latex-template` | 只交付 `.tex` 模板 template only |
| `html-preview` | 可选预览，不是主交付 optional, not the primary deliverable |
| `print-css-html` | 可选浏览器导出路径 optional browser-export path |

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

## 标准报告结构 · Standard Structure

| Section | 必需 Required | 说明 |
|---------|------|------|
| Title Page | 是 | 标题、副标题、作者、日期 |
| Executive Summary | 是 | 先给结论，不铺垫 lead with the conclusion |
| Question / Context | 视情况 | 问题背景与判断边界 |
| Method / Sources | 视情况 | 方法、样本、来源 |
| Findings | 是 | 主要发现，按重要性排序 |
| Evidence / Figures | 视情况 | 证据、图表、表格 |
| Interpretation | 视情况 | 对发现的解释 |
| Recommendations | 是 | 可执行建议 |
| Appendix | 视情况 | 附录、数据、引用 |

任何 F9 报告至少包含 `Executive Summary`、`Findings`、`Recommendations`。

## LaTeX 排版规则 · LaTeX Rules

引擎 Engine：默认 XeLaTeX，确保 CJK 可用。页面 Page：A4 或 Letter，宽松页边距。字体 Font：标题/正文衬线优先，元数据/页眉页脚无衬线。色彩 Color：PDF 默认不铺暖白背景，用纸张本色；accent 只用于封面标识、关键引文或极少数结论标记。图表 Figures：所有 figure/table 必须有编号、caption 和正文引用。脚注 Footnotes：用于来源/限定条件/短注，不用于堆积正文。

## 审计清单 · Audit Checklist

- [ ] 是否有明确的问题、发现、证据和建议
- [ ] 是否保留 Executive Summary / Findings / Recommendations
- [ ] Markdown frontmatter 是否足以驱动 LaTeX/PDF 输出
- [ ] 图表和表格是否服务论证，而非装饰
- [ ] 是否避免 Dashboard 化、高饱和彩色图表、模板化封面
- [ ] 是否声明 Render Contract `profile: F9`

## 禁止事项 · Forbidden

不做实时 Dashboard、不做 slide deck、不做 newsletter/email、不做社交长图、不使用高饱和彩色图表、不把 HTML preview 当作主交付物。

## 参考实例 · Reference Instance

[`examples/f9-report/index.html`](./examples/f9-report/index.html) — 完整 F9 render-contract 渲染示例（HTML preview 路径）。
