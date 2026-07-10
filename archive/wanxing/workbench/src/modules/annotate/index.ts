/**
 * Annotate Module — Orchestrates injector, inspector, and region selector.
 * Click element in preview → type note → annotation goes to chat input.
 *
 * Public API:
 *   initAnnotate(iframe, wrapper, slug)  — mount annotate for a preview
 *   destroyAnnotate()                    — unmount and clean up
 *   toggleAnnotateMode(forceState?)      — no-op (kept for keyboard shortcut compat)
 */

import { Injector } from './injector'
import { Inspector } from './inspector'
import { RegionSelector } from './region-selector'
import { buildPrompt } from '../../lib/prompt-builder'

// --- Singleton state ---

let injector: Injector | null = null
let inspector: Inspector | null = null
let regionSelector: RegionSelector | null = null
let currentSlug: string = ''

/**
 * Mount annotate for a given preview iframe.
 * Inspector is auto-enabled — clicking elements always works.
 * Annotation submit → build prompt → insert into chat input directly.
 */
export async function initAnnotate(
  iframe: HTMLIFrameElement,
  wrapper: HTMLElement,
  slug: string,
): Promise<void> {
  destroyAnnotate()
  currentSlug = slug

  // Injector
  injector = new Injector(iframe)
  injector.onIframeEvent((eventType, element) => {
    if (eventType === 'mouse-move') {
      inspector?.handleMouseMove(element)
    } else if (eventType === 'mouse-click') {
      inspector?.handleClick(element)
    }
  })
  injector.waitForLoadAndInject()

  // Inspector — auto-enabled, submit goes directly to chat
  const viewerSlot = wrapper.parentElement as HTMLElement
  inspector = new Inspector(viewerSlot)
  inspector.onAnnotationSubmit((annotation) => {
    const prompt = buildPrompt([annotation], currentSlug)
    if (prompt) {
      import('../chat').then(({ insertIntoInput }) => {
        insertIntoInput(prompt)
      }).catch(() => {})
    }
  })

  // Region selector — auto-enabled
  regionSelector = new RegionSelector(viewerSlot)
  regionSelector.onRegionComplete((rect) => {
    inspector?.openRegionInputForm(rect, iframe.getBoundingClientRect())
  })

  // Auto-enable inspector — clicking elements always works
  inspector.enable()
  regionSelector.enable()
}

/**
 * Destroy the current annotate instance and clean up.
 */
export function destroyAnnotate(): void {
  injector?.destroy()
  injector = null
  inspector?.destroy()
  inspector = null
  regionSelector?.destroy()
  regionSelector = null
  currentSlug = ''
}

/**
 * Toggle annotate mode — no-op. Inspector is always enabled.
 * Kept for keyboard shortcut compatibility (Cmd+Shift+A).
 */
export function toggleAnnotateMode(_forceState?: boolean): void {
  // No-op: inspector is always active
}

/**
 * Get current annotations — always empty (annotations go directly to chat).
 */
export function getAnnotations(): [] {
  return []
}
