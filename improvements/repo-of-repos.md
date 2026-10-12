# Repo of repos: what every skill still assumes

**Decide and fix:** the standard puts the code repos inside the project repo, each its own git repo with its own stack (see "What every project looks like" in the [README](../README.md)). Every skill's house rules say "git per root" and "one CodeGraph server per code repo", but the steps below them still assume one root, one stack, and JavaScript. A sweep of every skill (October 2026) found about 80 places; they come from the eight causes below. Line numbers are from that sweep.

## Why one `/develop`, not one per platform

`/develop` splits the work by kind: a UI track (`references/ui-guide.md`, already platform neutral, building web, mobile, or desktop with that platform's idioms) and a Logical track (APIs, services, data). What changes per stack (commands, ORM, navigation, simulator) comes from the code repo's `AGENTS.md` and the tool skills its `## Agent skills` lists. About 280 lines of `/develop` (spec gate, `Assumed` spec, scope updates, resume, git) are the same on every platform; `develop-web`, `develop-api`, `develop-mobile` would copy them three times. So the stack knowledge belongs to `/audit`, and every skill only has to read the right code repo's files.

## Causes

1. **Search from the project repo root skips the code repos.** Grep is ripgrep, which honors `.gitignore`, and the project repo's `.gitignore` lists every code repo. Tested on a small repo of repos: a search from the root found only the project repo's file; with the code repo as the path it found the code. Every fallback that greps "the codebase" from the root sees no code: discovery "read the code" (`discovery/modes/meeting.md:7`), design's i18n lookup (`design/modes/final.md:2`), sync's evidence (`sync/references/agent-prompt.md:154`), debug's sibling search (`debug/SKILL.md:86`), and `scout`, which gets no code repo in its brief (`.claude/agents/scout.md:8`). Glob was not tested.
2. **Git runs once, from the project repo.** From there it sees only `docs/`. Affected: `/check verify` and `review` (`verify.md:38,71`, `review.md:83-92`: review stops with "nothing to review"), `/test` (`SKILL.md:59-61`: always "No uncommitted changes"), `/debug` (`SKILL.md:62`, bisect), `/document` (`SKILL.md:73-94`: one PR, one tag range), `/sync` (`SKILL.md:71-86`: always "nothing to sync"), `/develop` freshness and `references/git-flow.md`, `/architect` freshness (`SKILL.md:113`), `/scope` replan readout (`SKILL.md:31`).
3. **The project root has no manifest, stack, or commands.** `/audit` preflight may route an established project to greenfield; `/develop` says "No project found"; `/architect` architecture mode reads no manifest (`modes/architecture.md:9`); `/check verify` finds no run command (`verify.md:82`); `/test` gets no `RUN_COMMAND` (`SKILL.md:164`); `/start` never suggests `/audit`, because "code and no root `AGENTS.md`" never fires (`start/SKILL.md:64`).
4. **Repo of repos is not detected.** `/audit` (preflight), `/architect` (`SKILL.md:114`, `design-conversation.md:39`), and `/scope` (`modes/plan.md:9`) detect only JavaScript workspace markers. Only `audit/modes/codegraph.md` and `scope/modes/plan-monorepo.md` know the shape.
5. **Templates have no code repo field.**
   - Project `AGENTS.md`: one `## Stack` and one `## Commands` (`audit/references/agent-prompt.md:220`), no list of code repos ([system-map.md](system-map.md) proposes that section).
   - Scope row: one `code in <path>` (`scope/templates/scope.md:8,124`).
   - Spec: one stack table (`architect/templates/spec.md:135`). Build plan tasks, milestones (`after-subagent.md:70`), env vars (`spec.md:122`), and cross cutting patterns (`spec.md:212`) carry no code repo.
   - `screens.md`: no app column (`design/templates/screens.md:16`).
   - Review file named by branch (`check/modes/review.md:23`).
   - `path:line` citations without the code repo everywhere.
6. **One output where there should be one per code repo.** `test-preferences.json` (`test/SKILL.md`); `CHANGELOG.md` (`document/templates/changelog.md:3`); PR (one per touched repo, linked to each other); release note (one tag range per repo); test commit (`test/SKILL.md:195`); review test signal (`review.md:97`); `/check verify` starts one app, but api and web must both run (`verify.md:84-99`); `/sync` routes stack facts to the root `AGENTS.md` (`sync/references/agent-prompt.md:89`) and needs evidence in every repo the row names (`:161`).
7. **Stack lists are JavaScript only.** Source extensions without `.dart`, `.kt`, `.swift` (`architect/SKILL.md:120`, `scope/modes/plan.md:5`); excluded folders without `.venv`, `.dart_tool`, `Pods`; lockfiles and test runners without pub, `flutter_test`, pytest-django (`test/modes/setup.md`); file classification by Next.js paths (`test/SKILL.md:78`).
8. **One platform per feature on the product side.** Business rules do not say which app a journey step happens in (`discovery/templates/business-rules.md:27`); design states are web only (`design/references/states.md`); Penpot has one library, one frame size, and one `shell.js` skeleton per project (`penpot/modes/setup.md:6,16`, `modes/draw.md:5`); Penpot scripts take the git top level as the root, so run from inside a code repo they miss `docs/design/` and `.env` (`penpot/scripts/mcp.mjs:17`, `files.mjs:17`).

Already right: the two house rules; `/audit` preflight, which detects the shape and reads signals inside each code repo (causes 3 and 4 for `/audit` only), and its project `AGENTS.md` with the `## Code repos` list; `scope/modes/plan-monorepo.md`; `audit/modes/codegraph.md`; `start` reading each `.mcp.json` server's `--path`; `sync` handling non JavaScript manifests (`SKILL.md:84`); `architect` never assuming web.

## Questions

1. **One `/develop` or one per platform.** *Proposal:* one. A platform gets its own reference file only when a real project needs it (mobile: `references/ui-mobile.md` with simulator, native build, permissions, store).
2. **Where the list of code repos lives.** *Decided:* the project `AGENTS.md` lists every code repo in `## Code repos` (applied in `/audit`). Still owed: each scope row names the ones that feature touches. Every skill takes its git roots, search paths, and `AGENTS.md` files from those two places, so causes 1 to 4 get one fix.
3. **Shared rule or per skill fix.** *Proposal:* extend the house rules block with one line ("run git, Grep, and Glob once per code repo the feature touches, with the code repo as the path; read that repo's `AGENTS.md` for stack and commands"), then fix the steps that contradict it skill by skill.
4. **A feature across code repos in `/develop`.** One run for every repo, or one run per code repo (`/develop <slug> api`, then `/develop <slug> web`)? *Proposal:* one run per code repo, in the order of the build plan (api contract first). It fits the build flow's "one sub task per run" and works in one git root at a time.
5. **Git setting.** *Proposal:* one `## Git` block in the project `AGENTS.md` for every code repo, so a feature gets the same branch name in each repo it touches.
6. **First `/audit` depth per code repo.** *Decided and applied:* a full scan of each code repo on an existing project; a stub from its manifest on a new one.
7. **Screens per app.** *Proposal:* an `App` column in `screens.md`, taking its values from the scope row, and one Penpot library and frame size per app recorded in `docs/design/README.md`.

## Done when

On a project with an api and a web code repo (and mobile, if a company project has one): `/audit` writes the project `AGENTS.md` with the code repo list and one `AGENTS.md` per code repo; `/develop`, `/check`, `/test`, `/document`, and `/sync` each run once per touched code repo with that repo's commands, git, and files; and a search for existing code from discovery finds it.
