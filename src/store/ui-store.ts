import { create } from "zustand";

interface UIState {
  sidebarOpen: boolean;
  selectedFieldId: string | null;
  commandMenuOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSelectedFieldId: (id: string | null) => void;
  setCommandMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  selectedFieldId: null,
  commandMenuOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSelectedFieldId: (id) => set({ selectedFieldId: id }),
  setCommandMenuOpen: (open) => set({ commandMenuOpen: open }),
}));
