import { Knowledge } from '../types'
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { Plus, Save, X } from 'lucide-react'
import { KnowledgeContext } from '../types'
import React, { useState } from 'react'

interface AddKnowledgeModalProps {
  isOpen: boolean
  onClose: () => void
  onAddKnowledge: (knowledge: Omit<Knowledge, 'id'>) => void
  knowledgeContexts: KnowledgeContext[]
}

export const AddKnowledgeModal: React.FC<AddKnowledgeModalProps> = ({
  isOpen,
  onClose,
  onAddKnowledge,
  knowledgeContexts,
}) => {
  const getSuggestedMetadataKeys = () => {
    const keysFromContexts = new Set<string>()

    // Get keys from knowledge contexts (used for grouping)
    knowledgeContexts.forEach((context) => {
      context.menuConfig.groupBy.forEach((key) => keysFromContexts.add(key))
    })

    return {
      contextKeys: Array.from(keysFromContexts).sort(),
      allKeys: Array.from(keysFromContexts).sort(),
    }
  }

  const [formData, setFormData] = useState(() => {
    const suggestedKeys = getSuggestedMetadataKeys()
    return {
      name: '',
      description: '',
      metadata: suggestedKeys.contextKeys.length > 0 
        ? suggestedKeys.contextKeys.map(key => ({ key, value: '' }))
        : [{ key: '', value: '' }] as { key: string; value: string }[],
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name) {
      return
    }

    // Only include metadata entries that have both key and value
    const filteredMetadata = formData.metadata.filter(
      (item) => item.key && item.key.trim() && item.value && item.value.trim()
    )

    onAddKnowledge({
      name: formData.name,
      description: formData.description,
      metadata: filteredMetadata,
      source: 'payload',
      visibility: 'public',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // isActive: formData.isActive,
      // isSelected: false,
    })

    // Reset form
    const suggestedKeys = getSuggestedMetadataKeys()
    setFormData({
      name: '',
      description: '',
      metadata: suggestedKeys.contextKeys.length > 0 
        ? suggestedKeys.contextKeys.map(key => ({ key, value: '' }))
        : [{ key: '', value: '' }] as { key: string; value: string }[],
      // isActive: false,
    })

    onClose()
  }

  const handleClose = () => {
    const suggestedKeys = getSuggestedMetadataKeys()
    setFormData({
      name: '',
      description: '',
      metadata: suggestedKeys.contextKeys.length > 0 
        ? suggestedKeys.contextKeys.map(key => ({ key, value: '' }))
        : [{ key: '', value: '' }] as { key: string; value: string }[],
      // isActive: false,
    })
    onClose()
  }

  const suggestedKeys = getSuggestedMetadataKeys()

  // Get suggested values for a specific metadata key
  const getSuggestedValues = (key: string) => {
    const values = new Set<string>()

    return Array.from(values).sort()
  }

  const handleMetadataChange = (key: string, value: string) => {
    setFormData((prev) => {
      const prevItem = prev.metadata.find((item) => item.key === key)
      if (prevItem) {
        prevItem.value = value
      }
      return {
        ...prev,
        metadata: [...prev.metadata.filter((item) => item.key !== key), { key, value }],
      }
    })
  }

  const handleMetadataValueSelect = (key: string, value: string) => {
    if (value === '__custom__') {
      // Just clear the value and let user type in the select field
      handleMetadataChange(key, '')
    } else {
      handleMetadataChange(key, value)
    }
  }

  const handleAddMetadataField = () => {
    handleMetadataChange(' ', '')
  }

  const handleRemoveMetadataField = (key: string) => {
    setFormData((prev) => {
      const newMetadata = [...prev.metadata]
      const index = newMetadata.findIndex((item) => item.key === key)
      if (index !== -1) {
        newMetadata.splice(index, 1)
      }
      return { ...prev, metadata: newMetadata }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Knowledge source</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="name">Description</Label>
              <Input
                id="name"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <Label htmlFor="metadata">Metadata</Label>
                  {suggestedKeys.contextKeys.length > 0 ? (
                    <p className="text-xs text-muted-foreground">
                      Context keys: {suggestedKeys.contextKeys.slice(0, 4).join(', ')}
                      {suggestedKeys.contextKeys.length > 4 &&
                        ` +${suggestedKeys.contextKeys.length - 4} more`} • Fill in values or add more fields
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Add key-value metadata to organize and categorize your knowledge
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddMetadataField}
                  className="gap-1 h-8"
                >
                  <Plus className="h-3 w-3" />
                  Add
                </Button>
              </div>

              <div className="space-y-2">
                {formData.metadata.map(({ key, value }, index) => {
                  const suggestedValues = getSuggestedValues(key)
                  return (
                    <div key={`metadata-key-${index}`} className="flex gap-2 items-center">
                      <Input
                        value={key}
                        onChange={(e) => {
                          const newKey = e.target.value || ' '

                          const oldValue = formData.metadata.find(
                            (item) => item.key === key,
                          )?.value
                          setFormData((prev) => {
                            const newMetadata = [...prev.metadata]
                            const index = newMetadata.findIndex((item) => item.key === key)
                            if (index !== -1) {
                              newMetadata.splice(index, 1)
                            }
                            if (newKey) {
                              newMetadata.push({
                                key: newKey,
                                value: oldValue || '',
                              })
                            }
                            return { ...prev, metadata: newMetadata }
                          })
                          e.target.focus()
                        }}
                        placeholder={suggestedKeys.allKeys.length > 0 ? `e.g., ${suggestedKeys.allKeys[0]}` : "Key"}
                        className="w-32 h-8 text-sm"
                        list={`metadata-keys-${key}`}
                      />
                      <datalist id={`metadata-keys-${key}`}>
                        {suggestedKeys.allKeys.map((suggestedKey) => (
                          <option key={suggestedKey} value={suggestedKey} />
                        ))}
                      </datalist>

                      <span className="text-muted-foreground text-sm">=</span>

                      {suggestedValues.length > 0 ? (
                        <Select
                          value={String(value || '')}
                          onValueChange={(newValue) => handleMetadataValueSelect(key, newValue)}
                        >
                          <SelectTrigger className="flex-1 h-8 text-sm">
                            <SelectValue placeholder="Value" />
                          </SelectTrigger>
                          <SelectContent>
                            {suggestedValues.map((suggestedValue) => (
                              <SelectItem key={suggestedValue} value={suggestedValue}>
                                {suggestedValue}
                              </SelectItem>
                            ))}
                            <SelectItem value="__custom__">
                              <span className="text-muted-foreground text-xs">Custom...</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          value={String(value || '')}
                          onChange={(e) => handleMetadataChange(key, e.target.value)}
                          placeholder="Value"
                          className="flex-1 h-8 text-sm"
                        />
                      )}

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMetadataField(key)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Format:</span>
              <Badge variant="secondary" className="font-mono">
                {formData.metadata.map(({ key, value }) => `${key}: ${value}`).join(', ')}
              </Badge>
            </div> */}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" size="sm" onClick={onClose} className="gap-2">
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4" />
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
