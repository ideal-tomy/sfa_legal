"use client";

import { useMemo } from "react";
import {
  DEMO_TODAY,
  TAB_LABEL,
  TAB_ORDER,
} from "./constants";
import {
  DEMO_BADGES,
  DEMO_INTRO,
  DEMO_MODE_NOTE,
  DEMO_RESET_HINT,
  DISCLAIMER_LINES,
  ESTIMATE_RANGE_LABEL,
  INCLUDES,
  MINI_SFA_INTEGRATION_PREVIEW_ITEMS,
  MVP_ONE_LINER,
  MVP_SCOPE_BULLETS,
  ONBOARDING_DAY_RATE_LABEL,
  OPTION_FEATURE_EXAMPLES,
  OPTION_PRICING_EXAMPLES,
  OPTION_SECTION_FOOTNOTE,
  OPTION_SECTION_TITLE,
  SECURITY_RANGE_SUBLINE,
} from "./demo-copy";
import { MiniSfaBoardTab } from "./components/MiniSfaBoardTab";
import { MiniSfaContactsTab } from "./components/MiniSfaContactsTab";
import { MiniSfaCreateDealPanel } from "./components/MiniSfaCreateDealPanel";
import { MiniSfaDashboardTab } from "./components/MiniSfaDashboardTab";
import { MiniSfaDealDetail } from "./components/MiniSfaDealDetail";
import { MiniSfaIntegrationPreview } from "./components/MiniSfaIntegrationPreview";
import { useProfessionalMiniSfaDemo } from "./useProfessionalMiniSfaDemo";

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
    mobileWeekFollowOpen,
    moveDealStage,
    resetDemo,
    selectedDeal,
    selectedDealId,
    setCreateDialogOpen,
    setMobileBoardStage,
    setMobileDealDetailOpen,
    setMobileWeekFollowOpen,
    setSelectedDealId,
    stats,
    updateDeal,
  } = useProfessionalMiniSfaDemo();

  const openDeal = (dealId: string) => {
    setSelectedDealId(dealId);
    setActiveTab("board");
  };

  const detail = useMemo(
    () => (
      <MiniSfaDealDetail
        key={selectedDeal?.id ?? "empty"}
        deal={selectedDeal}
        onMoveStage={moveDealStage}
        onUpdateDeal={updateDeal}
      />
    ),
    [moveDealStage, selectedDeal, updateDeal]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 md:px-6 lg:px-8 lg:py-8">
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
          <div className="rounded-3xl border border-cyan-400/20 bg-slate-900/80 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] md:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm leading-7 text-slate-300 md:text-base">
                  {DEMO_INTRO}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {DEMO_RESET_HINT}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
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
                  className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
                >
                  新規相談を追加
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
              <nav className="shrink-0 rounded-2xl border border-slate-700 bg-slate-950/70 p-2 lg:w-56">
                <p className="mb-2 px-2 text-xs font-medium text-slate-500">
                  ミニSFA（デモ）
                </p>
                <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
                  {TAB_ORDER.map((tabId) => (
                    <button
                      key={tabId}
                      type="button"
                      onClick={() => setActiveTab(tabId)}
                      className={`rounded-xl px-3 py-3 text-sm font-medium transition ${
                        activeTab === tabId
                          ? "bg-cyan-400/10 text-cyan-300"
                          : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                      }`}
                    >
                      {TAB_LABEL[tabId]}
                    </button>
                  ))}
                </div>
              </nav>

              <div className="min-w-0 flex-1">
                {activeTab === "dashboard" ? (
                  <MiniSfaDashboardTab
                    todayLabel={DEMO_TODAY}
                    stats={stats}
                    mobileWeekFollowOpen={mobileWeekFollowOpen}
                    setMobileWeekFollowOpen={setMobileWeekFollowOpen}
                    onOpenDeal={openDeal}
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
                    detail={detail}
                  />
                ) : null}

                {activeTab === "contacts" ? (
                  <MiniSfaContactsTab contacts={contacts} onOpenDeal={openDeal} />
                ) : null}
              </div>
            </div>
          </div>
        </header>

        <section className="border-t border-dashed border-slate-700 pt-6 text-center text-xs text-slate-500">
          以下は将来連携イメージと制作条件・概算レンジの説明です（上の枠は操作デモのみ）
        </section>

        <MiniSfaIntegrationPreview items={MINI_SFA_INTEGRATION_PREVIEW_ITEMS} />

        <p className="text-sm leading-7 text-slate-400">{DEMO_MODE_NOTE}</p>

        <section className="space-y-5 rounded-2xl border border-slate-700 bg-slate-900/60 p-4 md:p-6">
          <div>
            <h2 className="text-xl font-semibold text-white">
              制作イメージと概算レンジ（例示）
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">{MVP_ONE_LINER}</p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              MVP の範囲（目安）
            </p>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-slate-300">
              {MVP_SCOPE_BULLETS.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-4">
            <p className="text-base font-semibold text-cyan-300">
              概算レンジ: {ESTIMATE_RANGE_LABEL}
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              {SECURITY_RANGE_SUBLINE}
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              {ONBOARDING_DAY_RATE_LABEL}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-emerald-300">含む（例）</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {INCLUDES.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-emerald-300">✓</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-cyan-300">{OPTION_SECTION_TITLE}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {OPTION_FEATURE_EXAMPLES.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-cyan-300">+</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {OPTION_SECTION_FOOTNOTE}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-400">
              オプション費用感（税別・例示）
            </p>
            <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-700">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="border-b border-slate-700 bg-slate-950/80 text-slate-400">
                  <tr>
                    <th className="px-3 py-3 font-medium">項目</th>
                    <th className="px-3 py-3 font-medium">費用感の目安</th>
                  </tr>
                </thead>
                <tbody>
                  {OPTION_PRICING_EXAMPLES.map((row) => (
                    <tr key={row.title} className="border-b border-slate-800 last:border-0">
                      <td className="px-3 py-3 text-slate-100">{row.title}</td>
                      <td className="px-3 py-3 text-cyan-300">{row.rangeHint}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2 border-t border-slate-700 pt-4 text-sm leading-7 text-slate-400">
            {DISCLAIMER_LINES.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <p className="text-sm leading-7 text-slate-400">
            ご自身の案件に寄せた相談整理や概算レンジの切り出しは、導入前のヒアリングで調整できます。
          </p>
        </section>
      </div>

      <MiniSfaCreateDealPanel
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreateDeal={createDeal}
      />
    </div>
  );
}
