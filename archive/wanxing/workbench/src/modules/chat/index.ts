/**
 * Chat Module — Collapsible panel with message area and input.
 *
 * Public API:
 *   initChat(container)    — mount chat panel in the given container
 *   destroyChat()          — unmount and clean up
 *   toggleChat()           — toggle collapsed state
 *   sendMessage(content)   — add a user message to the chat and send to OpenCode
 *   getChatState()         — read current state
 *   loadSessions()         — fetch sessions internally (no UI)
 */

import type { ChatMessage, ChatState } from './types'
import { createEmptyChatState, generateMessageId } from './types'
import { client, apiCall } from '../opencode/client'
import {
  startSSE,
  stopSSE,
  onMessagePart,
  onFileEdited,
  onConnectionChange,
} from './sse-stream'
import {
  createMessageContent,
  updateStreamingContent,
  finalizeStreaming,
} from './message-area'
import type { EventMessagePartUpdated, EventFileEdited } from '@opencode-ai/sdk'
import { saveMessages, loadMessages, saveActiveSession, loadActiveSession } from './persistence'

// --- Sending state ---

let sending = false

// --- SSE debounced updates ---

/** 16ms debounce for SSE streaming updates — one animation frame per batch. */
let sseUpdatePending = false
let sseUpdateRaf: number | null = null

/**
 * Schedule a DOM update for the current streaming message.
 * Coalesces rapid SSE events into a single rAF paint.
 */
function scheduleSSEUpdate(): void {
  if (sseUpdatePending) return
  sseUpdatePending = true
  sseUpdateRaf = requestAnimationFrame(() => {
    sseUpdatePending = false
    sseUpdateRaf = null
    applyPendingSSEUpdate()
  })
}

/** Apply the pending streaming message update to the DOM. */
function applyPendingSSEUpdate(): void {
  if (!messagesEl) return
  const last = state.messages[state.messages.length - 1]
  if (!last || last.role !== 'assistant' || !last._streaming) return

  const wrapper = messagesEl.querySelector(`[data-message-id="${last.id}"]`) as HTMLElement | null
  if (wrapper) updateStreamingContent(wrapper, last.content)
  scrollToBottom()
}

/** Flush any pending SSE update immediately (used on destroy). */
function flushPendingSSEUpdate(): void {
  if (sseUpdateRaf !== null) {
    cancelAnimationFrame(sseUpdateRaf)
    sseUpdateRaf = null
  }
  if (sseUpdatePending) {
    sseUpdatePending = false
    applyPendingSSEUpdate()
  }
}

// --- SSE unsubscribers ---

let unsubSSE: Array<() => void> = []

// --- Singleton state ---

let panelContainer: HTMLDivElement | null = null
let messagesEl: HTMLDivElement | null = null
let inputEl: HTMLTextAreaElement | null = null
let toggleLabel: HTMLSpanElement | null = null
let connectionDotEl: HTMLElement | null = null
let annotationContextEl: HTMLElement | null = null
let state: ChatState = createEmptyChatState()
let collapsed = false

// --- SSE event handlers ---

/**
 * Accumulate text from SSE `message.part.updated` events into an assistant message.
 *
 * For each text part update, either append to the last assistant message (if it
 * was also triggered by an SSE event) or create a new assistant message.
 */
function handleSSEMessagePart(event: EventMessagePartUpdated): void {
  const props = event.properties as { sessionID?: string; part?: { type: string; text?: string } }
  const { sessionID, part } = props

  // Only process text parts for the active session
  if (!part || part.type !== 'text') return
  if (sessionID !== state.activeSessionId) return

  const text = part.text
  if (!text) return

  // Try to append to the last assistant message (streaming accumulation)
  const last = state.messages[state.messages.length - 1]
  if (last && last.role === 'assistant' && last._streaming) {
    last.content += text
    // Debounced DOM update — coalesce rapid SSE events into one rAF paint
    scheduleSSEUpdate()
    return
  }

  // Otherwise create a new assistant message
  const msg: ChatMessage = {
    id: generateMessageId(),
    role: 'assistant',
    content: text,
    timestamp: new Date().toISOString(),
    _streaming: true,
  }
  state.messages.push(msg)

  if (messagesEl?.querySelector('.chat-messages-empty')) {
    messagesEl.innerHTML = ''
  }
  messagesEl?.appendChild(renderMessage(msg))
  scrollToBottom()
}

