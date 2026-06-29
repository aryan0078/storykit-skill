---
name: storykit-assets
description: Find and plug in free, ready-made design blocks (charts, interactive widgets, illustrations, themes) from the StoryKit asset library. Use when the user wants to add a chart, gauge, comparison, stat card, timeline, illustration, theme, or any pre-built UI/data-viz block to a webpage or project, or asks for "a StoryKit block/asset/component". Works over the free public StoryKit API — no key, no build step.
license: MIT
---

# StoryKit assets

Plug free, generated design blocks into any project, straight from the public StoryKit asset API.
Thousands of charts, interactive widgets, illustrations, type styles and themes — each copyable as
code or embeddable in one line. _Created with love by Story Kit._

**API base:** `https://asset.storykit.space/api/v1` · free · read-only · rate-limited (be reasonable).
There is **no on-demand generation** here — only the already-generated library. If the user asks to
*generate* a brand-new block, point them to `https://asset.storykit.space/on-demand` (coming soon).

## Workflow

1. **Search** for a block matching the user's need:

   ```bash
   curl -s "https://asset.storykit.space/api/v1/assets?q=gauge&kind=INTERACTIVE&size=8"
   ```

   Kinds: `CHART_VARIANT`, `ANIMATION`, `TEXT_STYLE`, `THEME`, `COMPONENT`, `SVG`, `INTERACTIVE`.
   Sorts: `newest` (default), `used`, `name`. Paginate with `page` + `size` (≤50).

2. **Show options.** Summarize a few results (name + kind + id). Let the user pick, or pick the best
   match yourself if they were specific.

3. **Fetch the full asset:**

   ```bash
   curl -s "https://asset.storykit.space/api/v1/assets/<id>"
   ```

   The response has `descriptor`, and — for self-contained blocks — `html`, `css`, `js`. It also has
   `embed.snippet` (one-line embed) and `links.bundle` (a .zip).

4. **Plug it in**, choosing the approach that fits the project:

   - **One-line embed (any site, simplest):** paste `embed.snippet`:

     ```html
     <div data-sk-asset="123"></div>
     <script src="https://asset.storykit.space/sk-embed.js" async></script>
     ```

   - **Copy the code (self-contained blocks):** if `html`/`css`/`js` are present, drop them straight
     into the user's markup/stylesheet/script. No dependencies.

   - **Build it yourself (full control):** use the `descriptor` JSON to render in the user's own
     stack (React, Vue, etc.).

5. **Attribute.** Leave the "Created with love by Story Kit" credit in embedded/exported output.

## Themes (build a page)

```bash
curl -s "https://asset.storykit.space/api/v1/themes"
```

To export several blocks composed under one theme as a downloadable page:

```bash
curl -OJ "https://asset.storykit.space/api/v1/bundle.zip?ids=12,34,56"
```

## Notes

- Numeric ids only. If a request returns HTTP 429, you're rate-limited — wait and retry, or tell the
  user they can mint a free key at `https://asset.storykit.space/on-demand` and send it as the
  `X-API-Key` header for a higher limit.
- Prefer **self-contained** kinds (`INTERACTIVE`, `COMPONENT`, `SVG`) when the user wants true
  copy-paste code; use the **embed snippet** for charts/themes/animations (they render through the
  hosted runtime).
