# storykit-assets-skill

Teach an agent to:

1. Turn authorized structured data into a **hosted StoryKit widget** (public MCP, no key).
2. Drive **Image Studio / Brand AI / series / workflows** with a personal API key under plan limits.

**Hard rule:** agents must never invent or generate images with DALL·E / Midjourney / built-in tools — only StoryKit MCP (`generate_image`, admin image pack tools, or inline SVG).

Setup: **[asset.storykit.space/ai](https://asset.storykit.space/ai)**

## Install

```bash
npx storykit-assets-skill install
```

Installs `.claude/skills/storykit-data-widgets/SKILL.md`.

```bash
# Public widgets
claude mcp add --transport http storykit https://asset.storykit.space/api/v1/mcp

# Studio
export STORYKIT_API_KEY="sk_live_…"   # mint at /ai
claude mcp add --transport http storykit-studio https://asset.storykit.space/api/v1/studio-mcp \
  --header "Authorization: Bearer ${STORYKIT_API_KEY}"
```

Hosted skill: [`asset.storykit.space/skill/SKILL.md`](https://asset.storykit.space/skill/SKILL.md)

## What it covers

**Widgets** — `find_widgets` / `render_widget`, consent for personal data, treat render URLs as secrets.

**Studio** — preserve API key, check quotas, upload references as base64, generate/edit/describe images, brand extract, series, workflows.

Track usage: [storykit.space/me](https://storykit.space/me)

MIT. Created with love by [Story Kit](https://storykit.space).
