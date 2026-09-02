#!/usr/bin/env node
/** GitHub renders alerts as .markdown-alert, not as an invented
 * .admonition. This contract keeps the promised renderer outputs styled at
 * the container, title, and semantic-variant layers. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(join(root, "kit/markdown/admonitions.css"), "utf8");
const demo = readFileSync(join(root, "site/_pages/markdown.html"), "utf8");
const requiredCss = [
  ".markdown-alert,",
  ".markdown-alert) > :first-child",
  ".markdown-alert) > :last-child",
  ".markdown-alert-title",
  ".markdown-alert-note",
  ".markdown-alert-tip",
  ".markdown-alert-warning",
  ".markdown-alert-caution",
];
const missing = requiredCss.filter((piece) => !css.includes(piece));
const failures = [...missing];
if (!demo.includes('class="markdown-alert markdown-alert-note"')) failures.push("GitHub alert demo");

if (failures.length) {
  console.error(`✗ markdown admonitions self-test: missing ${failures.join(", ")}`);
  process.exit(1);
}

console.log("✓ markdown admonitions self-test: GitHub alert output has container, title, and semantic styling");
