---
name: check
allowed-tools: Bash, Read, Grep, Glob, Write, Agent
argument-hint: [verify | review]
description: "Confirm a change before merge. `/check verify` drives the real app to prove behavior against the spec (every acceptance criterion met, every surface built). `/check review` runs a senior code review on a fresh model, one that did not write the code. Verify after /develop, review before a PR. Writes to docs/reviews/, never edits code."
---

<!-- HOUSE-RULES:START -->
## House rules

- **Language:** code, identifiers, comments, and commit messages are always in English. Every generated document, headings included, is in the project's docs language: the `Docs language:` line in the root `AGENTS.md` (or `CLAUDE.md`). When the line is missing, ask once (the language the user writes in, recommended; English) and add it there. Exceptions: `AGENTS.md` files are instructions for agents, always in English; a transcript stays in the meeting's language (it records what was said); a questionnaire is in the language of the people who answer it. Translate only when asked, into a sibling file (`<name>.<lang>.md`).
- **Style:** plain, simple words in everything a skill produces, files and messages alike. Talk to the reader as `you`, warm and direct like a colleague, and present every step as a recommendation they may run or skip, never an order. Keep technical terms that carry real meaning and explain each in plain words. Never use a dash as punctuation (no em dash, no en dash) and no hyphenated compounds: write `read only`, not `read-only`, or reword. A word the language itself spells with a hyphen keeps it; so do code, file paths, command flags, and values other skills match on (`open-points`, `RN-3`, frame names). Short sentences, commas, or parentheses.
- **Abbreviations:** spell out every abbreviation the first time it appears in a reply or file.
- **Questions:** 2 to 4 concrete options, exactly one marked recommended with a one line why. Use the agent's option picker when it has one (`AskUserQuestion` on Claude Code), else the same options as plain text.
- **State lives in files,** never only in the chat. Read a file again right before editing it; edit surgically.
- **Git per root:** resolve each workspace's git root (`git -C <workspace> rev-parse --show-toplevel`) and run git commands once per root.
<!-- HOUSE-RULES:END -->


## What this skill does

`/check` is the gate before merge. Two modes, separate jobs, usually both, verify first:

- **`verify`** (runtime proof): run the real app and watch the change behave. Proves it works and conforms to the spec (every acceptance criterion met, every specced surface built), which green tests never reveal. Read only on code, no durable files, main thread. Typically after `/develop`.
- **`review`** (fresh model code review): a senior read of the diff on a **different model than wrote the code** (a model reviewing its own output shares its blind spots). Writes findings ranked by severity to `docs/reviews/`. Read only. Typically before a PR.

Neither mode edits code. `verify` points failures at `/debug` or `/develop`; `review` reports findings to fix.

## Pick the mode (route before doing anything else)

First step, before reading any mode file or touching the repo. Look at what followed `/check`:

- **Starts with `verify` (or `run`)** → read `modes/verify.md`, follow it fully. Pass remaining arguments (feature name, scope) through.
- **Starts with `review`** → read `modes/review.md`, follow it fully. Pass the steering through unchanged (e.g. `/check review with opus`, `/check review uncommitted`).
- **No mode word, or ambiguous** (bare `/check`, or a feature name with no mode like `/check auth`) → do NOT guess, do NOT default. Show the two options as a plain text panel and **stop and wait** for the engineer's choice.

**How to present the choice (plain text, works on every agent, no interactive modal):**

Print exactly this, then stop and wait. Do not assume `verify` until they answer. Route on their typed word (`verify` / `review` / `both`).

```
Which check do you want to run? Type one:
  • verify  run the real app and prove the change works against its spec (usually right after /develop)
  • review  a fresh model senior read of the diff, ranked findings (usually right before a PR)
  • both    verify first, then review
```

No interactive picker or modal: a typed choice shown inline behaves the same in every AI tool. (The `argument-hint` frontmatter also surfaces `verify | review` in Claude Code autocomplete; other tools ignore it, which is why this inline panel is the portable path.)

If a feature name came with no mode (`/check auth`), carry it as the target once they pick; still ask the mode.

Do not mix modes in one run. On **both**, do `verify` first, then offer `review` next.

## Portability (any OS, any agent)

Any Agent Skills client on macOS, Linux, or Windows. `git` is the only required CLI. Other shell snippets are POSIX reference, not literal scripts: use your agent's own cross platform file, process, and browser tools. Each mode file adds its own portability notes. No subagent support falls back to inline, noted per mode.

Bundled files: `modes/verify.md`, `modes/review.md`, plus `references/review-agent-prompt.md` and `references/review-guide.md` for review. Read only the mode file you routed to; resolve the review bundled files to absolute paths when spawning the reviewer.
