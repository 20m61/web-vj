# Autonomous loop state

Status: IDLE

## Current performance slice

-

## Actor and performance outcome

- Actor:
- Outcome:

## Related experience journey

- Journey ID:
- Step:
- Source: `docs/experience/README.md`

## Performance state timeline

- Entry state:
- Expected transitions:
- Exit state:
- Degraded/fallback states:

## Input sources

-

## Target modules / sequences / parameters

-

## Interaction and timing contract

- Input event:
- Mapping / transform:
- Expected visual response:
- Timing / synchronization expectation:
- Transition behavior:

## Performance budget and fallback

- Frame / long-task budget:
- Audio/visual drift budget:
- Input latency budget:
- Permission/device fallback:
- Low-performance fallback:

## Resource lifecycle

- Resources created:
- Owner:
- Cleanup trigger:
- Leak/double-registration prevention:

## In scope

-

## Out of scope

-

## Experience acceptance criteria

- [ ] The performer can understand the active scene, source and target parameter
- [ ] Authoring, armed, live and degraded states cannot be confused
- [ ] The live flow remains controllable and recoverable
- [ ] Permission, device and performance failures have a usable fallback
- [ ] The intended musical/visual response is observable, not only technically triggered

## Technical acceptance criteria

- [ ] The sequence/module loads through a documented contract
- [ ] Public parameters can be wired to at least one real-time source
- [ ] Audio/visual timing behavior is measured
- [ ] Browser permission and unavailable-device fallbacks work
- [ ] Frame time, console errors and resource cleanup are checked
- [ ] Build/tests pass without weakening existing checks

## Evaluation level

- [ ] static/contract
- [ ] deterministic tests
- [ ] instrumentation
- [ ] DOM/control review
- [ ] screenshot for changed UI only
- [ ] short capture/replay
- [ ] human rehearsal

## Verification evidence

-

## Rehearsal / outcome evidence

-

## Remaining risks

-
