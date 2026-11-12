import { useEffect, useState } from "react";

const ACCESS_CODE = "00800";
const GATE_KEY = "vesta-gate-3";
const FAIL_KEY = "vesta-gate-fails-3";

const GATE_ON = true;

export function useAccess() {
  const [open, setOpen] = useState(!GATE_ON);
  useEffect(() => {
    if (!GATE_ON) return;
    if (sessionStorage.getItem(GATE_KEY) === "1") setOpen(true);
  }, []);
  return { open, unlock: () => setOpen(true) };
}

export function AccessScreen({ onUnlock }: { onUnlock: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (code === ACCESS_CODE) {
      sessionStorage.setItem(GATE_KEY, "1");
      sessionStorage.removeItem(FAIL_KEY);
      onUnlock();
    } else {
      setError("Noto\u2018g\u2018ri kod");
      setCode("");
    }
  };

  return (
    <div className="gate">
      <div className="gate-mark" aria-hidden="true">V</div>
      <div className="gate-title">\u0412\u0435\u0441\u0442\u0430</div>
      <p className="gate-sub">Kirish kodi</p>
      <input
        className="gate-input"
        type="password"
        inputMode="numeric"
        autoFocus
        value={code}
        onChange={(e) => { setCode(e.target.value); setError(""); }}
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />
      <button className="gate-key" onClick={submit}>Kirish</button>
      {error ? <p style={{ color: "#e33", marginTop: 12 }}>{error}</p> : null}
    </div>
  );
}
