# MVP: Remotion Visual Module Vertical Slice

## Hypothesis

A Remotion-based visual expression can be loaded as a reusable module, placed in a sequence, changed by live interaction, saved as data, replayed from recorded signals, and rendered offline without maintaining separate implementations for each mode.

## Demonstration flow

1. Open the editor and load the default Performance Set.
2. Add Flow Field, Video Layer, and Kinetic Typography module instances.
3. Place each instance on the sequence and set layer order.
4. Create four bindings in the Wiring Table.
5. Start microphone input and confirm bass/onset signals.
6. Move or tap the pointer and confirm position input.
7. Speak and confirm final recognized text.
8. Modify an operator while running and observe the result immediately.
9. Save the composition as JSON.
10. Reload the page and restore it.
11. Record a short Performance Log.
12. Replay the log.
13. Render the replay through Remotion.

## Required modules

### Flow Field

Inputs:

- `energy: number (0..1, realtime)`
- `origin: vector2 (0..1, realtime)`
- `density: number (state)`
- `palette: enum/color set (state)`

### Video Layer

Inputs:

- `asset: asset reference`
- `jump: trigger`
- `opacity: number`
- `playbackRate: number`

### Kinetic Typography

Inputs:

- `text: string`
- `intensity: number`
- `explode: trigger`
- `direction: vector2`

## Required signals

- `audio.bass`
- `audio.onset`
- `pointer.position`
- `speech.finalText`

## Required bindings

```text
audio.bass       -> smooth -> mapRange -> flow.energy
pointer.position -> flow.origin
audio.onset      -> debounce -> video.jump
speech.finalText -> typography.text
```

## Composition persistence

The saved document must contain:

- schema version
- format and timing
- module definition references and versions
- module instances and initial inputs
- sequence placements
- bindings and operator order
- asset references
- variables and presets

It must not contain:

- MediaStream objects
- AudioContext nodes
- Blob URLs
- DOM nodes
- WebRTC peer handles
- browser permission state

## Acceptance criteria

### Functionality

- All three modules are instantiated through the same SDK contract.
- The four bindings can be created without editing source code.
- Bindings can be enabled, disabled, and modified during Preview or Live mode.
- Save and reload restore the same module graph and bindings.
- Replay preserves event order and major visual transitions.
- Offline rendering accepts the same composition and performance log.

### Performance

- Target 60 fps on iPhone 16 Pro Max; graceful reduction to at least 30 fps where necessary.
- High-frequency signals do not update the entire React component tree per frame.
- Ten-minute operation shows no unbounded event queue or obvious memory leak.

### Resilience

- Speech recognition failure does not interrupt other visuals.
- A missing video asset produces a fallback layer.
- A module exception is isolated by an error boundary.
- Invalid bindings are disabled with an actionable diagnostic.

## Exit decision

After this slice, proceed to SENN/V1P integration only when:

- module and binding contracts are stable enough to serialize;
- iPhone Safari performance is measurable and acceptable;
- Replay and Render use the same composition semantics;
- remote signals can be represented without introducing a second interaction model.
