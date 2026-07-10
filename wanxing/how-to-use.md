# 如何使用这套规范 · How to Use This Spec

> 属于 [wanxing](./README.md) 形态层 — Form layer，写给执行设计任务的 AI written for an AI agent doing design work
> 提炼自 Distilled from：`archive/wanxing/.opencode/agents/wenxin/AGENT.md`「工作闭环」章节，剥离了 Meta Agent 交接、`dist/`/`app/` 目录结构等原多智能体流水线专属的部分，只保留通用的操作闭环。
> Stripped of the Meta-Agent handoff, `dist/`/`app/` output-directory conventions, and other pipeline-specific parts of the original multi-agent system — only the universal operating loop is kept here.

[`wenxin/`](../wenxin/README.md) 和 [`wanxing/`](./README.md) 到目前为止都是**参考资料**——回答"规则是什么"。这份文件回答的是不同的问题：**收到一个设计请求时，按什么流程走，才能保证产出真的落地了这些规则**。

Everything in `wenxin/` and `wanxing/` up to this point is **reference material** — it answers "what are the rules." This file answers a different question: **given a design request, what procedure ensures the rules actually land in the output.**

```
阶段一 · 理解  →  阶段二 · 决策确认  →  阶段三 · 执行  →  阶段四 · 自审  →  交付
Stage 1 Understand → Stage 2 Confirm → Stage 3 Execute → Stage 4 Self-audit → Deliver
```

---

## 阶段一 · 理解需求 · Understand

**收到任何设计请求后，先不生成代码或设计。**

**On receiving any design request, do not generate code or a design yet.**

通过对话弄清楚以下信息，每次只问 1～2 个问题，根据上下文判断哪些已经明确、哪些需要追问：

Clarify the following through conversation — ask only 1–2 questions at a time, and judge from context what's already clear versus what needs asking:

**必须确认 Must confirm：**
- **页面/产出类型是什么？** 判断对应哪个形态（F1–F9，见 [`wanxing/README.md`](./README.md)）以及哪个页面原型（见 [`page-archetypes.md`](./page-archetypes.md)）
  What type of output is this? Determine the form (F1–F9) and, if applicable, the page archetype.
- **核心内容与用户目标是什么？** 用户来这个产出要完成什么
  What's the core content and the end-user's goal here?
- **技术约束？** 框架（React/Vue/原生 HTML）、是否有现有代码
  Technical constraints? Framework, existing code to build on?
- **深色/亮色偏好？** 默认跟随系统，还是固定某一种
  Light/dark preference? Default to system, or pin one?

**视情况追问 Ask if relevant：**
目标用户是谁；有没有参考样本；有没有特别想要或不想要的元素。

Who's the target audience; any reference samples; anything explicitly wanted or unwanted.

---

## 阶段二 · 决策确认 · Confirm

理解完需求后，在执行前**明确说出**设计决策，并等待确认——不要默默执行。

After understanding the request, **state the design decisions out loud** before executing, and wait for confirmation — don't execute silently.

决策说明应包含 The decision statement should cover：
- 选用哪个形态 / 哪个页面原型，理由是什么 Which form/archetype, and why
- 内容宽度选择 Content width choice
- 背景色选择（暖白/内页白）Background color choice
- Accent 点睛色出现在哪里（不超过 2 处）Where the accent appears (≤ 2 places)
- 品牌标识符 ■ 的位置（如涉及）Where the ■ mark sits, if relevant
- 有无特殊处理 Any special handling

---

## 阶段三 · 执行设计 · Execute

**灵魂层不可妥协** — 色彩、字体、留白、动效、品牌标识符五项规则见 [`wenxin/README.md`](../wenxin/README.md) 及其下属文件，任何场景都不打折扣。

**The soul layer is non-negotiable** — color, type, whitespace, motion, brand identity. See wenxin's files; no scenario discounts them.

**形态层跟随行业惯例** — 根据形态（F1–F9）和页面原型选择对应的标准结构，见对应的 `wanxing/fN-*.md`。**不要为了「风格统一」改变该类型产品用户熟悉的结构** — 形态层的职责就是像普通产品一样好用，灵魂层负责让它带上文心的气质。

**The form layer follows industry convention** — pick the standard structure for the form and archetype from the matching `wanxing/fN-*.md` file. **Don't distort a familiar structure in the name of "stylistic consistency"** — the form layer's job is to be as usable as any normal product; the soul layer is what gives it Wenxin's temperament.

如果产出是 HTML，声明一份 [`render-contract.md`](./render-contract.md) 里定义的合同 JSON——这一步不是可选的装饰，而是让第四阶段的自审有据可查。

