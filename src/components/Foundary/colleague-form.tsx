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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
  availableCapabilities?: Array<{
    relationTo: 'mcpTools' | 'capabilities' | 'internalTools' | 'digital-colleagues'
    value: number | { id: number; name: string }
  }>
  availableModels?: Array<{
    id: number | string
    name: string
  }>
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
  availableCapabilities = [],
  availableModels = [],
}: ColleagueFormProps) {
  const [formData, setFormData] = useState<Partial<TypedDigitalColleague>>(() => {
    // Get model from colleague.model or fallback to metadata.model for backward compatibility
    const model = (colleague as any)?.model || (colleague as any)?.metadata?.model || null

    return {
      type: 'digital' as const,
      name: '',
      description: '',
      jobDescription: '',
      workInstructions: '',
      capabilities: [],
      capabilityLevel: 0,
      coreKnowledge: null,
      ...colleague,
      // Ensure model is set correctly after spread
      model: model,
    }
  })

  const [newSkill, setNewSkill] = useState('')
  const [newCapability, setNewCapability] = useState('')
  const [selectedCapability, setSelectedCapability] = useState<string>('')
  const [editMode, setEditMode] = useState(!readOnly)

  // Get current model ID for the select value
  // model can be number (ID), Model object, or null
  const currentModel = formData.model
  const currentModelId = currentModel
    ? typeof currentModel === 'number'
      ? `${currentModel}`
      : typeof currentModel === 'object' && currentModel !== null && 'id' in currentModel
      ? `${(currentModel as any).id}`
      : ''
    : ''

  useEffect(() => {
    if (colleague) {
      // Get model from colleague.model or fallback to metadata.model for backward compatibility
      const model = (colleague as any)?.model || (colleague as any)?.metadata?.model || null
      setFormData({
        ...colleague,
        model: model,
      })
    }
  }, [colleague])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Auto-increment version for updates, start at 1 for new colleagues
    // const currentVersion = formData.version ? parseInt(formData.version) : 0
    // const nextVersion = colleague ? (currentVersion + 1).toString() : '1'

    const digitalData: TypedDigitalColleague = {
      id: formData.id || parseInt(Date.now().toString()),
      name: formData?.name!,
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
      model: formData.model || null,
      metadata: formData.metadata || {},
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

  const addCapability = () => {
    if (!selectedCapability) return

    const [relationTo, valueStr] = selectedCapability.split(':')
    if (!relationTo) return

    // Find the capability from availableCapabilities to get the actual value
    const availableCap = availableCapabilities.find(
      (cap) =>
        `${cap.relationTo}:${typeof cap.value === 'number' ? cap.value : cap.value.id}` ===
        selectedCapability,
    )

    if (!availableCap) return

    const currentCapabilities = (formData.capabilities as any[]) || []
    const newCapability = {
      relationTo: relationTo as
        | 'mcpTools'
        | 'capabilities'
        | 'internalTools'
        | 'digital-colleagues',
      value: availableCap.value, // Use the actual value (number or object)
    }

    // Check if capability already exists
    const exists = currentCapabilities.some((cap: any) => {
      const capValue = typeof cap.value === 'object' ? cap.value.id : cap.value
      const newCapValue =
        typeof newCapability.value === 'object' ? newCapability.value.id : newCapability.value
      return cap.relationTo === newCapability.relationTo && capValue === newCapValue
    })

    if (!exists) {
      setFormData({
        ...formData,
        capabilities: [...currentCapabilities, newCapability],
      })
      setSelectedCapability('')
    }
  }

  const removeCapability = (index: number) => {
    const currentCapabilities = (formData.capabilities as any[]) || []
    setFormData({
      ...formData,
      capabilities: currentCapabilities.filter((_: any, i: number) => i !== index),
    })
  }

  const handleModelChange = (modelId: string) => {
    if (!modelId || modelId === '__none__') {
      // Clear model if none value selected
      setFormData({
        ...formData,
        model: null,
      })
      return
    }

    const model = availableModels.find((m) => `${m.id}` === modelId)

    if (model) {
      // Store model ID as number (DigitalColleague.model can be number | Model | null)
      // Convert id to number if it's a string
      const modelIdNum = typeof model.id === 'string' ? parseInt(model.id, 10) : model.id
      setFormData({
        ...formData,
        model: isNaN(modelIdNum) ? null : modelIdNum,
      })
    }
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
      <CardContent className="overflow-y-scroll no-scrollbar">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData?.name || ''}
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
            {/* Capabilities Field */}
            <div className="space-y-2">
              <Label>Capabilities</Label>
              {editMode && availableCapabilities.length > 0 && (
                <div className="flex gap-2">
                  <Select
                    value={selectedCapability}
                    onValueChange={setSelectedCapability}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a capability" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCapabilities
                        .filter((cap) => {
                          const currentCapabilities = (formData.capabilities as any[]) || []
                          const capValue = typeof cap.value === 'object' ? cap.value.id : cap.value
                          return !currentCapabilities.some((existingCap: any) => {
                            const existingValue =
                              typeof existingCap.value === 'object'
                                ? existingCap.value.id
                                : existingCap.value
                            return (
                              existingCap.relationTo === cap.relationTo &&
                              existingValue === capValue
                            )
                          })
                        })
                        .map((cap, index) => {
                          const capValue = typeof cap.value === 'object' ? cap.value.id : cap.value
                          const capName = typeof cap.value === 'object' ? cap.value.name : undefined
                          const key = `${cap.relationTo}:${capValue}`
                          const label = capName
                            ? `${cap.relationTo}: ${capName}`
                            : `${cap.relationTo} (ID: ${capValue})`
                          return (
                            <SelectItem key={key} value={key}>
                              {label}
                            </SelectItem>
                          )
                        })}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={addCapability}
                    disabled={isLoading || !selectedCapability}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              {editMode && availableCapabilities.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  No capabilities available. Please provide availableCapabilities prop.
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {(formData.capabilities as any[])?.map((cap: any, index: number) => {
                  let displayLabel: string
                  if (typeof cap === 'string') {
                    displayLabel = cap
                  } else {
                    const capValue = typeof cap.value === 'object' ? cap.value.id : cap.value
                    const capName = typeof cap.value === 'object' ? cap.value.name : undefined
                    displayLabel = capName
                      ? `${cap.relationTo}: ${capName}`
                      : `${cap.relationTo} (ID: ${capValue})`
                  }
                  return (
                    <Badge key={`capability-${index}`} className="gap-1">
                      {displayLabel}
                      {editMode && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-accent hover:text-accent-foreground"
                          onClick={() => removeCapability(index)}
                          disabled={isLoading}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </Badge>
                  )
                })}
              </div>
            </div>

            {/* Model Field */}
            <div className="space-y-2">
              <Label>Model</Label>
              {editMode && availableModels.length > 0 ? (
                <Select
                  value={currentModelId || '__none__'}
                  onValueChange={handleModelChange}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">None</SelectItem>
                    {availableModels.map((model) => {
                      const key = `${model.id}`
                      return (
                        <SelectItem key={key} value={key}>
                          {model.name}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              ) : editMode && availableModels.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No models available. Please provide availableModels prop.
                </div>
              ) : (
                <div className="text-sm">
                  {formData.model
                    ? typeof formData.model === 'number'
                      ? `Model ${formData.model}`
                      : typeof formData.model === 'object' &&
                        formData.model !== null &&
                        'name' in formData.model
                      ? (formData.model as any).name || `Model ${(formData.model as any).id}`
                      : `Model ${formData.model}`
                    : 'No model selected'}
                </div>
              )}
            </div>

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
                title: doc?.name,
                name: doc?.name,
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
