# 士業向けミニSFA（相談〜受任の見える化） 実装PLAN

対象: `/experience/legal-professional-mini-sfa-demo`  
関連:

- [`legal-professional-mini-sfa-requirements.md`](./legal-professional-mini-sfa-requirements.md)
- [`legal-professional-mini-sfa-design-requirements.md`](./legal-professional-mini-sfa-design-requirements.md)
- [`legal-professional-mini-sfa-non-functional-requirements.md`](./legal-professional-mini-sfa-non-functional-requirements.md)
- [`legal-professional-mini-sfa-technical-requirements.md`](./legal-professional-mini-sfa-technical-requirements.md)

---

## 1. このドキュメントの目的

- 要件書で整理した内容を、実装順と公開準備の観点で 1 枚にまとめる。
- 既存サイト上の紹介用UIを、**実際に触れて体験できる公開デモ** に仕上げるための進め方を固定する。
- 今回は **ブラウザ完結の体験デモ** を優先し、外部連携はプレビュー表示に留める。

---

## 2. 実装ゴール

以下を満たしたら、今回のデモ実装は成立とみなす。

1. ダッシュボード、相談ボード、顧客・案件一覧、詳細、新規相談登録がブラウザ内で動く。
2. ステージ更新、新規相談追加、次アクション更新がその場で反映される。
3. 状態は `localStorage` に保持され、必要に応じて初期化できる。
4. 架空データ、デモモード、未実装連携の扱いが明確に表示される。
5. 既存サイトからデモへ入り、最低限の操作を迷わず試せる。

---

## 3. 実装対象ファイルの想定

| 種別 | 想定ファイル |
|------|------|
| 体験本体 | `src/components/experience/prototypes/ProfessionalMiniSfaExperience.tsx` |
| ダッシュボード | `src/components/experience/prototypes/professional-mini-sfa/MiniSfaDashboardTab.tsx` |
| 相談ボード | `src/components/experience/prototypes/professional-mini-sfa/MiniSfaBoardTab.tsx` |
| 顧客一覧 | `src/components/experience/prototypes/professional-mini-sfa/MiniSfaContactsTab.tsx` |
| 詳細 | `src/components/experience/prototypes/professional-mini-sfa/MiniSfaDealDetail.tsx` |
| 新規相談登録 | `src/components/experience/prototypes/professional-mini-sfa/MiniSfaCreateDealDialog.tsx` |
| 連携プレビュー | `src/components/experience/prototypes/professional-mini-sfa/MiniSfaIntegrationPreview.tsx` |
| 状態管理 | `src/hooks/use-professional-mini-sfa-demo.ts` |
| 型 | `src/lib/experience/professional-mini-sfa/types.ts` |
| 初期データ | `src/lib/experience/professional-mini-sfa/mock-deals.ts` |
| 集計 | `src/lib/experience/professional-mini-sfa/selectors.ts` |
| 保存 | `src/lib/experience/professional-mini-sfa/storage.ts` |
| 文言 | `src/lib/experience/professional-mini-sfa/demo-copy.ts` / `estimate-anchors.ts` |
| 導線 | `src/lib/experience/prototype-registry.ts` または既存サイト側の導線定義箇所 |

---

## 4. 推奨実装順

### Phase 1: 骨格の安定化

- 既存 `ProfessionalMiniSfaExperience` の責務を確認し、分割方針を確定する。
- ステージ定義、案件型、初期データを最新要件へ合わせる。
- 集計処理を `selectors.ts` へ寄せる。

### Phase 2: 主要操作の成立

- ダッシュボード、相談ボード、顧客一覧、詳細パネルを接続する。
- 新規相談追加、ステージ更新、次アクション更新を実装する。
- 主要操作後に画面全体へ即時反映される状態管理を整える。

### Phase 3: デモ体験の成立

- `localStorage` 保存と復元を実装する。
- `初期状態に戻す` 導線を追加する。
- 架空データ、デモモード、正式見積ではない旨の注意表示を追加する。

### Phase 4: 将来連携の見せ方

- LINE、Webフォーム、AI要約、顧客DB連携などのプレビュー表示を追加する。
- `連携イメージ` `将来拡張` `オプション想定` などのラベルで誤認を防ぐ。
- 実通信は行わず、静的データで成立させる。

### Phase 5: 公開前仕上げ

- 既存サイトから対象デモへの導線を整える。
- モバイルとデスクトップの導線を確認する。
- 概算レンジ説明を最新要件に合わせて更新する。

---

## 5. 先に着手すべき順番

1. `types.ts` `constants.ts` `mock-deals.ts` を整える
2. `selectors.ts` と `storage.ts` を整える
3. `use-professional-mini-sfa-demo.ts` を作る
4. `ProfessionalMiniSfaExperience.tsx` を分割・接続する
5. `MiniSfaCreateDealDialog.tsx` と `MiniSfaDealDetail.tsx` を仕上げる
6. `MiniSfaIntegrationPreview.tsx` と `demo-copy.ts` を追加する
7. 概算レンジ説明と既存サイト導線を更新する

---

## 6. 実装上の注意

- 相談管理の語彙を維持し、営業SFAの匂いを強くしすぎない。
- 実在人物や実在案件を想起させるデータは使わない。
- `月額1万円以内` の表現は固定約束ではなく、軽量導入レンジとして扱う。
- 未実装機能を、今すぐ使えるボタンのように見せない。
- 画面説明と実際の挙動がずれないことを優先する。

---

## 7. デプロイまでの確認項目

1. 主要操作がクラッシュせず通しで動く
2. リロード後も状態が保持される
3. 初期化で必ず既定データへ戻る
4. 連携プレビューが未実装前提で読める
5. 架空データと正式見積ではない旨が表示される
6. モバイル幅でも主要導線が崩れない
7. 既存サイトからデモへ到達できる

---

## 8. 商談用チェックリスト

1. 60秒デモ導線で説明できる
2. 3分デモ導線でも情報過多にならない
3. 新規相談追加とステージ更新をその場で見せられる
4. 将来連携の説明を、誤認なく補足できる
5. 価格表現が過剰な約束に見えない

---

## 9. 完了の定義

1. 初見ユーザーが、公開URL上で何を試せばよいか理解できる。
2. 代表弁護士、事務スタッフ、担当者のいずれの視点でも価値が伝わる。
3. 「まず小さく始められる」という印象と、「将来広げられる」という印象を両立できる。
4. 実装済みと未実装の境界が正直に表現されている。

---

## 10. 変更履歴

| 日付 | 内容 |
|------|------|
| 2026-04-12 | 初版作成 |
