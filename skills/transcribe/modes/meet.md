# Mode: meet (recording with a caption track)

Google Meet burns live captions into the recording as a caption track: fixed 4 second cues, each speaker's slice starting with a `(Name)` line; when people talk at once one cue holds several speakers separated by `-`. Step 1 already extracted it to `captions.srt`.

0. **Rebuild turns.** Run `scripts/srt-turns.py <tmp>/captions.srt > <tmp>/turns.txt`: each speaker keeps one turn while they appear in consecutive cues, so overlapping speech is not sliced. Work from `turns.txt`, not the raw cues.

1. **Speakers.** List the names in `captions.srt`. A name that is an account, not a person (a company name), or that is ambiguous → add it to the step 2 question round, and use `Account (Person)` in the transcript.
2. **Second source.** Captions drop text when two people talk at once. Run `scripts/whisper.sh <file> <tmp>/whisper.srt <lang>` (`<lang>`: the meeting's language code, e.g. `pt`; unknown → `auto`). It takes minutes for a long meeting: run it in the background when the agent can, and start the transcript from the captions meanwhile.
3. **Merge.** Captions are the base (they carry speakers). Where a caption gap or a cut sentence lines up with Whisper text at the same time, fill it from Whisper. Speaker of a filled stretch: the adjacent caption speaker only when obvious, else `[speaker?]`.
4. **Sources table** for the minutes: captions (with speaker names) and Whisper (no names), each with the time range it covers.
