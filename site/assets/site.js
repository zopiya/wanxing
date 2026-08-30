/* Site chrome behaviour. Theme choice persists; the anchor list follows the
   heading actually on screen. Both are enhancements — the site is complete
   without either. */
(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.querySelector(".doc-topbar .wx-switch");

  var saved = null;
  try { saved = localStorage.getItem("wx-theme"); } catch (e) { /* private mode */ }
  if (saved) root.setAttribute("data-theme", saved);

  function syncToggle() {
    if (!toggle) return;
    var dark = root.getAttribute("data-theme") === "dark" ||
      (!root.hasAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
    toggle.setAttribute("aria-checked", String(dark));
    toggle.setAttribute("aria-label", dark ? "切换亮色模式" : "切换暗色模式");
  }
  syncToggle();

  if (toggle) {
    toggle.addEventListener("click", function () {
      var dark = this.getAttribute("aria-checked") !== "true";
      root.setAttribute("data-theme", dark ? "dark" : "light");
      try { localStorage.setItem("wx-theme", dark ? "dark" : "light"); } catch (e) { /* ignore */ }
      syncToggle();
    });
  }

  /* Anchor highlighting. aria-current is the single source of truth for the
     style, so the accessibility tree cannot drift from what is highlighted. */
  var links = [].slice.call(document.querySelectorAll(".doc-toc .wx-anchor__link"));
  if (links.length && "IntersectionObserver" in window) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var seen = {};
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { seen[entry.target.id] = entry.isIntersecting; });
      var active = null;
      Object.keys(byId).forEach(function (id) { if (seen[id] && !active) active = id; });
      links.forEach(function (a) { a.removeAttribute("aria-current"); });
      if (active && byId[active]) byId[active].setAttribute("aria-current", "true");
    }, { rootMargin: "-10% 0px -70% 0px" });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }
})();
