# How an existing project gets the ecosystem

**Decided and applied:** how the skills enter a project that already has code, docs, and maybe its own skills. The steps are in the README ("Getting started"); what is left is the GAIA pilot in [testing/existing-project.md](../testing/existing-project.md). Delete this file once it is committed (git keeps the reasoning).

## Context

- Install works as in [new-project-setup.md](new-project-setup.md); decide both together. Its subagents question (3) and [force-ponytail.md](force-ponytail.md) apply here the same way.
- A project may be a repo of repos (`web/` and `api/` as separate git repos under a root that holds the AI layer). The house rules say git runs per root, but most skill steps still assume one root and one stack; see [repo-of-repos.md](repo-of-repos.md).
- **Was blocked by repo of repos,** now fixed in `/audit`: its preflight detects the shape and reads the code repos' history and manifests (causes 3 and 4 in [repo-of-repos.md](repo-of-repos.md)), and it writes the `## Code repos` list in the project `AGENTS.md` ([system-map.md](system-map.md)).
- The knowledge the two company projects already keep is mapped in other files: each vault folder to its home in the standard ([rag-vault.md](rag-vault.md), Proposal), rules every feature obeys, roles, and source files ([product-layer.md](product-layer.md)), and how the code repos connect ([system-map.md](system-map.md)).
- CodeGraph in the two company projects, to replace when each adopts the standard (target: `/audit` adds one `codegraph-<folder>` server per code repo):
  - **GAIA** rsyncs both code repos into a shadow folder in `$TMPDIR`, serves that copy, makes the agent run `.opencode/bin/codegraph-global-sync.sh` after every code change (`AGENTS.md` rule 12), and commits the 21 MB root database (61 commits, 43 MB pack).
  - **ATYHA** has a setup that does not run: no `codegraph` server in `.mcp.json` or `opencode.json` while `AGENTS.md` says "CodeGraph first", a near empty snapshot from August 3, no index for `atyha-web`, `stat -c` (Linux only) in the script, and `/home/fefo` paths in `AGENTS.md`.
- opencode (checked on its docs): it loads skills from `.opencode/skills/`, `.claude/skills/`, and `.agents/skills/`, so the installed skills need no extra copy. MCP (Model Context Protocol) servers live only under the `mcp` key of `opencode.json` (`"type": "local"`, `"command"` as an array); the docs do not say it reads `.mcp.json`.

## Decisions

1. **First run.** Install, then `/audit` (it writes `AGENTS.md` and removes what is stale, decision 6), then `/scope` with no argument to enroll what exists, then `/sync` routing to move the vault and other docs (decisions 3 and 4).
2. **Skills it already has.** List every skill and command the project has (Matt Pocock skills such as `grill-me`, `to-questionnaire`, `wayfinder`, `to-spec`; `/vault-search`; the `codegraph` skill; opencode commands) and name the skill of the standard that replaces each one. Those with a counterpart are removed. For those without one, the team picks one by one which stay and which are deleted.
3. **Knowledge already written.** The vault in `docs/vault/` moves note by note through the `/sync` routing mode that [rag-vault.md](rag-vault.md) proposes, written before the pilot: it follows the vault table in that file, checks each fact against the code before copying it, leaves out what code or git answers (counts, migration numbers, whether a function exists), and sends history to git, not to `docs/`. `docs/vault/` and `/vault-search` are deleted when done.
4. **Folders that differ.** Other docs outside the layout go through the same `/sync` routing as the vault: it proposes where each file belongs, checks it against the code, and the old folder is deleted at the end.
5. **Features already built.** No backfill. The scope row marks the feature `done` with its code path; `docs/features/<slug>/` is created the first time the feature changes, with `/discovery` reading the code to write v1.
6. **Stale content.** `/audit` lists what it finds stale and asks before removing each item: lines in `AGENTS.md` or `CLAUDE.md` (GAIA rule 12, ATYHA "CodeGraph first", `/home/fefo` paths) and the old CodeGraph setup (a committed `.codegraph/` through `git rm --cached`, the sync script and its command, the shadow folder, old servers in `.mcp.json` and `opencode.json`). It still never removes curated content without asking. The old `codegraph` skill goes through decision 2.
7. **Project not in the shape.** Split a project with code and docs in one repo: the current repo becomes the code repo and keeps its git history; a new project repo starts with the docs moved out of it and clones the code repo inside.
8. **Other agents.** When the project has `opencode.json` or `.opencode/`, `/audit` writes each `codegraph-<folder>` server there too, in the opencode format, next to `.mcp.json`. Skills need nothing extra.
9. **Docs language.** `Docs language: English` for what the skills write. Documents received from the product team stay in the language they came in (Portuguese today), also after `/sync` moves them; a document is translated only when the team asks for it.
10. **Pilot and transition.** GAIA goes first. The change happens on a branch of the project repo, the team hears about it before the merge, and the old skills and commands are removed in the same change, so the two setups never run side by side.
11. **Code repos list** (2026-10-12): a list, not a diagram, in `## Code repos` of the project `AGENTS.md`. **First audit depth:** a full scan of each code repo on an existing project.

## Applied (2026-10-12)

- `audit`: repo of repos signal in preflight (`SKILL.md`), `## Code repos` and per code repo `AGENTS.md` (`references/agent-prompt.md`), stale lines asked one by one (`modes/gapfill.md`, finding (e)), old CodeGraph setup (`modes/codegraph.md` Step 1b), servers in `opencode.json` (Step 4).
- `sync`: `route` mode (`modes/route.md`), and a line in `## Code repos` when a change adds a code repo, contract, or pipeline.
- README: the steps for an existing project.