If the output is HTML, declare a render-contract JSON as defined in `render-contract.md` — this isn't optional decoration, it's what makes Stage 4's self-audit checkable.

---

## 阶段四 · 自审（交付前必须执行）· Self-Audit (mandatory before delivery)

**完成设计后，在交付之前，对照以下清单逐项检查自己的输出。发现问题，立即修正，不要带着问题交付。**

**After finishing, before delivering, check your own output against this list. Fix problems immediately — never deliver with a known issue outstanding.**

**色彩 Color**
- [ ] Accent 色在全页出现次数是否 **≤ 2**？是否只用于品牌标记区域，没有用于正文段落强调？
- [ ] 背景色选择是否正确（展示型暖白 / 内容型接近白）？
- [ ] 有无使用高饱和蓝/绿/紫/橙？有无渐变色背景？

**字体 Typography**
- [ ] 正文和标题是否用了衬线字体？UI 标签/元数据/导航是否用了无衬线？
- [ ] 英文标签是否全大写 + 较大字距？

**留白 Whitespace**
- [ ] 大区块之间的间距是否 ≥ 80px（理想 96px）？
- [ ] 有没有因为「感觉太空」而压缩了间距？（不应该）

**动效 Motion**
- [ ] hover 状态是否有颜色过渡，而非突变？
- [ ] 有无旋转、弹跳、或位移超过 16px 的动效？
- [ ] 若是 HTML：是否声明了 render-contract 的 `motion` 字段？是否包含 `prefers-reduced-motion` 与 `data-animations-complete`？

**品牌标识符 Brand mark**
- [ ] 品牌名后的符号是否是 ■，而不是 · 或其他？是否只出现在署名区，没有被复制到别处？
- [ ] Logo（如存在）是否遵循 [`wenxin/brand.md`](../wenxin/brand.md)：红底白线、2.5px 线宽、`rx="4"`、不做暗色模式变色？

**组件 Components**
- [ ] 图标是否为线条型、1.5px？有无填充型图标、两个图标库混用？
- [ ] 有无卡片 + 阴影（禁止）？按钮是否为线框型，无填充色？
- [ ] Blockquote 左侧线是否为 accent 色，而不是灰色或黑色？

**形态层 Form layer**
- [ ] 所选结构是否符合该类型产出的行业惯例？
- [ ] 内容宽度是否与页面原型匹配？
- [ ] 标题与正文间距是否明显大于段落间距（层级清晰）？

完整禁用清单见 [`wenxin/forbidden.md`](../wenxin/forbidden.md)；各形态的专项自审项见对应 `wanxing/fN-*.md` 的禁止清单/交付物清单。

The complete forbidden list is in wenxin's forbidden.md; form-specific audit items are in each `wanxing/fN-*.md`'s own forbidden/deliverables list.

---

## 反馈处理 · Handling Feedback

收到用户反馈后，区分两类请求：

Distinguish two kinds of requests when feedback comes back:

**形态层请求**（布局、结构、内容组织）→ **直接执行**，无需说明。
**Form-layer requests** (layout, structure, content organization) → **execute directly**, no explanation needed.

**灵魂层请求**（更多颜色、加阴影卡片、改掉衬线字体、增加 Accent 出现次数等）→ **先说明这与文心设计语言的冲突及影响，再询问是否坚持修改**。若用户坚持，执行并备注"此处偏离文心规范"。

**Soul-layer requests** (more colors, shadowed cards, dropping serif type, more accent occurrences, etc.) → **first explain the conflict and its impact, then ask whether they want to proceed anyway.** If they insist, execute it and note "deviates from the Wenxin spec here."

---

## 行事准则 · Guiding Principles

1. **先问，再做** — 哪怕用户说「随便你」，也至少确认产出类型和核心内容。
   **Ask before building** — even if the user says "your call," still confirm the output type and core content.
2. **自审是义务，不是选项** — 每次交付前必须过一遍清单，不能省略。
   **Self-audit is mandatory, not optional** — never skip the checklist before delivering.
3. **灵魂层是底线** — 用户可以改变形态，但改变灵魂时你有责任说明影响。
   **The soul layer is the floor** — users can change the form freely, but changing the soul requires you to explain the impact.
4. **形态层完全尊重惯例** — 不要为了「极简」拒绝行业标准的结构。
   **The form layer fully respects convention** — don't reject an industry-standard structure in the name of minimalism.
5. **说出你的决策** — 不要默默执行，让用户有机会在动工前纠正方向。
   **State your decisions out loud** — never execute silently; give the user a chance to redirect before you build.
