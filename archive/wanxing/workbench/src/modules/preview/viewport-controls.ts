/**
 * Viewport Controls — Desktop / Tablet / Mobile viewport switching.
 *
 * Three preset viewports:
 *   Desktop: 1440×900
 *   Tablet:  768×1024
 *   Mobile:  375×812
 *
 * UI uses wenxin-style outlined buttons.
 */

export interface ViewportPreset {
  name: string
  label: string
  width: number
  height: number
}

export const VIEWPORT_PRESETS: ViewportPreset[] = [
  { name: 'desktop', label: 'Desktop', width: 1440, height: 900 },
  { name: 'tablet', label: 'Tablet', width: 768, height: 1024 },
  { name: 'mobile', label: 'Mobile', width: 375, height: 812 },
]

export type ViewportChangeCallback = (preset: ViewportPreset) => void

export class ViewportControls {
  private container: HTMLDivElement
  private active: string = 'desktop'
  private onChange: ViewportChangeCallback | null = null

  constructor(parent: HTMLElement) {
    this.container = document.createElement('div')
    this.container.className = 'preview-viewport-controls'
    this.render()
    parent.appendChild(this.container)
  }

  private render(): void {
    this.container.innerHTML = ''

    for (const preset of VIEWPORT_PRESETS) {
      const btn = document.createElement('button')
      btn.className = 'wenxin-btn preview-viewport-btn'
      btn.textContent = preset.label
      btn.setAttribute('data-viewport', preset.name)
      btn.setAttribute(
        'aria-pressed',
        preset.name === this.active ? 'true' : 'false',
      )
      if (preset.name === this.active) {
        btn.classList.add('active')
      }
      btn.addEventListener('click', () => {
        this.setActive(preset.name)
      })
      this.container.appendChild(btn)
    }
  }

  private setActive(name: string): void {
    this.active = name
    this.render()
    const preset = VIEWPORT_PRESETS.find((p) => p.name === name)
    if (preset && this.onChange) {
      this.onChange(preset)
    }
  }

  onViewportChange(callback: ViewportChangeCallback): void {
    this.onChange = callback
  }

  getActivePreset(): ViewportPreset {
    return (
      VIEWPORT_PRESETS.find((p) => p.name === this.active) ??
      VIEWPORT_PRESETS[0]
    )
  }

  setActiveByName(name: string): void {
    if (VIEWPORT_PRESETS.some((p) => p.name === name)) {
      this.setActive(name)
    }
  }
}
