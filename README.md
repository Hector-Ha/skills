# The Skill Collection

A curated repository of high-signal, specialized AI agent skills designed to supercharge development workflows, grounded in context and optimized for token efficiency. Includes a local CLI for easy integration.

## Installation

Install and add skills to your workspace using `bunx`:

```sh
bunx skills add https://github.com/Hector-Ha/skills
```

> [!TIP]
> Ensure you have the `skills` CLI installed to manage, configure, and symlink active skills.

---

## Skill Categories

The collection is organized into four logical pillars to streamline development, documentation, communication, and project planning.

### 💬 Communication
*Focus: Tone control, extreme compression, and high-signal feedback.*

* **`caveman`** — Ultra-compressed, high-signal communication mode. Reduces token consumption by up to 75% by stripping filler words while preserving full technical accuracy.
* **`caveman-commit`** — Generates terse, conventional-format commit messages with clean context.
* **`caveman-review`** — Compact, action-focused pull request comments highlighting file, line, issue, and fix directly.

### 📝 Documentation
*Focus: Standards for project documentation, onboarding, and agent-specific guidelines.*

* **`create-readme`** — Generates professional, appealing, and readable project `README.md` files.
* **`create-agentsmd`** — Automatically structures practical `AGENTS.md` rules for agent behavior in a workspace.

### 🛠️ Engineering
*Focus: Quality assurance, clean architecture, security compliance, and testing.*

* **`improve-codebase-architecture`** — Analyzes domain mapping and recommends code modularity or architecture improvements.
* **`security-best-practices`** — Runs language-specific security compliance checks and fixes.
* **`tdd`** — Guides red-green-refactor testing workflows seamlessly.
* **`vercel-react-best-practices`** — Ensures optimal performance patterns for React and Next.js projects.

### 📋 Project Management
*Focus: Interactive brainstorming, plan stress-testing, and direct execution mapping.*

* **`grill-me`** — Relentless design-tree interview to build shared understanding before coding.
* **`grill-with-docs`** — Deep domain-driven design interview aligned with `CONTEXT.md` and ADR specifications.
* **`to-prd`** — Formulates conversation logs and notes into functional Product Requirement Documents.
* **`to-issues`** — Translates plans or PRDs directly into vertical-slice issue tickets.
* **`setup-skills`** — Scaffolds per-repo configurations (issue tracker, triage labels, domain docs) for other engineering skills.
* **`write-a-skill`** — Standardized template tool for creating brand-new agent skills.

> [!NOTE]
> The **`setup-skills`** workflow originally originated from **`setup-matt-pocock-skills`**, custom-tailored to configure per-repository agent context variables seamlessly.
