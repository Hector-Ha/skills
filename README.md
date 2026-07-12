# The Skill Collection

A curated repository of high-signal, specialized AI agent skills designed to supercharge development workflows, grounded in context and optimized for token efficiency. Includes a local CLI for easy integration and keeps `C:\Users\Admin\.agents\skills` as the baseline source of truth.

## Installation

Install and add skills to your workspace using `bunx`:

```sh
bunx skills add https://github.com/Hector-Ha/skills
```

> [!TIP]
> Ensure you have the `skills` CLI installed to manage, configure, and symlink active skills.

---

## Skill Categories

The collection currently includes 26 skills, organized into four categories for development, documentation, communication, and project planning.

### Communication
*Focus: Tone control, extreme compression, and high-signal feedback.*

* **`caveman`** — Ultra-compressed, high-signal communication mode. Reduces token consumption by up to 75% by stripping filler words while preserving full technical accuracy.

### Documentation
*Focus: Standards for project documentation, onboarding, and agent-specific guidelines.*

* **`create-readme`** — Generates professional, appealing, and readable project `README.md` files.
* **`create-agentsmd`** — Automatically structures practical `AGENTS.md` rules for agent behavior in a workspace.
* **`create-cli`** — Designs human-friendly, scriptable CLI arguments, help, output, errors, and configuration.

### Engineering
*Focus: Quality assurance, clean architecture, tooling, and testing.*

* **`autoreview`** — Runs a structured pre-commit or pre-ship review.
* **`code-review`** — Reviews changes against repository standards and originating specifications.
* **`diagnosing-bugs`** — Applies a disciplined diagnosis loop to hard bugs and performance regressions.
* **`domain-modeling`** — Sharpens domain language, context, and architecture decisions.
* **`github-deep-review`** — Performs evidence-first review of GitHub bugs and pull requests.
* **`implement`** — Implements scoped work from specifications or tickets.
* **`improve-codebase-architecture`** — Analyzes domain mapping and recommends code modularity or architecture improvements.
* **`oracle`** — Bundles prompts and repository files for second-model review.
* **`prototype`** — Builds throwaway terminal or UI prototypes to sanity-check state, flows, and design options.
* **`skill-cleaner`** — Audits skill prompt budget, usage, and duplication.
* **`tdd`** — Guides red-green-refactor testing workflows seamlessly.
* **`thermo-nuclear-code-quality-review`** — Runs an extremely strict maintainability review for abstraction quality, giant files, and spaghetti-condition growth.
* **`vercel-react-best-practices`** — Ensures optimal performance patterns for React and Next.js projects.

### Project Management
*Focus: Interactive brainstorming, plan stress-testing, and direct execution mapping.*

* **`github-project-triage`** — Triages GitHub issues, pull requests, CI, blockers, and risk.
* **`grill-me`** — Relentless design-tree interview to build shared understanding before coding.
* **`grill-with-docs`** — Deep domain-driven design interview aligned with `CONTEXT.md` and ADR specifications.
* **`handoff`** — Compacts the current conversation into a handoff document for another agent to pick up.
* **`repo-issue-orchestrator`** — Drives ready-for-agent GitHub issues through implementation and review.
* **`setup-skills`** — Scaffolds per-repo configurations (issue tracker, triage labels, domain docs) for other engineering skills.
* **`to-spec`** — Synthesizes current context into a project specification.
* **`to-tickets`** — Breaks plans or specifications into dependency-aware tracer-bullet tickets.
* **`triage`** — Runs issue triage through the configured state machine and routes work to agent-ready or human-ready states.

> [!NOTE]
> The **`setup-skills`** workflow originally originated from **`setup-matt-pocock-skills`**, custom-tailored to configure per-repository agent context variables seamlessly.
