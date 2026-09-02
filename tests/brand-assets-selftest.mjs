#!/usr/bin/env node
/** A currentColor SVG does not inherit the surrounding page colour through an
 * external <img>. Keep that source-only variant out of visual docs, and keep
 * actual seal specimens at their specified 64px display size. */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(new URL("..", import.meta.url).pathname);
const page = (name) => readFileSync(resolve(root, `site/_pages/${name}.html`), "utf8");
const allPages = ["logo", "brand-usage", "html-elements"].map(page).join("\n");
const siteCss = readFileSync(resolve(root, "site/assets/site.css"), "utf8");

assert.doesNotMatch(allPages, /<img\b[^>]*\bsrc="[^\"]*logo-mono\.svg"/i, "currentColor mono source must not be embedded through <img>");
for (const name of ["logo", "brand-usage"]) {
  const source = page(name);
  assert.match(source, /class="doc-brand-logo"[^>]*\bsrc="\.\.\/kit\/assets\/brand\/logo-wanxing\.svg"/, `${name} must show the real Wanxing seal at its measured slot`);
  assert.match(source, /class="doc-brand-logo"[^>]*\bsrc="\.\.\/kit\/assets\/brand\/logo-wenxin\.svg"/, `${name} must show the real Wenxin seal at its measured slot`);
}
assert.match(siteCss, /\.doc-brand-logo\s*\{[\s\S]*?inline-size:\s*var\(--space-16\);/, "brand asset specimen must use the 64px token-backed display slot");

console.log("✓ brand assets: visual docs use only externally reliable seals at their 64px display size");
