# Code index (CodeGraph)

Read this from the greenfield (after scaffold), whole repo, and gap fill modes, before writing `AGENTS.md`. It gives every later skill a code index to explore with: [CodeGraph](https://www.npmjs.com/package/@colbymchenry/codegraph), a local index of symbols and calls served through an MCP (Model Context Protocol) server whose file watcher keeps it current as code changes. Every step skips what is already in place, so a rerun only fills gaps.

## Step 1: Find the code repos

A code repo is a git root that holds source code:

- **Repo of repos** (the project repo lists child folders with their own `.git` in its `.gitignore`): each such child is a code repo. The project repo itself is not one; it holds docs and the AI layer.
- **Single repo** (code at the project root): the root is the one code repo.

## Step 2: Check the CLI

Run `codegraph --version`. Not found → skip Steps 3 to 5, write `CodeGraph: not installed (npm i -g @colbymchenry/codegraph, then run /audit again)` in the report, and stop here. Never install it yourself: it is a global install on the engineer's machine.

## Step 3: Index each code repo

For each code repo without `.codegraph/codegraph.db`, run `codegraph init -i <code repo>` (a large repo takes minutes; say so before starting). Then make sure that repo's `.gitignore` has a `.codegraph/` line; add it if missing. The index is per machine and never committed.

Never index the project repo root in a repo of repos: git hides the code repos from it, so that index would hold only the AI layer's scripts.

## Step 4: Declare one server per code repo

Edit `.mcp.json` at the project root (create it if missing), adding only the servers that are missing and keeping every other server as it is:

- Repo of repos: one server per code repo, named `codegraph-<folder>`, with `"command": "codegraph", "args": ["serve", "--mcp", "--path", "<folder>"]`.
- Single repo: one server named `codegraph`, with `"args": ["serve", "--mcp"]`.

On Claude Code, also add each server to `permissions.allow` in `.claude/settings.json` as `mcp__<server name>` (its tools only read the index), so the skills can query it without a prompt per call.

## Step 5: Record

Carry the servers into the `MCP servers:` line of the root `AGENTS.md` `## Agent skills` section, each with the folder it indexes: `MCP servers: codegraph-<folder> (<folder>/, connected)`. Tell the engineer to restart the session (and approve the project servers when asked) so the tools load; until then the skills fall back to `scout` and Grep.
