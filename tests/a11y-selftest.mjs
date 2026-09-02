#!/usr/bin/env node
/** Negative controls for check:a11y: each contract below must fail. */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const check = join(root, "scripts/check-a11y.mjs");
const bad = join(root, "tests/a11y/missing-label.html");
const child = spawnSync(process.execPath, [check, bad], { encoding: "utf8" });
const output = `${child.stdout}${child.stderr}`;
const expected = [
  "no associated <label> or ARIA name",
  "references missing id",
  "missing alt",
  "duplicate id",
  "missing an explicit type",
  "missing aria-checked",
  "uses aria-selected; calendar buttons must use aria-pressed",
  "calendar button is missing aria-pressed",
  "remains keyboard-activatable",
  "wx-btn uses aria-disabled without native disabled",
  "table scroll wrapper is not keyboard-focusable",
  "table scroll wrapper is not a named region",
];
const missed = expected.filter((message) => !output.includes(message));
if (child.status === 0 || missed.length) {
  console.error(`✗ a11y self-test: violation fixture missed ${missed.join(", ") || "every defect"}\n${output}`);
  process.exit(1);
}
console.log(`✓ a11y self-test: ${expected.length} deliberate violations are rejected`);
