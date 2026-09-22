export type BlockType =
  | "short_answer"
  | "long_answer"
  | "multiple_choice"
  | "checkboxes"
  | "dropdown"
  | "multi_select"
  | "number"
  | "email"
  | "phone"
  | "link"
  | "date"
  | "time"
  | "rating"
  | "yes_no"
  | "statement"
  | "divider"
  | "heading";

export interface FormBlock {
  id: string;
  type: BlockType;
  label: string;
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

export interface FormTheme {
  theme: "light" | "dark";
  font: string;
  background: string;
  text: string;
  buttonBg: string;
  buttonText: string;
  accent: string;
  pageWidth: number;
  baseFontSize: number;
}

export interface FormBuilder {
  id: string;
  title: string;
  description?: string;
  blocks: FormBlock[];
  theme: FormTheme;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export const defaultTheme: FormTheme = {
  theme: "light",
  font: "Inter",
  background: "#ffffff",
  text: "#37352F",
  buttonBg: "#000000",
  buttonText: "#FFFFFF",
  accent: "#0070D7",
  pageWidth: 700,
  baseFontSize: 16,
};
