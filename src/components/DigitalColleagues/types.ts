import type React from 'react'

export interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  avatar?: string
  skills?: string[]
  location?: string
  phone?: string
  timezone?: string
  bio?: string
}

export interface Reminder {
  id: string
  title: string
  description: string
  dueDate: Date
  dueTime?: string
  colleague: DigitalColleague
  isCompleted: boolean
  isRecurring: boolean
  recurrencePattern?: 'daily' | 'weekly' | 'monthly' | 'yearly'
  recurrenceInterval?: number // e.g., every 2 weeks
  recurrenceEndDate?: Date
  priority: 'low' | 'medium' | 'high'
  reminderEnabled: boolean
  reminderMinutes?: number // minutes before due time
  createdAt: Date
  completedAt?: Date
  tags?: string[]
}

export interface BusinessUnit {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  accentColor: string
}

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

export interface Comment {
  id: string
  content: string
  timestamp: string
  user: User
  taskId: string
  taskTitle: string
}

export interface Task {
  id: string
  name: string
  description: string
  status: 'todo' | 'in-progress' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high'
  type: 'story' | 'task' | 'bug' | 'spike'
  points: number // Story points
  epicId: string
  sprintId?: string
  assignee: string
  comments?: Comment[]
  createdAt: Date
}

export interface App {
  name: string
  icon: React.ReactNode
  description: string
  category: string
  recent: boolean
  new: boolean
  progress: number
}

export interface RecentFile {
  name: string
  app: string
  modified: string
  icon: React.ReactNode
  shared: boolean
  size: string
  collaborators: number
}

export interface FileType {
  id: string
  name: string
  app?: string
  modified?: string
  icon?: React.ReactNode
  shared?: boolean
  size?: string
  collaborators?: number
  filename: string
  filesize: number
  createdAt: Date | string
  url: string
  mimeType: string
  thumbnailURL?: string | null
}

export interface ProjectSummary {
  id: number
  name: string
  description: string
  progress: number
  dueDate: string
  members: number
  files: number
}

export interface Tutorial {
  title: string
  description: string
  duration: string
  level: string
  instructor: string
  category: string
  views: string
}

export interface CommunityPost {
  title: string
  author: string
  likes: number
  comments: number
  image: string
  time: string
}

export interface SidebarItem {
  id: string
  title: string
  icon: React.ReactNode
  isActive?: boolean
  badge?: string
  url?: string
  maxItems?: number
  items?: {
    id: string
    title: string
    url: string
    badge?: string
  }[]
}

export interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: 'info' | 'success' | 'warning' | 'error'
  actionLabel?: string
  onAction?: () => void
}

export interface AIAssistantType {
  id: string
  name: string
  description: string
  avatarFallback: string
  avatarUrl?: string
  welcomeMessage: string
  accentColor?: string
}

export interface ProjectFormData {
  name: string
  objectives: string
  workInstructions: string
  plan: boolean
}

export interface ProjectCreationData extends ProjectFormData {
  description?: string
}
export interface BaseColleague {
  id: string
  name: string
  status: 'active' | 'inactive'
  joinedDate: Date
  lastActive?: Date
}

export interface HumanColleague extends BaseColleague {
  type: 'human'
  email: string
  role: string
  department: string
  phone?: string
  location?: string
  timezone?: string
  skills?: string[]
  bio?: string
}

export interface KnowledgeDocument {
  id: string
  title: string
  description?: string
  metadata?: Record<string, any>
  content?: string
  format: 'markdown' | 'mdx' | 'richtext' | 'text'
  tags?: string[]
  createdAt: Date
  updatedAt?: Date
}

export interface KnowledgeDocumentWithContent extends KnowledgeDocument {
  content: string
}

export interface KnowledgeHierarchy {
  [key: string]: {
    documents: KnowledgeDocument[]
    children?: KnowledgeHierarchy
  }
}

export interface KnowledgeMenuConfig {
  groupBy: string[] // Array of metadata keys to group by, in order of hierarchy
  sortBy?: 'title' | 'createdAt' | 'updatedAt'
  sortOrder?: 'asc' | 'desc'
  showDocumentCount?: boolean
}

export interface KnowledgeContext {
  id: string
  label: string
  description?: string
  menuConfig: KnowledgeMenuConfig
  icon?: React.ReactNode
}

export interface DigitalColleague extends BaseColleague {
  type: 'digital'
  description?: string
  jobDescription: string
  workInstructions: string
  capabilities: string[]
  knowledge: KnowledgeDocument[]
  coreKnowledge: KnowledgeDocument[]
  version: string
  lastUpdated: Date
  isActive: boolean
}

export type Colleague = HumanColleague | DigitalColleague

export interface TeamSummary {
  id: string
  name: string
  description: string
  humanColleagues: number
  digitalColleagues: number
  projects: number
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  type: 'human' | 'digital'
  avatar?: string
  joinedAt: Date
}

export interface Team {
  id: string
  name: string
  description: string
  members: TeamMember[]
  projects: Project[]
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export interface TeamFormData {
  name: string
  description: string
  members: string[]
}
