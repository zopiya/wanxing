/**
 * Edit Panel — CSS property editor for selected elements.
 *
 * When an element is selected in edit mode, shows a panel with
 * common CSS properties (font-size, color, background, spacing).
 * Changes apply in real-time via postMessage to the iframe.
 */

export interface ElementStyleInfo {
  selector: string
  tagName: string
  computedStyles: Record<string, string>
}

export type StyleChangeCallback = (selector: string, property: string, value: string) => void

const EDITABLE_PROPERTIES = [
  { key: 'fontSize', label: '字号', type: 'text', group: '文字' },
  { key: 'fontWeight', label: '字重', type: 'select', options: ['400', '500', '600', '700'], group: '文字' },
  { key: 'color', label: '颜色', type: 'color', group: '文字' },
  { key: 'backgroundColor', label: '背景', type: 'color', group: '背景' },
  { key: 'padding', label: '内边距', type: 'text', group: '间距' },
  { key: 'margin', label: '外边距', type: 'text', group: '间距' },
  { key: 'borderRadius', label: '圆角', type: 'text', group: '边框' },
  { key: 'border', label: '边框', type: 'text', group: '边框' },
  { key: 'width', label: '宽度', type: 'text', group: '尺寸' },
  { key: 'height', label: '高度', type: 'text', group: '尺寸' },
  { key: 'lineHeight', label: '行高', type: 'text', group: '文字' },
  { key: 'letterSpacing', label: '字距', type: 'text', group: '文字' },
] as const

export class EditPanel {
  private container: HTMLDivElement
  private selectedElement: ElementStyleInfo | null = null
  private onChangeCallback: StyleChangeCallback | null = null
  private inputs: Map<string, HTMLInputElement | HTMLSelectElement> = new Map()

  constructor(parent: HTMLElement) {
    this.container = document.createElement('div')
    this.container.className = 'edit-panel'
    this.container.style.display = 'none'
    this.renderEmpty()
    parent.appendChild(this.container)
  }

  onSelectElement(info: ElementStyleInfo | null): void {
    this.selectedElement = info
    if (!info) {
      this.container.style.display = 'none'
      this.renderEmpty()
      return
    }
    this.container.style.display = 'flex'
    this.renderPanel(info)
  }

  onStyleChange(callback: StyleChangeCallback): void {
    this.onChangeCallback = callback
  }

  private renderEmpty(): void {
    this.container.innerHTML = '<div class="edit-panel-empty">点击元素以编辑样式</div>'
  }

  private renderPanel(info: ElementStyleInfo): void {
    this.container.innerHTML = ''
    this.inputs.clear()

    // Header
    const header = document.createElement('div')
    header.className = 'edit-panel-header'
    header.innerHTML = `<span class="edit-panel-tag">${info.tagName}</span> <span class="edit-panel-selector">${info.selector}</span>`
    this.container.appendChild(header)

    // Property groups
    const groups = new Map<string, typeof EDITABLE_PROPERTIES[number][]>()
    for (const prop of EDITABLE_PROPERTIES) {
      if (!groups.has(prop.group)) groups.set(prop.group, [])
      groups.get(prop.group)!.push(prop)
    }

    for (const [groupName, props] of groups) {
      const groupEl = document.createElement('div')
      groupEl.className = 'edit-panel-group'

      const label = document.createElement('div')
      label.className = 'edit-panel-group-label'
      label.textContent = groupName
      groupEl.appendChild(label)

      for (const prop of props) {
        const row = document.createElement('div')
        row.className = 'edit-panel-row'

        const propLabel = document.createElement('label')
        propLabel.className = 'edit-panel-prop-label'
        propLabel.textContent = prop.label
        row.appendChild(propLabel)

        let input: HTMLInputElement | HTMLSelectElement

        if (prop.type === 'select') {
          const select = document.createElement('select')
          select.className = 'edit-panel-select'
          for (const opt of prop.options) {
            const option = document.createElement('option')
            option.value = opt
            option.textContent = opt
            if (info.computedStyles[prop.key] === opt) {
              option.selected = true
            }
            select.appendChild(option)
          }
          select.addEventListener('change', () => {
            this.handleChange(prop.key, select.value)
          })
          input = select
        } else if (prop.type === 'color') {
          input = document.createElement('input')
          input.type = 'color'
          input.className = 'edit-panel-color'
          input.value = this.normalizeColor(info.computedStyles[prop.key] || '#000000')
          input.addEventListener('input', () => {
            this.handleChange(prop.key, input.value)
          })
        } else {
          input = document.createElement('input')
          input.type = 'text'
          input.className = 'edit-panel-input'
          input.value = info.computedStyles[prop.key] || ''
          input.placeholder = prop.label
          input.addEventListener('change', () => {
            this.handleChange(prop.key, input.value)
          })
        }

        this.inputs.set(prop.key, input)
        row.appendChild(input)
        groupEl.appendChild(row)
      }

      this.container.appendChild(groupEl)
    }
  }

  private handleChange(property: string, value: string): void {
    if (!this.selectedElement) return
    this.onChangeCallback?.(this.selectedElement.selector, property, value)
  }

  private normalizeColor(color: string): string {
    // Convert rgb(r,g,b) to #rrggbb
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
    if (match) {
      const r = parseInt(match[1]).toString(16).padStart(2, '0')
      const g = parseInt(match[2]).toString(16).padStart(2, '0')
      const b = parseInt(match[3]).toString(16).padStart(2, '0')
      return `#${r}${g}${b}`
    }
    return color || '#000000'
  }

  destroy(): void {
    this.container.remove()
    this.inputs.clear()
    this.selectedElement = null
    this.onChangeCallback = null
  }
}
