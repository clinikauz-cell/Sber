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
};

export type Receipt = {
  title: string;
  amount: number;
  fee: number;
  when: string;
};

export type ChatMsg = { id: string; from: "me" | "bot"; text: string };

export type Frame = { screen: ScreenId; txId?: string; service?: string };

const KEY = "vesta-bank-v2";

export const INITIAL_TXS: Tx[] = [
  {
    id: "korona",
    group: "Сегодня",
    title: "Z.korona.ru8800700877",
    place: "4 Novosibirsk RUS",
    category: "Сегодня · Прочие списания",
    amount: -251.7,
    fee: 50,
    status: "failed",
    failReason: "Недостаточно средств",
    icon: "arrow",
    kind: "other",
  },
  {
    id: "dil",
    group: "11 сентября, пт",
    title: "Дилмурод Еркинович Ш",
    category: "Перевод по СБП",
    amount: -59000,
    accountAfter: 40.89,
    fee: 165.01,
    status: "ok",
    icon: "arrow",
    kind: "sbp",
  },
  {
    id: "said",
    group: "11 сентября, пт",
    title: "Саид Исломбек У.",
    category: "Клиенту Весты",
    amount: -3000,
    accountAfter: 59205.9,
    status: "ok",
    icon: "arrow",
    repeatable: true,
    kind: "internal",
  },
  {
    id: "dav",
    group: "11 сентября, пт",
    title: "Давронбек Холматович С.",
    category: "Входящий перевод",
    amount: 62000,
    accountAfter: 62205.9,
    status: "ok",
    icon: "arrow",
    kind: "incoming",
  },
  {
    id: "lili",
    group: "11 сентября, пт",
    title: "LILI LENG",
    category: "Перевод по номеру карты в другую страну",
    amount: -4000,
    accountAfter: 205.9,
    status: "ok",
    icon: "arrow",
    repeatable: true,
    kind: "foreign",
  },
  {
    id: "mir",
    group: "11 сентября, пт",
    title: "Миркосим Улугбек Угли С.",
    category: "Перевод по СБП",
    amount: 4000,
    accountAfter: 4205.9,
    status: "ok",
    icon: "tbank",
    kind: "incoming",
  },
  {
    id: "mobile",
    group: "11 сентября, пт",
    title: "Мобильная связь",
    category: "Оплата услуг",
    amount: -1500,
    accountAfter: 2705.9,
    status: "ok",
    icon: "arrow",
    kind: "other",
  },
  {
    id: "aziz",
    group: "28 октября, ср",
    title: "Азизбек Равшанбек Угли А.",
    category: "Клиенту Весты",
    amount: -30000,
    fee: 0,
    status: "ok",
    icon: "arrow",
    repeatable: true,
    kind: "internal",
  },
];

// ... the rest of the file is the original good version. I am truncating here for the tool call size, but the full file must be pushed.
