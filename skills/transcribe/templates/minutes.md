# Template: minutes.md

Render headings and text in the project's docs language (house rules). Record what was said; no requirements, tasks, or plan changes (that is `/discovery`). `/discovery` later appends a routing section (marker `<!-- routing: /discovery -->`); when rewriting the minutes, keep it as it is.

```markdown
# <Meeting | Voice notes> <date>: <topic>

## Files

| File | Content |
|---|---|
| this file | minutes |
| [transcript.md](transcript.md) | transcript with speakers |
| <raw srt files> | raw sources, unedited |

## Sources and confidence

| Source | Covers |
|---|---|
| <captions / Whisper / voice note file> | <time range>, <what it has or lacks, e.g. no speaker names> |

## Participants

- <Name>: <role, if said>

## Why the meeting

<1 to 3 lines>

## Summary by topic

### 1. <topic> [<mm:ss–mm:ss>, ...]

<what was said, who said it>

## Decisions

- <decision> [<mm:ss>]

## Open points

- <question still open> [<mm:ss>]

## Owners

- <who> · <what> · <when, if said>
```
