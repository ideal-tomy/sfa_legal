import type { IntegrationPreviewItem } from "./types";

export const DEMO_BADGES = [
  "デモモード",
  "架空データ",
  "一部連携はイメージ表示",
] as const;

export const DEMO_INTRO =
  "相談受付から受任判断までの流れを、架空データで短時間に体験できるデモです。優先案件の確認、次アクション更新、ステージ変更を中心に便利さが伝わる構成にしています。";

export const DEMO_RESET_HINT =
  "操作内容はブラウザ内に保存されます。商談の前後で「初期状態に戻す」を押すと、毎回同じ導線から案内できます。";

export const MOBILE_NAV_NOTE =
  "スマホは上部ナビから主要5ページへ移動し、確認中心で必要時だけ詳細を開く構成です。";

export const HOME_STRUCTURE_NOTE =
  "ホームは『今日の優先3件』と『主要導線』をまとめ、下層ページへ迷わず移動できる入口にしています。";

export const DASHBOARD_PRIORITY_LABELS = {
  high: "高優先",
  medium: "中優先",
  low: "低優先",
} as const;

export const DASHBOARD_COPY = {
  title: "ダッシュボード（確認と次アクション）",
  subtitle:
    "相談・受任・期日・要返信の状況を3カラムで整理し、次に押す導線を明確化しています。",
  layoutPrimaryLabel: "3カラム基準",
  layoutComparisonLabel: "4カラム比較",
  comparisonDescription:
    "比較表示では右側の導線を分割し、入口の見やすさを確認できます（デフォルトは3カラム）。",
  sections: {
    high: {
      title: "高優先（期日・要返信）",
      subtitle: "今日の判断が必要な案件を先に確認します。",
    },
    medium: {
      title: "中優先（進行状況）",
      subtitle: "受任判断に向けた進行中の案件を整理します。",
    },
    low: {
      title: "低〜中優先（入口導線）",
      subtitle: "一覧ページへ1クリックで遷移できます。",
    },
  },
} as const;

export const TASK_TAB_NOTE =
  "実務タブでは、要返信・期限確認・次アクション更新が必要な案件をまとめて確認できます。";

export const DOCUMENT_TAB_NOTE =
  "書類タブでは、委任契約案・見積・資料確認など、書類起点の進捗確認をまとめて扱います。";

export const DEMO_MODE_NOTE =
  "LINE連携、フォーム起票、AI要約、顧客DB連携などは今回の本実装対象ではなく、将来拡張のイメージ表示です。";

export const DEMO_FIXED_ANNOTATION =
  "この画面は商談用デモです。表示データは架空で、外部連携とAI機能の一部は将来拡張のイメージ表示です。";

export const DEMO_LIMITATION_NOTE =
  "制限事項: 実データ連携・厳密な権限制御・監査ログは未実装です。";

export const DEMO_60SEC_FLOW = {
  title: "60秒デモ手順（見る順番）",
  steps: [
    "1. ホームで今日の優先案件を確認",
    "2. 案件一覧で進行中の相談を開く",
    "3. 詳細で次アクション更新とステージ変更を確認",
  ],
} as const;

export const DEMO_UI_STATE_COPY = {
  initializing: {
    title: "デモを初期化しています",
    description: "商談で同じ導線を再現できるよう、初期表示を準備しています。",
  },
  loading: {
    title: "画面を読み込んでいます",
    description: "相談データと優先表示を整えています。数秒で表示されます。",
  },
  empty: {
    title: "表示できるデータがありません",
    description: "「新規相談を追加」からデモ導線を開始できます。",
  },
  error: {
    title: "表示エラーが発生しました",
    description: "再試行で復帰できます。復帰しない場合は初期状態に戻してください。",
  },
} as const;

