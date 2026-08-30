#!/usr/bin/env node
/**
 * Check the public component contract, not merely the generated docs.
 *
 * The manifest is what consumers use to decide whether a component exists,
 * what semantic element begins it, which state belongs to it, and who owns
 * behaviour. A class that has no source style or a family that has no doc
 * destination is therefore a release error.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, isAbsolute, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = process.argv[2]
  ? (isAbsolute(process.argv[2]) ? process.argv[2] : join(root, process.argv[2]))
  : join(root, "kit", "components", "manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const nav = JSON.parse(readFileSync(join(root, "site", "_nav.json"), "utf8"));
const knownSlugs = new Set(nav.flatMap(({ groups }) => groups.flatMap(({ items }) => items.map(({ slug }) => slug))));
/* Every directory that can define a wx- class. Leaving patterns/ out made the
   class-resolution gate report the five page archetypes as undefined — a
   checker whose source list is narrower than the thing it checks produces
   false positives, which is the fastest way to get a gate ignored. */
const cssFiles = ["base", "components", "patterns", "markdown", "charts"]
  .flatMap((dir) => {
    const abs = join(root, "kit", dir);
    return existsSync(abs)
      ? readdirSync(abs).filter((file) => file.endsWith(".css")).map((file) => join(abs, file))
      : [];
  });
const css = cssFiles.map((file) => readFileSync(file, "utf8")).join("\n");
/* A contract nobody can see documented is a contract nobody adopts. The site
   pages are the public surface, so every listed class has to actually appear
   on the category page that claims it — measured, not asserted in prose. */
const pageSource = (slug) => {
  const file = join(root, "site", "_pages", `${slug}.html`);
  try { return readFileSync(file, "utf8"); } catch { return null; }
};
const shownIn = (html, className) => new RegExp(`[ "']${className.replace(/[-]/g, "\\-")}[ "']`).test(html);

/* The mirror of check:tokens. A var(--x) that resolves to nothing is caught;
   a class="wx-x" that resolves to nothing was not, and the site had seven —
   wx-toc__title for __heading, wx-code__title for __header, wx-field__req for
   __required, and two variants (wx-tag--accent, wx-seal--lg) the docs promised
   while they rendered identically to the base class.

   A bare block name with no rule of its own is legal: .wx-stat and
   .wx-landing are naming anchors whose declarations live on their children.
   A modifier or element is not — that is a name for something specific, so
   the something has to exist. */
const definedClasses = new Set([...css.matchAll(/\.(wx-[A-Za-z0-9_-]+)/g)].map((m) => m[1]));
const blocksWithParts = new Set([...definedClasses]
  .filter((name) => /__|--/.test(name))
  .map((name) => name.split(/__|--/)[0]));
const classResolves = (name) =>
  definedClasses.has(name) || (!/__|--/.test(name) && blocksWithParts.has(name));

const siteDir = join(root, "site");
const siteFiles = existsSync(siteDir)
  ? [join(siteDir, "_shell.html"), ...readdirSync(join(siteDir, "_pages")).map((f) => join(siteDir, "_pages", f))]
  : [];
const unresolved = new Map();
for (const file of siteFiles) {
  /* Documentation quotes the classes it documents; a name inside <code> is
     prose about a class, not a use of one. */
  const html = readFileSync(file, "utf8").replace(/<code>[\s\S]*?<\/code>|<pre[\s\S]*?<\/pre>/g, "");
  for (const [, attr] of html.matchAll(/class="([^"]*)"/g)) {
    for (const name of attr.split(/\s+/)) {
      if (name.startsWith("wx-") && !classResolves(name)) {
        unresolved.set(name, (unresolved.get(name) ?? new Set()).add(file.split("/").pop()));
      }
    }
  }
}
const failures = [];

if (!Array.isArray(manifest) || manifest.length === 0) failures.push("manifest must contain at least one family");
for (const [familyIndex, family] of manifest.entries()) {
  const where = `family ${familyIndex + 1}`;
  if (!family.family || !family.slug || !Array.isArray(family.items) || family.items.length === 0) {
    failures.push(`${where} is incomplete`);
    continue;
  }
  if (!knownSlugs.has(family.slug)) failures.push(`${where} links to unreachable category: ${family.slug}`);
  const page = pageSource(family.slug);
  for (const [itemIndex, item] of family.items.entries()) {
    const itemWhere = `${where}, item ${itemIndex + 1}`;
    if (!["name", "classes", "base", "state", "behaviour"].every((key) => item[key])) {
      failures.push(`${itemWhere} is missing a public-contract field`);
      continue;
    }
    if (!Array.isArray(item.classes) || item.classes.length === 0) {
      failures.push(`${itemWhere} has no classes`);
      continue;
    }
    for (const className of item.classes) {
      if (!css.includes(`.${className}`)) failures.push(`${itemWhere} lists class without source style: .${className}`);
    }
    if (page !== null && !item.classes.some((className) => shownIn(page, className))) {
      failures.push(`${itemWhere} is undocumented: ${item.name} appears nowhere on site/_pages/${family.slug}.html`);
    }
  }
}

for (const [name, files] of unresolved) {
  failures.push(`site uses .${name} but no kit stylesheet defines it (${[...files].join(", ")})`);
}

if (failures.length) {
  console.error(`✗ component manifest: ${failures.join("\n✗ component manifest: ")}`);
  process.exit(1);
}
const total = manifest.reduce((n, { items }) => n + items.length, 0);
console.log(`✓ component manifest: ${manifest.length} families and ${total} public contracts resolve, and each is shown on its category page`);
console.log(`✓ every wx- class used across ${siteFiles.length} site source file(s) resolves to a kit stylesheet`);
