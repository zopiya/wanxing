# 组件画廊 · Component Gallery

> 用途 Purpose：肉眼验收 kit 的每一个组件，两种主题下都看一遍。

| 文件 | 验证什么 |
|---|---|
| [`base.html`](./base.html) | **基座** —— 零 class 时页面长什么样。裸 `<h1>` `<p>` `<blockquote>` 是否已经正确。 |
| [`index.html`](./index.html) | **全部 v1 组件** —— 布局、条目、按钮、表单、反馈、数据展示、内容、代码、空状态、翻页。 |
| [`markdown.html`](./markdown.html) | **Markdown 渲染** —— 内容上不带任何 class，全部由 `.wx-md` 承担。 |
| [`charts.html`](./charts.html) | **图表** —— 墨色编码、accent 标记论点、直接标注、装饰做减法。 |

## 怎么看

```sh
python3 -m http.server 8899     # 需要 http，file:// 下 @import 与字体会被拦
open http://localhost:8899/examples/gallery/
```

暗色模式：在浏览器控制台执行
`document.documentElement.setAttribute('data-theme','dark')`，
或直接切换操作系统主题（两条路径都受支持，且互不覆盖）。

## 验收要点

- **卡片的替代品**：`wx-entry` 之间只有留白与单边细线，没有任何四边包围的方框。
- **填充按钮只有一个**：`wx-btn--primary`，其余全是线框。
- **错误态同时有颜色、文字与边框变化** —— 颜色从不单独承载信息。
- **四级 admonition 彼此可区分**，且与 accent 砖红拉得开（最小 ΔE = 28）。
- **表格只有横线**，没有外框、没有竖线、没有斑马纹。
- **图表用墨色阶梯 + 线型双通道编码**，不用色相；全图只有一个序列是 accent。
- 暗色模式下以上全部仍然成立。

> 改完 CSS 看不到变化？多半是浏览器缓存了 `kit/index.css`。
> 加个查询串强制重取：`kit/index.css?v=2`。
