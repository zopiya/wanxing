# F1 · 文心正典 Web

> 属于 [wanxing](./README.md) 形态层 — Form layer
> 参考实例 References: [`examples/f1-web/`](./examples/f1-web/)

响应式网站、博客、Landing Page、作品集。这是文心语言的原生形态——`archive/wenxin`（Hugo 博客主题）是它在真实产品中的标杆实例，也是 [wenxin](../wenxin/README.md) 全部 token 的第一个真实代码落地。

Responsive sites, blogs, landing pages, portfolios. This is Wenxin's native form — `archive/wenxin` (a Hugo blog theme) is its flagship real-world instance, and the first real code implementation of every wenxin token.

## 标杆实例 · Flagship Instance

- **Hugo 主题 Hugo theme**：`archive/wenxin`（独立 git 仓库，未搬运到本目录，保持原样）。它的 `assets/css/variables.css` 就是 [`wenxin/color.md`](../wenxin/color.md) 等 token 文件的真实代码版本——两者数值完全一致。
  An independent git repo, not copied here — kept as-is. Its `assets/css/variables.css` is the real-code version of the wenxin token files; values match exactly.
- **渲染示例 Rendered demo**：[`examples/f1-web/index.html`](./examples/f1-web/index.html)——完整的 F1 render-contract 示例，展示了导航、Hero、原型 B 列表、原型 A 文章等。
  A complete F1 render-contract demo showing nav, hero, archetype-B list, archetype-A article.
- **React UI Kit**：[`examples/f1-web/ui-kit/`](./examples/f1-web/ui-kit/)——`Header.jsx` / `Hero.jsx` / `Footer.jsx` / `Article.jsx` / `PostList.jsx` / `Sections.jsx` / `Brand.jsx` 等组件，是 token 到组件的直接翻译，可直接作为 F1 项目的组件起点。
  A direct token-to-component translation — usable as a starting point for an F1 project.

## 布局结构 · Layout Structure

F1 没有固定的单一布局——它遵循 [`page-archetypes.md`](./page-archetypes.md) 中 A（阅读）/B（列表）/C（展示）/D（着陆）/E（工具）五种原型，根据页面内容类型选择对应结构。一个博客站点通常同时包含 A（文章页）+ B（首页列表）；一个作品集站点通常是 C + 局部 A（详情页）。

F1 has no single fixed layout — it follows the five archetypes (A/B/C/D/E) in `page-archetypes.md`, chosen per page content type. A blog site typically combines A (article) + B (index list); a portfolio site is typically C + partial A (detail pages).

## 导航 · Navigation

```
Header：Logo/品牌名 + ■ 标记，右侧简洁导航链接
        --font-ui · --text-sm · 全大写 · --tracking-wider（纯导航区）
背景：透明或 --color-bg-warm，随页面原型而定
```

## 响应式策略 · Responsive Strategy

沿用 [`wenxin/spacing.md`](../wenxin/spacing.md) 的断点定义：

Uses the breakpoints defined in wenxin's spacing doc:

```css
@media (max-width: 1024px) {
  :root { --text-5xl: 3.5rem; --text-4xl: 2.5rem; }
}
@media (max-width: 640px) {
  :root {
    --text-5xl: 2.5rem; --text-4xl: 2rem;
    --text-3xl: 1.625rem; --text-2xl: 1.5rem;
    --padding-page-x: 20px;
  }
}
```

移动端行为原则 Mobile behavior:

| 属性 Property | 处理方式 Treatment |
|------|------|
| 展示型大标题字号 Display headline size | 激进缩小，气质不变 aggressively shrinks, temperament unchanged |
| 正文字号 Body size | ≥ 16px，不低于桌面端 never smaller than desktop |
| 行高 Leading | 保持不变 unchanged — core to reading comfort |
| 动效 Motion | 全量保留（`prefers-reduced-motion` 另行处理）fully retained |
| 双列布局（简历等）Two-column (résumé) | 折叠为单列，日期移至标题上方 collapses to one column |
| 图标触控目标 Icon touch target | 最小 44×44px min 44×44px (icon itself can stay small) |

## 图标使用 · Iconography

源仓库的 F1 示例完全不使用图标库，仅用 Unicode `↓` `→`。这是文心气质下最克制的选择；若确需图标，参照 [`wenxin/icons.md`](../wenxin/icons.md) 选用 Phosphor Light（内容型）或 Lucide（工具型）。

The source repo's F1 example uses no icon library at all — just Unicode `↓` `→`. If icons are genuinely needed, see wenxin's icon doc for Phosphor Light (editorial) vs. Lucide (tool-style).

## 常见页面清单 · Common Pages

首页（原型 D 或 B）、文章页（原型 A）、文章列表/归档（原型 B）、About/简历（原型 C）、404 页。

Home (archetype D or B), article page (A), post list/archive (B), About/résumé (C), 404 page.
