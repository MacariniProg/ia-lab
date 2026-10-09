# Project folder layout: complete it

**Fix:** the documented layout of a project using the skills shows only `meetings/`, `scope.md`, and `features/`. The skills also write `docs/design/`, `docs/reviews/`, `docs/releases/`, `docs/postmortems/`, `CHANGELOG.md`, and `test-preferences.json`.

## Where it goes

The layout lived in the old plan file, now deleted. *Proposal:* the root `README.md`, next to the skills table, since it describes what any project using the skills will have. Settle `test-preferences.json`'s path first: check where `skills/test/` reads and writes it.

## The layout, completed

```
<project>/
├── AGENTS.md                            audit (root + one per area or workspace)
├── CHANGELOG.md                         document
├── test-preferences.json                test (path to confirm)
└── docs/
    ├── meetings/<YYYY-MM-DD>-<topic>/   transcribe (routing section of minutes.md: discovery)
    ├── meetings/glossary.md             transcribe
    ├── scope.md                         scope: one row per feature, links to its folder
    ├── design/                          penpot setup: README.md, components.md, shell.js
    ├── features/<slug>/                 discovery files, business rules versions, screens.md (design), specs/ (architect), verify.md (check)
    ├── reviews/                         check review
    ├── releases/                        document
    └── postmortems/                     document
```

A cross cutting decision (for example how evidence files are stored) becomes a feature of its own, so specs have one home. `scope.md` splits into `docs/scope/index.md` plus one file per area only when it outgrows a scan.

## Done when

Every path a skill writes appears in the layout, checked against each `SKILL.md`.
