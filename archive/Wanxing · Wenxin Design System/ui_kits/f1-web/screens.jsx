/* Page-level screens — composed from the smaller components.
   Each screen is a top-level "view" the demo can show. */

function HomeScreen({ onCta, onNavigate }) {
  return (
    <React.Fragment>
      <Hero onCta={onCta} />

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="01 · 设计哲学"
            title="灵魂三原则"
            desc="文心设计语言的核心命题，适用于所有形态，永不妥协。Three principles that hold across every surface — and break if any one is dropped."
          />
          <div className="grid-3">
            {PRINCIPLES.map((p, i) => (
              <PrincipleCard key={i} num={p.num} title={p.title} body={p.body} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="02 · 九种形态"
            title="Wenxin evolution configurations"
            desc="同一种设计语言，适配九种输出形态。灵魂不变，形态随境而化。"
          />
          <div className="grid-3-tight">
            {FORMS.map(f => (
              <FormItem key={f.code} {...f} onClick={() => onNavigate && onNavigate('forms')} />
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

function FormsScreen() {
  const [current, setCurrent] = React.useState('F1');
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="九种形态 · F1 — F9"
          title="One language, nine output formats"
          desc="The list is closed at F9. Newsletter, dashboard, e-commerce, game — these are not Wenxin surfaces and never will be."
        />
        <div className="grid-3-tight">
          {FORMS.map(f => (
            <FormItem
              key={f.code} {...f}
              current={current === f.code}
              onClick={() => setCurrent(f.code)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function JournalScreen({ onOpen }) {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="札记 · journal"
          title="Notes from the project"
          desc="Long-form essays on the spec — read top-down, or skip to whichever heading earns your attention."
        />
        <PostList posts={POSTS} onOpen={onOpen} />
      </div>
    </section>
  );
}

function ArticleScreen({ post, onBack }) {
  return (
    <section className="section">
      <div className="container">
        <Article post={post} onBack={onBack} />
      </div>
    </section>
  );
}

window.HomeScreen    = HomeScreen;
window.FormsScreen   = FormsScreen;
window.JournalScreen = JournalScreen;
window.ArticleScreen = ArticleScreen;
