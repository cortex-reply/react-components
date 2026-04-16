import { Project, Epic, Sprint, Task } from './types'
import {
  ProjectSummary,
  TeamSummary,
  Colleague,
  BusinessUnit,
  Reminder,
  RecentFile,
  DigitalColleague,
  SidebarItem,
  Notification,
} from './types'
import {
  Home,
  Layers,
  Bot,
  Building2,
  Code,
  Palette,
  TrendingUp,
  Users,
  Wrench,
  DollarSign,
  Scale,
  Package,
  Zap,
  FileText,
  FileImage,
  FileVideo,
  Music,
  File,
} from 'lucide-react'

// Helper function to convert strings to KnowledgeDocument objects
const createKnowledgeDocument = (title: string): import('./types').KnowledgeDocument => ({
  id: Math.random().toString(36).substr(2, 9),
  title,
  format: 'markdown' as const,
  createdAt: new Date(),
})

export const mockSidebarItems: SidebarItem[] = [
  {
    id: 'home',
    title: 'Home',
    icon: <Home />,
    isActive: true,
  },
  // {
  //   title: "Apps",
  //   icon: <Grid />,
  //   badge: "2",
  //   items: [
  //     { title: "All Apps", url: "#" },
  //     { title: "Recent", url: "#" },
  //     { title: "Updates", url: "#", badge: "2" },
  //     { title: "Installed", url: "#" },
  //   ],
  // },
  // {
  //   title: "Files",
  //   icon: <FileText />,
  //   items: [
  //     { title: "Recent", url: "#" },
  //     { title: "Shared with me", url: "#", badge: "3" },
  //     { title: "Favorites", url: "#" },
  //     { title: "Trash", url: "#" },
  //   ],
  // },
  {
    id: 'teams',
    title: 'Teams',
    icon: <Users />,
    maxItems: 2,
    items: [
      { id: 'design', title: 'Design', url: '#' },
      { id: 'marketing', title: 'Marketing', url: '#' },
      { id: 'finance', title: 'Finance', url: '#' },
      { id: 'engineering', title: 'Engineering', url: '#' },
      { id: 'sales', title: 'Sales', url: '#' },
    ],
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: <Layers />,
    badge: '4',
    maxItems: 2,
    items: [
      { id: 'active-projects', title: 'Active Projects', url: '#', badge: '4' },
      { id: 'archived', title: 'Archived', url: '#' },
      { id: 'templates', title: 'Templates', url: '#' },
      { id: 'drafts', title: 'Drafts', url: '#' },
      { id: 'shared', title: 'Shared with Me', url: '#', badge: '2' },
    ],
  },
  {
    id: 'copilot',
    title: 'Copilot',
    icon: <Bot />,
    url: '/copilot',
  },

  // {
  //   title: "Learn",
  //   icon: <BookOpen />,
  //   items: [
  //     { title: "Tutorials", url: "#" },
  //     { title: "Courses", url: "#" },
  //     { title: "Webinars", url: "#" },
  //     { title: "Resources", url: "#" },
  //   ],
  // },
  // {
  //   title: "Community",
  //   icon: <Users />,
  //   items: [
  //     { title: "Explore", url: "#" },
  //     { title: "Following", url: "#" },
  //     { title: "Challenges", url: "#" },
  //     { title: "Events", url: "#" },
  //   ],
  // },
  // {
  //   title: "Resources",
  //   icon: <Bookmark />,
  //   items: [
  //     { title: "Stock Photos", url: "#" },
  //     { title: "Fonts", url: "#" },
  //     { title: "Icons", url: "#" },
  //     { title: "Templates", url: "#" },
  //   ],
  // },
  {
    id: 'knowledge',
    title: 'Knowledge',
    icon: <FileText />,
    url: '/knowledge',
  },
]

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New comment on your post',
    description: "Alex Morgan commented on your 'Minimalist Logo Design' post.",
    time: 'Just now',
    read: false,
    type: 'info',
    actionLabel: 'View comment',
    onAction: () => console.log('View comment clicked'),
  },
  {
    id: '2',
    title: 'Project deadline approaching',
    description: "The 'Website Redesign' project is due in 2 days.",
    time: '5 minutes ago',
    read: false,
    type: 'warning',
    actionLabel: 'View project',
    onAction: () => console.log('View project clicked'),
  },
  {
    id: '3',
    title: 'File shared with you',
    description: "Emma Thompson shared 'Brand Guidelines.pdf' with you.",
    time: '1 hour ago',
    read: false,
    type: 'info',
    actionLabel: 'Open file',
    onAction: () => console.log('Open file clicked'),
  },
  {
    id: '4',
    title: 'Update successful',
    description: 'PixelMaster has been updated to version 2.4.0.',
    time: '3 hours ago',
    read: true,
    type: 'success',
    actionLabel: "See what's new",
    onAction: () => console.log("See what's new clicked"),
  },
  {
    id: '5',
    title: 'Storage limit reached',
    description: "You've used 95% of your storage. Consider upgrading your plan.",
    time: 'Yesterday',
    read: true,
    type: 'error',
    actionLabel: 'Upgrade plan',
    onAction: () => console.log('Upgrade plan clicked'),
  },
  {
    id: '6',
    title: 'Weekly summary',
    description: 'Check out your activity summary for the past week.',
    time: '2 days ago',
    read: true,
    type: 'info',
    actionLabel: 'View summary',
    onAction: () => console.log('View summary clicked'),
  },
  {
    id: '7',
    title: 'New tutorial available',
    description: "A new tutorial on 'Advanced Animation Techniques' is now available.",
    time: '3 days ago',
    read: true,
    type: 'info',
    actionLabel: 'Start learning',
    onAction: () => console.log('Start learning clicked'),
  },
]

