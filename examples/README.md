# 示例 · Examples

> 九种形态各一份，**全部用 `kit/` 重写**，不是从历史迁移来的。
> 它们是对整套 kit 的真实验收：如果哪个形态写不动，说明组件还缺东西。

```sh
python3 -m http.server 8899     # file:// 下 @import 与字体会被拦，需要 http
open http://localhost:8899/examples/
```

| 形态 | 轨道 | 动效 | 看什么 |
|---|---|---|---|
| [F1 Web](./f1-web/) | 阅读轨 | E9-1 | 文章页：三档内容宽度、进场 stagger、面包屑与翻页 |
| [F2 Mobile](./f2-mobile/) | **应用轨** | E9-1 | **分轨的样子**：分组表面走边框、填充主按钮、48pt 触控、底部导航 |
| [F3 Brand](./f3-brand/) | 阅读轨 | **E9-2** | 标识变体、跨介质 CMYK/PANTONE 映射、**唯一允许的呼吸循环** |
| [F4 Print](./f4-print/) | 阅读轨 | **E8** | Van de Graaf 版面、pt 十级阶梯、首字下沉；**动效在结构上被关闭** |
| [F5 Presentation](./f5-presentation/) | 阅读轨 | E9-1 | 16:9、四种页面模式、方向键导航 |
| [F6 Documentation](./f6-documentation/) | 阅读轨 | E9-0 | **组件负担最重**：侧栏 + TOC + 搜索 + 代码块 + admonition |
| [F7 Poster](./f7-poster/) | 阅读轨 | E9-1 | 2:3 画布、对角构图、**accent 拆成标题 1 + 署名 1** |
| [F8 Diagram](./f8-diagram/) | 阅读轨 | E9-0 | 架构图：节点与连线物理隔离、编辑型框架 |
| [F9 Report](./f9-report/) | 阅读轨 | E9-0 | 摘要/发现/建议三章、编号图表、脚注 |

另有 [`gallery/`](./gallery/) —— 组件、基座、Markdown、图表四份画廊。

## 验收标准

```sh
npm run check          # token 解析 + 禁令 + 九形态审计
npm run audit:examples # 只跑审计矩阵
```

**全部九个形态 0 失败 0 警告。**

## 一个观察

每份示例都很薄 —— 引 `kit/index.css` 加一份形态 token，再加十几行本页独有样式，
剩下全是内容。F6 是组件负担最重的一个，页面私有 CSS 也只有约 10 行。

**这就是重构要证明的事**：形态之间的差异应该落在 token 与少量布局上，
而不是每个形态各自重写六千行 CSS。
