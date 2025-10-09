import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { X, Search, FileText, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Team, TeamKnowledgeContext } from '../types'

interface ManageTeamContextModalProps {
  isOpen: boolean
  onClose: () => void
  knowledgeSources: TeamKnowledgeContext[]
  onCreate?: (teamContext: TeamKnowledgeContext) => void
  onUpdate?: (data: TeamKnowledgeContext) => void
  onDelete?: (id: string) => void
}

export const ManageTeamContextModal = ({
  isOpen,
  onClose,
  knowledgeSources,
  onCreate,
  onUpdate,
  onDelete,
}: ManageTeamContextModalProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSource, setSelectedSource] = useState<TeamKnowledgeContext | null>(null)
  const [label, setLabel] = useState('')
  const [description, setDescription] = useState('')
  const [groupBy, setGroupBy] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'createdAt'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showDocumentCount, setShowDocumentCount] = useState(true)

  const filteredSources = knowledgeSources.filter(
    (source) =>
      source.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSelectSource = (source: TeamKnowledgeContext) => {
    setSelectedSource(source)
    setLabel(source.label)
    setDescription(source.description || '')
    setGroupBy(source.menuConfig?.groupBy || [])
    setSortBy((source.menuConfig?.sortBy as 'name' | 'createdAt') || 'name')
    setSortOrder(source.menuConfig?.sortOrder || 'asc')
    setShowDocumentCount(source.menuConfig?.showDocumentCount || true)
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !groupBy.includes(tagInput.trim())) {
      setGroupBy([...groupBy, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setGroupBy(groupBy.filter((t) => t !== tag))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const resetForm = () => {
    setSelectedSource(null)
    setLabel('')
    setDescription('')
    setGroupBy([])
    setTagInput('')
    setSortBy('name')
    setSortOrder('asc')
    setShowDocumentCount(true)
  }

  const handleCreate = () => {
    if (!label.trim()) {
      toast.error('Label is required')
      return
    }

    onCreate?.({
      id: label.trim(),
      label: label.trim(),
      description: description.trim(),
      menuConfig: {
        groupBy,
        sortBy,
        sortOrder,
        showDocumentCount,
      },
    })

    toast.success('Knowledge source created successfully')
    resetForm()
  }

  const handleUpdate = () => {
    if (!selectedSource) return
    if (!label.trim()) {
      toast.error('Label is required')
      return
    }

    onUpdate?.({
      id: selectedSource.id,
      label: label.trim(),
      description: description.trim(),
      menuConfig: {
        groupBy,
        sortBy,
        sortOrder,
        showDocumentCount,
      },
    })

    toast.success('Knowledge source updated successfully')
    resetForm()
  }

  const handleDelete = () => {
    if (!selectedSource) return

    if (window.confirm(`Are you sure you want to delete "${selectedSource.label}"?`)) {
      onDelete?.(selectedSource.id)
      toast.success('Knowledge source deleted successfully')
      resetForm()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] bg-card border-border p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="text-foreground text-2xl">Manage Knowledge Sources</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 overflow-hidden">
          {/* Left side - List of contexts */}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search contexts..."
                className="pl-10 bg-background border-input"
              />
            </div>

            <ScrollArea className="rounded-md border border-border bg-background flex-1">
              <div className="p-2 space-y-2">
                {filteredSources.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {searchQuery ? 'No contexts found' : 'No contexts yet'}
                    </p>
                  </div>
                ) : (
                  filteredSources.map((source) => (
                    <div
                      key={source.id}
                      onClick={() => handleSelectSource(source)}
                      className={cn(
                        'p-3 rounded-lg cursor-pointer transition-all hover:bg-accent/50',
                        selectedSource?.id === source.id && 'bg-accent text-accent-foreground',
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{source.label}</h4>
                          {source.description && (
                            <p className="text-sm opacity-80 truncate mt-1">{source.description}</p>
                          )}
                          {(source.menuConfig?.groupBy || []).length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {source.menuConfig?.groupBy?.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                              {(source.menuConfig?.groupBy || []).length > 3 && (
                                <span className="text-xs px-2 py-0.5">
                                  +{(source.menuConfig?.groupBy || []).length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>

            <Button variant="outline" onClick={resetForm} className="w-full">
              Clear Selection / New Context
            </Button>
          </div>

          {/* Right side - Form */}
          <div className="space-y-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="label" className="text-foreground">
                    Label <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="label"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Enter label"
                    className="bg-background border-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    className="bg-background border-input resize-none"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Group By</Label>
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a tag and press Enter"
                      className="bg-background border-input flex-1"
                    />
                    <Button onClick={handleAddTag} className="bg-accent hover:bg-accent/90">
                      Add
                    </Button>
                  </div>
                  {groupBy.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {groupBy.map((tag) => (
                        <div
                          key={tag}
                          className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md flex items-center gap-2 text-sm"
                        >
                          {tag}
                          <X
                            className="h-3 w-3 cursor-pointer hover:text-destructive"
                            onClick={() => handleRemoveTag(tag)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sortBy" className="text-foreground">
                    Sort By
                  </Label>
                  <Select
                    value={sortBy}
                    onValueChange={(val: 'name' | 'createdAt') => setSortBy(val)}
                  >
                    <SelectTrigger className="bg-background border-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="createdAt">Created At</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sortOrder" className="text-foreground">
                    Sort Order
                  </Label>
                  <Select
                    value={sortOrder}
                    onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}
                  >
                    <SelectTrigger className="bg-background border-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="asc">Ascending</SelectItem>
                      <SelectItem value="desc">Descending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showDocumentCount"
                    checked={showDocumentCount}
                    onCheckedChange={(checked) => setShowDocumentCount(checked as boolean)}
                  />
                  <Label
                    htmlFor="showDocumentCount"
                    className="text-sm font-normal cursor-pointer text-foreground"
                  >
                    Show Document Count
                  </Label>
                </div>
              </div>
            </ScrollArea>

            <div className="flex gap-3 pt-4 border-t border-border">
              {selectedSource ? (
                <>
                  <Button variant="destructive" onClick={handleDelete} className="flex-1">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                  <Button onClick={handleUpdate} className="flex-1 bg-accent hover:bg-accent/90">
                    Update
                  </Button>
                </>
              ) : (
                <Button onClick={handleCreate} className="w-full bg-accent hover:bg-accent/90">
                  Create
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
