/**
 * Annotation Panel — Lists all annotations with management controls.
 *
 * - Displays annotation list with type icon, selector, severity, note
 * - Supports delete and severity modification
 * - Severity color coding: info (gray) / warning (yellow) / critical (red)
 * - "Insert to Chat" button to convert annotations to prompt and insert into chat input
 */

import type { Annotation, AnnotationType, Severity } from './types'
import { buildPrompt } from '../../lib/prompt-builder'

export type AnnotationChangeCallback = (annotations: Annotation[]) => void

const SEVERITY_LABELS: Record<Severity, string> = {
  info: '信息',
  warning: '警告',
  critical: '严重',
}

const TYPE_ICONS: Record<AnnotationType, string> = {
  element: '◎',
  region: '▢',
}

export class AnnotationPanel {
  private container: HTMLDivElement
  private annotations: Annotation[] = []
  private onChange: AnnotationChangeCallback | null = null
  private slug: string
  private sendBtn: HTMLButtonElement | null = null

  constructor(parent: HTMLElement, slug: string) {
    this.container = document.createElement('div')
    this.container.className = 'annotate-panel'
    this.slug = slug
    this.render()
    parent.appendChild(this.container)
  }

  /**
   * Set annotations and re-render.
   */
  setAnnotations(annotations: Annotation[]): void {
    this.annotations = annotations
    this.render()
  }

  /**
   * Add a single annotation and re-render.
   */
  addAnnotation(annotation: Annotation): void {
    this.annotations.push(annotation)
    this.render()
    this.notifyChange()
  }

  /**
   * Remove an annotation by id.
   */
  removeAnnotation(id: string): void {
    this.annotations = this.annotations.filter((a) => a.id !== id)
    this.render()
    this.notifyChange()
  }

  /**
   * Update severity of an annotation.
   */
  updateSeverity(id: string, severity: Severity): void {
    const annotation = this.annotations.find((a) => a.id === id)
    if (annotation) {
      annotation.severity = severity
      this.render()
      this.notifyChange()
    }
  }

  getAnnotations(): Annotation[] {
    return [...this.annotations]
  }

  onChange_(callback: AnnotationChangeCallback): void {
    this.onChange = callback
  }

  private notifyChange(): void {
    this.onChange?.(this.getAnnotations())
  }

  private render(): void {
    this.container.innerHTML = ''

    // Header
    const header = document.createElement('div')
    header.className = 'annotate-panel-header'

    const title = document.createElement('h3')
    title.className = 'annotate-panel-title'
    title.textContent = '批注'
    header.appendChild(title)

    const count = document.createElement('span')
    count.className = 'annotate-panel-count'
    count.textContent = `${this.annotations.length}`
    header.appendChild(count)

    this.container.appendChild(header)

    // List
    if (this.annotations.length === 0) {
      const empty = document.createElement('div')
      empty.className = 'annotate-panel-empty'
      empty.textContent = '暂无批注'
      this.container.appendChild(empty)
      return
    }

    const list = document.createElement('ul')
    list.className = 'annotate-panel-list'

    for (const annotation of this.annotations) {
      const item = document.createElement('li')
      item.className = 'annotate-panel-item'
      item.setAttribute('data-severity', annotation.severity)
      item.setAttribute('data-id', annotation.id)

      // Top row: icon + selector + severity + delete
      const topRow = document.createElement('div')
      topRow.className = 'annotate-item-top'

      const icon = document.createElement('span')
      icon.className = 'annotate-item-icon'
      icon.textContent = TYPE_ICONS[annotation.type] ?? '?'
      topRow.appendChild(icon)

      const selector = document.createElement('span')
      selector.className = 'annotate-item-selector'
      selector.textContent =
        annotation.type === 'region'
          ? `区域 ${Math.round(annotation.rect.width)}×${Math.round(annotation.rect.height)}`
          : annotation.target.selector
      topRow.appendChild(selector)

      // Severity badge (clickable to cycle)
      const severityBadge = document.createElement('button')
      severityBadge.type = 'button'
      severityBadge.className = `annotate-item-severity annotate-severity-${annotation.severity}`
      severityBadge.textContent = SEVERITY_LABELS[annotation.severity]
      severityBadge.title = '点击切换级别'
      severityBadge.addEventListener('click', (e) => {
        e.stopPropagation()
        const next: Record<Severity, Severity> = {
          info: 'warning',
          warning: 'critical',
          critical: 'info',
        }
        this.updateSeverity(annotation.id, next[annotation.severity])
      })
      topRow.appendChild(severityBadge)

      // Delete button
      const deleteBtn = document.createElement('button')
      deleteBtn.type = 'button'
      deleteBtn.className = 'annotate-item-delete'
      deleteBtn.textContent = '✕'
      deleteBtn.title = '删除批注'
      deleteBtn.setAttribute('aria-label', '删除批注')
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        this.removeAnnotation(annotation.id)
      })
      topRow.appendChild(deleteBtn)

      item.appendChild(topRow)

      // Note
      const note = document.createElement('div')
      note.className = 'annotate-item-note'
      note.textContent = annotation.note
      item.appendChild(note)

      list.appendChild(item)
    }

    this.container.appendChild(list)

    // Footer with "Send to Agent" button
    const footer = document.createElement('div')
    footer.className = 'annotate-panel-footer'

    this.sendBtn = document.createElement('button')
    this.sendBtn.type = 'button'
    this.sendBtn.className = 'wenxin-btn annotate-send-btn'
    this.sendBtn.textContent = '添加到对话'
    this.sendBtn.title = '将批注插入 Chat 输入框'
    this.sendBtn.setAttribute('aria-label', '添加到对话')
    this.sendBtn.disabled = this.annotations.length === 0
    this.sendBtn.addEventListener('click', () => this.handleSendToAgent())
    footer.appendChild(this.sendBtn)

    this.container.appendChild(footer)
  }

  private async handleSendToAgent(): Promise<void> {
    if (this.annotations.length === 0) return

    const prompt = buildPrompt(this.annotations, this.slug)
    if (!prompt) return

    // Insert into chat input instead of sending
    try {
      const chatMod = await import('../chat')
      if (chatMod.insertIntoInput) {
        chatMod.insertIntoInput(prompt)
      }
    } catch (err) {
      console.error('Failed to insert into chat:', err)
    }
  }

  destroy(): void {
    this.container.remove()
  }
}
