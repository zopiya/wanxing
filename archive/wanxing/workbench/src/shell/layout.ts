/**
 * Shell Layout — Creates topbar + chat|preview two-column structure.
 *
 * Claude Design style: left chat panel (400px) + right preview (flex).
 * Project picker shown on default route (#/).
 */

import { onWSMessage } from '../ws-client'
import { addAuditRound } from '../modules/status'
import { cycleTheme, getPreference, onThemeChange } from '../lib/theme'
import type { ThemePreference } from '../lib/theme'
import { fetchWithRetry } from '../lib/errors'
import { initErrorModule, reportError } from '../modules/errors'

export interface ProjectInfo {
  slug: string
  hasIndex: boolean
}

function createThemeToggle(): HTMLElement {
  const btn = document.createElement('button')
  btn.className = 'wenxin-btn topbar-theme-btn'
  btn.setAttribute('aria-label', '切换主题')
  btn.setAttribute('title', '切换主题：系统 / 亮色 / 暗色')

  function updateBtn(pref: ThemePreference) {
    const icons: Record<ThemePreference, string> = {
      system: '◐',
      light: '☀',
      dark: '☾',
    }
    btn.textContent = icons[pref]
    btn.setAttribute('aria-pressed', pref === 'dark' ? 'true' : 'false')
  }

  updateBtn(getPreference())

  btn.addEventListener('click', () => {
    const newPref = cycleTheme()
    updateBtn(newPref)
  })

  onThemeChange(() => {
    if (getPreference() === 'system') {
      updateBtn('system')
    }
  })

  return btn
}

function createTopBar(): HTMLElement {
  const topbar = document.createElement('header')
  topbar.className = 'workbench-topbar'

  const left = document.createElement('div')
  left.className = 'workbench-topbar-left'

  const title = document.createElement('div')
  title.className = 'workbench-topbar-title'
  title.innerHTML = '<span class="brand-mark"></span>万形'

  const projectName = document.createElement('span')
  projectName.className = 'workbench-topbar-project'
  projectName.id = 'workbench-topbar-project'

  left.appendChild(title)
  left.appendChild(projectName)

  const tabs = document.createElement('nav')
  tabs.className = 'workbench-tabs'
  tabs.id = 'workbench-tabs'
  left.appendChild(tabs)

  const right = document.createElement('div')
  right.className = 'workbench-topbar-right'
  right.appendChild(createThemeToggle())

  topbar.appendChild(left)
  topbar.appendChild(right)
  return topbar
}

function createChatPanel(): HTMLElement {
  const panel = document.createElement('div')
  panel.className = 'workbench-chat-panel'
  panel.id = 'workbench-chat-panel'
  return panel
}

function createPreviewPanel(): HTMLElement {
  const panel = document.createElement('div')
  panel.className = 'workbench-preview-panel'
  panel.id = 'workbench-preview-panel'

  const content = document.createElement('div')
  content.className = 'workbench-content'
  content.id = 'workbench-content'
  panel.appendChild(content)

  const statusSlot = document.createElement('div')
  statusSlot.className = 'workbench-status-slot'
  statusSlot.id = 'workbench-status-slot'
  panel.appendChild(statusSlot)

  return panel
}

export function updateTopBarProject(slug: string | null): void {
  const el = document.getElementById('workbench-topbar-project')
  if (el) {
    el.textContent = slug ? `/ ${slug}` : ''
  }
}

export function initLayout(container: HTMLElement): void {
  const shell = document.createElement('div')
  shell.className = 'workbench-shell'

  const topbar = createTopBar()
  const main = document.createElement('div')
  main.className = 'workbench-main'
  main.id = 'workbench-main'

  const chatPanel = createChatPanel()
  const previewPanel = createPreviewPanel()

  main.appendChild(chatPanel)
  main.appendChild(previewPanel)

  shell.appendChild(topbar)
  shell.appendChild(main)
  container.appendChild(shell)

  initErrorModule(shell)

  loadProjects()

  onWSMessage('file:add', () => loadProjects())
  onWSMessage('file:unlink', () => loadProjects())
}

export async function loadProjects(): Promise<void> {
  try {
    const res = await fetchWithRetry('/api/projects', {
      timeoutMs: 5_000,
      retry: { maxAttempts: 2, baseDelayMs: 1_000 },
    })
    const projects: ProjectInfo[] = await res.json()

    // Render tabs
    const currentHash = window.location.hash
    const match = currentHash.match(/^#\/project\/(.+)$/)
    const activeSlug = match ? match[1] : null
    renderProjectTabs(projects, activeSlug)

    // Also update project picker if visible
    const grid = document.querySelector('.workbench-project-grid')
    if (grid) {
      renderProjectGrid(grid as HTMLElement, projects)
    }
  } catch (err) {
    reportError(err, '加载项目列表', () => loadProjects())
  }
}

export function renderProjectTabs(projects: ProjectInfo[], activeSlug: string | null): void {
  const tabs = document.getElementById('workbench-tabs')
  if (!tabs) return
  tabs.innerHTML = ''
  for (const p of projects) {
    if (!p.hasIndex) continue
    const tab = document.createElement('a')
    tab.className = 'workbench-tab' + (p.slug === activeSlug ? ' active' : '')
    tab.href = `#/project/${p.slug}`
    tab.textContent = p.slug
    tabs.appendChild(tab)
  }
}

export function renderProjectGrid(container: HTMLElement, projects: ProjectInfo[]): void {
  container.innerHTML = ''
  if (projects.length === 0) {
    container.innerHTML = '<div class="wenxin-section-label">暂无项目</div>'
    return
  }
  for (const project of projects) {
    const card = document.createElement('a')
    card.className = 'workbench-project-card'
    card.href = `#/project/${project.slug}`
    card.innerHTML = `
      <div class="workbench-project-card-name">${project.slug}</div>
      <div class="workbench-project-card-meta">${project.hasIndex ? '可预览' : '无 index.html'}</div>
    `
    if (!project.hasIndex) {
      card.style.opacity = '0.5'
    }
    container.appendChild(card)
  }
}

export async function runProjectAudit(slug: string): Promise<void> {
  try {
    const res = await fetchWithRetry(`/api/audit?slug=${encodeURIComponent(slug)}`, {
      method: 'POST',
      timeoutMs: 30_000,
      retry: { maxAttempts: 2, baseDelayMs: 2_000 },
    })
    const result = await res.json()
    if (result.success && result.report) {
      const report = result.report
      const round = {
        round: (getCurrentRound(slug) || 0) + 1,
        timestamp: report.audit.generatedAt,
        renderContract: {
          result: report.result,
          hardGates: (report.hardGates as Array<{ code: string }>).map((g) => g.code),
          warnings: (report.warnings as Array<{ code: string }>).map((w) => w.code),
        },
        auditAgent: {
          result: 'pass' as const,
          screenshotCount: 0,
        },
        fixInstructions: [],
      }
      await addAuditRound(round)
    }
  } catch (err) {
    reportError(err, `审计项目 ${slug}`, () => runProjectAudit(slug))
    throw err
  }
}

function getCurrentRound(_slug: string): number {
  return 0
}
