# How a new project gets the ecosystem

**Decide:** how the skills reach a brand new project and what runs first.

## Context

- Only `skills/<name>/` folders travel. ia-lab's own `docs/` (the PetVida example) stays here; each project builds its own `docs/` as it uses the skills.
- The `scout` and `researcher` subagents live in `.claude/agents/`, outside the skill folders. The skills fall back to running inline without them.
- Each skill works installed alone, thanks to the house rules block repeated in every `SKILL.md`.

## Questions

1. **Distribution.** *Proposal:* ia-lab is the source repo and projects install with `npx skills add`, the way jsmastery is distributed. Alternative: copy or clone the skill folders into each project.
2. **All or pick.** Install every skill at once, or only the ones the project needs.
3. **Subagents.** Ship `scout` and `researcher` with the skills, or leave them out and rely on the inline fallback.
4. **Updates.** How the project gets a newer skill version (run the install again, or an update command; check what `npx skills` offers), and whether the project may edit its copy locally. Skills have no version number today.
5. **First run order.** *Proposal:* install, then `/scope` (or `/discovery` idea mode), then `/audit` once there is code. `Docs language:` is asked once by the first skill that runs.
6. **Worked examples.** *Proposal:* an example a skill needs goes inside the skill (`references/example-*.md`), never in `docs/`.

## Done when

The README "Getting started" section describes the chosen install, and a new empty project goes from install to its first `/scope` without a manual step.
