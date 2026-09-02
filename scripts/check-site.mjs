#!/usr/bin/env node
/**
 * check-site — structural gate for the generated documentation site.
 *
 * A docs site fails quietly: a dead link or a skipped heading level looks
 * fine to the author and breaks for the reader. These checks are the ones
 * that cannot be caught by reading the page you happen to be editing.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join, basename, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
/* Tests supply a minimal generated site through this explicit seam. The
   production default stays the public site/ output. */
const siteDir = process.env.WENXIN_SITE_DIR
  ? resolve(process.env.WENXIN_SITE_DIR)
  : join(root, "site");
if (!existsSync(siteDir)) { console.log("· no site/ directory, skipping"); process.exit(0); }

const nav = JSON.parse(readFileSync(join(siteDir, "_nav.json"), "utf8"));
const slugs = nav.flatMap((s) => s.groups.flatMap((g) => g.items.map((i) => i.slug)));
// The product landing page intentionally does not appear in the reference
// sidebar. It remains a required, public route rather than an orphan.
const routes = new Set(["index", ...slugs]);
/* These are the two in-repository implementations of archetype D. They are
   editorial navigation pages, not third-layer form/feedback interactions. */
const editorialLandingPages = new Set(["index.html", "pattern-landing.html"]);
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

function documentNavToggleCount(html) {
  return [...html.matchAll(/<button\b[^>]*>/gi)].filter((m) =>
    /\bclass=(["'])[^"']*\bdoc-navtoggle\b[^"']*\1/i.test(m[0])
  ).length;
}

function sidebarHasMenuContent(html) {
  const sidebar = html.match(/<nav\b[^>]*\bid=(["'])doc-sidebar\1[^>]*>([\s\S]*?)<\/nav>/i);
  if (!sidebar) return false;
  /* A fallback link may be useful inside a sidebar, but it is not the
     document menu the mobile trigger promises to open. Bind this to the
     emitted wx-menu / wx-menu__link contract rather than to any anchor. */
  const menus = [...sidebar[2].matchAll(/<ul\b[^>]*>([\s\S]*?)<\/ul>/gi)];
  return menus.some((menu) =>
    hasClass(menu[0].slice(0, menu[0].indexOf(">") + 1), "wx-menu") &&
    [...menu[1].matchAll(/<a\b[^>]*>/gi)].some((link) =>
      hasClass(link[0], "wx-menu__link") && /\bhref=(["'])[^"']+\1/i.test(link[0])
    )
  );
}

function hasClass(openingTag, expected) {
  const classAttribute = openingTag.match(/\bclass=(["'])(.*?)\1/i);
  return classAttribute?.[2].split(/\s+/).includes(expected) ?? false;
}

function primaryNavigationLinkCount(html, file) {
  /* The public home keeps its D actions in a named action cluster. The pattern
     page embeds one wx-landing example inside a documentation page. Scoping
     to those regions preserves a legitimate feedback/recovery action elsewhere
     on the document instead of treating every primary link as navigation. */
  const landingRegion = file === "index.html"
    ? contentOfFirstElementWithClass(html, "div", "doc-landing__actions")
    : contentOfFirstElementWithClass(html, "main", "wx-landing");
  return [...(landingRegion ?? "").matchAll(/<a\b[^>]*>/gi)].filter((m) =>
    /\bclass=(["'])[^"']*\bwx-btn--primary\b[^"']*\1/i.test(m[0])
  ).length;
}

function contentOfFirstElementWithClass(html, tag, className) {
  const element = new RegExp(`<(/?)${tag}\\b[^>]*>`, "gi");
  let contentStart = null;
  let depth = 0;
  for (const match of html.matchAll(element)) {
    const closing = match[1] === "/";
    if (contentStart === null) {
      if (!closing && hasClass(match[0], className)) {
        contentStart = match.index + match[0].length;
        depth = 1;
      }
      continue;
    }
    depth += closing ? -1 : 1;
    if (depth === 0) return html.slice(contentStart, match.index);
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

  // 3b · page-specific modules share the same deployment boundary as CSS and
  // images. A missing local script otherwise leaves a plausible-looking demo
  // inert with every structural check still green.
  for (const m of html.matchAll(/\bsrc=(["'])\.\/(assets\/[^"']+)\1/gi)) {
    const target = m[2].split("?", 1)[0];
    if (!existsSync(join(siteDir, target))) problems.push(`${where}: missing asset ${target}`);
  }

  // 4 · in-page anchors resolve
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  for (const m of html.matchAll(/href="#([^"]+)"/g)) {
    if (!ids.has(m[1])) problems.push(`${where}: anchor #${m[1]} has no target`);
  }

  // 5 · a mobile "目录" control is meaningful only when this page owns a
  // populated document menu. The product landing has no sidebar by design.
  const navToggleCount = documentNavToggleCount(html);
  if (file === "index.html") {
    if (navToggleCount) problems.push(`${where}: landing page must not render a document navigation toggle`);
  } else {
    if (navToggleCount !== 1) problems.push(`${where}: expected exactly 1 document navigation toggle, found ${navToggleCount}`);
    if (navToggleCount && !sidebarHasMenuContent(html)) {
      problems.push(`${where}: document navigation toggle has no menu content`);
    }
  }

  // 6 · archetype D stays on the editorial track. A link that moves the
  // reader elsewhere is navigation, so it cannot borrow the third-layer
  // filled-button exception reserved for form submit and feedback confirm.
  if (editorialLandingPages.has(file) && primaryNavigationLinkCount(html, file)) {
    problems.push(`${where}: D-type landing navigation must not use wx-btn--primary`);
  }
}

if (problems.length) {
  console.error(`✗ ${problems.length} site problem(s):\n`);
  for (const p of problems) console.error(`    ${p}`);
  process.exit(1);
}
console.log(`✓ ${built.length} site page(s): element nesting balances, headings well-formed, links and anchors resolve`);
