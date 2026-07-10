/**
 * Region Selector — Shift+drag to draw a rectangular region for annotation.
 *
 * - Listens for mousedown on the wrapper with Shift held
 * - Draws a rubber-band rectangle during drag
 * - On mouseup, opens annotation input form via Inspector
 */

export type RegionCompleteCallback = (
  rect: { x: number; y: number; width: number; height: number },
) => void

export class RegionSelector {
  private wrapper: HTMLElement
  private selectionDiv: HTMLDivElement | null = null
  private startX = 0
  private startY = 0
  private dragging = false
  private onComplete: RegionCompleteCallback | null = null
  private enabled = false

  constructor(wrapper: HTMLElement) {
    this.wrapper = wrapper
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  enable(): void {
    if (this.enabled) return
    this.enabled = true
    this.wrapper.addEventListener('mousedown', this.handleMouseDown)
  }

  disable(): void {
    this.enabled = false
    this.cancelDrag()
    this.wrapper.removeEventListener('mousedown', this.handleMouseDown)
  }

  onRegionComplete(callback: RegionCompleteCallback): void {
    this.onComplete = callback
  }

  private handleMouseDown(e: MouseEvent): void {
    if (!e.shiftKey || e.button !== 0) return
    // Only respond to clicks on the wrapper itself or the iframe wrapper
    const target = e.target as HTMLElement
    if (
      !target.classList.contains('preview-iframe-wrapper') &&
      !target.classList.contains('preview-viewer-slot') &&
      target.tagName !== 'IFRAME'
    ) {
      return
    }

    e.preventDefault()
    this.dragging = true

    const wrapperRect = this.wrapper.getBoundingClientRect()
    this.startX = e.clientX - wrapperRect.left + this.wrapper.scrollLeft
    this.startY = e.clientY - wrapperRect.top + this.wrapper.scrollTop

    this.selectionDiv = document.createElement('div')
    this.selectionDiv.className = 'annotate-region-selection'
    this.selectionDiv.style.left = `${this.startX}px`
    this.selectionDiv.style.top = `${this.startY}px`
    this.selectionDiv.style.width = '0'
    this.selectionDiv.style.height = '0'
    this.wrapper.appendChild(this.selectionDiv)

    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  private handleMouseMove(e: MouseEvent): void {
    if (!this.dragging || !this.selectionDiv) return

    const wrapperRect = this.wrapper.getBoundingClientRect()
    const currentX = e.clientX - wrapperRect.left + this.wrapper.scrollLeft
    const currentY = e.clientY - wrapperRect.top + this.wrapper.scrollTop

    const x = Math.min(this.startX, currentX)
    const y = Math.min(this.startY, currentY)
    const w = Math.abs(currentX - this.startX)
    const h = Math.abs(currentY - this.startY)

    this.selectionDiv.style.left = `${x}px`
    this.selectionDiv.style.top = `${y}px`
    this.selectionDiv.style.width = `${w}px`
    this.selectionDiv.style.height = `${h}px`
  }

  private handleMouseUp(_e: MouseEvent): void {
    if (!this.dragging) return

    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)

    if (this.selectionDiv) {
      const left = parseFloat(this.selectionDiv.style.left)
      const top = parseFloat(this.selectionDiv.style.top)
      const width = parseFloat(this.selectionDiv.style.width)
      const height = parseFloat(this.selectionDiv.style.height)

      // Remove selection visual
      this.selectionDiv.remove()
      this.selectionDiv = null

      // Only complete if the region has meaningful size
      if (width > 10 && height > 10) {
        // Convert wrapper-space coordinates to iframe-space
        const iframe = this.wrapper.querySelector('iframe') as HTMLIFrameElement | null
        if (iframe) {
          const iframeRect = iframe.getBoundingClientRect()
          const wrapperRect = this.wrapper.getBoundingClientRect()
          const scale = iframeRect.width / (parseInt(iframe.style.width) || iframeRect.width)

          const offsetX = iframeRect.left - wrapperRect.left + this.wrapper.scrollLeft
          const offsetY = iframeRect.top - wrapperRect.top + this.wrapper.scrollTop

          const iframeX = (left - offsetX) / scale
          const iframeY = (top - offsetY) / scale
          const iframeW = width / scale
          const iframeH = height / scale

          this.onComplete?.({
            x: iframeX,
            y: iframeY,
            width: iframeW,
            height: iframeH,
          })
        }
      }
    }

    this.dragging = false
  }

  private cancelDrag(): void {
    this.dragging = false
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
    if (this.selectionDiv) {
      this.selectionDiv.remove()
      this.selectionDiv = null
    }
  }

  destroy(): void {
    this.disable()
  }
}
