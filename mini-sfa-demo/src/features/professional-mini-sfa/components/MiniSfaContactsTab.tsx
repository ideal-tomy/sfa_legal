"use client";

import { DEAL_STAGE_LABEL } from "../constants";
import type { ContactRow } from "../types";

interface MiniSfaContactsTabProps {
  contacts: ContactRow[];
  onOpenDeal: (dealId: string) => void;
}

export function MiniSfaContactsTab({
  contacts,
  onOpenDeal,
}: MiniSfaContactsTabProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900/60">
      <table className="w-full min-w-[860px] text-left text-sm">
        <thead className="border-b border-slate-700 bg-slate-950/80 text-slate-400">
          <tr>
            <th className="px-3 py-3 font-medium">顧客名</th>
            <th className="px-3 py-3 font-medium">担当窓口</th>
            <th className="px-3 py-3 font-medium">紹介元</th>
            <th className="px-3 py-3 font-medium">案件種別</th>
            <th className="px-3 py-3 font-medium">担当者</th>
            <th className="px-3 py-3 font-medium">最終接触日</th>
            <th className="px-3 py-3 font-medium">現在ステージ</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr
              key={contact.id}
              className="border-b border-slate-800 last:border-0 hover:bg-slate-800/40"
            >
              <td className="px-3 py-3">
                <button
                  type="button"
                  onClick={() => onOpenDeal(contact.id)}
                  className="text-left text-slate-50 underline-offset-2 hover:text-cyan-300 hover:underline"
                >
                  {contact.clientName}
                </button>
              </td>
              <td className="px-3 py-3 text-slate-300">{contact.contactName}</td>
              <td className="px-3 py-3 text-slate-300">{contact.referrer}</td>
              <td className="px-3 py-3 text-slate-300">{contact.practiceArea}</td>
              <td className="px-3 py-3 text-slate-300">{contact.assignee}</td>
              <td className="px-3 py-3 text-slate-400">{contact.lastContactAt}</td>
              <td className="px-3 py-3 text-slate-200">
                {DEAL_STAGE_LABEL[contact.stage]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
