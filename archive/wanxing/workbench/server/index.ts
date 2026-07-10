/**
 * Server Module — Unified middleware registration.
 *
 * Exports all Vite plugins for easy import in vite.config.ts.
 *
 * Plugins:
 *   - scanPlugin: project scanning (/api/projects)
 *   - statePlugin: state persistence (/api/state)
 *   - annotationsPlugin: annotations persistence (/api/annotations)
 *   - auditPlugin: audit execution (/api/audit)
 *   - screenshotsPlugin: screenshot management (/api/screenshots)
 *   - wsBridgePlugin: WebSocket real-time updates (/ws)
 *   - injectMiddlewarePlugin: annotation script injection for iframe HTML
 */

export { scanPlugin } from './scan'
export { statePlugin } from './state'
export { annotationsPlugin } from './annotations'
export { auditPlugin } from './audit'
export { screenshotsPlugin } from './screenshots'
export { wsBridgePlugin } from './ws-bridge'
export { injectMiddlewarePlugin } from './inject-middleware'
