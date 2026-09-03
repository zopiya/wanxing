# 色彩系统 · Color System

> 属于 [spec](../README.md) 灵魂层 — Soul layer

**权威源 Authoritative source：[`kit/tokens/core.css`](../../kit/tokens/core.css)。** 下方代码块是为方便阅读摘录的，若与 `kit/tokens/core.css` 不一致，以 `kit/tokens/core.css` 为准——写代码时应直接引入该文件，不要从这里的 Markdown 里手抄。

**Authoritative source: [`kit/tokens/core.css`](../../kit/tokens/core.css).** The blocks below are excerpts for readability; if they ever diverge, `kit/tokens/core.css` wins. When writing code, import that file directly — don't hand-copy from this markdown.

Token 数值已对照真实代码实现与四个生产站点核验。田野审计发现旧辅助文字灰只有
1.54–3.23:1；`zopiya.com` 与博客各自引入的 `#706D68` 实测 4.52:1，现已吸收为
functional ink。取材来源见 [PROVENANCE.md](../PROVENANCE.md) 与 [FIELD-AUDIT.md](../FIELD-AUDIT.md)。

**文字只有四档**：`heading` / `primary` / `secondary` / `functional`，相邻明度差 ΔL\* ≥ 11。
AA 底线把可用明度压在 L\* 23.7–46.2 之间，这段距离容不下更多可辨层级 ——
原先的 `muted` 与 `tertiary` 已在 [D-20](../DECISIONS.md) 中并入与删除。

There are exactly four text tiers. The AA floor bounds the usable lightness range, and that range
does not hold more distinguishable steps — so `muted` and `tertiary` were merged away rather than
kept as names that rendered identically.

Token values were verified against both the implementation and four production sites. Field evidence
exposed 1.68–3.23:1 legacy greys; the independently adopted `#706D68` measures 4.52:1 and is now the
functional-ink floor.

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
  --color-text-secondary:  #55524E;  /* 辅助正文 supporting copy · 6.82:1 */
  --color-text-functional: #706D68;  /* 日期/元数据/控件/占位符 functional copy · 4.52:1 */
  --color-text-heading:   #2C2B29;  /* 标题·比正文略深 headings, slightly darker than body */

  /* 点睛之色 · 阅读轨内容页 ≤ 2 处 Editorial content pages: ≤ 2 occurrences */
  --color-accent:        #8B3525;
  --color-accent-hover:  #A84030;
  --color-accent-subtle: #F5E8E5;  /* accent 的极淡背景版 accent's pale background variant */
  --color-on-accent:     #FFFFFF;  /* 暗色为 #1A1816；保证填充按钮文字 AA */

  /* 语义色 Semantic — 不计入 accent 预算 not part of the accent budget */
  --color-danger:         #5C1F2F;  /* 牛血红 oxblood   10.90:1 */
  --color-danger-subtle:  #F2E8EB;
  --color-warning:        #7D5E12;  /* 赭黄 ochre        5.30:1 */
  --color-warning-subtle: #F2EFE8;
  --color-success:        #4F6B3A;  /* 苔绿 moss         5.27:1 */
  --color-success-subtle: #ECF2E8;

  /* 边界 Borders */
  --color-border-subtle: #E5E1DA;
  --color-border-strong: #C8C3BA;

  /* 交互 Interaction */
  --color-link:       #3A3837;
  --color-link-hover: #8B3525;
  --color-focus:      #8B3525;
}
```

## 暗色模式 · Dark Mode — 夜晚的羊皮纸 Night Vellum

不是纯黑反相，而是同一张羊皮纸被调暗。

Not an inverted pure-black theme — the same vellum, dimmed.

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg-warm:    #1A1816;
    --color-bg-base:    #201E1B;
    --color-bg-pure:    #242220;
    --color-bg-subtle:  #2A2724;

    --color-text-heading:   #F0EBE3;
    --color-text-primary:   #E8E3DC;  /* 暖象牙白·非纯白 warm ivory, never pure white */
    --color-text-secondary:  #B5AFA6;  /* 8.13:1 on night ground */
    --color-text-functional: #8A857D;  /* 4.83:1 on night ground */

    --color-accent:        #CF5F4A;
    --color-accent-hover:  #DE7059;
    --color-accent-subtle: #2E1A16;
    --color-on-accent:     #1A1816;

    --color-danger:         #C6697E;
    --color-warning:        #B3871A;
    --color-success:        #739B53;

    --color-border-subtle: #2E2B27;
    --color-border-strong: #403C37;

    --color-link:       #E8E3DC;
    --color-link-hover: #CF5F4A;
    --color-focus:      #CF5F4A;
  }
}
/* [data-theme="dark"] 另有一份等值覆盖，让手动切换在两个方向上都能赢。
   A matching [data-theme="dark"] block lets the manual toggle win either way. */
```

