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
  // ... full content needed
};

export function TabBar({
  tab,
  onTab,
}: {
  tab: string;
  onTab: (id: any) => void;
}) {
  return null;
}
