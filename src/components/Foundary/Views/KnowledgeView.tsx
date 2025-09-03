import { useState } from 'react'
import { DashboardHero } from '../../Heros/DashboardHero/DashboardHero'
import type { KnowledgeDocument, KnowledgeContext } from '../types'
import { KnowledgeBrowser } from '../knowledge-browser'

interface KnowledgeViewProps {
  documents?: KnowledgeDocument[]
  contexts?: KnowledgeContext[]
  onDocumentClick?: (document: KnowledgeDocument) => void
  onDocumentShare?: (document: KnowledgeDocument) => void
  onLoadDocumentContent?: (documentId: string) => Promise<string>
  selectedDocumentId?: string
}

export default function KnowledgeView({
  documents = [],
  contexts = [],
  onDocumentClick = (document: KnowledgeDocument) => console.log('Document clicked:', document),
  onDocumentShare = (document: KnowledgeDocument) => console.log('Share document:', document),
  onLoadDocumentContent,
  selectedDocumentId,
}: KnowledgeViewProps) {
  const [activeContext, setActiveContext] = useState(contexts[0])

  // Return early if no contexts are provided
  if (!contexts || contexts.length === 0) {
    return (
      <div className="flex flex-col h-full max-h-[calc(100vh-8rem)]">
        <div className="px-2 md:px-4 py-4 flex-shrink-0">
          <DashboardHero
            title="Knowledge"
            description="Access, manage, and share all your team knowledge in one place."
            gradient="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600"
            primaryAction={{
              label: 'Create',
              onClick: () => console.log('Create document clicked'),
            }}
          />
        </div>
        <div className="flex-1 min-h-0 px-2 md:px-4 pb-4 flex items-center justify-center">
          <p className="text-muted-foreground">No contexts available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-8rem)]">
      <div className="px-2 md:px-4 py-4 flex-shrink-0">
        <DashboardHero
          title="Knowledge"
          description="Access, manage, and share all your team knowledge in one place."
          gradient="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600"
          primaryAction={{
            label: 'Create',
            onClick: () => console.log('Create document clicked'),
          }}
        />

        {/* Context Tabs */}
        <div className="mt-6">
          <div className="border-b border-border">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {contexts.map((context) => (
                <button
                  key={context.id}
                  onClick={() => setActiveContext(context)}
                  className={`group inline-flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeContext.id === context.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                  }`}
                >
                  {context.icon}
                  {context.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Active Context Description */}
          {activeContext.description && (
            <div className="mt-3 px-1">
              <p className="text-sm text-muted-foreground">{activeContext.description}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 px-2 md:px-4 pb-4">
        <div className="h-full rounded-3xl border overflow-hidden">
          <KnowledgeBrowser
            documents={documents}
            menuConfig={activeContext.menuConfig}
            onDocumentClick={onDocumentClick}
            onDocumentShare={onDocumentShare}
            selectedDocumentId={selectedDocumentId}
          />
        </div>
      </div>
    </div>
  )
}