> **这一节曾经只是文字。** `core.css` 声明了 `color-scheme: light dark`，
> 却从未定义任何暗色值 —— 规范承诺了暗色模式，代码没有兑现。现已落地为
> [`kit/tokens/dark.css`](../../kit/tokens/dark.css)。
>
> 落地时发现旧文档记载的 accent 暗色值 `#C4533E` 在夜底上只有 **3.92:1**，
> **不满足正文级 AA**。已在保持色相与饱和度不变的前提下抬升明度至 `#CF5F4A`（4.54:1）。
> 见 [DECISIONS.md](../DECISIONS.md) **D-9**。

---

## 色彩约束 · Constraints

- 阅读轨内容页的 Accent 出现 **≤ 2 处**；图标激活/选中态使用 Accent 不计入此限制。
  数据录入提交与反馈收束按第三层；应用轨的其余强调按页面合同。
  Editorial content pages use Accent **≤ 2 times**; icon active/selected states are exempt.
  Data-entry submit and feedback closure follow layer three; other application emphasis follows the page contract.
- 禁止：高饱和蓝、绿、紫、橙作为**装饰或强调**；任何渐变色背景。
  **语义色不在此列** —— danger / warning / success 是信息通道，见下一节。
  Forbidden as *decoration or emphasis*: high-saturation blue/green/purple/orange; any gradient.
  Semantic colors are exempt — they are an information channel, not decoration.
- 正文文字对比度 ≥ 7:1（WCAG AAA），辅助文字 ≥ 4.5:1（WCAG AA）。
  Body text contrast ≥ 7:1 (WCAG AAA); secondary text ≥ 4.5:1 (WCAG AA).
- 边框色不是文字色。`--color-border-*` 不得拿来排日期、版权、breadcrumb 或 placeholder。
  Border colours are not text colours. Never use them for metadata, copyright, breadcrumbs, or placeholders.

见 [forbidden.md](./forbidden.md) 完整禁用清单。具体形态下的色彩应用（如海报的 accent 分配策略、文档站的语法高亮方案）见 [形态层 forms](../media.md) 对应形态文件。

See [forbidden.md](./forbidden.md) for the complete list. Form-specific color applications (e.g. a poster's accent budget, a docs site's syntax-highlight palette) live in the corresponding [形态层 forms](../media.md) form file.


---

## 语义色 · Semantic Colors

语义色是[双轨仲裁第一层](../tracks.md)要求的信息通道，不是装饰。
它们**不计入 accent 预算**，也不属于"高饱和装饰色"禁令的范围。

Semantic colors are an information channel required by the accessibility floor — not decoration.
They are exempt from the accent budget and from the ban on saturated decorative color.

| Token | 亮色 | 暗色 | 对暖白对比 |
|---|---|---|---|
| `--color-danger` | `#5C1F2F` 牛血红 | `#C6697E` | 10.90:1 / 暗色 subtle 上 4.61:1 |
| `--color-warning` | `#7D5E12` 赭黄 | `#B3871A` | 5.30:1 / 暗色 subtle 上 4.64:1 |
| `--color-success` | `#4F6B3A` 苔绿 | `#739B53` | 5.27:1 / 暗色 subtle 上 4.61:1 |

### 三条使用规则

**1 · 永远与文字同时出现。** 颜色不可单独承载信息 —— 一个只靠红色表示的错误，
对色盲用户等于不存在。这是阻断性要求，不是建议。

**2 · 一个 token 只有一个语义用途**（准则 **C-6**）。
不要把 danger 当装饰性的红，也不要把 accent 当 error 色。

**3 · 它们不消耗 accent 预算。** 一个页面可以同时有 2 处 accent 和若干处错误提示，
因为它们回答的是不同的问题：accent 说"看这里"，语义色说"这是什么状态"。

### 为什么是这三个值

选值不是凭感觉，是在暖土色域内解一个约束问题：
**全部 ≥4.5:1（AA）**，**彼此两两可区分**，**且不与正文色混淆**。

最小两两色差 **ΔE = 28**（accent ↔ danger），四色互不混淆。
danger 之所以是深牛血红而非常见的亮红：亮红属于被禁的高饱和色，
而在暖土色域内，能与砖红 accent 拉开距离的方向只有"更深、更冷"。
判定过程见 [DECISIONS.md](../DECISIONS.md) **D-2**。

The values solve a constraint problem inside the warm-earth gamut: all AA-compliant, mutually
distinguishable, and never confusable with body text. Danger is a deep oxblood rather than a bright
red because bright red is a forbidden saturated color — within this gamut, the only direction that
separates from the brick accent is *deeper and cooler*.
