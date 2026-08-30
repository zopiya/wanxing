#!/usr/bin/env node
/**
 * check-contracts — kit/wenxin.json is a build product that ships to
 * consumers. A stale bundle is worse than no bundle: it looks authoritative
 * while telling an adopting agent something the repository no longer believes.
 *
 * This rebuilds it in a scratch location and compares byte for byte.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const bundle = join(root, "kit", "wenxin.json");

let committed;
try {
  committed = readFileSync(bundle, "utf8");
} catch {
  console.error("✗ contracts: kit/wenxin.json is missing — run `npm run build:contracts`");
  process.exit(1);
}

const backup = `${bundle}.check-backup`;
writeFileSync(backup, committed);
try {
  execFileSync(process.execPath, [join(root, "scripts", "build-contracts.mjs")], { stdio: "pipe" });
  const rebuilt = readFileSync(bundle, "utf8");
  if (rebuilt !== committed) {
    writeFileSync(bundle, committed);
    console.error("✗ contracts: kit/wenxin.json is stale — a source changed without rebuilding.\n" +
                  "    Run `npm run build:contracts` and commit the result.");
    process.exit(1);
  }
} finally {
  rmSync(backup, { force: true });
}

const parsed = JSON.parse(committed);
const required = ["invariant", "arbitration", "exclusions", "forbidden", "tokens", "components", "decisions", "verify"];
const missing = required.filter((key) => !parsed[key]);
if (missing.length) {
  console.error(`✗ contracts: bundle is missing ${missing.join(", ")}`);
  process.exit(1);
}
console.log(`✓ contracts: kit/wenxin.json matches its sources (${parsed.components.reduce((n, f) => n + f.items.length, 0)} contracts, ${parsed.decisions.length} decisions)`);
