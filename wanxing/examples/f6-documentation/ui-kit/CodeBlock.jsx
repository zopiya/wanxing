/* Code block with header (lang + copy) and warm-tone syntax tokens.
   Pass tokens as { t: 'key' | 'str' | 'com' | 'fn' | 'num' | 'pun' | null, v: 'text' }[]
   for explicit highlighting; or pass plain text + lang for none. */

function CodeBlock({ lang, tokens, text }) {
  const [copied, setCopied] = React.useState(false);
  const flatText = tokens ? tokens.map(t => t.v).join('') : text;

  function copy() {
    navigator.clipboard?.writeText(flatText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="codeblock">
      <header>
        <span className="lang">{lang}</span>
        <button type="button" className="copy" onClick={copy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </header>
      <pre><code>
        {tokens
          ? tokens.map((t, i) =>
              t.t
                ? <span key={i} className={'tk-' + t.t}>{t.v}</span>
                : <React.Fragment key={i}>{t.v}</React.Fragment>
            )
          : text}
      </code></pre>
    </div>
  );
}

window.CodeBlock = CodeBlock;
