/**
 * Persistence — Read/write workbench-state.json via /api/state.
 *
 * API:
 *   loadState(slug)   — GET /api/state?slug=<slug>
 *   saveState(state)  — POST /api/state  (body: JSON)
 *
 * On page load, auto-merges loaded state into UI via callback.
 */

import type { WorkbenchState } from './types'
import { createEmptyState } from './types'

const API_BASE = '/api/state'

export type StateChangeCallback = (state: WorkbenchState) => void

export class Persistence {
  private slug: string
  private state: WorkbenchState
  private onChange: StateChangeCallback | null = null

  constructor(slug: string) {
    this.slug = slug
    this.state = createEmptyState(slug)
  }

  /**
   * Load state from server. Merges with current in-memory state
   * (server wins on conflict — last-writer-wins by lastUpdated).
   * Returns the merged state.
   */
  async load(): Promise<WorkbenchState> {
    try {
      const res = await fetch(`${API_BASE}?slug=${encodeURIComponent(this.slug)}`)
      if (!res.ok) {
        // No saved state yet — keep empty
        return this.state
      }
      const data: unknown = await res.json()
      if (typeof data !== 'object' || data === null) {
        return this.state
      }
      const serverState = data as WorkbenchState
      if (!Array.isArray(serverState.auditRounds)) {
        return this.state
      }
      this.state = this.merge(this.state, serverState)
      this.notify()
      return this.state
    } catch {
      // Network error — keep current state
      return this.state
    }
  }

  /**
   * Save current state to server.
   */
  async save(): Promise<void> {
    this.state.lastUpdated = new Date().toISOString()
    try {
      await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state),
      })
    } catch {
      // Silently fail — state is still in memory
    }
  }

  /**
   * Get current in-memory state.
   */
  getState(): WorkbenchState {
    return this.state
  }

  /**
   * Update state in-memory (does not auto-save).
   * Call save() explicitly to persist.
   */
  setState(state: WorkbenchState): void {
    this.state = state
    this.notify()
  }

  /**
   * Update a partial state and notify listeners.
   */
  update(partial: Partial<WorkbenchState>): void {
    Object.assign(this.state, partial)
    this.state.lastUpdated = new Date().toISOString()
    this.notify()
  }

  /**
   * Register a callback for state changes.
   */
  onStateChange(callback: StateChangeCallback): void {
    this.onChange = callback
  }

  /**
   * Merge two states — server state wins if it's newer.
   * Audit rounds are merged by round number (deduplicated).
   */
  private merge(
    local: WorkbenchState,
    server: WorkbenchState,
  ): WorkbenchState {
    // If server has no rounds, keep local
    if (server.auditRounds.length === 0) return local
    // If local has no rounds, take server
    if (local.auditRounds.length === 0) return server

    // Merge by round number — last-writer-wins per round
    const roundMap = new Map<number, WorkbenchState['auditRounds'][number]>()
    for (const r of local.auditRounds) {
      roundMap.set(r.round, r)
    }
    for (const r of server.auditRounds) {
      const existing = roundMap.get(r.round)
      if (!existing || new Date(r.timestamp) >= new Date(existing.timestamp)) {
        roundMap.set(r.round, r)
      }
    }

    const mergedRounds = Array.from(roundMap.values()).sort(
      (a, b) => a.round - b.round,
    )

    return {
      project: server.project || local.project,
      currentRound: Math.max(local.currentRound, server.currentRound),
      auditRounds: mergedRounds,
      lastUpdated:
        new Date(server.lastUpdated) > new Date(local.lastUpdated)
          ? server.lastUpdated
          : local.lastUpdated,
    }
  }

  private notify(): void {
    this.onChange?.(this.state)
  }
}
