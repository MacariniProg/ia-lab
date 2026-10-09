#!/usr/bin/env node
// Runs code in the Penpot file open in the browser, through the Penpot MCP server (Streamable HTTP), with no MCP client in between.
// Every call gets helpers.js and the project's docs/design/shell.js prepended, so helpers never need reloading after a reconnect.
//   node mcp.mjs <file.js> [more.js ...]    each file is its own execute_code call, in order
//   node mcp.mjs -e "<code>"                inline code
//   node mcp.mjs --raw -e "<code>"          no prelude
//   node mcp.mjs --export <shapeId> <out.png>
// Server: PENPOT_MCP_URL, else the "penpot" server in Claude Code's ~/.claude.json (this project first, then any).
// PENPOT_MCP_LOCAL=1 uses a local @penpot/mcp server instead (http://localhost:4401/mcp).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = (() => {
  try { return execFileSync("git", ["rev-parse", "--show-toplevel"], { stdio: ["ignore", "pipe", "ignore"] }).toString().trim(); }
  catch { return process.cwd(); }
})();

// The remote URL carries the user's MCP key: read it, never print it.
const configuredUrl = () => {
  const cfg = JSON.parse(fs.readFileSync(path.join(os.homedir(), ".claude.json"), "utf8"));
  const projects = cfg.projects || {};
  const ordered = [projects[root], ...Object.values(projects), cfg].filter(Boolean);
  for (const p of ordered) {
    const u = p.mcpServers?.penpot?.url;
    if (u) return u;
  }
  throw new Error("no Penpot MCP server: set PENPOT_MCP_URL or add a \"penpot\" MCP server (see references/connection.md)");
};
const URL_ = process.env.PENPOT_MCP_URL || (process.env.PENPOT_MCP_LOCAL ? "http://localhost:4401/mcp" : configuredUrl());

let session;
const rpc = async (method, params, id) => {
  const res = await fetch(URL_, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream", ...(session && { "mcp-session-id": session }) },
    body: JSON.stringify({ jsonrpc: "2.0", method, params, ...(id !== undefined && { id }) }),
  });
  session = res.headers.get("mcp-session-id") || session;
  const text = await res.text();
  if (!text) return null;
  // Streamable HTTP answers either plain JSON or an SSE stream whose last data line holds the result.
  const data = text.startsWith("{") ? text : text.split("\n").filter((l) => l.startsWith("data:")).map((l) => l.slice(5)).pop();
  return JSON.parse(data);
};

const prelude = () => {
  const parts = [fs.readFileSync(path.join(here, "helpers.js"), "utf8")];
  const shell = path.join(root, "docs/design/shell.js");
  if (fs.existsSync(shell)) parts.push(fs.readFileSync(shell, "utf8"));
  return parts.join("\n;\n") + "\n;\n";
};

const args = process.argv.slice(2);
const raw = args[0] === "--raw" && args.shift();

await rpc("initialize", { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "penpot-skill", version: "1" } }, 1);
await rpc("notifications/initialized", {});

if (args[0] === "--export") {
  const [, shapeId, out] = args;
  const r = await rpc("tools/call", { name: "export_shape", arguments: { shapeId, format: "png" } }, 2);
  const img = r?.result?.content?.find((x) => x.type === "image");
  if (!img) { console.log(JSON.stringify(r, null, 1)); process.exit(1); }
  fs.writeFileSync(out, Buffer.from(img.data, "base64"));
  console.log("saved " + out);
  process.exit(0);
}

// A bare name not found from the current folder is looked up next to this script (e.g. survey.js).
const readCode = (f) => fs.readFileSync(fs.existsSync(f) ? f : path.join(here, f), "utf8");
const codes = args[0] === "-e" ? [args[1]] : args.map(readCode);
const pre = raw ? "" : prelude();
for (const code of codes) {
  let out;
  // "suspended by the browser": the tab missed its heartbeat (hidden or busy); it recovers on its own.
  for (let i = 0; i < 12; i++) {
    const r = await rpc("tools/call", { name: "execute_code", arguments: { code: pre + code } }, 2);
    out = r?.result?.content?.map((x) => x.text).join("\n") ?? JSON.stringify(r?.error ?? r);
    if (!/suspended by the browser/.test(out)) break;
    await new Promise((res) => setTimeout(res, 5000));
  }
  // The server wraps the returned value as {"result", "log"}: print the value, and the log only when there is one.
  try {
    const { result, log } = JSON.parse(out);
    if (log) console.error(log);
    out = result ?? out;
  } catch {}
  console.log(out);
}
