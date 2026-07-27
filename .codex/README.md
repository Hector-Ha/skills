# Global Codex Snapshot

Decision date: 2026-07-27
Status: active
Review trigger: Refresh when the global Codex rules or Windows MCP registration changes.

This directory records the portable parts of the current global Codex setup.

- `AGENTS.md` is an exact snapshot of `C:\Users\Admin\.codex\AGENTS.md`.
- `config.toml` records only `windows-mcp`, the user-managed MCP server. Runtime-generated and unrelated MCP servers are excluded.

The MCP record intentionally contains no credentials.
