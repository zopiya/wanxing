#!/usr/bin/env node
/**
 * Negative controls for the generated-site shell contract. A sidebar trigger
 * without a meaningful menu is an interaction that cannot fulfil its label;
 * these fixtures make that regression fail before it reaches a phone.
 */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const check = join(root, "scripts/check-site.mjs");
const fixture = join(root, "tests/site");

const valid = run("valid");
const landingToggle = run("landing-toggle");
const emptySidebar = run("empty-sidebar");
const sidebarFallbackLink = run("sidebar-fallback-link");
const editorialPrimary = run("editorial-primary");
const editorialHomePrimary = run("editorial-home-primary");
const editorialExternalPrimary = run("editorial-landing-external-primary");
const missingScript = run("missing-script");

if (valid.status !== 0) fail("the compliant shell fixture failed", valid);
if (landingToggle.status === 0 || !landingToggle.output.includes("landing page must not render a document navigation toggle")) {
  fail("the landing-page empty-toggle fixture was not rejected", landingToggle);
}
if (emptySidebar.status === 0 || !emptySidebar.output.includes("document navigation toggle has no menu content")) {
  fail("the document-page empty-sidebar fixture was not rejected", emptySidebar);
}
if (sidebarFallbackLink.status === 0 || !sidebarFallbackLink.output.includes("document navigation toggle has no menu content")) {
  fail("the document-page fallback-link sidebar fixture was not rejected", sidebarFallbackLink);
}
if (editorialPrimary.status === 0 || !editorialPrimary.output.includes("D-type landing navigation must not use wx-btn--primary")) {
  fail("the editorial landing primary-navigation fixture was not rejected", editorialPrimary);
}
if (editorialHomePrimary.status === 0 || !editorialHomePrimary.output.includes("D-type landing navigation must not use wx-btn--primary")) {
  fail("the public-home landing primary-navigation fixture was not rejected", editorialHomePrimary);
}
if (editorialExternalPrimary.status !== 0) {
  fail("a primary link outside the editorial landing region was incorrectly rejected", editorialExternalPrimary);
}
if (missingScript.status === 0 || !missingScript.output.includes("missing asset assets/not-present.mjs")) {
  fail("the missing local script asset fixture was not rejected", missingScript);
}

console.log("✓ site self-test: compliant shell passes; empty navigation, editorial CTA, and missing local-script defects fail");

function run(kind) {
  const siteDir = join(fixture, kind);
  const child = spawnSync(process.execPath, [check], {
    encoding: "utf8",
    env: { ...process.env, WENXIN_SITE_DIR: siteDir },
  });
  return { status: child.status, output: `${child.stdout}${child.stderr}` };
}

function fail(message, result) {
  console.error(`✗ site self-test: ${message}\n${result.output}`);
  process.exit(1);
}
