# CodeGraph by default

**Decide:** whether the skills use CodeGraph by default to explore code, and in which steps.

## Context

- A client project has a `codegraph` skill: a semantic index of the code, queried through tools like `codegraph_search` ("where is X?"), `codegraph_context` ("how does X work?"), and `codegraph_trace` ("how does X reach Y?"). It covers that project's web and api repos in one graph.
- Today the skills explore with the `scout` subagent (Read, Grep, Glob) or inline reads.

## Questions

1. **What it is.** Which CodeGraph that skill uses, how the index is built and kept current, and what it costs per project.
2. **Where.** Candidate steps: the read only exploration step in `audit`, `architect`, `develop`, and `debug`; possibly `check review` to find callers of a changed function.
3. **Default or optional.** *Proposal:* use it when its tools are available, fall back to `scout` and grep when they are not, so every skill still works installed alone.
4. **Where the instruction lives.** In each skill's exploration step, in the `scout` subagent only, or in the project's `AGENTS.md`.
5. **Repo of repos.** One graph for all child repos, or one per repo.

## Done when

The chosen skills name CodeGraph in their exploration step with the fallback, and one real run showed it saved reads compared with grep.
