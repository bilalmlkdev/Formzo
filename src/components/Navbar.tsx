import { Plus } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

export function Navbar({ onNewProject }: { onNewProject: () => void }) {
  return (
    <header className="border-b border-border">
      <div className="h-[3px] bg-gradient-to-r from-indigo-950 via-slate-800 to-indigo-950" />
      <div className="flex items-center justify-between px-8 py-4">
        <span className="text-3xl leading-none" style={{ fontFamily: 'var(--font-script)' }}>
          Formussy
        </span>

        <div className="flex items-center gap-3">
          <button
            onClick={onNewProject}
            className="flex items-center gap-1.5 bg-[var(--ui-text)] text-[var(--ui-base)] text-sm font-medium px-4 py-2.5 rounded-xl hover:opacity-90 transition"
          >
            <Plus size={15} />
            New Form
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
