# AI Lab

The standard every project at the company follows: one folder layout, the documents each stage of the work leaves behind, and the [Agent Skills](https://agentskills.io) that write them, from a recorded meeting with the product team all the way to shipped, tested, documented code.

This repo is where the standard is defined and tried. A project adopts it by following the layout below and installing the skills. Here, `docs/` plays the project repo's part and the Next.js app at the root stands in for a code repo (a single placeholder page); the standard is the layout and the skills, not the app.

## What every project looks like

A project is one **project repo** that holds everything about the product except code: business rules, features, meetings, domain, scope, design, and the AI layer (skills, agents, `AGENTS.md`). The **code repos** (one per app: web, api, mobile, …) are cloned inside it, each its own git repo, and the project repo ignores them in its `.gitignore`. The shape is drawn from two existing company projects; they adopt this standard later, as it settles.

```
<project>/                               project repo (git): the product, no app code
├── .gitignore                           lists <project>-web/ and <project>-api/
├── AGENTS.md                            the project: which code repos exist, what each owns, Docs language (audit)
├── .mcp.json                            one CodeGraph server per code repo (audit)
├── .claude/skills/                      the skills from this repo
├── docs/
│   ├── domain/                          the area the product works in: rules (RD-n) and terms true for any product there (discovery)
│   ├── meetings/<YYYY-MM-DD>-<topic>/   transcript and minutes (transcribe; routing section of minutes.md: discovery)
│   ├── meetings/glossary.md             words the transcription gets wrong (transcribe)
│   ├── scope.md                         one row per feature, naming the code repos it touches (scope)
│   ├── design/                          the design system: README.md, components.md (penpot setup)
│   ├── features/<slug>/                 business rules versions (discovery), screens.md (design), specs/ (architect), verify.md (check)
│   ├── reviews/                         check review
│   ├── releases/                        document
│   └── postmortems/                     document
├── <project>-web/                       code repo (its own git)
│   ├── AGENTS.md                        its stack, commands, conventions (audit)
│   ├── CHANGELOG.md                     what shipped in this repo (document)
│   ├── .codegraph/                      its code index, local and ignored by git (audit)
│   └── test-preferences.json            its test framework (test)
└── <project>-api/                       code repo (its own git), same files
```

Why this shape: a feature usually touches more than one app, so its rules, screens, and spec live once, above the code, and every code repo reads the same source. The code repos stay plain repos that deploy on their own. Skills run from the project repo and resolve the git root per folder, so one command can work across `<project>-web/` and `<project>-api/`.

The same goes for the code index: each code repo keeps its own CodeGraph index, and the project repo's `.mcp.json` starts one server per code repo, so an agent working on the web can also query the api in the same session. The project repo has no index of its own, since git hides the code repos from it.

A project only has the folders its work produced so far. A product with a single app keeps the same shape with one code repo inside. A cross cutting decision (for example how files are stored) becomes a feature of its own, so its rules and spec have one home. `scope.md` splits into `docs/scope/index.md` plus one file per area only when it outgrows a scan.

**Domain versus feature.** `docs/domain/` holds what is true of the area whatever the software does: regulation, industry practice, how the business works, its vocabulary. Domain rules are `RD-n` (Regra de Domínio). A feature's business rules (`RN-n`) say what this product does and cite the `RD-n` they come from, so a change in a law leads to every rule and acceptance criterion it touches.

## How it works

Each skill does one stage of the work and writes its result to a file in `docs/`. The next skill reads that file. Nothing important lives only in the chat, so you can stop at any step, clear the session, and pick up later.

```
recording ─▶ /transcribe ─▶ /discovery ─▶ /design ─▶ /architect ─▶ /develop ─▶ /check verify ─▶ /test ─▶ /check review ─▶ /document ─▶ /sync
                                 ▲            │
                                 └────────────┘  screen validation meeting with product
```

- **Product side:** `/transcribe` turns a meeting into a transcript and minutes; `/discovery` turns the minutes into versioned business rules (`RN-n`, Regra de Negócio) through questionnaires for product, until no open point (`P-n`, Pendência) is left, reading `docs/domain/` first and adding to it what it learns about the area; `/design` turns the rules into screens in Penpot, validated with product.
- **Engineering side:** `/architect` writes a spec whose acceptance criteria (`AC-n`) cite the business rules they prove; `/develop` builds from the spec and the screens; `/check`, `/test`, `/document`, and `/sync` verify, test, write up, and keep the context files current.
- **Entry point:** `/start` reads every status file, shows where each feature stands, and proposes the next skill. Every skill can also be called directly. `/debug` runs anytime something breaks.

You run only the steps a change needs: a bug goes straight to `/debug`; a purely technical decision skips discovery and design and starts at `/architect`.

## Skills

| Skill | What it does | Writes |
|---|---|---|
| `start` | Board of every feature and the next command; runs it once you confirm. Read only. | nothing |
| `transcribe` | Meet video, audio, or WhatsApp voice note → transcript + minutes. | `docs/meetings/<date>-<topic>/` |
| `discovery` | Meeting or idea → business rules, through questionnaires and answer analysis. Routes each meeting topic to its feature. | `docs/features/<slug>/`, `docs/domain/` |
| `design` | Business rules → screen inventory, drawn in the design tool and validated with product. | `docs/features/<slug>/screens.md` |
| `penpot` | Adapter that drives Penpot (MCP server and REST API); `/penpot setup` documents a project's design system. | `docs/design/` |
| `scope` | Product plan: which features, in what order, how much checking each needs. | `docs/scope.md` |
| `audit` | Context files every skill reads (stack, commands, conventions), and a CodeGraph code index per code repo. | `AGENTS.md`, `.mcp.json` |
| `architect` | Load bearing decision → build spec with acceptance criteria and a build plan. | `docs/features/<slug>/specs/` |
| `develop` | Builds UI and backend from the spec; stops when a decision is owed. | app code |
| `check` | `verify` runs the real app against the spec; `review` reads the diff on a different model. | `verify.md`, `docs/reviews/` |
| `test` | Test suite for the changed code, each test tagged with the `AC-n` it covers. | test files |
| `document` | PR body, changelog, release note, or postmortem from the real diff. | `CHANGELOG.md`, `docs/releases/`, `docs/postmortems/` |
| `sync` | Brings `AGENTS.md`, the scope, and spec statuses back in line with the code. | those files |
| `debug` | Root cause loop, minimal fix, regression test. | code fix |

The first five were written in this repo. The last nine are adapted from [jsmastery-pro/skills](https://github.com/jsmastery-pro/skills): same text, moved into this repo's folder layout and connected to the others.

## See it on an example

`docs/` holds **PetVida**, a fictional veterinary clinic (in English), laid out as a real project would be: the domain rules, a meeting with its routing, a feature (`appointment-booking`) with business rules v1 and v2, screens, and a spec ready to build, plus the scope and the design system doc. Start at [docs/README.md](docs/README.md). Running `/start` in this repo shows the board those files produce.

## Getting started

Requirements: [Claude Code](https://claude.com/claude-code) (or another Agent Skills client) and Node.js. Recommended: [CodeGraph](https://www.npmjs.com/package/@colbymchenry/codegraph) (`npm i -g @colbymchenry/codegraph`), a code index the skills explore with when its tools are loaded; without it they fall back to reading files. Per skill:

- `transcribe`: `ffmpeg`, `whisper-cli` ([whisper.cpp](https://github.com/ggml-org/whisper.cpp)) with a model in `WHISPER_MODEL`, and Python 3.
- `penpot`: the Penpot MCP server with the file open in a browser tab, and `PENPOT_TOKEN` for the REST API (`npm install` in `skills/penpot/scripts/` on first use). Details in `skills/penpot/references/connection.md`.

Try the skills on the example here:

```bash
git clone https://github.com/MacariniProg/ia-lab.git
cd ia-lab
claude          # skills load from .claude/skills/
```

Then type `/start`, or call a skill directly (`/discovery <minutes.md>`, `/architect <slug>`, …).

Apply the standard to a project: create the project repo, clone each code repo inside it and list it in `.gitignore`, copy the `skills/<name>/` folders into the project repo's `.claude/skills/` (or `.agents/skills/` for other agents), and let the skills create the `docs/` folders as the work reaches them. Each skill works on its own. `/audit` (run after the scaffold on a new project, first on an existing one) sets up CodeGraph: it indexes each code repo and adds its server to `.mcp.json`. The index stays on each machine, so after a fresh clone run `/audit` or `codegraph init -i <code repo>`; a code repo added later gets its index the same way. Restart the session after `.mcp.json` changes. How projects install and update the skills is still open (see [new-project-setup.md](improvements/new-project-setup.md) and [existing-project-setup.md](improvements/existing-project-setup.md)).

Run the app (only a placeholder page):

```bash
npm install
npm run dev
```

## This repo's layout

```
skills/<name>/          skill sources: SKILL.md, plus modes/, templates/, references/, scripts/, agents/ when needed
.claude/skills/<name>   symlinks to skills/, so Claude Code loads them here
.claude/agents/         scout and researcher subagents (read only helpers some skills use)
scripts/                check-house-rules.sh: fails when the shared rules block drifts between skills;
                        analyze-token-usage.mjs (`npm run tokens`): where a Claude Code session spent its tokens
improvements/           decisions and fixes still owed, one file each
testing/                applied to the skills but not yet tried on a real project, one file per area
docs/                   the PetVida example, in the layout every project follows
app/                    minimal Next.js app
```

## Conventions

Every `SKILL.md` starts with the same house rules block (`scripts/check-house-rules.sh` checks it):

- Code, comments, commits, skill sources, and `AGENTS.md` are in English. Documents the skills generate follow the `Docs language:` line in the project's `AGENTS.md` or `CLAUDE.md` (`English` here).
- Plain words; no dash as punctuation and no hyphenated compounds, except values other skills match on.
- Every abbreviation spelled out on first use.
- Every question offers 2 to 4 options with exactly one recommended.
- State lives in files; git commands run once per git root (works in a repo of repos).
- Explore code with CodeGraph when its tools are loaded, else `scout` or Grep.

## Status

Work in progress. `transcribe`, `discovery`, and `start` are tested on real meetings; `design` and `penpot` are tested without drawing; the nine adapted skills are not tested yet. Decisions and fixes still owed are in [improvements/](improvements/README.md); what was applied but not yet tried is in [testing/](testing/README.md).

## Rules

- Start minimal. Add a piece (skill, agent, folder, convention) only when a real project needs it, and write down why.
- A change to the standard changes every project that follows it: it goes through `improvements/` first, then into the skill and this README.
- Everything in this repo is in English: code, comments, commits, skill sources, `improvements/`, and the example documents (`Docs language: English` in `CLAUDE.md`).

## Tried locally (not part of the standard)

Claude Code mods tested locally, as references for hooks and UI:

- [JohnnyVizz/claude-kit `savvy-progress`](https://github.com/JohnnyVizz/claude-kit/tree/main/plugins/savvy-progress): progress bar and live subagents panel; MCP tools `progress` and `step` for multi agent skills.
- [hellosverre/claude-skins](https://github.com/hellosverre/claude-skins): themed transcript skins (`ui.render` hooks), with a local patch showing context tokens and session cost.
- [data-goblin/claude-code-filetree](https://github.com/data-goblin/claude-code-filetree): IDE style file tree with read, write, and commit highlights, with a local patch that inserts `@path` at the prompt.
- [karanb192/cache-tax](https://github.com/karanb192/cache-tax): keeps the prompt cache warm during breaks and warns before a costly cold send.
- `reply-style` (written locally, no repo): shows Claude's replies behind an orange bar, with a Copy button that copies only the reply text.
- [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail): "lazy senior developer" rules injected into every session and subagent.

## Credits and license

The `scope`, `audit`, `architect`, `develop`, `check`, `test`, `document`, `sync`, and `debug` skills are adapted from [jsmastery-pro/skills](https://github.com/jsmastery-pro/skills) (commit `43b69e4`) under the MIT license; each of those folders carries a copy of it. So is `scripts/analyze-token-usage.mjs`.

The rest of this repo has no license yet.
