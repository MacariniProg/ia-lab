# AI Lab

A study repo for building a reusable AI development ecosystem: a set of [Agent Skills](https://agentskills.io) that take a feature from a recorded meeting with the product team all the way to shipped, tested, documented code.

The Next.js app is intentionally minimal (a single page). The focus is the skills around it, not the app.

## How it works

Each skill does one stage of the work and writes its result to a file in `docs/`. The next skill reads that file. Nothing important lives only in the chat, so you can stop at any step, clear the session, and pick up later.

```
recording ─▶ /transcribe ─▶ /discovery ─▶ /design ─▶ /architect ─▶ /develop ─▶ /check verify ─▶ /test ─▶ /check review ─▶ /document ─▶ /sync
                                 ▲            │
                                 └────────────┘  screen validation meeting with product
```

- **Product side:** `/transcribe` turns a meeting into a transcript and minutes; `/discovery` turns the minutes into versioned business rules (`RN-n`, Regra de Negócio) through questionnaires for product, until no open point (`P-n`, Pendência) is left; `/design` turns the rules into screens in Penpot, validated with product.
- **Engineering side:** `/architect` writes a spec whose acceptance criteria (`AC-n`) cite the business rules they prove; `/develop` builds from the spec and the screens; `/check`, `/test`, `/document`, and `/sync` verify, test, write up, and keep the context files current.
- **Entry point:** `/start` reads every status file, shows where each feature stands, and proposes the next skill. Every skill can also be called directly. `/debug` runs anytime something breaks.

You run only the steps a change needs: a bug goes straight to `/debug`; a purely technical decision skips discovery and design and starts at `/architect`.

## Skills

| Skill | What it does | Writes |
|---|---|---|
| `start` | Board of every feature and the next command; runs it once you confirm. Read only. | nothing |
| `transcribe` | Meet video, audio, or WhatsApp voice note → transcript + minutes. | `docs/meetings/<date>-<topic>/` |
| `discovery` | Meeting or idea → business rules, through questionnaires and answer analysis. Routes each meeting topic to its feature. | `docs/features/<slug>/` |
| `design` | Business rules → screen inventory, drawn in the design tool and validated with product. | `docs/features/<slug>/screens.md` |
| `penpot` | Adapter that drives Penpot (MCP server and REST API); `/penpot setup` documents a project's design system. | `docs/design/` |
| `scope` | Product plan: which features, in what order, how much checking each needs. | `docs/scope.md` |
| `audit` | Context files every skill reads (stack, commands, conventions). | `AGENTS.md` |
| `architect` | Load bearing decision → build spec with acceptance criteria and a build plan. | `docs/features/<slug>/specs/` |
| `develop` | Builds UI and backend from the spec; stops when a decision is owed. | app code |
| `check` | `verify` runs the real app against the spec; `review` reads the diff on a different model. | `verify.md`, `docs/reviews/` |
| `test` | Test suite for the changed code, each test tagged with the `AC-n` it covers. | test files |
| `document` | PR body, changelog, release note, or postmortem from the real diff. | `CHANGELOG.md`, `docs/releases/`, `docs/postmortems/` |
| `sync` | Brings `AGENTS.md`, the scope, and spec statuses back in line with the code. | those files |
| `debug` | Root cause loop, minimal fix, regression test. | code fix |

The first five were written in this repo. The last nine are adapted from [jsmastery-pro/skills](https://github.com/jsmastery-pro/skills): same text, moved into this repo's folder layout and connected to the others.

## See it on an example

`docs/` holds **PetVida**, a fictional veterinary clinic (in English), with every file the skills write: a meeting with its routing, a feature (`appointment-booking`) with business rules v1 and v2, screens, and a spec ready to build, plus the scope and the design system doc. Start at [docs/README.md](docs/README.md). Running `/start` in this repo shows the board those files produce.

## Getting started

Requirements: [Claude Code](https://claude.com/claude-code) (or another Agent Skills client) and Node.js. Per skill:

- `transcribe`: `ffmpeg`, `whisper-cli` ([whisper.cpp](https://github.com/ggml-org/whisper.cpp)) with a model in `WHISPER_MODEL`, and Python 3.
- `penpot`: the Penpot MCP server with the file open in a browser tab, and `PENPOT_TOKEN` for the REST API (`npm install` in `skills/penpot/scripts/` on first use). Details in `skills/penpot/references/connection.md`.

Use the skills here:

```bash
git clone https://github.com/MacariniProg/ia-lab.git
cd ia-lab
claude          # skills load from .claude/skills/
```

Then type `/start`, or call a skill directly (`/discovery <minutes.md>`, `/architect <slug>`, …).

Use them in another project: copy the `skills/<name>/` folders you want into that project's `.claude/skills/` (or `.agents/skills/` for other agents). Each skill works on its own. How projects install and update them is still open (see `improvements/`).

Run the app (only a placeholder page):

```bash
npm install
npm run dev
```

## Repository layout

```
skills/<name>/          skill sources: SKILL.md, plus modes/, templates/, references/, scripts/, agents/ when needed
.claude/skills/<name>   symlinks to skills/, so Claude Code loads them here
.claude/agents/         scout and researcher subagents (read only helpers some skills use)
scripts/                check-house-rules.sh: fails when the shared rules block drifts between skills;
                        analyze-token-usage.mjs (`npm run tokens`): where a Claude Code session spent its tokens
improvements/           decisions and fixes still owed, one file each
docs/                   the PetVida example
app/                    minimal Next.js app
```

## Conventions

Every `SKILL.md` starts with the same house rules block (`scripts/check-house-rules.sh` checks it):

- Code, comments, commits, skill sources, and `AGENTS.md` are in English. Documents the skills generate follow the `Docs language:` line in the project's `AGENTS.md` or `CLAUDE.md` (`English` here).
- Plain words; no dash as punctuation and no hyphenated compounds, except values other skills match on.
- Every abbreviation spelled out on first use.
- Every question offers 2 to 4 options with exactly one recommended.
- State lives in files; git commands run once per git root (works in a repo of repos).

## Status

Work in progress. `transcribe`, `discovery`, and `start` are tested on real meetings; `design` and `penpot` are tested without drawing; the nine adapted skills are not tested yet. Decisions and fixes still owed are in [improvements/](improvements/README.md).

## Rules

- Start minimal. Only add something when studying it.
- Every new piece (skill, agent, feature) must have a clear learning purpose.
- Everything in this repo is in English: code, comments, commits, skill sources, `improvements/`, and the example documents (`Docs language: English` in `CLAUDE.md`).

## Also studying (not in this repo)

Claude Code mods tested locally, as references for hooks and UI:

- [JohnnyVizz/claude-kit `savvy-progress`](https://github.com/JohnnyVizz/claude-kit/tree/main/plugins/savvy-progress): progress bar and live subagents panel; MCP tools `progress` and `step` for multi agent skills.
- [hellosverre/claude-skins](https://github.com/hellosverre/claude-skins): themed transcript skins (`ui.render` hooks), with a local patch showing context tokens and session cost.
- [data-goblin/claude-code-filetree](https://github.com/data-goblin/claude-code-filetree): IDE style file tree with read, write, and commit highlights, with a local patch that inserts `@path` at the prompt.
- [karanb192/cache-tax](https://github.com/karanb192/cache-tax): keeps the prompt cache warm during breaks and warns before a costly cold send.
- [anthropics/claude-code-playground `blast-radius`](https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods/blast-radius): holds risky Bash commands and shows what they would change before running.
- [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail): "lazy senior developer" rules injected into every session and subagent.

## Credits and license

The `scope`, `audit`, `architect`, `develop`, `check`, `test`, `document`, `sync`, and `debug` skills are adapted from [jsmastery-pro/skills](https://github.com/jsmastery-pro/skills) (commit `43b69e4`) under the MIT license; each of those folders carries a copy of it. So is `scripts/analyze-token-usage.mjs`.

The rest of this repo has no license yet.
