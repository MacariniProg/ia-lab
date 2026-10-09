# Template: understanding.md

What was asked, what is already settled, what exists today, and what only product can answer. Facts and citations; no solution.

```markdown
# Understanding: <feature>

Sources: <meeting [<date> <topic>](../../meetings/<date-topic>/minutes.md) | interview <date>>

## The request

- <what was asked, in the words used> [<date> <mm:ss> | interview <date>]

## Already settled

| Where | Rule or question |
|---|---|
| <feature> RN-n | <rule that applies here, not asked again> |
| <feature> round <n> · <question id> | <question already asked elsewhere> |

## What exists

<Path aliases if long, e.g. `A` = `api/`.>

- <what the code does today> (`path:line`)

## Dependencies

| Feature | Why | Without it |
|---|---|---|

## Risks

- <what can go wrong for users or the business: data leak, legal, wrong numbers>

## Questions for product

1. <one idea per question; why it matters in a few words>

## Research questions

<depth full only: what an outside source must answer (standard, regulation, how others do it)>
```
