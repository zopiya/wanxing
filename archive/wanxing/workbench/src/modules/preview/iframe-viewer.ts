/**
 * Iframe Viewer — Creates and manages the preview iframe.
 *
 * - Dynamically creates an iframe for dist/<slug>/index.html
 * - CSS isolation: border:none, full width/height within wrapper
 * - Zoom adaptation: CSS transform scale when container < iframe width
 * - Theme communication via postMessage
 */

export interface ViewportSize {
  width: number
  height: number
}

export interface IframeViewerOptions {
  slug: string
  viewport: ViewportSize
  theme?: 'light' | 'dark'
  container: HTMLElement
}

export class IframeViewer {
  private iframe: HTMLIFrameElement | null = null
  private wrapper: HTMLDivElement | null = null
  private slug: string
  private viewport: ViewportSize
  private theme: 'light' | 'dark'
  private resizeObserver: ResizeObserver | null = null
  private visibilityObserver: IntersectionObserver | null = null
  private loaded = false

  constructor(options: IframeViewerOptions) {
    this.slug = options.slug
    this.viewport = options.viewport
    this.theme = options.theme ?? 'light'
    this.wrapper = this.createWrapper()
    this.iframe = this.createIframe()
    this.wrapper.appendChild(this.iframe)
    options.container.appendChild(this.wrapper)
    this.observeResize()
    this.observeVisibility()
  }

  private createWrapper(): HTMLDivElement {
    const wrapper = document.createElement('div')
    wrapper.className = 'preview-iframe-wrapper'
    return wrapper
  }

  private createIframe(): HTMLIFrameElement {
    const iframe = document.createElement('iframe')
    iframe.className = 'preview-iframe'
    iframe.setAttribute('tabindex', '-1')
    iframe.title = `预览: ${this.slug}`
    iframe.style.border = 'none'
    iframe.style.width = `${this.viewport.width}px`
    iframe.style.height = `${this.viewport.height}px`
    // Defer src loading — will be set by visibility observer
    iframe.loading = 'lazy'
    return iframe
  }

  private buildSrc(file = 'index.html'): string {
    const params = new URLSearchParams()
    if (this.theme === 'dark') {
      params.set('theme', 'dark')
    }
    const qs = params.toString()
    return `/dist/${this.slug}/${file}${qs ? '?' + qs : ''}`
  }

  private observeResize(): void {
    if (!this.wrapper) return
    this.resizeObserver = new ResizeObserver(() => {
      this.updateScale()
    })
    this.resizeObserver.observe(this.wrapper)
  }

  private observeVisibility(): void {
    if (!this.wrapper) return
    this.visibilityObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !this.loaded) {
          this.loaded = true
          this.loadIframe()
          // Disconnect after first load — no need to keep observing
          this.visibilityObserver?.disconnect()
          this.visibilityObserver = null
        }
      },
      { threshold: 0.01 },
    )
    this.visibilityObserver.observe(this.wrapper)
  }

  /** Set the iframe src to actually start loading content. */
  private loadIframe(): void {
    if (this.iframe && !this.iframe.src) {
      this.iframe.src = this.buildSrc()
    }
  }

  private updateScale(): void {
    if (!this.wrapper || !this.iframe) return
    const containerWidth = this.wrapper.clientWidth
    const iframeWidth = this.viewport.width

    if (containerWidth < iframeWidth) {
      const scale = containerWidth / iframeWidth
      this.iframe.style.transform = `scale(${scale})`
      this.iframe.style.transformOrigin = 'top left'
      // Keep wrapper height proportional to scaled iframe
      this.wrapper.style.height = `${this.viewport.height * scale}px`
    } else {
      this.iframe.style.transform = ''
      this.iframe.style.transformOrigin = ''
      this.wrapper.style.height = ''
    }
  }

  setViewport(viewport: ViewportSize): void {
    this.viewport = viewport
    if (this.iframe) {
      this.iframe.style.width = `${viewport.width}px`
      this.iframe.style.height = `${viewport.height}px`
    }
    this.updateScale()
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.theme = theme
    if (this.iframe?.contentWindow) {
      this.iframe.contentWindow.postMessage(
        { type: 'wanxing-theme', theme },
        '*',
      )
    }
    // Also update URL param for full reload scenarios
    if (this.iframe) {
      this.iframe.src = this.buildSrc()
    }
  }

  setPage(file: string): void {
    if (!this.iframe) return
    this.iframe.src = this.buildSrc(file)
  }

  getSlug(): string {
    return this.slug
  }

  getViewport(): ViewportSize {
    return { ...this.viewport }
  }

  getTheme(): 'light' | 'dark' {
    return this.theme
  }

  /**
   * Get the underlying iframe element (for annotate module integration).
   */
  getIframe(): HTMLIFrameElement | null {
    return this.iframe
  }

  /**
   * Get the iframe wrapper element.
   */
  getWrapper(): HTMLDivElement | null {
    return this.wrapper
  }

  /**
   * Reload the iframe content.
   * Used when files change in dist/ to refresh the preview.
   */
  reload(): void {
    if (this.iframe) {
      this.iframe.src = this.buildSrc()
    }
  }

  destroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
    if (this.visibilityObserver) {
      this.visibilityObserver.disconnect()
      this.visibilityObserver = null
    }
    if (this.iframe) {
      this.iframe.remove()
      this.iframe = null
    }
    if (this.wrapper) {
      this.wrapper.remove()
      this.wrapper = null
    }
  }
}
