# Product layer

**Decide:** where a project keeps what holds for the whole product: rules every feature obeys, what the product is and for whom, its roles, its vocabulary, and the source files behind its rules. Today the standard has the area (`docs/domain/`, `RD-n`) and each feature (`docs/features/<slug>/`, `RN-n`), and nothing in between.

## Field notes: what the two client projects keep (checked 2026-10-09)

| Knowledge | Project A | Project B | Home in the standard today |
|---|---|---|---|
| Rules every feature obeys | a context file and a concept note: absent values stay `null`, never zero; cancelled records stay hidden, drafts resume, concluded results keep their version; an assessment belongs to a project farm; a standard notice on every exported PDF | a financial calculation policy note: finite horizon discounted cash flow, live scenario versus spreadsheet baseline, calculation status values, `null` never an implicit zero | none; the README says a cross cutting decision becomes a feature, which is heavy for a one line constraint |
| What the product is | a modules table (seven calculation modules, each with a status) | seven manuals (about 24,000 words): end to end flow, project types, calculation engine, data cascade, external sources, SaaS (Software as a Service) potential, market viability | one line at the top of `docs/scope.md` |
| Product vocabulary | assessment, scenario names, module names | project, farm as the unit of calculation, live scenario | `docs/domain/terms.md` holds the area's words (plot, animal unit), not the product's |
| Roles | none written | a users and permissions document: four user types and a permission matrix | none |
| Source files | spreadsheets of the calculation modules, scientific references with an inventory (about 2,800 words) and an "Authority" section saying how much each kind of source is worth | the client's spreadsheets, an inventory of references | an `RD-n` cites a link; no place for the file or its weight |

Project B created a `rules/` folder for "cross cutting business rules" with its own prefix (`RA-n`). Its index is empty: the need is there, but no step of the flow owns it, so nothing got written.

## Proposal

*Proposal, not a decision.*

A `docs/product/` folder shaped like `docs/domain/`, one layer above the features:

```
docs/
├── domain/              the area, true for any product there       RD-n
├── product/             this product, true for every feature
│   ├── README.md        what it is, for whom, roles, modules with a link to each feature, owner
│   ├── rules.md         RP-n (Regra de Produto), each citing the RD-n it comes from
│   └── terms.md         the product's own words
├── sources/             spreadsheets, PDFs, standards, with a README inventory
└── features/<slug>/     RN-n cite RP-n and RD-n; AC-n cite RN-n or RP-n
```

The citation chain becomes RD, then RP, then RN, then AC (acceptance criterion).

**Product rule or cross cutting feature.** An `RP-n` is a constraint every feature obeys with no code of its own ("an absent value is `null`, never zero"; "every result records the method version it used"). A mechanism someone has to build (permissions, a recompute pipeline, project B's cascade of spreadsheet constant, then tenant value, then external source) stays a feature with a spec. Both can coexist: the `access-control` feature builds the roles, and `product/README.md` only lists them.

**Owners.**

- `/discovery` writes `docs/product/`. Meeting routing gains one more destination, "product (every feature)". Step 7 already proposes additions to `docs/domain/` after asking; it would do the same for `docs/product/`.
- `/architect` cites `RP-n` in acceptance criteria.
- `/check review` flags a change that breaks an `RP-n`.
- `/scope` keeps its one line description and links `product/README.md`.

**Sources.** `docs/sources/README.md` lists each file: what it is, how much it is worth, which `RD-n` or `RP-n` cite it. The worth column copies project A's "Authority" section: a spreadsheet is a functional reference, a meeting is product context and not a scientific source, the code is implemented behavior and not an independent validation. Files too large for git stay outside and the inventory links them.

**Splitting.** When `domain/rules.md` grows too long (project A's soil carbon and emissions methods), it splits by topic (`domain/<topic>.md`), the way `scope.md` splits.

**Kept out.**

- What code or git answers: backend state notes, schema notes, test totals, changed files.
- Commercial material (market studies, SaaS potential): two or three lines of "why" in `product/README.md`; the long studies stay outside agent context.
- Analysis written before a feature: that feature's `research.md` or `understanding.md`.

## When a feature is done

Considered and rejected: moving a finished feature to a "done" folder and promoting its `RN-n` into `docs/domain/` or `docs/product/`.

- **No folder move.** A feature's state already lives in its `README.md` and in `docs/scope.md` (`done`, `dropped`), which is what `/start` reads. Moving the folder breaks every path that points to it: the spec, the routing section of meeting minutes, `scope.md`, the code comments and commits that cite it. A done feature also reopens: a later meeting adds `business-rules/v3.md` to the same folder.
- **No wholesale promotion of RN-n.** Shipping does not change what a rule is. An `RN-n` says what this feature does; `docs/domain/` holds what is true whatever the product does, so promotion would mix the layers the citation chain depends on.
- **What does happen at done:** `/sync` asks one question. Did any `RN-n` of this feature turn out to hold for every feature? Each one that does becomes a new `RP-n`, and the `RN-n` stays, citing it. A fact about the area found along the way goes to `docs/domain/` as usual. The product's current rules are then the latest `business-rules/v<n>.md` of each feature, reached from the modules table in `product/README.md`.

## Questions

1. **Prefix.** `RP-n` (Regra de Produto) or `RG-n` (Regra Geral).
2. **Owner of `docs/product/`.** One named person from product, like the domain owner, who confirms a new `RP-n`.
3. **Runbooks.** Project B keeps eight (deploy, backup, disaster recovery, certificate renewal). Code repo, project repo, or out of the standard; no skill writes them today.
4. **Example.** Add `docs/product/` to PetVida (candidates: the front desk and pet owner roles; "a pet owner sees only their own data", citing RD-2).

## Done when

The README layout and the `/discovery`, `/architect`, `/check`, and `/sync` skills know `docs/product/` and `docs/sources/`, PetVida shows one of each, and this file is deleted.
