/**
 * File Watcher — Monitors dist/ directory for changes using chokidar.
 *
 * Events: add, change, unlink
 * Filters: only index.html and annotations.json
 *
 * Usage:
 *   const watcher = createFileWatcher()
 *   watcher.on('change', (event) => { ... })
 *   watcher.close()
 */

import chokidar from 'chokidar'
import { resolve } from 'node:path'
import { EventEmitter } from 'node:events'
import { isValidSlug } from './slug'

export interface FileEvent {
  type: 'add' | 'change' | 'unlink'
  path: string
  slug: string
  fileName: string
}

export interface FileWatcher extends EventEmitter {
  close(): void
}

const WATCHED_FILES = ['index.html', 'annotations.json']

/**
 * Create a file watcher for the dist/ directory.
 * Returns an EventEmitter that emits 'add', 'change', 'unlink' events.
 */
export function createFileWatcher(): FileWatcher {
  const distDir = resolve(process.cwd(), '..', 'dist')
  const emitter = new EventEmitter()

  const watcher = chokidar.watch(distDir, {
    ignored: [
      /(^|[\/\\])\../, // dotfiles
      /tmp/, // tmp directories
    ],
    persistent: true,
    ignoreInitial: true,
    depth: 2, // dist/<slug>/<file>
  })

  watcher.on('all', (event, filePath) => {
    // Only care about add, change, unlink
    if (event !== 'add' && event !== 'change' && event !== 'unlink') {
      return
    }

    const fileName = filePath.split('/').pop() || ''
    if (!WATCHED_FILES.includes(fileName)) {
      return
    }

    // Extract slug from path: dist/<slug>/file
    const relativePath = filePath.replace(distDir + '/', '')
    const parts = relativePath.split('/')
    if (parts.length < 2) return

    const slug = parts[0]
    if (!isValidSlug(slug)) return

    const fileEvent: FileEvent = {
      type: event,
      path: filePath,
      slug,
      fileName,
    }

    emitter.emit(event, fileEvent)
    emitter.emit('any', fileEvent)
  })

  watcher.on('error', (error) => {
    emitter.emit('error', error)
  })

  // Attach close method
  const originalClose = watcher.close.bind(watcher)
  const fileWatcher = emitter as FileWatcher
  fileWatcher.close = () => {
    originalClose()
  }

  return fileWatcher
}
