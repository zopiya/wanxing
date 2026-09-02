/*
 * Page-local behaviour for the calendar documentation specimen. A button with
 * aria-pressed promises a selectable date, so this keeps the visible outline,
 * the accessibility state, and the spoken status in the same transaction.
 */
const daySelector = ".wx-calendar__day";

export function selectCalendarDay(calendar, day, status) {
  const days = [...calendar.querySelectorAll(daySelector)];
  if (!days.includes(day)) throw new Error("calendar selection must belong to this calendar");

  for (const candidate of days) candidate.setAttribute("aria-pressed", String(candidate === day));
  const label = day.getAttribute("aria-label") || day.textContent.trim();
  if (status) status.textContent = `已选择：${label}`;
}

export function initCalendarDemo(calendar) {
  const statusId = calendar.getAttribute("aria-describedby");
  const status = statusId
    ? calendar.ownerDocument.getElementById(statusId)
    : calendar.parentElement?.querySelector("[data-wx-calendar-status]");

  calendar.addEventListener("click", (event) => {
    const origin = event.target instanceof Element ? event.target : event.target.parentElement;
    const day = origin?.closest(daySelector);
    if (!day || !calendar.contains(day)) return;
    selectCalendarDay(calendar, day, status);
  });
}

if (typeof document !== "undefined") {
  const boot = () => document.querySelectorAll("[data-wx-calendar-demo]").forEach(initCalendarDemo);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
}
