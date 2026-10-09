# Mode: audio (no captions, or several files)

Whisper is the only source and it does not know who is speaking.

1. **Order.** Several files (WhatsApp voice notes are named `WhatsApp Ptt YYYY-MM-DD at HH.MM.SS.ogg`): sort by the time in the name, else by file modified time; still unclear → ask.
2. **Transcribe.** For each file run `scripts/whisper.sh <file> <tmp>/whisper-<HH.MM.SS or 1,2,3>.srt <lang>` (`<lang>`: the spoken language code, e.g. `pt`; unknown → `auto`). One file → `<tmp>/whisper.srt`.
3. **Speakers.** Add to the step 2 question round: who took part. Voice notes usually have one speaker per file: ask who sent each. Unknown → `Speaker 1`, `Speaker 2`.
4. **Transcript shape.** Several files → one section per file: `### HH:MM:SS · <speaker> · <duration>`, then its text.
5. **Sources table** for the minutes: one row per file with time and duration.
