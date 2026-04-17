"use client";

import { useMemo, useState, type ReactNode } from "react";
import { DEAL_STAGE_LABEL, DEMO_TODAY, TAB_LABEL } from "./constants";
import {
  DISCLAIMER_LINES,
  DEMO_BADGES,
  DEMO_FIXED_ANNOTATION,
  DEMO_INTRO,
  DEMO_LIMITATION_NOTE,
  DEMO_MODE_NOTE,
  DEMO_RESET_HINT,
  DEMO_UI_STATE_COPY,
  DOCUMENT_TAB_NOTE,
  ESTIMATE_RANGE_LABEL,
  HOME_STRUCTURE_NOTE,
  INCLUDES,
  MINI_SFA_INTEGRATION_PREVIEW_ITEMS,
  MOBILE_NAV_NOTE,
  MVP_ONE_LINER,
  MVP_SCOPE_BULLETS,
  ONBOARDING_DAY_RATE_LABEL,
  OPTION_FEATURE_EXAMPLES,
  OPTION_PRICING_EXAMPLES,
  OPTION_SECTION_FOOTNOTE,
  OPTION_SECTION_TITLE,
  SECURITY_RANGE_SUBLINE,
  TASK_TAB_NOTE,
} from "./demo-copy";
import type { MiniSfaViewState, TabId } from "./types";
import { MiniSfaBoardTab } from "./components/MiniSfaBoardTab";
import { MiniSfaContactsTab } from "./components/MiniSfaContactsTab";
import { MiniSfaCreateDealPanel } from "./components/MiniSfaCreateDealPanel";
import { MiniSfaDashboardTab } from "./components/MiniSfaDashboardTab";
import { MiniSfaDealDetail } from "./components/MiniSfaDealDetail";
import { MiniSfaReferenceTab } from "./components/MiniSfaReferenceTab";
import { MiniSfaStatePanel } from "./components/MiniSfaStatePanel";
import { MiniSfaUnifiedList } from "./components/MiniSfaUnifiedList";
import { useProfessionalMiniSfaDemo } from "./useProfessionalMiniSfaDemo";

function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 13h6V4H4v9Zm10 7h6V4h-6v16ZM4 20h6v-3H4v3Z" />
    </svg>
  );
}

function BoardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h16M4 12h10M4 18h7" />
      <circle cx="18" cy="12" r="2" />
      <circle cx="14" cy="18" r="2" />
    </svg>
  );
}

function ContactsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9.5" cy="7" r="3.5" />
      <path d="M20 8.5a3 3 0 0 1 0 6M23 21v-2a4 4 0 0 0-3-3.87" />
    </svg>
  );
}

function TasksIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 6h11M9 12h11M9 18h11" />
      <path d="m4 6 1.5 1.5L7.5 5.5M4 12l1.5 1.5L7.5 11.5M4 18l1.5 1.5L7.5 17.5" />
    </svg>
  );
}

function DocumentsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h6M10 17h6" />
    </svg>
  );
}

function ReferenceIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
      <path d="M12 3v18M4 7l8 4 8-4" />
    </svg>
  );
}

