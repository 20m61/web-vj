# CLAUDE.md — web-vj

web-vj は、音声・映像・タイポグラフィ・3D・外部入力をリアルタイムに配線するブラウザベースのライブビジュアル基盤である。

## Product direction

- 音楽と入力に反応する映像を、ライブ中に止めずに操作できること。
- Remotion sequence、visual module、effect、input source を交換可能なモジュールとして扱うこと。
- 音声解析、音声認識、MIDI、キーボード、カメラ等を型付きの parameter routing で接続すること。
- デモ映像だけでなく、再現可能な固定入力で品質と性能を検証できること。

## Working method

1. Issue、利用シナリオ、完了条件を確認する。
2. 変更前に `docs/architecture/module-contract.md` と関連仕様を読む。
3. 水平基盤だけを作らず、入力→配線→描画→操作→検証までの薄い縦スライスを優先する。
4. TODO、未接続 UI、動かないスタブを完了扱いにしない。
5. UI・ランタイム挙動を変えた場合は docs と検証シナリオを同じ PR で更新する。

## Agent operating rules

- 通常 Issue はメインエージェントが調査・設計・実装・レビューまで担当する。
- サブエージェントは原則 0。独立した大規模調査または専門レビューのみ最大 1。
- モジュール境界が確立するまで並列の書き込み実装を行わない。
- 「再確認」「別エージェントで再レビュー」を習慣化せず、決定的なテストと性能計測で検証する。
- production deploy、外部公開、ライセンスを伴う素材追加、破壊的な保存形式変更は人間確認を必要とする。

## Completion contract

```yaml
objective:
acceptance_criteria: []
non_goals: []
invariants: []
allowed_scope: []
required_gates: []
human_gate: none
execution_profile: medium
delegation_budget: 0
stop_conditions: []
```

## Required quality concerns

変更に応じて次を検証する。

- typecheck / lint / unit test / build
- 固定音源または固定イベント列での再現性
- FPS、フレーム落ち、入力から描画までの遅延
- WebGL / AudioNode / MediaStream の破棄
- 音声・カメラ権限拒否、入力切断、モジュールロード失敗
- 長時間稼働時のメモリ増加
- parameter routing の型・範囲・fallback
- キーボード、MIDI、音声入力の競合
- ライブ中に描画ループを停止させないこと

詳細は `docs/development/agent-operating-profile.md` と `docs/architecture/module-contract.md` を参照する。
