#!/usr/bin/env node
/**
 * build-themes — generate theme files for third-party chart and diagram tools
 * from the token source of truth.
 *
 * These replace hand-written translation tables, which cannot help drifting
 * from the tokens they describe. No runtime dependency is added to this repo:
 * the outputs are files a *consumer* feeds to their own copy of the library.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "kit/tokens/generated");
const t = JSON.parse(readFileSync(join(OUT, "tokens.json"), "utf8"));

const light = (group, key) => {
  const v = t[group][key];
  return typeof v === "string" ? v : v.light;
};
const dark = (group, key) => {
  const v = t[group][key];
  return typeof v === "string" ? v : v.dark ?? v.light;
};

const ink = (mode) => [
  mode("color", "text-heading"),
  mode("color", "text-primary"),
  mode("color", "text-secondary"),
  mode("color", "text-muted"),
  mode("color", "border-strong"),
];

/* ---- Mermaid ------------------------------------------------------------
   Replaces the hand-written Mermaid translation table that used to live in the
   F8 spec. Nodes are paper, lines are hairline ink, and nothing is a rainbow. */
function mermaid(mode) {
  return {
    theme: "base",
    themeVariables: {
      background: mode("color", "bg-warm"),
      primaryColor: mode("color", "bg-pure"),
      primaryTextColor: mode("color", "text-primary"),
      primaryBorderColor: mode("color", "border-strong"),
      secondaryColor: mode("color", "bg-subtle"),
      tertiaryColor: mode("color", "bg-subtle"),
      lineColor: mode("color", "border-strong"),
      textColor: mode("color", "text-primary"),
      mainBkg: mode("color", "bg-pure"),
      nodeBorder: mode("color", "border-strong"),
      clusterBkg: "transparent",
      clusterBorder: mode("color", "border-subtle"),
      titleColor: mode("color", "text-heading"),
      edgeLabelBackground: mode("color", "bg-warm"),
      fontFamily: t.font.body,
      fontSize: "14px",
      // The single accent, reserved for the node the diagram is about.
      activeTaskBkgColor: mode("color", "accent"),
      activeTaskBorderColor: mode("color", "accent"),
    },
    flowchart: { curve: "linear", padding: 16, nodeSpacing: 40, rankSpacing: 56 },
  };
}

/* ---- ECharts ----------------------------------------------------------- */
function echarts(mode) {
  const palette = ink(mode);
  return {
    color: palette,
    backgroundColor: "transparent",
    textStyle: { fontFamily: t.font.ui, color: mode("color", "text-primary") },
    title: {
      textStyle: { fontFamily: t.font.display, color: mode("color", "text-heading"), fontWeight: 600 },
      subtextStyle: { color: mode("color", "text-secondary") },
    },
    // No legend: series are labelled at their terminus.
    legend: { show: false },
    grid: { containLabel: true, left: 8, right: 24, top: 24, bottom: 8, borderWidth: 0 },
    categoryAxis: {
      axisLine: { lineStyle: { color: mode("color", "border-subtle"), width: 1 } },
      axisTick: { show: false },
      axisLabel: { color: mode("color", "text-muted") },
      splitLine: { show: false },
    },
    valueAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: mode("color", "text-muted") },
      splitLine: { show: false },
    },
    line: {
      itemStyle: { borderWidth: 0 },
      lineStyle: { width: 1.5 },
      symbolSize: 4,
      smooth: false,
    },
    bar: { itemStyle: { barBorderRadius: 0 } },
  };
}

/* ---- Vega / Vega-Lite --------------------------------------------------- */
function vega(mode) {
  return {
    background: null,
    font: t.font.ui,
    title: { font: t.font.display, color: mode("color", "text-heading"), fontWeight: 600, anchor: "start" },
    range: { category: ink(mode), ramp: ink(mode) },
    axis: {
      domainColor: mode("color", "border-subtle"),
      domainWidth: 1,
      grid: false,
      tickSize: 0,
      labelColor: mode("color", "text-muted"),
      labelFont: t.font.ui,
      titleColor: mode("color", "text-secondary"),
    },
    legend: { disable: true },
    line: { strokeWidth: 1.5 },
    point: { size: 36, filled: true },
    bar: { cornerRadius: 0 },
  };
}

mkdirSync(OUT, { recursive: true });
const files = {
  "mermaid-wenxin.json": { light: mermaid(light), dark: mermaid(dark) },
  "echarts-wenxin.json": { light: echarts(light), dark: echarts(dark) },
  "vega-wenxin.json": { light: vega(light), dark: vega(dark) },
};
for (const [name, data] of Object.entries(files)) {
  writeFileSync(join(OUT, name), JSON.stringify(data, null, 2) + "\n");
}
console.log(`✓ ${Object.keys(files).length} themes → generated/ (light + dark each)`);
console.log(`  ink ramp: ${ink(light).join(" ")}`);
