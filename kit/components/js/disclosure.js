/**
 * disclosure — generic show/hide wiring for the sidebar drawer and anything
 * else with a trigger and a target.
 *
 *   <button data-wx-toggle="#sidebar" aria-expanded="false">Menu</button>
 *   <nav id="sidebar" class="wx-sidebar">…</nav>
 *
 * Keeps aria-expanded on the trigger and data-open on the target in lockstep.
 * A controlled target receives data-wx-disclosure-ready only after the script
 * has wired it, preserving a readable no-JS fallback. Escape closes; focus
 * returns to the trigger, because a keyboard user who opens a drawer must be
 * able to get back out of it.
 */
(function () {
  "use strict";

  var mobileSidebarQuery = typeof window.matchMedia === "function"
    ? window.matchMedia("(max-width: 1024px)")
    : null;
  var originalTabindex = new WeakMap();
  var sidebarPairs = [];
  var focusable = "a[href], area[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]";

  function targetOf(btn) {
    var sel = btn.getAttribute("data-wx-toggle");
    return sel ? document.querySelector(sel) : null;
  }

  function isSidebar(target) {
    return target.classList.contains("wx-sidebar");
  }

  function setFallbackTabbability(target, unavailable) {
    target.querySelectorAll(focusable).forEach(function (node) {
      if (unavailable) {
        if (!originalTabindex.has(node)) originalTabindex.set(node, node.getAttribute("tabindex"));
        node.setAttribute("tabindex", "-1");
      } else if (originalTabindex.has(node)) {
        var tabindex = originalTabindex.get(node);
        if (tabindex == null) node.removeAttribute("tabindex");
        else node.setAttribute("tabindex", tabindex);
        originalTabindex.delete(node);
      }
    });
  }

  function syncSidebarExposure(btn, target, open) {
    if (!isSidebar(target)) return;
    var concealed = Boolean(mobileSidebarQuery && mobileSidebarQuery.matches && !open);
    if (concealed) {
      target.setAttribute("aria-hidden", "true");
      if ("inert" in target) target.inert = true;
      else setFallbackTabbability(target, true);
      if (target.contains(document.activeElement)) btn.focus();
      return;
    }

    target.removeAttribute("aria-hidden");
    if ("inert" in target) target.inert = false;
    setFallbackTabbability(target, false);
  }

  function setOpen(btn, target, open) {
    btn.setAttribute("aria-expanded", String(open));
    if (open) target.setAttribute("data-open", "");
    else target.removeAttribute("data-open");
    syncSidebarExposure(btn, target, open);
  }

  function initialise() {
    document.querySelectorAll("[data-wx-toggle]").forEach(function (btn) {
      var target = targetOf(btn);
      if (!target) return;
      setOpen(btn, target, btn.getAttribute("aria-expanded") === "true");
      target.setAttribute("data-wx-disclosure-ready", "");
      btn.setAttribute("data-wx-disclosure-ready", "");
      if (isSidebar(target)) sidebarPairs.push({ btn: btn, target: target });
    });

    if (!mobileSidebarQuery || !sidebarPairs.length) return;
    var syncForViewport = function () {
      sidebarPairs.forEach(function (pair) {
        setOpen(pair.btn, pair.target, pair.btn.getAttribute("aria-expanded") === "true");
      });
    };
    if (typeof mobileSidebarQuery.addEventListener === "function") mobileSidebarQuery.addEventListener("change", syncForViewport);
    else if (typeof mobileSidebarQuery.addListener === "function") mobileSidebarQuery.addListener(syncForViewport);
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-wx-toggle]");
    if (!btn) return;
    var target = targetOf(btn);
    if (!target) return;
    e.preventDefault();
    setOpen(btn, target, btn.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    document.querySelectorAll("[data-wx-toggle][aria-expanded='true']").forEach(function (btn) {
      var target = targetOf(btn);
      if (target) { setOpen(btn, target, false); btn.focus(); }
    });
  });

  initialise();
})();
