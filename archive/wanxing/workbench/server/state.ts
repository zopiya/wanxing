/**
 * Vite Plugin — State persistence middleware.
 *
 * Endpoints:
 *   GET  /api/state?slug=<slug>  — read dist/<slug>/tmp/workbench-state.json
 *   POST /api/state              — write body to dist/<slug>/tmp/workbench-state.json
 *
 * File path: dist/<slug>/tmp/workbench-state.json
 */

import type { Plugin } from 'vite'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { isValidSlug } from '../bridge/slug'

interface WorkbenchStateBody {
  project?: string
  [key: string]: unknown
}

export function statePlugin(): Plugin {
  return {
    name: 'wanxing-state',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/api/state') === false) {
          return next()
        }

        // GET /api/state?slug=<slug>
        if (req.method === 'GET' && req.url?.startsWith('/api/state')) {
          const url = new URL(req.url, 'http://localhost')
          const slug = url.searchParams.get('slug')
          if (!slug || !isValidSlug(slug)) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Missing or invalid slug' }))
            return
          }

          const filePath = getStateFilePath(slug)
          try {
            const content = await readFile(filePath, 'utf-8')
            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Cache-Control', 'no-cache')
            res.end(content)
          } catch {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'No saved state' }))
          }
          return
        }

        // POST /api/state
        if (req.method === 'POST' && req.url === '/api/state') {
          let body = ''
          req.on('data', (chunk: Buffer) => {
            body += chunk.toString()
          })
          req.on('end', async () => {
            try {
              const parsed: unknown = JSON.parse(body)
              if (typeof parsed !== 'object' || parsed === null) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: 'Invalid JSON body' }))
                return
              }
              const bodyData = parsed as WorkbenchStateBody
              const slug = bodyData.project
              if (!slug || !isValidSlug(slug)) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(
                  JSON.stringify({ error: 'Missing or invalid project slug' }),
                )
                return
              }

              const filePath = getStateFilePath(slug)
              const dir = join(filePath, '..')
              await mkdir(dir, { recursive: true })
              await writeFile(filePath, JSON.stringify(parsed, null, 2), 'utf-8')

              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: true }))
            } catch (err) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Invalid JSON body' }))
              console.error('state write error:', err)
            }
          })
          return
        }

        return next()
      })
    },
  }
}

function getStateFilePath(slug: string): string {
  // Resolve relative to project root (parent of workbench/)
  const distDir = resolve(process.cwd(), '..', 'dist')
  return join(distDir, slug, 'tmp', 'workbench-state.json')
}
