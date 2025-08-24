import React, { useEffect, useState } from 'react'

import { ManagementSidebar } from '@/components/DigitalColleagues/ManagementSidebar'
import { KanbanBoardView } from '@/components/Projects/KanbanBoardView'
import { EpicsView } from '@/components/Projects/EpicsView'
import { PlanningView } from '@/components/Projects/PlanningView'
import { TasksView } from '@/components/Projects/TasksView'
import FileView from './FileView'
import { DashboardHero } from '../Heros/DashboardHero/DashboardHero'
import { AddTaskModal } from './AddTaskModal'
import { AddEpicModal } from './AddEpicModal'
import { TaskDetailsModal } from './TaskDetailsModal'
import type { Reminder, DigitalColleague, FileType } from '../DigitalColleagues/types'
// import { Epic, Sprint, Project, Task } from "@/components/DigitalColleagues/KanbanBoard"
import { useRouter } from 'next/navigation'

export interface Project {
  id: string
  name: string
  description?: string
  isSelected?: boolean
}

export interface Epic {
  id: string
  name: string
  color: string
  description?: string
  confidence: 'low' | 'medium' | 'high'
  phase: number // 1-9
  startDate: Date
  endDate: Date
  progress: number // 0-100
  isSelected?: boolean
}

export interface Sprint {
  id: string
  name: string
  description?: string
  startDate: Date
  endDate: Date
  isActive: boolean
  isSelected?: boolean
}

export interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high'
  type: 'story' | 'task' | 'bug' | 'spike'
  points: number // Story points
  epicId: string
  sprintId?: string
  assignee: string
  createdAt: Date
}

type View = 'kanban' | 'planning' | 'tasks' | 'files' | 'epics'

interface Props {
  title?: string
  initialTasks?: Task[]
  initialEpics?: Epic[]
  initialSprints?: Sprint[]
  initialProjects?: Project[]
  initialReminders?: Reminder[]
  initialColleagues?: DigitalColleague[]
  initialFiles?: FileType[]
  initialView?: View
  // Task handlers
  onAddTask?: (newTask: Omit<Task, 'id' | 'createdAt'>) => void
  onUpdateTask?: (taskId: string, updates: Partial<Task>) => void
  onDeleteTask?: (taskId: string) => void
  onTaskClick?: (task: Task) => void
  // Epic handlers
  onAddEpic?: (newEpic: Omit<Epic, 'id' | 'createdAt'>) => void
  onUpdateEpic?: (epicId: string, updates: Partial<Epic>) => void
  onDeleteEpic?: (epicId: string) => void
  onAddTaskToEpic?: (epicId: string) => void
  // Sprint handlers
  onAddSprint?: (sprint: Omit<Sprint, 'id'>) => void
  onUpdateSprint?: (sprintId: string, updates: Partial<Sprint>) => void
  onDeleteSprint?: (sprintId: string) => void
  // Project handlers
  onAddProject?: (project: Omit<Project, 'id'>) => void
  onUpdateProject?: (projectId: string, updates: Partial<Project>) => void
  onDeleteProject?: (projectId: string) => void
  // File handlers
  onFileAdd?: () => void
  onFileEdit?: (file: FileType) => void
  onFileDelete?: (fileId: string) => void
  onFileClick?: (file: FileType) => void
  // Reminder handlers
  onAddReminder?: (reminder: Omit<Reminder, 'id' | 'createdAt'>) => void
  onUpdateReminder?: (reminderId: string, updates: Partial<Reminder>) => void
  onDeleteReminder?: (reminderId: string) => void
  // View handlers
  onViewChange?: (view: View) => void
  onToggleMobileMenu?: () => void
  // Team handlers
  onTeamClick?: (teamId: string) => void
  onTeamChange?: (team: any) => void
  onCopilotClick?: () => void
  //   businessUnits: BusinessUnit[]
}

