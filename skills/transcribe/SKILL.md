---
name: transcribe
description: "Run /transcribe on a meeting recording (Google Meet video with captions, plain audio or video, WhatsApp voice notes) to write a clean transcript and meeting minutes in docs/meetings/. Records what was said, in the meeting's language; /discovery turns it into business rules."
allowed-tools: Bash, Read, Write, Edit, Glob, AskUserQuestion
argument-hint: <recording file> [more files]
---

<!-- HOUSE-RULES:START -->
## House rules

- **Language:** code, identifiers, comments, and commit messages are always in English. Every generated document, headings included, is in the project's docs language: the `Docs language:` line in the root `AGENTS.md` (or `CLAUDE.md`). When the line is missing, ask once (the language the user writes in, recommended; English) and add it there. Exceptions: `AGENTS.md` files are instructions for agents, always in English; a transcript stays in the meeting's language (it records what was said); a questionnaire is in the language of the people who answer it. Translate only when asked, into a sibling file (`<name>.<lang>.md`).
- **Style:** plain, simple words in everything a skill produces, files and messages alike. Talk to the reader as `you`, warm and direct like a colleague, and present every step as a recommendation they may run or skip, never an order. Keep technical terms that carry real meaning and explain each in plain words. Never use a dash as punctuation (no em dash, no en dash) and no hyphenated compounds: write `read only`, not `read-only`, or reword. A word the language itself spells with a hyphen keeps it; so do code, file paths, command flags, and values other skills match on (`open-points`, `RN-3`, frame names). Short sentences, commas, or parentheses.
- **Abbreviations:** spell out every abbreviation the first time it appears in a reply or file.
- **Questions:** 2 to 4 concrete options, exactly one marked recommended with a one line why. Use the agent's option picker when it has one (`AskUserQuestion` on Claude Code), else the same options as plain text.
- **State lives in files,** never only in the chat. Read a file again right before editing it; edit surgically.
- **Git per root:** resolve each workspace's git root (`git -C <workspace> rev-parse --show-toplevel`) and run git commands once per root.
<!-- HOUSE-RULES:END -->


## What it does

Turns recordings into a clean transcript (who said what, when) and minutes (topics, decisions, open points, owners). It records; it does not interpret. Business rules, requirements, and tasks belong to `/discovery`.

## Reads / Writes

| | Path |
|---|---|
| Reads | the recording files (kept outside the repo); `docs/meetings/glossary.md` if it exists |
| Writes | `docs/meetings/<YYYY-MM-DD>-<topic>/`: raw `captions.srt` and `whisper*.srt` (never edited), `transcript.md`, `minutes.md`; confirmed new terms appended to `docs/meetings/glossary.md` |

## Asks vs acts

Acts. A meeting always belongs to the project the skill runs in; never ask which project. Asks only after transcribing (step 2), before anything is written: the topic (proposed from the content), who is speaking when captions have no names (audio mode, or a shared account like a company name), whether to keep content that is personal or does not fit this project, overwriting an existing meeting folder, and new glossary terms.

## Steps

0. **Inputs.** No file given → ask for the path. Work in a temporary folder outside the repo (the agent's scratch folder, else the system temp) until step 2; the repo stays untouched until you confirm.
1. **Pick the mode.** One file: run `scripts/extract-captions.sh <file> <tmp>/captions.srt`. Exit 0 → read `modes/meet.md`. Exit 2 → read `modes/audio.md`. Several files → `modes/audio.md`. Follow the mode file; it produces the raw SRT (SubRip subtitle) files and the speaker list.
2. **Confirm, then place.** Read the raw text. Date: from the file name, else the file's modified date. Then ask in one round:
   - **topic:** propose a short one from the content (recommended), the user may rename;
   - **speakers:** only the ones the mode left unknown;
   - **fit:** only when the content is personal, or does not fit what this project is (compare with its `README.md` / `AGENTS.md`): say why, then temporary folder only (recommended), transcribe here anyway, or discard;
   - **overwrite:** only when `docs/meetings/<YYYY-MM-DD>-<topic>/` already exists;
   - **glossary:** terms the raw text gets wrong that `docs/meetings/glossary.md` lacks, grouped, multi select (a second round if they do not fit in the first). Append the confirmed ones before step 3, so the transcript is written once, already fixed.
   Then move the raw files into `<dir>` = that folder (or keep them in `<tmp>` if so chosen).
3. **Transcript.** Read `templates/transcript.md` and write `transcript.md`. Read long SRT files in chunks of about 15 minutes. Cleaning rules:
   - one paragraph per speaker turn: `**[mm:ss] Name:** text`; merge consecutive cues of the same speaker;
   - drop a turn that is only a filler ("uh huh", "yeah", "ok", or their equivalents in the meeting language);
   - fix only the terms the glossary lists; never reword;
   - unclear stretch → `[?]`; never fill a gap by inference;
   - a demo stretch where only test values are typed → one line `[mm:ss–mm:ss] demo: <what was shown>`.
   - an off topic stretch (small talk, personal remarks) → one line `[mm:ss–mm:ss] off topic (<subject>)`, written in the meeting's language.
4. **Minutes.** Read `templates/minutes.md` and write `minutes.md`. Every topic carries its time ranges so a reader can jump to the transcript.
5. **Report** (below).

## Report

```
## /transcribe complete · <topic>

**<duration> transcribed (<mode>): <n> topics, <n> decisions, <n> open points.** Files in <dir>.
Next: /discovery <dir>/minutes.md
Heads up: <only when there is one: stretches both sources lost, speakers still unknown>
```

## Reference files

- `modes/meet.md`: read when the recording has a caption track.
- `modes/audio.md`: read when there is no caption track, or several files.
- `templates/transcript.md`: read when writing the transcript.
- `templates/minutes.md`: read when writing the minutes.
- `scripts/whisper.sh`: Whisper (speech to text) wrapper; needs `ffmpeg`, `whisper-cli`, and a model (`WHISPER_MODEL`).
- `scripts/srt-turns.py`: rebuilds speaker turns from Meet captions (`--test` runs its self check).
