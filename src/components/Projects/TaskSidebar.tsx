import React from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Calendar,
  Clock,
  User,
  Trash2,
  BookOpen,
  Bug,
  Zap,
  AlertCircle,
  Loader2,
  Check,
  X,
} from 'lucide-react'
import { Task, Epic, Sprint, DigitalColleague, User as UserType } from '../DigitalColleagues/types'
import { TaskSelect } from './TaskSelect'
import { SearchableSelect } from '../DigitalColleagues/SearchableSelect'

type UpdateState = 'idle' | 'loading' | 'success' | 'error'

const taskTypes = [
  {
    value: 'story',
    label: 'Story',
    color: 'bg-primary/20 text-primary',
    icon: BookOpen,
  },
  {
    value: 'task',
    label: 'Task',
    color: 'bg-muted text-muted-foreground',
    icon: AlertCircle,
  },
  {
    value: 'bug',
    label: 'Bug',
    color: 'bg-destructive/20 text-destructive',
    icon: Bug,
  },
  {
    value: 'spike',
    label: 'Spike',
    color: 'bg-accent/20 text-accent',
    icon: Zap,
  },
]

const priorities = [
  {
    value: 'low',
    label: 'Low',
    color: 'bg-success/20 text-success',
  },
  {
    value: 'medium',
    label: 'Medium',
    color: 'bg-warning/20 text-warning',
  },
  {
    value: 'high',
    label: 'High',
    color: 'bg-destructive/20 text-destructive',
  },
]

const teamMembers = [
  {
    value: 'John Doe',
    label: 'John Doe',
  },
  {
    value: 'Jane Smith',
    label: 'Jane Smith',
  },
  {
    value: 'Bob Wilson',
    label: 'Bob Wilson',
  },
  {
    value: 'Alice Johnson',
    label: 'Alice Johnson',
  },
  {
    value: 'Carol Brown',
    label: 'Carol Brown',
  },
  {
    value: 'David Lee',
    label: 'David Lee',
  },
  {
    value: 'Emma Davis',
    label: 'Emma Davis',
  },
  {
    value: 'Frank Miller',
    label: 'Frank Miller',
  },
  {
    value: 'Grace Taylor',
    label: 'Grace Taylor',
  },
  {
    value: 'Unassigned',
    label: 'Unassigned',
  },
]

interface TaskSidebarProps {
  task: Task
  epics: Epic[]
  sprints: Sprint[]
  lastUpdated: Date
  onUpdateTask: (fieldName: string, value: string) => void | Promise<void>
  onClose: () => void
  onDelete: () => void | Promise<void>
  isUpdating?: boolean
  isDeleting?: boolean
  deleteState?: UpdateState
  teamMembers: (UserType | DigitalColleague)[]
}

