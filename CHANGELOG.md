# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- 站点重建为五个分区（设计 / 内容 / 组件 / 页面 / 品牌），侧边栏按分区收敛；`_nav.json` 成为唯一的信息架构来源。
- 内容分区：Markdown 全量、HTML 元素、代码与语法高亮三页，源码与渲染并排。
- 补齐 61 个裸 HTML 元素的样式；A–E 五种页面原型各有一页；品牌分区四页。
- `kit/wenxin.json` —— 单一机器可读契约包，完全由来源派生。
- `site/llms.txt` / `site/llms-full.txt` / `AGENTS.md` —— agent 入口。
- `.claude/skills/wenxin-design/` —— 可直接安装的技能包。
- `npx wenxin` CLI：`audit` / `contracts` / `tokens` / `skeleton`，零依赖。
- 新增五道检查：契约包新鲜度、llms 索引与链接、HTML 标签配平、组件契约文档可见性、`wx-` 类可解析、CLI 与包元数据。

### Fixed

- **对比度按面测**（D-28）：`--code-comment` 2.87:1、`--code-punctuation` 3.52:1、代码块元数据行 4.41:1，两个主题都不达 AA，而当时的检查只对页面底色测量。
- **主题开关未接到 `color-scheme`**：系统暗色 + 页面浅色时，浏览器把裸表单控件涂成深色而文字仍是深色，1.02:1。
- 中文伪斜体修正此前只覆盖 `em`，`i` / `cite` / `dfn` / `var` / `address` 同样受影响。
- 一个游离的 `</div>` 让 `c-feedback.html` 后半页脱出布局栅格。
- 时间线标记缺少 `wx-timeline__dot`，日期落在 20px 轨道列里。
- 主题切换按钮比品牌名和主导航高 3.2px。
- 站点使用的 7 个 `wx-` 类在 kit 中不存在，其中 `wx-tag--accent` 与 `wx-seal--lg` 是文档承诺但从未实现的变体。
- 导航页重复的 `id="skip"` 会让两个目录入口落到同一标题；无障碍门禁现在会阻断重复 ID、断裂 ARIA 引用和假禁用链接。
- RTL 夹具此前只证实“不横向溢出”，却漏掉侧栏、开关、drawer 与 tabs 的物理方向；这些交互现在按书写方向翻转。
- 主题脚本现在拒绝损坏的本地存储值，并从真实背景 token 同步浏览器 chrome 色与系统主题变化。
- `wx-nav` 链接把 24px Web 指针目标写进组件，不再只依赖设备是否上报 coarse pointer。

### Changed

- **许可证从 UNLICENSED 改为 MIT**，移除 `private`，包可发布。
- 禁令规则合并到 `kit/contracts/forbidden.json` 单一来源，并明确区分**可检查**与**需判断**两类。
- 首页改为一屏一件事的三屏结构；`wx-landing__hero` 从 `min(760px, 88dvh)` 改为 `100dvh` 并要求显式下滚提示。

## [0.1.0] - 2026-08-30

### Added

- Initial bilingual Wenxin · Wanxing specification, reusable CSS kit, generated documentation site, token exports, chart themes, and zero-dependency build scripts.
- Two-track arbitration, four executable baseline checks, and the initial component and pattern reference.

### Changed

- Historical pre-0.1 work was consolidated into this first tracked release. Earlier source material and removed examples remain historical context, not a separately supported public release line.

[Unreleased]: https://example.invalid/wenxin-wanxing/compare/v0.1.0...HEAD
[0.1.0]: https://example.invalid/wenxin-wanxing/releases/tag/v0.1.0
