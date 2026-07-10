// Critical CSS — required for initial shell render
import './styles/main.css'
import './styles/components.css'
import './shell/layout.css'
// Non-critical CSS — Vite bundles these; static import is fine
import './modules/preview/preview.css'
import './modules/status/status.css'
import './modules/annotate/annotate.css'
import './modules/chat/chat.css'
import './modules/toolbar/toolbar.css'
import './modules/toolbar/edit-panel.css'

import { initTheme } from './lib/theme'
import { initLayout } from './shell/layout'
import { initRouter } from './shell/router'
import { initWebSocket } from './ws-client'
import { initServerChecker } from './server-check-client'

// Initialize theme before rendering to avoid flash of wrong theme
initTheme()

const app = document.getElementById('app')!
initLayout(app)
initRouter()
initWebSocket()
initServerChecker()

// Initialize global keyboard shortcuts
requestAnimationFrame(() => {
  import('./lib/keyboard').then(({ initKeyboard }) => {
    initKeyboard()
  })
})
