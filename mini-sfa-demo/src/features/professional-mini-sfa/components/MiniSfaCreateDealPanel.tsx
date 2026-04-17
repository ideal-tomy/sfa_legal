"use client";

import { useMemo, useState } from "react";
import { CONFLICT_CHECK_STATUS_OPTIONS, DEMO_TODAY } from "../constants";
import type { CreateDealInput } from "../types";

interface MiniSfaCreateDealPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateDeal: (input: CreateDealInput) => void;
}

type FormState = CreateDealInput;

const QUICK_ACTION_SUGGESTIONS = [
  "相談概要を確認して初回面談候補を送る",
  "必要資料の案内と返信期限を送る",
  "見積と委任契約案の説明日を調整する",
] as const;

function addDays(dateString: string, days: number): string {
  const date = new Date(`${dateString}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function buildInitialForm(): FormState {
  return {
    title: "",
    clientName: "",
    contactName: "",
    inquiryChannel: "Web",
    referrer: "",
    practiceArea: "企業法務",
    assignee: "高橋弁護士",
    nextAction: QUICK_ACTION_SUGGESTIONS[0],
    nextActionDate: addDays(DEMO_TODAY, 2),
    summary: "",
    estimatedValueLabel: "",
    conflictCheckStatus: "未着手",
    note: "",
  };
}

export function MiniSfaCreateDealPanel({
  open,
  onOpenChange,
  onCreateDeal,
}: MiniSfaCreateDealPanelProps) {
  const [form, setForm] = useState<FormState>(() => buildInitialForm());
  const [showAdvancedFields, setShowAdvancedFields] = useState(false);

  const requiredMissing = useMemo(() => {
    const requiredValues = [form.clientName, form.inquiryChannel, form.nextAction, form.nextActionDate, form.summary];
    return requiredValues.some((value) => !value.trim());
  }, [form]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const resetForm = () => {
    setForm(buildInitialForm());
    setShowAdvancedFields(false);
  };

  const closePanel = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleSubmit = () => {
    if (requiredMissing) return;

    onCreateDeal({
      ...form,
      title: form.title.trim() || `${form.practiceArea}の相談`,
      contactName: form.contactName.trim() || "ご担当者様",
      referrer: form.referrer.trim() || form.inquiryChannel,
      estimatedValueLabel: form.estimatedValueLabel?.trim() || undefined,
      note: form.note?.trim() || undefined,
    });
    resetForm();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-slate-950/70 backdrop-blur-sm">
      <div
        className="ml-auto h-full w-full max-w-3xl overflow-y-auto border-l border-slate-700 bg-slate-950 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mini-sfa-create-title"
      >
        <div className="flex min-h-full flex-col">
          <div className="border-b border-slate-700 px-6 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="mini-sfa-create-title" className="text-xl font-semibold text-white">
                  新規相談を追加
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  まずはクイック登録だけで案件化し、詳細は後から整えられる見せ方にしています。
                </p>
              </div>
              <button
                type="button"
                onClick={closePanel}
                className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:border-slate-500"
              >
                閉じる
              </button>
            </div>
          </div>

          <div className="space-y-4 px-6 py-5">
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
              <p className="text-sm font-semibold text-cyan-200">クイック登録</p>
              <p className="mt-1 text-xs leading-6 text-slate-400">
                顧客名、流入経路、相談概要、次アクションだけで登録し、案件進行の流れをすぐ試せます。
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-xs font-medium text-slate-400">顧客名</span>
                <input
                  value={form.clientName}
                  onChange={(event) => setField("clientName", event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-cyan-300 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-400">案件種別</span>
                <select
                  value={form.practiceArea}
                  onChange={(event) => setField("practiceArea", event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-cyan-300 focus:outline-none"
                >
                  <option>企業法務</option>
                  <option>労務</option>
                  <option>相続</option>
                  <option>顧問契約</option>
                  <option>許認可</option>
                  <option>IT・企業法務</option>
                </select>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-xs font-medium text-slate-400">流入経路</span>
                <select
                  value={form.inquiryChannel}
                  onChange={(event) => setField("inquiryChannel", event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-cyan-300 focus:outline-none"
                >
                  <option>Web</option>
                  <option>紹介</option>
                  <option>電話</option>
                  <option>メール</option>
                  <option>LINE</option>
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-400">登録タイトル（自動生成）</span>
                <div className="mt-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300">
                  {form.title.trim() || `${form.practiceArea}の相談`}
                </div>
              </label>
            </div>

            <label className="block">
              <span className="text-xs font-medium text-slate-400">相談概要</span>
              <textarea
                value={form.summary}
                onChange={(event) => setField("summary", event.target.value)}
                className="mt-1 min-h-28 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-cyan-300 focus:outline-none"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-xs font-medium text-slate-400">次アクション</span>
                <input
                  value={form.nextAction}
                  onChange={(event) => setField("nextAction", event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-cyan-300 focus:outline-none"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {QUICK_ACTION_SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setField("nextAction", suggestion)}
                      className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-400">次回アクション日</span>
                <input
                  type="date"
                  value={form.nextActionDate}
                  onChange={(event) => setField("nextActionDate", event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-cyan-300 focus:outline-none"
                />
              </label>
            </div>

            <button
              type="button"
              onClick={() => setShowAdvancedFields((current) => !current)}
              className="w-full rounded-xl border border-slate-700 px-4 py-3 text-left text-sm text-slate-200 hover:border-slate-500"
            >
              {showAdvancedFields ? "詳細設定を閉じる" : "詳細設定を開く"}
            </button>

            {showAdvancedFields ? (
              <div className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-medium text-slate-400">件名</span>
                    <input
                      value={form.title}
                      onChange={(event) => setField("title", event.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-cyan-300 focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium text-slate-400">担当窓口名</span>
                    <input
                      value={form.contactName}
                      onChange={(event) => setField("contactName", event.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-cyan-300 focus:outline-none"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <label className="block">
                    <span className="text-xs font-medium text-slate-400">担当者</span>
                    <select
                      value={form.assignee}
                      onChange={(event) => setField("assignee", event.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-cyan-300 focus:outline-none"
                    >
                      <option>高橋弁護士</option>
                      <option>林弁護士</option>
                      <option>中村弁護士</option>
                      <option>事務局</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium text-slate-400">紹介元</span>
                    <input
                      value={form.referrer}
                      onChange={(event) => setField("referrer", event.target.value)}
                      placeholder="例: 顧問税理士紹介"
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-cyan-300 focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium text-slate-400">利益相反確認</span>
                    <select
                      value={form.conflictCheckStatus}
                      onChange={(event) =>
                        setField(
                          "conflictCheckStatus",
                          event.target.value as FormState["conflictCheckStatus"]
                        )
                      }
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-cyan-300 focus:outline-none"
                    >
                      {CONFLICT_CHECK_STATUS_OPTIONS.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-medium text-slate-400">費用レンジメモ</span>
                    <input
                      value={form.estimatedValueLabel}
                      onChange={(event) => setField("estimatedValueLabel", event.target.value)}
                      placeholder="例: 月額顧問 8万円前後"
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-cyan-300 focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium text-slate-400">申し送り</span>
                    <textarea
                      value={form.note}
                      onChange={(event) => setField("note", event.target.value)}
                      className="mt-1 min-h-28 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-cyan-300 focus:outline-none"
                    />
                  </label>
                </div>
              </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-xs font-medium text-slate-400">想定される表示</span>
                <div className="mt-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-slate-300">
                  登録後は「相談受付」に入り、そのまま案件進行と次アクション更新を試せます。
                </div>
              </label>
              <div className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-slate-300">
                AI 要約や外部連携は本実装ではなく演出ですが、登録後の案件詳細で候補表示を確認できます。
              </div>
            </div>

            {requiredMissing ? (
              <p className="text-sm text-amber-200/80">
                顧客名、流入経路、相談概要、次アクション、次回アクション日は必須です。
              </p>
            ) : null}
          </div>

          <div className="mt-auto flex flex-wrap justify-end gap-3 border-t border-slate-700 px-6 py-5">
            <button
              type="button"
              onClick={closePanel}
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-slate-500"
            >
              キャンセル
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={requiredMissing}
              className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              保存して相談を追加
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
