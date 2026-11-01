import type { ReactNode } from "react";
import {
  daySpent,
  formatRub,
  maskCard,
  shownMoney,
  txAmount,
  type SheetId,
  type Tx,
} from "./model";

const P = {
  user: "M12 12a3.2 3.2 0 1 0-0.01-6.4A3.2 3.2 0 0 0 12 12Zm-6 7.2c.6-2.6 3-4.2 6-4.2s5.4 1.6 6 4.2",
  search: "M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm5-2 3.5 3.5",
  giga: "M12 3 13.4 8.6 19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3ZM17.2 15.2l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z",
  chat: "M6.2 16.4 4 18.4V8.4A2.2 2.2 0 0 1 6.2 6.2h7.4A2.2 2.2 0 0 1 15.8 8.4v5.2a2.2 2.2 0 0 1-2.2 2.2H6.2ZM10.2 18.6h5.6A2.2 2.2 0 0 0 18 16.4V9.4",
  qr: "M8 4.2H5.6A1.6 1.6 0 0 0 4 5.8V8.2M16 4.2h2.4A1.6 1.6 0 0 1 20 5.8V8.2M8 19.8H5.6A1.6 1.6 0 0 1 4 18.2V15.8M16 19.8h2.4a1.6 1.6 0 0 0 1.6-1.6V15.8M7.4 12.1c1.5-2.3 3.1-2.3 4.6-2.3s3.1 0 4.6 2.3M9.1 14.4c.9-1.3 1.8-1.3 2.9-1.3s2 0 2.9 1.3M12 16.5v.2",
  shield: "M12 3.2 19.2 6.1v5.1c0 4.2-3 7-7.2 8.6-4.2-1.6-7.2-4.4-7.2-8.6V6.1L12 3.2ZM9.1 12.1l2 2 3.9-4.1",
  chev: "M9 6l6 6-6 6",
  chevDown: "M6 9l6 6 6-6",
  chevUp: "M6 15l6-6 6 6",
  back: "M15 5 8 12l7 7",
  up: "M12 19V6m0 0 5 5M12 6 7 11",
  down: "M12 5v13m0 0 5-5m-5 5-5-5",
  repeat: "M16 4v4h-4M8 20v-4h4M5.2 9A7 7 0 0 1 18 7.2L16 8M18.8 15A7 7 0 0 1 6 16.8L8 16",
  alert: "M12 21a8.3 8.3 0 1 0 0-16.6A8.3 8.3 0 0 0 12 21ZM12 8v5.2M12 16.7h.01",
  close: "M7 7l10 10M17 7 7 17",
  info: "M12 12v5M12 8h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
  receipt: "M7 3.5h10v17l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2V3.5Z M9 8h6M9 12h6",
  home: "M3.8 11.2 12 4.2l8.2 7V20a1 1 0 0 1-1 1h-5.1v-6.1h-4.2V21H4.8a1 1 0 0 1-1-1v-8.8Z",
  bars: "M5 19V10M12 19V5M19 19v-7",
  spark: "M12 2.8 13.5 9.1 19.6 10.6 13.5 12.1 12 18.4 10.5 12.1 4.4 10.6 10.5 9.1 12 2.8Z",
  pay: "M3.8 8h9.2A1.6 1.6 0 0 1 14.6 9.6v7.2H6.6A2.8 2.8 0 0 1 3.8 14V8Zm11.2 4.2H20M17.4 9.6 20.2 12.2 17.4 14.8",
  card: "M3.6 7.2h16.8v10.2a1.6 1.6 0 0 1-1.6 1.6H5.2a1.6 1.6 0 0 1-1.6-1.6V7.2ZM3.6 11h16.8M7 14.6h4.2",
  dots: "M6 12h.01M12 12h.01M18 12h.01",
  plus: "M12 6v12M6 12h12",
  copy: "M8 8.5V5.8A1.8 1.8 0 0 1 9.8 4h8.4A1.8 1.8 0 0 1 20 5.8v8.4a1.8 1.8 0 0 1-1.8 1.8H16M6.2 8h7.6A1.8 1.8 0 0 1 15.6 9.8v8.4A1.8 1.8 0 0 1 13.8 20H6.2A1.8 1.8 0 0 1 4.4 18.2V9.8A1.8 1.8 0 0 1 6.2 8Z",
  phone: "M8 3.8h8A1.8 1.8 0 0 1 17.8 5.6v12.8A1.8 1.8 0 0 1 16 20.2H8a1.8 1.8 0 0 1-1.8-1.8V5.6A1.8 1.8 0 0 1 8 3.8ZM11 17.4h2",
  snow: "M12 3v18M5 7.5l14 9M19 7.5l-14 9",
  send: "M4 12 20 4l-6 16-2.5-6.5L4 12Z",
};

