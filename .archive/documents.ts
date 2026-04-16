export interface DocumentItem {
  id: string
  title: string
  slug: string
  content: string
  parentId?: string
  order: number
  lastModified: Date
  author: string
  tags?: string[]
}

export interface DocumentTreeNode {
  id: string
  title: string
  slug: string
  parentId?: string
  order: number
  children: DocumentTreeNode[]
  hasContent: boolean
}

// Sample documents data
export const documentsData: DocumentItem[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    slug: "getting-started",
    content: `# Getting Started

Welcome to the Digital Colleagues Suite documentation. This guide will help you get up and running quickly.

## Overview

Digital Colleagues Suite is a comprehensive platform for creative professionals, offering:

- **Design Tools**: Professional-grade design applications
- **Collaboration**: Real-time collaboration features
- **Asset Management**: Centralized asset library
- **Project Management**: Streamlined workflow management

## Quick Start

1. **Create an Account**: Sign up for your free account
2. **Choose Your Plan**: Select the plan that fits your needs
3. **Download Apps**: Install the desktop applications
4. **Start Creating**: Begin your first project

## Next Steps

- [Installation Guide](installation)
- [User Interface Overview](ui-overview)
- [Creating Your First Project](first-project)

---

*Need help? Contact our support team at support@designali.com*`,
    order: 1,
    lastModified: new Date("2024-01-15"),
    author: "Documentation Team",
    tags: ["getting-started", "overview"],
  },
  {
    id: "installation",
    title: "Installation Guide",
    slug: "installation",
    parentId: "getting-started",
    content: `# Installation Guide

Follow these steps to install Digital Colleagues Suite on your system.

## System Requirements

### Minimum Requirements
- **OS**: Windows 10, macOS 10.15, or Ubuntu 18.04+
- **RAM**: 8GB
- **Storage**: 4GB available space
- **Graphics**: DirectX 11 compatible

### Recommended Requirements
- **OS**: Windows 11, macOS 12+, or Ubuntu 20.04+
- **RAM**: 16GB or more
- **Storage**: 8GB available space
- **Graphics**: Dedicated GPU with 2GB VRAM

## Installation Steps

### Windows
1. Download the installer from [designali.com/download](https://designali.com/download)
2. Run the \`.exe\` file as administrator
3. Follow the installation wizard
4. Launch the application from the Start menu

### macOS
1. Download the \`.dmg\` file
2. Open the disk image
3. Drag Designali to your Applications folder
4. Launch from Launchpad or Applications folder

### Linux
\`\`\`bash
# Download and install via package manager
wget https://releases.designali.com/linux/designali.deb
sudo dpkg -i designali.deb
sudo apt-get install -f
\`\`\`

## Troubleshooting

### Common Issues

**Installation fails on Windows**
- Ensure you're running as administrator
- Disable antivirus temporarily during installation
- Check available disk space

**App won't launch on macOS**
- Check Gatekeeper settings in System Preferences
- Try right-clicking and selecting "Open"

**Linux dependency errors**
- Run \`sudo apt-get install -f\` to fix dependencies
- Ensure your system is up to date`,
    order: 1,
    lastModified: new Date("2024-01-10"),
    author: "Technical Team",
    tags: ["installation", "setup"],
  },
  {
    id: "ui-overview",
    title: "User Interface Overview",
    slug: "ui-overview",
    parentId: "getting-started",
    content: `# User Interface Overview

Learn about the main components of the Digital Colleagues Suite interface.

## Main Interface Elements

### 1. Header Bar
The header contains:
- **Logo and Navigation**: Quick access to main sections
- **Search**: Global search across projects and assets
- **Notifications**: System and collaboration notifications
- **User Menu**: Account settings and preferences

### 2. Sidebar Navigation
- **Home**: Dashboard and recent activity
- **Apps**: Access to creative applications
- **Files**: File browser and management
- **Projects**: Project organization and collaboration
- **Learn**: Tutorials and documentation

### 3. Main Content Area
The central workspace that adapts based on your current context:
- **Dashboard**: Overview of recent activity
- **App Interfaces**: Individual application workspaces
- **File Browser**: Grid and list views of assets
- **Project Views**: Kanban boards and timeline views

### 4. Context Panels
Collapsible panels that provide additional tools and information:
- **Properties Panel**: Object and layer properties
- **Asset Library**: Reusable components and assets
- **History Panel**: Undo/redo and version history
- **Comments Panel**: Collaboration and feedback

## Customization

### Themes
- **Light Mode**: Default bright interface
- **Dark Mode**: Reduced eye strain for long sessions
- **Auto**: Follows system preference

### Layout Options
- **Compact**: Maximizes workspace area
- **Comfortable**: Balanced spacing
- **Spacious**: Extra padding for accessibility

### Keyboard Shortcuts
Common shortcuts across all applications:
- \`Cmd/Ctrl + N\`: New project
- \`Cmd/Ctrl + O\`: Open file
- \`Cmd/Ctrl + S\`: Save
- \`Cmd/Ctrl + Z\`: Undo
- \`Cmd/Ctrl + Shift + Z\`: Redo`,
    order: 2,
    lastModified: new Date("2024-01-12"),
    author: "UX Team",
    tags: ["interface", "navigation"],
  },
  {
    id: "first-project",
    title: "Creating Your First Project",
    slug: "first-project",
    parentId: "getting-started",
    content: `# Creating Your First Project

Let's walk through creating your first project in Digital Colleagues Suite.

## Step 1: Project Setup

1. **Click "New Project"** in the header or dashboard
2. **Choose a Template** or start from scratch
3. **Name Your Project** - use a descriptive name
4. **Select Team Members** (optional for collaboration)
5. **Choose Project Settings**:
   - Color profile
   - Default dimensions
   - Asset organization

## Step 2: Project Structure

### Organizing Your Work
- **Folders**: Group related files
- **Tags**: Add metadata for easy searching
- **Versions**: Track iterations and changes
- **Comments**: Collaborate with team members

### Best Practices
- Use consistent naming conventions
- Create folder structures early
- Tag assets with relevant keywords
- Document design decisions

## Step 3: Adding Content

### Import Assets
- Drag and drop files from your computer
- Connect cloud storage services
- Use the built-in asset library
- Import from other projects

### Create New Assets
- Use integrated design tools
- Generate AI-powered content
- Create templates for reuse
- Build component libraries

## Step 4: Collaboration

### Inviting Team Members
1. Click the "Share" button
2. Enter email addresses
3. Set permission levels:
   - **Viewer**: Can view and comment
   - **Editor**: Can edit and create
   - **Admin**: Full project control

### Real-time Collaboration
- See live cursors of other users
- Comment on specific elements
- Track changes and versions
- Resolve feedback and approvals

## Step 5: Publishing

### Export Options
- **Web**: Optimized for web delivery
- **Print**: High-resolution for printing
- **Mobile**: Device-specific formats
- **Video**: Motion graphics and animations

### Sharing
- Generate shareable links
- Embed in websites
- Export to popular formats
- Integrate with other tools

## Next Steps

Now that you've created your first project, explore:
- [Design Applications](design-apps)
- [Asset Management](asset-management)
- [Collaboration Features](collaboration)`,
    order: 3,
    lastModified: new Date("2024-01-14"),
    author: "Product Team",
    tags: ["tutorial", "project-setup"],
  },
  {
    id: "design-apps",
    title: "Design Applications",
    slug: "design-apps",
    content: `# Design Applications

Explore the powerful design tools available in Digital Colleagues Suite.

## Available Applications

### PixelMaster - Image Editing
Professional photo editing and digital art creation.

**Key Features:**
- Advanced layer system
- Non-destructive editing
- AI-powered tools
- Extensive brush library
- Color correction tools

**Best For:**
- Photo retouching
- Digital painting
- Composite creation
- Image optimization

### VectorPro - Vector Graphics
Create scalable graphics and illustrations.

**Key Features:**
- Bezier pen tools
- Shape libraries
- Typography tools
- Gradient meshes
- Symbol libraries

**Best For:**
- Logo design
- Illustrations
- Icons and graphics
- Print layouts

### VideoStudio - Video Editing
Professional video editing and motion graphics.

**Key Features:**
- Multi-track timeline
- Color grading
- Audio mixing
- Motion graphics
- Export presets

**Best For:**
- Video editing
- Motion graphics
- Social media content
- Presentations

## Getting Started with Each App

### PixelMaster Basics
1. **Create New Document**: Set dimensions and resolution
2. **Import Images**: Drag files or use File > Open
3. **Use Layers**: Organize elements on separate layers
4. **Apply Adjustments**: Use adjustment layers for non-destructive editing
5. **Export**: Choose format and quality settings

### VectorPro Workflow
1. **Start with Shapes**: Use basic shapes as building blocks
2. **Pen Tool**: Create custom paths and curves
3. **Typography**: Add and style text elements
4. **Colors and Gradients**: Apply fills and strokes
5. **Export**: Save as SVG, PDF, or raster formats

### VideoStudio Process
1. **Import Media**: Add video, audio, and image files
2. **Timeline Editing**: Arrange clips on the timeline
3. **Transitions**: Add smooth transitions between clips
4. **Effects**: Apply filters and motion effects
5. **Audio**: Mix and balance audio tracks
6. **Export**: Render final video in desired format

## Cross-Application Features

### Shared Asset Library
- Access assets across all applications
- Sync changes automatically
- Version control for shared assets
- Team collaboration on asset libraries

### Consistent Interface
- Similar tools and shortcuts across apps
- Unified color management
- Shared preferences and settings
- Seamless workflow between applications

### Cloud Integration
- Auto-save to cloud storage
- Access projects from any device
- Real-time collaboration
- Automatic backups and versioning`,
    order: 2,
    lastModified: new Date("2024-01-13"),
    author: "Product Team",
    tags: ["applications", "tools"],
  },
  {
    id: "asset-management",
    title: "Asset Management",
    slug: "asset-management",
    content: `# Asset Management

Learn how to organize, manage, and share your creative assets effectively.

## Asset Organization

### Folder Structure
Create a logical hierarchy for your assets:

\`\`\`
Project Root/
├── Images/
│   ├── Photos/
│   ├── Graphics/
│   └── Icons/
├── Videos/
│   ├── Raw Footage/
│   ├── Edited/
│   └── Motion Graphics/
├── Audio/
│   ├── Music/
│   ├── SFX/
│   └── Voiceover/
└── Documents/
    ├── Briefs/
    ├── References/
    └── Final Deliverables/
\`\`\`

### Tagging System
Use tags to categorize assets:
- **Type**: photo, graphic, icon, video
- **Style**: modern, vintage, minimal, bold
- **Color**: red, blue, monochrome, colorful
- **Usage**: web, print, social, presentation

### Metadata
Add descriptive information:
- **Title**: Descriptive name
- **Description**: Detailed explanation
- **Keywords**: Searchable terms
- **Copyright**: Usage rights and attribution
- **Created Date**: When asset was created
- **Modified Date**: Last update timestamp

## File Formats and Standards

### Images
- **PNG**: Transparency support, lossless
- **JPEG**: Compressed photos, smaller file size
- **SVG**: Scalable vector graphics
- **WebP**: Modern web format, smaller size

### Videos
- **MP4**: Universal compatibility
- **MOV**: High quality, larger files
- **WebM**: Web-optimized format
- **GIF**: Short animations

### Audio
- **MP3**: Compressed, smaller size
- **WAV**: Uncompressed, high quality
- **AAC**: Good compression, quality balance

## Version Control

### Automatic Versioning
- Every save creates a new version
- Access previous versions anytime
- Compare changes between versions
- Restore to any previous state

### Manual Versioning
- Create named versions for milestones
- Add version notes and descriptions
- Tag major releases
- Branch for experimental changes

### Collaboration Versioning
- Track who made changes
- Merge collaborative edits
- Resolve conflicts automatically
- Maintain change history

## Asset Sharing

### Internal Sharing
- Share with team members
- Set permission levels
- Control access duration
- Track usage and downloads

### External Sharing
- Generate public links
- Password protection
- Expiration dates
- Download restrictions

### Asset Libraries
- Create shared libraries
- Sync across projects
- Update propagation
- Usage tracking

## Search and Discovery

### Advanced Search
- Filter by file type
- Search by tags and metadata
- Date range filtering
- Size and dimension filters

### Smart Collections
- Auto-updating collections based on criteria
- Recently used assets
- Frequently accessed files
- Unused assets identification

### AI-Powered Discovery
- Visual similarity search
- Content-based recommendations
- Automatic tagging suggestions
- Duplicate detection`,
    order: 3,
    lastModified: new Date("2024-01-11"),
    author: "Product Team",
    tags: ["assets", "organization"],
  },
  {
    id: "collaboration",
    title: "Collaboration Features",
    slug: "collaboration",
    content: `# Collaboration Features

Work together seamlessly with your team using Designali's collaboration tools.

## Real-time Collaboration

### Live Editing
- Multiple users can edit simultaneously
- See live cursors and selections
- Automatic conflict resolution
- Real-time sync across devices

### Presence Indicators
- See who's currently online
- View what others are working on
- Active user indicators
- Status messages and availability

## Communication Tools

### Comments and Feedback
- **Contextual Comments**: Attach comments to specific elements
- **Thread Discussions**: Reply to comments and create conversations
- **Mentions**: Tag team members with @username
- **Emoji Reactions**: Quick feedback with emoji
- **Comment Resolution**: Mark feedback as resolved

### Review and Approval
- **Review Cycles**: Structured feedback process
- **Approval Workflows**: Multi-stage approval process
- **Version Comparison**: Compare different iterations
- **Change Tracking**: See what's been modified
- **Sign-off Process**: Final approval and sign-off

## Team Management

### User Roles and Permissions

#### Owner
- Full project control
- Manage team members
- Delete projects
- Billing and subscription management

#### Admin
- Add/remove team members
- Modify project settings
- Manage permissions
- Access all project areas

#### Editor
- Create and edit content
- Upload and manage assets
- Comment and collaborate
- Export and share work

#### Viewer
- View project content
- Add comments and feedback
- Download approved assets
- Limited editing capabilities

### Team Organization
- **Workspaces**: Organize teams by department or project
- **Groups**: Create sub-teams within larger organizations
- **Guest Access**: Temporary access for external collaborators
- **Single Sign-On**: Enterprise authentication integration

## Project Sharing

### Internal Sharing
- Share with team members
- Department-wide access
- Organization-level sharing
- Role-based permissions

### External Sharing
- **Client Access**: Secure client portals
- **Stakeholder Reviews**: Limited access for feedback
- **Public Galleries**: Showcase completed work
- **Embed Options**: Integrate into websites and presentations

### Link Sharing
- **View-only Links**: Safe sharing for reviews
- **Edit Links**: Collaborative editing access
- **Download Links**: Asset distribution
- **Password Protection**: Secure sensitive content
- **Expiration Dates**: Time-limited access

## Workflow Integration

### Third-party Tools
- **Slack**: Notifications and updates
- **Microsoft Teams**: Collaboration integration
- **Trello/Asana**: Project management sync
- **Google Drive**: File storage integration
- **Dropbox**: Asset synchronization

### API Integration
- Custom workflow automation
- Asset pipeline integration
- Approval system connections
- Analytics and reporting tools

## Notification System

### Real-time Notifications
- **In-app Notifications**: Immediate updates
- **Email Notifications**: Configurable email alerts
- **Mobile Push**: Mobile app notifications
- **Desktop Alerts**: System notifications

### Notification Types
- **Comments**: New comments and replies
- **Mentions**: When you're tagged
- **Approvals**: Review requests and approvals
- **Updates**: Project and asset changes
- **Deadlines**: Due date reminders

### Notification Settings
- **Frequency**: Immediate, daily digest, or weekly summary
- **Channels**: Choose notification methods
- **Filters**: Customize what triggers notifications
- **Quiet Hours**: Set do-not-disturb periods

## Best Practices

### Effective Collaboration
1. **Clear Communication**: Use descriptive comments and feedback
2. **Regular Check-ins**: Schedule team sync meetings
3. **Version Control**: Use meaningful version names
4. **Asset Organization**: Maintain clean folder structures
5. **Permission Management**: Regularly review access levels

### Security Considerations
- **Access Control**: Limit permissions to necessary levels
- **Regular Audits**: Review team access periodically
- **Secure Sharing**: Use password protection for sensitive content
- **Data Backup**: Ensure important work is backed up
- **Compliance**: Follow organizational security policies`,
    order: 4,
    lastModified: new Date("2024-01-09"),
    author: "Product Team",
    tags: ["collaboration", "teamwork"],
  },
]

