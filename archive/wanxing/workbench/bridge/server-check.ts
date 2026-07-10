/**
 * Server Check — Detects localhost service availability.
 *
 * Polls every 5 seconds and emits status changes.
 * Monitors both HTTP Server (port 8000) and OpenCode Serve (port 4096).
 *
 * Usage:
 *   const checker = createServerChecker()
 *   checker.on('status', (available) => { ... })
 *   checker.start()
 *   checker.stop()
 */

export type ServerStatus = 'checking' | 'available' | 'unavailable'

export interface ServiceStatus {
  name: string
  status: ServerStatus
}

export interface ServerChecker {
  start(): void
  stop(): void
  getStatus(): ServerStatus
  getServiceStatus(name: string): ServerStatus
  onStatusChange(callback: (status: ServerStatus) => void): void
  onServiceStatusChange(callback: (name: string, status: ServerStatus) => void): void
}

interface ServiceConfig {
  name: string
  url: string
  intervalMs: number
  timeoutMs: number
}

const SERVICES: ServiceConfig[] = [
  {
    name: 'http',
    url: 'http://localhost:8000',
    intervalMs: 5000,
    timeoutMs: 3000,
  },
  {
    name: 'opencode',
    url: 'http://localhost:4096/api/session',
    intervalMs: 5000,
    timeoutMs: 3000,
  },
]

/**
 * Create a server availability checker for localhost services.
 */
export function createServerChecker(): ServerChecker {
  const statuses = new Map<string, ServerStatus>()
  let overallStatus: ServerStatus = 'checking'
  let intervalIds: ReturnType<typeof setInterval>[] = []
  let statusCallback: ((status: ServerStatus) => void) | null = null
  let serviceCallback: ((name: string, status: ServerStatus) => void) | null = null

  // Initialize all statuses to 'checking'
  for (const svc of SERVICES) {
    statuses.set(svc.name, 'checking')
  }

  async function checkService(config: ServiceConfig): Promise<void> {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), config.timeoutMs)

      await fetch(config.url, {
        method: 'HEAD',
        signal: controller.signal,
        mode: 'no-cors',
      })

      clearTimeout(timeoutId)

      const newStatus: ServerStatus = 'available'
      const oldStatus = statuses.get(config.name)
      if (newStatus !== oldStatus) {
        statuses.set(config.name, newStatus)
        serviceCallback?.(config.name, newStatus)
        updateOverall()
      }
    } catch {
      const newStatus: ServerStatus = 'unavailable'
      const oldStatus = statuses.get(config.name)
      if (newStatus !== oldStatus) {
        statuses.set(config.name, newStatus)
        serviceCallback?.(config.name, newStatus)
        updateOverall()
      }
    }
  }

  function updateOverall(): void {
    // Overall is 'available' only if ALL services are available
    const allStatuses = Array.from(statuses.values())
    let newOverall: ServerStatus
    if (allStatuses.every((s) => s === 'available')) {
      newOverall = 'available'
    } else if (allStatuses.some((s) => s === 'unavailable')) {
      newOverall = 'unavailable'
    } else {
      newOverall = 'checking'
    }

    if (newOverall !== overallStatus) {
      overallStatus = newOverall
      statusCallback?.(overallStatus)
    }
  }

  return {
    start() {
      if (intervalIds.length > 0) return
      for (const svc of SERVICES) {
        checkService(svc) // Initial check
        intervalIds.push(setInterval(() => checkService(svc), svc.intervalMs))
      }
    },

    stop() {
      for (const id of intervalIds) {
        clearInterval(id)
      }
      intervalIds = []
    },

    getStatus() {
      return overallStatus
    },

    getServiceStatus(name: string): ServerStatus {
      return statuses.get(name) ?? 'checking'
    },

    onStatusChange(callback: (status: ServerStatus) => void) {
      statusCallback = callback
    },

    onServiceStatusChange(callback: (name: string, status: ServerStatus) => void) {
      serviceCallback = callback
    },
  }
}
