# Global Rules

## Global Rule Synchronization

Decision date: 2026-07-27
Status: active
Review trigger: Review when the global rule storage or backup locations change.

- Keep these files identical:
  - `C:\Users\Admin\.codex\AGENTS.md`
  - `C:\Users\Admin\Desktop\Projects\Personal_Projects\The_Skill_Collection\.codex\AGENTS.md`
- Whenever user requests a global-rule change, update all listed files in same task.
- Never update only one copy. After editing, verify all listed files have identical hashes.

## Tool Priority

- Honor explicit repo instructions, `packageManager`, and existing lockfiles. Never mix package managers or lockfiles.
- Otherwise use JavaScript package managers in this order: `pnpm`, then `bun`, then `npm`.
- Run one-off JavaScript packages in this order: `pnpm dlx`, then `bunx`, then `npx`.
- Prefer `uv` for Python environments and dependencies, and `uvx` for Python tools. Use `pip` or `pipx` only when explicitly required or unsupported by `uv`/`uvx`.

## No Production Regex

- Never add, generate, suggest, extend, or approve regex in production code.
- Use standard parsers, domain libraries, structured data, or clear string operations instead.
- Never use regex for email, IP addresses, names, phone numbers, street or postal addresses, dates, times, interpolation, build tokens, database search, or structured formats.
- Replace existing regex when task touches it. Otherwise leave it unchanged; never expand it.
- Regex is allowed only for disposable command-line or ad-hoc searches such as `rg` and `grep`. Never ship or persist it.

## Dated Durable Decisions

Decision date: 2026-07-27
Status: active
Review trigger: Review when the global documentation or decision-recording workflow changes.

- Always use the `record-dated-decisions` skill when creating or updating documentation that records durable planning, architecture, domain, test-strategy, repository-workflow, or agent-workflow decisions, including documentation created by or related to `setup-skills`.
- Record the original decision date beside every durable decision as `YYYY-MM-DD`. A document-level review date does not replace a per-decision date.
- Preserve original decision dates. On later review, record the review date and whether the decision remains active, changed, or superseded.

## Caveman Communication

- Always use `caveman full` while coding, implementing, developing, testing, debugging, reviewing, refactoring, designing architecture, or operating development tools.
- Keep all technical substance. Remove filler, hedging, pleasantries, and unnecessary grammar.
- Caveman applies to assistant communication, not source code, tests, documentation, commit messages, or PR text. Write artifacts in their proper standard style.
- For non-development tasks, choose caveman or natural style based on clarity.
- When asked to explain something, use natural style.
- When asked to stop caveman or use normal mode, use natural style.
- Temporarily use natural style when caveman phrasing could make a security warning, irreversible action, or ordered procedure ambiguous.
