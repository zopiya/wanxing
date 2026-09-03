#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { basename, relative, resolve } from "node:path";

const input = process.argv[2];
/**
 * The permitted palette is derived from the token source of truth, not frozen
 * here. A hardcoded copy silently rots the moment a token changes — which is
 * exactly what happened to the dark palette before the restructure.
 */
const tokensPath = resolve(new URL("../kit/tokens/generated/tokens.json", import.meta.url).pathname);
const allowedColors = new Set();
try {
  const tokens = JSON.parse(readFileSync(tokensPath, "utf8"));
  for (const value of Object.values(tokens.color ?? {})) {
    for (const v of typeof value === "string" ? [value] : Object.values(value)) {
      const m = String(v).match(/#[0-9a-f]{3,8}/gi);
      if (m) m.forEach((hex) => allowedColors.add(hex.toUpperCase()));
    }
  }
} catch {
  console.error("render-audit: cannot read generated tokens — run `npm run build:tokens` first.");
  process.exit(2);
}

if (!input) {
  console.error("Usage: node ./scripts/render-audit.mjs dist/<project-slug>/index.html");
  console.error("   or: node ./scripts/render-audit.mjs app/<project-slug>/index.html");
  process.exit(2);
}

const filePath = resolve(process.cwd(), input);
const inputPath = normalizePath(relative(process.cwd(), filePath));
const projectPath = parseProjectPath(inputPath);

if (!existsSync(filePath)) {
  console.error(`Render audit source not found: ${input}`);
  process.exit(2);
}

const html = readFileSync(filePath, "utf8");
const sourceHash = createHash("sha256").update(html).digest("hex").slice(0, 8);
const styles = collectStyles(html);
const cssAndInline = `${styles.css}\n${styles.inlineStyles.join("\n")}`;
const contractResult = extractContract(html);
const contract = contractResult.contract;
const htmlAttrs = extractHtmlAttrs(html);

const report = {
  audit: {
    tool: "wanxing-render-audit",
    version: 1,
    generatedAt: new Date().toISOString(),
    source: inputPath,
    sourceFile: basename(filePath),
    sourceHash
  },
  contract,
  metrics: {},
  hardGates: [],
  warnings: []
};

report.metrics.coverage = {
  inlineStyleBlocks: styles.styleBlockCount,
  inlineStyleAttributes: styles.inlineStyles.length,
  linkedStylesheetsUninspected: styles.linkedStylesheets
};
if (styles.linkedStylesheets.length) {
  warn(
    "coverage.linked_stylesheet_uninspected",
    "Linked stylesheets are not inspected; this report covers the contract, DOM, <style> blocks, and style attributes only.",
    { hrefs: styles.linkedStylesheets }
  );
}

if (contractResult.error) {
  fail("contract.invalid_json", contractResult.error);
}

if (!contract) {
  fail("contract.missing", "Missing <script type=\"application/json\" id=\"wanxing-render-contract\">.");
}

if (contract && contract.track !== undefined && !["editorial", "application"].includes(contract.track)) {
  fail("contract.track_invalid", "Render Contract track must be editorial or application; omitted tracks default to editorial.");
}

const htmlProfile = htmlAttrs["data-wanxing-profile"];
const profile = contract?.profile || htmlProfile || "unknown";
const contractVersion = htmlAttrs["data-wanxing-contract-version"];

report.metrics.identity = {
  profile,
  htmlProfile: htmlProfile || null,
  contractVersion: contractVersion || null,
  lang: htmlAttrs.lang || contract?.language || null,
  animationsComplete: htmlAttrs["data-animations-complete"] ?? null,
  projectSlug: projectPath?.slug ?? null
};

auditOutputPath();

if (contract && !htmlProfile) {
  fail("contract.html_profile_missing", "Missing <html data-wanxing-profile>.");
}

if (contract && htmlProfile && contract.profile && htmlProfile !== contract.profile) {
  fail("contract.profile_mismatch", `Contract profile ${contract.profile} does not match html profile ${htmlProfile}.`);
}

if (contract && contractVersion !== "1") {
  fail("contract.version_missing", "Missing or unsupported data-wanxing-contract-version=\"1\".");
}

auditStructure();
auditColors();
auditTypographyAndSpacing();
auditMotion();
auditAccessibility();
auditProfileFit();

report.result = report.hardGates.length > 0
  ? "fail"
  : report.warnings.length > 0
    ? "warn"
    : "pass";

console.log(`${JSON.stringify(report, null, 2)}\n`);
process.exit(report.hardGates.length > 0 ? 1 : 0);

function fail(code, message, detail = undefined) {
  report.hardGates.push({ code, message, ...(detail ? { detail } : {}) });
}

function warn(code, message, detail = undefined) {
  report.warnings.push({ code, message, ...(detail ? { detail } : {}) });
}

function normalizePath(value) {
  return value.split("\\").join("/");
}

function parseProjectPath(value) {
  const match = value.match(/^(dist|app)\/([a-z0-9]+(?:-[a-z0-9]+)*)\/index\.html$/);
  return match ? { root: match[1], slug: match[2], entry: value, tmpDir: `dist/${match[2]}/tmp` } : null;
}

function auditOutputPath() {
  const project = contract?.project || {};
  const output = contract?.output || {};

  report.metrics.output = {
    inputPath,
    sourceRoot: projectPath?.root ?? null,
    projectSlug: projectPath?.slug ?? null,
    expectedEntry: projectPath?.entry ?? null,
    expectedTmpDir: projectPath?.tmpDir ?? null,
    contractProjectName: project.name ?? null,
    contractProjectSlug: project.slug ?? null,
    contractEntry: output.entry ?? null,
    contractTmpDir: output.tmpDir ?? null
  };

  if (!projectPath) {
    fail("output.path_invalid", "Render audit input must be dist/<project-slug>/index.html or app/<project-slug>/index.html, with a lowercase ASCII slug.");
    return;
  }

  if (contract && !project.name) {
    fail("output.project_name_missing", "Render Contract must declare project.name.");
  }

  if (contract && project.slug !== projectPath.slug) {
    fail("output.project_slug_mismatch", `Contract project.slug must match path slug ${projectPath.slug}.`);
  }

  if (contract && output.entry !== projectPath.entry) {
    fail("output.entry_mismatch", `Contract output.entry must be ${projectPath.entry}.`);
  }

  if (contract && output.tmpDir !== projectPath.tmpDir) {
    fail("output.tmp_dir_mismatch", `Contract output.tmpDir must be ${projectPath.tmpDir}.`);
  }
}

function extractContract(source) {
  const match = source.match(/<script\b(?=[^>]*\bid=["']wanxing-render-contract["'])(?=[^>]*\btype=["']application\/json["'])[^>]*>([\s\S]*?)<\/script>/i);
  if (!match) return { contract: null, error: null };
  const raw = decodeHtml(match[1].trim());
  try {
    return { contract: JSON.parse(raw), error: null };
  } catch (error) {
    return { contract: null, error: error.message };
  }
}

function collectStyles(source) {
  const css = [];
  const inlineStyles = [];
  const linkedStylesheets = [];
  for (const match of source.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    css.push(match[1]);
  }
  for (const match of source.matchAll(/\sstyle=(["'])([\s\S]*?)\1/gi)) {
    inlineStyles.push(decodeHtml(match[2]));
  }
  for (const match of source.matchAll(/<link\b([^>]*)>/gi)) {
    const attrs = parseAttrs(match[1]);
    if (attrs.rel?.split(/\s+/).includes("stylesheet") && attrs.href) linkedStylesheets.push(attrs.href);
  }
  return { css: css.join("\n"), inlineStyles, linkedStylesheets, styleBlockCount: css.length };
}

function extractHtmlAttrs(source) {
  const match = source.match(/<html\b([^>]*)>/i);
  return match ? parseAttrs(match[1]) : {};
}

function parseAttrs(raw) {
  const attrs = {};
  for (const match of raw.matchAll(/([:\w-]+)(?:=(["'])(.*?)\2|=([^\s"'>]+))?/g)) {
    attrs[match[1].toLowerCase()] = match[3] ?? match[4] ?? "";
  }
  return attrs;
}

/* Only the exact application value relaxes the reading-track baseline. An
   omitted or malformed value cannot silently buy a weaker rule set. */
function effectiveTrack(value) {
  return value === "application" ? "application" : "editorial";
}

function auditStructure() {
  const h1Count = countTag("h1");
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>/gi)].map((m) => Number(m[1]));
  const landmarks = {
    header: hasTag("header") || hasRole("banner"),
    nav: hasTag("nav") || hasRole("navigation"),
    main: hasTag("main") || hasRole("main"),
    footer: hasTag("footer") || hasRole("contentinfo")
  };
  const expectedH1 = contract?.structure?.expectedH1 ?? 1;
  const requiredRegions = contract?.structure?.requiredRegions ?? ["main"];

  report.metrics.structure = {
    h1Count,
    headings,
    landmarks,
    requiredRegions,
    expectedH1
  };

  if (!landmarks.main) {
    fail("structure.main_missing", "Missing <main> or role=\"main\".");
  }

  for (const region of requiredRegions) {
    if (region in landmarks && !landmarks[region]) {
      fail("structure.required_region_missing", `Missing required region: ${region}.`);
    }
  }

  if (h1Count !== expectedH1) {
    fail("structure.h1_count", `Expected ${expectedH1} h1 element(s), found ${h1Count}.`);
  }

  const skipped = [];
  for (let i = 1; i < headings.length; i += 1) {
    if (headings[i] - headings[i - 1] > 1) {
      skipped.push({ from: headings[i - 1], to: headings[i] });
    }
  }
  if (skipped.length) {
    warn("structure.heading_skip", "Heading levels skip hierarchy.", skipped);
  }
}

function auditColors() {
  const hexColors = [...new Set([...cssAndInline.matchAll(/#[0-9a-f]{3,8}\b/gi)].map((m) => normalizeHex(m[0])))].sort();
  const unauthorized = hexColors.filter((color) => !allowedColors.has(color));
  const banned = unauthorized.filter(isBannedHue);
  const gradients = findDeclarations(/(?:background|background-image)\s*:[^;]*(?:linear-gradient|radial-gradient|conic-gradient)\s*\(/gi);
  const shadows = findDeclarations(/(?:box-shadow|text-shadow)\s*:\s*(?!none\b)[^;]+/gi);
  const filters = findDeclarations(/(?:backdrop-filter|filter)\s*:\s*(?!none\b)[^;]+/gi);
  const accentOccurrences = findAccentOccurrences(cssAndInline);
  const track = effectiveTrack(contract?.track);
  // The application track relaxes visual constraints but never the floor.
  // See spec/tracks.md — layer two.
  const accentBudget = Number(
    contract?.theme?.accentBudget ?? (track === "application" ? 4 : 2)
  );

  report.metrics.colors = {
    hexColors,
    unauthorizedColors: unauthorized,
    bannedHighSaturationColors: banned,
    accentOccurrences,
    accentBudget,
    track,
    declaredTrack: contract?.track ?? null,
    gradients: gradients.length,
    shadows: shadows.length,
    filters: filters.length,
    pureBlackUsed: hexColors.includes("#000000"),
    pureWhiteUsed: hexColors.includes("#FFFFFF")
  };

  if (accentOccurrences.length > accentBudget) {
    fail("soul.accent_budget_exceeded", `Accent appears ${accentOccurrences.length} time(s), budget is ${accentBudget}.`, accentOccurrences);
  }

  if (banned.length) {
    fail("soul.banned_high_saturation_color", "Found banned high-saturation color(s).", banned);
  }

  if (gradients.length) {
    fail("soul.gradient_background", "Found gradient background declaration(s).", gradients);
  }

  if (shadows.length) {
    fail("soul.decorative_shadow", "Found shadow declaration(s).", shadows);
  }

  if (filters.some((decl) => /blur\(\s*(1[3-9]|[2-9]\d)px/i.test(decl))) {
    fail("soul.skeuomorphic_filter", "Found heavy blur filter/backdrop-filter.", filters);
  } else if (filters.length) {
    warn("soul.filter_used", "Found filter/backdrop-filter; visual audit should confirm intent.", filters);
  }

  if (unauthorized.length) {
    warn("tokens.unauthorized_color", "Found color(s) outside the Wenxin token palette.", unauthorized);
  }
}

function auditTypographyAndSpacing() {
  const fontSizes = findNumericDeclarations("font-size");
  const badFontSizes = fontSizes.filter((item) => !isAllowedFontSize(item.value));
  const spacing = findNumericDeclarations("(?:margin(?:-[a-z]+)?|padding(?:-[a-z]+)?|gap|row-gap|column-gap)");
  const badSpacing = spacing.filter((item) => !isGridValue(item.value));
  const maxWidths = findNumericDeclarations("max-width");

  report.metrics.typography = {
    fontSizes,
    adHocFontSizes: badFontSizes
  };

  report.metrics.spacing = {
    spacingDeclarations: spacing,
    adHocSpacing: badSpacing,
    maxWidths
  };

  if (badFontSizes.length) {
    warn("typography.ad_hoc_font_size", "Found font-size values outside known Wenxin scales.", badFontSizes.slice(0, 12));
  }

  if (badSpacing.length) {
    warn("spacing.ad_hoc_value", "Found spacing values outside the 4px grid.", badSpacing.slice(0, 12));
  }
}

function auditMotion() {
  const transitions = findDeclarations(/transition(?:-[a-z]+)?\s*:\s*(?!none\b)[^;]+/gi);
  const animations = findDeclarations(/animation(?:-[a-z]+)?\s*:\s*(?!none\b)[^;]+/gi);
  const motionDeclarations = transitions.concat(animations);
  const keyframes = findKeyframes();
  const durations = extractMotionTimes(motionDeclarations);
  const delays = extractMotionTimes(findDeclarations(/(?:transition-delay|animation-delay)\s*:\s*[^;]+/gi));
  const longDurations = durations.filter((d) => d.ms > 600 && !isAllowedLongMotion(d));
  const longStagger = delays.filter((d) => d.ms > 600);
  const easingIssues = motionDeclarations.filter((decl) => /\b(?:bounce|spring|elastic)\b|cubic-bezier\(\s*0\.\d+\s*,\s*1\.\d+/i.test(decl));
  const transforms = extractTransforms(cssAndInline);
  const largeTranslates = transforms.translates.filter((item) => Math.abs(item.px) > 16);
  const rotations = transforms.rotates.filter((item) => Math.abs(item.deg) > 0.01);
  const iterations = findDeclarations(/animation-iteration-count\s*:\s*(?:infinite|[2-9](?:\.\d+)?|[1-9]\d+)\b[^;]*/gi)
    .concat(findDeclarations(/animation\s*:\s*[^;]*\binfinite\b[^;]*/gi));
  const disallowedLoops = iterations.filter((decl) => !/(brand|mark|breath|logo|seal|loading|progress)/i.test(decl));
  const hasReducedMotion = /prefers-reduced-motion\s*:\s*reduce/i.test(cssAndInline);
  const completionSignal = contract?.motion?.completionSignal || "data-animations-complete";
  const hasCompletionSignal = html.includes(completionSignal);
  const contractMotion = contract?.motion || {};

  report.metrics.motion = {
    transitions: transitions.length,
    animations: animations.length,
    keyframes,
    durations,
    delays,
    longDurations,
    longStagger,
    easingIssues,
    transforms,
    disallowedLoops,
    hasReducedMotion,
    completionSignal,
    hasCompletionSignal,
    contract: {
      hasAnimation: contractMotion.hasAnimation ?? null,
      intent: contractMotion.intent ?? null,
      intensity: contractMotion.intensity ?? null,
      maxDurationMs: contractMotion.maxDurationMs ?? null,
      maxTranslatePx: contractMotion.maxTranslatePx ?? null,
      allowsLoop: contractMotion.allowsLoop ?? null,
      hasRuntimeSamplingTarget: contractMotion.hasRuntimeSamplingTarget ?? null
    }
  };

  if (contract && !contract.motion) {
    fail("motion.contract_missing", "Render Contract must declare motion, even when the page has no animation.");
  }

  if (contract && !hasCompletionSignal) {
    fail("motion.completion_signal_missing", `Missing ${completionSignal}; all HTML outputs must expose an animation completion signal.`);
  }

  if ((transitions.length || animations.length) && !hasReducedMotion && profile !== "F4") {
    fail("motion.reduced_motion_missing", "Motion exists but prefers-reduced-motion is missing.");
  }

  if (longDurations.length) {
    fail("motion.duration_too_long", "Found motion duration above 600ms.", longDurations.slice(0, 12));
  }

  if (largeTranslates.length) {
    fail("motion.translate_too_large", "Found translate motion above 16px.", largeTranslates.slice(0, 12));
  }

  if (rotations.length) {
    fail("motion.rotate_used", "Found rotate motion; Wenxin motion forbids rotation.", rotations.slice(0, 12));
  }

  if (easingIssues.length) {
    fail("motion.forbidden_easing", "Found bounce/spring/elastic or strong rebound easing.", easingIssues.slice(0, 12));
  }

  if (disallowedLoops.length && contractMotion.allowsLoop !== true) {
    fail("motion.disallowed_loop", "Found non-exempt looping animation.", disallowedLoops.slice(0, 12));
  }

  if (longStagger.length) {
    warn("motion.long_stagger_or_delay", "Found animation/transition delay above 600ms; audit runtime pacing.", longStagger.slice(0, 12));
  }

  if (transforms.scales.length) {
    warn("motion.scale_used", "Found scale transform; visual audit should confirm it does not feel performative.", transforms.scales.slice(0, 12));
  }

  if ((transitions.length || animations.length) && !contractMotion.intent) {
    warn("motion.intent_missing", "Motion exists but contract.motion.intent is missing.");
  }
}

function auditAccessibility() {
  const interactiveTags = [];
  for (const match of html.matchAll(/<(a|button)\b([^>]*)>([\s\S]*?)<\/\1>/gi)) {
    interactiveTags.push({
      tag: match[1].toLowerCase(),
      attrs: parseAttrs(match[2]),
      text: stripTags(match[3]).trim()
    });
  }
  for (const match of html.matchAll(/<(input|select|textarea)\b([^>]*)>/gi)) {
    interactiveTags.push({
      tag: match[1].toLowerCase(),
      attrs: parseAttrs(match[2]),
      text: ""
    });
  }
  const ariaRoleButtons = [...html.matchAll(/<([a-z0-9-]+)\b([^>]*\brole=["'](?:button|link|menuitem|tab)["'][^>]*)>/gi)].map((m) => ({
    tag: m[1].toLowerCase(),
    attrs: parseAttrs(m[2]),
    text: ""
  })).filter((node) => !["a", "button", "input", "select", "textarea"].includes(node.tag));
  const interactive = interactiveTags.concat(ariaRoleButtons);
  const missingNames = interactive.filter((node) => !hasAccessibleName(node));
  const linkedKitFocus = /<link\b[^>]*\bhref=["'][^"']*(?:kit\/index|kit\/dist\/wenxin(?:-f\d)?)[^"']*\.css[^"']*["']/i.test(html);
  const focusVisible = /:focus-visible\b/i.test(cssAndInline) || linkedKitFocus;
  const outlineNone = /outline\s*:\s*none\b/i.test(cssAndInline);
  const images = [...html.matchAll(/<img\b([^>]*)>/gi)].map((m) => parseAttrs(m[1]));
  const missingAlt = images.filter((attrs) => !("alt" in attrs));

  report.metrics.accessibility = {
    interactiveCount: interactive.length,
    missingAccessibleNames: missingNames.length,
    focusVisible,
    outlineNone,
    imageCount: images.length,
    missingAlt: missingAlt.length
  };

  if (interactive.length && !focusVisible) {
    fail("a11y.focus_visible_missing", "Interactive elements exist but :focus-visible style is missing.");
  }

  if (outlineNone) {
    fail("a11y.outline_removed", "Found outline: none; focus visibility may be removed.");
  }

  if (missingNames.length) {
    fail("a11y.accessible_name_missing", "Interactive element(s) may lack accessible names.", missingNames.slice(0, 12));
  }

  if (missingAlt.length) {
    fail("a11y.image_alt_missing", "Image element(s) missing alt attribute.", missingAlt.slice(0, 12));
  }
}

function auditProfileFit() {
  /* Media-forced constraints only. The per-profile check dispatcher and its
     nine fixture pages were removed: with no page declaring them, they were
     machinery that looked alive. What remains is what any page can be held
     to regardless of medium. See spec/media.md for the rules themselves. */
  const motion = contract?.motion;
  const landingContent = mainContentWithClass("wx-landing");
  const editorialLanding = effectiveTrack(contract?.track) === "editorial" && landingContent !== null;
  const primaryNavigationLinks = [...(landingContent ?? "").matchAll(/<a\b([^>]*)>/gi)]
    .map((m) => parseAttrs(m[1]))
    .filter((attrs) => attrs.href && (attrs.class ?? "").split(/\s+/).includes("wx-btn--primary"));

  report.metrics.profileFit = {
    editorialLanding,
    primaryNavigationLinkCount: primaryNavigationLinks.length
  };

  if (editorialLanding && primaryNavigationLinks.length) {
    fail(
      "soul.editorial_landing_filled_cta",
      "Editorial wx-landing navigation must use wx-btn--text, not wx-btn--primary.",
      primaryNavigationLinks.slice(0, 12)
    );
  }
  if (motion?.intensity === "E8") {
    const animated = /@keyframes|animation\s*:|transition\s*:/i.test(cssAndInline);
    if (animated) fail("motion.e8_violation", "E8 declares print stillness; no animation or transition may be defined.");
  }
  if (motion && Number(motion.maxDurationMs) > 600) {
    fail("motion.over_cap", `maxDurationMs ${motion.maxDurationMs} exceeds the 600ms system cap.`);
  }
}

/** A document may contain a legitimate feedback recovery action after its
 * landing region. The semantic <main> cannot nest, so its matching end tag
 * gives this audit a reliable, deliberately narrow scope. */
function mainContentWithClass(className) {
  for (const opening of html.matchAll(/<main\b([^>]*)>/gi)) {
    if (!(parseAttrs(opening[1]).class ?? "").split(/\s+/).includes(className)) continue;
    const start = opening.index + opening[0].length;
    const close = /<\/main\s*>/gi;
    close.lastIndex = start;
    const match = close.exec(html);
    return match ? html.slice(start, match.index) : null;
  }
  return null;
}

function countTag(tag) {
  return (html.match(new RegExp(`<${tag}\\b`, "gi")) || []).length;
}

function hasTag(tag) {
  return new RegExp(`<${tag}\\b`, "i").test(html);
}

function hasRole(role) {
  return new RegExp(`\\brole=["']${role}["']`, "i").test(html);
}

function findDeclarations(regex) {
  return [...cssAndInline.matchAll(regex)].map((m) => m[0].trim()).slice(0, 50);
}

function findNumericDeclarations(propertyPattern) {
  const regex = new RegExp(`(${propertyPattern})\\s*:\\s*([^;{}]+)`, "gi");
  const declarations = [];
  for (const match of cssAndInline.matchAll(regex)) {
    const values = [...match[2].matchAll(/-?\d*\.?\d+(?:px|rem|em|pt|vh|vw|%)/gi)].map((m) => m[0]);
    for (const value of values) {
      declarations.push({ property: match[1], value });
    }
  }
  return declarations.slice(0, 80);
}

function findKeyframes() {
  return [...cssAndInline.matchAll(/@keyframes\s+([a-z0-9_-]+)/gi)]
    .map((m) => m[1])
    .slice(0, 30);
}

function extractMotionTimes(declarations) {
  const times = [];
  for (const declaration of declarations) {
    for (const match of declaration.matchAll(/\b(\d*\.?\d+)(ms|s)\b/gi)) {
      const ms = match[2].toLowerCase() === "s" ? Number(match[1]) * 1000 : Number(match[1]);
      if (Number.isFinite(ms)) {
        times.push({ raw: match[0], ms, declaration });
      }
    }
  }
  return times.slice(0, 80);
}

function isAllowedLongMotion(time) {
  if (time.ms <= 600) return true;
  if (Math.abs(time.ms - 4000) > 10) return false;
  return /(brand|mark|breath|logo|seal|loading|progress)/i.test(time.declaration);
}

function extractTransforms(source) {
  const transforms = findDeclarations(/transform\s*:\s*(?!none\b)[^;]+/gi)
    .concat(findDeclarations(/@keyframes[\s\S]*?\{[\s\S]*?\}/gi));
  const translates = [];
  const rotates = [];
  const scales = [];

  for (const declaration of transforms) {
    for (const match of declaration.matchAll(/translate(?:3d|X|Y)?\(([^)]*)\)/gi)) {
      for (const value of match[1].split(",")) {
        const px = toPx(value.trim());
        if (px !== null) translates.push({ value: value.trim(), px, declaration });
      }
    }
    for (const match of declaration.matchAll(/rotate(?:Z)?\(\s*(-?\d*\.?\d+)deg\s*\)/gi)) {
      const deg = Number(match[1]);
      if (Number.isFinite(deg)) rotates.push({ value: match[0], deg, declaration });
    }
    for (const match of declaration.matchAll(/scale(?:3d|X|Y)?\(([^)]*)\)/gi)) {
      scales.push({ value: match[0], declaration });
    }
  }

  return {
    translates: translates.slice(0, 40),
    rotates: rotates.slice(0, 40),
    scales: scales.slice(0, 40)
  };
}

function findAccentOccurrences(source) {
  const stripped = source
    .replace(/--[\w-]*accent[\w-]*\s*:[^;]+;/gi, "")
    .replace(/--wenxin-ref-brick[\w-]*\s*:[^;]+;/gi, "");
  const matches = [...stripped.matchAll(/(?:#8B3525|#C4533E|var\(--(?:wenxin-)?color-accent\)|var\(--wenxin-color-accent\))/gi)];
  return matches.map((m) => ({ token: m[0], index: m.index })).slice(0, 20);
}

function hasAccessibleName(node) {
  if (node.text) return true;
  if (node.attrs["aria-label"] || node.attrs["aria-labelledby"] || node.attrs.title || node.attrs.alt) return true;
  if (["input", "select", "textarea"].includes(node.tag)) {
    const type = (node.attrs.type || "text").toLowerCase();
    if (["hidden", "submit", "button", "reset"].includes(type)) return true;
    if (node.attrs.id) {
      const escaped = node.attrs.id.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
      if (new RegExp(`<label\\b[^>]*\\bfor=["']${escaped}["']`, "i").test(html)) return true;
    }
    const typePattern = type ? `(?=[^>]*\\btype=["']${type}["'])` : "";
    if (new RegExp(`<label\\b[^>]*>[^<]*<${node.tag}\\b${typePattern}`, "i").test(html)) return true;
    return false;
  }
  if (node.tag === "a" && !node.attrs.href) return true;
  return false;
}

function stripTags(value) {
  return decodeHtml(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));
}

function isAllowedFontSize(value) {
  const px = toPx(value);
  if (px === null) return true;
  const allowed = new Set([7, 8.5, 10, 11, 12, 13, 14, 16, 17, 18, 20, 22, 24, 26, 28, 30, 32, 36, 48, 64, 72, 88, 96, 128, 192]);
  return allowed.has(round(px)) || Math.abs(px - 13.328) < 0.3 || Math.abs(px - 11.104) < 0.3;
}

function isGridValue(value) {
  const px = toPx(value);
  if (px === null || px === 0) return true;
  if (/%$|vh$|vw$/i.test(value)) return true;
  return Math.abs(px % 4) < 0.01;
}

function toPx(value) {
  const match = value.match(/^(-?\d*\.?\d+)(px|rem|em|pt|vh|vw|%)$/i);
  if (!match) return null;
  const number = Number(match[1]);
  const unit = match[2].toLowerCase();
  if (!Number.isFinite(number)) return null;
  if (unit === "px") return number;
  if (unit === "rem" || unit === "em") return number * 16;
  if (unit === "pt") return number * (96 / 72);
  return null;
}

function round(value) {
  return Math.round(value * 1000) / 1000;
}

function normalizeHex(color) {
  const upper = color.toUpperCase();
  if (upper.length === 4) {
    return `#${upper[1]}${upper[1]}${upper[2]}${upper[2]}${upper[3]}${upper[3]}`;
  }
  if (upper.length === 5) {
    return `#${upper[1]}${upper[1]}${upper[2]}${upper[2]}${upper[3]}${upper[3]}${upper[4]}${upper[4]}`;
  }
  return upper.length === 9 ? upper.slice(0, 7) : upper;
}

function isBannedHue(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  if (s < 0.45 || l < 0.2 || l > 0.85) return false;
  return (h >= 20 && h <= 55) || (h >= 80 && h <= 170) || (h >= 190 && h <= 320);
}

function hexToRgb(hex) {
  const match = hex.match(/^#([0-9A-F]{6})$/i);
  if (!match) return null;
  const value = Number.parseInt(match[1], 16);
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
  }
  return { h, s, l };
}

function decodeHtml(value) {
  return value
    .replace(/&quot;/g, "\"")
    .replace(/&#34;/g, "\"")
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}
