Reference shapes for writing the scope and the completion report. Rules live in `SKILL.md`.

## What keeps it readable (the format rules)

- **Two parts:** a slim **At a glance** table for a quick scan, then **the plan** as clean feature sections grouped by phase. Build order is just the section order. There is no separate "build order" list to keep in sync.
- **Clean headings.** A heading is `### <N>. <Feature name>` plus a short status word and short tags **only when they carry real information** (`needs a decision`, a per feature approach override, a workflow tier override like `· GA`). Never a pipe delimited metadata row like `Title | P0 | inherit | …`.
- **Each fact appears once.** Intent, the definition of done, tasks, and pointers live in the section; the At a glance table is the quick index. Status is shown in the table and beside the heading, and nowhere else.
- **Only what is set.** No `n/a`, no `inherit`, no empty fields. A pointer line (`folder docs/features/<slug>/ · spec <n> · code in <path>`) carries the feature folder from the start; the spec link is added by `/architect` at capture, the code path by `/develop`, **only once those exist**.
- **A feature grows a defined shape.** It has a one or two line **intent**, a single **Done when:** line (the acceptance criteria seeds), and **checkbox steps**. A **not yet designed** feature has **one box**, its entry command: `/discovery "<feature>"` when product must settle business behavior, `/architect <slug>` when it `needs a decision` that is purely technical, else `/develop <slug>`, or `/audit` for standards & tooling. A product feature that went through `/discovery` keeps `Rules settled` and `Screens done` boxes before `Design it`, and its **Done when** points to its latest business rules version instead of restating them. **When its spec is captured, `/architect` fills in the built ready shape:** `Design it` (ticked) → `Build it: /develop <feature>` with **2 to 5 milestone sub items rolled up from the spec** → `Verify it: /check verify <feature>` → `Test it: /test <feature>`. **The atomic build tasks stay in the spec's `## Build plan`, never here**. The scope carries only the milestone rollup. The next step is always the first unticked box.

## Single file scope

