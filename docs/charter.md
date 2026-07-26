# v1s3r Project Charter

## Purpose

v1s3r is a browser-native visual performance system for composing music, media assets, generated visuals, typography, and human interaction in real time.

It treats Remotion compositions as reusable visual modules rather than finished videos. Modules expose typed input ports and output events, and the runtime connects audio features, touch, motion, speech recognition, cues, and future V1P messages to those ports.

## Core proposition

A performer can load visual modules, place them on a sequence, wire live signals to their parameters, perform in real time, save the composition, replay recorded interaction, and render the same performance offline.

## Principles

1. Music alone must produce a coherent visual result.
2. Human interaction modifies the musical visual system without destroying timing coherence.
3. Visual modules are reusable objects with explicit contracts.
4. High-frequency signals are not pushed through React state every frame.
5. Live, Preview, Replay, and Render use the same module definitions.
6. Pixel streams are not the default synchronization unit; visual intent, state, events, and time are.
7. Failure of one module or input adapter must not stop the entire performance.
8. Preparation, editing, performance, and diagnosis are separate modes.

## Product boundaries

### v1s3r owns

- Visual Module SDK and registry
- module instances and compositions
- signal normalization
- interaction bindings and operators
- Remotion host integration
- sequence and performance-set editing
- performance logging and replay
- live visual rendering and graceful fallback

### Remotion owns

- sequence and frame-based composition
- preview playback
- deterministic replay support
- offline rendering

### Remotion does not own

- microphone capture
- audio feature extraction
- pointer and device-motion capture
- browser speech recognition
- WebRTC or peer management
- failover and ownership transfer

### SENN owns

- session participation
- peer discovery and connection
- data-channel transport
- reconnection and peer capability exchange

### V1P owns

- visual intent, state, cue, timing, health, and snapshot messages exchanged between peers

## Initial users

- A solo performer using one browser and one display
- A performer using an iPhone as controller and renderer
- Two performers sharing different control roles
- A visual-module developer creating reusable Remotion-based expressions

## MVP

The first vertical slice uses three modules:

- Flow Field
- Video Layer
- Kinetic Typography

And four bindings:

- `audio.bass -> flow.energy`
- `pointer.position -> flow.origin`
- `audio.onset -> video.jump`
- `speech.finalText -> typography.text`

The composition must be editable, serializable, reloadable, replayable from a performance log, and renderable through Remotion.

## Success criteria

- Three modules run together on iPhone Safari.
- Wiring changes are reflected immediately in the preview.
- Continuous signals do not trigger full React-tree updates at frame rate.
- A saved composition restores the same modules, sequence, and bindings.
- Recorded signals reproduce the event order and principal visual changes.
- Module failure, missing media, or unavailable speech recognition degrades safely.

## Non-goals for the first stage

- Full replacement for Resolume, TouchDesigner, or After Effects
- Arbitrary unsigned JavaScript loaded from external URLs
- A general-purpose visual programming language
- Frame-perfect multi-device pixel synchronization
- Large-scale distributed consensus
- Fully autonomous AI VJ performance
- Comprehensive MIDI, OSC, DMX, NDI, and broadcast support

## Decision rule

A feature belongs in the MVP only when it proves at least one of the following:

- a Remotion expression can operate as a reusable module;
- a live signal can safely change a module in real time;
- the same composition can move between Live, Preview, Replay, and Render;
- the performance continues under a realistic browser or module failure.
