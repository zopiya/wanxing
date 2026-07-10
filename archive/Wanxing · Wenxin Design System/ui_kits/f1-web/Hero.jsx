/* The F1 hero — centered, serif display, hairline rule, text-only CTA. */

function Hero({ onCta }) {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <h1 className="hero-title">万形</h1>
        <p className="hero-sub">Ten thousand forms, one source.</p>
        <div className="hero-rule" aria-hidden="true" />
        <p className="hero-desc">
          文字即界面，留白即设计，克制即力量。<br />
          The official site of the Wenxin design language.
        </p>
        <a href="#forms" className="hero-cta" onClick={e => { e.preventDefault(); onCta && onCta(); }}>
          Explore the forms
          <span className="hero-cta-arrow" aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}

window.Hero = Hero;
