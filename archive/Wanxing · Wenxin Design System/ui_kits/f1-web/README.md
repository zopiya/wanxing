# F1 Web · Wenxin canonical responsive site

The F1 kit — what the source repository calls **文心正典** (Wenxin Canonical). It is the most complete expression of the design language and the reference all other formats fall back to.

## Demo

`index.html` runs an interactive four-screen prototype:

| Screen | Archetype | What it demonstrates |
|---|---|---|
| **Home** | D — landing | Hero · three-principle grid · nine-format grid · text-only CTA |
| **Forms** | C — showcase | Selectable form grid with accent left-border (the active state) |
| **Journal** | B — list | Date + title + meta rows, hairline separators, no cards |
| **Article** | A — reading | `--w-article` single column, lede, h2, blockquote, code, attribution rule |

Navigate via the header. The demo lives entirely in client-side React with no router, since prototypes don't need persistence and the URL would clutter the comment surface.

## Components

```
Brand.jsx     <BrandSeal />  <BrandMark />
Header.jsx    <Header screen={…} onNavigate={…} />
Hero.jsx      <Hero onCta={…} />
Sections.jsx  <SectionHeader />  <PrincipleCard />  <FormItem />
PostList.jsx  <PostList posts={…} onOpen={…} />
Article.jsx   <Article post={…} onBack={…} />
Footer.jsx    <Footer />
screens.jsx   <HomeScreen />  <FormsScreen />  <JournalScreen />  <ArticleScreen />
App.jsx       <App />  — the demo shell with screen state
content.jsx   sample copy for the demo
f1.css        F1 layout (header, hero, section rhythm, grids)
```

Every component is small, cosmetic, and direct. The components mirror the structure of `source/docs/wanxing-f1-web/index.html` — the canonical reference page from the repo — but expose them as composable React parts rather than one long HTML document.

## When to reach for what

- Reading-heavy content → `<Article>` inside `<ArticleScreen>`. Width is `--w-article` (520–640 px). Don't widen it; CJK readers want a short measure.
- Long lists (archive, search results) → `<PostList>`. Don't wrap items in cards.
- Landing / showcase → compose with `<Hero>`, `<SectionHeader>`, and a `.grid-3` of `<PrincipleCard>` or `.grid-3-tight` of `<FormItem>`.
- Brand chrome → always `<Header>` + `<Footer>`. The header brand mark `■` breathes on a 4-second loop — leave it.

## Things this kit does NOT do (on purpose)

- **No cards with shadows.** If you find yourself wanting one, use a top hairline + whitespace instead.
- **No filled buttons.** All CTAs are text + arrow, or wireframe pill-less buttons in `preview/components-buttons.html`.
- **No emoji.** No icon library. Use Unicode `↓ → ←` and the brand `■`.
- **No mobile sidebar drawer.** The nav collapses into the header on small screens — the F1 reference uses a hamburger; this prototype renders flat to keep the prototype simple. The hamburger pattern from `source/docs/wanxing-f1-web` is the right thing to lift if you need it.
- **No dark-mode toggle.** Dark mode is *automatic* via `prefers-color-scheme`; building a toggle would just be a tweak surface, not a real product affordance.
