#!/usr/bin/env node
/** `aria-current` is the shared visual and assistive-technology state. Keep
 * the scroll spy precise: exactly one current location, never a generic true. */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = resolve(new URL("..", import.meta.url).pathname);
const source = readFileSync(resolve(root, "kit/components/js/toc.js"), "utf8");
const navigationPage = readFileSync(resolve(root, "site/_pages/c-navigation.html"), "utf8");

class Link {
  constructor(href) { this.attrs = new Map([["href", href]]); }
  getAttribute(name) { return this.attrs.get(name) ?? null; }
  setAttribute(name, value) { this.attrs.set(name, String(value)); }
  removeAttribute(name) { this.attrs.delete(name); }
}

const first = { id: "first" };
const second = { id: "second" };
const firstLink = new Link("#first");
const secondLink = new Link("#second");
const toc = { querySelectorAll: () => [firstLink, secondLink] };
const observers = [];
class FakeIntersectionObserver {
  constructor(callback) { this.callback = callback; this.observed = []; observers.push(this); }
  observe(heading) { this.observed.push(heading); }
}
const document = {
  querySelector(selector) { return selector === ".wx-toc" ? toc : null; },
  getElementById(id) { return id === "first" ? first : id === "second" ? second : null; },
};

vm.runInNewContext(source, { document, IntersectionObserver: FakeIntersectionObserver, Set, decodeURIComponent });
assert.equal(observers.length, 1, "a wx-toc with valid links must initialise one observer");
assert.deepEqual(observers[0].observed, [first, second], "observer must watch linked headings in document order");

observers[0].callback([{ target: first, isIntersecting: true }]);
assert.equal(firstLink.getAttribute("aria-current"), "location", "active heading must be announced as the current location");
assert.equal(secondLink.getAttribute("aria-current"), null, "only one toc link may be current");

observers[0].callback([{ target: first, isIntersecting: false }, { target: second, isIntersecting: true }]);
assert.equal(firstLink.getAttribute("aria-current"), null, "old current link must clear on scroll");
assert.equal(secondLink.getAttribute("aria-current"), "location", "new active heading must become the current location");
assert.match(navigationPage, /<script src="\.\.\/kit\/components\/js\/toc\.js"><\/script>/, "the wx-toc demo must actually load its optional kit behaviour");

console.log("✓ toc: a single aria-current=location follows headings, and the documented demo runs the kit script");
