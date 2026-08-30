/**
 * disclosure — generic show/hide wiring for the sidebar drawer and anything
 * else with a trigger and a target.
 *
 *   <button data-wx-toggle="#sidebar" aria-expanded="false">Menu</button>
 *   <nav id="sidebar" class="wx-sidebar">…</nav>
 *
 * Keeps aria-expanded on the trigger and data-open on the target in lockstep.
 * Escape closes; focus returns to the trigger, because a keyboard user who
 * opens a drawer must be able to get back out of it.
 */
(function () {
  "use strict";

  function targetOf(btn) {
    var sel = btn.getAttribute("data-wx-toggle");
    return sel ? document.querySelector(sel) : null;
  }

  function setOpen(btn, target, open) {
    btn.setAttribute("aria-expanded", String(open));
    if (open) target.setAttribute("data-open", "");
    else target.removeAttribute("data-open");
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
})();
