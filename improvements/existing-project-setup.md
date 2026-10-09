# How an existing project gets the ecosystem

**Decide:** how the skills enter a project that already has code, docs, and maybe its own skills.

## Context

- Install works as in [new-project-setup.md](new-project-setup.md); decide both together.
- `/audit` writes the `AGENTS.md` context files every other skill reads. On an existing project it is the first skill to run, and it should be discussed in detail together with this decision.
- A project may be a repo of repos (`web/` and `api/` as separate git repos under a root that holds the AI layer). Every skill already resolves the git root per workspace.

## Questions

1. **First run.** *Proposal:* install, then `/audit` to write `AGENTS.md`, then `/scope` with no argument to enroll what exists.
2. **Skills it already has.** Existing projects carry Matt Pocock skills (`grill-me`, `to-questionnaire`, `wayfinder`, `to-spec`, …) that overlap with these. Keep some, or replace them all?
3. **Folders that differ.** What happens when the project's docs do not match the expected layout (see [project-folder-layout.md](project-folder-layout.md)): move them, map them in `AGENTS.md`, or leave them and let the skills write alongside.
4. **Existing `AGENTS.md` or `CLAUDE.md`.** `audit` adds only what is missing and never overwrites curated content; check that holds on a real project.

## Done when

The README describes the steps for an existing project, and one real existing project went through them.
