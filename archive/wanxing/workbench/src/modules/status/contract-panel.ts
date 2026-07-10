/**
 * Contract Panel — Displays Render Contract JSON data.
 *
 * Parses and groups metrics (structure, colors, motion, accessibility).
 * Shows hardGates and warnings sections.
 * Supports audit screenshot display and gate item click events.
 */

import type { RenderContractResult } from './types'
import { GateCard } from './gate-card'
import type { GateItemClickCallback } from './gate-card'

export interface ContractMetrics {
  structure?: Record<string, unknown>
  colors?: Record<string, unknown>
  motion?: Record<string, unknown>
  accessibility?: Record<string, unknown>
}

export interface ContractData {
  result: RenderContractResult
  metrics: ContractMetrics
  /** Optional audit screenshots to display. */
  screenshots?: AuditScreenshot[]
}

export interface AuditScreenshot {
  name: string
  url: string
  viewport?: string
  theme?: string
}

const METRIC_GROUPS: Array<{ key: keyof ContractMetrics; label: string }> = [
  { key: 'structure', label: 'Structure' },
  { key: 'colors', label: 'Colors' },
  { key: 'motion', label: 'Motion' },
  { key: 'accessibility', label: 'Accessibility' },
]

export class ContractPanel {
  private container: HTMLDivElement
  private gateCard: GateCard | null = null
  private onGateItemClick: GateItemClickCallback | null = null

  constructor(parent: HTMLElement) {
    this.container = document.createElement('div')
    this.container.className = 'status-contract-panel'
    parent.appendChild(this.container)
  }

  /**
   * Register a callback for when a specific gate/warning item is clicked.
   */
  setOnGateItemClick(callback: GateItemClickCallback): void {
    this.onGateItemClick = callback
    // Re-attach to existing gate card if present
    this.gateCard?.onGateItemClick(callback)
  }

  render(data: ContractData): void {
    this.container.innerHTML = ''

    const label = document.createElement('div')
    label.className = 'status-section-label'
    label.textContent = 'Render Contract'
    this.container.appendChild(label)

    // Gate card for hardGates/warnings
    this.gateCard = new GateCard(this.container)
    if (this.onGateItemClick) {
      this.gateCard.onGateItemClick(this.onGateItemClick)
    }
    this.gateCard.render('Render Contract', data.result)

    // Metrics groups
    for (const group of METRIC_GROUPS) {
      const values = data.metrics[group.key]
      if (!values || Object.keys(values).length === 0) continue

      const section = this.createMetricGroup(group.label, values)
      this.container.appendChild(section)
    }

    // Audit screenshots
    if (data.screenshots && data.screenshots.length > 0) {
      const screenshotsSection = this.createScreenshotsSection(data.screenshots)
      this.container.appendChild(screenshotsSection)
    }
  }

  private createMetricGroup(
    title: string,
    values: Record<string, unknown>,
  ): HTMLElement {
    const group = document.createElement('div')
    group.className = 'status-metric-group'

    const heading = document.createElement('div')
    heading.className = 'status-metric-heading'
    heading.textContent = title
    group.appendChild(heading)

    const table = document.createElement('div')
    table.className = 'status-metric-table'

    for (const [key, value] of Object.entries(values)) {
      const row = document.createElement('div')
      row.className = 'status-metric-row'

      const keyEl = document.createElement('span')
      keyEl.className = 'status-metric-key'
      keyEl.textContent = key
      row.appendChild(keyEl)

      const valEl = document.createElement('span')
      valEl.className = 'status-metric-value'
      valEl.textContent = formatValue(value)
      row.appendChild(valEl)

      table.appendChild(row)
    }

    group.appendChild(table)
    return group
  }

  private createScreenshotsSection(
    screenshots: AuditScreenshot[],
  ): HTMLElement {
    const section = document.createElement('div')
    section.className = 'status-screenshots-section'

    const heading = document.createElement('div')
    heading.className = 'status-section-label'
    heading.textContent = '审计截图'
    section.appendChild(heading)

    const grid = document.createElement('div')
    grid.className = 'status-screenshots-grid'

    for (const screenshot of screenshots) {
      const card = document.createElement('div')
      card.className = 'status-screenshot-card'

      const img = document.createElement('img')
      img.className = 'status-screenshot-img'
      img.src = screenshot.url
      img.alt = screenshot.name
      img.loading = 'lazy'
      card.appendChild(img)

      const info = document.createElement('div')
      info.className = 'status-screenshot-info'

      const nameEl = document.createElement('span')
      nameEl.className = 'status-screenshot-name'
      nameEl.textContent = screenshot.name
      info.appendChild(nameEl)

      if (screenshot.viewport || screenshot.theme) {
        const meta = document.createElement('span')
        meta.className = 'status-screenshot-meta'
        const parts: string[] = []
        if (screenshot.viewport) parts.push(screenshot.viewport)
        if (screenshot.theme) parts.push(screenshot.theme)
        meta.textContent = parts.join(' · ')
        info.appendChild(meta)
      }

      card.appendChild(info)
      grid.appendChild(card)
    }

    section.appendChild(grid)
    return section
  }

  destroy(): void {
    this.gateCard?.destroy()
    this.container.remove()
  }
}

function formatValue(v: unknown): string {
  if (v === null || v === undefined) return '—'
  if (typeof v === 'boolean') return v ? '✓' : '✕'
  if (typeof v === 'number') return String(v)
  if (typeof v === 'string') return v
  return JSON.stringify(v)
}
