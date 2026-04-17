"use client";

import { useState } from "react";
import { DEAL_STAGE_LABEL } from "../constants";
import { DASHBOARD_COPY, DASHBOARD_PRIORITY_LABELS } from "../demo-copy";
import type { DealCard, MiniSfaDashboardStats, MiniSfaViewState, TabId } from "../types";
import { MiniSfaStatePanel } from "./MiniSfaStatePanel";

interface MiniSfaDashboardTabProps {
  todayLabel: string;
  stats: MiniSfaDashboardStats;
  onOpenDeal: (dealId: string) => void;
  onNavigateTab: (tab: TabId) => void;
  viewState: MiniSfaViewState;
  onRetry: () => void;
  onCreateDeal: () => void;
}

function CompactDealList({
  deals,
  label,
  emptyLabel,
  onOpenDeal,
  warning = false,
}: {
  deals: DealCard[];
  label: string;
  emptyLabel: string;
  onOpenDeal: (dealId: string) => void;
  warning?: boolean;
}) {
  if (deals.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-5 text-sm text-slate-400">
        <p className="font-medium text-slate-200">{label}</p>
        <p className="mt-2">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-white">{label}</p>
        <span className="text-xs text-slate-500">{deals.length}件</span>
      </div>
      <ul className="mt-3 space-y-2">
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
    </div>
  );
}

