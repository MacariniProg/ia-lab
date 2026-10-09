# jsmastery pieces not ported

**Decide:** whether to bring any of these from [jsmastery-pro/skills](https://github.com/jsmastery-pro/skills) (commit `43b69e4`, MIT) into this repo. They were left out when the nine skills were adapted. `analyze-token-usage.mjs` was ported on 2026-10-09 (`npm run tokens`).

## Pieces

1. **`check-portability.mjs`:** size budgets and a portability lint for skills. Nothing here checks skill size today; `scripts/check-house-rules.sh` only checks the shared rules block.
2. **`docs/conventions.md`:** their guide for writing skills. This repo has no written authoring guide; the skeleton and the house rules block are the only conventions.

## Done when

Each piece is either ported (into `scripts/` or a guide) or dropped with a one line reason here.
