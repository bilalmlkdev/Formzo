export const APP_NAME = "Formzo";

export const APP_DESCRIPTION = "Forms that feel like your product.";

export const ACCENT_COLOR = "#9B72FF";

export const CATEGORIES = [
  "Contact",
  "Survey",
  "Registration",
  "Quiz",
  "Feedback",
  "Lead Generation",
  "Event",
  "Order",
  "Application",
  "Booking",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const FIELD_TYPES = [
  "text",
  "email",
  "phone",
  "number",
  "textarea",
  "select",
  "radio",
  "checkbox",
  "date",
  "time",
  "file",
  "rating",
  "scale",
  "yes_no",
  "dropdown",
  "url",
  "heading",
  "paragraph",
  "divider",
  "image",
] as const;

export const PLAN_LIMITS = {
  free: {
    forms: 3,
    responses: 100,
    fileUploads: 10,
  },
  pro: {
    forms: 100,
    responses: 10000,
    fileUploads: 1000,
  },
  enterprise: {
    forms: Infinity,
    responses: Infinity,
    fileUploads: Infinity,
  },
} as const;

export const ROUTES = {
  home: "/",
  login: "/login",
  signup: "/signup",
  app: "/app",
  dashboard: "/app",
  forms: "/app/forms",
  builder: (formId: string) => `/app/forms/${formId}`,
  preview: (formId: string) => `/app/forms/${formId}/preview`,
  responses: (formId: string) => `/app/forms/${formId}/responses`,
  analytics: "/app/analytics",
  settings: "/app/settings",
  publicForm: (slug: string) => `/f/${slug}`,
  success: (slug: string) => `/f/${slug}/success`,
} as const;