export const businessUnits: BusinessUnit[] = [
  {
    id: 'design',
    name: 'Design',
    description: 'Creative and visual design team',
    icon: <Palette className="h-4 w-4" />,
    color: 'bg-purple-600',
    accentColor: 'text-purple-600',
  },
  {
    id: 'engineering',
    name: 'Engineering',
    description: 'Software development and technical teams',
    icon: <Code className="h-4 w-4" />,
    color: 'bg-blue-600',
    accentColor: 'text-blue-600',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Brand, campaigns, and growth marketing',
    icon: <TrendingUp className="h-4 w-4" />,
    color: 'bg-pink-600',
    accentColor: 'text-pink-600',
  },
  {
    id: 'sales',
    name: 'Sales',
    description: 'Revenue generation and customer acquisition',
    icon: <DollarSign className="h-4 w-4" />,
    color: 'bg-green-600',
    accentColor: 'text-green-600',
  },
  {
    id: 'hr',
    name: 'Human Resources',
    description: 'People operations and talent management',
    icon: <Users className="h-4 w-4" />,
    color: 'bg-orange-600',
    accentColor: 'text-orange-600',
  },
  {
    id: 'operations',
    name: 'Operations',
    description: 'Business operations and process optimization',
    icon: <Wrench className="h-4 w-4" />,
    color: 'bg-indigo-600',
    accentColor: 'text-indigo-600',
  },
  {
    id: 'legal',
    name: 'Legal',
    description: 'Legal affairs and compliance',
    icon: <Scale className="h-4 w-4" />,
    color: 'bg-slate-600',
    accentColor: 'text-slate-600',
  },
  {
    id: 'product',
    name: 'Product',
    description: 'Product strategy and management',
    icon: <Package className="h-4 w-4" />,
    color: 'bg-violet-600',
    accentColor: 'text-violet-600',
  },
  {
    id: 'it',
    name: 'IT Support',
    description: 'Information technology and infrastructure',
    icon: <Zap className="h-4 w-4" />,
    color: 'bg-cyan-600',
    accentColor: 'text-cyan-600',
  },
  {
    id: 'company',
    name: 'Company',
    description: 'Company-wide resources and information',
    icon: <Building2 className="h-4 w-4" />,
    color: 'bg-gray-600',
    accentColor: 'text-gray-600',
  },
]

