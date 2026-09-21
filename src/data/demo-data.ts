import type { Form } from "../types/form";
import type { FormResponse } from "../types/response";
import { generateId } from "../lib/utils";

const now = new Date();
const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();
const hoursAgo = (hours: number) => new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString();

export const demoForms: Form[] = [
  {
    id: "form-contact-1",
    name: "Contact Us",
    description: "Get in touch with our team",
    slug: "contact-us",
    fields: [
      { id: "f1", type: "shortText", label: "Name", placeholder: "Your name", required: true, width: "half" },
      { id: "f2", type: "email", label: "Email", placeholder: "you@example.com", required: true, width: "half" },
      { id: "f3", type: "select", label: "Department", required: true, config: { options: [{ label: "Sales", value: "sales" }, { label: "Support", value: "support" }, { label: "Partnerships", value: "partnerships" }, { label: "Other", value: "other" }] } },
      { id: "f4", type: "longText", label: "Message", placeholder: "How can we help?", required: true },
    ],
    settings: {
      submitLabel: "Send Message",
      showRequiredIndicators: true,
      theme: { width: "md" },
    },
    status: "published",
    createdAt: daysAgo(30),
    updatedAt: daysAgo(2),
    publishedAt: daysAgo(28),
    responseCount: 45,
  },
  {
    id: "form-survey-1",
    name: "Customer Satisfaction Survey",
    description: "Help us improve our product",
    slug: "customer-satisfaction",
    fields: [
      { id: "f1", type: "rating", label: "Overall satisfaction", required: true, config: { ratingType: "stars", scale: 5 } },
      { id: "f2", type: "slider", label: "How likely are you to recommend us?", required: true, config: { min: 0, max: 10, step: 1 } },
      { id: "f3", type: "longText", label: "What could we improve?", required: false },
      { id: "f4", type: "yesNo", label: "Would you use our product again?", required: true },
    ],
    settings: {
      submitLabel: "Submit Survey",
      showRequiredIndicators: true,
      theme: { width: "md" },
    },
    status: "published",
    createdAt: daysAgo(14),
    updatedAt: daysAgo(1),
    publishedAt: daysAgo(13),
    responseCount: 128,
  },
  {
    id: "form-event-1",
    name: "Product Launch Event",
    description: "Register for our upcoming product launch",
    slug: "product-launch",
    fields: [
      { id: "f1", type: "shortText", label: "Full Name", placeholder: "Jane Smith", required: true },
      { id: "f2", type: "email", label: "Email", placeholder: "jane@company.com", required: true },
      { id: "f3", type: "shortText", label: "Company", placeholder: "Your company", required: false },
      { id: "f4", type: "radio", label: "Ticket Type", required: true, config: { options: [{ label: "General", value: "general" }, { label: "VIP", value: "vip" }, { label: "Speaker", value: "speaker" }] } },
      { id: "f5", type: "checkbox", label: "Interests", required: false, config: { options: [{ label: "AI Features", value: "ai" }, { label: "Integrations", value: "integrations" }, { label: "Analytics", value: "analytics" }, { label: "Mobile App", value: "mobile" }] } },
    ],
    settings: {
      submitLabel: "Register Now",
      showRequiredIndicators: true,
      theme: { width: "md" },
    },
    status: "published",
    createdAt: daysAgo(7),
    updatedAt: hoursAgo(5),
    publishedAt: daysAgo(6),
    responseCount: 67,
  },
  {
    id: "form-lead-1",
    name: "Free Trial Signup",
    description: "Start your 14-day free trial",
    slug: "free-trial",
    fields: [
      { id: "f1", type: "shortText", label: "First Name", placeholder: "John", required: true, width: "half" },
      { id: "f2", type: "shortText", label: "Last Name", placeholder: "Doe", required: true, width: "half" },
      { id: "f3", type: "email", label: "Work Email", placeholder: "john@company.com", required: true },
      { id: "f4", type: "shortText", label: "Company", placeholder: "Acme Inc", required: true },
      { id: "f5", type: "select", label: "Company Size", required: true, config: { options: [{ label: "1-10", value: "1-10" }, { label: "11-50", value: "11-50" }, { label: "51-200", value: "51-200" }, { label: "200+", value: "200+" }] } },
      { id: "f6", type: "checkbox", label: "I'm interested in", required: false, config: { options: [{ label: "Product updates", value: "updates" }, { label: "Webinars", value: "webinars" }, { label: "Case studies", value: "cases" }] } },
    ],
    settings: {
      submitLabel: "Start Free Trial",
      showRequiredIndicators: true,
      theme: { width: "md" },
    },
    status: "published",
    createdAt: daysAgo(21),
    updatedAt: daysAgo(3),
    publishedAt: daysAgo(20),
    responseCount: 89,
  },
];

export const demoResponses: FormResponse[] = [
  {
    id: generateId(),
    formId: "form-contact-1",
    formSlug: "contact-us",
    answers: { f1: "Alice Johnson", f2: "alice@example.com", f3: "sales", f4: "Interested in your enterprise plan for our team of 50." },
    submittedAt: daysAgo(10),
    metadata: { country: "US", city: "San Francisco" },
  },
  {
    id: generateId(),
    formId: "form-contact-1",
    formSlug: "contact-us",
    answers: { f1: "Bob Williams", f2: "bob@startup.io", f3: "support", f4: "Having trouble integrating with our existing CRM." },
    submittedAt: daysAgo(5),
    metadata: { country: "UK", city: "London" },
  },
  {
    id: generateId(),
    formId: "form-contact-1",
    formSlug: "contact-us",
    answers: { f1: "Carol Martinez", f2: "carol@design.co", f3: "partnerships", f4: "Would love to explore a partnership opportunity." },
    submittedAt: daysAgo(2),
    metadata: { country: "CA", city: "Toronto" },
  },
  {
    id: generateId(),
    formId: "form-contact-1",
    formSlug: "contact-us",
    answers: { f1: "David Chen", f2: "david@techcorp.com", f3: "sales", f4: "Looking for a custom solution for our SaaS product." },
    submittedAt: hoursAgo(6),
    metadata: { country: "AU", city: "Sydney" },
  },
  {
    id: generateId(),
    formId: "form-survey-1",
    formSlug: "customer-satisfaction",
    answers: { f1: 5, f2: 9, f3: "Love the product! Maybe add more templates.", f4: "yes" },
    submittedAt: daysAgo(8),
    metadata: { country: "US", city: "New York" },
  },
  {
    id: generateId(),
    formId: "form-survey-1",
    formSlug: "customer-satisfaction",
    answers: { f1: 4, f2: 7, f3: "The mobile experience could be better.", f4: "yes" },
    submittedAt: daysAgo(4),
    metadata: { country: "DE", city: "Berlin" },
  },
  {
    id: generateId(),
    formId: "form-survey-1",
    formSlug: "customer-satisfaction",
    answers: { f1: 3, f2: 5, f3: "Too expensive for small teams.", f4: "maybe" },
    submittedAt: daysAgo(2),
    metadata: { country: "IN", city: "Mumbai" },
  },
  {
    id: generateId(),
    formId: "form-survey-1",
    formSlug: "customer-satisfaction",
    answers: { f1: 5, f2: 10, f3: "Everything is perfect!", f4: "yes" },
    submittedAt: hoursAgo(3),
    metadata: { country: "JP", city: "Tokyo" },
  },
];
