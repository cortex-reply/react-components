'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { Bot, Plus, X, Edit } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import type {
  Colleague,
  DigitalColleague,
  Knowledge,
  KnowledgeDocument,
  TypedDigitalColleague,
} from './types'
import { KnowledgeSearch } from './knowledge-search'

interface ColleagueFormProps {
  colleague?: DigitalColleague
  onSave: (colleague: TypedDigitalColleague) => void
  onCancel: () => void
  isLoading?: boolean
  title?: string
  submitLabel?: string
  cancelLabel?: string
  readOnly?: boolean
  availableKnowledgeDocuments?: Knowledge[]
}

export function ColleagueForm({
  colleague,
  onSave,
  onCancel,
  isLoading = false,
  title,
  submitLabel,
  cancelLabel = 'Cancel',
  readOnly = false,
  availableKnowledgeDocuments = [],
}: ColleagueFormProps) {
  const [formData, setFormData] = useState<Partial<TypedDigitalColleague>>({
    type: 'digital',
    name: '',
    description: '',
    jobDescription: '',
    workInstructions: '',
    capabilities: [],
    capabilityLevel: 0,
    // knowledge: [],
    coreKnowledge: null,
    // version: "1",
    ...colleague,
  })

  const [newSkill, setNewSkill] = useState('')
  const [newCapability, setNewCapability] = useState('')
  const [editMode, setEditMode] = useState(!readOnly)

  useEffect(() => {
    if (colleague) {
      setFormData(colleague)
    }
  }, [colleague])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Auto-increment version for updates, start at 1 for new colleagues
    // const currentVersion = formData.version ? parseInt(formData.version) : 0
    // const nextVersion = colleague ? (currentVersion + 1).toString() : '1'

    const digitalData: TypedDigitalColleague = {
      id: formData.id || parseInt(Date.now().toString()),
      name: formData.name!,
      type: 'digital',
      // status: 'active',
      // joinedDate: formData.joinedDate || new Date(),
      // lastActive: formData.lastActive || new Date(),
      description: formData.description,
      jobDescription: formData.jobDescription || '',
      workInstructions: formData.workInstructions || '',
      capabilities: formData.capabilities || [],
      capabilityLevel: formData.capabilityLevel || 0,
      // knowledge: formData.knowledge || [],
      coreKnowledge: formData.coreKnowledge || null,
      // version: nextVersion,
      // lastUpdated: formData.lastUpdated || new Date(),
      // isActive: true,
    } as TypedDigitalColleague
    onSave(digitalData)
  }

  const addArrayItem = (field: string, value: string, setter: (value: string) => void) => {
    if (!value.trim()) return

    const currentArray = (formData as any)[field] || []
    setFormData({
      ...formData,
      [field]: [...currentArray, value.trim()],
    })
    setter('')
  }

  const removeArrayItem = (field: string, index: number) => {
    const currentArray = (formData as any)[field] || []
    setFormData({
      ...formData,
      [field]: currentArray.filter((_: any, i: number) => i !== index),
    })
  }

  const handleEditToggle = (e: React.FormEvent) => {
    e.preventDefault()

    setEditMode(!editMode)
  }

  const renderArrayField = (
    field: string,
    label: string,
    newValue: string,
    setNewValue: (value: string) => void,
    placeholder: string,
  ) => {
    const items = (formData as any)[field] || []

    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        {editMode && (
          <div className="flex gap-2">
            <Input
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder={placeholder}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addArrayItem(field, newValue, setNewValue)
                }
              }}
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => addArrayItem(field, newValue, setNewValue)}
              disabled={isLoading}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {items.map((item: string, index: number) => (
            <Badge key={`${field}-${index}-${item}`} className="gap-1">
              {item}
              {editMode && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-accent hover:text-accent-foreground"
                  onClick={() => removeArrayItem(field, index)}
                  disabled={isLoading}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </Badge>
          ))}
        </div>
      </div>
    )
  }

  const formTitle =
    title || (!editMode ? 'View Colleague' : colleague ? 'Edit Colleague' : 'Add New Colleague')
  const buttonLabel = submitLabel || (colleague ? 'Update Colleague' : 'Add Colleague')

  return (
    <Card className="m-8 w-full max-w-4xl mx-auto overflow-y-scroll no-scrollbar">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          {formTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isLoading || !editMode}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Brief description of this digital colleague..."
                disabled={isLoading || !editMode}
              />
            </div>
          </div>

          {/* Digital Colleague Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Digital Colleague Details</h3>
            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description *</Label>
              <Textarea
                id="jobDescription"
                value={(formData as DigitalColleague).jobDescription || ''}
                onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                rows={4}
                required={formData.type === 'digital'}
                disabled={isLoading || !editMode}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workInstructions">Work Instructions</Label>
              <Textarea
                id="workInstructions"
                value={(formData as Partial<DigitalColleague>).workInstructions || ''}
                onChange={(e) => setFormData({ ...formData, workInstructions: e.target.value })}
                rows={4}
                placeholder="Enter detailed work instructions for this digital colleague..."
                disabled={isLoading || !editMode}
              />
            </div>
            {renderArrayField(
              'capabilities',
              'Capabilities',
              newCapability,
              setNewCapability,
              'Add capability',
            )}

            {/* <KnowledgeSearch
              selectedDocuments={(formData as Partial<DigitalColleague>).knowledge || []}
              onDocumentsChange={(documents) => setFormData({ ...formData, knowledge: documents })}
              label="Knowledge"
              placeholder="Search for knowledge documents to add..."
              disabled={isLoading || !editMode}
              availableDocuments={availableKnowledgeDocuments}
            /> */}

            <KnowledgeSearch
              selectedDocuments={
                formData.coreKnowledge
                  ? [
                      {
                        id: (formData.coreKnowledge as Knowledge)?.id?.toString(),
                        title: (formData.coreKnowledge as Knowledge)?.name,
                        format: 'markdown',
                        content: (formData.coreKnowledge as Knowledge)?.content || '',
                        createdAt: new Date((formData.coreKnowledge as Knowledge)?.createdAt),
                        description: (formData.coreKnowledge as Knowledge)?.description || '',
                        metadata: (formData.coreKnowledge as Knowledge)?.metadata || {},
                        updatedAt: new Date((formData.coreKnowledge as Knowledge)?.updatedAt),
                      },
                    ]
                  : []
              }
              onDocumentsChange={(documents) => {
                const coreKnowledge: Knowledge = {
                  createdAt: documents[0]?.createdAt.toISOString(),
                  id: parseInt(documents[0]?.id),
                  name: documents[0]?.title,
                  source: 'payload',
                  // source: 'payload',
                  updatedAt: (documents[0]?.updatedAt || new Date()).toISOString(),
                }
                console.log(documents)
                setFormData({
                  ...formData,
                  coreKnowledge: documents && documents.length > 0 ? coreKnowledge : undefined,
                })
              }}
              label="Core Knowledge"
              placeholder="Search for core knowledge documents..."
              maxSelections={1}
              disabled={isLoading || !editMode}
              availableDocuments={availableKnowledgeDocuments.map((doc) => ({
                id: doc.id.toString(),
                title: doc.name,
                name: doc.name,
                format: 'markdown',
                content: doc.content || '',
                createdAt: new Date(doc.createdAt),
                source: doc.source,
                description: doc.description || '',
                metadata: doc.metadata || {},
                updatedAt: new Date(doc.updatedAt),
              }))}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              {!editMode ? 'Close' : cancelLabel}
            </Button>
            {!editMode ? (
              <Button
                type="button"
                onClick={handleEditToggle}
                disabled={isLoading}
                className="gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : buttonLabel}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
