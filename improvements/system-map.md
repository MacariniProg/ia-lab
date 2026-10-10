# System map

**Decide:** where a project keeps how its code repos connect (which app calls which, shared contracts, background pipelines), the knowledge the client vaults hold in `systems/` and `flows/`. Today no file in the standard owns it.

## Field notes: what those notes hold (checked 2026-10-09)

15 notes, about 5,400 words: 5 system and 1 flow note in project A, 5 system and 5 flow notes in project B. Sorted by where each part would go in the standard:

| Content | Example | Home in the standard |
|---|---|---|
| Stack, layers, agent hierarchy, test commands | stack tables, `senior-backend` and its 7 sub agents, the full test suite command | the code repo's `AGENTS.md` (`/audit`) |
| What each app owns | "REST API for farm financial modeling" | the project `AGENTS.md` (code repos list) |
| The project repo itself | "Orchestrator" notes: agents, commands, hooks | the project `AGENTS.md` |
| Request lifecycle | client sends a request, view, service, serializer, client state | conventions in each code repo's `AGENTS.md` |
| A feature described end to end | farm creation: purpose, files, user flow, API contract, product decisions, next steps | `features/<slug>/` (business rules, screens, spec) |
| A cross cutting mechanism | recompute pipeline: input saved, project marked stale, debounced task, ready or error; completeness chain | a feature of its own with a spec, as the README says |
| External data sources, removed sources with reasons | 7 live sources, 7 removed and why | the spec of that integration feature; the reasons are its decisions |
| Who owns the area's spreadsheets | "Business specialist" note | `docs/domain/README.md` (owner, sources) |
| Values the code already holds | schedule times, fallback prices, model names, file paths | kept out: link the file |
| History | "not on the main branch", archived task links, "next steps" | git, `docs/scope.md`, open points `P-n` |

The same faults as the rest of the vaults (see [rag-vault.md](rag-vault.md)): the agent hierarchy is repeated in two notes per project, a note says a function is not on the main branch when it is, and the longest flow note (about 2,200 words) mixes source precedence, hardcoded prices, missing data, and scraping ideas.

What has no home: a short picture of the code repos together. Which app calls which, through what contract (for example OpenAPI schema to generated client), and which background pipelines cross many features. That is a few lines per project, not a folder.

## Proposal

*Proposal, not a decision.*

- **No `docs/system/` folder.** Almost everything in those notes already has an owner; a folder would invite the same copies of stack and history.
- **A "Code repos" section in the project `AGENTS.md`:** one line per code repo (what it owns), how they connect (calls, contracts, shared database or queue), and one link per cross cutting mechanism to the feature whose spec owns it. Under about 30 lines, since `AGENTS.md` loads in every session.
- **Owners:** `/audit` writes it; `/sync` updates it when a merge adds a code repo, a contract, or a pipeline; `/architect` links a new cross cutting spec there.

## Questions

1. **Audit does not write the project `AGENTS.md` yet.** The README says it does ("which code repos exist, what each owns, Docs language"), but `skills/audit` only knows one repo. This ties to [repo-of-repos-paths.md](repo-of-repos-paths.md).
2. **Diagram or list.** A small text diagram reads well in the terminal; a list is easier for `/sync` to edit one line of.
3. **Threshold.** When the section outgrows about 30 lines, does it move to `docs/system.md`, the way `scope.md` splits?

## Done when

`/audit` writes the section on a project with two code repos, `/sync` keeps it current after a merge, and this file is deleted.
