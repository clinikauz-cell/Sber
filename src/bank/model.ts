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
  title: string;
  amount: number;
  when: string;
  kind: "in" | "out";
  category?: string;
  icon?: TxIcon;
};

export const KEY = "vesta-wallet-v1";

export function snapshot(state: unknown) {
  return state;
}

export function useBank() {
  return { getState: () => ({}), hydrate: () => {}, markReady: () => {}, subscribe: () => () => {} };
}

export function useFrame() {
  return { screen: "home" as ScreenId, txId: null, service: null };
}
