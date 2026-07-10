/**
 * Injector — Injects event forwarding script into preview iframe.
 *
 * After iframe loads, sends a postMessage to request injection.
 * The iframe's HTML must include a small listener that responds
 * to 'wanxing-inject' by forwarding mousemove, click, mouseover events.
 *
 * Since cross-origin iframes can't access contentDocument, we use
 * postMessage both ways: request injection → iframe forwards events back.
 */

import { isIframeMessage } from '../../../bridge/post-message'
import type { ElementInfo } from '../../../bridge/post-message'

export type IframeEventCallback = (
  eventType: 'mouse-move' | 'mouse-click',
  element: ElementInfo | null,
) => void

export class Injector {
  private iframe: HTMLIFrameElement
  private callback: IframeEventCallback | null = null
  private boundMessageHandler: (e: MessageEvent) => void
  private injected = false

  constructor(iframe: HTMLIFrameElement) {
    this.iframe = iframe
    this.boundMessageHandler = this.handleMessage.bind(this)
    window.addEventListener('message', this.boundMessageHandler)
  }

  /**
   * Wait for iframe to load, then request injection.
   * This is the correct way to initialize — call this instead of requestInject().
   */
  waitForLoadAndInject(): void {
    const iframe = this.iframe
    // If already loaded, inject immediately
    if (iframe.contentDocument?.readyState === 'complete') {
      this.requestInject()
      return
    }
    // Otherwise wait for load event
    iframe.addEventListener('load', () => {
      this.requestInject()
    }, { once: true })
  }

  /**
   * Request injection once iframe is loaded.
   */
  requestInject(): void {
    if (!this.iframe.contentWindow) return
    this.iframe.contentWindow.postMessage({ type: 'wanxing-inject' }, '*')
  }

  /**
   * Handle messages from iframe.
   */
  private handleMessage(e: MessageEvent): void {
    const data: unknown = e.data
    if (!isIframeMessage(data)) return

    if (data.type === 'wanxing-inject-ready') {
      this.injected = true
      return
    }

    if (data.type === 'mouse-move') {
      this.callback?.('mouse-move', data.element ?? null)
      return
    }

    if (data.type === 'mouse-click') {
      this.callback?.('mouse-click', data.element ?? null)
    }
  }

  onIframeEvent(callback: IframeEventCallback): void {
    this.callback = callback
  }

  isInjected(): boolean {
    return this.injected
  }

  destroy(): void {
    window.removeEventListener('message', this.boundMessageHandler)
    this.callback = null
    this.injected = false
  }
}
