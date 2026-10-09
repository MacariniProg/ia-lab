---
name: design
description: "Run /design <feature> to turn a feature's business rules into screens: an inventory of screens and states in docs/features/<slug>/screens.md, approved first, then drawn in the design tool through its skill (Penpot today). Mode validate draws the happy path for a screen validation meeting with product; run /design <feature> <minutes.md> after that meeting to sort its decisions; mode final draws every state and edge case. Screens only, no code."
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion, Agent
argument-hint: <feature slug> [validation minutes.md] [validate | final]
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


## What it does

Puts on screen what discovery settled. It lists the screens and states the business rules imply, gets that list approved, then has the design tool's skill draw it. Mode `validate` is a draft for product to react to in a screen validation meeting; mode `final` is the complete design development builds from. It never changes a business rule: a rule change found along the way goes back to `/discovery`.

## Reads / Writes

| | Path |
|---|---|
| Reads | `docs/features/<slug>/README.md` and the latest `business-rules/v<n>.md`; `screens.md` (its status); validation meeting minutes (`docs/meetings/<date-topic>/minutes.md`); `docs/design/README.md` and `components.md`; final mode: the code, read only, for screens that already exist |
| Writes | `docs/features/<slug>/screens.md`; its row in the feature `README.md` Files table; screens in the design tool, through its skill |

Never writes code, business rules, or the design system library.

## Asks vs acts

Acts: reads, drafts the inventory, draws, checks. Asks: the mode when step 0 cannot tell; approval of the inventory before anything is drawn (step 1); the classification of the validation meeting's points (step 4); creating a design file (the tool skill asks).

## Steps

Every step that writes `screens.md` sets its status and updated date, and keeps its row in the feature `README.md` Files table current.

0. **Resolve.** Read the feature `README.md`, the latest business rules version, and `screens.md` if it exists. No `docs/design/README.md` → run the tool skill's setup first (`/penpot setup`).
   - Minutes given → step 4.
   - No `screens.md` → mode `validate` (recommended) or `final` when product already validated the flow elsewhere; ask. When a design file for this feature already exists (the files table in `docs/design/README.md`, or the tool skill's file list), also ask: **adopt** it (recommended when it covers the journey: step 2 maps instead of drawing) or draw anew.
   - `drafting` → resume its mode at the first unfinished step.
   - `waiting-validation` → ask for the validation meeting: its minutes (step 4), or the recording (`/transcribe` first).
   - `waiting-rules` → a business rules version newer than the one `screens.md` used → mode `validate` again when the change touches the flow (recommended), else `final`; no newer version → say `/discovery <minutes.md>` is pending, stop.
   - `validated` → mode `final`.
   - `done` → say so, recommend `/architect <slug>`; a change request → mode `final` with the current screens as input.
   Business rules with open points (`P-n`) are fine for `validate` (the drawing shows the provisional rule); `final` with open points → warn and ask whether to go on.
1. **Inventory.** Read the mode file (`modes/validate.md` or `modes/final.md`) and `templates/screens.md`, and write `screens.md` with status `drafting`. Show the screens table (and in `final`, the state matrix and edge cases) and ask for approval; apply changes and ask again until approved. Done when every journey step that needs a screen has one, and every row cites its rules.
2. **Draw.** Read the tool skill named in `docs/design/README.md` (Penpot: the `penpot` skill, mode `draw`) and follow it with the approved inventory. Done when the tool skill hands back the file link and the frame ids, with its own checks passed.
   **Adopt** instead, for a file drawn outside this skill: list its frames through the tool skill (Penpot: `files.mjs frames <fileId>`, read only) and map them to the inventory by name and content. A matched row gets its frame; a frame that shows another feature's screen goes to the context table; whatever does not match the rules (a row with no frame, a frame the rules make obsolete, a name or behavior that contradicts a rule) goes to the Differences section with what to do. The file is not changed; fixes wait for the next drawing.
3. **Record.** Fill the page / frame column and the file link in `screens.md`. Status: `waiting-validation` after `validate`, `done` after `final` (an adopted file the same way, by the mode it was adopted in).
4. **Validation meeting.** Read the minutes. For each point about this feature's screens decide, and confirm the list with the user in one round:
   - **screen decision** (layout, order, what is shown, wording) → the Decisions section of `screens.md` as `D-n`, with the minutes time; the next drawing applies it;
   - **rule change**, of this feature or another → the Rule changes section, with the minutes time; never applied here;
   - **not about screens** → skip (discovery's routing handles it).
   Status: any rule change → `waiting-rules`; else `validated`.
5. **Report** (below).

## Report

```
## /design · <slug> · <mode> · <status>

**<one line: e.g. 6 screens in 4 flows drawn for validation, 3 points for the meeting>.** <design file link>
Next: <waiting-validation → validation meeting with product, then /transcribe <recording> and /design <slug> <minutes.md> | waiting-rules → /discovery <minutes.md>, then /design <slug> | validated → /design <slug> (final) | done → /architect <slug>>
Heads up: <only when there is one: open points drawn with a provisional rule, pieces missing from the design system>
```

## Reference files

- `modes/validate.md`: read when building the inventory for a validation draft.
- `modes/final.md`: read when building the complete inventory: states, permissions, edge cases.
- `templates/screens.md`: read when writing `screens.md`.
- `references/states.md`: read in final mode, for the states each data source and action needs.
