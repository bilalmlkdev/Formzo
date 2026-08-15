export type Theme = 'light' | 'dark' | 'system'

const KEY = 'formussy:theme'

export function getStoredTheme(): Theme {
  return (localStorage.getItem(KEY) as Theme) || 'light'
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  const resolved =
    theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme

  root.classList.toggle('dark', resolved === 'dark')
  localStorage.setItem(KEY, theme)
}

export function initTheme() {
  applyTheme(getStoredTheme())
}
