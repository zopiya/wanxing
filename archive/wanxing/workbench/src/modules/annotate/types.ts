/**
 * Annotate Module — Shared types.
 *
 * Schema matches the annotations JSON contract.
 */

export type AnnotationType = 'element' | 'region'
export type Severity = 'info' | 'warning' | 'critical'

export interface AnnotationRect {
  x: number
  y: number
  width: number
  height: number
}

export interface AnnotationTarget {
  selector: string
  path: string
}

export interface Annotation {
  id: string
  type: AnnotationType
  target: AnnotationTarget
  rect: AnnotationRect
  note: string
  severity: Severity
  createdAt: string
}

export interface AnnotationsFile {
  version: 1
  project: string
  sourceHash: string
  createdAt: string
  annotations: Annotation[]
}

export function createEmptyAnnotationsFile(
  project: string,
  sourceHash: string,
): AnnotationsFile {
  return {
    version: 1,
    project,
    sourceHash,
    createdAt: new Date().toISOString(),
    annotations: [],
  }
}

export function generateId(): string {
  return crypto.randomUUID()
}
