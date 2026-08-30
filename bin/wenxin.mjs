#!/usr/bin/env node
/**
 * wenxin — the command line surface of 文心 · 万形.
 *
 * Four verbs, chosen by what a consumer (or an agent acting for one) actually
 * has to do: check whether a page complies, look up a contract, get the
 * values, and start from a skeleton rather than a blank file.
 *
 * Zero dependencies, like the rest of the project. Paths resolve against the
 * installed package, never the working directory.
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const at = (...p) => join(pkgRoot, ...p);
const read = (...p) => readFileSync(at(...p), "utf8");

const USAGE = `wenxin — 文心 · 万形

  wenxin audit <file>          审计一个 HTML 页面；输出 JSON，hardGates 非空即不合规
  wenxin contracts [query]     列出组件契约；query 按名称或 class 过滤
  wenxin tokens [--format F]   输出 token。F: json | dtcg | css | scss | ts（默认 json）
  wenxin skeleton [A-E]        输出页面原型骨架；不带参数则列出五种

  wenxin --help                这段文字
  wenxin --version             版本号

先读 kit/wenxin.json（wenxin contracts --all）。产出之后跑 wenxin audit，不要声称合规。`;

const [verb, ...rest] = process.argv.slice(2);
const flag = (name) => {
  const i = rest.indexOf(`--${name}`);
  return i === -1 ? null : rest[i + 1] ?? true;
};
const positional = rest.filter((a, i) => !a.startsWith("--") && !(i > 0 && rest[i - 1].startsWith("--") && !rest[i - 1].includes("=")));

function fail(message, code = 2) {
  console.error(`wenxin: ${message}`);
  process.exit(code);
}

switch (verb) {
  case undefined:
  case "-h":
  case "--help":
  case "help":
    console.log(USAGE);
    break;

  case "-v":
  case "--version":
  case "version":
    console.log(JSON.parse(read("package.json")).version);
    break;

  /* Delegates to the auditor rather than reimplementing it: one place decides
     what compliance means, and it is the place with the self-test. */
  case "audit": {
    const target = positional[0];
    if (!target) fail("audit needs a file — wenxin audit <file>");
    if (!existsSync(resolve(target))) fail(`no such file: ${target}`);
    const auditor = at("scripts", "render-audit.mjs");
    if (!existsSync(auditor)) fail("this install has no auditor (scripts/render-audit.mjs is missing)");
    const run = spawnSync(process.execPath, [auditor, resolve(target)], { stdio: "inherit" });
    process.exit(run.status ?? 2);
  }

  case "contracts": {
    const bundle = JSON.parse(read("kit", "wenxin.json"));
    if (flag("all")) { console.log(JSON.stringify(bundle, null, 2)); break; }
    const query = positional[0]?.toLowerCase();
    const rows = bundle.components.flatMap(({ family, items }) =>
      items.map((item) => ({ family, ...item })));
    const hits = query
      ? rows.filter((r) => r.name.toLowerCase().includes(query) || r.classes.some((c) => c.includes(query)))
      : rows;
    if (!hits.length) fail(`no contract matches "${query}" — try \`wenxin contracts\` for all ${rows.length}`, 1);
    for (const r of hits) {
      console.log(`${r.name}  ${r.classes.map((c) => `.${c}`).join(" ")}`);
      console.log(`  分类   ${r.family}`);
      console.log(`  基座   ${r.base}`);
      console.log(`  状态   ${r.state}`);
      console.log(`  行为   ${r.behaviour}\n`);
    }
    break;
  }

  case "tokens": {
    const format = flag("format") ?? "json";
    const file = {
      json: ["kit", "tokens", "generated", "tokens.json"],
      dtcg: ["kit", "tokens", "generated", "tokens.dtcg.json"],
      scss: ["kit", "tokens", "generated", "tokens.scss"],
      ts: ["kit", "tokens", "generated", "tokens.ts"],
      css: ["kit", "tokens", "core.css"],
    }[format];
    if (!file) fail(`unknown format "${format}" — json | dtcg | css | scss | ts`);
    process.stdout.write(read(...file));
    break;
  }

  case "skeleton": {
    const dir = at("kit", "patterns");
    const files = readdirSync(dir).filter((f) => f.endsWith(".html")).sort();
    const want = positional[0]?.toLowerCase();
    if (!want) {
      console.log("五种页面原型 · A–E\n");
      for (const f of files) console.log(`  ${f[0].toUpperCase()}  ${f.replace(/\.html$/, "").replace(/^[a-e]-/, "")}  —  wenxin skeleton ${f[0]}`);
      console.log("\n原型 E（工具 / 表单）会把它所在形态的轨道翻转为应用轨。");
      break;
    }
    const match = files.find((f) => f.startsWith(`${want}-`));
    if (!match) fail(`no archetype "${want}" — one of ${files.map((f) => f[0]).join(", ")}`);
    process.stdout.write(read("kit", "patterns", match));
    break;
  }

  default:
    fail(`unknown command "${verb}"\n\n${USAGE}`);
}
