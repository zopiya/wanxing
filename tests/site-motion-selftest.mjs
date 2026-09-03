#!/usr/bin/env node
/**
 * Regression contract for the public motion surface. This reads the generated
 * site (the artifact people use) and exercises the page-local state functions
 * against small DOM-shaped objects.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const index = readFileSync(join(root, "site", "index.html"), "utf8");
const motion = readFileSync(join(root, "site", "motion.html"), "utf8");
const scriptPath = join(root, "site", "assets", "motion-demo.mjs");
const problems = [];

const primary = index.match(/<nav class="doc-primary"[^>]*>([\s\S]*?)<\/nav>/)?.[1] ?? "";
const labels = [...primary.matchAll(/<a\b[^>]*>([^<]+)<\/a>/g)].map((match) => match[1].trim());
expect(
  labels.join("、") === "设计、内容、组件、页面、动效、品牌、接入",
  `一级导航顺序应为七项方案 A，实际为：${labels.join("、")}`,
);
expect(
  /<html\b[^>]*data-motion="E9-1"[^>]*data-animations-complete="false"/.test(index),
  "全站没有以 E9-1 启动并暴露稳定的动效完成信号",
);
expect(
  /<a\b[^>]*class="doc-scroll-cue"[^>]*href="#landing-claim"/.test(index),
  "首页向下箭头不是可聚焦的继续阅读控制",
);
expect(
  /data-wx-motion-lab/.test(motion) && ["E8", "E9-0", "E9-1", "E9-2"].every((level) => motion.includes(`data-motion-level="${level}"`)),
  "动效页没有提供可操作的四档强度实验场",
);
expect(existsSync(scriptPath), "动效实验场缺少行为模块 site/assets/motion-demo.mjs");

if (problems.length) fail();

const {
  selectMotionLevel,
  toggleReducedMotion,
  syncMotionActivity,
} = await import(pathToFileURL(scriptPath));

const stage = makeElement({ "data-motion": "E9-1", "data-motion-active": "" });
const status = { textContent: "" };
const buttons = ["E8", "E9-0", "E9-1", "E9-2"].map((level) =>
  makeElement({ "data-motion-level": level, "aria-checked": level === "E9-1" ? "true" : "false" }),
);

selectMotionLevel(stage, buttons, "E9-2", status);
expect(stage.getAttribute("data-motion") === "E9-2", "选择 E9-2 后舞台强度没有更新");
expect(buttons.map((button) => button.getAttribute("aria-checked")).join(",") === "false,false,false,true", "强度按钮的单选状态没有同步");
expect(status.textContent.includes("E9-2"), "强度变化没有写入可听读状态");

const reduced = makeElement({ "aria-pressed": "false" });
toggleReducedMotion(stage, reduced, status);
expect(stage.hasAttribute("data-motion-preview"), "减少动效预览没有作用到实验舞台");
expect(reduced.getAttribute("aria-pressed") === "true", "减少动效按钮没有暴露按下状态");
toggleReducedMotion(stage, reduced, status);
expect(!stage.hasAttribute("data-motion-preview"), "再次激活后没有退出减少动效预览");

syncMotionActivity(stage, false);
expect(!stage.hasAttribute("data-motion-active"), "舞台离开视口后品牌循环仍被标记为活动");
syncMotionActivity(stage, true);
expect(stage.hasAttribute("data-motion-active"), "舞台回到视口后没有恢复活动标记");

let rejectedUnknownLevel = false;
try { selectMotionLevel(stage, buttons, "E10", status); } catch { rejectedUnknownLevel = true; }
expect(rejectedUnknownLevel, "未知动效等级被静默接受");

if (problems.length) fail();
console.log("✓ site motion self-test: generated navigation, baseline signal, four motion levels and reduced-motion state are live");

function makeElement(initial = {}) {
  const attrs = new Map(Object.entries(initial));
  return {
    offsetWidth: 320,
    getAttribute: (name) => attrs.get(name) ?? null,
    setAttribute: (name, value) => attrs.set(name, String(value)),
    removeAttribute: (name) => attrs.delete(name),
    hasAttribute: (name) => attrs.has(name),
    querySelectorAll: () => [],
  };
}

function expect(condition, message) {
  if (!condition) problems.push(message);
}

function fail() {
  console.error(`✗ ${problems.length} site motion problem(s):`);
  problems.forEach((problem) => console.error(`    ${problem}`));
  process.exit(1);
}
