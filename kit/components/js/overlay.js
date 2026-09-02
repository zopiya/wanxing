/**
 * overlay — modal, drawer, and toast wiring on top of native <dialog>.
 *
 *   <button data-wx-open="#confirm">Delete</button>
 *   <dialog id="confirm" class="wx-modal">
 *     <button data-wx-close>Cancel</button>
 *   </dialog>
 *
 * showModal() is what earns the focus trap, the inert background, the Esc
 * key, and the ::backdrop — all from the platform. We add only what the
 * platform does not give: returning focus to the trigger on close, and a
 * stable region that receives toast messages.
 *
 * Progressive enhancement: without this script the dialog stays closed and
 * the trigger does nothing visible. Never mark up a dialog as [open] to
 * compensate — a permanently open modal is worse than an absent one.
 */
(function () {
  "use strict";

  var lastTrigger = null;

  document.addEventListener("click", function (e) {
    var opener = e.target.closest("[data-wx-open]");
    if (opener) {
      var dialog = document.querySelector(opener.getAttribute("data-wx-open"));
      if (dialog && typeof dialog.showModal === "function") {
        e.preventDefault();
        lastTrigger = opener;
        dialog.showModal();
      }
      return;
    }
    var closer = e.target.closest("[data-wx-close]");
    if (closer) {
      var owner = closer.closest("dialog");
      if (owner) { e.preventDefault(); owner.close(); }
    }
  });

  /* Clicking the backdrop closes. The check is geometric because the click
     target for ::backdrop is the dialog element itself. */
  document.addEventListener("click", function (e) {
    if (e.target.tagName !== "DIALOG" || !e.target.open) return;
    var r = e.target.getBoundingClientRect();
    var outside = e.clientX < r.left || e.clientX > r.right ||
                  e.clientY < r.top  || e.clientY > r.bottom;
    if (outside) e.target.close();
  });

  document.addEventListener("close", function (e) {
    if (e.target.tagName !== "DIALOG") return;
    if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
    lastTrigger = null;
  }, true);

  /* The region has to exist before the first message is appended. Creating
     aria-live and its first child in one mutation can lose that first
     announcement in assistive technology. Keep this function idempotent so a
     consumer may also provide a region in its initial HTML. */
  function ensureToastRegion() {
    var region = document.querySelector(".wx-toast__region");
    if (!region) {
      region = document.createElement("div");
      region.className = "wx-toast__region";
      document.body.appendChild(region);
    }
    /* Polite, not assertive: a toast is never urgent enough to interrupt.
       Atomic keeps a labelled toast announced as one coherent message. */
    region.setAttribute("aria-live", "polite");
    region.setAttribute("aria-atomic", "true");
    return region;
  }

  ensureToastRegion();

  /**
   * wxToast(message, options) — append a toast to the stable live region.
   * options: { level: "success"|"warn"|"danger", label: string, ms: number }
   */
  window.wxToast = function (message, options) {
    var opts = options || {};
    var region = ensureToastRegion();
    var toast = document.createElement("output");
    toast.className = "wx-toast" + (opts.level ? " wx-toast--" + opts.level : "");
    if (opts.label) {
      var label = document.createElement("span");
      label.className = "wx-toast__label";
      label.textContent = opts.label;
      toast.appendChild(label);
    }
    toast.appendChild(document.createTextNode(message));
    region.appendChild(toast);

    var ms = typeof opts.ms === "number" ? opts.ms : 5000;
    setTimeout(function () { toast.remove(); }, ms);
    return toast;
  };
})();
