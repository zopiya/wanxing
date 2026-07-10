/**
 * Server Check Client — Monitors localhost service availability.
 *
 * Shows a warning banner when HTTP Server or OpenCode Serve is unavailable.
 * Updates the UI in real-time as service status changes.
 *
 * Usage:
 *   initServerChecker()  // Called once at app startup
 */

import { createServerChecker } from '../bridge/server-check'
import type { ServerStatus } from '../bridge/server-check'

let checker: ReturnType<typeof createServerChecker> | null = null
let bannerEl: HTMLElement | null = null

const SERVICE_LABELS: Record<string, string> = {
  http: 'HTTP Server (:8000)',
  opencode: 'OpenCode Serve (:4096)',
}

/**
 * Initialize server availability checker.
 * Creates a warning banner that shows/hides based on service status.
 */
export function initServerChecker(): void {
  checker = createServerChecker()

  checker.onServiceStatusChange((name, status) => {
    updateBanner()
  })

  checker.start()
}

/**
 * Get current server status.
 */
export function getServerStatus(): ServerStatus {
  return checker?.getStatus() ?? 'checking'
}

/**
 * Get status of a specific service.
 */
export function getServiceStatus(name: string): ServerStatus {
  return checker?.getServiceStatus(name) ?? 'checking'
}

function updateBanner(): void {
  if (!checker) return

  const httpStatus = checker.getServiceStatus('http')
  const ocStatus = checker.getServiceStatus('opencode')

  // If both available, hide banner
  if (httpStatus === 'available' && ocStatus === 'available') {
    hideBanner()
    return
  }

  // Build status message
  const parts: string[] = []
  if (httpStatus === 'unavailable') {
    parts.push(SERVICE_LABELS.http + ' 不可用')
  }
  if (ocStatus === 'unavailable') {
    parts.push(SERVICE_LABELS.opencode + ' 不可用')
  }
  if (httpStatus === 'checking' || ocStatus === 'checking') {
    parts.push('正在检测服务...')
  }

  showBanner(parts.join(' · '))
}

function showBanner(message: string): void {
  if (bannerEl) {
    bannerEl.textContent = message
    return
  }

  bannerEl = document.createElement('div')
  bannerEl.className = 'server-status-banner'
  bannerEl.setAttribute('role', 'status')
  bannerEl.setAttribute('aria-live', 'polite')
  bannerEl.textContent = message

  // Insert at top of shell
  const shell = document.querySelector('.workbench-shell')
  if (shell) {
    shell.insertBefore(bannerEl, shell.firstChild)
  }
}

function hideBanner(): void {
  if (bannerEl) {
    bannerEl.remove()
    bannerEl = null
  }
}
