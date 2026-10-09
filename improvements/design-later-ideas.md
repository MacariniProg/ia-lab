# Design ideas left for later

**Decide:** which of these ideas around `design` and `penpot` to build, and when. None is needed for the current flow.

## Ideas

1. **Design system upkeep as its own skill.** Adding new components and syncing tokens, kept apart from `penpot`, which today only reads the library (`/penpot setup`) and draws screens.
2. **Design versus code drift.** A step in `check` or `sync` that finds where the built UI no longer matches the frames in the design tool.
3. **Code to Penpot capture.** Draw an existing screen in Penpot from the running app, as the starting point for changing it.
4. **A `figma` adapter.** A sibling of `penpot` with the same role, so `design` stays tool agnostic. Figma's own skills split the same way: a base skill that teaches the tool (`figma-use`) and workflow skills on top (`figma-generate-design`).

## Done when

Each idea is either dropped or has its own improvement file with a scope.
