/**
 * postMessage Bridge — Workbench ↔ iframe message protocol.
 *
 * Message types:
 *   mouse-move     — iframe reports mouse position over an element
 *   mouse-click    — iframe reports a click on an element
 *   element-select — Workbench requests element selection in iframe
 *   theme-change   — Workbench notifies theme change
 *
 * All messages use a discriminated union on `type`.
 */

// --- Element info reported by iframe events ---

export interface ElementInfo {
  selector: string
  path: string
  tagName: string
  className: string
  id: string
  rect: { x: number; y: number; width: number; height: number }
}

// --- Message types from iframe → Workbench ---

export interface MouseMoveMessage {
  type: 'mouse-move'
  element: ElementInfo | null
}

export interface MouseClickMessage {
  type: 'mouse-click'
  element: ElementInfo
}

// --- Message types from Workbench → iframe ---

export interface ElementSelectMessage {
  type: 'element-select'
  selector: string
}

export interface ThemeChangeMessage {
  type: 'wanxing-theme'
  theme: 'light' | 'dark'
}

// --- Injection script request ---

export interface InjectScriptMessage {
  type: 'wanxing-inject'
}

// --- Injection ready confirmation ---

export interface InjectReadyMessage {
  type: 'wanxing-inject-ready'
}

// --- Union types ---

export type IframeToWorkbenchMessage =
  | MouseMoveMessage
  | MouseClickMessage
  | InjectReadyMessage

export type WorkbenchToIframeMessage =
  | ElementSelectMessage
  | ThemeChangeMessage
  | InjectScriptMessage

export type BridgeMessage = IframeToWorkbenchMessage | WorkbenchToIframeMessage

// --- Type guards ---

export function isIframeMessage(data: unknown): data is IframeToWorkbenchMessage {
  if (typeof data !== 'object' || data === null) return false
  const type = (data as Record<string, unknown>).type
  return (
    type === 'mouse-move' ||
    type === 'mouse-click' ||
    type === 'wanxing-inject-ready'
  )
}

export function isWorkbenchMessage(data: unknown): data is WorkbenchToIframeMessage {
  if (typeof data !== 'object' || data === null) return false
  const type = (data as Record<string, unknown>).type
  return (
    type === 'element-select' ||
    type === 'wanxing-theme' ||
    type === 'wanxing-inject'
  )
}
