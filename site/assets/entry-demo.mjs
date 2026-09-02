/* Page-local behaviour for the entry documentation specimens. It deliberately
   does not become a kit default: adopters own their product state, while this
   page must not show controls that promise an interaction they do not have. */

export function toggleSwitch(control) {
  if (control.getAttribute("role") !== "switch") {
    throw new Error("entry demo switch must have role=switch");
  }
  const checked = control.getAttribute("aria-checked");
  if (checked !== "true" && checked !== "false") {
    throw new Error("entry demo switch must expose aria-checked");
  }
  const next = checked !== "true";
  control.setAttribute("aria-checked", String(next));
  return next;
}

export function syncSliderValue(slider, output) {
  if (!output) throw new Error("entry demo slider needs an output");
  const unit = slider.getAttribute("data-wx-unit") || "";
  const value = String(slider.value);
  output.textContent = unit ? `${value} ${unit}` : value;
  return output.textContent;
}

export function initEntryDemo(root = document) {
  root.querySelectorAll("[data-wx-entry-switch]").forEach((control) => {
    control.addEventListener("click", () => toggleSwitch(control));
  });

  root.querySelectorAll("[data-wx-entry-slider]").forEach((slider) => {
    const outputId = slider.getAttribute("data-wx-output");
    const output = outputId ? slider.ownerDocument.getElementById(outputId) : null;
    if (!output) throw new Error("entry demo slider output is missing");
    const sync = () => syncSliderValue(slider, output);
    sync();
    slider.addEventListener("input", sync);
  });
}

if (typeof document !== "undefined") {
  const boot = () => initEntryDemo(document);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
}
