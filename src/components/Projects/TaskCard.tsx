import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, AlertCircle, Bug, Zap, BookOpen } from 'lucide-react'
import { Task, Epic } from '../DigitalColleagues/types'

interface TaskCardProps {
  task: Task
  epic: Epic
  onDragStart: (task: Task) => void
  onTaskClick: (task: Task) => void
  isCompact?: boolean
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  epic,
  onDragStart,
  onTaskClick,
  isCompact = false,
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(task)
  }

  const handleClick = () => {
    onTaskClick(task)
  }

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return 'bg-destructive/20 text-destructive border-destructive/20'
      case 'medium':
        return 'bg-warning/20 text-warning border-warning/20'
      case 'low':
        return 'bg-success/20 text-success border-success/20'
      default:
        return 'bg-muted text-muted-foreground border-border'
    }
  }

  const getTypeIcon = () => {
    switch (task.type) {
      case 'story':
        return <BookOpen className="h-3 w-3" />
      case 'bug':
        return <Bug className="h-3 w-3" />
      case 'spike':
        return <Zap className="h-3 w-3" />
      case 'task':
      default:
        return <AlertCircle className="h-3 w-3" />
    }
  }

  const getTypeColor = () => {
    switch (task.type) {
      case 'story':
        return 'bg-primary/20 text-primary'
      case 'bug':
        return 'bg-destructive/20 text-destructive'
      case 'spike':
        return 'bg-accent/20 text-accent'
      case 'task':
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  if (isCompact) {
    return (
      <Card
        className="p-3 bg-card border border-border hover:border-accent cursor-pointer transition-all duration-200 hover:shadow-sm"
        draggable
        onDragStart={handleDragStart}
        onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor()}`}
          >
            {getTypeIcon()}
          </div>
          <h4 className="font-medium text-foreground text-sm mb-1 line-clamp-2 select-none-important">
            {task.name}
          </h4>
        </div>
      </Card>
    )
  }

  return (
    <Card
      className="p-4 bg-card border border-border hover:border-accent cursor-pointer transition-all duration-200 hover:shadow-md"
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getTypeColor()}`}
        >
          {getTypeIcon()}
          <span className="capitalize">{task.type}</span>
        </div>
        <div className="flex gap-1">
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor()}`}
          >
            {/* <Badge className={`text-xs px-2 py-1 ${getPriorityColor()}`}> */}
            {task.priority}
            {/* </Badge> */}
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-1 border border-accent rounded-full text-xs font-medium`}
          >
            {/* <Badge variant="outline" className="text-xs px-2 py-1"> */}
            {task.points}
            {/* </Badge> */}
          </div>
        </div>
      </div>

      <h4 className="font-semibold text-foreground mb-2 select-none-important">{task.name}</h4>

      <p className="text-sm text-muted-foreground mb-3 line-clamp-2 select-none-important">
        {task.description}
      </p>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <User className="h-4 w-4" />
          <span>{(task.assignee as any)?.value?.name}</span>
        </div>
        {/* <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{task.createdAt.toLocaleDateString()}</span>
        </div> */}
      </div>
    </Card>
  )
}
