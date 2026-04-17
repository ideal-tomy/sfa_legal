"use client";

import { useState } from "react";
import {
  CONFLICT_CHECK_STATUS_OPTIONS,
  DEAL_STAGE_LABEL,
  DEAL_STAGE_ORDER,
} from "../constants";
import type { DealCard, DealStageId, MiniSfaViewState } from "../types";
import { MiniSfaStatePanel } from "./MiniSfaStatePanel";

interface MiniSfaDealDetailProps {
  deal: DealCard | null;
  onMoveStage: (dealId: string, stage: DealStageId) => void;
  onUpdateDeal: (dealId: string, patch: Partial<DealCard>) => void;
  onBackToList?: () => void;
  backLabel?: string;
  viewState?: MiniSfaViewState;
  onRetry?: () => void;
}

function buildAiSuggestions(deal: DealCard): string[] {
  const suggestions: Record<DealStageId, string[]> = {
    intake: [
      "相談概要を整えて初回面談候補日を送付する",
      "受付内容を確認して必要資料の案内を送る",
    ],
    first_meeting: [
      "面談メモを要約し、必要資料と次回論点を共有する",
      "家族構成や契約関係など不足資料の回収を進める",
    ],
    conflict_check: [
      "関連当事者の確認結果をまとめて最終可否を連絡する",
      "利益相反確認の不足項目を社内共有する",
    ],
    proposal: [
      "見積と委任契約案の差分を説明して回答期限を確認する",
      "先方コメントを反映した契約案を再送する",
    ],
    retainer_likely: [
      "受任条件を最終確認して委任契約締結へ進める",
      "社内承認用の要点メモを作成して先方へ共有する",
    ],
    retained: [
      "キックオフ日程を確定して初回議題を送る",
      "体制と連絡フローを整理して運用を開始する",
    ],
    closed_lost: [
      "見送り理由を残し、再接触タイミングを設定する",
      "失注理由を整理して再提案余地を確認する",
    ],
  };

  return suggestions[deal.stage];
}

function buildAutomationBadges(deal: DealCard): string[] {
  const badges = ["AI要約候補", "デモ同期表示"];

  if (deal.inquiryChannel === "Web") badges.unshift("フォーム起票想定");
  if (deal.inquiryChannel === "LINE") badges.unshift("LINE相談連携想定");
  if (deal.inquiryChannel === "紹介") badges.unshift("紹介案件");
  if (deal.conflictCheckStatus && deal.conflictCheckStatus !== "問題なし") {
    badges.push("利益相反チェック");
  }

  return badges.slice(0, 4);
}

