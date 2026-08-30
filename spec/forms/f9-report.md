# F9 · Report & LaTeX

> 属于 [spec](../README.md) 形态层 — Form layer
> 轨道 Track：`editorial` · 动效 Motion：`E9-0` 静水 · 主路径 **Markdown → XeLaTeX → PDF**

## 身份与边界 · Identity

F9 把 Markdown、研究草稿或结构化笔记整理为**可独立阅读的判断型报告**。

它不是 Web report，不是 Dashboard，而是**"论证结构 + 排版编译"**。

| 形态 | 负责 |
|---|---|
| F4 Print | 书籍、期刊、论文的出版内页 |
| F5 Presentation | 面向现场讲述的幻灯片 |
| F6 Documentation | 可浏览可搜索的文档站 |
| **F9 Report** | **强调摘要、证据、洞察、建议的独立报告** |

F9 可复用 F4 的印刷 token 与页边距思想，但**不承担书籍出版系统**；
F9 可包含图解，但图解本身遵循 F8。

## 报告结构 · Structure

1. Title Page
2. **Executive Summary** ★
3. Question / Context
4. Method / Sources
5. **Findings** ★
6. Evidence / Figures
7. Interpretation
8. **Recommendations** ★
9. Appendix

可删除不适用章节，但 **★ 三个核心结构必须保留**。

## Frontmatter

```yaml
---
title: "报告标题"
subtitle: "可选副标题"
author: "作者"
date: "2026-08-29"
language: "zh-CN"
profile: "F9"
track: "editorial"
source_format: "markdown"
target_format: "latex-pdf"
sections: [executive_summary, findings, recommendations]
---
```

## 排版 · Typesetting

- 引擎 **XeLaTeX**，确保 CJK 可用
- 页面 A4 或 Letter，宽松页边距
- 标题/正文衬线优先；元数据、页眉页脚无衬线
- 字号复用 F4 的 pt 阶梯
- **PDF 默认不铺暖白底色，用纸张本色**
- accent 仅用于封面标识、关键引文、极少数结论标记，≤2 类用途
- **所有 figure/table 必须有编号、caption 和正文引用**
- 脚注用于来源、限定条件、短注，**不用于堆积正文**

## 图表 · Figures

遵循 [data-viz.md](../soul/data-viz.md)：墨色阶梯编码，accent 标记结论项。
**图表必须服务论证，而非装饰。**

## 动效 · Motion — E9-0 静水

主交付物是 PDF，但可以有 HTML 预览。
预览保留必要的状态反馈（hover、焦点态），**无进场动画**。

这就是 F9 用 `E9-0` 而非 F4 的 `E8` 的原因 —— 它有一个可交互的预览形态，
而纸张没有。两者本就应该不同，见 [cross-form-matrix.md](./cross-form-matrix.md)。

## 最小可交付物 · Minimum Deliverable

- [ ] Markdown frontmatter 完整
- [ ] LaTeX/PDF target 声明
- [ ] Executive Summary / Findings / Recommendations 三章齐备
- [ ] 图表、表格、引用、附录有编号与 caption
- [ ] 明确的问题 → 证据 → 判断 → 建议链条
- [ ] 渲染契约 `profile: F9`，`intensity: "E9-0"`

## 不做 · Out of scope

实时 Dashboard · 高饱和彩色数据图 · 把 F9 当着陆页 ·
邮件通讯 / 社交长图 / 表单向导 —— 不用这些场景扩张 F9
