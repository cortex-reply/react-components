'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { DigitalColleageusLayout } from '../DigitalColleagues/DigitalColleageusLayout'
import { type BusinessUnit } from '../DigitalColleagues/types'
import { mockSidebarItems, mockNotifications } from '../DigitalColleagues/test-data'

import type { App, RecentFile, Epic, Sprint, Project, Task } from '../Foundary/types'
// import type { Epic, Sprint, Project, Task } from '@/components/Projects/ProjectView'

import ProjectView from './ProjectView'
const AnimatedCircles = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
    className="relative h-40 w-40"
  >
    <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md" />
    <div className="absolute inset-4 rounded-full bg-white/20" />
    <div className="absolute inset-8 rounded-full bg-white/30" />
    <div className="absolute inset-12 rounded-full bg-white/40" />
    <div className="absolute inset-16 rounded-full bg-white/50" />
  </motion.div>
)

interface HomeProps {
  title?: string
  businessUnits: BusinessUnit[]

  projects: Project[]
  epics: Epic[]
  sprints: Sprint[]
  tasks: Task[]
  currentView: 'kanban' | 'planning' | 'documentation' | 'epics'
  // Task handlers
  onAddTask?: (newTask: Omit<Task, 'id' | 'createdAt'>) => void
  onUpdateTask?: (taskId: string, updates: Partial<Task>) => Promise<Task>
  onDeleteTask?: (taskId: string) => void
  onTaskClick?: (task: Task) => void
  // Epic handlers
  onAddEpic?: () => void
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
  // View handlers
  onViewChange?: (view: 'kanban' | 'planning' | 'tasks' | 'files' | 'epics') => void
  mobileMenuOpen?: boolean
  onToggleMobileMenu?: () => void
  // Team handlers
  onTeamClick?: (teamId: string) => void
  onTeamChange?: (team: any) => void
  onCopilotClick?: () => void
}

export default function ProjectPage({
  title = '',
  projects,
  businessUnits,
  epics,
  sprints,
  tasks,
  currentView,
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
  // View handlers
  onViewChange,
  mobileMenuOpen,
  onToggleMobileMenu,
  // Team handlers
  onTeamClick,
  onTeamChange,
  onCopilotClick,
}: HomeProps) {
  const [activeTab, setActiveTab] = useState('projects')
  const [currentBusinessUnit, setCurrentBusinessUnit] = useState<BusinessUnit>(businessUnits[0]) // Default to Design

  // Mock handlers
  const handleAppOpen = (app: App) => {
    console.log('Opening app:', app.name)
  }

  const handleAppFavorite = (app: App) => {
    console.log('Favoriting app:', app.name)
  }

  const handleFileClick = (file: RecentFile) => {
    console.log('Opening file:', file.name)
  }

  const handleFileShare = (file: RecentFile) => {
    console.log('Sharing file:', file.name)
  }

  const handleProjectOpen = (project: Project) => {
    console.log('Opening project:', project.name)
  }

  const handleProjectShare = (project: Project) => {
    console.log('Sharing project:', project.name)
  }

  const handleBusinessUnitChange = (unit: BusinessUnit) => {
    // setCurrentBusinessUnit(unit)
    console.log('Business unit changed to:', unit.name)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <ProjectView
            initialProjects={projects}
            initialEpics={epics}
            initialSprints={sprints}
            initialTasks={tasks}
            // Task handlers
            onAddTask={onAddTask}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            onTaskClick={onTaskClick}
            // Epic handlers
            onAddEpic={onAddEpic}
            onUpdateEpic={onUpdateEpic}
            onDeleteEpic={onDeleteEpic}
            onAddTaskToEpic={onAddTaskToEpic}
            // Sprint handlers
            onAddSprint={onAddSprint}
            onUpdateSprint={onUpdateSprint}
            onDeleteSprint={onDeleteSprint}
            // Project handlers
            onAddProject={onAddProject}
            onUpdateProject={onUpdateProject}
            onDeleteProject={onDeleteProject}
            // View handlers
            onViewChange={onViewChange}
            onToggleMobileMenu={onToggleMobileMenu}
            // Team handlers
            onTeamClick={onTeamClick}
            onTeamChange={onTeamChange}
            onCopilotClick={onCopilotClick}
          />
        )
      default:
        return null
    }
  }

  return (
    <DigitalColleageusLayout
      sidebarItems={mockSidebarItems}
      title={title}
      notifications={mockNotifications}
      businessUnits={businessUnits}
      currentBusinessUnit={currentBusinessUnit}
      onBusinessUnitChange={handleBusinessUnitChange}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      showTabs={true}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </DigitalColleageusLayout>
  )
}
