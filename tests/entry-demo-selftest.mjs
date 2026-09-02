#!/usr/bin/env node
/** The documentation controls are live examples, not painted state samples. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { syncSliderValue, toggleSwitch } from "../site/assets/entry-demo.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const attrs = new Map([["role", "switch"], ["aria-checked", "false"]]);
const control = {
  getAttribute: (name) => attrs.get(name) ?? null,
  setAttribute: (name, value) => attrs.set(name, String(value)),
};
toggleSwitch(control);
assert(control.getAttribute("aria-checked") === "true", "switch click did not set aria-checked=true");
toggleSwitch(control);
assert(control.getAttribute("aria-checked") === "false", "switch click did not set aria-checked=false");

const output = { textContent: "" };
syncSliderValue({ value: "44", getAttribute: (name) => name === "data-wx-unit" ? "em" : null }, output);
assert(output.textContent === "44 em", "slider output did not follow the selected numeric value");

let rejectedInvalidSwitch = false;
try {
  toggleSwitch({ getAttribute: () => "button", setAttribute() {} });
} catch {
  rejectedInvalidSwitch = true;
}
assert(rejectedInvalidSwitch, "a non-switch control was accepted");

const page = readFileSync(join(root, "site", "_pages", "c-entry.html"), "utf8");
assert(page.includes("data-wx-entry-switch"), "the switch specimen has no page-local behaviour hook");
assert(page.includes("data-wx-entry-slider"), "the slider specimen has no page-local behaviour hook");
assert(page.includes("./assets/entry-demo.mjs"), "the entry demo module is not loaded by its page");

console.log("✓ entry demo self-test: switch state and slider output are interactive, and invalid controls are rejected");

function assert(condition, message) {
  if (condition) return;
  console.error(`✗ entry demo self-test: ${message}`);
  process.exit(1);
}