function PriorityCard({
  count,
  ctaLabel,
  emptyLabel,
  label,
  priority,
  muted,
  onClick,
  summary,
  title,
}: {
  count: number;
  ctaLabel: string;
  emptyLabel: string;
  label: string;
  priority: "high" | "medium" | "low";
  muted?: boolean;
  onClick: () => void;
  summary: string;
  title: string;
}) {
  const priorityClassName =
    priority === "high"
      ? "border-rose-400/35 bg-rose-400/10 text-rose-100"
      : priority === "medium"
        ? "border-amber-300/30 bg-amber-300/10 text-amber-100"
        : "border-cyan-300/30 bg-cyan-300/10 text-cyan-100";

  return (
    <article
      className={`rounded-[24px] border p-4 ${
        muted
          ? "border-slate-800 bg-slate-950/60"
          : "border-cyan-400/20 bg-slate-950/80 shadow-[0_0_0_1px_rgba(34,211,238,0.06)]"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{label}</p>
        <span className={`rounded-full border px-2 py-1 text-[11px] font-medium ${priorityClassName}`}>
          {DASHBOARD_PRIORITY_LABELS[priority]}
        </span>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-white">{title}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{summary}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-3xl font-semibold text-white">{count}</p>
          <p className="text-xs text-slate-500">件</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClick}
        className="mt-4 rounded-xl border border-slate-700 px-3 py-2 text-sm font-medium text-slate-100 hover:border-cyan-300/50 hover:text-cyan-200"
      >
        {count > 0 ? ctaLabel : emptyLabel}
      </button>
    </article>
  );
}

export function MiniSfaDashboardTab({
  todayLabel,
  stats,
  onOpenDeal,
  onNavigateTab,
  viewState,
  onRetry,
  onCreateDeal,
}: MiniSfaDashboardTabProps) {
  const urgentDeal = stats.overdueRows[0] ?? null;
  const weekDeal = stats.weekRows[0] ?? null;
  const priorityDeal = stats.retainerLikelyRows[0] ?? stats.retainedRows[0] ?? null;
  const [useFourColumns, setUseFourColumns] = useState(false);

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
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">{DASHBOARD_COPY.title}</h2>
          <p className="mt-1 text-sm text-slate-400">
            デモ上の今日: {todayLabel}。{DASHBOARD_COPY.subtitle}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setUseFourColumns((current) => !current)}
            className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-slate-500"
          >
            {useFourColumns ? DASHBOARD_COPY.layoutPrimaryLabel : DASHBOARD_COPY.layoutComparisonLabel}
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab("board")}
            className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-slate-500"
          >
            案件進行をみる
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab("contacts")}
            className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-slate-500"
          >
            顧客一覧をみる
          </button>
        </div>
      </div>

      <p className="rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-xs text-slate-400">
        {DASHBOARD_COPY.comparisonDescription}
      </p>

      <div className={`grid gap-4 ${useFourColumns ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}>
        <section className="space-y-3 rounded-[24px] border border-slate-800 bg-slate-950/60 p-4">
          <div>
            <h3 className="text-base font-semibold text-white">{DASHBOARD_COPY.sections.high.title}</h3>
            <p className="mt-1 text-xs text-slate-400">{DASHBOARD_COPY.sections.high.subtitle}</p>
          </div>
          <PriorityCard
            count={stats.overdueCount}
            label="期日"
            priority="high"
            title={urgentDeal ? urgentDeal.title : "期限超過はありません"}
            summary={
              urgentDeal
                ? `${urgentDeal.clientName} ・ ${urgentDeal.nextActionDate}までの返信・対応が必要です。`
                : "期日に遅れている案件はありません。次は今週の要返信案件を確認します。"
            }
            ctaLabel="最優先案件を開く"
            emptyLabel="案件進行をみる"
            onClick={() => (urgentDeal ? onOpenDeal(urgentDeal.id) : onNavigateTab("board"))}
          />
          <CompactDealList
            deals={stats.overdueRows.slice(0, 3)}
            label="期限超過"
            emptyLabel="期限超過案件はありません"
            onOpenDeal={onOpenDeal}
            warning
          />
        </section>

        <section className="space-y-3 rounded-[24px] border border-slate-800 bg-slate-950/60 p-4">
          <div>
            <h3 className="text-base font-semibold text-white">{DASHBOARD_COPY.sections.medium.title}</h3>
            <p className="mt-1 text-xs text-slate-400">{DASHBOARD_COPY.sections.medium.subtitle}</p>
          </div>
          <PriorityCard
            count={stats.dueThisWeekCount}
            label="要返信"
            priority="medium"
            title={weekDeal ? weekDeal.title : "今週の要返信を整理"}
            summary={
              weekDeal
                ? `${weekDeal.clientName} の相談対応を進め、返信漏れを防げます。`
                : "今週の要返信案件は少なめです。新規相談を追加して流れを試せます。"
            }
            ctaLabel="要返信案件を開く"
            emptyLabel="案件進行をみる"
            onClick={() => (weekDeal ? onOpenDeal(weekDeal.id) : onNavigateTab("board"))}
            muted
          />
          <PriorityCard
            count={stats.retainerLikelyCount}
            label="受任"
            priority="low"
            title={priorityDeal ? priorityDeal.title : "受任見込案件を準備"}
            summary={
              priorityDeal
                ? `${priorityDeal.clientName} の受任判断に向け、条件整理と次アクションを確認します。`
                : "受任見込がない場合は、進行中案件から次の提案を準備できます。"
            }
            ctaLabel="受任見込案件を開く"
            emptyLabel="顧客一覧をみる"
            onClick={() =>
              priorityDeal ? onOpenDeal(priorityDeal.id) : onNavigateTab("contacts")
            }
            muted
          />
        </section>

        <section className="space-y-3 rounded-[24px] border border-slate-800 bg-slate-950/60 p-4">
          <div>
            <h3 className="text-base font-semibold text-white">{DASHBOARD_COPY.sections.low.title}</h3>
            <p className="mt-1 text-xs text-slate-400">{DASHBOARD_COPY.sections.low.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab("contacts")}
            className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-3 text-left text-sm text-slate-100 hover:border-slate-500"
          >
            <p className="font-semibold">顧客一覧へ進む</p>
            <p className="mt-1 text-xs text-slate-400">相談窓口・紹介元・接触履歴を確認</p>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab("board")}
            className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-3 text-left text-sm text-slate-100 hover:border-slate-500"
          >
            <p className="font-semibold">案件進行へ進む</p>
            <p className="mt-1 text-xs text-slate-400">期日・ステージ・次アクションを確認</p>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab("tasks")}
            className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-3 text-left text-sm text-slate-100 hover:border-slate-500"
          >
            <p className="font-semibold">実務確認へ進む</p>
            <p className="mt-1 text-xs text-slate-400">要返信・対応漏れをまとめて確認</p>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab("documents")}
            className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-3 text-left text-sm text-slate-100 hover:border-slate-500"
          >
            <p className="font-semibold">書類確認へ進む</p>
            <p className="mt-1 text-xs text-slate-400">資料・契約案・見積の確認へ移動</p>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab("board")}
            className="w-full rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-3 text-left text-sm text-cyan-100 hover:bg-cyan-400/15"
          >
            <p className="font-semibold">最優先案件へ進む</p>
            <p className="mt-1 text-xs text-cyan-200/80">詳細で次アクション更新に進む</p>
          </button>
        </section>

        {useFourColumns ? (
          <section className="space-y-3 rounded-[24px] border border-slate-800 bg-slate-950/60 p-4">
            <div>
              <h3 className="text-base font-semibold text-white">比較用導線（4カラム）</h3>
              <p className="mt-1 text-xs text-slate-400">
                入口導線を分割した比較表示です。必要に応じて3カラムへ戻せます。
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-3 text-sm text-slate-300">
              <p>進行中 {stats.activeCount}件</p>
              <p className="mt-1">受任済み {stats.retainedCount}件</p>
            </div>
            <CompactDealList
              deals={stats.weekRows.slice(0, 3)}
              label="今週フォロー"
              emptyLabel="今週フォロー対象はありません"
              onOpenDeal={onOpenDeal}
            />
          </section>
        ) : null}
      </div>
    </div>
  );
}
