"use client";

import type { IntegrationPreviewItem } from "../types";

interface MiniSfaIntegrationPreviewProps {
  items: IntegrationPreviewItem[];
}

export function MiniSfaIntegrationPreview({
  items,
}: MiniSfaIntegrationPreviewProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-700 bg-slate-900/60 p-4 md:p-6">
      <div>
        <h2 className="text-xl font-semibold text-white">将来連携のイメージ</h2>
        <p className="mt-2 text-sm text-slate-400">
          以下は今回の実装範囲ではなく、将来拡張の見せ方として表示しています。
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-medium text-white">{item.label}</h3>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-[11px] font-medium text-cyan-300">
                {item.statusLabel}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
