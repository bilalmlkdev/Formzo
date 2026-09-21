import type { FormField, FormSettings } from "./form";

export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  fields: FormField[];
  settings: Partial<FormSettings>;
  previewImage?: string;
  popular?: boolean;
}
