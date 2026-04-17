"use client";

import type { MiniSfaViewState } from "../types";

interface MiniSfaStatePanelProps {
  state: MiniSfaViewState;
  actionLabel?: string;
  onAction?: () => void;
}

export function MiniSfaStatePanel({
  state,
  actionLabel,
  onAction,
}: MiniSfaStatePanelProps) {
  const title = state.title ?? "画面状態を準備しています";
  const description =
    state.description ?? "表示内容を確認中です。しばらく待ってから再確認してください。";

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-5">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 rounded-xl border border-slate-600 px-3 py-2 text-sm text-slate-200 hover:border-cyan-400/50 hover:text-cyan-200"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
