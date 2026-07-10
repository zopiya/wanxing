/**
 * SSE Stream — Subscribe to OpenCode server-sent events.
 *
 * Uses the OpenCode SDK's `event.subscribe()` to stream events from the server.
 * Handles `EventMessagePartUpdated` (agent text output) and `EventFileEdited`
 * (file changes) events, with automatic reconnection on disconnect.
 *
 * Public API:
 *   startSSE()   — begin streaming events (idempotent)
 *   stopSSE()    — tear down the connection and cancel reconnect
 *   isSSEConnected() — check current connection state
 */

import { client } from '../opencode/client'
import type { Event, EventMessagePartUpdated, EventFileEdited } from '@opencode-ai/sdk'

// --- Configuration ---

const BASE_DELAY_MS = 1_000
const MAX_DELAY_MS = 30_000
const MAX_RETRY_ATTEMPTS = 10

// --- State ---

let active = false
let controller: AbortController | null = null
let retryCount = 0
let retryTimer: ReturnType<typeof setTimeout> | null = null
let connected = false

// --- Callbacks ---

type MessagePartCallback = (event: EventMessagePartUpdated) => void
type FileEditedCallback = (event: EventFileEdited) => void
type ConnectionCallback = (connected: boolean) => void

const onMessagePartCallbacks = new Set<MessagePartCallback>()
const onFileEditedCallbacks = new Set<FileEditedCallback>()
const onConnectionCallbacks = new Set<ConnectionCallback>()

export function onMessagePart(cb: MessagePartCallback): () => void {
  onMessagePartCallbacks.add(cb)
  return () => onMessagePartCallbacks.delete(cb)
}

export function onFileEdited(cb: FileEditedCallback): () => void {
  onFileEditedCallbacks.add(cb)
  return () => onFileEditedCallbacks.delete(cb)
}

export function onConnectionChange(cb: ConnectionCallback): () => void {
  onConnectionCallbacks.add(cb)
  return () => onConnectionCallbacks.delete(cb)
}

function setConnected(value: boolean): void {
  if (connected === value) return
  connected = value
  for (const cb of onConnectionCallbacks) {
    try { cb(value) } catch { /* swallow */ }
  }
}

// --- SSE loop ---

/**
 * Start the SSE event stream. Idempotent — calling while already active is a no-op.
 */
export async function startSSE(): Promise<void> {
  if (active) return
  active = true
  retryCount = 0
  await connect()
}

/**
 * Stop the SSE event stream and cancel any pending reconnect.
 */
export function stopSSE(): void {
  active = false
  if (controller) {
    controller.abort()
    controller = null
  }
  if (retryTimer !== null) {
    clearTimeout(retryTimer)
    retryTimer = null
  }
  setConnected(false)
}

/**
 * Whether the SSE stream is currently connected.
 */
export function isSSEConnected(): boolean {
  return connected
}

async function connect(): Promise<void> {
  if (!active) return

  controller = new AbortController()
  const { signal } = controller

  try {
    const result = await client.event.subscribe()

    setConnected(true)
    retryCount = 0

    for await (const event of result.stream) {
      if (!active || signal.aborted) break
      handleEvent(event)
    }
  } catch (err: unknown) {
    // AbortError means we intentionally stopped
    if (err instanceof DOMException && err.name === 'AbortError') return

    setConnected(false)

    if (active) {
      scheduleReconnect()
    }
  }
}

function handleEvent(event: Event): void {
  switch (event.type) {
    case 'message.part.updated':
      for (const cb of onMessagePartCallbacks) {
        try { cb(event as EventMessagePartUpdated) } catch { /* swallow */ }
      }
      break

    case 'file.edited':
      for (const cb of onFileEditedCallbacks) {
        try { cb(event as EventFileEdited) } catch { /* swallow */ }
      }
      break

    // Other events are silently ignored for now
  }
}

function scheduleReconnect(): void {
  if (!active) return
  if (retryCount >= MAX_RETRY_ATTEMPTS) {
    console.warn('[SSE] Max retry attempts reached, giving up.')
    return
  }

  const delay = Math.min(BASE_DELAY_MS * 2 ** retryCount, MAX_DELAY_MS)
  retryCount++

  console.warn(`[SSE] Reconnecting in ${delay}ms (attempt ${retryCount})...`)

  retryTimer = setTimeout(() => {
    retryTimer = null
    if (active) connect()
  }, delay)
}
