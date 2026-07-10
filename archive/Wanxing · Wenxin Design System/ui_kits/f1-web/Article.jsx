/* Article reading screen — F1 archetype A.
   Single column, --w-article (520–640px), serif body, generous leading. */

function Article({ post, onBack }) {
  return (
    <article className="article">
      <button
        type="button"
        onClick={onBack}
        style={{
          background: 'none', border: 0, padding: 0, cursor: 'pointer',
          fontFamily: 'var(--sans-ui)', fontSize: 'var(--t-sm)',
          letterSpacing: 'var(--tr-wider)', textTransform: 'uppercase',
          color: 'var(--fg-3)', marginBottom: 'var(--s-12)',
        }}
      >
        ← Back to journal
      </button>

      <div className="meta-line">{post.date} · {post.tags.join(' · ')} · {post.readTime}</div>
      <h1>{post.title}</h1>
      <p className="lede">{post.lede}</p>

      {post.body.map((block, i) => {
        if (block.kind === 'p')     return <p key={i}>{block.text}</p>;
        if (block.kind === 'h2')    return <h2 key={i}>{block.text}</h2>;
        if (block.kind === 'quote') return <blockquote key={i}>{block.text}</blockquote>;
        if (block.kind === 'code')  return <pre key={i}><code>{block.text}</code></pre>;
        return null;
      })}

      {/* Attribution block — the canonical 40px rule + name + meta. */}
      <div style={{ marginTop: 'var(--s-16)' }}>
        <div style={{ width: 40, height: 1, background: 'var(--line-2)' }} />
        <div style={{
          fontFamily: 'var(--serif-body)', fontWeight: 700,
          color: 'var(--fg-1)', fontSize: 'var(--t-base)',
          marginTop: 'var(--s-3)',
        }}>{post.author}</div>
        <div style={{
          fontFamily: 'var(--sans-ui)', fontSize: 'var(--t-sm)',
          color: 'var(--fg-3)', letterSpacing: 'var(--tr-wide)',
        }}>{post.authorBio}</div>
      </div>
    </article>
  );
}

window.Article = Article;
