import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Save, X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TeamKnowledgeContext } from '../types'
import { Badge, Label } from '@/components/ui'
import { Checkbox } from '@/components/ui/checkbox'

interface AddTeamContextProps {
  isOpen: boolean
  onClose: () => void
  onAddTeamContext: (teamContext: TeamKnowledgeContext) => void
}

export const AddTeamContext: React.FC<AddTeamContextProps> = ({
  isOpen,
  onClose,
  onAddTeamContext,
}) => {
  const [formData, setFormData] = useState({
    label: '',
    description: '',
    groupBy: [] as string[],
    sortBy: 'name',
    sortOrder: 'asc',
    showDocumentCount: true,
  })
  const [draftGroupBy, setDraftGroupBy] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log('formData', formData)

    if (!formData.label) {
      return
    }

    onAddTeamContext({
      id: formData.label,
      label: formData.label,
      description: formData.description,
      menuConfig: {
        groupBy: formData.groupBy,
        sortBy: formData.sortBy || null,
        sortOrder: formData.sortOrder as 'asc' | 'desc' | null,
        showDocumentCount: formData.showDocumentCount,
      },
    })

    // Reset form
    setFormData({
      label: '',
      description: '',
      groupBy: [],
      sortBy: 'name',
      sortOrder: 'asc',
      showDocumentCount: true,
    })

    // onClose();
  }

  const handleClose = () => {
    setFormData({
      label: '',
      description: '',
      groupBy: [],
      sortBy: 'name',
      sortOrder: 'asc',
      showDocumentCount: true,
    })
    onClose()
  }

  const sortByOptions = [
    { value: 'name', label: 'Name' },
    { value: 'createdAt', label: 'Created Date' },
  ]

  const sortOrderOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Knowledge source</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="label">Label *</Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) => setFormData((prev) => ({ ...prev, label: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <Label>Group By</Label>
              <div className="space-y-2">
                {/* Chips */}
                <div className="flex flex-wrap gap-2">
                  {formData.groupBy.map((t) => (
                    <Badge key={t} variant="secondary" className="px-2 py-1">
                      {t}
                      <button
                        type="button"
                        className="ml-1 inline-flex"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            groupBy: prev.groupBy.filter((x: string) => x !== t),
                          }))
                        }}
                        aria-label={`Remove ${t}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>

                {/* Add input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a tag and press Enter"
                    value={draftGroupBy}
                    onChange={(e) => setDraftGroupBy(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ',') {
                        e.preventDefault()
                        setFormData((prev) => ({
                          ...prev,
                          groupBy: [...prev.groupBy, draftGroupBy],
                        }))
                        setDraftGroupBy('')
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        groupBy: [...prev.groupBy, draftGroupBy],
                      }))
                      setDraftGroupBy('')
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="sortBy">Sort By</Label>
              <Select
                value={formData.sortBy}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, sortBy: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sort field" />
                </SelectTrigger>
                <SelectContent>
                  {sortByOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Select
                value={formData.sortOrder}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, sortOrder: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sort order" />
                </SelectTrigger>
                <SelectContent>
                  {sortOrderOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="showDocumentCount"
                checked={formData.showDocumentCount}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    showDocumentCount: checked as boolean,
                  }))
                }
              />
              <Label htmlFor="showDocumentCount" className="text-sm">
                Show Document Count
              </Label>
            </div>
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
