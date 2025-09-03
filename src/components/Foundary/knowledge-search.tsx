"use client"

import { useState, useEffect } from "react"
import { Search, Plus, X, FileText, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { KnowledgeDocument } from "./types"

interface KnowledgeSearchProps {
  selectedDocuments: KnowledgeDocument[]
  onDocumentsChange: (documents: KnowledgeDocument[]) => void
  availableDocuments: KnowledgeDocument[]
  label: string
  placeholder?: string
  maxSelections?: number
  disabled?: boolean
}

export function KnowledgeSearch({
  selectedDocuments,
  onDocumentsChange,
  availableDocuments,
  label,
  placeholder = "Search knowledge documents...",
  maxSelections,
  disabled = false,
}: KnowledgeSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredDocuments, setFilteredDocuments] = useState<KnowledgeDocument[]>([])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredDocuments([])
      setShowResults(false)
      return
    }

    const filtered = availableDocuments.filter((doc) => {
      const selectedIds = selectedDocuments.map((d) => d.id)
      if (selectedIds.includes(doc.id)) return false

      const searchLower = searchTerm.toLowerCase()
      return (
        doc.title.toLowerCase().includes(searchLower) ||
        doc.description?.toLowerCase().includes(searchLower) ||
        doc.tags?.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        Object.values(doc.metadata || {}).some((value) =>
          String(value).toLowerCase().includes(searchLower)
        )
      )
    })

    setFilteredDocuments(filtered)
    setShowResults(true)
  }, [searchTerm, selectedDocuments, availableDocuments])

  const handleSelectDocument = (document: KnowledgeDocument) => {
    if (maxSelections && selectedDocuments.length >= maxSelections) {
      return
    }

    onDocumentsChange([...selectedDocuments, document])
    setSearchTerm("")
    setShowResults(false)
  }

  const handleRemoveDocument = (documentId: string) => {
    onDocumentsChange(selectedDocuments.filter((doc) => doc.id !== documentId))
  }

  const canAddMore = !maxSelections || selectedDocuments.length < maxSelections

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={canAddMore ? placeholder : `Maximum ${maxSelections} documents selected`}
            className="pl-9"
            disabled={disabled || !canAddMore}
            onFocus={() => searchTerm && setShowResults(true)}
          />
        </div>

        {/* Search Results Dropdown */}
        {showResults && filteredDocuments.length > 0 && (
          <Card className="absolute top-full left-0 right-0 z-10 mt-1 max-h-60">
            <ScrollArea className="h-full">
              <CardContent className="p-2">
                {filteredDocuments.map((doc) => (
                  <Button
                    key={doc.id}
                    variant="ghost"
                    className="w-full justify-start h-auto p-3 mb-1"
                    onClick={() => handleSelectDocument(doc)}
                    disabled={disabled}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <FileText className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <div className="text-left flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{doc.title}</div>
                        {doc.description && (
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {doc.description}
                          </div>
                        )}
                        {doc.tags && doc.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {doc.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {doc.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{doc.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </ScrollArea>
          </Card>
        )}

        {/* No Results */}
        {showResults && searchTerm && filteredDocuments.length === 0 && (
          <Card className="absolute top-full left-0 right-0 z-10 mt-1">
            <CardContent className="p-4 text-center text-sm text-muted-foreground">
              No knowledge documents found for "{searchTerm}"
            </CardContent>
          </Card>
        )}
      </div>

      {/* Selected Documents */}
      {selectedDocuments.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            Selected ({selectedDocuments.length}
            {maxSelections && `/${maxSelections}`})
          </div>
          <div className="space-y-2">
            {selectedDocuments.map((doc) => (
              <Card key={doc.id} className="p-3">
                <div className="flex items-start gap-3">
                  <FileText className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{doc.title}</div>
                    {doc.description && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {doc.description}
                      </div>
                    )}
                    {doc.tags && doc.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {doc.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 flex-shrink-0"
                    onClick={() => handleRemoveDocument(doc.id)}
                    disabled={disabled}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Click outside to close results */}
      {showResults && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  )
}
