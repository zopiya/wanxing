/**
 * Hash Router — Updates content area on hash change.
 *
 * Routes:
 *   #/project/<slug>  →  loads preview + chat + annotate
 *   #/ (default)      →  project picker
 */

import { initPreview, destroyPreview, getPreviewViewer } from '../modules/preview'
import { destroyChat } from '../modules/chat'
import {
  destroyStatusPanel,
} from '../modules/status'
import {
  initAnnotate,
  destroyAnnotate,
} from '../modules/annotate'
import { updateTopBarProject, loadProjects } from './layout'

const contentId = 'workbench-content'
const statusSlotId = 'workbench-status-slot'
const mainId = 'workbench-main'

function getSlugFromHash(): string | null {
  const hash = window.location.hash
  const match = hash.match(/^#\/project\/(.+)$/)
  return match ? match[1] : null
}

function closeStatusPanel(): void {
  const slot = document.getElementById(statusSlotId)
  if (!slot) return
  slot.classList.remove('open')
  destroyStatusPanel()
}

function renderContent(slug: string | null): void {
  const main = document.getElementById(mainId)
  if (!main) return

  updateTopBarProject(slug)
  destroyChat()
  destroyAnnotate()
  destroyPreview()
  closeStatusPanel()

  if (!slug) {
    // Show project picker
    main.innerHTML = ''
    const picker = document.createElement('div')
    picker.className = 'workbench-project-picker'
    picker.innerHTML = `
      <div class="workbench-project-picker-title">选择一个项目</div>
      <div class="workbench-project-grid" id="workbench-project-grid"></div>
    `
    main.appendChild(picker)
    // Load projects into the grid
    loadProjects()
    return
  }

  // Rebuild main with chat + preview
  main.innerHTML = ''

  const chatPanel = document.createElement('div')
  chatPanel.className = 'workbench-chat-panel'
  chatPanel.id = 'workbench-chat-panel'

  const previewPanel = document.createElement('div')
  previewPanel.className = 'workbench-preview-panel'
  previewPanel.id = 'workbench-preview-panel'

  const content = document.createElement('div')
  content.className = 'workbench-content'
  content.id = contentId

  const statusSlot = document.createElement('div')
  statusSlot.className = 'workbench-status-slot'
  statusSlot.id = statusSlotId

  previewPanel.appendChild(content)
  previewPanel.appendChild(statusSlot)
  main.appendChild(chatPanel)
  main.appendChild(previewPanel)

  // Init preview
  initPreview(content, slug)

  // Init annotate — insert panel slot inside viewer slot (beside iframe)
  const previewViewer = getPreviewViewer()
  if (previewViewer) {
    const iframe = previewViewer.getIframe()
    const wrapper = previewViewer.getWrapper()
    if (iframe && wrapper) {
      void initAnnotate(iframe, wrapper, slug)
    }
  }

  // Re-init chat in the new chat panel
  import('../modules/chat').then(({ initChat }) => {
    if (chatPanel.isConnected) initChat(chatPanel)
  })
}

export function initRouter(): void {
  window.addEventListener('hashchange', () => {
    renderContent(getSlugFromHash())
  })
  renderContent(getSlugFromHash())
}