export const MINI_SFA_INTEGRATION_PREVIEW_ITEMS: IntegrationPreviewItem[] = [
  {
    id: "line-intake",
    label: "LINE相談取込",
    statusLabel: "連携イメージ",
    description:
      "LINE公式アカウントから相談内容を取り込み、受付案件として自動起票する見せ方です。",
  },
  {
    id: "web-form",
    label: "問い合わせフォーム自動起票",
    statusLabel: "対応可能",
    description:
      "既存 Web フォームの内容を案件化し、顧客名や相談概要を初期登録する想定です。",
  },
  {
    id: "ai-summary",
    label: "AI相談要約",
    statusLabel: "オプション想定",
    description:
      "面談メモや問い合わせ文から要点と次アクション候補を整え、入力負荷を下げる想定です。",
  },
  {
    id: "crm-sync",
    label: "顧客DB連携",
    statusLabel: "将来拡張",
    description:
      "既存の顧客管理や案件台帳と同期し、重複登録の抑制や先行参照を行う構成を想定しています。",
  },
];

export const ESTIMATE_RANGE_LABEL = "150万円〜250万円（税別）";
export const SECURITY_RANGE_SUBLINE =
  "ベースレンジには、HTTPS、基本的な公開前チェック、架空データ前提のデモ整備、運用開始時の最低限の説明整理を含む想定です。";
export const ONBOARDING_DAY_RATE_LABEL =
  "小さく始める構成では、月額運用費を 1 万円以内で検討しやすい余地がありますが、サポート範囲・連携有無により変動します。";
export const MVP_ONE_LINER =
  "弁護士事務所向けに、相談受付から受任判断までを一画面群で追える、最小構成の体験デモです。";

export const MVP_SCOPE_BULLETS = [
  "ダッシュボード、相談ボード、顧客・案件一覧、相談詳細の画面",
  "新規相談追加、次アクション更新、ステージ変更、ブラウザ内保存",
  "架空データ、デモモード、未実装連携の注意表示",
  "LINE・フォーム・AI・顧客DB連携は将来拡張イメージとして表示",
];

export const INCLUDES = [
  "弁護士事務所向けの相談管理MVPデモの画面設計と実装",
  "架空データの整備、localStorage 保存、初期化導線の実装",
  "モバイル幅を含む基本導線の調整",
  "既存サイト上で触れるデモとしての公開整備",
  "導入レンジ説明、含む/含まない、オプション例の整備",
  "公開前の軽量な表示・導線確認",
];

export const OPTION_SECTION_TITLE = "追加機能は別途（オプション）";
export const OPTION_SECTION_FOOTNOTE =
  "要件に応じて段階的に追加できます。正式な金額と月額費用は、仕様と運用範囲の確定後にお見積りします。";

export const OPTION_FEATURE_EXAMPLES = [
  "問い合わせフォーム・LINE・メールからの自動起票",
  "AI要約、タグ付け、次アクション候補の補助",
  "権限管理、監査ログ、厳密な利益相反確認フロー",
  "レポートや集計の追加、担当者負荷や受任率の可視化",
  "マーケティング施策や問い合わせ導線の改善支援",
];

export const OPTION_PRICING_EXAMPLES: { title: string; rangeHint: string }[] = [
  { title: "外部連携（1系統・標準API前提）", rangeHint: "20万円〜60万円" },
  {
    title: "権限管理・監査ログ・承認フロー追加",
    rangeHint: "30万円〜80万円",
  },
  { title: "AI要約・分類・入力補助の追加", rangeHint: "20万円〜50万円" },
  { title: "集計・レポート・ダッシュボード拡張", rangeHint: "20万円〜" },
];

export const DISCLAIMER_LINES = [
  "上記は「この画面イメージに近い体験デモ」を前提とした目安です。正式な金額・期間はヒアリング後にご提示します。",
  "表示内容は架空のデモであり、実在の事案・顧客とは関係ありません。",
  "LINE連携、AI要約、顧客DB連携などの表示は将来拡張のイメージであり、今回の画面では実装していません。",
];
