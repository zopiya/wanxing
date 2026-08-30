# 跨形态对照表 · Cross-Form Matrix

> 属于 [spec](../README.md) 形态层 — Form layer
> 数据来源 Source of data：[`examples/`](../../examples/) 下九份 `index.html` 里实际的 `wanxing-render-contract` 取值（不是推断，是直接读出来的真实数字）
> Data pulled directly from the actual `wanxing-render-contract` values in each of the nine `examples/*/index.html` files — measured, not inferred.

水的原则说"同一个分子，九种容器"。这张表把同一条灵魂层规则在九种形态里的实际取值并排放在一起，让"魂不变、形而化"从一句口号变成可以核对的数字。

The water principle says "one molecule, nine containers." This table puts the actual value of the same soul-layer rule side by side across all nine forms, turning "the soul stays, the form changes" from a slogan into numbers you can check.

## 主表 · Main Table

| | F1 Web | F2 Mobile | F3 Brand | F4 Print | F5 Presentation | F6 Docs | F7 Poster | F8 Diagram | F9 Report |
|---|---|---|---|---|---|---|---|---|---|
| **Accent 预算 Budget** | ≤2 | ≤2 | ≤2 | ≤2（首字下沉唯一）| ≤2/页 per slide | ≤2 | ≤2（标题+署名）| ≤2 | ≤2 |
| **暗色模式必需 Dark mode required** | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅（数字海报；印刷不需要）| ❌（可选）| ❌（PDF 无暗色概念）|
| **动效意图 Motion intent** | entrance | entrance | brand-breath | none | entrance | state-feedback | entrance | entrance | none |
| **动效时长上限 Max duration** | 420ms | 420ms | **4000ms**（■ 呼吸专属）| 0ms | 420ms | 260ms | 420ms | 420ms | 0ms |
| **动效位移上限 Max translate** | 8px | **4px**（更严）| 0px | 0px | 8px | 0px | 8px | 8px | 0px |
| **允许循环 Allows loop** | ❌ | ✅（仅■呼吸）| ✅（■呼吸本身）| ❌ | ❌ | ❌ | ✅（■呼吸）| ❌ | ❌ |
| **画布类型 Canvas kind** | responsive | mobile (393×852) | responsive | fixed page (pt) | fixed 16:9 | responsive | 6 种比例 | diagram | PDF page |

## 观察 · Observations

**位移幅度随"离手指的距离"递减 Translate distance shrinks with proximity to the finger：** F1（≤16px 文字规则里）在 render-contract 里实测是 8px，F2 移动端进一步收紧到 4px——屏幕越贴近用户，越不需要大位移制造层次感。这条规律没有写在任何一份原始规范文字里，是从九份真实合同数值里比出来的。

**Translate distance shrinks the closer the screen sits to the user:** F1's prose rule allows ≤16px but the real contract measures 8px; F2 tightens further to 4px. This pattern isn't written down anywhere in the prose specs — it only becomes visible by comparing the nine real contract values side by side.

**E8 与 E9-0 的区别 —— 此前被误判为数据不一致 Previously misread as a data inconsistency：** F4（印刷）用 `intensity: "E8"`，F9（报告）用 `"E9-0"`。本文件早先版本认为这是源材料的错误、建议统一为 `"E8"` —— **这个判断是错的**。取材找回的动效强度定义（见 [`soul/motion.md`](../soul/motion.md)）表明两者是两个不同的等级：**E8 印刷静止**意味着连 hover/focus 态和暗色模式都没有，因为纸张上不存在这些状态；**E9-0 静水**仍然允许必要的状态反馈，只是没有进场动画。F9 报告虽以 PDF 为主路径，但可以有 HTML 预览，因此保留状态反馈是正确的。**两者本就应该不同，不需要统一。**

**E8 vs E9-0 — previously misread as a data inconsistency:** F4 (print) uses `intensity: "E8"`; F9 (report) uses `"E9-0"`. An earlier version of this file called that a source-material error and recommended standardizing on `"E8"`. **That judgment was wrong.** The rescued intensity definitions (see [`soul/motion.md`](../soul/motion.md)) show these are two distinct levels: **E8 Print Stillness** means no hover/focus states and no dark mode at all, because paper has none of those; **E9-0 Still Water** still permits necessary state feedback, merely without entrance animation. F9 targets PDF but may ship an HTML preview, so retaining state feedback is correct. **They are supposed to differ.**

**F3 的呼吸动效是全场最特殊的一条 F3's breath animation is the outlier：** 唯一允许 4000ms 时长和 0px 之外还保留循环的场景，直接对应 [`soul/brand.md`](../soul/brand.md) 里 ■ 标记"opacity 1→0.6→1，周期 4s，无限循环"的定义——这是灵魂层里唯一被明确豁免"禁止循环动效"规则的例外，九份合同里只有它把 `maxDurationMs` 开到 4000。

**F3's brand-breath is the one true outlier:** the only scenario allowed a 4000ms duration and a loop outside 0px translate — matching the ■ mark's "opacity 1→0.6→1, 4s cycle, infinite loop" definition in `soul/brand.md`. It's the sole soul-layer exception to "no looping motion," and the only one of the nine contracts that opens `maxDurationMs` up to 4000.

**暗色模式的"必需"与"可选"不是按输出媒介的物理属性划分的 Dark-mode requirement doesn't simply track physical medium：** F4（印刷）和 F9（报告/PDF）都不需要暗色模式，逻辑上是因为它们的终态是纸张/PDF，没有系统级暗色模式可言；但 F7（海报）和 F8（图解）都可能有数字化终态却仍标为"可选"而非"必需"——区别在于 F7/F8 允许创作者按场景自行决定（印刷海报不需要，数字海报建议要），而不是像 F1/F2/F3/F5/F6 那样强制。

Print (F4) and report/PDF (F9) skip dark mode for a clear reason — their final form is paper/PDF, with no OS-level dark mode to speak of. But poster (F7) and diagram (F8) can also end up digital, yet are marked "optional" rather than "required" — the difference is that F7/F8 leave the call to the creator per scenario (a print poster skips it, a digital poster should have it), rather than mandating it the way F1/F2/F3/F5/F6 do.

---

产出新的 F1–F9 artifact 时，直接照抄本表对应列的数值作为 render-contract 的 `theme`/`motion` 字段起点，比凭记忆重新决定更不容易出错。完整字段说明见 [`render-contract.md`](./render-contract.md)。

When producing a new F1–F9 artifact, copy the matching column's values as the starting point for the render-contract's `theme`/`motion` fields — less error-prone than deciding from memory. Full field reference in `render-contract.md`.
