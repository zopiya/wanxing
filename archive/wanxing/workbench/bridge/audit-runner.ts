/**
 * Audit Runner — Spawns render-audit.mjs and returns JSON results.
 *
 * Usage:
 *   const result = await runAudit('my-project')
 *   // result = { success: true, report: { ... } }
 */

import { spawn } from 'node:child_process'
import { resolve } from 'node:path'
import { isValidSlug } from './slug'

export interface AuditReport {
  audit: {
    tool: string
    version: number
    generatedAt: string
    source: string
    sourceFile: string
    sourceHash: string
  }
  contract: Record<string, unknown> | null
  metrics: Record<string, unknown>
  hardGates: Array<{ code: string; message: string; detail?: unknown }>
  warnings: Array<{ code: string; message: string; detail?: unknown }>
  result: 'pass' | 'warn' | 'fail'
}

export interface AuditResult {
  success: boolean
  report: AuditReport | null
  error: string | null
  exitCode: number
}

const PROJECT_ROOT = resolve(process.cwd(), '..')

const AUDIT_SCRIPT = resolve(
  PROJECT_ROOT,
  '.opencode',
  'tools',
  'render-audit',
  'render-audit.mjs',
)

const TIMEOUT_MS = 30_000

/**
 * Run render-audit.mjs for a given project slug.
 * Spawns a child process and collects stdout JSON.
 */
export async function runAudit(slug: string): Promise<AuditResult> {
  if (!isValidSlug(slug)) {
    return {
      success: false,
      report: null,
      error: 'Invalid project slug',
      exitCode: 2,
    }
  }

  const inputFile = `dist/${slug}/index.html`
  const cwd = PROJECT_ROOT

  return new Promise((resolvePromise) => {
    const child = spawn('node', [AUDIT_SCRIPT, inputFile], {
      cwd,
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: TIMEOUT_MS,
    })

    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (chunk: Buffer) => {
      stdout += chunk.toString()
    })

    child.stderr.on('data', (chunk: Buffer) => {
      stderr += chunk.toString()
    })

    child.on('error', (err) => {
      resolvePromise({
        success: false,
        report: null,
        error: `Process error: ${err.message}`,
        exitCode: 1,
      })
    })

    child.on('close', (code) => {
      if (code === 2) {
        resolvePromise({
          success: false,
          report: null,
          error: stderr.trim() || 'Audit script exited with code 2 (usage/file not found)',
          exitCode: 2,
        })
        return
      }

      try {
        const parsed: unknown = JSON.parse(stdout)
        if (typeof parsed !== 'object' || parsed === null) {
          resolvePromise({
            success: false,
            report: null,
            error: `Audit JSON is not an object: ${stdout.slice(0, 200)}`,
            exitCode: code ?? 1,
          })
          return
        }
        const report = parsed as AuditReport
        if (typeof report.result !== 'string' || !['pass', 'warn', 'fail'].includes(report.result)) {
          resolvePromise({
            success: false,
            report: null,
            error: `Audit JSON missing valid result field: ${stdout.slice(0, 200)}`,
            exitCode: code ?? 1,
          })
          return
        }
        resolvePromise({
          success: true,
          report,
          error: null,
          exitCode: code ?? 0,
        })
      } catch {
        resolvePromise({
          success: false,
          report: null,
          error: `Failed to parse audit JSON: ${stdout.slice(0, 200)}`,
          exitCode: code ?? 1,
        })
      }
    })
  })
}
