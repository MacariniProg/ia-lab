# Mode: setup (once per project)

Writes the project's `docs/design/`, so drawing knows which files, library, tokens, and typographies to use. Rerun it when the design system changes a lot; small changes are edited by hand.

0. **Already documented elsewhere?** If the project describes its design system in another place (e.g. a `docs/agents/design/` folder), read it first and carry over what it settles (rules, naming, sample data) instead of asking again. Summarize what the skills use and link the rest; never copy a document that keeps being maintained where it is.
1. **Find the library.** `node <skill>/scripts/files.mjs projects`, then `list <projectId>`. Ask in one round: which Penpot project holds this product's files, and which shared library is the design system (recommended: the one marked `(library)` whose name says design system). More than one library (e.g. a mobile one) → ask which ones screen files link to.
2. **Survey.** Ask the user to open the library file and connect the MCP server (`references/connection.md`). Run `node <skill>/scripts/mcp.mjs survey.js`. It returns pages, variant sets with their property values, plain components by path, typographies, token sets, and themes.
3. **Write `docs/design/README.md`** in the docs language:
   - **Tool:** Penpot, its base URL, the project (name and id), the library files (names and ids) screen files link to.
   - **Screen files:** naming (default: one file per feature, `<Product> · <feature>`; follow an existing convention when the project already has one), frame sizes (desktop 1440×900 unless the files say otherwise; mobile when there is a mobile library).
   - **Tokens:** themes and sets; which set screens use (usually the one whose tokens are references, e.g. `semantic`); color rules the project states.
   - **Typographies:** the names, and which ones annotate pages (`S.cfg.typo`).
   - **Rules:** the project's own design rules, quoted from where they were found.
   - **Files table:** every screen file already in the project, with its link.
4. **Write `docs/design/components.md`**: one row per variant set (name, properties and values, when to use) and one line per plain component group. Generated from the survey; "when to use" only where the library's own descriptions or the project's rules say it.
5. **`docs/design/shell.js`** (only when screens share a skeleton, e.g. sidebar + header): code that runs after `helpers.js`. It sets `Object.assign(S.cfg, {...})` (annotation typographies, token names when they differ from the defaults, the flow tag component, the words used on pages in the docs language) and adds the project's screen builders, e.g. `S.screen(name, opts)` returning `{ frame, content }`. Private code goes inside a closure, like `helpers.js`. Draft it from an existing screen file when there is one, run one frame with it, export, and look.
6. **Check.** `node <skill>/scripts/mcp.mjs -e "return Object.keys(S)"` lists the helpers with the shell loaded. Done when the README names the library, the screen file convention, and the annotation typographies.
