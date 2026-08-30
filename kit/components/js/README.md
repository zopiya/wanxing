# 行为脚本 · Behaviour Scripts

> 全部是渐进增强：**没有 JS 时页面依然可读可用**，只是少了增强。
> Progressive enhancement throughout — without JS the page still reads and works.

零依赖，无构建步骤，直接 `<script src>` 引用即可。

| 脚本 | 作用 | 必需？ |
|---|---|---|
| `animations-complete.js` | 动画完成信号 `data-animations-complete` | **是**，凡有动效的产出都要 |
| `reveal.js` | `[data-reveal]` 滚动揭示 | 否 |
| `toc.js` | `.wx-toc` 滚动高亮 | 否（F6 建议） |
| `disclosure.js` | 侧栏抽屉等展开/收起 | 否（F6/F2 建议） |
| `copy.js` | 代码块复制按钮 | 否 |

引用顺序只有一条要求：**`animations-complete.js` 必须在 `reveal.js` 之前** ——
后者要向前者登记屏障。

```html
<script src="kit/components/js/animations-complete.js"></script>
<script src="kit/components/js/reveal.js" defer></script>
```

## 三个贯穿的设计决定

**1 · 状态写进无障碍树，不写进 class**

`toc.js` 用 `aria-current` 标记当前项，`disclosure.js` 维护 `aria-expanded`，
样式表再从这些属性上取。视觉状态与无障碍树是**同一个事实**，无法各自漂移 ——
这正是这套系统不用 `.is-active` 的原因。

**2 · 隐藏状态由脚本自己加**

`reveal.js` 先给元素加 `data-reveal-pending`（`opacity: 0`），再逐个揭示。
**绝不在 HTML 里预先写隐藏状态** —— 否则脚本加载失败时，内容会永久不可见。
这是这个模式最糟的失效方式，也是它必须这样写的原因。

**3 · 完成信号要等屏障**

`getAnimations()` 只看得见已经触发的动画。滚动揭示尚未开始，
所以任何延迟触发的动效都要 `window.__wxMotion.hold(promise)` 登记，
否则页面还会动，信号就已经报"完成"了。

反过来，`reveal.js` **只登记首屏元素** —— 等待读者尚未滚动到的动效，
会让信号永远不为真。

已验证：E9-1 页面在 **487ms** 触发信号（等到了那个 420ms 的进场动画，
而不是 2 秒兜底）；E8 页面在 **48ms** 立即触发，且动画在结构上被关闭。
