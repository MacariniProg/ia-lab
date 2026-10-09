# Template: README.md (feature folder)

The feature's entry page and state. `/discovery` resumes from the `Status` line, `/start` and `/scope` read it. Keep it to one screen: details live in the files it links.

```markdown
# <Feature name>

Status: <drafting | waiting-answers | open-points | settled> · Depth: <light | full> · Round: <n>
Updated: <YYYY-MM-DD>

<1 to 3 lines: what the feature is, for whom>

## Sources

- <meeting: [<date> <topic>](../../meetings/<date-topic>/minutes.md) | interview <date>>

## Files

| File | What |
|---|---|
| [understanding.md](understanding.md) | the request, what is settled, what exists, risks, questions |
| [rounds/1/questionnaire.md](rounds/1/questionnaire.md) | questions for <names>; Artifact: <link> |
| [business-rules/v1.md](business-rules/v1.md) | **current version**: rules RN-n and open points P-n |

## In one page

- <the 3 to 6 facts a newcomer must know, most important first>

## Open points

<only when status is open-points: P-n, one line each, and how they will be answered (meeting on <date>, questionnaire round <n>)>
```
