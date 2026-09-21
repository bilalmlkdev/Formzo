import { create } from "zustand";
import type { Form } from "../types/form";
import type { FormResponse } from "../types/response";
import * as storage from "../lib/storage";
import { generateId } from "../lib/utils";
import { generateSlug } from "../lib/slug";

interface FormState {
  forms: Form[];
  responses: FormResponse[];
  loadForms: () => void;
  createForm: (form: Form) => void;
  updateForm: (id: string, updates: Partial<Form>) => void;
  deleteForm: (id: string) => void;
  duplicateForm: (id: string) => Form | null;
  archiveForm: (id: string) => void;
  publishForm: (id: string) => void;
  getForm: (id: string) => Form | undefined;
  addResponse: (response: FormResponse) => void;
  getResponses: (formId: string) => FormResponse[];
}

export const useFormStore = create<FormState>((set, get) => ({
  forms: [],
  responses: [],
  loadForms: () => {
    const forms = storage.getForms();
    const responses = storage.getResponses();
    set({ forms, responses });
  },
  createForm: (form) => {
    set((state) => {
      const currentForms = Array.isArray(state.forms) ? state.forms : [];
      const newForms = [...currentForms, form];
      storage.setForms(newForms);
      return { forms: newForms };
    });
  },
  updateForm: (id, updates) => {
    set((state) => {
      const currentForms = Array.isArray(state.forms) ? state.forms : [];
      const newForms = currentForms.map((f) =>
        f.id === id ? { ...f, ...updates, updatedAt: new Date().toISOString() } : f
      );
      storage.setForms(newForms);
      return { forms: newForms };
    });
  },
  deleteForm: (id) => {
    set((state) => {
      const currentForms = Array.isArray(state.forms) ? state.forms : [];
      const newForms = currentForms.filter((f) => f.id !== id);
      storage.setForms(newForms);
      return { forms: newForms };
    });
  },
  duplicateForm: (id) => {
    const forms = get().forms;
    const safeForms = Array.isArray(forms) ? forms : [];
    const form = safeForms.find((f) => f.id === id);
    if (!form) return null;
    const now = new Date().toISOString();
    const newForm: Form = {
      ...JSON.parse(JSON.stringify(form)),
      id: generateId(),
      name: `${form.name} (Copy)`,
      slug: generateSlug(`${form.name} copy`),
      status: "draft",
      createdAt: now,
      updatedAt: now,
      responseCount: 0,
    };
    set((state) => {
      const currentForms = Array.isArray(state.forms) ? state.forms : [];
      const newForms = [...currentForms, newForm];
      storage.setForms(newForms);
      return { forms: newForms };
    });
    return newForm;
  },
  archiveForm: (id) => {
    set((state) => {
      const currentForms = Array.isArray(state.forms) ? state.forms : [];
      const newForms = currentForms.map((f) =>
        f.id === id ? { ...f, status: "archived" as const, updatedAt: new Date().toISOString() } : f
      );
      storage.setForms(newForms);
      return { forms: newForms };
    });
  },
  publishForm: (id) => {
    set((state) => {
      const currentForms = Array.isArray(state.forms) ? state.forms : [];
      const newForms = currentForms.map((f) =>
        f.id === id ? { ...f, status: "published" as const, publishedAt: new Date().toISOString(), updatedAt: new Date().toISOString() } : f
      );
      storage.setForms(newForms);
      return { forms: newForms };
    });
  },
  getForm: (id) => {
    const forms = get().forms;
    return Array.isArray(forms) ? forms.find((f) => f.id === id) : undefined;
  },
  addResponse: (response) => {
    set((state) => {
      const currentResponses = Array.isArray(state.responses) ? state.responses : [];
      const newResponses = [...currentResponses, response];
      storage.setResponses(newResponses);
      const currentForms = Array.isArray(state.forms) ? state.forms : [];
      const newForms = currentForms.map((f) =>
        f.id === response.formId ? { ...f, responseCount: f.responseCount + 1 } : f
      );
      storage.setForms(newForms);
      return { responses: newResponses, forms: newForms };
    });
  },
  getResponses: (formId) => {
    const responses = get().responses;
    return Array.isArray(responses) ? responses.filter((r) => r.formId === formId) : [];
  },
}));
