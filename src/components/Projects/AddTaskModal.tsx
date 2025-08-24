import React, { useState, useEffect } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { BookOpen, Bug, Zap, AlertCircle } from 'lucide-react'
import { Task, Epic, Sprint } from '../DigitalColleagues/types'

interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
  epics: Epic[]
  sprints: Sprint[]
  defaultEpicId?: string
}

const taskTypes = [
  { value: 'story', label: 'Story', color: 'bg-primary/20 text-primary', icon: BookOpen },
  {
    value: 'task',
    label: 'Task',
    color: 'bg-secondary/20 text-secondary-foreground',
    icon: AlertCircle,
  },
  { value: 'bug', label: 'Bug', color: 'bg-destructive/20 text-destructive', icon: Bug },
  { value: 'spike', label: 'Spike', color: 'bg-accent/20 text-accent', icon: Zap },
]

const priorities = [
  { value: 'low', label: 'Low', color: 'bg-success/20 text-success' },
  { value: 'medium', label: 'Medium', color: 'bg-warning/20 text-warning' },
  { value: 'high', label: 'High', color: 'bg-destructive/20 text-destructive' },
]

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
  epics,
  sprints,
  defaultEpicId,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo' as Task['status'],
    priority: 'medium' as Task['priority'],
    type: 'story' as Task['type'],
    points: 1,
    epicId: '',
    sprintId: 'none',
    assignee: '',
  })

  // Effect to set the default epic when modal opens
  useEffect(() => {
    if (isOpen && defaultEpicId) {
      setFormData((prev) => ({ ...prev, epicId: defaultEpicId }))
    }
  }, [isOpen, defaultEpicId])

  useEffect(() => {
    if (isOpen) {
      // Set default values or reset the form when the modal opens
      setFormData({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        type: 'story',
        points: 1,
        epicId: '',
        sprintId: 'none',
        assignee: '',
      })
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title.trim()) {
      onAddTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
        status: 'todo',
        priority: formData.priority as Task['priority'],
        type: formData.type as Task['type'],
        points: formData.points,
        epicId: formData.epicId,
        sprintId: formData.sprintId === 'none' ? undefined : formData.sprintId,
        assignee: formData.assignee.trim() || 'Unassigned',
      })
      setFormData({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        type: 'story',
        points: 1,
        epicId: '',
        sprintId: 'none',
        assignee: '',
      })
      onClose()
    }
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter task description"
              rows={3}
            />
          </div>

          {/* Type Selection with Button Group */}
          <div className="space-y-2">
            <Label>Type</Label>
            <ToggleGroup
              type="single"
              value={formData.type}
              onValueChange={(value) => value && handleChange('type', value)}
            >
              {taskTypes.map((type) => {
                const IconComponent = type.icon
                return (
                  <ToggleGroupItem
                    key={type.value}
                    value={type.value}
                    className="flex items-center gap-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                  >
                    <IconComponent className="h-4 w-4" />
                    {type.label}
                  </ToggleGroupItem>
                )
              })}
            </ToggleGroup>
          </div>

          {/* Priority Selection with Button Group */}
          <div className="space-y-2">
            <Label>Priority</Label>
            <ToggleGroup
              type="single"
              value={formData.priority}
              onValueChange={(value) => value && handleChange('priority', value)}
            >
              {priorities.map((priority) => (
                <ToggleGroupItem
                  key={priority.value}
                  value={priority.value}
                  className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  {priority.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Points */}
          <div className="space-y-2">
            <Label htmlFor="points">Story Points</Label>
            <Input
              id="points"
              type="number"
              min="1"
              max="100"
              value={formData.points}
              onChange={(e) => handleChange('points', parseInt(e.target.value) || 1)}
              placeholder="Enter story points"
              required
            />
          </div>

          {/* Epic Selection */}
          <div className="space-y-2">
            <Label htmlFor="epic">Epic</Label>
            <Select
              value={formData.epicId}
              onValueChange={(value) => handleChange('epicId', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an epic" />
              </SelectTrigger>
              <SelectContent>
                {epics.map((epic) => (
                  <SelectItem key={epic.id} value={epic.id}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${epic.color}`}></div>
                      {epic.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sprint Selection */}
          <div className="space-y-2">
            <Label htmlFor="sprint">Sprint (Optional)</Label>
            <Select
              value={formData.sprintId}
              onValueChange={(value) => handleChange('sprintId', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a sprint" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Sprint</SelectItem>
                {sprints.map((sprint) => (
                  <SelectItem key={sprint.id} value={sprint.id}>
                    <div className="flex items-center gap-2">
                      {sprint.name}
                      {sprint.isActive && (
                        <span className="text-xs bg-green-100 text-green-800 px-1 rounded">
                          Active
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Input
              id="assignee"
              value={formData.assignee}
              onChange={(e) => handleChange('assignee', e.target.value)}
              placeholder="Enter assignee name"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Add Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
