/**
 * Bridge Module — Unified entry point for bridge functionality.
 *
 * Exports:
 *   - Audit runner (render-audit.mjs integration)
 *   - File watcher (chokidar monitoring)
 *   - Server checker (localhost:8000 detection)
 *   - WebSocket client (real-time updates)
 */

// Audit runner — server-side only
export { runAudit } from './audit-runner'
export type { AuditReport, AuditResult } from './audit-runner'

// File watcher — server-side only
export { createFileWatcher } from './file-watcher'
export type { FileEvent } from './file-watcher'

// Server checker — client-side
export { createServerChecker } from './server-check'
export type { ServerChecker, ServerStatus } from './server-check'

// Post-message bridge — client-side
export * from './post-message'

// Slug validation — shared utility
export { isValidSlug } from './slug'
