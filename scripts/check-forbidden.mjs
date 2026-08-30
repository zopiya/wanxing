#!/usr/bin/env node
/**
 * check-forbidden — makes spec/soul/forbidden.md executable.
 *
 * The forbidden list is not style advice; it is the system's identity. These are
 * the parts of it a machine can decide. Everything here maps to a specific row
 * in that document, and the message says which.
 *
 * The rules a machine CANNOT decide are listed beside these, under
 * `judgement`, and nothing reads them. That is deliberate: an unmarked
 * unenforceable rule gets mistaken for an enforced one, which is how a green
 * run becomes false evidence (D-22).
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SCAN = ["kit", "examples", "site"].map((d) => join(root, d)).filter(existsSync);
const EXT = /\.(css|html|jsx|tsx)$/;

/* The rules live in kit/contracts/forbidden.json, which is also what
   kit/wenxin.json ships to consumers. Two copies of a rule can disagree and
   nothing would notice — the same defect that put --code-bg in four places. */
const ruleSource = JSON.parse(readFileSync(join(root, "kit", "contracts", "forbidden.json"), "utf8"));
const RULES = ruleSource.checkable.map(({ id, why, spec, pattern, flags, allow }) => ({
  id,
  why: `${why} — ${spec}`,
  re: new RegExp(pattern, flags ?? ""),
  ...(allow ? { allow: new RegExp(allow) } : {}),
}));

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

/**
 * Documentation quotes the very patterns it forbids. Text inside <code> or
 * <pre> is prose ABOUT code, not code — mask it, preserving line numbers so
 * reported positions stay true. A checker with false positives gets ignored,
 * which is worse than not having one.
 */
function maskProse(text, file) {
  if (!/\.html$/.test(file)) return text;
  return text.replace(/<(code|pre)\b[^>]*>([\s\S]*?)<\/\1>/gi,
    (m) => m.replace(/[^\n]/g, " "));
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
  stripComments(maskProse(readFileSync(f, "utf8"), f)).split("\n").forEach((line, i) => {
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
