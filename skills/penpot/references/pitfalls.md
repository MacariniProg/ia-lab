# Pitfalls

Learned the hard way, on real files. Where a helper already handles one, it is named; use it instead of the raw call.

## Tokens

- **`applyToken` toggles.** Applying the token a property already has removes it. → `S.bind`.
- **Reassigning `strokes` and applying a token in the same tick can drop the binding** (removal is async). → `S.relink(root)` at the end; `S.swapIn` waits between the two.
- **A token on `strokeColor` paints only the first stroke.** One stroke per shape (`S.stroke`).
- **Changing a token's value does not repaint shapes already bound;** reassign the fill or stroke, wait, bind again.
- **Fill opacity does not survive a token.** A hover like `bg-primary/90` is a rectangle named `state-layer` on top, with `opacity` (audit skips it).
- **Shadows reject negative spread.**
- **Filled parts of icons** (e.g. the dot in Lucide's `key-round`) need the fill bound to the same token as the stroke.
- **Brand assets** (`createShapeFromSvg` logos) keep their hex: name them with a `S.cfg.skip` prefix.

## Components and instances

- **An instance takes no new children** ("Cannot change the structure of a component copy"). Vary it through variants, texts (`S.texts`: `null` skips, `false` hides), `hidden`, or `S.swapIn`; otherwise build a layout board with smaller instances.
- **The library lists one variant per set.** → `S.inst(set, props)` walks `variants.variantComponents()`.
- **`swapComponent` keeps the old icon's child geometry** and distorts the new icon. → `S.swapIn`.
- **Stroke width does not scale with `resize`.** → `S.icon`, `S.swapIn`.
- **`switchVariant` does nothing on a nested instance** (a Tab inside a TabsList, a trigger inside a form field). Use `swapComponent(<variant component>)` and set the text again.
- **Text overridden in an instance keeps the main's box in the editor:** auto-width buttons show the text overflowing, while exports measure again and hide the bug. → `S.fitTexts(root)` after building; do not trust the export alone.
- **Overridden text sometimes vanishes in an export.** Recreate the instance and set the texts again.
- **Penpot rejects empty text.** Use a space (`S.txt`, `S.setText`, `S.texts` do).
- **Cloning a main inside a variant container creates a new variant** ("Value 2").
- **A library change reaches screen files only after it is published** and the screen file accepts the update.
- **A resized logo instance does not scale its SVG;** resize `children[0]` too.
- **Absolute children of a resized instance ignore constraints;** reposition them from the main's offsets.
- **`path.content` set on an instance is stored with an offset;** reposition `x` / `y` from the expected box.

## Layout

- **`resize()` fixes flex sizing.** Set `horizontalSizing` / `verticalSizing` back to `auto` (or `fill`) afterwards when content should rule.
- **An empty flex board is born 100 px tall.** → `S.spacer`.
- **A flex row with `auto` height and a child that fills vertically collapses to 0;** fix the row's height.
- **Flex frames ignore child order for overlap.** Absolute scrim and dialog need `layoutChild.zIndex` → `S.overlay`.
- **A wrapping container with `alignItems: center` measures wrong;** use `start` and `alignContent: start`.
- **Dashed strokes with `strokeAlignment: "inner"` draw ragged corners;** use `center`.

## Pages and calls

- **Only the open page can be edited.** → `await S.go(name)`.
- **The plugin cannot move shapes between pages** ("Cannot modify a page that is not currently active"), and recreating a main gives it a new id, breaking its instances. Build frames on the page where they belong; to move one, the user cuts and pastes in the editor (ids survive).
- **The plugin cannot reorder pages;** a new page goes last. Create pages in order.
- **Penpot normalizes `/` in names** (`a/b` becomes `a / b`): compare names without spaces.
- **A call is cut at 120 s.** What was done stays in the file: check the state before repeating. One flow per call; states by `clone()`.
- **The plugin cannot `fetch` localhost** (hangs until timeout). Code travels inside the call (`mcp.mjs` prepends it).
- **Plugin state is per connection.** `storage` empties on reconnect; `mcp.mjs` prepends the helpers to every call, so nothing depends on it.
- **Custom fonts appear in `penpot.fonts` only after reloading the tab and reconnecting.**

## Export and images

- **`export_shape` takes a literal id,** not an expression. Large boards time out: export frame by frame.
- **An export right after an edit can show the previous version.** Wait a few seconds and export again.
- **Large images:** do not send them through the plugin. The user drags the image into the file; reuse its `fillImage` (`{ ...fill.fillImage, keepAspectRatio: true }`).

## REST

- **`update-file` accepts only transit** (`application/transit+json`); uuids sent as JSON strings are rejected. Ask for JSON answers: a transit error is not recognized as an error.
- **`add-page` takes `page` (a whole page) or `id` + `name`, never both.**
- **Requests above about 8 MB fail.** Send a large page as an empty board (`add-page`) plus `add-obj` batches of about 1500 objects, never splitting a component instance.
- **A nested copy must point to the same file as its parent instance;** relink a whole page at once.
