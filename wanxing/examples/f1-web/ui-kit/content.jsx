/* Sample content — keeps screens.jsx readable. */

const FORMS = [
  { code: 'F1', name: 'HTML Web',        desc: '文心正典 · responsive site' },
  { code: 'F2', name: 'Mobile App',      desc: '文心移动 · native adaptation' },
  { code: 'F3', name: 'Brand Identity',  desc: '文心品牌 · cinnabar seal' },
  { code: 'F4', name: 'Print & Editorial', desc: '文心书卷 · books / zines' },
  { code: 'F5', name: 'Presentation',    desc: '文心演示 · 16:9 slides' },
  { code: 'F6', name: 'Documentation',   desc: '文心文档 · knowledge base' },
  { code: 'F7', name: 'Poster & Cover',  desc: '文心海报 · single-page' },
  { code: 'F8', name: 'Diagram',         desc: '文心图解 · knowledge map' },
  { code: 'F9', name: 'Report & LaTeX',  desc: '文心报告 · MD → PDF' },
];

const PRINCIPLES = [
  {
    num: '原则一',
    title: '文字即界面',
    body: 'Content itself is the visual subject. Every UI decision serves the same goal — let the reader enter the work naturally and quietly, not be interrupted by the interface.',
  },
  {
    num: '原则二',
    title: '留白即设计',
    body: 'Whitespace is not absence. It is the punctuation between thoughts, the breath the reader takes between sentences. The page that feels too empty is usually exactly right.',
  },
  {
    num: '原则三',
    title: '克制即力量',
    body: 'One accent. One brand mark. One ceremonial gesture. The fewer the moments of color, the heavier each one falls — like the cinnabar stamp at the corner of an ink painting.',
  },
];

const POSTS = [
  {
    slug: 'water-principle',
    date: '2026 / 05 / 24',
    title: 'Water in a cup, water in a river',
    tags: ['Philosophy', 'Forms'],
    readTime: '8 min read',
    lede: 'The two-layer architecture of Wenxin, and why the soul should never compromise.',
    author: 'Zopiya',
    authorBio: 'project lead · 万形 v2',
    body: [
      { kind: 'p', text: 'Water in a cup takes the shape of the cup. In a river, the shape of the river. The molecule never changes — and yet you would never confuse one with the other. This is the first idea Wenxin asks you to hold.' },
      { kind: 'p', text: 'A design system, in this view, is not a kit of shapes you assemble. It is a temperature, a pace, a manner of speaking. Those things stay the same across every surface. The actual layout of the surface — column count, navigation pattern, whether there is a header at all — bends to whatever the format requires.' },
      { kind: 'h2', text: 'The soul never bends' },
      { kind: 'p', text: 'Palette stays warm. Type stays serif. Whitespace stays generous. The cinnabar appears, at most, twice on the page. These are non-negotiable across all nine formats — F1 through F9, from a responsive website to a printed monograph.' },
      { kind: 'quote', text: 'Frequency makes the stamp. Used twice on a page, the cinnabar is a signature. Used six times, it is noise.' },
      { kind: 'h2', text: 'The form bends to context' },
      { kind: 'p', text: 'A web page wants vertical scroll, a `<nav>`, hover states. A book wants a running header, a footnote rule, no transitions at all. A slide wants 88-pixel display type. The same tokens compose each of these, but the compositional grammar is the grammar of the format.' },
      { kind: 'code', text: ':root {\n  --accent: #8B3525;        /* the one stamp */\n  --serif-body: "EB Garamond", "Noto Serif SC", serif;\n  --leading-relaxed: 1.85;  /* CJK reading default */\n}' },
      { kind: 'p', text: 'The result is a system that resists looking like a "branded template". A Wanxing page does not stamp its logo at you. It feels like a quiet room with one ink seal in the corner.' },
    ],
  },
  {
    slug: 'three-principles',
    date: '2026 / 05 / 12',
    title: 'On the three soul principles',
    tags: ['Philosophy'],
    readTime: '4 min read',
    lede: 'Why all three are necessary, and what is lost when any one is dropped.',
    author: 'Zopiya',
    authorBio: 'project lead · 万形 v2',
    body: [
      { kind: 'p', text: 'Drop "text is the interface" and you get decoration. Drop "whitespace is the design" and you get density. Drop "restraint is the power" and you get noise. The three together describe a single posture — they are not a checklist.' },
      { kind: 'p', text: 'It is tempting to read them as design taste. They are not. They are operating constraints. They tell you what to remove.' },
    ],
  },
  {
    slug: 'no-card-system',
    date: '2026 / 04 / 30',
    title: 'A design system without cards',
    tags: ['Components', 'Restraint'],
    readTime: '6 min read',
    lede: 'Every component library begins with the card. We do not have one.',
    author: 'Zopiya',
    authorBio: 'project lead · 万形 v2',
    body: [
      { kind: 'p', text: 'There is no "card" in Wenxin. No box with a shadow and rounded corners. No 4-pixel colored left border. No card-with-icon, no card-with-image, no nested card-in-card.' },
      { kind: 'p', text: 'Where another system would reach for a card, Wenxin uses a one-pixel hairline and 32 pixels of whitespace. The reader still understands that two things are separate. The page does not have to whisper "look, a container".' },
    ],
  },
];

window.FORMS = FORMS;
window.PRINCIPLES = PRINCIPLES;
window.POSTS = POSTS;
