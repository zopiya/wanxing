# 媒介适配 · Media Adaptation

> 属于 [spec](./README.md) 形态层 — Form layer
> 读者版见文档站 [`site/media.html`](../site/media.html)。

同一个灵魂在不同容器里的取值差异。**这不是九套设计，是一套设计的九次落地。**

The same soul in different containers. Not nine designs — one design, landed nine times.

这一份只记录**媒介强制的决定**：那些不是风格选择、而是介质本身逼出来的取值。
风格与用法说明在文档站，不在这里重复。

This file records only what the medium *forces*. Style and usage guidance lives on the
documentation site rather than being duplicated here.

---

## 对照表 · Decision Matrix

| 媒介 Medium | 轨道 Track | 动效 Motion | 被强制的决定 What the medium forces |
|---|---|---|---|
| 网页文章 Web | 阅读 editorial | `E9-1` | 响应式画布；暗色模式必需 |
| 移动端 Mobile | **应用 application** | `E9-1` | 触控 ≥44pt；安全区 `env(safe-area-inset-*)`；分组列表合法 |
| 品牌 Brand | 阅读 editorial | `E9-2` | 多尺寸标识；**唯一允许品牌呼吸循环** |
| 印刷 Print | 阅读 editorial | **`E8`** | pt 字号（非 rem）；CMYK/PANTONE 映射；**无暗色模式** |
| 幻灯 Slides | 阅读 editorial | `E9-1` | 16:9 固定画布；≤80 字/页；键盘导航必需 |
| 文档站 Docs | 阅读 editorial | `E9-0` | 侧栏 + 目录 + 搜索；可到左/中/右三轨 |
| 海报 Poster | 阅读 editorial | `E9-1` | 固定画布；accent 预算显式分配到标题与印 |
| 图示 Diagram | 阅读 editorial | `E9-0` | 节点与边分离；无自动布局 |
| 报告 Report | 阅读 editorial | `E9-0` | 图必须编号并被正文引用；摘要/发现/建议三段 |

轨道判定见 [tracks.md](./tracks.md)；动效等级定义见 [soul/motion.md](./soul/motion.md)。

---

## 跨媒介不变的 · Invariant Across All Media

无论哪个容器，这些都不变 —— 它们就是[不变之魂](./soul/philosophy.md)：

- 暖土色域与单一 accent（**D9**）
- 阅读轨内容页 accent ≤ 2 处；应用轨按页面合同分配任务强调
- 无卡片、无阴影、无渐变（**A9**）
- WCAG 2.2 AA 底线
- token 词汇表

---

## 形态级 Token · Form-Level Tokens

三层 token 架构的中间层：[`kit/tokens/forms/`](../kit/tokens/forms/)。
**这一层存在的理由就是印刷。** 1pt = 1/72 英寸是物理长度，与屏幕的 rem 没有换算关系，
所以印刷需要一套独立的 `--print-text-*` 阶梯，而不是把 rem 换算过去。

```
kit/tokens/core.css          跨媒介通用
kit/tokens/forms/fN-*.css    媒介级（--print-text-* / --touch-target-min / --slide-* …）
组件内声明                    组件级（--wx-image-ratio 等）
```

用法：引 `kit/dist/wenxin.css`，需要某个媒介时**额外**引对应的
`kit/tokens/forms/fN-*.css`。不再提供分媒介的整包 —— 九个整包携带的真实差异只有 145 行，
其余 99.5% 是重复。

Load `kit/dist/wenxin.css`, then add the one form-token file you need. The former per-form
bundles carried 145 lines of actual difference across 30,000 lines of duplication.

---

## 页面原型 · Page Archetypes

媒介决定物理约束，**原型决定页面组织**。五种原型见
[`kit/patterns/`](../kit/patterns/) 与文档站 [模式总览](../site/patterns.html)。

关键机制：**原型 E（工具型）会翻转它所在媒介的轨道** —— 一个查询工具页即使住在
阅读轨的站点里，也按应用轨判定。

---

## 印刷是最有意思的约束 · Print Is the Interesting One

印刷强制 `E8`，而 `E8` 在 CSS 里是**硬关闭**而非约定：

```css
[data-motion="E8"] *,
[data-motion="E8"] *::before,
[data-motion="E8"] *::after {
  animation: none !important;
  transition: none !important;
}
```

结构上不可能有动效，不是"建议不要用"。这是这套系统处理媒介约束的范式：
**能变成结构事实的，就不要留在约定里。**
