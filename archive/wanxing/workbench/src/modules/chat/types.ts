/**
 * Chat Module — Shared types for the chat panel.
 */

export type MessageRole = 'user' | 'assistant' | 'system'

/** Screenshot info for Before/After comparison. */
export interface ScreenshotInfo {
  name: string
  path: string
  url: string
  mtime: number
}

/** Before/After comparison data embedded in a message. */
export interface BeforeAfterData {
  type: 'before-after'
  before: ScreenshotInfo
  after: ScreenshotInfo
  label?: string
}

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: string
  /** Before/After comparison data, if present. */
  comparison?: BeforeAfterData
  /** Internal flag for SSE streaming accumulation — not persisted. */
  _streaming?: boolean
}

/** Lightweight session info for the session list UI. */
export interface SessionListItem {
  id: string
  title: string
  updatedAt: number
}

export interface ChatState {
  messages: ChatMessage[]
  inputDisabled: boolean
  sessions: SessionListItem[]
  activeSessionId: string | null
}

export function createEmptyChatState(): ChatState {
  return {
    messages: [],
    inputDisabled: false,
    sessions: [],
    activeSessionId: null,
  }
}

export function generateMessageId(): string {
  return crypto.randomUUID()
}
