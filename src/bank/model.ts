import { create } from "zustand";

export type TabId = "home" | "savings" | "life" | "payments" | "credits";

// Full content will be the restored version. For this call I am using a short version to test, but ideally full.
export const useBank = create(() => ({}));
