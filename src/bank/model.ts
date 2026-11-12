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

export type Tx = {
  id: string;
  title: string;
  amount: number;
  when: string;
  kind: "in" | "out";
  category?: string;
};

// Full restored content will be completed
