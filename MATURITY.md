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
| 设计语言文档 | 38 页、6 个分区，以落地页、设计、内容、组件、页面、品牌与接入路径组织，并含无障碍/RTL 和定制/交换路径。 | 76% | `npm run build:site && npm run check:site`。 |
| 主题定制 | 默认真源、覆盖边界、accent/字体/密度路径和 `dense.css` 预设明确。 | 62% | `npm run check:colors`；无 JS seed/map 算法是有意保持零依赖。 |
| token 交换 | 额外导出 `tokens.dtcg.json`，默认值与暗色 extension 同源生成。 | 70% | `npm run build:tokens`；消费端对自定义暗色 extension 的映射仍需各工具配置。 |
| 工程成熟度 | README、Keep a Changelog、SemVer breakage 规则，以及审计器、a11y、组件清单的正/负控制已建立。 | 70% | `npm run check`；未公开发布，尚无真实迁移指南。 |
| 无障碍 | `check:a11y` 覆盖地标、标签、名称、唯一 ID、ARIA 引用和原生控件契约；七项负控制、forced-colors 样式、专门承诺页与人工清单。 | 68% | `npm run check:a11y && npm run check:a11y:selftest`；读屏器、键盘全流程、Windows 实机仍是发布前人工门槛。 |
| 国际化 / RTL | 本地 HTTP 下 RTL 宽屏与 390px 实测无页面横向溢出；侧栏、开关、drawer 和 tabs 的物理方向已纠正。 | 62% | `python3 -m http.server 8899` 后打开 `/tests/rtl/index.html`；未承诺完整阿拉伯语/希伯来语本地化。 |
| 生态 | 仍只有基础品牌资产，未假装有 Figma/图标生态。 | 12% | 有意不扩张；这不是本轮应靠造资产填补的指标。 |

综合判断：核心交付（文档、tokens、验证、定制、a11y/RTL 证据）约 **68%** 的目标成熟度；
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
- 判断不做：不新增复杂企业控件来凑 Ant 数量；暂不拆成每个组件一页；不引入 JS 主题算法；不在未获发布授权时推送 registry。理由分别是系统范围、当前阅读成本、零依赖约束和发布边界。代码与规范已经采用 MIT，品牌标识另有边界。

## 系统成熟度审计 · System audit (2026-08-30)

这轮审计覆盖生成链、公开包、文档站、组件 ARIA/键盘契约、亮暗主题、390px 响应式与 RTL 交互。
分数只代表当前仓库中可复现的证据，不替代读屏器、Windows forced-colors 或真实消费者迁移。

| 维度 | 分数 | 已验证证据 | 仍缺的证据 |
| --- | ---: | --- | --- |
| 实现完整性 | 4/4 | 71 条契约有来源、有文档、有生成检查；本轮清除了重复锚点、假禁用链接和过期发布说法 | 首次真实消费者迁移 |
| 无障碍 | 3/4 | 结构门禁扩到唯一 ID、ARIA 引用、图片 alt、按钮类型、switch/tab 状态；7 项故障夹具必须失败 | VoiceOver/NVDA 全流程、Windows forced-colors 实机 |
| 响应式 | 4/4 | 首页、录入页与 RTL 夹具在 390×844 无页面级横向溢出；侧栏开合终态实测 | 自动视觉回归与 200% 文本缩放矩阵 |
| 主题与 RTL | 3/4 | 两主题对比度、`color-scheme`、浏览器 chrome 色、系统主题变化；RTL switch/tabs/sidebar/drawer 方向实测 | 已保存主题仍由页尾脚本恢复，慢设备可能短暂闪现系统主题 |
| 性能与交付 | 3/4 | 零运行时依赖；图片有尺寸；`npm pack --dry-run` 成功，包体约 725KB（未压缩） | 包体预算、真实 registry 安装与跨 bundler 验收 |
| **总计** | **17/20** | **Good · 可采用，但还不是完成发布验收的 1.0** | |

### 本轮已关闭

- **P1 · 锚点身份冲突**：`c-navigation` 的两个 `id="skip"` 让两个目录入口落到同一标题；已删掉重复段，并让静态门禁阻断重复 ID。
- **P1 · 假禁用导航**：`a[aria-disabled][href]` 仍可由键盘激活；菜单与分页改用无 `href` 的非链接元素，门禁阻断回归。
- **P1 · RTL 交互方向**：侧栏、switch、drawer 与 tabs 过去只通过“不溢出”验收，物理位移没有翻转；现已按 `dir` 处理并在 390px 实测。
- **P2 · 发布事实失真**：2026-08-30 运行 `npm view wenxin-wanxing version --json` 返回 404；README 与接入页改为明确的本地安装路径，不再把未发布写成已发布。
- **P2 · 细节稳定性**：文档图片补齐固有尺寸；主题脚本拒绝损坏的存储值，并用真实 token 同步浏览器 chrome 色与系统主题变化。

### 发布前仍要过的门

- **P1 验收门，不是已知缺陷**：VoiceOver/NVDA 键盘全流程和 Windows forced-colors 实机；当前自动检查不能替代它们。
- **P2**：建立真实消费者迁移样本和至少两类 bundler 的安装验证；在此之前不要把 `0.1.0` 描述成生态可用。
- **P2**：把 390px、RTL 键盘行为与关键组件状态纳入可重复的浏览器测试，而不只保留人工验收页。
- **P3**：若要消除已保存主题的首帧闪烁，需要在 CSS 解析前恢复主题；实现时仍须从 token 生成颜色，不能另抄一份十六进制值。

复现：`npm run build && npm run check`；`node scripts/check-a11y.mjs tests/rtl/index.html`；
`npm_config_cache=/tmp/wanxing-npm-cache npm pack --dry-run --json`；本地 HTTP 打开
`/site/index.html`、`/site/c-entry.html` 与 `/tests/rtl/index.html`，分别验收 1440×900 和 390×844。
