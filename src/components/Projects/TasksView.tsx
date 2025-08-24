import React, { useState } from 'react'
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { DashboardHero } from '../Heros/DashboardHero/DashboardHero'
import {
  Plus,
  Clock,
  Calendar,
  User,
  Repeat,
  Edit2,
  Trash2,
  CheckCircle,
  Circle,
  Bell,
  BellOff,
} from 'lucide-react'

import { type Reminder, type DigitalColleague } from '../DigitalColleagues/types'

export interface TasksViewProps {
  initialReminders?: Reminder[]
  initialColleagues?: DigitalColleague[]
  onAddReminder?: (reminder: Omit<Reminder, 'id' | 'createdAt'>) => void
  onUpdateReminder?: (reminderId: string, updates: Partial<Reminder>) => void
  onDeleteReminder?: (reminderId: string) => void
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-destructive/10 text-destructive border-destructive/20'
    case 'medium':
      return 'bg-warning/10 text-warning border-warning/20'
    case 'low':
      return 'bg-success/10 text-success border-success/20'
    default:
      return 'bg-muted text-muted-foreground border-border'
  }
}

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'high':
      return '🔴'
    case 'medium':
      return '🟡'
    case 'low':
      return '🟢'
    default:
      return '⚪'
  }
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':')
  const date = new Date()
  date.setHours(parseInt(hours), parseInt(minutes))
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

const isOverdue = (dueDate: Date, dueTime?: string) => {
  const now = new Date()
  const due = new Date(dueDate)

  if (dueTime) {
    const [hours, minutes] = dueTime.split(':')
    due.setHours(parseInt(hours), parseInt(minutes))
  }

  return due < now
}

const isToday = (date: Date) => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const isTomorrow = (date: Date) => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return date.toDateString() === tomorrow.toDateString()
}

