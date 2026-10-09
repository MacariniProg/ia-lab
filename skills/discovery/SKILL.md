---
name: discovery
description: "Run /discovery to turn a meeting (minutes, transcript, or recording) or a new idea into settled business rules in docs/features/<slug>/: understanding, a questionnaire for product, answers analysis, and versioned business rules (RN-n) with open points (P-n). Run it again to resume or start the next round, until nothing is open. Business rules only, no code; /architect decides how to build."
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion, Agent, WebSearch, WebFetch, Artifact, ArtifactData
argument-hint: [minutes.md | transcript.md | recording | feature slug | "idea in a sentence"]
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

Turns what was said in a meeting, or a new idea, into business rules product agrees with: what the feature does, for whom, under which rules, and what is still open. It asks product what the team cannot answer alone, reads the answers, and writes a numbered version of the business rules. It never decides how to build: tasks, data models, and delivery phases belong to `/architect`.

## Reads / Writes

| | Path |
|---|---|
| Reads | `docs/meetings/<date-topic>/minutes.md` and `transcript.md`; `docs/meetings/glossary.md`; `docs/scope.md`; other `docs/features/*/business-rules/v*.md` (rules already settled, questions already asked); `AGENTS.md` / `README.md`; the code, read only, to know what exists |
| Writes | the routing section of a meeting's `minutes.md` (only that section); `docs/features/<slug>/`: `README.md`, `understanding.md`, `research.md`, `product-analysis.md`; per round in `rounds/<n>/`: `questionnaire.md` + `.html`, `answers.raw.md` (existing sections never edited), `analysis.md`; `business-rules/v<n>.md` |

Never writes code, specs, or `docs/scope.md`: a new feature (from meeting routing or idea mode) that has no row in an existing `docs/scope.md` is named in the report Heads up, with `/scope <slug>` to enroll it. A product sized idea goes to `/scope` first.

Business rules are `RN-n` (Regra de Negócio), open points `P-n` (Pendência), hypotheses `H-n` (Hipótese). Numbers never change once written; a dropped rule stays, marked `dropped`.

## Asks vs acts

Acts: reads, explores, drafts every file. Asks:

- step 0, meeting input: the routing table (which feature each topic goes to), then which routed feature to work on now;
- step 0, in one round: which feature (new slug or an existing one) and the depth;
- idea mode: the interview (`modes/idea.md`);
- step 4: who answers the questionnaire, their language, the deadline; then before publishing it;
- step 5: when an answer contradicts a settled rule (keep, change, or ask again).

## Steps

Every step that writes a file adds its row to the `Files` table in `README.md` and sets the updated date, in the same step.

0. **Resolve input and state.** Read `docs/features/*/README.md` (status lines).
   - Recording (video, audio) → run `/transcribe` on it (or follow its `SKILL.md`), then continue with its `minutes.md`.
   - `minutes.md` or `transcript.md` → meeting mode. **Route first**: a meeting often covers several features, so every topic must land somewhere before any feature is worked on.
     - No routing section in `minutes.md` (the heading right after the `<!-- routing: /discovery -->` marker) → propose one row per topic: this feature, an existing feature (`<slug>`), a new feature (proposed `<slug>`), or not a feature. A topic that touches two features gets both. A rule that belongs to another feature goes there, even when it came up while discussing this one (a cross cutting decision is a feature of its own, so its rules have one home). Show the table, ask for corrections, then append it to `minutes.md` in the docs language:
       ```
       ## <Routing>
       <!-- routing: /discovery -->
       | Topic | Goes to | Status |
       |---|---|---|
       | <n. topic> | `<slug>` (new) · not a feature | pending · done: <slug> business rules v<n> · — |
       ```
     - Then ask which `pending` feature to work on now (recommended: the one with the most topics). The others stay `pending`; running `/discovery <minutes.md>` again picks the next one.
     - The picked feature reads only the topics routed to it. An existing feature with `waiting-answers` or `open-points` → this meeting is its next answers source: go to step 5. A new slug → continue below.
     - When the feature's step that used the meeting ends, set its rows to `done: <slug> <file written>`.
   - A feature slug → resume from its `README.md` status: `drafting` → the first step whose file is missing; `waiting-answers` → step 5; `open-points` → step 4, next round, asking only the open `P-n`, unless the user brings answers to an analysed round (a late respondent) → step 5 on that round; `settled` → say so, recommend `/architect <slug>`.
   - A sentence → idea mode. Several features or a new product → recommend `/scope`, stop.
   - Nothing → ask what it is about.
   For a new feature, ask in one round: **slug** (proposed from the content, recommended) or an existing feature it extends; **depth**: `light` (understanding, questionnaire, business rules) for a change to something that exists with few unknowns; `full` (adds research and product analysis) for a new area, an outside standard or regulation, competitors, or several roles. Create the folder and `README.md` (`templates/readme.md`, status `drafting`).
