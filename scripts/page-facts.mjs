/**
 * Facts repeated across rendered documentation pages. Their sources are the
 * public component manifest and the real check pipeline, not prose that can
 * drift when a component or validation command is added.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

export function readPageFacts(root) {
  const componentManifest = JSON.parse(readFileSync(join(root, "kit", "components", "manifest.json"), "utf8"));
  const packageManifest = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  const forbidden = JSON.parse(readFileSync(join(root, "kit", "contracts", "forbidden.json"), "utf8"));
  const componentContractCount = componentManifest.reduce((total, { items }) => total + items.length, 0);
  const componentCounts = new Map(componentManifest.map(({ slug, items }) => [slug, items.length]));
  const judgementRuleCount = forbidden.judgement?.length ?? 0;
  const qualityGateCount = (packageManifest.scripts?.check || "").split("&&")
    .map((command) => command.trim())
    .filter((command) => command.startsWith("npm run check:")).length;

  if (!qualityGateCount) throw new Error("package.json scripts.check does not list any quality gates");
  return { componentContractCount, componentCounts, judgementRuleCount, qualityGateCount };
}

export function renderPageFacts(html, { componentContractCount, componentCounts, judgementRuleCount, qualityGateCount }) {
  return html
    .replace(/\{\{qualityGateCount\}\}/g, String(qualityGateCount))
    .replace(/\{\{componentContractCount\}\}/g, String(componentContractCount))
    .replace(/\{\{judgementRuleCount\}\}/g, String(judgementRuleCount))
    .replace(/\{\{componentCount:([a-z0-9-]+)\}\}/g, (_, slug) => {
      const count = componentCounts.get(slug);
      if (count == null) throw new Error(`unknown component family in page fact: ${slug}`);
      return String(count);
    });
}
