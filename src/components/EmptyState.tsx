import { Plus } from 'lucide-react'

function FolderFace() {
  return (
    <svg width="140" height="120" viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="38" width="70" height="18" rx="4" fill="var(--ui-surface-2)" stroke="var(--ui-border)" />
      <rect x="26" y="30" width="86" height="18" rx="4" fill="var(--ui-surface-2)" stroke="var(--ui-border)" />
      <rect x="10" y="46" width="110" height="62" rx="8" fill="var(--ui-surface-2)" stroke="var(--ui-border)" strokeWidth="1.5" />
      <circle cx="50" cy="78" r="3.5" fill="var(--ui-text-dim)" />
      <circle cx="80" cy="78" r="3.5" fill="var(--ui-text-dim)" />
      <rect x="55" y="92" width="20" height="3" rx="1.5" fill="var(--ui-text-dim)" />
    </svg>
  )
}

export function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <FolderFace />
      <div className="space-y-1">
        <p className="text-lg font-medium">Oops.. There are no forms yet</p>
        <p className="text-sm text-muted">Be the first one to create a form</p>
      </div>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 border border-dashed border-border rounded-full pl-3 pr-4 py-2 text-sm font-medium hover:border-text/40 transition"
      >
        <span className="w-5 h-5 rounded-full bg-[var(--ui-text)] text-[var(--ui-base)] flex items-center justify-center shrink-0">
          <Plus size={12} />
        </span>
        Add Form
      </button>
    </div>
  )
}
