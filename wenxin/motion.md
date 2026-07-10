# 动效系统 · Motion

> 属于 [wenxin](./README.md) 灵魂层 — Soul layer
> 权威源 Authoritative source：[`tokens.css`](./tokens.css)——下方为摘录，冲突以该文件为准。Excerpts below; `tokens.css` wins on conflict.

春雨润物 — "Spring rain nourishes; details have a sound." 动效只存在于 hover、状态变化、进场，以及 ■ 品牌标记的 4 秒呼吸。

Motion exists only at hover, state-change, entrance, and the 4-second breath of the ■ brand mark.

## 时间与缓动 · Duration & Easing

```css
:root {
  --duration-instant: 80ms;   /* 即时反馈·checkbox/toggle instant feedback */
  --duration-fast:   180ms;   /* 颜色/透明度过渡 color/opacity transitions */
  --duration-base:   260ms;   /* 标准交互·hover/展开 standard interaction */
  --duration-slow:   420ms;   /* 进场·重要状态变化 entrance, important state change */
  --duration-crawl:  600ms;   /* 特殊仪式感动效，绝对上限 ceremonial ceiling */

  --ease-default: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-out:     cubic-bezier(0, 0, 0.2, 1);   /* 进场·先快后慢 entrance */
  --ease-in:      cubic-bezier(0.4, 0, 1, 1);   /* 退场·先慢后快 exit */

  /* 列表 stagger 延迟，60ms 间隔，覆盖最多 8 项 stagger delays at 60ms intervals, up to 8 items */
  --stagger-1: 60ms;  --stagger-2: 120ms; --stagger-3: 180ms; --stagger-4: 240ms;
  --stagger-5: 300ms; --stagger-6: 360ms; --stagger-7: 420ms; --stagger-8: 480ms;
}
```

`--stagger-N` 这组 token 只在代码实现里出现，规范原文只以"每项间隔 60ms"的文字描述存在——两者数值一致，这里补上代码变量名方便直接引用。

The `--stagger-N` tokens exist only in the code implementation; the spec prose only describes "60ms interval" in words. Values match — the variable names are added here for direct use.

## 允许的动效 · Allowed Motion

| 场景 Context | 动效 Motion | 参数 Parameters |
|------|------|------|
| 链接/按钮 Hover | `color` 过渡 transition | `--duration-fast`, `--ease-default` |
| 图标 Hover | `opacity` 0.6↔1 | `--duration-fast` |
| 页面/组件进场 Entrance | `opacity 0→1` + `translateY(6px→0)` | `--duration-slow`, `--ease-out` |
| 列表项进场 List entrance | stagger fadeUp | 每项间隔 60ms interval |
| 品牌标记呼吸 Brand-mark breath | `opacity 1↔0.6` | 周期 4s cycle, `ease-in-out`, 循环 loop |
| 深/亮色模式切换 Theme switch | 全局 `color`/`background` | `--duration-base` |

## 禁止的动效 · Forbidden Motion

- 旋转、弹跳、位移超过 16px。Rotation, bounce, translation beyond 16px.
- 循环动效（品牌标记呼吸和 loading 状态除外）。Looping animation (except the brand-mark breath and loading states).
- 任何主动抢夺用户注意力的动效。Anything that actively grabs the user's attention.

## 尊重用户偏好 · Respecting Motion Preference

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

各具体形态的动效细节（幻灯片切换、图表进场、印刷品的完全静止）在对应的 [wanxing](../wanxing/README.md) 形态文件中定义，均以此处的时长/缓动 token 为基准，不新造数值。

Form-specific motion details (slide transitions, diagram entrance, print's total stillness) are defined in the corresponding wanxing form files — all derived from these duration/easing tokens, never inventing new values.
