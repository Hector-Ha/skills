<div align="center">

# The Skill Collection

_A curated collection of AI agent skills and configurations_

[Communication](#-communication) • [Documentation](#-documentation) • [Engineering](#️-engineering) • [Project Management](#-project-management)

</div>

A collection of specialized AI agent skills organized into four categories: communication, documentation, engineering, and project management.

## 🗣️ Communication

Skills that shape *how* the agent communicates — tone, compression, and feedback format.

| Skill | Description |
|---|---|
| **`caveman`** | Ultra-compressed output (~75% token cut) while preserving full technical accuracy. |
| **`caveman-commit`** | Generates terse, "why-focused" commit messages in Conventional Commits format. |
| **`caveman-review`** | Ultra-compressed PR review comments: `L<n>: problem. fix.` with severity prefix. |

## 📄 Documentation

Skills that generate or maintain project-facing documents for humans and agents.

| Skill | Description |
|---|---|
| **`create-readme`** | Writes a polished, GFM-formatted `README.md` for a project. |
| **`create-agentsmd`** | Generates a complete `AGENTS.md` — covering setup, dev workflow, testing, and code style. |

## ⚙️ Engineering

Skills that enforce or improve technical quality: testing, security, architecture, and framework patterns.

| Skill | Description |
|---|---|
| **`tdd`** | Red-green-refactor loop via vertical tracer-bullet slices. Tests public interfaces only. |
| **`security-best-practices`** | Language/framework security audits. Produces a prioritized `security_best_practices_report.md`. |
| **`improve-codebase-architecture`** | Finds "deepening opportunities" — shallow modules to refactor into deep, testable ones. |
| **`vercel-react-best-practices`** | 70 React/Next.js performance rules across 8 categories from Vercel Engineering. |

## 📋 Project Management

Skills that structure thinking, plan work, and manage project artifacts.

| Skill | Description |
|---|---|
| **`grill-me`** | Relentless design interview — walks every branch of the decision tree with recommendations. |
| **`grill-with-docs`** | Like `grill-me` but domain-aware: challenges plans against `CONTEXT.md` and ADRs, updating them inline. |
| **`to-prd`** | Synthesizes the current conversation into a structured PRD and publishes it to the issue tracker. |
| **`to-issues`** | Breaks a plan/PRD into independently-grabbable vertical-slice issues (HITL vs AFK). |
| **`write-a-skill`** | Creates new agent skills with proper `SKILL.md` structure, description, and optional scripts. |

## Core Structure

```
skills/
├── communication/          # caveman, caveman-commit, caveman-review
├── documentation/          # create-readme, create-agentsmd
├── engineering/            # tdd, security-best-practices, improve-codebase-architecture, vercel-react-best-practices
└── project-management/     # grill-me, grill-with-docs, to-prd, to-issues, write-a-skill

.agents/skills/             # Mirror of skills/ — loaded by AI coding agents
AGENTS.md                   # Agent security policies and execution constraints
skills-lock.json            # Dependency lockfile for installed skills
```

## Installer

Use the local wrapper to install from this repo or from a remote GitHub skills repo.

```sh
./skills.sh add grill-me
./skills.sh add --repo Hector-Ha/skills grill-me
./skills.sh sync --repo Hector-Ha/skills --target ../my-app
```

On Windows PowerShell:

```powershell
.\skills.ps1 add --repo Hector-Ha/skills grill-me
```

If you publish this repo as the npm package `skills`, the entrypoint becomes:

```sh
npx skills add https://github.com/Hector-Ha/skills
bunx skills add https://github.com/Hector-Ha/skills
```

`bunx add ...` is not a valid shape for this tool. The executable name is `skills`, not `add`.