// Mock data for testing and stories
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Main customer-facing e-commerce application',
    isSelected: true,
  },
  {
    id: '2',
    name: 'Admin Dashboard',
    description: 'Internal administration and analytics dashboard',
    isSelected: false,
  },
  {
    id: '3',
    name: 'Mobile App',
    description: 'Native mobile application for iOS and Android',
    isSelected: false,
  },
]

export const mockProjectSummary: ProjectSummary[] = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Complete overhaul of company website',
    progress: 75,
    dueDate: 'June 15, 2025',
    members: 4,
    files: 23,
  },
  {
    id: 2,
    name: 'Mobile App Launch',
    description: 'Design and assets for new mobile application',
    progress: 60,
    dueDate: 'July 30, 2025',
    members: 6,
    files: 42,
  },
  {
    id: 3,
    name: 'Brand Identity',
    description: 'New brand guidelines and assets',
    progress: 90,
    dueDate: 'May 25, 2025',
    members: 3,
    files: 18,
  },
  {
    id: 4,
    name: 'Marketing Campaign',
    description: 'Summer promotion materials',
    progress: 40,
    dueDate: 'August 10, 2025',
    members: 5,
    files: 31,
  },
]

export const mockTeamSummary: TeamSummary[] = [
  {
    id: '1',
    name: 'Product Development',
    description:
      'Core product development team responsible for building and maintaining our main platform',
    humanColleagues: 8,
    digitalColleagues: 3,
    projects: 5,
  },
  {
    id: '2',
    name: 'Design & UX',
    description: 'Creative team focused on user experience design and visual identity',
    humanColleagues: 5,
    digitalColleagues: 2,
    projects: 3,
  },
  {
    id: '3',
    name: 'Marketing',
    description: 'Growth and marketing team driving customer acquisition and retention',
    humanColleagues: 6,
    digitalColleagues: 4,
    projects: 7,
  },
  {
    id: '4',
    name: 'Data Science',
    description: 'Analytics and machine learning team providing insights and intelligent features',
    humanColleagues: 4,
    digitalColleagues: 6,
    projects: 2,
  },
  {
    id: '5',
    name: 'Customer Success',
    description: 'Support and success team ensuring customer satisfaction and retention',
    humanColleagues: 7,
    digitalColleagues: 2,
    projects: 4,
  },
  {
    id: '6',
    name: 'Operations',
    description:
      'Infrastructure and operations team maintaining system reliability and performance',
    humanColleagues: 3,
    digitalColleagues: 5,
    projects: 3,
  },
]

export const mockEpics: Epic[] = [
  {
    id: '1',
    name: 'User Authentication',
    color: 'bg-blue-500',
    description: 'Implement secure user authentication system',
    confidence: 'high',
    phase: 2, // development
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-02-15'),
    progress: 75,
    isSelected: true,
  },
  {
    id: '2',
    name: 'Dashboard Features',
    color: 'bg-green-500',
    description: 'Build comprehensive dashboard functionality',
    confidence: 'medium',
    phase: 1, // planning
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-03-15'),
    progress: 30,
    isSelected: true,
  },
  {
    id: '3',
    name: 'Mobile Optimization',
    color: 'bg-purple-500',
    description: 'Optimize application for mobile devices',
    confidence: 'low',
    phase: 1, // planning
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-04-15'),
    progress: 10,
    isSelected: true,
  },
  {
    id: '4',
    name: 'Performance Improvements',
    color: 'bg-orange-500',
    description: 'Enhance application performance and speed',
    confidence: 'high',
    phase: 3, // testing
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-02-28'),
    progress: 90,
    isSelected: true,
  },
]

export const mockSprints: Sprint[] = [
  {
    id: 'backlog',
    name: 'Backlog',
    description: 'Tasks not yet assigned to a sprint',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    isActive: false,
    isSelected: false,
  },
  {
    id: 'all-tasks',
    name: 'All Tasks',
    description: 'View all tasks across all sprints',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    isActive: false,
    isSelected: true,
  },
  {
    id: '1',
    name: 'Sprint 1',
    description: 'Initial development phase',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-14'),
    isActive: false,
    isSelected: false,
  },
  {
    id: '2',
    name: 'Sprint 2',
    description: 'Feature development',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-01-28'),
    isActive: true,
    isSelected: false,
  },
]

