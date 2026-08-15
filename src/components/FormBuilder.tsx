import { useState } from 'react'
import {
  ArrowLeft,
  Plus,
  Trash2,
  Eye,
  Pencil,
  Type,
  Mail,
  AlignLeft,
  Hash,
  ListTree,
  CheckSquare,
  Calendar,
} from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { useProjectsStore } from '../lib/store'
import { FIELD_TYPES } from '../lib/types'
import type { FieldType, FormField } from '../lib/types'

const FIELD_ICONS: Record<FieldType, typeof Type> = {
  text: Type,
  email: Mail,
  textarea: AlignLeft,
  number: Hash,
  select: ListTree,
  checkbox: CheckSquare,
  date: Calendar,
}

function blankField(type: FieldType): Omit<FormField, 'id'> {
  const label = FIELD_TYPES.find((f) => f.type === type)?.label ?? 'Field'
  return type === 'select'
    ? { type, label, required: false, options: ['Option 1', 'Option 2'] }
    : { type, label, required: false }
}

export function FormBuilder({ projectId, onBack }: { projectId: string; onBack: () => void }) {
  const { projects, update } = useProjectsStore()
  const project = projects.find((p) => p.id === projectId)
  const [mode, setMode] = useState<'edit' | 'preview'>('edit')

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-sm text-muted">
        This form no longer exists.
        <button onClick={onBack} className="flex items-center gap-1.5 text-text font-medium hover:opacity-70 transition">
          <ArrowLeft size={14} />
          Back to your forms
        </button>
      </div>
    )
  }

  function addField(type: FieldType) {
    const field: FormField = { id: crypto.randomUUID(), ...blankField(type) }
    update(project!.id, { fields: [...project!.fields, field] })
  }

  function patchField(id: string, patch: Partial<FormField>) {
    update(project!.id, {
      fields: project!.fields.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    })
  }

  function removeField(id: string) {
    update(project!.id, { fields: project!.fields.filter((f) => f.id !== id) })
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="flex items-center justify-between gap-3 px-6 py-3.5">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted hover:text-text hover:border-text/30 transition shrink-0"
              aria-label="Back to your forms"
            >
              <ArrowLeft size={15} />
            </button>
            <input
              value={project.name}
              onChange={(e) => update(project.id, { name: e.target.value })}
              placeholder="Untitled form"
              className="text-sm font-semibold bg-transparent outline-none min-w-0 w-full max-w-xs truncate"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center rounded-lg border border-border p-0.5">
              <button
                onClick={() => setMode('edit')}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition ${
                  mode === 'edit' ? 'bg-[var(--ui-text)] text-[var(--ui-base)]' : 'text-muted hover:text-text'
                }`}
              >
                <Pencil size={12} />
                Build
              </button>
              <button
                onClick={() => setMode('preview')}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition ${
                  mode === 'preview' ? 'bg-[var(--ui-text)] text-[var(--ui-base)]' : 'text-muted hover:text-text'
                }`}
              >
                <Eye size={12} />
                Preview
              </button>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {mode === 'edit' ? (
          <div className="grid md:grid-cols-[220px_1fr] gap-6">
            <aside className="space-y-1.5">
              <p className="text-xs font-medium text-dim px-1 mb-2">Add a field</p>
              {FIELD_TYPES.map(({ type, label }) => {
                const Icon = FIELD_ICONS[type]
                return (
                  <button
                    key={type}
                    onClick={() => addField(type)}
                    className="w-full flex items-center gap-2.5 text-left border border-border rounded-lg px-3 py-2.5 text-sm hover:border-text/30 hover:bg-surface-2 transition"
                  >
                    <Icon size={14} className="text-muted shrink-0" />
                    {label}
                    <Plus size={13} className="ml-auto text-dim shrink-0" />
                  </button>
                )
              })}
            </aside>

            <main>
              {project.fields.length === 0 ? (
                <div className="border border-dashed border-border rounded-2xl py-20 text-center text-sm text-muted">
                  No fields yet — add one from the left to start building your form.
                </div>
              ) : (
                <div className="space-y-3">
                  {project.fields.map((field) => (
                    <FieldEditor
                      key={field.id}
                      field={field}
                      onChange={(patch) => patchField(field.id, patch)}
                      onRemove={() => removeField(field.id)}
                    />
                  ))}
                </div>
              )}
            </main>
          </div>
        ) : (
          <div className="max-w-xl mx-auto">
            <FormPreview name={project.name} description={project.description} fields={project.fields} />
          </div>
        )}
      </div>
    </div>
  )
}

