/**
 * toc — scroll spy for .wx-toc.
 *
 * Marks the active entry with aria-current, and the stylesheet keys off that
 * attribute. The visual state and the accessibility tree are therefore the same
 * fact, and cannot drift apart — which is the whole reason this system styles
 * state from ARIA rather than from an .is-active class.
 */
(function () {
  "use strict";
  var toc = document.querySelector(".wx-toc");
  if (!toc || typeof IntersectionObserver !== "function") return;

  var links = Array.prototype.slice.call(toc.querySelectorAll(".wx-toc__link[href^='#']"));
  if (!links.length) return;

  var byId = {};
  var headings = [];
  links.forEach(function (a) {
    var id = decodeURIComponent(a.getAttribute("href").slice(1));
    var h = document.getElementById(id);
    if (h) { byId[id] = a; headings.push(h); }
  });
  if (!headings.length) return;

  var visible = new Set();

  function mark(id) {
    links.forEach(function (a) { a.removeAttribute("aria-current"); });
    if (byId[id]) byId[id].setAttribute("aria-current", "location");
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) visible.add(e.target.id);
        else visible.delete(e.target.id);
      });
      // The topmost heading currently on screen wins.
      var first = headings.filter(function (h) { return visible.has(h.id); })[0];
      if (first) mark(first.id);
    },
    { rootMargin: "0px 0px -70% 0px", threshold: 0 }
  );
  headings.forEach(function (h) { io.observe(h); });
})();
