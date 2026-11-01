import { useEffect, useState } from "react";
import {
  annuity,
  feeFor,
  filteredTxs,
  formatRub,
  groupOf,
  maskCard,
  parseAmount,
  SERVICES,
  shownMoney,
  useBank,
  type Tx,
} from "./model";
import { CheckMark, Choice, Groups, Ico, Mark, Sheet, SlashedPercent, TxRow } from "./ui";

function PageHead({ title, back }: { title?: string; back?: boolean }) {
  const goBack = useBank((s) => s.back);
  return (
    <div className="subhead">
      {back !== false ? (
        <button className="back" aria-label="Назад" onClick={goBack}>
          <Ico name="back" />
        </button>
      ) : (
        <span style={{ width: 8 }} />
      )}
      {title ? <div className="page-title" style={{ padding: 0 }}>{title}</div> : null}
    </div>
  );
}

export function HomeScreen() {
  const s = useBank();
  const today = s.txs.filter((tx) => tx.group === "Сегодня").slice(0, 3);
  return (
    <div className="screen">
      <div className="scroll home-scroll">
        <div className="topbar">
          <button className="sq" aria-label="Профиль" onClick={() => s.push({ screen: "profile" })}>
            <Ico name="user" />
          </button>
          <button className="search-pill" onClick={() => s.push({ screen: "chat" })}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10" cy="11" r="5.3" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M14.1 15 18.3 19.1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M16.3 4.1 16.9 6.2 19 6.8 16.9 7.4 16.3 9.5 15.7 7.4 13.6 6.8 15.7 6.2Z" fill="currentColor" />
            </svg>
            <span>Поиск</span>
          </button>
          <button className="sq" aria-label="Чаты" onClick={() => s.push({ screen: "chat" })}>
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M15.2 6.4h4.2A1.7 1.7 0 0 1 21.1 8.1v3.6a1.7 1.7 0 0 1-1.7 1.7h-.8l-1.5 1.5v-1.5H15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M4.2 7.6A1.8 1.8 0 0 1 6 5.8h7.4A1.8 1.8 0 0 1 15.2 7.6v5.2a1.8 1.8 0 0 1-1.8 1.8H8.4L5.6 17.2v-2.6H6a1.8 1.8 0 0 1-1.8-1.8V7.6Z"
                fill="rgb(10 28 26 / 0.55)"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="sq" aria-label="Сервисы" onClick={() => s.openTab("life")}>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <rect x="1" y="1" width="6.2" height="6.2" rx="1.7" fill="currentColor" />
              <rect x="10.8" y="1" width="6.2" height="6.2" rx="1.7" fill="currentColor" />
              <rect x="1" y="10.8" width="6.2" height="6.2" rx="1.7" fill="currentColor" />
              <rect x="10.8" y="10.8" width="6.2" height="6.2" rx="1.7" fill="currentColor" />
            </svg>
          </button>
        </div>

        <div className="wallet">
          <div className="wallet-label">В кошельке</div>
          <div className="wallet-row">
            <button className="balance" onClick={() => s.push({ screen: "card" })}>
              {shownMoney(s.wallet, s.hidden)}
              <Ico name="chev" size={18} />
            </button>
            <div className="wallet-actions">
              <button className="icon-hit" aria-label="Скрыть суммы" onClick={s.toggleHidden}>
                <SlashedPercent />
              </button>
              <button className="icon-hit" aria-label="Ещё" onClick={() => s.setSheet("more")}>
                <Ico name="dots" />
              </button>
            </div>
          </div>
        </div>

        <div className="widgets">
          <div className="side-col">
            <button className="w-card w-sq" aria-label="Оплата QR" onClick={() => s.push({ screen: "qr" })}>
              <Ico name="qr" size={28} />
            </button>
            <button className="w-card w-sq" aria-label="Безопасность" onClick={() => s.push({ screen: "security" })}>
              <Ico name="shield" size={26} />
            </button>
          </div>
          <button className="w-card w-main" onClick={() => s.push({ screen: "card" })}>
            <div className="plastic" aria-hidden="true">
              <i />
            </div>
            <div className="card-digits">2899</div>
            <div className="w-spacer" />
            <div className="w-sum">{shownMoney(s.wallet, s.hidden)}</div>
            <div className="w-sub">Счёт •• 8423</div>
          </button>
          <button className="w-card w-bonus" onClick={() => s.push({ screen: "bonuses" })}>
            <span className="mark">C</span>
            <div className="w-spacer" />
            <div className="bonus-num">{s.hidden ? "•" : s.bonuses}</div>
            <div className="bonus-name">СберБонус</div>
          </button>
        </div>

        {s.promo ? (
          <article className="promo">
            <button className="promo-x" aria-label="Закрыть" onClick={s.dismissPromo}>
              <Ico name="close" size={16} />
            </button>
            <div className="promo-copy">
              <div className="promo-title">☕ 🍁 Для вас осеннее предложение</div>
              <div className="promo-sub">Скидка 60% на первый заказ</div>
            </div>
            <div className="promo-side">
              <div className="promo-badge" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="3.1" fill="#fff" />
                  <path d="M5.2 19.2c1.2-3.2 3.6-4.8 6.8-4.8s5.6 1.6 6.8 4.8" fill="#fff" />
                </svg>
              </div>
              <button className="promo-cta" onClick={s.claimPromo}>
                Забрать
              </button>
            </div>
          </article>
        ) : null}

        <section className="hist">
          <div className="hist-head">
            <button className="hist-title" onClick={s.toggleHistory}>
              История
              <Ico name={s.historyOpen ? "chevUp" : "chevDown"} size={18} />
            </button>
            <button className="hist-all" onClick={() => s.push({ screen: "history" })}>
              Все
            </button>
          </div>
          {s.historyOpen ? (
            <div>
              {today.map((tx) => (
                <TxRow
                  key={tx.id}
                  tx={tx}
                  hide={s.hidden}
                  onOpen={() => s.push({ screen: "tx", txId: tx.id })}
                  onRepeat={
                    tx.repeatable
                      ? () => s.prefill(tx.title, tx.kind === "sbp" ? "sbp" : tx.kind === "foreign" ? "card" : "internal")
                      : undefined
                  }
                />
              ))}
            </div>
          ) : null}
        </section>
        <PayDock />
      </div>
    </div>
  );
}

