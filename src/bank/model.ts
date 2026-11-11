import { create } from "zustand";

export type TabId = "home" | "savings" | "life" | "payments" | "credits";

export type ScreenId =
  | TabId
  | "history"
  | "transfer"
  | "success"
  | "card"
  | "bonuses"
  | "profile"
  | "chat"
  | "qr"
  | "security"
  | "tx"
  | "receipt"
  | "search"
  | "market"
  | "requisites"
  | "service";

export type PayMode = "internal" | "sbp" | "card";
export type KindFilter = "all" | "in" | "out";
export type PeriodFilter = "all" | "today" | "month";
export type SheetId = null | "more" | "kind" | "period" | "account" | "contacts" | "topup";

export type TxIcon = "arrow" | "tbank";

export type Tx = {
  id: string;
  group: string;
  title: string;
  place?: string;
  category: string;
  amount: number;
  accountAfter?: number;
  fee?: number;
  status: "ok" | "failed";
  failReason?: string;
  icon: TxIcon;
  repeatable?: boolean;
  kind: "sbp" | "internal" | "incoming" | "foreign" | "other";
  when?: string;
};

// ... rest of the file will be truncated in this example, but in real I need full
