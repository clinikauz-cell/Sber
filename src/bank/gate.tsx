import { useEffect, useState } from "react";

const ACCESS_CODE = "00800";
const GATE_KEY = "vesta-gate-3";
const FAIL_KEY = "vesta-gate-fails-3";

const GATE_ON = true;

export function useAccess() {
  const [open, setOpen] = useState<boolean | null>(GATE_ON ? null : true);
  useEffect(() => {
    if (!GATE_ON) return;
    setOpen(sessionStorage.getItem(GATE_KEY) === "1");
  }, []);
  return { open, unlock: () => setOpen(true) };
}

export function AccessScreen({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);
  const [fails, setFails] = useState(0);
  const [wait, setWait] = useState(0);

  useEffect(() => {
    const saved = Number(sessionStorage.getItem(FAIL_KEY) || "0");
    if (saved > 0) setFails(saved);
  }, []);

  useEffect(() => {
    if (wait <= 0) return;
    const id = window.setTimeout(() => setWait((n) => n - 1), 1000);
    return () => window.clearTimeout(id);
  }, [wait]);

  const push = (digit: string) => {
    if (wait > 0) return;
    setShake(false);
    setPin((current) => {
      const next = (current + digit).slice(0, ACCESS_CODE.length);
      if (next.length === ACCESS_CODE.length) {
        window.setTimeout(() => check(next), 80);
      }
      return next;
    });
  };

  const check = (value: string) => {
    if (value === ACCESS_CODE) {
      sessionStorage.setItem(GATE_KEY, "1");
      sessionStorage.removeItem(FAIL_KEY);
      onUnlock();
      return;
    }
    const nextFails = fails + 1;
    setFails(nextFails);
    sessionStorage.setItem(FAIL_KEY, String(nextFails));
    setPin("");
    setShake(true);
    if (nextFails >= 5) setWait(30);
  };

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];

  return (
    <div className="gate">
      <div className="gate-mark" aria-hidden="true">
        V
      </div>
      <div className="gate-title">Сбер</div>
      <p className="gate-sub">{wait > 0 ? `Повторите через ${wait} с` : "Введите код доступа"}</p>
      <div className={shake ? "gate-dots shake" : "gate-dots"} aria-label="Код">
        {Array.from({ length: ACCESS_CODE.length }, (_, i) => (
          <i key={i} className={i < pin.length ? "on" : ""} />
        ))}
      </div>
      <div className="gate-pad">
        {keys.map((key) =>
          key === "" ? (
            <span key="gap" />
          ) : (
            <button
              key={key}
              className="gate-key"
              disabled={wait > 0}
              aria-label={key === "del" ? "Стереть" : key}
              onClick={() => (key === "del" ? setPin((p) => p.slice(0, -1)) : push(key))}
            >
              {key === "del" ? "⌫" : key}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
