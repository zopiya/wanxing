/**
 * Status Module — Orchestrates timeline, gate cards, contract panel,
 * fix history, persistence, and audit visualization.
 *
 * Public API:
 *   initStatusPanel(container, slug)  — mount status panel for a project
 *   destroyStatusPanel()              — unmount and clean up
 *   getStatusState()                  — read current state
 *   updateStatusState(partial)        — update state + re-render + persist
 *   addAuditRound(round)              — add an audit round and persist
 *   onAuditItemClick(callback)        — register click handler for audit items
 *   createAuditVisualization(parent)  — create embeddable audit viz
 */

import { Timeline } from './timeline'
import { ContractPanel } from './contract-panel'
import type { ContractData } from './contract-panel'
import { FixHistory } from './fix-history'
import { Persistence } from './persistence'
import type { WorkbenchState, AuditRound } from './types'
import { createEmptyState } from './types'
import { AuditVisualization } from './audit-visualization'
import type { AuditItemClickCallback, AuditVisualizationData } from './audit-visualization'

export type { WorkbenchState, AuditRound, ContractData }
export { AuditVisualization } from './audit-visualization'
export type { AuditItemClickCallback, AuditVisualizationData } from './audit-visualization'

// --- Singleton state ---

let persistence: Persistence | null = null
let timeline: Timeline | null = null
let contractPanel: ContractPanel | null = null
let fixHistory: FixHistory | null = null
let panelContainer: HTMLDivElement | null = null
let auditItemClickCallback: AuditItemClickCallback | null = null

function createPanelShell(container: HTMLElement): HTMLDivElement {
  const panel = document.createElement('div')
  panel.className = 'status-panel'

  // Header
  const header = document.createElement('div')
  header.className = 'status-panel-header'

  const title = document.createElement('span')
  title.className = 'status-panel-title'
  title.textContent = '审计状态'
  header.appendChild(title)

  const closeBtn = document.createElement('button')
  closeBtn.className = 'status-panel-close wenxin-btn'
  closeBtn.setAttribute('aria-label', '关闭状态面板')
  closeBtn.textContent = '✕'
  closeBtn.addEventListener('click', () => {
    destroyStatusPanel()
    // Restore the toggle button visibility
    const toggle = document.querySelector('.status-toggle-btn') as HTMLElement
    if (toggle) toggle.style.display = ''
  })
  header.appendChild(closeBtn)

  panel.appendChild(header)

  // Body
  const body = document.createElement('div')
  body.className = 'status-panel-body'
  panel.appendChild(body)

  container.appendChild(panel)
  return panel
}

/**
 * Mount status panel for a given project slug.
 * Loads persisted state and renders all sub-components.
 */
export async function initStatusPanel(
  container: HTMLElement,
  slug: string,
): Promise<void> {
  destroyStatusPanel()

  panelContainer = createPanelShell(container)
  const body = panelContainer.querySelector('.status-panel-body') as HTMLElement

  // Timeline
  timeline = new Timeline(body)

  // Contract Panel
  contractPanel = new ContractPanel(body)
  if (auditItemClickCallback) {
    contractPanel.setOnGateItemClick(auditItemClickCallback)
  }

  // Fix History
  fixHistory = new FixHistory(body)

  // Persistence — load + auto-merge
  persistence = new Persistence(slug)
  persistence.onStateChange((state) => {
    renderAll(state)
  })

  await persistence.load()
}

/**
 * Destroy the current status panel and clean up.
 */
export function destroyStatusPanel(): void {
  timeline?.destroy()
  timeline = null
  contractPanel?.destroy()
  contractPanel = null
  fixHistory?.destroy()
  fixHistory = null
  persistence = null
  if (panelContainer) {
    panelContainer.remove()
    panelContainer = null
  }
}

/**
 * Get current state (returns empty state if no panel mounted).
 */
export function getStatusState(): WorkbenchState {
  return persistence?.getState() ?? createEmptyState('')
}

/**
 * Update state with partial data. Re-renders and persists.
 */
export async function updateStatusState(
  partial: Partial<WorkbenchState>,
): Promise<void> {
  if (!persistence) return
  persistence.update(partial)
  await persistence.save()
}

/**
 * Add an audit round to the current state.
 */
export async function addAuditRound(round: AuditRound): Promise<void> {
  if (!persistence) return
  const state = persistence.getState()
  const existing = state.auditRounds.findIndex((r) => r.round === round.round)
  if (existing >= 0) {
    state.auditRounds[existing] = round
  } else {
    state.auditRounds.push(round)
  }
  state.currentRound = Math.max(state.currentRound, round.round)
  persistence.setState(state)
  await persistence.save()
}

/**
 * Register a callback for when an audit gate/warning item is clicked.
 * This enables linking audit items to annotation regions.
 */
export function onAuditItemClick(callback: AuditItemClickCallback): void {
  auditItemClickCallback = callback
  contractPanel?.setOnGateItemClick(callback)
}

/**
 * Create an embeddable AuditVisualization instance.
 * The visualization can be placed in any container (e.g., Chat panel).
 *
 * @param parent - Container element
 * @param data - Audit round data to visualize
 * @returns The AuditVisualization instance
 */
export function createAuditVisualization(
  parent: HTMLElement,
  data: AuditVisualizationData,
): AuditVisualization {
  const viz = new AuditVisualization(parent)
  if (auditItemClickCallback) {
    viz.setOnItemClick(auditItemClickCallback)
  }
  viz.render(data)
  return viz
}

/**
 * Render all sub-components from current state.
 */
function renderAll(state: WorkbenchState): void {
  timeline?.render(state.auditRounds)
  fixHistory?.render(state.auditRounds)

  // Contract panel — show the latest round's render contract
  if (state.auditRounds.length > 0) {
    const latest = state.auditRounds[state.auditRounds.length - 1]
    const contractData: ContractData = {
      result: latest.renderContract,
      metrics: {}, // Metrics are populated when Render Contract JSON is available
    }
    contractPanel?.render(contractData)
  }
}
