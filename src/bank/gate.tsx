import { useEffect, useState } from "react";

const GATE_ON = false;
const ACCESS_CODE = "555552";
const ACCESS_KEY = "vesta-access-ok";

export function useAccess() {
  const [open, setOpen] = useState(!GATE_ON);
  useEffect(() => {
    if (!GATE_ON) return;
    if (sessionStorage.getItem(ACCESS_KEY) === "1") setOpen(true);
  }, []);
  return { open, unlock: () => setOpen(true) };
}

export function AccessScreen({ onUnlock }: { onUnlock: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (code === ACCESS_CODE) {
      sessionStorage.setItem(ACCESS_KEY, "1");
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
