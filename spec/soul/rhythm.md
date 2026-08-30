# 排版节奏与阅读密度 · Typographic Rhythm

> 属于 [spec](../README.md) 灵魂层 — Soul layer

这一节定义「文字如何呼吸」——不是元素长什么样，而是元素之间怎么组织，让读者不感到压迫。这是灵魂层的一部分：无论具体页面是什么形态，文字密度的克制都不变。

This section defines *how text breathes* — not what an element looks like, but how elements are organized so the reader never feels crowded. This is soul-layer: whatever the concrete form, the restraint in text density never changes.

## 核心意识：留白即标点 · Whitespace as Punctuation

空行不是浪费，而是句读。段落之间的留白是给读者换气的节拍。文字密度的控制和音乐里的节奏一样重要——没有停顿的音符，不是音乐，是噪声。

A blank line is not waste — it is punctuation. The whitespace between paragraphs is the reader's breath. Controlling text density matters as much as rhythm in music — notes without pauses aren't music, they're noise.

## 段落密度控制 · Paragraph Density

- 每段正文控制在 **5～7 行**以内（以桌面端内容宽度为基准）
  Keep each paragraph to **5–7 lines** (at desktop content width)
- 连续出现超过 3 个长段落，主动插入视觉锚点
  After more than 3 long paragraphs in a row, actively insert a visual anchor
- 单句成段是允许的——短句有时比长段更有力量
  A single-sentence paragraph is allowed — sometimes a short sentence hits harder than a long one
- 段落间距统一使用 `--space-5`（20px）
  Paragraph gap is always `--space-5` (20px)

## 视觉锚点·读者的呼吸站 · Visual Anchors

长文中每隔一定密度，应出现一个视觉重量不同的元素，让眼睛有地方停顿：

In long-form text, a visually distinct element should appear periodically to give the eye somewhere to rest:

| 锚点类型 Anchor | 视觉重量 Weight | 建议频率 Suggested frequency |
|----------|----------|----------|
| h2 / h3 小标题 | 中 medium | 每 400～600 字一次 every 400–600 words |
| Pull Quote 编辑型引语 | 高 high | 每篇长文 1～2 次 1–2 per long article |
| Blockquote 引用块 | 中 medium | 按内容需要 as needed |
| 代码块 Code block | 中 medium | 按内容需要 as needed |
| 单句强调段 Single-sentence emphasis | 低～中 low–medium | 灵活 flexible |
| 图片 Image | 高 high | 按内容需要，不强求 as needed, never forced |

## 字号层级的悬殊感 · Dramatic Scale Contrast

在一个区块内，不同层级的字号比例应该足够悬殊，不要让所有文字挤在相近的字号范围里。以编辑型引语为例：

Within a block, the size ratio between levels should be dramatic — don't let all text crowd into a similar size range. Example, an editorial pull quote:

```
分类标签 category label：--text-sm（13px）  ← 极小 tiny
引语正文 quote body：--text-3xl（36px） ← 极大 huge
归因来源 attribution：--text-base（16px）← 居中 middle
```

三个层级的跨度创造了呼吸感，比任何装饰都有效。

The span across three levels creates breathing room — more effective than any decoration.

## Blockquote 与 Pull Quote 的区别 · Blockquote vs. Pull Quote

两者都是引用类组件，但用途不同，不可互换：

Both are quote components, but their purposes differ and they are not interchangeable:

**Blockquote · 段落引用 in-flow quote**
嵌套在正文流中，用于引用他人言论或资料内容。Nested in the body flow, for quoting someone else's words or source material.

```css
blockquote {
  border-left: 2px solid var(--color-accent);
  background: var(--color-bg-subtle);
  padding: var(--space-4) var(--space-6);
  margin: var(--space-8) 0;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-style: italic;
  font-size: var(--text-md);
}
```

**Pull Quote · 编辑型引语 editorial pull quote**
独立于正文流，用于提炼全文核心观点，具有强烈编辑感。字号远大于正文，是页面视觉节奏的「高重量锚点」。

Independent of the body flow, distilling the article's core point with strong editorial presence. Much larger than body text — the page's "heavyweight anchor."

```
结构 Structure:
  [分类标签]  ·  [子标签]        ← --font-ui, --text-sm, --tracking-wider, 全大写 uppercase

  "（装饰引号，--color-text-functional，纯装饰，无语义 decorative quote mark, no semantic meaning）

  [引语正文]                      ← --font-display, --text-3xl, 斜体 italic

  ──────────                      ← 短横线 40px, --color-border-strong, 1px
  [来源名称]                      ← --font-body, bold, --color-text-heading
  [来源说明]                      ← --font-ui, --text-sm, --color-text-secondary

  ───────────────────────────     ← 底部分隔线 bottom rule, --color-border-subtle
  [注释/免责说明]                 ← --font-ui, --text-xs, --color-text-functional

背景 background：--color-bg-warm 或 --color-bg-base
无边框、无阴影，用留白界定区域 no border, no shadow — whitespace defines the region
```

## 归因区·通用排版模式 · Attribution Block

凡需要标注来源、作者、出处的场景，统一使用：

Wherever a source, author, or provenance needs labeling, use this pattern uniformly:

```
──────────     ← 短横线，宽 40px, --color-border-strong, 1px
来源名称 Source name       ← --font-body 或 --font-ui, bold, --color-text-heading
来源说明 Source description ← --font-ui, --text-sm, --color-text-secondary
```

适用于：文章署名、引语归因、脚注来源、数据出处。

Applies to: article bylines, quote attributions, footnote sources, data provenance.

---

这条节奏原则是通用的——具体应用到不同形态时的差异（演示文稿的字数限制更严、印刷品有首字下沉、图解有编辑型引语要求）见 [形态层 forms](../forms/DECISIONS-MATRIX.md) 各形态文件。

This rhythm principle is universal — its form-specific variations (presentations enforce stricter word limits, print has drop caps, diagrams require an editorial pull-quote) are documented in each wanxing form file.
