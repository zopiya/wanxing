/**
 * copy — the .wx-code__copy button.
 *
 * Confirmation is a word, not a colour change: the button briefly says so, and
 * an aria-live region announces it. A green tick alone would be invisible to a
 * screen reader and ambiguous to a colour-blind reader.
 */
(function () {
  "use strict";
  var live;

  function announce(msg) {
    if (!live) {
      live = document.createElement("div");
      live.className = "wx-sr-only";
      live.setAttribute("role", "status");
      live.setAttribute("aria-live", "polite");
      document.body.appendChild(live);
    }
    live.textContent = msg;
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".wx-code__copy");
    if (!btn) return;
    var block = btn.closest(".wx-code");
    var code = block && block.querySelector("code");
    if (!code || !navigator.clipboard) return;

    navigator.clipboard.writeText(code.innerText).then(
      function () {
        var original = btn.dataset.label || btn.textContent;
        btn.dataset.label = original;
        btn.textContent = btn.dataset.copied || "已复制";
        announce(btn.textContent);
        setTimeout(function () { btn.textContent = original; }, 2000);
      },
      function () { announce("复制失败"); }
    );
  });
})();
