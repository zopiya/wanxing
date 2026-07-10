/* F6 sidebar nav — 240 px, hairline-left accent on current. */

function Sidebar({ current, onSelect }) {
  const groups = [
    {
      title: 'Getting started',
      items: [
        { id: 'intro',       label: 'Introduction' },
        { id: 'install',     label: 'Installation' },
        { id: 'tokens',      label: 'Token system' },
      ],
    },
    {
      title: 'Foundations',
      items: [
        { id: 'color',       label: 'Color' },
        { id: 'type',        label: 'Typography' },
        { id: 'spacing',     label: 'Spacing & rhythm' },
        { id: 'motion',      label: 'Motion' },
      ],
    },
    {
      title: 'Components',
      items: [
        { id: 'button',      label: 'Button' },
        { id: 'form',        label: 'Form input' },
        { id: 'blockquote',  label: 'Blockquote' },
        { id: 'pullquote',   label: 'Pull quote' },
        { id: 'tag',         label: 'Tag' },
      ],
    },
    {
      title: 'Formats',
      items: [
        { id: 'f1',          label: 'F1 · Web' },
        { id: 'f5',          label: 'F5 · Presentation' },
        { id: 'f6',          label: 'F6 · Documentation' },
        { id: 'f7',          label: 'F7 · Poster' },
      ],
    },
  ];

  return (
    <aside className="docs-sidebar" aria-label="Documentation nav">
      <div className="brand">
        <BrandSeal size={28} />
        <span className="brand-name">文心 Wenxin</span>
      </div>
      <div className="version">v 2.0.0 · DOCS</div>

      <div className="search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--fg-4)' }}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4.3-4.3" />
        </svg>
        <input type="search" placeholder="Search the docs…" aria-label="Search" />
        <kbd>⌘K</kbd>
      </div>

      {groups.map(g => (
        <div key={g.title} className="nav-group">
          <span className="nav-group-title">{g.title}</span>
          {g.items.map(it => (
            <button
              key={it.id}
              type="button"
              className={'nav-link' + (current === it.id ? ' is-current' : '')}
              onClick={() => onSelect(it.id)}
              aria-current={current === it.id ? 'page' : undefined}
            >
              {it.label}
            </button>
          ))}
        </div>
      ))}
    </aside>
  );
}

window.Sidebar = Sidebar;
