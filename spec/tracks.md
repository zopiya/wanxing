# 双轨仲裁 · Two-Track Arbitration

> 跨层规则 Cross-cutting — 灵魂层与形态层共同遵守。
> 相关 See also：[soul/philosophy.md](./soul/philosophy.md)、[soul/aesthetics.md](./soul/aesthetics.md)、[soul/forbidden.md](./soul/forbidden.md)

## 为什么需要这份文件 · Why this exists

文心是一套有强烈主张的设计语言：无卡片、无阴影、无渐变、阅读轨无填充导航 CTA、阅读轨内容页 accent ≤2 处。
这些主张让它有识别度，也让它在某些地方与主流社区的约定俗成正面相撞 ——
一个没有语义色的系统无法表达"这个操作有破坏性"；一个只有线框按钮的表单让用户找不到主操作。

Wenxin is an opinionated design language. That opinionation is what makes it recognizable,
and it is also what makes it collide with mainstream convention in specific, predictable places.

**本文件把「设计哲学占主体、但不为哲学而哲学」变成可执行、可审计的规则**，
而不是每次冲突都临场争论一次。

**取舍比例：哲学约 60%，主流惯例约 40%。** 但这个比例不是靠感觉分配的，而是靠下面三层规则落地。

---

## 三层规则 · The Three Layers

判定任何一处冲突，**从第一层往下走，先命中先生效**。

Walk the layers top-down; the first one that matches decides.

### 第一层 · 全局底线（惯例无条件优先）

**无障碍与基本可用性不参与哲学取舍。** 这一层在所有形态、所有轨道上都必须满足，没有例外、没有"有条件通过"。

| 底线 | 要求 |
|---|---|
| 对比度 | 正文 ≥4.5:1，大文本 ≥3:1（WCAG 2.2 AA） |
| 焦点态 | 可见，≥2px，对比 ≥3:1；**永不 `outline: none`** |
| 键盘 | 全部交互元素可达，焦点顺序合理 |
| 触控目标 | Web ≥24×24px / iOS ≥44pt / Android ≥48dp |
| 信息编码 | 颜色**不可**作为唯一信息载体 |
| 动效偏好 | 必须响应 `prefers-reduced-motion` |

对应 [aesthetics.md](./soul/aesthetics.md) 的 **M-4** 与 **A-1**，两条在原始准则里就标为**阻断性**——
不达标即不可交付。

> 这一层不是"惯例赢了哲学"。克制之美从来不以牺牲可达性为代价 ——
> 一个读屏器用不了的页面，谈不上任何美学。

### 第二层 · 形态分轨

| 轨道 | 形态 | 视觉约束 |
|---|---|---|
| **阅读轨 Editorial** | F1 Web · F3 Brand · F4 Print · F5 Presentation · F6 Documentation · F7 Poster · F8 Diagram · F9 Report | 哲学全量生效：无卡片容器、无填充导航 CTA、accent ≤2 处、灰阶图表、极简动效 |
| **应用轨 Application** | F2 Mobile；**任何形态中采用[原型 E 工具型](./page-archetypes.md)的页面** | 放宽视觉约束：允许分组表面、每视图一个直接推进任务的填充主按钮、完整语义色、明确的交互与触控反馈 |

**轨道在页面级声明**，写进渲染契约：

```json
{ "profile": "F1", "track": "editorial" }
```

**原型 E 会翻转它所在形态的轨道。** 一个设置页、一个表单向导，即使住在 F1 里，也按应用轨判定 ——
因为决定该用哪套惯例的是**页面在做什么**，不是它用什么技术交付。

An archetype-E page flips the track of whatever form hosts it: what the page *does* decides the
conventions, not how it happens to be delivered.

### 第三层 · 组件类别覆盖

**数据录入与反馈类组件永远按惯例处理，无论所在轨道。**

Data-entry and feedback components always follow convention, in either track.

也就是说：一个纯阅读轨的 F6 文档页，其中的搜索框、订阅表单、错误提示，
仍然使用完整语义色、清晰的可供性、标准的交互反馈。**表单就是表单，可用性在这里不可妥协。**

