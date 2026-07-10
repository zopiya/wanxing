/**
 * Vite Plugin — Audit execution middleware.
 *
 * Endpoints:
 *   POST /api/audit?slug=<slug>  — run render-audit.mjs for the project
 *
 * Calls bridge/audit-runner.ts to spawn the audit process.
 */

import type { Plugin } from 'vite'
import { runAudit } from '../bridge/audit-runner'
import { isValidSlug } from '../bridge/slug'

export function auditPlugin(): Plugin {
  return {
    name: 'wanxing-audit',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== 'POST' || !req.url?.startsWith('/api/audit')) {
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

        try {
          const result = await runAudit(slug)
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-cache')
          res.end(JSON.stringify(result))
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Audit execution failed' }))
          console.error('audit error:', err)
        }
      })
    },
  }
}
