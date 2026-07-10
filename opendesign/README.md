# Wenxin for OpenDesign

This directory adapts [`wenxin/`](../wenxin/README.md) (design spec / soul) and [`wanxing/`](../wanxing/README.md) (form reference) into a design-system plugin consumable by **Open Design** (nexu-io/open-design, Apache-2.0) — an open-source, local-first coding-agent workspace that turns a repo's design language into something an AI agent can load and build from directly.

## What Open Design expects

Open Design's design systems live one-per-brand under `design-systems/<slug>/`, each following a fixed 4-file layout:

```
design-systems/<slug>/
├── manifest.json     — machine-readable entry (schema version, id, name, category, file locations)
├── DESIGN.md          — the canonical spec, a fixed 9-section schema:
│                        1. Visual Theme & Atmosphere   6. Depth & Elevation
│                        2. Color Palette & Roles       7. Do's and Don'ts
│                        3. Typography Rules             8. Responsive Behavior
│                        4. Component Stylings           9. Agent Prompt Guide
│                        5. Layout Principles
├── tokens.css         — compiled CSS custom properties
└── components.html    — an optional component fixture the agent can render/inspect
```

The first `H1` in `DESIGN.md` is the title shown in Open Design's picker; a `> Category: <Group>` line under it groups it in the dropdown. Dropping a new folder with a `DESIGN.md` in it is enough for Open Design to discover it on next refresh — no build step, no account, no export.

## What's here

```
opendesign/wenxin/
├── manifest.json
├── DESIGN.md          — distilled from wenxin/*.md + wanxing/page-archetypes.md
├── tokens.css          — verbatim copy of wenxin/tokens.css (the single authoritative token source)
├── components.html     — fixture demonstrating links/buttons/forms/code/tags/table/blockquote/brand mark
└── assets/              — brand mark + logo SVGs, copied from wanxing/examples/f3-brand/assets/
```

`DESIGN.md` is Open Design's format for a **single, medium-agnostic brand voice** — it maps most directly onto `wenxin/` (the soul layer: color, type, spacing, motion, brand, forbidden list). It does **not** replace `wanxing/`: Open Design's schema has no concept of "nine output media," so `DESIGN.md` §5 (Layout Principles) instead links out to each `wanxing/fN-*.md` file for medium-specific layout rules (web, mobile, print, presentation, poster, diagram, report, etc.). An agent using this plugin should read `DESIGN.md` first for the soul, then the matching `wanxing/fN-*.md` file for the shape — same split as the rest of this repo, just packaged the way Open Design expects.

## Keeping this in sync

`tokens.css` here is a **copy**, not a symlink (Open Design reads a real file at a fixed relative path). If [`wenxin/tokens.css`](../wenxin/tokens.css) changes, re-copy it here. Everything else in `DESIGN.md` should stay a distillation of `wenxin/*.md` — if the soul-layer docs change, this file needs a matching update, not the other way around.

## Caveat

The exact `manifest.json` field names and the precise wording of the 9-section schema were reconstructed from Open Design's public docs and repository as of 2026-07-10, not from a local install of the tool. If a specific version of Open Design expects different manifest keys or file names, adjust `manifest.json` to match — the content of `DESIGN.md`/`tokens.css`/`components.html` is the part that should not need to change.
