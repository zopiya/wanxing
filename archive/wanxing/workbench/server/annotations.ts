/**
 * Vite Plugin — Annotations persistence middleware.
 *
 * Endpoints:
 *   GET  /api/annotations?slug=<slug>  — read dist/<slug>/tmp/annotations.json
 *   POST /api/annotations?slug=<slug>  — write body to dist/<slug>/tmp/annotations.json
 *
 * File path: dist/<slug>/tmp/annotations.json
 */

import type { Plugin } from 'vite'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { isValidSlug } from '../bridge/slug'

export function annotationsPlugin(): Plugin {
  return {
    name: 'wanxing-annotations',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/api/annotations') === false) {
          return next()
        }

        // GET /api/annotations?slug=<slug>
        if (req.method === 'GET' && req.url?.startsWith('/api/annotations')) {
          const url = new URL(req.url, 'http://localhost')
          const slug = url.searchParams.get('slug')
          if (!slug || !isValidSlug(slug)) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Missing or invalid slug' }))
            return
          }

          const filePath = getAnnotationsFilePath(slug)
          try {
            const content = await readFile(filePath, 'utf-8')
            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Cache-Control', 'no-cache')
            res.end(content)
          } catch {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'No saved annotations' }))
          }
          return
        }

        // POST /api/annotations?slug=<slug>
        if (req.method === 'POST' && req.url?.startsWith('/api/annotations')) {
          const url = new URL(req.url, 'http://localhost')
          const slug = url.searchParams.get('slug')
          if (!slug || !isValidSlug(slug)) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Missing or invalid slug' }))
            return
          }

          let body = ''
          req.on('data', (chunk: Buffer) => {
            body += chunk.toString()
          })
          req.on('end', async () => {
            try {
              const parsed = JSON.parse(body)
              // Validate basic structure
              if (!parsed.version || !parsed.project || !Array.isArray(parsed.annotations)) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: 'Invalid annotations format' }))
                return
              }

              const filePath = getAnnotationsFilePath(slug)
              const dir = join(filePath, '..')
              await mkdir(dir, { recursive: true })
              await writeFile(filePath, JSON.stringify(parsed, null, 2), 'utf-8')

              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: true }))
            } catch (err) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Invalid JSON body' }))
              console.error('annotations write error:', err)
            }
          })
          return
        }

        return next()
      })
    },
  }
}

function getAnnotationsFilePath(slug: string): string {
  const distDir = resolve(process.cwd(), '..', 'dist')
  return join(distDir, slug, 'tmp', 'annotations.json')
}
