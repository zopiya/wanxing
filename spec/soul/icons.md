# 图标系统 · Icon System

> 属于 [spec](../README.md) 灵魂层 — Soul layer

图标是文字的替代，不是文字的装饰。它的存在理由只有一个：比文字更直接地传达已形成共识的语义。

An icon substitutes for a word, it does not decorate one. Its only reason to exist: convey an already-settled meaning more directly than text.

## 使用原则 · Usage Principles

**用图标的场景 When to use an icon:**
- 语义已是全球共识的功能符号（搜索、设置、关闭、菜单、用户等）
  The meaning is a globally settled symbol (search, settings, close, menu, user, etc.)
- 空间有限、文字会造成拥挤的导航/工具栏区域
  Space is tight and text would crowd a nav/toolbar
- 与文字并排，作为视觉辅助加速识别
  Running beside text, as a visual accelerant

**不用图标的场景 When not to:**
- 语义模糊、没有广泛共识——此时必须用文字
  The meaning is ambiguous or not widely agreed — use words instead
- 纯装饰目的 Purely decorative purposes
- 正文段落中（图标属于 UI 层，不属于内容层）
  Inside body paragraphs — icons belong to the UI layer, not the content layer

```
✅ 正确 Correct: [图标] 工具 [icon] Tools    ← 图标 + 文字，语义清晰
❌ 错误 Wrong: [图标]                        ← 孤立图标，用户需要猜
```

## 视觉规格 · Visual Spec

```
描边宽度 stroke width：1.5px（统一，不随尺寸变化 uniform, never scales with size）
填充 fill：无（纯线条型 none — stroke only）
圆角 radius：与图标库默认保持一致，不额外修改 follow library default, don't override
尺寸 sizes：见 [spacing.md](./spacing.md) --icon-sm / --icon-md / --icon-lg
```

**颜色状态 Color states:**

| 状态 State | 颜色 Color | 过渡 Transition |
|------|------|------|
| 默认 Default | `--color-text-secondary` | — |
| Hover | `--color-text-primary` | `--duration-fast` |
| 激活/选中 Active/selected | `--color-accent` | `--duration-fast` |
| 禁用 Disabled | `--color-text-functional` | — |

## 图标与文字混排 · Icon + Text

```
对齐 alignment：垂直居中 vertically centered (align-items: center)
间距 gap：图标与文字之间 --space-2（8px）
尺寸匹配 size matching：
  正文 17px → --icon-md（20px）
  小字 13px → --icon-sm（16px）
```

## 推荐图标库 · Recommended Libraries

以下两个库均为线条风格，以此为主，同一产品内保持使用一个库，不混用。

Both libraries below are stroke-style. Pick one per product — never mix two libraries on the same page.

**Lucide**（lucide.dev）
- 描边约 2px（可覆盖为 1.5px）Default ~2px stroke (override to 1.5px)
- 线条简洁、几何感强 Clean, geometric
- 适合 Best for：功能型 UI、工具类产品、导航栏 tool-style UI, nav bars
- 优势 Strength：图标数量大、更新活跃、React/Vue 官方组件 large set, actively maintained

**Phosphor Icons**（phosphoricons.com）
- 提供 Thin / Light / Regular / Bold 多字重 multiple weights
- Light / Thin 档与文心的轻盈气质最吻合 Light/Thin matches Wenxin's airiness best
- 适合 Best for：展示型页面、内容型产品 editorial and content-heavy pages
- 优势 Strength：同图标多字重，灵活度高 flexible weight range

**选用建议 Recommendation：**
- 工具型、功能型页面 → 优先 Lucide. Tool/functional pages → prefer Lucide.
- 展示型、内容型页面 → 优先 Phosphor（Light 或 Regular）. Editorial/content pages → prefer Phosphor Light/Regular.

---

历史 F1 示例实际未使用任何图标库，仅用 Unicode `↓` `→`——这是能省则省时最文心的选择。完整历史材料冻结在 [`PROVENANCE.md`](../PROVENANCE.md) 所指的 commit `93fba710`。

The historical F1 example uses no icon library at all — only Unicode `↓` and `→`. That is the most Wenxin-correct choice when you can get away with it. Its frozen source is identified in [`PROVENANCE.md`](../PROVENANCE.md) at commit `93fba710`.
