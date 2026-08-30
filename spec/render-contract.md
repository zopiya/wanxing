# 渲染合同 · Render Contract

> 属于 [spec](./README.md) 形态层 — Form layer
>
> **状态 · Status：`npm run check` 不再运行渲染审计。** 九份夹具页面已随
> [DECISIONS](./DECISIONS.md) **D-26** 一并删除；审计器保留为**独立工具**，
> 供使用者检查自己的页面：`npm run audit <file>`。
> 声明式的 `profileSpecificChecks` 随夹具移除 —— 没有页面声明它们时，
> 那套分派就是**看起来活着的死代码**。

一段内嵌在 `<head>` 里的 JSON，声明页面的媒介、轨道、动效预算与结构要求，
让"这份产出是否合规"从人工判断变成可以程序核对的问题。

A JSON block in `<head>` declaring the page's medium, track, motion budget, and structural
requirements — turning "is this compliant" from a judgment call into something a script checks.

---

## 格式 · Shape

版本与 profile 走 **HTML 属性**，JSON 里再声明一次 profile 供交叉核对：

```html
<html lang="zh-CN"
      data-wanxing-profile="F1"
      data-wanxing-contract-version="1"
      data-motion="E9-1">
```

```html
<script type="application/json" id="wanxing-render-contract">
{
  "profile": "F1",
  "track": "editorial",
  "project": { "name": "论克制", "slug": "on-restraint" },
  "language": "zh-CN",
  "output": { "entry": "dist/on-restraint/index.html", "tmpDir": ".tmp/on-restraint" },
  "theme": { "accentBudget": 2 },
  "motion": {
    "intensity": "E9-1",
    "maxDurationMs": 420,
    "completionSignal": "data-animations-complete"
  },
  "structure": {
    "expectedH1": 1,
    "requiredRegions": ["main"]
  }
}
</script>
```

## 字段 · Fields

| 字段 | 作用 | 缺失时 |
|---|---|---|
| `<html data-wanxing-contract-version>` | 恒为 `"1"`。**在 HTML 属性上，不在 JSON 里** | 硬失败 |
| `<html data-wanxing-profile>` | 媒介代号，须与 JSON 的 `profile` 一致 | 硬失败 |
| `profile` | 同上，JSON 侧的副本，用于交叉核对 | 硬失败 |
| `output.entry` `output.tmpDir` | 须与页面实际路径一致（`dist/<slug>/index.html`） | 硬失败 |
| `track` | `editorial` / `application`，决定视觉约束严格程度 | 按 editorial 处理 |
| `project.name` `project.slug` | 输出路径与命名核对 | 硬失败 |
| `theme.accentBudget` | accent 出现次数上限；阅读轨默认 2，应用轨默认 4 | 用默认值 |
| `motion.intensity` | `E8` / `E9-0` / `E9-1` / `E9-2`，见 [motion.md](./soul/motion.md) | 硬失败 |
| `motion.maxDurationMs` | 单次动效上限，系统封顶 600ms | 硬失败 |
| `motion.completionSignal` | 动画完成信号属性名 | 有动效时硬失败 |
| `structure.requiredRegions` | 必需的地标元素 | 不检查 |

轨道判定规则见 [tracks.md](./tracks.md)，媒介取值见 [media.md](./media.md)。

## 审计器检查什么 · What the Auditor Checks

与媒介无关的通用项，分四组：

- **合同自身** —— JSON 可解析、版本存在、profile 与 DOM 一致、项目名与 slug 匹配
- **灵魂约束** —— accent 预算、禁用的阴影 / 渐变 / 拟物滤镜 / 高饱和色
- **动效** —— `E8` 下不得定义任何动画或过渡；时长封顶；禁止旋转与弹跳缓动；
  位移 ≤16px；必须响应 `prefers-reduced-motion`；有动效时必须有完成信号
- **结构与无障碍** —— `<main>` 存在、标题层级、焦点可见、图片 `alt`、交互元素可访问名

```sh
npm run audit dist/<slug>/index.html   # 输出 JSON 报告，非零退出表示有硬失败
```

审计器假定一套输出约定：页面位于 `dist/<slug>/index.html`，slug 为小写 ASCII。
这是它从原有生成流水线继承的前提，路径不符会直接判失败。

> **它现在没有被 CI 跑。** 保留它是因为它是这套系统交付的**产物之一** ——
> 使用者可以拿它检查自己的页面。但这也意味着：**没有东西在验证审计器本身还正确。**
> 如果要重新把它纳入 `npm run check`，需要同时恢复一份负控制夹具，
> 否则就会回到"绿色输出被当成证据"的老问题。
