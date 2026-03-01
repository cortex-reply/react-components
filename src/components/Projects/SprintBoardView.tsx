import React, { useEffect, useState, useRef } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TaskCard } from './TaskCard'
import { AddTaskModal } from './AddTaskModal'
import { TaskDetailsModal } from './TaskDetailsModal'
import { AddEpicModal } from './AddEpicModal'
import { AddSprintModal } from './AddSprintModal'
import { DashboardHero } from '../Heros/DashboardHero'

import { Project, Epic, Sprint, Task, DigitalColleague, User, Colleague } from '../Foundry/types'
import { extractId } from '@/lib/utils/extract-id'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { Calendar, Plus, X } from 'lucide-react'

export interface SprintBoardViewProps {
  initialTasks?: Task[]
  initialEpics?: Epic[]
  initialSprints?: Sprint[]
  initialProjects?: Project[]
  initialUsers?: User[]
  initialColleagues?: Colleague[]
  // Task handlers
  onAddTask?: (newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void
  onUpdateTask?: (taskId: string, updates: Partial<Task>) => void
  onDeleteTask?: (taskId: string) => void
  onTaskClick?: (task: Task) => void
  // Epic handlers
  onAddEpic?: (newEpic: Omit<Epic, 'id' | 'updatedAt' | 'createdAt'>) => void
  // Sprint handlers
  onAddSprint?: (sprint: Omit<Sprint, 'id'>) => void
  onAddComment?: ({ content, taskId }: { taskId: string; content: string }) => void
  onUploadFile?: (taskId: string, file: FormData) => Promise<void>
  onDeleteFile?: (taskId: string, fileId: string) => Promise<void>
  onFileUpdate?: (fileId: string, content: string) => void
}

export const SprintBoardView: React.FC<SprintBoardViewProps> = ({
  initialTasks = [],
  initialEpics = [],
  initialSprints = [],
  initialUsers = [],
  initialColleagues = [],
  initialProjects = [],
  // Task handlers
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onTaskClick,
  // Epic handlers
  onAddEpic,
  // Sprint handlers
  onAddSprint,
  onAddComment,
  onUploadFile,
  onDeleteFile,
  onFileUpdate,
}) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [epics, setEpics] = useState<Epic[]>([])
  const [sprints, setSprints] = useState<Sprint[]>([])
  const [colleagues, setColleagues] = useState<Colleague[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [selectedSprintIds, setSelectedSprintIds] = useLocalStorage<string[]>(
    'sprintBoardView_selectedSprints',
    [],
  )
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [isAddEpicModalOpen, setIsAddEpicModalOpen] = useState(false)
  const [isAddSprintModalOpen, setIsAddSprintModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [dragOverSprintId, setDragOverSprintId] = useState<number | null>(null)
  const [dragOverBacklog, setDragOverBacklog] = useState(false)
  const [isSprintSelectorOpen, setIsSprintSelectorOpen] = useState(false)
  const [heroHeight, setHeroHeight] = useState(0)

  const heroRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const prevTaskHash = useRef<string>('')
  const prevEpicHash = useRef<string>('')
  const prevSprintHash = useRef<string>('')
  const prevColleagueHash = useRef<string>('')

  const getHash = (
    list: { id: string | number; createdAt: string; updatedAt: string }[],
    additionalInfo?: string,
  ) => {
    return (
      list
        .map(
          (item) =>
            `${item.id}-${new Date(item.createdAt).getTime()}-${new Date(
              item.updatedAt,
            ).getTime()}`,
        )
        .join('-') + (additionalInfo ? `-${additionalInfo}` : '')
    )
  }

  useEffect(() => {
    const filesUpdatedAt = initialTasks
      .map((task) =>
        task.files
          ?.filter((el) => typeof el === 'object')
          .map((file) => new Date(file.updatedAt).getTime()),
      )
      .flat()
    const next = getHash(initialTasks, filesUpdatedAt.join('-'))
    if (next !== prevTaskHash.current) {
      setTasks(initialTasks)
      if (selectedTask) {
        setSelectedTask(initialTasks.find((task) => task.id === selectedTask.id) || null)
      }
      prevTaskHash.current = next
    }
  }, [initialTasks])

  useEffect(() => {
    const next = getHash(initialEpics)
    if (next !== prevEpicHash.current) {
      setEpics(initialEpics)
      prevEpicHash.current = next
    }
  }, [initialEpics])

  useEffect(() => {
    const next = getHash(initialSprints)
    if (next !== prevSprintHash.current) {
      setSprints(initialSprints)
      prevSprintHash.current = next
    }
  }, [initialSprints])

  useEffect(() => {
    const next = getHash(
      initialColleagues.map((el) => ({
        id: el.id,
        updatedAt: el.updatedAt,
        createdAt: el.createdAt,
      })),
    )
    if (next !== prevColleagueHash.current) {
      setColleagues(initialColleagues)
      prevColleagueHash.current = next
    }
  }, [initialColleagues])

  // Measure hero height and adjust when it changes
  useEffect(() => {
    const measureHeroHeight = () => {
      if (heroRef.current) {
        const height = heroRef.current.offsetHeight
        setHeroHeight(height)
      }
    }

    measureHeroHeight()

    const resizeObserver = new ResizeObserver(measureHeroHeight)
    if (heroRef.current) {
      resizeObserver.observe(heroRef.current)
    }

    const handleStorageChange = () => {
      setTimeout(measureHeroHeight, 100)
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (heroRef.current) {
        setHeroHeight(heroRef.current.offsetHeight)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [isAddTaskModalOpen, isAddEpicModalOpen])

  const getTasksByEpic = (tasks: Task[]) => {
    const tasksByEpic: { [epicId: string]: Task[] } = {}
    epics.forEach((epic) => {
      tasksByEpic[epic.id] = tasks.filter((task) => extractId(task.epic) === epic.id)
    })
    tasksByEpic['no-epic'] = tasks.filter((task) => !extractId(task.epic))
    return tasksByEpic
  }

  const handleDragStart = (task: Task) => {
    setDraggedTask(task)
  }

  const handleDragOverSprint = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragOverBacklog = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDropOnSprint = (sprintId: number) => {
    if (!draggedTask) return

    const currentSprint = extractId(draggedTask.sprint)
    if (currentSprint !== sprintId) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === draggedTask.id ? { ...task, sprint: sprintId } : task,
        ),
      )
      onUpdateTask?.(draggedTask.id.toString(), { sprint: sprintId })
    }

    setDraggedTask(null)
    setDragOverSprintId(null)
  }

  const handleDropOnBacklog = () => {
    if (!draggedTask) return

    const currentSprint = extractId(draggedTask.sprint)
    if (currentSprint) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === draggedTask.id ? { ...task, sprint: null } : task,
        ),
      )
      onUpdateTask?.(draggedTask.id.toString(), { sprint: null })
    }

