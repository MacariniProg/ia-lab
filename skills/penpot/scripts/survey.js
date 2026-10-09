// Read only survey of the open file and its libraries, for /penpot setup: node mcp.mjs survey.js
// Returns what docs/design/ records: pages, libraries, variant sets with their property values,
// plain components grouped by path, typographies, token sets and themes.
const isSet = (c) => c.isVariant && c.isVariant();
const libs = S.libs();
const out = {
  file: penpot.currentFile.name,
  pages: penpotUtils.getPages().map((p) => p.name),
  libraries: libs.map((l) => {
    const sets = l.components.filter(isSet).map((v) => {
      const props = {};
      for (const c of v.variants.variantComponents())
        for (const [k, val] of Object.entries(c.variantProps)) (props[k] ??= new Set()).add(val);
      return { name: v.name, props: Object.fromEntries(Object.entries(props).map(([k, s]) => [k, [...s]])) };
    });
    const groups = {};
    for (const c of l.components.filter((c) => !isSet(c))) {
      const group = (c.path || "").replace(/\s/g, "") || "(root)";
      (groups[group] ??= []).push(c.name);
    }
    return { name: l.name, local: l === penpot.library.local, variantSets: sets, components: groups, typographies: l.typographies.map((t) => t.name) };
  }),
  tokens: {
    themes: penpot.library.local.tokens.themes.map((t) => `${t.group ? t.group + "/" : ""}${t.name}${t.active ? " (active)" : ""}`),
    sets: penpot.library.local.tokens.sets.map((s) => ({
      name: s.name,
      active: s.active,
      count: s.tokens.length,
      types: [...new Set(s.tokens.map((t) => t.type))],
      references: s.tokens.filter((t) => /^\{.*\}$/.test(t.value)).length,
    })),
  },
};
return JSON.stringify(out);
