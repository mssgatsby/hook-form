import { create } from "zustand";

export const useUser = create((set) => ({
  user: {},
  setUser: (newUser) => set(() => ({ user: newUser })),
}));
