"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, FileText, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { DocumentTreeNode } from "./documents"

interface DocumentSidebarProps {
  documentTree: DocumentTreeNode[]
  currentSlug?: string
  onDocumentSelect?: (slug: string) => void
  className?: string
}

interface DocumentNodeProps {
  node: DocumentTreeNode
  currentSlug?: string
  onDocumentSelect?: (slug: string) => void
  level?: number
}

function DocumentNode({ node, currentSlug, onDocumentSelect, level = 0 }: DocumentNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const hasChildren = node.children.length > 0
  const isActive = currentSlug === node.slug
  const isParentOfActive =
    currentSlug &&
    node.children.some(
      (child) => child.slug === currentSlug || child.children.some((grandchild) => grandchild.slug === currentSlug),
    )

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded)
    }
    if (onDocumentSelect) {
      onDocumentSelect(node.slug)
    }
  }

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted/50 cursor-pointer",
          isActive && "bg-primary/10 text-primary font-medium",
          isParentOfActive && !isActive && "text-foreground",
          level > 0 && "ml-4",
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
      >
        {hasChildren ? (
          isExpanded ? (
            <ChevronDown className="h-4 w-4 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 flex-shrink-0" />
          )
        ) : (
          <FileText className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
        )}
        <span className="truncate">{node.title}</span>
      </div>

      {hasChildren && isExpanded && (
        <div className="mt-1">
          {node.children.map((child) => (
            <DocumentNode
              key={child.id}
              node={child}
              currentSlug={currentSlug}
              onDocumentSelect={onDocumentSelect}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function DocumentSidebar({ documentTree, currentSlug, onDocumentSelect, className }: DocumentSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter documents based on search query
  const filterNodes = (nodes: DocumentTreeNode[], query: string): DocumentTreeNode[] => {
    if (!query) return nodes

    return nodes.reduce((filtered: DocumentTreeNode[], node) => {
      const matchesQuery = node.title.toLowerCase().includes(query.toLowerCase())
      const filteredChildren = filterNodes(node.children, query)

      if (matchesQuery || filteredChildren.length > 0) {
        filtered.push({
          ...node,
          children: filteredChildren,
        })
      }

      return filtered
    }, [])
  }

  const filteredTree = filterNodes(documentTree, searchQuery)

  return (
    <div className={cn("flex h-full flex-col border-r bg-background", className)}>
      {/* Header */}
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold mb-3">Documentation</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search docs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Document Tree */}
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {filteredTree.length > 0 ? (
            filteredTree.map((node) => (
              <DocumentNode key={node.id} node={node} currentSlug={currentSlug} onDocumentSelect={onDocumentSelect} />
            ))
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              {searchQuery ? "No documents found" : "No documents available"}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
