import { useState } from 'react'
import { X, Layers, Plus, ChevronRight } from 'lucide-react'
import { Modal } from './Modal'

interface Props {
  open: boolean
  onClose: () => void
  onOpenTemplates: () => void
  onCreate: (name: string, description: string) => void
}

export function NewProjectModal({ open, onClose, onOpenTemplates, onCreate }: Props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function handleCreate() {
    if (!name.trim()) return
    onCreate(name, description)
    setName('')
    setDescription('')
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-start justify-between mb-1">
        <div>
          <h2 className="text-lg font-semibold">Create New Form</h2>
          <p className="text-sm text-muted">Start from scratch or use a template.</p>
        </div>
        <button onClick={onClose} className="text-dim hover:text-text transition" aria-label="Close">
          <X size={18} />
        </button>
      </div>

      <button
        onClick={onOpenTemplates}
        className="w-full flex items-center gap-3 border border-dashed border-border rounded-xl p-4 mt-5 text-left hover:border-text/30 transition group"
      >
        <div className="w-9 h-9 rounded-lg bg-surface-2 border border-border flex items-center justify-center shrink-0">
          <Layers size={16} className="text-muted" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">Start from template</p>
          <p className="text-xs text-dim">Pre-built form templates to get started quickly</p>
        </div>
        <ChevronRight size={16} className="text-dim group-hover:translate-x-0.5 transition shrink-0" />
      </button>

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-dim shrink-0">or start blank</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Form Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Customer Feedback Survey"
            className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-text/40 transition placeholder:text-dim"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">
            Description <span className="text-dim font-normal">(optional)</span>
          </label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A brief description of your form"
            className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-text/40 transition placeholder:text-dim"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-surface-2 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleCreate}
          disabled={!name.trim()}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[var(--ui-text)] text-[var(--ui-base)] text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition"
        >
          <Plus size={14} />
          Create Form
        </button>
      </div>
    </Modal>
  )
}
