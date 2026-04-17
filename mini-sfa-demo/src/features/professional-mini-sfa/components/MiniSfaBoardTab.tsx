"use client";

import type { ReactNode } from "react";
import { DEAL_STAGE_LABEL, DEAL_STAGE_ORDER, DEMO_TODAY } from "../constants";
import type { DealCard, DealStageId, MiniSfaViewState } from "../types";
import { MiniSfaStatePanel } from "./MiniSfaStatePanel";

interface MiniSfaBoardTabProps {
  deals: DealCard[];
  selectedDealId: string | null;
  selectedDeal: DealCard | null;
  onSelectDeal: (dealId: string) => void;
  mobileBoardStage: DealStageId;
  setMobileBoardStage: (stage: DealStageId) => void;
  mobileDealDetailOpen: boolean;
  setMobileDealDetailOpen: (open: boolean) => void;
  detail: ReactNode;
  viewState: MiniSfaViewState;
  onRetry: () => void;
  onCreateDeal: () => void;
}

export function MiniSfaBoardTab({
  deals,
  selectedDealId,
  selectedDeal,
  onSelectDeal,
  mobileBoardStage,
  setMobileBoardStage,
  mobileDealDetailOpen,
  setMobileDealDetailOpen,
  detail,
  viewState,
  onRetry,
  onCreateDeal,
}: MiniSfaBoardTabProps) {
  const handleMobileSelect = (dealId: string) => {
    onSelectDeal(dealId);
    setMobileDealDetailOpen(true);
  };

  if (viewState.status !== "ready") {
    return (
      <MiniSfaStatePanel
        state={viewState}
        actionLabel={viewState.status === "empty" ? "新規相談を追加" : "再試行する"}
        onAction={viewState.status === "empty" ? onCreateDeal : onRetry}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-[24px] border border-slate-800 bg-slate-950/60 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">案件一覧（進行）</h2>
            <p className="mt-1 text-sm text-slate-400">
              一覧で案件状況を確認し、詳細画面で次アクション更新やステージ変更を行えます。
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-slate-400">
            <span className="rounded-full border border-slate-700 px-3 py-1">
              進行中 {deals.filter((deal) => deal.stage !== "retained" && deal.stage !== "closed_lost").length}件
            </span>
            <span className="rounded-full border border-slate-700 px-3 py-1">
              選択中 {selectedDeal ? selectedDeal.title : "未選択"}
            </span>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <p className="mb-3 text-sm text-slate-400">
          ステージを切り替え、案件カードをタップすると全画面で詳細を確認できます。
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {DEAL_STAGE_ORDER.map((stage) => {
            const columnDeals = deals.filter((deal) => deal.stage === stage);
            const active = mobileBoardStage === stage;
            return (
              <button
                key={stage}
                type="button"
                onClick={() => setMobileBoardStage(stage)}
                className={`shrink-0 rounded-full border px-3 py-2 text-xs font-medium transition ${
                  active
                    ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                    : "border-slate-700 text-slate-400 hover:border-slate-500"
                }`}
              >
                {DEAL_STAGE_LABEL[stage]}（{columnDeals.length}）
              </button>
            );
          })}
        </div>

        <ul className="mt-4 space-y-3">
          {deals
            .filter((deal) => deal.stage === mobileBoardStage)
            .map((deal) => (
              <li key={deal.id}>
                <button
                  type="button"
                  onClick={() => handleMobileSelect(deal.id)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    selectedDealId === deal.id
                      ? "border-cyan-400/40 bg-cyan-400/10 text-white"
                      : "border-slate-700 bg-slate-950/70 hover:border-slate-500"
                  }`}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="block min-w-0">
                      <span className="block text-sm font-medium">{deal.title}</span>
                      <span className="mt-1 block text-xs text-slate-400">{deal.clientName}</span>
                    </span>
                    <span
                      className={`rounded-full px-2 py-1 text-[11px] font-medium ${
                        deal.nextActionDate < DEMO_TODAY
                          ? "bg-amber-400/10 text-amber-200"
                          : deal.stage === "retainer_likely"
                            ? "bg-emerald-400/10 text-emerald-200"
                            : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {deal.nextActionDate < DEMO_TODAY
                        ? "要対応"
                        : deal.stage === "retainer_likely"
                          ? "受任見込"
                          : "通常"}
                    </span>
                  </span>
                  <span className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-400">
                    <span>次 {deal.nextActionDate}</span>
                    <span>{deal.assignee}</span>
                    <span>{deal.inquiryChannel}</span>
                    <span>{deal.practiceArea}</span>
                  </span>
                </button>
              </li>
            ))}
        </ul>
      </div>

      <div className="hidden gap-4 md:block">
        <div className="xl:grid xl:grid-cols-[minmax(0,1.5fr)_360px] xl:gap-4">
          <div className="min-w-0">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {DEAL_STAGE_ORDER.map((stage) => {
                const columnDeals = deals.filter((deal) => deal.stage === stage);
                return (
                  <section
                    key={stage}
                    className="min-w-64 rounded-2xl border border-slate-700 bg-slate-900/60"
                  >
                    <div className="border-b border-slate-700 px-3 py-3">
                      <p className="text-sm font-semibold text-cyan-300">
                        {DEAL_STAGE_LABEL[stage]}
                      </p>
                      <p className="text-xs text-slate-400">{columnDeals.length}件</p>
                    </div>
                    <ul className="max-h-[56vh] space-y-2 overflow-y-auto p-2">
                      {columnDeals.length === 0 ? (
                        <li className="rounded-xl border border-dashed border-slate-700 px-3 py-3 text-xs text-slate-500">
                          相談はありません
                        </li>
                      ) : (
                        columnDeals.map((deal) => (
                          <li key={deal.id}>
                            <button
                              type="button"
                              onClick={() => onSelectDeal(deal.id)}
                              className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                                selectedDealId === deal.id
                                  ? "border-cyan-400/40 bg-cyan-400/10"
                                  : "border-slate-700 bg-slate-950/70 hover:border-slate-500"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <span className="block text-sm font-medium text-slate-50">
                                  {deal.title}
                                </span>
                                <span className="text-[11px] text-slate-500">{deal.nextActionDate}</span>
                              </div>
                              <span className="mt-1 block text-xs text-slate-400">
                                {deal.clientName}
                              </span>
                              <span className="mt-2 flex flex-wrap gap-1">
                                <span className="rounded-full bg-slate-800 px-2 py-1 text-[11px] text-slate-300">
                                  {deal.inquiryChannel}
                                </span>
                                <span className="rounded-full bg-slate-800 px-2 py-1 text-[11px] text-slate-300">
                                  {deal.assignee}
                                </span>
                              </span>
                            </button>
                          </li>
                        ))
                      )}
                    </ul>
                  </section>
                );
              })}
            </div>
          </div>

          {selectedDeal ? (
            <div className="mt-4 xl:mt-0 xl:sticky xl:top-24 xl:self-start">{detail}</div>
          ) : null}
        </div>
      </div>

      {selectedDeal && mobileDealDetailOpen ? (
        <>
          <div className="fixed inset-0 z-50 bg-slate-950/95 p-3 backdrop-blur md:hidden">
            <div className="flex h-full flex-col rounded-[28px] border border-slate-800 bg-slate-950 transition">
              <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-4 py-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    案件詳細
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">{selectedDeal.title}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileDealDetailOpen(false)}
                  className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-200"
                >
                  閉じる
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3">{detail}</div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
