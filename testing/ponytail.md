# Ponytail

Applied: `/audit` declares the [Ponytail](https://github.com/DietrichGebert/ponytail) plugin in the project's `.claude/settings.json` (`extraKnownMarketplaces` plus `enabledPlugins`), installed and on by default. No copy in `AGENTS.md` or the skills; agents other than Claude Code run without it.

## Checks

1. **`/audit` writes it.** On a project whose `.claude/settings.json` has other keys and no Ponytail, run `/audit`. Passes when both keys are added and every other key is untouched; a second run adds nothing.
2. **Fresh clone offers it.** On a machine (or user account) without Ponytail at user scope, clone the project and open it in Claude Code. Passes when Claude Code asks to install the plugin and, once accepted, the session starts with `PONYTAIL MODE ACTIVE`. Fails → find what else Claude Code needs (a trust prompt, `/plugin`) and write that step into `/audit`'s report.
