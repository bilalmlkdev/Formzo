import { useState } from 'react'
import { X, Layers, ChevronRight, Mail, Briefcase, CalendarCheck } from 'lucide-react'
import { Modal } from './Modal'
import { TEMPLATES } from '../lib/types'

const ICONS: Record<string, typeof Mail> = {
  'contact-form': Mail,
  'job-application': Briefcase,
  'event-rsvp': CalendarCheck,
}

interface Props {
  open: boolean
  onClose: () => void
  onUseTemplate: (templateId: string) => void
}

export function TemplatePickerModal({ open, onClose, onUseTemplate }: Props) {
  const [selected, setSelected] = useState(TEMPLATES[0].id)

  return (
    <Modal open={open} onClose={onClose} width="max-w-lg">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Layers size={17} />
            Start from Template
          </h2>
          <p className="text-sm text-muted">Pick a pre-built form to get started quickly.</p>
        </div>
        <button onClick={onClose} className="text-dim hover:text-text transition" aria-label="Close">
          <X size={18} />
        </button>
      </div>

      <div className="space-y-3 mt-5 max-h-80 overflow-y-auto pr-1">
        {TEMPLATES.map((t) => {
          const Icon = ICONS[t.id] ?? Mail
          const isSelected = selected === t.id
          return (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={`w-full text-left flex items-start gap-3 rounded-xl border p-4 transition ${
                isSelected ? 'border-text/60 bg-surface-2' : 'border-border hover:border-text/25'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-surface-2 border border-border flex items-center justify-center shrink-0">
                <Icon size={16} className="text-muted" />
              </div>
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium">{t.name}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-2 border border-border text-muted">
                    {t.tag}
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed">{t.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {t.fields.map((f) => (
                    <span
                      key={f.label}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-surface-2 border border-border text-dim"
                    >
                      {f.label}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-border">
        <button
          onClick={onClose}
          className="px-4 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-surface-2 transition"
        >
          Cancel
        </button>
        <button
          onClick={() => onUseTemplate(selected)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[var(--ui-text)] text-[var(--ui-base)] text-sm font-medium hover:opacity-90 transition"
        >
          Use Template
          <ChevronRight size={14} />
        </button>
      </div>
    </Modal>
  )
}
