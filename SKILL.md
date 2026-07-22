---
name: storykit-data-widgets
version: 1.4.0
description: StoryKit public widgets + full two-way Studio MCP (media, brands, canvas, assets, images). Never invent images or platform data — always use MCP tools with the user API key.
license: MIT
---

# StoryKit agents

## HARD RULES

1. **No external image generation.** Never use DALL·E, Midjourney, Gemini image, Flux, built-in
   `image_gen`, Unsplash, invented CDNs, or data: fake photos. Only StoryKit image tools.
2. **No invented account data.** Uploads, brands, canvases, series, and jobs live on StoryKit —
   list/get them via Studio MCP; do not guess IDs or fabricate histories.
3. **Owner scope only.** Tools use the API key’s user. Never invent ownerIds.

| Need | Tools |
| --- | --- |
| Charts/data widgets | Public MCP: `find_widgets` → `render_widget` |
| User images | Studio: `generate_image` / `edit_image` → poll `get_image_job` |
| User library | `list_media`, `get_media`, `get_media_content`, `upload_media`, `update_media` |
| Brand kits | `list_brand_kits`, `get_brand_kit`, `extract_brand_kit`, `refine_brand_kit`, `rename_brand_kit` |
| Canvases | `list_canvases`, `get_canvas`, `create_canvas`, `save_canvas` |
| Commissioned widgets | `list_studio_assets`, `commission_studio_asset`, `iterate_studio_asset` |
| Series / workflows | `list_series`, `create_series`, `series_next`, `list_workflows`, `run_workflow` |
| Admin essay photos | Admin MCP image pack only |

If image tools fail: **inline SVG only** — never another image model.

---

## Surfaces

| Surface | URL | Auth |
| --- | --- | --- |
| Public widgets | `https://asset.storykit.space/api/v1/mcp` | None |
| **Studio (users)** | `https://asset.storykit.space/api/v1/studio-mcp` | `Authorization: Bearer sk_live_…` |
| Admin | `https://storykit.space/api/v1/admin-mcp` | 24h `X-Admin-Key` |

Mint / manage keys: https://asset.storykit.space/ai · Usage: https://storykit.space/me

```bash
export STORYKIT_API_KEY="sk_live_…"
claude mcp add --transport http storykit-studio https://asset.storykit.space/api/v1/studio-mcp \
  --header "Authorization: Bearer ${STORYKIT_API_KEY}"
```

---

## Two-way Studio workflow

1. `get_account` or `get_usage` — plan + remaining quota  
2. **Read** existing work: `list_media`, `list_brand_kits`, `list_canvases`, `list_images`, `list_series`  
3. **Act** with create/update tools (upload, extract brand, generate_image, save_canvas, …)  
4. Poll async jobs (`get_image_job`, `get_vision_job`) until SUCCEEDED  
5. Return platform urls/ids only; tell the user they can also see changes on asset.storykit.space/studio  

### Media
- `list_media` `{ query?, kind?, trash? }` · `get_media` · `get_media_content` (base64 ≤2MB)  
- `upload_media` `{ imageBase64 }` · `update_media` · `star_media` · `trash_media` · `restore_media` · `delete_media`  
- Prefer `describe_image` over bulk base64 when summarizing.

### Brands
- `list_brand_kits` · `get_brand_kit` · `extract_brand_kit` · `refine_brand_kit`  
- `rename_brand_kit` · `duplicate_brand_kit` · `delete_brand_kit` · `publish_brand_kit` · `brand_showcase`

### Canvases
- `list_canvases` · `get_canvas` (includes `doc` JSON) · `create_canvas` · `save_canvas` · `duplicate_canvas` · `delete_canvas`

### Studio assets (commissioned designs)
- `list_studio_assets` · `get_studio_asset` (versions, no raw html/css/js)  
- `commission_studio_asset` · `iterate_studio_asset` · `rename_studio_asset` · `trash_studio_asset`  
- `list_folders` · `create_folder`

### Image AI
- `generate_image` · `edit_image` · `list_images` · `get_image_job` · `cancel_image_job` · `retry_image_job`  
- `describe_image` · `publish_image` · `batch_generate_images` (PRO) · `save_image_as_kit`

### Series & workflows
- `list_series` · `get_series` · `create_series` · `series_next` · `series_extend` · `delete_series`  
- `list_workflows` · `get_workflow` · `create_workflow` · `update_workflow` · `run_workflow` · `list_workflow_runs`

Plan limits are server-enforced. Failed/cancelled image jobs do not consume allowance.
