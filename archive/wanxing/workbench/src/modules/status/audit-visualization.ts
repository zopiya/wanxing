/**
 * Audit Visualization — Embeddable audit result visualization.
 *
 * Displays audit gate status, screenshots, and metric summaries
 * in a compact format suitable for embedding in the Chat panel.
 * Supports clicking gate items to highlight corresponding annotations.
 *
 * Public API:
 *   AuditVisualization — class for creating audit viz in any container
 */

import type { GateResult, AuditRound, RenderContractResult } from './types'
import type { AuditScreenshot } from './contract-panel'

const RESULT_ICONS: Record<GateResult, string> = {
  pass: '✓',
  warn: '!',
  fail: '✕',
}

const RESULT_LABELS: Record<GateResult, string> = {
  pass: '通过',
  warn: '警告',
  fail: '阻断',
}

/** Callback when a gate item is clicked — enables annotation highlighting. */
export type AuditItemClickCallback = (
  category: 'hardGate' | 'warning',
  itemText: string,
  index: number,
) => void

/** Data for rendering the audit visualization. */
export interface AuditVisualizationData {
  round: AuditRound
  screenshots?: AuditScreenshot[]
}

export class AuditVisualization {
  private container: HTMLDivElement
  private onItemClick: AuditItemClickCallback | null = null

  constructor(parent: HTMLElement) {
    this.container = document.createElement('div')
    this.container.className = 'audit-viz'
    parent.appendChild(this.container)
  }

  /**
   * Register a callback for when a gate/warning item is clicked.
   */
  setOnItemClick(callback: AuditItemClickCallback): void {
    this.onItemClick = callback
  }

  /**
   * Render audit visualization from round data.
   */
  render(data: AuditVisualizationData): void {
    this.container.innerHTML = ''

    // Header
    const header = document.createElement('div')
    header.className = 'audit-viz-header'

    const title = document.createElement('span')
    title.className = 'audit-viz-title'
    title.textContent = `第 ${data.round.round} 轮审计`
    header.appendChild(title)

    const timestamp = document.createElement('span')
    timestamp.className = 'audit-viz-time'
    timestamp.textContent = formatTimestamp(data.round.timestamp)
    header.appendChild(timestamp)

    this.container.appendChild(header)

    // Gate status summary
    const summary = document.createElement('div')
    summary.className = 'audit-viz-summary'
    summary.appendChild(
      this.createGateStatusBadge('Render Contract', data.round.renderContract),
    )
    summary.appendChild(
      this.createGateStatusBadge('Audit Agent', data.round.auditAgent),
    )
    this.container.appendChild(summary)

    // Gate details (collapsible)
    if (
      data.round.renderContract.hardGates.length > 0 ||
      data.round.renderContract.warnings.length > 0
    ) {
      const details = this.createGateDetails(data.round.renderContract)
      this.container.appendChild(details)
    }

    // Screenshots gallery
    if (data.screenshots && data.screenshots.length > 0) {
      const gallery = this.createScreenshotsGallery(data.screenshots)
      this.container.appendChild(gallery)
    }
  }

  /**
   * Render a compact inline summary (for embedding in messages).
   */
  renderCompact(round: AuditRound): void {
    this.container.innerHTML = ''
    this.container.className = 'audit-viz audit-viz--compact'

    const row = document.createElement('div')
    row.className = 'audit-viz-compact-row'

    const rcBadge = this.createCompactBadge(
      'RC',
      round.renderContract.result,
    )
    row.appendChild(rcBadge)

    const aaBadge = this.createCompactBadge(
      'Audit',
      round.auditAgent.result,
    )
    row.appendChild(aaBadge)

    const issueCount =
      round.renderContract.hardGates.length +
      round.renderContract.warnings.length
    if (issueCount > 0) {
      const issues = document.createElement('span')
      issues.className = 'audit-viz-compact-issues'
      issues.textContent = `${issueCount} 项`
      row.appendChild(issues)
    }

    this.container.appendChild(row)
  }

  destroy(): void {
    this.container.remove()
  }

  // --- Private helpers ---

