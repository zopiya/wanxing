# 四站田野审计 · Four-Site Field Audit

> 审计日期 Audit date：2026-08-30（Asia/Shanghai）
> 对账对象 Baseline：`spec/` + `kit/` at `11da321`，随后变更见本次 diff
> 判定规则 Arbitration：[tracks.md](./tracks.md)；判定日志 Decisions：[DECISIONS.md](./DECISIONS.md) D-10–D-18

四个站点是文心在真实内容、真实读者与长期维护压力下留下的证据，不是等待被规范纠正的截图。
本审计先记录实践，再按 A/B/C 分类；涉及 A9/B9/D9 的差异一律先记 C，不用田野便利反向改写不变之魂。

The four sites are production evidence under real content and maintenance pressure, not screenshots
waiting to be corrected. Practice is recorded before judgement; any difference touching A9/B9/D9
starts as C and does not silently rewrite the invariant soul.

## 方法与证据边界 · Method and Evidence Boundary

- 在 1280×720、2× DPR 的真实浏览器中读取首页；博客与花园另取一篇代表内容页。
- 记录计算样式、实际焦点环、交互目标盒、DOM 地标、CSSOM 里的暗色/字体/动效规则。
- `note.zopiya.com` 的亮/暗模式均通过站内按钮实际切换；其余三站读取并核对其
  `prefers-color-scheme` / `saved-theme` 规则，但不伪称看过当前浏览器未渲染的暗色截图。
- 文本对比度按计算前景与最近不透明背景计算；大文本阈值 3:1，其余 4.5:1。
- 浏览器的临时移动视口覆盖没有改变既有页面宽度，因此移动端只依据站点自己的媒体规则，
  **不列为视觉实测**。这是工具限制，不抹平为“已验证响应式”。

The desktop and note dark-mode results are runtime observations. Mobile behaviour and the other
sites' dark rendering are source-backed rule inspections, not visual acceptance claims.

### 分类 · Classification

| 类别 | 本文含义 | 本次处理 |
|---|---|---|
| **A** | 实践已经解决了 kit/规范没解决好的问题 | 吸收进规范与 kit |
| **B** | 媒介、原型或轨道造成的合法差异 | 写明适用边界，不统一取值 |
| **C** | 无合法仲裁层，或触及不变之魂/第一层底线 | 记录回归建议，不修改站点 |

## 全局结论 · Cross-Site Findings

1. **卡片没有回来。** 四站计算样式均未发现“填充/阴影/四边框 + 圆角”的内容容器。
   `wx-entry` 的方向成立，但片语的连续时间线证明单个 `wx-entry` 还不够；已补 `wx-timeline`。
2. **accent ≤2 在纯展示与博客上守得住，在工具/代码上会遇到语义边界。** 首页和博客静态页面各只有
   2 个计算后的 accent 元素；片语热力图属于应用轨可放宽，但颜色单独承载数量仍违反第一层；
   花园把 accent 当语法 keyword，代表性文章出现约 232 个 accent 文本节点，属于明确漂移。
3. **最大问题不是风格，而是未量过的灰。** 线上旧灰实测 1.68–3.23:1；两站已经各自引入
   `#706D68`。该实践被吸收为 functional ink，kit 的全部 `text-*` token 现在均过 AA。
4. **暗色实现路径可以不同，调色值不能随意漂。** media query、手动 `data-theme`、
   `saved-theme` 都是合法 B；旧 `#C4533E` 和首页的 `#B84A36` 则是 C。
5. **字体策略按页面成本适配，但文档站 CDN 不成立。** 首页/片语使用系统 fallback 是 B；
   博客自托管子集符合规范；花园的 Google Fonts + jsDelivr 是 C。

No site reintroduced card geometry. The material failures are pale text, stale dark accents,
semantic landmarks, target size, and one documentation site's CDN/syntax drift.

---

## zopiya.com · 品牌首页 / Brand Home

