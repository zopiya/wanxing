/* Sample page content — the Color foundations doc.
   Long enough to show every component the kit ships. */

function ColorPage({ onJump }) {
  return (
    <article>
      <div className="crumb">
        <a href="#">/ Docs</a>
        <span className="sep">/</span>
        <a href="#">Foundations</a>
        <span className="sep">/</span>
        <span className="curr">Color</span>
      </div>

      <h1>Color</h1>
      <p className="lede">One canvas. One ink. One stamp. The warm-earth palette under every Wenxin surface, and the rules that keep it from ever feeling like a "branded template".</p>

      <h2 id="philosophy">Philosophy</h2>
      <p>The Wenxin palette has three jobs and no others: hold the page (warm whites), carry the words (deep charcoals), and place a single stamp of emphasis (cinnabar). Everything else — saturated blues, gradients, neon greens, vibrant purples — is excluded by spec, not by taste.</p>

      <Callout kind="note">
        Read this page alongside <code>source/.opencode/agents/wenxin/design.md</code> §2. This page summarizes the rules; the spec is authoritative when in doubt.
      </Callout>

      <h2 id="palette">The palette</h2>
      <p>Below is the full light-mode palette. Dark mode is documented in its own section.</p>

      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Hex</th>
            <th>Use</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>--bg-1</code> warm white</td><td><code>#F2F0EB</code></td><td>Canvas / hero / showcase</td></tr>
          <tr><td><code>--bg-2</code> base</td><td><code>#FAFAF8</code></td><td>Inner-page background</td></tr>
          <tr><td><code>--bg-3</code> pure</td><td><code>#FFFFFF</code></td><td>Article body only</td></tr>
          <tr><td><code>--bg-4</code> subtle tint</td><td><code>#F0EDE7</code></td><td>Code / quote / chip wash</td></tr>
          <tr><td><code>--fg-1</code> ink (heading)</td><td><code>#2C2B29</code></td><td>Headings, brand name</td></tr>
          <tr><td><code>--fg-2</code> ink (body)</td><td><code>#3A3837</code></td><td>Body text — never pure black</td></tr>
          <tr><td><code>--fg-3</code> warm gray</td><td><code>#888580</code></td><td>Metadata, secondary</td></tr>
          <tr><td><code>--fg-4</code> muted</td><td><code>#B0ABA4</code></td><td>Placeholder, eyebrow</td></tr>
          <tr><td><strong><code>--accent</code> cinnabar</strong></td><td><strong><code>#8B3525</code></strong></td><td>The one stamp — ≤ 2 / page</td></tr>
        </tbody>
      </table>

      <h2 id="accent-budget">The accent budget</h2>
      <p>Cinnabar (<code>--accent</code>) is rationed. The spec allows at most <strong>two occurrences per page</strong>, with one exception: icon active/selected states do not count against the budget, because their purpose is structural.</p>

      <Callout kind="warn" label="Hard rule">
        Past two cinnabar moments on the same page, the seal stops being a signature and becomes decoration. The audit will flag the third occurrence as a violation.
      </Callout>

      <p>Common patterns that respect the budget:</p>
      <ul>
        <li>Header brand mark <code>■</code> + one CTA arrow underline on hover</li>
        <li>One pull-quote accent stripe + one footer link in cinnabar</li>
        <li>Logo seal + one error message (errors flag in <code>--accent</code>, never red)</li>
      </ul>

      <h2 id="forbidden">Forbidden</h2>
      <p>The following are forbidden by spec — not "discouraged", not "use sparingly":</p>
      <ul>
        <li>Any gradient background.</li>
        <li>High-saturation blue, green, purple, orange.</li>
        <li>Status colors (red error / green success / yellow warning).</li>
        <li>Dark mode using pure black <code>#000</code>.</li>
      </ul>

      <Callout kind="danger" label="Why no status colors">
        Wenxin uses the same accent for "this is the important thing" regardless of whether it is good news or bad. The reader infers tone from the word, not the color. This is intentional and not negotiable.
      </Callout>

      <h2 id="implementation">Implementation</h2>
      <p>The shipping CSS already exposes both reference and semantic layers. Use the semantic aliases in components — never the raw hexes:</p>

      <CodeBlock
        lang="css"
        tokens={[
          { t: 'com', v: '/* ✓ Right — go through the semantic layer */\n' },
          { t: null, v: '.cta {\n  color: ' },
          { t: 'key', v: 'var(--accent)' },
          { t: null, v: ';\n}\n\n' },
          { t: 'com', v: '/* ✗ Wrong — hard-codes the hex, breaks dark mode */\n' },
          { t: null, v: '.cta {\n  color: ' },
          { t: 'str', v: '#8B3525' },
          { t: null, v: ';\n}' },
        ]}
      />

      <Callout kind="tip">
        If you need a one-off color outside the palette (rare — usually for chart data), add it as a project-level variable layered ON TOP of the system. Do not edit the Wenxin tokens.
      </Callout>

      <h2 id="dark-mode">Dark mode — 夜晚的羊皮纸</h2>
      <p>Dark mode is called <em>night vellum</em>, and the name is the design: the page is the same warm paper, dimmed, not inverted to black on white. The accent shifts up to <code>#C4533E</code> to maintain visibility on the darker ground, but its role and budget are unchanged.</p>

      <p>The implementation supports both an automatic media query and a manual override:</p>

      <CodeBlock
        lang="html"
        tokens={[
          { t: 'com', v: '<!-- Manual dark mode -->\n' },
          { t: 'pun', v: '<' }, { t: 'fn', v: 'html' }, { t: null, v: ' ' },
          { t: 'key', v: 'data-theme' }, { t: 'pun', v: '=' }, { t: 'str', v: '"dark"' }, { t: 'pun', v: '>' },
          { t: null, v: '\n\n' },
          { t: 'com', v: '<!-- Automatic via OS preference -->\n' },
          { t: 'com', v: '/* @media (prefers-color-scheme: dark) handles it for you */' },
        ]}
      />

      <p>The cinnabar seal logo, by spec, does <strong>not</strong> participate in dark-mode color shifts. Its red base and white stamp are absolute — the contrast is designed to carry the brand through any environment unchanged.</p>
    </article>
  );
}

window.ColorPage = ColorPage;
