#!/usr/bin/env node
/**
 * build-llms — the entry point for an agent that has to work with this system
 * but has not read it.
 *
 * Two files, two budgets. llms.txt is an index: what exists, what question
 * each page answers, in a few hundred tokens. llms-full.txt is the whole
 * specification, for an agent that can afford to read it.
 *
 * Both are generated. A hand-maintained index of 34 pages goes stale on the
 * first page anyone adds, and a stale index is worse than none — it sends the
 * reader somewhere that no longer says what it claims.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const nav = JSON.parse(readFileSync(join(root, "site", "_nav.json"), "utf8"));
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));

/** The lede of each page is the page's own answer to "what is this for". */
function lede(slug) {
  const html = readFileSync(join(root, "site", "_pages", `${slug}.html`), "utf8");
  const m = html.match(/class="(?:wx-lede|doc-screen__lede)"[^>]*>([\s\S]*?)<\/p>/);
  return m ? m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : "";
}

const sections = nav.map((section) => {
  const links = section.groups.flatMap((group) => group.items).map((item) => {
    const summary = lede(item.slug);
    return `- [${item.title}](./${item.slug}.html)${summary ? `: ${summary}` : ""}`;
  }).join("\n");
  return `## ${section.title}\n\n${links}`;
}).join("\n\n");

const index = `# ${pkg.name} · 文心 · 万形

> 内容型产品的设计语言与前端组件库。文字即界面，留白即设计，克制即力量。
> 两层：文心是不变的魂（token、原则），万形是它在不同容器里取的形。

**先读这一个文件**：[kit/wenxin.json](../kit/wenxin.json) —— 不变之魂、三层仲裁规则、
两种排除、禁令（可检查的与需判断的）、全部 token、71 条组件契约、判定索引、以及如何验证。
它完全由来源派生，不会与来源不一致。

**不要声称合规，跑一遍**：\`npx wenxin audit <file>\` 吃一个 HTML 文件，吐 JSON；
\`hardGates\` 非空即不合规。

**三条不可改**：A9 克制之美 / B9 温暖极简 / D9 暖土调。要改先在
[spec/DECISIONS.md](../spec/DECISIONS.md) 立待议项。

${sections}

## 规范正文 · Specification

- [llms-full.txt](./llms-full.txt): 全部规范正文合并，供预算充足时通读
- [spec/README.md](../spec/README.md): 规范索引
- [spec/tracks.md](../spec/tracks.md): 双轨仲裁 —— 解决任何"哲学 vs 惯例"冲突前先读这个
- [spec/DECISIONS.md](../spec/DECISIONS.md): 28 条已做判定，含理由与所属仲裁层

## 产物 · Artifacts

- [kit/index.css](../kit/index.css): 引这一个文件即可
- [kit/dist/wenxin.css](../kit/dist/wenxin.css): 单文件、未压缩、无 @import
- [kit/tokens/generated/tokens.dtcg.json](../kit/tokens/generated/tokens.dtcg.json): W3C DTCG token 交换格式
- [kit/patterns/](../kit/patterns/): 五份可直接复制的页面骨架 A–E
`;

writeFileSync(join(root, "site", "llms.txt"), index);

/* The full text is the spec itself — it is already markdown, and it is the
   thing the site pages are derived from. */
const specFiles = [
  "README.md", "tracks.md", "DECISIONS.md", "media.md",
  "page-archetypes.md", "render-contract.md", "PROVENANCE.md",
].filter((f) => { try { readFileSync(join(root, "spec", f)); return true; } catch { return false; } });
const soul = readdirSync(join(root, "spec", "soul")).filter((f) => f.endsWith(".md")).sort();

const parts = [
  `# 文心 · 万形 — 完整规范\n\n> 由 spec/ 合并生成，勿直接编辑。版本 ${pkg.version}。\n`,
  ...specFiles.map((f) => `\n\n<!-- spec/${f} -->\n\n${readFileSync(join(root, "spec", f), "utf8")}`),
  ...soul.map((f) => `\n\n<!-- spec/soul/${f} -->\n\n${readFileSync(join(root, "spec", "soul", f), "utf8")}`),
];
writeFileSync(join(root, "site", "llms-full.txt"), parts.join(""));

const lines = parts.join("").split("\n").length;
console.log(`✓ llms: llms.txt indexes ${nav.reduce((n, s) => n + s.groups.reduce((m, g) => m + g.items.length, 0), 0)} page(s); llms-full.txt is ${specFiles.length + soul.length} spec file(s), ${lines} lines`);
