#!/usr/bin/env node
/**
 * check-forbidden — makes spec/soul/forbidden.md executable.
 *
 * The forbidden list is not style advice; it is the system's identity. These are
 * the parts of it a machine can decide. Everything here maps to a specific row
 * in that document, and the message says which.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SCAN = ["kit", "examples"].map((d) => join(root, d)).filter(existsSync);
const EXT = /\.(css|html|jsx|tsx)$/;

const RULES = [
  { id: "shadow", why: "无阴影 — forbidden.md §一",
    re: /box-shadow\s*:\s*(?!none|0\b|inherit|unset)/i },
  { id: "gradient", why: "无渐变 — forbidden.md §二",
    re: /(linear|radial|conic)-gradient\s*\(/i },
  { id: "outline-none", why: "禁止 outline:none — forbidden.md §三 / A-2",
    re: /outline\s*:\s*none/i },
  { id: "bouncy-easing", why: "禁止弹跳类缓动 — motion.md",
    re: /\b(spring|bounce|elastic)\b|cubic-bezier\([^)]*,\s*-?\d*\.?\d+\s*,\s*[^)]*,\s*1\.[1-9]/i },
  { id: "thick-border", why: "边框 >1px（1.5px 描边除外）— forbidden.md §一",
    re: /border(-(top|right|bottom|left|inline|block)(-(start|end))?)?(-width)?\s*:\s*(?:[^;]*\s)?([2-9]|\d{2,})(\.\d+)?px/i,
    allow: /var\(--stroke-mark\)|1\.5px/ },
  { id: "spinner", why: "禁止旋转 spinner — motion.md",
    re: /animation[^;]*\brotate\b|@keyframes\s+[\w-]*spin/i },
];

/**
 * Blank out comment bodies while preserving line count and column offsets, so
 * that reported line numbers stay true. A checker that cannot tell code from
 * prose produces false positives, and a checker with false positives gets
 * ignored — which is worse than not having one.
 */
function stripComments(src) {
  let out = "";
  let mode = "code";           // code | block | line | str
  let quote = "";
  for (let i = 0; i < src.length; i++) {
    const c = src[i], n = src[i + 1];
    if (mode === "code") {
      if (c === "/" && n === "*") { mode = "block"; out += "  "; i++; continue; }
      if (c === "/" && n === "/") { mode = "line"; out += "  "; i++; continue; }
      if (c === "<" && src.startsWith("<!--", i)) { mode = "block"; out += "    "; i += 3; continue; }
      if (c === '"' || c === "'") { mode = "str"; quote = c; }
      out += c;
    } else if (mode === "block") {
      if ((c === "*" && n === "/") || (c === "-" && src.startsWith("-->", i))) {
        const len = c === "*" ? 2 : 3;
        mode = "code"; out += " ".repeat(len); i += len - 1; continue;
      }
      out += c === "\n" ? "\n" : " ";
    } else if (mode === "line") {
      if (c === "\n") { mode = "code"; out += "\n"; continue; }
      out += " ";
    } else if (mode === "str") {
      if (c === quote && src[i - 1] !== "\\") mode = "code";
      out += c;
    }
  }
  return out;
}

function walk(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (EXT.test(e)) acc.push(p);
  }
  return acc;
}

const files = SCAN.flatMap((d) => walk(d));
const hits = [];
for (const f of files) {
  const rel = relative(root, f);
  const raw = readFileSync(f, "utf8").split("\n");
  stripComments(readFileSync(f, "utf8")).split("\n").forEach((line, i) => {
    for (const r of RULES) {
      if (r.re.test(line) && !(r.allow && r.allow.test(line)))
        hits.push({ rel, n: i + 1, id: r.id, why: r.why, line: (raw[i] ?? line).trim().slice(0, 72) });
    }
  });
}

if (hits.length) {
  console.error(`\n✗ ${hits.length} forbidden pattern(s):\n`);
  for (const h of hits) {
    console.error(`    ${h.rel}:${h.n}  [${h.id}]  ${h.why}`);
    console.error(`        ${h.line}`);
  }
  console.error("");
  process.exit(1);
}
console.log(`✓ no forbidden patterns across ${files.length} file(s)`);
