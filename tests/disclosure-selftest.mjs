#!/usr/bin/env node
/** Exercise the drawer's small DOM contract without making a browser test
 * suite a dependency of the kit. The mock deliberately lacks `inert`, so the
 * fallback tabbability path cannot silently rot. */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = resolve(new URL("..", import.meta.url).pathname);
const source = readFileSync(resolve(root, "kit/components/js/disclosure.js"), "utf8");
const sidebarCss = readFileSync(resolve(root, "kit/components/sidebar.css"), "utf8");
const siteCss = readFileSync(resolve(root, "site/assets/site.css"), "utf8");

assert.match(sidebarCss, /\.wx-sidebar\[data-wx-disclosure-ready\]\s*\{/, "off-canvas sidebar CSS must wait for JS wiring");
assert.match(siteCss, /\.doc-sidebar\[data-wx-disclosure-ready\]\s*\{/, "document sidebar hiding must wait for JS wiring");
assert.match(siteCss, /\.doc-navtoggle\[data-wx-disclosure-ready\]\s*\{/, "the inert document toggle must stay hidden without JS");

class Element {
  constructor({ classes = [], attrs = {}, children = [] } = {}) {
    this.attrs = new Map(Object.entries(attrs));
    this.classes = new Set(classes);
    this.children = children;
    this.focused = false;
    this.classList = { contains: (name) => this.classes.has(name) };
  }
  getAttribute(name) { return this.attrs.has(name) ? this.attrs.get(name) : null; }
  setAttribute(name, value) { this.attrs.set(name, String(value)); }
  removeAttribute(name) { this.attrs.delete(name); }
  hasAttribute(name) { return this.attrs.has(name); }
  querySelectorAll() { return this.children; }
  contains(node) { return node === this || this.children.includes(node); }
  closest(selector) { return selector === "[data-wx-toggle]" && this.hasAttribute("data-wx-toggle") ? this : null; }
  focus() { this.focused = true; }
}

const link = new Element({ attrs: { href: "#section" } });
const sidebar = new Element({ classes: ["wx-sidebar"], attrs: { id: "sidebar" }, children: [link] });
const trigger = new Element({ attrs: { "data-wx-toggle": "#sidebar", "aria-expanded": "false" } });
const rootElement = new Element();
const events = new Map();
const mobile = {
  matches: true,
  listeners: new Map(),
  addEventListener(type, listener) { this.listeners.set(type, listener); },
};
const document = {
  activeElement: null,
  documentElement: rootElement,
  addEventListener(type, listener) { events.set(type, listener); },
  querySelector(selector) { return selector === "#sidebar" ? sidebar : null; },
  querySelectorAll(selector) {
    if (selector === "[data-wx-toggle]") return [trigger];
    if (selector === "[data-wx-toggle][aria-expanded='true']") {
      return trigger.getAttribute("aria-expanded") === "true" ? [trigger] : [];
    }
    return [];
  },
};

vm.runInNewContext(source, { document, window: { matchMedia: () => mobile }, Set, WeakMap });

assert.equal(sidebar.getAttribute("data-wx-disclosure-ready"), "", "controlled sidebar must only become a drawer after JS wires it");
assert.equal(sidebar.getAttribute("aria-hidden"), "true", "closed narrow drawer must leave the accessibility tree");
assert.equal(link.getAttribute("tabindex"), "-1", "without inert support, closed drawer links must leave the Tab order");

events.get("click")({ target: trigger, preventDefault() {} });
assert.equal(trigger.getAttribute("aria-expanded"), "true", "toggle opens the controlled sidebar");
assert.equal(sidebar.hasAttribute("data-open"), true, "open state belongs to the target");
assert.equal(sidebar.hasAttribute("aria-hidden"), false, "open narrow drawer returns to the accessibility tree");
assert.equal(link.hasAttribute("tabindex"), false, "open narrow drawer restores original tabbability");

events.get("keydown")({ key: "Escape" });
assert.equal(trigger.getAttribute("aria-expanded"), "false", "Escape closes the drawer");
assert.equal(sidebar.getAttribute("aria-hidden"), "true", "Escape re-isolates the closed drawer");
assert.equal(trigger.focused, true, "Escape returns focus to its trigger");

mobile.matches = false;
mobile.listeners.get("change")();
assert.equal(sidebar.hasAttribute("aria-hidden"), false, "wide layout never hides the sidebar from assistive technology");
assert.equal(link.hasAttribute("tabindex"), false, "wide layout restores the native Tab order");

console.log("✓ disclosure: mobile drawer state, inert fallback, Escape return, and wide-layout restoration work together");
