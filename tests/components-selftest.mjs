#!/usr/bin/env node
/** Negative control: a manifest class without a source style must be rejected. */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const check = join(root, "scripts/check-components.mjs");
const bad = join(root, "tests/components/missing-style.json");
const child = spawnSync(process.execPath, [check, bad], { encoding: "utf8" });
const output = `${child.stdout}${child.stderr}`;
if (child.status === 0 || !output.includes("lists class without source style")) {
  console.error(`✗ component manifest self-test: missing-style fixture unexpectedly passed\n${output}`);
  process.exit(1);
}
console.log("✓ component manifest self-test: class without source style is rejected");
