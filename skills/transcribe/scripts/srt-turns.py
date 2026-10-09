#!/usr/bin/env python3
"""Rebuild speaker turns from a Google Meet caption SRT (SubRip subtitle) file.

Usage: srt-turns.py <captions.srt>  (prints one turn per line: [mm:ss] Speaker: text)

Meet writes fixed 4 second cues; when people talk at once, one cue holds several
speakers, each starting with a "(Name)" line and separated by "-". Reading cues in
order breaks every sentence into slices. Instead, each speaker keeps an open turn
while they appear in consecutive cues; a turn closes at the first cue without them.
Turns are printed by start time.
"""
import re
import sys

CUE = re.compile(r"^\d+\n(\d\d):(\d\d):(\d\d),\d+ --> [^\n]*\n(.*?)(?=\n\n\d+\n\d\d:\d\d:\d\d,|\Z)", re.S | re.M)
SPEAKER = re.compile(r"\((.+)\)")


def turns(raw):
    done, open_ = [], {}
    speaker, seq = "?", 0
    for h, m, s, body in CUE.findall(raw):
        start = (int(h) * 60 + int(m)) * 60 + int(s)
        seen = {}
        for line in body.split("\n"):
            line = line.strip()
            if not line or line == "-":
                continue
            match = SPEAKER.fullmatch(line)
            if match:
                speaker = match.group(1)
                continue
            seen.setdefault(speaker, []).append(line)
        for name in list(open_):
            if name not in seen:
                done.append(open_.pop(name))
        for name, lines in seen.items():
            if name not in open_:
                seq += 1
                open_[name] = [start, name, [], seq]
            open_[name][2].extend(lines)
    done.extend(open_.values())
    return sorted(done, key=lambda t: (t[0], t[3]))


def main():
    raw = open(sys.argv[1], encoding="utf-8").read()
    for start, name, lines, _ in turns(raw):
        print(f"[{start // 60:02d}:{start % 60:02d}] {name}: {' '.join(lines)}")


def demo():
    raw = "1\n00:00:00,000 --> 00:00:04,000\n(A)\nhello there\n-\n\n(B)\nuhum\n\n2\n00:00:04,000 --> 00:00:08,000\n(A)\nhow are you\n\n3\n00:00:08,000 --> 00:00:12,000\n(B)\nfine\n"
    got = [(t[0], t[1], " ".join(t[2])) for t in turns(raw)]
    assert got == [(0, "A", "hello there how are you"), (0, "B", "uhum"), (8, "B", "fine")], got


if __name__ == "__main__":
    demo() if sys.argv[1:] == ["--test"] else main()
