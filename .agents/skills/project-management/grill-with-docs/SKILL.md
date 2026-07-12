---
name: grill-with-docs
description: "Stress-test plans against project docs and update domain decisions."
---

<what-to-do>

Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

Keep all reasoning and questions strictly within production product scope. Never propose, compare, or ask about local-development products, personal tools, laptop-only deployments, dev-only tracers, or prototypes as possible target outcomes.

Ask the questions one at a time, waiting for feedback on each question before continuing.

If a question can be answered by exploring the codebase, explore the codebase instead.

Walk domain language and runtime architecture in the same session — layers, trust boundaries, auth, persistence, deployment, and multi-user behavior — not glossary terms alone.

</what-to-do>

<supporting-info>

## Domain awareness

During codebase exploration, also look for existing documentation:

### File structure

Most repos have a single context:

```
/
├── CONTEXT.md
├── docs/
│   └── adr/
│       ├── 0001-event-sourced-orders.md
│       └── 0002-postgres-for-write-model.md
└── src/
```

If a `CONTEXT-MAP.md` exists at the root, the repo has multiple contexts. The map points to where each one lives:

```
/
├── CONTEXT-MAP.md
├── docs/
│   └── adr/                          ← system-wide decisions
├── src/
│   ├── ordering/
│   │   ├── CONTEXT.md
│   │   └── docs/adr/                 ← context-specific decisions
│   └── billing/
│       ├── CONTEXT.md
│       └── docs/adr/
```

Create files lazily — only when you have something to write. If no `CONTEXT.md` exists, create one when the first term is resolved. If no `docs/adr/` exists, create it when the first ADR is needed.

## During the session

### Timestamp rule changes

When adding or changing any rule, include current date, time, and timezone beside that rule so stale guidance can be traced. Added: 2026-07-04 17:54:25 -04:00.

### Challenge against the glossary

When the user uses a term that conflicts with the existing language in `CONTEXT.md`, call it out immediately. "Your glossary defines 'cancellation' as X, but you seem to mean Y — which is it?"

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term. "You're saying 'account' — do you mean the Customer or the User? Those are different things."

### Discuss concrete scenarios

When domain relationships are being discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force the user to be precise about the boundaries between concepts.

### Cross-reference with code

When the user states how something works, check whether the code agrees. If you find a contradiction, surface it: "Your code cancels entire Orders, but you just said partial cancellation is possible — which is right?"

### Architecture and runtime spine

When the plan touches storage, auth, APIs, clients, deployment, or anything that crosses a process or network boundary, grill those decisions with the same one-question-at-a-time discipline as domain terms.

**Invariant:** reason only about a **shippable production multi-user product runtime** — real accounts, shared durable state, hosted backend, production client build, production security, operability, and scale. Never consider a personal tool, local-development product, laptop-only deployment, dev-only tracer, prototype, or staging system as the target. If the codebase uses stub login, local-only auth endpoints, SQLite treated as the final store, hardcoded localhost, dev manifests, or feature flags that disable real auth, identify these only as gaps to the production target and recommend the production-level resolution. Do not ask whether local-only behavior is acceptable and do not treat existing code as the target architecture.

**Walk these branches when relevant** (skip what the plan clearly does not touch):

1. **Production runtime** — expected concurrency, availability, latency, scale, and failure behavior.
2. **Layers and boundaries** — client, API, workers, database, identity, external providers; what data and trust cross each boundary?
3. **Identity and sessions** — who authenticates, with what provider, where sessions live, and what product terms like Verified User mean at runtime?
4. **Persistence** — what must survive restart, what is shared across users, and what backs it?
5. **Production deployment** — where components run, how client and API discover each other, and how production configuration, secrets, migrations, monitoring, rollback, and recovery work.
6. **Completion bar** — what proves this slice is secure, operable, resilient, and product-ready in production?

For each branch, provide your recommended answer like any other grill question.

**Cross-reference runtime patterns in code:** when the user describes login, auth, storage, or deployment, check the repo for stub flows, `local-*` endpoints, dev-only flags, and localhost wiring. Treat any disagreement with the production target as an implementation gap; ask only about unresolved production behavior, never whether the local-development behavior should be the product.

**Record in ADRs, not CONTEXT.md:** runtime and layering decisions belong in `docs/adr/`. When resolved and the ADR criteria below apply, offer an ADR so future implementers cannot silently substitute local-only shortcuts.

Added: 2026-07-09 20:13:00 -04:00. Production-only scope strengthened: 2026-07-11 15:18:24 -04:00.

### Update CONTEXT.md inline

When a term is resolved, update `CONTEXT.md` right there. Don't batch these up — capture them as they happen. Use the format in [CONTEXT-FORMAT.md](./CONTEXT-FORMAT.md).

`CONTEXT.md` should be totally devoid of implementation details. Do not treat `CONTEXT.md` as a spec, a scratch pad, or a repository for implementation decisions. It is a glossary and nothing else.

### Offer ADRs sparingly

Only offer to create an ADR when all three are true:

1. **Hard to reverse** — the cost of changing your mind later is meaningful
2. **Surprising without context** — a future reader will wonder "why did they do it this way?"
3. **The result of a real trade-off** — there were genuine alternatives and you picked one for specific reasons

If any of the three is missing, skip the ADR. Use the format in [ADR-FORMAT.md](./ADR-FORMAT.md).

</supporting-info>
