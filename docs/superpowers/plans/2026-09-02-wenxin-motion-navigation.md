# Wenxin Motion and Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 消除一级导航切换时的几何跳动，并把文心四档动效哲学落成全站默认行为、首页提示与可操作展示页。

**Architecture:** 生成站仍以 `site/_shell.html`、`site/_nav.json`、`site/_pages/*` 为真源；站点壳层只接入默认动效强度和完成信号，页面级演示由独立 ES module 管理。数值全部复用 `kit/tokens/core.css`，不添加依赖。

**Tech Stack:** HTML、CSS Cascade Layers、原生 ES modules、Node.js 自检、现有静态站生成器。

**Spec:** `docs/superpowers/specs/2026-09-02-wenxin-motion-navigation-design.md`

## Global Constraints

- 保留现有 dirty worktree 中全部用户改动，不重置、不覆盖无关文件。
- 只改生成源，构建后再更新 `site/*.html`。
- 新检查必须先在旧实现上失败，再以最小实现转绿。
- 不提交、不推送、不部署，除非用户另行授权。

---

## Task 1: Lock the regression contract

- [x] 新建 `tests/site-motion-selftest.mjs`，用生成器产出的导航模型和最小 DOM 夹具验证七项导航顺序、当前项零几何增量、默认强度、首页继续阅读控制与四档演示行为。
- [x] 在旧实现上运行测试，记录预期失败，证明检查能抓住当前缺陷。
- [x] 将检查接入 `package.json` 的 `npm run check`。

## Task 2: Stabilize the primary navigation

- [x] 在 `site/assets/site.css` 为所有一级链接预留相同的透明下边线和底部内边距，当前项只改边线颜色。
- [x] 在移动断点统一品牌、目录按钮与主题开关所在首行的最小高度。
- [x] 验证窄视口断点下首页与内页页头高度一致，当前项文字基线不变。

## Task 3: Wire the site motion baseline

- [x] 在 `site/_shell.html` 声明 `data-motion="E9-1"` 和初始完成信号，并加载 `animations-complete.js`。
- [x] 把首页静态箭头改为真实的“继续阅读”锚点，使用一次有限入场与悬停/聚焦位移。
- [x] 为减少动效和 E8/E9-0 提供无空间运动路径。

## Task 4: Promote and implement the motion showcase

- [x] 在 `site/_nav.json` 把动效提升为页面与品牌之间的一级栏目。
- [x] 重写 `site/_pages/motion.html` 的首屏为无卡片实时实验场，同时保留等级、token、禁令与完成信号文档。
- [x] 新建 `site/assets/motion-demo.mjs`，实现四档切换、重播、减少动效预览、状态宣告以及品牌呼吸的离屏/后台暂停。

## Task 5: Build and verify

- [x] 运行新自检、`npm run build` 与 `npm run check`，区分新失败与既有债务。
- [x] 在桌面和窄视口断点验证首页、设计页与动效页；验证交互重播和减少动效预览。
- [x] 复核生成物来自正确真源，并汇报本地完成、未提交、未推送、未部署状态。
