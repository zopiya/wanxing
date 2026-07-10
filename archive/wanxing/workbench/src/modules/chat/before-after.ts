/**
 * Before/After Comparison — Slider-based screenshot comparison component.
 *
 * Provides:
 *   - Side-by-side comparison with draggable slider
 *   - Screenshot selection from available screenshots
 *   - Wenxin-styled comparison view
 *
 * Public API:
 *   createComparisonSelector(slug, onSelect) — build screenshot selection UI
 *   createComparisonView(data)               — build the comparison slider
 */

import type { ScreenshotInfo, BeforeAfterData } from './types'

// ---------------------------------------------------------------------------
// Screenshot fetching
// ---------------------------------------------------------------------------

/** Fetch available screenshots for a project slug. */
export async function fetchScreenshots(slug: string): Promise<ScreenshotInfo[]> {
  try {
    const res = await fetch(`/api/screenshots?slug=${encodeURIComponent(slug)}`)
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

// ---------------------------------------------------------------------------
// Comparison Selector UI
// ---------------------------------------------------------------------------

export type ComparisonSelectCallback = (before: ScreenshotInfo, after: ScreenshotInfo) => void

/**
 * Create a screenshot selector for Before/After comparison.
 * Shows two dropdowns for selecting before/after screenshots.
 */
export function createComparisonSelector(
  slug: string,
  onSelect: ComparisonSelectCallback,
): HTMLDivElement {
  const container = document.createElement('div')
  container.className = 'chat-comparison-selector'

  const title = document.createElement('div')
  title.className = 'chat-comparison-selector-title'
  title.textContent = '选择对比截图'
  container.appendChild(title)

  const selectors = document.createElement('div')
  selectors.className = 'chat-comparison-selectors'

  // Before selector
  const beforeGroup = createSelectGroup('Before（修改前）', 'before')
  selectors.appendChild(beforeGroup)

  // After selector
  const afterGroup = createSelectGroup('After（修改后）', 'after')
  selectors.appendChild(afterGroup)

  container.appendChild(selectors)

  // Confirm button
  const confirmBtn = document.createElement('button')
  confirmBtn.className = 'wenxin-btn chat-comparison-confirm'
  confirmBtn.textContent = '创建对比'
  confirmBtn.disabled = true
  container.appendChild(confirmBtn)

  // Load screenshots and populate dropdowns
  let screenshots: ScreenshotInfo[] = []
  let selectedBefore: ScreenshotInfo | null = null
  let selectedAfter: ScreenshotInfo | null = null

  const beforeSelect = beforeGroup.querySelector('select') as HTMLSelectElement
  const afterSelect = afterGroup.querySelector('select') as HTMLSelectElement

  function updateConfirmState(): void {
    confirmBtn.disabled = !selectedBefore || !selectedAfter || selectedBefore === selectedAfter
  }

  beforeSelect.addEventListener('change', () => {
    const name = beforeSelect.value
    selectedBefore = screenshots.find((s) => s.name === name) ?? null
    updateConfirmState()
  })

  afterSelect.addEventListener('change', () => {
    const name = afterSelect.value
    selectedAfter = screenshots.find((s) => s.name === name) ?? null
    updateConfirmState()
  })

  confirmBtn.addEventListener('click', () => {
    if (selectedBefore && selectedAfter) {
      onSelect(selectedBefore, selectedAfter)
    }
  })

  // Fetch screenshots
  fetchScreenshots(slug).then((items) => {
    screenshots = items
    if (items.length === 0) {
      const empty = document.createElement('div')
      empty.className = 'chat-comparison-empty'
      empty.textContent = '暂无截图。请先截取设计截图。'
      container.appendChild(empty)
      return
    }

    for (const s of items) {
      const opt1 = document.createElement('option')
      opt1.value = s.name
      opt1.textContent = formatScreenshotName(s.name)
      beforeSelect.appendChild(opt1)

      const opt2 = document.createElement('option')
      opt2.value = s.name
      opt2.textContent = formatScreenshotName(s.name)
      afterSelect.appendChild(opt2)
    }
  })

  return container
}

function createSelectGroup(label: string, id: string): HTMLDivElement {
  const group = document.createElement('div')
  group.className = 'chat-comparison-select-group'

  const labelEl = document.createElement('label')
  labelEl.className = 'chat-comparison-label'
  labelEl.textContent = label
  labelEl.setAttribute('for', `comparison-${id}`)
  group.appendChild(labelEl)

  const select = document.createElement('select')
  select.className = 'chat-comparison-select'
  select.id = `comparison-${id}`
  select.setAttribute('aria-label', label)

  const defaultOpt = document.createElement('option')
  defaultOpt.value = ''
  defaultOpt.textContent = '请选择截图…'
  defaultOpt.disabled = true
  defaultOpt.selected = true
  select.appendChild(defaultOpt)

  group.appendChild(select)
  return group
}

/** Format screenshot filename for display. */
function formatScreenshotName(name: string): string {
  // Remove .png extension and replace separators
  return name
    .replace(/\.png$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

// ---------------------------------------------------------------------------
// Comparison View — Draggable slider
// ---------------------------------------------------------------------------

/**
 * Create a Before/After comparison view with a draggable slider.
 * The slider overlays the "after" image on top of the "before" image.
 */
export function createComparisonView(data: BeforeAfterData): HTMLDivElement {
  const container = document.createElement('div')
  container.className = 'chat-comparison-view'
  container.setAttribute('role', 'img')
  container.setAttribute(
    'aria-label',
    `Before/After 对比: ${data.before.name} vs ${data.after.name}`,
  )

  // Label
  if (data.label) {
    const label = document.createElement('div')
    label.className = 'chat-comparison-label-text'
    label.textContent = data.label
    container.appendChild(label)
  }

  // Image container
  const imageContainer = document.createElement('div')
  imageContainer.className = 'chat-comparison-images'

  // Before image (bottom layer)
  const beforeImg = document.createElement('img')
  beforeImg.className = 'chat-comparison-img chat-comparison-img-before'
  beforeImg.src = data.before.url
  beforeImg.alt = `Before: ${data.before.name}`
  beforeImg.loading = 'lazy'
  imageContainer.appendChild(beforeImg)

  // After image (top layer, clipped)
  const afterWrapper = document.createElement('div')
  afterWrapper.className = 'chat-comparison-after-wrapper'
  const afterImg = document.createElement('img')
  afterImg.className = 'chat-comparison-img chat-comparison-img-after'
  afterImg.src = data.after.url
  afterImg.alt = `After: ${data.after.name}`
  afterImg.loading = 'lazy'
  afterWrapper.appendChild(afterImg)
  imageContainer.appendChild(afterWrapper)

  // Slider handle
  const slider = document.createElement('div')
  slider.className = 'chat-comparison-slider'
  slider.setAttribute('role', 'slider')
  slider.setAttribute('aria-label', '拖动调整对比位置')
  slider.setAttribute('aria-valuemin', '0')
  slider.setAttribute('aria-valuemax', '100')
  slider.setAttribute('aria-valuenow', '50')
  slider.setAttribute('tabindex', '0')

  const handleLine = document.createElement('div')
  handleLine.className = 'chat-comparison-slider-line'
  slider.appendChild(handleLine)

  const handleGrip = document.createElement('div')
  handleGrip.className = 'chat-comparison-slider-grip'
  handleGrip.innerHTML = '◄ ►'
  slider.appendChild(handleGrip)

  imageContainer.appendChild(slider)

  // Labels
  const beforeLabel = document.createElement('div')
  beforeLabel.className = 'chat-comparison-side-label chat-comparison-side-label-before'
  beforeLabel.textContent = 'Before'
  imageContainer.appendChild(beforeLabel)

  const afterLabel = document.createElement('div')
  afterLabel.className = 'chat-comparison-side-label chat-comparison-side-label-after'
  afterLabel.textContent = 'After'
  imageContainer.appendChild(afterLabel)

  container.appendChild(imageContainer)

  // Drag interaction
  let isDragging = false
  let sliderPosition = 50

  function updateSliderPosition(percent: number): void {
    sliderPosition = Math.max(0, Math.min(100, percent))
    afterWrapper.style.clipPath = `inset(0 0 0 ${sliderPosition}%)`
    slider.style.left = `${sliderPosition}%`
    slider.setAttribute('aria-valuenow', String(Math.round(sliderPosition)))
  }

  function handlePointerMove(clientX: number): void {
    if (!isDragging) return
    const rect = imageContainer.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = (x / rect.width) * 100
    updateSliderPosition(percent)
  }

  slider.addEventListener('mousedown', (e) => {
    isDragging = true
    e.preventDefault()
  })

  slider.addEventListener('touchstart', (e) => {
    isDragging = true
    e.preventDefault()
  })

  document.addEventListener('mousemove', (e) => {
    handlePointerMove(e.clientX)
  })

  document.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX)
    }
  })

  document.addEventListener('mouseup', () => {
    isDragging = false
  })

  document.addEventListener('touchend', () => {
    isDragging = false
  })

  // Keyboard support
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      updateSliderPosition(sliderPosition - 2)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      updateSliderPosition(sliderPosition + 2)
    }
  })

  // Initialize position
  updateSliderPosition(50)

  return container
}