```markdown
# Scope: <Product name>

<One or two plain sentences: what the product is and who it serves.>

**Build approach:** <Tracer Bullet | Skateboard | Facade | Journey> (<one-line principle>).
**Workflow:** <Prototype | Alpha | Beta | GA> (<what runs after develop, e.g. Beta = check verify, then test>). The project default level of rigor. `/architect` is the recommended first stop for a feature with a real decision, but skippable when you already know the build. Any feature can carry its own tag (e.g. `· GA`) to do more or less.

_These are recommendations to keep your build orderly, not requirements. Skip anything that does not fit: if you already know how to build a feature, use `/develop` and skip `/architect`. You decide when a feature is `done`._

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | Stack & architecture | Foundation | in-progress |
| 2 | Coding standards & tooling | Foundation | planned |
| 3 | Data model | Foundation | in-progress |
| 4 | Design system & UI foundation | Foundation | planned |
| 5 | Core standup loop | Slice 1 | planned |
| 6 | Daily reminders | Slice 2 | planned |
| … | … | … | … |

## Foundations

### 1. Stack & architecture · in-progress
Decide the stack and scaffold a runnable project so every later slice builds on real structure.
**Done when:** the stack is recorded in a spec and the empty scaffold boots locally and passes build.
- [x] Decide the stack (spec): `/architect stack & architecture`
- [x] Scaffold from the decision: `/develop stack & architecture`
- [ ] Smoke check it runs: `/test`
Folder `docs/features/stack/` · spec 0001 · code in `./`

### 2. Coding standards & tooling
Capture conventions, then install lint, format, and pre-commit enforcement from the real scaffolded project.
**Done when:** root `AGENTS.md` reflects the real stack, and lint/format/pre-commit run clean.
- [ ] Capture conventions + tooling choices: `/audit`
- [ ] Install the tooling: `/develop tooling`
- [ ] Check it runs clean: `/test`
Folder `docs/features/tooling/`

### 3. Data model · in-progress
<!-- DESIGNED: /architect captured spec 0002 and filled in the shape below. The 2 to 5 boxes under
     "Build it" are a ROLLUP of the spec's ## Build plan: every table, column, and policy lives in
     the spec, NOT here. This is what a feature looks like right after its spec is captured. -->
Core entities every feature builds on: users, teams, memberships, standup entries, template.
**Done when:** entities and relationships support later slices (reminders, templates, history) without a breaking migration.
- [x] Design it (spec): `/architect data model`
- [ ] Build it: `/develop data model`
   - [ ] Schema + constraints: tables, keys, unique/check, cascades (AC-1..6)
   - [ ] Row level security: per table policies + helpers (AC-7..9)
   - [ ] Apply migration, confirm live, generate types (AC-1..9)
- [ ] Verify it: `/check verify data model`
- [ ] Test it: `/test data model`
Folder `docs/features/data-model/` · spec 0002 · code (filled by /develop)

### 4. Design system & UI foundation · needs a decision
Visual language, layout primitives, and base components so the flows feel cohesive and accessible.
**Done when:** `docs/design/README.md` covers type/color/spacing/components (or points to the Penpot library `/penpot setup` read), and base components handle focus and keyboard.
- [ ] Design it (spec): `/architect design-system`
Folder `docs/features/design-system/`

## Slice 1: Core standup loop

### 5. Core standup loop
<!-- PRODUCT FEATURE: product settles its behavior first, so the entry command was /discovery.
     Rules settled ticks when the feature README says settled, Screens done when screens.md says done. -->
Sign in, create a team, submit today's update on the default template, read the team feed. Nothing else yet. This slice is the walking skeleton.
**Done when:** the business rules in `business-rules/v3.md` hold (RN-1..RN-12).
- [x] Rules settled: `/discovery core-standup-loop`
- [ ] Screens done: `/design core-standup-loop`
- [ ] Design it (spec): `/architect core-standup-loop`
Folder `docs/features/core-standup-loop/`

## Slice 2: Daily reminders

### 6. Daily reminders
Nudge members who have not submitted before a team cutoff, so daily standup becomes a habit.
**Done when:** unsubmitted members get a timezone aware reminder before cutoff, and submitters are not nagged.
- [ ] Settle the rules: `/discovery "daily reminders"`
Folder `docs/features/daily-reminders/`

## Deferred
Out of scope for the current build pass, kept so the plan stays honest.
- **Email invites**: invite teammates by email · needs a decision
- **Billing & plans**: free and paid tiers · needs a decision · GA
- **Chat integrations**: post standups to team chat · needs a decision
- **Product analytics**: measure signups and habit · needs a decision

## Legend

**The decision box.** Every feature carries exactly one, the subtask whose label ends with `(spec)`. Its wording varies (`Design it (spec)` normally, `Decide the stack (spec)` on Stack & architecture), so skills locate it by that `(spec)` suffix, never by an exact label. Every other box is an execution box and `/architect` never ticks one.

**Feature lifecycle**: the scope updates as a feature moves; each row is what it shows and who sets it:

| State | Set by | The feature shows |
|---|---|---|
| `planned` (product behavior to settle) | `/scope` | one box: `/discovery "<feature>"`; then `Rules settled`, `Screens done`, `Design it (spec)` |
| `planned` · needs a decision | `/scope` | one box: `Design it (spec): /architect <slug>` |
| `in-progress` (designed) | **`/architect` at spec capture** | `Design it` ticked; spec linked; `Build it: /develop <feature>` + **2 to 5 milestones**; the tier's closing boxes (`Verify it` Alpha+, `Test it` Beta+, `Review it` + `Document it` GA); any surfaced follow up enrolled |
| `in-progress` (building) | `/develop` | milestone sub boxes tick one by one; code pointer filled |
| `in-progress` (verified) | `/check verify` | `Build it` + milestones ticked; `Verify it` ticked |
| `done` | **you, when you decide it is** (any skill sets it when you say so); `/sync` reconciles | boxes you ran ticked, skipped ones marked skipped; the tier's last stage (`Prototype` → after `/develop`; `Alpha` → after `/check verify`; `Beta`/`GA` → after `/test`) is the suggested point to call it done; `/sync` captures conventions |

- **Next step** = the first unticked box (always a command or a tracked milestone).
- **Product boxes** `Rules settled` and `Screens done` are ticked by a bare `/scope` from the feature `README.md` (`settled`) and `screens.md` (`done`); `/discovery` and `/design` never write the scope.
- **needs a decision** = run `/architect` first; otherwise straight to `/develop` (or `/audit` for standards & tooling). The tag drops once the spec is captured.
- **Atomic build tasks live in the spec's `## Build plan`, not here**: the scope carries only the milestone rollup.
- **Status** `planned` → `in-progress` → `done`, plus `existing` (pre workflow) and `dropped` (descoped, kept for history).
- **Approach tag** beside a heading (e.g. `· Facade`) overrides the project default for that feature; no tag = inherits it.
- **Workflow tier tag** beside a heading (e.g. `· GA`, `· Prototype`) sets that one feature's rigor above or below the project default; no tag inherits the default. It decides the feature's check boxes and each skill's next suggestion.
- **Workflow** (header line) is the project default, what runs after `/develop`: **Prototype** = nothing (trust develop's own build time self check); **Alpha** = `/check verify`; **Beta** = `/check verify` then `/test`; **GA** = adds a fresh model `/check review` then `/document`. A feature built on an unratified decision (an `Assumed` spec) stays flagged, but that never blocks `done`.
- **Pointer line** (`folder docs/features/<slug>/ · spec <n> · code in <path>`): the folder from the start (specs live in its `specs/`), the spec link added by `/architect`, the code path by `/develop`.
```

## Brownfield enrollment

Already built features are enrolled **for context**, above the planned ones, with status `existing` (complete, no task list) or `in-progress` (partial, finish via `/develop`), each with a code pointer. They also appear in the At a glance table.

```markdown
### A. Auth · existing
Pre workflow auth: sign in, sessions, reset. code in `src/auth/`

### B. Product catalog · in-progress
Partial catalog; finish the remaining pieces via /develop. code in `src/catalog/`
```

`existing` is not `done`: it predates the workflow, so `/develop` and `/sync` leave it alone.

## Large product: epic split

When `scope.md` outgrows a comfortable scan (roughly a dozen plus features across clearly distinct areas), split by epic: **move `docs/scope.md` to `docs/scope/index.md`** (keep the At a glance table across all epics + a one line status rollup per epic, each linking its file), and **move each area's feature sections out into its own `docs/scope/<epic>.md`**. Promote **on demand**; don't split a small product early. File names are always **semantic** (`scope.md` / `index.md` / `<epic>.md`), never numbered. A monorepo or repo of repos keeps one scope for the product; each feature names the workspaces it touches (see `modes/plan-monorepo.md`).

## Completion report block

Lead with what the pass produced and the first step; the approach, tier, and full list are in the scope file itself (per `docs/conventions.md`). Template:

```
## /scope <plan | replan | add> Â· <product, one line>

**<N> features planned (<M> already on the scope, <K> deferred), build approach <name>, workflow <tier>.**
Next: /clear, then <the first unticked box, usually `/architect <first feature>`, or `/audit` if a brownfield repo has no root AGENTS.md>
Heads up: <a feature bumped to a higher tier, a `needs a decision` foundation, or a genuine risk>   (omit if none)
Scope written to <docs/scope.md>.
```

_Context hygiene: the scope, the specs, and `AGENTS.md` are the durable state, so the workflow hands off through files, not the chat. Advise `/clear` between units (after `/scope`, after each `/architect`, between features) and `/compact` mid unit if one run gets long. On Claude Code use `/clear` / `/compact`; use your agent's fresh session equivalent elsewhere._