取样 Sample：[https://zopiya.com/](https://zopiya.com/)

| 维度 | 田野证据 | A/B/C 与依据 | 处理 |
|---|---|---|---|
| Token | 亮色地面 `#F2F0EB`、正文 `#3A3837`、accent `#8B3525` 与 core 一致；暗色 accent 自定 `#B84A36`，对 `#1A1816` 为 **3.43:1** | **C** · D9 + 第一层（若用于正文即不达 AA；且不再与系统暗色同值） | 站点回归建议：统一到 `#CF5F4A`（4.54:1）；不在本仓库代改站点 |
| 排版 | 正文/UI 用系统无衬线，标题用 Georgia/CJK serif；没有远程字体请求 | **B** · C/G 可变，原型 C/D 的单屏首页优先首屏稳定 | 写入原型与 F1 边界；不强迫加载完整正文家族 |
| 节奏 | 768px 主壳、640px 导航列；96px 标题，四个入口各 318×69px | **B** · 原型 D/C，展示任务不是长文阅读 | `kit/patterns/c-showcase` / `d-landing` 取材 |
| 导航 | 单页主导航直接通往文辑/片语/知原/关于，无 header chrome | **B** · 着陆型 10 秒判断路径 | 保留“大触点文字导航”作为 D 型做法 |
| 组件 | 无方框、无阴影；■ 品牌标记承担唯一视觉焦点 | 一致，无差异 | `wx-seal` 继续是一等组件 |
| 动效 | Hero/nav/footer 420ms fade-up；■ 4s 呼吸；有 reduced-motion | **B** · E 可变，品牌首页可声明 E9-2 单焦点 | F1 只对品牌首页开放；文章页不可继承循环 |
| 暗色 | 只跟随系统，无手动开关；暖暗底与暖象牙正文成立 | **B** · 暗色触发方式属形态实现 | kit 继续同时支持 media 与属性覆盖 |
| 无障碍 | `<header>/<nav>/<main>/<footer>` 齐全；焦点 2px、offset 4px；四个目标均远大于 24px | 一致，无差异 | 无回归项 |

**判读 Judgement**：它证明“轻量首页不加载字体”和“F1 品牌首页单焦点 E9-2”是合理适配；
它没有为第三套暗色 accent 提供改变 D9 的理由。

---

## blog.zopiya.com · 文辑 / Long-form Blog

取样 Samples：[首页](https://blog.zopiya.com/) ·
[代表文章](https://blog.zopiya.com/chui-xiao-ren-91eca469/)

| 维度 | 田野证据 | A/B/C 与依据 | 处理 |
|---|---|---|---|
| Token | 大部分 core 值一致；额外引入 `--color-text-functional:#706D68` | **A** · 第一层，生产站先补出了 AA functional ink | 已吸收进 core/dark，并用 `check:colors` 阻断回归 |
| 辅助灰 | `#888580` 小字为 **3.23:1**；`#B0ABA4` 年份/版权为 **2.00:1** | **C** · 第一层对比度 | 回归到新的 `text-functional/secondary/muted`；不改站点 |
| 排版 | 正文 18px，文章列 720px，恰为 40em；kit 默认约 37.6em | **B** · F1 原型 A 的 30–40 CJK 行长边界 | F1 写明长叙事可到 40em，不改全局默认 |
| 布局/导航 | 280px 固定作者栏 + 648/720px 内容流；没有全文搜索、版本或知识树 | **B** · 仍是 F1，不是 F6 | 修正“有侧栏即 F6”的过度简化 |
| 条目 | 年份 + 左轨 + 无框 `post-item`；accent 静态计算元素为 2 | **A** · 比单边 `wx-entry` 更适合长时间流 | `wx-timeline` 与列表原型吸收，起止不用渐变 |
| 动效 | 列表 500ms、60ms stagger 合规；4s 品牌呼吸出现在每篇文章 | 列表一致；循环为 **C** · E9-1 文章不该升级 | 首页可呼吸；文章页建议静态 seal |
| 暗色 | `#C4533E` 对夜底 **3.92:1** | **C** · 第一层，已由 D-9 修复 | 回归 `#CF5F4A` |
| 字体 | Lora/EB Garamond/JetBrains Mono 自托管，带 `unicode-range` | 一致，M-6/M-8 | 可作为字体交付正例 |
| 焦点/状态 | 焦点环 2px 但旧 40% alpha；导航状态使用 `.active` | **C** · 第一层 + 状态必须绑定 a11y tree | 焦点改用不透明 token；状态改 `aria-current="page"` |
| 目标尺寸 | 桌面社交图标 20×20px、底部网络链接约 18px 高 | **C** · Web 24px 底线 | 保持图标视觉尺寸，扩点击盒到 ≥24px |
| 纸张纹理 | body 有 3% 内联 SVG 噪点，不引入新色/容器 | **B** · F1 阅读媒介的低强度纸感；不进入全局 token | 不纳入 kit 默认，避免把装饰变成强制成本 |

**判读 Judgement**：博客最有价值的贡献不是某个字号，而是 `#706D68`、40em 上限和
“侧栏不等于文档站”三条边界。旧灰与旧暗色仍是第一层失败，不能因“已经上线”而合法化。

---

## note.zopiya.com · 片语 / Notes Tool

取样 Sample：[https://note.zopiya.com/](https://note.zopiya.com/)，亮/暗均经站内开关实际切换。

| 维度 | 田野证据 | A/B/C 与依据 | 处理 |
|---|---|---|---|
| 轨道 | 搜索、过滤、设置、写入/离线状态与复制动作共存 | **B** · 原型 E 翻转到 application | Pattern E 明确 `track: application`；tabs/search/switch 按惯例 |
| Token | 亮色主调与 core 一致；暗色仍用 `#C4533E` | 暗色为 **C** · D-9/第一层 | 回归 `#CF5F4A` |
| 辅助灰 | 亮色 `#B0ABA4` 为 2.00:1；暗色 `#5A5550` 为 **2.40:1** | **C** · 第一层 | 采用新 functional ink；时间/计数不能再用边框级灰 |
| 条目形态 | 单线时间轴 + 9px 节点 + 36px 条目间距；内容完全无框 | **A** · `wx-entry` 的连续流缺口 | 新增 `wx-timeline`；保留 rail/dot/content 三槽 |
| 线条收尾 | 时间轴首尾使用 `linear-gradient` 淡出 | **C** · A9 不变之魂，且全局禁渐变 | kit 采用明确线端，不吸收渐变 |
| Accent | 普通 accent 元素约 4 个，热力图另有多级 alpha | 预算放宽为 **B** · application；颜色单独编码数量为 **C** · 第一层 | 允许应用轨多状态；热力图补数字/纹理/可读描述，不靠颜色独传信息 |
| 排版/字体 | 17px/1.85 正文；只声明字体栈，无 CDN、无自托管请求 | **B** · 轻工具优先系统 fallback | 不要求所有 E 型工具下载字体 |
| 导航 | 顶部极轻三按钮 + 标签过滤 + 页内连续流 | **B** · 应用轨紧凑导航 | `wx-tabs`/`wx-search`/`wx-switch` 取材 |
| 动效 | entry 360ms、40ms stagger；有 reduced-motion | **B** · E 可变，仍低于 600ms 总封顶 | 40–60ms 均可，合同写实际值 |
| 目标尺寸 | 桌面设置按钮 28×18px、过滤按钮约 19px 高、复制按钮 16×16px；移动规则扩到约 36px | **C** · Web 24px / 移动平台更大底线 | 桌面至少 24px；移动继续抬到平台 44/48 |
| 状态 | `.settings-toggle--open` / `.entry-action--active` | **C** · 状态未绑定 ARIA/native | 改 `aria-expanded` / `aria-pressed` / `aria-selected` |

**判读 Judgement**：片语不是“accent 预算失败的普通内容页”，而是原型 E；预算可放宽，
全局底线不可放宽。时间线是 A，渐变与颜色单独编码不是。

---

## garden.zopiya.com · 知原 / Knowledge Garden

取样 Samples：[首页](https://garden.zopiya.com/) ·
[代表文档](https://garden.zopiya.com/15-computing/10-getting-started/10-environment/02-%E7%BC%96%E8%BE%91%E5%99%A8%E5%85%A5%E9%97%A8)

| 维度 | 田野证据 | A/B/C 与依据 | 处理 |
|---|---|---|---|
| 地面 | 正文用 `#FAFAF8` 而非外层 `#F2F0EB` | **B** · B9 内的层级映射，F6 内页不是品牌首页 | F6 允许 base 作为正文地面，暖白仍为系统底 |
| 布局/导航 | 256px 左知识树 + 630px 正文 + 256px 右关系/TOC | **B** · F6 高组件负担的合法三轨 | F6 写明三轨边界；`wx-sidebar` + `wx-marginal`/TOC 取材 |
| 语义地标 | 首页没有 `<main>/<nav>/<aside>`；文章页仍无 `<main>/<aside>` | **C** · 第一层键盘/读屏结构 | 保留布局，补语义地标与 skip link；不改站点 |
| 辅助灰 | breadcrumb/meta/footer 用 `#C8C3BA`，对 base 仅 **1.68:1** | **C** · 第一层 | 回归 functional ink；边框 token 不再排文字 |
| 语义色 | warning 仍 `#8B6914`；在 subtle 面为 **4.35:1** | **C** · D-2/第一层 | 回归 `#7D5E12`；bug 不应无条件映射 warning |
| 语法色 | keyword/link 使用 accent；代表文档约 232 个 accent 文本节点 | **C** · editorial accent 预算 + D9 信息层级 | 使用 `kit/markdown/syntax.css` 的独立暖墨色，不直接复用 accent |
| 暗色 | 系统 + `saved-theme` 双路存在；暗色语法仍用 `#C4533E` | 触发方式 **B**；色值 **C** | 触发机制可保留，token 回归 |
| 字体 | Google Fonts CSS；KaTeX 来自 jsDelivr | **C** · M-6/M-8，文档站长期访问与离线复现成本高 | 字体改自托管 + unicode-range；KaTeX 固定版本并考虑自托管 |
| 组件 | 无卡片；callout 与代码块靠底色/单边线；阅读模式/折叠按钮真实存在 | 一致 + **A** 组件需求 | `wx-collapse`、`wx-search`、`wx-marginal` 优先落地 |
| 动效 | 文档仍有两个 4s 品牌呼吸，虽尊重 reduced-motion | **C** · F6 E9-0 只要状态反馈 | 文档正文场景 seal 静态 |
| 目标尺寸 | 侧栏多数链接计算高度约 19px；部分按钮 23–24px | **C** · Web 24px 底线 | 扩命中盒，不必放大文字 |
| 纯黑 | 代表文章有 11 个计算为 `rgb(0,0,0)` 的元素，来自第三方/嵌入层 | **C** · D9；先隔离来源再回归暖墨 | 站点侧定位 KaTeX/SVG 默认色；本仓库不改第三方站点 |

**判读 Judgement**：三轨知识导航是 F6 的强证据，值得写进规范；当前实现的地标、灰阶、
syntax accent、CDN 与 E9-0 则没有合法仲裁层。

---

## 已吸收、已记录、未越权 · Absorbed, Recorded, Not Overreached

### A · 已改规范与 kit

- 新增 AA functional ink，重算全部 `text-*` 与 focus token，并加入 `check:colors`。
- 新增 `wx-timeline`、`wx-tabs`、`wx-search`、`wx-collapse`、`wx-switch`、`wx-marginal`。
- 新增 A–E 页面骨架与亮/暗画廊；`wx-entry` 的替代路径从单一组件变成可组合结构。

### B · 已写清形态边界

- F1 长叙事 40em 上限、无搜索/版本的作者侧栏、品牌首页单焦点 E9-2。
- 原型 E 的片语式工具走 application；F6 可用左/中/右三轨。
- 系统字体 fallback、手动主题与 system theme 都是合法交付策略，按页面成本选择。

### C · 只给站点回归建议

- 旧暗色 accent、低对比灰、过小目标、状态类、缺地标、时间线渐变、代码 accent、字体 CDN、
  文档页品牌循环。**本仓库没有修改、部署或提交四个站点。**

The audit changes this repository only. No production site was edited, deployed, or represented as fixed.

## 明确推迟 · Explicit Deferral

`kit/components/react/` 继续推迟。六个新增 v2 组件都是纯 CSS/原生语义；在 API 稳定前加 JSX
只会把未定接口固化。需要 React 时应做薄封装，并以这里的 HTML/ARIA 契约为唯一行为来源。

The optional React layer remains deferred until the native HTML/ARIA APIs have production use.
