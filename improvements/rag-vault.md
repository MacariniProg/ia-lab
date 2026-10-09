# RAG with a vault

**Study:** whether the skills should search a knowledge base through RAG (Retrieval Augmented Generation), kept in a vault or something like it, instead of reading files one by one. Not ready to decide; needs study first.

## Context

- Today every skill reads its context straight from files (`docs/`, `AGENTS.md`), and exploration goes through the `scout` subagent or grep. As `docs/` grows (meetings, business rules, specs), reading whole files costs more tokens.
- A vault (for example an Obsidian vault of notes) plus a RAG index could let a skill ask "what did product say about cancellations?" and get the relevant passages only.

## Study material

- [How To Build A Production Ready RAG AI, My Full AI Coding Workflow](https://www.youtube.com/watch?v=1mvlBz6pj1I&t=114s) (Web Dev Simplified)

## Field notes: two real vaults (checked 2026-10-09)

Two client projects keep an Obsidian vault in `docs/vault/`. Their `AGENTS.md` names it the owner of domain knowledge, and a `/vault-search` command reads the index, then greps. There is no RAG: agents read notes whole or grep them (project B's decision on CodeGraph says code goes through the graph, Markdown through Read or Grep).

| | Project A | Project B |
|---|---|---|
| Size | 8 notes, about 3,300 words | 63 notes, about 47,500 words |
| Layout | index (map of content), systems, concepts, flows, one decision | the same, plus numbered notes at the root, decisions, gaps, risks, open questions, rules, references with sources, templates, a changelog |
| Upkeep | last update a month before the check; the work since then is missing | 12 commits in two months, active |
| Main problem | small and stale | large; notes turned into a session diary |

What went wrong, checked against each project's code:

- **Facts that contradict the code.** A says a function is not on the main branch; it is, with callers in four apps. A also keeps an old spelling of a route, three different test totals, and an agent count off by one. B's backend note lists 6 apps and misses one created since, cites migration numbers two months behind, and gives at least 8 different test totals.
- **Numbers go stale first.** Test totals, migration numbers, agent counts, and catalog values that also live in migrations change with almost every commit.
- **History mixed with reference.** B's open gaps note (about 5,000 words) is a dated log since July, with "resolved this session" sections still in it. One decision note grew to 3,800 words and 16 sections of validation and publish results. The same fact sits in the changelog, the gaps note, and the decision.
- **One note doing four jobs.** A's concept note holds the glossary, the MVP (Minimum Viable Product) contract, catalog values, and product decisions; its decisions folder has a single note.
- **Index and links.** B has 2 decisions missing from the index and 7 notes no other note links to (some over 2,000 words), plus empty indexes for rules and phases. A links to a file outside the vault and to a plan in someone's home folder.
- **Nothing checks upkeep.** Both say "update the vault when you learn something new". B even lists the drift as a risk, whose fix points to a task file that does not exist.
- **Mixed languages.** B: 42 notes in Portuguese, 21 in English.

What this means for the study:

1. **Retrieval does not fix stale notes.** A RAG index over these vaults would return contradicting passages faster. Keeping notes current comes before any index.
2. **Keep out what code or git already answers** (counts, migration heads, routes, whether a function exists). Link the file or the command instead.
3. **Separate history from reference.** History goes to a changelog or git; a note holds the current rule and its why. Retrieval over a diary returns old states as if they were current.
4. **Tie upkeep to a step of the flow,** as `/sync` does here, and check it with a script: orphan notes, broken links, and notes missing from the index are all mechanical checks.
5. **Size threshold.** At A's size an index plus grep is enough. B's size is where reading whole notes starts to cost; measure it with `npm run tokens` before building anything.
6. **Compare with what exists.** `docs/features/<slug>/` already splits knowledge by type (business rules versions, screens, specs) with a status; a vault should only be added for what that layout does not cover.

## Decided so far (2026-10-09)

- **Per project, now:** the vault is `docs/domain/` (rules `RD-n` and terms of the area, one owner, a source per rule), written by `/discovery` step 7 and read by `/discovery` before it asks or researches. Format in `skills/discovery/templates/domain.md`, example in `docs/domain/`. Plain files, read whole or grepped; no index.
- **Later, company wide:** a separate repo holding the domains shared across projects, split by domain (not by project, so two products in the same area share one set of rules), with a RAG index built from its Markdown and never edited by hand. A project points to it from `AGENTS.md`; until then `docs/domain/` is the source. Moving a project's `docs/domain/` there should only change that pointer.

## Questions


1. **What RAG is here.** How documents are split, embedded, stored, and retrieved; which pieces run locally.
2. **Moving out.** When a domain is shared by two projects: how a project's `docs/domain/` moves to the company repo, how `RD-n` numbers stay stable, and who owns it there.
3. **Where it helps.** Candidate skills: `discovery` (past meetings and rules), `architect` and `develop` (specs, conventions), `start` (status across features).
4. **Overlap.** How this relates to [codegraph-default.md](codegraph-default.md), which indexes code the same way this would index docs.

## Done when

The study is written down and this file turns into a decision (build it, and where) or is deleted.
