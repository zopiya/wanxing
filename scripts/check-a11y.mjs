#!/usr/bin/env node
/**
 * Check the static accessibility obligations that can be verified without a
 * browser accessibility tree. This intentionally complements check:site:
 * check:site owns heading order and links; this script owns landmarks, labels,
 * and accessible names.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(new URL("..", import.meta.url).pathname);
const target = process.argv[2] ? resolve(process.cwd(), process.argv[2]) : join(root, "site");
const files = statSync(target).isDirectory()
  ? readdirSync(target).filter((file) => file.endsWith(".html")).sort().map((file) => join(target, file))
  : [target];
const failures = [];

for (const file of files) inspect(file, readFileSync(file, "utf8"));

if (failures.length) {
  console.error(`✗ accessibility checks failed (${failures.length}):\n`);
  for (const failure of failures) console.error(`    ${failure.file}: ${failure.message}`);
  process.exit(1);
}
console.log(`✓ ${files.length} HTML file(s): main landmarks, control labels, and accessible names are present`);

function inspect(file, source) {
  // Generated code listings quote examples. They are prose, not active DOM.
  const html = source.replace(/<(?:pre|code)\b[^>]*>[\s\S]*?<\/(?:pre|code)>/gi, "");
  const short = file.startsWith(root) ? file.slice(root.length + 1) : file;
  if (!/<main\b[^>]*>|\brole=["']main["']/i.test(html)) {
    failures.push({ file: short, message: "missing <main> or role=\"main\"" });
  }

  const labels = [...html.matchAll(/<label\b([^>]*)>([\s\S]*?)<\/label>/gi)].map((match) => ({
    attrs: attrsOf(match[1]), body: match[2], start: match.index, end: match.index + match[0].length,
  }));
  const controls = [...html.matchAll(/<(input|select|textarea)\b([^>]*)/gi)].map((match) => ({
    tag: match[1].toLowerCase(), attrs: attrsOf(match[2]), at: match.index,
  }));

  for (const control of controls) {
    if (control.tag === "input" && ["hidden", "submit", "reset", "button", "image"].includes(control.attrs.type)) continue;
    const id = control.attrs.id;
    const nested = labels.some((label) => label.start <= control.at && control.at <= label.end);
    const explicit = id && labels.some((label) => label.attrs.for === id);
    const named = hasName(control.attrs);
    if (!nested && !explicit && !named) {
      failures.push({ file: short, message: `<${control.tag}> has no associated <label> or ARIA name` });
    }
  }

  const interactive = [
    ...html.matchAll(/<(a|button|summary)\b([^>]*)>([\s\S]*?)<\/\1>/gi),
    ...[...html.matchAll(/<([a-z][\w-]*)\b([^>]*\brole=["'](?:button|link|menuitem|tab)["'][^>]*)>/gi)]
      .filter((match) => !["a", "button", "summary"].includes(match[1].toLowerCase())),
  ];
  for (const match of interactive) {
    const attrs = attrsOf(match[2]);
    const content = stripTags(match[3] ?? "").trim();
    if (!content && !hasName(attrs)) {
      failures.push({ file: short, message: `<${match[1].toLowerCase()}> has no accessible name` });
    }
  }
}

function attrsOf(raw) {
  const attrs = {};
  for (const match of raw.matchAll(/([:\w-]+)(?:=(["'])(.*?)\2|=([^\s"'>]+))?/g)) {
    attrs[match[1].toLowerCase()] = match[3] ?? match[4] ?? "";
  }
  return attrs;
}

function hasName(attrs) {
  return Boolean(attrs["aria-label"]?.trim() || attrs["aria-labelledby"]?.trim() || attrs.title?.trim());
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, "").replace(/&(?:nbsp|amp|lt|gt|quot);/g, " ");
}
