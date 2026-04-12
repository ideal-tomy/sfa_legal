"use client";

import type { ReactNode } from "react";
import { DEAL_STAGE_LABEL, DEAL_STAGE_ORDER } from "../constants";
import type { DealCard, DealStageId } from "../types";

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
}: MiniSfaBoardTabProps) {
  return (
    <div className="space-y-4">
      <div className="md:hidden">
        <p className="mb-2 text-sm text-slate-400">
          ステージを切り替えて、相談カードと詳細を確認できます。
        </p>
        <div className="flex flex-wrap gap-2">
          {DEAL_STAGE_ORDER.map((stage) => {
            const columnDeals = deals.filter((deal) => deal.stage === stage);
            const active = mobileBoardStage === stage;
            return (
              <button
                key={stage}
                type="button"
                onClick={() => setMobileBoardStage(stage)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
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

        <ul className="mt-3 max-h-[36vh] space-y-2 overflow-y-auto">
          {deals
            .filter((deal) => deal.stage === mobileBoardStage)
            .map((deal) => (
              <li key={deal.id}>
                <button
                  type="button"
                  onClick={() => onSelectDeal(deal.id)}
                  className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                    selectedDealId === deal.id
                      ? "border-cyan-400/40 bg-cyan-400/10 text-white"
                      : "border-slate-700 bg-slate-950/70 hover:border-slate-500"
                  }`}
                >
                  <span className="block text-sm font-medium">{deal.title}</span>
                  <span className="mt-1 block text-xs text-slate-400">
                    {deal.clientName} ・ 次 {deal.nextActionDate}
                  </span>
                </button>
              </li>
            ))}
        </ul>
      </div>

      <div className="hidden gap-3 overflow-x-auto pb-2 md:flex 2xl:grid 2xl:grid-cols-7 2xl:overflow-visible">
        {DEAL_STAGE_ORDER.map((stage) => {
          const columnDeals = deals.filter((deal) => deal.stage === stage);
          return (
            <section
              key={stage}
              className="min-w-60 rounded-2xl border border-slate-700 bg-slate-900/60 2xl:min-w-0"
            >
              <div className="border-b border-slate-700 px-3 py-3">
                <p className="text-sm font-semibold text-cyan-300">
                  {DEAL_STAGE_LABEL[stage]}
                </p>
                <p className="text-xs text-slate-400">{columnDeals.length}件</p>
              </div>
              <ul className="max-h-[48vh] space-y-2 overflow-y-auto p-2">
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
                        className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                          selectedDealId === deal.id
                            ? "border-cyan-400/40 bg-cyan-400/10"
                            : "border-slate-700 bg-slate-950/70 hover:border-slate-500"
                        }`}
                      >
                        <span className="block text-sm font-medium text-slate-50">
                          {deal.title}
                        </span>
                        <span className="mt-1 block text-xs text-slate-400">
                          {deal.clientName}
                        </span>
                        <span className="mt-1 block text-xs text-slate-500">
                          次 {deal.nextActionDate}
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

      {selectedDeal ? (
        <>
          <div className="rounded-2xl border border-slate-700 bg-slate-900/80 md:hidden">
            <button
              type="button"
              onClick={() => setMobileDealDetailOpen(!mobileDealDetailOpen)}
              className="w-full px-4 py-3 text-left"
            >
              <span className="block text-sm font-semibold text-white">選択中の相談</span>
              <span className="mt-1 block text-xs text-cyan-300">
                タップして詳細とステージ変更を表示
              </span>
              <span className="mt-1 block text-xs text-slate-400">
                {selectedDeal.title}
              </span>
            </button>
            {mobileDealDetailOpen ? <div className="p-3 pt-0">{detail}</div> : null}
          </div>

          <div className="hidden md:block">{detail}</div>
        </>
      ) : null}
    </div>
  );
}
