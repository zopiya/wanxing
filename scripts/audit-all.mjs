#!/usr/bin/env node
/**
 * audit-all — run the render audit over every example and print a matrix.
 * Non-zero exit if any example fails.
 */
import { readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
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

let failed = 0;
const rows = [];
for (const p of pages) {
  const rel = relative(root, p);
  let out;
  try {
    out = JSON.parse(execFileSync("node", [join(root, "scripts/render-audit.mjs"), p], { encoding: "utf8" }));
  } catch (e) {
    // the auditor exits non-zero on failures but still prints its report
    try { out = JSON.parse(e.stdout); }
    catch { rows.push({ rel, profile: "?", track: "?", f: "ERR", w: "-" }); failed++; continue; }
  }
  const f = (out.failures ?? []).length;
  const w = (out.warnings ?? []).length;
  if (f) failed++;
  rows.push({
    rel,
    profile: out.contract?.profile ?? out.metrics?.identity?.profile ?? "-",
    track: out.contract?.track ?? "-",
    motion: out.contract?.motion?.intensity ?? "-",
    f, w,
    codes: (out.failures ?? []).map((x) => x.code),
  });
}

const pad = (s, n) => String(s).padEnd(n);
console.log(pad("example", 42) + pad("profile", 9) + pad("track", 13) + pad("motion", 8) + pad("fail", 6) + "warn");
console.log("-".repeat(84));
for (const r of rows) {
  console.log(pad(r.rel, 42) + pad(r.profile, 9) + pad(r.track, 13) + pad(r.motion, 8) + pad(r.f || "·", 6) + (r.w || "·"));
  for (const c of r.codes ?? []) console.log("    ✗ " + c);
}
console.log("-".repeat(84));
console.log(`${rows.length} page(s), ${failed} failing`);
process.exit(failed ? 1 : 0);
