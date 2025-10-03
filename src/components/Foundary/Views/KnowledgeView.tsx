'use client'

import { useEffect, useState } from 'react'
import { DashboardHero } from '../../Heros/DashboardHero/DashboardHero'
import type { KnowledgeDocument, KnowledgeContext, Knowledge, TeamKnowledgeContext } from '../types'
import { KnowledgeBrowser } from '../knowledge-browser'
import { AddKnowledgeModal } from '../Knowledge/add-knowledge-modal'
import { AddTeamContext } from '../Knowledge/add-team-context'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface KnowledgeViewProps {
  documents?: KnowledgeDocument[]
  contexts?: KnowledgeContext[]
  onDocumentClick?: (document: KnowledgeDocument) => void
  onDocumentShare?: (document: KnowledgeDocument) => void
  onLoadDocumentContent?: (documentId: string) => Promise<string>
  selectedDocumentId?: string
  onAddKnowledge?: (knowledge: Omit<Knowledge, 'id'>) => void
  onAddTeamContext?: (teamContext: TeamKnowledgeContext) => void
  onDocumentUpdate?: (document: KnowledgeDocument) => Promise<boolean>
}

export default function KnowledgeView({
  documents = [],
  contexts = [],
  onDocumentClick = (document: KnowledgeDocument) => console.log('Document clicked:', document),
  onDocumentShare = (document: KnowledgeDocument) => console.log('Share document:', document),
  onLoadDocumentContent,
  selectedDocumentId,
  onAddKnowledge,
  onAddTeamContext,
  onDocumentUpdate,
}: KnowledgeViewProps) {
  const [activeContext, setActiveContext] = useState(contexts[0])
  const [isAddKnowledgeModalOpen, setIsAddKnowledgeModalOpen] = useState(false)
  const [isAddTeamContextModalOpen, setIsAddTeamContextModalOpen] = useState(false)
  const [isAddingKnowledge, setIsAddingKnowledge] = useState(false)

  useEffect(() => {
    if (!activeContext && contexts && contexts.length > 0) setActiveContext(contexts[0])
  }, [contexts])

  const handleAddKnowledge = (knowledge: Omit<Knowledge, 'id'>) => {
    if (onAddKnowledge) {
      setIsAddingKnowledge(true)
      onAddKnowledge(knowledge)
    }
    setIsAddKnowledgeModalOpen(false)
  }

  const handleAddTeamContext = (teamContext: TeamKnowledgeContext) => {
    if (onAddTeamContext) {
      onAddTeamContext(teamContext)
    }
    setIsAddTeamContextModalOpen(false)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-2 md:px-4 py-4 flex-shrink-0">
        {isAddingKnowledge && (
          <div className="absolute inset-0 bg-background/90 z-[9999] flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="font-semibold text-lg">Initializing document...</p>
          </div>
        )}

        {/* <DashboardHero
          title="Knowledge"
          description="Access, manage, and share all your team knowledge in one place."
          gradient="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600"
          primaryAction={
            onAddKnowledge
              ? {
                  label: 'Create',
                  onClick: () => setIsAddKnowledgeModalOpen(true),
                }
              : undefined
          }
          secondaryAction={
            onAddTeamContext
              ? {
                  label: 'Add Context',
                  onClick: () => setIsAddTeamContextModalOpen(true),
                }
              : undefined
          }
        /> */}

        {/* Context Tabs */}
        {contexts && contexts.length > 0 && (
          <div className="">
            <div className="">
              <nav className="-mb-px flex justify-between items-center">
                <div className="flex space-x-8 overflow-x-auto">
                  {contexts.map((context) => (
                    <button
                      key={context.id}
                      onClick={() => setActiveContext(context)}
                      className={`group inline-flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                        activeContext?.id === context.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                      }`}
                    >
                      {context.icon}
                      {context.label}
                    </button>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setIsAddKnowledgeModalOpen(true)}
                    className="inline-flex border border-primary rounded-xl items-center py-2 px-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
                  >
                    Add Knowledge
                  </button>
                  <button
                    onClick={() => setIsAddTeamContextModalOpen(true)}
                    className="inline-flex border border-primary rounded-xl items-center gap-2 py-2 px-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
                  >
                    Add Context
                  </button>
                </div>
              </nav>
            </div>

            {/* Active Context Description */}
            {activeContext?.description && (
              <div className="mt-3 px-1">
                <p className="text-sm text-primary">{activeContext?.description}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {activeContext ? (
        <div className="flex-1 min-h-0 px-2 md:px-4 pb-4">
          <div className="h-full rounded-xl border overflow-hidden">
            <KnowledgeBrowser
              documents={documents}
              menuConfig={activeContext?.menuConfig}
              onDocumentClick={onDocumentClick}
              onDocumentShare={onDocumentShare}
              selectedDocumentId={selectedDocumentId}
              onDocumentUpdate={onDocumentUpdate}
            />
          </div>
        </div>
      ) : (
        <div>
        <div className="flex-1 min-h-0 px-2 md:px-4 pb-4 flex items-center justify-center">
          <p className="text-muted-foreground">No contexts available</p>
        </div>
        <div className="flex-1 min-h-0 px-2 md:px-4 pb-4 flex items-center justify-center">
          <Button onClick={() => setIsAddTeamContextModalOpen(true)}>Add Context</Button>
        </div>
      </div>
      )
      }
      <>
        <AddTeamContext
          isOpen={isAddTeamContextModalOpen}
          onClose={() => setIsAddTeamContextModalOpen(false)}
          onAddTeamContext={handleAddTeamContext}
        />

        <AddKnowledgeModal
          isOpen={isAddKnowledgeModalOpen}
          onClose={() => setIsAddKnowledgeModalOpen(false)}
          onAddKnowledge={handleAddKnowledge}
          knowledgeContexts={contexts}
        />
      </>
    </div>
  )
}
