"use client";

import { REFERENCE_TAB_COPY } from "../demo-copy";
import type { IntegrationPreviewItem } from "../types";
import { MiniSfaIntegrationPreview } from "./MiniSfaIntegrationPreview";

interface MiniSfaReferenceTabProps {
  integrationItems: IntegrationPreviewItem[];
  limitationNote: string;
  demoModeNote: string;
  mvpOneLiner: string;
  mvpScopeBullets: readonly string[];
  estimateRangeLabel: string;
  securityRangeSubline: string;
  onboardingDayRateLabel: string;
  includes: readonly string[];
  optionSectionTitle: string;
  optionFeatureExamples: readonly string[];
  optionSectionFootnote: string;
  optionPricingExamples: ReadonlyArray<{ title: string; rangeHint: string }>;
  disclaimerLines: readonly string[];
}

export function MiniSfaReferenceTab({
  integrationItems,
  limitationNote,
  demoModeNote,
  mvpOneLiner,
  mvpScopeBullets,
  estimateRangeLabel,
  securityRangeSubline,
  onboardingDayRateLabel,
  includes,
  optionSectionTitle,
  optionFeatureExamples,
  optionSectionFootnote,
  optionPricingExamples,
  disclaimerLines,
}: MiniSfaReferenceTabProps) {
  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-slate-800 bg-slate-900/60 p-4 md:p-6">
        <h2 className="text-lg font-semibold text-white">{REFERENCE_TAB_COPY.title}</h2>
        <p className="mt-2 text-sm leading-7 text-slate-300">{REFERENCE_TAB_COPY.subtitle}</p>
      </section>

      <MiniSfaIntegrationPreview items={integrationItems} note={limitationNote} />

      <section className="rounded-[24px] border border-slate-800 bg-slate-900/60 p-4 md:p-6">
        <div className="space-y-5">
          <p className="text-sm leading-7 text-slate-400">{demoModeNote}</p>

          <div>
            <h3 className="text-xl font-semibold text-white">制作イメージと概算レンジ（例示）</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">{mvpOneLiner}</p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">MVP の範囲（目安）</p>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-slate-300">
              {mvpScopeBullets.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-4">
            <p className="text-base font-semibold text-cyan-300">概算レンジ: {estimateRangeLabel}</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">{securityRangeSubline}</p>
            <p className="mt-2 text-sm leading-7 text-slate-400">{onboardingDayRateLabel}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-emerald-300">含む（例）</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {includes.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-emerald-300">✓</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-cyan-300">{optionSectionTitle}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {optionFeatureExamples.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-cyan-300">+</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm leading-7 text-slate-400">{optionSectionFootnote}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-400">オプション費用感（税別・例示）</p>
            <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-700">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="border-b border-slate-700 bg-slate-950/80 text-slate-400">
                  <tr>
                    <th className="px-3 py-3 font-medium">項目</th>
                    <th className="px-3 py-3 font-medium">費用感の目安</th>
                  </tr>
                </thead>
                <tbody>
                  {optionPricingExamples.map((row) => (
                    <tr key={row.title} className="border-b border-slate-800 last:border-0">
                      <td className="px-3 py-3 text-slate-100">{row.title}</td>
                      <td className="px-3 py-3 text-cyan-300">{row.rangeHint}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <details className="rounded-[24px] border border-slate-800 bg-slate-900/60 p-4 md:p-6">
        <summary className="cursor-pointer list-none text-sm font-semibold text-slate-100">
          {REFERENCE_TAB_COPY.limitationsSummary}
        </summary>
        <div className="mt-4 space-y-2 border-t border-slate-700 pt-4 text-sm leading-7 text-slate-400">
          <p className="text-slate-300">{limitationNote}</p>
          {disclaimerLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </details>
    </div>
  );
}