// Function to build document tree from flat array
export function buildDocumentTree(documents: DocumentItem[]): DocumentTreeNode[] {
  const nodeMap = new Map<string, DocumentTreeNode>()
  const rootNodes: DocumentTreeNode[] = []

  // Create nodes for all documents
  documents.forEach((doc) => {
    const node: DocumentTreeNode = {
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      parentId: doc.parentId,
      order: doc.order,
      children: [],
      hasContent: true,
    }
    nodeMap.set(doc.id, node)
  })

  // Build tree structure
  documents.forEach((doc) => {
    const node = nodeMap.get(doc.id)!

    if (doc.parentId) {
      const parent = nodeMap.get(doc.parentId)
      if (parent) {
        parent.children.push(node)
      } else {
        // Parent doesn't exist, treat as root
        rootNodes.push(node)
      }
    } else {
      rootNodes.push(node)
    }
  })

  // Sort children by order
  const sortNodes = (nodes: DocumentTreeNode[]) => {
    nodes.sort((a, b) => a.order - b.order)
    nodes.forEach((node) => sortNodes(node.children))
  }

  sortNodes(rootNodes)
  return rootNodes
}

// Function to find document by slug
export function findDocumentBySlug(slug: string): DocumentItem | undefined {
  return documentsData.find((doc) => doc.slug === slug)
}

// Function to get breadcrumb path
export function getBreadcrumbPath(slug: string): { title: string; slug: string }[] {
  const document = findDocumentBySlug(slug)
  if (!document) return []

  const path: { title: string; slug: string }[] = []
  let current = document

  while (current) {
    path.unshift({ title: current.title, slug: current.slug })
    if (current.parentId) {
      const parentDoc = findDocumentBySlug(current.parentId)
      if (parentDoc) {
        current = parentDoc
      } else {
        break
      }
    } else {
      break
    }
  }

  return path
}