1. **Understanding.** Read the mode file (`modes/meeting.md` or `modes/idea.md`) and follow it. Done when `understanding.md` exists, every claim cites its source, and its "Questions for product" list is not empty (empty → go to step 6).
2. **Research** (`full` only). Read `templates/research.md`. Investigate what the understanding cannot answer from inside: outside standards, regulation, how other products solve it. Primary sources only, every claim with its link, `(not verified)` when there is none. Run it as a background subagent when the agent can, and draft step 3 meanwhile. When it lands, read its "so what" lines against the draft: add new questions for product to `understanding.md` and new hypotheses to `product-analysis.md`. Done when every research question in the understanding has an answer or `not found`.
3. **Product analysis** (`full` only). Read `templates/product-analysis.md`. The flow as it is, what breaks, opportunities, the proposed flow, hypotheses `H-n` the questionnaire will confirm or reject. Done when every hypothesis maps to at least one question.
4. **Questionnaire, round `<n>`.** Ask in one round: who answers (names and roles), their language, the deadline. Read `templates/questionnaire.md` and write `rounds/<n>/questionnaire.md`. Round 1 asks the understanding's questions and the hypotheses; later rounds ask only the open `P-n` of the latest business rules version. Then read `templates/questionnaire.html`, fill its data block from the Markdown, and save `rounds/<n>/questionnaire.html`. Show the questionnaire and ask before publishing: publish as an Artifact (recommended when the agent can publish one) with capabilities `{db: {rules: [{path: "answers", read: "view", write: "owner"}, {path: "answers/{self}", write: "interact"}]}, user: {}, downloads: true}`, or hand over the Markdown to send as it is. Respondents need edit access to the Artifact (Contributor) to save; say so. Record the link in `README.md`, status `waiting-answers`. Report and stop.
5. **Answers, round `<n>`.** Collect the answers: from the Artifact database (`ArtifactData` `list` of `answers`), from text the user pastes or files they point to, or from a meeting's minutes (`/discovery <minutes.md>`). Write them verbatim to `rounds/<n>/answers.raw.md`, one section per person, never edited after. A late respondent on a round already analysed reopens it: append their section to that round's `answers.raw.md`, then rewrite its `analysis.md`. Read `templates/analysis.md` and write `rounds/<n>/analysis.md`: what changed in the understanding, each hypothesis confirmed or rejected, consensus that becomes a rule, disagreements and gaps that become open points, new requirements nobody asked for, what the code says about the answers. An answer that contradicts a rule settled in another feature → ask (keep the rule, change it, or ask again).
6. **Business rules, next version.** Read `templates/business-rules.md` and write `business-rules/v<n>.md`, `<n>` = the last version + 1 (a reopened round makes a new version too, and so does routing that moves a rule to the feature that owns it; earlier versions stay as they are). Every rule cites its source (meeting time, question and person, or code path). A rule that depends on an open point is written with the proposed answer and marked `(P-n)`. Update `README.md`: status `settled` when no `P-n` is open, else `open-points`.
7. **Report** (below). Steps 4 to 6 repeat once per round until nothing is open.

## Report

```
## /discovery · <slug> · <status>

**<one line: e.g. business rules v1 written: 24 rules, 3 open points>.** Files in docs/features/<slug>/.
Next: <by status: waiting-answers → share <link> with <names>, then /discovery <slug> | open-points → a meeting on P-1..P-n then /discovery <minutes.md>, or /discovery <slug> for a questionnaire round | settled → /design <slug>, then /architect <slug>>
Heads up: <only when there is one: a rule contradicts another feature, someone did not answer, meeting topics still pending → /discovery <minutes.md>, a feature with no row in an existing `docs/scope.md` → /scope <slug> to enroll it>
```

## Reference files

- `modes/meeting.md`: read when the input is minutes or a transcript, after routing.
- `modes/idea.md`: read when the input is an idea with no meeting.
- `templates/readme.md`: read when creating or updating the feature `README.md`.
- `templates/understanding.md`: read when writing `understanding.md`.
- `templates/research.md`: read when writing `research.md`.
- `templates/product-analysis.md`: read when writing `product-analysis.md`.
- `templates/questionnaire.md`: read when writing a questionnaire.
- `templates/questionnaire.html`: read when turning a questionnaire into its Artifact page.
- `templates/analysis.md`: read when analysing answers.
- `templates/business-rules.md`: read when writing a business rules version.
