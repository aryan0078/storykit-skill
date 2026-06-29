# storykit-assets-skill

> Agent skill: find and plug in free, ready-made **StoryKit design blocks** — charts, interactive
> widgets, illustrations, type styles, themes — over the public StoryKit asset API.
> _Created with love by Story Kit._ 🍮

Teaches any skill-aware agent how to search the [StoryKit asset library](https://asset.storykit.space)
and drop a block into a project: as a one-line embed with `data-sk-items`, as copy-paste HTML/CSS/JS,
or rendered from the asset's JSON descriptor. Free, read-only, no key. (No on-demand generation —
that's on the website roadmap.)

## Install

### Claude Code

```bash
npx storykit-assets-skill install
```

Installs to `.claude/skills/storykit-assets/SKILL.md`. Reload skills, then ask:

> “Add a StoryKit column chart with my Q1–Q3 numbers to my landing page.”

### Other agents / custom location

```bash
npx storykit-assets-skill install --dir ./skills
```

Or just download the skill file:

```bash
curl -L https://asset.storykit.space/skill/SKILL.md -o SKILL.md
```

Any agent that reads Markdown skill/instruction files can use it — point it at `SKILL.md`.

## What it does

The skill drives the free API at `https://asset.storykit.space/api/v1`:

- searches the library by text + kind (`CHART_VARIANT`, `COMPONENT`, `INTERACTIVE`, `THEME`, …),
- fetches an asset's full structure (`descriptor`, `dataSchema`, html/css/js, embed snippet),
- plugs your rows in via `data-sk-items` or `StoryKit.mount()`,
- routes chart picks through `/chart-families` (43+ families),
- composes a themed multi-block `.zip` export (`/bundle.zip?ids=…&theme=…`).

Prefer to call it yourself or from an IDE chat? See also **[storykit-mcp](https://www.npmjs.com/package/storykit-mcp)**.

## Quick examples

```bash
curl -s "https://asset.storykit.space/api/v1/assets?kind=CHART_VARIANT&q=column&size=5"
curl -s "https://asset.storykit.space/api/v1/assets/1757"
curl -s "https://asset.storykit.space/api/v1/chart-families"
```

```html
<div data-sk-asset="1757"
     data-sk-items='[{"label":"North","value":64},{"label":"South","value":41}]'></div>
<script src="https://asset.storykit.space/sk-embed.js" async></script>
```

MIT licensed.
