# 文心动效规范 (Wenxin Motion Spec)

> Version: 1.0.0 | 2026-05-24 | Wenxin E9 / E8

---

## 1. 核心哲学

文心动效的核心命题是：**春雨润物，细节有声**。

动效不负责表演，不制造戏剧性，也不抢夺阅读。它像春雨一样，只在细节处让界面变得更顺、更暖、更有生命力。用户应当感到「这很自然」「这里被照顾到了」，而不是停下来欣赏动画本身。

这条原则继承文心三条灵魂：

- **文字即界面**：动效服务文字与状态，不替代内容。
- **留白即设计**：动效发生在留白与转换处，不挤压信息。
- **克制即力量**：动画越少，出现时越有分量。

---

## 2. 动效强度

| 等级 | 名称 | 用途 | 默认判定 |
|------|------|------|----------|
| E8 | 印刷静止 | F4 Print、静态 PDF、纯印刷输出 | 无动画、无 transition、无 hover/focus 动效 |
| E9-0 | 静水 | F6/F9 文档与报告、低交互页面 | 只允许必要状态反馈 |
| E9-1 | 春雨 | F1/F2/F5/F7 常规数字输出 | 允许轻量进场、hover、主题切换 |
| E9-2 | 微澜 | 少量需要仪式感的封面、演示、品牌场景 | 仅允许 1 个主动画焦点 |

默认使用 **E9-1 春雨**。如果用户未要求动效，不主动升级到 E9-2。

---

## 3. 时间与缓动

| Token | 值 | 用途 |
|-------|----|------|
| `--duration-instant` | `80ms` | checkbox、toggle、pressed 状态 |
| `--duration-fast` | `180ms` | hover、颜色、透明度 |
| `--duration-base` | `260ms` | 展开、折叠、局部状态变化 |
| `--duration-slow` | `420ms` | 页面/组件进场、重要状态变化 |
| `--duration-crawl` | `600ms` | 极少数仪式感动效上限 |

允许的 easing：

- `--ease-default: cubic-bezier(0.25, 0.1, 0.25, 1)`
- `--ease-out: cubic-bezier(0, 0, 0.2, 1)`
- `--ease-in: cubic-bezier(0.4, 0, 1, 1)`
- `ease-in-out` 仅用于品牌标识符呼吸

禁止 `spring`、`bounce`、`elastic`、强回弹 cubic-bezier、手写随机 easing。

---

## 4. 允许的动效

| 场景 | 动效 | 约束 |
|------|------|------|
| 链接/按钮 hover | color / opacity | `180ms`，不移动布局 |
| 图标 hover | opacity `0.6 → 1` | 不旋转、不弹跳 |
| 页面/组件进场 | opacity + `translateY(6px → 0)` | `420ms`，位移 ≤ 8px |
| 列表进场 | stagger fade-up | 每项间隔 ≤ 60ms，总时长 ≤ 600ms |
| 展开/折叠 | height / opacity / transform | `260ms`，需保留可读状态 |
| 主题切换 | color / background | `260ms`，不闪屏 |
| 品牌标识符呼吸 | opacity `1 → 0.6 → 1` | 4s 周期，唯一允许的装饰性循环 |
| loading | opacity 或细线进度 | 低频、低对比，不使用旋转 spinner |

---

## 5. 禁止的动效

以下问题属于 hard gate：

- 任何旋转动效，除非是功能性 loading 且没有更克制替代方案。
- 弹跳、回弹、果冻、橡皮筋、强 spring 运动。
- 单次位移超过 `16px`，或同屏多个区域同时大幅进场。
- duration 超过 `600ms`，不含品牌标识符 4s 呼吸。
- 非 loading / 非品牌标识符的无限循环动画。
- 视差滚动、滚动驱动的大面积运动、强吸附滚动。
- 用动画掩盖信息结构不清。
- `prefers-reduced-motion` 下仍保留装饰性动画。

以下问题属于 soft warning：

- stagger 总时长接近 `600ms`。
- 同一视口内超过 5 个元素同时进场。
- scale 动画，即使幅度很小。
- 多个 animation delay 形成明显表演感。
- 动画与用户操作无关，只为了“高级感”存在。

---

## 6. Render Contract

所有 HTML 输出的 `wanxing-render-contract` 必须声明 motion：

```json
{
  "motion": {
    "hasAnimation": true,
    "intent": "state-feedback | entrance | theme-switch | brand-breath | loading | none",
    "intensity": "E8 | E9-0 | E9-1 | E9-2",
    "maxDurationMs": 420,
    "maxTranslatePx": 8,
    "allowsLoop": false,
    "completionSignal": "data-animations-complete",
    "hasRuntimeSamplingTarget": true
  }
}
```

无动画页面也必须声明：

```json
{
  "motion": {
    "hasAnimation": false,
    "intent": "none",
    "intensity": "E9-0",
    "completionSignal": "data-animations-complete"
  }
}
```

---

## 7. 审计规则

### Static Audit

Render Contract 审计必须从 CSS/HTML 中提取：

- transition / animation 声明数量
- duration / delay / easing
- transform 中的 translate / scale / rotate
- animation iteration count
- `@keyframes` 名称与数量
- `prefers-reduced-motion`
- `data-animations-complete`

### Runtime Audit

Audit Agent 使用 Playwright 运行时采样：

```javascript
await page.evaluate(() => {
  return document.getAnimations().map((animation) => {
    const timing = animation.effect?.getTiming?.() || {};
    const target = animation.effect?.target;
    return {
      playState: animation.playState,
      currentTime: animation.currentTime,
      duration: timing.duration,
      delay: timing.delay,
      iterations: timing.iterations,
      easing: timing.easing,
      target: target ? target.tagName.toLowerCase() : null
    };
  });
});
```

运行时采样用于确认：CSS 声明是否真实运行、是否存在无限循环、动画是否在截图前完成、reduced motion 是否能关闭装饰性动画。

机器可判定项必须覆盖：duration、translate、rotate、loop、prefers-reduced-motion、completion signal。任何一项缺失或超限，先按 hard gate 处理，再进入截图层或用户判断。

---

## 8. 分级处理

| 问题 | 级别 | 处理 |
|------|------|------|
| duration > 600ms | hard gate | 自动修复为最近 token |
| translate > 16px | hard gate | 自动修复为 6-8px |
| rotate / bounce / spring | hard gate | 移除或改为 opacity |
| 缺少 reduced motion | hard gate | 自动补齐 |
| 缺少 completion signal | hard gate | 自动补齐 |
| 无限循环非例外 | hard gate | 移除循环或转为静态 |
| 动效气质是否过度 | soft warning | 交给用户决策 |
| 动效是否“温馨” | soft warning | 交给用户决策 |

---

## 9. 形态差异

- F4 Print：E8，禁止所有动效。
- F6 Documentation：E9-0，只保留侧栏、搜索、复制按钮等必要反馈。
- F9 Report：E9-0，HTML preview 可有极轻状态反馈，PDF/LaTeX 主路径无动画。
- F5 Presentation：E9-1，可有构建动画，但每页只能有一个主要节奏。
- F7 Poster：数字海报可有一次进场或品牌呼吸，印刷海报使用 E8。

---

## 10. 最小交付标准

- [ ] 动效来自 token，不写 ad-hoc duration/easing
- [ ] `prefers-reduced-motion` 完整
- [ ] `data-animations-complete` 完整
- [ ] Render Contract motion 字段完整
- [ ] 无旋转、弹跳、强视差、超长 duration
- [ ] 动效只服务状态、阅读、转换或品牌细节
