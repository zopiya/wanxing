/**
 * DOM Inspector — Draws highlight overlay on hover, shows tooltip.
 *
 * - Absolutely positioned overlay div on top of iframe wrapper
 * - Tooltip shows tagName, className, dimensions
 * - Uses accent color semi-transparent border
 * - Click on element opens annotation input form
 */

import type { ElementInfo } from '../../../bridge/post-message'
import type { Annotation, Severity } from './types'
import { generateId } from './types'

export type AnnotationSubmitCallback = (annotation: Annotation) => void

export class Inspector {
  private wrapper: HTMLElement
  private overlay: HTMLDivElement
  private tooltip: HTMLDivElement
  private inputForm: HTMLDivElement | null = null
  private onSubmit: AnnotationSubmitCallback | null = null
  private enabled = false

  constructor(wrapper: HTMLElement) {
    this.wrapper = wrapper
    this.overlay = this.createOverlay()
    this.tooltip = this.createTooltip()
    this.wrapper.appendChild(this.overlay)
    this.wrapper.appendChild(this.tooltip)
  }

  private createOverlay(): HTMLDivElement {
    const el = document.createElement('div')
    el.className = 'annotate-inspector-overlay'
    el.style.display = 'none'
    return el
  }

  private createTooltip(): HTMLDivElement {
    const el = document.createElement('div')
    el.className = 'annotate-inspector-tooltip'
    el.style.display = 'none'
    return el
  }

  enable(): void {
    this.enabled = true
  }

  disable(): void {
    this.enabled = false
    this.hideOverlay()
    this.hideTooltip()
    this.closeInputForm()
  }

  /**
   * Handle mouse-move event from iframe — update overlay + tooltip position.
   */
  handleMouseMove(element: ElementInfo | null): void {
    if (!this.enabled) return
    if (!element) {
      this.hideOverlay()
      this.hideTooltip()
      return
    }
    this.showOverlay(element.rect)
    this.showTooltip(element)
  }

  /**
   * Handle mouse-click event from iframe — open annotation input form.
   */
  handleClick(element: ElementInfo | null): void {
    if (!this.enabled || !element) return
    this.openInputForm(element)
  }

  private showOverlay(rect: { x: number; y: number; width: number; height: number }): void {
    // The overlay is positioned relative to the wrapper.
    // rect comes from iframe's getBoundingClientRect, which is relative to the iframe viewport.
    // We need to map it to the wrapper's coordinate space.
    const iframe = this.wrapper.querySelector('iframe') as HTMLIFrameElement | null
    if (!iframe) return

    const iframeRect = iframe.getBoundingClientRect()
    const wrapperRect = this.wrapper.getBoundingClientRect()

    // Scale factor (iframe may be scaled via CSS transform)
    const scale = iframeRect.width / (parseInt(iframe.style.width) || iframeRect.width)

    const offsetX = iframeRect.left - wrapperRect.left + this.wrapper.scrollLeft
    const offsetY = iframeRect.top - wrapperRect.top + this.wrapper.scrollTop

    const x = offsetX + rect.x * scale
    const y = offsetY + rect.y * scale
    const w = rect.width * scale
    const h = rect.height * scale

    this.overlay.style.display = 'block'
    this.overlay.style.left = `${x}px`
    this.overlay.style.top = `${y}px`
    this.overlay.style.width = `${w}px`
    this.overlay.style.height = `${h}px`
  }

  private hideOverlay(): void {
    this.overlay.style.display = 'none'
  }

  private showTooltip(element: ElementInfo): void {
    const iframe = this.wrapper.querySelector('iframe') as HTMLIFrameElement | null
    if (!iframe) return

    const iframeRect = iframe.getBoundingClientRect()
    const wrapperRect = this.wrapper.getBoundingClientRect()
    const scale = iframeRect.width / (parseInt(iframe.style.width) || iframeRect.width)

    const offsetX = iframeRect.left - wrapperRect.left + this.wrapper.scrollLeft
    const offsetY = iframeRect.top - wrapperRect.top + this.wrapper.scrollTop

    const x = offsetX + element.rect.x * scale
    const y = offsetY + element.rect.y * scale
    const h = element.rect.height * scale

    const classStr = element.className ? `.${element.className.trim().split(/\s+/).join('.')}` : ''
    const sizeStr = `${Math.round(element.rect.width)}×${Math.round(element.rect.height)}`
    this.tooltip.innerHTML = `<span class="annotate-tooltip-tag">&lt;${element.tagName}&gt;</span>${classStr ? ` <span class="annotate-tooltip-class">${classStr}</span>` : ''} <span class="annotate-tooltip-size">${sizeStr}</span>`

    this.tooltip.style.display = 'block'

    // Position tooltip below the overlay, or above if near bottom
    const tooltipY = y + h + 4
    this.tooltip.style.left = `${x}px`
    this.tooltip.style.top = `${tooltipY}px`

    // Clamp to wrapper bounds
    requestAnimationFrame(() => {
      const tipRect = this.tooltip.getBoundingClientRect()
      if (tipRect.right > wrapperRect.right - 8) {
        this.tooltip.style.left = `${x + wrapperRect.right - tipRect.right - 8}px`
      }
    })
  }

