'use client'

import { motion } from 'motion/react'
import { Edit3, Save, X, Plus, ChevronDown, ChevronRight, Info, File, FileText, Type } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EditableField } from '@/components/AdvancedComponents/EditableField'
import type { KnowledgeDocument, KnowledgeContext } from './types'
import RichText from './RichText'

interface DocumentEditProps {
  document: KnowledgeDocument
  onSave: (document: KnowledgeDocument) => void
  mode?: 'create' | 'edit'
  onCancel: () => void
  availableDocuments?: KnowledgeDocument[]
  knowledgeContexts?: KnowledgeContext[]
}

export function DocumentEdit({
  document,
  onSave,
  mode = 'edit',
  onCancel,
  availableDocuments = [],
  knowledgeContexts = [],
}: DocumentEditProps) {
  const [editedDocument, setEditedDocument] = useState<KnowledgeDocument>({
    ...document,
    updatedAt: new Date(),
  })
  const [isMetadataExpanded, setIsMetadataExpanded] = useState(false)
  const [richTextContent, setRichTextContent] = useState<any>(editedDocument.richTextContent)

  useEffect(() => {
    setEditedDocument(document)
  }, [document])

  const formatIcon = (format: string) => {
    switch (format) {
      case 'markdown':
      case 'mdx':
        return <FileText className="h-6 w-6 text-primary" />
      case 'richText':
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
      case 'richText':
        return 'bg-success/10 text-success border-success/20'
      case 'text':
        return 'bg-muted/50 text-muted-foreground border-muted-foreground/20'
      default:
        return 'bg-muted text-muted-foreground border-border'
    }
  }

  // Extract suggested metadata keys from knowledge contexts and existing documents
  const getSuggestedMetadataKeys = () => {
    const keysFromContexts = new Set<string>()
    const keysFromDocuments = new Set<string>()

    // Get keys from knowledge contexts (used for grouping)
    knowledgeContexts.forEach((context) => {
      context.menuConfig.groupBy.forEach((key) => keysFromContexts.add(key))
    })

    // Get keys from existing documents
    availableDocuments.forEach((doc) => {
      if (doc.metadata) {
        Object.keys(doc.metadata).forEach((key) => keysFromDocuments.add(key))
      }
    })

    return {
      contextKeys: Array.from(keysFromContexts).sort(),
      documentKeys: Array.from(keysFromDocuments).sort(),
      allKeys: Array.from(new Set([...keysFromContexts, ...keysFromDocuments])).sort(),
    }
  }

  // Get suggested values for a specific metadata key
  const getSuggestedValues = (key: string) => {
    const values = new Set<string>()
    availableDocuments.forEach((doc) => {
      if (doc.metadata?.[key]) {
        values.add(String(doc.metadata[key]))
      }
    })
    return Array.from(values).sort()
  }

  const suggestedKeys = getSuggestedMetadataKeys()

  const handleSave = () => {
    onSave({ ...editedDocument, richTextContent })
  }

  const handleMetadataChange = (key: string, value: string) => {
    setEditedDocument((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [key]: value,
      },
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
    handleMetadataChange('', '')
  }

  const handleRemoveMetadataField = (key: string) => {
    setEditedDocument((prev) => {
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
      className="h-screen flex flex-col"
    >
      {/* Header */}
      <div className="border-b border-border bg-card p-8 pb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* <div className="flex-shrink-0 p-3 rounded-xl bg-muted border border-border">
              {formatIcon(editedDocument.format)}
            </div> */}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-4 mb-0 leading-tight">
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
            {/* Metadata Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMetadataExpanded(!isMetadataExpanded)}
              className="gap-2"
            >
              <Info className="h-4 w-4" />
              Metadata
              {editedDocument.metadata && Object.keys(editedDocument.metadata).length > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  {Object.keys(editedDocument.metadata).length}
                </span>
              )}
              {isMetadataExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>

            <Button variant="outline" size="sm" onClick={onCancel} className="gap-2">
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save
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
          className="overflow-hidden h-full max-h-full"
        >
          <div className="pt-4 border-t border-border mt-4 h-screen max-h-full flex">
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

            {/* {suggestedKeys.contextKeys.length > 0 && (
              <p className="text-xs text-muted-foreground mb-3">
                Suggested: {suggestedKeys.contextKeys.slice(0, 4).join(', ')}
                {suggestedKeys.contextKeys.length > 4 &&
                  ` +${suggestedKeys.contextKeys.length - 4} more`}
              </p>
            )} */}
            
            <div className="bg-muted rounded-lg p-4 border border-border">
              {editedDocument.metadata && Object.keys(editedDocument.metadata).length > 0 ? (
                <div className="space-y-2">
                  {Object.entries(editedDocument.metadata).map(([key, value], index) => {
                    const suggestedValues = getSuggestedValues(key)
                    return (
                      <div key={`metadata-key-${index}`} className="flex gap-2 items-center">
                        <Input
                          value={key}
                          onChange={(e) => {
                            const newKey = e.target.value || ''
                            const oldValue = editedDocument.metadata?.[key]
                            setEditedDocument((prev) => {
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
      <div className="flex-1 overflow-hidden">
        <div className="p-8 h-full max-h-full overflow-auto">
          {/* <label className="block text-sm font-medium text-foreground mb-4">Content</label> */}
          {editedDocument.format === 'richText' ? (
            <RichText
              setValue={setRichTextContent}
              value={richTextContent}
              name="richTextContent"
            />
          ) : (
            <Textarea
              value={editedDocument.content || ''}
              onChange={(e) => setEditedDocument((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="Document content..."
              className="min-h-[400px] font-mono text-sm"
              style={{ resize: 'vertical' }}
            />
          )}
        </div>
      </div>
    </motion.div>
  )
}
