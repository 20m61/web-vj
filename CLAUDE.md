# CLAUDE.md — web-vj

ブラウザ上で映像、音声、タイポグラフィ、3D、映像素材、インタラクションをリアルタイムに組み合わせるVJ実行・制作基盤。ユーザー向け変更では `docs/experience/README.md` を体験設計の正本として併用する。

## Current direction

- Remotion sequenceを再利用可能なobject/moduleとして読み込む
- moduleの公開parameterをリアルタイム入力へ配線する
- audio analysis、Web Speech API、MIDI/keyboard/touch等を入力sourceとして扱う
- live performanceと編集/sequence authoringを同一モデルで接続する
- visual素材、typography、layer、effect、scene、transitionを一貫したgraphとして扱う

## Autonomous development loop

1. 編集前に現行実装、README、関連Issue、既存のvisual/audio処理を調査する。
2. `docs/experience/README.md` から Actor、Journey ID/step、entry/exit/degraded state を特定する。
3. 変更範囲、非変更範囲、体験・技術の受入条件、性能予算、fallback、検証方法を明示する。
4. `.claude/state/loop-state.md` に module/sequence/source/parameter、timing contract、resource lifecycle、評価レベルを記録する。
5. 一度に一つの演奏可能・デモ可能なvertical sliceを完成させる。
6. Opus 5はarchitecture、module contract、interaction graph、journey/state整合、難しい同期/性能障害へ使う。
7. 通常実装はSonnet、探索は読み取り専用の安価なagentへ委任する。
8. サブエージェントは独立した大規模作業だけに使い、同じscene/moduleを並行編集させない。
9. 同じ失敗が3回続いたらパッチを止め、timing、frame、audio clock、render loop、browser API、GPU/CPUを分けて根本原因分析する。

## Experience loop

`Performance journey -> State/timing contract -> Module and mapping contract -> Playable vertical slice -> Instrumented evaluation -> Rehearsal outcome`

ユーザー向け変更は最低限以下を定義する。

- Actor / performance outcome
- Related journey ID and step
- Entry, exit and degraded states
- Target module/sequence/source/parameter
- Interaction and timing contract
- Performance budget and fallback
- Resource lifecycle and cleanup
- Experience acceptance criteria
- Evaluation level and target browser/device

スクリーンショットだけでは完了せず、実際に入力へ反応し、同期し、劣化時に演奏を継続できることを証拠にする。

## Non-negotiable quality

- audioとvisualの同期を主観だけで完了判定しない
- frame drop、memory leak、audio glitch、long taskを計測する
- autoplay、permission、device absenceのfallbackを持つ
- browser固有APIはcapability detectionを行う
- source、transform、target parameter の関係を追跡可能にする
- authoring、armed、live、degraded state を混同しない
- test削除、skip、閾値緩和でgreenにしない
- live中に破壊的state migrationやunbounded resource creationを行わない

## Layered evaluation

1. static/contract: module API、parameter semantics、lifecycle、fallback
2. deterministic tests: mapping、range、event order、state transition、cleanup
3. instrumentation: frame time、dropped frames、long task、A/V drift、input latency、memory
4. DOM/control review: mapping、状態、主要操作、live safety、keyboard/touch
5. screenshot: authoring UI や視覚階層が変わる範囲だけ
6. short capture/replay: 同期、transition、degraded recovery
7. human rehearsal: 実ブラウザ、実音源、実入力、低性能条件

## Human decision boundary

- module/plugin public contractの破壊的変更
- project/save formatの非互換変更
- microphone/camera/recordingデータの保存・外部送信
- 新しい有料サービスやライセンス制約のある素材/依存
- deployment方式の変更
- performance budgetを意図的に悪化させる判断
- 主要 performance journey / state / live safety contract の意味変更

## Completion evidence

build/testに加えて、代表sceneの実ブラウザ再生、入力sourceの配線、parameter変化、同期、frame time、console error、resource cleanupを確認する。visual変更は比較可能なscreenshotまたは短いcaptureを、性能・同期変更は計測値を残す。
