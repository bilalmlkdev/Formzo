export type FieldType = 'text' | 'email' | 'textarea' | 'number' | 'select' | 'checkbox' | 'date'

export interface FormField {
  id: string
  type: FieldType
  label: string
  placeholder?: string
  options?: string[]
  required: boolean
}

export interface Project {
  id: string
  name: string
  description: string
  templateId: string | null
  fields: FormField[]
  createdAt: number
  updatedAt: number
}

export interface Template {
  id: string
  name: string
  tag: string
  description: string
  fields: Array<Omit<FormField, 'id'>>
}

export const TEMPLATES: Template[] = [
  {
    id: 'contact-form',
    name: 'Contact Form',
    tag: 'Popular',
    description: 'A simple way for visitors to reach out — name, email and a message',
    fields: [
      { type: 'text', label: 'Full name', placeholder: 'Jane Doe', required: true },
      { type: 'email', label: 'Email', placeholder: 'jane@example.com', required: true },
      { type: 'textarea', label: 'Message', placeholder: "What's on your mind?", required: true },
    ],
  },
  {
    id: 'job-application',
    name: 'Job Application',
    tag: 'Hiring',
    description: 'Collect candidate details, resume links, and the role they want',
    fields: [
      { type: 'text', label: 'Full name', required: true },
      { type: 'email', label: 'Email', required: true },
      {
        type: 'select',
        label: 'Role applying for',
        options: ['Engineering', 'Design', 'Marketing', 'Sales'],
        required: true,
      },
      { type: 'text', label: 'Resume link', placeholder: 'https://...', required: true },
      { type: 'textarea', label: 'Why are you a good fit?', required: false },
    ],
  },
  {
    id: 'event-rsvp',
    name: 'Event RSVP',
    tag: 'Events',
    description: 'Gather attendance confirmations and headcount for an event',
    fields: [
      { type: 'text', label: 'Full name', required: true },
      { type: 'email', label: 'Email', required: true },
      { type: 'select', label: 'Attending?', options: ['Yes', 'No', 'Maybe'], required: true },
      { type: 'number', label: 'Number of guests', placeholder: '0', required: false },
      { type: 'checkbox', label: 'I have dietary restrictions', required: false },
    ],
  },
]

export const FIELD_TYPES: { type: FieldType; label: string }[] = [
  { type: 'text', label: 'Text' },
  { type: 'email', label: 'Email' },
  { type: 'textarea', label: 'Textarea' },
  { type: 'number', label: 'Number' },
  { type: 'select', label: 'Select' },
  { type: 'checkbox', label: 'Checkbox' },
  { type: 'date', label: 'Date' },
]
