"use client";

import { DEAL_STAGE_LABEL } from "../constants";
import type { DealCard, MiniSfaDashboardStats } from "../types";

interface MiniSfaDashboardTabProps {
  todayLabel: string;
  stats: MiniSfaDashboardStats;
  mobileWeekFollowOpen: boolean;
  setMobileWeekFollowOpen: (open: boolean) => void;
  onOpenDeal: (dealId: string) => void;
}

function DealList({
  deals,
  emptyLabel,
  onOpenDeal,
  warning = false,
}: {
  deals: DealCard[];
  emptyLabel: string;
  onOpenDeal: (dealId: string) => void;
  warning?: boolean;
}) {
  if (deals.length === 0) {
    return <p className="text-sm text-slate-400">{emptyLabel}</p>;
  }

  return (
    <ul className="space-y-2">
      {deals.map((deal) => (
        <li key={deal.id}>
          <button
            type="button"
            onClick={() => onOpenDeal(deal.id)}
            className={`w-full rounded-xl border px-3 py-2 text-left transition ${
              warning
                ? "border-amber-400/25 bg-slate-950/70 hover:border-amber-300/60"
                : "border-slate-700 bg-slate-950/70 hover:border-cyan-300/60"
            }`}
          >
            <span className="block font-medium text-slate-50">{deal.title}</span>
            <span className="mt-1 block text-xs text-slate-400">
              {deal.clientName} ・ 次 {deal.nextActionDate} ・ {DEAL_STAGE_LABEL[deal.stage]}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export function MiniSfaDashboardTab({
  todayLabel,
  stats,
  mobileWeekFollowOpen,
  setMobileWeekFollowOpen,
  onOpenDeal,
}: MiniSfaDashboardTabProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-white">ダッシュボード</h2>
        <p className="mt-1 text-sm text-slate-400">
          デモ上の今日: {todayLabel}。案件更新に応じて件数と一覧がその場で反映されます。
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4">
          <p className="text-xs text-slate-400">アクティブ相談</p>
          <p className="mt-1 text-3xl font-semibold text-white">{stats.activeCount}</p>
          <p className="mt-1 text-xs text-slate-500">受任・見送り除く</p>
        </div>
        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4">
          <p className="text-xs text-slate-400">今週のフォロー</p>
          <p className="mt-1 text-3xl font-semibold text-cyan-300">
            {stats.dueThisWeekCount}
          </p>
          <p className="mt-1 text-xs text-slate-500">7日以内・未クローズ</p>
        </div>
        <div className="rounded-2xl border border-amber-400/25 bg-amber-400/5 p-4">
          <p className="text-xs text-amber-100/80">期限超過</p>
          <p className="mt-1 text-3xl font-semibold text-amber-200">
            {stats.overdueCount}
          </p>
          <p className="mt-1 text-xs text-slate-500">見送り除く</p>
        </div>
        <div className="rounded-2xl border border-cyan-400/25 bg-cyan-400/5 p-4">
          <p className="text-xs text-cyan-100/80">受任見込</p>
          <p className="mt-1 text-3xl font-semibold text-cyan-300">
            {stats.retainerLikelyCount}
          </p>
          <p className="mt-1 text-xs text-slate-500">最終確認中</p>
        </div>
        <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/5 p-4">
          <p className="text-xs text-emerald-100/80">受任済み</p>
          <p className="mt-1 text-3xl font-semibold text-emerald-300">
            {stats.retainedCount}
          </p>
          <p className="mt-1 text-xs text-slate-500">別集計</p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileWeekFollowOpen(!mobileWeekFollowOpen)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-3 text-left"
            >
              <span className="block text-sm font-semibold text-white">今週のフォロー一覧</span>
              <span className="mt-1 block text-xs text-cyan-300">
                タップして表示 ・ {stats.weekRows.length}件
              </span>
            </button>
            {mobileWeekFollowOpen ? (
              <div className="mt-3">
                <DealList
                  deals={stats.weekRows}
                  emptyLabel="今週フォロー対象はありません"
                  onOpenDeal={onOpenDeal}
                />
              </div>
            ) : null}
          </div>

          <div className="hidden md:block">
            <h3 className="text-base font-semibold text-white">今週のフォロー一覧</h3>
            <div className="mt-3">
              <DealList
                deals={stats.weekRows}
                emptyLabel="今週フォロー対象はありません"
                onOpenDeal={onOpenDeal}
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-amber-400/20 bg-slate-900/60 p-4">
          <h3 className="text-base font-semibold text-amber-100">期限超過</h3>
          <div className="mt-3">
            <DealList
              deals={stats.overdueRows}
              emptyLabel="期限超過はありません"
              onOpenDeal={onOpenDeal}
              warning
            />
          </div>
        </section>
      </div>
    </div>
  );
}
