// Generic helpers for the Penpot Plugin API, prepended to every execute_code call by mcp.mjs.
// Defines `S` only (never `return`; private helpers stay inside the closure, so call code can use any name but S).
// The project's docs/design/shell.js runs after it and may extend S or S.cfg.
// Each helper carries the pitfall it avoids; the full list is in ../references/pitfalls.md.

const S = (() => {
const S = {};

// Project specific values; docs/design/shell.js overrides them with Object.assign(S.cfg, {...}).
S.cfg = {
  skip: ["logo"],                         // name prefixes audit and relink leave alone (brand assets keep their hex)
  relinkMap: null,                        // { "#hex": "token" } when the automatic map picks the wrong token
  typo: { display: null, title: null, body: null }, // library typographies for page annotations
  tok: { surface: "background", border: "border", accent: "primary", text: "foreground", muted: "muted-foreground", scrim: "foreground" },
  flowTag: null,                          // variant set with a `kind` property, drawn next to each frame name
  words: { flow: "Flow", legend: "Legend" },
};

S.sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Components and typographies come from the connected libraries (or the open file when it is the library itself).
// The open library file also shows up among its own connected libraries: dedupe by id.
S.libs = () => [penpot.library.local, ...penpot.library.connected].filter((l, i, all) => all.findIndex((x) => x.id === l.id) === i);

// Tokens are copied into every screen file, so they are read from the open file. Active sets win.
S.tok = (name) => {
  const sets = [...penpot.library.local.tokens.sets].sort((a, b) => (b.active ? 1 : 0) - (a.active ? 1 : 0));
  for (const set of sets) {
    const t = set.tokens.find((t) => t.name === name);
    if (t) return t;
  }
  throw new Error("token " + name);
};
S.typo = (name) => {
  if (!name) return null;
  for (const l of S.libs()) {
    const t = l.typographies.find((t) => t.name === name);
    if (t) return t;
  }
  throw new Error("typography " + name);
};

// applyToken toggles: applying the token a property already has removes it. Always bind.
S.bind = (shape, tokName, props) => {
  const cur = shape.tokens || {};
  const need = props.filter((p) => cur[p] !== tokName);
  if (need.length) shape.applyToken(S.tok(tokName), need);
  return shape;
};
S.fill = (s, t) => S.bind(s, t, ["fill"]);
// A token on strokeColor paints only the first stroke, so a shape gets exactly one. Dashed strokes use "center" ("inner" draws ragged corners).
S.stroke = (s, t, width = 1, align = "inner") => {
  s.strokes = [{ strokeColor: "#000000", strokeWidth: width, strokeAlignment: align, strokeStyle: "solid", strokeOpacity: 1 }];
  return S.bind(s, t, ["strokeColor"]);
};
S.radius = (s, t) => S.bind(s, t, ["borderRadiusTopLeft", "borderRadiusTopRight", "borderRadiusBottomRight", "borderRadiusBottomLeft"]);
S.shadow = (s, t) => S.bind(s, t, ["shadow"]);

S.txt = (content, typoName, colorTok = S.cfg.tok.text) => {
  const t = penpot.createText(content === "" ? " " : content); // Penpot rejects empty text
  const ty = S.typo(typoName);
  if (ty) ty.applyToText(t);
  t.growType = "auto-width";
  return S.fill(t, colorTok);
};

// Variant sets and components are looked up by name across the libraries; names are unique in a design system.
const isSet = (c) => c.isVariant && c.isVariant();
S.V = (name) => {
  const c = S.libs().flatMap((l) => l.components).find((c) => c.name === name && isSet(c));
  if (!c) throw new Error("variant set " + name);
  return c;
};
S.comp = (name) => {
  const c = S.libs().flatMap((l) => l.components).find((c) => c.name === name && !isSet(c));
  if (!c) throw new Error("component " + name);
  return c;
};
// The library lists one variant per set; the others are reached through variants.variantComponents().
S.inst = (set, props = {}) => {
  const v = typeof set === "string" ? S.V(set) : set;
  const c = v.variants.variantComponents().find((c) => Object.entries(props).every(([k, val]) => c.variantProps[k] === val));
  if (!c) throw new Error(`variant ${v.name} ${JSON.stringify(props)}`);
  return c.instance();
};

// Stroke width does not scale with resize: scale it by hand.
const scaleStrokes = (root, k) =>
  penpotUtils.analyzeDescendants(root, (r, s) => {
    if (s.strokes?.length) s.strokes = s.strokes.map((st) => ({ ...st, strokeWidth: st.strokeWidth * k }));
  });
S.icon = (name, size = 16, tok = S.cfg.tok.text) => {
  const i = S.comp(name).instance();
  const k = size / i.width;
  i.resize(size, size);
  scaleStrokes(i, k);
  // Rebinding right after reassigning strokes can drop the token; S.relink(root) at close-out repairs it.
  penpotUtils.analyzeDescendants(i, (r, s) => { if (s.strokes?.length) S.bind(s, tok, ["strokeColor"]); });
  return i;
};

// Board with flex layout that hugs its content.
S.box = (name, dir = "column", gap = 0, px = 0, py = 0) => {
  const b = penpot.createBoard();
  b.name = name;
  b.fills = [];
  const f = b.addFlexLayout();
  Object.assign(f, { dir, rowGap: gap, columnGap: gap, horizontalPadding: px, verticalPadding: py, horizontalSizing: "auto", verticalSizing: "auto", alignItems: "center" });
  return b;
};
S.stack = (name, dir = "column", gap = 8, pad = 0) => {
  const b = S.box(name, dir, gap, pad, pad);
  b.flex.alignItems = "start";
  return b;
};
S.add = (parent, ...kids) => { for (const k of kids) parent.appendChild(k); return parent; };
S.addFill = (parent, ...kids) => { for (const k of kids) { parent.appendChild(k); k.layoutChild.horizontalSizing = "fill"; } return parent; };
// An empty flex board is born 100 px tall: a spacer is 1x1 and fills along the parent's direction.
S.spacer = (parent) => {
  const sp = S.box("spacer", "row");
  sp.flex.horizontalSizing = "fix";
  sp.flex.verticalSizing = "fix";
  sp.resize(1, 1);
  parent.appendChild(sp);
  sp.layoutChild[parent.flex?.dir === "column" ? "verticalSizing" : "horizontalSizing"] = "fill";
  return sp;
};

// A screen frame: fixed size, clipped, flex column. resize() fixes flex sizing, so it is set explicitly.
S.frame = (name, w = 1440, h = 900, bgTok = S.cfg.tok.surface) => {
  const f = S.box(name, "column", 0);
  f.flex.alignItems = "stretch";
  f.flex.horizontalSizing = "fix";
  f.flex.verticalSizing = "fix";
  f.resize(w, h);
  f.clipContent = true;
  return S.fill(f, bgTok);
};

// Instances cannot take new children: change content through texts, hidden, or swapIn.
S.setText = (shape, str) => {
  const t = penpotUtils.findShape((s) => s.type === "text", shape);
  if (t) t.characters = str === "" ? " " : str;
  return shape;
};
// Overrides texts in order: null skips one, false hides it.
S.texts = (inst, arr) => {
  const ts = penpotUtils.findShapes((s) => s.type === "text", inst);
  arr.forEach((v, i) => {
    if (v === null || !ts[i]) return;
    if (v === false) ts[i].hidden = true;
    else ts[i].characters = v === "" ? " " : v;
  });
  return inst;
};

// swapComponent keeps the old icon's child geometry and distorts the new one: re-derive it from the main.
const fitIcon = (ic, name) => {
  const M = S.comp(name).instance();
  const k = ic.width / M.width;
  const flat = (r) => penpotUtils.analyzeDescendants(r, (root, s) => s).map((x) => x.result);
  const a = flat(ic), b = flat(M);
  if (a.length === b.length)
    a.forEach((s, i) => {
      const m = b[i];
      s.resize(Math.max(m.width * k, 0.01), Math.max(m.height * k, 0.01));
      s.x = ic.x + (m.x - M.x) * k;
      s.y = ic.y + (m.y - M.y) * k;
    });
  M.remove();
  return a.length === b.length;
};
// Replaces the icon nested in an instance (the first child whose name starts with `prefix`).
S.swapIn = async (inst, name, tok = S.cfg.tok.text, prefix = "icon") => {
  const find = () => penpotUtils.findShape((s) => s.name.replace(/\s/g, "").startsWith(prefix), inst);
  let ic = find();
  const size = ic.width;
  ic.swapComponent(S.comp(name));
  await S.sleep(200);
  ic = find();
  if (Math.round(ic.width) !== Math.round(size)) ic.resize(size, size);
  fitIcon(ic, name);
  const M = S.comp(name).instance();
  const k = size / M.width;
  M.remove();
  scaleStrokes(ic, k);
  await S.sleep(100); // binding in the same tick as the stroke reassignment drops the token
  penpotUtils.analyzeDescendants(ic, (r, s) => { if (s.strokes?.length) S.bind(s, tok, ["strokeColor"]); });
  return ic;
};

// Text overridden in an instance keeps the main's box in the editor (only exports re-measure),
// so auto-width buttons show the new text overflowing. Run after every build step.
S.fitTexts = (root) => {
  let n = 0;
  for (const t of penpotUtils.findShapes((s) => s.type === "text", root)) {
    const tb = t.textBounds;
    if (!tb || tb.width < 1 || tb.height < 1 || t.width < 1 || t.height < 1) continue;
    if (t.growType === "auto-width" && Math.abs(t.width - tb.width) > 0.5) {
      t.resize(Math.ceil(tb.width), t.height);
      t.growType = "auto-width";
      n++;
    } else if (t.growType === "auto-height" && tb.height - t.height > 0.5) {
      const fill = t.layoutChild?.horizontalSizing;
      t.resize(t.width, Math.ceil(tb.height));
      t.growType = "auto-height";
      if (fill === "fill") t.layoutChild.horizontalSizing = "fill";
      n++;
    }
  }
  return n;
};

// Overlay a dialog on a frame. Flex frames ignore child order for overlap, so zIndex keeps scrim and panel on top.
S.overlay = (frame, panel, opacity = 0.5) => {
  const s = penpot.createRectangle();
  s.name = "scrim";
  frame.appendChild(s);
  s.layoutChild.absolute = true;
  s.resize(frame.width, frame.height);
  penpotUtils.setParentXY(s, 0, 0);
  S.fill(s, S.cfg.tok.scrim);
  s.opacity = opacity;
  frame.appendChild(panel);
  panel.layoutChild.absolute = true;
  penpotUtils.setParentXY(panel, (frame.width - panel.width) / 2, (frame.height - panel.height) / 2);
  s.layoutChild.zIndex = 10;
  panel.layoutChild.zIndex = 11;
  return frame;
};

// Only the open page can be edited. Opening is async: wait, then confirm.
S.go = async (name) => {
  const pg = penpotUtils.getPages().find((p) => p.name === name);
  if (!pg) throw new Error("page " + name);
  penpot.openPage(pg.id);
  await S.sleep(800);
  if (penpot.currentPage.name !== name) throw new Error("open page is " + penpot.currentPage.name);
};

const skipped = (s) => {
  for (let a = s; a; a = a.parent) if (S.cfg.skip.some((p) => a.name?.startsWith(p))) return true;
  return s.name === "state-layer" && s.tokens?.fill;
};
const loose = (s) => {
  const t = s.tokens || {};
  return ((s.fills || []).some((f) => f.fillColor) && !t.fill) || ((s.strokes || []).length && !t.strokeColor);
};

// Rebinds fills and strokes that lost their token, by resolved color. The automatic map takes the first
// reference color token (value like "{gray.900}", i.e. a semantic one) per color; S.cfg.relinkMap overrides it.
S.relink = async (root) => {
  const map = {};
  for (const set of penpot.library.local.tokens.sets)
    for (const t of set.tokens)
      if (t.type === "color" && /^\{.*\}$/.test(t.value) && t.resolvedValue) map[t.resolvedValue.toLowerCase()] ??= t.name;
  Object.assign(map, S.cfg.relinkMap || {});
  let n = 0;
  for (const s of penpotUtils.findShapes((s) => loose(s) && !skipped(s), root)) {
    const t = s.tokens || {};
    const st = s.strokes?.[0]?.strokeColor?.toLowerCase();
    if (st && !t.strokeColor && map[st]) { s.applyToken(S.tok(map[st]), ["strokeColor"]); n++; }
    const fl = (s.fills || []).find((f) => f.fillColor)?.fillColor?.toLowerCase();
    if (fl && !t.fill && map[fl]) { s.applyToken(S.tok(map[fl]), ["fill"]); n++; }
  }
  await S.sleep(300);
  return n;
};

// Every fill and stroke must come from a token. Returns what is still loose; close-out requires [].
S.audit = (root) =>
  penpotUtils
    .findShapes((s) => loose(s) && !skipped(s), root)
    .map((s) => `${s.parent?.parent?.name} > ${s.parent?.name} > ${s.name}: ${(s.fills || []).map((f) => f.fillColor)} | ${(s.strokes || []).map((f) => f.strokeColor)}`);

// Page pattern (../references/flow-pages.md): a legend board, then one board per flow with its frames in a row.
const docBoard = (name, gap, px, py) => {
  const b = S.box(name, "column", gap, px, py);
  b.flex.alignItems = "start";
  S.fill(b, S.cfg.tok.surface);
  S.stroke(b, S.cfg.tok.border, 2);
  return b;
};
const tag = (kind) => (S.cfg.flowTag ? S.inst(S.cfg.flowTag, { kind }) : S.txt(`[${kind}]`, S.cfg.typo.body, S.cfg.tok.accent));
// kinds: [[kind, meaning], ...] in the docs language.
S.legend = (title, desc, kinds) => {
  const b = docBoard(S.cfg.words.legend, 32, 80, 64);
  b.appendChild(S.txt(title, S.cfg.typo.display));
  b.appendChild(S.txt(desc, S.cfg.typo.body, S.cfg.tok.muted));
  const row = S.box("Tags", "row", 48);
  for (const [k, meaning] of kinds) row.appendChild(S.add(S.box("Item", "row", 16), tag(k), S.txt(meaning, S.cfg.typo.body, S.cfg.tok.muted)));
  b.appendChild(row);
  return b;
};
// items: [[frameName, kind, note?], ...]; the frames must already sit at the page root. The note (e.g. "RN-07 · P-1") goes under the label.
S.flow = (n, title, desc, items) => {
  const nn = String(n).padStart(2, "0");
  const sec = docBoard(`${S.cfg.words.flow} ${nn} — ${title}`, 64, 80, 80);
  sec.appendChild(S.add(S.stack("Header", "column", 12),
    S.txt(`${S.cfg.words.flow} ${nn}`, S.cfg.typo.title, S.cfg.tok.accent),
    S.txt(title, S.cfg.typo.display),
    S.txt(desc, S.cfg.typo.body, S.cfg.tok.muted)));
  const row = S.box("Screens", "row", 120);
  row.flex.alignItems = "start";
  sec.appendChild(row);
  for (const [name, kind, note] of items) {
    const f = penpot.root.children.find((c) => c.name === name);
    if (!f) throw new Error("frame " + name);
    const label = S.add(S.box("Label", "row", 16), tag(kind), S.txt(name, S.cfg.typo.title));
    const head = note ? S.add(S.stack("Head", "column", 8), label, S.txt(note, S.cfg.typo.body, S.cfg.tok.muted)) : label;
    row.appendChild(S.add(S.stack("Screen", "column", 24), head, f));
  }
  return sec;
};
// Heights settle only after layout and fitTexts: run last, and again after any text change, or boards overlap.
S.restack = async () => {
  await S.sleep(600);
  const lg = penpot.root.children.find((c) => c.name === S.cfg.words.legend);
  const flows = penpot.root.children.filter((c) => c.name.startsWith(S.cfg.words.flow + " ")).sort((a, b) => a.name.localeCompare(b.name));
  let y = 0;
  if (lg) { lg.x = 0; lg.y = 0; y = lg.height + 240; }
  for (const s of flows) { s.x = 0; s.y = y; y += s.height + 240; }
  return flows.length;
};

return S;
})();
