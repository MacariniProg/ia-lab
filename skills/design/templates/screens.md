# Template: screens.md

The feature's screens: what is drawn, why (which rules), and where. `/design` resumes from its `Status` line; `/architect` and `/develop` read it to know the screens and states to build. Render headings and text in the docs language. Sections marked (final) appear only in final mode; empty sections are left out.

Numbering: `D-n` (decisions from validation meetings) never change once written.

```markdown
# <Feature> · telas

Status: <drafting | waiting-validation | validated | waiting-rules | done> · Mode: <validate | final> · Validation round: <n>
Business rules: [v<n>](business-rules/v<n>.md) · Design file: <link>
Updated: <YYYY-MM-DD>

## Screens

| # | Flow | Screen / frame | Journey step | Rules | Open points | Page · frame |
|---|---|---|---|---|---|---|
| T-1 | 01 <flow> | <Screen> | <n> | RN-n, RN-n | P-n | <page> · `<frame id>` |

### Context from other features

| Screen / frame | Owning feature | Page · frame |
|---|---|---|
| <screen this feature uses, ruled elsewhere> | `<slug>` | <page> · `<frame id>` |

## State matrix (final)

| Screen | <state> | <state> | <state> |
|---|---|---|---|
| T-1 <Screen> | ✓ | n/a (<why>) | ✓ |

## Edge cases (final)

| Case | Rule | Where it shows |
|---|---|---|
| <case> | RN-n | T-n `<frame>` · n/a (<why>) |

## Differences between the design file and the rules

Only when the drawing was not made from this inventory: an adopted file, or existing screens in final mode.

| Where | Difference | What to do |
|---|---|---|
| <page, frame, or T-n> | <what the file shows vs what rule RN-n says, or a row with no frame> | <redraw, rename, drop, keep and note> |

## For the validation meeting

- T-n: <choice the draft made that the rules do not settle>
- P-n: <open point drawn with the provisional rule; alternative drawn: yes/no>

## Decisions

| # | Decision | Screens | Source |
|---|---|---|---|
| D-1 | <what changes on screen> | T-n | [<date> validation](../../meetings/<date-topic>/minutes.md) [mm:ss] |

## Rule changes sent to discovery

| Change | Feature | Source | Status |
|---|---|---|---|
| <rule change heard in the meeting> | `<slug>` | <date> [mm:ss] | pending · business rules v<n> |
```
