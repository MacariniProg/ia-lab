---
name: penpot
description: "Drive Penpot through its MCP (Model Context Protocol) server and REST API. Run /penpot setup once per project to read its design system library and write docs/design/; /design reads this skill's draw mode to build screens from the library's components and tokens. Use for any Penpot read or write: files, pages, frames, exports, audits."
allowed-tools: Bash, Read, Write, Edit, Glob, AskUserQuestion
argument-hint: [setup | draw]
---

<!-- HOUSE-RULES:START -->
## House rules

- **Language:** code, identifiers, comments, and commit messages are always in English. Every generated document, headings included, is in the project's docs language: the `Docs language:` line in the root `AGENTS.md` (or `CLAUDE.md`). When the line is missing, ask once (the language the user writes in, recommended; English) and add it there. Exceptions: `AGENTS.md` files are instructions for agents, always in English; a transcript stays in the meeting's language (it records what was said); a questionnaire is in the language of the people who answer it. Translate only when asked, into a sibling file (`<name>.<lang>.md`).
- **Style:** plain, simple words in everything a skill produces, files and messages alike. Talk to the reader as `you`, warm and direct like a colleague, and present every step as a recommendation they may run or skip, never an order. Keep technical terms that carry real meaning and explain each in plain words. Never use a dash as punctuation (no em dash, no en dash) and no hyphenated compounds: write `read only`, not `read-only`, or reword. A word the language itself spells with a hyphen keeps it; so do code, file paths, command flags, and values other skills match on (`open-points`, `RN-3`, frame names). Short sentences, commas, or parentheses.
- **Abbreviations:** spell out every abbreviation the first time it appears in a reply or file.
- **Questions:** 2 to 4 concrete options, exactly one marked recommended with a one line why. Use the agent's option picker when it has one (`AskUserQuestion` on Claude Code), else the same options as plain text.
- **State lives in files,** never only in the chat. Read a file again right before editing it; edit surgically.
- **Git per root:** resolve each workspace's git root (`git -C <workspace> rev-parse --show-toplevel`) and run git commands once per root.
- **Exploring code:** when `codegraph_*` tools are loaded (one CodeGraph server per code repo, listed on the `MCP servers:` line of `AGENTS.md`), use them first and inline (this replaces the `scout` offload a skill describes); Read only the lines you will cite or edit and the files an answer flags as stale. Without them, use a read only `scout` subagent or Grep and Read. A call that says no CodeGraph project is loaded means that code repo has no index on this machine: use the fallback for the session and tell the engineer to run `codegraph init -i <code repo>` (or `/audit`), then restart.
<!-- HOUSE-RULES:END -->


## What it does

Knows how to work in Penpot: connecting, running code in the open file, creating files, drawing with the design system's components and tokens, checking the result. It holds no project knowledge: what a project's design system has lives in that project's `docs/design/`, which `setup` writes. What to draw comes from `/design`.

## Reads / Writes

| | Path |
|---|---|
| Reads | `docs/design/README.md`, `components.md`, `shell.js`; the Penpot file open in the browser (MCP); Penpot files and projects (REST) |
| Writes | Penpot screen files (pages, frames); `docs/design/` (setup only) |

Never edits the design system library: a missing component or token is composed on the screen from existing pieces and reported, never created in a screen file.

## Asks vs acts

Acts: reads, runs code, draws, exports and looks, fixes. Asks: when the connection fails after the automatic attempts (`references/connection.md`); setup: which Penpot project and which library is the design system; before creating a Penpot file.

## Rules that never bend

- **Color only through tokens** (`S.fill`, `S.stroke`, `S.bind`), never a hex value. Exception: brand assets whose name starts with a `S.cfg.skip` prefix (default `logo`).
- **Text only with a library typography** (`S.txt`).
- **Reuse the library.** Instances of its components; layout boards (`S.box`) only to arrange them.
- **Edit only the open page.** Open it with `await S.go(name)` at the start of the call.
- **One agent, one connected tab.** There is one connection and one plugin state.
- **Small calls.** Each call stays under about 2 minutes (the server cuts at 120 s): one flow per call; a frame's states are clones of its base frame plus changes.
- **Look before saying done.** Export every frame and read the image.

## Steps

0. **Preflight.** `docs/design/README.md` missing → `setup` (unless the request is setup itself). Check the connection: `node <skill>/scripts/mcp.mjs -e "return [penpot.currentFile.name, penpot.currentPage.name]"`. It fails or names the wrong file → `references/connection.md`, in its order, before asking the user. First REST use in a project: `npm install` in `<skill>/scripts/`.
1. **Pick the mode.** `setup` → `modes/setup.md`. Drawing (called by `/design`, or a direct request to draw or change screens) → `modes/draw.md`. A read only question about a file (pages, components, what a frame contains) → answer it with `files.mjs frames` (no tab needed) or `mcp.mjs -e`, no mode.
2. **Report** (below).

## Report

```
## /penpot · <mode> · <file>

**<one line: e.g. 14 frames in 5 flows, audit clean>.** <Penpot file URL>
Next: <setup → /design <slug> | draw → back to /design>
Heads up: <only when there is one: pieces missing from the library, frames that failed to export>
```

## Reference files

- `modes/setup.md`: read when writing a project's `docs/design/`.
- `modes/draw.md`: read when building or changing screens.
- `references/connection.md`: read when the connection check fails, or to set up the MCP server or the REST token.
- `references/pitfalls.md`: read before writing drawing code, and whenever a call behaves oddly.
- `references/flow-pages.md`: read when organizing a page (legend, flows, frame names).
- `scripts/mcp.mjs`: runs code in the open file with `helpers.js` and the project's `shell.js` prepended; `--export <id> <png>` exports a frame.
- `scripts/helpers.js`: the `S` helpers; each one names the pitfall it avoids.
- `scripts/files.mjs`: REST: `projects`, `list`, `new` (file linked to the library, tokens copied), `sync-tokens`, `frames` (a file's screen frames per page, read only; used to adopt a file drawn by hand).
- `scripts/survey.js`: read only survey of the open file and its libraries (setup).
