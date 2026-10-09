# Connection

Two channels, each for its own job:

| Channel | What | Needs |
|---|---|---|
| **MCP server** (`scripts/mcp.mjs`) | runs Plugin API code in the file open in the browser: read, draw, export | a Penpot tab with the file open and the MCP connection on |
| **REST API** (`scripts/files.mjs`) | files and projects: list, create, link libraries, copy tokens | `PENPOT_TOKEN`; no tab |

The plugin cannot create files or move shapes between pages; REST cannot draw. Try them in this order and ask the user only after both fail, saying what was tried and the error: REST for anything about files → the browser (open the file, connect) → the Plugin API.

## MCP server

Tools the server offers: `execute_code` (runs JavaScript with `penpot`, `penpotUtils`, `storage`), `high_level_overview`, `penpot_api_info`, `export_shape`, `import_image`. `mcp.mjs` calls `execute_code` and `export_shape` directly over HTTP, with `helpers.js` and `docs/design/shell.js` prepended to every call.

**Remote (default).** Hosted by Penpot; needs a Penpot build newer than 2.16.2 (design.penpot.app is).
1. Penpot → Your account → Integrations → MCP Server: enable it and generate the MCP key (shown once; one key per account).
2. Copy the server URL, `https://<penpot domain>/mcp/stream?userToken=<key>`. It is a secret: keep it out of the repo.
3. Register it as the `penpot` MCP server of the agent (Claude Code: `claude mcp add --transport http --scope local penpot "<url>"`), or export `PENPOT_MCP_URL`. `mcp.mjs` reads `PENPOT_MCP_URL`, else the `penpot` server in `~/.claude.json` (this project first, then any).
4. In Penpot, open the file: File → MCP Server → Connect. The connection follows the focused tab.

**Local (fallback).** `npx -y @penpot/mcp@<version matching the Penpot server>`; ports 4400 (plugin), 4401 (`/mcp`), 4402 (WebSocket). In the file: Plugins (`cmd+alt+p`) → install `http://localhost:4400/manifest.json` → Open → Connect to MCP server; Chromium 142+ asks for local network access: allow it. The plugin connects per file: reconnect after switching files, and disconnect the built in remote connection (File → MCP Server → Disconnect) so the two do not fight. Tool timeout: `PENPOT_MCP_TOOL_TIMEOUT_S` (default 120). Use it with `PENPOT_MCP_LOCAL=1 node mcp.mjs ...`.

## The browser tab

- **Hidden tabs freeze.** Chrome throttles timers and rendering in background or covered windows; the plugin then misses its heartbeat ("suspended by the browser", one call taking minutes, text rendered 1×1, flex not recomputing). Either keep the Penpot window visible, or ask the user to quit Chrome (`Cmd+Q`) and reopen it with: `open -a "Google Chrome" --args --disable-background-timer-throttling --disable-renderer-backgrounding --disable-backgrounding-occluded-windows` (until Chrome is closed again). `mcp.mjs` retries "suspended" for a minute.
- **One connected tab.** Two tabs with the connection on answer in turns: check `penpot.currentFile.name` twice before editing, and close the other tab.
- **Switching files:** open the other file in the same tab, wait about 10 s, accept "updates in shared libraries" if shown, confirm the file name.
- **Browser automation** (Claude in Chrome or similar) may open the file and click Connect when the agent has it; otherwise ask the user.

## REST API

`<PENPOT_URL>/api/main/methods/<command>` with `Authorization: Token <PENPOT_TOKEN>`. Docs: `<PENPOT_URL>/api/main/doc`. Token: Penpot → Your account → Access tokens; put `PENPOT_TOKEN=` in the project's `.env` (gitignored). Self hosted Penpot: `PENPOT_URL=`.
