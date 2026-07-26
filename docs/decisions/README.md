# Architecture Decision Records

This directory records decisions that constrain module authors, runtime implementations, saved compositions, and future distributed execution.

## Proposed ADRs

| ADR | Decision | Status |
|---|---|---|
| ADR-001 | Treat Remotion expressions as contract-based Visual Modules | Proposed |
| ADR-002 | Separate low-frequency state inputs from high-frequency realtime signals | Proposed |
| ADR-003 | Use an approved registry before supporting external module packages | Proposed |
| ADR-004 | Persist compositions as versioned data, never browser runtime objects | Proposed |
| ADR-005 | Use one module contract across Live, Preview, Replay, and Render | Proposed |
| ADR-006 | Adapt V1P into the common Signal model instead of adding remote-only bindings | Proposed |
| ADR-007 | Use session time for live events and Remotion frame time for offline rendering | Proposed |
| ADR-008 | Isolate module and adapter failures rather than failing the composition | Proposed |

## ADR template

```markdown
# ADR-NNN: Title

- Status: Proposed | Accepted | Superseded | Rejected
- Date: YYYY-MM-DD

## Context

## Decision

## Consequences

### Positive

### Negative

## Alternatives considered

## Validation
```
