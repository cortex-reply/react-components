"use client"

import { motion } from "motion/react"
import { Edit3, Save, X, Plus } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { KnowledgeDocument, KnowledgeContext } from "./types"

interface DocumentEditProps {
  document: KnowledgeDocument
  onSave: (document: KnowledgeDocument) => void
  onCancel: () => void
  availableDocuments?: KnowledgeDocument[]
  knowledgeContexts?: KnowledgeContext[]
}

export function DocumentEdit({ 
  document, 
  onSave, 
  onCancel,
  availableDocuments = [],
  knowledgeContexts = []
}: DocumentEditProps) {
  const [editedDocument, setEditedDocument] = useState<KnowledgeDocument>({
    ...document,
    updatedAt: new Date()
  })

  // Extract suggested metadata keys from knowledge contexts and existing documents
  const getSuggestedMetadataKeys = () => {
    const keysFromContexts = new Set<string>()
    const keysFromDocuments = new Set<string>()
    
    // Get keys from knowledge contexts (used for grouping)
    knowledgeContexts.forEach(context => {
      context.menuConfig.groupBy.forEach(key => keysFromContexts.add(key))
    })
    
    // Get keys from existing documents
    availableDocuments.forEach(doc => {
      if (doc.metadata) {
        Object.keys(doc.metadata).forEach(key => keysFromDocuments.add(key))
      }
    })
    
    return {
      contextKeys: Array.from(keysFromContexts).sort(),
      documentKeys: Array.from(keysFromDocuments).sort(),
      allKeys: Array.from(new Set([...keysFromContexts, ...keysFromDocuments])).sort()
    }
  }

  // Get suggested values for a specific metadata key
  const getSuggestedValues = (key: string) => {
    const values = new Set<string>()
    availableDocuments.forEach(doc => {
      if (doc.metadata?.[key]) {
        values.add(String(doc.metadata[key]))
      }
    })
    return Array.from(values).sort()
  }

  const suggestedKeys = getSuggestedMetadataKeys()

  const handleSave = () => {
    onSave(editedDocument)
  }

  const handleMetadataChange = (key: string, value: string) => {
    setEditedDocument(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [key]: value
      }
    }))
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
    const newKey = `field_${Date.now()}`
    handleMetadataChange(newKey, '')
  }

  const handleRemoveMetadataField = (key: string) => {
    setEditedDocument(prev => {
      const newMetadata = { ...prev.metadata }
      delete newMetadata[key]
      return { ...prev, metadata: newMetadata }
    })
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="border-b border-border bg-card p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Edit3 className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Edit Document</h1>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Title
            </label>
            <Input
              value={editedDocument.title}
              onChange={(e) => setEditedDocument(prev => ({ ...prev, title: e.target.value }))}
              className="text-lg font-semibold"
              placeholder="Document title..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <Textarea
              value={editedDocument.description || ''}
              onChange={(e) => setEditedDocument(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Document description..."
              rows={2}
            />
          </div>

          {/* Metadata Fields */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Metadata
                </label>
                {suggestedKeys.contextKeys.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Suggested: {suggestedKeys.contextKeys.slice(0, 4).join(', ')}
                    {suggestedKeys.contextKeys.length > 4 && ` +${suggestedKeys.contextKeys.length - 4}`}
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
            
            {editedDocument.metadata && Object.keys(editedDocument.metadata).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(editedDocument.metadata).map(([key, value]) => {
                  const suggestedValues = getSuggestedValues(key)
                  return (
                    <div key={key} className="flex gap-2 items-center">
                      <Input
                        value={key}
                        onChange={(e) => {
                          const newKey = e.target.value
                          const oldValue = editedDocument.metadata?.[key]
                          setEditedDocument(prev => {
                            const newMetadata = { ...prev.metadata }
                            delete newMetadata[key]
                            if (newKey) {
                              newMetadata[newKey] = oldValue || ''
                            }
                            return { ...prev, metadata: newMetadata }
                          })
                        }}
                        placeholder="Key"
                        className="w-32 h-8 text-sm"
                        list={`metadata-keys-${key}`}
                      />
                      <datalist id={`metadata-keys-${key}`}>
                        {suggestedKeys.allKeys.map(suggestedKey => (
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
                            {suggestedValues.map(suggestedValue => (
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
            ) : (
              <div className="text-center py-3 border border-dashed border-border rounded-lg bg-muted/20">
                <p className="text-xs text-muted-foreground">
                  No metadata • Click "Add" to create fields
                </p>
              </div>
            )}
          </div>

          {/* Format Display */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Format:</span>
            <Badge variant="secondary" className="font-mono">
              {editedDocument.format.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <label className="block text-sm font-medium text-foreground mb-4">
            Content
          </label>
          <Textarea
            value={editedDocument.content || ''}
            onChange={(e) => setEditedDocument(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Document content..."
            className="min-h-[400px] font-mono text-sm"
            style={{ resize: 'vertical' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
