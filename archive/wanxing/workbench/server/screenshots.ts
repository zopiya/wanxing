/**
 * Vite Plugin — Screenshots listing middleware.
 *
 * Endpoints:
 *   GET /api/screenshots?slug=<slug>  — list PNG screenshots for the project
 *
 * Scans: dist/<slug>/tmp/screenshots/*.png
 */

import type { Plugin } from 'vite'
import { readdir, stat } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { isValidSlug } from '../bridge/slug'

export interface ScreenshotInfo {
  name: string
  path: string
  url: string
  mtime: number
}

export function screenshotsPlugin(): Plugin {
  return {
    name: 'wanxing-screenshots',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== 'GET' || !req.url?.startsWith('/api/screenshots')) {
          return next()
        }

        const url = new URL(req.url, 'http://localhost')
        const slug = url.searchParams.get('slug')
        if (!slug || !isValidSlug(slug)) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Missing or invalid slug' }))
          return
        }

        const screenshotsDir = resolve(
          process.cwd(),
          '..',
          'dist',
          slug,
          'tmp',
          'screenshots',
        )

        try {
          const entries = await readdir(screenshotsDir, { withFileTypes: true })
          const screenshots: ScreenshotInfo[] = []

          for (const entry of entries) {
            if (!entry.isFile() || !entry.name.endsWith('.png')) continue

            const filePath = join(screenshotsDir, entry.name)
            const s = await stat(filePath)

            screenshots.push({
              name: entry.name,
              path: filePath,
              url: `/dist/${slug}/tmp/screenshots/${entry.name}`,
              mtime: s.mtimeMs,
            })
          }

          // Sort by modification time (newest first)
          screenshots.sort((a, b) => b.mtime - a.mtime)

          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-cache')
          res.end(JSON.stringify(screenshots))
        } catch {
          // Directory doesn't exist or is empty
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify([]))
        }
      })
    },
  }
}