export const mockTasks: Task[] = [
  {
    id: '1',
    name: 'Design login page',
    description: 'Create wireframes and mockups for the login interface',
    status: 'todo',
    priority: 'high',
    type: 'story',
    points: 5,
    epicId: '1',
    sprintId: '2',
    assignee: 'John Doe',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Implement OAuth integration',
    description: 'Add Google and GitHub OAuth authentication',
    status: 'review',
    priority: 'high',
    type: 'task',
    points: 8,
    epicId: '1',
    sprintId: '2',
    assignee: 'Jane Smith',
    createdAt: new Date('2024-01-16'),
  },
  {
    id: '3',
    name: 'Create dashboard widgets',
    description: 'Build analytics and metrics widgets for the main dashboard',
    status: 'todo',
    priority: 'medium',
    type: 'story',
    points: 13,
    epicId: '2',
    sprintId: '2',
    assignee: 'Mike Johnson',
    createdAt: new Date('2024-01-17'),
  },
  {
    id: '4',
    name: 'Fix login redirect bug',
    description: 'Resolve issue where users are not redirected after login',
    status: 'done',
    priority: 'high',
    type: 'bug',
    points: 3,
    epicId: '1',
    sprintId: '1',
    assignee: 'Sarah Wilson',
    createdAt: new Date('2024-01-14'),
  },
  {
    id: '5',
    name: 'Research mobile frameworks',
    description: 'Investigate best practices for mobile responsive design',
    status: 'in-progress',
    priority: 'medium',
    type: 'spike',
    points: 5,
    epicId: '3',
    assignee: 'Alex Brown',
    createdAt: new Date('2024-01-18'),
  },
  {
    id: '6',
    name: 'Update user profile page',
    description: 'Enhance user profile with new settings and preferences',
    status: 'review',
    priority: 'medium',
    type: 'story',
    points: 8,
    epicId: '2',
    sprintId: '2',
    assignee: 'Emma Davis',
    createdAt: new Date('2024-01-19'),
  },
  {
    id: '7',
    name: 'Performance optimization',
    description: 'Optimize database queries and improve page load times',
    status: 'done',
    priority: 'high',
    type: 'task',
    points: 13,
    epicId: '4',
    sprintId: '1',
    assignee: 'Tom Wilson',
    createdAt: new Date('2024-01-13'),
  },
]

// Additional tasks for high density testing
export const highDensityTasks: Task[] = [
  ...mockTasks,
  {
    id: '8',
    name: 'Add search functionality',
    description: 'Implement search across all dashboard widgets',
    status: 'todo',
    priority: 'medium',
    type: 'story',
    points: 8,
    epicId: '2',
    sprintId: '2',
    assignee: 'Chris Lee',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '9',
    name: 'Fix mobile responsive issues',
    description: 'Resolve layout problems on mobile devices',
    status: 'in-progress',
    priority: 'high',
    type: 'bug',
    points: 5,
    epicId: '3',
    sprintId: '2',
    assignee: 'Taylor Swift',
    createdAt: new Date('2024-01-21'),
  },
  {
    id: '10',
    name: 'Implement dark mode',
    description: 'Add dark theme support across the application',
    status: 'review',
    priority: 'low',
    type: 'story',
    points: 13,
    epicId: '2',
    sprintId: '2',
    assignee: 'Jordan Smith',
    createdAt: new Date('2024-01-22'),
  },
  {
    id: '11',
    name: 'API rate limiting',
    description: 'Implement rate limiting for API endpoints',
    status: 'done',
    priority: 'high',
    type: 'task',
    points: 8,
    epicId: '4',
    sprintId: '1',
    assignee: 'Morgan Davis',
    createdAt: new Date('2024-01-12'),
  },
  {
    id: '12',
    name: 'User onboarding flow',
    description: 'Create guided tour for new users',
    status: 'todo',
    priority: 'medium',
    type: 'story',
    points: 21,
    epicId: '1',
    sprintId: '2',
    assignee: 'Casey Johnson',
    createdAt: new Date('2024-01-23'),
  },
]

