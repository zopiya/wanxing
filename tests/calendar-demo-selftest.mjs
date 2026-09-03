#!/usr/bin/env node
/** The calendar demo cannot only paint a selected day: activating another day
 * must update every exposed pressed state and announce the new choice. */
import { selectCalendarDay } from "../site/assets/calendar-demo.mjs";

const days = [
  makeDay("2026 年 8 月 4 日", "false"),
  makeDay("2026 年 8 月 5 日", "true"),
  makeDay("2026 年 8 月 6 日", "false"),
];
const calendar = { querySelectorAll: (selector) => selector === ".wx-calendar__day" ? days : [] };
const status = { textContent: "" };

selectCalendarDay(calendar, days[2], status);
assert(days.map((day) => day.getAttribute("aria-pressed")).join(",") === "false,false,true", "selection did not move to the activated date");
assert(status.textContent === "已选择：2026 年 8 月 6 日", "selection was not announced");

let rejectedOutsideDay = false;
try {
  selectCalendarDay(calendar, makeDay("2026 年 8 月 7 日", "false"), status);
} catch {
  rejectedOutsideDay = true;
}
assert(rejectedOutsideDay, "a button outside this calendar was accepted");

console.log("✓ calendar demo self-test: selection state and announcement stay synchronized");

function makeDay(label, pressed) {
  const attributes = new Map([["aria-label", label], ["aria-pressed", pressed]]);
  return {
    getAttribute: (name) => attributes.get(name) ?? null,
    setAttribute: (name, value) => attributes.set(name, String(value)),
    textContent: label,
  };
}

function assert(condition, message) {
  if (condition) return;
  console.error(`✗ calendar demo self-test: ${message}`);
  process.exit(1);
}
