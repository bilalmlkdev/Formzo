import type { Form } from "../types/form";
import type { FormResponse } from "../types/response";
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

// Forms
export function getForms(): Form[] {
  const data = getItem<Form[]>("forms");
  return Array.isArray(data) ? data : [];
}

export function setForms(forms: Form[]): void {
  setItem("forms", forms);
}

// Responses
export function getResponses(): FormResponse[] {
  const data = getItem<FormResponse[]>("responses");
  return Array.isArray(data) ? data : [];
}

export function setResponses(responses: FormResponse[]): void {
  setItem("responses", responses);
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
