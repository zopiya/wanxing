#!/usr/bin/env node
/**
 * check-llms — llms.txt is the door an adopting agent walks through. A stale
 * index sends it to a page that no longer says what the index claims, and
 * nothing about the file's appearance reveals that.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const files = ["llms.txt", "llms-full.txt"].map((f) => join(root, "site", f));

let before;
try {
  before = files.map((f) => readFileSync(f, "utf8"));
} catch {
  console.error("✗ llms: site/llms.txt or llms-full.txt is missing — run `npm run build:llms`");
  process.exit(1);
}

execFileSync(process.execPath, [join(root, "scripts", "build-llms.mjs")], { stdio: "pipe" });
const after = files.map((f) => readFileSync(f, "utf8"));
const stale = files.filter((_, i) => before[i] !== after[i]).map((f) => `site/${f.split("/").pop()}`);
if (stale.length) {
  files.forEach((f, i) => writeFileSync(f, before[i]));
  console.error(`✗ llms: ${stale.join(", ")} stale — run \`npm run build:llms\` and commit the result`);
  process.exit(1);
}

/* Every link in the index has to resolve, or the door opens onto a wall. */
const index = after[0];
const problems = [];
const leakedTemplates = files.flatMap((file, i) =>
  [...after[i].matchAll(/\{\{[^}]+\}\}/g)].map((match) => `${file.split("/").pop()}: ${match[0]}`)
);
if (leakedTemplates.length) {
  problems.push(...leakedTemplates.map((template) => `unexpanded template ${template}`));
}
for (const [, , target] of index.matchAll(/\[([^\]]+)\]\((\.\.?\/[^)]+)\)/g)) {
  const abs = join(root, "site", target);
  try { readFileSync(abs); } catch {
    try { execFileSync("test", ["-d", abs]); } catch { problems.push(target); }
  }
}
if (problems.length) {
  console.error(`✗ llms: ${problems.length} problem(s):\n    ${problems.join("\n    ")}`);
  process.exit(1);
}
console.log(`✓ llms: index is current and its ${[...index.matchAll(/\]\(\.\.?\//g)].length} link(s) resolve`);
