# 色彩系统 · Color System

> 属于 [wenxin](./README.md) 灵魂层 — Soul layer

**权威源 Authoritative source：[`tokens.css`](./tokens.css)。** 下方代码块是为方便阅读摘录的，若与 `tokens.css` 不一致，以 `tokens.css` 为准——写代码时应直接引入该文件，不要从这里的 Markdown 里手抄。

**Authoritative source: [`tokens.css`](./tokens.css).** The blocks below are excerpts for readability; if they ever diverge, `tokens.css` wins. When writing code, import that file directly — don't hand-copy from this markdown.

Token 数值已对照 `archive/wenxin/assets/css/variables.css`（真实代码实现）核验，与 `archive/gemini-gem/wenxin-spec.md` 基本一致，仅发现一处遗漏：代码里多出一个 `--color-text-tertiary`（规范文本没提到），已按"以代码为准"补入下方，见色彩约束后的说明。

Token values verified against `archive/wenxin/assets/css/variables.css` (the real code implementation) against `archive/gemini-gem/wenxin-spec.md` — one discrepancy found: the code defines an extra `--color-text-tertiary` not mentioned in the spec prose. Added below per "code wins."

---

## 亮色模式 · Light Mode

```css
:root {
  /* 背景层 Background */
  --color-bg-warm:    #F2F0EB;  /* 暖白·羊皮纸质感·首页/展示型 warm paper, hero/showcase */
  --color-bg-base:    #FAFAF8;  /* 内页背景 inner page background */
  --color-bg-pure:    #FFFFFF;  /* 纯白·文章正文区 article body */
  --color-bg-subtle:  #F0EDE7;  /* 微弱底色·代码块/引用块/标签 code/quote/tag tint */

  /* 文字层 Text */
  --color-text-primary:   #3A3837;  /* 主体·深炭色·带暖调·非纯黑 body, warm charcoal, never pure black */
  --color-text-secondary: #888580;  /* 辅助·日期/元数据 metadata */
  --color-text-muted:     #B0ABA4;  /* 弱化·版权/占位 muted/placeholder */
  --color-text-tertiary:  #C8C3BA;  /* 三级弱化，与 --color-border-strong 同值 third-level muted, same value as border-strong */
  --color-text-heading:   #2C2B29;  /* 标题·比正文略深 headings, slightly darker than body */

  /* 点睛之色 · 全页 ≤ 2 处 The single accent — ≤ 2 occurrences per page */
  --color-accent:        #8B3525;
  --color-accent-hover:  #A84030;
  --color-accent-subtle: #F5E8E5;  /* accent 的极淡背景版 accent's pale background variant */

  /* 边界 Borders */
  --color-border-subtle: #E5E1DA;
  --color-border-strong: #C8C3BA;

  /* 交互 Interaction */
  --color-link:       #3A3837;
  --color-link-hover: #8B3525;
  --color-focus:      rgba(139, 53, 37, 0.4);
}
```

## 暗色模式 · Dark Mode — 夜晚的羊皮纸 Night Vellum

不是纯黑反相，而是同一张羊皮纸被调暗。

Not an inverted pure-black theme — the same vellum, dimmed.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-warm:    #1A1816;
    --color-bg-base:    #201E1B;
    --color-bg-pure:    #242220;
    --color-bg-subtle:  #2A2724;

    --color-text-primary:   #E8E3DC;  /* 暖象牙白·非纯白 warm ivory, never pure white */
    --color-text-secondary: #8A857D;
    --color-text-muted:     #5A5550;
    --color-text-heading:   #F0EBE3;

    --color-accent:        #C4533E;  /* 暗色下略亮·保持可见性 brighter for visibility in dark */
    --color-accent-hover:  #D9614A;
    --color-accent-subtle: #2E1A16;

    --color-border-subtle: #2E2B27;
    --color-border-strong: #403C37;

    --color-link:       #E8E3DC;
    --color-link-hover: #C4533E;
    --color-focus:      rgba(196, 83, 62, 0.4);
  }
}
```

---

## 色彩约束 · Constraints

- Accent 全页出现 **≤ 2 处**；图标激活/选中态使用 Accent 不计入此限制。
  Accent appears **≤ 2 times** per page; icon active/selected states are exempt.
- 禁止：高饱和蓝、绿、紫、橙；任何渐变色背景。
  Forbidden: high-saturation blue/green/purple/orange; any gradient background.
- 正文文字对比度 ≥ 7:1（WCAG AAA），辅助文字 ≥ 4.5:1（WCAG AA）。
  Body text contrast ≥ 7:1 (WCAG AAA); secondary text ≥ 4.5:1 (WCAG AA).

见 [forbidden.md](./forbidden.md) 完整禁用清单。具体形态下的色彩应用（如海报的 accent 分配策略、文档站的语法高亮方案）见 [wanxing](../wanxing/README.md) 对应形态文件。

See [forbidden.md](./forbidden.md) for the complete list. Form-specific color applications (e.g. a poster's accent budget, a docs site's syntax-highlight palette) live in the corresponding [wanxing](../wanxing/README.md) form file.
