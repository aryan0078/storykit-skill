# storykit-assets-skill

**Teach any agent to use a free design library — and to publish visual essays with its own model.**

An agent skill for [StoryKit](https://storykit.space): plug ready-made design blocks — charts,
interactive widgets, illustrations, themes — into any project over the free public API, and author
whole interactive visual essays that StoryKit designs, hosts and shares. No key, no signup.
_Created with love by Story Kit._ 🍮

<p align="center">
  <img src="https://raw.githubusercontent.com/aryan0078/storykit-skill/master/assets/asset-3174.png" width="46%" alt="A StoryKit EQ-curve widget with the default paper theme">
  <img src="https://raw.githubusercontent.com/aryan0078/storykit-skill/master/assets/asset-themed.png" width="46%" alt="The same widget re-inked gold on dark via URL theme params">
</p>
<p align="center"><em>One live asset, two pages — re-inked with URL params, zero CSS written.</em></p>

## Install

### Claude Code

```bash
npx storykit-assets-skill install
```

Installs to `.claude/skills/storykit-assets/SKILL.md`. Reload skills, then ask:

> “Add a StoryKit column chart with my Q1–Q3 numbers to my landing page.”
> “Research the gold market and publish a StoryKit visual essay about it.”

### Other agents / custom location

```bash
npx storykit-assets-skill install --dir ./skills
# or just fetch the file
curl -L https://asset.storykit.space/skill/SKILL.md -o SKILL.md
```

Any agent that reads Markdown skill/instruction files can use it.

## What it teaches your agent

**Embed-first design blocks** over `https://asset.storykit.space/api/v1`:

- search the library by text + kind (`CHART_VARIANT`, `COMPONENT`, `INTERACTIVE`, `SVG`, `THEME`, …),
- embed any block in one line — your data via `data-sk-items`, your colors via
  `data-sk-accent/paper/ink/surface/accent2`,
- route chart picks through `/chart-families` (65+ families),
- compose themed multi-block `.zip` exports.

```html
<div data-sk-asset="1757"
     data-sk-items='[{"label":"North","value":64},{"label":"South","value":41}]'
     data-sk-accent="#b8860b" data-sk-paper="#14110b"></div>
<script src="https://asset.storykit.space/sk-embed.js" async></script>
```

<p align="center">
  <img src="https://raw.githubusercontent.com/aryan0078/storykit-skill/master/assets/asset-knob.png" width="46%" alt="A drag-interactable rotary knob widget from the library">
  <img src="https://raw.githubusercontent.com/aryan0078/storykit-skill/master/assets/asset-3172.png" width="46%" alt="An animated interactive widget from the library">
</p>

**BYOM visual essays** — the agent's own model authors the story; StoryKit makes it real:

1. `GET /api/v1/stories/contract` — the StorySpec grammar (pure JSON data, never code; visuals
   come from the reviewed asset library via `libraryWidget` requests),
2. `POST /api/v1/stories/import` — no key needed; returns a **private shareUrl** plus a
   **claimUrl** (sign in at storykit.space to keep the story; premium = permanent, public,
   SEO-indexed; unclaimed stories expire in ~30 days),
3. `format: "digest"` for prose-led briefings; `sources` render as themed citations.

Prefer MCP? See **[storykit-mcp](https://www.npmjs.com/package/storykit-mcp)** — or point a
streamable-HTTP client straight at `https://asset.storykit.space/api/v1/mcp` (nothing to install).

MIT licensed.
