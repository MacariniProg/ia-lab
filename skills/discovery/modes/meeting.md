# Mode: meeting (minutes or transcript)

The meeting already happened; `/transcribe` recorded it. This mode reads what was asked and checks it against what is already settled and what exists, so the questionnaire asks only what is still unknown.

0. **Read the meeting.** `minutes.md` first: the topics its routing section sends to this feature, with their time ranges. Then those stretches of `transcript.md`, for exact words. Cite every point as `<date> [mm:ss]`. Topics routed elsewhere: skip; a rule this feature depends on is listed under Dependencies, never written as this feature's rule.
1. **Already settled.** Search `docs/features/*/business-rules/v*.md`, `rounds/*/analysis.md`, and `rounds/*/questionnaire.md` for the same subject. A rule already settled is cited (`<feature> RN-n`), never asked again; a question already asked in another questionnaire is listed with where it was asked, not repeated.
2. **What exists.** Read the code, read only, to find what this feature touches: models, permissions, screens, rules already coded. Delegate the search to a read only subagent when the agent can, and keep only its conclusions. Cite `path:line`. State facts (what the code does today), never a solution: how to build is `/architect`'s job.
3. **Write `understanding.md`** from `templates/understanding.md`: the request, already settled, what exists, dependencies on other features, risks, questions for product, and (depth `full`) research questions. A question goes to product only when neither the meeting, the settled rules, nor the code answers it.
