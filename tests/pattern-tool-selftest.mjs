#!/usr/bin/env node
/**
 * The E-pattern demo must search the published component contract, not a
 * hand-written lookalike dataset. These assertions use kit/wenxin.json
 * directly so a contract-shape change cannot silently make its UI misleading.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { flattenContracts, filterContracts } from "../site/assets/pattern-tool.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const bundle = JSON.parse(readFileSync(join(root, "kit/wenxin.json"), "utf8"));
const contracts = flattenContracts(bundle);
const expectedCount = bundle.components.reduce((count, family) => count + family.items.length, 0);

if (contracts.length !== expectedCount) fail(`flattened ${contracts.length} contracts; expected ${expectedCount}`);
assertMatch("wx-search", "Search", "c-entry");
assertMatch("aria", "Field", "c-entry");
assertMatch("导航", "Navigation", "c-navigation");
assertMatch("date", "Date Picker", "c-entry");
assertMatch("button", "Button", "c-general");
if (filterContracts(contracts, "").length !== 0) fail("an empty query must not pretend to be a result set");

console.log(`✓ pattern-tool self-test: ${contracts.length} published contracts are searchable by real contract text`);

function assertMatch(query, name, slug) {
  const match = filterContracts(contracts, query).find((item) => item.name === name && item.slug === slug);
  if (!match) fail(`query ${JSON.stringify(query)} did not find ${name} in ${slug}`);
}

function fail(message) {
  console.error(`✗ pattern-tool self-test: ${message}`);
  process.exit(1);
}
