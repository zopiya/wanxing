#!/usr/bin/env node
/**
 * check-cli — the installable package surface.
 *
 * Two ways this breaks silently. A path listed in package.json "files" that
 * does not exist ships a tarball missing something the CLI reads, and the
 * failure only appears on someone else's machine. And a verb that throws is
 * indistinguishable from a working one until a consumer runs it.
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const problems = [];

if (pkg.private) problems.push('package.json still has "private": true — nothing can be published');
if (!pkg.license || pkg.license === "UNLICENSED") problems.push("package.json has no usable license");
if (!existsSync(join(root, "LICENSE"))) problems.push("LICENSE file is missing");

for (const entry of pkg.files ?? []) {
  if (!existsSync(join(root, entry.replace(/\/$/, "")))) problems.push(`package.json files lists a missing path: ${entry}`);
}
for (const [name, target] of Object.entries(pkg.exports ?? {})) {
  if (target.includes("*")) continue;
  if (!existsSync(join(root, target))) problems.push(`package.json exports "${name}" points at a missing file: ${target}`);
}
for (const target of Object.values(pkg.bin ?? {})) {
  if (!existsSync(join(root, target))) problems.push(`package.json bin points at a missing file: ${target}`);
}

/* Every verb runs. A CLI nobody exercised is a CLI that throws on first use. */
const cli = join(root, "bin", "wenxin.mjs");
const validAuditCwd = join(root, "tests", "render-audit", "valid");
const invalidAuditCwd = join(root, "tests", "render-audit", "invalid");

const cases = [
  { args: ["--version"], expect: /^\d+\.\d+\.\d+/ },
  { args: ["--help"], expect: /wenxin audit/ },
  { args: ["contracts", "toast"], expect: /wx-toast/ },
  { args: ["tokens", "--format", "dtcg"], expect: /"\$value"|\$type/ },
  { args: ["skeleton"], expect: /A–E/ },
  { args: ["skeleton", "e"], expect: /wx-tool/ },
  { args: ["audit", "dist/compliant/index.html"], cwd: validAuditCwd, expect: /"hardGates": \[\]/ },
  { args: ["audit", "dist/violating/index.html"], cwd: invalidAuditCwd, expectFail: true, expect: /"code": "structure.main_missing"/ },
  { args: ["contracts", "definitely-not-a-component"], expectFail: true },
  { args: ["tokens", "--format", "wat"], expectFail: true },
  { args: ["audit"], expectFail: true },
];

for (const { args, cwd, expect, expectFail, allowExit } of cases) {
  const run = spawnSync(process.execPath, [cli, ...args], { cwd, encoding: "utf8" });
  const output = `${run.stdout}${run.stderr}`;
  const label = `wenxin ${args.join(" ")}`;
  if (expectFail) {
    if (run.status === 0) problems.push(`${label} should have failed but exited 0`);
    else if (expect && !expect.test(output)) problems.push(`${label} failed without its expected evidence`);
    continue;
  }
  const ok = (allowExit ?? [0]).includes(run.status);
  if (!ok) problems.push(`${label} exited ${run.status}: ${(run.stderr || "").trim().slice(0, 120)}`);
  else if (expect && !expect.test(output)) problems.push(`${label} produced unexpected output`);
}

if (problems.length) {
  console.error(`✗ cli: ${problems.length} problem(s):\n    ${problems.join("\n    ")}`);
  process.exit(1);
}
console.log(`✓ cli: ${cases.length} invocation(s) behave, and every package-surface path exists`);
