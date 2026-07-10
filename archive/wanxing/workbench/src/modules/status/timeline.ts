/**
 * Timeline — Vertical timeline showing audit rounds 1/2/3.
 *
 * Wenxin style: vertical line connector, circle markers.
 * Each round shows: round number, timestamp, status icon.
 */

import type { AuditRound, GateResult } from './types'

const STATUS_ICONS: Record<GateResult, string> = {
  pass: '✓',
  warn: '!',
  fail: '✕',
}

function formatTimestamp(iso: string): string {
  try {
    const d = new Date(iso)
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
  } catch {
    return iso
  }
}

function worstResult(a: GateResult, b: GateResult): GateResult {
  if (a === 'fail' || b === 'fail') return 'fail'
  if (a === 'warn' || b === 'warn') return 'warn'
  return 'pass'
}

export class Timeline {
  private container: HTMLDivElement

  constructor(parent: HTMLElement) {
    this.container = document.createElement('div')
    this.container.className = 'status-timeline'
    parent.appendChild(this.container)
  }

  render(rounds: AuditRound[]): void {
    this.container.innerHTML = ''

    if (rounds.length === 0) {
      const empty = document.createElement('div')
      empty.className = 'status-timeline-empty'
      empty.textContent = '暂无审计轮次'
      this.container.appendChild(empty)
      return
    }

    const label = document.createElement('div')
    label.className = 'status-section-label'
    label.textContent = '审计轮次'
    this.container.appendChild(label)

    const list = document.createElement('div')
    list.className = 'status-timeline-list'

    for (const round of rounds) {
      const item = this.createRoundItem(round)
      list.appendChild(item)
    }

    this.container.appendChild(list)
  }

  private createRoundItem(round: AuditRound): HTMLElement {
    const overallResult = worstResult(
      round.renderContract.result,
      round.auditAgent.result,
    )

    const item = document.createElement('div')
    item.className = 'status-timeline-item'
    item.setAttribute('data-result', overallResult)

    // Connector line (top)
    const lineTop = document.createElement('div')
    lineTop.className = 'status-timeline-line status-timeline-line-top'
    item.appendChild(lineTop)

    // Marker dot
    const marker = document.createElement('div')
    marker.className = 'status-timeline-marker'
    marker.setAttribute('data-result', overallResult)
    marker.textContent = STATUS_ICONS[overallResult]
    item.appendChild(marker)

    // Connector line (bottom)
    const lineBottom = document.createElement('div')
    lineBottom.className = 'status-timeline-line status-timeline-line-bottom'
    item.appendChild(lineBottom)

    // Content
    const content = document.createElement('div')
    content.className = 'status-timeline-content'

    const header = document.createElement('div')
    header.className = 'status-timeline-header'

    const roundLabel = document.createElement('h4')
    roundLabel.className = 'status-timeline-round'
    roundLabel.textContent = `第 ${round.round} 轮`
    header.appendChild(roundLabel)

    const timestamp = document.createElement('span')
    timestamp.className = 'status-timeline-time'
    timestamp.textContent = formatTimestamp(round.timestamp)
    header.appendChild(timestamp)

    content.appendChild(header)

    // Summary line
    const summary = document.createElement('div')
    summary.className = 'status-timeline-summary'
    const rcLabel = document.createElement('span')
    rcLabel.className = 'status-badge'
    rcLabel.setAttribute('data-result', round.renderContract.result)
    rcLabel.textContent = `RC: ${round.renderContract.result}`
    summary.appendChild(rcLabel)

    const aaLabel = document.createElement('span')
    aaLabel.className = 'status-badge'
    aaLabel.setAttribute('data-result', round.auditAgent.result)
    aaLabel.textContent = `Audit: ${round.auditAgent.result}`
    summary.appendChild(aaLabel)

    content.appendChild(summary)
    item.appendChild(content)

    return item
  }

  destroy(): void {
    this.container.remove()
  }
}
