#!/usr/bin/env node
/**
 * check-site — structural gate for the generated documentation site.
 *
 * A docs site fails quietly: a dead link or a skipped heading level looks
 * fine to the author and breaks for the reader. These checks are the ones
 * that cannot be caught by reading the page you happen to be editing.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const siteDir = join(root, "site");
if (!existsSync(siteDir)) { console.log("· no site/ directory, skipping"); process.exit(0); }

const nav = JSON.parse(readFileSync(join(siteDir, "_nav.json"), "utf8"));
const slugs = nav.flatMap((s) => s.groups.flatMap((g) => g.items.map((i) => i.slug)));
// The product landing page intentionally does not appear in the reference
// sidebar. It remains a required, public route rather than an orphan.
const routes = new Set(["index", ...slugs]);
/* Underscore-prefixed files are sources (shell, fragments), not pages. */
const built = readdirSync(siteDir).filter((f) => f.endsWith(".html") && !f.startsWith("_"));
const pages = new Set(built);

const problems = [];

for (const slug of slugs) {
  if (!pages.has(`${slug}.html`)) problems.push(`nav lists ${slug} but ${slug}.html was not built`);
}
for (const file of built) {
  if (!routes.has(file.replace(/\.html$/, ""))) problems.push(`${file} is built but unreachable from the nav`);
}

/* Containers whose end tag is mandatory. p, li, td, tr, thead, dt, dd and
   option all have optional end tags in HTML, so a stack over those would
   reject legal markup — and a gate with false positives gets switched off. */
const MUST_CLOSE = new Set([
  "div", "section", "article", "main", "nav", "aside", "header", "footer",
  "figure", "details", "table", "ul", "ol", "dl", "blockquote", "form",
  "fieldset", "pre", "span", "label", "button", "a",
]);

/**
 * One stray </div> closed .doc-article early on c-feedback.html and the last
 * five sections of the page escaped the layout grid entirely — sidebar and
 * table of contents gone. Every other gate stayed green, because none of them
 * looks at structure. This one does.
 */
function unbalanced(html) {
  const source = html.replace(/<!--[\s\S]*?-->/g, "");
  const stack = [];
  for (const m of source.matchAll(/<(\/?)([a-zA-Z][\w-]*)([^>]*)>/g)) {
    const [, closing, raw, attrs] = m;
    const tag = raw.toLowerCase();
    if (!MUST_CLOSE.has(tag) || attrs.trimEnd().endsWith("/")) continue;
    const line = source.slice(0, m.index).split("\n").length;
    if (!closing) { stack.push({ tag, line }); continue; }
    const open = stack.pop();
    if (!open) return `stray </${tag}> on line ${line} with nothing open`;
    if (open.tag !== tag) return `<${open.tag}> opened on line ${open.line} is closed by </${tag}> on line ${line}`;
  }
  if (stack.length) {
    const { tag, line } = stack[stack.length - 1];
    return `<${tag}> opened on line ${line} is never closed`;
  }
  return null;
}

for (const file of built) {
  const html = readFileSync(join(siteDir, file), "utf8");
  const where = basename(file);

  // 0 · element nesting must balance
  const imbalance = unbalanced(html);
  if (imbalance) problems.push(`${where}: ${imbalance}`);

  // 1 · exactly one h1
  const h1s = html.match(/<h1\b/gi) || [];
  if (h1s.length !== 1) problems.push(`${where}: expected exactly 1 <h1>, found ${h1s.length}`);

  // 2 · heading levels must not skip (h2 -> h4 hides structure from screen readers)
  const levels = [...html.matchAll(/<h([1-6])\b/gi)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i += 1) {
    if (levels[i] > levels[i - 1] + 1) {
      problems.push(`${where}: heading level jumps h${levels[i - 1]} -> h${levels[i]}`);
      break;
    }
  }

  // 3 · internal links resolve
  for (const m of html.matchAll(/href="\.\/([^"#]+)(#[^"]*)?"/g)) {
    // Query strings version static assets but are not part of their filesystem
    // identity. Checking the literal href made cache-busting look like a dead
    // link, which is a false failure rather than useful evidence.
    const target = m[1].split("?", 1)[0];
    if (target.startsWith("assets/")) {
      if (!existsSync(join(siteDir, target))) problems.push(`${where}: missing asset ${target}`);
    } else if (!pages.has(target)) {
      problems.push(`${where}: link to missing page ${target}`);
    }
  }

  // 4 · in-page anchors resolve
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  for (const m of html.matchAll(/href="#([^"]+)"/g)) {
    if (!ids.has(m[1])) problems.push(`${where}: anchor #${m[1]} has no target`);
  }
}

if (problems.length) {
  console.error(`✗ ${problems.length} site problem(s):\n`);
  for (const p of problems) console.error(`    ${p}`);
  process.exit(1);
}
console.log(`✓ ${built.length} site page(s): element nesting balances, headings well-formed, links and anchors resolve`);
