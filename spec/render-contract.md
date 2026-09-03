# 渲染合同 · Render Contract

> 属于 [spec](./README.md) 形态层 — Form layer
>
> **状态 · Status：`npm run check` 包含 `check:render-audit`。** 它用一份可通过夹具，
> 加上缺少主地标、非法轨道和阅读轨着陆页错误主 CTA 等故意缺陷验证审计器本身；
> 它**不会自动审计每个消费者页面**。消费者仍须在自己的输出目录显式运行审计。

一段内嵌在 `<head>` 里的 JSON，声明页面的媒介、轨道、动效预算与结构要求，
让一部分明确的合同与 DOM 约束可以程序核对，而不是把所有视觉和交互判断伪装成自动结论。

A JSON block in `<head>` declaring the page's medium, track, motion budget, and structural
requirements — making explicit contract and DOM obligations checkable, without pretending to replace
browser, assistive-technology, or design review.

---

## 格式 · Shape

版本与 profile 走 **HTML 属性**，JSON 里再声明一次 profile 供交叉核对。下面是一份可直接
放在 `dist/on-restraint/index.html` 的最小完整文件；它的路径与合同字段彼此匹配，运行审计时没有
硬失败。

```html
<!doctype html>
<html lang="zh-CN"
      data-wanxing-profile="F1"
      data-wanxing-contract-version="1"
      data-motion="E8"
      data-animations-complete>
<head>
  <meta charset="utf-8">
  <script type="application/json" id="wanxing-render-contract">
  {
    "profile": "F1",
    "track": "editorial",
    "project": { "name": "论克制", "slug": "on-restraint" },
    "language": "zh-CN",
    "output": {
      "entry": "dist/on-restraint/index.html",
      "tmpDir": "dist/on-restraint/tmp"
    },
    "theme": { "accentBudget": 2 },
    "motion": {
      "intensity": "E8",
      "maxDurationMs": 0,
      "completionSignal": "data-animations-complete"
    },
    "structure": { "expectedH1": 1, "requiredRegions": ["main"] }
  }
  </script>
</head>
<body><main><h1>论克制</h1></main></body>
</html>
```

## 字段 · Fields

| 字段 | 作用 | 缺失时 |
|---|---|---|
| `<html data-wanxing-contract-version>` | 恒为 `"1"`。**在 HTML 属性上，不在 JSON 里** | 硬失败 |
| `<html data-wanxing-profile>` | 媒介代号，须与 JSON 的 `profile` 一致 | 硬失败 |
| `profile` | 同上，JSON 侧的副本，用于交叉核对 | 硬失败 |
| `output.entry` `output.tmpDir` | 须与页面实际路径一致（`dist/<slug>/index.html`） | 硬失败 |
| `track` | 仅 `editorial` / `application`，决定视觉约束严格程度 | 缺失按 editorial；其他值硬失败，且仍按 editorial 收紧 |
| `project.name` `project.slug` | 输出路径与命名核对 | 硬失败 |
| `theme.accentBudget` | accent 出现次数上限；阅读轨默认 2，应用轨默认 4 | 用默认值 |
| `motion.intensity` | `E8` / `E9-0` / `E9-1` / `E9-2`，见 [motion.md](./soul/motion.md) | 硬失败 |
| `motion.maxDurationMs` | 单次动效上限，系统封顶 600ms | 硬失败 |
| `motion.completionSignal` | 动画完成信号属性名；当前实现要求所有输出都暴露它（即使是 `E8`） | 硬失败 |
| `structure.requiredRegions` | 必需的地标元素 | 不检查 |

轨道判定规则见 [tracks.md](./tracks.md)，媒介取值见 [media.md](./media.md)。

## 审计器检查什么 · What the Auditor Checks

与媒介无关的通用项，分四组：

- **合同自身** —— JSON 可解析、版本存在、profile 与 DOM 一致、项目名与 slug 匹配
- **灵魂约束** —— 在内联 `<style>` 与 `style` 属性里检查 accent 预算、禁用的阴影 / 渐变 / 拟物滤镜 / 高饱和色
- **动效** —— `E8` 下不得定义任何动画或过渡；时长封顶；禁止旋转与弹跳缓动；
  位移 ≤16px；必须响应 `prefers-reduced-motion`；有动效时必须有完成信号
- **结构与无障碍** —— `<main>` 存在、标题层级、焦点可见、图片 `alt`、交互元素可访问名

```sh
npm run audit -- dist/<slug>/index.html   # 输出 JSON 报告，非零退出表示有硬失败
```

审计器假定一套输出约定：页面位于 `dist/<slug>/index.html` 或 `app/<slug>/index.html`，slug 为小写 ASCII。
这是它从原有生成流水线继承的前提，路径不符会直接判失败。

## 覆盖边界 · Coverage Boundary

`hardGates` 为空只表示**合同、HTML DOM、内联 `<style>` 与 `style` 属性**通过了当前可执行门槛。
它不读取 `<link rel="stylesheet">` 指向的 CSS，也不执行浏览器来获得计算后样式；发现外链样式表时，
报告会给出 `coverage.linked_stylesheet_uninspected` 警告。这不是失败的替代品，而是证据边界。

因此消费者交付前仍需做三件事：按 [tracks.md](./tracks.md) 人工判定不可机械化规则、在浏览器检查
视觉与窄屏、用真实辅助技术走关键交互。`check:render-audit` 已验证审计器自身的正反夹具；它不替你验证
你的产品页面。