  private hideTooltip(): void {
    this.tooltip.style.display = 'none'
  }

  /**
   * Open annotation input form near the clicked element.
   */
  private openInputForm(element: ElementInfo): void {
    this.closeInputForm()

    const iframe = this.wrapper.querySelector('iframe') as HTMLIFrameElement | null
    if (!iframe) return

    const iframeRect = iframe.getBoundingClientRect()
    const wrapperRect = this.wrapper.getBoundingClientRect()
    const scale = iframeRect.width / (parseInt(iframe.style.width) || iframeRect.width)

    const offsetX = iframeRect.left - wrapperRect.left + this.wrapper.scrollLeft
    const offsetY = iframeRect.top - wrapperRect.top + this.wrapper.scrollTop

    const x = offsetX + element.rect.x * scale + element.rect.width * scale + 8
    const y = offsetY + element.rect.y * scale

    const form = document.createElement('div')
    form.className = 'annotate-input-form'

    // Header
    const header = document.createElement('div')
    header.className = 'annotate-form-header'
    const formTitle = document.createElement('span')
    formTitle.className = 'annotate-form-title'
    formTitle.textContent = '添加批注'
    header.appendChild(formTitle)
    const formTarget = document.createElement('span')
    formTarget.className = 'annotate-form-target'
    formTarget.textContent = `<${element.tagName}>`
    header.appendChild(formTarget)
    form.appendChild(header)

    // Textarea
    const textarea = document.createElement('textarea')
    textarea.className = 'annotate-form-textarea'
    textarea.placeholder = '输入批注内容...'
    textarea.rows = 3
    textarea.setAttribute('aria-label', '批注内容')
    form.appendChild(textarea)

    // Severity selector
    const severityRow = document.createElement('div')
    severityRow.className = 'annotate-form-severity-row'

    const severityLabel = document.createElement('span')
    severityLabel.className = 'annotate-form-severity-label'
    severityLabel.textContent = '级别'
    severityRow.appendChild(severityLabel)

    let selectedSeverity: Severity = 'info'
    const severities: Severity[] = ['info', 'warning', 'critical']
    const severityLabels: Record<Severity, string> = {
      info: '信息',
      warning: '警告',
      critical: '严重',
    }

    for (const sev of severities) {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = `annotate-severity-btn annotate-severity-${sev}`
      btn.textContent = severityLabels[sev]
      btn.setAttribute('data-severity', sev)
      if (sev === selectedSeverity) btn.classList.add('active')
      btn.addEventListener('click', () => {
        selectedSeverity = sev
        severityRow.querySelectorAll('.annotate-severity-btn').forEach((b) => {
          b.classList.toggle('active', b.getAttribute('data-severity') === sev)
        })
      })
      severityRow.appendChild(btn)
    }
    form.appendChild(severityRow)

    // Actions
    const actions = document.createElement('div')
    actions.className = 'annotate-form-actions'

    const cancelBtn = document.createElement('button')
    cancelBtn.type = 'button'
    cancelBtn.className = 'wenxin-btn annotate-form-cancel'
    cancelBtn.textContent = '取消'
    cancelBtn.addEventListener('click', () => this.closeInputForm())
    actions.appendChild(cancelBtn)

    const submitBtn = document.createElement('button')
    submitBtn.type = 'button'
    submitBtn.className = 'wenxin-btn annotate-form-submit'
    submitBtn.textContent = '提交'
    submitBtn.addEventListener('click', () => {
      const note = textarea.value.trim()
      if (!note) {
        textarea.focus()
        return
      }
      const annotation: Annotation = {
        id: generateId(),
        type: 'element',
        target: { selector: element.selector, path: element.path },
        rect: { ...element.rect },
        note,
        severity: selectedSeverity,
        createdAt: new Date().toISOString(),
      }
      this.onSubmit?.(annotation)
      this.closeInputForm()
    })
    actions.appendChild(submitBtn)

    form.appendChild(actions)

    // Position
    form.style.left = `${Math.min(x, wrapperRect.width - 280)}px`
    form.style.top = `${y}px`

    this.wrapper.appendChild(form)
    this.inputForm = form

    // Focus textarea
    requestAnimationFrame(() => textarea.focus())
  }

