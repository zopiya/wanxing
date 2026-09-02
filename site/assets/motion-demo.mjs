const LEVEL_COPY = Object.freeze({
  E8: "E8 印刷静止：所有动作关闭，信息仍然完整。",
  "E9-0": "E9-0 静水：只保留必要的状态反馈。",
  "E9-1": "E9-1 春雨：有限入场帮助读者理解编排。",
  "E9-2": "E9-2 微澜：同一编排额外允许一处品牌呼吸。",
});

export function replayMotion(stage) {
  if (!stage || typeof stage.querySelectorAll !== "function") throw new TypeError("motion stage is required");
  const samples = [...stage.querySelectorAll("[data-motion-sample]")];
  samples.forEach((sample) => sample.classList.remove("wx-reveal"));
  void stage.offsetWidth;
  samples.forEach((sample) => sample.classList.add("wx-reveal"));
}

export function selectMotionLevel(stage, buttons, level, status) {
  if (!Object.hasOwn(LEVEL_COPY, level)) throw new RangeError(`unknown motion level: ${level}`);
  const choices = [...buttons];
  if (!choices.some((button) => button.getAttribute("data-motion-level") === level)) {
    throw new RangeError(`motion level is not available: ${level}`);
  }
  stage.setAttribute("data-motion", level);
  choices.forEach((button) => {
    const selected = button.getAttribute("data-motion-level") === level;
    button.setAttribute("aria-checked", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  replayMotion(stage);
  if (status) status.textContent = `当前为 ${LEVEL_COPY[level]}`;
}

export function toggleReducedMotion(stage, control, status) {
  const enabled = !stage.hasAttribute("data-motion-preview");
  if (enabled) stage.setAttribute("data-motion-preview", "reduced");
  else stage.removeAttribute("data-motion-preview");
  control.setAttribute("aria-pressed", String(enabled));
  if (status) {
    const level = stage.getAttribute("data-motion");
    status.textContent = enabled
      ? `减少动效预览已开启。当前为 ${LEVEL_COPY[level]}`
      : `减少动效预览已关闭。当前为 ${LEVEL_COPY[level]}`;
  }
  replayMotion(stage);
}

export function syncMotionActivity(stage, active) {
  if (active) stage.setAttribute("data-motion-active", "");
  else stage.removeAttribute("data-motion-active");
}

function initialize() {
  const stage = document.querySelector("[data-wx-motion-lab]");
  if (!stage) return;
  const buttons = [...stage.querySelectorAll("[data-motion-level]")];
  const replay = stage.querySelector("[data-motion-replay]");
  const reduced = stage.querySelector("[data-motion-reduced]");
  const status = stage.querySelector("[data-motion-status]");

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => selectMotionLevel(stage, buttons, button.getAttribute("data-motion-level"), status));
    button.addEventListener("keydown", (event) => {
      const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
      const backward = event.key === "ArrowLeft" || event.key === "ArrowUp";
      let next = index;
      if (forward) next = (index + 1) % buttons.length;
      if (backward) next = (index - 1 + buttons.length) % buttons.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = buttons.length - 1;
      const target = buttons[next];
      selectMotionLevel(stage, buttons, target.getAttribute("data-motion-level"), status);
      target.focus();
    });
  });
  replay?.addEventListener("click", () => {
    replayMotion(stage);
    if (status) status.textContent = `已重播。当前为 ${LEVEL_COPY[stage.getAttribute("data-motion")]}`;
  });
  reduced?.addEventListener("click", () => toggleReducedMotion(stage, reduced, status));

  let inView = true;
  const syncActivity = () => syncMotionActivity(stage, inView && !document.hidden);
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      inView = entries.some((entry) => entry.isIntersecting);
      syncActivity();
    }, { threshold: 0.05 });
    observer.observe(stage);
  }
  document.addEventListener("visibilitychange", syncActivity);
  syncActivity();
}

if (typeof document !== "undefined") initialize();
