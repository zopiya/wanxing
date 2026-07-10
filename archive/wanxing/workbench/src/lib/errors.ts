/**
 * Error Recovery — Utilities for retry, error classification, and backoff.
 *
 * Provides:
 *   - Error classification (network, API, timeout, unknown)
 *   - Retry with exponential backoff
 *   - Abort-aware retry (cancels on user action)
 *
 * Usage:
 *   import { classifyError, withRetry } from './lib/errors'
 *
 *   const result = await withRetry(() => client.session.list(), { maxAttempts: 3 })
 */

// --- Error Classification ---

export type ErrorKind = 'network' | 'api' | 'timeout' | 'abort' | 'unknown'

export interface ClassifiedError {
  kind: ErrorKind
  message: string
  original: unknown
  retryable: boolean
}

/**
 * Classify an error into a category for recovery decisions.
 */
export function classifyError(err: unknown): ClassifiedError {
  // AbortError — user cancelled
  if (err instanceof DOMException && err.name === 'AbortError') {
    return { kind: 'abort', message: '操作已取消', original: err, retryable: false }
  }

  // Network errors — fetch failed, connection refused, etc.
  if (err instanceof TypeError && /fetch|network|Failed to fetch/i.test(err.message)) {
    return { kind: 'network', message: '网络连接失败', original: err, retryable: true }
  }

  // Timeout — AbortController timeout
  if (err instanceof DOMException && err.name === 'TimeoutError') {
    return { kind: 'timeout', message: '请求超时', original: err, retryable: true }
  }

  // HTTP API errors — status codes
  if (err instanceof Error) {
    const statusMatch = err.message.match(/HTTP\s*(\d{3})/)
    if (statusMatch) {
      const status = parseInt(statusMatch[1], 10)
      // 4xx client errors (except 408, 429) are not retryable
      if (status >= 400 && status < 500 && status !== 408 && status !== 429) {
        return { kind: 'api', message: `服务端返回 ${status}`, original: err, retryable: false }
      }
      // 5xx server errors and 408/429 are retryable
      return { kind: 'api', message: `服务端错误 ${status}`, original: err, retryable: true }
    }
  }

  // OpenCode SDK errors (connection refused to localhost:4096)
  if (err instanceof Error && /ECONNREFUSED|connect/i.test(err.message)) {
    return { kind: 'network', message: 'OpenCode 服务未启动', original: err, retryable: true }
  }

  // Default
  const message = err instanceof Error ? err.message : String(err)
  return { kind: 'unknown', message, original: err, retryable: false }
}

// --- Retry Configuration ---

export interface RetryOptions {
  /** Maximum number of attempts (including the first). Default: 3 */
  maxAttempts?: number
  /** Base delay in ms for exponential backoff. Default: 1000 */
  baseDelayMs?: number
  /** Maximum delay in ms. Default: 15000 */
  maxDelayMs?: number
  /** AbortSignal to cancel retry loop */
  signal?: AbortSignal
  /** Called before each retry with attempt number and delay */
  onRetry?: (attempt: number, delayMs: number, error: ClassifiedError) => void
}

// --- Retry with Exponential Backoff ---

/**
 * Execute an async function with retry and exponential backoff.
 *
 * Only retries errors classified as retryable. Abort errors cancel immediately.
 * Returns the first successful result or throws the last error.
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const {
    maxAttempts = 3,
    baseDelayMs = 1_000,
    maxDelayMs = 15_000,
    signal,
    onRetry,
  } = options

  let lastError: ClassifiedError | null = null

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Check if already aborted
    if (signal?.aborted) {
      throw new DOMException('操作已取消', 'AbortError')
    }

    try {
      return await fn()
    } catch (err) {
      const classified = classifyError(err)
      lastError = classified

      // Abort errors — don't retry
      if (classified.kind === 'abort') {
        throw err
      }

      // Non-retryable errors — fail immediately
      if (!classified.retryable) {
        throw err
      }

      // Last attempt — throw
      if (attempt >= maxAttempts - 1) {
        throw err
      }

      // Calculate delay with exponential backoff + jitter
      const delay = Math.min(
        baseDelayMs * 2 ** attempt + Math.random() * 500,
        maxDelayMs,
      )

      onRetry?.(attempt + 1, delay, classified)

      // Wait with abort support
      await delayWithAbort(delay, signal)
    }
  }

  // Should never reach here, but TypeScript needs it
  throw lastError?.original ?? new Error('重试失败')
}

/**
 * Wait for a delay, respecting AbortSignal.
 */
function delayWithAbort(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('操作已取消', 'AbortError'))
      return
    }

    const timer = setTimeout(resolve, ms)

    function onAbort(): void {
      clearTimeout(timer)
      reject(new DOMException('操作已取消', 'AbortError'))
    }

    signal?.addEventListener('abort', onAbort, { once: true })
  })
}

// --- Retryable Fetch ---

/**
 * Fetch with automatic retry and timeout.
 *
 * Wraps native fetch with:
 *   - Configurable timeout per request
 *   - Retry on network/5xx errors
 *   - Abort signal propagation
 */
export async function fetchWithRetry(
  url: string,
  init: RequestInit & { timeoutMs?: number; retry?: RetryOptions } = {},
): Promise<Response> {
  const { timeoutMs = 10_000, retry, ...fetchInit } = init

  return withRetry(
    async () => {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort('Timeout'), timeoutMs)

      // Merge external signal
      if (fetchInit.signal) {
        fetchInit.signal.addEventListener('abort', () => controller.abort(), { once: true })
      }

      try {
        const response = await fetch(url, {
          ...fetchInit,
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        return response
      } finally {
        clearTimeout(timeoutId)
      }
    },
    retry,
  )
}
