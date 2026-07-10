/**
 * Chat Message Persistence — localStorage wrapper.
 *
 * Stores messages per session in localStorage.
 * Key format: `wanxing-chat-messages:<sessionId>`
 *
 * Messages with `_streaming: true` are excluded from persistence.
 */

import type { ChatMessage } from './types'

const STORAGE_PREFIX = 'wanxing-chat-messages:'

function getStorageKey(sessionId: string): string {
  return `${STORAGE_PREFIX}${sessionId}`
}

/**
 * Save messages for a session to localStorage.
 * Filters out streaming messages.
 */
export function saveMessages(sessionId: string, messages: ChatMessage[]): void {
  try {
    const toSave = messages.filter((m) => !m._streaming)
    localStorage.setItem(getStorageKey(sessionId), JSON.stringify(toSave))
  } catch (err) {
    console.warn('[persistence] Failed to save messages:', err)
  }
}

/**
 * Load messages for a session from localStorage.
 * Returns empty array if nothing stored or on error.
 */
export function loadMessages(sessionId: string): ChatMessage[] {
  try {
    const raw = localStorage.getItem(getStorageKey(sessionId))
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as ChatMessage[]
  } catch (err) {
    console.warn('[persistence] Failed to load messages:', err)
    return []
  }
}

/**
 * Clear messages for a specific session.
 */
export function clearMessages(sessionId: string): void {
  try {
    localStorage.removeItem(getStorageKey(sessionId))
  } catch (err) {
    console.warn('[persistence] Failed to clear messages:', err)
  }
}

/**
 * Get all stored session IDs that have persisted messages.
 */
export function getStoredSessionIds(): string[] {
  const ids: string[] = []
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(STORAGE_PREFIX)) {
        ids.push(key.slice(STORAGE_PREFIX.length))
      }
    }
  } catch (err) {
    console.warn('[persistence] Failed to list stored sessions:', err)
  }
  return ids
}

const SESSION_KEY = 'wanxing-active-session'

export function saveActiveSession(sessionId: string | null): void {
  try {
    if (sessionId) {
      localStorage.setItem(SESSION_KEY, sessionId)
    } else {
      localStorage.removeItem(SESSION_KEY)
    }
  } catch (err) {
    console.warn('[persistence] Failed to save active session:', err)
  }
}

export function loadActiveSession(): string | null {
  try {
    return localStorage.getItem(SESSION_KEY)
  } catch {
    return null
  }
}
