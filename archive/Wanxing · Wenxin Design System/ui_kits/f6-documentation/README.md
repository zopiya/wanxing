# F6 Documentation · sidebar + content + TOC

The F6 kit — **文心文档**. Knowledge bases, API references, wikis, technical handbooks.

## Demo

`index.html` renders the documentation shell:

- 240 px **sidebar** with grouped nav, version chip, and a search input
- **Content area** at article-comfortable width with breadcrumb, italic lede, h2/h3 headings
- 220 px sticky **TOC** on the right, with current-heading tracking via IntersectionObserver
- The **Color** page is fleshed out with every primitive — table, callouts (all five), warm-tone code block, inline code — so you can see the full vocabulary in one place
- Other sidebar entries lead to a single `<StubPage>` so the navigation feels real without inventing copy

## Components

```
Sidebar.jsx     <Sidebar current={…} onSelect={…} />
CodeBlock.jsx   <CodeBlock lang="css" tokens={[{ t, v }, …]} />
                <CodeBlock lang="bash" text="…" />
Callout.jsx     <Callout kind="note | tip | warn | danger | quote" label="…">…</Callout>
Toc.jsx         <Toc items={[{ id, level, label }]} currentId={…} onJump={…} />
ColorPage.jsx   sample content using every component
App.jsx         <DocsApp />  — shell with page + heading state
f6.css          F6-specific layout
```

## Syntax highlighting

The token classes are warm-only: keyword `#8B3525` (the accent), string `#6B5B3E`, comment `#9A948D`, function `#5C4A2F`, number `#7A5C3A`, punctuation `#888580`. The spec explicitly forbids cool syntax colors (no blue, no purple) — code blocks should read like prose that happens to be in monospace.

We pass tokens explicitly rather than running a parser; for a real product, lift this format and feed it from your tokenizer of choice (Shiki, Prism, etc.) — just map the output to these six classes.

## Callout variants

| `kind` | Use | Visual |
|---|---|---|
| `note` | A general aside | Subtle left rule |
| `tip` | A helpful pattern | Subtle left rule |
| `warn` | A hard rule the reader can violate | **Accent** left rule, accent label |
| `danger` | A "you will pay for this" rule | Accent left rule + accent-subtle background |
| `quote` | An italicized aside / soft quotation | Accent left rule, italic body |

`warn` and `danger` are the only callout shapes that spend accent budget. Use sparingly — the page itself probably also has a CTA in accent.

## Things to know

- The sidebar's "search" input is **chrome only** — typing into it does nothing in this demo. In production, wire it to your search index.
- TOC tracking uses `rootMargin: '-10% 0px -70% 0px'` — the heading is "current" when it enters the upper 30% of the viewport. Tune to taste.
- All headings have `scroll-margin-top: var(--s-8)` so jump-links don't land flush with the top of the viewport.
- The brand seal in the sidebar is shared with the F1 kit (`../f1-web/Brand.jsx`) to keep visual identity single-sourced.
