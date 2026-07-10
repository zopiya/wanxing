/* F6 demo shell — sidebar + content + TOC.
   For the demo we only flesh out the "Color" page; the
   sidebar wires other pages to a stub so navigation feels
   real without inventing content. */

function StubPage({ title, parent }) {
  return (
    <article>
      <div className="crumb">
        <a href="#">/ Docs</a>
        <span className="sep">/</span>
        <a href="#">{parent}</a>
        <span className="sep">/</span>
        <span className="curr">{title}</span>
      </div>
      <h1>{title}</h1>
      <p className="lede">This is a stub for the {title} documentation page. The "Color" entry has the full content in this kit; click it in the sidebar to see every component the kit ships.</p>
      <p>In production, each Wenxin documentation page follows the same structure: an italic lede, h2/h3 headings tracked by the right-hand table of contents, code blocks with warm-tone syntax, and the five callout variants (Note / Tip / Caution / Important / Aside) where context calls for one.</p>
    </article>
  );
}

const TOC_ITEMS = [
  { id: 'philosophy',     level: 2, label: 'Philosophy' },
  { id: 'palette',        level: 2, label: 'The palette' },
  { id: 'accent-budget',  level: 2, label: 'The accent budget' },
  { id: 'forbidden',      level: 2, label: 'Forbidden' },
  { id: 'implementation', level: 2, label: 'Implementation' },
  { id: 'dark-mode',      level: 2, label: 'Dark mode' },
];

function DocsApp() {
  const [current, setCurrent] = React.useState('color');
  const [tocCurrent, setTocCurrent] = React.useState('philosophy');
  const mainRef = React.useRef(null);

  // Track which TOC heading the reader is currently on.
  React.useEffect(() => {
    if (current !== 'color') return;
    const obs = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setTocCurrent(visible[0].target.id);
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0 }
    );
    TOC_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [current]);

  function jumpTo(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTocCurrent(id);
    }
  }

  const PAGE_TITLES = {
    intro:   { title: 'Introduction',     parent: 'Getting started' },
    install: { title: 'Installation',     parent: 'Getting started' },
    tokens:  { title: 'Token system',     parent: 'Getting started' },
    color:   { title: 'Color',            parent: 'Foundations' },
    type:    { title: 'Typography',       parent: 'Foundations' },
    spacing: { title: 'Spacing & rhythm', parent: 'Foundations' },
    motion:  { title: 'Motion',           parent: 'Foundations' },
    button:  { title: 'Button',           parent: 'Components' },
    form:    { title: 'Form input',       parent: 'Components' },
    blockquote:{ title: 'Blockquote',     parent: 'Components' },
    pullquote: { title: 'Pull quote',     parent: 'Components' },
    tag:     { title: 'Tag',              parent: 'Components' },
    f1:      { title: 'F1 · Web',         parent: 'Formats' },
    f5:      { title: 'F5 · Presentation', parent: 'Formats' },
    f6:      { title: 'F6 · Documentation', parent: 'Formats' },
    f7:      { title: 'F7 · Poster',      parent: 'Formats' },
  };

  return (
    <div className="docs-shell">
      <Sidebar current={current} onSelect={id => { setCurrent(id); window.scrollTo({ top: 0 }); }} />
      <main className="docs-main" ref={mainRef} data-screen-label={`F6 / ${current}`}>
        {current === 'color' ? <ColorPage /> : <StubPage {...PAGE_TITLES[current]} />}
      </main>
      {current === 'color' && <Toc items={TOC_ITEMS} currentId={tocCurrent} onJump={jumpTo} />}
    </div>
  );
}

window.StubPage = StubPage;
window.DocsApp = DocsApp;
