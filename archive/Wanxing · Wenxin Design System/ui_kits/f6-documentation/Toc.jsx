/* Right-rail TOC — sticky, hairline-left, accent for current heading. */

function Toc({ items, currentId, onJump }) {
  return (
    <nav className="docs-toc" aria-label="On this page">
      <span className="docs-toc-title">On this page</span>
      <ul>
        {items.map(it => (
          <li key={it.id} className={'lvl-' + it.level}>
            <button
              type="button"
              className={currentId === it.id ? 'is-current' : ''}
              onClick={() => onJump(it.id)}
            >
              {it.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

window.Toc = Toc;
