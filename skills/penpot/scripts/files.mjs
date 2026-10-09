#!/usr/bin/env node
// Penpot files over the REST API (no open tab needed). Needs `npm install` in this folder (transit-js).
//   node files.mjs projects                                         teams and projects: ids and names
//   node files.mjs list <projectId>                                 files of a project
//   node files.mjs new <projectId> "<name>" --library <id> [--library <id>] [--page "<first page>"]
//        creates the file, links the libraries, copies the first library's tokens; prints its URL
//   node files.mjs sync-tokens <libraryId> <fileId> [<fileId> ...]  copies the library's tokens into the files
//   node files.mjs frames <fileId>                                  screen frames per page (page, name, id, size), read only
// Auth: PENPOT_TOKEN (a personal access token), from the environment or the project's .env. PENPOT_URL defaults to https://design.penpot.app.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";

const t = createRequire(import.meta.url)("transit-js");
const root = (() => {
  try { return execFileSync("git", ["rev-parse", "--show-toplevel"], { stdio: ["ignore", "pipe", "ignore"] }).toString().trim(); }
  catch { return process.cwd(); }
})();
const fromEnvFile = (key) => {
  const f = path.join(root, ".env");
  return fs.existsSync(f) ? fs.readFileSync(f, "utf8").match(new RegExp(`^${key}=(.*)$`, "m"))?.[1].trim() : undefined;
};
const TOKEN = process.env.PENPOT_TOKEN || fromEnvFile("PENPOT_TOKEN");
const BASE = (process.env.PENPOT_URL || fromEnvFile("PENPOT_URL") || "https://design.penpot.app").replace(/\/$/, "");
if (!TOKEN) throw new Error("PENPOT_TOKEN missing: create a personal access token in Penpot (Your account → Access tokens) and put it in .env");

const K = (k) => t.keyword(k);
const reader = t.reader("json");
const writer = t.writer("json");

// update-file only accepts transit (uuids sent as JSON strings are rejected). Ask for JSON answers otherwise:
// a transit error body is not recognized as an error.
const call = async (method, body, { transit = false, acceptTransit = false } = {}) => {
  const res = await fetch(`${BASE}/api/main/methods/${method}`, {
    method: "POST",
    headers: {
      Authorization: `Token ${TOKEN}`,
      "User-Agent": "penpot-skill",
      "Content-Type": transit ? "application/transit+json" : "application/json",
      Accept: acceptTransit ? "application/transit+json" : "application/json",
    },
    body,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${res.status}: ${text.slice(0, 1000)}`);
  if (acceptTransit) return reader.read(text);
  return text ? JSON.parse(text) : null;
};
const json = (method, params) => call(method, JSON.stringify(params));

const update = async (fileId, changes) => {
  const f = await json("get-file", { id: fileId });
  const body = t.map([
    K("id"), t.uuid(fileId), K("session-id"), t.uuid(crypto.randomUUID()), K("revn"), f.revn, K("vern"), f.vern || 0,
    K("features"), t.set(f.features || []), K("changes"), changes,
  ]);
  return call("update-file", writer.write(body), { transit: true });
};
// Tokens travel as the raw transit tokens-lib, so nothing is lost converting them.
const tokensOf = async (libraryId) => (await call("get-file", JSON.stringify({ id: libraryId }), { acceptTransit: true })).get(K("data")).get(K("tokens-lib"));
const setTokens = (fileId, lib) => update(fileId, [t.map([K("type"), K("set-tokens-lib"), K("tokens-lib"), lib])]);
const url = (f) => `${BASE}/#/workspace?team-id=${f.teamId}&file-id=${f.id}`;

const [cmd, ...rest] = process.argv.slice(2);
const flags = (name) => rest.flatMap((a, i) => (a === name ? [rest[i + 1]] : []));

if (cmd === "projects") {
  for (const team of await json("get-teams", {}))
    for (const p of await json("get-projects", { teamId: team.id })) console.log(`${p.id}  ${team.name} / ${p.name}`);
} else if (cmd === "list") {
  for (const f of await json("get-project-files", { projectId: rest[0] })) console.log(`${f.id}  ${f.name}${f.isShared ? "  (library)" : ""}`);
} else if (cmd === "new") {
  const [projectId, name] = rest;
  const libraries = flags("--library");
  if (!projectId || !name || !libraries.length) throw new Error('usage: new <projectId> "<name>" --library <id> [--page "<first page>"]');
  if ((await json("get-project-files", { projectId })).some((f) => f.name === name)) throw new Error("already exists: " + name);
  const f = await json("create-file", { name, projectId });
  for (const libraryId of libraries) await json("link-file-to-library", { fileId: f.id, libraryId });
  await setTokens(f.id, await tokensOf(libraries[0]));
  const page = flags("--page")[0];
  if (page) {
    const first = (await json("get-file", { id: f.id })).data.pages[0];
    await update(f.id, [t.map([K("type"), K("mod-page"), K("id"), t.uuid(first), K("name"), page])]);
  }
  console.log(`created ${name} ${f.id}\n${url(f)}`);
} else if (cmd === "sync-tokens") {
  const [libraryId, ...files] = rest;
  const lib = await tokensOf(libraryId);
  for (const id of files) { await setTokens(id, lib); console.log("tokens synced: " + id); }
} else if (cmd === "frames") {
  // A screen frame is the one next to its "Label" (or "Head") in the flow page pattern; a page without that pattern
  // lists its root frames instead, so a file drawn by hand still shows up. Component instances are never screens.
  const { data } = await json("get-file", { id: rest[0] });
  for (const pid of data.pages) {
    const page = data.pagesIndex[pid];
    const objs = page.objects;
    const rootId = "00000000-0000-0000-0000-000000000000";
    const labeled = Object.values(objs).filter((o) => o.type === "frame" && !o.shapeRef && !o.componentId && !["Label", "Head"].includes(o.name) &&
      (objs[o.parentId]?.shapes || []).some((k) => ["Label", "Head"].includes(objs[k]?.name)));
    const frames = labeled.length ? labeled : (objs[rootId]?.shapes || []).map((k) => objs[k]).filter((o) => o?.type === "frame");
    for (const o of frames) console.log(`${page.name}\t${o.name}\t${o.id}\t${Math.round(o.width)}x${Math.round(o.height)}`);
  }
} else {
  console.log("usage: node files.mjs projects | list <projectId> | new <projectId> \"<name>\" --library <id> [--page <name>] | sync-tokens <libraryId> <fileId>... | frames <fileId>");
  process.exit(1);
}
