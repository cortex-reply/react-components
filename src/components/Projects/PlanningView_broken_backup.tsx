import React, { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Task, Epic, Sprint } from '../DigitalColleagues/types'
import {
  Calendar,
  User,
  Plus,
  CalendarDays,
  Edit2,
  Trash2,
  Check,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { AddSprintModal } from './AddSprintModal'
import { DashboardHero } from '../Heros/DashboardHero/DashboardHero'

interface PlanningViewProps {
  tasks: Task[]
  epics: Epic[]
  sprints: Sprint[]
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void
  onTaskClick: (task: Task) => void
  onAddSprint: (sprint: Omit<Sprint, 'id'>) => void
  onUpdateSprint: (sprintId: string, updates: Partial<Sprint>) => void
  onDeleteSprint: (sprintId: string) => void
}

export const PlanningView: React.FC<PlanningViewProps> = ({
  tasks,
  epics,
  sprints,
  onUpdateTask,
  onTaskClick,
  onAddSprint,
  onUpdateSprint,
  onDeleteSprint,
}) => {
  const [selectedSprintIds, setSelectedSprintIds] = useState<string[]>([])
  const [collapsedEpics, setCollapsedEpics] = useState<Set<string>>(new Set())
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [isAddSprintModalOpen, setIsAddSprintModalOpen] = useState(false)
  const [dragOverTarget, setDragOverTarget] = useState<string | null>(null)
  const [editingSprintId, setEditingSprintId] = useState<string | null>(null)
  const [sprintEditForm, setSprintEditForm] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    isActive: false,
  })
  const [sprintFilter, setSprintFilter] = useState<'all' | 'active' | 'upcoming'>('upcoming')
  const [isSprintSelectorOpen, setIsSprintSelectorOpen] = useState(false)
  const [heroHeight, setHeroHeight] = useState(0)

  const heroRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Measure hero height and adjust when it changes
  useEffect(() => {
    const measureHeroHeight = () => {
      if (heroRef.current) {
        const height = heroRef.current.offsetHeight
        setHeroHeight(height)
      }
    }

    // Initial measurement
    measureHeroHeight()

    // Set up ResizeObserver to watch for changes in hero height
    const resizeObserver = new ResizeObserver(measureHeroHeight)
    if (heroRef.current) {
      resizeObserver.observe(heroRef.current)
    }

    // Also listen for storage events in case the minimized state changes in another tab
    const handleStorageChange = () => {
      setTimeout(measureHeroHeight, 100) // Small delay to let the animation complete
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Re-measure when the hero content might change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (heroRef.current) {
        setHeroHeight(heroRef.current.offsetHeight)
      }
    }, 300) // Wait for any animations to complete

    return () => clearTimeout(timer)
  }, [isAddSprintModalOpen, editingSprintId]) // Re-measure when modals/editing states change

  // Handle escape key to close sprint selector
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSprintSelectorOpen) {
        setIsSprintSelectorOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isSprintSelectorOpen])

  // Filter and organize tasks
  const backlogTasks = tasks.filter((task) => !task.sprintId)
  const availableSprints = sprints
    .filter((s) => s.id !== 'backlog' && s.id !== 'all-tasks')
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

  // Auto-select active and upcoming sprints on initial load
  useEffect(() => {
    if (selectedSprintIds.length === 0 && availableSprints.length > 0) {
      const activeSprintIds = availableSprints
        .filter((sprint) => sprint.isActive)
        .slice(0, 3)
        .map((sprint) => sprint.id)

      if (activeSprintIds.length > 0) {
        setSelectedSprintIds(activeSprintIds)
      } else {
        // If no active sprints, select the next 3 upcoming sprints
        const now = new Date()
        const upcomingSprintIds = availableSprints
          .filter((sprint) => sprint.startDate >= now)
          .slice(0, 3)
          .map((sprint) => sprint.id)

        if (upcomingSprintIds.length > 0) {
          setSelectedSprintIds(upcomingSprintIds)
        } else {
          // Fallback to the 3 most recent sprints
          const recentSprintIds = availableSprints.slice(-3).map((sprint) => sprint.id)
          setSelectedSprintIds(recentSprintIds)
        }
      }
    }
  }, [availableSprints.length]) // Only run when sprints are loaded

  // Filter sprints based on selected filter
  const filteredSprints = availableSprints.filter((sprint) => {
    switch (sprintFilter) {
      case 'active':
        return sprint.isActive
      case 'upcoming':
        // Get the next 3 sprints based on start date
        const now = new Date()
        return sprint.startDate >= now
      case 'all':
      default:
        return true
    }
  })

  // For upcoming filter, limit to next 3 sprints
  const displayedSprints =
    sprintFilter === 'upcoming' ? filteredSprints.slice(0, 3) : filteredSprints

  // Limit to 3 visible sprints
  const visibleSprints = selectedSprintIds
    .map((id) => availableSprints.find((s) => s.id === id))
    .filter(Boolean)
    .slice(0, 3) as Sprint[]

  const getEpicById = (epicId: string) => epics.find((epic) => epic.id === epicId)
  const getSprintById = (sprintId: string) => sprints.find((sprint) => sprint.id === sprintId)

  // Group tasks by epic for better organization
  const getTasksByEpic = (tasks: Task[]) => {
    const tasksByEpic: { [epicId: string]: Task[] } = {}
    const unassignedTasks: Task[] = []

    tasks.forEach((task) => {
      if (task.epicId) {
        if (!tasksByEpic[task.epicId]) {
          tasksByEpic[task.epicId] = []
        }
        tasksByEpic[task.epicId].push(task)
      } else {
        unassignedTasks.push(task)
      }
    })

    return { tasksByEpic, unassignedTasks }
  }

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

    setSelectedSprintIds((prev) => {
      if (prev.includes(sprintId)) {
        return prev.filter((id) => id !== sprintId)
      } else if (prev.length < 3) {
        const newSelection = [...prev, sprintId]
        // Auto-close selector if we've reached 3 sprints
        if (newSelection.length === 3) {
          setTimeout(() => setIsSprintSelectorOpen(false), 500)
        }
        return newSelection
      } else {
        // Replace the first sprint with the new one if at limit
        return [prev[1], prev[2], sprintId]
      }
    })
  }

  const toggleEpicCollapse = (epicId: string) => {
    setCollapsedEpics((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(epicId)) {
        newSet.delete(epicId)
      } else {
        newSet.add(epicId)
      }
      return newSet
    })
  }

  const handleAddSprint = (sprint: Omit<Sprint, 'id'>) => {
    onAddSprint(sprint)
    setIsAddSprintModalOpen(false)
  }

  const handleSprintEditStart = (sprint: Sprint) => {
    setEditingSprintId(sprint.id)
    setSprintEditForm({
      name: sprint.name,
      description: sprint.description || '',
      startDate: sprint.startDate.toISOString().split('T')[0],
      endDate: sprint.endDate.toISOString().split('T')[0],
      isActive: sprint.isActive,
    })
  }

  const handleSprintEditSave = () => {
    if (editingSprintId && sprintEditForm.name.trim()) {
      onUpdateSprint(editingSprintId, {
        name: sprintEditForm.name.trim(),
        description: sprintEditForm.description.trim(),
        startDate: new Date(sprintEditForm.startDate),
        endDate: new Date(sprintEditForm.endDate),
        isActive: sprintEditForm.isActive,
      })
      setEditingSprintId(null)
    }
  }

  const handleSprintEditCancel = () => {
    setEditingSprintId(null)
    setSprintEditForm({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      isActive: false,
    })
  }

  const handleSprintSelect = (sprintId: string) => {
    onUpdateSprint(sprintId, { isSelected: true })
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
              {task.name}
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
    <div ref={containerRef} className="h-full flex flex-col px-2 md:px-4 py-4">
      <div ref={heroRef} className="flex-shrink-0">
        <DashboardHero
          title="Sprint Planning"
          description="Plan and organize tasks across sprints and manage your development timeline."
          gradient="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600"
          primaryAction={{
            label: 'Add sprint',
            onClick: () => setIsAddSprintModalOpen(true),
          }}
        />
      </div>
      <div className="flex-1 min-h-0 mt-8">
        <div
          className="h-full"
          style={{
            height: heroHeight > 0 ? `calc(100vh - ${heroHeight + 120}px)` : 'calc(100vh - 12rem)',
          }}
        >
          {/* Sprint Selector Bar - Above the main grid */}
          <div className="mb-4">
            <Card className="p-3 bg-card shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">Sprint Board</h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedSprintIds.length}/3 selected
                    </p>
                  </div>

                  {/* Current Selection - Always Visible */}
                  {selectedSprintIds.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Viewing:</span>
                      <div className="flex flex-wrap gap-1">
                        {visibleSprints.map((sprint) => (
                          <div
                            key={sprint.id}
                            className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded text-xs"
                          >
                            <span className="max-w-[80px] truncate">{sprint.name}</span>
                            {sprint.isActive && <span className="text-success text-[10px]">●</span>}
                            <button
                              onClick={() => toggleSprintView(sprint.id)}
                              className="ml-0.5 hover:bg-primary/20 rounded p-0.5"
                            >
                              <X className="h-2 w-2" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setIsAddSprintModalOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1"
                    size="sm"
                  >
                    <Plus className="h-3 w-3" />
                    Add
                  </Button>
                  <Button
                    onClick={() => setIsSprintSelectorOpen(!isSprintSelectorOpen)}
                    variant="outline"
                    size="sm"
                    className="gap-1"
                  >
                    <Calendar className="h-3 w-3" />
                    {isSprintSelectorOpen ? 'Close' : 'Select'}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Backdrop Overlay */}
            {isSprintSelectorOpen && (
              <div
                className="fixed inset-0 bg-black/20 z-[5]"
                onClick={() => setIsSprintSelectorOpen(false)}
              />
            )}

            {/* Sliding Sprint Selector Panel */}
            <div
              className={`fixed top-0 right-0 h-full w-80 bg-background border-l shadow-xl z-10 transition-all duration-300 ease-in-out ${
                isSprintSelectorOpen
                  ? 'translate-x-0 opacity-100 visible'
                  : 'translate-x-full opacity-0 invisible'
              }`}
            >
              <Card className="h-full rounded-none border-0 flex flex-col">
                <div className="p-4 border-b bg-muted/30 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground text-base">Select Sprints</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsSprintSelectorOpen(false)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Choose up to 3 sprints to view in your planning board
                  </p>
                </div>

                <div className="flex flex-col flex-1 p-4 min-h-0">
                  {/* Filter Buttons */}
                  <div className="flex gap-1 mb-4 bg-muted p-1 rounded-lg">
                    {[
                      { key: 'all', label: 'All', count: sprints.length },
                      {
                        key: 'active',
                        label: 'Active',
                        count: sprints.filter((s) => s.isActive).length,
                      },
                      {
                        key: 'upcoming',
                        label: 'Upcoming',
                        count: sprints.filter((s) => !s.isActive).length,
                      },
                    ].map((filter) => (
                      <Button
                        key={filter.key}
                        variant={sprintFilter === filter.key ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSprintFilter(filter.key as 'all' | 'active' | 'upcoming')}
                        className="text-xs h-8 px-3 flex-1"
                      >
                        {filter.label} ({filter.count})
                      </Button>
                    ))}
                  </div>

                  {/* Sprint List */}
                  <div className="space-y-2 flex-1 overflow-y-auto">
                    {displayedSprints.length > 0 ? (
                      displayedSprints.map((sprint) => {
                        const isSelected = selectedSprintIds.includes(sprint.id)
                        const taskCount = tasks.filter((task) => task.sprintId === sprint.id).length
                        const canSelect = !isSelected && selectedSprintIds.length < 3

                        return (
                          <div
                            key={sprint.id}
                            className={`p-3 rounded-lg border transition-all ${
                              isSelected
                                ? 'bg-primary/10 border-primary/30'
                                : canSelect
                                ? 'bg-card border-border hover:border-primary/50'
                                : 'bg-muted/30 border-border/30 opacity-60'
                            }`}
                          >
                            {editingSprintId === sprint.id ? (
                              <div className="space-y-3">
                                <Input
                                  value={sprintEditForm.name}
                                  onChange={(e) =>
                                    setSprintEditForm((prev) => ({ ...prev, name: e.target.value }))
                                  }
                                  className="text-sm"
                                  placeholder="Sprint name"
                                />
                                <Textarea
                                  value={sprintEditForm.description}
                                  onChange={(e) =>
                                    setSprintEditForm((prev) => ({
                                      ...prev,
                                      description: e.target.value,
                                    }))
                                  }
                                  className="text-sm min-h-[60px]"
                                  placeholder="Sprint description"
                                />
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => handleSprintEditSave()}
                                    className="flex-1"
                                  >
                                    <Check className="h-3 w-3 mr-1" />
                                    Save
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleSprintEditCancel}
                                    className="flex-1"
                                  >
                                    <X className="h-3 w-3 mr-1" />
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div className="flex items-start justify-between">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-medium text-sm text-foreground truncate">
                                        {sprint.name}
                                      </h4>
                                      {sprint.isActive && (
                                        <Badge
                                          variant="default"
                                          className="text-xs bg-green-100 text-green-800 border-green-200"
                                        >
                                          Active
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                      {sprint.description}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                      <span className="flex items-center gap-1">
                                        <CalendarDays className="h-3 w-3" />
                                        {new Date(sprint.startDate).toLocaleDateString()}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <User className="h-3 w-3" />
                                        {taskCount} tasks
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1 ml-2">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleSprintEditStart(sprint)}
                                      className="h-6 w-6 p-0"
                                    >
                                      <Edit2 className="h-3 w-3" />
                                    </Button>
                                    {sprint.id !== 'backlog' && sprint.id !== 'all-tasks' && (
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => onDeleteSprint(sprint.id)}
                                        className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                  <Button
                                    variant={isSelected ? 'default' : 'outline'}
                                    size="sm"
                                    className="text-xs w-full h-8 flex items-center justify-center cursor-pointer"
                                    onClick={() => toggleSprintView(sprint.id)}
                                    disabled={!isSelected && selectedSprintIds.length >= 3}
                                  >
                                    <span className="pointer-events-none select-none">
                                      {isSelected
                                        ? 'Deselect'
                                        : selectedSprintIds.length >= 3
                                        ? 'Limit Reached'
                                        : 'Select'}
                                    </span>
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No sprints found for "{sprintFilter}" filter</p>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => setSprintFilter('all')}
                          className="text-xs"
                        >
                          Show all sprints
                        </Button>
                      </div>
                    )}
                  </div>

                  {selectedSprintIds.length === 0 && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg border-2 border-dashed border-border">
                      <div className="text-center">
                        <Calendar className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground font-medium">
                          Select sprints to start planning
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Choose up to 3 sprints to view alongside your backlog
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Main Grid - Backlog and Sprint Columns at same level */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full flex-1 min-h-0">
            {/* Backlog Column */}
            <div className="lg:col-span-1">
              <Card
                className="p-4 h-full bg-card border-l-4 border-l-gray-400 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
                onDragOver={handleDragOver}
                onDragEnter={() => handleDragEnter('backlog')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'backlog')}
                style={{
                  height:
                    heroHeight > 0 ? `calc(100vh - ${heroHeight + 200}px)` : 'calc(100vh - 16rem)',
                }}
              >
                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                  <h3 className="font-semibold text-foreground select-none text-lg">Backlog</h3>
                  <Badge variant="secondary" className="bg-muted text-muted-foreground">
                    {backlogTasks.length}
                  </Badge>
                </div>

                <div
                  className={`flex-1 overflow-y-auto space-y-3 min-h-0 p-3 rounded transition-colors ${
                    dragOverTarget === 'backlog' ? 'bg-primary/10' : ''
                  }`}
                >
                  {(() => {
                    const { tasksByEpic, unassignedTasks } = getTasksByEpic(backlogTasks)

                    return (
                      <>
                        {/* Epic Groups */}
                        {Object.entries(tasksByEpic).map(([epicId, epicTasks]) => {
                          const epic = getEpicById(epicId)
                          if (!epic) return null
                          const isCollapsed = collapsedEpics.has(epicId)

                          return (
                            <div key={epicId} className="space-y-2">
                              <div
                                className="flex items-center gap-2 px-2 py-1 bg-muted/50 rounded text-xs cursor-pointer hover:bg-muted/70 transition-colors"
                                onClick={() => toggleEpicCollapse(epicId)}
                              >
                                <div className={`w-3 h-3 rounded-full ${epic.color}`} />
                                <span className="font-medium text-muted-foreground">
                                  {epic.name}
                                </span>
                                <span className="text-muted-foreground">({epicTasks.length})</span>
                                <div className="ml-auto">
                                  {isCollapsed ? (
                                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                  ) : (
                                    <ChevronUp className="h-3 w-3 text-muted-foreground" />
                                  )}
                                </div>
                              </div>
                              {!isCollapsed && (
                                <div className="space-y-2 pl-2">
                                  {epicTasks.map((task) => (
                                    <CompactTaskCard key={task.id} task={task} />
                                  ))}
                                </div>
                              )}
                            </div>
                          )
                        })}

                        {/* Unassigned Tasks */}
                        {unassignedTasks.length > 0 &&
                          (() => {
                            const isCollapsed = collapsedEpics.has('no-epic')
                            return (
                              <div className="space-y-2">
                                <div
                                  className="flex items-center gap-2 px-2 py-1 bg-muted/50 rounded text-xs cursor-pointer hover:bg-muted/70 transition-colors"
                                  onClick={() => toggleEpicCollapse('no-epic')}
                                >
                                  <div className="w-3 h-3 rounded-full bg-gray-400" />
                                  <span className="font-medium text-muted-foreground">No Epic</span>
                                  <span className="text-muted-foreground">
                                    ({unassignedTasks.length})
                                  </span>
                                  <div className="ml-auto">
                                    {isCollapsed ? (
                                      <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                    ) : (
                                      <ChevronUp className="h-3 w-3 text-muted-foreground" />
                                    )}
                                  </div>
                                </div>
                                {!isCollapsed && (
                                  <div className="space-y-2 pl-2">
                                    {unassignedTasks.map((task) => (
                                      <CompactTaskCard key={task.id} task={task} />
                                    ))}
                                  </div>
                                )}
                              </div>
                            )
                          })()}

                        {backlogTasks.length === 0 && (
                          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm select-none">
                            Drop tasks here to move to backlog
                          </div>
                        )}
                      </>
                    )
                  })()}
                </div>
              </Card>
            </div>

            {/* Sprint Columns - Now at same level as backlog */}
            {visibleSprints.map((sprint) => {
              const sprintTasksFiltered = tasks.filter((task) => task.sprintId === sprint.id)

              return (
                <Card
                  key={sprint.id}
                  className="p-4 h-full bg-card border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
                  onDragOver={handleDragOver}
                  onDragEnter={() => handleDragEnter(sprint.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, sprint.id)}
                  style={{
                    height:
                      heroHeight > 0
                        ? `calc(100vh - ${heroHeight + 200}px)`
                        : 'calc(100vh - 16rem)',
                  }}
                >
                  <div className="flex items-center justify-between mb-4 flex-shrink-0">
                    <div>
                      <h3 className="font-semibold text-foreground select-none text-lg">
                        {sprint.name}
                      </h3>
                      {sprint.isActive && (
                        <span className="text-xs text-success font-medium select-none">
                          Active Sprint
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-muted text-muted-foreground">
                        {sprintTasksFiltered.length}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleSprintEditStart(sprint)}
                        className="h-6 px-2"
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      {sprint.id !== 'backlog' && sprint.id !== 'all-tasks' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onDeleteSprint(sprint.id)}
                          className="h-6 px-2 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3 min-h-0">
                    {(() => {
                      const { tasksByEpic, unassignedTasks } = getTasksByEpic(sprintTasksFiltered)

                      return (
                        <>
                          {/* Epic Groups */}
                          {Object.entries(tasksByEpic).map(([epicId, epicTasks]) => {
                            const epic = getEpicById(epicId)
                            if (!epic) return null
                            const isCollapsed = collapsedEpics.has(epicId)

                            return (
                              <div key={epicId} className="space-y-2">
                                <div
                                  className="flex items-center gap-2 px-2 py-1 bg-muted/50 rounded text-xs cursor-pointer hover:bg-muted/70 transition-colors"
                                  onClick={() => toggleEpicCollapse(epicId)}
                                >
                                  <div className={`w-3 h-3 rounded-full ${epic.color}`} />
                                  <span className="font-medium text-muted-foreground">
                                    {epic.name}
                                  </span>
                                  <span className="text-muted-foreground">
                                    ({epicTasks.length})
                                  </span>
                                  <div className="ml-auto">
                                    {isCollapsed ? (
                                      <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                    ) : (
                                      <ChevronUp className="h-3 w-3 text-muted-foreground" />
                                    )}
                                  </div>
                                </div>
                                {!isCollapsed && (
                                  <div className="space-y-2 pl-2">
                                    {epicTasks.map((task) => (
                                      <CompactTaskCard key={task.id} task={task} />
                                    ))}
                                  </div>
                                )}
                              </div>
                            )
                          })}

                          {/* Unassigned Tasks */}
                          {unassignedTasks.length > 0 &&
                            (() => {
                              const isCollapsed = collapsedEpics.has('no-epic')
                              return (
                                <div className="space-y-2">
                                  <div
                                    className="flex items-center gap-2 px-2 py-1 bg-muted/50 rounded text-xs cursor-pointer hover:bg-muted/70 transition-colors"
                                    onClick={() => toggleEpicCollapse('no-epic')}
                                  >
                                    <div className="w-3 h-3 rounded-full bg-gray-400" />
                                    <span className="font-medium text-muted-foreground">
                                      No Epic
                                    </span>
                                    <span className="text-muted-foreground">
                                      ({unassignedTasks.length})
                                    </span>
                                    <div className="ml-auto">
                                      {isCollapsed ? (
                                        <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                      ) : (
                                        <ChevronUp className="h-3 w-3 text-muted-foreground" />
                                      )}
                                    </div>
                                  </div>
                                  {!isCollapsed && (
                                    <div className="space-y-2 pl-2">
                                      {unassignedTasks.map((task) => (
                                        <CompactTaskCard key={task.id} task={task} />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )
                            })()}

                          {sprintTasksFiltered.length === 0 && (
                            <div className="flex items-center justify-center h-32 text-muted-foreground text-sm select-none">
                              Drop tasks here
                            </div>
                          )}
                        </>
                      )
                    })()}
                  </div>
                </Card>
              )
            })}
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
