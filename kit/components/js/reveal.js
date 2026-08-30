/**
 * reveal — entrance animation on scroll for [data-reveal].
 *
 * Progressive enhancement: without JS the elements are simply visible. The
 * script adds the hidden state itself, so a failed script can never leave
 * content permanently invisible — the single worst failure mode for this
 * pattern, and the reason it is done this way round.
 *
 * Registers a barrier with animations-complete for the above-the-fold elements
 * only. Waiting for reveals the reader has not scrolled to would mean the page
 * never reports itself still.
 */
(function () {
  "use strict";

  var root = document.documentElement;
  if (root.getAttribute("data-motion") === "E8") return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (typeof IntersectionObserver !== "function") return;

  var targets = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  if (!targets.length) return;

  targets.forEach(function (el) { el.setAttribute("data-reveal-pending", ""); });

  // Only elements already in view gate the completion signal.
  var aboveFold = targets.filter(function (el) {
    var r = el.getBoundingClientRect();
    return r.top < window.innerHeight;
  });
  var pending = aboveFold.length;
  var release;
  if (pending && window.__wxMotion) {
    window.__wxMotion.hold(new Promise(function (res) { release = res; }));
  }

  function shown(el) {
    el.removeAttribute("data-reveal-pending");
    if (aboveFold.indexOf(el) === -1) return;
    if (--pending <= 0 && release) release();
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        e.target.classList.add("wx-reveal");
        var done = e.target.getAnimations ? e.target.getAnimations() : [];
        if (done.length) {
          Promise.all(done.map(function (a) { return a.finished.catch(function () {}); }))
            .then(function () { shown(e.target); });
        } else {
          shown(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
  );

  targets.forEach(function (el) { io.observe(el); });

  // If something goes wrong, release the barrier rather than hanging the signal.
  setTimeout(function () { if (release) release(); }, 2000);
})();
