# 取材来源 · Provenance

> 本仓库在 2026-08 做过一次完全重构：`archive/`、`opendesign/` 与旧 `wanxing/examples/` 全部删除，
> 新体系从中取材重建，而非迁移。此文件记录每份新内容的来源，供日后考古。
>
> This repo was fully rebuilt in 2026-08. The old material was harvested, not migrated.
> Everything deleted still exists in git history at the SHA below.

**删除前最后一个包含全部历史材料的 commit：`93fba710`**
（`git show 93fba710 --stat`，或 `git checkout 93fba710 -- archive/` 取回）

---

## 取材映射 · Harvest Map

| 新文件 | 取自 | 取材方式 |
|---|---|---|
| `spec/forms/DECISIONS-MATRIX.md` | `archive/wanxing/.opencode/rules/output-formats.md`（2630 行） | **只提炼决策**，正文未搬 |
| `spec/soul/aesthetics.md` | `archive/wanxing/.opencode/rules/modern-aesthetics.md`（344 行） | 34 条准则整体吸收 |
| `spec/soul/philosophy.md` | `archive/wanxing/.opencode/rules/wenxin-spec.md` §2–3（406 行） | 7 维度模型 A–G、不变之魂/可变之形 |
| `spec/soul/motion.md` | `archive/wanxing/.opencode/rules/motion-spec.md`（201 行） | 强度分级 E8/E9-* 及编排 |
| `scripts/render-audit.mjs` | `archive/wanxing/.opencode/tools/render-audit/render-audit.mjs`（767 行） | 原样提升，另做两处修改 |
| ~~`spec/_harvest/token-rescue.md`~~ | `wanxing/examples/tokens/colors_and_type.css` + 9 个示例 | 暗色调色板 + 52 个未定义 token 的值。**已被 Phase 2 消费**，落入 `kit/tokens/`，取材件已删除 |
| `spec/_harvest/component-evidence.md` | 9 个示例的 class 广度统计 | 经验旁证 |
| `kit/base/*` | `archive/wenxin/assets/css/`（Hugo 主题，生产级） | 结构参考，非复制 |
| `kit/markdown/hugo/*` | `archive/wenxin/layouts/_default/_markup/` + `shortcodes/` | 渲染钩子思路 |
| `spec/soul/components.md` | `archive/wanxing/.opencode/agents/wenxin/components.md`（280 行） | 组件原则与页面原型 |

## 未取材、直接弃置的部分

- `opendesign/` —— Open Design 适配层。本项目是文心与万形本身；适配是日后从这里**派生出去**的另一个项目，不该反向绑定。顺带消掉了 tokens 三处手工同步的问题。
- `archive/wanxing/workbench/` —— 另一个应用，与设计系统无关。
- `archive/wanxing/.playwright-mcp/` —— 55 个审计快照日志。
- `archive/Wanxing · Wenxin Design System/` —— 早期不完整的打包尝试（只含 F1/F3/F5/F6），是 `archive/wanxing/` 的真子集。
- 旧 `wanxing/examples/` 的 9 个 index.html（约 6,100 行内联 CSS）与 28 个预览页 —— 取材后重写。

## 取材关掉的两个历史未知

1. `render-contract.md` 曾写「E9 这组代号的完整定义在现有 archive 材料中找不到」——
   `motion-spec.md:21` 其实定义了 E8 印刷静止 / E9-0 静水 / E9-1 春雨 / E9-2 微澜。
2. `cross-form-matrix.md` 曾把 F4 用 `E8`、F9 用 `E9-0` 标记为"数据不一致"——
   两者**本就应该不同**，是两个不同的动效强度等级。

这两处是"必须先取材再删除"最有力的证据：现行文档承认找不到的定义，一直就在即将被删的目录里。
