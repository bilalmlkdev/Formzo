import { create } from 'zustand'
import type { FormField, Project } from './types'
import { TEMPLATES } from './types'

const KEY = 'formussy:projects'

function load(): Project[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(parsed) ? parsed.map((p) => ({ fields: [], ...p })) : []
  } catch {
    return []
  }
}

function save(projects: Project[]) {
  localStorage.setItem(KEY, JSON.stringify(projects))
}

interface ProjectsState {
  projects: Project[]
  create: (input: { name: string; description: string; templateId: string | null }) => Project
  remove: (id: string) => void
  update: (id: string, patch: Partial<Pick<Project, 'name' | 'description' | 'fields'>>) => void
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: load(),

  create: ({ name, description, templateId }) => {
    const now = Date.now()
    const template = TEMPLATES.find((t) => t.id === templateId)
    const fields: FormField[] = (template?.fields ?? []).map((f) => ({
      ...f,
      id: crypto.randomUUID(),
    }))

    const project: Project = {
      id: crypto.randomUUID(),
      name: name.trim() || 'Untitled form',
      description: description.trim(),
      templateId,
      fields,
      createdAt: now,
      updatedAt: now,
    }
    const next = [project, ...get().projects]
    save(next)
    set({ projects: next })
    return project
  },

  remove: (id) => {
    const next = get().projects.filter((p) => p.id !== id)
    save(next)
    set({ projects: next })
  },

  update: (id, patch) => {
    const next = get().projects.map((p) =>
      p.id === id ? { ...p, ...patch, updatedAt: Date.now() } : p
    )
    save(next)
    set({ projects: next })
  },
}))
