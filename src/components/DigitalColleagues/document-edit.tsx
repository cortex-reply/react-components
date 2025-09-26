"use client"

import { motion } from "motion/react"
import { File, FileText, Edit3, Save, X, Plus, Type, ChevronDown, ChevronRight, Info } from "lucide-react"
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EditableField } from "@/components/AdvancedComponents/EditableField"
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
  const [isMetadataExpanded, setIsMetadataExpanded] = useState(false)
  
  // Keep track of metadata fields with stable IDs for React reconciliation
  const [metadataFields, setMetadataFields] = useState(() => {
    const fields: Array<{id: string, key: string, value: string, isContextKey: boolean}> = []
    let idCounter = 0
    
    // First, add all context keys as default fields (empty values)
    const contextKeys = new Set<string>()
    knowledgeContexts.forEach(context => {
      context.menuConfig.groupBy.forEach(key => contextKeys.add(key))
    })
    
    contextKeys.forEach(key => {
      fields.push({
        id: `context_field_${idCounter++}`,
        key,
        value: document.metadata?.[key] ? String(document.metadata[key]) : '',
        isContextKey: true
      })
    })
    
    // Then add any existing metadata that isn't already a context key
    if (document.metadata) {
      Object.entries(document.metadata).forEach(([key, value]) => {
        if (!contextKeys.has(key)) {
          fields.push({
            id: `existing_field_${idCounter++}`,
            key,
            value: String(value),
            isContextKey: false
          })
        }
      })
    }
    
    return fields
  })

  const formatIcon = (format: string) => {
    switch (format) {
      case 'markdown':
      case 'mdx':
        return <FileText className="h-6 w-6 text-primary" />
      case 'richtext':
        return <File className="h-6 w-6 text-success" />
      case 'text':
        return <Type className="h-6 w-6 text-muted-foreground" />
      default:
        return <File className="h-6 w-6 text-muted-foreground" />
    }
  }

  const formatBadgeColor = (format: string) => {
    switch (format) {
      case 'markdown':
        return 'bg-primary/10 text-primary border-primary/20'
      case 'mdx':
        return 'bg-secondary/10 text-secondary border-secondary/20'
      case 'richtext':
        return 'bg-success/10 text-success border-success/20'
      case 'text':
        return 'bg-muted/50 text-muted-foreground border-muted-foreground/20'
      default:
        return 'bg-muted text-muted-foreground border-border'
    }
  }

  // Extract suggested metadata keys from existing documents only
  const getSuggestedMetadataKeys = () => {
    const keysFromDocuments = new Set<string>()
    
    // Get keys from existing documents
    availableDocuments.forEach(doc => {
      if (doc.metadata) {
        Object.keys(doc.metadata).forEach(key => keysFromDocuments.add(key))
      }
    })
    
    return {
      documentKeys: Array.from(keysFromDocuments).sort()
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

  // Update document metadata when metadataFields changes
  useEffect(() => {
    // Convert metadataFields back to document metadata format, filtering out empty keys and empty values
    const metadata = metadataFields
      .filter(field => field.key.trim() !== '' && field.value.trim() !== '')
      .reduce((acc, field) => ({
        ...acc,
        [field.key]: field.value
      }), {})
    
    setEditedDocument(prev => ({
      ...prev,
      metadata: Object.keys(metadata).length > 0 ? metadata : undefined
    }))
  }, [metadataFields])

  const handleMetadataKeyChange = (fieldId: string, newKey: string) => {
    setMetadataFields(prev => 
      prev.map(field => 
        field.id === fieldId 
          ? { ...field, key: newKey }
          : field
      )
    )
  }

  const handleMetadataValueChange = (fieldId: string, newValue: string) => {
    setMetadataFields(prev => 
      prev.map(field => 
        field.id === fieldId 
          ? { ...field, value: newValue }
          : field
      )
    )
  }

  const handleMetadataValueSelect = (fieldId: string, value: string) => {
    if (value === '__custom__') {
      // Just clear the value and let user type in the select field
      handleMetadataValueChange(fieldId, '')
    } else {
      handleMetadataValueChange(fieldId, value)
    }
  }

  const handleAddMetadataField = () => {
    const newField = {
      id: `field_${Date.now()}`,
      key: '',
      value: '',
      isContextKey: false
    }
    setMetadataFields(prev => [...prev, newField])
  }

  const handleRemoveMetadataField = (fieldId: string) => {
    setMetadataFields(prev => prev.filter(field => field.id !== fieldId))
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="border-b border-border bg-card p-8 pb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="flex-shrink-0 p-3 rounded-xl bg-muted border border-border">
              {formatIcon(editedDocument.format)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-4 mb-2 leading-tight">
                <div className="flex-1 min-w-0">
                  <EditableField
                    fieldName="title"
                    value={editedDocument.title}
                    label=""
                    onSave={(fieldName, value) => setEditedDocument(prev => ({ ...prev, title: value }))}
                    className="[&>div:last-child]:text-2xl [&>div:last-child]:font-bold [&>div:last-child]:leading-tight [&>div:last-child]:text-foreground [&>div:last-child]:p-0 [&>div:last-child]:border-0 [&>div:last-child]:hover:bg-muted/30 [&>div:last-child]:min-h-0"
                  />
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${formatBadgeColor(editedDocument.format)} flex-shrink-0 mt-1`}>
                  {editedDocument.format.toUpperCase()}
                </span>
              </div>
              
              <div className="mt-2">
                <EditableField
                  fieldName="description"
                  value={editedDocument.description || 'Click to add description...'}
                  label=""
                  multiline={true}
                  onSave={(fieldName, value) => setEditedDocument(prev => ({ ...prev, description: value }))}
                  className="[&>div:last-child]:text-muted-foreground [&>div:last-child]:text-lg [&>div:last-child]:leading-relaxed [&>div:last-child]:p-0 [&>div:last-child]:border-0 [&>div:last-child]:hover:bg-muted/30 [&>div:last-child]:min-h-0"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Metadata Toggle - Always visible in edit mode */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMetadataExpanded(!isMetadataExpanded)}
              className="gap-2"
            >
              <Info className="h-4 w-4" />
              Metadata
              {metadataFields.filter(field => field.key.trim() !== '' && field.value.trim() !== '').length > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  {metadataFields.filter(field => field.key.trim() !== '' && field.value.trim() !== '').length}
                </span>
              )}
              {isMetadataExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>

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

        {/* Collapsible Metadata Section */}
        <motion.div
          initial={false}
          animate={{ 
            height: isMetadataExpanded ? 'auto' : 0,
            opacity: isMetadataExpanded ? 1 : 0
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-border mt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Info className="h-4 w-4" />
                Document Metadata
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddMetadataField}
                className="gap-1 h-8"
              >
                <Plus className="h-3 w-3" />
                Add Field
              </Button>
            </div>

            {suggestedKeys.documentKeys.length > 0 && (
              <p className="text-xs text-muted-foreground mb-3">
                Additional from documents: {suggestedKeys.documentKeys.slice(0, 4).join(', ')}
                {suggestedKeys.documentKeys.length > 4 && ` +${suggestedKeys.documentKeys.length - 4} more`}
              </p>
            )}
            
            <div className="bg-muted rounded-lg p-4 border border-border">
              {metadataFields.length > 0 ? (
                <div className="space-y-2">
                  {metadataFields.map((field) => {
                    const suggestedValues = getSuggestedValues(field.key)
                    return (
                      <div key={field.id} className="flex gap-2 items-center">
                        <Input
                          value={field.key}
                          onChange={(e) => handleMetadataKeyChange(field.id, e.target.value)}
                          placeholder="Key"
                          className={`w-32 h-8 text-sm ${field.isContextKey ? 'bg-primary/5 border-primary/30' : ''}`}
                          list={`metadata-keys-${field.id}`}
                          disabled={field.isContextKey}
                        />
                        <datalist id={`metadata-keys-${field.id}`}>
                          {suggestedKeys.documentKeys.map((suggestedKey: string) => (
                            <option key={suggestedKey} value={suggestedKey} />
                          ))}
                        </datalist>
                        
                        <span className="text-muted-foreground text-sm">=</span>
                        
                        {suggestedValues.length > 0 ? (
                          <Select 
                            value={field.value || ''} 
                            onValueChange={(newValue) => handleMetadataValueSelect(field.id, newValue)}
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
                            value={field.value || ''}
                            onChange={(e) => handleMetadataValueChange(field.id, e.target.value)}
                            placeholder="Value"
                            className="flex-1 h-8 text-sm"
                          />
                        )}
                        
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMetadataField(field.id)}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    No metadata fields
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Click "Add Field" to create metadata
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
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
