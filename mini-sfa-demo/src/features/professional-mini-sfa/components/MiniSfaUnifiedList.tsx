"use client";

export interface MiniSfaUnifiedListRow {
  id: string;
  primary: string;
  secondary: string;
  statusLabel: string;
  dueDate: string;
  ownerLabel: string;
  metaLabel?: string;
  taskDone?: boolean;
}

interface MiniSfaUnifiedListProps {
  title: string;
  description: string;
  emptyLabel: string;
  rows: MiniSfaUnifiedListRow[];
  actionLabel: string;
  onOpenDetail: (id: string) => void;
  onToggleDone?: (id: string) => void;
  onQuickDateShift?: (id: string, mode: "today" | "tomorrow" | "nextWeek") => void;
}

export function MiniSfaUnifiedList({
  title,
  description,
  emptyLabel,
  rows,
  actionLabel,
  onOpenDetail,
  onToggleDone,
  onQuickDateShift,
}: MiniSfaUnifiedListProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-[24px] border border-slate-800 bg-slate-950/60 p-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>

      <div className="grid gap-3 md:hidden">
        {rows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-4 text-sm text-slate-400">
            {emptyLabel}
          </div>
        ) : (
          rows.map((row) => (
            <article key={row.id} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
              <div className="flex items-start justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onOpenDetail(row.id)}
                  className="min-w-0 text-left text-sm font-semibold text-slate-50 underline-offset-2 hover:text-cyan-300 hover:underline"
                >
                  {row.primary}
                </button>
                <span className="shrink-0 rounded-full bg-slate-800 px-2 py-1 text-[11px] text-slate-300">
                  {row.statusLabel}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">{row.secondary}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-400">
                <span>次回: {row.dueDate}</span>
                <span>担当: {row.ownerLabel}</span>
                <span>{row.metaLabel ?? "詳細から確認"}</span>
                <span>{row.taskDone ? "状態: 完了" : "状態: 未完了"}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {onToggleDone ? (
                  <button
                    type="button"
                    onClick={() => onToggleDone(row.id)}
                    className="rounded-lg border border-slate-700 px-2 py-1 text-xs text-slate-200"
                  >
                    {row.taskDone ? "完了を戻す" : "完了にする"}
                  </button>
                ) : null}
                {onQuickDateShift ? (
                  <>
                    <button
                      type="button"
                      onClick={() => onQuickDateShift(row.id, "today")}
                      className="rounded-lg border border-slate-700 px-2 py-1 text-xs text-slate-200"
                    >
                      今日
                    </button>
                    <button
                      type="button"
                      onClick={() => onQuickDateShift(row.id, "tomorrow")}
                      className="rounded-lg border border-slate-700 px-2 py-1 text-xs text-slate-200"
                    >
                      明日
                    </button>
                    <button
                      type="button"
                      onClick={() => onQuickDateShift(row.id, "nextWeek")}
                      className="rounded-lg border border-slate-700 px-2 py-1 text-xs text-slate-200"
                    >
                      来週
                    </button>
                  </>
                ) : null}
                <button
                  type="button"
                  onClick={() => onOpenDetail(row.id)}
                  className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-xs text-cyan-200"
                >
                  {actionLabel}
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900/60 md:block">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead className="border-b border-slate-700 bg-slate-950/80 text-slate-400">
            <tr>
              <th className="px-3 py-3 font-medium">主情報</th>
              <th className="px-3 py-3 font-medium">ステータス</th>
              <th className="px-3 py-3 font-medium">期限</th>
              <th className="px-3 py-3 font-medium">担当</th>
              <th className="px-3 py-3 font-medium">補足</th>
              <th className="px-3 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-3 py-6 text-slate-400" colSpan={6}>
                  {emptyLabel}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/40">
                  <td className="px-3 py-3">
                    <button
                      type="button"
                      onClick={() => onOpenDetail(row.id)}
                      className="text-left text-slate-50 underline-offset-2 hover:text-cyan-300 hover:underline"
                    >
                      {row.primary}
                    </button>
                    <p className="mt-1 text-xs text-slate-400">{row.secondary}</p>
                  </td>
                  <td className="px-3 py-3 text-slate-200">{row.statusLabel}</td>
                  <td className="px-3 py-3 text-slate-300">{row.dueDate}</td>
                  <td className="px-3 py-3 text-slate-300">{row.ownerLabel}</td>
                  <td className="px-3 py-3 text-slate-400">{row.metaLabel ?? "-"}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-2">
                      {onToggleDone ? (
                        <button
                          type="button"
                          onClick={() => onToggleDone(row.id)}
                          className="rounded-lg border border-slate-700 px-2 py-1 text-xs text-slate-200"
                        >
                          {row.taskDone ? "完了戻し" : "完了"}
                        </button>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => onOpenDetail(row.id)}
                        className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-xs text-cyan-200"
                      >
                        {actionLabel}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
