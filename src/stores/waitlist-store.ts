import { create } from "zustand";

export type WaitlistAudience = "brand" | "consumer";

type WaitlistStore = {
  audience: WaitlistAudience;
  setAudience: (audience: WaitlistAudience) => void;
};

export const useWaitlistStore = create<WaitlistStore>((set) => ({
  audience: "brand",
  setAudience: (audience) => set({ audience }),
}));

export const selectWaitlistAudience = (store: WaitlistStore) => store.audience;
