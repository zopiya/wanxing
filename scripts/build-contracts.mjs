#!/usr/bin/env node
/**
 * build-contracts — assemble kit/wenxin.json, the one file a consuming agent
 * needs to read.
 *
 * The rules of this system are spread across 3000 lines of bilingual prose,
 * two generated token files and a component manifest. A human reads the prose.
 * An agent should not have to: it needs the decidable rules, the contracts,
 * and the command that tells it whether its output complied.
 *
 * Everything here is DERIVED. Nothing is authored in this file, so nothing in
 * it can disagree with the sources it came from.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (...p) => JSON.parse(readFileSync(join(root, ...p), "utf8"));

const pkg = read("package.json");
const tokens = read("kit", "tokens", "generated", "tokens.json");
const manifest = read("kit", "components", "manifest.json");
const forbidden = read("kit", "contracts", "forbidden.json");

/* The decision log is prose, but its index is not: an agent needs to know a
   ruling exists and what it settled before it proposes reopening one. */
const decisions = [...readFileSync(join(root, "spec", "DECISIONS.md"), "utf8")
  .matchAll(/^## (D-\d+) · (.+)$/gm)].map(([, id, title]) => ({ id, title }));

const bundle = {
  name: pkg.name,
  version: pkg.version,
  summary: "文心 · 万形 — 内容型产品的设计语言。文字即界面，留白即设计，克制即力量。",
  /* Read this first. Everything else is detail. */
  invariant: {
    note: "不变之魂。改动这三条，产物就不再属于这套语言；要改，先在 spec/DECISIONS.md 立一条待议项。",
    axes: ["A9 克制之美", "B9 温暖极简", "D9 暖土调"],
  },
  arbitration: {
    note: "冲突判定，自上而下三层。设计哲学约 60%，主流惯例约 40% — 比例是这三层产生的结果，不是口味。",
    layers: [
      { layer: 1, name: "全局底线", rule: "无障碍与基本可用性，惯例无条件优先，两条轨道都适用。",
        covers: ["WCAG 2.2 AA 对比度", "可见焦点态", "键盘可达", "触控目标尺寸", "颜色不作唯一信息载体", "prefers-reduced-motion"] },
      { layer: 2, name: "按形态分轨", rule: "阅读轨全量应用视觉约束；应用轨放宽。页面级声明 track。",
        note: "采用页面原型 E（工具/表单）的页面会翻转它所在形态的轨道。" },
      { layer: 3, name: "组件类别覆盖", rule: "数据录入与反馈类组件永远按惯例处理，无论所在轨道。表单就是表单。" },
    ],
  },
  exclusions: {
    note: "两种排除不是一回事（D-23）。理由是「这违反我们相信的东西」的不会回来；理由是「暂时用不上」的，范围扩大后已经实现了。",
    philosophy: ["卡片", "spinner", "骨架屏", "自动轮播", "水印"],
    scopeResolved: ["滑块", "上传", "日期", "树", "气泡"],
  },
  forbidden,
  tokens,
  components: manifest,
  decisions,
  verify: {
    note: "别声称合规 — 跑一遍。审计器检查合同化输出的 DOM 与内联样式；hardGates 非空即失败，外链 CSS 与浏览器验证另行人工处理。",
    audit: "npm exec --no -- wenxin audit dist/<slug>/index.html",
    gates: [
      "check:tokens — 每个 var(--x) 都能解析",
      "check:colors — 每个前景色对它可能落在的每个面测对比度",
      "check:forbidden — 本文件 forbidden.checkable 的可执行部分",
      "check:components — 契约解析、契约在文档中可见、每个 wx- 类可解析",
      "check:site — 标签配平、标题层级、链接与锚点",
      "check:a11y — main 地标、控件标签、可访问名",
    ],
  },
};

const out = join(root, "kit", "wenxin.json");
writeFileSync(out, `${JSON.stringify(bundle, null, 2)}\n`);
console.log(`✓ contracts: kit/wenxin.json — ${manifest.reduce((n, f) => n + f.items.length, 0)} contracts, ${forbidden.checkable.length} checkable rules, ${forbidden.judgement.length} judgement rules, ${decisions.length} decisions`);
