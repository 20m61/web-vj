# web-vj Experience Engineering

この文書は、web-vj を単なる描画機能の集合ではなく、制作、配線、リハーサル、演奏、復帰まで連続した VJ 体験として設計、実装、評価するための正本である。`CLAUDE.md`、module contract、performance budget と併用する。

## Experience principles

1. **演奏の流れを止めない** — ライブ中の主要操作は短く、予測可能で、取り消し可能にする。
2. **入力と映像の関係が分かる** — 何がどの parameter を動かしているか、信号の有無と強度を確認できる。
3. **制作とライブを同じモデルでつなぐ** — sequence、scene、module、parameter、source の意味を環境ごとに変えない。
4. **音楽的な反応を優先する** — 見た目だけでなく、同期、遅延、リズム、変化の連続性を評価する。
5. **劣化しても演奏を続けられる** — 権限拒否、デバイス不在、低性能、接続断で安全な fallback へ移る。
6. **ライブ中に壊れにくい** — 無制限な resource 作成、破壊的 state 変更、予測不能な自動切替を避ける。

## Primary actors

- VJ performer: scene を選び、入力を配線し、ライブ中に parameter と transition を操作する。
- Visual author: Remotion sequence や module を制作し、公開 parameter と制約を定義する。
- Remote participant/audience: スマホやブラウザから限定された interaction を送る。

## Core journeys

### J-VJ-01 Sequence/module を読み込む

`moduleを選ぶ -> contractを確認 -> asset/依存を解決 -> preview -> sceneへ配置`

成功条件:
- 公開 parameter、入力型、既定値、resource 要件、fallback が分かる。
- 読み込み失敗が他の scene やライブ状態を壊さない。

### J-VJ-02 入力を parameter へ配線する

`sourceを選ぶ -> signalを確認 -> parameterへmap -> range/curveを調整 -> preview -> 保存`

成功条件:
- source と target の関係、現在値、変換、clamp、遅延が見える。
- audio analysis、speech、MIDI、keyboard、touch を同じ配線概念で扱う。

### J-VJ-03 リハーサルからライブへ移る

`scene確認 -> performance budget確認 -> input/fallback確認 -> arm -> live`

成功条件:
- 不足権限、asset、device、性能リスクを live 前に検出する。
- authoring state と live state を明確に分離する。

### J-VJ-04 ライブ演奏と scene transition

`scene選択 -> parameter操作/自動反応 -> transition -> 次scene -> 継続`

成功条件:
- 操作結果と現在 scene が即座に分かる。
- transition 中も frame、audio、resource が破綻しない。
- 危険な編集は preview または queued change として扱う。

### J-VJ-05 障害・性能劣化から復帰

`frame drop/audio glitch/input loss/disconnect -> degraded表示 -> fallback/停止/再接続 -> 演奏継続`

成功条件:
- 無反応のまま放置せず、失われた機能と利用可能な代替を示す。
- scene 全体を再読み込みせず復帰できる範囲を最大化する。

### J-VJ-06 モバイル interaction

`session参加 -> 許可されたcontrol表示 -> 操作 -> visual反応 -> session終了`

成功条件:
- audience が performer の制御権を奪わない。
- 接続断、連打、不正値、複数端末を安全に扱う。

## Performance state model

`authoring -> previewing -> rehearsing -> armed -> live -> ended`

例外状態:

`degraded | input_missing | permission_denied | reconnecting | fallback_active | safe_stop`

各状態は次を定義する。
- allowed edits and controls
- active scene/module/source
- resource ownership and cleanup
- performance budget
- fallback behavior
- visible status
- transition guard

## UX pattern contracts

- **Module contract**: 入出力、parameter、asset、lifecycle、cleanup、fallback を明記する。
- **Mapping inspector**: source、raw value、transform、target value、latency を一列で追える。
- **Signal status**: connected、silent、clipped、stale、permission denied を区別する。
- **Safe live edit**: 即時適用、次 beat/scene で適用、preview only を明示する。
- **Scene transition**: 現在、次、duration、trigger、cancel/fallback を表示する。
- **Degraded mode**: frame/audio/input のどれが劣化したかと継続方法を示す。
- **Remote control boundary**: audience が変更可能な範囲、rate limit、session owner を明示する。

## Issue / implementation contract

ユーザー向け変更は以下を必須記載する。

- Actor / performance outcome
- Related journey ID and step
- Entry, exit and degraded states
- Target module/sequence/source/parameter
- Interaction and timing contract
- Performance budget and fallback
- Resource lifecycle and cleanup
- Experience acceptance criteria
- Evaluation level and target browser/device

## Evaluation ladder

1. **Static/contract**: module API、parameter semantics、token、用語、lifecycle、fallback。
2. **Deterministic tests**: mapping、range、event order、state transition、resource cleanup。
3. **Instrumentation**: frame time、dropped frames、long task、audio/visual drift、input latency、memory。
4. **DOM/control review**: mapping、状態、主要操作、live safety、keyboard/touch accessibility。
5. **Screenshot**: authoring UI や視覚階層が変わる範囲だけ。
6. **Short capture/replay**: J-VJ-02〜05 の同期、transition、劣化復帰を評価する。
7. **Human rehearsal**: 実ブラウザ、実音源、実入力、低性能条件でライブ前確認する。

## Outcome metrics

- module 読み込み成功率と失敗からの復帰率
- source-to-visual 入力遅延
- audio/visual drift
- dropped frames、long task、audio glitch
- mapping のやり直し回数
- live 中の誤操作と safe recovery
- device/permission 不在時の継続率
- remote interaction の拒否・rate limit・disconnect 件数
- session 終了後の resource cleanup

## Loop rule

各周回は `Performance journey -> State/timing contract -> Module and mapping contract -> Playable vertical slice -> Instrumented evaluation -> Rehearsal outcome` の順で進める。スクリーンショットだけでは完了せず、実際に入力へ反応し、同期し、劣化時に演奏を継続できることを証拠にする。
