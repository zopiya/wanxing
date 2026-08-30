#!/usr/bin/env node
/**
 * check-tokens — two checks the old repo had no way to run:
 *
 *   1. every `var(--x)` resolves to a definition somewhere in scope
 *   2. no legacy short-vocabulary token names survive
 *
 * The first is the one that matters: the previous examples referenced 52 tokens
 * that were never defined anywhere, and nothing caught it because nothing looked.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SCAN = ["kit", "examples"].map((d) => join(root, d)).filter(existsSync);
const EXT = /\.(css|html|jsx|tsx|svg)$/;

/**
 * Legacy vocabulary retired in the restructure.
 *
 * Matched against actual token names — the ones inside var() or a declaration —
 * never against raw text. A BEM modifier like .wx-chart__bar--muted is not a
 * token named --muted, and flagging it would be a false positive. Checkers that
 * cry wolf get ignored, which is worse than having none.
 */
const LEGACY = [
  /^--fg-\d/, /^--bg-\d$/, /^--s-\d/, /^--t-(xs|sm|base|md|lg|xl|\dxl)$/,
  /^--lh-/, /^--tr-/, /^--d-(instant|fast|base|slow|crawl)$/,
  /^--w-(article|content|showcase)$/, /^--r-(none|sm|md|full)$/,
  /^--sans-ui$/, /^--serif-(display|body)$/,
  /^--ink$/, /^--brick/, /^--muted$/, /^--focus-ring$/, /^--line-\d$/, /^--warm-gray$/,
];

function walk(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) { if (e !== "generated") walk(p, acc); }
    else if (EXT.test(e)) acc.push(p);
  }
  return acc;
}

const files = SCAN.flatMap((d) => walk(d));
const defined = new Set();
const used = new Map();      // token -> [file:line]
const legacyHits = [];

const declRe = /(--[a-z0-9-]+)\s*:/gi;
const useRe = /var\(\s*(--[a-z0-9-]+)/gi;

/**
 * In an HTML file, only CSS contexts count: <style> blocks and style="" values.
 * A `var(--x)` inside a <code> element is prose *about* tokens, not a reference
 * to one, and flagging it would be a false positive — which is how a checker
 * teaches people to ignore it.
 */
function cssContext(text, file) {
  if (!file.endsWith(".html")) return text;
  let out = "";
  for (const m of text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) out += m[1] + "\n";
  for (const m of text.matchAll(/\sstyle\s*=\s*"([^"]*)"/gi)) out += m[1] + "\n";
  return out;
}

for (const f of files) {
  const raw = readFileSync(f, "utf8");
  const text = cssContext(raw, f);
  const rel = relative(root, f);
  // Declarations may live anywhere (component files); usages only in CSS context.
  for (const m of raw.matchAll(declRe)) defined.add(m[1]);
  text.split("\n").forEach((line, i) => {
    for (const m of line.matchAll(useRe)) {
      if (!used.has(m[1])) used.set(m[1], []);
      used.get(m[1]).push(`${rel}:${i + 1}`);
    }
    for (const m of [...line.matchAll(useRe), ...line.matchAll(declRe)]) {
      if (LEGACY.some((re) => re.test(m[1])))
        legacyHits.push(`${rel}:${i + 1}  ${m[1]}`);
    }
  });
}

let failed = false;

// 1 · unresolved
const missing = [...used.keys()].filter((t) => !defined.has(t)).sort();
if (missing.length) {
  failed = true;
  console.error(`\n✗ ${missing.length} token(s) used but never defined:\n`);
  for (const t of missing) {
    console.error(`    ${t}`);
    for (const loc of used.get(t).slice(0, 3)) console.error(`        ${loc}`);
    if (used.get(t).length > 3) console.error(`        …and ${used.get(t).length - 3} more`);
  }
}

// 2 · legacy vocabulary
if (legacyHits.length) {
  failed = true;
  console.error(`\n✗ ${legacyHits.length} legacy short-vocabulary reference(s) survive:\n`);
  for (const h of legacyHits.slice(0, 20)) console.error(`    ${h}`);
}

if (failed) process.exit(1);
console.log(`✓ ${used.size} token references across ${files.length} file(s), all resolved`);
console.log(`✓ no legacy short-vocabulary names`);
