# Markdown 渲染 · Markdown Rendering

> 把一份普通的 Markdown 变成文心的样子，不需要作者写任何 class。
> Turn ordinary Markdown into Wenxin without asking the author to write a single class.

## 最短用法 · Minimal usage

```html
<link rel="stylesheet" href="kit/index.css">
<article class="wx-md wx-md--measured">
  <!-- 渲染器吐出的 HTML 原样放进来 -->
</article>
```

`.wx-md` 负责排版与节奏，`--measured` 额外约束行长（拉丁 68ch / 中文 36em）。
**作者只写 Markdown，不写 class。**

## 这一层为什么单独存在 · Why this is a separate layer

`kit/components/code.css` 管的是**你自己写的** `<pre class="wx-code">`；
这一层管的是**渲染器吐出的** `.wx-md pre > code`。

样子一样，选择器策略不同 —— 判据只有一条：**class 属性归不归你控制**。
不归你控制的，才放这里。把两者混在一起，是设计系统开始腐烂的地方。

Same look, different selector strategy. The test is whether you control the
class attribute. Conflating the two is how a design system rots.

`layers.css` 把 `wx.markdown` 排在 `wx.components` 之后，
所以这里可以放心使用后代选择器 —— 既不会盖过真正的组件，形态层也仍能盖过它。

## 内容 · Contents

| 文件 | 作用 |
|---|---|
| `markdown.css` | 正文排版：标题节奏、列表、引用、表格、图、脚注、原生折叠、任务列表、代码块 |
| `syntax.css` | 语法高亮。暖调、低对比、只用四个相近色 —— 文章里的代码仍然是文章 |
| `admonitions.css` | `:::note` / GitHub alerts 等渲染产物的样式 |
| `hugo/` | Hugo 渲染钩子与 shortcode，见下 |

## 提炼边界 · Extraction boundary

这一层可以吸收其他 Markdown 主题里经得起迁移的阅读经验，但不会复制某个编辑器或作者的视觉习惯：

- 中文正文使用严格换行规则；嵌套引用只用缩进与更轻的单边线表达层级。
- 表格与图注里的正文链接保持可见下划线；脚注兼容常见的 `footnote-*` / `data-footnote-*` 输出。
- 没有 class 的原生 `details/summary` 获得正文节奏；有 class 的组件不受影响。
- 列表继续使用标准标记与现有间距，不改造计数器、项目符号或复选框外形。

The portable layer keeps reading behavior and semantic HTML, not editor chrome
or a theme author's ornamental preferences. There is no import or sync
relationship with an upstream theme.

## Hugo 接入 · Hugo integration

把 `hugo/` 里的文件放进主题对应位置：

```
layouts/_default/_markup/render-heading.html
layouts/_default/_markup/render-image.html
layouts/_default/_markup/render-link.html
layouts/_default/_markup/render-table.html
layouts/shortcodes/callout.html
layouts/shortcodes/pullquote.html
```

它们做四件仅靠 CSS 做不到的事：

1. **标题锚点** —— `render-heading` 生成可聚焦、可复制的真实 `<a>`，带 aria-label，
   而不是一个读屏器读不出来的 `::after`。
2. **图变成 figure** —— 有 title 的图才生成 `<figure>` + `<figcaption>`；
   没有的保持裸 `<img>`。**不替作者编造图注。**
3. **外链声明** —— 新窗口打开时，用 `.wx-sr-only` 补一句"在新标签页打开"。
   可见文字不变，只是补上告知。
4. **宽表格自带滚动容器** —— 而不是把整页撑宽；容器可聚焦，键盘用户能滚动它。

## 其他管线 · Other pipelines

CSS 部分与渲染器无关，任何输出标准 HTML 的 Markdown 处理器都能直接用
（markdown-it、remark、marked、Docusaurus、VitePress…）。

只有 `hugo/` 是 Hugo 专属。等价能力在别的生态里的对应位置：

- **remark/rehype** —— `rehype-slug` + `rehype-autolink-headings` 对应标题锚点；
  `rehype-external-links` 对应外链处理。
- **markdown-it** —— `markdown-it-anchor`、`markdown-it-attrs`。
- **Docusaurus / VitePress** —— 二者自带锚点与 admonition，
  只需引入本目录的 CSS，并让 admonition 类名对上 `admonitions.css` 里的选择器。

## 语法高亮 · Syntax highlighting

类名同时兼容 **Prism** 与 **highlight.js** 的约定，不需要额外映射层。
色板只有四个相近的暖色加正文墨色 —— 大多数主题用六种饱和色区分 token 类型，
但文章里的代码是**被阅读**的，不是被扫描查错的。
