import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Epic } from '../DigitalColleagues/types'

interface AddEpicModalProps {
  isOpen: boolean
  onClose: () => void
  onAddEpic: (epic: Omit<Epic, 'id'>) => void
}

export const AddEpicModal: React.FC<AddEpicModalProps> = ({ isOpen, onClose, onAddEpic }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'bg-blue-500',
    confidence: 'medium' as 'low' | 'medium' | 'high',
    phase: 1, // planning
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    progress: 0,
  })

  const colorOptions = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-pink-500',
    'bg-indigo-500',
  ]

  const confidenceOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ]

  const phaseOptions = [
    { value: 1, label: 'Planning' },
    { value: 2, label: 'Development' },
    { value: 3, label: 'Testing' },
    { value: 4, label: 'Done' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name.trim()) {
      onAddEpic({
        name: formData.name.trim(),
        description: formData.description.trim(),
        color: formData.color,
        confidence: formData.confidence,
        phase: formData.phase,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        progress: formData.progress,
        isSelected: true,
      })
      setFormData({
        name: '',
        description: '',
        color: 'bg-blue-500',
        confidence: 'medium',
        phase: 1,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        progress: 0,
      })
      onClose()
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Epic</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Epic Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter epic name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter epic description (optional)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleChange('color', color)}
                  className={`w-8 h-8 rounded-full ${color} ${
                    formData.color === color ? 'ring-2 ring-gray-400' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Confidence</Label>
              <Select
                value={formData.confidence}
                onValueChange={(value: 'low' | 'medium' | 'high') =>
                  handleChange('confidence', value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {confidenceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Phase</Label>
              <Select
                value={formData.phase.toString()}
                onValueChange={(value) => handleChange('phase', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {phaseOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Progress (%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => handleChange('progress', parseInt(e.target.value) || 0)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Add Epic
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
