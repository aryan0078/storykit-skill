---
name: storykit-data-widgets
version: 2.5.0
description: StoryKit Studio MCP — full image + media + brand + canvas + series/batch tools. MUST use studio-mcp with API key. Public /api/v1/mcp has NO images.
license: MIT
---

# StoryKit agents — MCP tool sheet

## CRITICAL: which server?

| URL | Auth | What you get |
| --- | --- | --- |
| **`https://asset.storykit.space/api/v1/studio-mcp`** | `Authorization: Bearer sk_live_…` | **Full Studio** (~69 tools): images, media, brands, canvases, assets, series, workflows |
| `https://asset.storykit.space/api/v1/mcp` | none | **Only** `find_widgets`, `render_widget`, `list_widget_themes` |

If `tools/list` lacks `generate_image`, you are on the **wrong URL**.

Mint keys: https://asset.storykit.space/ai

```text
Studio MCP URL: https://asset.storykit.space/api/v1/studio-mcp
Header: Authorization: Bearer sk_live_…
```

Or: `STORYKIT_API_KEY=sk_live_…` + `npx -y storykit-mcp` (tools named `studio_*`).

---

## HARD RULES

1. Never invent images (DALL·E, Midjourney, Gemini image, built-in image_gen, Unsplash).
2. Never invent ids — call `list_*` / `get_*` first.
3. After `generate_image` / `edit_image`, poll `get_image_job` until **SUCCEEDED**; return platform `outputUrl` only.

---

## Image tools (must exist on Studio MCP)

| Tool | Aliases | Spec |
| --- | --- | --- |
| `generate_image` | `image_generate`, `img_generate` | `{ prompt, aspect?, qualityMode?, brandKitId?, referenceMediaIds?, count?, magicPrompt?, caption?, mode? }` → job; poll `get_image_job` |
| `edit_image` | `image_edit`, `img_edit` | `{ prompt, referenceMediaIds[1..5], maskMediaId?, aspect?, count? }` |
| `list_images` | | `{ query?, state? }` state e.g. SUCCEEDED |
| `get_image_job` | | `{ jobId? }` or `{ id? }` — poll until SUCCEEDED/FAILED |
| `cancel_image_job` | | `{ jobId }` — no quota burn |
| `retry_image_job` | | `{ jobId }` |
| `delete_image_job` | | `{ jobId }` archive |
| `describe_image` | | `{ mediaId? }` or `{ generationId? }` |
| `publish_image` / `unpublish_image` | | `{ id }` numeric generation id |
| `save_image_as_kit` | | `{ jobId }` → brand kit |
| `batch_generate_images` | | PRO: `{ prompts[], aspect?, brandKitId?, qualityMode? }` |
| `get_image_status` | | workstation + quota |

**Aspects:** `square` `portrait` `poster` `story` `landscape` `banner`  
**qualityMode:** `fast` | `quality`

### Image workflow

1. `get_account` or `get_usage`  
2. Optional `upload_media` `{ imageBase64, contentType?, filename? }` → `mediaId`  
3. `generate_image` or `edit_image`  
4. Loop `get_image_job` until SUCCEEDED  
5. Return `outputUrl` only  

---

## Media library

| Tool | Spec |
| --- | --- |
| `list_media` | `{ query?, kind?, trash? }` |
| `get_media` | `{ id }` metadata |
| `get_media_content` | `{ id }` base64 ≤2MB |
| `upload_media` | `{ imageBase64, contentType?, filename? }` |
| `update_media` | `{ id, title?, tags? }` |
| `star_media` | `{ id, starred }` |
| `trash_media` / `restore_media` / `delete_media` | `{ id }` |

---

## Prompt / vision

| Tool | Spec |
| --- | --- |
| `compile_prompt` | `{ draft }` → caption JSON for `generate_image.caption` (see draft shape below) |
| `analyze_image_to_prompt` | `{ imageBase64, contentType?, aspect?, layout? }` → job |
| `get_vision_job` | `{ jobId, apply? }` set apply=true when done |

`compile_prompt` draft shape (all fields required unless noted):

```json
{
  "aspect": "poster",
  "layout": "product",
  "highLevelDescription": "One clear hero subject…",
  "background": "Full-bleed paper ground…",
  "style": {
    "aesthetics": "editorial still life…",
    "lighting": "soft studio light…",
    "medium": "graphic_design",
    "photo": "",
    "artStyle": "polished editorial graphic…",
    "colorPalette": ["#111", "#f5f0e8"]
  },
  "elements": [
    { "id": "hero", "type": "obj", "role": "hero", "description": "Central subject…" }
  ]
}
```

Rules: exactly one of `style.photo` or `style.artStyle`; if `medium` is `photograph`, set `photo` and leave `artStyle` empty.

---

## Brands

| Tool | Spec |
| --- | --- |
| `list_brand_kits` | `{ query?, page?, size? }` |
| `get_brand_kit` | `{ id }` full DNA JSON |
| `extract_brand_kit` | `{ imagesBase64:[{base64,contentType?}], prompt?, md? }` 1–5 images |
| `refine_brand_kit` | `{ id, feedback }` |
| `rename_brand_kit` | `{ id, name }` |
| `duplicate_brand_kit` | `{ id, name? }` |
| `delete_brand_kit` | `{ id }` |
| `publish_brand_kit` / `unpublish_brand_kit` | `{ id }` |
| `brand_showcase` | `{ id, count? }` queues showcase gens |

---

## Canvases

| Tool | Spec |
| --- | --- |
| `list_canvases` | `{}` |
| `get_canvas` | `{ id }` includes `doc` JSON |
| `create_canvas` | `{ title?, aspect? }` |
| `save_canvas` | `{ id, title?, aspect?, doc?, thumbnailMediaId? }` |
| `duplicate_canvas` / `delete_canvas` | `{ id }` |

---

## Studio assets (commissioned widgets)

| Tool | Spec |
| --- | --- |
| `list_studio_assets` | `{}` |
| `get_studio_asset` | `{ id }` versions; **no** html/css/js source |
| `commission_studio_asset` | `{ prompt, kind?, purpose?, sourceMd? }` |
| `iterate_studio_asset` | `{ id, feedback }` |
| `rename_studio_asset` | `{ id, title }` |
| `trash_studio_asset` / `restore_studio_asset` | `{ id }` |
| `list_folders` / `create_folder` | `{ name }` for create |

---

## Series & workflows

| Tool | Spec |
| --- | --- |
| `list_series` / `get_series` | `{ id }` for get |
| `create_series` | `{ title, description?, brandKitId?, referenceMediaIds?, aspect?, storyline? }` |
| `series_next` | `{ id, instruction?, aspect? }` |
| `series_extend` | `{ id, storyline?, sections?, aspect? }` 1–20 sections |
| `delete_series` | `{ id }` |
| `list_workflows` / `get_workflow` | |
| `create_workflow` / `update_workflow` | `{ title?, description?, brandKitId?, steps? }` |
| `run_workflow` | `{ id, title?, brandKitId?, steps? }` |
| `delete_workflow` / `list_workflow_runs` | |

---

## Account

- `get_account` — identity + quotas + tool summary  
- `get_usage` — full limits snapshot  

## Public widgets (separate server)

On **public** MCP only: `find_widgets` → map rows → `render_widget`. Not for Image Studio.
