export interface BaseColleague {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: "active" | "inactive" | "away"
  joinedDate: Date
  lastActive?: Date
  avatar?: string
}

export interface HumanColleague extends BaseColleague {
  type: "human"
  phone?: string
  location?: string
  timezone?: string
  skills?: string[]
  bio?: string
}

export interface DigitalColleague extends BaseColleague {
  type: "digital"
  jobDescription: string
  workInstructions: string[]
  capabilities: string[]
  knowledge: string[]
  coreKnowledge: string[]
  version: string
  lastUpdated: Date
  isActive: boolean
}

export type Colleague = HumanColleague | DigitalColleague

// Mock data for development and testing
export const mockColleagues: Colleague[] = [
  {
    id: "1",
    type: "human",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Senior Designer",
    department: "Design",
    status: "active",
    joinedDate: new Date("2023-01-15"),
    lastActive: new Date(),
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    timezone: "PST",
    skills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
    bio: "Passionate designer with 8+ years of experience creating user-centered digital experiences.",
    avatar: "/placeholder.svg?height=100&width=100&text=SJ",
  },
  {
    id: "2",
    type: "digital",
    name: "CodeAssist Pro",
    email: "codeassist@company.com",
    role: "Development Assistant",
    department: "Engineering",
    status: "active",
    joinedDate: new Date("2024-01-01"),
    lastActive: new Date(),
    jobDescription: "AI-powered coding assistant that helps with code review, debugging, and documentation generation.",
    workInstructions: [
      "Review pull requests for code quality and best practices",
      "Generate comprehensive documentation for new features",
      "Assist with debugging complex issues",
      "Provide code suggestions and optimizations",
    ],
    capabilities: ["Code Review", "Documentation Generation", "Debugging", "Code Optimization", "Testing"],
    knowledge: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "Git"],
    coreKnowledge: ["Company coding standards", "Architecture patterns", "Security guidelines"],
    version: "2.1.0",
    lastUpdated: new Date("2024-01-15"),
    isActive: true,
    avatar: "/placeholder.svg?height=100&width=100&text=CA",
  },
  {
    id: "3",
    type: "human",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    role: "Product Manager",
    department: "Product",
    status: "away",
    joinedDate: new Date("2022-08-20"),
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    timezone: "EST",
    skills: ["Product Strategy", "Agile", "Data Analysis", "User Stories", "Roadmapping"],
    bio: "Strategic product manager focused on driving user engagement and business growth.",
    avatar: "/placeholder.svg?height=100&width=100&text=MC",
  },
  {
    id: "4",
    type: "digital",
    name: "MarketingBot",
    email: "marketingbot@company.com",
    role: "Marketing Assistant",
    department: "Marketing",
    status: "active",
    joinedDate: new Date("2024-02-01"),
    lastActive: new Date(),
    jobDescription: "Specialized AI assistant for marketing campaigns, content creation, and social media management.",
    workInstructions: [
      "Create engaging social media content",
      "Analyze campaign performance metrics",
      "Generate marketing copy and headlines",
      "Schedule and manage social media posts",
    ],
    capabilities: [
      "Content Creation",
      "Social Media Management",
      "Analytics",
      "SEO Optimization",
      "Campaign Management",
    ],
    knowledge: ["Digital Marketing", "Social Media Platforms", "Content Strategy", "Analytics Tools"],
    coreKnowledge: ["Brand guidelines", "Target audience personas", "Marketing objectives"],
    version: "1.5.2",
    lastUpdated: new Date("2024-02-10"),
    isActive: true,
    avatar: "/placeholder.svg?height=100&width=100&text=MB",
  },
  {
    id: "5",
    type: "human",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    role: "UX Researcher",
    department: "Design",
    status: "inactive",
    joinedDate: new Date("2023-06-10"),
    lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    timezone: "CST",
    skills: ["User Research", "Usability Testing", "Data Analysis", "Survey Design", "Interview Techniques"],
    bio: "User researcher dedicated to understanding user needs and improving product experiences.",
    avatar: "/placeholder.svg?height=100&width=100&text=ER",
  },
]
