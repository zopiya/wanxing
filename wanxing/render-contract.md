# Render Contract · 渲染合同

> 属于 [wanxing](./README.md) 形态层 — Form layer，适用于全部 F1–F9 applies to all F1–F9
> 源 Source：`archive/wanxing/.opencode/agents/wenxin/AGENT.md`「输出规则」一节 + 各形态渲染示例的内嵌 JSON

这是一份**跨全部九种形态共用**的机器可读元数据约定：每个 HTML 产出都在 `<head>` 里内嵌一段 JSON，声明自己的形态、画布、动效预算、审计项——让"这份产出是否合规"从人工判断变成可以程序核对的问题。九份参考示例（[`examples/`](./examples/) 下每个 `index.html`）都带着这份合同，本文件是把散落在各个示例里的写法统一整理出来。

This is a **shared, machine-readable metadata convention across all nine forms**: every HTML output embeds a JSON block in its `<head>` declaring its profile, canvas, motion budget, and audit checks — turning "is this output compliant" from a judgment call into something a script can check. All nine reference examples carry this contract; this file consolidates what was previously scattered across them.

---

## 三个必须元素 · Three Required Pieces

任何 F1–F9 的 HTML 产出都必须同时具备：

Any F1–F9 HTML output must carry all three:

```html
<html lang="zh-CN"
      data-wanxing-profile="F1"
      data-wanxing-contract-version="1"
      data-animations-complete="false">
<head>
  ...
  <script type="application/json" id="wanxing-render-contract">
  { "profile": "F1", ... }
  </script>
</head>
```

1. **`data-wanxing-profile`** — 声明属于哪个形态（`F1`–`F9`），与 JSON 里的 `profile` 字段一致
2. **`data-wanxing-contract-version`** — 目前固定为 `"1"`
3. **`wanxing-render-contract`** JSON — 结构化元数据，必须是合法 JSON（不允许注释、不允许尾随逗号）

---

## 最小模板 · Minimal Template

```json
{
  "profile": "F1",
  "title": "项目名",
  "date": "2026-05-24",
  "language": "zh-CN",
  "project": { "name": "项目名", "slug": "project-slug" },
  "output": { "entry": "dist/project-slug/index.html", "tmpDir": "dist/project-slug/tmp" },
  "theme": { "darkModeRequired": true, "accentBudget": 2 },
  "canvas": { "kind": "responsive", "viewports": ["desktop", "tablet", "mobile"] },
  "structure": { "requiredRegions": ["header", "main", "footer"], "primaryContent": "main", "expectedH1": 1 },
  "motion": {
    "hasAnimation": true,
    "intent": "entrance",
    "intensity": "E9-1",
    "maxDurationMs": 420,
    "maxTranslatePx": 8,
    "allowsLoop": false,
    "hasRuntimeSamplingTarget": true,
    "completionSignal": "data-animations-complete"
  },
  "audit": { "profileSpecificChecks": ["responsive", "dark-mode", "focus-visible"], "allowedDeviations": [] }
}
```

`project.slug` 必须是小写 ASCII slug（只允许 `a-z`、`0-9`、`-`）。`output.tmpDir` 只用于存放截图/运行时采样等中间文件。

## 字段说明 · Field Reference

| 字段 Field | 说明 Description |
|---|---|
| `profile` | `F1`–`F9` 之一，与 `data-wanxing-profile` 一致 |
| `theme.darkModeRequired` | 该形态是否必须支持暗色模式（印刷类 F4/F7-print 通常为 `false`，其余多为 `true`）|
| `theme.accentBudget` | Accent 出现上限，几乎总是 `2`，对应 [`wenxin/color.md`](../wenxin/color.md) 的约束 |
| `canvas.kind` | `responsive`（F1/F3/F6）/ `fixed`（F5）/ `mobile`（F2）/ `poster`（F7）/ `diagram`（F8）等 |
| `structure.requiredRegions` | 该形态必须存在的区域，如 `["header","main","footer"]`；F2 用 `["status-bar","nav-bar","content","tab-bar","home-indicator"]`，F6 加 `sidebarRequired`/`searchRequired` |
| `motion.intent` | 动效目的：`entrance`（进场）/ `state-feedback`（状态反馈，F6 用）/ `brand-breath`（品牌呼吸，F3 用）|
| `motion.intensity` | 观察到的取值：`E9-0`（几乎无动效，如 F6 文档站）/ `E9-1`（标准进场，F1/F4/F5/F7 常见）/ `E9-2`（更强，如 F3 品牌呼吸动效，`maxDurationMs: 4000`）。**这组代号的完整定义在现有 archive 材料中找不到**——本文档只是从各示例的实际取值里反推出的经验对照，不是权威解释；新建产出时按"进场用 E9-1，静态/极简用 E9-0，品牌呼吸类用 E9-2"来套用即可，不需要深究代号本身的含义。 |
| `motion.maxDurationMs` / `maxTranslatePx` | 必须 ≤ [`wenxin/motion.md`](../wenxin/motion.md) 里对应 token 的值——`--duration-slow`(420ms)/`--duration-crawl`(600ms) 封顶，位移 ≤16px（F2 移动端更严，≤4px）|
| `motion.completionSignal` | 固定为字符串 `"data-animations-complete"`，与下面的完成信号机制对应 |
| `audit.profileSpecificChecks` | 该形态的专项审计项清单（见下方各形态对照）|
| `audit.allowedDeviations` | 明确记录的、经用户确认允许偏离规范的例外——不应留空占位，没有偏离就是空数组 |