export function HistoryScreen() {
  const s = useBank();
  const [query, setQuery] = useState("");
  const list = filteredTxs(s.txs, s.kind, s.period, query);
  const kindLabel = s.kind === "in" ? "Зачисления" : s.kind === "out" ? "Списания" : "Что показывать";
  const periodLabel = s.period === "today" ? "Сегодня" : s.period === "month" ? "Этот месяц" : "Период";
  return (
    <div className="screen">
      <div className="subhead">
        <button className="back" aria-label="Назад" onClick={s.back}>
          <Ico name="back" />
        </button>
        <label className="search-field">
          <Ico name="search" size={18} />
          <input value={query} placeholder="Поиск" onChange={(e) => setQuery(e.target.value)} />
        </label>
      </div>
      <div className="chips">
        <button className="chip" onClick={() => s.setSheet("kind")}>
          {kindLabel} <Ico name="chevDown" size={16} />
        </button>
        <button className="chip" onClick={() => s.setSheet("period")}>
          {periodLabel} <Ico name="chevDown" size={16} />
        </button>
        <button className="chip" onClick={() => s.setSheet("account")}>
          Карта или счёт <Ico name="chevDown" size={16} />
        </button>
      </div>
      <div className="sheet-page">
        <div className="scroll">
          <Groups
            groups={groupOf(list)}
            hide={s.hidden}
            onOpen={(tx) => s.push({ screen: "tx", txId: tx.id })}
            onRepeat={(tx) => s.prefill(tx.title, tx.kind === "sbp" ? "sbp" : tx.kind === "foreign" ? "card" : "internal")}
          />
        </div>
      </div>
    </div>
  );
}

