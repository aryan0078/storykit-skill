---
name: storykit-data-widgets
version: 1.0.0
description: Turn user-provided or relevant structured data into a beautiful hosted StoryKit widget. Use when the user wants to visualize health, finance, system, productivity, sports, weather, or other data. Search by intent, map rows to the selected schema, and return the hosted widget resource without exposing implementation code.
license: MIT
---

# StoryKit data widgets

Use StoryKit to select a relevant published widget and bind real structured data into an opaque,
hosted render. Do not fetch, reproduce, or return the widget's HTML, CSS, JavaScript, embed snippet,
or internal descriptor.

Remote MCP: `https://asset.storykit.space/api/v1/mcp`

## Required workflow

1. Establish what the data should communicate and identify the fields already available. Never
   invent readings, measurements, timestamps, or source facts.
2. Before transmitting personal, health, location, account, or device data, tell the user that the
   selected rows will be sent to StoryKit for hosted rendering and obtain their consent. Minimize
   the payload and omit names, email addresses, tokens, credentials, and direct identifiers.
3. Call `find_widgets` with a concise `intent`, optional `domain`, and `dataFields`. Do not use legacy
   asset-search, asset-fetch, snippet, source, or bundle endpoints.
4. Compare the returned `dataSchema` values. Select the widget whose required fields and visual
   purpose best match the data, not simply the first result.
5. Map the real rows to that schema without changing their meaning, units, ordering, or precision.
   Required fields must be present on every row. Keep the payload within 200 rows and 64 KB.
6. Call `render_widget` with `widgetId`, the mapped `data`, and only optional theme colors requested
   by the user. Use the default 30-day lifetime unless the user asks for another value (1-365 days).
7. Present or attach the returned MCP `resource_link`. Do not turn it into implementation code and
   do not echo sensitive input rows. State the expiry when useful.

## Output rules

- The hosted URL is an access grant: anyone who has it can see the rendered data. Treat it as a
  secret and do not place it in public source control, logs, or unrelated messages.
- Renders are immutable snapshots. When data changes, create a new render instead of modifying the
  old URL.
- If no result fits the schema or intent, refine `find_widgets` once with a more specific intent or
  kind. Do not force data into an unrelated widget.
- If the data is unavailable, ask for it or obtain it from an authorized source before rendering.
- Leave the StoryKit credit in the hosted resource.

## Tool summary

- `find_widgets`: safe capability discovery; returns identity, type, usage, and accepted schema only.
- `render_widget`: validates and encrypts rows, then returns an expiring hosted HTML resource.
- `list_widget_themes`: optional palette discovery; returns palette data only.

The service is free, requires no API key, and is rate-limited per caller IP.