function handleSSEFileEdited(event: EventFileEdited): void {
  console.log('[SSE] File edited:', event.properties.file)
}

function handleSSEConnectionChange(isConnected: boolean): void {
  console.log('[SSE] Connection:', isConnected ? 'connected' : 'disconnected')
  updateConnectionDot(isConnected)
}

function updateConnectionDot(connected: boolean): void {
  if (!connectionDotEl) {
    connectionDotEl = document.getElementById('chat-connection-dot')
  }
  if (!connectionDotEl) return
  connectionDotEl.className = 'chat-connection-dot ' + (connected ? 'connected' : 'disconnected')
  connectionDotEl.title = connected ? '已连接' : '已断开'

  // Add/remove reconnect button
  const header = connectionDotEl.parentElement
  if (!header) return
  let reconnectBtn = header.querySelector('.chat-reconnect-btn') as HTMLButtonElement | null

  if (!connected && !reconnectBtn) {
    reconnectBtn = document.createElement('button')
    reconnectBtn.className = 'wenxin-btn chat-reconnect-btn'
    reconnectBtn.textContent = '重连'
    reconnectBtn.title = '重新连接 OpenCode Serve'
    reconnectBtn.addEventListener('click', () => {
      reconnectBtn!.disabled = true
      reconnectBtn!.textContent = '重连中...'
      import('./sse-stream').then(({ startSSE, stopSSE }) => {
        stopSSE()
        setTimeout(() => startSSE(), 500)
      })
    })
    header.appendChild(reconnectBtn)
  } else if (connected && reconnectBtn) {
    reconnectBtn.remove()
  }
}

// --- DOM builders ---

function createChatShell(container: HTMLElement): HTMLDivElement {
  const panel = document.createElement('div')
  panel.className = 'chat-panel'

  // Header (clickable to toggle collapse)
  const header = document.createElement('div')
  header.className = 'chat-header'
  header.setAttribute('role', 'button')
  header.setAttribute('aria-label', '折叠/展开 Chat 面板')
  header.setAttribute('tabindex', '0')

  const title = document.createElement('span')
  title.className = 'chat-header-title'
  title.textContent = 'Chat'
  header.appendChild(title)

  const connectionDot = document.createElement('span')
  connectionDot.className = 'chat-connection-dot'
  connectionDot.id = 'chat-connection-dot'
  connectionDot.title = '检查连接状态...'
  header.appendChild(connectionDot)

  toggleLabel = document.createElement('span')
  toggleLabel.className = 'chat-header-toggle'
  toggleLabel.textContent = '▾'
  header.appendChild(toggleLabel)

  header.addEventListener('click', toggleChat)
  header.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleChat()
    }
  })
  panel.appendChild(header)

  // Messages area
  messagesEl = document.createElement('div')
  messagesEl.className = 'chat-messages'
  const emptyHint = document.createElement('div')
  emptyHint.className = 'chat-messages-empty'
  emptyHint.textContent = '暂无消息'
  messagesEl.appendChild(emptyHint)
  panel.appendChild(messagesEl)

  // Input area
  const inputArea = document.createElement('div')
  inputArea.className = 'chat-input-area'

  // Annotation context indicator (hidden by default)
  annotationContextEl = document.createElement('div')
  annotationContextEl.className = 'chat-annotation-context'
  inputArea.appendChild(annotationContextEl)

  const inputRow = document.createElement('div')
  inputRow.className = 'chat-input-row'

  inputEl = document.createElement('textarea')
  inputEl.className = 'chat-input'
  inputEl.placeholder = '输入消息…'
  inputEl.rows = 1
  inputEl.setAttribute('aria-label', 'Chat 输入框')
  inputEl.addEventListener('input', autoResize)
  inputEl.addEventListener('keydown', handleInputKeydown)
  inputRow.appendChild(inputEl)

  const sendBtn = document.createElement('button')
  sendBtn.className = 'wenxin-btn chat-send-btn'
  sendBtn.textContent = '发送'
  sendBtn.setAttribute('aria-label', '发送消息')
  sendBtn.addEventListener('click', handleSend)
  inputRow.appendChild(sendBtn)

  inputArea.appendChild(inputRow)
  panel.appendChild(inputArea)

  container.appendChild(panel)
  return panel
}

