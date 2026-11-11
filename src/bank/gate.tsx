import { useEffect, useState } from "react";

const LOC_KEY = "vesta-loc-ok";

export function useAccess() {
  const [open, setOpen] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(LOC_KEY) === "1") {
      setOpen(true);
      setChecking(false);
      return;
    }
    if (!navigator.geolocation) {
      setChecking(false);
      return;
    }

    const tryGet = () => {
      navigator.geolocation.getCurrentPosition(
        () => {
          sessionStorage.setItem(LOC_KEY, "1");
          setOpen(true);
          setChecking(false);
        },
        () => {
          setChecking(false);
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
      );
    };

    if (navigator.permissions?.query) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          tryGet();
        } else if (result.state === "denied") {
          setChecking(false);
        } else {
          tryGet();
        }
      }).catch(() => tryGet());
    } else {
      tryGet();
    }
  }, []);

  return { open, checking, unlock: () => setOpen(true) };
}

export function AccessScreen({ onUnlock }: { onUnlock: () => void }) {
  const [error, setError] = useState("");

  const ask = () => {
    setError("");
    if (!navigator.geolocation) {
      setError("Brauzer joylashuvni qo'llab-quvvatlamaydi");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => {
        sessionStorage.setItem(LOC_KEY, "1");
        onUnlock();
      },
      (err) => {
        if (err.code === 1) setError("Ruxsat berilmadi. Telefon sozlamalaridan joylashuvni yoqing.");
        else setError("Lokatsiyani olishda xato. Qayta urinib ko'ring.");
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  };

  return (
    <div className="gate">
      <div className="gate-mark" aria-hidden="true">V</div>
      <div className="gate-title">Веста</div>
      <p className="gate-sub">Davom etish uchun joylashuvni yoqing</p>
      <button className="gate-key" style={{ marginTop: 24, padding: "14px 32px", fontSize: 16 }} onClick={ask}>
        Joylashuvni yoqish
      </button>
      {error ? <p style={{ color: "#e33", marginTop: 16 }}>{error}</p> : null}
    </div>
  );
}
