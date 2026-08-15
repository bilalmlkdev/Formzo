import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { EmptyState } from './components/EmptyState'
import { ProjectCard } from './components/ProjectCard'
import { NewProjectModal } from './components/NewProjectModal'
import { TemplatePickerModal } from './components/TemplatePickerModal'
import { FormBuilder } from './components/FormBuilder'
import { useProjectsStore } from './lib/store'
import { TEMPLATES } from './lib/types'

type ModalState = 'closed' | 'new' | 'templates'
type Page = { name: 'dashboard' } | { name: 'builder'; projectId: string }

export default function App() {
  const { projects, create, remove } = useProjectsStore()
  const [modal, setModal] = useState<ModalState>('closed')
  const [page, setPage] = useState<Page>({ name: 'dashboard' })

  function handleCreateBlank(name: string, description: string) {
    const project = create({ name, description, templateId: null })
    setModal('closed')
    setPage({ name: 'builder', projectId: project.id })
  }

  function handleUseTemplate(templateId: string) {
    const template = TEMPLATES.find((t) => t.id === templateId)
    const project = create({
      name: template?.name ?? 'New form',
      description: template?.description ?? '',
      templateId,
    })
    setModal('closed')
    setPage({ name: 'builder', projectId: project.id })
  }

  if (page.name === 'builder') {
    return <FormBuilder projectId={page.projectId} onBack={() => setPage({ name: 'dashboard' })} />
  }

  return (
    <div className="min-h-screen">
      <Navbar onNewProject={() => setModal('new')} />

      <main className="max-w-6xl mx-auto px-8 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Your Forms</h1>
          <p className="text-sm text-muted mt-1">Create and manage the forms you build</p>
        </div>

        {projects.length === 0 ? (
          <EmptyState onAdd={() => setModal('new')} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onOpen={() => setPage({ name: 'builder', projectId: p.id })}
                onDelete={() => remove(p.id)}
              />
            ))}
          </div>
        )}
      </main>

      <NewProjectModal
        open={modal === 'new'}
        onClose={() => setModal('closed')}
        onOpenTemplates={() => setModal('templates')}
        onCreate={handleCreateBlank}
      />

      <TemplatePickerModal
        open={modal === 'templates'}
        onClose={() => setModal('new')}
        onUseTemplate={handleUseTemplate}
      />
    </div>
  )
}
