"use client";

import { useState } from "react";
import {
  CONFLICT_CHECK_STATUS_OPTIONS,
  DEAL_STAGE_LABEL,
  DEAL_STAGE_ORDER,
} from "../constants";
import type { DealCard, DealStageId } from "../types";

interface MiniSfaDealDetailProps {
  deal: DealCard | null;
  onMoveStage: (dealId: string, stage: DealStageId) => void;
  onUpdateDeal: (dealId: string, patch: Partial<DealCard>) => void;
}

export function MiniSfaDealDetail({
  deal,
  onMoveStage,
  onUpdateDeal,
}: MiniSfaDealDetailProps) {
  const [nextAction, setNextAction] = useState(deal?.nextAction ?? "");
  const [nextActionDate, setNextActionDate] = useState(deal?.nextActionDate ?? "");
  const [note, setNote] = useState(deal?.note ?? "");

  if (!deal) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 text-sm text-slate-400">
        相談を選択すると、ここに詳細が表示されます。
      </div>
    );
  }

  const saveActionFields = () => {
    if (!nextAction.trim() || !nextActionDate) return;

    onUpdateDeal(deal.id, {
      nextAction: nextAction.trim(),
      nextActionDate,
      note: note.trim() || undefined,
      lastContactAt: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <div className="space-y-4 rounded-2xl border border-slate-700 bg-slate-900/80 p-4 md:p-5">
      <div>
        <h3 className="text-base font-semibold text-white">選択中の相談</h3>
        <p className="mt-1 text-xl font-medium text-cyan-300">{deal.title}</p>
        <p className="mt-1 text-sm text-slate-300">{deal.clientName}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
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
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400">相談概要</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-200">
          {deal.summary}
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
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

      <label className="block">
        <span className="text-xs font-medium text-slate-400">申し送り</span>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          className="mt-1 min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-300"
        />
      </label>

      <div className="grid gap-3 md:grid-cols-2">
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

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={saveActionFields}
          disabled={!nextAction.trim() || !nextActionDate}
          className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
        >
          次アクションを保存
        </button>
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
    </div>
  );
}
