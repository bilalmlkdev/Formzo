export type FormFieldType =
  | "shortText"
  | "longText"
  | "email"
  | "phone"
  | "url"
  | "number"
  | "select"
  | "radio"
  | "checkbox"
  | "yesNo"
  | "date"
  | "time"
  | "dateTime"
  | "rating"
  | "slider"
  | "heading"
  | "paragraph"
  | "divider"
  | "spacer"
  | "image";

interface FieldBase {
  id: string;
  type: FormFieldType;
  label: string;
  description?: string;
  placeholder?: string;
  required: boolean;
  width?: "full" | "half" | "third";
  hidden?: boolean;
}

export interface ShortTextField extends FieldBase { type: "shortText"; }
export interface LongTextField extends FieldBase { type: "longText"; }
export interface EmailField extends FieldBase { type: "email"; }
export interface PhoneField extends FieldBase { type: "phone"; }
export interface UrlField extends FieldBase { type: "url"; }
export interface NumberField extends FieldBase { type: "number"; min?: number; max?: number; step?: number; }

export interface SelectField extends FieldBase {
  type: "select";
  config?: { options: { label: string; value: string }[] };
}
export interface RadioField extends FieldBase {
  type: "radio";
  config?: { options: { label: string; value: string }[] };
}
export interface CheckboxField extends FieldBase {
  type: "checkbox";
  config?: { options: { label: string; value: string }[] };
}
export interface YesNoField extends FieldBase { type: "yesNo"; }
export interface DateField extends FieldBase { type: "date"; }
export interface TimeField extends FieldBase { type: "time"; }
export interface DateTimeField extends FieldBase { type: "dateTime"; }

export interface RatingField extends FieldBase {
  type: "rating";
  config?: { ratingType: "stars" | "numbers"; scale: number };
}
export interface SliderField extends FieldBase {
  type: "slider";
  config?: { min: number; max: number; step: number };
}

export interface HeadingField extends FieldBase { type: "heading"; }
export interface ParagraphField extends FieldBase { type: "paragraph"; }
export interface DividerField extends FieldBase { type: "divider"; }
export interface SpacerField extends FieldBase { type: "spacer"; }
export interface ImageField extends FieldBase { type: "image"; }

export type FormField =
  | ShortTextField | LongTextField | EmailField | PhoneField | UrlField | NumberField
  | SelectField | RadioField | CheckboxField | YesNoField
  | DateField | TimeField | DateTimeField
  | RatingField | SliderField
  | HeadingField | ParagraphField | DividerField | SpacerField | ImageField;

export interface FormTheme {
  width: "sm" | "md" | "lg";
}

export interface FormSettings {
  submitLabel: string;
  showRequiredIndicators: boolean;
  theme: FormTheme;
}

export interface Form {
  id: string;
  name: string;
  description: string;
  slug: string;
  fields: FormField[];
  settings: FormSettings;
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  responseCount: number;
}

export function createBlankForm(): Form {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    name: "",
    description: "",
    slug: "",
    fields: [],
    settings: {
      submitLabel: "Submit",
      showRequiredIndicators: true,
      theme: { width: "md" },
    },
    status: "draft",
    createdAt: now,
    updatedAt: now,
    responseCount: 0,
  };
}

export function createBlankField(type: FormFieldType): FormField {
  const base = { id: crypto.randomUUID(), type, label: "", required: false, width: "full" as const };
  switch (type) {
    case "select":
    case "radio":
    case "checkbox":
      return { ...base, type, config: { options: [{ label: "Option 1", value: "option-1" }, { label: "Option 2", value: "option-2" }] } } as FormField;
    case "rating":
      return { ...base, type, config: { ratingType: "stars", scale: 5 } } as FormField;
    case "slider":
      return { ...base, type, config: { min: 0, max: 100, step: 1 } } as FormField;
    default:
      return base as FormField;
  }
}
