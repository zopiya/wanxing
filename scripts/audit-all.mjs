#!/usr/bin/env node
/**
 * audit-all — run the render audit over every example and print a matrix.
 * Non-zero exit if any example fails.
 */
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, existsSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const EX = join(root, "examples");
if (!existsSync(EX)) { console.log("no examples/ yet"); process.exit(0); }

const pages = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (e.endsWith(".html")) pages.push(p);
  }
})(EX);
pages.sort();

const stagedRoot = mkdtempSync(join(tmpdir(), "wanxing-audit-"));

let failed = 0;
let skipped = 0;
const rows = [];
for (const p of pages) {
  const rel = relative(root, p);
  const source = readFileSync(p, "utf8");
  const contractMatch = source.match(/<script\b(?=[^>]*\bid=["']wanxing-render-contract["'])[^>]*>([\s\S]*?)<\/script>/i);
  if (!contractMatch) {
    // A page with no contract is not audited — but it is still reported.
    // Dropping it silently is how a matrix starts lying about its coverage.
    rows.push({ rel, profile: "—", track: "—", motion: "—", f: 0, w: 0, skipped: true, codes: [] });
    skipped++;
    continue;
  }
  const contract = JSON.parse(contractMatch[1]);
  const slug = contract?.project?.slug;
  if (!slug) {
    rows.push({ rel, profile: contract?.profile ?? "?", track: contract?.track ?? "-", motion: contract?.motion?.intensity ?? "-", f: 1, w: 0, codes: ["contract.project_slug_missing"] });
    failed++;
    continue;
  }
  const stagedRelative = `dist/${slug}/index.html`;
  const staged = join(stagedRoot, stagedRelative);
  mkdirSync(dirname(staged), { recursive: true });
  copyFileSync(p, staged);
  let out;
  try {
    out = JSON.parse(execFileSync("node", [join(root, "scripts/render-audit.mjs"), stagedRelative], { cwd: stagedRoot, encoding: "utf8" }));
  } catch (e) {
    // the auditor exits non-zero on failures but still prints its report
    try { out = JSON.parse(e.stdout); }
    catch { rows.push({ rel, profile: "?", track: "?", f: "ERR", w: "-" }); failed++; continue; }
  }
  const f = (out.hardGates ?? []).length;
  const w = (out.warnings ?? []).length;
  if (f) failed++;
  rows.push({
    rel,
    profile: out.contract?.profile ?? out.metrics?.identity?.profile ?? "-",
    track: out.contract?.track ?? "-",
    motion: out.contract?.motion?.intensity ?? "-",
    f, w,
    codes: (out.hardGates ?? []).map((x) => x.code),
  });
}

rmSync(stagedRoot, { recursive: true, force: true });

const pad = (s, n) => String(s).padEnd(n);
console.log(pad("example", 42) + pad("profile", 9) + pad("track", 13) + pad("motion", 8) + pad("fail", 6) + "warn");
console.log("-".repeat(84));
for (const r of rows) {
  console.log(pad(r.rel, 42) + pad(r.profile, 9) + pad(r.track, 13) + pad(r.motion, 8) + pad(r.skipped ? "skip" : (r.f || "·"), 6) + (r.skipped ? "—" : (r.w || "·")));
  for (const c of r.codes ?? []) console.log("    ✗ " + c);
}
console.log("-".repeat(84));
console.log(`${rows.length} page(s), ${failed} failing` + (skipped ? `, ${skipped} skipped (no render contract)` : ""));
process.exit(failed ? 1 : 0);