export function TransferScreen() {
  const s = useBank();
  const [tab, setTab] = useState<"ru" | "world">("ru");
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState<"list" | "pay" | "load">(s.draftTo ? "pay" : "list");
  const people = [
    { name: "Себе в другой банк", phone: "+7 (969) 872-98-91", letter: "" },
    { name: "Amirxon", phone: "+7 (962) 677-63-34", letter: "A" },
  ];
  const shown = people.filter((p) => (p.name + p.phone).toLowerCase().includes(query.trim().toLowerCase()));
  const amount = parseAmount(s.draftAmount);
  const fee = feeFor(s.mode, amount);
  const total = Math.round((amount + fee) * 100) / 100;
  const short = amount > 0 && total > s.wallet;

  useEffect(() => {
    if (phase !== "load") return;
    const id = window.setTimeout(() => {
      useBank.getState().submitTransfer();
    }, 5000);
    return () => window.clearTimeout(id);
  }, [phase]);

  const pick = (name: string, card: boolean) => {
    s.setDraft({ draftTo: name });
    s.setMode(card ? "card" : "internal");
    setPhase("pay");
  };

  return (
    <div className="screen xf">
      <div className="xf-head">
        <button className="xf-back" aria-label="Назад" onClick={() => (phase === "pay" ? setPhase("list") : s.back())}>
          <Ico name="back" />
        </button>
        <h1>Перевод</h1>
      </div>
      {phase === "load" ? (
        <div className="xf-load">
          <span className="xf-spin" />
          <p>Платёж выполняется</p>
        </div>
      ) : phase === "pay" ? (
        <div className="scroll">
          <div className="xf-pay">
            <div className="xf-who">{s.draftTo}</div>
            <input
              inputMode="decimal"
              aria-label="Сумма"
              placeholder="0 ₽"
              value={s.draftAmount}
              onChange={(e) => s.setDraft({ draftAmount: e.target.value })}
            />
            <div className={short ? "xf-hint bad" : "xf-hint"}>
              Комиссия {shownMoney(fee, false)} · {shownMoney(s.wallet, s.hidden)}
            </div>
            <button className="xf-send" disabled={amount <= 0 || short || s.frozen} onClick={() => setPhase("load")}>
              {short ? "Недостаточно средств" : "Перевести"}
            </button>
          </div>
        </div>
      ) : (
        <div className="scroll">
          <div className="xf-tabs">
            <button className={tab === "ru" ? "on" : ""} onClick={() => setTab("ru")}>По России</button>
            <button className={tab === "world" ? "on" : ""} onClick={() => setTab("world")}>В другую страну</button>
          </div>
          <div className="xf-search">
            <input
              value={query}
              placeholder="По телефону, карте или счёту"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button aria-label="Сканер" onClick={() => s.push({ screen: "qr" })}>
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M8 4H5.2A1.2 1.2 0 0 0 4 5.2V8M16 4h2.8A1.2 1.2 0 0 1 20 5.2V8M20 16v2.8a1.2 1.2 0 0 1-1.2 1.2H16M8 20H5.2A1.2 1.2 0 0 1 4 18.8V16" fill="none" stroke="#21a34a" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>
          </div>
          <button className="xf-person" onClick={() => pick(people[0].name, true)}>
            <span className="xf-ava"><Ico name="user" size={18} /></span>
            <span>
              <b>Себе в другой банк</b>
              <small>+7 (969) 872-98-91</small>
            </span>
          </button>
          {shown.some((p) => p.letter === "A") ? <div className="xf-letter">A</div> : null}
          {shown.filter((p) => p.letter === "A").map((p) => (
            <button key={p.name} className="xf-person" onClick={() => pick(p.name, true)}>
              <span className="xf-ava">A</span>
              <span>
                <b>{p.name}</b>
                <small>{p.phone}</small>
              </span>
              <svg className="xf-star" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 4 1.8 4.6L18.6 9l-3.4 3 .9 4.8L12 14.8 7.9 16.8 8.8 12 5.4 9l4.8-.4Z" fill="none" stroke="#8d8d93" strokeWidth="1.4" /></svg>
            </button>
          ))}
          {query.trim() && shown.length === 0 ? (
            <button className="xf-person" onClick={() => pick(query.trim(), true)}>
              <span className="xf-ava">{query.trim().slice(0, 1).toUpperCase()}</span>
              <span><b>{query.trim()}</b><small>Карта или счёт</small></span>
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}

export function SuccessScreen() {
  const s = useBank();
  const r = s.receipt;
  return (
    <div className="screen">
      <div className="success-wrap">
        <div className="success-card">
          <CheckMark />
          <h2>Платёж выполнен</h2>
          <p className="success-sum">{r ? formatRub(r.amount) : formatRub(0)}</p>
          <div className="success-meta">
            Комиссия {r ? formatRub(r.fee) : formatRub(0)}
            <br />
            {r?.title}
          </div>
          <div className="btn-row">
            <button className="btn-dark" onClick={() => s.push({ screen: "receipt" })}>
              <Ico name="receipt" size={18} /> Чек
            </button>
            <button className={s.autopay ? "btn-dark on" : "btn-dark"} onClick={s.toggleAutopay}>
              Автоперевод
            </button>
          </div>
          <button
            className="btn-light"
            onClick={() => {
              s.openTab("home");
            }}
          >
            На главный
          </button>
        </div>
      </div>
    </div>
  );
}

export function TxScreen({ tx }: { tx: Tx }) {
  const s = useBank();
  const amt = tx.amount > 0 ? formatRub(tx.amount, true) : formatRub(Math.abs(tx.amount));
  return (
    <div className="screen">
      <PageHead title="Операция" />
      <div className="scroll">
        <div className="pad">
          <div className="block" style={{ textAlign: "center", padding: 22 }}>
            <div className={tx.amount > 0 ? "pay-figure in" : "pay-figure"}>
              {s.hidden ? "•••• ₽" : amt}
            </div>
            <div style={{ marginTop: 6, fontWeight: 700 }}>{maskCard(tx.title)}</div>
            {tx.place ? <div className="muted">{tx.place}</div> : null}
            <div className="muted" style={{ marginTop: 4 }}>{tx.category}</div>
          </div>
          {tx.status === "failed" ? <div className="banner-warn" style={{ marginTop: 10 }}>{tx.failReason}</div> : null}
          <div className="block" style={{ marginTop: 10 }}>
            {tx.fee !== undefined ? (
              <div className="row">
                Комиссия <small>{shownMoney(tx.fee, s.hidden)}</small>
              </div>
            ) : null}
            {tx.accountAfter !== undefined ? (
              <div className="row">
                Платёжный счёт <small>{shownMoney(tx.accountAfter, s.hidden)}</small>
              </div>
            ) : null}
            <div className="row">
              Статус <small>{tx.status === "failed" ? "Отклонено" : "Исполнено"}</small>
            </div>
          </div>
          <div style={{ display: "grid", gap: 8, marginTop: 14 }}>
            {tx.status === "ok" && tx.amount < 0 ? (
              <button className="cta ghost" onClick={() => s.openReceipt(tx)}>
                Чек
              </button>
            ) : null}
            {tx.repeatable ? (
              <button
                className="cta"
                onClick={() => s.prefill(tx.title, tx.kind === "sbp" ? "sbp" : tx.kind === "foreign" ? "card" : "internal")}
              >
                Повторить
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReceiptScreen() {
  const s = useBank();
  const r = s.receipt;
  return (
    <div className="screen">
      <PageHead title="Чек" />
      <div className="scroll">
        <div className="pad">
          <div className="block">
            <div className="muted">АО «Веста» · демо</div>
            <div className="pay-figure" style={{ marginTop: 8 }}>{r ? formatRub(r.amount) : "—"}</div>
            <div className="row"><span>Получатель</span><small>{r?.title}</small></div>
            <div className="row"><span>Комиссия</span><small>{r ? formatRub(r.fee) : "—"}</small></div>
            <div className="row"><span>Когда</span><small>{r?.when}</small></div>
            <div className="row"><span>Счёт</span><small>•• 8423</small></div>
            <div className="row"><span>Статус</span><small>Доставлен</small></div>
          </div>
          <p className="fine">Чек сформирован внутри витрины. Деньги никуда не отправляются.</p>
        </div>
      </div>
    </div>
  );
}

export function CardScreen() {
  const s = useBank();
  return (
    <div className="screen">
      <PageHead title="Карта" />
      <div className="scroll">
        <div className="pad">
          <div className="hero-card">
            <div className="brandline">
              <span>Веста</span>
              <span>{s.frozen ? "Заморожена" : "Дебетовая"}</span>
            </div>
            <div>
              <div className="pan">•••• •••• •••• 2899</div>
              <div style={{ marginTop: 10, fontSize: 28, fontWeight: 750 }}>{shownMoney(s.wallet, s.hidden)}</div>
              <div style={{ opacity: 0.8 }}>Счёт •• 8423</div>
            </div>
          </div>
          <div className="svc-grid" style={{ marginTop: 12 }}>
            <button className="svc" onClick={() => s.push({ screen: "transfer" })}>
              <span className="svc-ico"><Ico name="up" size={18} /></span>
              <b>Перевести</b>
            </button>
            <button className="svc" onClick={() => s.push({ screen: "requisites" })}>
              <span className="svc-ico"><Ico name="copy" size={18} /></span>
              <b>Реквизиты</b>
            </button>
            <button className="svc" onClick={s.toggleFrozen}>
              <span className="svc-ico"><Ico name="snow" size={18} /></span>
              <b>{s.frozen ? "Разморозить" : "Заморозить"}</b>
            </button>
            <button className="svc" onClick={() => s.push({ screen: "history" })}>
              <span className="svc-ico"><Ico name="receipt" size={18} /></span>
              <b>Операции</b>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RequisitesScreen() {
  const showToast = useBank((s) => s.showToast);
  const copy = (text: string) => {
    void navigator.clipboard?.writeText(text).then(
      () => showToast("Скопировано"),
      () => showToast(text),
    );
  };
  const rows = [
    ["Получатель", "Клиент Весты"],
    ["Счёт", "40817 810 0 0000 0008423"],
    ["Банк", "АО «Веста»"],
    ["БИК", "044525999"],
    ["ИНН", "7700000099"],
    ["К/с", "30101 810 0 0000 0000999"],
  ];
  return (
    <div className="screen">
      <PageHead title="Реквизиты" />
      <div className="scroll">
        <div className="pad">
          <div className="block">
            {rows.map(([k, v]) => (
              <button key={k} className="row" onClick={() => copy(v)}>
                <span>
                  {k}
                  <br />
                  <small>{v}</small>
                </span>
                <Ico name="copy" size={18} />
              </button>
            ))}
          </div>
          <p className="fine">Учебные реквизиты. Это не настоящий банк и не настоящий счёт.</p>
        </div>
      </div>
    </div>
  );
}

export function BonusesScreen() {
  const bonuses = useBank((s) => s.bonuses);
  const hidden = useBank((s) => s.hidden);
  return (
    <div className="screen">
      <PageHead title="ВестаБонус" />
      <div className="scroll">
        <div className="pad">
          <div className="block" style={{ textAlign: "center", padding: 28 }}>
            <span className="mark" style={{ margin: "0 auto 10px" }}>
              <Mark />
            </span>
            <div className="rate">{hidden ? "••" : bonuses}</div>
            <div className="muted">1 бонус = 1 ₽</div>
          </div>
          <div className="block">
            <div className="row">За переводы <small>+1 / 500 ₽</small></div>
            <div className="row">Промокод VESTA300 <small>+50</small></div>
            <div className="row">Партнёры <small>Маркет</small></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileScreen() {
  const s = useBank();
  return (
    <div className="screen">
      <PageHead title="" />
      <div className="scroll">
        <div className="profile-head">
          <span className="avatar lg">В</span>
          <b>Клиент Весты</b>
          <span className="muted">+7 ••• ••• 42 18</span>
        </div>
        <div className="pad">
          <div className="block">
            <button className="row" onClick={() => s.push({ screen: "chat" })}>
              ВестаЧат <Ico name="chev" size={18} />
            </button>
            <button className="row" onClick={() => s.push({ screen: "security" })}>
              Безопасность <Ico name="chev" size={18} />
            </button>
            <button className="row" onClick={() => s.push({ screen: "requisites" })}>
              Реквизиты <Ico name="chev" size={18} />
            </button>
            <div className="row">
              Уведомления
              <button className={s.notifications ? "switch on" : "switch"} aria-label="Уведомления" onClick={s.toggleNotifications}>
                <i />
              </button>
            </div>
          </div>
          <p className="fine">
            Веста — демонстрационный интерфейс. Карты, переводы и бонусы не связаны с реальным банком, деньги не списываются.
          </p>
        </div>
      </div>
    </div>
  );
}

export function SecurityScreen() {
  const s = useBank();
  return (
    <div className="screen">
      <PageHead title="Безопасность" />
      <div className="scroll">
        <div className="pad">
          <div className="block">
            <div className="row">
              Скрыть суммы
              <button className={s.hidden ? "switch on" : "switch"} onClick={s.toggleHidden} aria-label="Скрыть суммы">
                <i />
              </button>
            </div>
            <div className="row">
              Заморозка карты
              <button className={s.frozen ? "switch on" : "switch"} onClick={s.toggleFrozen} aria-label="Заморозка">
                <i />
              </button>
            </div>
            <div className="row">
              Автоперевод
              <button className={s.autopay ? "switch on" : "switch"} onClick={s.toggleAutopay} aria-label="Автоперевод">
                <i />
              </button>
            </div>
          </div>
          <button className="cta ghost" style={{ marginTop: 16 }} onClick={s.reset}>
            Сбросить витрину
          </button>
        </div>
      </div>
    </div>
  );
}

export function ChatScreen() {
  const chats = useBank((s) => s.chats);
  const send = useBank((s) => s.sendChat);
  const [text, setText] = useState("");
  const submit = () => {
    send(text);
    setText("");
  };
  return (
    <div className="screen">
      <PageHead title="ВестаЧат" />
      <div className="scroll">
        <div className="chat-log">
          {chats.map((m) => (
            <div key={m.id} className={m.from === "me" ? "bubble-msg me" : "bubble-msg bot"}>
              {m.text}
            </div>
          ))}
        </div>
      </div>
      <div className="suggests">
        {["Какой баланс?", "Сколько бонусов?", "Как перевести?", "Промокод"].map((q) => (
          <button key={q} onClick={() => send(q)}>
            {q}
          </button>
        ))}
      </div>
      <form
        className="composer"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input value={text} placeholder="Спросить" onChange={(e) => setText(e.target.value)} />
        <button className="send" type="submit" aria-label="Отправить">
          <Ico name="send" size={18} />
        </button>
      </form>
    </div>
  );
}

export function QrScreen() {
  const cells = Array.from({ length: 81 }, (_, i) => {
    const edge = i < 9 || i > 71 || i % 9 === 0 || i % 9 === 8;
    const on = edge || ((i * 17 + 5) % 7 > 2);
    return on;
  });
  return (
    <div className="screen">
      <PageHead title="QR" />
      <div className="scroll">
        <div className="pad">
          <div className="qr-box" aria-hidden="true">
            {cells.map((on, i) => (
              <i key={i} className={on ? "" : "off"} />
            ))}
          </div>
          <p className="center-note">Мой код для перевода внутри Весты. Это рисунок, не платёжная ссылка.</p>
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <b>Клиент Весты</b>
            <div className="muted">Счёт •• 8423</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MarketScreen() {
  return (
    <div className="screen">
      <PageHead title="Маркет" />
      <div className="scroll">
        <div className="pad">
          <div className="block" style={{ textAlign: "center", padding: 22 }}>
            <div className="promo-logo" style={{ margin: "0 auto 12px" }}>
              <Ico name="repeat" size={22} />
            </div>
            <div className="pay-figure">300 ₽</div>
            <div>Скидка от 800 ₽ на первый заказ</div>
            <div className="muted" style={{ marginTop: 6 }}>Промокод VESTA300</div>
          </div>
          <p className="fine">Рекламный блок витрины. Заказ в магазине отсюда не оформляется.</p>
        </div>
      </div>
    </div>
  );
}

function PayDock() {
  const s = useBank();
  return (
        <div className="pay-body">
          <section className="pay-card spend">
            <p>Расходы за ноябрь появятся, когда вы что-нибудь оплатите</p>
            <button className="pay-link" onClick={() => s.push({ screen: "history" })}>
              Перейти в расходы
            </button>
          </section>

          <section className="pay-card">
            <h2>Переводы</h2>
            <button className="pay-search" onClick={() => s.push({ screen: "transfer" })}>
              <span>В Весту или в другой банк</span>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 7h9M14 4l3 3-3 3M17 17H8M10 14l-3 3 3 3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="pay-go" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M5 12h12M13 6l6 6-6 6" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <div className="pay-people">
              <button onClick={() => { s.setMode("internal"); s.push({ screen: "transfer" }); }}>
                <span className="pay-ava">
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 4v16M8 8l4-4 4 4M8 16l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>Между своими</span>
              </button>
              <button onClick={() => { s.setMode("card"); s.push({ screen: "transfer" }); }}>
                <span className="pay-ava">
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M4 12h16M12 4c2.4 2.6 3.6 5.2 3.6 8s-1.2 5.4-3.6 8c-2.4-2.6-3.6-5.2-3.6-8s1.2-5.4 3.6-8Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
                <span>В другую страну</span>
              </button>
              <button onClick={() => s.prefill("Дилмурод Эркинович", "sbp")}>
                <span className="pay-ava">ДЭ</span>
                <span>Дилмурод Эркинович</span>
              </button>
              <button onClick={() => s.prefill("Дилшодбек А.", "sbp")}>
                <span className="pay-ava">ДА</span>
                <span>Дилшодбек А.</span>
              </button>
              <button onClick={() => s.prefill("Акмал Мир", "sbp")}>
                <span className="pay-ava">А</span>
                <span>Акмал Мир</span>
              </button>
            </div>
          </section>

          <section className="pay-card">
            <h2>Сервисы</h2>
            <div className="pay-grid">
              <button className="pay-tile" onClick={() => s.openTab("savings")}>
                <span>Оформить карту, вклад и другое</span>
                <b className="pay-plus">+</b>
              </button>
              <button className="pay-tile" onClick={() => s.openTab("life")}>
                <span>Все сервисы</span>
                <svg className="pay-gridico" width="22" height="22" viewBox="0 0 18 18" aria-hidden="true">
                  <rect x="1" y="1" width="6.2" height="6.2" rx="1.6" fill="currentColor" />
                  <rect x="10.8" y="1" width="6.2" height="6.2" rx="1.6" fill="currentColor" />
                  <rect x="1" y="10.8" width="6.2" height="6.2" rx="1.6" fill="currentColor" />
                  <rect x="10.8" y="10.8" width="6.2" height="6.2" rx="1.6" fill="currentColor" />
                </svg>
              </button>
              <button className="pay-tile" onClick={() => s.openTab("life")}>
                <span>Открытый банкинг</span>
                <span className="pay-badges" aria-hidden="true">
                  <i className="t">Т</i>
                  <i className="ok">✓</i>
                </span>
              </button>
              <button className="pay-tile map" onClick={() => s.push({ screen: "market" })}>
                <span>Веста и партнёры</span>
                <svg className="pay-map" viewBox="0 0 160 110" aria-hidden="true">
                  <path d="M0 28h160M0 62h160M0 92h160M28 0v110M78 0v110M124 0v110" stroke="#8ea0b0" strokeWidth="6" />
                  <path d="M0 46h160M52 0v110" stroke="#c5d0d8" strokeWidth="3" />
                </svg>
                <span className="pin g" />
                <span className="pin w" />
              </button>
            </div>
          </section>
        </div>
  );
}

export function PaymentsScreen() {
  const s = useBank();
  return (
    <div className="screen pay-page">
      <div className="scroll">
        <div className="topbar">
          <button className="sq" aria-label="Профиль" onClick={() => s.push({ screen: "profile" })}>
            <Ico name="user" />
          </button>
          <button className="search-pill" onClick={() => s.push({ screen: "history" })}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10" cy="11" r="5.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M14.2 15.1 18.2 19" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M16.4 4.2 17 6.2 19 6.8 17 7.4 16.4 9.4 15.8 7.4 13.8 6.8 15.8 6.2Z" fill="currentColor" />
            </svg>
            <span>История</span>
          </button>
          <button className="sq pj-spark" aria-label="Сервисы" onClick={() => s.openTab("life")}>
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2 14 9l7 3-7 3-2 7-2-7-7-3 7-3Z" fill="#3dd6ff" />
              <path d="M17 3.5 18 6.5 21 7.5 18 8.5 17 11.5 16 8.5 13 7.5 16 6.5Z" fill="#ff4fd8" />
            </svg>
          </button>
        </div>

        <div className="pj">
          <div className="pj-title">
            <h1>Платежи</h1>
            <div className="wallet-actions">
              <button className="icon-hit" aria-label="Скрыть суммы" onClick={s.toggleHidden}>
                <SlashedPercent />
              </button>
              <button className="icon-hit" aria-label="Ещё" onClick={() => s.setSheet("more")}>
                <Ico name="dots" />
              </button>
            </div>
          </div>

          <section className="pj-card">
            <button className="pj-acc" onClick={() => s.push({ screen: "card" })}>
              <span className="pj-logo" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 26 26">
                  <path d="M5 15.5 11.2 9.2 14.6 12.6 21 6" fill="none" stroke="#1f9d4a" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15.2 6H21v5.8" fill="none" stroke="#2f6fed" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="pj-acc-mid">
                <b>
                  {shownMoney(s.wallet, s.hidden)}
                  <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 16.8 15.4 5.4l3.2 3.2L7.2 20H4v-3.2Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  </svg>
                </b>
                <small>Оплата с учёт... • ...8423</small>
              </span>
              <Ico name="dots" size={18} />
            </button>
            <button className="pj-all" onClick={() => s.push({ screen: "card" })}>
              Посмотреть все
            </button>
          </section>

          <div className="pj-duo">
            <button onClick={() => s.push({ screen: "qr" })}>
              <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 3.5H5.2A1.7 1.7 0 0 0 3.5 5.2V8M16 3.5h2.8A1.7 1.7 0 0 1 20.5 5.2V8M20.5 16v2.8a1.7 1.7 0 0 1-1.7 1.7H16M8 20.5H5.2A1.7 1.7 0 0 1 3.5 18.8V16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>Сканировать QR или телефон</span>
            </button>
            <button onClick={() => s.push({ screen: "service", service: "mobile" })}>
              <span className="pj-ops" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="14" fill="#ff7a18" /><rect x="11" y="7" width="6" height="14" rx="1.4" fill="none" stroke="#fff" strokeWidth="1.4" /><path d="M12.2 18.6h3.6" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" /></svg>
                <svg width="28" height="28" viewBox="0 0 28 28"><defs><clipPath id="beeclip"><circle cx="14" cy="14" r="14" /></clipPath></defs><g clipPath="url(#beeclip)"><rect width="28" height="28" fill="#111" /><path d="M-4 6h36M-4 12h36M-4 18h36M-4 24h36" stroke="#f5d000" strokeWidth="3.2" transform="rotate(-28 14 14)" /></g></svg>
                <svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="14" fill="#e30611" /></svg>
                <svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="14" fill="#ffe14a" /></svg>
                <svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="14" fill="#111" /><text x="14" y="17" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="sans-serif">t2</text></svg>
              </span>
              <span>Оплатить мобильную связь</span>
            </button>
          </div>

          <section className="pj-card">
            <h2>Недавно платили</h2>
            <div className="pj-recent">
              <button onClick={() => s.push({ screen: "service", service: "mobile" })}>
                <span className="pj-ava">
                  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 5.2a6.2 6.2 0 1 1-4.4 10.6" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M6.2 12.2H3.4l2-2.2" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.2 10.2h2.3v3.4M10.2 13.6h2.3" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </span>
                <span>Автоплатежи</span>
              </button>
              <button onClick={() => s.push({ screen: "service", service: "mobile" })}>
                <span className="pj-ava mts">М<br />Т<br />С</span>
                <span>МТС</span>
              </button>
              <button onClick={() => s.push({ screen: "service", service: "mobile" })}>
                <span className="pj-ava bee" />
                <span>билайн</span>
              </button>
              <button onClick={() => s.push({ screen: "service", service: "mobile" })}>
                <span className="pj-ava t2"><i />t2</span>
                <span>t2</span>
              </button>
              <button onClick={() => s.push({ screen: "service", service: "internet" })}>
                <span className="pj-ava yota">Y</span>
                <span>Yota</span>
              </button>
            </div>
          </section>

          <section className="pj-card">
            <h2>Перевести</h2>
            <button className="pj-transfer" onClick={() => { s.setDraft({ draftTo: "" }); s.push({ screen: "transfer" }); }}>
              <span>В Весту или в другой банк</span>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 7h9M14 4l3 3-3 3M17 17H8M10 14l-3 3 3 3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="pay-go" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M5 12h12M13 6l6 6-6 6" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <div className="pay-people">
              <button onClick={() => { s.setMode("internal"); s.push({ screen: "transfer" }); }}>
                <span className="pay-ava"><svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 5v14M8 9l4-4 4 4M8 15l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                <span>Между своими</span>
              </button>
              <button onClick={() => { s.setMode("card"); s.push({ screen: "transfer" }); }}>
                <span className="pay-ava"><svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M4 12h16M12 4c2.2 2.4 3.4 5 3.4 8s-1.2 5.6-3.4 8c-2.2-2.4-3.4-5-3.4-8s1.2-5.6 3.4-8Z" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></span>
                <span>В другую страну</span>
              </button>
              <button onClick={() => s.prefill("Дилмурод Эркинович", "card")}>
                <span className="pay-ava">ДЭ</span>
                <span>Дилмурод Эркинович</span>
              </button>
              <button onClick={() => s.prefill("Дилшодбек А.", "card")}>
                <span className="pay-ava">ДА</span>
                <span>Дилшодбек А.</span>
              </button>
              <button onClick={() => s.prefill("Акмал Мир", "card")}>
                <span className="pay-ava">А</span>
                <span>Акмал Мир</span>
              </button>
            </div>
          </section>
          <section className="pj-card">
            <div className="sv-head">
              <h2>Дома и авто</h2>
              <button aria-label="Ещё" onClick={() => s.openTab("life")}><Ico name="chev" size={16} /></button>
            </div>
            <div className="pj-home">
              <button onClick={() => s.openTab("credits")}>
                <b>Недвижимость</b>
                <span>ст-ца Владимирская, Краснодарский край</span>
              </button>
              <button onClick={() => s.openTab("credits")}>
                <b>Добавить авто</b>
                <span>Напомним о штрафах, покажем заправки</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export function ServiceScreen({ service }: { service: string }) {
  const s = useBank();
  const meta = SERVICES.find((item) => item.id === service) ?? SERVICES[0];
  const [amount, setAmount] = useState("300");
  const [ref, setRef] = useState("");
  const n = parseAmount(amount);
  const short = n > s.wallet;
  return (
    <div className="screen">
      <PageHead title={meta.title} />
      <div className="scroll">
        <div className="pad">
          <div className="field">
            <label htmlFor="ref">{meta.hint}</label>
            <input id="ref" value={ref} placeholder="Номер" onChange={(e) => setRef(e.target.value)} />
          </div>
          <div className="amount-box">
            <input inputMode="decimal" aria-label="Сумма" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <div className={short ? "hint-row warn" : "hint-row"}>
              <span>Без комиссии</span>
              <span>{shownMoney(s.wallet, s.hidden)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="cta-wrap">
        <button
          className={short ? "cta bad" : "cta"}
          disabled={!ref.trim() || n <= 0 || short}
          onClick={() => s.payService(meta.title, n)}
        >
          {short ? "Недостаточно средств" : "Оплатить"}
        </button>
      </div>
    </div>
  );
}

export function SavingsScreen() {
  const s = useBank();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("100");
  const n = parseAmount(amount);
  const account = 407.61 + s.savings;
  const total = 525.3 + s.savings;
  return (
    <div className="screen">
      <div className="scroll">
        <div className="topbar">
          <button className="sq" aria-label="Профиль" onClick={() => s.push({ screen: "profile" })}>
            <Ico name="user" />
          </button>
          <button className="search-pill" onClick={() => s.push({ screen: "chat" })}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10" cy="11" r="5.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M14.2 15.1 18.2 19" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M16.4 4.2 17 6.2 19 6.8 17 7.4 16.4 9.4 15.8 7.4 13.8 6.8 15.8 6.2Z" fill="currentColor" />
            </svg>
            <span>Вклад</span>
          </button>
          <button className="sq" aria-label="Чаты" onClick={() => s.push({ screen: "chat" })}>
            <Ico name="chat" size={20} />
          </button>
          <button className="sq" aria-label="Сервисы" onClick={() => s.openTab("life")}>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <rect x="1" y="1" width="6.2" height="6.2" rx="1.7" fill="currentColor" />
              <rect x="10.8" y="1" width="6.2" height="6.2" rx="1.7" fill="currentColor" />
              <rect x="1" y="10.8" width="6.2" height="6.2" rx="1.7" fill="currentColor" />
              <rect x="10.8" y="10.8" width="6.2" height="6.2" rx="1.7" fill="currentColor" />
            </svg>
          </button>
        </div>

        <div className="sv">
          <div className="sv-label">Всего средств</div>
          <div className="sv-row">
            <button className="sv-sum" onClick={() => setOpen((v) => !v)}>
              {shownMoney(total, s.hidden)}
              <Ico name="chev" size={16} />
            </button>
            <div className="wallet-actions">
              <button className="icon-hit" aria-label="Скрыть суммы" onClick={s.toggleHidden}>
                <SlashedPercent />
              </button>
              <button className="icon-hit" aria-label="Ещё" onClick={() => s.setSheet("more")}>
                <Ico name="dots" />
              </button>
            </div>
          </div>

          <div className="sv-pair">
            <div className="sv-box">
              <div>Поступления в ноябре</div>
              <b>{s.hidden ? "•" : "2,25 ₽"}</b>
            </div>
            <div className="sv-box">
              <div>Пополните счёт и получайте доход</div>
              <button className="sv-link" onClick={() => setOpen(true)}>Пополнить</button>
            </div>
          </div>

          {open ? (
            <div className="sv-topup">
              <input inputMode="decimal" aria-label="Сумма" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <button
                disabled={n <= 0 || n > s.wallet}
                onClick={() => {
                  s.moveSavings("in", n);
                  setOpen(false);
                }}
              >
                Перевести
              </button>
            </div>
          ) : null}

          <section className="sv-card">
            <div className="sv-head">
              <h2>Вклады и счета</h2>
              <button aria-label="Открыть" onClick={() => setOpen(true)}>+</button>
            </div>
            <button className="sv-acc" onClick={() => setOpen(true)}>
              <span className="sv-acc-ico" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <rect x="4" y="8" width="16" height="11" rx="2" fill="none" stroke="#fff" strokeWidth="1.6" />
                  <path d="M8 8V6.5A4 4 0 0 1 12 2.5 4 4 0 0 1 16 6.5V8" fill="none" stroke="#fff" strokeWidth="1.6" />
                  <circle cx="12" cy="13.5" r="1.3" fill="#fff" />
                </svg>
              </span>
              <span className="sv-acc-mid">
                <b>{shownMoney(account, s.hidden)}</b>
                <small>Накопительный счет •• 9594</small>
              </span>
              <span className="sv-rate">6,5%</span>
            </button>
          </section>

          <section className="sv-card">
            <h2>Открыть новое</h2>
            <div className="sv-new">
              <button>
                <span>Вклад или счёт</span>
                <svg width="42" height="42" viewBox="0 0 42 42" aria-hidden="true">
                  <rect x="6" y="10" width="30" height="24" rx="6" fill="#e8ecea" />
                  <circle cx="21" cy="22" r="7" fill="#21a34a" />
                  <circle cx="21" cy="22" r="2.2" fill="#e8ecea" />
                </svg>
              </button>
              <button>
                <span>Брокерский счёт</span>
                <svg width="42" height="42" viewBox="0 0 42 42" aria-hidden="true">
                  <rect x="8" y="22" width="7" height="12" rx="2" fill="#dfe3e1" />
                  <rect x="17" y="14" width="7" height="20" rx="2" fill="#cfd5d2" />
                  <rect x="26" y="18" width="7" height="16" rx="2" fill="#ecefee" />
                  <path d="M10 16c6-2 10 4 16-6" fill="none" stroke="#21a34a" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </button>
              <button>
                <span>Металлы</span>
                <svg width="42" height="42" viewBox="0 0 42 42" aria-hidden="true">
                  <rect x="8" y="16" width="22" height="16" rx="2" fill="#f0d48a" />
                  <rect x="12" y="12" width="22" height="16" rx="2" fill="#f6e2a8" />
                  <path d="M16 20h14M16 24h10" stroke="#c9a24a" strokeWidth="1.4" />
                </svg>
              </button>
              <button>
                <span>Инвестиции</span>
                <svg width="42" height="42" viewBox="0 0 42 42" aria-hidden="true">
                  <circle cx="21" cy="22" r="12" fill="#e7f6ec" />
                  <path d="M14 24l5-6 4 3 6-7" fill="none" stroke="#21a34a" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </section>

          <section className="sv-card">
            <div className="sv-head">
              <h2>Курсы</h2>
              <button aria-label="Все курсы" onClick={() => s.openTab("life")}>
                <Ico name="chev" size={16} />
              </button>
            </div>
            <div className="sv-fx">
              <span>USD</span><b>92,45</b>
              <span>EUR</span><b>100,12</b>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export function LifeScreen() {
  const push = useBank((s) => s.push);
  return (
    <div className="screen">
      <div className="scroll">
        <h1 className="page-title">Для жизни</h1>
        <div className="pad">
          <div className="svc-grid">
            {SERVICES.map((svc) => (
              <button key={svc.id} className="svc" onClick={() => push({ screen: "service", service: svc.id })}>
                <span className="svc-ico"><Ico name="spark" size={18} /></span>
                <b>{svc.title}</b>
                <span>{svc.hint}</span>
              </button>
            ))}
            <button className="svc" onClick={() => push({ screen: "market" })}>
              <span className="svc-ico"><Ico name="repeat" size={18} /></span>
              <b>Маркет</b>
              <span>−300 ₽</span>
            </button>
            <button className="svc" onClick={() => push({ screen: "bonuses" })}>
              <span className="svc-ico"><Mark size={16} /></span>
              <b>ВестаБонус</b>
              <span>Баллы</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CreditsScreen() {
  const s = useBank();
  const [page, setPage] = useState<"main" | "history">("main");
  return (
    <div className="screen">
      <div className="scroll">
        <div className="topbar">
          <button className="sq" aria-label="Профиль" onClick={() => s.push({ screen: "profile" })}>
            <Ico name="user" />
          </button>
          <button className="search-pill" onClick={() => s.push({ screen: "chat" })}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10" cy="11" r="5.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M14.2 15.1 18.2 19" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M16.4 4.2 17 6.2 19 6.8 17 7.4 16.4 9.4 15.8 7.4 13.8 6.8 15.8 6.2Z" fill="currentColor" />
            </svg>
            <span>{page === "history" ? "Справка" : "Автоплатёж"}</span>
          </button>
        </div>

        {page === "history" ? (
          <div className="cr">
            <button className="cr-back" onClick={() => setPage("main")}>К кредитам</button>
            <h1>Кредитная история</h1>
            <p className="cr-sub">Информация от кредитных бюро</p>
            <div className="cr-duo">
              <button>
                <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="3" width="12" height="16" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" /><path d="M9 8h6M9 12h6M9 15h3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" /></svg>
                <b>Отчёт</b>
                <span>Проверить свою историю</span>
              </button>
              <button>
                <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16H9l-3.2 2.4V16H7.5A2.5 2.5 0 0 1 5 13.5v-7Z" fill="none" stroke="#fff" strokeWidth="1.5" /></svg>
                <b>Мониторинг</b>
                <span>Следить за изменениями</span>
              </button>
            </div>
            <section className="cr-card">
              <h2>Сервисы</h2>
              <button className="cr-row"><i><svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3" fill="none" stroke="#fff" strokeWidth="1.5" /><path d="M6 18c1.2-2.4 3.2-3.6 6-3.6s4.8 1.2 6 3.6" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /><path d="M17 6.2l1.2 1.2 2-2.2" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" /></svg></i><span><b>Подтверждение кредита близким</b><small>Чтобы не ждать зачисления денег 48 часов</small></span></button>
              <button className="cr-row"><i><svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 19s-6.2-3.8-6.2-8A3.6 3.6 0 0 1 12 8a3.6 3.6 0 0 1 6.2 3c0 4.2-6.2 8-6.2 8Z" fill="none" stroke="#fff" strokeWidth="1.5" /></svg></i><span><b>Финансовое здоровье</b><small>Оценка кредитного потенциала</small></span></button>
              <button className="cr-row"><i><svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" fill="none" stroke="#fff" strokeWidth="1.5" /><circle cx="12" cy="12" r="2.2" fill="none" stroke="#fff" strokeWidth="1.4" /></svg></i><span><b>Помощь близкому с кредитом</b><small>Оплачивайте кредиты близких</small></span></button>
              <button className="cr-row"><i><svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" fill="none" stroke="#fff" strokeWidth="1.5" /><path d="M12 8.5v4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /><path d="M10.2 11.2h2.4c.8 0 1.4.5 1.4 1.2s-.6 1.2-1.4 1.2h-1.6" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" /></svg></i><span><b>Финансовые трудности</b><small>Если возникли сложности с оплатой кредита</small></span></button>
              <button className="cr-row"><i><svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 4.5 14 8h4l-2 3 1 4.5L12 13.2 7 15.5 8 11 6 8h4l2-3.5Z" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" /></svg></i><span><b>Защита от кредитных мошенников</b></span></button>
            </section>
          </div>
        ) : (
          <div className="cr">
            <div className="pj-title">
              <h1>Кредиты</h1>
              <div className="wallet-actions">
                <button className="icon-hit" aria-label="Скрыть суммы" onClick={s.toggleHidden}><SlashedPercent /></button>
                <button className="icon-hit" aria-label="Ещё" onClick={() => s.setSheet("more")}><Ico name="dots" /></button>
              </div>
            </div>
            <section className="cr-card">
              <h2>Кредитный потенциал</h2>
              <p>Узнайте, сколько одобрит банк, без заявки на кредит</p>
              <button className="cr-know" onClick={() => setPage("history")}>Узнать</button>
            </section>
            <section className="cr-card">
              <h2>Что можно оформить</h2>
              <div className="cr-grid">
                <button className="cr-tile tall">
                  <span>На любые цели</span>
                  <svg className="cr-art" viewBox="0 0 80 54" aria-hidden="true"><rect x="18" y="8" width="46" height="30" rx="4" fill="#d7f5e4" /><rect x="22" y="14" width="46" height="30" rx="4" fill="#b7ebc8" /><circle cx="34" cy="29" r="6" fill="#21a34a" /></svg>
                  <em>Узнать больше</em>
                </button>
                <button className="cr-tile">
                  <span>Кредитная карта</span>
                  <svg className="cr-art" viewBox="0 0 70 48" aria-hidden="true"><rect x="16" y="8" width="46" height="30" rx="4" fill="#2a2c31" stroke="#21a34a" strokeWidth="2" /><rect x="20" y="16" width="16" height="8" rx="2" fill="#3a3c42" /></svg>
                </button>
                <button className="cr-tile">
                  <span>Автокредит</span>
                  <svg className="cr-art" viewBox="0 0 64 48" aria-hidden="true"><circle cx="34" cy="28" r="14" fill="#3a3c42" /><circle cx="34" cy="28" r="6" fill="#21a34a" /><circle cx="34" cy="28" r="2" fill="#d7f5e4" /></svg>
                </button>
                <button className="cr-tile">
                  <span>Ипотека</span>
                  <svg className="cr-art" viewBox="0 0 70 56" aria-hidden="true"><path d="M18 28 36 12l18 16v16H18V28Z" fill="none" stroke="#7dffa2" strokeWidth="4" /><path d="M28 44V32h16v12" fill="none" stroke="#d7f5e4" strokeWidth="3" /></svg>
                </button>
              </div>
              <button className="cr-all" onClick={() => setPage("history")}>
                <i />
                <span>Все кредиты</span>
                <Ico name="chev" size={16} />
              </button>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export function MoreSheet() {
  const s = useBank();
  return (
    <Sheet title="Ещё" onClose={() => s.setSheet(null)}>
      <button className="choice" onClick={() => { s.setSheet(null); s.push({ screen: "requisites" }); }}>Реквизиты счёта</button>
      <button className="choice" onClick={() => { s.setSheet(null); s.push({ screen: "history" }); }}>Выписка</button>
      <button className="choice" onClick={() => { s.setSheet(null); s.toggleHidden(); }}>Скрыть баланс</button>
      <button className="choice" onClick={() => { s.setSheet(null); s.push({ screen: "security" }); }}>Безопасность</button>
    </Sheet>
  );
}

export function FilterSheets() {
  const s = useBank();
  if (s.sheet === "kind") {
    return (
      <Sheet title="Что показывать" onClose={() => s.setSheet(null)}>
        <Choice label="Все операции" on={s.kind === "all"} onPick={() => s.setKind("all")} />
        <Choice label="Списания" on={s.kind === "out"} onPick={() => s.setKind("out")} />
        <Choice label="Зачисления" on={s.kind === "in"} onPick={() => s.setKind("in")} />
      </Sheet>
    );
  }
  if (s.sheet === "period") {
    return (
      <Sheet title="Период" onClose={() => s.setSheet(null)}>
        <Choice label="Всё время" on={s.period === "all"} onPick={() => s.setPeriod("all")} />
        <Choice label="Сегодня" on={s.period === "today"} onPick={() => s.setPeriod("today")} />
        <Choice label="Без октября" on={s.period === "month"} onPick={() => s.setPeriod("month")} />
      </Sheet>
    );
  }
  if (s.sheet === "account") {
    return (
      <Sheet title="Карта или счёт" onClose={() => s.setSheet(null)}>
        <Choice label="Все" on onPick={() => s.setSheet(null)} />
        <Choice label="Карта •• 2899" on={false} onPick={() => s.setSheet(null)} />
        <Choice label="Счёт •• 8423" on={false} onPick={() => s.setSheet(null)} />
      </Sheet>
    );
  }
  return null;
}
