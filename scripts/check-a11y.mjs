#!/usr/bin/env node
/**
 * Check the static accessibility obligations that can be verified without a
 * browser accessibility tree. This intentionally complements check:site:
 * check:site owns heading order and links; this script owns landmarks, labels,
 * accessible names, ID references, and native control contracts.
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
console.log(`✓ ${files.length} HTML file(s): landmarks, names, IDs, ARIA references, and native control contracts are sound`);

function inspect(file, source) {
  // Generated code listings quote examples. They are prose, not active DOM.
  const html = source.replace(/<(?:pre|code)\b[^>]*>[\s\S]*?<\/(?:pre|code)>/gi,
    (match) => match.replace(/[^\n]/g, " "));
  const short = file.startsWith(root) ? file.slice(root.length + 1) : file;
  const report = (message, at = 0) => failures.push({
    file: short,
    message: `line ${html.slice(0, at).split("\n").length}: ${message}`,
  });
  if (!/<main\b[^>]*>|\brole=["']main["']/i.test(html)) {
    report("missing <main> or role=\"main\"");
  }

  const tags = [...html.matchAll(/<([a-z][\w-]*)\b([^>]*)>/gi)].map((match) => ({
    tag: match[1].toLowerCase(), attrs: attrsOf(match[2]), at: match.index,
  }));
  const ids = new Map();
  for (const item of tags) {
    if (!item.attrs.id) continue;
    if (ids.has(item.attrs.id)) report(`duplicate id="${item.attrs.id}"`, item.at);
    else ids.set(item.attrs.id, item);
  }

  for (const item of tags) {
    if (item.tag === "img" && !Object.hasOwn(item.attrs, "alt")) {
      report("<img> is missing alt (use alt=\"\" when decorative)", item.at);
    }
    if (item.tag === "button" && !item.attrs.type) {
      report("<button> is missing an explicit type", item.at);
    }
    if (item.tag === "a" && item.attrs["aria-disabled"] === "true" && Object.hasOwn(item.attrs, "href")) {
      report("disabled <a> still has href and remains keyboard-activatable; use a non-link element", item.at);
    }
    if (item.attrs.role === "switch" && !Object.hasOwn(item.attrs, "aria-checked")) {
      report('role="switch" is missing aria-checked', item.at);
    }
    if (item.attrs.role === "tab") {
      if (!Object.hasOwn(item.attrs, "aria-selected")) report('role="tab" is missing aria-selected', item.at);
      if (!item.attrs["aria-controls"]) report('role="tab" is missing aria-controls', item.at);
    }
    for (const attr of ["aria-controls", "aria-describedby", "aria-labelledby", "aria-owns"]) {
      for (const id of (item.attrs[attr] ?? "").split(/\s+/).filter(Boolean)) {
        if (!ids.has(id)) report(`${attr} references missing id="${id}"`, item.at);
      }
    }
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
      report(`<${control.tag}> has no associated <label> or ARIA name`, control.at);
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
      report(`<${match[1].toLowerCase()}> has no accessible name`, match.index);
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
