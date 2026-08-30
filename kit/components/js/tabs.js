/**
 * tabs — roving tabindex for [role="tablist"].
 *
 * The CSS reads aria-selected, so this script only has to keep the ARIA
 * truthful and the panels in sync. Arrow keys move, Home/End jump, and only
 * the selected tab is in the tab order — that is what distinguishes a
 * tablist from a row of links to a keyboard user.
 */
(function () {
  "use strict";

  function tabsOf(list) {
    return Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
  }

  function enabledTabsOf(list) {
    return tabsOf(list).filter(function (tab) {
      return !tab.disabled && tab.getAttribute("aria-disabled") !== "true";
    });
  }

  function select(list, tab) {
    tabsOf(list).forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute("aria-controls"));
      if (panel) panel.hidden = !on;
    });
  }

  document.querySelectorAll('[role="tablist"]').forEach(function (list) {
    var tabs = tabsOf(list);
    var enabled = enabledTabsOf(list);
    if (!enabled.length) return;
    var current = enabled.filter(function (t) { return t.getAttribute("aria-selected") === "true"; })[0] || enabled[0];
    select(list, current);

    list.addEventListener("click", function (e) {
      var tab = e.target.closest('[role="tab"]');
      if (tab && !tab.disabled && tab.getAttribute("aria-disabled") !== "true") select(list, tab);
    });

    list.addEventListener("keydown", function (e) {
      var items = enabledTabsOf(list);
      var i = items.indexOf(document.activeElement);
      if (i < 0) return;
      var next = null;
      var vertical = list.getAttribute("aria-orientation") === "vertical";
      var rtl = getComputedStyle(list).direction === "rtl";
      if (vertical && e.key === "ArrowDown") next = items[(i + 1) % items.length];
      else if (vertical && e.key === "ArrowUp") next = items[(i - 1 + items.length) % items.length];
      else if (!vertical && e.key === "ArrowRight") next = items[(i + (rtl ? -1 : 1) + items.length) % items.length];
      else if (!vertical && e.key === "ArrowLeft") next = items[(i + (rtl ? 1 : -1) + items.length) % items.length];
      else if (e.key === "Home") next = items[0];
      else if (e.key === "End") next = items[items.length - 1];
      if (!next) return;
      e.preventDefault();
      select(list, next);
      next.focus();
    });
  });
})();
