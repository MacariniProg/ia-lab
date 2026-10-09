#!/usr/bin/env bash
# Transcribe audio or video to SRT with whisper.cpp.
# Usage: whisper.sh <input> <output.srt> [language, default auto]
# Model: $WHISPER_MODEL, default ~/.cache/whisper-models/ggml-large-v3-turbo-q5_0.bin
# ponytail: bash only; add a PowerShell twin when a Windows user shows up.
set -euo pipefail

in="$1"
out="$2"
lang="${3:-auto}"
model="${WHISPER_MODEL:-$HOME/.cache/whisper-models/ggml-large-v3-turbo-q5_0.bin}"

for tool in ffmpeg whisper-cli; do
  command -v "$tool" >/dev/null || { echo "$tool not found. Install: brew install ffmpeg whisper-cpp" >&2; exit 1; }
done
[ -f "$model" ] || { echo "model not found: $model. Set WHISPER_MODEL or download ggml-large-v3-turbo-q5_0.bin from https://huggingface.co/ggerganov/whisper.cpp" >&2; exit 1; }

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

ffmpeg -v error -y -i "$in" -ar 16000 -ac 1 -c:a pcm_s16le "$tmp/audio.wav"
whisper-cli -m "$model" -l "$lang" -osrt -of "$tmp/out" -f "$tmp/audio.wav" >"$tmp/log" 2>&1 || { cat "$tmp/log" >&2; exit 1; }
mv "$tmp/out.srt" "$out"
