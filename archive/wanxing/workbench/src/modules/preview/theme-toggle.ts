/**
 * Theme Toggle — Light / Dark mode switching for preview iframe.
 *
 * Sends theme via postMessage to iframe, or falls back to URL param reload.
 */

export type ThemeMode = 'light' | 'dark'
export type ThemeChangeCallback = (theme: ThemeMode) => void

export class ThemeToggle {
  private container: HTMLDivElement
  private theme: ThemeMode = 'light'
  private onChange: ThemeChangeCallback | null = null

  constructor(parent: HTMLElement) {
    this.container = document.createElement('div')
    this.container.className = 'preview-theme-toggle'
    this.render()
    parent.appendChild(this.container)
  }

  private render(): void {
    this.container.innerHTML = ''

    const btn = document.createElement('button')
    btn.className = 'wenxin-btn preview-theme-btn'
    btn.setAttribute('aria-label', '切换暗色模式')
    btn.setAttribute(
      'aria-pressed',
      this.theme === 'dark' ? 'true' : 'false',
    )

    // Sun / Moon icon via text
    btn.textContent = this.theme === 'dark' ? '☾ 暗色' : '☀ 亮色'

    btn.addEventListener('click', () => {
      this.toggle()
    })

    this.container.appendChild(btn)
  }

  private toggle(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
    this.render()
    if (this.onChange) {
      this.onChange(this.theme)
    }
  }

  onThemeChange(callback: ThemeChangeCallback): void {
    this.onChange = callback
  }

  getTheme(): ThemeMode {
    return this.theme
  }

  setTheme(theme: ThemeMode): void {
    this.theme = theme
    this.render()
  }
}