  private createGateStatusBadge(
    label: string,
    result: { result: GateResult },
  ): HTMLElement {
    const badge = document.createElement('div')
    badge.className = 'audit-viz-gate-badge'
    badge.setAttribute('data-result', result.result)

    const icon = document.createElement('span')
    icon.className = 'audit-viz-gate-icon'
    icon.textContent = RESULT_ICONS[result.result]
    badge.appendChild(icon)

    const text = document.createElement('span')
    text.className = 'audit-viz-gate-text'
    text.textContent = `${label}: ${RESULT_LABELS[result.result]}`
    badge.appendChild(text)

    return badge
  }

  private createCompactBadge(label: string, result: GateResult): HTMLElement {
    const badge = document.createElement('span')
    badge.className = 'audit-viz-compact-badge'
    badge.setAttribute('data-result', result)
    badge.textContent = `${label}: ${RESULT_ICONS[result]}`
    return badge
  }

  private createGateDetails(contract: RenderContractResult): HTMLElement {
    const details = document.createElement('details')
    details.className = 'audit-viz-details'

    const summary = document.createElement('summary')
    summary.className = 'audit-viz-details-summary'
    const issueCount = contract.hardGates.length + contract.warnings.length
    summary.textContent = `查看问题详情 (${issueCount} 项)`
    details.appendChild(summary)

    const content = document.createElement('div')
    content.className = 'audit-viz-details-content'

    if (contract.hardGates.length > 0) {
      const section = this.createIssueSection(
        '阻断项',
        contract.hardGates,
        'hardGate',
      )
      content.appendChild(section)
    }

    if (contract.warnings.length > 0) {
      const section = this.createIssueSection(
        '警告项',
        contract.warnings,
        'warning',
      )
      content.appendChild(section)
    }

    details.appendChild(content)
    return details
  }

  private createIssueSection(
    title: string,
    items: string[],
    category: 'hardGate' | 'warning',
  ): HTMLElement {
    const section = document.createElement('div')
    section.className = 'audit-viz-issue-section'

    const heading = document.createElement('div')
    heading.className = 'audit-viz-issue-heading'
    heading.textContent = title
    section.appendChild(heading)

    const list = document.createElement('ul')
    list.className = 'audit-viz-issue-list'

    for (let i = 0; i < items.length; i++) {
      const li = document.createElement('li')
      li.className = 'audit-viz-issue-item'
      li.setAttribute('data-category', category)
      li.setAttribute('role', 'button')
      li.setAttribute('tabindex', '0')

      const dot = document.createElement('span')
      dot.className = 'audit-viz-issue-dot'
      dot.setAttribute('data-category', category)
      li.appendChild(dot)

      const text = document.createElement('span')
      text.className = 'audit-viz-issue-text'
      text.textContent = items[i]
      li.appendChild(text)

      const idx = i
      li.addEventListener('click', () => {
        this.onItemClick?.(category, items[idx], idx)
      })
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          this.onItemClick?.(category, items[idx], idx)
        }
      })

      list.appendChild(li)
    }

    section.appendChild(list)
    return section
  }

  private createScreenshotsGallery(
    screenshots: AuditScreenshot[],
  ): HTMLElement {
    const section = document.createElement('div')
    section.className = 'audit-viz-screenshots'

    const heading = document.createElement('div')
    heading.className = 'audit-viz-screenshots-heading'
    heading.textContent = '审计截图'
    section.appendChild(heading)

    const grid = document.createElement('div')
    grid.className = 'audit-viz-screenshots-grid'

    for (const screenshot of screenshots) {
      const card = document.createElement('div')
      card.className = 'audit-viz-screenshot-card'

      const img = document.createElement('img')
      img.className = 'audit-viz-screenshot-img'
      img.src = screenshot.url
      img.alt = screenshot.name
      img.loading = 'lazy'
      card.appendChild(img)

      const label = document.createElement('div')
      label.className = 'audit-viz-screenshot-label'
      label.textContent = screenshot.name
      card.appendChild(label)

      grid.appendChild(card)
    }

    section.appendChild(grid)
    return section
  }
}

function formatTimestamp(iso: string): string {
  try {
    const d = new Date(iso)
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${pad(d.getHours())}:${pad(d.getMinutes())}`
  } catch {
    return iso
  }
}