// Additional projects for testing
export const extendedProjects: Project[] = [
  ...mockProjects,
  {
    id: '4',
    name: 'Analytics Platform',
    description: 'Business intelligence and reporting system',
    isSelected: false,
  },
  {
    id: '5',
    name: 'API Gateway',
    description: 'Microservices API management layer',
    isSelected: false,
  },
]

// Empty state data
export const emptyStateData = {
  projects: [
    {
      id: '1',
      name: 'Empty Project',
      description: 'A project with no tasks',
      isSelected: true,
    },
  ],
  epics: [],
  sprints: [
    {
      id: 'all-tasks',
      name: 'All Tasks',
      description: 'View all tasks across all sprints',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      isActive: false,
      isSelected: true,
    },
  ],
  tasks: [],
}

// Single epic focus data
export const singleEpicData = {
  epics: [
    {
      id: '1',
      name: 'User Authentication',
      color: 'bg-blue-500',
      description: 'Implement secure user authentication system',
      confidence: 'high' as const,
      phase: 2,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-02-15'),
      progress: 75,
      isSelected: true,
    },
  ],
  tasks: mockTasks.filter((task) => task.epicId === '1'),
}

// Utility functions for common data manipulations
export const getTasksByStatus = (tasks: Task[], status: Task['status']) => {
  return tasks.filter((task) => task.status === status)
}

export const getTasksByEpic = (tasks: Task[], epicId: string) => {
  return tasks.filter((task) => task.epicId === epicId)
}

export const getTasksBySprint = (tasks: Task[], sprintId: string) => {
  return tasks.filter((task) => task.sprintId === sprintId)
}

export const getSelectedEpics = (epics: Epic[]) => {
  return epics.filter((epic) => epic.isSelected)
}

export const getActiveSprints = (sprints: Sprint[]) => {
  return sprints.filter((sprint) => sprint.isActive)
}

// Data presets for common testing scenarios
export const testScenarios = {
  empty: {
    initialProjects: emptyStateData.projects,
    initialEpics: emptyStateData.epics,
    initialSprints: emptyStateData.sprints,
    initialTasks: emptyStateData.tasks,
  },
  default: {
    initialProjects: mockProjects,
    initialEpics: mockEpics,
    initialSprints: mockSprints,
    initialTasks: mockTasks,
  },
  highDensity: {
    initialProjects: mockProjects,
    initialEpics: mockEpics,
    initialSprints: mockSprints,
    initialTasks: highDensityTasks,
  },
  singleEpic: {
    initialProjects: mockProjects,
    initialEpics: singleEpicData.epics,
    initialSprints: mockSprints,
    initialTasks: singleEpicData.tasks,
  },
  multipleProjects: {
    initialProjects: extendedProjects,
    initialEpics: mockEpics,
    initialSprints: mockSprints,
    initialTasks: mockTasks,
  },
}

