# 动效系统 · Motion

> 属于 [spec](../README.md) 灵魂层 — Soul layer
> 权威源 Authoritative source：`kit/tokens/core.css` —— 下方为摘录，冲突以该文件为准。

## 核心哲学 · Core Philosophy

> **春雨润物，细节有声。**
> **Spring rain nourishes quietly; the details still speak.**

动效不负责表演，不制造戏剧性，也不抢夺阅读。它像春雨一样，只在细节处让界面更顺、更暖、更有生命力。
读者应当感到"这很自然""这里被照顾到了"，而不是停下来欣赏动画本身。

Motion does not perform. The reader should feel *this is natural* — never stop to admire the animation.

三条灵魂原则在动效上的投影：
- **文字即界面** —— 动效服务文字与状态，不替代内容。
- **留白即设计** —— 动效发生在留白与转换处，不挤压信息。
- **克制即力量** —— 动画越少，出现时越有分量。

---

## 动效强度 · Motion Intensity

这是 E 维度（[七维度模型](./philosophy.md#七维度模型--the-seven-dimension-model)）的分级。
**渲染契约里的 `E8` / `E9-0` / `E9-1` / `E9-2` 就是这四个值** —— 它们不是随手编的字符串。

| 等级 | 名称 | 用途 | 判定 |
|---|---|---|---|
| **E8** | 印刷静止 Print Stillness | F4 印刷、静态 PDF、印刷海报 | 无动画、无 transition、**无 hover/focus 动效、无暗色模式** |
| **E9-0** | 静水 Still Water | F6 文档、F9 报告等低交互页面 | 只允许必要的状态反馈 |
| **E9-1** | 春雨 Spring Rain | F1 / F2 / F5 / F7 数字输出 | 允许轻量进场、hover、主题切换 |
| **E9-2** | 微澜 Faint Ripple | 需要仪式感的封面、演示、品牌场景 | 仅允许 **1 个**主动画焦点 |

**默认 E9-1。** 用户未要求动效时，不主动升级到 E9-2。

### 强度是运行时开关，不是文档声明

在 `<html>` 上声明 `data-motion`，`kit/base/motion.css` 据此结构性地关闭动效：

```css
[data-motion="E8"] * { animation: none !important; transition: none !important; }
[data-motion="E9-0"] .wx-reveal { animation: none; }
```

这样 F4 印刷输出**在结构上不可能**带有动效，正好对应审计器对 F4 的断言。

Declaring the level actually disables motion, rather than merely asserting its absence.

---

## 时间与缓动 · Duration & Easing

| Token | 值 | 用途 |
|---|---|---|
| `--duration-instant` | `80ms` | checkbox、toggle、按下态 |
| `--duration-fast` | `180ms` | hover、颜色、透明度 |
| `--duration-base` | `260ms` | 展开、折叠、局部状态变化 |
| `--duration-slow` | `420ms` | 页面/组件进场、重要状态变化 |
| `--duration-crawl` | `600ms` | 仪式感动效的**上限** |
| `--duration-breath` | `4000ms` | 品牌标识符呼吸周期，唯一例外 |

**缓动**
- `--ease-default: cubic-bezier(0.25, 0.1, 0.25, 1)`
- `--ease-out: cubic-bezier(0, 0, 0.2, 1)`
- `--ease-in: cubic-bezier(0.4, 0, 1, 1)`
- `--ease-in-out` —— **仅**用于品牌标识符呼吸

**禁止**：`spring`、`bounce`、`elastic`、强回弹 cubic-bezier、手写随机 easing。

> [aesthetics.md](./aesthetics.md) 的 **P-7** 要求时长随元素大小与位移缩放：
> 小元素（按钮、开关）≤150ms，大元素（页面、模态）≥200ms。上表的分级正是为此设计的。

---

## 允许的动效 · Allowed Motion

| 场景 | 动效 | 约束 |
|---|---|---|
| 链接/按钮 hover | color / opacity | `180ms`，**不移动布局** |
| 图标 hover | opacity `0.6 → 1` | 不旋转、不弹跳 |
| 页面/组件进场 | opacity + `translateY(6px → 0)` | `420ms`，**位移 ≤8px** |
| 列表进场 | stagger fade-up | 每项间隔 ≤60ms，**总时长 ≤600ms** |
| 展开/折叠 | height / opacity / transform | `260ms`，需保留可读状态 |
| 主题切换 | color / background | `260ms`，不闪屏 |
| 品牌标识符呼吸 | opacity `1 → 0.6 → 1` | 4s 周期，**唯一允许的装饰性循环** |
| loading | opacity 或细线进度 | 低频低对比，**不使用旋转 spinner** |

---

## 禁止的动效 · Forbidden Motion

**硬性阻断 Hard gate**
- 任何旋转动效 —— 除非是功能性 loading 且无更克制的替代
- 弹跳、回弹、果冻、橡皮筋、强 spring
- 单次位移 >16px，或同屏多区域同时大幅进场
- duration >600ms（品牌呼吸的 4s 除外）
- 非 loading、非品牌标识符的无限循环
- 视差滚动、滚动驱动的大面积运动、强吸附滚动
- **用动画掩盖信息结构不清**
- `prefers-reduced-motion` 下仍保留装饰性动画

**软性警告 Soft warning**
- stagger 总时长接近 600ms
- 同一视口内 >5 个元素同时进场
- scale 动画，即使幅度很小
- 多个 delay 形成明显的表演感
- **动画与用户操作无关，只为"高级感"存在**

---

## 尊重用户偏好 · Respecting Motion Preference

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**但状态反馈必须保留**（[aesthetics.md](./aesthetics.md) A-3）：
减少动效不等于取消反馈。焦点态、错误提示、加载指示在该模式下依然要能被看到 ——
移除的是装饰，不是信息。

Reduced motion removes decoration, never information.

---

## 动画完成信号 · Animation Completion Signal

供截图、导出、审计工具判断"页面已稳定"：

```html
<html data-animations-complete="false">
```

进场动画结束后置为 `"true"`，并带 3 秒兜底超时。
实现只有一份：`kit/components/js/animations-complete.js`，
页面引用它而不是各自复制 —— 这样兜底逻辑不会在多处漂移。

配合滚动揭示时需注意：`getAnimations()` 看不到尚未触发的动画，
因此 reveal 必须与完成信号共用同一个屏障，否则"完成"会被提前判定。

---

## 各形态的动效差异

见 [../forms/DECISIONS-MATRIX.md](../forms/DECISIONS-MATRIX.md) §五。
关键差异：**F4 = E8**（印刷静止），**F9 = E9-0**（静水）——
这两者不同是设计，不是数据错误。

**F2 移动端是明确的例外**：必须有触控反馈（视觉 + 触觉），push/pop 420ms。
E8 在移动端不可接受 —— 这正是 [aesthetics.md](./aesthetics.md) **C-4「动效-交互一致」**点名的情形。
