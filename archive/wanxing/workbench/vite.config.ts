import { defineConfig } from 'vite'
import {
  scanPlugin,
  statePlugin,
  annotationsPlugin,
  auditPlugin,
  screenshotsPlugin,
  wsBridgePlugin,
  injectMiddlewarePlugin,
} from './server'

export default defineConfig({
  plugins: [
    injectMiddlewarePlugin(),
    scanPlugin(),
    statePlugin(),
    annotationsPlugin(),
    auditPlugin(),
    screenshotsPlugin(),
    wsBridgePlugin(),
  ],
  server: {
    port: 5173,
    proxy: {
      '/dist': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dist/, ''),
      },
      '/api/opencode': {
        target: 'http://localhost:4096',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/opencode/, ''),
      },
    },
  },
})