    setDraggedTask(null)
    setDragOverBacklog(false)
  }

  const handleAddTask = async (newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const temporaryTask: Task = {
      ...newTask,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setTasks((prev) => [...prev, temporaryTask])

    try {
      const realTask = await onAddTask?.(newTask)

      if (realTask) {
        setTasks((prev) => prev.map((task) => (task.id === temporaryTask.id ? realTask : task)))
      }
    } catch (error) {
      setTasks((prev) => prev.filter((task) => task.id !== temporaryTask.id))
      throw error
    }
  }

  const handleUpdateTask = async (taskId: string, updates: Partial<Task>): Promise<void> => {
    setTasks((prev) =>
      prev.map((task) => (task.id === Number(taskId) ? { ...task, ...updates } : task)),
    )
    if (onUpdateTask) {
      await onUpdateTask(taskId, updates)
    }

    if (selectedTask?.id === Number(taskId)) {
      setSelectedTask((prev) => ({ ...prev, ...updates }) as Task)
    }
  }

  const handleDeleteTask = async (taskId: string): Promise<void> => {
    setTasks((prev) => prev.filter((task) => task.id !== Number(taskId)))
    if (selectedTask?.id === Number(taskId)) {
      setSelectedTask(null)
    }
    if (onDeleteTask) {
      await onDeleteTask(taskId)
    }
  }

  const handleAddEpic = (newEpic: Omit<Epic, 'id' | 'updatedAt' | 'createdAt'>) => {
    const epic: Epic = {
      ...newEpic,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setEpics((prev) => [...prev, epic])
    onAddEpic?.(newEpic)
  }

  const handleAddSprint = (sprintData: Omit<Sprint, 'id'>) => {
    onAddSprint?.(sprintData)
    setIsAddSprintModalOpen(false)
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    onTaskClick?.(task)
  }

  const toggleSprintView = (sprintId: string) => {
    const updatedIds = selectedSprintIds.includes(sprintId)
      ? selectedSprintIds.filter((id) => id !== sprintId)
      : selectedSprintIds.length < 3
        ? [...selectedSprintIds, sprintId]
        : selectedSprintIds

    setSelectedSprintIds(updatedIds)
  }

  const visibleSprints = sprints.filter((sprint) =>
    selectedSprintIds.includes(sprint.id.toString()),
  )

  const backlogTasks = tasks.filter((task) => !extractId(task.sprint))

  // Calculate the height to pass to columns
  const calculatedHeight =
    heroHeight > 0 ? `calc(100vh - ${heroHeight + 120}px)` : 'calc(100vh - 12rem)'

  const selectedEpicIds = React.useMemo<number[]>(
    () => [...epics.map((e) => e.id), 0], // include "no-epic" sentinel id 0
    [epics],
  )

  return (
    <div ref={containerRef} className="h-full flex flex-col px-2 md:px-4 py-4">
      <div ref={heroRef} className="flex-shrink-0">
        <DashboardHero
          title="Sprint Board"
          description="Manage tasks across your sprint timeline with a kanban-style board."
          gradient="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600"
          primaryAction={{
            label: 'Add task',
            onClick: () => setIsAddTaskModalOpen(true),
          }}
          secondaryAction={{
            label: 'Add sprint',
            onClick: () => setIsAddSprintModalOpen(true),
          }}
          tertiaryAction={{
            label: 'Add epic',
            onClick: () => setIsAddEpicModalOpen(true),
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
          {/* Sprint Selector Bar */}
          <div className="mb-4">
            <Card className="p-3 bg-card shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">Sprint Board</h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedSprintIds?.length}/3 selected
                    </p>
                  </div>

                  {/* Current Selection - Always Visible */}
                  {selectedSprintIds?.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Viewing:</span>
                      <div className="flex flex-wrap gap-1">
                        {visibleSprints.map((sprint) => (
                          <div
                            key={sprint.id}
                            className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded text-xs"
                          >
                            <span className="max-w-[80px] truncate">{sprint.name}</span>
                            <button
                              onClick={() => toggleSprintView(sprint.id.toString())}
                              className="ml-0.5 hover:bg-primary/20 h-8 rounded p-0.5"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
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
                    Choose up to 3 sprints to view in your sprint board
                  </p>
                </div>

                <div className="flex flex-col flex-1 p-4 min-h-0">
                  {/* Sprint List */}
                  <div className="space-y-2 flex-1 overflow-y-auto">
                    {sprints.length > 0 ? (
                      sprints.map((sprint) => {
                        const isSelected = selectedSprintIds.includes(sprint.id.toString())
                        const taskCount = tasks.filter(
                          (task) => extractId(task.sprint) === sprint.id,
                        ).length
                        const canSelect = !isSelected && selectedSprintIds.length < 3

                        return (
                          <div
                            key={sprint.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-primary/10 border-primary/30 ring-1 ring-primary/20'
                                : canSelect
                                ? 'bg-card border-border hover:border-primary/50 hover:bg-muted/50'
                                : 'bg-muted/30 border-border/30 opacity-60'
                            }`}
                            onClick={() => {
                              if (canSelect) {
                                toggleSprintView(sprint.id.toString())
                              } else if (isSelected) {
                                toggleSprintView(sprint.id.toString())
                              }
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-foreground truncate">
                                  {sprint.name}
                                </p>
                                {sprint.description && (
                                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                    {sprint.description}
                                  </p>
                                )}
                                {sprint.startDate && sprint.endDate && (
                                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    <span>
                                      {new Date(sprint.startDate).toLocaleDateString()} -{' '}
                                      {new Date(sprint.endDate).toLocaleDateString()}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="ml-2 flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs">
                                  {taskCount}
                                </Badge>
                                <div
                                  className={`h-4 w-4 rounded border-2 transition-all ${
                                    isSelected
                                      ? 'bg-primary border-primary'
                                      : 'border-muted-foreground hover:border-foreground'
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-sm text-muted-foreground">No sprints available</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Sprint Columns Grid */}
          {visibleSprints.length > 0 || backlogTasks.length > 0 ? (
            <div className="grid gap-6 h-full overflow-x-auto" style={{ gridTemplateColumns: `repeat(${visibleSprints.length + 1}, minmax(350px, 1fr))` }}>
              {/* Backlog Column */}
              <Card
                className={`p-4 bg-card border-l-4 border-l-amber-500 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col ${
                  dragOverBacklog ? 'ring-2 ring-amber-500 bg-amber-50/50 dark:bg-amber-950/20' : ''
                }`}
                style={{ height: calculatedHeight }}
                onDragOver={handleDragOverBacklog}
                onDragEnter={() => setDragOverBacklog(true)}
                onDragLeave={() => setDragOverBacklog(false)}
                onDrop={handleDropOnBacklog}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-lg truncate">
                        Backlog
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Unscheduled tasks
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-muted text-muted-foreground flex-shrink-0">
                    {backlogTasks.length}
                  </Badge>
                </div>

                {/* Tasks Container */}
                <div className="flex-1 overflow-y-auto space-y-4 min-h-0">
                  {/* Unassigned Tasks (No Epic) */}
                  {backlogTasks.filter((t) => !extractId(t.epic)).length > 0 && (
                    <div className="space-y-3">
                      {backlogTasks
                        .filter((t) => !extractId(t.epic))
                        .map((task) => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            epic={null}
                            onDragStart={handleDragStart}
                            onTaskClick={handleTaskClick}
                            isCompact={false}
                          />
                        ))}
                    </div>
                  )}

                  {/* Tasks Grouped by Epic */}
                  {selectedEpicIds.map((epicId) => {
                    const epic = epics.find((e) => e.id === epicId)
                    const epicTasks = backlogTasks.filter((t) => extractId(t.epic) === epicId) || []

                    if (epicTasks.length === 0) return null

                    return (
                      <div key={epicId} className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-3 h-3 rounded-full ${epic?.color}`}></div>
                          <span className="text-sm font-medium text-muted-foreground select-none">
                            {epic?.name}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {epicTasks.length}
                          </Badge>
                        </div>
                        <div className="space-y-3">
                          {epicTasks.map((task) => (
                            <TaskCard
                              key={task.id}
                              task={task}
                              epic={epic!}
                              onDragStart={handleDragStart}
                              onTaskClick={handleTaskClick}
                              isCompact={false}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  })}

                  {/* Empty State */}
                  {backlogTasks.length === 0 && (
                    <div className="flex items-center justify-center h-32 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">No backlog tasks</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsAddTaskModalOpen(true)}
                          className="mt-2 gap-1"
                        >
                          <Plus className="h-3 w-3" />
                          Add task
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Sprint Columns */}
              {visibleSprints.map((sprint) => {
                const sprintTasks = tasks.filter((task) => extractId(task.sprint) === sprint.id)
                const tasksByEpic = getTasksByEpic(sprintTasks)

                return (
                  <Card
                    key={sprint.id}
                    className={`p-4 bg-card border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col ${
                      dragOverSprintId === sprint.id ? 'ring-2 ring-blue-500 bg-blue-50/50 dark:bg-blue-950/20' : ''
                    }`}
                    style={{ height: calculatedHeight }}
                    onDragOver={handleDragOverSprint}
                    onDragEnter={() => setDragOverSprintId(sprint.id)}
                    onDragLeave={() => setDragOverSprintId(null)}
                    onDrop={() => handleDropOnSprint(sprint.id)}
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between mb-4 flex-shrink-0">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground text-lg truncate">
                            {sprint.name}
                          </h3>
                          {sprint.startDate && sprint.endDate && (
                            <p className="text-xs text-muted-foreground">
                              {new Date(sprint.startDate).toLocaleDateString()} -{' '}
                              {new Date(sprint.endDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground flex-shrink-0">
                        {sprintTasks.length}
                      </Badge>
                    </div>

                    {/* Tasks Container */}
                    <div className="flex-1 overflow-y-auto space-y-4 min-h-0">
                      {/* Unassigned Tasks (No Epic) */}
                      {tasksByEpic['no-epic']?.length > 0 && (
                        <div className="space-y-3">
                          {tasksByEpic['no-epic'].map((task) => (
                            <TaskCard
                              key={task.id}
                              task={task}
                              epic={null}
                              onDragStart={handleDragStart}
                              onTaskClick={handleTaskClick}
                              isCompact={false}
                            />
                          ))}
                        </div>
                      )}

                      {/* Tasks Grouped by Epic */}
                      {selectedEpicIds.map((epicId) => {
                        const epic = epics.find((e) => e.id === epicId)
                        const epicTasks = tasksByEpic[epicId] || []

                        if (epicTasks.length === 0) return null

                        return (
                          <div key={epicId} className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                              <div className={`w-3 h-3 rounded-full ${epic?.color}`}></div>
                              <span className="text-sm font-medium text-muted-foreground select-none">
                                {epic?.name}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {epicTasks.length}
                              </Badge>
                            </div>
                            <div className="space-y-3">
                              {epicTasks.map((task) => (
                                <TaskCard
                                  key={task.id}
                                  task={task}
                                  epic={epic!}
                                  onDragStart={handleDragStart}
                                  onTaskClick={handleTaskClick}
                                  isCompact={false}
                                />
                              ))}
                            </div>
                          </div>
                        )
                      })}

                      {/* Empty State */}
                      {sprintTasks.length === 0 && (
                        <div className="flex items-center justify-center h-32 text-center">
                          <div>
                            <p className="text-sm text-muted-foreground">No tasks in this sprint</p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setIsAddTaskModalOpen(true)}
                              className="mt-2 gap-1"
                            >
                              <Plus className="h-3 w-3" />
                              Add task
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium text-foreground mb-2">No tasks in backlog</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Create your first task to get started
                </p>
                <Button
                  onClick={() => setIsAddTaskModalOpen(true)}
                  className="gap-1"
                >
                  <Plus className="h-3 w-3" />
                  Add Task
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onAddTask={handleAddTask}
        assignees={[...colleagues, ...users]}
        epics={epics}
        sprints={sprints}
      />

      <AddEpicModal
        isOpen={isAddEpicModalOpen}
        onClose={() => setIsAddEpicModalOpen(false)}
        onAddEpic={handleAddEpic}
      />

      {selectedTask && (
        <TaskDetailsModal
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          initialTask={selectedTask}
          epics={epics}
          sprints={sprints}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          colleagues={colleagues}
          onUploadFile={onUploadFile}
          onDeleteFile={onDeleteFile}
          onFileUpdate={onFileUpdate}
          onAddComment={onAddComment}
        />
      )}

      <AddSprintModal
        isOpen={isAddSprintModalOpen}
        onClose={() => setIsAddSprintModalOpen(false)}
        onAddSprint={handleAddSprint}
      />
    </div>
  )
}
