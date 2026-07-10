# F2 · 文心移动 Mobile App

> 属于 [wanxing](./README.md) 形态层 — Form layer
> 参考实例 References: [`examples/f2-mobile/`](./examples/f2-mobile/)

iOS / Android 原生感适配。F2 没有独立的散文式规范文档（源项目里其余形态各有一份 `.md` 规范，F2 没有），但 `archive/wanxing/docs/wanxing-f2-mobile/index.html` 是一份完整的渲染实例，本节从这份实例的 render-contract 与结构反推出形态规则。

iOS/Android native-feel adaptation. F2 has no standalone prose spec document (unlike the other forms, which each have one) — but the rendered instance at `archive/wanxing/docs/wanxing-f2-mobile/index.html` is complete, and this section reverse-derives the form rules from its render-contract and structure.

## 画布与视口 · Canvas & Viewport

```json
{
  "canvas": { "kind": "mobile", "viewports": ["iphone-15-pro"], "deviceWidth": 393, "deviceHeight": 852 },
  "mobile": { "platform": "ios", "touchTargetMinPt": 48, "tabCount": 3, "safeAreaSimulated": true }
}
```

- 基准设备 Baseline device：iPhone 15 Pro，393 × 852 逻辑像素 logical px
- 触控目标 Touch target：≥ 48pt（比 Web 的 44px 更严格 stricter than web's 44px）
- 暗色模式 Dark mode：必需 required（`darkModeRequired: true`）

## 页面骨架 · Page Skeleton

```
┌───────────────────────┐
│ Status Bar    16px    │  ← 系统状态栏，模拟 simulated
├───────────────────────┤
│ Nav Bar       54px    │  ← 页面标题 + 返回/操作按钮
├───────────────────────┤
│                       │
│  hero-brand section   │  ← 品牌区，参照原型 D 着陆型精神
│  ...section...        │  ← 多个 section，参照原型 A/B
│  ...section...        │
│                       │
├───────────────────────┤
│ Tab Bar       50px    │  ← 底部标签栏，3 个入口
├───────────────────────┤
│ Home Indicator 34px   │  ← iOS 手势指示条
└───────────────────────┘
```

必需区域 Required regions：`status-bar`, `nav-bar`, `content`, `tab-bar`, `home-indicator`。实测尺寸（来自参考实例的实际 CSS，非 render-contract 推断）：

Measured sizes (from the actual CSS in the reference instance, not inferred from the render-contract)：

```css
.status-bar { padding: 16px 28px 0; }         /* 时间字号 --text-base，600 字重 */
.nav-bar    { height: 54px; }                 /* 标题：--leading-tight */
.tab-bar    { height: 50px; border-top: 1px solid var(--color-border-subtle); }
.home-indicator { height: 34px; }
.home-indicator-bar {                          /* iOS 手势条本体 */
  width: 134px; height: 5px;
  background: var(--color-text-primary);
  border-radius: 100px;
  opacity: 0.2;
}
```

安全区通过 `env(safe-area-inset-*)` 实现，避开刘海屏和底部手势条；48pt 触控目标不足时用 padding 扩展点击热区，而不是放大视觉元素本身。

Safe area uses `env(safe-area-inset-*)` to dodge the notch and gesture bar; when a visual element is smaller than the 48pt touch target, extend the hit area with padding rather than enlarging the element itself.

## Token 层面的一处偏差 · A Token-Level Deviation

参考实例的 `:root` 里，`--color-text-secondary` 的取值和 [`wenxin/tokens.css`](../wenxin/tokens.css) 的权威值**不一致**，暗色模式下也是如此：

The reference instance's `:root` block gives `--color-text-secondary` a value that **doesn't match** the authoritative `wenxin/tokens.css`, in both light and dark mode:

| Token | wenxin/tokens.css（权威）| F2 示例文件里的值 |
|---|---|---|
| `--color-text-secondary`（亮色 light）| `#888580` | `#5A5550`（这其实是权威规范里"暗色模式 muted"的值）|
| `--color-text-secondary`（暗色 dark）| `#8A857D` | `#9A948D` |

这看起来是示例文件自身的一处疏漏，不是刻意的移动端专属调整——源材料里没有给出任何"移动端需要更深的次级文字色"的理由。新建 F2 产出时，**应遵循 [`wenxin/tokens.css`](../wenxin/tokens.css) 的权威值**，而不是照抄这份示例的 `:root`。

This looks like an oversight in the example file itself, not a deliberate mobile-specific adjustment — nothing in the source material argues for darker secondary text on mobile. When building new F2 output, **follow the authoritative values in `wenxin/tokens.css`**, don't copy this example's `:root` verbatim.

此外，示例引入了两个圆角 token（`--radius-sm: 2px`、`--radius-md: 4px`）——这与 [`wenxin/components.md`](../wenxin/components.md) 里"圆角 ≤ 4px"的文字规则一致，只是把它变量化了，可以视为合理扩展、不算偏差。

The example also introduces two radius tokens (`--radius-sm: 2px`, `--radius-md: 4px`) — consistent with the "radius ≤ 4px" prose rule in `wenxin/components.md`, just turned into variables. That's a reasonable extension, not a deviation.

## 动效 · Motion

```json
{
  "motion": {
    "intent": "entrance", "intensity": "E9-1",
    "maxDurationMs": 420, "maxTranslatePx": 4,
    "allowsLoop": true, "loopItems": ["brand-mark-breath"]
  }
}
```

- 进场动效沿用 [`wenxin/motion.md`](../wenxin/motion.md) 的 `--duration-slow`(420ms)，但位移幅度收得更紧（≤ 4px，比 Web 的 ≤ 16px 更克制——移动端手指已经很近，不需要大位移制造层次）。
  Entrance reuses wenxin's `--duration-slow` (420ms), but the translate distance is tighter (≤ 4px vs. web's ≤ 16px) — on a handheld screen, less motion is needed to create depth.
- 唯一允许的循环动效仍是品牌标记 ■ 的呼吸。The only allowed loop is still the ■ brand-mark breath.

## 与 F1 的差异 · Differences from F1

| 维度 Dimension | F1 Web | F2 Mobile |
|---|---|---|
| 触控目标 Touch target | ≥ 44×44px | ≥ 48pt（更严 stricter） |
| 导航 Navigation | Header 横向导航 horizontal nav | Nav Bar + 底部 Tab Bar bottom tab bar |
| 进场位移 Entrance translate | ≤ 16px | ≤ 4px |
| 安全区 Safe area | 响应式 padding responsive padding | 系统安全区模拟（notch/home indicator）simulated system safe area |

## 审计要点 · Audit Checks

`touch-targets`、`safe-area`、`tab-bar`、`nav-stack`、`reduce-motion` — 这些是源项目审计流水线对 F2 输出的专项检查项，可作为自查清单。

These are the profile-specific audit checks the source pipeline runs against F2 output — use them as a self-review checklist.

## 参考实例 · Reference Instance

[`examples/f2-mobile/index.html`](./examples/f2-mobile/index.html) — 完整 F2 render-contract 渲染示例（含上方标注的 token 偏差，新建时以 [`wenxin/tokens.css`](../wenxin/tokens.css) 为准）。
