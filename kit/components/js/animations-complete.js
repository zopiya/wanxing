/**
 * animations-complete — flips <html data-animations-complete> to "true" once
 * entrance motion has settled, so screenshot tooling, PDF export and the
 * renderer audit know the page has stopped moving.
 *
 * This used to be copy-pasted into every example and quoted in full inside the
 * spec, which meant nine copies of the safety timeout free to drift apart.
 * There is one copy now, and the spec links to it.
 *
 * The subtlety: getAnimations() only sees animations that have already been
 * triggered. A scroll-reveal below the fold has not started, so naively waiting
 * on getAnimations() would report "complete" while the page can still move.
 * Anything that animates later therefore registers a barrier here, and the
 * signal waits for the barriers too.
 */
(function () {
  "use strict";

  var root = document.documentElement;
  var SAFETY_MS = 3000;
  var settled = false;

  // Public barrier registry. reveal.js and any custom entrance effect add to it.
  var barriers = [];
  var motion = (window.__wxMotion = window.__wxMotion || {
    /** Register a promise that must settle before the page counts as still. */
    hold: function (promise) {
      barriers.push(Promise.resolve(promise).catch(function () {}));
    },
  });

  function finish() {
    if (settled) return;
    settled = true;
    root.setAttribute("data-animations-complete", "true");
    root.dispatchEvent(new CustomEvent("wx:animations-complete"));
  }

  function currentAnimations() {
    if (typeof document.getAnimations !== "function") return [];
    return document.getAnimations().filter(function (a) {
      // Infinite animations never finish. The brand mark's breathing loop is
      // the only sanctioned one, and waiting on it would hang forever.
      var d = a.effect && a.effect.getTiming ? a.effect.getTiming() : null;
      return !(d && d.iterations === Infinity);
    });
  }

  function settle() {
    var running = currentAnimations().map(function (a) {
      return a.finished.catch(function () {});
    });
    Promise.all(running.concat(barriers)).then(function () {
      // A barrier may have registered another one while we waited.
      if (barriers.length && !settled) {
        Promise.all(barriers.slice()).then(finish);
      } else {
        finish();
      }
    });
  }

  // Reduced motion means there is nothing to wait for.
  var reduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var still = root.getAttribute("data-motion") === "E8";

  if (reduced || still) {
    requestAnimationFrame(finish);
  } else {
    window.addEventListener("load", function () {
      requestAnimationFrame(function () { requestAnimationFrame(settle); });
    });
    // Never leave the flag false because one animation misbehaved.
    setTimeout(finish, SAFETY_MS);
  }

  motion.whenComplete = function (fn) {
    if (settled) fn();
    else root.addEventListener("wx:animations-complete", function () { fn(); }, { once: true });
  };
})();