function FieldEditor({
  field,
  onChange,
  onRemove,
}: {
  field: FormField
  onChange: (patch: Partial<FormField>) => void
  onRemove: () => void
}) {
  const Icon = FIELD_ICONS[field.type]

  return (
    <div className="bg-surface border border-border rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center shrink-0">
          <Icon size={14} className="text-muted" />
        </div>
        <input
          value={field.label}
          onChange={(e) => onChange({ label: e.target.value })}
          className="flex-1 min-w-0 text-sm font-medium bg-transparent outline-none"
        />
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-2 border border-border text-dim shrink-0">
          {FIELD_TYPES.find((t) => t.type === field.type)?.label}
        </span>
        <button
          onClick={onRemove}
          className="text-dim hover:text-red-500 transition shrink-0"
          aria-label="Remove field"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {(field.type === 'text' || field.type === 'textarea' || field.type === 'email' || field.type === 'number') && (
        <input
          value={field.placeholder ?? ''}
          onChange={(e) => onChange({ placeholder: e.target.value })}
          placeholder="Placeholder text"
          className="w-full bg-base border border-border rounded-lg px-3 py-2 text-xs outline-none focus:border-text/40 transition placeholder:text-dim"
        />
      )}

      {field.type === 'select' && (
        <input
          value={(field.options ?? []).join(', ')}
          onChange={(e) =>
            onChange({ options: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })
          }
          placeholder="Option 1, Option 2, Option 3"
          className="w-full bg-base border border-border rounded-lg px-3 py-2 text-xs outline-none focus:border-text/40 transition placeholder:text-dim"
        />
      )}

      <label className="flex items-center gap-2 text-xs text-muted w-fit cursor-pointer">
        <input
          type="checkbox"
          checked={field.required}
          onChange={(e) => onChange({ required: e.target.checked })}
          className="accent-[var(--ui-text)]"
        />
        Required
      </label>
    </div>
  )
}

function FormPreview({
  name,
  description,
  fields,
}: {
  name: string
  description: string
  fields: FormField[]
}) {
  const inputClass =
    'w-full bg-base border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-text/40 transition placeholder:text-dim'

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 space-y-5">
      <div>
        <h2 className="text-lg font-semibold">{name || 'Untitled form'}</h2>
        {description && <p className="text-sm text-muted mt-1">{description}</p>}
      </div>

      {fields.length === 0 ? (
        <p className="text-sm text-muted">This form doesn't have any fields yet.</p>
      ) : (
        fields.map((field) =>
          field.type === 'checkbox' ? (
            <label key={field.id} className="flex items-center gap-2 text-sm">
              <input type="checkbox" disabled className="accent-[var(--ui-text)]" />
              {field.label}
              {field.required && <span className="text-dim font-normal">*</span>}
            </label>
          ) : (
            <div key={field.id} className="space-y-1.5">
              <label className="text-sm font-medium">
                {field.label}
                {field.required && <span className="text-dim font-normal"> *</span>}
              </label>
              {field.type === 'textarea' && (
                <textarea className={`${inputClass} min-h-20`} placeholder={field.placeholder} disabled />
              )}
              {field.type === 'select' && (
                <select className={inputClass} disabled>
                  {(field.options ?? []).map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              )}
              {(field.type === 'text' || field.type === 'email' || field.type === 'number' || field.type === 'date') && (
                <input
                  type={field.type === 'date' ? 'date' : field.type}
                  className={inputClass}
                  placeholder={field.placeholder}
                  disabled
                />
              )}
            </div>
          )
        )
      )}

      <button
        disabled
        className="w-full bg-[var(--ui-text)] text-[var(--ui-base)] text-sm font-medium py-2.5 rounded-lg opacity-90 cursor-not-allowed"
      >
        Submit
      </button>
    </div>
  )
}
