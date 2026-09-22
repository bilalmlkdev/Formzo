import type { User, Preferences } from "../types/user";

const PREFIX = "formzo:";

function getKey(key: string): string {
  return `${PREFIX}${key}`;
}

function getItem<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(getKey(key));
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function setItem<T>(key: string, value: T): void {
  localStorage.setItem(getKey(key), JSON.stringify(value));
}

function removeItem(key: string): void {
  localStorage.removeItem(getKey(key));
}

// User
export function getUser(): User | null {
  return getItem<User>("user");
}

export function setUser(user: User | null): void {
  if (user) {
    setItem("user", user);
  } else {
    removeItem("user");
  }
}

// Preferences
export function getPreferences(): Preferences | null {
  return getItem<Preferences>("preferences");
}

export function setPreferences(prefs: Preferences): void {
  setItem("preferences", prefs);
}
