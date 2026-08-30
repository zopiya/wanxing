# F2 · Mobile

> 属于 [spec](../README.md) 形态层 — Form layer
> 轨道 Track：**`application`** · 动效 Motion：`E9-1` · 画布 Canvas：`mobile`
> 实现 Implementation：`kit/dist/wenxin-f2.css`

## 身份与边界 · Identity

F2 交付 **iOS / Android 原生质感的应用界面**。

**F2 是九个形态里唯一整体位于应用轨的。** 这不是妥协，是[双轨仲裁](../tracks.md)第二层的正确判定：
移动端有真实的平台惯例与触觉预期，把阅读轨的视觉约束硬套上去会产出一个不像 app 的 app。

## 画布与布局 · Canvas & Layout

基准 393×852（iPhone）。间距沿用 4px 网格，与 Web 一致。

**安全区域**：用 `env(safe-area-inset-*)` 避让刘海 / 灵动岛 / 底部手势条。
Home Indicator 上方额外留 `--space-2`。横屏同样适用。

## 平台适配 · Platform

**统一策略**：核心统一（色彩、字体、间距），边缘适配（导航模式、手势）。

| | iOS | Android |
|---|---|---|
| 导航栏 | Standard Title，**不用 Large Title**（克制） | Top App Bar，滚动时不隐藏 |
| 底部导航 | Tab Bar | Bottom Navigation |
| 图标 | 线条型，1.5px 描边 | 同 |
| 强调色 | `--color-accent` `#8B3525` / 暗色 `#C4533E` | 同 |

- **不使用 FAB** —— 视觉权重过高。
- **不跟随 Material You 动态取色** —— D9 暖土调属于[不变之魂](../soul/philosophy.md)。
- 保留平台特有手势（滑动返回），但过渡缓动用文心的。

## 导航 · Navigation

- **底部导航**：3–5 个 Tab，线条图标，默认 `--color-text-secondary`，激活 `--color-accent`，
  标签 `--font-ui` 12px 始终显示。未读用 accent 圆点。
- **导航栈**：push/pop 标准滑动，`--duration-slow` 420ms `--ease-out`。导航栏始终显示。
- **模态**：Sheet 半屏可拖拽，遮罩 `rgba(0,0,0,0.3)`，420ms。**不允许模态堆叠。**
- **Drawer**：导航项 >5 个或作为设置入口时使用。

## 触控 · Touch

**最小触控目标 48pt**（取 iOS 44pt 与 Android 48dp 的较大值）。
视觉元素小于此值时用 `padding` 或伪元素扩展 hit area。这是[第一层底线](../tracks.md)，无例外。

## 排版与色彩 · Type & Color

正文 **≥16px**，8 级阶梯（caption → display）。必须支持 Dynamic Type / Font Scaling。
必须支持暗色模式，跟随系统。accent ≤2 处/屏。

## 应用轨放宽的部分 · Application-track Allowances

- **`wx-list--grouped`** —— iOS 分组列表是真实平台惯例。走边框实现，**仍然禁止阴影**。
- **`wx-btn--primary`** —— 每屏至多一个填充主按钮。
- **完整语义色** —— danger / success / warning 正常使用。

## 动效 · Motion

**E9-1**，且**必须有触控反馈（视觉 + 触觉）**。
E8 印刷静止在移动端不可接受 —— 这正是 [aesthetics.md](../soul/aesthetics.md) **C-4** 点名的情形。

## 最小可交付物 · Minimum Deliverable

- [ ] 触控目标 ≥48pt
- [ ] 安全区域适配
- [ ] 底部导航 3–5 Tab
- [ ] 正文 ≥16px + Dynamic Type
- [ ] 暗色模式跟随系统
- [ ] VoiceOver / TalkBack 可用
- [ ] 触控反馈（视觉 + 触觉）映射
- [ ] 渲染契约 `profile: F2` + `track: "application"`

## 不做 · Out of scope

FAB · 模态堆叠 · Large Title · Material You 动态取色
