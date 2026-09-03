#!/usr/bin/env node
/**
 * build-site — assemble site/_pages/*.html into standalone pages.
 *
 * Two things this earns over hand-writing each page:
 *
 * 1. The navigation exists once. Eighteen hand-maintained copies of a nav
 *    diverge; this one cannot.
 * 2. Every demo's code block is GENERATED FROM THE DEMO ITSELF. A doc that
 *    shows markup different from what it renders is worse than no doc, and
 *    hand-copying markup into a <pre> guarantees that drift eventually.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readPageFacts, renderPageFacts } from "./page-facts.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const siteDir = join(root, "site");
/* One file is the whole information architecture: the top bar's sections, the
   sidebar scoped to the section you are standing in, and the route table the
   checks read. Two nav files drifted — the top bar offered four sections while
   every page rendered the same twenty-five-item sidebar, so entering "内容"
   showed you the sidebar of everything else. */
const nav = JSON.parse(readFileSync(join(siteDir, "_nav.json"), "utf8"));
const sectionItems = (section) => section.groups.flatMap((g) => g.items);
const sectionOf = (slug) => nav.find((s) => sectionItems(s).some((i) => i.slug === slug));
const componentManifest = JSON.parse(readFileSync(join(root, "kit", "components", "manifest.json"), "utf8"));
const pageFacts = readPageFacts(root);

const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Reindent a captured fragment so the code block reads as authored. */
function dedent(block) {
  const lines = block.replace(/^\n/, "").replace(/\s+$/, "").split("\n");
  const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length);
  const cut = indents.length ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(cut)).join("\n");
}

/**
 * Find each demo stage and append a <details> holding its own source.
 * Nested .doc-demo is not supported and would be silently mis-sliced, so a
 * demo containing another demo is a build error rather than a wrong page.
 */
function expandDemos(html, slug) {
  const open = /<div class="doc-demo__stage">/g;
  let out = "";
  let cursor = 0;
  let m;
  while ((m = open.exec(html))) {
    const start = m.index + m[0].length;
    let depth = 1;
    const tag = /<div\b|<\/div>/g;
    tag.lastIndex = start;
    let t;
    let end = -1;
    while ((t = tag.exec(html))) {
      depth += t[0] === "</div>" ? -1 : 1;
      if (depth === 0) { end = t.index; break; }
    }
    if (end < 0) throw new Error(`${slug}: unclosed .doc-demo__stage`);
    const inner = html.slice(start, end);
    if (inner.includes("doc-demo__stage")) throw new Error(`${slug}: nested demo stages are not supported`);
    const code = dedent(inner);
    out += html.slice(cursor, end + "</div>".length);
    out += `\n<details class="doc-code"><summary>查看代码 · Source</summary>` +
           `<pre class="doc-code__body"><code>${escapeHtml(code)}</code></pre></details>`;
    cursor = end + "</div>".length;
    open.lastIndex = cursor;
  }
  return out + html.slice(cursor);
}

/**
 * The sidebar shows one section, never the whole site. A reader who entered
 * "组件" is inside components; offering them every design page as well is not
 * generosity, it is a failure to answer "where am I".
 */
function renderNav(currentSlug) {
  const section = sectionOf(currentSlug);
  if (!section) return "";
  const groups = section.groups.map((group) => {
    const items = group.items.map((item) => {
      const current = item.slug === currentSlug ? ' aria-current="page"' : "";
      return `        <li><a class="wx-menu__link" href="./${item.slug}.html"${current}>${item.title}</a></li>`;
    }).join("\n");
    return `      <li class="wx-menu__group">${group.title}</li>\n${items}`;
  }).join("\n");
  return `    <p class="doc-sidebar__title">${section.title}</p>\n` +
         `    <ul class="wx-menu">\n${groups}\n    </ul>`;
}

/** The product landing deliberately has no scoped sidebar, so it must not
 * expose a mobile trigger for an empty navigation region. */
function renderNavToggle(navHtml) {
  if (!navHtml) return "";
  return `  <button class="doc-navtoggle wx-btn wx-btn--text" type="button"\n` +
         `          data-wx-toggle="#doc-sidebar" aria-expanded="false" aria-controls="doc-sidebar">目录</button>`;
}

/** The top bar is the section list. Each link enters one reading mode and
 * swaps the sidebar with it. */
function renderTopNav(currentSlug) {
  const active = sectionOf(currentSlug)?.slug;
  return nav.map((section) => {
    const current = section.slug === active ? ' aria-current="page"' : "";
    return `<a href="./${section.slug}.html"${current}>${section.title}</a>`;
  }).join("\n    ");
}

/**
 * The component landing page is generated from the public manifest instead
 * of a hand-maintained visual checklist. That gives every listed component a
 * home, a semantic base, a state contract and an explicit behaviour owner.
 */
