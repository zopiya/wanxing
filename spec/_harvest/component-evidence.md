# Phase 0 取材 · 组件证据

> 临时件 Transient — Phase 4「组件库 v1」消费完即删除。

## 方法

统计每个 class **出现在 9 个形态示例中的几个**（广度），而不是出现次数（频次）。
广度才是"真正跨形态可复用"的信号；频次高的往往只是某一页里重复的脚手架。

Breadth across forms, not raw frequency — frequency mostly measures scaffolding repeated within a single demo page.

## 结果：跨 ≥3 个形态出现的 class

| 出现形态数 | class | 判读 |
|---|---|---|
| 7 | `section` | 布局原语 → `wx-stack` / `wx-container` |
| 7 | `brand` | 品牌区 → `wx-seal` 的容器 |
| 6 | **`brand-mark`** | **■ 标识是全系统最普适的组件** → `wx-seal` |
| 5 | `header` / `footer` | 页面区域 → `patterns/` |
| 4 | `page` | 页面根 → `wx-page` |
| 4 | `meta` | 元数据行 → `wx-attr` / `wx-eyebrow` |
| 4 | **`card` / 3 `card-desc`** | **见下** |
| 3 | `skip-link` | 无障碍 → `wx-skip`（已在实践中，好事） |
| 3 | `hero` | → `patterns/hero.css` |
| 3 | `divider` | → `wx-rule` |
| 3 | `container` | → `wx-container` |

## 三点判读

**1. `card` 的需求是真实且跨形态的（4/9），被否定的只是它的几何形态与名字。**
这为 `wx-entry` 提供了经验依据：不是"用户不需要分组"，而是"分组不该用四边包围的方框来做"。
新组件必须真的好用到能顶替它，否则同样的需求会再次以别的名字长出来。

**2. `brand-mark` 广度第一（6/9）**，验证了把 ■ 标识当作 v1 一等组件（`wx-seal`）的判断。

**3. 经验信号整体偏弱** —— 这些是演示页而非真实产品，多数 class 是一次性脚手架。
因此组件清单**以 `../forms/DECISIONS-MATRIX.md` §六「组件负担」为主要依据**，本表仅作旁证。
其中 F6 Documentation 的组件负担最重，是组件设计与新示例的第一个目标。
