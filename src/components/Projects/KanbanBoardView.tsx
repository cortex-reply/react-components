import React, { useEffect, useState, useRef } from 'react'

import { Badge } from '@/components/ui/badge'
import { KanbanColumn } from './KanbanColumn'
import { TaskCard } from './TaskCard'
import { AddTaskModal } from './AddTaskModal'
import { TaskDetailsModal } from './TaskDetailsModal'

import { AddEpicModal } from './AddEpicModal'
import { DashboardHero } from '../Heros/DashboardHero'

import { Project, Epic, Sprint, Task, DigitalColleague, User, Colleague } from '../Foundary/types'
import { extractId } from '@/lib/utils/extract-id'

export interface KanbanBoardProps {
  initialTasks?: Task[]
  initialEpics?: Epic[]
  initialSprints?: (Sprint & { isSelected: boolean })[]
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
  onAddComment?: ({ content, taskId }: { taskId: string; content: string }) => void
  onUploadFile?: (taskId: string, file: FormData) => Promise<void>
  onDeleteFile?: (taskId: string, fileId: string) => Promise<void>
  onFileUpdate?: (fileId: string, content: string) => void
}

export const KanbanBoardView: React.FC<KanbanBoardProps> = ({
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
  onAddComment,
  onUploadFile,
  onDeleteFile,
  onFileUpdate,
}) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [epics, setEpics] = useState<Epic[]>([])
  const [sprints, setSprints] = useState<(Sprint & { isSelected: boolean })[]>([])
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [isAddEpicModalOpen, setIsAddEpicModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [colleagues, setColleagues] = useState<Colleague[]>([])
  const [heroHeight, setHeroHeight] = useState(0)

  const heroRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const selectedEpicIds = React.useMemo(
    () => [...epics.map((e) => e.id), 0], // include “no-epic” sentinel id 0
    [epics],
  )

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
  }, [isAddTaskModalOpen, isAddEpicModalOpen]) // Re-measure when modals change

  // Filter tasks by selected epics and sprint
  const filteredTasks = tasks.filter((task) => {
    // const isEpicSelected = selectedEpics.includes(extractId(task.epic)) || extractId(task.epic) < 0
    // if (!selectedSprint) return isEpicSelected
    // if (selectedSprint.name === 'all-tasks') return isEpicSelected
    // if (selectedSprint.name === 'backlog') return isEpicSelected && !extractId(task.sprint)
    // return isEpicSelected && extractId(task.sprint) === extractId(selectedSprint)
    return true
  })

  const getTasksByStatus = (status: Task['status']) => {
    return filteredTasks.filter((task) => task.status === status)
  }

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

  const handleDrop = (status: Task['status']) => {
    if (draggedTask) {
      setTasks((prev) =>
        prev.map((task) => (task.id === draggedTask.id ? { ...task, status } : task)),
      )
      // Notify upstream handler about the status change
      onUpdateTask?.(draggedTask.id.toString(), { status })
      setDraggedTask(null)
    }
  }

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTasks((prev) => [...prev, task])
    onAddTask?.(newTask)
  }

  const handleUpdateTask = async (taskId: string, updates: Partial<Task>): Promise<void> => {
    setTasks((prev) =>
      prev.map((task) => (task.id === Number(taskId) ? { ...task, ...updates } : task)),
    )
    if (onUpdateTask) {
      await onUpdateTask(taskId, updates)
    }

    if (selectedTask?.id === Number(taskId)) {
      setSelectedTask((prev) => ({ ...prev, ...updates } as Task))
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

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    onTaskClick?.(task)
  }

  const columns = [
    { id: 'todo', title: 'To Do', status: 'todo' as const },
    { id: 'in-progress', title: 'In Progress', status: 'in-progress' as const },
    { id: 'review', title: 'Review', status: 'review' as const },
    { id: 'done', title: 'Done', status: 'done' as const },
  ]

  // Calculate the height to pass to columns
  const calculatedHeight =
    heroHeight > 0 ? `calc(100vh - ${heroHeight + 120}px)` : 'calc(100vh - 12rem)'

  return (
    <div ref={containerRef} className="h-full flex flex-col px-2 md:px-4 py-4">
      <div ref={heroRef} className="flex-shrink-0">
        <DashboardHero
          title="Project Board"
          description="Manage tasks and track progress across your project sprints."
          gradient="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600"
          primaryAction={{
            label: 'Add task',
            onClick: () => setIsAddTaskModalOpen(true),
          }}
          secondaryAction={{
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
            {columns.map((column) => {
              const columnTasks = getTasksByStatus(column.status)
              const tasksByEpic = getTasksByEpic(columnTasks)


              return (
                <KanbanColumn
                  key={column.id}
                  title={column.title}
                  status={column.status}
                  taskCount={columnTasks.length}
                  onDrop={handleDrop}
                  isCompact={column.status === 'done'}
                  height={calculatedHeight}
                >
                  {tasksByEpic['no-epic'].map((task) => {
                    return (
                      <TaskCard
                        key={task.id}
                        epic={null}
                        task={task}
                        onDragStart={handleDragStart}
                        onTaskClick={handleTaskClick}
                        isCompact={column.status === 'done'}
                      />
                    )
                  })}
                  {selectedEpicIds.map((epicId) => {
                    const epic = epics.find((e) => e.id === epicId)
                    const epicTasks = tasksByEpic[epicId] || []

                    if (epicTasks.length === 0) return null

                    return (
                      <div key={epicId} className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-3 h-3 rounded-full ${epic?.color}`}></div>
                          <span className="text-sm font-medium text-muted-foreground select-none-important">
                            {epic?.name || 'No Epic'}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {epicTasks.length}
                          </Badge>
                        </div>{' '}
                        <div className="space-y-3">
                          {epicTasks.map((task) => (
                            <TaskCard
                              key={task.id}
                              task={task}
                              epic={epic!}
                              onDragStart={handleDragStart}
                              onTaskClick={handleTaskClick}
                              isCompact={column.status === 'done'}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </KanbanColumn>
              )
            })}
          </div>
        </div>
      </div>

      {/* Modals - moved outside the main content area */}
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
    </div>
  )
}
