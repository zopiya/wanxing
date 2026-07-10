/**
 * Info Bar — Displays preview metadata at the top of the preview area.
 *
 * Shows: project name, current viewport dimensions, dark mode status.
 * Updates in real-time when viewport or theme changes.
 */

export interface InfoBarData {
  slug: string
  viewportWidth: number
  viewportHeight: number
  theme: 'light' | 'dark'
}

export class InfoBar {
  private container: HTMLDivElement
  private data: InfoBarData

  constructor(parent: HTMLElement, initial: InfoBarData) {
    this.data = initial
    this.container = document.createElement('div')
    this.container.className = 'preview-info-bar'
    this.container.setAttribute('aria-live', 'polite')
    this.container.setAttribute('role', 'status')
    this.render()
    parent.appendChild(this.container)
  }

  private render(): void {
    const themeLabel = this.data.theme === 'dark' ? '暗色' : '亮色'
    this.container.innerHTML = `
      <span class="preview-info-slug">${this.data.slug}</span>
      <span class="preview-info-sep">·</span>
      <span class="preview-info-viewport">${this.data.viewportWidth} × ${this.data.viewportHeight}</span>
      <span class="preview-info-sep">·</span>
      <span class="preview-info-theme">${themeLabel}</span>
    `
  }

  update(data: Partial<InfoBarData>): void {
    Object.assign(this.data, data)
    this.render()
  }

  destroy(): void {
    this.container.remove()
  }
}
