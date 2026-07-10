# F5 · 文心演示 Presentation

> 属于 [wanxing](./README.md) 形态层 — Form layer
> 参考实例 References: [`examples/f5-presentation/`](./examples/f5-presentation/)
> 完整规范源 Full source spec: `archive/wanxing/.opencode/agents/wenxin/presentation.md`

16:9 幻灯片，展示优先字号。幻灯片的本质是纯文字 + 呼吸空间——文心的克制美学直接对抗演示文稿最常见的病：文字过多、装饰过重、模板感强。

16:9 slide decks, display-first type scale. A slide's essence is plain text plus breathing room — Wenxin's restraint directly counters the most common presentation disease: too much text, too much decoration, too template-y.

**克制要点 Restraint rules：**
- 每张幻灯片 ≤ 30 字标题 ≤ 30 characters per slide title
- 暖白底色 + 深炭文字 warm-paper background, warm-charcoal text
- 衬线字体优先，区别于千篇一律的无衬线演示模板 serif-first, unlike generic sans-serif templates
- 砖红强调色 ≤ 2 处/幻灯片 ≤ 2 accent occurrences per slide

## 画布与网格 · Canvas & Grid

```
标准画布 Canvas：16:9，1920×1080
安全区域 Safe area：距边缘 ≥ 5%（96px）
12 列网格，gutter 24px
标题区域上方 1/3，内容区域下方 2/3
页码 Page number：右下角，距边缘 3%
```

## 演示字号阶梯 · Presentation Type Scale

比 Web 更大，确保远距离可读性；Major Third (1.250) 比例：

| Token | 值 | 用途 |
|-------|-----|------|
| `--slide-text-sm` | 14px | 演讲者备注、页脚 speaker notes, footer |
| `--slide-text-base` | 18px | 辅助说明、图注 caption |
| `--slide-text-md` | 22px | 要点列表正文 bullet body |
| `--slide-text-lg` | 28px | 副标题 subtitle |
| `--slide-text-xl` | 36px | 小节标题 subsection title |
| `--slide-text-2xl` | 48px | 幻灯片标题 slide title |
| `--slide-text-3xl` | 64px | 章节标题 section title |
| `--slide-text-4xl` | 88px | 标题幻灯片大标题 title-slide headline |

文字约束 Text constraints：标题 ≤ 30 字/8 词；要点每项 ≤ 2 行，每页最多 5 项；正文幻灯片总字数 ≤ 80 字/50 词；引语 ≤ 50 字/30 词。

## 七种幻灯片类型 · Seven Slide Types

1. **标题幻灯片 Title** — 垂直居中，■ 紧随标题后，`--font-display` · `--text-5xl`，背景 `--color-bg-warm`
2. **章节分隔 Section divider** — 垂直居中，编号全大写 + `--tracking-wider`，标题 `--text-4xl`
3. **内容 · 纯文字 Content: text** — 标题 ≤ 30 字，要点 ≤ 5 项，标记用短横线（—）不用圆点
4. **内容 · 文字+图片 Content: text+image** — 左文右图 60/40 或上图下文，图片无圆角无阴影无边框
5. **引用 Quote** — 垂直居中，引语 `--font-display` · `--text-3xl` 斜体，归因用[通用归因区模式](../wenxin/rhythm.md#归因区通用排版模式--attribution-block)
6. **结尾 Closing** — 垂直居中，感谢语 + 联系方式，■ 紧随感谢语后
7. **演讲者备注 Speaker notes** — 独立区域（不投影），`--font-ui` · `--slide-text-sm`

## 三种幻灯片模式 · Three Slide Modes

- **亮色 Light**（默认）：与 F1 完全一致
- **暗色 Dark**：投影环境常用，色值同 Web 暗色模式
- **强调 Accent**：`--slide-bg: #8B3525` 全屏砖红 + 纯白文字，**全演示 ≤ 1 张**，仅用于关键结论/最终 CTA，不用于章节分隔

## 动效 · Motion

切换 Transitions：淡入淡出/推入用 `--duration-slow`(420ms) + `--ease-out`；连续内容页可用 0ms 硬切。禁止旋转、翻转、缩放、弹跳、3D、超过 420ms 的切换。

构建动画 Build：渐显/上移渐显用 `--duration-slow`；列表逐项 stagger 60ms 间隔。演讲者备注不使用动画。

## 参考实例 · Reference Instances

[`examples/f5-presentation/index.html`](./examples/f5-presentation/index.html) — 完整 F5 render-contract 渲染示例。
[`examples/f5-presentation/slides/`](./examples/f5-presentation/slides/) — 七种幻灯片类型的静态 HTML 模板，包在 `<deck-stage>` 里，配 `deck-stage.js` 支持键盘翻页。

## 禁止清单 · Forbidden

每页 > 80 字、填充色按钮、渐变背景、装饰性图片、圆点项目符号（用短横线替代）、除淡入淡出/推入外的任何切换效果。

## 输出格式 · Output Formats

HTML/CSS（主要交付）、PPTX/Keynote 模板规范（字体色彩布局参数）、PDF 导出（16:9）。HTML 框架需支持键盘导航、演讲者备注窗口、`prefers-reduced-motion`、亮暗切换。
