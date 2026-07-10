/**
 * Error Module — Centralized error state and recovery UI.
 *
 * Provides:
 *   - Error state tracking with severity levels
 *   - User-facing error banner with retry action
 *   - Auto-dismiss for transient errors
 *   - Integration with classifyError for smart recovery
 *
 * Public API:
 *   initErrorModule(container)   — mount error banner in the given container
 *   reportError(error, context)  — report an error with optional retry callback
 *   clearErrors()                — dismiss all active errors
 *   getActiveErrors()            — read current error state
 */

import { classifyError } from '../../lib/errors'
import type { ClassifiedError, ErrorKind } from '../../lib/errors'

// --- Error Entry ---

export interface ErrorEntry {
  id: string
  classified: ClassifiedError
  context?: string
  timestamp: number
  retryFn?: () => Promise<void>
  dismissed: boolean
}

// --- State ---

const errors = new Map<string, ErrorEntry>()
let bannerContainer: HTMLElement | null = null
let bannerEl: HTMLElement | null = null

// Auto-dismiss timeout for transient errors (30s)
const AUTO_DISMISS_MS = 30_000

// --- Public API ---

/**
 * Initialize the error module. Mounts the error banner container.
 */
export function initErrorModule(container: HTMLElement): void {
  destroyErrorModule()
  bannerContainer = document.createElement('div')
  bannerContainer.className = 'error-banner-container'
  bannerContainer.setAttribute('role', 'alert')
  bannerContainer.setAttribute('aria-live', 'assertive')
  container.appendChild(bannerContainer)
}

/**
 * Destroy the error module and clean up.
 */
export function destroyErrorModule(): void {
  if (bannerContainer) {
    bannerContainer.remove()
    bannerContainer = null
  }
  bannerEl = null
  errors.clear()
}

/**
 * Report an error. Classifies it and shows a banner if appropriate.
 *
 * @param err - The raw error
 * @param context - Human-readable context (e.g., "加载会话列表")
 * @param retryFn - Optional function to retry the failed operation
 */
export function reportError(
  err: unknown,
  context?: string,
  retryFn?: () => Promise<void>,
): string {
  const classified = classifyError(err)
  const id = crypto.randomUUID()

  const entry: ErrorEntry = {
    id,
    classified,
    context,
    timestamp: Date.now(),
    retryFn,
    dismissed: false,
  }

  errors.set(id, entry)

  // Don't show banner for abort errors
  if (classified.kind !== 'abort') {
    renderBanner()
  }

  // Auto-dismiss retryable errors after timeout
  if (classified.retryable) {
    setTimeout(() => {
      dismissError(id)
    }, AUTO_DISMISS_MS)
  }

  return id
}

/**
 * Dismiss a specific error by ID.
 */
export function dismissError(id: string): void {
  const entry = errors.get(id)
  if (entry) {
    entry.dismissed = true
    errors.delete(id)
    renderBanner()
  }
}

/**
 * Clear all active errors.
 */
export function clearErrors(): void {
  errors.clear()
  renderBanner()
}

/**
 * Get all active (non-dismissed) errors.
 */
export function getActiveErrors(): ErrorEntry[] {
  return Array.from(errors.values()).filter((e) => !e.dismissed)
}

/**
 * Whether there are any active errors.
 */
export function hasActiveErrors(): boolean {
  return getActiveErrors().length > 0
}

// --- Banner Rendering ---

function renderBanner(): void {
  if (!bannerContainer) return

  const activeErrors = getActiveErrors()

  if (activeErrors.length === 0) {
    if (bannerEl) {
      bannerEl.remove()
      bannerEl = null
    }
    return
  }

  // Show the most recent error
  const latest = activeErrors[activeErrors.length - 1]

  if (!bannerEl) {
    bannerEl = document.createElement('div')
    bannerEl.className = 'error-banner'
    bannerContainer.appendChild(bannerEl)
  }

  const icon = getErrorIcon(latest.classified.kind)
  const contextText = latest.context ? `${latest.context}：` : ''
  const message = `${icon} ${contextText}${latest.classified.message}`

  bannerEl.innerHTML = ''

  // Message text
  const msgEl = document.createElement('span')
  msgEl.className = 'error-banner-message'
  msgEl.textContent = message
  bannerEl.appendChild(msgEl)

  // Action buttons
  const actions = document.createElement('div')
  actions.className = 'error-banner-actions'

  // Retry button (if retryable and retryFn exists)
  if (latest.classified.retryable && latest.retryFn) {
    const retryBtn = document.createElement('button')
    retryBtn.className = 'error-banner-btn error-banner-retry'
    retryBtn.textContent = '重试'
    retryBtn.setAttribute('aria-label', '重试失败的操作')
    retryBtn.addEventListener('click', async () => {
      retryBtn.disabled = true
      retryBtn.textContent = '重试中…'
      try {
        await latest.retryFn?.()
        dismissError(latest.id)
      } catch (retryErr) {
        // Update the banner with the new error
        latest.classified = classifyError(retryErr)
        latest.timestamp = Date.now()
        renderBanner()
      }
    })
    actions.appendChild(retryBtn)
  }

  // Dismiss button
  const dismissBtn = document.createElement('button')
  dismissBtn.className = 'error-banner-btn error-banner-dismiss'
  dismissBtn.textContent = '✕'
  dismissBtn.setAttribute('aria-label', '关闭错误提示')
  dismissBtn.addEventListener('click', () => {
    dismissError(latest.id)
  })
  actions.appendChild(dismissBtn)

  bannerEl.appendChild(actions)

  // Show count if multiple errors
  if (activeErrors.length > 1) {
    const countEl = document.createElement('span')
    countEl.className = 'error-banner-count'
    countEl.textContent = `${activeErrors.length} 个错误`
    bannerEl.appendChild(countEl)
  }
}

function getErrorIcon(kind: ErrorKind): string {
  switch (kind) {
    case 'network':
      return '⚡'
    case 'api':
      return '⚠'
    case 'timeout':
      return '⏱'
    default:
      return '✕'
  }
}
