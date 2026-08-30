# 成熟度自评 · Maturity Assessment

本表衡量的是可验证的成熟度，而不是组件数量或视觉相似度。Ant Design 是参照物，不是视觉模板。
百分比是对“此仓库所需的成熟度”的判断，不是声称与 Ant 的规模等价。

## 开工前基线 · Baseline (2026-08-30)

| 维度 | Ant Design 水准 | 实测基线 | 基线判断 |
| --- | --- | --- | --- |
| 单组件文档深度 | 何时用/不用、多 demo、API、设计指引 | 21 demo / 1 张 API 表 / 0 个系统化“何时用” | 20%：有可运行展示，缺选择依据与契约。 |
| 组件覆盖 | 约 70 个组件 | 83 个 `wx-` 块级类、38 份样式表 | 55%：数量足够覆盖内容/文档任务，但不覆盖企业后台范围。 |
| 设计语言文档 | 独立 spec 站 | 21 个生成页 + `spec/` | 60%：哲学与仲裁充分，门面与无障碍专题缺失。 |
| 主题定制 | seed/map/alias 与预设 | CSS variables + 一份 `dark.css` | 35%：有模式切换，没有可操作的定制路径或预设。 |
| token 交换 | 可进设计工具 | json/scss/ts + Mermaid/ECharts/Vega；无 DTCG | 45%：开发侧可用，设计工具交换缺口明确。 |
| 工程成熟度 | SemVer、changelog、迁移纪律 | 固定 0.1.0，无 README / changelog | 20%：已有检查但发布契约不存在。 |
| 无障碍 | 专门文档与自动/人工测试 | 仅颜色对比自动校验 | 30%：有底线意识，静态结构与强制高对比未验证。 |
| 国际化 / RTL | 60+ locale 与 RTL | 中英双语；逻辑属性多，RTL 未验证 | 35%：实现基础良好，但没有声明或实测。 |
| 生态 | 图标、Figma kit、社区 | 4 个品牌 SVG | 10%：有品牌资产，尚未形成生态。 |

## 完工后自评 · Current assessment (2026-08-30)

| 维度 | 现状 | 完工后 | 判断依据与复现命令 |
| --- | --- | ---: | --- |
| 单组件文档深度 | 六个类别页加入场景标记、选择边界和 API/ARIA/脚本表；组件清单覆盖 6 个职责族、71 条可单独采用的公开契约。 | 70% | `npm run check:components && npm run build:site`；类别页仍是入口，复杂企业控件不在范围内。 |
| 组件覆盖 | 仍坚持内容、文档与轻应用边界；不为对齐数量新增组件。 | 58% | `rg -o 'wx-[a-z][a-z0-9-]*' kit/components --glob '*.css' | sort -u`；与 Ant 的 CRM/仪表盘范围不可比。 |
| 设计语言文档 | 26 页，以落地页、独立设计入口、独立组件入口、Markdown 与 Logo 规范组织，并含无障碍/RTL 和定制/交换路径。 | 74% | `npm run build:site && npm run check:site`。 |
| 主题定制 | 默认真源、覆盖边界、accent/字体/密度路径和 `dense.css` 预设明确。 | 62% | `npm run check:colors`；无 JS seed/map 算法是有意保持零依赖。 |
| token 交换 | 额外导出 `tokens.dtcg.json`，默认值与暗色 extension 同源生成。 | 70% | `npm run build:tokens`；消费端对自定义暗色 extension 的映射仍需各工具配置。 |
| 工程成熟度 | README、Keep a Changelog、SemVer breakage 规则，以及审计器、a11y、组件清单的正/负控制已建立。 | 70% | `npm run check`；未公开发布，尚无真实迁移指南。 |
| 无障碍 | `check:a11y`、负控制、forced-colors 样式、专门承诺页与人工清单。 | 62% | `npm run check:a11y && npm run check:a11y:selftest`；读屏器、键盘全流程、Windows 实机仍是发布前人工门槛。 |
| 国际化 / RTL | 本地 HTTP 下 RTL 宽屏与 390px 实测无页面横向溢出，逻辑边界正确。 | 55% | `python3 -m http.server 8899` 后打开 `/tests/rtl/index.html`；未承诺完整阿拉伯语/希伯来语本地化。 |
| 生态 | 仍只有基础品牌资产，未假装有 Figma/图标生态。 | 12% | 有意不扩张；这不是本轮应靠造资产填补的指标。 |

综合判断：核心交付（文档、tokens、验证、定制、a11y/RTL 证据）约 **66%** 的目标成熟度；
落在 60–80% 区间。生态、完整本地化、真实消费者迁移与设备级无障碍验收仍是明确缺口。

## Ant Design 组件对照

| Ant 类别 | 文心对应 | 有意不做 | 真缺口 / 边界 |
| --- | --- | --- | --- |
| Layout / Grid / Space | `wx-page`、`wx-container`、`wx-cols`、`wx-stack`、`wx-cluster` | Card（D-23，改用 `wx-entry`） | 复杂 dashboard grid 在范围外。 |
| General / Button / Tag / Avatar | `wx-btn`、`wx-tag`、`wx-badge`、`wx-status`、`wx-avatar` | Watermark（D-23） | 无通用 icon 库。 |
| Navigation | nav/menu/sidebar/crumbs/pager/pagination/tabs/steps | 自动轮播（D-23） | 菜单级联和 mega-menu 不做。 |
| Data Entry | form/field/input/select/check/radio/switch/range/rate/upload/search | — | 富文本编辑、复杂级联、颜色选择器未做。 |
| Data Display | table/list/entry/timeline/tree/desc/stat/figure/gallery/calendar/code | Card（D-23） | 高密度多序列图表与企业 dashboard 在范围外。 |
| Feedback | note/alert/toast/progress/meter/empty/result/modal/drawer/tooltip/popover | Spin、Skeleton（D-23） | 不确定等待用明确文字，不用视觉伪进度。 |
| Overlay / utilities | dialog-based modal/drawer, details-based popover/dropdown | — | 无运行时 tooltip positioning engine；采用者需控制视口边界。 |

## 自查清单

- 已完成：仓库门面与版本纪律；render-audit 正/负夹具并纳入总检查；DTCG 导出；密度预设；静态 a11y 检查及负控制；组件清单与负控制；forced-colors 规则；RTL 浏览器实测；组件文档契约表、Markdown 渲染页、Logo 规范页与成熟度对照表。
- 未完成：Windows forced-colors 实机、读屏器和完整键盘流程未能在当前 macOS 环境替代；未建立 Figma/图标生态；没有公开发布或迁移指南。
- 判断不做：不新增复杂企业控件来凑 Ant 数量；暂不拆成每个组件一页；不引入 JS 主题算法；不开放许可或发布包。理由分别是系统范围、当前阅读成本、零依赖约束和未获得发布授权。
