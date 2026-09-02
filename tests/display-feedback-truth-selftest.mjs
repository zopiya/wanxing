#!/usr/bin/env node
/** Keep component specimens from presenting an empty box, a dead link, or a
 * repository metric as if it were content or a live product state. */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(new URL("..", import.meta.url).pathname);
const display = readFileSync(resolve(root, "site/_pages/c-display.html"), "utf8");
const feedback = readFileSync(resolve(root, "site/_pages/c-feedback.html"), "utf8");

assert.doesNotMatch(display, /href="#"/, "display examples must not contain dead destination links");
assert.doesNotMatch(display, /aspect-ratio:16\/9;background:var\(--color-bg-subtle\)/, "gallery must not masquerade blank colour blocks as meaningful images");
assert.match(display, /src="\.\.\/kit\/assets\/brand\/logo-wanxing\.svg"/, "gallery must use a real repository asset");
assert.match(display, /src="\.\.\/kit\/assets\/brand\/logo-wenxin\.svg"/, "gallery must use a second real repository asset");
assert.match(display, /\{\{componentContractCount\}\}/, "public component count must be generated from the manifest");
for (const family of ["c-general", "c-layout", "c-navigation", "c-entry", "c-display", "c-feedback"]) {
  assert.match(display, new RegExp(`\\{\\{componentCount:${family}\\}\\}`), `table must derive ${family} from the component manifest`);
}
assert.doesNotMatch(display, />83</, "stale hand-counted component metrics must be removed");
assert.doesNotMatch(display, />39</, "stale hand-counted stylesheet metrics must be removed");
assert.doesNotMatch(display, /各站点条目数/, "illustrative site totals must not masquerade as sourced data");
assert.doesNotMatch(display, /aria-current="page">组件目录/, "tree current item must match the page being demonstrated");
assert.doesNotMatch(feedback, /正在重试|全部检查通过/, "feedback specimen must not claim a retry or a global check it does not perform");
assert.match(feedback, /<strong>存储空间不足。<\/strong>/, "warning alert needs a state title");
assert.match(feedback, /<strong>连接已断开。<\/strong>/, "danger alert needs a state title");
assert.match(feedback, /<strong>导出已完成。<\/strong>/, "success alert needs a state title");

console.log("✓ display and feedback specimens use real assets, truthful facts, live destinations, and explicit state language");
