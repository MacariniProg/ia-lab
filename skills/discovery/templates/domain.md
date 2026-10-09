# Template: docs/domain/

What is true of the area the product works in, whatever the software does: regulation, industry practice, how the business runs, its vocabulary. One folder per project. Every feature reads it; a feature's `RN-n` cites the `RD-n` it comes from.

What goes in: a fact that would still hold if the product did not exist, with its source. What stays out: what this product decides (that is an `RN-n` in a feature), anything the code or git answers (counts, routes, versions), and history (a changed rule keeps its number with the new text; git keeps the old one). `RD-n` numbers never change; a rule that stops holding stays as `RD-n dropped (<why>, <YYYY-MM-DD>)`.

Write a domain rule only with a source: a primary link (law, standard, official docs) or a named person from the business with the date. A research finding marked `(not verified)` stays in the feature's `research.md` until someone confirms it.

## README.md

```markdown
# <Area>: domain

<1 or 2 lines: the area the product works in.> Owner: <name, role>: who confirms a new rule. Last review: <YYYY-MM-DD>.

| File | What |
|---|---|
| [rules.md](rules.md) | domain rules `RD-n` |
| [terms.md](terms.md) | vocabulary of the area |
```

## rules.md

```markdown
# <Area>: domain rules

RD-n (Regra de Domínio). Each rule: what holds, why, source.

## <Theme>

- RD-1 <rule, one sentence>. Why: <one line>. [<link> · <person, YYYY-MM-DD>]
```

## terms.md

```markdown
# <Area>: terms

| Term | Meaning | Not to confuse with |
|---|---|---|
```
