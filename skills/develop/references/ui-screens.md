# UI source: the feature's screens

Case 1: `/design` drew this feature's screens. `docs/features/<slug>/screens.md` lists them, and the frames live in the design tool. The design is the source of truth; code follows it.

### S1: Read the inventory

Read `screens.md`: its header (status, mode, business rules version, design file link), the screens (screen, journey step, `RN-n`, `P-n`, page and frame), the state matrix, the edge cases, and the Decisions section. Build only the screens this sub task touches. A screen listed as context is owned by another feature: reuse it, never build it here.

### S2: Look at each frame

Open each frame through the design tool's skill, never from memory: Penpot → the `penpot` skill (export the frame and look at it; read its layers when you need exact sizes or token names); Figma → its MCP. Look at every state frame of the screen too (`<Screen> — <state>`), not only the default one.

### S3: Text, components, tokens

- **Text:** take it from the frames and `screens.md`, worded with the business rules vocabulary. Never invent copy.
- **Components:** reuse what `docs/design/components.md` lists before creating any. A frame piece named `missing/<piece>` has no component yet: build it from the existing ones and flag it in the report.
- **Tokens:** the values live in the project's styling system and the design tool library. Map each frame value to its token; a value with no token is flagged, not hardcoded.

### S4: Gaps

A gap between the frames and the spec (a state the spec needs and no frame shows, a frame the spec does not cover, text that contradicts a rule) → flag it in the report and ask, never guess. A screen change goes to `/design <slug>`; a rule change goes to `/discovery <slug>`.

Then continue to `references/ui-implementation.md`, with the frames as the composition (Phase 0 matches them rather than composing a new surface).
