import { useEffect, useRef, useState } from 'react'
import { Sun, Moon, ChevronDown, Check } from 'lucide-react'
import { applyTheme, getStoredTheme } from '../lib/theme'

type Resolved = 'light' | 'dark'

const OPTIONS: { value: Resolved; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
]

export function ThemeToggle() {
  const [theme, setTheme] = useState<Resolved>(() => {
    const stored = getStoredTheme()
    return stored === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : (stored as Resolved)
  })
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  function select(value: Resolved) {
    applyTheme(value)
    setTheme(value)
    setOpen(false)
  }

  const ActiveIcon = theme === 'dark' ? Moon : Sun

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change theme"
        className="flex items-center gap-1.5 h-9 pl-2.5 pr-2 rounded-lg border border-border text-muted hover:text-text hover:border-text/30 transition"
      >
        <ActiveIcon size={14} />
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-1.5 w-32 bg-surface border border-border rounded-lg shadow-lg py-1 z-50"
        >
          {OPTIONS.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              role="option"
              aria-selected={theme === value}
              onClick={() => select(value)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-surface-2 transition"
            >
              <Icon size={13} className="text-muted shrink-0" />
              <span className={theme === value ? 'font-medium' : 'text-muted'}>{label}</span>
              {theme === value && <Check size={13} className="ml-auto shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
