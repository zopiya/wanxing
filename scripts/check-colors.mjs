#!/usr/bin/env node
/** Verify the color claims that must be measured rather than eyeballed. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(readFileSync(join(root, "kit/tokens/generated/tokens.json"), "utf8"));
const syntaxCss = readFileSync(join(root, "kit/markdown/syntax.css"), "utf8");
const themeCss = ["kit/tokens/core.css", "kit/tokens/dark.css", "kit/base/typography.css", "kit/base/a11y.css"]
  .map((file) => readFileSync(join(root, file), "utf8")).join("\n");
const colors = tokens.color;
const value = (name, mode) => {
  const token = colors[name];
  return typeof token === "string" ? token : token[mode];
};
const rgb = (hex) => [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16));
const luminance = (hex) => rgb(hex)
  .map((v) => {
    const channel = v / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  })
  .reduce((sum, channel, i) => sum + channel * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (a, b) => {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
};
const lab = (hex) => {
  const [r, g, b] = rgb(hex).map((channel) => {
    const value = channel / 255;
    return value > 0.04045 ? ((value + 0.055) / 1.055) ** 2.4 : value / 12.92;
  });
  const xyz = [
    (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047,
    0.2126 * r + 0.7152 * g + 0.0722 * b,
    (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883,
  ].map((channel) => channel > 0.008856 ? Math.cbrt(channel) : 7.787 * channel + 16 / 116);
  return [116 * xyz[1] - 16, 500 * (xyz[0] - xyz[1]), 200 * (xyz[1] - xyz[2])];
};
const deltaE = (a, b) => Math.hypot(...lab(a).map((channel, index) => channel - lab(b)[index]));

/* Every surface a token may legally land on, not just the page ground.
   Measuring only against bg-warm is how a palette ships text that fails on
   the very blocks it was designed for: the code header row sat on bg-subtle
   at 4.41:1 and no check looked, because no check knew that surface existed.

   text-functional is licensed for the two lightest grounds only. D-20 fixed
   the four text tiers at ΔL* ≥ 11, and the value that would clear 4.5:1 on
   bg-subtle sits ΔL* 9.8 from secondary — the tier spacing and the darker
   surfaces genuinely cannot both be satisfied, so the surface is the thing
   that gets restricted. */
const surfaces = ["bg-warm", "bg-base", "bg-subtle", "accent-subtle", "danger-subtle", "warning-subtle", "success-subtle"];
const lightSurfaces = ["bg-warm", "bg-base"];

const checks = [];
for (const mode of ["light", "dark"]) {
  const ground = value("bg-warm", mode);
  for (const name of [
    "text-heading", "text-primary", "text-secondary", "text-functional", "accent", "danger", "warning", "success", "focus",
  ]) {
    checks.push({ mode, name, foreground: value(name, mode), ground, minimum: name === "focus" ? 3 : 4.5 });
  }
  for (const surface of surfaces) {
    const licensed = ["text-heading", "text-primary", "text-secondary"]
      .concat(lightSurfaces.includes(surface) ? ["text-functional"] : []);
    for (const name of licensed) {
      checks.push({ mode, name: `${name} on ${surface}`, foreground: value(name, mode), ground: value(surface, mode), minimum: 4.5 });
    }
  }
  for (const name of ["accent", "accent-hover", "danger"]) {
    checks.push({
      mode,
      name: `on-${name}`,
      foreground: value("on-accent", mode),
      ground: value(name, mode),
      minimum: 4.5,
    });
  }
  for (const name of ["danger", "warning", "success"]) {
    checks.push({
      mode,
      name: `${name}-on-subtle`,
      foreground: value(name, mode),
      ground: value(`${name}-subtle`, mode),
      minimum: 4.5,
    });
  }
}

/* The syntax palette lives with its component, so it is not in tokens.json.
   It is still text on a surface and is measured like any other. */
const codeBlocks = [...syntaxCss.matchAll(/\{([^{}]*--code-[^{}]*)\}/g)].map((m) => m[1]);
const codePalette = (block) => Object.fromEntries([...block.matchAll(/(--code-[a-z]+):\s*(#[0-9A-Fa-f]{6})/g)].map((m) => [m[1], m[2]]));
const codeGroundToken = syntaxCss.match(/--code-bg:\s*var\(--color-([a-z-]+)\)/)?.[1];
if (!codeGroundToken) throw new Error("syntax.css: --code-bg must resolve to a --color-* token");
for (const [index, mode] of ["light", "dark"].entries()) {
  const ground = value(codeGroundToken, mode);
  for (const [name, hex] of Object.entries(codePalette(codeBlocks[index] ?? ""))) {
    checks.push({ mode, name: `${name} on ${codeGroundToken}`, foreground: hex, ground, minimum: 4.5 });
  }
}

const semanticNames = ["accent", "danger", "warning", "success"];
const differences = [];
for (const mode of ["light", "dark"]) {
  for (let a = 0; a < semanticNames.length; a += 1) {
    for (let b = a + 1; b < semanticNames.length; b += 1) {
      differences.push({
        mode,
        pair: `${semanticNames[a]}/${semanticNames[b]}`,
        delta: deltaE(value(semanticNames[a], mode), value(semanticNames[b], mode)),
      });
    }
  }
}

/* A theme switch that does not reach color-scheme is invisible until you put a
   zero-class form control on the page. The UA paints <input>, <select>, the
   scrollbar and the caret from :root's color-scheme, not from what the page
   painted, so a light page on a dark OS gets a dark field under dark ink —
   1.02:1, plus a 2px UA border. Both directions must be declared. */
const themeProblems = [];
if (/\[data-theme=["']dark["']\]/.test(themeCss)) {
  for (const mode of ["light", "dark"]) {
    const declared = new RegExp(`\\[data-theme=["']${mode}["']\\][^{]*\\{[^}]*color-scheme\\s*:\\s*${mode}\\b`).test(themeCss);
    if (!declared) themeProblems.push(`[data-theme="${mode}"] does not set color-scheme: ${mode}`);
  }
}

const failed = checks.filter((check) => contrast(check.foreground, check.ground) < check.minimum);
const failedDifferences = differences.filter((check) => check.delta < 28);
if (failed.length || failedDifferences.length || themeProblems.length) {
  console.error("✗ color contrast checks failed:\n");
  for (const check of failed) {
    console.error(`    ${check.mode} ${check.name}: ${contrast(check.foreground, check.ground).toFixed(2)}:1 < ${check.minimum}:1`);
  }
  for (const check of failedDifferences) {
    console.error(`    ${check.mode} ${check.pair}: ΔE ${check.delta.toFixed(2)} < 28`);
  }
  for (const problem of themeProblems) console.error(`    ${problem}`);
  process.exit(1);
}

console.log(`✓ ${checks.length} contrast pairs meet their floor — text tiers on every licensed surface, the syntax palette on the code ground, semantics, accent and focus`);
console.log(`✓ ${differences.length} semantic-color pairs keep ΔE ≥ 28`);
console.log("✓ the theme switch reaches color-scheme in both directions");
console.log(`  light functional ${contrast(value("text-functional", "light"), value("bg-warm", "light")).toFixed(2)}:1 · dark functional ${contrast(value("text-functional", "dark"), value("bg-warm", "dark")).toFixed(2)}:1`);
