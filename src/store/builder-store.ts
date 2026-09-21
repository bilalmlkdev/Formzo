import { create } from "zustand";
import type { Form, FormField } from "../types/form";
import { generateId } from "../lib/utils";

interface HistoryEntry {
  fields: FormField[];
}

interface BuilderState {
  form: Form | null;
  isDirty: boolean;
  saveStatus: "idle" | "saving" | "saved";
  history: HistoryEntry[];
  historyIndex: number;
  setForm: (form: Form) => void;
  addField: (field: FormField, insertIndex?: number) => void;
  updateField: (fieldId: string, updates: Partial<FormField>) => void;
  removeField: (fieldId: string) => void;
  duplicateField: (fieldId: string) => void;
  moveField: (fromIndex: number, toIndex: number) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  setDirty: (dirty: boolean) => void;
  setSaveStatus: (status: "idle" | "saving" | "saved") => void;
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  form: null,
  isDirty: false,
  saveStatus: "idle",
  history: [],
  historyIndex: -1,

  setForm: (form) => {
    const entry: HistoryEntry = { fields: JSON.parse(JSON.stringify(form.fields)) };
    set({
      form,
      isDirty: false,
      history: [entry],
      historyIndex: 0,
    });
  },

  addField: (field, insertIndex) => {
    set((state) => {
      if (!state.form) return state;
      const newFields = [...state.form.fields];
      if (insertIndex !== undefined) {
        newFields.splice(insertIndex, 0, field);
      } else {
        newFields.push(field);
      }
      const newForm = { ...state.form, fields: newFields };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push({ fields: JSON.parse(JSON.stringify(newFields)) });
      return {
        form: newForm,
        isDirty: true,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  updateField: (fieldId, updates) => {
    set((state) => {
      if (!state.form) return state;
      const newFields = state.form.fields.map((f) =>
        f.id === fieldId ? { ...f, ...updates } as FormField : f
      );
      const newForm = { ...state.form, fields: newFields };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push({ fields: JSON.parse(JSON.stringify(newFields)) });
      return {
        form: newForm,
        isDirty: true,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  removeField: (fieldId) => {
    set((state) => {
      if (!state.form) return state;
      const newFields = state.form.fields.filter((f) => f.id !== fieldId);
      const newForm = { ...state.form, fields: newFields };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push({ fields: JSON.parse(JSON.stringify(newFields)) });
      return {
        form: newForm,
        isDirty: true,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  duplicateField: (fieldId) => {
    set((state) => {
      if (!state.form) return state;
      const index = state.form.fields.findIndex((f) => f.id === fieldId);
      if (index === -1) return state;
      const original = state.form.fields[index];
      const duplicate: FormField = {
        ...JSON.parse(JSON.stringify(original)),
        id: generateId(),
        label: `${original.label} (Copy)`,
      };
      const newFields = [...state.form.fields];
      newFields.splice(index + 1, 0, duplicate);
      const newForm = { ...state.form, fields: newFields };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push({ fields: JSON.parse(JSON.stringify(newFields)) });
      return {
        form: newForm,
        isDirty: true,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  moveField: (fromIndex, toIndex) => {
    set((state) => {
      if (!state.form) return state;
      const newFields = [...state.form.fields];
      const [moved] = newFields.splice(fromIndex, 1);
      newFields.splice(toIndex, 0, moved);
      const newForm = { ...state.form, fields: newFields };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push({ fields: JSON.parse(JSON.stringify(newFields)) });
      return {
        form: newForm,
        isDirty: true,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  undo: () => {
    set((state) => {
      if (state.historyIndex <= 0) return state;
      const newIndex = state.historyIndex - 1;
      const entry = state.history[newIndex];
      return {
        form: state.form ? { ...state.form, fields: entry.fields } : null,
        historyIndex: newIndex,
        isDirty: true,
      };
    });
  },

  redo: () => {
    set((state) => {
      if (state.historyIndex >= state.history.length - 1) return state;
      const newIndex = state.historyIndex + 1;
      const entry = state.history[newIndex];
      return {
        form: state.form ? { ...state.form, fields: entry.fields } : null,
        historyIndex: newIndex,
        isDirty: true,
      };
    });
  },

  canUndo: () => {
    return get().historyIndex > 0;
  },

  canRedo: () => {
    const state = get();
    return state.historyIndex < state.history.length - 1;
  },

  setDirty: (dirty) => set({ isDirty: dirty }),
  setSaveStatus: (status) => set({ saveStatus: status }),
}));
