/**
 * Persistence — Loads annotations on page init, auto-saves on change.
 *
 * - On load: GET /api/annotations?slug=<slug>
 * - sourceHash must match current page hash to load old annotations
 * - Auto-saves on every annotation change (debounced)
 */

import type { Annotation } from './types'
import { loadAnnotations, exportAnnotations } from './export'

const SAVE_DEBOUNCE_MS = 500

export class AnnotationPersistence {
  private slug: string
  private sourceHash: string
  private annotations: Annotation[] = []
  private saveTimer: ReturnType<typeof setTimeout> | null = null

  constructor(slug: string, sourceHash: string) {
    this.slug = slug
    this.sourceHash = sourceHash
  }

  /**
   * Load annotations from server. Only loads if sourceHash matches.
   */
  async load(): Promise<Annotation[]> {
    const file = await loadAnnotations(this.slug)
    if (!file) return []

    if (file.sourceHash !== this.sourceHash) {
      // Source changed — don't load stale annotations
      return []
    }

    this.annotations = file.annotations
    return [...this.annotations]
  }

  /**
   * Get current in-memory annotations.
   */
  getAnnotations(): Annotation[] {
    return [...this.annotations]
  }

  /**
   * Replace all annotations and trigger debounced save.
   */
  setAnnotations(annotations: Annotation[]): void {
    this.annotations = annotations
    this.scheduleSave()
  }

  /**
   * Add an annotation and trigger save.
   */
  addAnnotation(annotation: Annotation): void {
    this.annotations.push(annotation)
    this.scheduleSave()
  }

  /**
   * Remove an annotation by id and trigger save.
   */
  removeAnnotation(id: string): void {
    this.annotations = this.annotations.filter((a) => a.id !== id)
    this.scheduleSave()
  }

  /**
   * Update severity and trigger save.
   */
  updateSeverity(id: string, severity: Annotation['severity']): void {
    const a = this.annotations.find((ann) => ann.id === id)
    if (a) {
      a.severity = severity
      this.scheduleSave()
    }
  }

  /**
   * Save immediately (used on explicit export).
   */
  async saveNow(): Promise<boolean> {
    if (this.saveTimer) {
      clearTimeout(this.saveTimer)
      this.saveTimer = null
    }
    return exportAnnotations(this.slug, this.sourceHash, this.annotations)
  }

  private scheduleSave(): void {
    if (this.saveTimer) clearTimeout(this.saveTimer)
    this.saveTimer = setTimeout(() => {
      void exportAnnotations(this.slug, this.sourceHash, this.annotations)
      this.saveTimer = null
    }, SAVE_DEBOUNCE_MS)
  }

  destroy(): void {
    if (this.saveTimer) {
      clearTimeout(this.saveTimer)
      this.saveTimer = null
    }
  }
}
