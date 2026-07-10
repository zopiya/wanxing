/**
 * Export — Saves annotations to server via POST /api/annotations.
 *
 * Calls the API endpoint which writes to dist/<slug>/tmp/annotations.json.
 */

import type { Annotation, AnnotationsFile } from './types'

const API_BASE = '/api/annotations'

export async function exportAnnotations(
  slug: string,
  sourceHash: string,
  annotations: Annotation[],
): Promise<boolean> {
  const file: AnnotationsFile = {
    version: 1,
    project: slug,
    sourceHash,
    createdAt: new Date().toISOString(),
    annotations,
  }

  try {
    const res = await fetch(`${API_BASE}?slug=${encodeURIComponent(slug)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(file),
    })
    return res.ok
  } catch {
    return false
  }
}

export async function loadAnnotations(
  slug: string,
): Promise<AnnotationsFile | null> {
  try {
    const res = await fetch(`${API_BASE}?slug=${encodeURIComponent(slug)}`)
    if (!res.ok) return null
    const data: unknown = await res.json()
    if (typeof data !== 'object' || data === null) return null
    const file = data as AnnotationsFile
    if (file.version !== 1 || !Array.isArray(file.annotations)) return null
    return file
  } catch {
    return null
  }
}
