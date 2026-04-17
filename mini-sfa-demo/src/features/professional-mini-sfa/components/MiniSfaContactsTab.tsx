"use client";

import { DEAL_STAGE_LABEL } from "../constants";
import type { ContactRow, MiniSfaViewState } from "../types";
import { MiniSfaUnifiedList } from "./MiniSfaUnifiedList";
import { MiniSfaStatePanel } from "./MiniSfaStatePanel";

interface MiniSfaContactsTabProps {
  contacts: ContactRow[];
  onOpenDeal: (dealId: string) => void;
  viewState: MiniSfaViewState;
  onRetry: () => void;
  onCreateDeal: () => void;
}

export function MiniSfaContactsTab({
  contacts,
  onOpenDeal,
  viewState,
  onRetry,
  onCreateDeal,
}: MiniSfaContactsTabProps) {
  if (viewState.status !== "ready") {
    return (
      <MiniSfaStatePanel
        state={viewState}
        actionLabel={viewState.status === "empty" ? "新規相談を追加" : "再試行する"}
        onAction={viewState.status === "empty" ? onCreateDeal : onRetry}
      />
    );
  }

  const rows = contacts.map((contact) => ({
    id: contact.id,
    primary: contact.clientName,
    secondary: `窓口 ${contact.contactName}`,
    statusLabel: DEAL_STAGE_LABEL[contact.stage],
    dueDate: contact.lastContactAt,
    ownerLabel: contact.assignee,
    metaLabel: contact.practiceArea,
  }));

  return (
    <MiniSfaUnifiedList
      title="顧客一覧"
      description="主情報・ステータス・期限・担当を揃えた一覧です。顧客行から同じ操作で案件詳細へ遷移できます。"
      emptyLabel="顧客データはありません"
      rows={rows}
      actionLabel="詳細を開く"
      onOpenDetail={onOpenDeal}
    />
  );
}
