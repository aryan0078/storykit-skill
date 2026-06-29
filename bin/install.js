#!/usr/bin/env node
/**
 * Installer for the StoryKit assets agent skill — Created with love by Story Kit.
 *
 * Copies SKILL.md into a skills directory the agent can discover. Defaults to
 * `.claude/skills/storykit-assets/` (Claude Code); override with `--dir <path>`.
 *
 *   npx storykit-assets-skill install
 *   npx storykit-assets-skill install --dir ./skills
 */
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'
import { mkdirSync, copyFileSync, existsSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = resolve(__dirname, '..', 'SKILL.md')

const args = process.argv.slice(2)
const dirFlag = args.indexOf('--dir')
const targetDir = dirFlag !== -1 && args[dirFlag + 1]
  ? resolve(args[dirFlag + 1])
  : resolve('.claude', 'skills', 'storykit-assets')

if (!existsSync(src)) {
  console.error('Could not find SKILL.md in the package. Reinstall storykit-assets-skill.')
  process.exit(1)
}

mkdirSync(targetDir, { recursive: true })
const dest = join(targetDir, 'SKILL.md')
copyFileSync(src, dest)

console.log(`✓ StoryKit assets skill installed → ${dest}`)
console.log('  Restart your agent / reload skills, then ask it to "add a StoryKit chart".')
console.log('  Created with love by Story Kit.')
