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
const editorialLanding = run("editorial-landing-invalid", "dist/editorial-landing/index.html");
const editorialLandingInvalidTrack = run("editorial-landing-invalid-track", "dist/editorial-landing-invalid-track/index.html");
const externalPrimary = run("editorial-landing-external-primary", "dist/editorial-landing-external/index.html");
if (valid.status !== 0) fail("the compliant fixture failed", valid);
if (!valid.output.includes('"code": "coverage.linked_stylesheet_uninspected"')) {
  fail("the compliant fixture did not disclose that linked CSS is outside audit coverage", valid);
}
if (invalid.status === 0 || !invalid.output.includes('"code": "structure.main_missing"')) {
  fail("the deliberate missing-main fixture did not fail with structure.main_missing", invalid);
}
if (editorialLanding.status === 0 || !editorialLanding.output.includes('"code": "soul.editorial_landing_filled_cta"')) {
  fail("the editorial landing primary-navigation fixture did not fail with soul.editorial_landing_filled_cta", editorialLanding);
}
if (editorialLandingInvalidTrack.status === 0 ||
    !editorialLandingInvalidTrack.output.includes('"code": "contract.track_invalid"') ||
    !editorialLandingInvalidTrack.output.includes('"code": "soul.editorial_landing_filled_cta"')) {
  fail("an invalid track must fail and must not bypass the editorial landing CTA gate", editorialLandingInvalidTrack);
}
if (externalPrimary.status !== 0) {
  fail("a primary link outside the editorial landing region was incorrectly rejected", externalPrimary);
}
console.log("✓ render-audit self-test: linked-CSS coverage is disclosed; missing-main, invalid-track, and editorial-landing CTA defects fail");

function run(kind, input) {
  const cwd = join(fixture, kind);
  const child = spawnSync(process.execPath, [audit, input], { cwd, encoding: "utf8" });
  return { status: child.status, output: `${child.stdout}${child.stderr}` };
}

function fail(message, result) {
  console.error(`✗ render-audit self-test: ${message}\n${result.output}`);
  process.exit(1);
}
