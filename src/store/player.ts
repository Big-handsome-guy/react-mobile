import create from "zustand";

interface PlayerState {
  popShow: boolean;
  updatePopShow: (bool: boolean) => void;
}
export const usePlayerStore = create<PlayerState>((set) => ({
  popShow: false,
  updatePopShow(bool) {
    set({ popShow: bool });
  },
}));
