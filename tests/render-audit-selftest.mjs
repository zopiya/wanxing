#!/usr/bin/env node
/** A passing fixture and a deliberate missing-main defect prove the auditor's
    own exit status and gate codes. Keep fixtures outside examples/: those are
    user-facing documentation, not test data. */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const audit = join(root, "scripts/render-audit.mjs");
const fixture = join(root, "tests/render-audit");

const valid = run("valid", "dist/compliant/index.html");
const invalid = run("invalid", "dist/violating/index.html");
if (valid.status !== 0) fail("the compliant fixture failed", valid);
if (invalid.status === 0 || !invalid.output.includes('"code": "structure.main_missing"')) {
  fail("the deliberate missing-main fixture did not fail with structure.main_missing", invalid);
}
console.log("✓ render-audit self-test: compliant fixture passes; missing <main> fixture fails");

function run(kind, input) {
  const cwd = join(fixture, kind);
  const child = spawnSync(process.execPath, [audit, input], { cwd, encoding: "utf8" });
  return { status: child.status, output: `${child.stdout}${child.stderr}` };
}

function fail(message, result) {
  console.error(`✗ render-audit self-test: ${message}\n${result.output}`);
  process.exit(1);
}
