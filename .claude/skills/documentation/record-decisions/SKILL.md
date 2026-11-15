---
name: record-decisions
description: Record durable decisions with their original dates and the context needed to apply them correctly. Preserve their history through reviews and replacements. Use when creating or updating planning, architecture or ADR, domain, test-strategy, repository-workflow, agent-workflow, or setup-skills documentation that future work is expected to follow.
---

# Record decisions

Put a date beside each durable decision. Record enough context to establish its authority, limits and current meaning without forcing every document into a heavyweight template.

## Identify durable decisions

Record guidance that future work is expected to follow, such as:

- product and implementation direction;
- architecture, technology, and domain choices;
- test strategy and accepted testing tradeoffs;
- repository and agent workflows;
- issue-tracker, triage, and documentation conventions.

Keep transient task steps, raw results, unresolved proposals and descriptive facts separate from accepted decisions. Approval records a decision, not proof that it was implemented or verified. Bind verification claims to the actual tested source or version and result. Approval of a decision does not qualify later changes.

## Date every decision

1. Record the date on which the decision was actually made, using `YYYY-MM-DD`.
2. Place the date beside the specific decision it belongs to. Use `Decision date: YYYY-MM-DD`, an inline parenthetical, or a table column, whichever fits the document.
3. Give each distinct decision its own date. Do not rely on a document-level created, updated, or reviewed date.
4. Use the current project or environment date only for a decision being made now. Do not use a file modification date as the decision date.

If an older decision's original date cannot be established, write `Decision date: unknown` rather than inventing one.

## Record context where needed

Include the following when the surrounding text does not already make it clear:

- **Authority and source:** who approved the decision or which record controls it. Prefer an exact approval or owning-ticket link.
- **Scope:** where the decision applies, including any project, task, environment, artifact or version limit.
- **Status:** whether the decision is proposed, active, superseded or retired.

Add rationale, assumptions or review triggers only when they help future readers apply or reconsider the decision correctly.

Reuse clear headings and shared context. Do not repeat metadata, require empty fields or impose a fixed block.

## Preserve history

- Never replace or refresh the original decision date during review.
- When a review leaves the decision unchanged, add a separate review date and outcome if recording the review matters.
- When a decision changes materially, preserve the old decision as superseded and record the replacement as a new decision with its own date. Identify which decision it replaces.
- When editing an existing document, date new or materially changed decisions. Preserve known dates already present.

## Use the lightest fitting form

Standalone:

```markdown
Decision date: 2026-07-27
Decision: Use pnpm for repository package management.
```

List:

```markdown
- Use pnpm for repository package management. Decision date: 2026-07-27.
- Keep ADRs under `docs/adr/`. Decision date: 2026-07-28.
```

Table:

```markdown
| Decision | Decision date |
| --- | --- |
| Use pnpm for repository package management. | 2026-07-27 |
| Keep ADRs under `docs/adr/`. | 2026-07-28 |
```

Scoped decision:

```markdown
Decision date: 2026-10-25
Decision: Commit verified work locally; the owner handles pushing.
Scope: Issue #125 only.
Source: Linked owner approval.
```

Reviewed decision:

```markdown
Decision date: 2026-07-27
Decision: Use pnpm for repository package management.

Review date: 2026-10-15
Review outcome: Remains active.
```
