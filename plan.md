# 修正計画

1. `useKeyPress` の既存keydown/keyup/blur処理を維持する。
2. portalのpackage.jsonは `main: dist/ReactFlow.js` / `module: dist/ReactFlow.esm.js` を読むため、source修正だけで完了扱いにせず、4つの配布dist（通常/esm、css/nocss）にも同じ修正を反映する。
3. keyCodeがShift/Control/Metaなどの修飾キーで、pointerイベント上そのキーが押されていない場合だけ `setKeyPressed(false)` にする。
4. `pointermove` と `pointerdown` の両方を購読し、最初のクリック前に移動がないケースも扱う。
5. pointerイベントからtrueへ同期せず、欠落したkeyupによるstaleなtrueの解除だけに限定する。
6. hook testを追加し、通常keydown/keyup、pointermove解除、pointerdown解除、実押下中の維持、cleanupを確認する。

## 検証

- `git diff --check`: 成功。
- 配布distの`node --check`: 成功。
- portal `npm run build`: 成功。
- macOSスクリーンショット後のドラッグ: LGTM。
- commit/push: 未実施。

## 完了状況

- [x] 修飾キーなしのpointermoveでstaleなShift状態を解除する。
- [x] pointermoveがない場合もpointerdown/mousedownで解除する。
- [x] Shiftを実際に押しているpointerイベントでは解除しない。
- [x] `UserSelection` / `ZoomPane`が実イベントのShiftなし操作を範囲選択として開始しない。
- [x] sourceと4つの配布distへ反映する。
- [x] portalのlocal依存として読み込み、macOS実機確認する。
