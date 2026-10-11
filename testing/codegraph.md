# CodeGraph

Applied: the house rules "Exploring code" line in every skill, `/audit` sets up one index and one MCP (Model Context Protocol) server per code repo (`skills/audit/modes/codegraph.md`), and `/start` flags a code repo with no index. Only the parts below were never run end to end.

## Background (tested with codegraph 0.9.6)

- One index per code repo, never one at the project repo root: CodeGraph indexes what `git ls-files` sees, and the project repo ignores its code repos.
- `codegraph serve --mcp --path <code repo>` keeps the index current with a file watcher (a new function showed up in search 4.5 seconds later), so no sync step is needed.
- The index is per machine (`.codegraph/` in each code repo's `.gitignore`). A fresh clone has the servers in `.mcp.json` but no index, and every call fails with `No CodeGraph project is loaded for this session ... The index is likely fine`.

## Checks

1. **`/audit` on a repo of repos.** On a project with `<project>-web/` and `<project>-api/` and no `.codegraph/`, run `/audit`. Passes when each code repo gets an index and a `.codegraph/` line in its `.gitignore`, `.mcp.json` gets `codegraph-<folder>` per code repo (other servers untouched), `.claude/settings.json` allows `mcp__codegraph-<folder>`, `AGENTS.md` lists them on `MCP servers:`, and the project repo root gets no index. After a restart, `codegraph_status` answers on both servers.
2. **Fresh clone fallback.** Clone the same project into a new folder (no `.codegraph/`), start a session, and ask a question about the code. Passes when the agent hits the "no project is loaded" error once, switches to `scout` or Grep for the rest of the session, and tells you to run `codegraph init -i <code repo>`.
3. **`/start` heads up.** In that fresh clone, run `/start`. Passes when the heads up line names each folder without an index and the command. Then index one repo and run `/start` again: only the other one is named. Watch for a false alarm: the Glob tool may skip `.codegraph/` because git ignores it; if so, `/start` needs another way to check the file.
4. **Proof that it saves reads.** On a real project with web and api, ask the same questions (where is X, how does X reach Y, what breaks if X changes) in two sessions, one with the servers and one without, and compare tool calls and tokens with `npm run tokens`. Passes when the CodeGraph session uses clearly fewer reads. Fails → remove the "Exploring code" line from the house rules and the setup from `/audit`.
5. **`codegraph affected` in `/test`.** Run `codegraph affected <changed files>` on a code repo with tests and compare its list with the tests that really cover the change. Passes when the list is right; then add it to `/test` to pick which existing tests to run.
