import { useEffect, useRef, useState } from 'react'
import { Search, RotateCw, ArrowUpDown, Clock, Check, CaseSensitive } from 'lucide-react'

export type SortBy = 'updated' | 'name'

const SORT_OPTIONS: { value: SortBy; label: string; icon: typeof Clock }[] = [
  { value: 'updated', label: 'Recently Updated', icon: Clock },
  { value: 'name', label: 'Name', icon: CaseSensitive },
]

interface Props {
  count: number
  search: string
  onSearchChange: (value: string) => void
  sortBy: SortBy
  onSortChange: (value: SortBy) => void
  onRefresh: () => void
}

export function DashboardToolbar({ count, search, onSearchChange, sortBy, onSortChange, onRefresh }: Props) {
  const [sortOpen, setSortOpen] = useState(false)
  const [spinning, setSpinning] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const activeSort = SORT_OPTIONS.find((o) => o.value === sortBy) ?? SORT_OPTIONS[0]

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setSortOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  function handleRefresh() {
    setSpinning(true)
    onRefresh()
    setTimeout(() => setSpinning(false), 500)
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
      <div className="flex items-center gap-2 text-sm text-muted">
        <span className="text-text font-medium">{count}</span>
        {count === 1 ? 'form' : 'forms'}
        <span className="text-dim">·</span>
        <activeSort.icon size={13} className="text-dim" />
        {activeSort.label}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dim" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search forms..."
            className="w-56 bg-surface border border-border rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-text/40 transition placeholder:text-dim"
          />
        </div>

        <button
          onClick={handleRefresh}
          aria-label="Refresh"
          className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted hover:text-text hover:border-text/30 transition shrink-0"
        >
          <RotateCw size={14} className={spinning ? 'animate-spin' : ''} />
        </button>

        <div ref={ref} className="relative shrink-0">
          <button
            onClick={() => setSortOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={sortOpen}
            aria-label="Sort forms"
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted hover:text-text hover:border-text/30 transition"
          >
            <ArrowUpDown size={14} />
          </button>

          {sortOpen && (
            <div
              role="listbox"
              className="absolute right-0 top-full mt-1.5 w-44 bg-surface border border-border rounded-lg shadow-lg py-1 z-50"
            >
              {SORT_OPTIONS.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  role="option"
                  aria-selected={sortBy === value}
                  onClick={() => {
                    onSortChange(value)
                    setSortOpen(false)
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-surface-2 transition"
                >
                  <Icon size={13} className="text-muted shrink-0" />
                  <span className={sortBy === value ? 'font-medium' : 'text-muted'}>{label}</span>
                  {sortBy === value && <Check size={13} className="ml-auto shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
