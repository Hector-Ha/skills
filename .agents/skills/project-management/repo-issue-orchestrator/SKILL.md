---
name: repo-issue-orchestrator
description: "Finish ready-for-agent issues in one prepared GitHub repo after PRD/issues/setup exist: triage queue, deep-review each issue, implement with TDD, prove, autoreview, commit, and repeat."
---

# Repo Issue Orchestrator

Coordinate one prepared GitHub repository's `ready-for-agent` issue queue through completion.

Use this after planning is complete. Assume the user has already run `grill-with-docs`, `setup-skills`, `to-prd`, and `to-issues`, unless evidence shows the repo is missing that setup.

This is a control-plane skill: inspect queue, choose the next issue, enforce TDD/proof/review gates, ask owner decisions, and report. It does not create PRDs or implementation issues by default.

Always obey global `AGENTS.md` first: git safety, secrets safety, public GitHub body safety, permission boundaries, no destructive operations without explicit approval, and `autoreview` before non-trivial push/land.

Use Extra High reasoning for the orchestrator. Tell worker agents to use Medium or High reasoning based on task complexity.

## Repository Scope

- Work in exactly one repository: the current git repo or the GitHub repo URL named by the user.
- Do not scan unrelated repositories.
- Do not create a portfolio ledger.
- Do not manage releases unless the user explicitly asks for release work.
- Treat PRD issues as planning context, not implementation work.
- Treat implementation issues labeled `ready-for-agent` as the main work queue.
- Re-check repository state before each issue: current branch, dirty files, open PRs, and latest issue state.

## Setup Is Assumed

Do not run planning/setup skills unless the repo is missing required setup or the user explicitly asks.

Skip by default:

- `grill-with-docs`
- `setup-skills`
- `to-prd`
- `to-issues`

If setup appears missing, stop and report exactly what is missing instead of silently creating planning artifacts.

Required ready state:

- repo has usable `AGENTS.md` or equivalent agent instructions;
- repo issue workflow is configured in `docs/agents/*` when present;
- PRD/context issue exists when the work came from planning;
- implementation issues exist and are labeled `ready-for-agent`;
- local checkout is safe to work in.

## Operating Model

1. Verify repo readiness.
   - Confirm current repo or user-provided GitHub repo.
   - Read repo `AGENTS.md`.
   - Read `docs/agents/*` when present.
   - Read PRD/context issue if linked or obvious.
   - Run `git status -sb`.
   - Stop if repo state is unsafe.

2. Load issue queue.
   - Use `github-project-triage` to inspect open issues, labels, blockers, PR overlap, CI state, and risk.
   - Prefer issues labeled `ready-for-agent`.
   - Treat PRD issues as context, not implementation work.

3. Classify open issues.
   - `Autonomous`: clear fit, bounded implementation, usable test/proof path, no product decision needed.
   - `Needs owner`: product choice, missing credential/access, missing live proof, destructive/irreversible choice, or unclear domain decision.
   - `Context only`: PRD, meta issue, planning issue, or issue superseded by implementation issues.
   - `Blocked`: depends on another issue, failing prerequisite, missing external service, or unsafe repo state.

4. Pick one issue.
   - Pick only one issue at a time.
   - Prefer dependency order from issue bodies over title order.
   - Prefer unblocked foundational vertical slices.
   - If several are plausible, recommend one with reason.

5. Use `github-deep-review` before coding.
   - Read full issue body and comments.
   - Check current `main`.
   - Confirm issue is still valid.
   - Identify relevant code path.
   - Decide best bounded fix.
   - Define required tests, proof, and live validation.

6. Use `oracle` only when needed.
   - Use for unclear design, refactor, or issue-split tradeoffs.
   - Treat output as advisory and verify it.

7. Use `create-cli` only when issue touches CLI behavior.
   - Args, flags, config, dry-run, output, help text, and errors.

8. Implement with mandatory `tdd`.
   - All development work must follow red-green-refactor unless the issue is docs-only, metadata-only, or test-only.
   - Write one behavior test first.
   - Confirm it fails for the expected reason.
   - Implement the smallest change that passes.
   - Repeat one behavior at a time.
   - Refactor only while green.
   - Test through public interfaces, not implementation details.
   - If no automated test can fit, state why before coding and define replacement proof.

9. Use `github-deep-review` again when issue is subtle.
   - Ask whether the final patch actually resolves the issue.
   - Verify no stale assumptions remain.

10. Run `autoreview`.
   - Required before non-trivial commit, push, PR update, or land.
   - Fix accepted/actionable findings.
   - Rerun focused tests and review if code changes.

11. Commit scoped changes.
   - Commit only changes for the current issue.
   - Use Conventional Commits.

12. Update GitHub only when authorized.
   - Push only when user asked.
   - Create or update PR only when user asked.
   - Rerun/fix CI only when user asked.
   - Merge only when user asked.
   - Close issue only when user asked or the repo workflow explicitly authorizes it.

13. Refresh and repeat.
   - Return to expected branch.
   - Pull/update safely when allowed.
   - Reload issue queue.
   - Pick next unblocked issue.

Continue until every `ready-for-agent` issue is completed, blocked behind an owner decision, or unsafe to continue.

## Decision-Ready Queue Rule

Do not ask the owner to decide from an unprepared issue.