  /**
   * Open annotation form for a region selection.
   */
  openRegionInputForm(
    rect: { x: number; y: number; width: number; height: number },
    _iframeRect: DOMRect,
  ): void {
    this.closeInputForm()

    const wrapperRect = this.wrapper.getBoundingClientRect()
    const iframe = this.wrapper.querySelector('iframe') as HTMLIFrameElement | null
    if (!iframe) return

    const iframeElRect = iframe.getBoundingClientRect()
    const scale = iframeElRect.width / (parseInt(iframe.style.width) || iframeElRect.width)

    const offsetX = iframeElRect.left - wrapperRect.left + this.wrapper.scrollLeft
    const offsetY = iframeElRect.top - wrapperRect.top + this.wrapper.scrollTop

    const x = offsetX + (rect.x + rect.width) * scale + 8
    const y = offsetY + rect.y * scale

    const form = document.createElement('div')
    form.className = 'annotate-input-form'

    // Header
    const header = document.createElement('div')
    header.className = 'annotate-form-header'
    const titleSpan = document.createElement('span')
    titleSpan.className = 'annotate-form-title'
    titleSpan.textContent = '区域批注'
    header.appendChild(titleSpan)
    const targetSpan = document.createElement('span')
    targetSpan.className = 'annotate-form-target'
    targetSpan.textContent = `${Math.round(rect.width)}×${Math.round(rect.height)}`
    header.appendChild(targetSpan)
    form.appendChild(header)

    // Textarea
    const textarea = document.createElement('textarea')
    textarea.className = 'annotate-form-textarea'
    textarea.placeholder = '输入批注内容...'
    textarea.rows = 3
    textarea.setAttribute('aria-label', '区域批注内容')
    form.appendChild(textarea)

    // Severity selector
    const severityRow = document.createElement('div')
    severityRow.className = 'annotate-form-severity-row'

    const severityLabel = document.createElement('span')
    severityLabel.className = 'annotate-form-severity-label'
    severityLabel.textContent = '级别'
    severityRow.appendChild(severityLabel)

    let selectedSeverity: Severity = 'info'
    const severities: Severity[] = ['info', 'warning', 'critical']
    const severityLabels: Record<Severity, string> = {
      info: '信息',
      warning: '警告',
      critical: '严重',
    }

    for (const sev of severities) {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = `annotate-severity-btn annotate-severity-${sev}`
      btn.textContent = severityLabels[sev]
      btn.setAttribute('data-severity', sev)
      if (sev === selectedSeverity) btn.classList.add('active')
      btn.addEventListener('click', () => {
        selectedSeverity = sev
        severityRow.querySelectorAll('.annotate-severity-btn').forEach((b) => {
          b.classList.toggle('active', b.getAttribute('data-severity') === sev)
        })
      })
      severityRow.appendChild(btn)
    }
    form.appendChild(severityRow)

    // Actions
    const actions = document.createElement('div')
    actions.className = 'annotate-form-actions'

    const cancelBtn = document.createElement('button')
    cancelBtn.type = 'button'
    cancelBtn.className = 'wenxin-btn annotate-form-cancel'
    cancelBtn.textContent = '取消'
    cancelBtn.addEventListener('click', () => this.closeInputForm())
    actions.appendChild(cancelBtn)

    const submitBtn = document.createElement('button')
    submitBtn.type = 'button'
    submitBtn.className = 'wenxin-btn annotate-form-submit'
    submitBtn.textContent = '提交'
    submitBtn.addEventListener('click', () => {
      const note = textarea.value.trim()
      if (!note) {
        textarea.focus()
        return
      }
      const annotation: Annotation = {
        id: generateId(),
        type: 'region',
        target: { selector: 'region', path: 'region' },
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        note,
        severity: selectedSeverity,
        createdAt: new Date().toISOString(),
      }
      this.onSubmit?.(annotation)
      this.closeInputForm()
    })
    actions.appendChild(submitBtn)

    form.appendChild(actions)

    form.style.left = `${Math.min(x, wrapperRect.width - 280)}px`
    form.style.top = `${y}px`

    this.wrapper.appendChild(form)
    this.inputForm = form

    requestAnimationFrame(() => textarea.focus())
  }

  closeInputForm(): void {
    if (this.inputForm) {
      this.inputForm.remove()
      this.inputForm = null
    }
  }

  onAnnotationSubmit(callback: AnnotationSubmitCallback): void {
    this.onSubmit = callback
  }

  destroy(): void {
    this.overlay.remove()
    this.tooltip.remove()
    this.closeInputForm()
  }
}
