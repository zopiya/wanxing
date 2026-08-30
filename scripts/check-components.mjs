#!/usr/bin/env node
/**
 * Check the public component contract, not merely the generated docs.
 *
 * The manifest is what consumers use to decide whether a component exists,
 * what semantic element begins it, which state belongs to it, and who owns
 * behaviour. A class that has no source style or a family that has no doc
 * destination is therefore a release error.
 */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, isAbsolute, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = process.argv[2]
  ? (isAbsolute(process.argv[2]) ? process.argv[2] : join(root, process.argv[2]))
  : join(root, "kit", "components", "manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const nav = JSON.parse(readFileSync(join(root, "site", "_nav.json"), "utf8"));
const knownSlugs = new Set(nav.flatMap(({ items }) => items.map(({ slug }) => slug)));
const cssFiles = [
  ...readdirSync(join(root, "kit", "base")).filter((file) => file.endsWith(".css")).map((file) => join(root, "kit", "base", file)),
  ...readdirSync(join(root, "kit", "components")).filter((file) => file.endsWith(".css")).map((file) => join(root, "kit", "components", file)),
];
const css = cssFiles.map((file) => readFileSync(file, "utf8")).join("\n");
const failures = [];

if (!Array.isArray(manifest) || manifest.length === 0) failures.push("manifest must contain at least one family");
for (const [familyIndex, family] of manifest.entries()) {
  const where = `family ${familyIndex + 1}`;
  if (!family.family || !family.slug || !Array.isArray(family.items) || family.items.length === 0) {
    failures.push(`${where} is incomplete`);
    continue;
  }
  if (!knownSlugs.has(family.slug)) failures.push(`${where} links to unreachable category: ${family.slug}`);
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
  }
}

if (failures.length) {
  console.error(`✗ component manifest: ${failures.join("\n✗ component manifest: ")}`);
  process.exit(1);
}
console.log(`✓ component manifest: ${manifest.length} families and ${manifest.reduce((n, { items }) => n + items.length, 0)} public contracts resolve`);
