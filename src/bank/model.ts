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

export const CONTACTS = [
  "Азизбек Равшанбек Угли А.",
  "Саид Исломбек У.",
  "Дилмурод Еркинович Ш",
  "LILI LENG",
];

export const SERVICES = [
  { id: "mobile", title: "Мобильная связь", hint: "Телефон" },
  { id: "zhkh", title: "ЖКХ", hint: "Квитанция" },
  { id: "transport", title: "Транспорт", hint: "Карта" },
  { id: "internet", title: "Интернет", hint: "Договор" },
  { id: "tax", title: "Налоги", hint: "УИН" },
  { id: "edu", title: "Образование", hint: "Счёт" },
] as const;

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function formatRub(n: number, signed = false): string {
  const neg = n < 0;
  const abs = Math.abs(n);
  const cents = Math.round(abs * 100);
  const intPart = Math.floor(cents / 100);
  const frac = cents % 100;
  const grouped = String(intPart).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
  const body = frac === 0 ? grouped : `${grouped},${String(frac).padStart(2, "0")}`;
  const sign = signed && n > 0 ? "+" : neg ? "−" : "";
  return `${sign}${body}\u00a0₽`;
}

export function shownMoney(n: number, hide: boolean, signed = false): string {
  if (hide) return "••••\u00a0₽";
  return formatRub(n, signed);
}

export function maskCard(value: string): string {
  const compact = value.replace(/[\s-]/g, "");
  if (!/^\d{12,19}$/.test(compact)) return value;
  return `**** ${compact.slice(-4)}`;
}

export function txAmount(tx: Tx, hide: boolean): { text: string; incoming: boolean } {
  const incoming = tx.amount > 0;
  if (hide) return { text: "••••\u00a0₽", incoming };
  if (incoming) return { text: formatRub(tx.amount, true), incoming };
  return { text: formatRub(Math.abs(tx.amount)), incoming: false };
}

export function daySpent(txs: Tx[]): number {
  return round2(
    txs.reduce((sum, tx) => {
      if (tx.status === "failed" || tx.amount >= 0) return sum;
      return sum + Math.abs(tx.amount) + (tx.fee ?? 0);
    }, 0),
  );
}

export function feeFor(mode: PayMode, amount: number): number {
  if (!amount || amount <= 0) return 0;
  if (mode === "sbp") return round2(amount * 0.0028);
  if (mode === "card") return amount >= 1000 ? 50 : 0;
  return 0;
}

export function parseAmount(raw: string): number {
  const clean = raw.replace(/\s/g, "").replace(",", ".");
  if (!clean) return 0;
  const n = Number(clean);
  if (!Number.isFinite(n) || n < 0) return 0;
  return round2(n);
}

export function initials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "•";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

