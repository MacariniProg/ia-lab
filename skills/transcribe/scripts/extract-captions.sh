#!/usr/bin/env bash
# Extract the first caption track of a recording to SRT.
# Usage: extract-captions.sh <input> <output.srt>
# Exit 0: extracted. Exit 2: no caption track. Exit 1: error.
# ponytail: bash only; add a PowerShell twin when a Windows user shows up.
set -euo pipefail

in="$1"
out="$2"

command -v ffprobe >/dev/null || { echo "ffprobe not found. Install: brew install ffmpeg" >&2; exit 1; }

if [ -z "$(ffprobe -v error -select_streams s -show_entries stream=index -of csv=p=0 "$in")" ]; then
  echo "no caption track in $in" >&2
  exit 2
fi

ffmpeg -v error -y -i "$in" -map 0:s:0 "$out"