function TabNavButton({
  active,
  countLabel,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  countLabel: string;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-w-[160px] rounded-2xl border px-4 py-3 text-left transition ${
        active
          ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200 shadow-[0_0_0_1px_rgba(34,211,238,0.15)]"
          : "border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-600 hover:bg-slate-900"
      }`}
    >
      <span className="flex items-center gap-2 text-sm font-semibold">
        {icon}
        {label}
      </span>
      <span className="mt-1 block text-xs text-slate-400">{countLabel}</span>
    </button>
  );
}

function TaskCheckTab({
  deals,
  onOpenDeal,
  onQuickDateShift,
  onToggleDone,
}: {
  deals: Array<{
    id: string;
    title: string;
    clientName: string;
    nextActionDate: string;
    assignee: string;
    stageLabel: string;
    nextAction: string;
    taskDone?: boolean;
  }>;
  onOpenDeal: (dealId: string) => void;
  onToggleDone: (dealId: string) => void;
  onQuickDateShift: (dealId: string, mode: "today" | "tomorrow" | "nextWeek") => void;
}) {
  const rows = deals.map((deal) => ({
    id: deal.id,
    primary: deal.title,
    secondary: deal.clientName,
    statusLabel: deal.stageLabel,
    dueDate: deal.nextActionDate,
    ownerLabel: deal.assignee,
    metaLabel: deal.nextAction,
    taskDone: deal.taskDone,
  }));

  return (
    <MiniSfaUnifiedList
      title="タスク一覧"
      description={TASK_TAB_NOTE}
      emptyLabel="要対応タスクはありません"
      rows={rows}
      actionLabel="案件詳細へ"
      onOpenDetail={onOpenDeal}
      onToggleDone={onToggleDone}
      onQuickDateShift={onQuickDateShift}
    />
  );
}

function DocumentHubTab({
  deals,
  onOpenDeal,
  onQuickDateShift,
  onToggleDone,
}: {
  deals: Array<{
    id: string;
    title: string;
    clientName: string;
    nextActionDate: string;
    assignee: string;
    stageLabel: string;
    nextAction: string;
    taskDone?: boolean;
  }>;
  onOpenDeal: (dealId: string) => void;
  onToggleDone: (dealId: string) => void;
  onQuickDateShift: (dealId: string, mode: "today" | "tomorrow" | "nextWeek") => void;
}) {
  const rows = deals.map((deal) => ({
    id: deal.id,
    primary: deal.title,
    secondary: deal.clientName,
    statusLabel: deal.stageLabel,
    dueDate: deal.nextActionDate,
    ownerLabel: deal.assignee,
    metaLabel: deal.nextAction,
    taskDone: deal.taskDone,
  }));

  return (
    <MiniSfaUnifiedList
      title="書類一覧"
      description={DOCUMENT_TAB_NOTE}
      emptyLabel="書類確認中の案件はありません"
      rows={rows}
      actionLabel="案件詳細へ"
      onOpenDetail={onOpenDeal}
      onToggleDone={onToggleDone}
      onQuickDateShift={onQuickDateShift}
    />
  );
}

export function ProfessionalMiniSfaDemo() {
  const {
    activeTab,
    setActiveTab,
    contacts,
    createDeal,
    createDialogOpen,
    deals,
    mobileBoardStage,
    mobileDealDetailOpen,
    moveDealStage,
    resetDemo,
    selectedDeal,
    selectedDealId,
    setCreateDialogOpen,
    setMobileBoardStage,
    setMobileDealDetailOpen,
    setSelectedDealId,
    stats,
    updateDeal,
    isInitializing,
    isLoading,
  } = useProfessionalMiniSfaDemo();
  const [returnTab, setReturnTab] = useState<TabId>("board");
  const [simulateError, setSimulateError] = useState(false);

  const addDays = (baseDate: string, days: number) => {
    const date = new Date(`${baseDate}T12:00:00`);
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  };

  const openDeal = (dealId: string, sourceTab: TabId = "board") => {
    setReturnTab(sourceTab);
    setSelectedDealId(dealId);
    setActiveTab("board");
    setMobileDealDetailOpen(true);
  };

  const handleBackToList = () => {
    setActiveTab(returnTab);
    setMobileDealDetailOpen(false);
  };

  const urgentDeal = stats.overdueRows[0] ?? stats.weekRows[0] ?? stats.retainerLikelyRows[0] ?? null;
  const taskDeals = useMemo(() => {
    const map = new Map<string, (typeof deals)[number]>();
    [...stats.overdueRows, ...stats.weekRows, ...stats.retainerLikelyRows].forEach((deal) => {
      map.set(deal.id, deal);
    });
    return Array.from(map.values()).map((deal) => ({
      ...deal,
      stageLabel: DEAL_STAGE_LABEL[deal.stage],
    }));
  }, [stats.overdueRows, stats.retainerLikelyRows, stats.weekRows]);
  const documentDeals = useMemo(
    () =>
      deals
        .filter((deal) =>
        /(資料|契約|見積|規則|メモ|送付|確認)/.test(`${deal.nextAction} ${deal.title} ${deal.note ?? ""}`)
        )
        .map((deal) => ({
          ...deal,
          stageLabel: DEAL_STAGE_LABEL[deal.stage],
        })),
    [deals]
  );
  const updateQuickDate = (dealId: string, mode: "today" | "tomorrow" | "nextWeek") => {
    const nextDate = mode === "today" ? DEMO_TODAY : mode === "tomorrow" ? addDays(DEMO_TODAY, 1) : addDays(DEMO_TODAY, 7);
    updateDeal(dealId, { nextActionDate: nextDate, lastContactAt: DEMO_TODAY });
  };
  const toggleDealDone = (dealId: string) => {
    const target = deals.find((deal) => deal.id === dealId);
    if (!target) return;
    updateDeal(dealId, { taskDone: !target.taskDone, lastContactAt: DEMO_TODAY });
  };
  const navCounts: Record<TabId, string> = {
    dashboard: `要対応 ${stats.overdueCount}件 / 今週 ${stats.dueThisWeekCount}件`,
    board: `進行中 ${stats.activeCount}件`,
    contacts: `顧客・案件 ${contacts.length}件`,
    tasks: `要確認 ${taskDeals.length}件`,
    documents: `書類確認 ${documentDeals.length}件`,
    reference: "連携・概算・注記",
  };
  const baseViewState: MiniSfaViewState = simulateError
    ? { status: "error", ...DEMO_UI_STATE_COPY.error }
    : isInitializing
      ? { status: "initializing", ...DEMO_UI_STATE_COPY.initializing }
      : isLoading
        ? { status: "loading", ...DEMO_UI_STATE_COPY.loading }
        : deals.length === 0
          ? { status: "empty", ...DEMO_UI_STATE_COPY.empty }
          : { status: "ready" };

  const retryView = () => {
    setSimulateError(false);
    resetDemo();
  };

  const getTabViewState = (tab: TabId): MiniSfaViewState => {
    if (baseViewState.status !== "ready") return baseViewState;
    if (tab === "tasks" && taskDeals.length === 0) return { status: "empty", ...DEMO_UI_STATE_COPY.empty };
    if (tab === "documents" && documentDeals.length === 0) return { status: "empty", ...DEMO_UI_STATE_COPY.empty };
    return { status: "ready" };
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 md:px-6 lg:px-8 lg:py-6">
        <header className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
              操作デモ（ブラウザ内モック）
            </span>
            {DEMO_BADGES.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="rounded-[28px] border border-cyan-400/20 bg-slate-900/85 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] md:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
                  Professional Mini SFA Demo
                </p>
                <h1 className="mt-2 text-xl font-semibold text-white md:text-3xl">
                  相談から受任判断までを、短時間で触って伝わる画面構成へ
                </h1>
                <p className="mt-3 text-sm leading-7 text-slate-300 md:text-base">
                  {DEMO_INTRO}
                </p>
                <p className="mt-3 rounded-xl border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-xs leading-6 text-amber-100">
                  {DEMO_FIXED_ANNOTATION}
                </p>
                <p className="mt-2 text-xs leading-6 text-slate-400">{DEMO_LIMITATION_NOTE}</p>
                <p className="mt-3 hidden text-sm leading-7 text-slate-400 md:block">
                  {DEMO_RESET_HINT}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 lg:w-[420px] lg:grid-cols-1 lg:gap-3">
                <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-3 lg:p-4">
                  <p className="text-xs font-medium text-amber-200/80">今日の要対応</p>
                  <p className="mt-1 text-2xl font-semibold text-amber-100 lg:text-3xl">{stats.overdueCount}</p>
                  <p className="mt-1 hidden text-xs text-slate-400 lg:block">
                    期限超過の相談が上に表示されます
                  </p>
                </div>
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-3 lg:p-4">
                  <p className="text-xs font-medium text-cyan-200/80">今週の追客</p>
                  <p className="mt-1 text-2xl font-semibold text-cyan-200 lg:text-3xl">{stats.dueThisWeekCount}</p>
                  <p className="mt-1 hidden text-xs text-slate-400 lg:block">
                    抜け漏れを最小化する想定です
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-3 lg:p-4">
                  <p className="text-xs font-medium text-emerald-200/80">受任見込</p>
                  <p className="mt-1 text-2xl font-semibold text-emerald-200 lg:text-3xl">
                    {stats.retainerLikelyCount}
                  </p>
                  <p className="mt-1 hidden text-xs text-slate-400 lg:block">
                    条件整理の優先案件を可視化します
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  今日まず触ってほしい流れ
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {urgentDeal
                    ? `${urgentDeal.title} を開き、次アクション更新からステージ変更まで体験してください。`
                    : "新規相談を追加し、次アクション更新から案件進行の流れを体験してください。"}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  デモ上の今日: {DEMO_TODAY}
                  {urgentDeal ? ` ・ 次回アクション日 ${urgentDeal.nextActionDate}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {urgentDeal ? (
                  <button
                    type="button"
                    onClick={() => openDeal(urgentDeal.id)}
                    className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
                  >
                    優先案件を開く
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => setSimulateError((current) => !current)}
                  className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-2 text-sm font-medium text-rose-100 hover:bg-rose-400/15"
                >
                  {simulateError ? "疑似エラーを解除" : "疑似エラー表示"}
                </button>
                <button
                  type="button"
                  onClick={resetDemo}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:border-slate-500"
                >
                  初期状態に戻す
                </button>
                <button
                  type="button"
                  onClick={() => setCreateDialogOpen(true)}
                  className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-400/15"
                >
                  新規相談を追加
                </button>
              </div>
            </div>

          </div>
        </header>

        <div className="sticky top-0 z-30 -mx-4 border-y border-slate-800 bg-slate-950/90 px-4 py-3 backdrop-blur md:-mx-6 md:px-6 lg:-mx-8 lg:px-8">
          <p className="mb-2 text-xs text-slate-500 md:hidden">{MOBILE_NAV_NOTE}</p>
          <div className="grid grid-cols-3 gap-2 pb-1 md:hidden">
            {[
              { id: "dashboard" as const, icon: <DashboardIcon /> },
              { id: "board" as const, icon: <BoardIcon /> },
              { id: "contacts" as const, icon: <ContactsIcon /> },
              { id: "tasks" as const, icon: <TasksIcon /> },
              { id: "documents" as const, icon: <DocumentsIcon /> },
              { id: "reference" as const, icon: <ReferenceIcon /> },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`rounded-xl border px-2 py-2 text-center text-[11px] font-medium ${
                  activeTab === item.id
                    ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200"
                    : "border-slate-700 bg-slate-950/70 text-slate-300"
                }`}
              >
                <span className="flex items-center justify-center">{item.icon}</span>
                <span className="mt-1 block">{TAB_LABEL[item.id]}</span>
              </button>
            ))}
          </div>
          <div className="hidden gap-3 overflow-x-auto pb-1 md:flex">
            <TabNavButton
              active={activeTab === "dashboard"}
              countLabel={navCounts.dashboard}
              icon={<DashboardIcon />}
              label={TAB_LABEL.dashboard}
              onClick={() => setActiveTab("dashboard")}
            />
            <TabNavButton
              active={activeTab === "board"}
              countLabel={navCounts.board}
              icon={<BoardIcon />}
              label={TAB_LABEL.board}
              onClick={() => setActiveTab("board")}
            />
            <TabNavButton
              active={activeTab === "contacts"}
              countLabel={navCounts.contacts}
              icon={<ContactsIcon />}
              label={TAB_LABEL.contacts}
              onClick={() => setActiveTab("contacts")}
            />
            <TabNavButton
              active={activeTab === "tasks"}
              countLabel={navCounts.tasks}
              icon={<TasksIcon />}
              label={TAB_LABEL.tasks}
              onClick={() => setActiveTab("tasks")}
            />
            <TabNavButton
              active={activeTab === "documents"}
              countLabel={navCounts.documents}
              icon={<DocumentsIcon />}
              label={TAB_LABEL.documents}
              onClick={() => setActiveTab("documents")}
            />
            <TabNavButton
              active={activeTab === "reference"}
              countLabel={navCounts.reference}
              icon={<ReferenceIcon />}
              label={TAB_LABEL.reference}
              onClick={() => setActiveTab("reference")}
            />
          </div>
        </div>

        <main className="space-y-5">
          <section className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-4 md:p-5">
            {activeTab === "dashboard" ? (
              <MiniSfaDashboardTab
                todayLabel={DEMO_TODAY}
                stats={stats}
                onOpenDeal={(dealId) => openDeal(dealId, "dashboard")}
                onNavigateTab={setActiveTab}
                viewState={getTabViewState("dashboard")}
                onRetry={retryView}
                onCreateDeal={() => setCreateDialogOpen(true)}
              />
            ) : null}

            {activeTab === "board" ? (
              <MiniSfaBoardTab
                deals={deals}
                selectedDeal={selectedDeal}
                selectedDealId={selectedDealId}
                onSelectDeal={setSelectedDealId}
                mobileBoardStage={mobileBoardStage}
                setMobileBoardStage={setMobileBoardStage}
                mobileDealDetailOpen={mobileDealDetailOpen}
                setMobileDealDetailOpen={setMobileDealDetailOpen}
                detail={
                  <MiniSfaDealDetail
                    key={selectedDeal?.id ?? "empty"}
                    deal={selectedDeal}
                    onMoveStage={moveDealStage}
                    onUpdateDeal={updateDeal}
                    onBackToList={handleBackToList}
                    backLabel={`${TAB_LABEL[returnTab]}一覧へ戻る`}
                    viewState={getTabViewState("board")}
                    onRetry={retryView}
                  />
                }
                viewState={getTabViewState("board")}
                onRetry={retryView}
                onCreateDeal={() => setCreateDialogOpen(true)}
              />
            ) : null}

            {activeTab === "contacts" ? (
              <MiniSfaContactsTab
                contacts={contacts}
                onOpenDeal={(dealId) => openDeal(dealId, "contacts")}
                viewState={getTabViewState("contacts")}
                onRetry={retryView}
                onCreateDeal={() => setCreateDialogOpen(true)}
              />
            ) : null}

            {activeTab === "tasks" ? (
              getTabViewState("tasks").status === "ready" ? (
                <TaskCheckTab
                  deals={taskDeals}
                  onOpenDeal={(dealId) => openDeal(dealId, "tasks")}
                  onToggleDone={toggleDealDone}
                  onQuickDateShift={updateQuickDate}
                />
              ) : (
                <MiniSfaStatePanel
                  state={getTabViewState("tasks")}
                  actionLabel={getTabViewState("tasks").status === "empty" ? "新規相談を追加" : "再試行する"}
                  onAction={getTabViewState("tasks").status === "empty" ? () => setCreateDialogOpen(true) : retryView}
                />
              )
            ) : null}

            {activeTab === "documents" ? (
              getTabViewState("documents").status === "ready" ? (
                <DocumentHubTab
                  deals={documentDeals}
                  onOpenDeal={(dealId) => openDeal(dealId, "documents")}
                  onToggleDone={toggleDealDone}
                  onQuickDateShift={updateQuickDate}
                />
              ) : (
                <MiniSfaStatePanel
                  state={getTabViewState("documents")}
                  actionLabel={getTabViewState("documents").status === "empty" ? "新規相談を追加" : "再試行する"}
                  onAction={getTabViewState("documents").status === "empty" ? () => setCreateDialogOpen(true) : retryView}
                />
              )
            ) : null}

            {activeTab === "reference" ? (
              <MiniSfaReferenceTab
                integrationItems={MINI_SFA_INTEGRATION_PREVIEW_ITEMS}
                limitationNote={DEMO_LIMITATION_NOTE}
                demoModeNote={DEMO_MODE_NOTE}
                mvpOneLiner={MVP_ONE_LINER}
                mvpScopeBullets={MVP_SCOPE_BULLETS}
                estimateRangeLabel={ESTIMATE_RANGE_LABEL}
                securityRangeSubline={SECURITY_RANGE_SUBLINE}
                onboardingDayRateLabel={ONBOARDING_DAY_RATE_LABEL}
                includes={INCLUDES}
                optionSectionTitle={OPTION_SECTION_TITLE}
                optionFeatureExamples={OPTION_FEATURE_EXAMPLES}
                optionSectionFootnote={OPTION_SECTION_FOOTNOTE}
                optionPricingExamples={OPTION_PRICING_EXAMPLES}
                disclaimerLines={DISCLAIMER_LINES}
              />
            ) : null}
          </section>

          {activeTab === "dashboard" ? (
            <p className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-400">
              {HOME_STRUCTURE_NOTE}
            </p>
          ) : null}

        </main>

        <button
          type="button"
          onClick={() => setCreateDialogOpen(true)}
          className="fixed bottom-4 right-4 z-40 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/30 md:hidden"
        >
          新規相談を追加
        </button>

        <footer className="pb-20 text-center text-xs text-slate-500 md:pb-0">
          上の操作デモはブラウザ内保存です。AI・外部連携は演出表示で、本番時に実データ連携へ置き換える想定です。
        </footer>
      </div>

      <MiniSfaCreateDealPanel
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreateDeal={createDeal}
      />
    </div>
  );
}
