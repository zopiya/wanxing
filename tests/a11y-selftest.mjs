#!/usr/bin/env node
/** Negative control for check:a11y: a real unlabeled control must fail. */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const check = join(root, "scripts/check-a11y.mjs");
const bad = join(root, "tests/a11y/missing-label.html");
const child = spawnSync(process.execPath, [check, bad], { encoding: "utf8" });
const output = `${child.stdout}${child.stderr}`;
if (child.status === 0 || !output.includes("no associated <label> or ARIA name")) {
  console.error(`✗ a11y self-test: missing-label fixture unexpectedly passed\n${output}`);
  process.exit(1);
}
console.log("✓ a11y self-test: unlabeled form control is rejected");