export const mockColleagues: Colleague[] = [
  {
    id: '1',
    type: 'human',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'Senior Designer',
    department: 'Design',
    status: 'active',
    joinedDate: new Date('2023-01-15'),
    lastActive: new Date(),
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    timezone: 'PST',
    skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
    bio: 'Passionate designer with 8+ years of experience creating user-centered digital experiences.',
  },
  {
    id: '2',
    type: 'digital',
    name: 'CodeAssist Pro',
    status: 'active',
    joinedDate: new Date('2024-01-01'),
    lastActive: new Date(),
    jobDescription:
      'AI-powered coding assistant that helps with code review, debugging, and documentation generation.',
    workInstructions:
      'Review pull requests for code quality and best practices. Generate comprehensive documentation for new features. Assist with debugging complex issues. Provide code suggestions and optimizations.',
    capabilities: [
      'Code Review',
      'Documentation Generation',
      'Debugging',
      'Code Optimization',
      'Testing',
    ],
    knowledge: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Git'].map(
      createKnowledgeDocument,
    ),
    coreKnowledge: ['Company coding standards', 'Architecture patterns', 'Security guidelines'].map(
      createKnowledgeDocument,
    ),
    version: '2',
    lastUpdated: new Date('2024-01-15'),
    isActive: true,
  },
  {
    id: '3',
    type: 'human',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    role: 'Product Manager',
    department: 'Product',
    status: 'inactive',
    joinedDate: new Date('2022-08-20'),
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    timezone: 'EST',
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'User Stories', 'Roadmapping'],
    bio: 'Strategic product manager focused on driving user engagement and business growth.',
  },
  {
    id: '4',
    type: 'digital',
    name: 'MarketingBot',
    status: 'active',
    joinedDate: new Date('2024-02-01'),
    lastActive: new Date(),
    jobDescription:
      'Specialized AI assistant for marketing campaigns, content creation, and social media management.',
    workInstructions:
      'Create engaging social media content. Analyze campaign performance metrics. Generate marketing copy and headlines. Schedule and manage social media posts.',
    capabilities: [
      'Content Creation',
      'Social Media Management',
      'Analytics',
      'SEO Optimization',
      'Campaign Management',
    ],
    knowledge: [
      'Digital Marketing',
      'Social Media Platforms',
      'Content Strategy',
      'Analytics Tools',
    ].map(createKnowledgeDocument),
    coreKnowledge: ['Brand guidelines', 'Target audience personas', 'Marketing objectives'].map(
      createKnowledgeDocument,
    ),
    version: '52',
    lastUpdated: new Date('2024-02-10'),
    isActive: true,
  },
  {
    id: '5',
    type: 'human',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    role: 'UX Researcher',
    department: 'Design',
    status: 'inactive',
    joinedDate: new Date('2023-06-10'),
    lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
    timezone: 'CST',
    skills: [
      'User Research',
      'Usability Testing',
      'Data Analysis',
      'Survey Design',
      'Interview Techniques',
    ],
    bio: 'User researcher dedicated to understanding user needs and improving product experiences.',
  },
  {
    id: '6',
    type: 'digital',
    name: 'DataAnalyzer Pro',
    status: 'active',
    joinedDate: new Date('2024-01-10'),
    lastActive: new Date(),
    jobDescription:
      'Advanced AI assistant specializing in data analysis, reporting, and business intelligence.',
    workInstructions:
      'Analyze complex datasets, generate insightful reports, create data visualizations, and provide actionable business recommendations.',
    capabilities: [
      'Data Analysis',
      'Report Generation',
      'Data Visualization',
      'Business Intelligence',
      'Statistical Analysis',
    ],
    knowledge: ['Python', 'SQL', 'Tableau', 'Excel', 'R', 'Statistics'].map(
      createKnowledgeDocument,
    ),
    coreKnowledge: ['Company data sources', 'KPI definitions', 'Reporting standards'].map(
      createKnowledgeDocument,
    ),
    version: '3.1',
    lastUpdated: new Date('2024-02-20'),
    isActive: true,
  },
  {
    id: '7',
    type: 'digital',
    name: 'ProjectManager AI',
    status: 'active',
    joinedDate: new Date('2024-01-05'),
    lastActive: new Date(),
    jobDescription:
      'Intelligent project management assistant that helps coordinate tasks, track progress, and manage timelines.',
    workInstructions:
      'Coordinate project activities, track milestones, manage resource allocation, and provide project status updates.',
    capabilities: [
      'Project Planning',
      'Task Coordination',
      'Timeline Management',
      'Resource Allocation',
      'Progress Tracking',
    ],
    knowledge: ['Agile', 'Scrum', 'Gantt Charts', 'Risk Management', 'Stakeholder Management'].map(
      createKnowledgeDocument,
    ),
    coreKnowledge: [
      'Company project templates',
      'Resource availability',
      'Project methodologies',
    ].map(createKnowledgeDocument),
    version: '2.5',
    lastUpdated: new Date('2024-02-15'),
    isActive: true,
  },
  {
    id: '8',
    type: 'digital',
    name: 'CustomerSupport Bot',
    status: 'active',
    joinedDate: new Date('2024-02-01'),
    lastActive: new Date(),
    jobDescription:
      'AI-powered customer support assistant that handles inquiries, resolves issues, and escalates complex problems.',
    workInstructions:
      'Respond to customer inquiries, troubleshoot common issues, provide product information, and escalate complex cases to human agents.',
    capabilities: [
      'Customer Support',
      'Issue Resolution',
      'Product Knowledge',
      'Escalation Management',
      'Chat Support',
    ],
    knowledge: [
      'Product Documentation',
      'FAQ',
      'Troubleshooting Guides',
      'Customer Service Best Practices',
    ].map(createKnowledgeDocument),
    coreKnowledge: ['Product catalog', 'Support processes', 'Escalation procedures'].map(
      createKnowledgeDocument,
    ),
    version: '1.8',
    lastUpdated: new Date('2024-02-25'),
    isActive: true,
  },
]