// --- Event handlers ---

function autoResize(): void {
  if (!inputEl) return
  inputEl.style.height = 'auto'
  inputEl.style.height = Math.min(inputEl.scrollHeight, 128) + 'px'
}

function handleInputKeydown(e: KeyboardEvent): void {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

function handleSend(): void {
  if (!inputEl || sending) return
  const content = inputEl.value.trim()
  if (!content) return
  
  // "new" command — create a fresh session
  if (content === 'new') {
    handleNewSession()
    inputEl.value = ''
    autoResize()
    return
  }
  
  sendMessage(content)
  inputEl.value = ''
  autoResize()
}

/**
 * Create a new session, clearing the message area.
 */
function handleNewSession(): void {
  saveActiveSession(null)
  state.activeSessionId = null
  state.messages = []
  if (messagesEl) {
    messagesEl.innerHTML = ''
    const emptyHint = document.createElement('div')
    emptyHint.className = 'chat-messages-empty'
    emptyHint.textContent = '暂无消息'
    messagesEl.appendChild(emptyHint)
  }
  // Next sendMessage will auto-create a session
}

function setInputDisabled(disabled: boolean): void {
  if (inputEl) {
    inputEl.disabled = disabled
  }
  const sendBtn = panelContainer?.querySelector<HTMLButtonElement>('.chat-send-btn')
  if (sendBtn) {
    sendBtn.disabled = disabled
    sendBtn.textContent = disabled ? '发送中…' : '发送'
  }
}

// --- Rendering ---

function renderMessage(msg: ChatMessage): HTMLDivElement {
  const wrapper = document.createElement('div')
  wrapper.className = `chat-message chat-message--${msg.role}`
  wrapper.dataset.messageId = msg.id

  wrapper.appendChild(createMessageContent(msg))

  const time = document.createElement('span')
  time.className = 'chat-message-time'
  time.textContent = formatTime(msg.timestamp)
  wrapper.appendChild(time)

  return wrapper
}

/** Threshold above which lazy loading kicks in. */
const LAZY_LOAD_THRESHOLD = 100
/** Number of messages to render initially when lazy loading. */
const LAZY_INITIAL_COUNT = 50
/** Number of older messages to prepend when scrolling to top. */
const LAZY_LOAD_BATCH = 30

let lazyObserver: IntersectionObserver | null = null
let lazySentinel: HTMLDivElement | null = null

/**
 * Render messages with lazy loading for large histories.
 * When message count exceeds LAZY_LOAD_THRESHOLD, only the most recent
 * LAZY_INITIAL_COUNT messages are rendered; older ones load on scroll-up.
 */
function renderAllMessages(): void {
  if (!messagesEl) return
  messagesEl.innerHTML = ''
  cleanupLazyLoading()

  if (state.messages.length === 0) {
    const emptyHint = document.createElement('div')
    emptyHint.className = 'chat-messages-empty'
    emptyHint.textContent = '暂无消息'
    messagesEl.appendChild(emptyHint)
    return
  }

  if (state.messages.length <= LAZY_LOAD_THRESHOLD) {
    // Small history — render all (original behavior)
    for (const msg of state.messages) {
      messagesEl.appendChild(renderMessage(msg))
    }
  } else {
    // Large history — lazy load older messages
    const startIndex = state.messages.length - LAZY_INITIAL_COUNT

    // Sentinel for triggering older message loads
    lazySentinel = document.createElement('div')
    lazySentinel.className = 'chat-lazy-sentinel'
    lazySentinel.setAttribute('aria-hidden', 'true')
    messagesEl.appendChild(lazySentinel)

    // Render the most recent batch
    for (let i = startIndex; i < state.messages.length; i++) {
      messagesEl.appendChild(renderMessage(state.messages[i]))
    }

    // Observe the sentinel — when it scrolls into view, prepend older messages
    lazyObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          prependOlderMessages()
        }
      },
      { root: messagesEl, threshold: 0.1 },
    )
    lazyObserver.observe(lazySentinel)
  }

  scrollToBottom()
}

/**
 * Prepend older messages when the sentinel scrolls into view.
 */
