import { create } from "zustand";

export type WaitlistState = "closed" | "brand" | "consumer";

export type WaitlistAudience = Extract<WaitlistState, "brand" | "consumer">;

type WaitlistStore = {
  state: WaitlistState;
  open: (audience: WaitlistAudience) => void;
  close: () => void;
  setAudience: (audience: WaitlistAudience) => void;
};

export const useWaitlistStore = create<WaitlistStore>((set) => ({
  state: "closed",
  open: (audience) => set({ state: audience }),
  close: () => set({ state: "closed" }),
  setAudience: (audience) =>
    set((current) =>
      current.state === "closed" ? current : { state: audience },
    ),
}));

export const selectIsWaitlistOpen = (store: WaitlistStore) =>
  store.state !== "closed";

export const selectWaitlistAudience = (store: WaitlistStore) =>
  store.state === "closed" ? null : store.state;