// Mock reminders for tasks view
export const mockReminders: Reminder[] = [
  {
    id: '1',
    title: 'Review quarterly report',
    description: 'Go through Q4 performance metrics and prepare summary for the team meeting',
    dueDate: new Date(2024, 2, 15),
    dueTime: '14:30',
    colleague: mockColleagues.find((c) => c.id === '2' && c.type === 'digital') as DigitalColleague,
    isCompleted: false,
    isRecurring: false,
    priority: 'high',
    reminderEnabled: true,
    reminderMinutes: 30,
    createdAt: new Date(2024, 2, 10),
    tags: ['quarterly', 'review', 'urgent'],
  },
  {
    id: '2',
    title: 'Weekly team standup',
    description: 'Join the weekly team synchronization meeting',
    dueDate: new Date(2024, 2, 18),
    dueTime: '10:00',
    colleague: mockColleagues.find((c) => c.id === '4' && c.type === 'digital') as DigitalColleague,
    isCompleted: false,
    isRecurring: true,
    recurrencePattern: 'weekly',
    recurrenceInterval: 1,
    priority: 'medium',
    reminderEnabled: true,
    reminderMinutes: 15,
    createdAt: new Date(2024, 2, 11),
    tags: ['meeting', 'standup', 'weekly'],
  },
  {
    id: '3',
    title: 'Deploy to production',
    description: 'Deploy the latest version to production environment',
    dueDate: new Date(),
    dueTime: '16:00',
    colleague: mockColleagues.find((c) => c.id === '2' && c.type === 'digital') as DigitalColleague,
    isCompleted: false,
    isRecurring: false,
    priority: 'high',
    reminderEnabled: true,
    reminderMinutes: 60,
    createdAt: new Date(),
    tags: ['deploy', 'production', 'urgent'],
  },
]

// Mock files for files view
export const mockFiles: RecentFile[] = [
  {
    name: 'Project_Requirements.docx',
    app: 'Word',
    modified: '2 hours ago',
    icon: <FileText className="h-5 w-5 text-blue-500" />,
    shared: true,
    size: '1.2 MB',
    collaborators: 4,
  },
  {
    name: 'Sprint_Planning_Notes.pdf',
    app: 'PDF Reader',
    modified: '1 day ago',
    icon: <File className="h-5 w-5 text-red-500" />,
    shared: false,
    size: '245 KB',
    collaborators: 0,
  },
  {
    name: 'UI_Mockups.fig',
    app: 'Figma',
    modified: '3 days ago',
    icon: <FileImage className="h-5 w-5 text-purple-500" />,
    shared: true,
    size: '5.7 MB',
    collaborators: 6,
  },
  {
    name: 'Demo_Video.mp4',
    app: 'Video Player',
    modified: '1 week ago',
    icon: <FileVideo className="h-5 w-5 text-green-500" />,
    shared: false,
    size: '89 MB',
    collaborators: 0,
  },
  {
    name: 'Meeting_Recording.m4a',
    app: 'Audio Player',
    modified: '2 weeks ago',
    icon: <Music className="h-5 w-5 text-orange-500" />,
    shared: true,
    size: '12 MB',
    collaborators: 2,
  },
]

// Filtered digital colleagues for components that specifically need DigitalColleague types
export const mockDigitalColleagues: DigitalColleague[] = mockColleagues.filter(
  (colleague): colleague is DigitalColleague => colleague.type === 'digital',
)
