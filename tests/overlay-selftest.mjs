#!/usr/bin/env node
/**
 * Negative control for the toast contract. A live region must exist before the
 * first message is appended; creating it at the same moment can make that
 * first announcement invisible to assistive technology.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "kit", "components", "js", "overlay.js"), "utf8");

class Node {
  constructor() {
    this.parentNode = null;
  }

  remove() {
    if (!this.parentNode) return;
    const siblings = this.parentNode.children;
    siblings.splice(siblings.indexOf(this), 1);
    this.parentNode = null;
  }
}

class Element extends Node {
  constructor(tagName) {
    super();
    this.tagName = tagName.toUpperCase();
    this.className = "";
    this.children = [];
    this.attributes = new Map();
  }

  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }
}

class TextNode extends Node {
  constructor(value) {
    super();
    this.textContent = value;
  }
}

const body = new Element("body");
const document = {
  body,
  addEventListener() {},
  createElement: (tagName) => new Element(tagName),
  createTextNode: (value) => new TextNode(value),
  contains(node) {
    for (let current = node; current; current = current.parentNode) {
      if (current === body) return true;
    }
    return false;
  },
  querySelector(selector) {
    if (selector !== ".wx-toast__region") return null;
    return body.children.find((child) => child.className === "wx-toast__region") ?? null;
  },
};
const window = {};
vm.runInNewContext(source, { document, window, setTimeout() {} });

const region = document.querySelector(".wx-toast__region");
const failures = [];
if (!region) failures.push("no stable toast region exists before the first message");
if (region?.getAttribute("aria-live") !== "polite") failures.push('toast region is not aria-live="polite"');
if (region?.getAttribute("aria-atomic") !== "true") failures.push('toast region is not aria-atomic="true"');

if (region && typeof window.wxToast === "function") {
  const first = window.wxToast("第一条", { level: "success", label: "已保存", ms: 20 });
  const second = window.wxToast("第二条");
  if (body.children.filter((child) => child.className === "wx-toast__region").length !== 1) {
    failures.push("wxToast creates more than one live region");
  }
  if (region.children.length !== 2 || region.children[0] !== first || region.children[1] !== second) {
    failures.push("wxToast does not append both messages into the stable region");
  }
}

if (failures.length) {
  console.error(`✗ overlay self-test: ${failures.join("; ")}`);
  process.exit(1);
}
console.log("✓ overlay self-test: stable polite atomic region exists before the first toast and receives the queue");
