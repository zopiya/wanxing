#!/usr/bin/env node
/** Negative control: prove a declared-but-missing F6 sidebar is rejected. */
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const temp = mkdtempSync(join(tmpdir(), "wanxing-audit-negative-"));
const rel = "dist/negative-control/index.html";
const file = join(temp, rel);
mkdirSync(dirname(file), { recursive: true });
writeFileSync(file, `<!doctype html>
<html lang="zh-CN" data-wanxing-profile="F6" data-wanxing-contract-version="1" data-animations-complete="true">
<head><meta name="viewport" content="width=device-width"><title>negative control</title>
<script type="application/json" id="wanxing-render-contract">{
  "profile":"F6","track":"editorial","language":"zh-CN",
  "project":{"name":"negative control","slug":"negative-control"},
  "output":{"entry":"dist/negative-control/index.html","tmpDir":"dist/negative-control/tmp"},
  "theme":{"accentBudget":2,"darkModeRequired":false},
  "structure":{"requiredRegions":["main"],"sidebarRequired":true},
  "motion":{"intent":"none","intensity":"E9-0","maxDurationMs":0,"maxTranslatePx":0,"completionSignal":"data-animations-complete"},
  "audit":{"profileSpecificChecks":["sidebar"],"allowedDeviations":[]}
}</script></head><body><main><h1>Missing sidebar on purpose</h1><a href="#">No focus style on purpose</a><div role="button" tabindex="0"></div></main></body></html>`);

let report;
try {
  report = JSON.parse(execFileSync("node", [join(root, "scripts/render-audit.mjs"), rel], { cwd: temp, encoding: "utf8" }));
} catch (error) {
  report = JSON.parse(error.stdout);
}
rmSync(temp, { recursive: true, force: true });

const codes = new Set((report.hardGates ?? []).map((gate) => gate.code));
if (!codes.has("check.sidebar") || !codes.has("a11y.focus_visible_missing") || !codes.has("a11y.accessible_name_missing")) {
  console.error("✗ negative control did not prove sidebar, focus, and accessible-name checks");
  process.exit(1);
}
console.log("✓ negative control rejected: sidebar, focus, and accessible-name checks are live");
