# Template: rounds/<n>/questionnaire.md

Written in the respondents' language (headings included). It pulls out what only they know; everything the team already knows goes in the context, not in a question.

Rules:
- one idea per question, never compound; most important first, since there may be only one pass;
- every question traces to a question for product, a hypothesis `H-n`, or an open point `P-n` (note it in the HTML data `source` field, not in the text respondents read);
- options when the answer space is known, free text when it is not; "pode marcar mais de uma" style note when several apply;
- a suggestion (the team's recommended answer, with one line why) only when the team has one; none on questions about facts only they know;
- a question that only matters if an earlier answer says so states it ("Only if question 2 includes X");
- last question: anything else.

```markdown
# <Questionnaire title>

**Purpose:** <why it exists and the decision riding on it>

**From:** <team or person> · **To:** <names> · **How the answers will be used:** <what they turn into>. <Without an answer, the team follows its suggestion.>

## Context

<One paragraph, enough to answer well. What was agreed so far, what changes the conversation.>

> **Proposal (to validate)**
>
> 1. <proposed flow step, when there is one>

## How to answer

<Deadline, rough effort. Partial answers and "I don't know" are useful.>

## <Section letter>. <Theme>

### <id>. <Question>

_<why it matters, when not obvious>_

Options: <a> · <b> · <c>.
_Suggestion: <option>, <one line why>._

>
```
