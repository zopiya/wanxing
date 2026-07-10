/**
 * Theme Manager — Dark mode support for Workbench shell.
 *
 * Three modes:
 *   - 'system': follows OS preference via prefers-color-scheme
 *   - 'light':  forced light
 *   - 'dark':   forced dark
 *
 * Persists preference in localStorage.
 * Applies [data-theme] on <html> for manual override,
 * or removes it to let @media (prefers-color-scheme) take effect.
 */

export type ThemePreference = 'system' | 'light' | 'dark'
export type ResolvedTheme = 'light' | 'dark'

const STORAGE_KEY = 'wanxing-theme'

let currentPreference: ThemePreference = 'system'
let resolvedTheme: ResolvedTheme = 'light'
const listeners: Array<(theme: ResolvedTheme) => void> = []

/** Read stored preference or default to 'system'. */
function loadPreference(): ThemePreference {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored
  }
  return 'system'
}

/** Resolve 'system' to actual light/dark based on OS preference. */
function resolveTheme(pref: ThemePreference): ResolvedTheme {
  if (pref === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  return pref
}

/** Apply theme to document. */
function applyTheme(pref: ThemePreference): void {
  const resolved = resolveTheme(pref)
  resolvedTheme = resolved

  // Add transition class for smooth color switch
  document.documentElement.classList.add('theme-transitioning')

  if (pref === 'system') {
    // Remove data-theme to let @media (prefers-color-scheme) work
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', resolved)
  }

  // Remove transition class after animation completes
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transitioning')
  }, 300) // slightly longer than --wenxin-duration-base (260ms)

  // Notify listeners
  for (const cb of listeners) {
    cb(resolved)
  }
}

/** Initialize theme manager. Call once at app startup. */
export function initTheme(): void {
  currentPreference = loadPreference()
  applyTheme(currentPreference)

  // Listen for OS preference changes when in system mode
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  mq.addEventListener('change', () => {
    if (currentPreference === 'system') {
      applyTheme('system')
    }
  })
}

/** Toggle through: system → light → dark → system. */
export function cycleTheme(): ThemePreference {
  if (currentPreference === 'system') {
    currentPreference = 'light'
  } else if (currentPreference === 'light') {
    currentPreference = 'dark'
  } else {
    currentPreference = 'system'
  }

  localStorage.setItem(STORAGE_KEY, currentPreference)
  applyTheme(currentPreference)
  return currentPreference
}

/** Set theme explicitly. */
export function setTheme(pref: ThemePreference): void {
  currentPreference = pref
  localStorage.setItem(STORAGE_KEY, pref)
  applyTheme(pref)
}

/** Get current preference (system/light/dark). */
export function getPreference(): ThemePreference {
  return currentPreference
}

/** Get resolved theme (light/dark). */
export function getResolvedTheme(): ResolvedTheme {
  return resolvedTheme
}

/** Subscribe to theme changes. Returns unsubscribe function. */
export function onThemeChange(
  cb: (theme: ResolvedTheme) => void,
): () => void {
  listeners.push(cb)
  return () => {
    const idx = listeners.indexOf(cb)
    if (idx >= 0) listeners.splice(idx, 1)
  }
}
