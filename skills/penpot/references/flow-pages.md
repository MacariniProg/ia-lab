# Flow pages

How a screen file is organized, so anyone opening it reads it the same way. Words on the canvas (legend, flow, state names) are in the docs language; `S.cfg.words` holds them.

```
<Product> · <feature>            file, linked to the library, tokens copied, no local components
  00 <Legend>                    page: one board, the legend
  01 <flow>                      page: one board at 0,0
    <Flow> 01 — <screen or dialog>
      Header                     "<Flow> 01" · title · one line: what the user does there
      Screens                    row: default state first, the other states to its right
        Screen                   flow tag + exact frame name, the frame below
  02 <flow>
```

## What a flow is

- **A screen or a dialog, with its states.** A dialog opened from a screen is a flow of its own, right after that screen.
- **A wizard is one flow:** the steps in sequence, each step's states right after it.
- **A screen with no states** is still a flow, of one frame.

## Frames and states

- **Name:** `<Screen> — <state>` (e.g. `Appointments — empty`); the default state is just `<Screen>`.
- **Order in the row:** default → loading → error → empty → success. Dialogs with an action: dialog → saving → save error.
- **Kinds** (the flow tag of each frame): default, dialog, loading, error, success, empty. The legend shows each with its meaning, in the docs language.
- **Validate drafts** (`/design validate`) get their own pages, prefixed (`Validation v1 · 01 <flow>`), so final pages are never mixed with drafts.

## Board specs

| Element | Spec |
|---|---|
| Legend board | title (`S.cfg.typo.display`), description (`body`, muted), the row of kinds with meanings |
| Flow board | surface fill, border 2, padding 80, gap 64; numbered in two digits, in the product's navigation order, matching the page |
| Screens row | gap 120 |
| Frame label | flow tag + frame name (`S.cfg.typo.title`), 24 above the frame; an optional note under it (`body`, muted), e.g. the rules the frame shows (`RN-07 · P-1`) |

Helpers: `S.legend`, `S.flow`, then `S.restack()` last (heights settle only after layout and `S.fitTexts`).
