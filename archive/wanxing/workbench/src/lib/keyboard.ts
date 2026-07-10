/**
 * Keyboard Shortcuts — Global keyboard shortcut handler for Workbench.
 *
 * Shortcuts:
 *   Cmd+Enter      — Send prompt (when chat input is focused)
 *   Cmd+J          — Toggle Chat panel
 *   Cmd+K          — Focus chat input
 *   Cmd+Shift+A    — Toggle annotation mode
 *   M/E            — Mode switching (markup/edit)
 *   Escape         — Close current panel/modal
 *
 * All shortcuts use Cmd on macOS and Ctrl on Windows/Linux.
 */

// Lazy imports to avoid static dependency — allows Vite code splitting
let chatModule: typeof import('../modules/chat') | null = null
let annotateModule: typeof import('../modules/annotate') | null = null

async function getChat(): Promise<typeof import('../modules/chat')> {
  if (!chatModule) chatModule = await import('../modules/chat')
  return chatModule
}

async function getAnnotate(): Promise<typeof import('../modules/annotate')> {
  if (!annotateModule) annotateModule = await import('../modules/annotate')
  return annotateModule
}

/** Check if the event matches the Cmd (macOS) or Ctrl (Windows/Linux) modifier. */
function isCmdOrCtrl(e: KeyboardEvent): boolean {
  return e.metaKey || e.ctrlKey
}

/** Check if an input element is currently focused. */
function isInputFocused(): boolean {
  const el = document.activeElement
  if (!el) return false
  const tag = el.tagName.toLowerCase()
  return tag === 'input' || tag === 'textarea' || (el as HTMLElement).isContentEditable
}

/** Close any open panels/modals in priority order. Returns true if something was closed. */
async function handleEscape(): Promise<boolean> {
  // 1. Collapse chat panel if expanded
  const chatPanel = document.querySelector('.chat-panel') as HTMLElement | null
  if (chatPanel && !chatPanel.classList.contains('collapsed')) {
    const { toggleChat } = await getChat()
    toggleChat()
    return true
  }

  // 2. Blur current focus
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
    return true
  }

  return false
}

/**
 * Global keydown handler.
 * Returns true if the event was consumed (preventDefault called).
 */
function onKeyDown(e: KeyboardEvent): void {
  const cmd = isCmdOrCtrl(e)

  // Cmd+Enter — Send prompt
  if (cmd && e.key === 'Enter') {
    // Only trigger send if chat input is focused
    if (isInputFocused()) {
      e.preventDefault()
      getChat().then(({ triggerSend }) => triggerSend())
      return
    }
  }

  // Cmd+J — Toggle Chat panel
  if (cmd && e.key === 'j') {
    e.preventDefault()
    getChat().then(({ toggleChat }) => toggleChat())
    return
  }

  // Cmd+K — Focus chat input
  if (cmd && e.key === 'k') {
    e.preventDefault()
    getChat().then(({ focusChatInput }) => focusChatInput())
    return
  }

  // Cmd+Shift+A — Toggle annotation mode
  if (cmd && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
    e.preventDefault()
    getAnnotate().then(({ toggleAnnotateMode }) => toggleAnnotateMode())
    return
  }

  // M/E — Mode switching (only when not in an input)
  if (!cmd && !isInputFocused()) {
    const modeMap: Record<string, string> = { m: 'markup', e: 'edit' }
    const mode = modeMap[e.key.toLowerCase()]
    if (mode) {
      e.preventDefault()
      // Find mode switcher and set mode
      const switcher = document.querySelector('.toolbar-mode-switcher')
      if (switcher) {
        const btn = switcher.querySelector(`[data-mode="${mode}"]`) as HTMLButtonElement | null
        btn?.click()
      }
      return
    }
  }

  // Escape — Close current panel/modal
  if (e.key === 'Escape') {
    handleEscape().then((handled) => {
      if (handled) e.preventDefault()
    })
    return
  }
}

/**
 * Initialize global keyboard shortcuts.
 * Call once at app startup.
 */
export function initKeyboard(): void {
  document.addEventListener('keydown', onKeyDown)
}

/**
 * Remove global keyboard shortcuts.
 * Call on app teardown.
 */
export function destroyKeyboard(): void {
  document.removeEventListener('keydown', onKeyDown)
}
