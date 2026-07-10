/**
 * Fix History — Displays fix instructions from each audit round.
 *
 * Each round's instructions are listed with expandable detail.
 */

import type { AuditRound, FixInstruction } from './types'

export class FixHistory {
  private container: HTMLDivElement

  constructor(parent: HTMLElement) {
    this.container = document.createElement('div')
    this.container.className = 'status-fix-history'
    parent.appendChild(this.container)
  }

  render(rounds: AuditRound[]): void {
    this.container.innerHTML = ''

    const label = document.createElement('div')
    label.className = 'status-section-label'
    label.textContent = '修复指令'
    this.container.appendChild(label)

    const roundsWithFixes = rounds.filter((r) => r.fixInstructions.length > 0)

    if (roundsWithFixes.length === 0) {
      const empty = document.createElement('div')
      empty.className = 'status-fix-empty'
      empty.textContent = '暂无修复指令'
      this.container.appendChild(empty)
      return
    }

    for (const round of roundsWithFixes) {
      const section = this.createRoundSection(round)
      this.container.appendChild(section)
    }
  }

  private createRoundSection(round: AuditRound): HTMLElement {
    const section = document.createElement('div')
    section.className = 'status-fix-round'

    // Round header — clickable to expand/collapse
    const header = document.createElement('button')
    header.className = 'status-fix-round-header'
    header.setAttribute('aria-expanded', 'false')

    const title = document.createElement('span')
    title.className = 'status-fix-round-title'
    title.textContent = `第 ${round.round} 轮`
    header.appendChild(title)

    const count = document.createElement('span')
    count.className = 'status-fix-count'
    count.textContent = `${round.fixInstructions.length} 项`
    header.appendChild(count)

    const chevron = document.createElement('span')
    chevron.className = 'status-gate-chevron'
    chevron.textContent = '▸'
    chevron.setAttribute('aria-hidden', 'true')
    header.appendChild(chevron)

    const listContainer = document.createElement('div')
    listContainer.className = 'status-fix-list-container'
    listContainer.id = `fix-history-list-${round.round}`
    listContainer.setAttribute('aria-hidden', 'true')

    const list = document.createElement('ul')
    list.className = 'status-fix-list'
    for (const fix of round.fixInstructions) {
      const li = this.createFixItem(fix)
      list.appendChild(li)
    }
    listContainer.appendChild(list)

    let expanded = false
    header.setAttribute('aria-controls', `fix-history-list-${round.round}`)
    header.addEventListener('click', () => {
      expanded = !expanded
      listContainer.setAttribute('aria-hidden', String(!expanded))
      header.setAttribute('aria-expanded', String(expanded))
      chevron.textContent = expanded ? '▾' : '▸'
      section.setAttribute('data-expanded', String(expanded))
    })

    section.appendChild(header)
    section.appendChild(listContainer)
    return section
  }

  private createFixItem(fix: FixInstruction): HTMLElement {
    const li = document.createElement('li')
    li.className = 'status-fix-item'
    li.setAttribute('data-severity', fix.severity)

    const severity = document.createElement('span')
    severity.className = 'status-fix-severity'
    severity.textContent = fix.severity.toUpperCase()
    li.appendChild(severity)

    const target = document.createElement('span')
    target.className = 'status-fix-target'
    target.textContent = fix.target
    li.appendChild(target)

    const desc = document.createElement('span')
    desc.className = 'status-fix-desc'
    desc.textContent = fix.description
    li.appendChild(desc)

    return li
  }

  destroy(): void {
    this.container.remove()
  }
}