export function Ico({ name, size = 24, fill = false }: { name: keyof typeof P; size?: number; fill?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={P[name]}
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Mark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.2 7.4 12 17.2 16.8 7.4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SlashedPercent() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3.2 12S6.4 7.2 12 7.2 20.8 12 20.8 12 17.6 16.8 12 16.8 3.2 12 3.2 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.15" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 18.2 19 5.8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function CheckMark() {
  return (
    <svg className="check" viewBox="0 0 86 72" aria-hidden="true">
      <defs>
        <linearGradient id="vesta-check" x1="10" y1="60" x2="78" y2="8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c6f25a" />
          <stop offset="0.55" stopColor="#3ee0a0" />
          <stop offset="1" stopColor="#2ec8ff" />
        </linearGradient>
      </defs>
      <path
        d="M10 38.5 32 58 76 12"
        fill="none"
        stroke="url(#vesta-check)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TABS: { id: "home" | "savings" | "life" | "payments" | "credits"; label: string; icon: keyof typeof P }[] = [
  { id: "home", label: "Главный", icon: "home" },
  { id: "savings", label: "Накопления", icon: "bars" },
  { id: "life", label: "Для жизни", icon: "spark" },
  { id: "payments", label: "Платежи", icon: "pay" },
  { id: "credits", label: "Кредиты", icon: "card" },
];

function TabGlyph({ name, active }: { name: (typeof TABS)[number]["icon"]; active: boolean }) {
  if (name === "home" && active) {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M12 2.4 20.8 10.2v8.4c0 1.7-1.4 2.8-3.2 2.8H6.4c-1.8 0-3.2-1.1-3.2-2.8V10.2L12 2.4Zm-1.9 12.2h3.8v3.7h-3.8v-3.7Z"
        />
      </svg>
    );
  }
  if (name === "home") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4.2 10.4 12 3.4l7.8 7v8.2c0 1.2-.9 2-2.2 2h-4.2v-5.2H10.6V20.6H6.4c-1.3 0-2.2-.8-2.2-2v-8.2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "bars") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2.3" y="11.2" width="5" height="8.2" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <rect x="9.5" y="3.6" width="5" height="15.8" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <rect x="16.7" y="13.8" width="5" height="5.6" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  if (name === "spark") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 1.7 15.2 8.8 22.3 12 15.2 15.2 12 22.3 8.8 15.2 1.7 12 8.8 8.8Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "pay" && active) {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2.2" y="2.2" width="19.6" height="19.6" rx="6" fill="currentColor" />
        <path d="M7 12h8.2M12.2 8.2 16.4 12l-4.2 3.8" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "pay") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M7.3 12h7.1M12.1 8.5 16.4 12l-4.3 3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "card" && active) {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="7.2" y="3.2" width="13" height="9" rx="2.2" fill="currentColor" opacity="0.45" />
        <rect x="3.2" y="8.2" width="15.2" height="12" rx="2.6" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="8.1" y="3.3" width="12.4" height="9.2" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <rect x="3.2" y="8.8" width="14.6" height="11.2" rx="2.3" fill="#fff" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function TabBar({
  tab,
  onTab,
}: {
  tab: string;
  onTab: (id: (typeof TABS)[number]["id"]) => void;
}) {
  return (
    <nav className="tabs" aria-label="Разделы">
      {TABS.map((item) => {
        const on = tab === item.id;
        return (
          <button type="button" key={item.id} className={on ? "tab on" : "tab"} aria-current={on ? "page" : undefined} onClick={() => onTab(item.id)}>
            <TabGlyph name={item.icon} active={on} />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

export function TxRow({
  tx,
  hide,
  onOpen,
  onRepeat,
}: {
  tx: Tx;
  hide: boolean;
  onOpen: () => void;
  onRepeat?: () => void;
}) {
  const amt = txAmount(tx, hide);
  return (
    <div className="tx" role="button" tabIndex={0} onClick={onOpen} onKeyDown={(e) => e.key === "Enter" && onOpen()}>
      <div className={tx.icon === "tbank" ? "tx-ico tbank" : "tx-ico"}>
        {tx.icon === "tbank" ? (
          "Т"
        ) : (
          <Ico name={tx.amount > 0 ? "down" : "up"} size={18} />
        )}
      </div>
      <div className="tx-main">
        <div className="tx-title">{maskCard(tx.title)}</div>
        {tx.place ? <div className="tx-place">{tx.place}</div> : null}
        <div className="tx-sub">{tx.category}</div>
        {tx.accountAfter !== undefined ? (
          <div className="tx-meta">Платёжный счёт: {shownMoney(tx.accountAfter, hide)}</div>
        ) : null}
        {tx.fee !== undefined && tx.kind !== "incoming" ? (
          <div className="tx-meta">Комиссия: {shownMoney(tx.fee, hide)}</div>
        ) : null}
        {tx.failReason ? <div className="tx-warn">{tx.failReason}</div> : null}
      </div>
      <div className="tx-side">
        <div className={amt.incoming ? "tx-amt in" : "tx-amt"}>{amt.text}</div>
        {tx.repeatable && onRepeat ? (
          <button
            className="tx-flag"
            aria-label="Повторить"
            onClick={(e) => {
              e.stopPropagation();
              onRepeat();
            }}
          >
            <Ico name="repeat" size={22} />
          </button>
        ) : null}
        {tx.status === "failed" ? (
          <span className="tx-flag fail-dot" aria-hidden="true">
            <Ico name="alert" size={22} />
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function Groups({
  groups,
  hide,
  onOpen,
  onRepeat,
}: {
  groups: { label: string; items: Tx[] }[];
  hide: boolean;
  onOpen: (tx: Tx) => void;
  onRepeat: (tx: Tx) => void;
}) {
  if (groups.length === 0) return <div className="empty">Операций нет</div>;
  return (
    <>
      {groups.map((group) => {
        const spent = daySpent(group.items);
        return (
          <section key={group.label}>
            <div className="group-h">
              <b>{group.label}</b>
              {spent > 0 ? <span>{formatRub(spent)}</span> : <span />}
            </div>
            <div className="tx-pad">
              {group.items.map((tx) => (
                <TxRow key={tx.id} tx={tx} hide={hide} onOpen={() => onOpen(tx)} onRepeat={tx.repeatable ? () => onRepeat(tx) : undefined} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}

export function Sheet({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="overlay" onClick={onClose} role="presentation">
      <div
        className="sheet"
        role="dialog"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grab" />
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}

export function Choice({
  label,
  on,
  onPick,
}: {
  label: string;
  on: boolean;
  onPick: () => void;
}) {
  return (
    <button className={on ? "choice on" : "choice"} onClick={onPick}>
      {label}
      {on ? "✓" : ""}
    </button>
  );
}

export function sheetTitle(sheet: SheetId): string {
  if (sheet === "more") return "Ещё";
  if (sheet === "kind") return "Что показывать";
  if (sheet === "period") return "Период";
  if (sheet === "account") return "Карта или счёт";
  return "";
}
