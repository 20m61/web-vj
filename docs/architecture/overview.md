# v1s3r Architecture Overview

## System shape

```text
Input adapters
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
              |
              v
      Browser visual output
```

The persistent unit is a `Composition`. A composition references module instances, sequences, bindings, assets, timing settings, and variables. Runtime-only browser handles, streams, object URLs, and Web Audio nodes are never persisted.

## Canonical vocabulary

### Visual Module Definition

A versioned, reusable implementation of a visual expression. It declares:

- stable module ID and semantic version
- React/Remotion component
- typed input ports
- output events
- default values
- runtime capabilities

### Module Instance

A placed use of one Visual Module Definition. Multiple instances may reference the same definition. Bindings target an `instanceId` and `inputId`, never only a module ID.

### Sequence

A time-bounded placement of a module instance or nested composition. It defines start, duration, trim, layer, and timing behavior.

### Signal

A normalized runtime input carrying value, timestamp, sequence number, and source. Signals are classified as continuous, event, state, text, or asset.

### Binding

A declarative connection:

```text
Signal source -> ordered operators -> Module Instance input
```

A binding also declares update mode and conflict policy.

### Composition

The serializable graph containing module instances, sequences, bindings, assets, variables, and format settings.

### Performance Set

A distributable package containing a composition, approved module references, assets, fonts, presets, metadata, and optional rehearsal data.

### Performance Log

A time-ordered record of signals, cues, state changes, and relevant runtime events used for replay and deterministic rendering.

## Package boundaries

```text
packages/
  module-sdk/
  signal-runtime/
  binding-engine/
  remotion-host/
  v1p-adapter/
  schema/

apps/
  editor/
  performer/
  render-worker/      # optional after the browser MVP

modules/
  flow-field/
  video-layer/
  kinetic-typography/
```

The initial repository may remain a single application while these boundaries are represented as internal directories. Package extraction should happen only when contracts are stable.

## Two update paths

### State input path

For low-frequency or semantic values:

- text
- color
- media selection
- visibility
- scene or preset
- layout
- role and ownership

These values are batched into Module State Store and supplied as resolved props.

### Realtime input path

For high-frequency values:

- audio level and frequency bands
- pointer coordinates
- device orientation
- shader uniforms
- particle force and density

These values live in mutable typed buffers or an external store. A module reads the latest value from its animation or GPU render loop. They must not force a full React render every animation frame.

## Execution modes

| Mode | Time source | Input source | Failure policy |
|---|---|---|---|
| Live | session/performance clock | realtime adapters | continue with fallback |
| Preview | Remotion Player clock | editor and simulated signals | expose diagnostics |
| Replay | recorded timestamps | Performance Log | preserve event order |
| Render | Remotion frame clock | log, seed, assets | wait for required assets or fail explicitly |

## Module isolation

Each module runs behind an error boundary. A failed module is replaced with a transparent or diagnostic fallback without stopping sibling modules. Runtime adapters follow the same isolation rule: unavailable speech recognition must not disable audio, pointer, or rendering.

## Future SENN/V1P integration

SENN is transport infrastructure and does not know module internals. V1P messages are converted by a V1P adapter into ordinary Signals and state updates. This keeps local and remote interaction on the same Binding Engine path.