export const TaskSidebar: React.FC<TaskSidebarProps> = ({
  task,
  epics,
  sprints,
  lastUpdated,
  onUpdateTask,
  onClose,
  onDelete,
  isUpdating = false,
  isDeleting = false,
  deleteState = 'idle',
  teamMembers,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  const renderDeleteButton = () => {
    if (deleteState === 'loading') {
      return (
        <Button disabled variant="destructive" className="w-full h-8 text-xs gap-1">
          <Loader2 className="h-3 w-3 animate-spin" />
          Deleting...
        </Button>
      )
    }

    if (deleteState === 'success') {
      return (
        <Button disabled variant="destructive" className="w-full h-8 text-xs gap-1">
          <Check className="h-3 w-3" />
          Deleted
        </Button>
      )
    }

    if (deleteState === 'error') {
      return (
        <Button disabled variant="destructive" className="w-full h-8 text-xs gap-1">
          <X className="h-3 w-3" />
          Delete failed
        </Button>
      )
    }

    return (
      <Button
        onClick={onDelete}
        variant="destructive"
        className="w-full h-8 text-xs gap-1"
        disabled={isUpdating || isDeleting}
      >
        <Trash2 className="h-3 w-3" />
        Delete Task
      </Button>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top section with form fields */}
      <div className="space-y-4" style={{ opacity: isUpdating ? 0.6 : 1 }}>
        {/* Status */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Status</Label>
          <TaskSelect
            label=""
            value={task.status}
            onValueChange={(value) => onUpdateTask('status', value)}
            options={[
              {
                value: 'todo',
                label: 'To Do',
              },
              {
                value: 'in-progress',
                label: 'In Progress',
              },
              {
                value: 'done',
                label: 'Done',
              },
            ]}
            disabled={isUpdating}
          />
        </div>

        {/* Type with Button Group */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Type</Label>
          <ToggleGroup
            type="single"
            value={task.type}
            onValueChange={(value) => value && onUpdateTask('type', value)}
            className="grid grid-cols-2 gap-1"
            disabled={isUpdating}
          >
            {taskTypes.map((type) => {
              const IconComponent = type.icon
              return (
                <ToggleGroupItem
                  key={type.value}
                  value={type.value}
                  className="flex items-center gap-1 text-xs h-8 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                  size="sm"
                  disabled={isUpdating}
                >
                  <IconComponent className="h-3 w-3" />
                  {type.label}
                </ToggleGroupItem>
              )
            })}
          </ToggleGroup>
        </div>

        {/* Priority with Button Group */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Priority</Label>
          <ToggleGroup
            type="single"
            value={task.priority}
            onValueChange={(value) => value && onUpdateTask('priority', value)}
            className="grid grid-cols-3 gap-1"
            disabled={isUpdating}
          >
            {priorities.map((priority) => (
              <ToggleGroupItem
                key={priority.value}
                value={priority.value}
                className="text-xs h-8 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                size="sm"
                disabled={isUpdating}
              >
                {priority.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Story Points */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Story Points</Label>
          <input
            type="number"
            min="1"
            max="100"
            value={task.points || 1}
            onChange={(e) => onUpdateTask('points', e.target.value)}
            className="w-full h-8 px-2 text-xs border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isUpdating}
          />
        </div>

        {/* Epic */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Epic</Label>
          <TaskSelect
            label=""
            value={task.epicId}
            onValueChange={(value) => onUpdateTask('epicId', value)}
            options={(epics || []).map((epic) => ({
              value: epic.id,
              label: epic?.name,
              color: epic.color,
            }))}
            showColor
            disabled={isUpdating}
          />
        </div>

        {/* Sprint */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Sprint</Label>
          <TaskSelect
            label=""
            value={task.sprintId || 'none'}
            onValueChange={(value) => onUpdateTask('sprintId', value === 'none' ? '' : value)}
            options={[
              {
                value: 'none',
                label: 'No Sprint',
              },
              ...(sprints || []).map((sprint) => ({
                value: sprint.id,
                label: `${sprint?.name}${sprint.isActive ? ' (Active)' : ''}`,
              })),
            ]}
            disabled={isUpdating}
          />
        </div>

        {/* Assignee */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Assignee</Label>
          <SearchableSelect
            label=""
            value={(task.assignee as any)?.value?.name}
            onValueChange={(value) => onUpdateTask('assignee', value)}
            options={teamMembers.map((member) => ({
              value: `${
                typeof (member as any).email === 'string' ? 'users' : 'digital-colleagues'
              }:${member.id}`,
              label: member?.name,
            }))}
            placeholder="Search team members..."
            allowCustomValue={true}
            disabled={isUpdating}
          />
        </div>
      </div>

      {/* Bottom section - pushed to bottom */}
      <div className="mt-auto pt-4 space-y-4">
        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full h-8 text-xs"
            disabled={isUpdating || isDeleting}
          >
            Close
          </Button>
          {renderDeleteButton()}
        </div>

        {/* Informational Fields */}
        <div className="pt-4 border-t border-border space-y-2">
          <div className="text-xs text-muted-foreground font-medium mb-2">Information</div>

          {/* Logged By */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Logged By</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              <span>System</span>
            </div>
          </div>

          {/* Created Date */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Created</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{new Date(task.createdAt)?.toLocaleDateString()}</span>
            </div>
          </div>

          {/* Last Updated */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Last Updated</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>
                {new Date(lastUpdated).toLocaleDateString()} at{' '}
                {new Date(lastUpdated).toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
