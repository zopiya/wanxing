/**
 * Message Area — Markdown rendering for chat messages.
 *
 * Provides:
 *   - Lightweight markdown → HTML conversion (headings, lists, code, bold, italic, links, blockquotes)
 *   - Warm-tone syntax highlighting for code blocks
 *   - Collapsible thinking/reasoning sections
 *   - Streaming cursor for in-progress messages
 *   - Before/After comparison view rendering
 *
 * Public API:
 *   renderMarkdownContent(text)  — convert markdown string to HTML string
 *   createMessageContent(msg)    — build a DOM element for a ChatMessage
 *   updateStreamingContent(el, text) — update a streaming message's content in-place
 */

import type { ChatMessage } from './types'
import { createComparisonView } from './before-after'

// ---------------------------------------------------------------------------
// Markdown → HTML (lightweight, no dependencies)
// ---------------------------------------------------------------------------

/** Escape HTML special characters. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Process inline markdown: bold, italic, inline code, links, images.
 * Operates on a single line of text (no block-level elements).
 */
function inlineMarkdown(text: string): string {
  // Inline code (must come first to prevent inner processing)
  let out = text.replace(/`([^`]+)`/g, '<code class="md-inline-code">$1</code>')

  // Images ![alt](url)
  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="md-img" loading="lazy" />')

  // Links [text](url)
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" class="md-link">$1</a>')

  // Bold **text** or __text__
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  out = out.replace(/__(.+?)__/g, '<strong>$1</strong>')

  // Italic *text* or _text_ (but not inside words like some_file_name)
  out = out.replace(/(?<!\w)\*(.+?)\*(?!\w)/g, '<em>$1</em>')
  out = out.replace(/(?<!\w)_(.+?)_(?!\w)/g, '<em>$1</em>')

  // Strikethrough ~~text~~
  out = out.replace(/~~(.+?)~~/g, '<del>$1</del>')

  return out
}

/** Process a code block with optional language and warm-tone highlighting. */
function renderCodeBlock(code: string, lang: string): string {
  const highlighted = highlightSyntax(escapeHtml(code), lang)
  const langLabel = lang ? `<span class="code-block-lang">${escapeHtml(lang)}</span>` : ''
  return `<div class="code-block">${langLabel}<pre><code class="language-${escapeHtml(lang)}">${highlighted}</code></pre></div>`
}

/**
 * Convert a full markdown string to HTML.
 *
 * Handles: headings, code blocks, blockquotes, unordered/ordered lists,
 * horizontal rules, paragraphs, and inline formatting.
 */
export function renderMarkdownContent(text: string): string {
  // Extract and replace code blocks first to protect their content
  const codeBlocks: string[] = []
  let processed = text.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang, code) => {
    const idx = codeBlocks.length
    codeBlocks.push(renderCodeBlock(code, lang))
    return `\x00CODEBLOCK_${idx}\x00`
  })

  // Extract thinking sections
  const thinkingBlocks: string[] = []
  processed = processed.replace(/<think>([\s\S]*?)<\/think>/g, (_match, content) => {
    const idx = thinkingBlocks.length
    const inner = renderBlockContent(content.trim())
    thinkingBlocks.push(
      `<details class="thinking-block"><summary class="thinking-summary">思考过程</summary><div class="thinking-content">${inner}</div></details>`
    )
    return `\x00THINKING_${idx}\x00`
  })

  // Process block-level elements
  const lines = processed.split('\n')
  const htmlParts: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Restored code block placeholder
    const cbMatch = line.match(/^\x00CODEBLOCK_(\d+)\x00$/)
    if (cbMatch) {
      htmlParts.push(codeBlocks[parseInt(cbMatch[1])])
      i++
      continue
    }

    // Restored thinking placeholder
    const tkMatch = line.match(/^\x00THINKING_(\d+)\x00$/)
    if (tkMatch) {
      htmlParts.push(thinkingBlocks[parseInt(tkMatch[1])])
      i++
      continue
    }

    // Blank line
    if (line.trim() === '') {
      i++
      continue
    }

    // Heading
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      const level = headingMatch[1].length
      htmlParts.push(`<h${level} class="md-h${level}">${inlineMarkdown(headingMatch[2])}</h${level}>`)
      i++
      continue
    }

    // Horizontal rule
    if (/^(-{3,}|_{3,}|\*{3,})$/.test(line.trim())) {
      htmlParts.push('<hr class="md-hr" />')
      i++
      continue
    }

    // Blockquote
    if (line.startsWith('>')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].startsWith('>')) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''))
        i++
      }
      htmlParts.push(`<blockquote class="md-blockquote">${renderBlockContent(quoteLines.join('\n'))}</blockquote>`)
      continue
    }

    // Unordered list
    if (/^[\s]*[-*+]\s/.test(line)) {
      const listItems: string[] = []
      while (i < lines.length && /^[\s]*[-*+]\s/.test(lines[i])) {
        listItems.push(lines[i].replace(/^[\s]*[-*+]\s/, ''))
        i++
      }
      const items = listItems.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')
      htmlParts.push(`<ul class="md-ul">${items}</ul>`)
      continue
    }

    // Ordered list
    if (/^[\s]*\d+\.\s/.test(line)) {
      const listItems: string[] = []
      while (i < lines.length && /^[\s]*\d+\.\s/.test(lines[i])) {
        listItems.push(lines[i].replace(/^[\s]*\d+\.\s/, ''))
        i++
      }
      const items = listItems.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')
      htmlParts.push(`<ol class="md-ol">${items}</ol>`)
      continue
    }

    // Paragraph — collect consecutive non-blank, non-block lines
    const paraLines: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('>') &&
      !/^[\s]*[-*+]\s/.test(lines[i]) &&
      !/^[\s]*\d+\.\s/.test(lines[i]) &&
      !/^-{3,}|_{3,}|\*{3,}$/.test(lines[i].trim()) &&
      !lines[i].startsWith('\x00')
    ) {
      paraLines.push(lines[i])
      i++
    }
    if (paraLines.length > 0) {
      htmlParts.push(`<p class="md-p">${inlineMarkdown(paraLines.join('\n'))}</p>`)
    }
  }

  return htmlParts.join('\n')
}

/** Render block-level content (used inside blockquotes, thinking, etc.). */
function renderBlockContent(text: string): string {
  return renderMarkdownContent(text)
}

// ---------------------------------------------------------------------------
// Warm-tone syntax highlighting
// ---------------------------------------------------------------------------

/**
 * Apply warm-tone syntax highlighting to escaped HTML code.
 *
 * Color palette (warm earth tones, matching Wenxin D9):
 *   - keywords:  #8B3525 (brick red — accent)
 *   - strings:   #6B5B3E (warm brown)
 *   - comments:  #9A948D (warm gray — muted)
 *   - functions: #5C4A2F (deep brown)
 *   - numbers:   #7A5C3A (medium brown)
 *   - operators: #3A3837 (charcoal — primary text)
 *   - types:     #6B5B3E (warm brown)
 */
function highlightSyntax(escaped: string, lang: string): string {
  if (!lang) return escaped

  // Language-specific keyword sets
  const keywords: Record<string, string[]> = {
    js: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue', 'new', 'this', 'class', 'extends', 'import', 'export', 'default', 'from', 'async', 'await', 'try', 'catch', 'finally', 'throw', 'typeof', 'instanceof', 'in', 'of', 'yield', 'true', 'false', 'null', 'undefined', 'void', 'delete', 'with', 'debugger'],
    javascript: [],
    ts: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue', 'new', 'this', 'class', 'extends', 'import', 'export', 'default', 'from', 'async', 'await', 'try', 'catch', 'finally', 'throw', 'typeof', 'instanceof', 'in', 'of', 'yield', 'type', 'interface', 'enum', 'implements', 'abstract', 'declare', 'namespace', 'as', 'is', 'keyof', 'readonly', 'true', 'false', 'null', 'undefined', 'void', 'delete'],
    typescript: [],
    python: ['def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'break', 'continue', 'import', 'from', 'as', 'try', 'except', 'finally', 'raise', 'with', 'yield', 'lambda', 'pass', 'global', 'nonlocal', 'assert', 'del', 'in', 'not', 'and', 'or', 'is', 'True', 'False', 'None', 'self', 'async', 'await'],
    py: [],
    css: ['@media', '@keyframes', '@import', '@font-face', '@supports', '@layer', '@container', '!important'],
    html: [],
    rust: ['fn', 'let', 'mut', 'const', 'struct', 'enum', 'impl', 'trait', 'pub', 'use', 'mod', 'crate', 'self', 'super', 'if', 'else', 'match', 'for', 'while', 'loop', 'break', 'continue', 'return', 'async', 'await', 'move', 'ref', 'where', 'type', 'as', 'in', 'true', 'false'],
    rs: [],
    go: ['func', 'var', 'const', 'type', 'struct', 'interface', 'package', 'import', 'return', 'if', 'else', 'for', 'range', 'switch', 'case', 'default', 'break', 'continue', 'go', 'defer', 'chan', 'select', 'map', 'true', 'false', 'nil'],
    sh: ['if', 'then', 'else', 'elif', 'fi', 'for', 'while', 'do', 'done', 'case', 'esac', 'function', 'return', 'export', 'source', 'local', 'echo', 'exit', 'set', 'unset'],
    bash: [],
    shell: [],
    json: [],
    md: [],
    markdown: [],
    just: [],
    justfile: [],
  }

  // Merge aliases
  if (keywords['javascript']) keywords['javascript'] = keywords['js']
  if (keywords['typescript']) keywords['typescript'] = keywords['ts']
  if (keywords['py']) keywords['py'] = keywords['python']
  if (keywords['rs']) keywords['rs'] = keywords['rust']
  if (keywords['bash']) keywords['bash'] = keywords['sh']
  if (keywords['shell']) keywords['shell'] = keywords['sh']

  const langLower = lang.toLowerCase()
  const kwList = keywords[langLower] ?? keywords['js'] ?? []
  const kwPattern = kwList.length > 0 ? kwList.join('|') : null

  let result = escaped

  // Comments: // single-line and /* multi-line */
  result = result.replace(/(\/\/.*?)(?=\n|$)/g, '<span class="syn-comment">$1</span>')
  result = result.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="syn-comment">$1</span>')
  // # comments for python/sh
  if (langLower === 'python' || langLower === 'py' || langLower === 'sh' || langLower === 'bash' || langLower === 'shell' || langLower === 'just' || langLower === 'justfile') {
    result = result.replace(/(#.*?)(?=\n|$)/g, '<span class="syn-comment">$1</span>')
  }

  // Strings: double-quoted, single-quoted, template literals
  result = result.replace(/(&quot;(?:[^&]|&(?!quot;))*?&quot;)/g, '<span class="syn-string">$1</span>')
  result = result.replace(/(&#39;(?:[^&]|&(?!#39;))*?&#39;)/g, '<span class="syn-string">$1</span>')
  result = result.replace(/(&#x60;(?:[^&]|&(?!#x60;))*?&#x60;)/g, '<span class="syn-string">$1</span>')
  // Python triple-quoted strings
  if (langLower === 'python' || langLower === 'py') {
    result = result.replace(/(&quot;&quot;&quot;[\s\S]*?&quot;&quot;&quot;)/g, '<span class="syn-string">$1</span>')
  }

  // Numbers
  result = result.replace(/\b(\d+\.?\d*(?:e[+-]?\d+)?)\b/gi, '<span class="syn-number">$1</span>')

  // Function calls: word followed by (
  result = result.replace(/\b([a-zA-Z_]\w*)\s*(?=\()/g, '<span class="syn-function">$1</span>')

  // Keywords
  if (kwPattern) {
    const kwRegex = new RegExp(`\\b(${kwPattern})\\b`, 'g')
    result = result.replace(kwRegex, '<span class="syn-keyword">$1</span>')
  }

  // CSS properties (for css language)
  if (langLower === 'css') {
    result = result.replace(/([a-z-]+)(\s*:)/g, '<span class="syn-property">$1</span>$2')
  }

  // HTML tags
  if (langLower === 'html' || langLower === 'xml' || langLower === 'svg') {
    result = result.replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="syn-keyword">$2</span>')
    result = result.replace(/\b([\w-]+)(?==)/g, '<span class="syn-property">$1</span>')
  }

  return result
}

// ---------------------------------------------------------------------------
// DOM builders
// ---------------------------------------------------------------------------

/** Create the content element for a ChatMessage, with markdown rendering. */
export function createMessageContent(msg: ChatMessage): HTMLDivElement {
  const content = document.createElement('div')
  content.className = 'chat-message-content'

  if (msg.role === 'system') {
    content.textContent = msg.content
  } else {
    content.innerHTML = renderMarkdownContent(msg.content)
  }

  // Render Before/After comparison if present
  if (msg.comparison && msg.comparison.type === 'before-after') {
    const comparisonView = createComparisonView(msg.comparison)
    content.appendChild(comparisonView)
  }

  if (msg._streaming) {
    content.classList.add('streaming')
    const cursor = document.createElement('span')
    cursor.className = 'streaming-cursor'
    content.appendChild(cursor)
  }

  return content
}

/**
 * Update a streaming message's content in-place.
 *
 * Finds the `.chat-message-content` inside the given message wrapper
 * and replaces its innerHTML, preserving the streaming cursor.
 */
export function updateStreamingContent(wrapper: HTMLElement, text: string): void {
  const contentEl = wrapper.querySelector('.chat-message-content')
  if (!contentEl) return

  contentEl.innerHTML = renderMarkdownContent(text)
  contentEl.classList.add('streaming')

  const cursor = document.createElement('span')
  cursor.className = 'streaming-cursor'
  contentEl.appendChild(cursor)
}

/**
 * Mark a message as no longer streaming — remove cursor and streaming class.
 */
export function finalizeStreaming(wrapper: HTMLElement): void {
  const contentEl = wrapper.querySelector('.chat-message-content')
  if (!contentEl) return

  contentEl.classList.remove('streaming')
  const cursor = contentEl.querySelector('.streaming-cursor')
  if (cursor) cursor.remove()
}
