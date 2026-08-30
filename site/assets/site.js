/* Site chrome behaviour. Theme choice persists; the anchor list follows the
   heading actually on screen. Both are enhancements — the site is complete
   without either. */
(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.querySelector(".doc-topbar .wx-switch");
  var systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  var saved = null;
  try { saved = localStorage.getItem("wx-theme"); } catch (e) { /* private mode */ }
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  else saved = null;

  function isDark() {
    return root.getAttribute("data-theme") === "dark" ||
      (!root.hasAttribute("data-theme") && systemTheme.matches);
  }

  function syncToggle() {
    if (!toggle) return;
    var dark = isDark();
    toggle.setAttribute("aria-checked", String(dark));
    toggle.setAttribute("aria-label", dark ? "切换亮色模式" : "切换暗色模式");
  }

  /* Browser chrome is part of the theme too. Read the real token after CSS
     resolves instead of copying its hex value into HTML, where it would drift. */
  function syncThemeChrome() {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", getComputedStyle(root).getPropertyValue("--color-bg-warm").trim());
  }
  syncToggle();
  syncThemeChrome();

  if (toggle) {
    toggle.addEventListener("click", function () {
      var dark = this.getAttribute("aria-checked") !== "true";
      root.setAttribute("data-theme", dark ? "dark" : "light");
      try { localStorage.setItem("wx-theme", dark ? "dark" : "light"); } catch (e) { /* ignore */ }
      syncToggle();
      syncThemeChrome();
    });
  }

  function syncSystemTheme() {
    if (root.hasAttribute("data-theme")) return;
    syncToggle();
    syncThemeChrome();
  }
  if (typeof systemTheme.addEventListener === "function") systemTheme.addEventListener("change", syncSystemTheme);
  else if (typeof systemTheme.addListener === "function") systemTheme.addListener(syncSystemTheme);

  /* Anchor highlighting. aria-current is the single source of truth for the
     style, so the accessibility tree cannot drift from what is highlighted. */
  var links = [].slice.call(document.querySelectorAll(".doc-toc .wx-anchor__link"));
  if (links.length) {
    var headings = links.map(function (link) {
      return { link: link, target: document.getElementById(link.getAttribute("href").slice(1)) };
    }).filter(function (item) { return item.target; });
    var frame = null;
    function syncAnchor() {
      frame = null;
      var threshold = 112;
      var active = headings[0];
      headings.forEach(function (item) {
        if (item.target.getBoundingClientRect().top <= threshold) active = item;
      });
      links.forEach(function (link) { link.removeAttribute("aria-current"); });
      if (active) active.link.setAttribute("aria-current", "location");
    }
    function requestAnchorSync() {
      if (frame === null) frame = requestAnimationFrame(syncAnchor);
    }
    window.addEventListener("scroll", requestAnchorSync, { passive: true });
    window.addEventListener("resize", requestAnchorSync);
    requestAnchorSync();
  }

  /* A long navigation list is an independent reading context. Preserve that
     context across a same-site document jump rather than resetting it to top. */
  var sidebar = document.querySelector(".doc-sidebar");
  var sidebarKey = "wx-doc-sidebar-scroll";
  if (sidebar) {
    var savedSidebar = null;
    try { savedSidebar = sessionStorage.getItem(sidebarKey); } catch (e) { /* ignore */ }
    requestAnimationFrame(function () {
      if (savedSidebar !== null) {
        sidebar.scrollTop = Number(savedSidebar) || 0;
      } else {
        var current = sidebar.querySelector('[aria-current="page"]');
        if (current) current.scrollIntoView({ block: "nearest" });
      }
    });
    window.addEventListener("pagehide", function () {
      try { sessionStorage.setItem(sidebarKey, String(sidebar.scrollTop)); } catch (e) { /* ignore */ }
    });
  }
})();
