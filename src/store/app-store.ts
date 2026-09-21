import { create } from "zustand";
import type { User, Preferences } from "../types/user";
import * as storage from "../lib/storage";

interface AppState {
  user: User | null;
  preferences: Preferences;
  isInitialized: boolean;
  initialize: () => void;
  setUser: (user: User | null) => void;
  setPreferences: (prefs: Partial<Preferences>) => void;
  logout: () => void;
}

const defaultPreferences: Preferences = {
  theme: "system",
  language: "en",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  emailNotifications: true,
  compactMode: false,
};

export const useAppStore = create<AppState>((set) => ({
  user: null,
  preferences: defaultPreferences,
  isInitialized: false,
  initialize: () => {
    const user = storage.getUser();
    const prefs = storage.getPreferences();
    set({
      user,
      preferences: prefs ?? defaultPreferences,
      isInitialized: true,
    });
  },
  setUser: (user) => {
    storage.setUser(user);
    set({ user });
  },
  setPreferences: (prefs) => {
    set((state) => {
      const newPrefs = { ...state.preferences, ...prefs };
      storage.setPreferences(newPrefs);
      return { preferences: newPrefs };
    });
  },
  logout: () => {
    storage.setUser(null);
    set({ user: null });
  },
}));
