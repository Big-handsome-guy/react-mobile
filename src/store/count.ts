import create from "zustand";

interface CountType {
  count: number;
  increment: () => void;
  decrement: () => void;
}
export const useCounter = create<CountType>((set) => ({
  count: 100,
  increment() {
    return set((state) => ({
      count: state.count + 1,
    }));
  },
  decrement() {
    return set((state) => ({
      count: state.count - 1,
    }));
  },
}));
