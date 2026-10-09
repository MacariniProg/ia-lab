# Force Ponytail in every project

**Decide:** how a project that uses these skills always runs with Ponytail, not only on this machine.

## Context

- [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) v4.9.0 (commit `356918e`) is a Claude Code plugin with "lazy senior developer" rules, installed 2026-09-14 at user scope (`~/.claude/settings.json`). It runs in every project on this machine; this repo's `.claude/settings.json` does not mention it.
- Three hooks, no manual step: `SessionStart` injects the rules, `SubagentStart` injects them into every subagent, `UserPromptSubmit` tracks mode switches. Mode `full` by default; `/ponytail lite|full|ultra`; off with "stop ponytail".
- It governs code, not the skills' prose or the documents they write. No skill names it or depends on it, and it does not travel with `skills/<name>/`: another person or another agent (Codex) never gets it.

## Questions

1. **Mechanism.** Options:
   - *Proposal:* project `.claude/settings.json` declares the plugin (`extraKnownMarketplaces` + `enabledPlugins`), so anyone opening the project in Claude Code is asked to install it.
   - Copy the core rules into the project's `AGENTS.md`, so any agent reads them. Drifts from upstream.
   - Both: the plugin for Claude Code, a short pointer in `AGENTS.md` for other agents.
2. **Who writes it.** `/audit` when it writes `AGENTS.md`, or the install step from [new-project-setup.md](new-project-setup.md).
3. **Skills that write code.** Should `develop`, `debug`, and `test` say "smallest complete change" themselves, so the rule holds without the plugin?
4. **Mode can be switched off.** "stop ponytail" ends it for the session. Decide whether forcing means "installed and on by default" or something stricter.

## Done when

A fresh clone of a project opened on another machine runs with Ponytail on, and the chosen fallback covers agents other than Claude Code.
