# Repo of repos: per code repo files

**Fix:** the standard puts `AGENTS.md`, `CHANGELOG.md`, and `test-preferences.json` inside each code repo (see "What every project looks like" in the [README](../README.md)), but two skills still assume one project root.

- `test` reads and writes one `test-preferences.json` "at the project root". A project with a Django api and a Next.js or Flutter web needs one per code repo. It already groups files by their nearest `package.json` (`packageRoot`); the preferences should follow the same grouping, and the nearest manifest must include non JavaScript ones (`pyproject.toml`, `requirements.txt`, `pubspec.yaml`).
- `document changelog` appends to `CHANGELOG.md` without saying which one. It should pick the code repo the merged change lives in.

## Done when

On a project with two code repos, `/test` keeps one preferences file per code repo and `/document changelog` writes to the changed repo's `CHANGELOG.md`.
