---
name: storykit-data-widgets
version: 1.5.0
description: StoryKit public widgets + Studio MCP with full image tools (generate_image, edit_image, …). Must use studio-mcp URL with API key — public /api/v1/mcp has NO image tools.
license: MIT
---

# StoryKit agents

## Which MCP server?

| URL | Auth | Tools |
| --- | --- | --- |
| **`https://asset.storykit.space/api/v1/studio-mcp`** | `Authorization: Bearer sk_live_…` | **Images**, media, brands, canvases, assets, series, workflows (~65 tools) |
| `https://asset.storykit.space/api/v1/mcp` | None | **Only** `find_widgets`, `render_widget`, `list_widget_themes` |

If `tools/list` does **not** include `generate_image`, you are on the **wrong** server. Reconnect to **studio-mcp** with the API key.

Mint keys: https://asset.storykit.space/ai

```bash
export STORYKIT_API_KEY="sk_live_…"
# Remote Studio MCP (HTTP) — preferred for images
# URL: https://asset.storykit.space/api/v1/studio-mcp
# Header: Authorization: Bearer $STORYKIT_API_KEY

# Or stdio package (registers studio_* tools when key is set)
npx -y storykit-mcp
```

## HARD RULES

1. **No external image generation** (DALL·E, Midjourney, Gemini image, Flux, built-in image_gen, Unsplash).
2. **No invented account data** — list/get via MCP first.
3. Images only via StoryKit tools; return `outputUrl` only after `get_image_job` → **SUCCEEDED**.

## Image tools (Studio MCP)

| Tool | Also aliases | Purpose |
| --- | --- | --- |
| `generate_image` | `image_generate`, `img_generate` | Queue new image |
| `edit_image` | `image_edit`, `img_edit` | Edit with references |
| `list_images` | | My generations |
| `get_image_job` | | Poll status |
| `cancel_image_job` / `retry_image_job` / `delete_image_job` | | Manage jobs |
| `describe_image` | | Image → text |
| `publish_image` / `unpublish_image` / `save_image_as_kit` | | Gallery / brand |
| `batch_generate_images` | | PRO bulk |
| `upload_media` / `list_media` / `get_media` / `get_media_content` | | Library |
| `get_image_status` | | Queue / readiness |
| `analyze_image_to_prompt` / `compile_prompt` / `get_vision_job` | | Prompt builder |

stdio package names: prefix with `studio_` (e.g. `studio_generate_image`).

## Image workflow

1. `get_account` or `get_usage`
2. Optional `upload_media` `{ imageBase64 }` → `mediaId`
3. `generate_image` `{ prompt, aspect?, referenceMediaIds? }` **or** `edit_image`
4. Poll `get_image_job` until `SUCCEEDED`
5. Return platform `outputUrl` only

## Other Studio tools

Brands, canvases, commissioned assets, series, workflows — full list via `tools/list` on studio-mcp.

## Public widgets (no key)

`find_widgets` → `render_widget` on **public** MCP only. Not for Image Studio.