这里的例外只覆盖数据录入的提交，以及反馈组件中的收束动作（如确认、重试、回到安全入口）；
页面或区块间的导航 CTA 仍按第二层所在轨道处理。

理由：这类组件的功能是**接收输入与传达结果**。一个看不出是错误的错误提示，
不是克制，是失败。哲学在这里没有可表达的东西 —— 它该表达的地方在排版、留白与色彩基调上。

### 其余冲突

不落在以上三层的，逐条判定，记入 [DECISIONS.md](./DECISIONS.md)，注明理由与所属层级。

---

## 这套规则立刻带来的三个改变 · Immediate Consequences

### 1. 补齐语义色（第一层要求）

现行 token 只有 accent，**没有 danger / success / warning** ——
而 [aesthetics.md](./soul/aesthetics.md) 的 C-6 准则明写「每个语义色 token（accent, danger, success,
warning）只用于其语义目的」。准则假设它们存在，token 里却没有。

更关键的是第一层的「颜色不可作为唯一信息载体」反过来要求：既然不能只靠颜色，
那就必须**有颜色 + 有文字**。连颜色都没有，等于连一半都不到。

新增 `--color-danger` `--color-success` `--color-warning` 及 `-subtle` 变体，取低饱和暖调。

### 2. 主提交、反馈收束与应用轨任务推进有了边界

现行规范把「除表单绝对必要的主提交按钮」藏在括号里。真实的数据录入提交与反馈收束在任一轨道都可使用；
应用轨还可把唯一主按钮用于直接推进当前任务。页面或区块间的导航 CTA 仍按第二层轨道处理。

现在把这个边界升格为一等变体 `wx-btn--primary`：默认仍是 ghost 线框，每视图至多一个。
阅读轨导航 CTA 使用 `wx-btn--text`；应用轨的直接任务推进可使用唯一主按钮。
约束从含糊的“例外”变成有轨道与动作类别的限量。

### 3. F2 分组表面合法化（第二层要求）

iOS 分组列表是真实的平台惯例，不是设计偷懒。作为 `.wx-list--grouped` 在应用轨可用。
它不再是"违规"，而是一个有出处、有边界、可审计的形态适配。

---

## 审计如何执行 · How the Audit Enforces This

`scripts/render-audit.mjs` 读取契约里的 `track`，分派不同规则集：

| 检查项 | 阅读轨 | 应用轨 |
|---|---|---|
| 第一层全部底线 | **强制** | **强制** |
| accent ≤2 处 | 强制 | 放宽（语义色不计入 accent 预算） |
| 填充色主按钮 | 真实数据录入提交或反馈收束时，每视图 ≤1；导航 CTA 用文字链接。自动门当前只覆盖 D 型着陆 CTA | 每视图 ≤1 个直接推进当前任务的 `--primary`；普通跳转用线框或文字 |
| 无四边包围容器 | 强制 | 允许 `--grouped`，但仍禁阴影 |
| 图表灰阶编码 | 强制 | 强制（这条不分轨） |
| 无渐变 / 无阴影 | 强制 | 强制（这条不分轨） |

**注意最后两行**：分组表面走边框，不走阴影；图表编码规则两轨相同。
放宽的是"容器与强调的用法"，不是"暖土极简的底色"。灵魂不因轨道而变。

**覆盖边界**：`render-audit` 当前只识别阅读轨 `main.wx-landing` 内的 `a.wx-btn--primary`；
`check:site` 再覆盖本站首页与 D 型模式页。它们不判断其他页面的业务语义、视图边界或应用轨任务推进，
因此其他页面不能引用这些检查或 `check:forbidden` 的通过作为该类别规则的合规证明。

What relaxes is how containers and emphasis may be used — never the warm-minimal ground itself.

---

## 一句话 · In one line

**第一层保证它能用，第二层保证它像文心，第三层保证表单还是表单。**

Layer one keeps it usable, layer two keeps it Wenxin, layer three keeps a form a form.
