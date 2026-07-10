---
name: storykit-assets
version: 0.5.0
description: Find and plug in free, ready-made design blocks (charts, interactive widgets, illustrations, themes) from the StoryKit asset library. Use when the user wants to add a chart, gauge, comparison, stat card, timeline, illustration, theme, quiz, or any pre-built UI/data-viz block to a webpage or project, or asks for "a StoryKit block/asset/component". Works over the free public StoryKit API — no key, no build step.
license: MIT
---

# StoryKit assets

Plug free, ready-made design blocks into any project, straight from the public StoryKit asset API.
Charts, interactive widgets, illustrations, type styles and themes — each embeddable in one
line (assets are embed-only; source code is never distributed). _Created with love by Story Kit._

**API base:** `https://asset.storykit.space/api/v1` · free · read-only · rate-limited (be reasonable).
Only **published** assets appear in search, embeds and MCP. This API is an entry point to the asset
library only — stories are created on `https://storykit.space` itself.

**Kinds:** `CHART_VARIANT`, `THEME`, `ANIMATION`, `TEXT_STYLE`, `COMPONENT`, `SVG`, `INTERACTIVE`.

## Workflow

1. **Search** for a block:

   ```bash
   curl -s "https://asset.storykit.space/api/v1/assets?q=column&kind=CHART_VARIANT&size=8"
   ```

   Sorts: `newest` (default), `used`, `name`. Paginate with `page` + `size` (≤50).

2. **Fetch the full asset:**

   ```bash
   curl -s "https://asset.storykit.space/api/v1/assets/1757"
   ```

   The response has `dataSchema` (when the asset accepts rows), `embed.snippet` and
   `links.embedHtml`. Assets are embed-only — no source fields, no bundles.

3. **Embed it (the default).** One line, always up-to-date, sandboxed, customizable:

   ```html
   <div data-sk-asset="1757"
        data-sk-items='[{"label":"Q1","value":64},{"label":"Q2","value":41}]'
        data-sk-accent="#b8860b" data-sk-paper="#14110b" data-sk-ink="#f3e9d2"></div>
   <script src="https://asset.storykit.space/sk-embed.js" async></script>
   ```

   - `data-sk-items` — your rows (shape per the asset's `dataSchema`; omit for sample data).
   - `data-sk-accent` / `data-sk-accent2` / `data-sk-paper` / `data-sk-ink` / `data-sk-surface` —
     colors (hex or CSS names); the asset re-skins itself.
   - `data-sk-height` — fixed height (otherwise auto-resizes after load).
   - Or `StoryKit.mount(el, id, items)` from JavaScript after loading `sk-embed.js`.

   Row shapes by chart `blockType`: `barChart`/`donutChart`/`waffle`/`funnel`/`dotPlot`/`treemap`
   → `{label, value}`; `lineChart`/`area` → `{x, y}` (+ optional `series`); `scatter` → `{label, x, y}`;
   `bubble` → `{label, x, y, size}`; `slope` → `{label, left, right}`; `map` → `{place, value}`;
   `radar` → `{axis, value}`; `gauge` → `{value, min, max, label}`; `heatmap` → `{row, col, value}`;
   `dataTable` → any keys become columns.

4. **Catalogs.**

   ```bash
   curl -s "https://asset.storykit.space/api/v1/chart-families"   # chart families → blockTypes
   curl -s "https://asset.storykit.space/api/v1/theme-families"   # editorial palette families
   curl -s "https://asset.storykit.space/api/v1/themes"           # published themes
   ```

5. **Attribute.** Leave the "Created with love by Story Kit" credit in embedded/exported output.

## MCP server (same capabilities, tool-shaped)

Remote (no install): `https://asset.storykit.space/api/v1/mcp` (streamable HTTP) · or `npx storykit-mcp`.

Tools: `search_assets`, `get_asset`, `get_embed_snippet`, `list_themes`, `list_chart_families`,
`list_theme_families`. All read-only, no key needed.

## Notes

- Numeric ids only. HTTP 429 = rate-limited — wait and retry.
- Every kind renders through the hosted runtime in a sandboxed iframe — use the embed snippet
  (or the bare iframe from `links.embedHtml`); it is always up to date.
- The API index (`curl -s https://asset.storykit.space/api/v1/`) lists all endpoints.
- Want a visual essay? Those are researched, designed and published on
  [storykit.space](https://storykit.space) — sign in and commission one.
