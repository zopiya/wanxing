/**
 * WebSocket Client — Connects to the Vite dev server WebSocket.
 *
 * Handles file change events and triggers UI updates.
 *
 * Usage:
 *   initWebSocket()  // Called once at app startup
 */

type MessageHandler = (payload: unknown) => void

const WS_URL = `ws://${window.location.host}/ws`
const RECONNECT_DELAY_MS = 3000

let ws: WebSocket | null = null
let reconnectTimeout: ReturnType<typeof setTimeout> | null = null

const handlers = new Map<string, Set<MessageHandler>>()

/**
 * Initialize WebSocket connection to the dev server.
 * Automatically reconnects on disconnection.
 */
export function initWebSocket(): void {
  connect()
}

/**
 * Register a handler for a specific message type.
 * Returns an unsubscribe function.
 */
export function onWSMessage(type: string, handler: MessageHandler): () => void {
  if (!handlers.has(type)) {
    handlers.set(type, new Set())
  }
  // At this point, handlers.get(type) is guaranteed non-null
  const set = handlers.get(type)
  if (set) set.add(handler)

  return () => {
    handlers.get(type)?.delete(handler)
  }
}

/**
 * Send a message to the WebSocket server.
 */
export function sendWSMessage(type: string, payload: unknown): void {
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type, payload }))
  }
}

function connect(): void {
  if (ws) {
    ws.close()
  }

  ws = new WebSocket(WS_URL)

  ws.onopen = () => {
    console.log('[WS] Connected')
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout)
      reconnectTimeout = null
    }
  }

  ws.onmessage = (event) => {
    try {
      const message: unknown = JSON.parse(event.data)
      if (typeof message !== 'object' || message === null) return
      const msg = message as { type?: string; payload?: unknown }
      if (typeof msg.type !== 'string') return
      const typeHandlers = handlers.get(msg.type)
      if (typeHandlers) {
        for (const handler of typeHandlers) {
          handler(msg.payload)
        }
      }
    } catch {
      console.warn('[WS] Failed to parse message:', event.data)
    }
  }

  ws.onclose = () => {
    console.log('[WS] Disconnected, reconnecting...')
    scheduleReconnect()
  }

  ws.onerror = (error) => {
    console.warn('[WS] Error:', error)
  }
}

function scheduleReconnect(): void {
  if (reconnectTimeout) return
  reconnectTimeout = setTimeout(() => {
    reconnectTimeout = null
    connect()
  }, RECONNECT_DELAY_MS)
}
