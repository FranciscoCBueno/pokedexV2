import { create } from "zustand";

export const PAGE_SIZE = 24;

type UiState = {
  visibleCount: number;
  loadMore: (total: number) => void;
  resetVisibleCount: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  visibleCount: PAGE_SIZE,
  loadMore: (total) =>
    set((s) => ({ visibleCount: Math.min(s.visibleCount + PAGE_SIZE, total) })),
  resetVisibleCount: () => set({ visibleCount: PAGE_SIZE }),
}));