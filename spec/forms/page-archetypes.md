# 页面原型 · Page Archetypes

> 属于 [spec](../README.md) 形态层 — Form layer
> 原为灵魂层内容，整体移至形态层——页面原型属于形态而非灵魂。取材来源见 [PROVENANCE.md](../PROVENANCE.md)。
> Originally soul-layer content, moved wholesale to the form layer — archetypes are form, not soul.

这五种原型描述的是**内容类型**（阅读/列表/展示/着陆/工具），跟 F1–F9 的**输出媒介**分类是两条不同的轴——同一种原型可以出现在 F1 网页里，也可以出现在 F6 文档站里。形态层跟随该类型产品的行业 UX 惯例，以下每种原型说明「如何在标准结构中注入灵魂」。

These five archetypes describe **content types** (reading, list, showcase, landing, tool) — a different axis from F1–F9's **output medium** classification. The same archetype can show up inside an F1 web page or an F6 docs page. The form layer follows the industry's standard UX conventions for that content type; each archetype below explains "how to inject the soul into the standard structure."

---

## 原型 A · 阅读型 Reading

*博客文章、文档页、Wiki 词条 Blog posts, doc pages, wiki entries*

用户目标 User goal：读完内容，不分心。Finish reading without distraction.

遵循惯例 Follows convention：单列居中，面包屑导航，标题 → 元数据 → 正文。Single centered column, breadcrumb, title → metadata → body.

**灵魂注入 Soul injection:**
- 内容宽 Width：`--width-article`
- 正文 Body：`--font-body` · `--text-md` · `--leading-relaxed` · 段落间距 `--space-5`
- 元数据 Metadata：`--font-ui` · `--text-sm` · `--color-text-secondary`
- Blockquote：左侧 2px `--color-accent` 竖线 + `--color-bg-subtle`
- 代码块 Code block：`--color-bg-subtle`，左侧边线，无四周边框

Used by: [`f1-web.md`](./f1-web.md) (blog article), [`f6-documentation.md`](./f6-documentation.md) (doc page).

---

## 原型 B · 列表型 List

*博客首页、文章列表、搜索结果、目录 Blog index, post list, search results, table of contents*

用户目标 User goal：浏览并选择，快速判断哪条值得点进去。Scan and choose — quickly judge what's worth a click.

遵循惯例 Follows convention：条目列表，可分页，可过滤。Item list, paginated, filterable.

**灵魂注入 Soul injection:**
- 内容宽 Width：`--width-content`
- 布局 Layout：`[日期，固定宽，--color-text-secondary]  [标题，--color-text-primary]`
- Hover：标题色 → `--color-accent`, `--duration-fast`
- 进场 Entrance：stagger fadeUp，每项间隔 60ms
- 无卡片、无边框、无阴影 No card, no border, no shadow

Used by: [`f1-web.md`](./f1-web.md) (blog index), [`f6-documentation.md`](./f6-documentation.md) (search results).

---

## 原型 C · 展示型 Showcase

*个人简历、作品集、About 页 Résumé, portfolio, About page*

用户目标 User goal：了解「这是谁」，建立信任。Understand "who this is," build trust.

遵循惯例 Follows convention：简历用两列时间线（左日期右内容），作品集用网格，About 自由叙述。Résumé: two-column timeline (date left, content right); portfolio: grid; About: free narrative.

**灵魂注入 Soul injection:**
- 内容宽 Width：`--width-showcase`
- 品牌标识符 ■ 出现在姓名后，这是 Accent 在此页的固定出现位置。The ■ mark follows the name — its fixed appearance slot on this page.
- 时间左列 Date column：`--font-ui` · `--text-sm` · `--color-text-secondary`
- 公司/机构名 Org name：`--color-text-secondary`，低于职位名一级 one level below the role title
- 技能标签 Skill tags：线框 outline, `border: 1px solid --color-border-subtle`，无填充 no fill

Used by: [`f1-web.md`](./f1-web.md) (résumé/portfolio/About). 源材料中未见独立实例，见文末说明。No standalone instance found in the source material — see the note at the end of this file.

---

## 原型 D · 着陆型 Landing

*Landing Page、产品首页 Landing pages, product homepages*

用户目标 User goal：10 秒内判断「这是什么，我要不要继续」。Judge within 10 seconds: what is this, do I keep going.

遵循惯例 Follows convention：英雄区大字 + 核心描述 + 行动入口，下方特性分区，尾部 CTA。Hero display type + core description + entry action, feature sections below, closing CTA.

**灵魂注入 Soul injection:**
- 背景 Background：`--color-bg-warm`
- 标题 Title：`--font-display` · `--text-5xl`/`--text-4xl` · `--tracking-chinese` 或 `--tracking-tight`
- 导航 Nav：透明背景 transparent, `--font-ui` · `--text-sm` · 全大写 uppercase · `--tracking-wider`
- CTA：纯文字链接型，非填充按钮 plain text link, never a filled button
- 区块间距 Section gap：`--space-24` 以上 and above

Used by: [`f1-web.md`](./f1-web.md) (landing page / home).

---

## 原型 E · 工具型 Tool

*输入/查询/生成类轻量工具 Lightweight input/query/generation tools*

用户目标 User goal：完成一个具体任务。界面是工具，不是目的。Complete a specific task — the interface is a tool, not the destination.

遵循惯例 Follows convention：输入区突出，操作路径清晰，结果区简洁。Prominent input area, clear action path, simple results area.

**灵魂注入 Soul injection:**
- 输入框 Input：见 [`soul/components.md`](../soul/components.md) 表单规范 form spec
- 按钮 Button：线框型 outline, hover → `--color-accent`
- 结果文字 Result text：`--font-body` · `--leading-relaxed`
- 图标 Icon：`--icon-md`, `--color-text-secondary`

Used by: [`f6-documentation.md`](./f6-documentation.md) 的搜索/查询交互界面。源材料中未见独立的纯工具型页面实例。No dedicated instance in the source material for a pure tool page — build from the rules above.

---

重构前材料只有 [`examples/f1-web/index.html`](../../examples/f1-web/index.html) 的 A/B/D 旁证；
2026-08-30 田野审计补上了原型 C（`zopiya.com`）与原型 E（`note.zopiya.com`）的生产证据。

The pre-rebuild material covered A/B/D only. The 2026-08-30 field audit adds production evidence
for archetype C (`zopiya.com`) and archetype E (`note.zopiya.com`).

五种可复制骨架现位于 [`kit/patterns/`](../../kit/patterns/)，完整亮/暗预览见
[`examples/gallery/patterns.html`](../../examples/gallery/patterns.html)。骨架只定义布局；实际输出仍需选择 F1–F9 形态并填写渲染合同。

Copyable skeletons now live in [`kit/patterns/`](../../kit/patterns/), with a light/dark gallery at
[`examples/gallery/patterns.html`](../../examples/gallery/patterns.html). A skeleton supplies layout,
not a form profile or render contract.
