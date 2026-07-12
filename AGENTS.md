# AGENTS.md

## Project Overview

This repository is a curated collection of AI agent skills plus a small CLI for installing them into other workspaces.

The baseline source of truth is:

```text
C:\Users\Admin\.agents\skills
```

When asked to update this repository, the main priority is to compare against that baseline and sync repo skill copies and docs accordingly.

## Sync Workflow

- Treat `C:\Users\Admin\.agents\skills` as canonical.
- Duplicate baseline skill folders into both repo skill trees:
  - `.agents/skills/<category>/<skill>`
  - `.claude/skills/<category>/<skill>`
- Preserve the repo's category layout while making each skill folder match its baseline source folder.
- Exclude generated `__pycache__` directories and `*.pyc` files from copies, parity checks, and lock hashes.
- Update `README.md`, category README files, and `skills-lock.json` whenever the baseline skill list changes.
- Keep README headings and category labels plain text. Do not use emoji or decorative icons in README files.
- When adding or removing a skill, update the corresponding category README under `.agents/skills/<category>/README.md`.
- Verify parity by comparing file hashes between baseline skills and both repo skill trees.

## Category Mapping

- `communication`: `caveman`
- `documentation`: `create-agentsmd`, `create-cli`, `create-readme`
- `engineering`: `autoreview`, `code-review`, `diagnosing-bugs`, `domain-modeling`, `github-deep-review`, `implement`, `improve-codebase-architecture`, `oracle`, `prototype`, `skill-cleaner`, `tdd`, `thermo-nuclear-code-quality-review`, `vercel-react-best-practices`
- `project-management`: `github-project-triage`, `grill-me`, `grill-with-docs`, `handoff`, `repo-issue-orchestrator`, `setup-skills`, `to-spec`, `to-tickets`, `triage`

## Tooling

- Prefer `bun` over `pnpm` over `npm`.
- Prefer `bunx` over `npx`.
- Use `rg` / `rg --files` first for searching.
- Do not touch root CLI scripts unless explicitly requested:
  - `scripts/`
  - `bin/`
  - `skills.ps1`
  - `skills.sh`

## Skill Usage

- Always use `caveman` for responses, except when writing `README.md`, `AGENTS.md`, or commit messages.
- Always use `create-readme` when writing or updating README files.
- Always use `create-agentsmd` when writing or updating AGENTS.md.
- Always use `vercel-react-best-practices` when working with React or Next.js.

## Commit And Push

- Before committing, verify `git status --short --branch`.
- Commit only relevant sync/doc changes.
- Push `main` after a successful commit when the user asks to push.
