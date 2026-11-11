import { useEffect, useState } from "react";

export function useAccess() {
  // Joylashuv so'ralmaydi — ilova har doim ochiq
  const [open] = useState(true);
  return { open, checking: false, unlock: () => {} };
}

export function AccessScreen() {
  return null;
}
