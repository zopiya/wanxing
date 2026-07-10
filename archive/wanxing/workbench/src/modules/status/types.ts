/**
 * Status Module — Shared types for the audit workflow state.
 *
 * Schema matches the flow-state JSON contract from DEV-PLAN.md.
 */

export type GateResult = 'pass' | 'warn' | 'fail'

export interface RenderContractResult {
  result: GateResult
  hardGates: string[]
  warnings: string[]
}

export interface AuditAgentResult {
  result: GateResult
  screenshotCount: number
}

export interface FixInstruction {
  id: string
  target: string
  description: string
  severity: 'critical' | 'warning' | 'info'
}

export interface AuditRound {
  round: number
  timestamp: string
  renderContract: RenderContractResult
  auditAgent: AuditAgentResult
  fixInstructions: FixInstruction[]
}

export interface WorkbenchState {
  project: string
  currentRound: number
  auditRounds: AuditRound[]
  lastUpdated: string
}

export function createEmptyState(project: string): WorkbenchState {
  return {
    project,
    currentRound: 0,
    auditRounds: [],
    lastUpdated: new Date().toISOString(),
  }
}
