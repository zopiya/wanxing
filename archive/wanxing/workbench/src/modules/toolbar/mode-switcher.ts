/**
 * Mode Switcher — Toolbar for switching between preview interaction modes.
 *
 * Modes:
 *   Mark up (M)  — hover highlight + click to annotate
 *   Edit (E)     — double-click to edit element text
 *
 * Usage:
 *   const switcher = new ModeSwitcher(container)
 *   switcher.onModeChange((mode) => { ... })
 */

export type PreviewMode = 'markup' | 'edit'

const MODE_CONFIG: Array<{
  mode: PreviewMode
  label: string
  shortcut: string
  description: string
}> = [
  { mode: 'markup', label: '标注', shortcut: 'M', description: '悬停高亮，点击添加批注' },
  { mode: 'edit', label: '编辑', shortcut: 'E', description: '双击编辑元素文本' },
]

export type ModeChangeCallback = (mode: PreviewMode) => void

export class ModeSwitcher {
  private container: HTMLElement
  private currentMode: PreviewMode = 'markup'
  private buttons: Map<PreviewMode, HTMLButtonElement> = new Map()
  private onChangeCallback: ModeChangeCallback | null = null

  constructor(parent: HTMLElement) {
    this.container = document.createElement('div')
    this.container.className = 'toolbar-mode-switcher'
    this.container.setAttribute('role', 'radiogroup')
    this.container.setAttribute('aria-label', '预览模式')
    this.render()
    parent.appendChild(this.container)
  }

  getMode(): PreviewMode {
    return this.currentMode
  }

  setMode(mode: PreviewMode): void {
    if (mode === this.currentMode) return
    this.currentMode = mode
    this.updateButtons()
    this.onChangeCallback?.(mode)
  }

  onModeChange(callback: ModeChangeCallback): void {
    this.onChangeCallback = callback
  }

  private render(): void {
    for (const config of MODE_CONFIG) {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'toolbar-mode-btn'
      btn.setAttribute('role', 'radio')
      btn.setAttribute('aria-checked', config.mode === this.currentMode ? 'true' : 'false')
      btn.setAttribute('data-mode', config.mode)
      btn.setAttribute('title', `${config.description} (${config.shortcut})`)
      btn.textContent = config.label

      if (config.mode === this.currentMode) {
        btn.classList.add('active')
      }

      btn.addEventListener('click', () => {
        this.setMode(config.mode)
      })

      this.buttons.set(config.mode, btn)
      this.container.appendChild(btn)
    }
  }

  private updateButtons(): void {
    for (const [mode, btn] of this.buttons) {
      const isActive = mode === this.currentMode
      btn.classList.toggle('active', isActive)
      btn.setAttribute('aria-checked', isActive ? 'true' : 'false')
    }
  }

  destroy(): void {
    this.container.remove()
    this.buttons.clear()
    this.onChangeCallback = null
  }
}
