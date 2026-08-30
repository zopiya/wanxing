# 页面原型骨架 · Page Archetype Skeletons

> A–E 对应 [`spec/forms/page-archetypes.md`](../../spec/forms/page-archetypes.md)。
> A–E map directly to [`spec/forms/page-archetypes.md`](../../spec/forms/page-archetypes.md).

这些文件是可复制的 HTML 片段，不自带形态 profile。使用者仍需按实际媒介加载对应的
`wenxin-fN.css` 并填写渲染合同；原型 E 必须把页面 `track` 声明为 `application`。

These are copyable HTML fragments, not form profiles. Load the relevant `wenxin-fN.css`, complete
the render contract, and declare archetype E pages as `application` track.

- `a-reading.html` — 文章/文档 article or document
- `b-list.html` — 索引/搜索结果 index or search results
- `c-showcase.html` — 简历/作品集 résumé or portfolio
- `d-landing.html` — 首页/着陆页 home or landing page
- `e-tool.html` — 输入/查询工具 input or query tool

五份骨架都只用留白和单边线分组，不提供任何四边包围容器。

All five group with whitespace and single-edge rules; none introduces a four-sided container.
