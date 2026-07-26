# v1s3r

v1s3r is a browser-native visual performance system for composing music, media, generated visuals, typography, and human interaction in real time.

The project is being rebuilt from the earlier `web-vj` concept. The current development focus is a runtime that treats Remotion expressions as reusable **Visual Modules** with typed input ports. Audio features, pointer gestures, device motion, speech recognition, cues, and future V1P messages can be wired to those ports while the performance is running.

## Current status

The repository is in the foundation phase. The previous README described a proposed VJ application structure that did not match the actual repository contents. The project is now defining its runtime contracts and first vertical slice before implementation begins.

Tracking Epic: #2

## First vertical slice

Three Visual Modules:

- Flow Field
- Video Layer
- Kinetic Typography

Four live bindings:

```text
audio.bass       -> flow.energy
pointer.position -> flow.origin
audio.onset      -> video.jump
speech.finalText -> typography.text
```

The composition must be editable, serializable, reloadable, replayable from a Performance Log, and renderable through Remotion.

## Architecture

```text
Audio / Pointer / Motion / Speech / V1P
                    |
                    v
              Signal Runtime
                    |
                    v
              Binding Engine
                    |
                    v
            Module State Store
                    |
                    v
              Remotion Host
                    |
                    v
              Visual Modules
```

### Main concepts

- **Visual Module Definition**: reusable, versioned Remotion/React expression with typed ports
- **Module Instance**: a placed use of a module definition
- **Sequence**: time-bounded placement of a module instance
- **Signal**: normalized continuous value, event, state, text, or asset input
- **Binding**: `Signal -> Operators -> Module Input`
- **Composition**: serializable module, sequence, asset, and binding graph
- **Performance Log**: timestamped input and state record for Replay and Render

## Execution modes

- **Live**: realtime browser input and performance clock
- **Preview**: Remotion Player clock and simulated/editor input
- **Replay**: recorded Performance Log
- **Render**: Remotion frame clock with deterministic inputs

## Documentation

- [Project charter](docs/charter.md)
- [Architecture overview](docs/architecture/overview.md)
- [MVP vertical slice](docs/product/mvp.md)
- [Architecture decision backlog](docs/decisions/README.md)

## Responsibility boundaries

### v1s3r

Visual Module SDK, Signal Runtime, Binding Engine, Remotion Host integration, editor, performance logging, replay, and live rendering.

### Remotion

Sequence composition, preview playback, frame-based replay, and offline rendering.

### SENN

Future peer sessions, connection, transport, reconnection, and capability exchange.

### V1P

Future peer messages for visual intent, state, cues, time, health, and snapshots. V1P messages will enter v1s3r through the common Signal model.

## Development order

1. Project charter and architecture boundaries — #3
2. Visual Module SDK and registry — #4
3. Signal Runtime and input adapters — #5
4. Binding Engine — #6
5. Remotion Host — #7
6. Editor and Wiring Table — #8
7. Device-tested vertical slice — #9

## Non-goals for the first stage

- Full replacement for Resolume or TouchDesigner
- Arbitrary unsigned JavaScript from external URLs
- General-purpose node programming
- Frame-perfect multi-device pixel synchronization
- Large-scale distributed consensus
- Full MIDI, OSC, DMX, NDI, or broadcast integration
