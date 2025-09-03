"use client"

import { motion } from "motion/react"
import { ChevronDown, ChevronRight, File, FileText, Folder, Search } from "lucide-react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DocumentPreview } from "./document-preview"
import type { KnowledgeDocument, KnowledgeMenuConfig, KnowledgeHierarchy } from "./types"

interface KnowledgeBrowserProps {
  documents: KnowledgeDocument[]
  menuConfig: KnowledgeMenuConfig
  onDocumentClick?: (document: KnowledgeDocument) => void
  onDocumentShare?: (document: KnowledgeDocument) => void
  onDocumentUpdate?: (document: KnowledgeDocument) => void
  selectedDocumentId?: string
  className?: string
  editable?: boolean
}

interface MenuItemProps {
  label: string
  documents: KnowledgeDocument[]
  children?: KnowledgeHierarchy
  level: number
  onDocumentClick?: (document: KnowledgeDocument) => void
  selectedDocumentId?: string
  showDocumentCount?: boolean
}

function MenuItem({ 
  label, 
  documents, 
  children, 
  level, 
  onDocumentClick, 
  selectedDocumentId,
  showDocumentCount = true 
}: MenuItemProps) {
  const [isExpanded, setIsExpanded] = useState(level === 0)
  const hasChildren = children && Object.keys(children).length > 0
  const totalDocuments = documents.length + (children ? Object.values(children).reduce((acc, child) => acc + child.documents.length, 0) : 0)

  const formatDocumentIcon = (format: string) => {
    switch (format) {
      case 'markdown':
      case 'mdx':
        return <FileText className="h-3.5 w-3.5 text-muted-foreground" />
      case 'richtext':
        return <File className="h-3.5 w-3.5 text-muted-foreground" />
      default:
        return <File className="h-3.5 w-3.5 text-muted-foreground" />
    }
  }

  const getCategoryColor = (level: number) => {
    const colors = [
      'bg-primary',
      'bg-secondary', 
      'bg-accent',
      'bg-chart-1'
    ]
    return colors[level % colors.length]
  }

  return (
    <div className="space-y-1">
      {/* Category Header */}
      {(hasChildren || documents.length > 0) && (
        <motion.div 
          className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
            isExpanded 
              ? 'bg-card shadow-sm border border-border' 
              : 'hover:bg-muted/50 hover:shadow-sm'
          }`}
          style={{ marginLeft: `${level * 20}px` }}
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {/* Gradient indicator */}
          <div className={`w-1 h-6 rounded-full ${getCategoryColor(level)}`} />
          
          {/* Expand/Collapse button */}
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </motion.div>
          
          {/* Category info */}
          <div className="flex-1 flex items-center justify-between min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-medium text-foreground truncate">{label}</span>
            </div>
            
            {showDocumentCount && totalDocuments > 0 && (
              <div className="flex-shrink-0 ml-2">
                <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                  {totalDocuments}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Expanded Content */}
      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="pt-2 space-y-1">
          {/* Direct Documents */}
          {documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              className={`group flex items-center gap-3 p-2.5 mx-2 rounded-lg cursor-pointer transition-all duration-150 ${
                selectedDocumentId === doc.id 
                  ? 'bg-primary/10 border-l-2 border-primary shadow-sm' 
                  : 'hover:bg-muted/50 hover:translate-x-1'
              }`}
              style={{ marginLeft: `${level * 20 + 20}px` }}
              onClick={() => onDocumentClick?.(doc)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex-shrink-0">
                {formatDocumentIcon(doc.format)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={`text-sm truncate transition-colors ${
                  selectedDocumentId === doc.id 
                    ? 'text-primary font-medium' 
                    : 'text-foreground group-hover:text-foreground'
                }`}>
                  {doc.title}
                </p>
                {doc.description && (
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {doc.description}
                  </p>
                )}
              </div>
              
              {doc.tags && doc.tags.length > 0 && (
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground group-hover:bg-muted/80 transition-colors">
                    {doc.tags[0]}
                  </span>
                </div>
              )}
            </motion.div>
          ))}

          {/* Child Categories */}
          {children && Object.entries(children).map(([childLabel, childData]) => (
            <MenuItem
              key={childLabel}
              label={childLabel}
              documents={childData.documents}
              children={childData.children}
              level={level + 1}
              onDocumentClick={onDocumentClick}
              selectedDocumentId={selectedDocumentId}
              showDocumentCount={showDocumentCount}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function KnowledgeBrowser({
  documents,
  menuConfig,
  onDocumentClick,
  onDocumentShare,
  onDocumentUpdate,
  selectedDocumentId,
  className,
  editable = true
}: KnowledgeBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDocument, setSelectedDocument] = useState<KnowledgeDocument | null>(null)

  // Filter documents based on search
  const filteredDocuments = useMemo(() => {
    if (!searchQuery) return documents
    
    return documents.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      Object.values(doc.metadata || {}).some(value => 
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  }, [documents, searchQuery])

  // Build hierarchy from filtered documents
  const hierarchy = useMemo(() => {
    const buildHierarchy = (docs: KnowledgeDocument[], groupKeys: string[]): KnowledgeHierarchy => {
      if (groupKeys.length === 0) {
        return {}
      }

      const [currentKey, ...remainingKeys] = groupKeys
      const grouped = docs.reduce((acc, doc) => {
        const value = doc.metadata?.[currentKey] || 'Uncategorized'
        const key = String(value)
        
        if (!acc[key]) {
          acc[key] = { documents: [], children: {} }
        }
        
        if (remainingKeys.length === 0) {
          acc[key].documents.push(doc)
        } else {
          const childHierarchy = buildHierarchy([doc], remainingKeys)
          const childKey = Object.keys(childHierarchy)[0]
          if (childKey) {
            if (!acc[key].children) acc[key].children = {}
            if (!acc[key].children[childKey]) {
              acc[key].children[childKey] = childHierarchy[childKey]
            } else {
              acc[key].children[childKey].documents.push(...childHierarchy[childKey].documents)
            }
          }
        }
        
        return acc
      }, {} as KnowledgeHierarchy)

      return grouped
    }

    return buildHierarchy(filteredDocuments, menuConfig.groupBy)
  }, [filteredDocuments, menuConfig.groupBy])

  const handleDocumentClick = (document: KnowledgeDocument) => {
    setSelectedDocument(document)
    onDocumentClick?.(document)
  }

  return (
    <div className={`flex h-full ${className || ""}`}>
      {/* Left Sidebar - Menu */}
      <div className="w-1/3 border-r border-border bg-muted/20">
        {/* Search Header */}
        <div className="p-6 border-b border-border">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              placeholder="Search knowledge base..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/80 border-border focus:border-primary/50 focus:ring-primary/20 rounded-xl h-11 text-sm placeholder:text-muted-foreground"
            />
          </div>
        </div>
        
        {/* Menu Content */}
        <ScrollArea className="h-[calc(100%-100px)]">
          <div className="p-4 space-y-3">
            {Object.entries(hierarchy).map(([label, data]) => (
              <MenuItem
                key={label}
                label={label}
                documents={data.documents}
                children={data.children}
                level={0}
                onDocumentClick={handleDocumentClick}
                selectedDocumentId={selectedDocumentId}
                showDocumentCount={menuConfig.showDocumentCount}
              />
            ))}
            
            {Object.keys(hierarchy).length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-muted-foreground py-12"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium">No documents found</p>
                <p className="text-xs mt-1">Try adjusting your search terms</p>
              </motion.div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Right Content - Document Preview */}
      <div className="flex-1 bg-background">
        {selectedDocument ? (
          <DocumentPreview 
            document={selectedDocument} 
            onDocumentUpdate={onDocumentUpdate}
            editable={editable}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-sm"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Select a document</h3>
              <p className="text-muted-foreground leading-relaxed">Choose any document from the knowledge base to view its content and details</p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
