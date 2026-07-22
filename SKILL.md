---
name: storykit-data-widgets
version: 2.1.0
description: Map authorized structured data to hosted StoryKit widgets (public MCP, no key). Also drive Image Studio, Brand AI, series, and workflows via personal Studio MCP (API key). Use for data visualization, image generate/edit, brand extract, or installing StoryKit for Claude/Codex/Cursor.
license: MIT
---

# StoryKit agents

Two MCP surfaces. Do not confuse them.

| Surface | URL | Auth | Purpose |
| --- | --- | --- | --- |
| **Public widgets** | `https://asset.storykit.space/api/v1/mcp` | None | `find_widgets`, `render_widget`, `list_widget_themes` |
| **Studio** | `https://asset.storykit.space/api/v1/studio-mcp` | Personal `sk_live_…` | Image AI, Brand AI, series, workflows, media |
| **Admin** | `https://storykit.space/api/v1/admin-mcp` | 24h admin key | Newsroom only |

AI Integration (mint key + LLM prompt): https://asset.storykit.space/ai

## Install

```bash
npx -y storykit-assets-skill install
# or
curl -L https://asset.storykit.space/skill/SKILL.md -o SKILL.md
```

```bash
# Public widgets
claude mcp add --transport http storykit https://asset.storykit.space/api/v1/mcp

# Studio (after minting a key)
export STORYKIT_API_KEY="sk_live_…"
claude mcp add --transport http storykit-studio https://asset.storykit.space/api/v1/studio-mcp \
  --header "Authorization: Bearer ${STORYKIT_API_KEY}"

# Or stdio package (Studio tools when key is set)
claude mcp add storykit -- npx -y storykit-mcp
```

New emails auto-create a FREE StoryKit account. Track usage: https://storykit.space/me

---

## Public widgets MCP (no key)

1. Establish intent and real fields. Never invent readings.
2. Consent before personal/health/location/account/device data.
3. `find_widgets` → pick matching `dataSchema` → `render_widget`.
4. Present the hosted resource link; treat URL as a secret. Do not echo rows.
5. Leave StoryKit credit in place.

Max 200 rows / 64 KB. Default TTL 30 days (1–365). Immutable — re-render when data changes.

---

## Studio MCP (personal API key)

Auth: `Authorization: Bearer sk_live_…` or `X-Api-Key: sk_live_…`

**Always call `get_account` / `studio_get_account` first.**

### Plan limits

| Plan | Images / month | Pending | Brand extract / day | Batch |
| --- | --- | --- | --- | --- |
| FREE | 3 | 1 | 1 | No |
| BASIC | 40 | 3 | 5 | No |
| PRO | 160 | 6 | 15 | Yes |

Failed/cancelled image jobs do not consume allowance.

### Tools (remote names; stdio package prefixes with `studio_`)

**Account** — `get_account`, `get_image_status`  
**Media** — `upload_media` `{ imageBase64 }`, `list_media`, `get_media`, `trash_media`  
**Image** — `generate_image`, `edit_image`, `list_images`, `get_image_job`, `cancel_image_job`, `retry_image_job`, `describe_image`, `publish_image`, `batch_generate_images`  
**Prompt** — `compile_prompt`, `analyze_image_to_prompt`, `get_vision_job`  
**Brand** — `list_brand_kits`, `get_brand_kit`, `extract_brand_kit`, `refine_brand_kit`, `brand_showcase`  
**Series** — `list_series`, `create_series`, `series_next`, `series_extend`  
**Workflows** — `list_workflows`, `create_workflow`, `run_workflow`

### Workflows

**Generate:** get_account → optional upload_media → generate_image → poll get_image_job → return outputUrl  
**Edit:** upload_media → edit_image → poll  
**Brand:** extract_brand_kit with imagesBase64 → use kit id as brandKitId  

### Safety

- Preserve `STORYKIT_API_KEY`. Never invent keys or ownerIds.
- Do not put the key in git or public chat.
- Never claim success without a SUCCEEDED job.

## REST

- `GET /api/v1/studio-connect` — discovery  
- `POST /api/v1/studio-connect/key` `{ email, name?, label? }` — mint (auto FREE signup)  
- `GET /api/v1/studio-connect/prompt` — LLM template  
- Page: https://asset.storykit.space/ai
