/**
 * Vite Plugin — Injects annotation event forwarding script into iframe HTML.
 *
 * Intercepts requests matching /dist/{slug}/index.html, reads the original HTML
 * from disk, and injects the Wanxing annotation script before the closing body tag.
 *
 * This solves the C-1 bug: getInjectionScript() was defined but never called.
 * The iframe HTML needs this script to listen for 'wanxing-inject' postMessage
 * and forward mouse events back to the workbench.
 */

import type { Plugin } from 'vite'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

/**
 * The injection script that gets embedded into iframe HTML.
 * Listens for 'wanxing-inject' postMessage, then forwards mousemove/click
 * events to the parent window with element selector info.
 */
function getInjectionScript(): string {
  return `
<script>
(function() {
  function getSelector(el) {
    if (!el || el === document.documentElement || el === document.body) return el?.tagName?.toLowerCase() || '';
    const parts = [];
    let current = el;
    while (current && current !== document.documentElement) {
      let selector = current.tagName.toLowerCase();
      if (current.id) {
        selector = '#' + current.id;
        parts.unshift(selector);
        break;
      }
      if (current.className && typeof current.className === 'string') {
        const classes = current.className.trim().split(/\\s+/).slice(0, 2).join('.');
        if (classes) selector += '.' + classes;
      }
      const parent = current.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(c => c.tagName === current.tagName);
        if (siblings.length > 1) {
          const index = siblings.indexOf(current) + 1;
          selector += ':nth-of-type(' + index + ')';
        }
      }
      parts.unshift(selector);
      current = parent;
    }
    return parts.join(' > ');
  }

  function getPath(el) {
    const parts = [];
    let current = el;
    while (current && current !== document.documentElement) {
      parts.unshift(current.tagName.toLowerCase());
      current = current.parentElement;
    }
    return parts.join('/');
  }

  function getElementInfo(el) {
    if (!el || el === document.documentElement || el === document.body) return null;
    const rect = el.getBoundingClientRect();
    return {
      selector: getSelector(el),
      path: getPath(el),
      tagName: el.tagName.toLowerCase(),
      className: typeof el.className === 'string' ? el.className : '',
      id: el.id || '',
      rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
    };
  }

  var EDITABLE_PROPS = [
    'fontSize', 'fontWeight', 'color', 'backgroundColor',
    'padding', 'margin', 'borderRadius', 'border',
    'width', 'height', 'lineHeight', 'letterSpacing'
  ];

  function getComputedStyles(el) {
    var cs = window.getComputedStyle(el);
    var styles = {};
    for (var i = 0; i < EDITABLE_PROPS.length; i++) {
      styles[EDITABLE_PROPS[i]] = cs.getPropertyValue(EDITABLE_PROPS[i]) || '';
    }
    return styles;
  }

  var lastMoveTime = 0;
  document.addEventListener('mousemove', function(e) {
    var now = Date.now();
    if (now - lastMoveTime < 50) return;
    lastMoveTime = now;
    var info = getElementInfo(e.target);
    window.parent.postMessage({ type: 'mouse-move', element: info }, '*');
  }, { passive: true });

  document.addEventListener('click', function(e) {
    var info = getElementInfo(e.target);
    if (info) {
      window.parent.postMessage({ type: 'mouse-click', element: info }, '*');
    }
  }, { passive: true });

  // Edit mode: handle edit-select requests from parent
  window.addEventListener('message', function(e) {
    var data = e.data;
    if (!data || typeof data !== 'object') return;

    if (data.type === 'wanxing-edit-select') {
      // Parent requests element info for edit mode — find element and respond
      var selector = data.selector;
      if (!selector) return;
      try {
        var el = document.querySelector(selector);
        if (el) {
          var info = getElementInfo(el);
          info.computedStyles = getComputedStyles(el);
          window.parent.postMessage({ type: 'wanxing-edit-element-info', element: info }, '*');
        }
      } catch (err) { /* invalid selector */ }
    }

    if (data.type === 'wanxing-style-change') {
      // Apply style change from edit panel
      var selector = data.selector;
      var property = data.property;
      var value = data.value;
      if (!selector || !property) return;
      try {
        var els = document.querySelectorAll(selector);
        for (var i = 0; i < els.length; i++) {
          els[i].style[property] = value;
        }
      } catch (err) { /* invalid selector */ }
    }
  });

  window.parent.postMessage({ type: 'wanxing-inject-ready' }, '*');
})();
</script>`
}

/**
 * Regex to match /dist/<slug>/index.html requests.
 * Captures the slug for file path construction.
 */
const DIST_HTML_RE = /^\/dist\/([^/]+)\/index\.html$/

export function injectMiddlewarePlugin(): Plugin {
  return {
    name: 'wanxing-inject-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Only intercept GET requests for dist/*/index.html
        if (req.method !== 'GET' || !req.url) return next()

        const match = req.url.match(DIST_HTML_RE)
        if (!match) return next()

        const slug = match[1]
        const filePath = resolve(process.cwd(), '..', 'dist', slug, 'index.html')

        try {
          let html = await readFile(filePath, 'utf-8')

          // Inject the script before </body>
          if (html.includes('</body>')) {
            html = html.replace('</body>', getInjectionScript() + '\n</body>')
          } else {
            // Fallback: append to end if no </body> tag
            html += '\n' + getInjectionScript()
          }

          res.setHeader('Content-Type', 'text/html')
          res.setHeader('Cache-Control', 'no-cache')
          res.end(html)
        } catch (err) {
          // File not found or read error — fall through to next middleware
          console.error(`[inject-middleware] Failed to read ${filePath}:`, err)
          return next()
        }
      })
    },
  }
}