const AddReminderModal: React.FC<{
  colleagues: DigitalColleague[]
  onAddReminder: (reminder: Omit<Reminder, 'id' | 'createdAt'>) => void
  open: boolean
  setOpen: (open: boolean) => void
}> = ({ colleagues, onAddReminder, open, setOpen }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
    colleagueId: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    isRecurring: false,
    recurrencePattern: 'weekly' as 'daily' | 'weekly' | 'monthly' | 'yearly',
    recurrenceInterval: 1,
    reminderEnabled: true,
    reminderMinutes: 15,
    tags: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const colleague = colleagues.find((c) => c?.id === formData.colleagueId)
    if (!colleague) {
      console.error('No valid colleague selected')
      return
    }

    const newReminder: Omit<Reminder, 'id' | 'createdAt'> = {
      title: formData.title,
      description: formData.description,
      dueDate: new Date(formData.dueDate),
      dueTime: formData.dueTime || undefined,
      colleague,
      isCompleted: false,
      isRecurring: formData.isRecurring,
      recurrencePattern: formData.isRecurring ? formData.recurrencePattern : undefined,
      recurrenceInterval: formData.isRecurring ? formData.recurrenceInterval : undefined,
      priority: formData.priority,
      reminderEnabled: formData.reminderEnabled,
      reminderMinutes: formData.reminderEnabled ? formData.reminderMinutes : undefined,
      tags: formData.tags ? formData.tags.split(',').map((tag) => tag.trim()) : undefined,
    }

    onAddReminder(newReminder)
    setOpen(false)
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      dueTime: '',
      colleagueId: '',
      priority: 'medium',
      isRecurring: false,
      recurrencePattern: 'weekly',
      recurrenceInterval: 1,
      reminderEnabled: true,
      reminderMinutes: 15,
      tags: '',
    })
  }

  // Filter out any undefined colleagues
  const validColleagues = colleagues.filter(Boolean)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Reminder</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter reminder title"
                required
              />
            </div>
            {/* <div>
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={formData.priority} 
                onValueChange={(value) => 
                  setFormData({ ...formData, priority: value as 'low' | 'medium' | 'high' })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">🟢 Low</SelectItem>
                  <SelectItem value="medium">🟡 Medium</SelectItem>
                  <SelectItem value="high">🔴 High</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter reminder description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="dueTime">Due Time (optional)</Label>
              <Input
                id="dueTime"
                type="time"
                value={formData.dueTime}
                onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="colleague">Assigned Colleague</Label>
            <Select
              value={formData.colleagueId}
              onValueChange={(value) => setFormData({ ...formData, colleagueId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a digital colleague" />
              </SelectTrigger>
              <SelectContent>
                {validColleagues.map((colleague) => (
                  <SelectItem key={colleague.id} value={colleague.id}>
                    {colleague.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isRecurring"
                checked={formData.isRecurring}
                onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                className="rounded border-border"
              />
              <Label htmlFor="isRecurring">Make this a recurring reminder</Label>
            </div>

            {formData.isRecurring && (
              <div className="grid grid-cols-2 gap-4 pl-6">
                <div>
                  <Label htmlFor="recurrencePattern">Frequency</Label>
                  <Select
                    value={formData.recurrencePattern}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        recurrencePattern: value as 'daily' | 'weekly' | 'monthly' | 'yearly',
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="recurrenceInterval">Every</Label>
                  <Input
                    id="recurrenceInterval"
                    type="number"
                    min="1"
                    value={formData.recurrenceInterval}
                    onChange={(e) =>
                      setFormData({ ...formData, recurrenceInterval: parseInt(e.target.value) })
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {/* <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="reminderEnabled"
                checked={formData.reminderEnabled}
                onChange={(e) => setFormData({ ...formData, reminderEnabled: e.target.checked })}
                className="rounded border-border"
              />
              <Label htmlFor="reminderEnabled">Enable reminder notifications</Label>
            </div>
            
            {formData.reminderEnabled && (
              <div className="pl-6">
                <Label htmlFor="reminderMinutes">Remind me</Label>
                <Select 
                  value={formData.reminderMinutes.toString()} 
                  onValueChange={(value) => setFormData({ ...formData, reminderMinutes: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes before</SelectItem>
                    <SelectItem value="15">15 minutes before</SelectItem>
                    <SelectItem value="30">30 minutes before</SelectItem>
                    <SelectItem value="60">1 hour before</SelectItem>
                    <SelectItem value="1440">1 day before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div> */}

          {/* <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g., urgent, meeting, follow-up"
            />
          </div> */}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Reminder</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const EditReminderModal: React.FC<{
  reminder: Reminder
  colleagues: DigitalColleague[]
  onUpdateReminder: (reminderId: string, updates: Partial<Reminder>) => void
  open: boolean
  onClose: () => void
}> = ({ reminder, colleagues, onUpdateReminder, open, onClose }) => {
  const [formData, setFormData] = useState({
    title: reminder.title,
    description: reminder.description,
    dueDate: reminder.dueDate.toISOString().split('T')[0],
    dueTime: reminder.dueTime || '',
    colleagueId: reminder.colleague?.id || '',
    priority: reminder.priority as 'low' | 'medium' | 'high',
    isRecurring: reminder.isRecurring,
    recurrencePattern:
      (reminder.recurrencePattern as 'daily' | 'weekly' | 'monthly' | 'yearly') || 'weekly',
    recurrenceInterval: reminder.recurrenceInterval || 1,
    reminderEnabled: reminder.reminderEnabled,
    reminderMinutes: reminder.reminderMinutes || 15,
    tags: reminder.tags?.join(', ') || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const colleague = colleagues.find((c) => c?.id === formData.colleagueId)
    if (!colleague) {
      console.error('No valid colleague selected')
      return
    }

    onUpdateReminder(reminder.id, {
      title: formData.title,
      description: formData.description,
      dueDate: new Date(formData.dueDate),
      dueTime: formData.dueTime || undefined,
      colleague,
      priority: formData.priority,
      isRecurring: formData.isRecurring,
      recurrencePattern: formData.isRecurring ? formData.recurrencePattern : undefined,
      recurrenceInterval: formData.isRecurring ? formData.recurrenceInterval : undefined,
      reminderEnabled: formData.reminderEnabled,
      reminderMinutes: formData.reminderEnabled ? formData.reminderMinutes : undefined,
      tags: formData.tags ? formData.tags.split(',').map((tag) => tag.trim()) : undefined,
    })
    onClose()
  }

  // Filter out any undefined colleagues
  const validColleagues = colleagues.filter(Boolean)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Reminder</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter reminder title"
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData({ ...formData, priority: value as 'low' | 'medium' | 'high' })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">🟢 Low</SelectItem>
                  <SelectItem value="medium">🟡 Medium</SelectItem>
                  <SelectItem value="high">🔴 High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter reminder description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-dueDate">Due Date</Label>
              <Input
                id="edit-dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-dueTime">Due Time (optional)</Label>
              <Input
                id="edit-dueTime"
                type="time"
                value={formData.dueTime}
                onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="edit-colleague">Assigned Colleague</Label>
            <Select
              value={formData.colleagueId}
              onValueChange={(value) => setFormData({ ...formData, colleagueId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a digital colleague" />
              </SelectTrigger>
              <SelectContent>
                {validColleagues.map((colleague) => (
                  <SelectItem key={colleague.id} value={colleague.id}>
                    {colleague.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-isRecurring"
                checked={formData.isRecurring}
                onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                className="rounded border-border"
              />
              <Label htmlFor="edit-isRecurring">Make this a recurring reminder</Label>
            </div>

            {formData.isRecurring && (
              <div className="grid grid-cols-2 gap-4 pl-6">
                <div>
                  <Label htmlFor="edit-recurrencePattern">Frequency</Label>
                  <Select
                    value={formData.recurrencePattern}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        recurrencePattern: value as 'daily' | 'weekly' | 'monthly' | 'yearly',
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-recurrenceInterval">Every</Label>
                  <Input
                    id="edit-recurrenceInterval"
                    type="number"
                    min="1"
                    value={formData.recurrenceInterval}
                    onChange={(e) =>
                      setFormData({ ...formData, recurrenceInterval: parseInt(e.target.value) })
                    }
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-reminderEnabled"
                checked={formData.reminderEnabled}
                onChange={(e) => setFormData({ ...formData, reminderEnabled: e.target.checked })}
                className="rounded border-border"
              />
              <Label htmlFor="edit-reminderEnabled">Enable reminder notifications</Label>
            </div>

            {formData.reminderEnabled && (
              <div className="pl-6">
                <Label htmlFor="edit-reminderMinutes">Remind me</Label>
                <Select
                  value={formData.reminderMinutes.toString()}
                  onValueChange={(value) =>
                    setFormData({ ...formData, reminderMinutes: parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes before</SelectItem>
                    <SelectItem value="15">15 minutes before</SelectItem>
                    <SelectItem value="30">30 minutes before</SelectItem>
                    <SelectItem value="60">1 hour before</SelectItem>
                    <SelectItem value="1440">1 day before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="edit-tags">Tags (comma-separated)</Label>
            <Input
              id="edit-tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g., urgent, meeting, follow-up"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const ReminderCard: React.FC<{
  reminder: Reminder
  colleagues: DigitalColleague[]
  onUpdateReminder: (reminderId: string, updates: Partial<Reminder>) => void
  onDeleteReminder: (reminderId: string) => void
}> = ({ reminder, colleagues, onUpdateReminder, onDeleteReminder }) => {
  const [isEditing, setIsEditing] = useState(false)

  // Add null checks for reminder properties
  if (!reminder || !reminder.id) {
    return null
  }

  const overdue = isOverdue(reminder.dueDate, reminder.dueTime)
  const today = isToday(reminder.dueDate)
  const tomorrow = isTomorrow(reminder.dueDate)

  const handleToggleComplete = () => {
    onUpdateReminder(reminder.id, {
      isCompleted: !reminder.isCompleted,
      completedAt: !reminder.isCompleted ? new Date() : undefined,
    })
  }

  const getDateLabel = () => {
    if (today) return 'Today'
    if (tomorrow) return 'Tomorrow'
    if (overdue && !reminder.isCompleted) return 'Overdue'
    return formatDate(reminder.dueDate)
  }

  return (
    <>
      <EditReminderModal
        reminder={reminder}
        colleagues={colleagues}
        onUpdateReminder={onUpdateReminder}
        open={isEditing}
        onClose={() => setIsEditing(false)}
      />
      <Card
        className={`transition-all duration-200 ${reminder.isCompleted ? 'opacity-60' : ''} ${
          overdue && !reminder.isCompleted ? 'border-destructive/50 bg-destructive/5' : ''
        }`}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <button
                onClick={handleToggleComplete}
                className="mt-1 text-primary hover:text-primary/80"
              >
                {reminder.isCompleted ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </button>

              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3
                    className={`font-semibold ${
                      reminder.isCompleted ? 'line-through text-muted-foreground' : ''
                    }`}
                  >
                    {reminder.title}
                  </h3>
                  <span className="text-sm">{getPriorityIcon(reminder.priority)}</span>
                  {reminder.isRecurring && <Repeat className="h-4 w-4 text-primary" />}
                  {reminder.reminderEnabled && <Bell className="h-4 w-4 text-success" />}
                </div>

                <p className="text-sm text-muted-foreground mb-2">{reminder.description}</p>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span
                      className={
                        overdue && !reminder.isCompleted ? 'text-destructive font-medium' : ''
                      }
                    >
                      {getDateLabel()}
                    </span>
                  </div>

                  {reminder.dueTime && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(reminder.dueTime)}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{reminder.colleague?.name || 'Unknown Colleague'}</span>
                  </div>
                </div>

                {reminder.tags && reminder.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {reminder.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 p-0"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteReminder(reminder.id)}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive/80"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export const TasksView: React.FC<TasksViewProps> = ({
  initialReminders = [],
  initialColleagues = [],
  onAddReminder,
  onUpdateReminder,
  onDeleteReminder,
}) => {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders.filter(Boolean))
  const [colleagues] = useState<DigitalColleague[]>(initialColleagues.filter(Boolean))
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'overdue' | 'today'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [openAddReminderModal, setOpenAddReminderModal] = useState(false)
  const handleAddReminder = (newReminder: Omit<Reminder, 'id' | 'createdAt'>) => {
    // Validate that the reminder has required properties
    if (!newReminder.title || !newReminder.colleague?.id) {
      console.error('Invalid reminder data:', newReminder)
      return
    }

    const reminder: Reminder = {
      ...newReminder,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setReminders((prev) => [...prev, reminder])
    onAddReminder?.(newReminder)
  }

  const handleUpdateReminder = (reminderId: string, updates: Partial<Reminder>) => {
    if (!reminderId) {
      console.error('No reminder ID provided for update')
      return
    }

    setReminders((prev) =>
      prev.map((reminder) =>
        reminder?.id === reminderId ? { ...reminder, ...updates } : reminder,
      ),
    )
    onUpdateReminder?.(reminderId, updates)
  }

  const handleDeleteReminder = (reminderId: string) => {
    if (!reminderId) {
      console.error('No reminder ID provided for deletion')
      return
    }

    setReminders((prev) => prev.filter((reminder) => reminder?.id !== reminderId))
    onDeleteReminder?.(reminderId)
  }

  const filteredReminders = reminders.filter((reminder) => {
    if (!reminder) return false

    // Text search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        reminder.title.toLowerCase().includes(searchLower) ||
        reminder.description.toLowerCase().includes(searchLower) ||
        reminder.colleague?.name?.toLowerCase().includes(searchLower) ||
        reminder.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
      if (!matchesSearch) return false
    }

    // Status filter
    switch (filter) {
      case 'pending':
        return !reminder.isCompleted
      case 'completed':
        return reminder.isCompleted
      case 'overdue':
        return !reminder.isCompleted && isOverdue(reminder.dueDate, reminder.dueTime)
      case 'today':
        return isToday(new Date(reminder.dueDate))
      default:
        return true
    }
  })

  const sortedReminders = filteredReminders.sort((a, b) => {
    if (!a || !b) return 0

    // Completed items go to bottom
    if (a.isCompleted && !b.isCompleted) return 1
    if (!a.isCompleted && b.isCompleted) return -1

    // Sort by priority (high first)
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
    if (priorityDiff !== 0) return priorityDiff

    // Sort by due date
    return a.dueDate.getTime() - b.dueDate.getTime()
  })

  const stats = {
    total: reminders.filter(Boolean).length,
    pending: reminders.filter((r) => r && !r.isCompleted).length,
    completed: reminders.filter((r) => r && r.isCompleted).length,
    overdue: reminders.filter((r) => r && !r.isCompleted && isOverdue(r.dueDate, r.dueTime)).length,
    today: reminders.filter((r) => r && isToday(new Date(r.dueDate))).length,
  }

  // Ensure we have at least one valid colleague for the default reminder
  const defaultColleague: DigitalColleague = colleagues.find(Boolean) || {
    id: '1',
    name: 'Default Colleague',
    status: 'active' as const,
    joinedDate: new Date(),
    lastActive: new Date(),
    type: 'digital' as const,
    description: 'Default digital colleague for task management',
    jobDescription: 'Default team member for task management',
    workInstructions: 'Handle basic task assignments and reminders',
    capabilities: ['task-management', 'reminder-creation'],
    knowledge: [],
    coreKnowledge: [],
    version: '1.0.0',
    lastUpdated: new Date(),
    isActive: true,
  }

  return (
    <div className="px-2 md:px-4 py-4 space-y-8">
      <DashboardHero
        title="Task Reminders"
        description="Manage reminders and stay on top of important tasks and deadlines."
        gradient="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600"
        primaryAction={{
          label: 'Add reminder',
          onClick: () => {
            setOpenAddReminderModal(true)
          },
        }}
      />
      <div className="h-full bg-background">
        <AddReminderModal
          colleagues={colleagues}
          onAddReminder={handleAddReminder}
          open={openAddReminderModal}
          setOpen={setOpenAddReminderModal}
        />
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Task Reminders</h1>
              <p className="text-muted-foreground">Manage your digital colleague task reminders</p>
            </div>

            <Button
              className="flex items-center space-x-2"
              onClick={() => setOpenAddReminderModal(true)}
            >
              <Plus className="h-4 w-4" />
              <span>Add Reminder</span>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <Card className="p-4">
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-primary">{stats.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-success">{stats.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-destructive">{stats.overdue}</div>
              <div className="text-sm text-muted-foreground">Overdue</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-warning">{stats.today}</div>
              <div className="text-sm text-muted-foreground">Today</div>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search reminders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All ({stats.total})</SelectItem>
                <SelectItem value="pending">Pending ({stats.pending})</SelectItem>
                <SelectItem value="completed">Completed ({stats.completed})</SelectItem>
                <SelectItem value="overdue">Overdue ({stats.overdue})</SelectItem>
                <SelectItem value="today">Today ({stats.today})</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reminders List */}
          <div className="space-y-4">
            {sortedReminders.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="text-muted-foreground">
                  {searchTerm || filter !== 'all'
                    ? 'No reminders match your filters'
                    : 'No reminders yet'}
                </div>
                {!searchTerm && filter === 'all' && (
                  <p className="text-sm text-muted-foreground/60 mt-2">
                    Create your first reminder to get started
                  </p>
                )}
              </Card>
            ) : (
              sortedReminders.map(
                (reminder) =>
                  reminder && (
                    <ReminderCard
                      key={reminder.id}
                      reminder={reminder}
                      colleagues={colleagues}
                      onUpdateReminder={handleUpdateReminder}
                      onDeleteReminder={handleDeleteReminder}
                    />
                  ),
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TasksView
