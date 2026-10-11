---
name: start
description: "Run /start to see where every feature stands and what comes next. It reads the status the other skills leave in docs/ (each feature's README.md, screens.md, and spec status, the routing section of meeting minutes, docs/scope.md), proposes the next skill, and runs it once you confirm. Say what you are doing today (a recording, meeting minutes, an idea, a bug, a feature) or give nothing for the board. Read only."
allowed-tools: Read, Glob, Grep, AskUserQuestion, Skill
argument-hint: [what you are doing today | file | feature slug]
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

The single entry point. It reads the files every skill keeps current, tells you where each feature stands, and proposes the next step, one recommended. Once you confirm, it runs that skill. The other skills stay callable directly; `start` only saves you from remembering which one comes next.

## Reads / Writes

| | Path |
|---|---|
| Reads | `docs/features/*/README.md` and `screens.md` (status and updated date); `docs/features/*/specs/` (the `**Status**:` line of each spec; an umbrella: its `index.md`); `docs/meetings/*/minutes.md` (the routing section after `<!-- routing: /discovery -->`, or its absence); `docs/scope.md` (each row's status and its next unticked box); the root `AGENTS.md` / `CLAUDE.md`; `.mcp.json` (the `codegraph` servers and the folder each serves) |
| Writes | nothing |

Never writes a file: the state already lives in the files above, and a copy of it would drift. Every write happens in the skill it runs.

## Asks vs acts

Acts: reads, builds the board. Asks once: which step to run now, with the options from step 2. Then it runs the picked skill, which asks its own questions.

## Steps

0. **Read the state.** Glob the paths in Reads. Status values are fixed English tokens even when the documents are in another language (`Status: open-points`); the updated date is the date line under the title. No `docs/` at all → a new project: recommend `/scope` (a new product) or `/discovery "<idea>"` (one feature), skip to step 2.
1. **Next step per item.** One row per feature, routed topic, and unrouted meeting:

   | Found | Where it stands | Next | Group |
   |---|---|---|---|
   | minutes with no routing section | meeting not routed | `/discovery <minutes.md>` | now |
   | ... its folder date on or after the updated date of a `waiting-validation` `screens.md` | maybe its validation meeting | ask: `/design <slug> <minutes.md>` or `/discovery <minutes.md>` | now |
   | routing row `pending`, slug with no feature folder | topic routed, feature not started | `/discovery <minutes.md>` (it picks the feature) | not started |
   | feature `drafting` | discovery under way | `/discovery <slug>` | now |
   | feature `waiting-answers` | questionnaire out | answers from the people in its README, then `/discovery <slug>` | waiting |
   | feature `open-points`, no `screens.md` | rules with open points | `/discovery <slug>` (next round), or `/design <slug>` (validate draft for a meeting on the open points) | now |
   | feature `settled`, no `screens.md` | rules settled | `/design <slug>` | now |
   | `screens.md` `drafting` | design under way | `/design <slug>` | now |
   | `screens.md` `waiting-validation` | screens drawn for product | validation meeting, then `/transcribe <recording>` and `/design <slug> <minutes.md>` | waiting |
   | `screens.md` `waiting-rules` | validation changed rules | `/discovery <minutes.md>` of that meeting; `/design <slug>` once the new rules version exists | now |
   | `screens.md` `validated` | validated | `/design <slug>` (final) | now |
   | `screens.md` `done` | screens final | `/architect <slug>` | now |
   | spec `Proposed` | decided, not built | `/develop <slug>` | now |
   | spec `In Progress` | building or checking | the next unticked box of its scope row (`/develop`, `/check verify`, `/test`, `/check review`, `/document`, `/sync`) | now |
   | spec `Assumed` | built on a decision nobody deliberated | Heads up: `/architect <slug>` to ratify; never blocks the row | heads up |
   | scope row `done` | shipped | left off the board | none |
   | scope row `planned`, no feature folder | planned, not started | its entry command from the scope row | not started |
   | feature folder with `specs/` but no `README.md` | technical feature (no discovery) | its row comes from the spec status above | by status |

   The furthest stage decides the row: a spec over `screens.md` over the feature `README.md` (discovery, then design, then architect). Open points (`P-n`) in a feature whose row is `waiting-validation` → add to its Waiting line that the validation meeting can settle them too. A step that falls outside this table: name it plainly, never guess. Code in the repo and no root `AGENTS.md` → a heads up recommending `/audit`. A `codegraph` server in `.mcp.json` whose folder (its `--path`, else the root) has no `.codegraph/codegraph.db` → a heads up: that code repo has no index on this machine, run `codegraph init -i <folder>` (or `/audit`), then restart the session.
2. **Read today's input** and match it to a step:
   - a recording (video or audio) → `/transcribe <file>`;
   - a `minutes.md` or `transcript.md` → its row from step 1;
   - a feature slug → its row from step 1;
   - a bug or an error → `/debug`;
   - an idea in a sentence → `/discovery "<idea>"`; several features or a new product → `/scope`;
   - nothing → no match; the board decides.
3. **Board and question.** Show the board (Report, below). Ask what to run now: the step that matches today's input recommended; with no input, the first unfinished feature in `docs/scope.md`, else the `now` row updated most recently (keep the thread). Up to 3 more rows you can act on as the other options: `now` first, then `not started` (one option for all the topics of one meeting, since `/discovery` asks which). A row waiting on someone else is never an option.
4. **Run.** Invoke the picked skill with its argument (on Claude Code the `Skill` tool; elsewhere read `skills/<name>/SKILL.md` and follow it). A skill not installed (not in the agent's skill list) → say which skill and what it would do, and stop: never do its job inline.

## Report

The board, before the question in step 3:

```
## /start · <project>

**Now**
| Feature | Where it stands | Next |
|---|---|---|
| <slug or meeting> | <status in words, updated date> | `<command>` |

**Waiting**: <slug>: <what for, from whom> · …
**Not started**: <slug> (from <meeting>) · …
Heads up: <only when there is one: no AGENTS.md, a code repo with no CodeGraph index (`codegraph init -i <folder>`), an `Assumed` spec to ratify (`/architect <slug>`), a next skill not installed>
```

An empty group is left out. Commands of skills not installed carry `(not installed)`.
