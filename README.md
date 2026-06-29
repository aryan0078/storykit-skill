# storykit-assets-skill

> Agent skill: find and plug in free, ready-made **StoryKit design blocks** — charts, interactive
> widgets, illustrations, type styles, themes — over the public StoryKit asset API.
> _Created with love by Story Kit._ 🍮

Teaches any skill-aware agent how to search the [StoryKit asset library](https://asset.storykit.space)
and drop a block into a project: as a one-line embed, as copy-paste HTML/CSS/JS, or rendered from the
asset's JSON descriptor. Free, read-only, no key. (No on-demand generation — that's on the website
roadmap.)

## Install

### Claude Code

```bash
npx storykit-assets-skill install
```

Installs to `.claude/skills/storykit-assets/SKILL.md`. Reload skills, then ask:

> “Add a StoryKit comparison chart to my landing page.”

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

- searches the library by text + kind,
- fetches an asset's full structure (descriptor + html/css/js + embed snippet),
- plugs it into the project the way that fits (embed snippet / copy code / render from JSON),
- composes a themed page and a `.zip` export.

Prefer to call it yourself or from an IDE chat? See also **[storykit-mcp](https://www.npmjs.com/package/storykit-mcp)**.

MIT licensed.
