# storykit-assets-skill

Teach an agent to:

1. Turn authorized structured data into a **hosted StoryKit widget** (public MCP, no key).
2. Drive the **full Studio** (images, media, brands, canvases, assets, series, workflows) with a personal API key under plan limits.

**Hard rule:** never invent images with DALL·E / Midjourney / Gemini image / built-in `image_gen` / Unsplash — only StoryKit Studio MCP tools; return platform `outputUrl` after `get_image_job` → **SUCCEEDED**.

Setup: **[asset.storykit.space/ai](https://asset.storykit.space/ai)**

## Install

```bash
npx storykit-assets-skill@2.4.0
# or
npx storykit-assets-skill install
```

Installs skill `SKILL.md` (tool sheet v1.6.0 with full input specs).

## Connect the right MCP

| URL | Auth | Tools |
| --- | --- | --- |
| **`https://asset.storykit.space/api/v1/studio-mcp`** | `Bearer sk_live_…` | Full Studio (~69 tools) including `generate_image` |
| `https://asset.storykit.space/api/v1/mcp` | none | Widgets only — **no images** |

```bash
export STORYKIT_API_KEY="sk_live_…"   # mint at /ai

# Remote Studio (preferred for images)
claude mcp add --transport http storykit-studio https://asset.storykit.space/api/v1/studio-mcp \
  --header "Authorization: Bearer ${STORYKIT_API_KEY}"

# Public widgets
claude mcp add --transport http storykit https://asset.storykit.space/api/v1/mcp

# Or stdio package (studio_* tools when key is set)
claude mcp add storykit -- npx -y storykit-mcp@3.3.0
```

If `tools/list` lacks `generate_image`, you are on the wrong URL.

Hosted skill: [`asset.storykit.space/skill/SKILL.md`](https://asset.storykit.space/skill/SKILL.md)

## Image workflow (summary)

1. `get_account` / `get_usage` / `get_image_status`
2. Optional `upload_media` `{ imageBase64 }` → mediaId
3. `generate_image` or `edit_image`
4. Poll `get_image_job` until SUCCEEDED
5. Return platform `outputUrl` only

Full per-tool input schemas are in `SKILL.md`.

Track usage: [storykit.space/me](https://storykit.space/me)

MIT. Created with love by [Story Kit](https://storykit.space).
