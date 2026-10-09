# Ecosystem plan

This file is ia-lab's own plan for building the skills. It never goes to other projects: they receive only `skills/<name>/` folders (open question 1).

Status: building. `transcribe` and `discovery` written and tested; `penpot` and `design` written and tested without drawing; `start` written and tested on this repo; the 9 jsmastery skills adapted and connected, not tested; nothing installed in other repos yet.

## Steps

1. Decide the skills. **Done** (below).
2. Define the file architecture of each skill (reference: [jsmastery-pro/skills](https://github.com/jsmastery-pro/skills) layout). Part A **done**. Part B **done**: `transcribe`, `discovery`, `start` written and tested; `penpot` + `design` written (drawing not tested yet); `scope`, `audit`, `architect`, `develop`, `check`, `test`, `document`, `sync`, `debug` adapted from jsmastery (not tested).
3. Tidy this repo.
4. Decide how other repos use it.

**Next action:** step 3, tidy this repo. Then test the jsmastery skills on a real feature, from its settled business rules.

The jsmastery skills were adapted 2026-10-09 from commit `43b69e4` (MIT; a `LICENSE` copy in each skill folder). **Adapt, not rewrite** (decided 2026-10-09): their text stays, their files move into the Part A folders (`agent-modes/` → `modes/`; `internal/`, `agent-prompt.md`, guides, `patterns/`, `approaches/`, `flow/`, `ui/` → `references/`; `spec-template.md`, `scope-template.md` → `templates/`), their Output style block becomes the house rules Style item, and only the connection points change (see *How skills hand off*). Their `scout` and `researcher` subagents are in `.claude/agents/`; every step that uses them also runs inline. Not ported: `check-portability.mjs` (size budgets and portability lint), `analyze-token-usage.mjs`, `docs/conventions.md` (their skill authoring guide). Their `SKILL.md` sections keep jsmastery's names (*Artifact ownership* plays the role of *Reads / Writes*). Not exercised yet: all 9.

**Example docs** (decided 2026-10-09): the test runs used a client project's material, removed before this repo went public. `docs/` now holds a fictional example project (PetVida, a veterinary clinic) with every file the skills write, from a meeting to a `Proposed` spec. See `docs/README.md`.

`start` was written 2026-10-09 and run on this repo with no input: a board with a meeting not routed, a feature waiting for its validation meeting, routed features not started, and a heads up for `/audit` (no `AGENTS.md`). Fixes from the test: features not started are options too (one per meeting); open points of a feature waiting for validation are named on its Waiting line. Not exercised yet: an input (recording, minutes, slug, idea, bug), a validation meeting's minutes, running the picked skill, `docs/scope.md` ordering.

**Postponed** (decided 2026-10-09, the user will test it later): a real `design` run that draws in Penpot, which also tests `penpot` draw mode (steps 2 and 3 of `design`), into a new file so a hand made file of the same feature stays for comparison.

`penpot` was written 2026-10-09 (rewritten from a client project's Penpot skill and design docs) and its setup tested against that project's design system library. Fixes from the test: the runner finds its own scripts by bare name, the open library is deduped from its connected libraries, the server's `{result, log}` wrapper is unwrapped, `frames` skips component instances; setup links documents that stay maintained elsewhere instead of copying them. Not exercised yet: `draw` mode, `files.mjs new` and `sync-tokens`, `S.relink` / `S.audit` on a real page.

`design` was written 2026-10-09 and dry run on a real feature, mode `validate`, without drawing: `screens.md` mapped to the frames of a hand made design file, context screens from other features, points for the validation meeting, and the differences between that file and the rules. Fixes applied: screens ruled by another feature are listed as context, owned there; **adopt** (decided 2026-10-09): a design file drawn outside the skill is mapped to the inventory instead of redrawn (step 2); a Differences section in `screens.md`, only for adopted files or existing screens in final mode. Not exercised yet: drawing (steps 2 and 3), the validation meeting triage (step 4), mode `final`.

`transcribe` was tested on a voice note and a 32 min Meet recording; fixes applied: turn rebuild script, off topic stretches in one line, glossary confirmed before writing, and a fit check (a meeting always belongs to the current project; ask only when it is personal or does not fit the project).

`discovery` was tested 2026-10-09 on a real meeting, depth `full` (on purpose, to test it), through round 1 to business rules v1 with one respondent. Fixes applied: docs language asked once per project (house rule), the `README.md` Files table updated by every step, research results fed back into the understanding and the product analysis, round files grouped in `rounds/<n>/`, a late respondent reopens their round, final version renamed `business-rules/v<n>.md`. Meeting routing tested on the same meeting: routing section appended to its `minutes.md` (5 new features left `pending`), and business rules v2 moved foreign rules out into section 8 dependencies. Fixes applied: routing can make a new version with no new answers; a partly owned rule is rewritten, not dropped. Not exercised yet: idea mode, depth `light`, a round 2 from open points, a meeting as an answers source, the late respondent path, starting a feature from a `pending` routing row. This repo's `CLAUDE.md` sets `Docs language: English` (changed from `pt-BR` on 2026-10-09: the whole repo, examples included, is in English).

Building this ecosystem is itself the first feature run through it: each skill, once ready, is used on this work.

The client project's manual process and jsmastery are references, not constraints: this repo defines the standard, taking from them only what fits.

## Skills (decided 2026-10-09)

| Skill | Job | Source |
|---|---|---|
| `start` | Single entry point. You say what you are doing today; it proposes the flow and the next skill, you confirm. Skills stay callable directly. | new |
| `transcribe` | Meet video, audio, or WhatsApp voice note → clean transcript + meeting minutes. | new, from a client project's manual process |
| `discovery` | Meeting → business rules only, no code: questions for product, what breaks in the flow, questionnaire, answers analysis, versioned business rules. Loops until settled. | new, from a client project's manual process |
| `scope` | Product level plan: which features, in what order. Called by `discovery` when the work needs it (e.g. a brand new project), still callable directly. | jsmastery |
| `audit` | Creates the `AGENTS.md` context files (root + one per area or workspace) that every other skill reads. | jsmastery |
| `design` | Business rules → screens. Tool agnostic workflow; talks to the design tool through an adapter skill. | new, generalizes a client project's Penpot skill |
| `penpot` | Adapter: how to drive Penpot (MCP, helpers, scripts, pitfalls, design system conventions). Read by `design`; a `figma` sibling later. | new, from a client project's Penpot scripts |
| `architect` | Business rules → decision spec with acceptance criteria. | jsmastery |
| `develop` | Builds front and back from the spec. | jsmastery |
| `check` | `verify` runs the real app; `review` reads the diff on another model. | jsmastery |
| `test` | Test suite for the change. | jsmastery |
| `document` | PR, changelog, release note, postmortem from the real diff. | jsmastery |
| `sync` | Keeps context files, scope, and specs current. | jsmastery |
| `debug` | Root cause fix + regression test. | jsmastery |

Dropped: `field-change`. Adding, changing, or removing a field goes through the new feature flow.

## Skill file architecture

### Part A: common skeleton (decided 2026-10-09)

Fixed folder names. A folder exists only when the skill needs it.

```
skills/<name>/
├── SKILL.md       always. Short: when to use, what it reads and writes, which mode to route to
├── modes/         2+ modes only. One file per mode, read only when that mode is picked
├── templates/     writes files only. The shape of each generated file
├── references/    long guides only. Read on demand ("read X when Y")
├── scripts/       runs code only (ffmpeg, Whisper, Penpot)
└── agents/        metadata for other tools (e.g. Codex `openai.yaml`). No logic
```

Fixed sections in every `SKILL.md`:

1. **Frontmatter**: `name`, `description` (what the agent reads to decide when to use it), `allowed-tools`, `argument-hint`.
2. **What it does**: 2 or 3 lines.
3. **Reads / Writes**: its handoff contract (see *How skills hand off*).
4. **Asks vs acts**: when it stops to ask, when it just runs.
5. **Steps**: step 0 picks the mode; each step ends in a checkable condition.
6. **Report**: one line result, the next command, warnings only when there are any.
7. **Reference files**: each with "read when…".

House rules:

- **Repeated in every skill.** One identical block at the top of each `SKILL.md`, so every skill works installed alone. `scripts/check-house-rules.sh` fails when the copies drift. Contents: language, style, spell out every abbreviation on first use, every question has exactly one recommended option, state lives in files, git commands run per git root.
- **Style** (decided 2026-10-09, from jsmastery's Output style, for every skill): plain simple words; the reader is `you`; every step is a recommendation, never an order; no dash as punctuation and no hyphenated compounds (`read only`), except words the language spells with a hyphen and values other skills match on (`open-points`, `RN-3`, frame names like `<Screen> — <state>`, time ranges like `mm:ss–mm:ss`).
- **`AGENTS.md` is always English** (decided 2026-10-09): it is instructions for agents, like the skill sources.
- **Code in English; documents in the project's docs language** (decided 2026-10-09): code, comments, commits, and skill instructions are always English. Generated documents follow the `Docs language:` line in the project's root `AGENTS.md` or `CLAUDE.md`; the first skill run asks once and writes it. Exceptions: a transcript stays in the meeting's language; a questionnaire is in the respondents' language. A translation is made only on request, as a sibling file.
- **Portable now, not Claude Code only.** Follow the Agent Skills format; no hard dependency on Claude Code tools. Every option picker (`AskUserQuestion`) has a plain text fallback; every subagent step can run inline; `agents/` carries metadata for other tools.

### Part B: per skill

Order: `transcribe` → `discovery` → `penpot` + `design` → `start`.

- **`transcribe`** (done, `skills/transcribe/`): modes `meet` (caption track found) and `audio` (no captions, or several files); templates `transcript.md`, `minutes.md`; scripts `extract-captions.sh` (ffmpeg) and `whisper.sh` (whisper.cpp, `WHISPER_MODEL`). Records what was said; interpretation is `discovery`'s job. The glossary of misheard terms lives in the project (`docs/meetings/glossary.md`), not in the skill.

- **`discovery`** (done, tested 2026-10-09, `skills/discovery/`): business rules only. Tasks, system changes, and delivery phases belong to `architect` (its build plan).
  - **Modes:** `meeting` (minutes or transcript; raw media → runs `/transcribe` first) and `idea` (no meeting; interviews you first). A product sized idea goes to `/scope` instead.
  - **Depth:** `light` = understanding → questionnaire → business rules; `full` adds research and product analysis. Step 0 proposes one, you confirm.
  - **Loop, not a mode:** the feature `README.md` holds the status (`drafting`, `waiting-answers`, `open-points`, `settled`). Step 0 reads it and resumes. Open points (`P-n`) from a business rules version start the next round: a meeting (meeting mode on an existing feature) or a new questionnaire, then answers analysis, then the next business rules version.
  - **Files** in `docs/features/<slug>/`: `README.md` (status, one page summary, links), `understanding.md`, `research.md`, `product-analysis.md` (hypotheses `H-n`, Hipótese); one folder per round, `rounds/<n>/` (decided 2026-10-09: a round's files are read together, and a round that comes from a meeting fits the same shape): `questionnaire.md` + `questionnaire.html` (Artifact; answers come back from its database, fallback: the Markdown filled by hand), `answers.raw.md` (answers verbatim; existing sections never edited), `analysis.md` (what changed, consensus → rule, open points, agenda); `business-rules/v<n>.md` (what and why, vocabulary, journey, business rules `RN-n`, states, who does what, out of scope, open points `P-n`). Versions count up on their own (`<n>` = last version + 1), not by round.
  - **Late respondent** (decided 2026-10-09): answers to a round already analysed reopen it. Their section is appended to that round's `answers.raw.md`, its `analysis.md` is rewritten, and a new business rules version is written; earlier versions stay as they are.
  - **Meeting routing** (decided 2026-10-09): a meeting often covers several features (2026-10-06: closing, regenerative by farm, QR code, PDF). Before working on any feature, `discovery` routes every topic of the minutes: this feature, another existing feature, a new feature, or not a feature; you confirm. The table is appended to the meeting's `minutes.md` as a routing section (`Topic | Goes to | Status`), the only part of a meeting folder `discovery` writes. One feature is worked on per run; the others stay `pending` and `/discovery <minutes.md>` picks the next. A rule that belongs to another feature goes there even when it came up in this one; this feature lists it as a dependency (business rules section 8) instead of owning it.
  - **Templates:** one per file above except the raw answers. No scripts.
  - **Questionnaire page:** `templates/questionnaire.html` is data driven: the skill fills one JSON block from the Markdown and translates the interface strings. Answers save to the Artifact database at `answers/<viewer id>` (each person writes only their own), with a copy and download fallback when the database is not available.

- **`design` + `penpot`** (decided 2026-10-09; both written; `penpot` setup tested; `design` dry run without drawing; drawing postponed). File architecture:
  ```
  skills/penpot/                  how to drive Penpot; no project knowledge
  ├── SKILL.md                    connection + preflight, rules that never bend, mode routing
  ├── modes/setup.md              once per project: read the design system library → write docs/design/
  ├── modes/draw.md               called by /design: frames → export and look → audit returns []
  ├── references/connection.md    cloud MCP vs local, Chrome flags, order REST → Chrome → Plugin API
  ├── references/pitfalls.md      Plugin API pitfalls
  ├── references/flow-pages.md    page pattern: legend, flow sections, flow tags, frame names
  ├── scripts/                    MCP runner, generic helpers, REST file tool
  └── agents/openai.yaml
  skills/design/                  workflow; no tool knowledge
  ├── SKILL.md
  ├── modes/validate.md           happy path; text from the rules and vocabulary; RN-n / P-n notes
  ├── modes/final.md              state matrix + edge cases from the rules; existing screen optional
  ├── templates/screens.md
  ├── references/states.md        state checklist (generic)
  └── agents/openai.yaml
  docs/design/                    in each project, written by /penpot setup
  ├── README.md                   tool, files (library, screen files), design system rules, tokens, naming
  ├── components.md               what the design system has (reuse before creating)
  └── shell.js                    optional: the project's screen skeleton (e.g. sidebar + header)
  ```
  - **Project knowledge lives in the project** (`docs/design/`, like the meetings glossary), so the skills stay generic. Same split as the client project it came from: the project's design docs are the what, the skill is the how.
  - **One Penpot file per feature** (`<Project> · <feature>`), pages `Validation v<n>` then one per flow; a project can override it in `docs/design/README.md`.
  - **Screen text:** `validate` takes it from the rules and vocabulary (there is no code yet); `final` takes it from the code's i18n when the screen exists, else as `validate`.
  - **`screens.md`** lives in `docs/features/<slug>/` next to the other files (no `design/` folder: it is one file). Sections: header (status `drafting` → `waiting-validation` → `validated` or `waiting-rules` → `done`, mode, business rules version, Penpot link), screens (screen, journey step, `RN-n`, `P-n`, page / frame), state matrix (`final` only: screen × state, ✓ or `n/a (why)`), edge cases (case, rule, where it shows), decisions from validation meetings, rule changes sent to `discovery`.
  - **`design` steps:** 0 resolve (slug → mode from `screens.md` status; validation minutes → triage; no `docs/design/` → `/penpot setup` first); 1 inventory in `screens.md` (screens from the journey, states from section 6, permission variants from who does what, edge cases from the rules), you approve before anything is drawn; 2 draw through the tool skill; 3 record links and status; 4 triage validation minutes; 5 report.
  - **Scripts are rewritten, not copied** (decided 2026-10-09): cleaner code that still carries every pitfall the original helpers already solve; project specific pieces (screen skeleton, sample data, the hex → token map) go to the project's `shell.js`. Split like Figma's skills: a base skill that teaches the tool (`figma-use`) and workflow skills on top (`figma-generate-design`).
  - **`design`** reads the latest `business-rules/v<n>.md` and writes `docs/features/<slug>/screens.md` (screen inventory + state matrix in Markdown), approved before anything is drawn; `architect` and `develop` read it too.
  - **Modes:** `validate` (happy path only, real design system components, notes linking each screen to `RN-n` / `P-n`) and `final` (every screen × every state: loading, empty, error, partial, success, no permission; plus the edge cases the rules imply). Changing an existing screen is an optional input of `final` (current screen from code or Penpot), not a mode of its own.
  - **Validation loop:** product validates the `validate` output in a screen validation meeting, where what stays and what changes is decided. The recording goes through `/transcribe`; then `/design` reads the minutes and splits them: screen decisions for this feature go to a "Decisions" section of `screens.md` (with the minutes time); any rule change, of this feature or another, sends you to `/discovery <minutes.md>`, whose routing takes each to its feature and writes the next business rules version. `design` never changes a rule itself. A meeting with screen decisions only skips `discovery`. Validation can repeat; `final` starts once nothing is left to validate.
  - **`penpot`** carries the tool knowledge: the official Penpot MCP (`execute_code` on the Plugin API, through a connected tab), the REST API for files and token sync, and the pitfalls list. What the original runner, REST file tool, and the generic core of the helpers (`bind`, `txt`, `icon`, `inst`, `variantSet`, `fitTexts`, `repairIcons`, `audit`, `pageLegend` / `flowSection` / `restack`) do is rewritten into `skills/penpot/scripts/`. Project sample data and screen batches stay in the project.
  - **Later, not now:** design system upkeep (new components, token sync) as its own skill; design ≠ code drift under `check` or `sync`; code → Penpot capture.

- **`start`** (done 2026-10-09, `skills/start/`): `SKILL.md` + `agents/openai.yaml`, no modes, templates, or scripts.
  - **Read only** (decided 2026-10-09): it writes nothing. The state already lives in each skill's files; a board file would be a copy that drifts. The board is shown in the chat.
  - **Reads:** each feature's `README.md` and `screens.md` status, the routing section of meeting minutes (and minutes with none), `docs/scope.md`, the root `AGENTS.md`.
  - **One table** maps what it finds to the next command, grouped as now, waiting (on product or someone else), not started. `screens.md` decides over the feature status, since design comes after discovery. Every new skill adds its rows there.
  - **No input** (decided 2026-10-09): board, then one question; recommended: the first unfinished feature in `docs/scope.md`, else the row updated most recently. With input (recording, minutes, slug, idea, bug), the matching step is recommended.
  - **Runs the picked skill** (decided 2026-10-09) once you confirm. A skill not installed is named with what it would do; `start` never does its job.

- **jsmastery skills** (adapted 2026-10-09; see *Next action*). Connection points, beyond the path changes below:
  - **Paths:** scope in `docs/scope.md` (split into `docs/scope/index.md` + one file per area only when it outgrows a scan; a monorepo or repo of repos keeps one scope, each feature names its workspaces). Specs in `docs/features/<slug>/specs/NNNN-*.md`, numbered per feature, with every jsmastery shape (directory spec, umbrella, `verify.md`, `Assumed`, `Superseded`) inside it; a stack or cross cutting decision is a feature folder of its own. The design system doc is `docs/design/README.md`, not a root `design.md`. A skill that adds a file to a feature folder adds it to that feature's README `Files` table.
  - **`scope`:** each feature links its folder and gets its own entry command: `/discovery` (business behavior to settle), `/architect` (a technical decision), or `/develop` (nothing to decide). `Done when` points to the latest business rules version. A bare `/scope` enrolls feature folders and `pending` routing rows that have no scope row. `discovery` never writes the scope; its report recommends `/scope <slug>` for a new feature.
  - **`architect`:** reads the latest business rules and `screens.md` as settled input, never asks what they answer. Each AC (Acceptance Criteria, critério de aceite) cites the RN (Regra de Negócio, business rule) it proves; every RN in the build is covered or listed as out of the spec. Rules not `settled`, an open P (Pendência, open point), or screens not `done` → a warning that recommends `/discovery` or `/design` first. A wrong rule goes to `/discovery`; `architect` never edits rules.
  - **`develop`:** a screen is not an owed decision when `screens.md` is `done` and its frames exist. First design route: the feature's screens, looked at through the design tool's skill (`penpot`), reusing `docs/design/components.md`.
  - **`check`, `debug`, `document`, `audit`:** `check verify` also compares the UI against the frames; `debug` sends a wrong rule to `/discovery`; `document` takes the why from the spec and the rules; `audit` keeps the `Docs language:` line in root `AGENTS.md`.
  - **`start`:** its table continues past `screens.md` `done`: spec `Proposed` → `/develop`, `In Progress` → the next unticked box of its scope row, `Assumed` → heads up to ratify with `/architect`. The furthest stage decides (spec over `screens.md` over the feature README).

In this repo, skill sources live in `skills/<name>/` and `.claude/skills/<name>` is a symlink to them, so Claude Code loads them here.

## How skills hand off

Skills talk through files, never through the chat: each one writes a file the next one reads. Paths follow the project folder layout (*Already answered*).

| Writes | What | Read by |
|---|---|---|
| `transcribe` | transcript + meeting minutes | `discovery` |
| `discovery` | routing section of each meeting's `minutes.md`; `business-rules/v<n>.md`: business rules (`RN-n`, Regra de Negócio) and open points (`P-n`, Pendência) | `scope`, `design`, `architect` |
| `scope` | `docs/scope.md`: features, order, status, workflow tier, each feature's entry command | `architect`, `develop`, `start` |
| `audit` | `AGENTS.md` files | every skill |
| `design` | `screens.md` + screens in Penpot; `validate` output goes to the screen validation meeting | `transcribe` → `discovery` (validate), `architect`, `develop`, `check verify` |
| `architect` | `specs/NNNN-*.md` in the feature folder: decision, acceptance criteria (`AC-n`, each citing its `RN-n`), build plan | `develop`, `check`, `test` |
| `develop` | code + spec status + scope boxes; `Assumed` spec when you build before deciding | `check`, `test`, `sync` |
| `check` | `verify.md` beside the spec; review findings in `docs/reviews/` | you |
| `test` | tests tagged with `AC-n`; `test-preferences.json` | `sync` |
| `document` | PR body, `CHANGELOG.md`, `docs/releases/`, `docs/postmortems/` | you |
| `sync` | updated `AGENTS.md`, scope, spec status | every skill, next run |
| `debug` | fix + regression test; a bad decision goes back to `architect`, a wrong rule to `discovery` | `test` |

`start` reads all of the above to tell you where you are and what comes next.

## Already answered

- **Recording sources:** Meet video with embedded captions, plain audio or video, WhatsApp voice notes.
- **Design tool:** Penpot (open source). Other tools later.
- **Product loop:** a Claude Artifact questionnaire; product answers there, each person's answers save to the Artifact database and `discovery` reads them back; fallback: the Markdown filled by hand and pasted.
- **Discovery is one skill with two modes,** modeled on jsmastery `scope` (one command, mode inferred from the input, one `modes/*.md` per mode): meeting mode (transcript or recording; calls `transcribe` first for raw media) and idea mode (a new idea with no meeting; starts by interviewing you). Both share the same loop and the same business rules format.
- **Project folder layout** (2026-10-09): everything about a feature lives in one folder.
  ```
  docs/
  ├── meetings/<YYYY-MM-DD>-<topic>/   transcribe
  ├── scope.md                         scope: one row per feature, links to its folder
  └── features/<slug>/                 discovery files, business rules versions, spec(s) from architect
  ```
  A cross cutting decision (e.g. how evidence files are stored) becomes a feature of its own, so specs have one home. `scope.md` splits into one file per area only when it outgrows a scan.
- **Order of `design` and `architect`** (2026-10-09): design first. `design validate` runs inside the `discovery` loop; `design final` runs once the rules settle, before `architect`, which reads both the rules and the design. Design is the source of truth.
- **A workspace can be its own git repo.** jsmastery assumes one git repo. Every skill must also work in a repo of repos (e.g. a root folder holds the AI layer, `web/` and `api/` are separate, gitignored git repos). Rule: resolve each workspace's git root (`git -C <workspace> rev-parse --show-toplevel`) and run git commands (`diff`, `status`, `fetch`, `log`) per root. In a single git monorepo every workspace resolves to the same root, so it runs once; in a repo of repos it runs once per child repo. Workspace detection covers both: workspace configs (`pnpm-workspace.yaml`, `turbo.json`, `workspaces`) and child folders with their own `.git` or manifest.

## Ponytail (checked 2026-10-09)

[DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) v4.9.0 (commit `356918e`), a Claude Code plugin installed 2026-09-14 at user scope (`~/.claude/settings.json`). It runs in every project, not only here; this repo's `.claude/settings.json` does not mention it.

- **How it acts:** three hooks, no manual step. `SessionStart` injects the "lazy senior developer" rules (the ladder: does it need to exist → already in the codebase → standard library → native platform → installed dependency → one line → minimum code); `SubagentStart` injects them into every subagent; `UserPromptSubmit` tracks mode switches.
- **Mode:** `full`, the default (state in `~/.claude/.ponytail-active`; no `~/.config/ponytail/config.json`). Switch with `/ponytail lite|full|ultra`; off with "stop ponytail".
- **Commands available:** `/ponytail-review` (overengineering in a diff), `/ponytail-audit` (whole repo), `/ponytail-debt` (lists every `ponytail:` comment), `/ponytail-gain`, `/ponytail-help`.
- **Footprint here:** two `ponytail:` comments, both in `skills/transcribe/scripts/` (`whisper.sh`, `extract-captions.sh`: bash only, a PowerShell twin when a Windows user shows up). No skill names it or depends on it.
- **Scope:** it governs code, not the skills' prose or the documents they write. It does not travel with `skills/<name>/` (open question 1): a project gets it only by installing the plugin. Its rules match this repo's "Start minimal".

## Open questions

Items marked *Proposal* are suggestions, not decisions.

1. **Where does the ecosystem live?** *Proposal:* ia-lab is the source repo; other projects install it with `npx skills add`, the way jsmastery is distributed. Alternative: clone all skills into each project. Discuss `audit` in detail together with this decision. To settle with it:
   - **What travels.** Only `skills/<name>/` folders. Open: the `scout` and `researcher` subagents live in `.claude/agents/`, outside them (the skills fall back to inline without them). This repo's `docs/` (test meetings, glossary, this plan) stays here; each project builds its own `docs/` as it uses the skills. *Proposal:* worked examples a skill needs go inside the skill (e.g. `references/example-*.md`), never in `docs/`.
   - **Existing project**: install, then run `audit` to write its `AGENTS.md` files; decide what happens to skills it already has (see question 2) and to existing folders that differ from the *Project folder layout*.
   - **New project:** install, then `scope` (or `discovery` idea mode), then `audit` once there is code.
   - **Install all or pick.** All skills at once, or only the ones a project needs (each works alone thanks to the repeated block).
   - **Updates.** How a project gets a newer skill version (run the install again, or a skills CLI update command; check what `npx skills` offers), and whether a project may edit its copy locally.
2. **Existing projects' Matt Pocock skills** (`grill-me`, `to-questionnaire`, `wayfinder`, `to-spec`, …) overlap with this. Keep some, or replace them all?
3. **CodeGraph.** Understand what it is and how skills and agents can use it efficiently. A client project has a `codegraph` skill: a semantic index of the code queried through tools like `codegraph_search` ("where is X?"), `codegraph_context` ("how does X work?"), `codegraph_trace` ("how does X reach Y?"), covering its web and api repos in one graph. Candidate use: the read only exploration step in `audit`, `architect`, `develop`, and `debug`.

