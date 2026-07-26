# CLAUDE.md — web-vj

ブラウザ上で映像、音声、タイポグラフィ、3D、映像素材、インタラクションをリアルタイムに組み合わせるVJ実行・制作基盤。

## Current direction

- Remotion sequenceを再利用可能なobject/moduleとして読み込む
- moduleの公開parameterをリアルタイム入力へ配線する
- audio analysis、Web Speech API、MIDI/keyboard/touch等を入力sourceとして扱う
- live performanceと編集/sequence authoringを同一モデルで接続する
- visual素材、typography、layer、effect、scene、transitionを一貫したgraphとして扱う

## Autonomous development loop

1. 編集前に現行実装、README、関連Issue、既存のvisual/audio処理を調査する。
2. 変更範囲、非変更範囲、受入条件、性能予算、検証方法を明示する。
3. 一度に一つの演奏可能・デモ可能なvertical sliceを完成させる。
4. Opus 5はarchitecture、module contract、interaction graph、難しい同期/性能障害へ使う。
5. 通常実装はSonnet、探索は読み取り専用の安価なagentへ委任する。
6. サブエージェントは独立した大規模作業だけに使い、同じscene/moduleを並行編集させない。
7. 同じ失敗が3回続いたらパッチを止め、timing、frame、audio clock、render loop、browser API、GPU/CPUを分けて根本原因分析する。

## Non-negotiable quality

- audioとvisualの同期を主観だけで完了判定しない
- frame drop、memory leak、audio glitch、long taskを計測する
- autoplay、permission、device absenceのfallbackを持つ
- browser固有APIはcapability detectionを行う
- test削除、skip、閾値緩和でgreenにしない
- live中に破壊的state migrationやunbounded resource creationを行わない

## Human decision boundary

- module/plugin public contractの破壊的変更
- project/save formatの非互換変更
- microphone/camera/recordingデータの保存・外部送信
- 新しい有料サービスやライセンス制約のある素材/依存
- deployment方式の変更
- performance budgetを意図的に悪化させる判断

## Completion evidence

build/testに加えて、代表sceneの実ブラウザ再生、入力sourceの配線、parameter変化、同期、frame time、console error、resource cleanupを確認する。visual変更は比較可能なscreenshotまたは短いcaptureを残す。
