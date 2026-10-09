# Handoff table: add `penpot`

**Fix:** the "how skills hand off" table has no row for `penpot`. It writes `docs/design/` (`README.md`, `components.md`, optional `shell.js`), which `design`, `develop`, and `check verify` read.

## Where it goes

The table lived in the old plan file, now deleted. *Proposal:* add a "Read by" column to the Skills table in the root `README.md`, which already has the "Writes" column and a `penpot` row.

## The table as it was, with the fix

| Writes | What | Read by |
|---|---|---|
| `transcribe` | transcript + meeting minutes | `discovery` |
| `discovery` | routing section of each meeting's `minutes.md`; `business-rules/v<n>.md`: business rules (`RN-n`, Regra de Negócio) and open points (`P-n`, Pendência) | `scope`, `design`, `architect` |
| `scope` | `docs/scope.md`: features, order, status, workflow tier, each feature's entry command | `architect`, `develop`, `start` |
| `audit` | `AGENTS.md` files | every skill |
| **`penpot`** | **`docs/design/`: tool, files, design system rules, tokens, naming; `components.md`; optional `shell.js`** | **`design`, `develop`, `check verify`** |
| `design` | `screens.md` + screens in Penpot; `validate` output goes to the screen validation meeting | `transcribe` → `discovery` (validate), `architect`, `develop`, `check verify` |
| `architect` | `specs/NNNN-*.md` in the feature folder: decision, acceptance criteria (`AC-n`, each citing its `RN-n`), build plan | `develop`, `check`, `test` |
| `develop` | code + spec status + scope boxes; `Assumed` spec when you build before deciding | `check`, `test`, `sync` |
| `check` | `verify.md` beside the spec; review findings in `docs/reviews/` | you |
| `test` | tests tagged with `AC-n`; `test-preferences.json` | `sync` |
| `document` | PR body, `CHANGELOG.md`, `docs/releases/`, `docs/postmortems/` | you |
| `sync` | updated `AGENTS.md`, scope, spec status | every skill, next run |
| `debug` | fix + regression test; a bad decision goes back to `architect`, a wrong rule to `discovery` | `test` |

`start` reads all of the above.

## Done when

The README shows who reads each skill's output, `penpot` included, and the readers listed match what each `SKILL.md` says it reads.
