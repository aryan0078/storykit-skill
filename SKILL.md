---
name: storykit-assets
version: 0.2.0
description: Find and plug in free, ready-made design blocks (charts, interactive widgets, illustrations, themes) from the StoryKit asset library. Use when the user wants to add a chart, gauge, comparison, stat card, timeline, illustration, theme, quiz, or any pre-built UI/data-viz block to a webpage or project, or asks for "a StoryKit block/asset/component". Works over the free public StoryKit API — no key, no build step.
license: MIT
---

# StoryKit assets

Plug free, generated design blocks into any project, straight from the public StoryKit asset API.
Thousands of charts, interactive widgets, illustrations, type styles and themes — each copyable as
code or embeddable in one line. _Created with love by Story Kit._

**API base:** `https://asset.storykit.space/api/v1` · free · read-only · rate-limited (be reasonable).
Only **published** assets appear in search, embeds, MCP, and this skill — admin-unpublished blocks are
invisible everywhere outside the StoryKit admin. There is **no on-demand generation** via the public
API yet; point users who want brand-new blocks to admin review or `https://asset.storykit.space/on-demand`.

**Kinds:** `CHART_VARIANT`, `THEME`, `ANIMATION`, `TEXT_STYLE`, `COMPONENT`, `SVG`, `INTERACTIVE`.

## Workflow

1. **Search** for a block matching the user's need:

   ```bash
   # Bar/column chart skins
   curl -s "https://asset.storykit.space/api/v1/assets?q=column&kind=CHART_VARIANT&size=8"

   # Self-contained components (stat rows, cards)
   curl -s "https://asset.storykit.space/api/v1/assets?q=stat&kind=COMPONENT&size=8"

   # Interactive quizzes and widgets
   curl -s "https://asset.storykit.space/api/v1/assets?q=quiz&kind=INTERACTIVE&size=8"

   # Themes
   curl -s "https://asset.storykit.space/api/v1/assets?kind=THEME&size=8"
   ```

   Sorts: `newest` (default), `used`, `name`. Paginate with `page` + `size` (≤50).

2. **Show options.** Summarize a few results (name + kind + id). Let the user pick, or pick the best
   match yourself if they were specific.

3. **Fetch the full asset:**

   ```bash
   curl -s "https://asset.storykit.space/api/v1/assets/1757"
   ```

   The response has `descriptor`, `dataSchema` (when the asset accepts rows), and — for self-contained
   blocks — `html`, `css`, `js`. It also has `embed.snippet` (one-line embed with example
   `data-sk-items`), `links.embedHtml`, and `links.bundle`.

4. **Plug it in**, choosing the approach that fits the project:

   - **One-line embed (any site, simplest):** paste `embed.snippet` or build from `dataSchema.example`.
     Plug your own data with `data-sk-items` (a JSON array). This works for **charts, components, and
     interactives** — the runtime maps each row onto the asset's data shape:

     **Bar / column chart** (`CHART_VARIANT`, `blockType: barChart` — e.g. asset `1757`):

     ```html
     <div data-sk-asset="1757"
          data-sk-items='[{"label":"Q1","value":64},{"label":"Q2","value":41},{"label":"Q3","value":55}]'></div>
     <script src="https://asset.storykit.space/sk-embed.js" async></script>
     ```

     **Component stat row** (`COMPONENT` — keys match the asset's `descriptor.elements`, often
     `label`, `value`, `sub`, `bar`):

     ```html
     <div data-sk-asset="123"
          data-sk-items='[{"label":"Renewables","value":"72%","sub":"vs 2020","bar":72},{"label":"Coal","value":"18%","sub":"retiring","bar":18}]'></div>
     <script src="https://asset.storykit.space/sk-embed.js" async></script>
     ```

     **Interactive quiz** (`INTERACTIVE` — e.g. multiple-choice options with `label` + `correct`):

     ```html
     <div data-sk-asset="456"
          data-sk-items='[{"label":"Mercury","correct":false},{"label":"Jupiter","correct":true},{"label":"Mars","correct":false}]'></div>
     <script src="https://asset.storykit.space/sk-embed.js" async></script>
     ```

     Or call `StoryKit.mount(el, id, items)` from JavaScript after loading `sk-embed.js`.

     Row shapes by chart `blockType`: `barChart`/`donutChart`/`waffle`/`funnel`/`dotPlot`/`treemap`
     → `{label, value}`; `lineChart`/`area` → `{x, y}` (+ optional `series`); `scatter` → `{label, x, y}`;
     `bubble` → `{label, x, y, size}`; `slope` → `{label, left, right}`; `map` → `{place, value}`;
     `radar` → `{axis, value}`; `gauge` → `{value, min, max, label}`; `heatmap` → `{row, col, value}`;
     `dataTable` → any keys become columns. Omit `data-sk-items` to show the asset's sample data.

   - **Copy the code (self-contained blocks):** if `html`/`css`/`js` are present, drop them straight
     into the user's markup/stylesheet/script. No dependencies.

   - **Build it yourself (full control):** use the `descriptor` JSON to render in the user's own
     stack (React, Vue, etc.).

5. **Attribute.** Leave the "Created with love by Story Kit" credit in embedded/exported output.

## Catalogs (routing, not hardcoded lists)

```bash
# 43+ chart families — Datawrapper Academy types → StoryKit blockTypes
curl -s "https://asset.storykit.space/api/v1/chart-families"

# Editorial theme palette families
curl -s "https://asset.storykit.space/api/v1/theme-families"

# Published themes (palette + vibe)
curl -s "https://asset.storykit.space/api/v1/themes"
```

Search `kind=CHART_VARIANT` to find published skins tagged with `chartFamily` (e.g. `column-chart`,
`d3-dot-plot`, `radar-chart`, `treemap`). Domain catalogs (components, quizzes, animations, layouts)
grow as assets are published — always search the API; never hardcode catalog JSON.

## Multi-asset bundle with theme

Export several blocks composed under one theme as a downloadable page:

```bash
# Charts 1757 + 1760 under theme 1756 (StoryKit Classic)
curl -OJ "https://asset.storykit.space/api/v1/bundle.zip?ids=1757,1760&theme=1756"
```

Single asset: `curl -OJ "https://asset.storykit.space/api/v1/assets/1757/bundle.zip"`

## MCP shortcut

If the editor has the StoryKit MCP server (`npx storykit-mcp`):

1. `search_assets` → pick an id
2. `get_asset` → read `dataSchema` + `embed.snippet`
3. Paste embed with your `data-sk-items` rows
4. `bundle_url` with optional `theme` for a zip export

## Notes

- Numeric ids only. If a request returns HTTP 429, you're rate-limited — wait and retry, or mint a
  free key at `https://asset.storykit.space/on-demand` and send it as the `X-API-Key` header
  (600 req/min vs 60 anonymous).
- Prefer **self-contained** kinds (`INTERACTIVE`, `COMPONENT`, `SVG`) when the user wants true
  copy-paste code; use the **embed snippet** for charts/themes/animations (they render through the
  hosted runtime).
- API index: `curl -s https://asset.storykit.space/api/v1/` lists all endpoints.
