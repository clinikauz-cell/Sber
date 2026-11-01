import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CAXuHH22.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "vesta-bank-v1";
var INITIAL_TXS = [
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
		kind: "other"
	},
	{
		id: "dil",
		group: "11 сентября, пт",
		title: "Дилмурод Еркинович Ш",
		category: "Перевод по СБП",
		amount: -59e3,
		accountAfter: 40.89,
		fee: 165.01,
		status: "ok",
		icon: "arrow",
		kind: "sbp"
	},
	{
		id: "said",
		group: "11 сентября, пт",
		title: "Саид Исломбек У.",
		category: "Клиенту Весты",
		amount: -3e3,
		accountAfter: 59205.9,
		status: "ok",
		icon: "arrow",
		repeatable: true,
		kind: "internal"
	},
	{
		id: "dav",
		group: "11 сентября, пт",
		title: "Давронбек Холматович С.",
		category: "Входящий перевод",
		amount: 62e3,
		accountAfter: 62205.9,
		status: "ok",
		icon: "arrow",
		kind: "incoming"
	},
	{
		id: "lili",
		group: "11 сентября, пт",
		title: "LILI LENG",
		category: "Перевод по номеру карты в другую страну",
		amount: -4e3,
		accountAfter: 205.9,
		status: "ok",
		icon: "arrow",
		repeatable: true,
		kind: "foreign"
	},
	{
		id: "mir",
		group: "11 сентября, пт",
		title: "Миркосим Улугбек Угли С.",
		category: "Перевод по СБП",
		amount: 4e3,
		accountAfter: 4205.9,
		status: "ok",
		icon: "tbank",
		kind: "incoming"
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
		kind: "other"
	},
	{
		id: "aziz",
		group: "28 октября, ср",
		title: "Азизбек Равшанбек Угли А.",
		category: "Клиенту Весты",
		amount: -3e4,
		fee: 0,
		status: "ok",
		icon: "arrow",
		repeatable: true,
		kind: "internal"
	}
];
var CONTACTS = [
	"Азизбек Равшанбек Угли А.",
	"Саид Исломбек У.",
	"Дилмурод Еркинович Ш",
	"LILI LENG"
];
var SERVICES = [
	{
		id: "mobile",
		title: "Мобильная связь",
		hint: "Телефон"
	},
	{
		id: "zhkh",
		title: "ЖКХ",
		hint: "Квитанция"
	},
	{
		id: "transport",
		title: "Транспорт",
		hint: "Карта"
	},
	{
		id: "internet",
		title: "Интернет",
		hint: "Договор"
	},
	{
		id: "tax",
		title: "Налоги",
		hint: "УИН"
	},
	{
		id: "edu",
		title: "Образование",
		hint: "Счёт"
	}
];
function round2(n) {
	return Math.round(n * 100) / 100;
}
function formatRub(n, signed = false) {
	const neg = n < 0;
	const cents = Math.round(Math.abs(n) * 100);
	const intPart = Math.floor(cents / 100);
	const frac = cents % 100;
	const grouped = String(intPart).replace(/\B(?=(\d{3})+(?!\d))/g, "\xA0");
	const body = frac === 0 ? grouped : `${grouped},${String(frac).padStart(2, "0")}`;
	return `${signed && n > 0 ? "+" : neg ? "−" : ""}${body}\u00a0₽`;
}
function shownMoney(n, hide, signed = false) {
	if (hide) return "••••\xA0₽";
	return formatRub(n, signed);
}
function txAmount(tx, hide) {
	const incoming = tx.amount > 0;
	if (hide) return {
		text: "••••\xA0₽",
		incoming
	};
	if (incoming) return {
		text: formatRub(tx.amount, true),
		incoming
	};
	return {
		text: formatRub(Math.abs(tx.amount)),
		incoming: false
	};
}
function daySpent(txs) {
	return round2(txs.reduce((sum, tx) => {
		if (tx.status === "failed" || tx.amount >= 0) return sum;
		return sum + Math.abs(tx.amount) + (tx.fee ?? 0);
	}, 0));
}
function feeFor(mode, amount) {
	if (!amount || amount <= 0) return 0;
	if (mode === "sbp") return round2(amount * .0028);
	if (mode === "card") return amount >= 1e3 ? 50 : 0;
	return 0;
}
function parseAmount(raw) {
	const clean = raw.replace(/\s/g, "").replace(",", ".");
	if (!clean) return 0;
	const n = Number(clean);
	if (!Number.isFinite(n) || n < 0) return 0;
	return round2(n);
}
function initials(name) {
	const parts = name.split(/\s+/).filter(Boolean);
	return ((parts[0]?.[0] ?? "•") + (parts[1]?.[0] ?? "")).toUpperCase();
}
function nowLabel() {
	const d = /* @__PURE__ */ new Date();
	const pad = (n) => String(n).padStart(2, "0");
	return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function annuity(amount, months, yearRate = .129) {
	if (amount <= 0 || months <= 0) return 0;
	const r = yearRate / 12;
	const k = Math.pow(1 + r, months);
	return round2(amount * r * k / (k - 1));
}
var seedChats = [{
	id: "hi",
	from: "bot",
	text: "Я ВестаЧат. Подскажу баланс, бонусы и как перевести — платежи остаются внутри приложения."
}];
function currentFrame(stack) {
	return stack[stack.length - 1] ?? { screen: "home" };
}
function useFrame() {
	return useBank((s) => currentFrame(s.stack));
}
var baseNumbers = {
	wallet: 117.69,
	card: 107.42,
	savings: 0,
	bonuses: 3
};
function fresh() {
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
		toast: null
	};
}
function isTx(value) {
	if (!value || typeof value !== "object") return false;
	const tx = value;
	return typeof tx.id === "string" && typeof tx.title === "string" && typeof tx.amount === "number";
}
var useBank = create((set, get) => ({
	...fresh(),
	ready: false,
	push: (frame) => set({
		stack: [...get().stack, frame],
		sheet: null
	}),
	back: () => {
		const stack = get().stack;
		if (stack.length <= 1) {
			set({ sheet: null });
			return;
		}
		set({
			stack: stack.slice(0, -1),
			sheet: null
		});
	},
	openTab: (tab) => set({
		tab,
		stack: [{ screen: tab }],
		sheet: null
	}),
	toggleHidden: () => {
		const hidden = !get().hidden;
		set({
			hidden,
			toast: hidden ? "Суммы скрыты" : "Суммы видны"
		});
	},
	toggleHistory: () => set({ historyOpen: !get().historyOpen }),
	dismissPromo: () => set({ promo: false }),
	setSheet: (sheet) => set({ sheet }),
	setKind: (kind) => set({
		kind,
		sheet: null
	}),
	setPeriod: (period) => set({
		period,
		sheet: null
	}),
	setMode: (mode) => set({ mode }),
	setDraft: (patch) => set(patch),
	prefill: (to, mode) => set({
		draftTo: to,
		mode: mode ?? "internal",
		stack: [...get().stack, { screen: "transfer" }],
		sheet: null
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
		const category = s.mode === "sbp" ? "Перевод по СБП" : s.mode === "card" ? "Перевод по номеру карты" : "Клиенту Весты";
		const tx = {
			id: `t-${Date.now()}`,
			group: "Сегодня",
			title: to,
			category,
			amount: -amount,
			fee,
			accountAfter: round2(s.wallet - amount - fee),
			status: "ok",
			icon: "arrow",
			repeatable: true,
			kind: s.mode === "card" ? "foreign" : s.mode
		};
		set({
			wallet: round2(s.wallet - amount - fee),
			card: round2(Math.max(0, s.card - amount - fee)),
			bonuses: s.bonuses + Math.max(1, Math.floor(amount / 500)),
			txs: [tx, ...s.txs],
			receipt: {
				title: to,
				amount,
				fee,
				when: nowLabel()
			},
			draftAmount: "",
			draftNote: "",
			stack: [...s.stack, { screen: "success" }],
			sheet: null
		});
		return "ok";
	},
	openReceipt: (tx) => set({
		receipt: {
			title: tx.title,
			amount: Math.abs(tx.amount),
			fee: tx.fee ?? 0,
			when: tx.group === "Сегодня" ? nowLabel() : tx.group
		},
		stack: [...get().stack, {
			screen: "success",
			txId: tx.id
		}]
	}),
	toggleAutopay: () => {
		const autopay = !get().autopay;
		set({
			autopay,
			toast: autopay ? "Автоперевод включён" : "Автоперевод выключен"
		});
	},
	toggleFrozen: () => {
		const frozen = !get().frozen;
		set({
			frozen,
			toast: frozen ? "Карта заморожена" : "Карта снова активна"
		});
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
			stack: [...get().stack, { screen: "market" }]
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
			set({
				wallet: round2(s.wallet - amount),
				card: round2(Math.max(0, s.card - amount)),
				savings: round2(s.savings + amount),
				toast: `На накопительный: ${formatRub(amount)}`
			});
			return;
		}
		if (amount > s.savings) {
			set({ toast: "На вкладе меньше" });
			return;
		}
		set({
			wallet: round2(s.wallet + amount),
			card: round2(s.card + amount),
			savings: round2(s.savings - amount),
			toast: `На кошелёк: ${formatRub(amount)}`
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
		const tx = {
			id: `p-${Date.now()}`,
			group: "Сегодня",
			title,
			category: "Оплата услуг",
			amount: -amount,
			accountAfter: round2(s.wallet - amount),
			status: "ok",
			icon: "arrow",
			kind: "other"
		};
		set({
			wallet: round2(s.wallet - amount),
			card: round2(Math.max(0, s.card - amount)),
			txs: [tx, ...s.txs],
			receipt: {
				title,
				amount,
				fee: 0,
				when: nowLabel()
			},
			stack: [...s.stack, { screen: "success" }]
		});
		return "ok";
	},
	sendChat: (text) => {
		const trimmed = text.trim();
		if (!trimmed) return;
		const s = get();
		const mine = {
			id: `m-${Date.now()}`,
			from: "me",
			text: trimmed
		};
		const q = trimmed.toLowerCase();
		let answer = "Могу подсказать баланс, бонусы, реквизиты счёта •• 8423 или открыть перевод.";
		if (q.includes("баланс") || q.includes("кошел")) answer = `В кошельке ${formatRub(s.wallet)}. На карте •• 2899 — ${formatRub(s.card)}.`;
		else if (q.includes("бонус")) answer = `ВестаБонус: ${s.bonuses}. 1 бонус = 1 ₽ при оплате у партнёров.`;
		else if (q.includes("перевод") || q.includes("отправ")) answer = "Платежи → Клиенту Весты. Комиссия внутри банка 0 ₽, по СБП — 0,28%.";
		else if (q.includes("промо") || q.includes("скид")) answer = "Промокод VESTA300 — скидка 300 ₽ от 800 ₽ на первый заказ в Маркете. Кнопка «Забрать» на главной.";
		else if (q.includes("карт")) answer = "Карта •• 2899, счёт •• 8423. Заморозка — в карточке карты, кнопка со щитом на главной.";
		const bot = {
			id: `b-${Date.now()}`,
			from: "bot",
			text: answer
		};
		set({ chats: [
			...s.chats,
			mine,
			bot
		] });
	},
	showToast: (toast) => set({ toast }),
	reset: () => set({
		...fresh(),
		ready: true,
		toast: "Данные витрины сброшены"
	}),
	hydrate: (raw) => {
		if (!raw || typeof raw !== "object") return;
		const data = raw;
		if (data.v !== 1 || !Array.isArray(data.txs) || !data.txs.every(isTx)) return;
		set({
			wallet: typeof data.wallet === "number" ? data.wallet : baseNumbers.wallet,
			card: typeof data.card === "number" ? data.card : baseNumbers.card,
			savings: typeof data.savings === "number" ? data.savings : 0,
			bonuses: typeof data.bonuses === "number" ? data.bonuses : 3,
			txs: data.txs,
			hidden: Boolean(data.hidden),
			promo: data.promo !== false,
			autopay: Boolean(data.autopay),
			frozen: Boolean(data.frozen),
			notifications: data.notifications !== false,
			chats: Array.isArray(data.chats) && data.chats.length > 0 ? data.chats : seedChats
		});
	},
	markReady: () => set({ ready: true })
}));
function snapshot(s) {
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
		chats: s.chats
	};
}
function filteredTxs(txs, kind, period, query) {
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
function groupOf(txs) {
	const order = [];
	const map = /* @__PURE__ */ new Map();
	for (const tx of txs) {
		if (!map.has(tx.group)) {
			map.set(tx.group, []);
			order.push(tx.group);
		}
		map.get(tx.group)?.push(tx);
	}
	return order.map((label) => ({
		label,
		items: map.get(label) ?? []
	}));
}
var P = {
	user: "M12 12a3.2 3.2 0 1 0-0.01-6.4A3.2 3.2 0 0 0 12 12Zm-6 7.2c.6-2.6 3-4.2 6-4.2s5.4 1.6 6 4.2",
	search: "M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm5-2 3.5 3.5",
	chat: "M7 17.5 4 20V7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v7a2.5 2.5 0 0 1-2.5 2.5H7Z",
	qr: "M5 5h5v5H5V5Zm9 0h5v5h-5V5ZM5 14h5v5H5v-5Zm9 3h2m3 0h.1M14 14h2m3 3v2m-5 0h2",
	shield: "M12 3.5 19 6.5v5.2c0 4.2-2.8 7.2-7 8.8-4.2-1.6-7-4.6-7-8.8V6.5L12 3.5Z",
	chev: "M9 6l6 6-6 6",
	chevDown: "M6 9l6 6 6-6",
	chevUp: "M6 15l6-6 6 6",
	back: "M15 5 8 12l7 7",
	up: "M12 19V6m0 0 5 5M12 6 7 11",
	down: "M12 5v13m0 0 5-5m-5 5-5-5",
	repeat: "M16 4v4h-4M8 20v-4h4M5.2 9A7 7 0 0 1 18 7.2L16 8M18.8 15A7 7 0 0 1 6 16.8L8 16",
	alert: "M12 8.2v5M12 16.6h.01M12 3.8 21 19.2H3L12 3.8Z",
	close: "M7 7l10 10M17 7 7 17",
	info: "M12 12v5M12 8h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
	receipt: "M7 3.5h10v17l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2V3.5Z M9 8h6M9 12h6",
	home: "M4 11.2 12 4.5l8 6.7V20a1 1 0 0 1-1 1h-5.2v-6.2H10.2V21H5a1 1 0 0 1-1-1v-8.8Z",
	bars: "M5 19V10M12 19V5M19 19v-7",
	spark: "M12 3.5 13.6 9 19 10.5 13.6 12 12 17.5 10.4 12 5 10.5 10.4 9 12 3.5Z",
	pay: "M4 8.5h12.5A2.5 2.5 0 0 1 19 11v7.5H7.5A2.5 2.5 0 0 1 5 16V8.5Zm0 0 3-4h9M16 13h4",
	card: "M3.5 8.5h17v9a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-9Zm0 3h17",
	dots: "M6 12h.01M12 12h.01M18 12h.01",
	plus: "M12 6v12M6 12h12",
	copy: "M8 8.5V5.8A1.8 1.8 0 0 1 9.8 4h8.4A1.8 1.8 0 0 1 20 5.8v8.4a1.8 1.8 0 0 1-1.8 1.8H16M6.2 8h7.6A1.8 1.8 0 0 1 15.6 9.8v8.4A1.8 1.8 0 0 1 13.8 20H6.2A1.8 1.8 0 0 1 4.4 18.2V9.8A1.8 1.8 0 0 1 6.2 8Z",
	phone: "M8 3.8h8A1.8 1.8 0 0 1 17.8 5.6v12.8A1.8 1.8 0 0 1 16 20.2H8a1.8 1.8 0 0 1-1.8-1.8V5.6A1.8 1.8 0 0 1 8 3.8ZM11 17.4h2",
	snow: "M12 3v18M5 7.5l14 9M19 7.5l-14 9",
	send: "M4 12 20 4l-6 16-2.5-6.5L4 12Z"
};
function Ico({ name, size = 24, fill = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: P[name],
			fill: fill ? "currentColor" : "none",
			stroke: "currentColor",
			strokeWidth: fill ? "1.2" : "1.8",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Mark({ size = 22 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M6 6.5 12 18l6-11.5",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2.4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function SlashedPercent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "26",
		height: "26",
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M8.2 8.1a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4ZM15.8 19.3a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4ZM7 19 17 5M5 5l14 14",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.7",
			strokeLinecap: "round"
		})
	});
}
function StatusBar({ time }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "status",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "status-time",
			children: time
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "status-icons",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					width: "16",
					height: "12",
					viewBox: "0 0 16 12",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "0",
							y: "7",
							width: "2.4",
							height: "5",
							rx: "0.6",
							fill: "currentColor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "4.2",
							y: "5",
							width: "2.4",
							height: "7",
							rx: "0.6",
							fill: "currentColor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "8.4",
							y: "2.6",
							width: "2.4",
							height: "9.4",
							rx: "0.6",
							fill: "currentColor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "12.6",
							y: "0",
							width: "2.4",
							height: "12",
							rx: "0.6",
							fill: "currentColor",
							opacity: "0.35"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					width: "15",
					height: "12",
					viewBox: "0 0 16 12",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M1 4.5c3.8-3.4 10.2-3.4 14 0",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.4",
							strokeLinecap: "round"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M3.4 7c2.4-2 6.8-2 9.2 0",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.4",
							strokeLinecap: "round"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "8",
							cy: "10",
							r: "1.2",
							fill: "currentColor"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					width: "25",
					height: "12",
					viewBox: "0 0 25 12",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "0.6",
							y: "0.6",
							width: "20",
							height: "10.8",
							rx: "2.4",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "2",
							y: "2",
							width: "8",
							height: "8",
							rx: "1.2",
							fill: "currentColor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "21.4",
							y: "3.6",
							width: "1.8",
							height: "4.8",
							rx: "0.6",
							fill: "currentColor"
						})
					]
				})
			]
		})]
	});
}
function CheckMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "check",
		viewBox: "0 0 86 72",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
			id: "vesta-check",
			x1: "10",
			y1: "60",
			x2: "78",
			y2: "8",
			gradientUnits: "userSpaceOnUse",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#c6f25a" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0.55",
					stopColor: "#3ee0a0"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "#2ec8ff"
				})
			]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M10 38.5 32 58 76 12",
			fill: "none",
			stroke: "url(#vesta-check)",
			strokeWidth: "10",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
}
var TABS$1 = [
	{
		id: "home",
		label: "Главный",
		icon: "home"
	},
	{
		id: "savings",
		label: "Накопления",
		icon: "bars"
	},
	{
		id: "life",
		label: "Для жизни",
		icon: "spark"
	},
	{
		id: "payments",
		label: "Платежи",
		icon: "pay"
	},
	{
		id: "credits",
		label: "Кредиты",
		icon: "card"
	}
];
function TabBar({ tab, onTab }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "tabs",
		"aria-label": "Разделы",
		children: TABS$1.map((item) => {
			const on = tab === item.id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: on ? "tab on" : "tab",
				"aria-current": on ? "page" : void 0,
				onClick: () => onTab(item.id),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
					name: item.icon,
					size: 24,
					fill: on && item.id === "home"
				}), item.label]
			}, item.id);
		})
	});
}
function TxRow({ tx, hide, onOpen, onRepeat }) {
	const amt = txAmount(tx, hide);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "tx",
		role: "button",
		tabIndex: 0,
		onClick: onOpen,
		onKeyDown: (e) => e.key === "Enter" && onOpen(),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: tx.icon === "tbank" ? "tx-ico tbank" : "tx-ico",
				children: tx.icon === "tbank" ? "Т" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
					name: tx.amount > 0 ? "down" : "up",
					size: 18
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tx-title",
				children: tx.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: amt.incoming ? "tx-amt in" : "tx-amt",
				children: amt.text
			}),
			tx.place ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tx-title",
				children: tx.place
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tx-sub",
				children: tx.category
			}),
			tx.accountAfter !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "tx-meta",
				children: ["Платёжный счёт: ", shownMoney(tx.accountAfter, hide)]
			}) : null,
			tx.fee !== void 0 && tx.kind !== "incoming" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "tx-meta",
				children: ["Комиссия: ", shownMoney(tx.fee, hide)]
			}) : null,
			tx.failReason ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tx-warn",
				children: tx.failReason
			}) : null,
			tx.repeatable && onRepeat ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "tx-flag",
				"aria-label": "Повторить",
				onClick: (e) => {
					e.stopPropagation();
					onRepeat();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
					name: "repeat",
					size: 22
				})
			}) : null,
			tx.status === "failed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tx-flag fail-dot",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
					name: "alert",
					size: 22
				})
			}) : null
		]
	});
}
function Groups({ groups, hide, onOpen, onRepeat }) {
	if (groups.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "empty",
		children: "Операций нет"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: groups.map((group) => {
		const spent = daySpent(group.items);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "group-h",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: group.label }), spent > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatRub(spent) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tx-pad",
			children: group.items.map((tx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxRow, {
				tx,
				hide,
				onOpen: () => onOpen(tx),
				onRepeat: tx.repeatable ? () => onRepeat(tx) : void 0
			}, tx.id))
		})] }, group.label);
	}) });
}
function Sheet({ title, children, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overlay",
		onClick: onClose,
		role: "presentation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sheet",
			role: "dialog",
			"aria-label": title,
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grab" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }),
				children
			]
		})
	});
}
function Choice({ label, on, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: on ? "choice on" : "choice",
		onClick: onPick,
		children: [label, on ? "✓" : ""]
	});
}
function PageHead({ title, back }) {
	const goBack = useBank((s) => s.back);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "subhead",
		children: [back !== false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "back",
			"aria-label": "Назад",
			onClick: goBack,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, { name: "back" })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: 8 } }), title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "page-title",
			style: { padding: 0 },
			children: title
		}) : null]
	});
}
function HomeScreen() {
	const s = useBank();
	const today = s.txs.filter((tx) => tx.group === "Сегодня").slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "scroll home-scroll",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "topbar",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "sq",
							"aria-label": "Профиль",
							onClick: () => s.push({ screen: "profile" }),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, { name: "user" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "search-pill",
							onClick: () => s.push({ screen: "chat" }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
								name: "search",
								size: 18
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ВестаЧат" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "sq",
							"aria-label": "Чаты",
							onClick: () => s.push({ screen: "chat" }),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
								name: "chat",
								size: 22
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "sq",
							"aria-label": "Сервисы",
							onClick: () => s.openTab("life"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								width: "20",
								height: "20",
								viewBox: "0 0 20 20",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "5",
										cy: "5",
										r: "2.1",
										fill: "currentColor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "15",
										cy: "5",
										r: "2.1",
										fill: "currentColor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "5",
										cy: "15",
										r: "2.1",
										fill: "currentColor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "15",
										cy: "15",
										r: "2.1",
										fill: "currentColor"
									})
								]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wallet",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "wallet-label",
						children: "В кошельке"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "wallet-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "balance",
							onClick: () => s.push({ screen: "card" }),
							children: [shownMoney(s.wallet, s.hidden), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
								name: "chev",
								size: 22
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "wallet-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "icon-hit",
								"aria-label": "Скрыть суммы",
								onClick: s.toggleHidden,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlashedPercent, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "icon-hit",
								"aria-label": "Ещё",
								onClick: () => s.setSheet("more"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, { name: "dots" })
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "widgets",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "side-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "w-card w-sq",
								"aria-label": "Оплата QR",
								onClick: () => s.push({ screen: "qr" }),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
									name: "qr",
									size: 28
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "w-card w-sq",
								"aria-label": "Безопасность",
								onClick: () => s.push({ screen: "security" }),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
									name: "shield",
									size: 26
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "w-card w-main",
							onClick: () => s.push({ screen: "card" }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "plastic",
									"aria-hidden": "true",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "card-digits",
									children: "2899"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-spacer" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-sum",
									children: shownMoney(s.card, s.hidden)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-sub",
									children: "Счёт •• 8423"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "w-card w-bonus",
							onClick: () => s.push({ screen: "bonuses" }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mark",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-spacer" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bonus-num",
									children: s.hidden ? "•" : s.bonuses
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bonus-name",
									children: "ВестаБонус"
								})
							]
						})
					]
				}),
				s.promo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "promo",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "promo-x",
							"aria-label": "Закрыть",
							onClick: s.dismissPromo,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
								name: "close",
								size: 16
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "promo-copy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "produce",
									"aria-hidden": "true",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "p1" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "p2" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "p3" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "p4" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "p5" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "p6" })
									]
								}),
								"Скидка 300 ₽ от 800 ₽",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"на первый заказ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"в Маркете"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "promo-side",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "promo-logo",
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
									name: "repeat",
									size: 22
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "promo-cta",
								onClick: s.claimPromo,
								children: "Забрать"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "promo-ad",
							children: "Реклама market.vesta"
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "hist",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hist-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "hist-title",
							onClick: s.toggleHistory,
							children: ["История", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
								name: s.historyOpen ? "chevUp" : "chevDown",
								size: 22
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "more-pill",
							onClick: () => s.push({ screen: "history" }),
							children: ["Ещё ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
								name: "chev",
								size: 16
							})]
						})]
					}), s.historyOpen ? today.map((tx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxRow, {
						tx,
						hide: s.hidden,
						onOpen: () => s.push({
							screen: "tx",
							txId: tx.id
						}),
						onRepeat: tx.repeatable ? () => s.prefill(tx.title, tx.kind === "sbp" ? "sbp" : tx.kind === "foreign" ? "card" : "internal") : void 0
					}, tx.id)) : null]
				})
			]
		})
	});
}
function HistoryScreen() {
	const s = useBank();
	const [query, setQuery] = (0, import_react.useState)("");
	const list = filteredTxs(s.txs, s.kind, s.period, query);
	const kindLabel = s.kind === "in" ? "Зачисления" : s.kind === "out" ? "Списания" : "Что показывать";
	const periodLabel = s.period === "today" ? "Сегодня" : s.period === "month" ? "Этот месяц" : "Период";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "subhead",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "back",
					"aria-label": "Назад",
					onClick: s.back,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, { name: "back" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "search-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
						name: "search",
						size: 18
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						placeholder: "Поиск",
						onChange: (e) => setQuery(e.target.value)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "chips",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "chip",
						onClick: () => s.setSheet("kind"),
						children: [
							kindLabel,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
								name: "chevDown",
								size: 16
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "chip",
						onClick: () => s.setSheet("period"),
						children: [
							periodLabel,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
								name: "chevDown",
								size: 16
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "chip",
						onClick: () => s.setSheet("account"),
						children: ["Карта или счёт ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
							name: "chevDown",
							size: 16
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sheet-page",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "scroll",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Groups, {
						groups: groupOf(list),
						hide: s.hidden,
						onOpen: (tx) => s.push({
							screen: "tx",
							txId: tx.id
						}),
						onRepeat: (tx) => s.prefill(tx.title, tx.kind === "sbp" ? "sbp" : tx.kind === "foreign" ? "card" : "internal")
					})
				})
			})
		]
	});
}
function TransferScreen() {
	const s = useBank();
	const amount = parseAmount(s.draftAmount);
	const fee = feeFor(s.mode, amount);
	const total = Math.round((amount + fee) * 100) / 100;
	const short = amount > 0 && total > s.wallet;
	const invalid = !s.draftTo.trim() || amount <= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, { title: "Перевод" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scroll",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pad",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "seg",
							role: "tablist",
							children: [
								["internal", "Клиенту"],
								["sbp", "По СБП"],
								["card", "На карту"]
							].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: s.mode === id ? "on" : "",
								onClick: () => s.setMode(id),
								children: label
							}, id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "contacts",
							children: CONTACTS.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "contact",
								onClick: () => s.setDraft({ draftTo: name }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "avatar",
									children: initials(name)
								}), name.split(" ")[0]]
							}, name))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "to",
								children: "Кому"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "to",
								value: s.draftTo,
								placeholder: "Имя или телефон",
								onChange: (e) => s.setDraft({ draftTo: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "amount-box",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									inputMode: "decimal",
									"aria-label": "Сумма",
									placeholder: "0 ₽",
									value: s.draftAmount,
									onChange: (e) => s.setDraft({ draftAmount: e.target.value })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: short ? "hint-row warn" : "hint-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Комиссия ", shownMoney(fee, false)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["В кошельке ", shownMoney(s.wallet, s.hidden)] })]
								}),
								short ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hint-row warn",
									children: "Недостаточно средств"
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "amounts",
							children: [
								100,
								500,
								1e3
							].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => s.setDraft({ draftAmount: String(n) }),
								children: formatRub(n)
							}, n))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "note",
								children: "Сообщение"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "note",
								value: s.draftNote,
								placeholder: "Необязательно",
								onChange: (e) => s.setDraft({ draftNote: e.target.value })
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "cta-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: short ? "cta bad" : "cta",
					disabled: invalid || short || s.frozen,
					onClick: () => s.submitTransfer(),
					children: s.frozen ? "Карта заморожена" : short ? "Недостаточно средств" : amount > 0 ? `Перевести ${formatRub(total)}` : "Перевести"
				})
			})
		]
	});
}
function SuccessScreen() {
	const s = useBank();
	const r = s.receipt;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "success-wrap",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "success-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckMark, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Перевод доставлен" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "success-sum",
						children: r ? formatRub(r.amount) : formatRub(0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "success-meta",
						children: [
							"Комиссия ",
							r ? formatRub(r.fee) : formatRub(0),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							r?.title
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "btn-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "btn-dark",
							onClick: () => s.push({ screen: "receipt" }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
								name: "receipt",
								size: 18
							}), " Чек"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: s.autopay ? "btn-dark on" : "btn-dark",
							onClick: s.toggleAutopay,
							children: "Автоперевод"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-light",
						onClick: () => {
							s.openTab("home");
						},
						children: "На главный"
					})
				]
			})
		})
	});
}
function TxScreen({ tx }) {
	const s = useBank();
	const amt = tx.amount > 0 ? formatRub(tx.amount, true) : formatRub(Math.abs(tx.amount));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, { title: "Операция" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scroll",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pad",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "block",
						style: {
							textAlign: "center",
							padding: 22
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: tx.amount > 0 ? "pay-figure in" : "pay-figure",
								children: s.hidden ? "•••• ₽" : amt
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									marginTop: 6,
									fontWeight: 700
								},
								children: tx.title
							}),
							tx.place ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "muted",
								children: tx.place
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "muted",
								style: { marginTop: 4 },
								children: tx.category
							})
						]
					}),
					tx.status === "failed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "banner-warn",
						style: { marginTop: 10 },
						children: tx.failReason
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "block",
						style: { marginTop: 10 },
						children: [
							tx.fee !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row",
								children: ["Комиссия ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: shownMoney(tx.fee, s.hidden) })]
							}) : null,
							tx.accountAfter !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row",
								children: ["Платёжный счёт ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: shownMoney(tx.accountAfter, s.hidden) })]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row",
								children: ["Статус ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: tx.status === "failed" ? "Отклонено" : "Исполнено" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "grid",
							gap: 8,
							marginTop: 14
						},
						children: [tx.status === "ok" && tx.amount < 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "cta ghost",
							onClick: () => s.openReceipt(tx),
							children: "Чек"
						}) : null, tx.repeatable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "cta",
							onClick: () => s.prefill(tx.title, tx.kind === "sbp" ? "sbp" : tx.kind === "foreign" ? "card" : "internal"),
							children: "Повторить"
						}) : null]
					})
				]
			})
		})]
	});
}
function ReceiptScreen() {
	const r = useBank().receipt;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, { title: "Чек" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scroll",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pad",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "muted",
							children: "АО «Веста» · демо"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pay-figure",
							style: { marginTop: 8 },
							children: r ? formatRub(r.amount) : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Получатель" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: r?.title })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Комиссия" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: r ? formatRub(r.fee) : "—" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Когда" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: r?.when })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Счёт" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "•• 8423" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Статус" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Доставлен" })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "fine",
					children: "Чек сформирован внутри витрины. Деньги никуда не отправляются."
				})]
			})
		})]
	});
}
function CardScreen() {
	const s = useBank();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, { title: "Карта" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scroll",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pad",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "brandline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Веста" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.frozen ? "Заморожена" : "Дебетовая" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pan",
							children: "•••• •••• •••• 2899"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								marginTop: 10,
								fontSize: 28,
								fontWeight: 750
							},
							children: shownMoney(s.card, s.hidden)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { opacity: .8 },
							children: "Счёт •• 8423"
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "svc-grid",
					style: { marginTop: 12 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "svc",
							onClick: () => s.push({ screen: "transfer" }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "svc-ico",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
									name: "up",
									size: 18
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Перевести" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "svc",
							onClick: () => s.push({ screen: "requisites" }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "svc-ico",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
									name: "copy",
									size: 18
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Реквизиты" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "svc",
							onClick: s.toggleFrozen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "svc-ico",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
									name: "snow",
									size: 18
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: s.frozen ? "Разморозить" : "Заморозить" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "svc",
							onClick: () => s.push({ screen: "history" }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "svc-ico",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
									name: "receipt",
									size: 18
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Операции" })]
						})
					]
				})]
			})
		})]
	});
}
function RequisitesScreen() {
	const showToast = useBank((s) => s.showToast);
	const copy = (text) => {
		navigator.clipboard?.writeText(text).then(() => showToast("Скопировано"), () => showToast(text));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, { title: "Реквизиты" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scroll",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pad",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "block",
					children: [
						["Получатель", "Клиент Весты"],
						["Счёт", "40817 810 0 0000 0008423"],
						["Банк", "АО «Веста»"],
						["БИК", "044525999"],
						["ИНН", "7700000099"],
						["К/с", "30101 810 0 0000 0000999"]
					].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "row",
						onClick: () => copy(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							k,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: v })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
							name: "copy",
							size: 18
						})]
					}, k))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "fine",
					children: "Учебные реквизиты. Это не настоящий банк и не настоящий счёт."
				})]
			})
		})]
	});
}
function BonusesScreen() {
	const bonuses = useBank((s) => s.bonuses);
	const hidden = useBank((s) => s.hidden);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, { title: "ВестаБонус" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scroll",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pad",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "block",
					style: {
						textAlign: "center",
						padding: 28
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mark",
							style: { margin: "0 auto 10px" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rate",
							children: hidden ? "••" : bonuses
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "muted",
							children: "1 бонус = 1 ₽"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: ["За переводы ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "+1 / 500 ₽" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: ["Промокод VESTA300 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "+50" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: ["Партнёры ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Маркет" })]
						})
					]
				})]
			})
		})]
	});
}
function ProfileScreen() {
	const s = useBank();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, { title: "" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "scroll",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "profile-head",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "avatar lg",
						children: "В"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Клиент Весты" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "muted",
						children: "+7 ••• ••• 42 18"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pad",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "row",
							onClick: () => s.push({ screen: "chat" }),
							children: ["ВестаЧат ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
								name: "chev",
								size: 18
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "row",
							onClick: () => s.push({ screen: "security" }),
							children: ["Безопасность ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
								name: "chev",
								size: 18
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "row",
							onClick: () => s.push({ screen: "requisites" }),
							children: ["Реквизиты ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
								name: "chev",
								size: 18
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: ["Уведомления", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: s.notifications ? "switch on" : "switch",
								"aria-label": "Уведомления",
								onClick: s.toggleNotifications,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "fine",
					children: "Веста — демонстрационный интерфейс. Карты, переводы и бонусы не связаны с реальным банком, деньги не списываются."
				})]
			})]
		})]
	});
}
function SecurityScreen() {
	const s = useBank();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, { title: "Безопасность" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scroll",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pad",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: ["Скрыть суммы", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: s.hidden ? "switch on" : "switch",
								onClick: s.toggleHidden,
								"aria-label": "Скрыть суммы",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: ["Заморозка карты", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: s.frozen ? "switch on" : "switch",
								onClick: s.toggleFrozen,
								"aria-label": "Заморозка",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: ["Автоперевод", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: s.autopay ? "switch on" : "switch",
								onClick: s.toggleAutopay,
								"aria-label": "Автоперевод",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "cta ghost",
					style: { marginTop: 16 },
					onClick: s.reset,
					children: "Сбросить витрину"
				})]
			})
		})]
	});
}
function ChatScreen() {
	const chats = useBank((s) => s.chats);
	const send = useBank((s) => s.sendChat);
	const [text, setText] = (0, import_react.useState)("");
	const submit = () => {
		send(text);
		setText("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, { title: "ВестаЧат" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scroll",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "chat-log",
					children: chats.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: m.from === "me" ? "bubble-msg me" : "bubble-msg bot",
						children: m.text
					}, m.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "suggests",
				children: [
					"Какой баланс?",
					"Сколько бонусов?",
					"Как перевести?",
					"Промокод"
				].map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => send(q),
					children: q
				}, q))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "composer",
				onSubmit: (e) => {
					e.preventDefault();
					submit();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: text,
					placeholder: "Спросить",
					onChange: (e) => setText(e.target.value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "send",
					type: "submit",
					"aria-label": "Отправить",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
						name: "send",
						size: 18
					})
				})]
			})
		]
	});
}
function QrScreen() {
	const cells = Array.from({ length: 81 }, (_, i) => {
		return i < 9 || i > 71 || i % 9 === 0 || i % 9 === 8 || (i * 17 + 5) % 7 > 2;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, { title: "QR" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scroll",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pad",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "qr-box",
						"aria-hidden": "true",
						children: cells.map((on, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: on ? "" : "off" }, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "center-note",
						children: "Мой код для перевода внутри Весты. Это рисунок, не платёжная ссылка."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							textAlign: "center",
							marginTop: 8
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Клиент Весты" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "muted",
							children: "Счёт •• 8423"
						})]
					})
				]
			})
		})]
	});
}
function MarketScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, { title: "Маркет" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scroll",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pad",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "block",
					style: {
						textAlign: "center",
						padding: 22
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "promo-logo",
							style: { margin: "0 auto 12px" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
								name: "repeat",
								size: 22
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pay-figure",
							children: "300 ₽"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Скидка от 800 ₽ на первый заказ" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "muted",
							style: { marginTop: 6 },
							children: "Промокод VESTA300"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "fine",
					children: "Рекламный блок витрины. Заказ в магазине отсюда не оформляется."
				})]
			})
		})]
	});
}
function PaymentsScreen() {
	const s = useBank();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "scroll",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "page-title",
				children: "Платежи"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pad",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "section-label",
						children: "Перевести"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "quick",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => s.push({ screen: "transfer" }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bubble",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, { name: "phone" })
								}), "По телефону"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									s.setMode("internal");
									s.push({ screen: "transfer" });
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bubble",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, { name: "user" })
								}), "Клиенту Весты"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									s.setMode("card");
									s.push({ screen: "transfer" });
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bubble",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, { name: "card" })
								}), "На карту"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => s.push({ screen: "qr" }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bubble",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, { name: "qr" })
								}), "По QR"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "section-label",
						children: "Оплатить"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "svc-grid",
						children: SERVICES.map((svc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "svc",
							onClick: () => s.push({
								screen: "service",
								service: svc.id
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "svc-ico",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
										name: "receipt",
										size: 18
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: svc.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: svc.hint })
							]
						}, svc.id))
					})
				]
			})]
		})
	});
}
function ServiceScreen({ service }) {
	const s = useBank();
	const meta = SERVICES.find((item) => item.id === service) ?? SERVICES[0];
	const [amount, setAmount] = (0, import_react.useState)("300");
	const [ref, setRef] = (0, import_react.useState)("");
	const n = parseAmount(amount);
	const short = n > s.wallet;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, { title: meta.title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scroll",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pad",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "ref",
							children: meta.hint
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "ref",
							value: ref,
							placeholder: "Номер",
							onChange: (e) => setRef(e.target.value)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "amount-box",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							inputMode: "decimal",
							"aria-label": "Сумма",
							value: amount,
							onChange: (e) => setAmount(e.target.value)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: short ? "hint-row warn" : "hint-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Без комиссии" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: shownMoney(s.wallet, s.hidden) })]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "cta-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: short ? "cta bad" : "cta",
					disabled: !ref.trim() || n <= 0 || short,
					onClick: () => s.payService(meta.title, n),
					children: short ? "Недостаточно средств" : "Оплатить"
				})
			})
		]
	});
}
function SavingsScreen() {
	const s = useBank();
	const [amount, setAmount] = (0, import_react.useState)("100");
	const n = parseAmount(amount);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "scroll",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "page-title",
				children: "Накопления"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pad",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Накопительный счёт" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rate",
							children: "14,5%"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								opacity: .85,
								marginTop: 4
							},
							children: "годовых, начисление раз в месяц"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "block",
						style: { marginTop: 12 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "muted",
							children: "На счёте"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pay-figure",
							children: shownMoney(s.savings, s.hidden)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "amount-box",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							inputMode: "decimal",
							"aria-label": "Сумма",
							value: amount,
							onChange: (e) => setAmount(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "grid",
							gap: 8,
							marginTop: 12
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "cta",
							disabled: n <= 0 || n > s.wallet,
							onClick: () => s.moveSavings("in", n),
							children: "Пополнить с кошелька"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "cta ghost",
							disabled: n <= 0 || n > s.savings,
							onClick: () => s.moveSavings("out", n),
							children: "Вернуть в кошелёк"
						})]
					})
				]
			})]
		})
	});
}
function LifeScreen() {
	const push = useBank((s) => s.push);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "scroll",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "page-title",
				children: "Для жизни"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pad",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "svc-grid",
					children: [
						SERVICES.map((svc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "svc",
							onClick: () => push({
								screen: "service",
								service: svc.id
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "svc-ico",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
										name: "spark",
										size: 18
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: svc.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: svc.hint })
							]
						}, svc.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "svc",
							onClick: () => push({ screen: "market" }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "svc-ico",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
										name: "repeat",
										size: 18
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Маркет" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "−300 ₽" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "svc",
							onClick: () => push({ screen: "bonuses" }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "svc-ico",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { size: 16 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "ВестаБонус" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Баллы" })
							]
						})
					]
				})
			})]
		})
	});
}
function CreditsScreen() {
	const [amount, setAmount] = (0, import_react.useState)(3e5);
	const [months, setMonths] = (0, import_react.useState)(24);
	const pay = annuity(amount, months);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "scroll",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "page-title",
				children: "Кредиты"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pad",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Кредит наличными" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rate",
							style: { fontSize: 32 },
							children: "до 1 000 000 ₽"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								opacity: .85,
								marginTop: 6
							},
							children: "ставка от 12,9%"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "block",
						style: { marginTop: 12 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pair",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Сумма" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: formatRub(amount) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "slider",
								type: "range",
								min: 5e4,
								max: 1e6,
								step: 1e4,
								value: amount,
								onChange: (e) => setAmount(Number(e.target.value))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pair",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Срок" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [months, " мес."] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "slider",
								type: "range",
								min: 6,
								max: 60,
								step: 6,
								value: months,
								onChange: (e) => setMonths(Number(e.target.value))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "muted",
								style: { marginTop: 12 },
								children: "Платёж в месяц"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pay-figure",
								children: formatRub(pay)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "fine",
						children: "Только калькулятор. Заявка не отправляется, паспорт и телефон не спрашиваем."
					})
				]
			})]
		})
	});
}
function MoreSheet() {
	const s = useBank();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		title: "Ещё",
		onClose: () => s.setSheet(null),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "choice",
				onClick: () => {
					s.setSheet(null);
					s.push({ screen: "requisites" });
				},
				children: "Реквизиты счёта"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "choice",
				onClick: () => {
					s.setSheet(null);
					s.push({ screen: "history" });
				},
				children: "Выписка"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "choice",
				onClick: () => {
					s.setSheet(null);
					s.toggleHidden();
				},
				children: "Скрыть баланс"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "choice",
				onClick: () => {
					s.setSheet(null);
					s.push({ screen: "security" });
				},
				children: "Безопасность"
			})
		]
	});
}
function FilterSheets() {
	const s = useBank();
	if (s.sheet === "kind") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		title: "Что показывать",
		onClose: () => s.setSheet(null),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				label: "Все операции",
				on: s.kind === "all",
				onPick: () => s.setKind("all")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				label: "Списания",
				on: s.kind === "out",
				onPick: () => s.setKind("out")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				label: "Зачисления",
				on: s.kind === "in",
				onPick: () => s.setKind("in")
			})
		]
	});
	if (s.sheet === "period") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		title: "Период",
		onClose: () => s.setSheet(null),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				label: "Всё время",
				on: s.period === "all",
				onPick: () => s.setPeriod("all")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				label: "Сегодня",
				on: s.period === "today",
				onPick: () => s.setPeriod("today")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				label: "Без октября",
				on: s.period === "month",
				onPick: () => s.setPeriod("month")
			})
		]
	});
	if (s.sheet === "account") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		title: "Карта или счёт",
		onClose: () => s.setSheet(null),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				label: "Все",
				on: true,
				onPick: () => s.setSheet(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				label: "Карта •• 2899",
				on: false,
				onPick: () => s.setSheet(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				label: "Счёт •• 8423",
				on: false,
				onPick: () => s.setSheet(null)
			})
		]
	});
	return null;
}
var TABS = /* @__PURE__ */ new Set([
	"home",
	"savings",
	"life",
	"payments",
	"credits"
]);
function BankApp() {
	const frame = useFrame();
	const tab = useBank((s) => s.tab);
	const openTab = useBank((s) => s.openTab);
	const sheet = useBank((s) => s.sheet);
	const toast = useBank((s) => s.toast);
	const showToast = useBank((s) => s.showToast);
	const tx = useBank((s) => s.txs.find((item) => item.id === frame.txId));
	const [time, setTime] = (0, import_react.useState)("18:06");
	(0, import_react.useEffect)(() => {
		const tick = () => {
			const d = /* @__PURE__ */ new Date();
			const p = (n) => String(n).padStart(2, "0");
			setTime(`${p(d.getHours())}:${p(d.getMinutes())}`);
		};
		tick();
		const id = window.setInterval(tick, 15e3);
		return () => window.clearInterval(id);
	}, []);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) useBank.getState().hydrate(JSON.parse(raw));
		} catch {}
		useBank.getState().markReady();
		return useBank.subscribe((state) => {
			if (!state.ready) return;
			localStorage.setItem(KEY, JSON.stringify(snapshot(state)));
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (!toast) return;
		const id = window.setTimeout(() => showToast(""), 2200);
		return () => window.clearTimeout(id);
	}, [toast, showToast]);
	const dark = frame.screen === "success";
	const showTabs = TABS.has(frame.screen);
	let body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeScreen, {});
	if (frame.screen === "home") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeScreen, {});
	else if (frame.screen === "history" || frame.screen === "search") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryScreen, {});
	else if (frame.screen === "transfer") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransferScreen, {});
	else if (frame.screen === "success") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuccessScreen, {});
	else if (frame.screen === "card") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardScreen, {});
	else if (frame.screen === "bonuses") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BonusesScreen, {});
	else if (frame.screen === "profile") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileScreen, {});
	else if (frame.screen === "chat") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatScreen, {});
	else if (frame.screen === "qr") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrScreen, {});
	else if (frame.screen === "security") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecurityScreen, {});
	else if (frame.screen === "receipt") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptScreen, {});
	else if (frame.screen === "requisites") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequisitesScreen, {});
	else if (frame.screen === "market") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketScreen, {});
	else if (frame.screen === "payments") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentsScreen, {});
	else if (frame.screen === "savings") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavingsScreen, {});
	else if (frame.screen === "life") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeScreen, {});
	else if (frame.screen === "credits") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditsScreen, {});
	else if (frame.screen === "service") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceScreen, { service: frame.service ?? "mobile" });
	else if (frame.screen === "tx") body = tx ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxScreen, { tx }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryScreen, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "stage",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "device",
			"data-tone": dark ? "dark" : "light",
			"data-tabs": showTabs ? "on" : "off",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBar, { time }),
				body,
				showTabs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBar, {
					tab,
					onTab: openTab
				}) : null,
				sheet === "more" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoreSheet, {}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSheets, {}),
				toast ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "toast",
					children: toast
				}) : null
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BankApp, {});
}
//#endregion
export { Home as component };
