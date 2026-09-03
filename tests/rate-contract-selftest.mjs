#!/usr/bin/env node
/**
 * Keep the rating's visible 16px data mark separate from its pointer target.
 * This test deliberately reads source: a browser cannot reliably expose the
 * pseudo-element's geometry through the static contract checks.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(new URL("..", import.meta.url).pathname);
const css = readFileSync(resolve(root, "kit/components/range.css"), "utf8");
const page = readFileSync(resolve(root, "site/_pages/c-entry.html"), "utf8");

const block = (selector) => {
  const match = css.match(new RegExp(`${selector}\\s*\\{([\\s\\S]*?)\\n  \\}`, "m"));
  return match?.[1] ?? "";
};

const rate = block("\\.wx-rate");
const label = block("\\.wx-rate label");
const mark = block("\\.wx-rate label::before");

assert.match(rate, /--wx-rate-hit-size:\s*var\(--touch-target-min,\s*24px\);/, "rate must define a token-backed 24px-or-larger hit target");
assert.match(label, /inline-size:\s*var\(--wx-rate-hit-size\);/, "rate label must own the hit target width");
assert.match(label, /block-size:\s*var\(--wx-rate-hit-size\);/, "rate label must own the hit target height");
assert.doesNotMatch(label, /\bborder\s*:/, "the whole hit target must not become the visible data mark");
assert.match(mark, /inline-size:\s*var\(--space-4\);/, "rate mark must stay at the 16px visual scale");
assert.match(mark, /block-size:\s*var\(--space-4\);/, "rate mark must stay at the 16px visual scale");

for (const value of [1, 2, 3, 4, 5]) {
  assert.match(page, new RegExp(`<label for="r${value}"><span class="wx-sr-only">${value} 分</span></label>`), `rate ${value} needs text in its native label`);
}

console.log("✓ rate contract: 16px data marks sit inside token-backed pointer targets and every radio has text");
