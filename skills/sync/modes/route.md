# Sync mode: route

Trigger: `/sync route <file or folder>` for knowledge written before the project followed the standard (an Obsidian vault in `docs/vault/`, a docs folder outside the layout, a wiki export), or `/sync route "<one fact>"` for a fact learned in a session with no obvious home. It moves each piece of knowledge to the home the standard gives it, checked against the code. The default run's Steps 1 to 4 do not apply.

## Homes

There is no catch all folder: every fact goes to one of these, or stays out.

| Content | Home | Template from |
|---|---|---|
| Rules and terms of the area, true even without the product | `docs/domain/` (`RD-n`, terms) | `/discovery` (`templates/domain.md`) |
| What the product does in a feature, product decisions | `docs/features/<slug>/business-rules/v<n>.md` (`RN-n`) | `/discovery` |
| Open questions, known gaps | open points `P-n` of the feature | `/discovery` |
| Sources and references | the source of each `RD-n`, the feature's `research.md` | `/discovery` |
| Technical decisions | `docs/features/<slug>/specs/`; a cross cutting decision is a feature of its own | `/architect` |
| Phases, roadmap, what comes next | `docs/scope.md` | `/scope` |
| Meetings | `docs/meetings/<YYYY-MM-DD>-<topic>/` | `/transcribe` |
| Stack, commands, conventions, agent setup of an app | that code repo's `AGENTS.md` | `/audit` |
| What each code repo owns, how they connect, pipelines across features | root `AGENTS.md`, `## Code repos` (a pipeline gets a feature with a spec, linked there) | `/audit` |
| One feature end to end | split across its feature folder: business rules, screens, spec | each owner above |
| Counts, migration numbers, test totals, routes, values the code holds, whether a function exists | kept out: the code or git answers it; name the file or command | none |
| History: changelogs, session notes, "resolved this session" | kept out: git keeps it; a next step still open becomes a `P-n` or a scope row | none |

## Steps

1. **Plan.** List every note in the source. Write `docs/routing-<source folder>.md`, one row per note: note, home, owner, language, status (`planned`). A note doing several jobs gets one row per part. A part with no home in the table: ask (2 to 4 options, the closest home recommended, `keep it out` among them). Show the plan and ask: `Route it` (recommended) · `Change rows` · `Stop`. The plan is the state: a rerun reads it and continues from the first `planned` row.
2. **Check against the code.** Before copying a fact about the software, check it in each code repo it names: CodeGraph when its tools are loaded, else Grep or `scout` with the code repo as the path (a search from the project root skips the code repos its `.gitignore` lists). A fact the code disproves is not copied; it goes in the report with what the code shows. A fact the code cannot settle (a business rule, the why of a decision) is copied with its source.
3. **Move, one note at a time.** Write each part into its home with the owner's template (read it from that skill's folder); add to an existing file surgically, never rewrite what is there, and continue its numbering (next `RD-n`, `RN-n`, `P-n`). A document that moves whole goes through `git mv`. Mark the row `moved`, or `kept out` with the file or command that answers it, right after each note, so a stop loses nothing. From then on the owner skill keeps that file.
4. **Language.** A document received from the product team (a spreadsheet, a meeting record, a PDF, a text they wrote) moves whole in the language it came in, whatever `Docs language:` says. What this mode writes in its own words (a rule, a term, a line) follows `Docs language:`; `AGENTS.md` lines are always English. Translate only when the team asks.
5. **Finish.** When no row is `planned`, ask before each removal: the source folder (`Delete it` recommended: git keeps it), and whatever only served it (a search command such as `/vault-search`, its index, the `AGENTS.md` lines that point to it). Then delete the plan file.

**One fact** (`/sync route "<fact>"`): Steps 2 and 3 for that fact, no plan file. Name its home in one line before writing.

## Report

```
## /sync route · <source> · <moved> of <total> notes

**Moved: <count per home>. Kept out: <count> (code or git answers them).**
Heads up (need you):
- Code disproves, not copied: <note>: says <X>, the code shows <Y> (`<code repo>/<path>:<line>`)
- No home, decide: <note part>
- Owner to review: <home> (`/<skill>`), written from routing
```

Drop any Heads up bullet with no items.
