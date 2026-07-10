/**
 * Vite Plugin — Scans dist/ directory and serves /api/projects endpoint.
 */

import type { Plugin } from 'vite'
import { readdir, stat } from 'node:fs/promises'
import { join, resolve } from 'node:path'

export function scanPlugin(): Plugin {
  return {
    name: 'wanxing-scan',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== 'GET') {
          return next()
        }

        // GET /api/projects — list project directories
        if (req.url === '/api/projects') {
          const distDir = resolve(process.cwd(), '..', 'dist')

          try {
            const entries = await readdir(distDir, { withFileTypes: true })
            const projects: Array<{ slug: string; hasIndex: boolean }> = []

            for (const entry of entries) {
              if (
                !entry.isDirectory() ||
                entry.name.startsWith('.') ||
                entry.name === 'tmp'
              ) {
                continue
              }

              const indexPath = join(distDir, entry.name, 'index.html')
              let hasIndex = false
              try {
                const s = await stat(indexPath)
                hasIndex = s.isFile()
              } catch {
                // index.html does not exist
              }

              projects.push({ slug: entry.name, hasIndex })
            }

            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Cache-Control', 'no-cache')
            res.end(JSON.stringify(projects))
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Failed to scan dist/' }))
            console.error('scan error:', err)
          }
          return
        }

        // GET /api/pages?slug=<slug> — list HTML files in a project
        if (req.url?.startsWith('/api/pages')) {
          const url = new URL(req.url, 'http://localhost')
          const slug = url.searchParams.get('slug')
          if (!slug) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'slug required' }))
            return
          }

          const projectDir = resolve(process.cwd(), '..', 'dist', slug)
          try {
            const files = await readdir(projectDir)
            const pages = files
              .filter((f) => f.endsWith('.html'))
              .map((f) => ({
                name: f.replace('.html', ''),
                file: f,
                isIndex: f === 'index.html',
              }))
              .sort((a, b) =>
                a.isIndex ? -1 : b.isIndex ? 1 : a.name.localeCompare(b.name),
              )

            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Cache-Control', 'no-cache')
            res.end(JSON.stringify(pages))
          } catch {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'project not found' }))
          }
          return
        }
      })
    },
  }
}