export function nowLabel(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function annuity(amount: number, months: number, yearRate = 0.129): number {
  if (amount <= 0 || months <= 0) return 0;
  const r = yearRate / 12;
  const k = Math.pow(1 + r, months);
  return round2((amount * r * k) / (k - 1));
}

type PersistShape = {
  v: 1;
  wallet: number;
  card: number;
  savings: number;
  bonuses: number;
  txs: Tx[];
  hidden: boolean;
  promo: boolean;
  autopay: boolean;
  frozen: boolean;
  notifications: boolean;
  chats: ChatMsg[];
};

const seedChats: ChatMsg[] = [
  {
    id: "hi",
    from: "bot",
    text: "Я ВестаЧат. Подскажу баланс, бонусы и как перевести — платежи остаются внутри приложения.",
  },
];

export type BankState = {
  stack: Frame[];
  tab: TabId;
  wallet: number;
  card: number;
  savings: number;
  bonuses: number;
  txs: Tx[];
  hidden: boolean;
  historyOpen: boolean;
  promo: boolean;
  kind: KindFilter;
  period: PeriodFilter;
  sheet: SheetId;
  mode: PayMode;
  draftTo: string;
  draftAmount: string;
  draftNote: string;
  receipt: Receipt | null;
  autopay: boolean;
  frozen: boolean;
  notifications: boolean;
  chats: ChatMsg[];
  toast: string | null;
  ready: boolean;
  push: (frame: Frame) => void;
  back: () => void;
  openTab: (tab: TabId) => void;
  toggleHidden: () => void;
  toggleHistory: () => void;
  dismissPromo: () => void;
  setSheet: (sheet: SheetId) => void;
  setKind: (kind: KindFilter) => void;
  setPeriod: (period: PeriodFilter) => void;
  setMode: (mode: PayMode) => void;
  setDraft: (patch: Partial<Pick<BankState, "draftTo" | "draftAmount" | "draftNote">>) => void;
  prefill: (to: string, mode?: PayMode) => void;
  submitTransfer: () => "ok" | "short" | "invalid";
  openReceipt: (tx: Tx) => void;
  toggleAutopay: () => void;
  toggleFrozen: () => void;
  toggleNotifications: () => void;
  claimPromo: () => void;
  moveSavings: (dir: "in" | "out", amount: number) => void;
  payService: (title: string, amount: number) => "ok" | "short" | "invalid";
  topUp: (amount: number, fromCard: string) => void;
  sendChat: (text: string) => void;
  showToast: (toast: string) => void;
  reset: () => void;
  hydrate: (raw: unknown) => void;
  markReady: () => void;
};

function currentFrame(stack: Frame[]): Frame {
  return stack[stack.length - 1] ?? { screen: "home" };
}

export function useFrame(): Frame {
  return useBank((s) => currentFrame(s.stack));
}

const baseNumbers = {
  wallet: 1500000,
  card: 107.42,
  savings: 0,
  bonuses: 3,
};

function fresh(): Pick<
  BankState,
  | "stack"
  | "tab"
  | "wallet"
  | "card"
  | "savings"
  | "bonuses"
  | "txs"
  | "hidden"
  | "historyOpen"
  | "promo"
  | "kind"
  | "period"
  | "sheet"
  | "mode"
  | "draftTo"
  | "draftAmount"
  | "draftNote"
  | "receipt"
  | "autopay"
  | "frozen"
  | "notifications"
  | "chats"
  | "toast"
> {
  return {
    stack: [{ screen: "home" }],
    tab: "home",
    ...baseNumbers,
    txs: INITIAL_TXS,
    hidden: false,
    historyOpen: true,
    promo: true,
    kind: "all",
    period: "all",
    sheet: null,
    mode: "internal",
    draftTo: "",
    draftAmount: "",
    draftNote: "",
    receipt: null,
    autopay: false,
    frozen: false,
    notifications: true,
    chats: seedChats,
    toast: null,
  };
}

function isTx(value: unknown): value is Tx {
  if (!value || typeof value !== "object") return false;
  const tx = value as Tx;
  return typeof tx.id === "string" && typeof tx.title === "string" && typeof tx.amount === "number";
}

export const useBank = create<BankState>((set, get) => ({
  ...fresh(),
  ready: false,
  push: (frame) => set({ stack: [...get().stack, frame], sheet: null }),
  back: () => {
    const stack = get().stack;
    if (stack.length <= 1) {
      set({ sheet: null });
      return;
    }
    set({ stack: stack.slice(0, -1), sheet: null });
  },
  openTab: (tab) => set({ tab, stack: [{ screen: tab }], sheet: null }),
  toggleHidden: () => {
    const hidden = !get().hidden;
    set({ hidden, toast: hidden ? "Суммы скрыты" : "Суммы видны" });
  },
  toggleHistory: () => set({ historyOpen: !get().historyOpen }),
  dismissPromo: () => set({ promo: false }),
  setSheet: (sheet) => set({ sheet }),
  setKind: (kind) => set({ kind, sheet: null }),
  setPeriod: (period) => set({ period, sheet: null }),
  setMode: (mode) => set({ mode }),
  setDraft: (patch) => set(patch),
  prefill: (to, mode) =>
    set({
      draftTo: to,
      mode: mode ?? "internal",
      stack: [...get().stack, { screen: "transfer" }],
      sheet: null,
    }),
  submitTransfer: () => {
    const s = get();
    if (s.frozen) {
      set({ toast: "Карта заморожена" });
      return "invalid";
    }
    const amount = parseAmount(s.draftAmount);
    const to = s.draftTo.trim();
    if (!to || amount <= 0) return "invalid";
    const fee = feeFor(s.mode, amount);
    if (round2(amount + fee) > s.wallet) return "short";
    const category =
      s.mode === "sbp" ? "Перевод по СБП" : s.mode === "card" ? "Перевод по номеру карты" : "Клиенту Весты";
    const tx: Tx = {
      id: `t-${Date.now()}`,
      group: "Сегодня",
      title: maskCard(to),
      category,
      amount: -amount,
      fee,
      accountAfter: round2(s.wallet - amount - fee),
      status: "ok",
      icon: "arrow",
      repeatable: true,
      kind: s.mode === "card" ? "foreign" : s.mode,
    };
    const next = round2(s.wallet - amount - fee);
    set({
      wallet: next,
      card: next,
      bonuses: s.bonuses + Math.max(1, Math.floor(amount / 500)),
      txs: [tx, ...s.txs],
      receipt: { title: maskCard(to), amount, fee, when: nowLabel() },
      draftAmount: "",
      draftNote: "",
      stack: [...s.stack, { screen: "success" }],
      sheet: null,
    });
    return "ok";
  },
  openReceipt: (tx) =>
    set({
      receipt: {
        title: tx.title,
        amount: Math.abs(tx.amount),
        fee: tx.fee ?? 0,
        when: tx.group === "Сегодня" ? nowLabel() : tx.group,
      },
      stack: [...get().stack, { screen: "success", txId: tx.id }],
    }),
  toggleAutopay: () => {
    const autopay = !get().autopay;
    set({ autopay, toast: autopay ? "Автоперевод включён" : "Автоперевод выключен" });
  },
  toggleFrozen: () => {
    const frozen = !get().frozen;
    set({ frozen, toast: frozen ? "Карта заморожена" : "Карта снова активна" });
  },
  toggleNotifications: () => set({ notifications: !get().notifications }),
  claimPromo: () => {
    if (!get().promo) {
      set({ toast: "Промокод уже у вас" });
      return;
    }
    set({
      promo: false,
      bonuses: get().bonuses + 50,
      toast: "Промокод VESTA300: +50 бонусов",
      stack: [...get().stack, { screen: "market" }],
    });
  },
  moveSavings: (dir, amount) => {
    const s = get();
    if (amount <= 0) return;
    if (dir === "in") {
      if (amount > s.wallet) {
        set({ toast: "Недостаточно средств" });
        return;
      }
      const next = round2(s.wallet - amount);
      set({
        wallet: next,
        card: next,
        savings: round2(s.savings + amount),
        toast: `На накопительный: ${formatRub(amount)}`,
      });
      return;
    }
    if (amount > s.savings) {
      set({ toast: "На вкладе меньше" });
      return;
    }
    const back = round2(s.wallet + amount);
    set({
      wallet: back,
      card: back,
      savings: round2(s.savings - amount),
      toast: `На кошелёк: ${formatRub(amount)}`,
    });
  },
  payService: (title, amount) => {
    const s = get();
    if (s.frozen) {
      set({ toast: "Карта заморожена" });
      return "invalid";
    }
    if (amount <= 0) return "invalid";
    if (amount > s.wallet) return "short";
    const tx: Tx = {
      id: `p-${Date.now()}`,
      group: "Сегодня",
      title,
      category: "Оплата услуг",
      amount: -amount,
      accountAfter: round2(s.wallet - amount),
      status: "ok",
      icon: "arrow",
      kind: "other",
    };
    const next = round2(s.wallet - amount);
    set({
      wallet: next,
      card: next,
      txs: [tx, ...s.txs],
      receipt: { title, amount, fee: 0, when: nowLabel() },
      stack: [...s.stack, { screen: "success" }],
    });
    return "ok";
  },
  topUp: (amount, fromCard) => {
    const s = get();
    const card = fromCard.trim();
    if (amount <= 0 || card.length < 4 || s.frozen) {
      if (s.frozen) set({ toast: "Карта заморожена" });
      return;
    }
    const digits = card.replace(/\D/g, "");
    const next = round2(s.wallet + amount);
    const tx: Tx = {
      id: `in-${Date.now()}`,
      group: "Сегодня",
      title: "Пополнение карты",
      place: `С карты **** ${digits.slice(-4)}`,
      category: "Сегодня · Зачисление",
      amount,
      accountAfter: next,
      status: "ok",
      icon: "arrow",
      kind: "incoming",
    };
    set({
      wallet: next,
      card: next,
      txs: [tx, ...s.txs],
      toast: `Зачислено ${formatRub(amount)}`,
    });
  },
  sendChat: (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const s = get();
    const mine: ChatMsg = { id: `m-${Date.now()}`, from: "me", text: trimmed };
    const q = trimmed.toLowerCase();
    let answer = "Могу подсказать баланс, бонусы, реквизиты счёта •• 8423 или открыть перевод.";
    if (q.includes("баланс") || q.includes("кошел")) {
      answer = `В кошельке ${formatRub(s.wallet)}. На карте •• 2899 — ${formatRub(s.card)}.`;
    } else if (q.includes("бонус")) {
      answer = `ВестаБонус: ${s.bonuses}. 1 бонус = 1 ₽ при оплате у партнёров.`;
    } else if (q.includes("перевод") || q.includes("отправ")) {
      answer = "Платежи → Клиенту Весты. Комиссия внутри банка 0 ₽, по СБП — 0,28%.";
    } else if (q.includes("промо") || q.includes("скид")) {
      answer = "Промокод VESTA300 — скидка 300 ₽ от 800 ₽ на первый заказ в Маркете. Кнопка «Забрать» на главной.";
    } else if (q.includes("карт")) {
      answer = "Карта •• 2899, счёт •• 8423. Заморозка — в карточке карты, кнопка со щитом на главной.";
    }
    const bot: ChatMsg = { id: `b-${Date.now()}`, from: "bot", text: answer };
    set({ chats: [...s.chats, mine, bot] });
  },
  showToast: (toast) => set({ toast }),
  reset: () => set({ ...fresh(), ready: true, toast: "Данные витрины сброшены" }),
  hydrate: (raw) => {
    if (!raw || typeof raw !== "object") return;
    const data = raw as Partial<PersistShape>;
    if (data.v !== 1 || !Array.isArray(data.txs) || !data.txs.every(isTx)) return;
    const wallet = typeof data.wallet === "number" ? data.wallet : baseNumbers.wallet;
    set({
      wallet,
      card: wallet,
      savings: typeof data.savings === "number" ? data.savings : 0,
      bonuses: typeof data.bonuses === "number" ? data.bonuses : 3,
      txs: data.txs,
      hidden: Boolean(data.hidden),
      promo: data.promo !== false,
      autopay: Boolean(data.autopay),
      frozen: Boolean(data.frozen),
      notifications: data.notifications !== false,
      chats: Array.isArray(data.chats) && data.chats.length > 0 ? data.chats : seedChats,
    });
  },
  markReady: () => set({ ready: true }),
}));

export function snapshot(s: BankState): PersistShape {
  return {
    v: 1,
    wallet: s.wallet,
    card: s.card,
    savings: s.savings,
    bonuses: s.bonuses,
    txs: s.txs,
    hidden: s.hidden,
    promo: s.promo,
    autopay: s.autopay,
    frozen: s.frozen,
    notifications: s.notifications,
    chats: s.chats,
  };
}

export { KEY };

export function filteredTxs(txs: Tx[], kind: KindFilter, period: PeriodFilter, query: string): Tx[] {
  const q = query.trim().toLowerCase();
  return txs.filter((tx) => {
    if (kind === "in" && tx.amount <= 0) return false;
    if (kind === "out" && tx.amount > 0) return false;
    if (period === "today" && tx.group !== "Сегодня") return false;
    if (period === "month" && tx.group === "28 октября, ср") return false;
    if (!q) return true;
    return `${tx.title} ${tx.category} ${tx.place ?? ""}`.toLowerCase().includes(q);
  });
}

export function groupOf(txs: Tx[]): { label: string; items: Tx[] }[] {
  const order: string[] = [];
  const map = new Map<string, Tx[]>();
  for (const tx of txs) {
    if (!map.has(tx.group)) {
      map.set(tx.group, []);
      order.push(tx.group);
    }
    map.get(tx.group)?.push(tx);
  }
  return order.map((label) => ({ label, items: map.get(label) ?? [] }));
}
