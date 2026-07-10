/**
 * Prompt Builder — Converts annotation data into a structured prompt
 * for the AI agent to process visual feedback.
 *
 * Public API:
 *   buildPrompt(annotations, slug)  — generate a prompt string from annotations
 */

import type { Annotation } from '../modules/annotate/types'

/**
 * Format an annotation rect as a readable coordinate string.
 */
function formatRect(rect: Annotation['rect']): string {
  const x = Math.round(rect.x)
  const y = Math.round(rect.y)
  const w = Math.round(rect.width)
  const h = Math.round(rect.height)
  return `(${x}, ${y}, ${w}, ${h})`
}

export function buildPrompt(annotations: Annotation[], slug: string): string {
  if (annotations.length === 0) return ''

  const lines: string[] = []
  lines.push(`修改 dist/${slug}/index.html：`)

  for (let i = 0; i < annotations.length; i++) {
    const a = annotations[i]
    const num = i + 1
    if (a.type === 'element') {
      lines.push(`#${num} [${a.target.selector}] (${formatRect(a.rect)}): ${a.note}`)
    } else {
      lines.push(`#${num} [区域 ${Math.round(a.rect.width)}×${Math.round(a.rect.height)}]: ${a.note}`)
    }
  }

  return lines.join('\n')
}
