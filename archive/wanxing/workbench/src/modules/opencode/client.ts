/**
 * OpenCode SDK Client — Singleton client for the OpenCode API.
 *
 * Configured to use the Vite dev server proxy (/api/opencode),
 * which forwards requests to the OpenCode server at localhost:4096.
 *
 * Includes error recovery:
 *   - Automatic retry for network/timeout errors
 *   - Error classification and reporting
 *
 * Usage:
 *   import { client, getClient, apiCall } from './modules/opencode/client'
 *
 *   // Direct access to the singleton
 *   const sessions = await client.session.list()
 *
 *   // With retry and error reporting
 *   const sessions = await apiCall(() => client.session.list(), '加载会话列表')
 */

import { createOpencodeClient, type OpencodeClient } from '@opencode-ai/sdk/client'
import { withRetry, classifyError } from '../../lib/errors'
import { reportError } from '../errors'

const BASE_URL = '/api/opencode'

let clientInstance: OpencodeClient | null = null

/**
 * Get or create the OpenCode SDK client singleton.
 *
 * The client points to `/api/opencode`, which the Vite dev server
 * proxies to `http://localhost:4096` (the OpenCode server).
 */
export function getClient(): OpencodeClient {
  if (!clientInstance) {
    clientInstance = createOpencodeClient({
      baseUrl: BASE_URL,
    })
  }
  return clientInstance
}

/**
 * Pre-initialized client instance.
 *
 * Use this for direct imports when you don't need lazy initialization.
 */
export const client: OpencodeClient = getClient()

/**
 * Execute an API call with automatic retry and error reporting.
 *
 * @param fn - The API call function
 * @param context - Human-readable context for error messages
 * @param maxAttempts - Maximum retry attempts (default: 3)
 * @returns The result of the API call
 *
 * @example
 *   const sessions = await apiCall(() => client.session.list(), '加载会话列表')
 *   const created = await apiCall(() => client.session.create({}), '创建会话')
 */
export async function apiCall<T>(
  fn: () => Promise<T>,
  context?: string,
  maxAttempts = 3,
): Promise<T> {
  try {
    return await withRetry(fn, {
      maxAttempts,
      baseDelayMs: 1_000,
      maxDelayMs: 10_000,
      onRetry: (attempt, delay, error) => {
        console.warn(`[API] ${context ?? '请求'} 重试 ${attempt}/${maxAttempts}，${delay}ms 后重试:`, error.message)
      },
    })
  } catch (err) {
    const classified = classifyError(err)
    // Don't report abort errors (user cancelled)
    if (classified.kind !== 'abort') {
      reportError(err, context, async () => {
        // Retry function for the error banner
        await apiCall(fn, context, maxAttempts)
      })
    }
    throw err
  }
}
