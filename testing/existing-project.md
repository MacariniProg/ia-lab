# Existing project

Applied: the README steps for an existing project, `/audit` on a repo of repos (preflight signal, `## Code repos`, one `AGENTS.md` per code repo from a full scan), stale lines and the old CodeGraph setup asked one by one, servers in `opencode.json`, and `/sync route`. The pilot is GAIA, on a branch of its project repo (decisions in git history of `improvements/existing-project-setup.md`).

## Checks

1. **Preflight on a repo of repos.** On GAIA, move the root `AGENTS.md` aside on the branch and run `/audit`. Passes when it routes to the whole repo scan (Phase 2), not greenfield or Phase 0, and names both code repos. Put `AGENTS.md` back before check 2.
2. **Gap fill on GAIA.** Run `/audit` with the root `AGENTS.md` in place. Passes when it proposes `## Code repos` with one line per code repo, writes an `AGENTS.md` per code repo from a full scan, lists rule 12 as `STALE`, and asks before each removal of the old CodeGraph setup: the committed root `.codegraph/` (`git rm --cached`, then deleted, since the root indexes no code), the `codegraph-global-sync.sh` script and its command, the shadow folder in `$TMPDIR`, and the old servers. Nothing goes without its own yes.
3. **opencode servers.** After check 2, `opencode.json` holds `codegraph-<folder>` per code repo under `mcp` (`"type": "local"`, `"command"` as an array), every other key untouched, and an opencode session answers `codegraph_status` on each.
4. **Stale lines on ATYHA.** Run `/audit` on ATYHA. Passes when "CodeGraph first" (with no server declared) and the `/home/fefo` paths come up as `STALE`, each asked on its own.
5. **Route the vault.** On GAIA, run `/sync route docs/vault`. Passes when the plan file lists every note with a home, a fact the code disproves (an old test total, a function said to be missing) is reported and not copied, Portuguese product documents keep their language, a stop and rerun continues from the first `planned` row, and at the end it asks before deleting `docs/vault/` and `/vault-search`.
6. **One fact.** Run `/sync route "<a fact from a session>"`. Passes when it names one home in one line before writing and adds only to that file.
7. **Old skills gone.** After the merge, no skill or command from before (`grill-me`, `to-spec`, `/vault-search`, the `codegraph` skill, the sync command) is left beside the new ones, and the team was told before the merge.
