import React, { use, useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Task, Epic, Sprint } from '../DigitalColleagues/types'
import { Calendar, User, Plus, CalendarDays } from 'lucide-react'
import { AddSprintModal } from './AddSprintModal'
import { DashboardHero } from '../Heros/DashboardHero/DashboardHero'

interface PlanningViewProps {
  tasks: Task[]
  epics: Epic[]
  sprints: Sprint[]
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void
  onTaskClick: (task: Task) => void
  onAddSprint: (sprint: Omit<Sprint, 'id'>) => void
}

export const PlanningView: React.FC<PlanningViewProps> = ({
  tasks,
  epics,
  sprints,
  onUpdateTask,
  onTaskClick,
  onAddSprint,
}) => {
  const [selectedSprintIds, setSelectedSprintIds] = useState<string[]>(['2']) // Default to Sprint 2
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [isAddSprintModalOpen, setIsAddSprintModalOpen] = useState(false)
  const [dragOverTarget, setDragOverTarget] = useState<string | null>(null)
  const [backlogTasks, setBacklogTasks] = useState<Task[]>(tasks.filter((task) => !task.sprintId))
  const [sprintTasks, setSprintTasks] = useState<Task[]>(
    tasks.filter((task) => task.sprintId && selectedSprintIds.includes(task.sprintId)),
  )
  const [sortedSprints, setSortedSprints] = useState<Sprint[]>(
    sprints
      .filter((s) => s.id !== 'backlog' && s.id !== 'all-tasks')
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime()),
  )

  useEffect(() => {
    setBacklogTasks(tasks.filter((task) => !task.sprintId))
    setSprintTasks(
      tasks.filter((task) => task.sprintId && selectedSprintIds.includes(task.sprintId)),
    )
    setSortedSprints(
      sprints
        .filter((s) => s.id !== 'backlog' && s.id !== 'all-tasks')
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime()),
    )
  }, [tasks, sprints, selectedSprintIds])

  const getEpicById = (epicId: string) => epics.find((epic) => epic.id === epicId)
  const getSprintById = (sprintId: string) => sprints.find((sprint) => sprint.id === sprintId)

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive/20 text-destructive'
      case 'medium':
        return 'bg-warning/20 text-warning'
      case 'low':
        return 'bg-success/20 text-success'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  const handleDragStart = (task: Task) => {
    setDraggedTask(task)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDragEnter = (sprintId: string) => {
    setDragOverTarget(sprintId)
  }

  const handleDragLeave = () => {
    setDragOverTarget(null)
  }

  const handleDrop = (e: React.DragEvent, sprintId: string) => {
    e.preventDefault()
    setDragOverTarget(null)
    if (draggedTask) {
      onUpdateTask(draggedTask.id, {
        sprintId: sprintId === 'backlog' ? undefined : sprintId,
      })
      setDraggedTask(null)
    }
  }

  const toggleSprintView = (sprintId: string) => {
    if (sprintId === 'backlog' || sprintId === 'all-tasks') return

    setSelectedSprintIds((prev) =>
      prev.includes(sprintId) ? prev.filter((id) => id !== sprintId) : [...prev, sprintId],
    )
  }

  const handleAddSprint = (sprint: Omit<Sprint, 'id'>) => {
    onAddSprint(sprint)
    setIsAddSprintModalOpen(false)
  }

  const CompactTaskCard: React.FC<{ task: Task; showSprint?: boolean }> = ({
    task,
    showSprint = false,
  }) => {
    const epic = getEpicById(task.epicId)
    const sprint = task.sprintId ? getSprintById(task.sprintId) : null
    const [isDragging, setIsDragging] = useState(false)

    const handleClick = (e: React.MouseEvent) => {
      // Don't trigger click when dragging
      if (e.defaultPrevented || isDragging) return
      onTaskClick(task)
    }

    const handleCardDragStart = (e: React.DragEvent) => {
      setIsDragging(true)
      handleDragStart(task)
    }

    const handleCardDragEnd = () => {
      setIsDragging(false)
    }

    return (
      <Card
        className={`p-3 cursor-grab transition-all duration-200 hover:shadow-md bg-card border-border hover:border-border/80 active:cursor-grabbing ${
          isDragging ? 'opacity-50 shadow-lg scale-105' : ''
        } ${draggedTask?.id === task.id ? 'ring-2 ring-primary' : ''}`}
        draggable
        onDragStart={handleCardDragStart}
        onDragEnd={handleCardDragEnd}
        onClick={handleClick}
      >
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-sm text-foreground line-clamp-1 select-none pointer-events-none">
              {task.title}
            </h4>
            <Badge
              className={`text-xs select-none pointer-events-none ${getPriorityColor(
                task.priority,
              )}`}
            >
              {task.priority[0].toUpperCase()}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-xs pointer-events-none">
            <div className="flex items-center gap-1">
              {epic && <div className={`w-2 h-2 rounded-full ${epic.color}`}></div>}
              <span className="text-muted-foreground truncate select-none">{epic?.name}</span>
            </div>
            <span className="text-muted-foreground select-none">{getInitials(task.assignee)}</span>
          </div>

          {showSprint && sprint && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground pointer-events-none">
              <Calendar className="h-3 w-3" />
              <span className="select-none">{sprint.name}</span>
            </div>
          )}
        </div>
      </Card>
    )
  }

  return (
    <div className="px-2 md:px-4 py-4 space-y-8">
      <DashboardHero
        title="Sprint Planning"
        description="Plan and organize tasks across sprints and manage your development timeline."
        gradient="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600"
        primaryAction={{
          label: 'Add sprint',
          onClick: () => setIsAddSprintModalOpen(true),
        }}
      />
      <div className="flex-1">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
            {/* Backlog Column */}
            <div className="lg:col-span-1">
              <Card
                className="p-4 h-full bg-card shadow-sm"
                onDragOver={handleDragOver}
                onDragEnter={() => handleDragEnter('backlog')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'backlog')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground select-none">Backlog</h3>
                  <Badge variant="secondary" className="bg-muted text-muted-foreground">
                    {backlogTasks.length}
                  </Badge>
                </div>

                <div
                  className={`space-y-3 overflow-y-auto max-h-[600px] min-h-[200px] border-2 border-dashed rounded p-3 transition-colors ${
                    dragOverTarget === 'backlog' ? 'border-primary bg-primary/10' : 'border-border'
                  }`}
                >
                  {backlogTasks.map((task) => (
                    <CompactTaskCard key={task.id} task={task} />
                  ))}
                  {backlogTasks.length === 0 && (
                    <div className="flex items-center justify-center h-32 text-muted-foreground text-sm select-none">
                      Drop tasks here to move to backlog
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Sprint Columns */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {/* Sprint Selection */}
                <Card className="p-4 bg-card shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground select-none">
                      Select Sprints to View
                    </h3>
                    <Button
                      onClick={() => setIsAddSprintModalOpen(true)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                      Add Sprint
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {sortedSprints.map((sprint) => (
                      <Button
                        key={sprint.id}
                        variant={selectedSprintIds.includes(sprint.id) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleSprintView(sprint.id)}
                        className="text-xs h-8"
                      >
                        {sprint.name}
                        {sprint.isActive && <span className="ml-1 text-success">●</span>}
                      </Button>
                    ))}
                  </div>
                </Card>
                {/* Sprint Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedSprintIds
                    .map((sprintId) => sortedSprints.find((s) => s.id === sprintId))
                    .filter(Boolean)
                    .sort((a, b) => a!.startDate.getTime() - b!.startDate.getTime())
                    .map((sprint) => {
                      const sprintTasksFiltered = sprintTasks.filter(
                        (task) => task.sprintId === sprint!.id,
                      )

                      return (
                        <Card
                          key={sprint!.id}
                          className="p-4 bg-card shadow-sm"
                          onDragOver={handleDragOver}
                          onDragEnter={() => handleDragEnter(sprint!.id)}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, sprint!.id)}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-foreground select-none">
                                {sprint!.name}
                              </h3>
                              {sprint!.isActive && (
                                <span className="text-xs text-success font-medium select-none">
                                  Active Sprint
                                </span>
                              )}
                            </div>
                            <Badge variant="secondary" className="bg-muted text-muted-foreground">
                              {sprintTasksFiltered.length}
                            </Badge>
                          </div>

                          <div
                            className={`space-y-3 overflow-y-auto max-h-[500px] min-h-[200px] border-2 border-dashed rounded p-3 transition-colors ${
                              dragOverTarget === sprint!.id
                                ? 'border-primary bg-primary/10'
                                : 'border-border'
                            }`}
                          >
                            {sprintTasksFiltered.map((task) => (
                              <CompactTaskCard key={task.id} task={task} />
                            ))}
                            {sprintTasksFiltered.length === 0 && (
                              <div className="flex items-center justify-center h-32 text-muted-foreground text-sm select-none">
                                Drop tasks here
                              </div>
                            )}
                          </div>
                        </Card>
                      )
                    })}
                </div>{' '}
              </div>
            </div>
          </div>

          <AddSprintModal
            isOpen={isAddSprintModalOpen}
            onClose={() => setIsAddSprintModalOpen(false)}
            onAddSprint={handleAddSprint}
          />
        </div>
      </div>
    </div>
  )
}
