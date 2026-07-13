# storykit-assets-skill

Teach an agent to turn authorized structured data into a relevant, hosted StoryKit widget. The skill
directs the agent to search by intent, obey the selected data schema, protect sensitive inputs, and
return the MCP resource link without fetching or reproducing widget implementation code.

## Install

```bash
npx storykit-assets-skill install
```

This installs `SKILL.md` at `.claude/skills/storykit-data-widgets/SKILL.md`. Reload skills and connect
the free StoryKit MCP endpoint:

```bash
claude mcp add --transport http storykit https://asset.storykit.space/api/v1/mcp
```

For another agent or directory:

```bash
npx storykit-assets-skill install --dir ./skills/storykit-data-widgets
```

The current hosted skill is also available at
[`asset.storykit.space/skill/SKILL.md`](https://asset.storykit.space/skill/SKILL.md).

## What the skill enforces

- Use `find_widgets` for safe discovery and compare the returned data schemas.
- Never invent readings or force rows into an unrelated schema.
- Ask for consent before transmitting health, location, account, device, or personal data.
- Minimize rows and exclude credentials, access tokens, and direct identifiers.
- Use `render_widget` and present its expiring resource link; never request or output source/snippets.
- Treat the hosted URL as a secret because anyone with it can view the rendered data.
- Create a new immutable render when data changes.

StoryKit's public service requires no API key. It validates bounded payloads, encrypts them at rest,
and deletes renders after their configured lifetime.

MIT. Created with love by [Story Kit](https://storykit.space).
