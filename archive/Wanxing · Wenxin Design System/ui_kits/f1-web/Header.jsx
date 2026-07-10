/* Site header — brand, breathing mark, primary nav.
   Nav items are buttons; clicking switches the demo screen. */

function Header({ screen, onNavigate }) {
  const items = [
    { id: 'home',     label: '设计哲学', en: 'Philosophy' },
    { id: 'forms',    label: '九种形态', en: 'Forms' },
    { id: 'journal',  label: '札记',     en: 'Journal' },
    { id: 'article',  label: '阅读',     en: 'Read' },
  ];
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#" className="brand" onClick={e => { e.preventDefault(); onNavigate('home'); }} aria-label="万形首页">
          <BrandSeal size={32} />
          <span className="brand-name">万形</span>
          <BrandMark />
        </a>
        <nav aria-label="主导航">
          <ul className="site-nav">
            {items.map(it => (
              <li key={it.id}>
                <button
                  type="button"
                  className={screen === it.id ? 'is-current' : ''}
                  onClick={() => onNavigate(it.id)}
                  aria-current={screen === it.id ? 'page' : undefined}
                >
                  {it.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

window.Header = Header;