- Existing issue with no implementation: investigate, confirm validity, identify best bounded candidate, implement if authorized, test, prove, review, and prepare a commit/PR before asking for land/delete.
- Existing PR: inspect, reproduce, rewrite/fix as needed, add tests, run proof and `autoreview`, and get CI green before asking for land/delete.
- Product decision: choose a reversible technical default when safe, but ask when behavior, policy, privacy, or user-facing semantics are unclear.
- Access or live-proof blocker: finish code, tests, docs, review, and CI first. Ask only for the exact missing credential, account action, browser step, waiver, or land/delete decision.

Normal owner interaction should be one of:

- continue with issue `<URL>`;
- land prepared PR `<URL>`;
- delete or close prepared PR/issue `<URL>`;
- provide one exact access step;
- choose documented option A/B;
- approve explicit proof waiver.

## Owner Decision Briefs

Never ask for approval, access, waiver, land, delete, or product choice with only a URL.

Immediately before asking, refresh the issue/PR and local repo state. Do not repeat a question already answered.

Every owner decision request must include:

- full canonical GitHub URL and title;
- plain-language explanation of what changes and who benefits;
- why the decision is needed now;
- completed proof: reproduction, tests, live proof, `autoreview`, CI, and mergeability where applicable;
- material tradeoffs, residual risks, scope concerns, or missing evidence;
- recommendation and concise rationale;
- exact choices available and what each choice does.

If autonomous work remains, do that work first instead of asking prematurely.

## Authorization

Treat triage, implementation, push, PR update, CI rerun/fix, merge, close, and release as separate permissions.

- Queue analysis does not authorize edits.
- Implementation permission authorizes local changes and verification only.
- Push permission does not imply merge or close permission.
- CI rerun/fix permission must be explicit.
- Merge/close permission must be explicit.
- Release, version bump, tag, registry publish, and GitHub Release require a current explicit release request.

Without required permission, stop at the last authorized boundary and report the exact next action.

## Credential Access

Before reporting a credential blocker:

1. Check only the exact expected environment variable.
2. Use it only if already exported.
3. Use the user's approved secret workflow if available.
4. Never broadly enumerate secrets or print values.
5. Ask the owner only after the targeted path is absent, inaccessible, or requires approval.

Report only presence, access path, and exact missing approval. Never paste credentials into issues, PRs, commits, or logs.

## Issue Work Contract

For each selected implementation issue:

- read full issue discussion, repo instructions, docs, and relevant code;
- read PRD/context issue if this issue was generated from one;
- establish root cause or implementation seam before coding;
- use `github-deep-review` before coding;
- use `oracle` only for real uncertainty;
- use `create-cli` only for CLI-facing work;
- implement with mandatory `tdd`;
- add regression coverage when appropriate;
- run focused tests and broader project checks as appropriate;
- run live/end-to-end proof against the changed user path when runtime behavior changes;
- run `autoreview` until no accepted/actionable findings remain;
- commit scoped changes;
- push/update PR only when authorized;
- close issue only when authorized;
- return to expected clean branch state before the next issue.

## TDD Gate

Every development issue must have a TDD plan before implementation.

Required before coding:

- identify public behavior under test;
- choose first behavior test;
- state expected failing reason;
- run the test and see it fail, unless test infrastructure itself must be added first.

Allowed exceptions:

- docs-only issue;
- metadata-only issue;
- test-only issue;
- no feasible automated seam exists.

For exceptions, write replacement proof before coding:

- exact manual/live proof path;
- commands to run;
- expected observable behavior;
- risk left uncovered by automation.

Do not write broad implementation first and tests after. If code already exists before the TDD gate, stop, write the next failing behavior test, and continue from there.

## Live Proof Gate

Live proof is a pre-push/pre-land requirement for runtime behavior changes.

- Test the final candidate through the changed user path using the real built artifact and realistic service/account/browser/device boundary when applicable.
- Mocks, fixtures, screenshots of source, route existence, and CI supplement live proof; they do not replace it when real runtime behavior changed.
- Redact secrets and private user data while keeping concrete evidence: command, behavior, response class, artifact hash, screenshot path, or observed state transition.
- If live proof is unavailable, finish code, tests, review, and CI first. Then ask for exact access, an explicit issue-specific waiver, or a reject/defer decision.
- Re-run live proof after fixes that change the relevant runtime path.
- Pure docs, metadata, CI, or test-only changes may use closest workflow/build proof; state why no runtime boundary applies.

## GitHub Body Safety

For issue comments, PR bodies, or close comments:

- use temp files and `--body-file` when text contains backticks, shell snippets, env names, or user-provided text;
- fetch existing bodies into temp files before editing;
- inspect body files before public writes;
- stop if quoting or literal `\n` output looks wrong.

## Queue Closeout

An issue is complete only when one of these is true:

- implementation PR is prepared with proof and owner must choose land/delete;
- issue is fixed, tested, reviewed, pushed/closed within granted permissions;
- issue is blocked with exact owner decision/access needed;
- issue is superseded by another issue/PR with proof and close permission exists;
- issue is not ready for agent work and should be moved out of `ready-for-agent`.

After each issue, report:

- issue URL;
- status: completed, PR ready, blocked, deferred, or not-ready;
- changed behavior;
- tests/proof run;
- `autoreview` result;
- commit/PR URL if created;
- next recommended issue.

## Reporting

Always use full canonical GitHub URLs. Never report only `#123`.

For queue status, group items as:

- `Active`: current issue and phase.
- `Ready next`: next recommended unblocked issue.
- `Needs owner`: exact decision/access required.
- `Blocked`: issue and blocker.
- `Completed`: issue, proof, PR/commit/close state.

Report meaningful changes, not routine polling.