function prependOlderMessages(): void {
  if (!messagesEl || !lazySentinel) return

  // Calculate how many messages are already rendered
  const renderedCount = messagesEl.querySelectorAll('.chat-message').length
  const totalMessages = state.messages.length
  const alreadyRendered = totalMessages - renderedCount

  if (alreadyRendered <= 0) {
    // All messages loaded — remove sentinel and observer
    cleanupLazyLoading()
    return
  }

  // Preserve scroll position
  const prevScrollHeight = messagesEl.scrollHeight

  // Determine the batch to prepend
  const batchStart = Math.max(0, alreadyRendered - LAZY_LOAD_BATCH)
  const batchEnd = alreadyRendered

  // Insert before the sentinel
  const fragment = document.createDocumentFragment()
  for (let i = batchStart; i < batchEnd; i++) {
    fragment.appendChild(renderMessage(state.messages[i]))
  }
  messagesEl.insertBefore(fragment, lazySentinel)

  // Restore scroll position so the user doesn't jump
  const newScrollHeight = messagesEl.scrollHeight
  messagesEl.scrollTop += newScrollHeight - prevScrollHeight

  // If all messages are now rendered, clean up
  if (batchStart === 0) {
    cleanupLazyLoading()
  }
}

/** Remove lazy loading observer and sentinel. */
function cleanupLazyLoading(): void {
  if (lazyObserver) {
    lazyObserver.disconnect()
    lazyObserver = null
  }
  if (lazySentinel) {
    lazySentinel.remove()
    lazySentinel = null
  }
}

