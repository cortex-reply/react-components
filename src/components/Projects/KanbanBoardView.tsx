import React, { useEffect, useState, useRef } from 'react'

import { Badge } from '@/components/ui/badge'
import { KanbanColumn } from './KanbanColumn'
import { TaskCard } from './TaskCard'
import { AddTaskModal } from './AddTaskModal'
import { TaskDetailsModal } from './TaskDetailsModal'

import { AddEpicModal } from './AddEpicModal'
import { DashboardHero } from '../Heros/DashboardHero'

import { Project, Epic, Sprint, Task, DigitalColleague, User } from '../DigitalColleagues/types'

export interface KanbanBoardProps {
  initialTasks?: Task[]
  initialEpics?: Epic[]
  initialSprints?: Sprint[]
  initialProjects?: Project[]
  initialUsers?: User[]
  initialColleagues?: DigitalColleague[]
  // Task handlers
  onAddTask?: (newTask: Omit<Task, 'id' | 'createdAt'>) => void
  onUpdateTask?: (taskId: string, updates: Partial<Task>) => void
  onDeleteTask?: (taskId: string) => void
  onTaskClick?: (task: Task) => void
  // Epic handlers
  onAddEpic?: (newEpic: Omit<Epic, 'id'>) => void
  onAddComment?: ({ content, taskId }: { taskId: string; content: string }) => Promise<Task>
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
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [epics, setEpics] = useState<Epic[]>(initialEpics)
  const [sprints, setSprints] = useState<Sprint[]>(initialSprints)
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [isAddEpicModalOpen, setIsAddEpicModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [colleagues, setColleagues] = useState<DigitalColleague[]>(initialColleagues)
  const [heroHeight, setHeroHeight] = useState(0)

  const heroRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedEpics = epics.filter((epic) => true).map((epic) => epic.id)
  const selectedSprint = sprints.find((sprint) => sprint.isSelected)

  selectedEpics.push('no-epic')

  useEffect(() => {
    setTasks(initialTasks)
  }, [initialTasks])

  useEffect(() => {
    setEpics(initialEpics)
  }, [initialEpics])

  useEffect(() => {
    setSprints(initialSprints)
  }, [initialSprints])

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
    const isEpicSelected = selectedEpics.includes(task.epicId) || !task.epicId
    if (!selectedSprint) return isEpicSelected
    if (selectedSprint.id === 'all-tasks') return isEpicSelected
    if (selectedSprint.id === 'backlog') return isEpicSelected && !task.sprintId
    return isEpicSelected && task.sprintId === selectedSprint.id
  })

  const getTasksByStatus = (status: Task['status']) => {
    return filteredTasks.filter((task) => task.status === status)
  }

  const getTasksByEpic = (tasks: Task[]) => {
    const tasksByEpic: { [epicId: string]: Task[] } = {}
    epics.forEach((epic) => {
      tasksByEpic[epic.id] = tasks.filter((task) => task.epicId === epic.id)
    })
    tasksByEpic['no-epic'] = tasks.filter((task) => !task.epicId)
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
      onUpdateTask?.(draggedTask.id, { status })
      setDraggedTask(null)
    }
  }

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    const task: Task = { ...newTask, id: Date.now().toString(), createdAt: new Date() }
    setTasks((prev) => [...prev, task])
    onAddTask?.(newTask)
  }

  const handleUpdateTask = async (taskId: string, updates: Partial<Task>): Promise<Task> => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task)))
    if (onUpdateTask) {
      await onUpdateTask(taskId, updates)
    }
    const task = tasks.find((task) => task.id === taskId)
    if (!task) {
      throw new Error('Task not found')
    }
    return { ...task, ...updates }
  }

  const handleDeleteTask = async (taskId: string): Promise<void> => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
    if (selectedTask?.id === taskId) {
      setSelectedTask(null)
    }
    if (onDeleteTask) {
      await onDeleteTask(taskId)
    }
  }

  const handleAddEpic = (newEpic: Omit<Epic, 'id'>) => {
    const epic: Epic = { ...newEpic, id: Date.now().toString(), isSelected: true }
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
                  {selectedEpics.map((epicId) => {
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
          colleagues={[...colleagues, ...users]}
          onAddComment={onAddComment}
        />
      )}
    </div>
  )
}
