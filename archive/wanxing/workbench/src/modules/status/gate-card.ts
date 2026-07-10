/**
 * Gate Card — Displays a single gate check result.
 *
 * Three states: pass (green), fail (red), warn (yellow).
 * Clickable to expand details (hardGates / warnings).
 * Uses wenxin design tokens for colors.
 */

import type { GateResult, RenderContractResult } from './types'

const RESULT_LABELS: Record<GateResult, string> = {
  pass: '通过',
  warn: '警告',
  fail: '阻断',
}

/** Callback when a specific gate/warning item is clicked. */
export type GateItemClickCallback = (
  category: 'hardGate' | 'warning',
  itemText: string,
  index: number,
) => void

export class GateCard {
  private container: HTMLDivElement
  private expanded = false
  private detailsEl: HTMLDivElement | null = null
  private onItemClick: GateItemClickCallback | null = null

  constructor(parent: HTMLElement) {
    this.container = document.createElement('div')
    this.container.className = 'status-gate-card'
    parent.appendChild(this.container)
  }

  /**
   * Register a callback for when a specific gate/warning item is clicked.
   * Enables linking audit items to annotation regions.
   */
  onGateItemClick(callback: GateItemClickCallback): void {
    this.onItemClick = callback
  }

  render(label: string, result: RenderContractResult): void {
    this.container.innerHTML = ''
    this.container.setAttribute('data-result', result.result)

    // Header row — always visible
    const header = document.createElement('button')
    header.className = 'status-gate-card-header'
    header.setAttribute('aria-expanded', String(this.expanded))
    header.setAttribute('aria-label', `${label}: ${RESULT_LABELS[result.result]}`)

    const dot = document.createElement('span')
    dot.className = 'status-gate-dot'
    dot.setAttribute('data-result', result.result)
    header.appendChild(dot)

    const title = document.createElement('span')
    title.className = 'status-gate-title'
    title.textContent = label
    header.appendChild(title)

    const badge = document.createElement('span')
    badge.className = 'status-badge'
    badge.setAttribute('data-result', result.result)
    badge.textContent = RESULT_LABELS[result.result]
    header.appendChild(badge)

    const chevron = document.createElement('span')
    chevron.className = 'status-gate-chevron'
    chevron.textContent = '▸'
    chevron.setAttribute('aria-hidden', 'true')
    header.appendChild(chevron)

    header.addEventListener('click', () => this.toggle())
    this.container.appendChild(header)

    // Details — collapsible
    this.detailsEl = document.createElement('div')
    this.detailsEl.className = 'status-gate-details'
    this.detailsEl.id = `gate-details-${label.toLowerCase().replace(/\s+/g, '-')}`
    this.detailsEl.setAttribute('aria-hidden', String(!this.expanded))
    header.setAttribute('aria-controls', this.detailsEl.id)

    if (result.hardGates.length > 0) {
      const section = this.createDetailSection(
        'Hard Gates',
        result.hardGates,
        'hardGate',
      )
      this.detailsEl.appendChild(section)
    }

    if (result.warnings.length > 0) {
      const section = this.createDetailSection(
        'Warnings',
        result.warnings,
        'warning',
      )
      this.detailsEl.appendChild(section)
    }

    if (result.hardGates.length === 0 && result.warnings.length === 0) {
      const ok = document.createElement('div')
      ok.className = 'status-gate-detail-empty'
      ok.textContent = '无阻断项或警告'
      this.detailsEl.appendChild(ok)
    }

    this.container.appendChild(this.detailsEl)
    this.updateExpandedState()
  }

  private createDetailSection(
    title: string,
    items: string[],
    category: 'hardGate' | 'warning',
  ): HTMLElement {
    const section = document.createElement('div')
    section.className = 'status-gate-detail-section'

    const heading = document.createElement('div')
    heading.className = 'status-gate-detail-heading'
    heading.textContent = title
    section.appendChild(heading)

    const list = document.createElement('ul')
    list.className = 'status-gate-detail-list'
    for (let i = 0; i < items.length; i++) {
      const li = document.createElement('li')
      li.textContent = items[i]
      li.className = 'status-gate-detail-item'
      li.setAttribute('data-category', category)
      li.setAttribute('data-index', String(i))
      li.setAttribute('role', 'button')
      li.setAttribute('tabindex', '0')
      li.setAttribute(
        'aria-label',
        `${category === 'hardGate' ? '阻断项' : '警告项'}: ${items[i]}`,
      )
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

  private toggle(): void {
    this.expanded = !this.expanded
    this.updateExpandedState()
  }

  private updateExpandedState(): void {
    if (!this.detailsEl) return
    this.detailsEl.setAttribute('aria-hidden', String(!this.expanded))
    this.container.setAttribute('data-expanded', String(this.expanded))
    const chevron = this.container.querySelector('.status-gate-chevron')
    if (chevron) {
      chevron.textContent = this.expanded ? '▾' : '▸'
    }
    const header = this.container.querySelector('.status-gate-card-header')
    if (header) {
      header.setAttribute('aria-expanded', String(this.expanded))
    }
  }

  destroy(): void {
    this.container.remove()
  }
}
