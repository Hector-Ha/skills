# AGENTS.md

## Project Overview

Decision date: 2026-06-02
Status: active
Review trigger: Review if the canonical global skill location changes.

This repository is a curated collection of AI agent skills plus a small CLI for installing them into other workspaces.

The baseline source of truth is:

```text
C:\Users\Admin\.agents\skills
```

When asked to update this repository, the main priority is to compare against that baseline and sync repo skill copies and docs accordingly.

## Sync Workflow

Decision date: 2026-06-02
Status: active
Review trigger: Review when the canonical skill layout or generated-file exclusions change.

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

Decision date: 2026-06-02
Status: active
Last reviewed: 2026-07-27
Review trigger: Review whenever the canonical baseline adds or removes a skill.

- `communication`: `caveman`
- `documentation`: `create-agentsmd`, `create-cli`, `create-readme`
- `engineering`: `autoreview`, `code-review`, `diagnosing-bugs`, `domain-modeling`, `github-deep-review`, `gsap-core`, `gsap-frameworks`, `gsap-performance`, `gsap-plugins`, `gsap-react`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-utils`, `implement`, `oracle`, `shadcn`, `skill-cleaner`, `tdd`, `thermo-nuclear-code-quality-review`
- `project-management`: `github-project-triage`, `grill-me`, `grill-with-docs`, `handoff`, `repo-issue-orchestrator`, `setup-skills`, `to-spec`, `to-tickets`, `triage`

## Tooling

Decision date: 2026-06-02
Status: active
Review trigger: Review when repository package-management or CLI ownership changes.

- Prefer `bun` over `pnpm` over `npm`.
- Prefer `bunx` over `npx`.
- Use `rg` / `rg --files` first for searching.
- Do not touch root CLI scripts unless explicitly requested:
  - `scripts/`
  - `bin/`
  - `skills.ps1`
  - `skills.sh`

## Skill Usage

Decision date: 2026-06-02
Status: active
Last reviewed: 2026-07-27
Review trigger: Review whenever required documentation or framework skills change.

- Always use `caveman` for responses, except when writing `README.md`, `AGENTS.md`, or commit messages.
- Always use `create-readme` when writing or updating README files.
- Always use `create-agentsmd` when writing or updating AGENTS.md.

## Commit And Push

Decision date: 2026-06-02
Status: active
Review trigger: Review if the repository branch or release workflow changes.

- Before committing, verify `git status --short --branch`.
- Commit only relevant sync/doc changes.
- Push `main` after a successful commit when the user asks to push.
