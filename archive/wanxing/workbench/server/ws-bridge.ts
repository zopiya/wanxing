/**
 * Vite Plugin — WebSocket bridge for real-time file change notifications.
 *
 * Sets up a WebSocket server on the Vite dev server.
 * Integrates with bridge/file-watcher.ts to push dist/ changes to clients.
 *
 * Message types:
 *   file:add      — new file in dist/
 *   file:change   — file modified in dist/
 *   file:unlink   — file removed from dist/
 */

import type { Plugin } from 'vite'
import { WebSocketServer, WebSocket } from 'ws'
import { createFileWatcher } from '../bridge/file-watcher'
import type { FileEvent, FileWatcher } from '../bridge/file-watcher'

export interface WSMessage {
  type: string
  payload: unknown
}

export function wsBridgePlugin(): Plugin {
  return {
    name: 'wanxing-ws-bridge',
    configureServer(server) {
      // Create WebSocket server attached to Vite's HTTP server
      const wss = new WebSocketServer({ noServer: true })

      // Handle upgrade requests on /ws path
      server.httpServer?.on('upgrade', (request, socket, head) => {
        if (request.url === '/ws') {
          wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request)
          })
        }
      })

      // Track connected clients
      const clients = new Set<WebSocket>()

      wss.on('connection', (ws) => {
        clients.add(ws)
        ws.on('close', () => clients.delete(ws))
        ws.on('error', () => clients.delete(ws))
      })

      // Create file watcher and broadcast events
      const watcher: FileWatcher = createFileWatcher()

      watcher.on('any', (event: FileEvent) => {
        const message: WSMessage = {
          type: `file:${event.type}`,
          payload: {
            slug: event.slug,
            fileName: event.fileName,
            path: event.path,
          },
        }

        const data = JSON.stringify(message)
        for (const client of clients) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(data)
          }
        }
      })

      watcher.on('error', (error) => {
        console.error('File watcher error:', error)
      })

      // Cleanup on server close
      server.httpServer?.on('close', () => {
        watcher.close()
        wss.close()
      })
    },
  }
}
