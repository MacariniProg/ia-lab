#!/bin/sh
# Fails when the HOUSE-RULES block of any skill differs from the others.
cd "$(dirname "$0")/.." || exit 1
status=0
ref=""
for f in skills/*/SKILL.md; do
  block=$(sed -n '/<!-- HOUSE-RULES:START -->/,/<!-- HOUSE-RULES:END -->/p' "$f")
  if [ -z "$block" ]; then
    echo "missing house rules block: $f"; status=1
  elif [ -z "$ref" ]; then
    ref=$block; ref_file=$f
  elif [ "$block" != "$ref" ]; then
    echo "house rules drift: $f differs from $ref_file"; status=1
  fi
done
exit $status
