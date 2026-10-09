# States

Everything that depends on the network has its states drawn. A screen that loads data, or an action that calls the server, is not done in the design without them. The project's own state rules (in `docs/design/README.md` or where it links) win over this file.

## What needs which states

| Source | Required states |
|---|---|
| Data loading (list, table, detail, card, chart, select with remote options, map) | loading · with data · empty · error |
| User action that calls the server (save, create, delete, send, calculate) | idle · running · error; success when there is visible feedback |
| Form field | normal · validation error |
| Screen a role cannot use | no permission (or `n/a`, when the role never reaches it) |
| Item that cannot change (locked, finished, archived) | read only, saying why |

## Loading

The loading state has the **shape of the content** that is coming: skeleton for content, spinner only for an action or an area with no known shape.

| Where | How |
|---|---|
| Action button | the button's loading state (spinner + its text); the form's other controls disabled; a dialog stays open |
| List or card grid | skeleton cards in the same grid and size as the real ones, one typical page of them; the list header, search, and actions stay visible |
| Table | real header + 5 to 8 skeleton rows (one bar per cell, varied widths); toolbar visible, pagination disabled |
| Detail page | title, badges, and key numbers in skeleton; navigation and tabs stay real |
| Isolated card or chart | the real card with its title; only the value or plot becomes skeleton |
| Select with remote options | trigger disabled with a loading text |
| Whole page with no known shape | centered spinner with "Loading…": the last resort |

Never a lone spinner where a list or table has a known shape.

## Error

The error shows **where the failure happened**, says what happened, and offers the way out (try again, fix, go back). A local failure never takes the whole page down.

| Where | How |
|---|---|
| List, grid, or table that failed to load | an error state in place of the content: icon, message, "Try again"; header, search, and filters stay |
| Isolated card or chart | a compact error state inside the card; the rest of the page as normal |
| Whole page (not found, no permission) | a centered error state with the message and "Go back" |
| Failed action (save, create, delete) | an alert at the top of the dialog or form with the message; typed data stays; the button returns to normal |
| Field validation | the field's error state with the message under it; with many, also an alert asking to fix the fields |
| Select whose options failed | trigger with an error border and "Could not load…" + "Try again" under it |

"Try again" repeats the same call; meanwhile the area goes back to loading. The error tone is in the icon only: the message stays in the normal text color and the area is not painted red.

## Empty

- **Empty is not an error:** it is a valid answer with no items.
- **Empty with no filter:** a message and the create action, when the user may create.
- **Empty because of a search or filter:** "No results" and, with a filter on, the action to clear filters.

## Success

- **An action that creates or changes something visible:** the result shows on screen (the new item in the list, the updated value), with a success toast.
- **An action with no visible result** (e.g. changing a password): a toast or a success alert.

## Text

Use the feature's own message when it exists (the code's i18n in final mode, the rules' words otherwise). When there is none for a required state, use the project's standard text, or propose one and list it in `screens.md` as new text for development. That is not invented content: it is this rule applied.

## On the canvas

Each screen with remote data gets its state frames in the same row: `<Screen> — loading`, `— error`, `— empty` when it makes sense; a dialog with an action gets at least `— saving` and `— save error` (state names in the docs language).
