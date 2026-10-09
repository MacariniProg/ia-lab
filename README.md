# AI Lab

AI study project. Intentionally minimal Next.js base: the focus isn't the app, it's the AI ecosystem built around it.

## Goal

Learn by doing, adding things gradually:

- **Skills** (`.claude/skills/`): reusable instructions Claude loads on demand
- **Agents** (`.claude/agents/`): subagents with their own role, tools, and prompt
- **Hooks, commands, MCP**: as I study them
- **AI features in the app**: chat, tool calling, etc., when it makes sense

## Rules

- Start minimal. Only add something when studying it.
- Every new piece (skill, agent, feature) must have a clear learning purpose.
- Code, comments, commits, skill sources, and this repo's plan (`docs/ecosystem.md`) are in English. Documents the skills generate (`docs/meetings/`, `docs/features/`) follow `Docs language:` in `CLAUDE.md`.

## References

- [jsmastery-pro/skills](https://github.com/jsmastery-pro/skills) (MIT, checked at `43b69e4`, 2026-08-07): phase based engineering workflow skills (`scope`, `audit`, `architect`, `develop`, `check`, `test`, `document`, `sync`, `debug`). Adapted into `skills/` on 2026-10-09 (folders moved into this repo's skeleton, connected to `discovery`, `design` and `start`; a `LICENSE` copy in each), plus their `scout` and `researcher` subagents in `.claude/agents/`. See [docs/ecosystem.md](docs/ecosystem.md) for what changed and the open questions.
- [JohnnyVizz/claude-kit `savvy-progress`](https://github.com/JohnnyVizz/claude-kit/tree/main/plugins/savvy-progress) (MIT, checked at `272a877`, 2026-10-09): Claude Code mod (function hooks plugin) with a progress bar above the prompt and a live subagents panel (model, effort, steps, context, estimated cost). Adds MCP (Model Context Protocol) tools `progress` and `step` so an orchestrator and its workers report progress. Reference for hooks and for showing multi agent skill progress. **Testing.**
- [hellosverre/claude-skins](https://github.com/hellosverre/claude-skins) (MIT, checked at `0975ade`, 2026-10-09): Claude Code mod that redraws the transcript: themed tool rows, diff, table and code cards, a usage band, spinner words. `/skin` switches between seven skins; a `design` tool lets Claude build a new one. Reference for `ui.render` hooks. Installed from a local marketplace at `~/.claude/test-mods` with a patch (`~/.claude/patches/skins-local.patch`) that hides the weekly meter and swaps the band's Compact button for context tokens and session cost (`45.2k/1M tokens · $1.23`, from `$.session.usage()`). **Testing.**
- [data-goblin/claude-code-filetree](https://github.com/data-goblin/claude-code-filetree) (MIT, checked at `da1da65`, 2026-10-05): Claude Code mod with an IDE style file tree in the right sidebar (needs `/tui fullscreen` and Claude Code 2.1.287+). Git status per file, and highlights for what Claude reads (purple), writes (orange) and commits (green). Passes the selected file to Claude through a `prompt.submit` hook. Reference for panes and activity hooks. Local patch (`~/.claude/patches/filetree-mention.patch`, reapply after updates): alt+click on a row, or `@` with the row focused, inserts `@path` at the prompt cursor via `$.prompt.fill`. **Testing.**
- [karanb192/cache-tax](https://github.com/karanb192/cache-tax) (MIT, checked at `06cac47`, 2026-10-09): Claude Code mod that keeps the prompt cache warm during breaks (`/keepwarm 90m` sends a tool free `$.model.fork` ping every 50 idle minutes, which costs tokens) and, on a cold send in a context of 50k+ tokens, drops the message once and shows the estimated cache rewrite cost. `/cache-tax` shows the card. Reference for `$.clock`, `$.model.fork` and `prompt.submit` guards. Installed from the `karanb192/claude-code-mods` marketplace. **Testing.**
- [anthropics/claude-code-playground `blast-radius`](https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods/blast-radius) (Apache-2.0, checked at `569c528`, 2026-10-09): Claude Code mod that holds a risky Bash command (`rm -rf`, `git reset --hard`, `git clean`, `git push --force`, migrations) and opens a pane listing what it would change, with Proceed and Cancel buttons. Below about 144 columns it draws in the band above the prompt instead, which only one mod can hold (cache-tax also uses it). Reference for holding a `tool.call` and returning `{ deny }`. The marketplace is local only: installed from a sparse clone at `~/.claude/local-marketplaces/claude-code-playground` (update with `git pull` there). **Testing.**

## Run

```bash
npm install
npm run dev
```
