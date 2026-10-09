# Template: business-rules/v<n>.md

The settled business rules for this round. What `/design`, `/architect`, and `/scope` read. Rules say what must be true, never how it is built: no tables, endpoints, tasks, or delivery phases.

Numbering: `RN-n` and `P-n` keep their numbers across versions. A rule that changes keeps its number with the new text; a dropped one stays as `RN-n dropped (<why>, v<n>)`. A rule that comes from the domain cites it as its source (`[RD-n]`), and the domain rule itself is never copied. Rules from another feature are cited with its slug (`<feature> RN-n`), never copied as this feature's rules; when that feature has no rules yet, list it in section 8 as a dependency. A rule only partly owned by another feature keeps its number and is rewritten to keep only this feature's part (e.g. "the closing shows which calculation is pinned"; pinning itself belongs to `pin-calculation`).

```markdown
# <Feature> · business rules v<n>

Date: <YYYY-MM-DD>. Based on: <meeting(s), answers round(s), code>.

Rules marked (P-n) are provisional: they follow the proposal until open point n is decided. The others are settled.

## 1. What the feature is

<2 or 3 short paragraphs, from the user's side>

## 2. Why

- <problem today it solves>

## 3. Vocabulary

| Term | Meaning |
|---|---|

## 4. Journey

1. <step, with who does it>

## 5. Business rules

### 5.1 <Theme>

- RN-01 <rule, one sentence when possible>. [<source>] (P-n)

## 6. States

<Only when the feature has states: a text diagram of transitions, who triggers each, then a table state × who sees × who acts.>

## 7. Who does what

| Action | <Role> | <Role> |
|---|---|---|

## 8. Out of this feature

| Item | Where | This feature depends on it |
|---|---|---|
| <item> | `<slug>` (<status>) · later · never | yes: <RN-n that needs it> · no |

## 9. Open points

| # | Question | <Person A> | <Person B> | Provisional rule |
|---|---|---|---|---|
| P-1 | <question> | <what they said> | <what they said> | <proposal> (RN-n) |
```
