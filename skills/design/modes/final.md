# Mode: final (complete design)

The design development builds from: every screen in every state, every permission difference, every edge case the rules imply. Starts from the latest business rules version and every `D-n` in `screens.md`.

1. **Screens.** The validated flows with the `D-n` decisions applied, plus what validate left out: dialogs for each action, confirmations for destructive or irreversible actions, the screens of each entity state.
2. **Existing screens** (optional input). A screen that already exists in the code or in a design file: read it first (code read only; delegate the search to a read only subagent when the agent can). Text comes from the code's translation files (i18n) when the screen exists, exactly; else from the rules, as in validate. Draw only what changes; the row says `changed: <what>` and the frame note names the screen it replaces. Where the existing screen contradicts a rule, add a row to the Differences section.
3. **State matrix.** For each screen, the states `references/states.md` requires for each data source and action on it. Every cell is ✓ (drawn) or `n/a (<why>)`; no empty cell.
4. **Business states.** When the rules have states (section 6), each state the user can reach is a frame of the screens it changes (e.g. `Consulta — aguardando confirmação`), with what each role can do there.
5. **Permissions.** From who does what (section 7): a role that sees a different screen (fewer actions, read only, no access) gets its own frame or a `n/a (same as <role>)`.
6. **Edge cases.** Read each rule for its limits and say where it shows:
   - **boundaries:** "never", "only", "at most", "one per" → what the screen does at the limit (disabled action, message, hidden option);
   - **partial data:** some items missing or excluded → how the partial result reads;
   - **locked or finished items:** what can no longer be edited, and how the screen says so;
   - **dependencies on other features:** what shows while the other feature has no data;
   - **long and many:** long names, many items, one item, zero items.
   Each edge case is a row: case, rule, the frame that shows it (or `n/a (<why>)`).
7. **Pages.** One per flow, `NN <flow>`, no prefix; the validate pages stay as they are.