### 形态特定字段 · Profile-Specific Fields

| 形态 | 额外字段 |
|---|---|
| F2 Mobile | `canvas.viewports`、`canvas.deviceWidth/deviceHeight`、`mobile.platform`、`mobile.touchTargetMinPt`、`mobile.tabCount`、`mobile.safeAreaSimulated` |
| F3 Brand | `brand.logoType`、`brand.logoColors`、`brand.logoStrokeWidth`、`brand.logoCornerRadius`、`brand.logoVariants` |
| F4 Print | `canvas.pageSize`、`canvas.printOnly: true`、`canvas.bleedMm`、`theme.darkModeRequired: false` |
| F5 Presentation | `canvas.aspectRatio: "16:9"`、`slides.count`、`slides.types`、`interaction.keyboardNavigation: true` |
| F6 Documentation | `structure.sidebarRequired`、`structure.searchRequired`、`structure.content.codeBlocksExpected` |
| F7 Poster | `canvas.ratio`、`canvas.safeAreaPercent`、`canvas.printOrDigital` |
| F8 Diagram | `canvas.kind: "diagram"`、`diagram.type`、`diagram.nodes.count`、`diagram.edges.count` |
| F9 Report | `source.format: "markdown"`、`target.format: "latex-pdf"`、`report.sections`、`report.citationRequired` |

各形态实际取值可直接参考 [`examples/`](./examples/) 下对应 `index.html` 里的真实 JSON。

## 动画完成信号 · Animation Completion Signal

所有 HTML 输出必须在 `<html>` 上设置 `data-animations-complete`，供截图/审计工具判断"动效播完了没有"：

1. 初始状态必须是 `"false"`：
   ```html
   <html data-animations-complete="false"></html>
   ```
2. 所有进场动效结束后，用 `</body>` 前的内联脚本设为 `"true"`：
   ```html
   <script>
     (function () {
       var html = document.documentElement;
       var MAX_WAIT = 3000; // 安全超时 3 秒 safety timeout
       var timedOut = false;
       var safetyTimer = setTimeout(function () {
         timedOut = true;
         html.dataset.animationsComplete = "true";
       }, MAX_WAIT);
       function markComplete() {
         if (timedOut) return;
         clearTimeout(safetyTimer);
         html.dataset.animationsComplete = "true";
       }
       function waitForAnimations() {
         var animations = document.getAnimations();
         if (!animations || animations.length === 0) { markComplete(); return; }
         Promise.allSettled(Array.from(animations).map(function (a) { return a.finished; }))
           .then(markComplete);
       }
       if (document.readyState === "loading") {
         document.addEventListener("DOMContentLoaded", waitForAnimations);
       } else {
         waitForAnimations();
       }
     })();
   </script>
   ```

关键约束 Key constraints：
- 无动画的页面也必须设置此属性（直接标记完成）。Pages with no animation still set this attribute (mark complete immediately).
- 3 秒安全超时，防止 `getAnimations()` 的 Promise 永不 resolve。3-second safety timeout in case a Promise never resolves.
- `prefers-reduced-motion` 启用时动画被跳过，信号仍需正常设置。Still set the signal even when `prefers-reduced-motion` skips the animation.
- 此脚本不产生任何视觉副作用。The script itself has no visual side effects.

## 为什么这值得遵守 · Why This Is Worth Following

即使没有接入实际的审计流水线，这套合同也值得在任何新产出里保留，原因：

Even without a real audit pipeline behind it, keeping this contract in any new output is worth it because:

- 它把「这个页面是不是符合文心规范」从主观判断变成了可以 diff、可以 grep 的结构化数据。
  It turns "does this page follow the Wenxin spec" from a subjective call into diffable, greppable structured data.
- `theme.accentBudget`、`motion.maxDurationMs` 等字段直接对应 [`wenxin/forbidden.md`](../wenxin/forbidden.md) 里的硬性约束，声明出来等于把自审清单嵌进了产出本身。
  Fields like `theme.accentBudget` and `motion.maxDurationMs` map directly onto the hard constraints in wenxin's forbidden list — declaring them embeds the self-check into the artifact itself.
- 配合 [`how-to-use.md`](./how-to-use.md) 的自审流程，这份 JSON 就是自审清单的机器可读版本。
  Paired with the self-audit loop in `how-to-use.md`, this JSON is the machine-readable form of that same checklist.
