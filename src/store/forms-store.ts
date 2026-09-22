import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BlockType, FormBlock, FormBuilder } from "../types/form";
import { defaultTheme } from "../types/form";

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function createBlock(type: BlockType): FormBlock {
  const base = { id: uid(), type, required: false };

  switch (type) {
    case "short_answer":
      return { ...base, label: "Type a question", placeholder: "Short answer" };
    case "long_answer":
      return { ...base, label: "Type a question", placeholder: "Long answer" };
    case "multiple_choice":
      return {
        ...base,
        label: "Type a question",
        options: ["Option 1", "Option 2"],
      };
    case "checkboxes":
      return {
        ...base,
        label: "Type a question",
        options: ["Choice 1", "Choice 2"],
      };
    case "dropdown":
      return {
        ...base,
        label: "Type a question",
        options: ["Option 1", "Option 2"],
      };
    case "multi_select":
      return {
        ...base,
        label: "Type a question",
        options: ["Option 1", "Option 2"],
      };
    case "number":
      return { ...base, label: "Type a question", placeholder: "Number" };
    case "email":
      return { ...base, label: "Email", placeholder: "you@example.com" };
    case "phone":
      return { ...base, label: "Phone number", placeholder: "+1 555 000 0000" };
    case "link":
      return { ...base, label: "Link", placeholder: "https://" };
    case "date":
      return { ...base, label: "Date" };
    case "time":
      return { ...base, label: "Time" };
    case "rating":
      return { ...base, label: "How would you rate this?" };
    case "yes_no":
      return { ...base, label: "Yes or no?" };
    case "statement":
      return { ...base, label: "Thank you for your time" };
    case "heading":
      return { ...base, label: "Section title" };
    case "divider":
      return { ...base, label: "" };
    default:
      return { ...base, label: "Type a question" };
  }
}

interface FormsState {
  forms: FormBuilder[];
  createForm: (title?: string) => FormBuilder;
  updateForm: (id: string, patch: Partial<FormBuilder>) => void;
  deleteForm: (id: string) => void;
  getForm: (id: string) => FormBuilder | undefined;
  addBlock: (formId: string, type: BlockType, index?: number) => void;
  updateBlock: (
    formId: string,
    blockId: string,
    patch: Partial<FormBlock>
  ) => void;
  removeBlock: (formId: string, blockId: string) => void;
  moveBlock: (formId: string, blockId: string, dir: -1 | 1) => void;
  duplicateBlock: (formId: string, blockId: string) => void;
}

export const useFormsStore = create<FormsState>()(
  persist(
    (set, get) => ({
      forms: [],

      createForm: (title = "Untitled") => {
        const now = new Date().toISOString();
        const form: FormBuilder = {
          id: uid(),
          title,
          blocks: [],
          theme: { ...defaultTheme },
          published: false,
          createdAt: now,
          updatedAt: now,
        };
        set((s) => ({ forms: [form, ...s.forms] }));
        return form;
      },

      updateForm: (id, patch) => {
        set((s) => ({
          forms: s.forms.map((f) =>
            f.id === id
              ? { ...f, ...patch, updatedAt: new Date().toISOString() }
              : f
          ),
        }));
      },

      deleteForm: (id) => {
        set((s) => ({ forms: s.forms.filter((f) => f.id !== id) }));
      },

      getForm: (id) => get().forms.find((f) => f.id === id),

      addBlock: (formId, type, index) => {
        const block = createBlock(type);
        set((s) => ({
          forms: s.forms.map((f) => {
            if (f.id !== formId) return f;
            const blocks = [...f.blocks];
            const at = index ?? blocks.length;
            blocks.splice(at, 0, block);
            return { ...f, blocks, updatedAt: new Date().toISOString() };
          }),
        }));
      },

      updateBlock: (formId, blockId, patch) => {
        set((s) => ({
          forms: s.forms.map((f) =>
            f.id === formId
              ? {
                  ...f,
                  updatedAt: new Date().toISOString(),
                  blocks: f.blocks.map((b) =>
                    b.id === blockId ? { ...b, ...patch } : b
                  ),
                }
              : f
          ),
        }));
      },

      removeBlock: (formId, blockId) => {
        set((s) => ({
          forms: s.forms.map((f) =>
            f.id === formId
              ? {
                  ...f,
                  updatedAt: new Date().toISOString(),
                  blocks: f.blocks.filter((b) => b.id !== blockId),
                }
              : f
          ),
        }));
      },

      moveBlock: (formId, blockId, dir) => {
        set((s) => ({
          forms: s.forms.map((f) => {
            if (f.id !== formId) return f;
            const i = f.blocks.findIndex((b) => b.id === blockId);
            const j = i + dir;
            if (i < 0 || j < 0 || j >= f.blocks.length) return f;
            const blocks = [...f.blocks];
            [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
            return { ...f, blocks, updatedAt: new Date().toISOString() };
          }),
        }));
      },

      duplicateBlock: (formId, blockId) => {
        set((s) => ({
          forms: s.forms.map((f) => {
            if (f.id !== formId) return f;
            const i = f.blocks.findIndex((b) => b.id === blockId);
            if (i < 0) return f;
            const copy = { ...f.blocks[i], id: uid() };
            const blocks = [...f.blocks];
            blocks.splice(i + 1, 0, copy);
            return { ...f, blocks, updatedAt: new Date().toISOString() };
          }),
        }));
      },
    }),
    { name: "formzo:forms" }
  )
);