function scrollToBottom(): void {
  if (!messagesEl) return
  messagesEl.scrollTop = messagesEl.scrollHeight
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

// --- Session management (internal) ---

/**
 * Fetch sessions from the OpenCode SDK.
 * Keeps session data for internal use; no UI rendering.
 */
export async function loadSessions(): Promise<void> {
  try {
    const response = await apiCall(() => client.session.list(), '加载会话列表')
    const sessions = response.data ?? []
    state.sessions = sessions.map((s) => ({
      id: s.id,
      title: s.title || '未命名会话',
      updatedAt: s.time?.updated ?? s.time?.created ?? Date.now(),
    }))
    state.sessions.sort((a, b) => b.updatedAt - a.updatedAt)

    // Auto-select most recent session if none active
    if (state.sessions.length > 0 && !state.activeSessionId) {
      state.activeSessionId = state.sessions[0].id
      state.messages = loadMessages(state.activeSessionId)
      renderAllMessages()
    }
  } catch (err) {
    console.error('Failed to load sessions:', err)
  }
}

// --- Public API ---

/**
 * Mount chat panel in the given container.
 */
export function initChat(container: HTMLElement): void {
  destroyChat()
  state = createEmptyChatState()
  collapsed = false
  panelContainer = createChatShell(container)
  connectionDotEl = document.getElementById('chat-connection-dot')
  renderAllMessages()
  loadSessions()

  // Restore persisted session
  const savedSessionId = loadActiveSession()
  if (savedSessionId && !state.activeSessionId) {
    state.activeSessionId = savedSessionId
    state.messages = loadMessages(savedSessionId)
    renderAllMessages()
  }

  // Register SSE event handlers and start streaming
  unsubSSE = [
    onMessagePart(handleSSEMessagePart),
    onFileEdited(handleSSEFileEdited),
    onConnectionChange(handleSSEConnectionChange),
  ]
  startSSE()
}

/**
 * Destroy the current chat panel and clean up.
 */
export function destroyChat(): void {
  sending = false

  // Stop SSE and unsubscribe event handlers
  stopSSE()
  for (const unsub of unsubSSE) unsub()
  unsubSSE = []

  // Clean up lazy loading observer
  cleanupLazyLoading()
  // Flush any pending debounced SSE updates
  flushPendingSSEUpdate()

  if (panelContainer) {
    panelContainer.remove()
    panelContainer = null
  }
  messagesEl = null
  inputEl = null
  toggleLabel = null
  connectionDotEl = null
  annotationContextEl = null
  state = createEmptyChatState()
  collapsed = false
}

/**
 * Toggle collapsed state.
 */
export function toggleChat(): void {
  if (!panelContainer) return
  collapsed = !collapsed
  panelContainer.classList.toggle('collapsed', collapsed)
  if (toggleLabel) {
    toggleLabel.textContent = collapsed ? '▸' : '▾'
  }
}

/**
 * Add a user message to the chat and send it to OpenCode.
 *
 * If no active session exists, creates one first.
 * Disables input while sending and shows error on failure.
 */
export async function sendMessage(content: string, agent?: string): Promise<void> {
  if (sending) return

  // Mark any in-progress streaming message as complete
  const last = state.messages[state.messages.length - 1]
  if (last && last._streaming) {
    last._streaming = false
    const wrapper = messagesEl?.querySelector(`[data-message-id="${last.id}"]`) as HTMLElement | null
    if (wrapper) finalizeStreaming(wrapper)
    if (state.activeSessionId) {
      saveMessages(state.activeSessionId, state.messages)
    }
  }

  const msg: ChatMessage = {
    id: generateMessageId(),
    role: 'user',
    content,
    timestamp: new Date().toISOString(),
  }
  state.messages.push(msg)

  // Remove empty hint if present
  if (messagesEl?.querySelector('.chat-messages-empty')) {
    messagesEl.innerHTML = ''
  }

  messagesEl?.appendChild(renderMessage(msg))
  scrollToBottom()

  if (state.activeSessionId) {
    saveMessages(state.activeSessionId, state.messages)
  }

  // Ensure we have an active session
  if (!state.activeSessionId) {
    try {
      const created = await apiCall(() => client.session.create({}), '创建会话')
      state.activeSessionId = created.data?.id ?? null
      if (state.activeSessionId) {
        saveActiveSession(state.activeSessionId)
        // Refresh session list to include the new one
        await loadSessions()
      }
    } catch (err) {
      console.error('Failed to create session:', err)
      receiveMessage('无法创建会话，请确认 OpenCode Serve 已启动。')
      return
    }
  }

  if (!state.activeSessionId) {
    receiveMessage('无可用会话。')
    return
  }

  // Send prompt to OpenCode
  sending = true
  setInputDisabled(true)

  try {
    await apiCall(
      () =>
        client.session.promptAsync({
          path: { id: state.activeSessionId! },
          body: {
            parts: [{ type: 'text', text: content }],
            ...(agent ? { agent } : {}),
          },
        }),
      '发送消息',
    )
  } catch (err) {
    console.error('Failed to send prompt:', err)
    receiveMessage('发送失败，请重试。')
  } finally {
    sending = false
    setInputDisabled(false)
  }
}

/**
 * Add an assistant message (for future SSE integration).
 */
export function receiveMessage(content: string): void {
  const msg: ChatMessage = {
    id: generateMessageId(),
    role: 'assistant',
    content,
    timestamp: new Date().toISOString(),
  }
  state.messages.push(msg)

  if (messagesEl?.querySelector('.chat-messages-empty')) {
    messagesEl.innerHTML = ''
  }

  messagesEl?.appendChild(renderMessage(msg))
  scrollToBottom()

  if (state.activeSessionId) {
    saveMessages(state.activeSessionId, state.messages)
  }
}

/**
 * Get current chat state.
 */
export function getChatState(): ChatState {
  return { ...state }
}

/**
 * Trigger send from external callers (e.g., keyboard shortcuts).
 * Focuses the input and triggers the send action if there's text.
 */
export function triggerSend(): void {
  handleSend()
}

/**
 * Focus the chat input field.
 */
export function focusChatInput(): void {
  inputEl?.focus()
}

/**
 * Update the annotation context indicator above the input.
 * Called by the annotate module when annotations change.
 */
export function updateAnnotationContext(count: number): void {
  if (!annotationContextEl) {
    // Create the element if it doesn't exist yet
    const inputArea = document.querySelector('.chat-input-area')
    if (!inputArea) return
    annotationContextEl = document.createElement('div')
    annotationContextEl.className = 'chat-annotation-context'
    inputArea.insertBefore(annotationContextEl, inputArea.firstChild)
  }
  if (count > 0) {
    annotationContextEl.textContent = `${count} 条批注待处理`
    annotationContextEl.style.display = 'block'
  } else {
    annotationContextEl.style.display = 'none'
  }
}

/**
 * Insert content into the chat input field.
 * Appends to existing content with separator if non-empty.
 */
export function insertIntoInput(content: string): void {
  if (!inputEl) return
  const existing = inputEl.value.trim()
  if (existing) {
    inputEl.value = existing + '\n\n' + content
  } else {
    inputEl.value = content
  }
  autoResize()
  inputEl.focus()
}