export function MiniSfaDealDetail({
  deal,
  onMoveStage,
  onUpdateDeal,
  onBackToList,
  backLabel,
  viewState,
  onRetry,
}: MiniSfaDealDetailProps) {
  const [nextAction, setNextAction] = useState(deal?.nextAction ?? "");
  const [nextActionDate, setNextActionDate] = useState(deal?.nextActionDate ?? "");
  const [note, setNote] = useState(deal?.note ?? "");

  if (viewState && viewState.status !== "ready") {
    return (
      <MiniSfaStatePanel state={viewState} actionLabel="再試行する" onAction={onRetry} />
    );
  }

  if (!deal) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 text-sm text-slate-400">
        相談を選択すると、ここに詳細が表示されます。
      </div>
    );
  }

  const aiSuggestions = buildAiSuggestions(deal);
  const automationBadges = buildAutomationBadges(deal);

  const saveActionFields = () => {
    if (!nextAction.trim() || !nextActionDate) return;

    onUpdateDeal(deal.id, {
      nextAction: nextAction.trim(),
      nextActionDate,
      note: note.trim() || undefined,
      lastContactAt: new Date().toISOString().slice(0, 10),
    });
  };

  const applyQuickDate = (mode: "today" | "tomorrow" | "nextWeek") => {
    const date = new Date("2026-04-02T12:00:00");
    if (mode === "tomorrow") date.setDate(date.getDate() + 1);
    if (mode === "nextWeek") date.setDate(date.getDate() + 7);
    const updated = date.toISOString().slice(0, 10);
    setNextActionDate(updated);
    onUpdateDeal(deal.id, { nextActionDate: updated, lastContactAt: "2026-04-02" });
  };

  const toggleDone = () => {
    onUpdateDeal(deal.id, { taskDone: !deal.taskDone, lastContactAt: "2026-04-02" });
  };

  const historyRows =
    deal.activityHistory ?? [
      `${deal.lastContactAt} 担当者が相談内容を更新`,
      `${deal.nextActionDate} 次アクションを設定`,
      `${deal.lastContactAt} 顧客連絡履歴を記録`,
    ];
  const relatedDocuments =
    deal.relatedDocuments ?? ["初回ヒアリングメモ", "見積案", "委任契約ドラフト"];

  return (
    <div className="space-y-4 rounded-[24px] border border-slate-700 bg-slate-900/80 p-4 md:p-5">
      {onBackToList ? (
        <button
          type="button"
          onClick={onBackToList}
          className="rounded-xl border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-slate-500"
        >
          {backLabel ?? "一覧へ戻る"}
        </button>
      ) : null}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            選択中の相談
          </p>
          <p className="mt-1 text-xl font-medium text-cyan-300">{deal.title}</p>
          <p className="mt-1 text-sm text-slate-300">{deal.clientName}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">{deal.summary}</p>
        </div>
        <div className="shrink-0 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3">
          <p className="text-xs text-slate-400">現在ステージ</p>
          <p className="mt-1 text-sm font-semibold text-cyan-200">
            {DEAL_STAGE_LABEL[deal.stage]}
          </p>
          <p className="mt-1 text-xs text-slate-500">次回アクション日 {deal.nextActionDate}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {automationBadges.map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-[11px] font-medium text-slate-300"
          >
            {badge}
          </span>
        ))}
      </div>

      <section className="rounded-2xl border border-cyan-400/20 bg-slate-950/60 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-white">次アクション</p>
            <p className="mt-1 text-xs text-slate-400">
              次アクションとステージ変更をファーストビューに配置しています。
            </p>
          </div>
          <button
            type="button"
            onClick={saveActionFields}
            disabled={!nextAction.trim() || !nextActionDate}
            className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            次アクションを保存
          </button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="block">
            <span className="text-xs font-medium text-slate-400">次アクション</span>
            <input
              value={nextAction}
              onChange={(event) => setNextAction(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-0 focus:border-cyan-300"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-400">次回アクション日</span>
            <input
              type="date"
              value={nextActionDate}
              onChange={(event) => setNextActionDate(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-0 focus:border-cyan-300"
            />
          </label>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => applyQuickDate("today")}
            className="rounded-lg border border-slate-700 px-2 py-1 text-xs text-slate-200"
          >
            今日
          </button>
          <button
            type="button"
            onClick={() => applyQuickDate("tomorrow")}
            className="rounded-lg border border-slate-700 px-2 py-1 text-xs text-slate-200"
          >
            明日
          </button>
          <button
            type="button"
            onClick={() => applyQuickDate("nextWeek")}
            className="rounded-lg border border-slate-700 px-2 py-1 text-xs text-slate-200"
          >
            来週
          </button>
          <button
            type="button"
            onClick={toggleDone}
            className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-xs text-emerald-200"
          >
            {deal.taskDone ? "完了を戻す" : "完了チェック"}
          </button>
        </div>

        <div className="mt-4">
          <p className="text-xs font-medium text-slate-400">AI候補</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {aiSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setNextAction(suggestion)}
                className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200 hover:bg-cyan-400/15"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div>
        <p className="mb-2 text-xs font-medium text-slate-400">ステージを変更</p>
        <div className="flex flex-wrap gap-2">
          {DEAL_STAGE_ORDER.map((stage) => (
            <button
              key={stage}
              type="button"
              onClick={() => onMoveStage(deal.id, stage)}
              className={`rounded-xl border px-3 py-2 text-sm transition ${
                deal.stage === stage
                  ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                  : "border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500"
              }`}
            >
              {DEAL_STAGE_LABEL[stage]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
          <p className="text-sm font-semibold text-white">履歴</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {historyRows.map((row) => (
              <li key={row} className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
                {row}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
          <p className="text-sm font-semibold text-white">関連書類</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {relatedDocuments.map((doc) => (
              <li key={doc} className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
                {doc}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
          <p className="text-sm font-semibold text-white">連携・判断補助</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-slate-400">利益相反確認</p>
              <p className="mt-1 text-sm text-slate-200">
                {deal.conflictCheckStatus ?? "未設定"}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">費用レンジメモ</p>
              <p className="mt-1 text-sm text-slate-200">
                {deal.estimatedValueLabel ?? "未設定"}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {CONFLICT_CHECK_STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() =>
                  onUpdateDeal(deal.id, {
                    conflictCheckStatus: status,
                    lastContactAt: new Date().toISOString().slice(0, 10),
                  })
                }
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  deal.conflictCheckStatus === status
                    ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                    : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
          <label className="block">
            <span className="text-sm font-semibold text-white">申し送り</span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className="mt-2 min-h-28 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-300"
            />
          </label>
          <p className="mt-2 text-xs text-slate-500">
            保存時に最新接触日を更新し、案件一覧やダッシュボードに反映します。
          </p>
        </section>
      </div>

      <details className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
        <summary className="cursor-pointer list-none text-sm font-semibold text-white">
          顧客・案件情報をみる
        </summary>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div>
            <p className="text-xs font-medium text-slate-400">担当者</p>
            <p className="mt-1 text-sm text-slate-200">{deal.assignee}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">紹介元</p>
            <p className="mt-1 text-sm text-slate-200">{deal.referrer}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">流入経路</p>
            <p className="mt-1 text-sm text-slate-200">{deal.inquiryChannel}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">案件種別</p>
            <p className="mt-1 text-sm text-slate-200">{deal.practiceArea}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">担当窓口</p>
            <p className="mt-1 text-sm text-slate-200">{deal.contactName}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">最終接触日</p>
            <p className="mt-1 text-sm text-slate-200">{deal.lastContactAt}</p>
          </div>
        </div>
      </details>
      </div>
  );
}
