/**
 * Preview Module — Orchestrates iframe viewer for project preview.
 *
 * Public API:
 *   initPreview(container, slug)  — mount preview for a project
 *   destroyPreview()              — unmount and clean up
 *   getPreviewState()             — read current state
 *   getPreviewViewer()            — get the IframeViewer instance (for annotate)
 */

import { IframeViewer } from './iframe-viewer'
import type { ViewportSize } from './iframe-viewer'
import { VIEWPORT_PRESETS } from './viewport-controls'
import type { ViewportPreset } from './viewport-controls'
import { onWSMessage } from '../../ws-client'
import { onFileEdited } from '../chat/sse-stream'
import type { EventFileEdited } from '@opencode-ai/sdk'

export type { ViewportSize, ViewportPreset }

const RELOAD_DEBOUNCE_MS = 500

const cleanupRegistry = new WeakMap<HTMLElement, Array<() => void>>()

interface FileChangePayload {
  slug: string
  fileName: string
  path: string
}

export interface PreviewState {
  slug: string
  viewport: ViewportPreset
}

// --- Singleton state ---

let viewer: IframeViewer | null = null
let previewContainer: HTMLDivElement | null = null
let currentSlug: string | null = null
let reloadDebounceTimer: ReturnType<typeof setTimeout> | null = null
let currentPage: string = 'index.html'
let pages: Array<{ name: string; file: string; isIndex: boolean }> = []

/**
 * Extract slug from a file path like `/path/to/dist/<slug>/index.html`.
 * Returns null if the path doesn't match the expected pattern.
 */
function extractSlugFromPath(filePath: string): string | null {
  // Match dist/<slug>/<filename> pattern
  const match = filePath.match(/dist\/([^/]+)\/[^/]+$/)
  return match ? match[1] : null
}

/**
 * Trigger a debounced preview reload.
 * Uses 500ms debounce to avoid rapid consecutive refreshes.
 */
function debouncedReload(slug: string): void {
  if (reloadDebounceTimer !== null) {
    clearTimeout(reloadDebounceTimer)
  }

  reloadDebounceTimer = setTimeout(() => {
    reloadDebounceTimer = null
    if (viewer && currentSlug === slug) {
      viewer.reload()
    }
  }, RELOAD_DEBOUNCE_MS)
}

async function loadPages(slug: string): Promise<void> {
  try {
    const res = await fetch(`/api/pages?slug=${encodeURIComponent(slug)}`)
    pages = await res.json()
    renderPageTabs()
  } catch {
    pages = [{ name: 'index', file: 'index.html', isIndex: true }]
    renderPageTabs()
  }
}

function renderPageTabs(): void {
  const tabsEl = document.getElementById('preview-page-tabs')
  if (!tabsEl) return
  tabsEl.innerHTML = ''

  for (const page of pages) {
    const tab = document.createElement('button')
    tab.className = 'preview-page-tab' + (page.file === currentPage ? ' active' : '')
    tab.textContent = page.name
    tab.addEventListener('click', () => switchPage(page.file))
    tabsEl.appendChild(tab)
  }
}

function switchPage(file: string): void {
  if (file === currentPage) return
  currentPage = file
  viewer?.setPage(file)
  renderPageTabs()
}

function createPreviewShell(container: HTMLElement): HTMLDivElement {
  const shell = document.createElement('div')
  shell.className = 'preview-container'

  // Toolbar with page tabs + refresh button
  const toolbar = document.createElement('div')
  toolbar.className = 'preview-toolbar'

  const pageTabs = document.createElement('div')
  pageTabs.className = 'preview-page-tabs'
  pageTabs.id = 'preview-page-tabs'
  toolbar.appendChild(pageTabs)

  const refreshBtn = document.createElement('button')
  refreshBtn.className = 'wenxin-btn preview-refresh-btn'
  refreshBtn.textContent = '↻'
  refreshBtn.title = '刷新预览'
  refreshBtn.setAttribute('aria-label', '刷新预览')
  refreshBtn.addEventListener('click', () => {
    viewer?.reload()
  })
  toolbar.appendChild(refreshBtn)

  shell.appendChild(toolbar)

  const viewerSlot = document.createElement('div')
  viewerSlot.className = 'preview-viewer-slot'
  shell.appendChild(viewerSlot)

  container.appendChild(shell)
  return shell
}

/**
 * Mount preview for a given project slug.
 */
export function initPreview(container: HTMLElement, slug: string): void {
  // Clean up previous
  destroyPreview()

  currentSlug = slug
  currentPage = 'index.html'
  previewContainer = createPreviewShell(container)

  const viewerSlot = previewContainer.querySelector('.preview-viewer-slot') as HTMLElement

  const initialPreset = VIEWPORT_PRESETS[0]

  // Iframe viewer
  viewer = new IframeViewer({
    slug,
    viewport: { width: initialPreset.width, height: initialPreset.height },
    container: viewerSlot,
  })

  // Load page tabs
  loadPages(slug)

  // Auto-refresh preview on file changes (WebSocket — legacy)
  const unsub1 = onWSMessage('file:change', (payload: unknown) => {
    const p = payload as FileChangePayload
    if (p.slug === slug && p.fileName === 'index.html') {
      viewer?.reload()
    }
  })

  // Auto-refresh preview on SSE file edited events (primary mechanism)
  const unsub2 = onFileEdited((event: EventFileEdited) => {
    const filePath = (event.properties as { file?: string }).file
    if (!filePath) return

    const editedSlug = extractSlugFromPath(filePath)
    if (editedSlug === slug) {
      debouncedReload(slug)
    }
  })

  // Store unsubscribers for cleanup
  cleanupRegistry.set(previewContainer, [unsub1, unsub2])
}

/**
 * Destroy the current preview instance and clean up DOM.
 */
export function destroyPreview(): void {
  // Unsubscribe from WS events
  const unsubs = previewContainer ? cleanupRegistry.get(previewContainer) : undefined
  if (unsubs) {
    for (const unsub of unsubs) unsub()
  }

  // Clear debounce timer
  if (reloadDebounceTimer !== null) {
    clearTimeout(reloadDebounceTimer)
    reloadDebounceTimer = null
  }

  viewer?.destroy()
  viewer = null
  currentSlug = null
  currentPage = 'index.html'
  pages = []
  if (previewContainer) {
    previewContainer.remove()
    previewContainer = null
  }
}

/**
 * Get current preview state.
 */
export function getPreviewState(): PreviewState | null {
  if (!viewer) return null
  return {
    slug: viewer.getSlug(),
    viewport: VIEWPORT_PRESETS[0],
  }
}

/**
 * Get the IframeViewer instance (for annotate module integration).
 */
export function getPreviewViewer(): IframeViewer | null {
  return viewer
}
