import { motion } from 'framer-motion'
import { Layers, Trash2 } from 'lucide-react'
import type { Project } from '../lib/types'
import { TEMPLATES } from '../lib/types'

function relativeTime(ts: number): string {
  const days = Math.floor((Date.now() - ts) / (1000 * 60 * 60 * 24))
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  return `${Math.floor(days / 30)} mo ago`
}

export function ProjectCard({
  project,
  onOpen,
  onDelete,
}: {
  project: Project
  onOpen: () => void
  onDelete: () => void
}) {
  const template = TEMPLATES.find((t) => t.id === project.templateId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onOpen}
      className="group text-left bg-surface border border-border rounded-2xl p-5 space-y-3 hover:border-text/20 transition cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="w-9 h-9 rounded-lg bg-surface-2 border border-border flex items-center justify-center shrink-0">
          <Layers size={15} className="text-muted" />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="text-dim hover:text-red-500 transition opacity-0 group-hover:opacity-100"
          aria-label="Delete form"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-medium truncate">{project.name}</h3>
        {project.description && <p className="text-xs text-muted line-clamp-2">{project.description}</p>}
      </div>

      <div className="flex items-center justify-between pt-1">
        {template ? (
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-2 border border-border text-muted">
            {template.name}
          </span>
        ) : (
          <span className="text-[11px] text-dim">Blank form</span>
        )}
        <span className="text-[11px] text-dim">
          {project.fields.length} field{project.fields.length === 1 ? '' : 's'} · {relativeTime(project.updatedAt)}
        </span>
      </div>
    </motion.div>
  )
}