export default function ProjectView({
  title = '',
  initialTasks = [],
  initialEpics = [],
  initialSprints = [],
  initialProjects = [],
  initialReminders = [],
  initialColleagues = [],
  initialFiles = [],
  initialView = 'kanban',
  // Task handlers
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onTaskClick,
  // Epic handlers
  onAddEpic,
  onUpdateEpic,
  onDeleteEpic,
  onAddTaskToEpic,
  // Sprint handlers
  onAddSprint,
  onUpdateSprint,
  onDeleteSprint,
  // Project handlers
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  // File handlers
  onFileAdd,
  onFileEdit,
  onFileDelete,
  onFileClick,
  // Reminder handlers
  onAddReminder,
  onUpdateReminder,
  onDeleteReminder,
  // View handlers
  onViewChange,
  onToggleMobileMenu,
  // Team handlers
  onTeamClick,
  onTeamChange,
  onCopilotClick,
}: Props) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [epics, setEpics] = useState<Epic[]>(initialEpics)
  const [sprints, setSprints] = useState<Sprint[]>(initialSprints)
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders)
  const [colleagues, setColleagues] = useState<DigitalColleague[]>(initialColleagues)
  const [files, setFiles] = useState<FileType[]>(initialFiles)
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [isAddEpicModalOpen, setIsAddEpicModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [selectedEpicForTask, setSelectedEpicForTask] = useState<string | null>(null)
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [currentView, setCurrentView] = useState<View>(initialView || 'kanban')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setTasks(initialTasks)
  }, [initialTasks])
  useEffect(() => {
    setSprints(initialSprints)
  }, [initialSprints])
  useEffect(() => {
    setEpics(initialEpics)
  }, [initialEpics])
  useEffect(() => {
    setProjects(initialProjects)
  }, [initialProjects])

  useEffect(() => {
    setFiles(initialFiles)
  }, [initialFiles])

  useEffect(() => {
    setColleagues(initialColleagues)
  }, [initialColleagues])

  useEffect(() => {
    setReminders(initialReminders)
  }, [initialReminders])

  useEffect(() => {
    setCurrentView(initialView)
  }, [initialView])

  const selectedEpics = epics.filter((epic) => epic.isSelected).map((epic) => epic.id)
  const selectedSprint = sprints.find((sprint) => sprint.isSelected)

  // Filter tasks by selected epics and sprint
  const filteredTasks = tasks.filter((task) => {
    const isEpicSelected = selectedEpics.includes(task.epicId)
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
      setDraggedTask(null)
    }
  }

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    const task: Task = { ...newTask, id: Date.now().toString(), createdAt: new Date() }
    setTasks((prev) => [...prev, task])
    onAddTask?.(task)
  }

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task)))
    onUpdateTask?.(taskId, updates)
  }

  const handleUpdateTaskAsync = async (taskId: string, updates: Partial<Task>) => {
    handleUpdateTask(taskId, updates)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
    if (selectedTask?.id === taskId) {
      setSelectedTask(null)
    }
    onDeleteTask?.(taskId)
  }

  const handleDeleteTaskAsync = async (taskId: string) => {
    handleDeleteTask(taskId)
  }

  const handleAddProject = (newProject: Omit<Project, 'id'>) => {
    const project: Project = { ...newProject, id: Date.now().toString(), isSelected: false }
    setProjects((prev) => [...prev, project])
    onAddProject?.(newProject)
  }

  const handleUpdateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          // If selecting this project, deselect all others and navigate
          if (updates.isSelected) {
            router.push(`/project/${projectId}`)
            return { ...project, ...updates }
          }
          return { ...project, ...updates }
        }
        // If selecting a new project, deselect this one
        if (updates.isSelected && projectId !== project.id) {
          return { ...project, isSelected: false }
        }
        return project
      }),
    )
    onUpdateProject?.(projectId, updates)
  }

  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId))
    onDeleteProject?.(projectId)
  }

  const handleAddEpic = (newEpic: Omit<Epic, 'id'>) => {
    const epic: Epic = { ...newEpic, id: Date.now().toString(), isSelected: true }
    setEpics((prev) => [...prev, epic])
    onAddEpic?.({ ...epic })
  }

  const handleAddEpicClick = () => {
    // Open the add epic modal
    setIsAddEpicModalOpen(true)
  }

  const handleUpdateEpic = (epicId: string, updates: Partial<Epic>) => {
    setEpics((prev) => prev.map((epic) => (epic.id === epicId ? { ...epic, ...updates } : epic)))
    onUpdateEpic?.(epicId, updates)
  }

  const handleDeleteEpic = (epicId: string) => {
    setEpics((prev) => prev.filter((epic) => epic.id !== epicId))
    // Also delete all tasks in this epic
    setTasks((prev) => prev.filter((task) => task.epicId !== epicId))
    onDeleteEpic?.(epicId)
  }

  const handleAddSprint = (newSprint: Omit<Sprint, 'id'>) => {
    const sprint: Sprint = { ...newSprint, id: Date.now().toString(), isSelected: false }
    setSprints((prev) => [...prev, sprint])
    onAddSprint?.(newSprint)
  }

  const handleUpdateSprint = (sprintId: string, updates: Partial<Sprint>) => {
    setSprints((prev) =>
      prev.map((sprint) => {
        if (sprint.id === sprintId) {
          // If selecting this sprint, deselect all others
          if (updates.isSelected) {
            return { ...sprint, ...updates }
          }
          return { ...sprint, ...updates }
        }
        // If selecting a new sprint, deselect this one
        if (updates.isSelected && sprintId !== sprint.id) {
          return { ...sprint, isSelected: false }
        }
        return sprint
      }),
    )
    onUpdateSprint?.(sprintId, updates)
  }

  const handleDeleteSprint = (sprintId: string) => {
    // Prevent deleting special sprints
    if (sprintId === 'backlog' || sprintId === 'all-tasks') return
    setSprints((prev) => prev.filter((sprint) => sprint.id !== sprintId))
    // Move tasks from deleted sprint to backlog
    setTasks((prev) =>
      prev.map((task) => (task.sprintId === sprintId ? { ...task, sprintId: undefined } : task)),
    )
    onDeleteSprint?.(sprintId)
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
  }

  const handleViewChange = (view: View) => {
    // Hide planning view on mobile
    if (view === 'planning' && window.innerWidth < 768) {
      return
    }
    setCurrentView(view)
    onViewChange?.(view)
  }

  const handleToggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
    onToggleMobileMenu?.()
  }

  const handleCopilotClick = () => {
    router.push('/')
  }

  const handleTeamClick = (teamId: string) => {
    console.log('Switching to team:', teamId)
    // In a real app, this would update the current team context
  }

  const handleTeamChange = (team: any) => {
    console.log('Switching to team:', team)
    // In a real app, this would update the current team context
  }

  const handleAddTaskToEpic = (epicId: string) => {
    // Set the epic in the add task modal and open it
    setSelectedEpicForTask(epicId)
    setIsAddTaskModalOpen(true)
  }

  const handleCloseAddTaskModal = () => {
    setIsAddTaskModalOpen(false)
    setSelectedEpicForTask(null)
  }

  const handleAddReminder = (newReminder: Omit<Reminder, 'id' | 'createdAt'>) => {
    const reminder: Reminder = {
      ...newReminder,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setReminders((prev) => [...prev, reminder])
    onAddReminder?.(newReminder)
  }

  const handleUpdateReminder = (reminderId: string, updates: Partial<Reminder>) => {
    setReminders((prev) =>
      prev.map((reminder) => (reminder.id === reminderId ? { ...reminder, ...updates } : reminder)),
    )
    onUpdateReminder?.(reminderId, updates)
  }

  const handleDeleteReminder = (reminderId: string) => {
    setReminders((prev) => prev.filter((reminder) => reminder.id !== reminderId))
    onDeleteReminder?.(reminderId)
  }

  // File management handlers
  const handleFileAdd = () => {
    // setFiles((prev) => [...prev, newFile])
    onFileAdd?.()
  }

  const handleFileEdit = (file: FileType) => {
    onFileEdit?.(file)
  }

  const handleFileDelete = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileId))
    onFileDelete?.(fileId)
  }

  const handleFileClick = (file: FileType) => {
    onFileClick?.(file)
  }

  const columns = [
    { id: 'todo', title: 'To Do', status: 'todo' as const },
    { id: 'in-progress', title: 'In Progress', status: 'in-progress' as const },
    { id: 'review', title: 'Review', status: 'review' as const },
    { id: 'done', title: 'Done', status: 'done' as const },
  ]

  const getViewTitle = () => {
    switch (currentView) {
      case 'kanban':
        return 'Project Board'
      case 'planning':
        return 'Sprint Planning'
      case 'tasks':
        return 'Task Reminders'
      case 'files':
        return 'Documentation'
      case 'epics':
        return 'Epic Planning'
      default:
        return 'Project Board'
    }
  }

  // Mock teams data - same as Dashboard
  const mockTeams = [
    { id: '1', name: 'Product Development', avatar: 'PD', lastUsed: new Date('2024-01-20') },
    { id: '2', name: 'Engineering', avatar: 'ENG', lastUsed: new Date('2024-01-19') },
    { id: '3', name: 'Marketing Team', avatar: 'MT', lastUsed: new Date('2024-01-18') },
    { id: '4', name: 'Design System', avatar: 'DS', lastUsed: new Date('2024-01-17') },
    { id: '5', name: 'Sales Operations', avatar: 'SO', lastUsed: new Date('2024-01-16') },
    { id: '6', name: 'Customer Success', avatar: 'CS', lastUsed: new Date('2024-01-15') },
  ]

  // Get the 3 most recently used teams
  const recentTeams = mockTeams
    .sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime())
    .slice(0, 3)

  const hasMoreTeams = mockTeams.length > 3
  const additionalTeams = mockTeams.slice(3)

  // const [ currentView, setCurrentView ] = useState<'kanban' | 'planning' | 'files' | 'epics'>('kanban');

  return (
    <ManagementSidebar
      projects={projects}
      epics={epics}
      sprints={sprints}
      currentView={currentView}
      onUpdateProject={handleUpdateProject}
      onDeleteProject={handleDeleteProject}
      onAddProject={handleAddProject}
      onUpdateEpic={handleUpdateEpic}
      onDeleteEpic={handleDeleteEpic}
      onAddEpic={handleAddEpicClick}
      onAddSprint={handleAddSprint}
      onUpdateSprint={handleUpdateSprint}
      onDeleteSprint={handleDeleteSprint}
      onViewChange={handleViewChange}
      mobileMenuOpen={mobileMenuOpen}
      onToggleMobileMenu={handleToggleMobileMenu}
    >
      {currentView === 'kanban' && (
        <div className="h-full">
          <KanbanBoardView
            initialProjects={projects}
            initialEpics={epics}
            initialSprints={sprints}
            initialTasks={tasks}
            // Task handlers
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onTaskClick={handleTaskClick}
            // Epic handlers
            onAddEpic={handleAddEpic}
          />
        </div>
      )}
      {currentView === 'planning' && (
        <div className="hidden md:block h-full">
          <PlanningView
            tasks={tasks}
            epics={epics}
            sprints={sprints}
            onUpdateTask={handleUpdateTask}
            onTaskClick={handleTaskClick}
            onAddSprint={handleAddSprint}
          />
        </div>
      )}
      {currentView === 'tasks' && (
        <div className="h-full">
          <TasksView
            initialReminders={reminders}
            initialColleagues={colleagues}
            onAddReminder={handleAddReminder}
            onUpdateReminder={handleUpdateReminder}
            onDeleteReminder={handleDeleteReminder}
          />
        </div>
      )}
      {currentView === 'files' && (
        <div className="h-full">
          <FileView
            initialFiles={files}
            onFileAdd={handleFileAdd}
            onFileEdit={handleFileEdit}
            onFileDelete={handleFileDelete}
            onFileClick={handleFileClick}
            compactView={false}
          />
        </div>
      )}
      {currentView === 'epics' && (
        <div className="h-full">
          <EpicsView
            tasks={tasks}
            epics={epics}
            sprints={sprints}
            onUpdateTask={handleUpdateTask}
            onTaskClick={handleTaskClick}
            onAddTaskToEpic={handleAddTaskToEpic}
            onAddEpic={handleAddEpicClick}
            onUpdateEpic={handleUpdateEpic}
            onDeleteEpic={handleDeleteEpic}
          />
        </div>
      )}

      {/* Modals */}
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={handleCloseAddTaskModal}
        onAddTask={handleAddTask}
        epics={epics}
        sprints={sprints}
        defaultEpicId={selectedEpicForTask || undefined}
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
          task={selectedTask}
          onUpdateTask={handleUpdateTaskAsync}
          onDeleteTask={handleDeleteTaskAsync}
          epics={epics}
          sprints={sprints}
        />
      )}
    </ManagementSidebar>
  )
}