function renderComponentCatalog() {
  return componentManifest.map(({ family, slug, items }) => {
    const rows = items.map(({ name, classes, base, state, behaviour }) => `
      <tr>
        <th scope="row">${escapeHtml(name)}<br><code>${classes.map((name) => `.${escapeHtml(name)}`).join(" ")}</code></th>
        <td>${escapeHtml(base)}</td>
        <td>${escapeHtml(state)}</td>
        <td>${escapeHtml(behaviour)}</td>
      </tr>`).join("");
    return `<section class="doc-component-catalog" aria-labelledby="catalog-${slug}">
  <div class="wx-spread"><h3 id="catalog-${slug}">${escapeHtml(family)}</h3><a href="./${slug}.html">类别详解 →</a></div>
  <div class="doc-figure"><table class="wx-table doc-api"><thead><tr><th>构件 / class</th><th>语义基座</th><th>状态契约</th><th>行为归属</th></tr></thead><tbody>${rows}
  </tbody></table></div>
</section>`;
  }).join("\n");
}

function verifyComponentManifest() {
  const styleSources = [
    ...readdirSync(join(root, "kit", "base")).filter((file) => file.endsWith(".css")).map((file) => join(root, "kit", "base", file)),
    ...readdirSync(join(root, "kit", "components")).filter((file) => file.endsWith(".css")).map((file) => join(root, "kit", "components", file)),
  ];
  const css = styleSources.map((file) => readFileSync(file, "utf8")).join("\n");
  const classes = componentManifest.flatMap(({ items }) => items.flatMap(({ classes }) => classes));
  const missing = classes.filter((name) => !css.includes(`.${name}`));
  if (missing.length) throw new Error(`component manifest lists classes without source styles: ${[...new Set(missing)].join(", ")}`);
  for (const { family, slug, items } of componentManifest) {
    if (!family || !slug || !items?.length) throw new Error("component manifest contains an incomplete family");
    if (!known.has(slug)) throw new Error(`component manifest links to unreachable category: ${slug}`);
  }
}

/** Build the in-page anchor list from the h2s the page actually has. */
function renderToc(body) {
  const heads = [...body.matchAll(/<h2\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/gi)];
  if (heads.length < 2) return "";
  const items = heads.map(([, id, text]) =>
    `      <li><a class="wx-anchor__link" href="#${id}">${text.replace(/<[^>]+>/g, "").trim()}</a></li>`).join("\n");
  return `<nav class="wx-anchor wx-affix doc-toc" aria-label="本页目录">\n` +
         `  <p class="doc-toc__title">本页</p>\n  <ul class="wx-anchor__list">\n${items}\n  </ul>\n</nav>`;
}

const shell = readFileSync(join(siteDir, "_shell.html"), "utf8");
const pages = readdirSync(join(siteDir, "_pages")).filter((f) => f.endsWith(".html"));
// The product landing page is deliberately outside the reference sidebar, but
// it is still a generated public route.
const known = new Set(["index", ...nav.flatMap((s) => sectionItems(s).map((i) => i.slug))]);
/* Only the product landing page drops the document shell. A section hub keeps
   its sidebar — it is a place inside the site, not a cover. */
const landingPages = new Set(["index"]);
const hubPages = new Set(nav.filter((s) => s.hub).map((s) => s.slug));

for (const section of nav) {
  if (!sectionItems(section).some((i) => i.slug === section.slug)) {
    throw new Error(`_nav.json: section "${section.title}" enters ${section.slug}, which is not in its own sidebar`);
  }
}
for (const slug of known) {
  if (!pages.includes(`${slug}.html`)) throw new Error(`_nav.json lists ${slug} but site/_pages/${slug}.html is missing`);
}
for (const file of pages) {
  const slug = file.replace(/\.html$/, "");
  if (!known.has(slug)) throw new Error(`site/_pages/${file} is not listed in _nav.json — it would be unreachable`);
}
verifyComponentManifest();

let count = 0;
for (const slug of known) {
  const raw = readFileSync(join(siteDir, "_pages", `${slug}.html`), "utf8");
  const body = expandDemos(renderPageFacts(raw, pageFacts).replace("{{componentCatalog}}", renderComponentCatalog()), slug);
  const navHtml = renderNav(slug);
  const title = (raw.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || slug).replace(/<[^>]+>/g, "").trim();
  const html = shell
    .replace("{{title}}", slug === "index" ? title : `${title} · 文心 万形`)
    .replace("{{nav}}", navHtml)
    .replace("{{navToggle}}", renderNavToggle(navHtml))
    .replace("{{topnav}}", renderTopNav(slug))
    .replace("{{toc}}", renderToc(body))
    .replace("{{shellClass}}", landingPages.has(slug) ? "doc-shell--landing" : hubPages.has(slug) ? "doc-shell--hub" : "")
    .replace("{{body}}", body)
    .replace(/\{\{slug\}\}/g, slug);
  writeFileSync(join(siteDir, `${slug}.html`), html);
  count += 1;
}
console.log(`✓ site: ${count} page(s) built across ${nav.length} section(s)`);
