import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import KnowledgeView from './KnowledgeView'
import type { KnowledgeDocument, KnowledgeContext } from '../../DigitalColleagues/types'
import { Server, Code, Users, BookOpen, Database, Shield, FileText } from 'lucide-react'

const meta: Meta<typeof KnowledgeView> = {
  title: 'Digital Colleagues/Views/KnowledgeView',
  component: KnowledgeView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: 'A comprehensive knowledge management interface for organizing and accessing team documentation',
    docs: {
      description: {
        component: `
### Documentation

[Full Documentation HERE](/?path=/docs/digital-colleagues-views-knowledgeview-documentation--docs)

        `
      }
    }
  },
  argTypes: {
    documents: {
      description: 'Array of knowledge documents to display. Each document contains metadata, content, and organizational information.',
      control: { type: 'object' },
      table: {
        type: { summary: 'KnowledgeDocument[]' },
        defaultValue: { summary: '[]' }
      }
    },
    contexts: {
      description: `Array of KnowledgeContext objects that define different organizational views of the documents. 
      
Each context represents a different way users can browse and find documents:
- **All Documents**: General categorization
- **By Services**: Service and team organization  
- **Architecture**: Technical component organization
- **Teams**: Team and project-based grouping

The menuConfig in each context determines how documents are grouped and sorted within that view.`,
      control: { type: 'object' },
      table: {
        type: { summary: 'KnowledgeContext[]' },
        defaultValue: { summary: '[]' }
      }
    },
    onDocumentClick: {
      description: `Callback function invoked when a user clicks on a document for selection. 

**Parameters:**
- \`document\`: The complete KnowledgeDocument object that was clicked

**Common Use Cases:**
- Update selection state for visual highlighting
- Open document preview or detailed view
- Track analytics and user interactions
- Navigate to document-specific pages
- Trigger additional UI updates

**Example:**
\`\`\`typescript
const handleDocumentClick = (document: KnowledgeDocument) => {
  setSelectedDocumentId(document.id)
  openPreviewPanel(document)
  trackAnalytics('document_clicked', { id: document.id })
}
\`\`\``,
      action: 'document-clicked',
      table: {
        type: { summary: '(document: KnowledgeDocument) => void' }
      }
    },
    onDocumentShare: {
      description: `Callback function invoked when a user initiates sharing of a document.

**Parameters:**  
- \`document\`: The KnowledgeDocument object being shared

**Common Use Cases:**
- Open share dialog with team member selection
- Copy document link to clipboard
- Send document via email or messaging
- Track sharing analytics
- Create collaboration notifications

**Example:**
\`\`\`typescript
const handleDocumentShare = (document: KnowledgeDocument) => {
  copyToClipboard(\`/docs/\${document.id}\`)
  showNotification('Document link copied!')
  trackAnalytics('document_shared', { id: document.id })
}
\`\`\``,
      action: 'document-shared',
      table: {
        type: { summary: '(document: KnowledgeDocument) => void' }
      }
    },
    onLoadDocumentContent: {
      description: `Optional async function for lazy loading document content.

**Parameters:**
- \`documentId\`: The ID of the document to load content for

**Returns:** 
- \`Promise<string>\`: The document content as a string

**Use Cases:**
- Large document collections (50+ items)
- Documents with substantial content (>10KB)
- Mobile or low-bandwidth environments
- Fresh content that needs to be fetched from APIs

**Example:**
\`\`\`typescript
const loadContent = async (id: string) => {
  const response = await fetch(\`/api/documents/\${id}/content\`)
  return response.text()
}
\`\`\``,
      table: {
        type: { summary: '(documentId: string) => Promise<string>' }
      }
    },
    selectedDocumentId: {
      description: `ID of the currently selected/highlighted document. 

**Behavior:**
- Highlights the specified document with distinct styling
- Selection persists across context switches
- Used for visual feedback and state management
- Can be updated through onDocumentClick callback

**Selection States:**
- \`undefined\`: No document selected
- \`"valid-id"\`: Document with matching ID is highlighted
- \`"invalid-id"\`: No visual effect (gracefully handled)

**Example:**
\`\`\`typescript
const [selectedId, setSelectedId] = useState<string>('doc-123')
// Document with ID 'doc-123' will be highlighted
\`\`\``,
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Sample knowledge documents
export const sampleDocuments: KnowledgeDocument[] = [
  {
    id: '1',
    title: 'API Authentication Guide',
    description: 'Complete guide for implementing API authentication in our platform',
    format: 'markdown',
    metadata: {
      category: 'Development',
      type: 'Guide',
      team: 'Backend',
      difficulty: 'Intermediate',
      version: '2.1',
      service: 'Authentication Service',
      component: 'Auth Module',
      layer: 'API Layer',
      project: 'Security Framework'
    },
    content: `# API Authentication Guide

## Overview
This guide covers the implementation of secure API authentication...

## OAuth 2.0 Implementation
- Authorization Code Flow
- Client Credentials Flow
- Refresh Token Handling

## Best Practices
1. Always use HTTPS
2. Implement proper token expiration
3. Use secure storage for credentials`,
    tags: ['api', 'security', 'oauth', 'backend'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: '2',
    title: 'UI Component Library',
    description: 'Documentation for our React component library',
    format: 'mdx',
    metadata: {
      category: 'Development',
      type: 'Documentation',
      team: 'Frontend',
      difficulty: 'Beginner',
      version: '1.5',
      service: 'UI Service',
      component: 'Component Library',
      layer: 'Presentation Layer',
      project: 'Design System'
    },
    content: `# UI Component Library

## Installation
\`\`\`bash
npm install @company/ui-components
\`\`\`

## Basic Usage
\`\`\`jsx
import { Button, Card } from '@company/ui-components'

function App() {
  return (
    <Card>
      <Button variant="primary">Click me</Button>
    </Card>
  )
}
\`\`\``,
    tags: ['ui', 'react', 'components', 'frontend'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    id: '3',
    title: 'Database Schema Design',
    description: 'Guidelines for designing scalable database schemas',
    format: 'markdown',
    metadata: {
      category: 'Development',
      type: 'Best Practice',
      team: 'Backend',
      difficulty: 'Advanced',
      version: '3.0'
    },
    content: `# Database Schema Design

## Principles
- Normalize for consistency
- Denormalize for performance
- Index strategically

## Common Patterns
1. One-to-Many relationships
2. Many-to-Many with junction tables
3. Polymorphic associations`,
    tags: ['database', 'schema', 'sql', 'backend'],
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    title: 'Employee Onboarding Process',
    description: 'Step-by-step guide for new employee onboarding',
    format: 'richtext',
    metadata: {
      category: 'HR',
      type: 'Process',
      team: 'Human Resources',
      difficulty: 'Beginner',
      department: 'Operations'
    },
    content: `Employee Onboarding Checklist

Day 1:
- Welcome meeting with manager
- IT setup and account creation
- Office tour and safety briefing
- Complete paperwork

Week 1:
- Team introductions
- Project overview sessions
- Access to necessary tools
- Initial training modules

Month 1:
- Progress review
- Goal setting
- Feedback session`,
    tags: ['hr', 'onboarding', 'process', 'checklist'],
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '5',
    title: 'Marketing Campaign Analysis',
    description: 'Q1 2024 marketing campaign performance analysis',
    format: 'markdown',
    metadata: {
      category: 'Marketing',
      type: 'Report',
      team: 'Marketing',
      difficulty: 'Intermediate',
      quarter: 'Q1 2024'
    },
    content: `# Q1 2024 Marketing Campaign Analysis

## Executive Summary
Our Q1 campaigns showed a 25% increase in engagement...

## Key Metrics
- Click-through rate: 3.2%
- Conversion rate: 1.8%
- Cost per acquisition: $45

## Recommendations
1. Increase social media spend
2. A/B test email subject lines
3. Optimize landing pages`,
    tags: ['marketing', 'analysis', 'campaign', 'metrics'],
    createdAt: new Date('2024-04-01'),
  },
  {
    id: '6',
    title: 'Security Incident Response',
    description: 'Procedures for handling security incidents',
    format: 'markdown',
    metadata: {
      category: 'Security',
      type: 'Procedure',
      team: 'Security',
      difficulty: 'Advanced',
      criticality: 'High'
    },
    content: `# Security Incident Response Procedure

## Immediate Response (0-1 hour)
1. Assess and contain the threat
2. Document the incident
3. Notify the security team

## Investigation Phase (1-24 hours)
1. Gather evidence
2. Analyze attack vectors
3. Determine scope of compromise

## Recovery and Lessons Learned
1. Implement fixes
2. Update procedures
3. Conduct post-incident review`,
    tags: ['security', 'incident', 'response', 'procedure'],
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '7',
    title: 'Design System Guidelines',
    description: 'Visual design standards and component usage guidelines',
    format: 'mdx',
    metadata: {
      category: 'Design',
      type: 'Guidelines',
      team: 'Design',
      difficulty: 'Intermediate',
      version: '2.0'
    },
    content: `# Design System Guidelines

## Color Palette
- Primary: #3B82F6
- Secondary: #10B981
- Neutral: #6B7280

## Typography
- Headings: Inter Bold
- Body: Inter Regular
- Code: JetBrains Mono

## Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px`,
    tags: ['design', 'system', 'guidelines', 'ui'],
    createdAt: new Date('2024-01-25'),
  },
]

// Default contexts that can be used as fallback or example configurations
export const defaultContexts: KnowledgeContext[] = [
  {
    id: 'all',
    label: 'All Documentation',
    description: 'Browse all documentation organized by category and type',
    icon: <BookOpen className="h-4 w-4" />,
    menuConfig: {
      groupBy: ['category', 'type'],
      sortBy: 'title',
      sortOrder: 'asc',
      showDocumentCount: true
    }
  },
  {
    id: 'services',
    label: 'Services',
    description: 'Documentation organized by service and team',
    icon: <Server className="h-4 w-4" />,
    menuConfig: {
      groupBy: ['service', 'team'],
      sortBy: 'updatedAt',
      sortOrder: 'desc',
      showDocumentCount: true
    }
  },
  {
    id: 'architecture',
    label: 'Architecture',
    description: 'System architecture documentation by component and layer',
    icon: <Code className="h-4 w-4" />,
    menuConfig: {
      groupBy: ['component', 'layer'],
      sortBy: 'title',
      sortOrder: 'asc',
      showDocumentCount: true
    }
  },
  {
    id: 'teams',
    label: 'Teams',
    description: 'Documentation organized by team and project',
    icon: <Users className="h-4 w-4" />,
    menuConfig: {
      groupBy: ['team', 'project'],
      sortBy: 'updatedAt',
      sortOrder: 'desc',
      showDocumentCount: true
    }
  },
  {
    id: 'security',
    label: 'Security',
    description: 'Security documentation and compliance guides',
    icon: <Shield className="h-4 w-4" />,
    menuConfig: {
      groupBy: ['category', 'difficulty'],
      sortBy: 'updatedAt',
      sortOrder: 'desc',
      showDocumentCount: true
    }
  }
]

export const Default: Story = {
  name: 'Complete View',
  parameters: {
    docs: {
      description: {
        story: 'Shows the KnowledgeView with all default contexts and sample documentation. This is the most comprehensive view showing all features including context switching, document browsing, and metadata display.'
      }
    }
  },
  args: {
    documents: sampleDocuments,
    contexts: defaultContexts,
  },
}

export const ServicesView: Story = {
  name: 'Services Context Only',
  parameters: {
    docs: {
      description: {
        story: 'Displays only the Services context, showing how documents are organized by service and team. This view is useful for service-oriented documentation workflows.'
      }
    }
  },
  args: {
    documents: sampleDocuments,
    contexts: defaultContexts.filter(c => c.id === 'services'),
  },
}

export const ArchitectureView: Story = {
  name: 'Architecture Context Only',
  parameters: {
    docs: {
      description: {
        story: 'Shows only the Architecture context, organizing documents by component and layer. Perfect for technical documentation and system architecture references.'
      }
    }
  },
  args: {
    documents: sampleDocuments,
    contexts: defaultContexts.filter(c => c.id === 'architecture'),
  },
}

export const TeamsView: Story = {
  name: 'Teams Context Only',
  parameters: {
    docs: {
      description: {
        story: 'Focuses on the Teams context, grouping documents by team and project. Ideal for team-specific documentation management.'
      }
    }
  },
  args: {
    documents: sampleDocuments,
    contexts: defaultContexts.filter(c => c.id === 'teams'),
  },
}

export const EmptyState: Story = {
  name: 'No Documents',
  parameters: {
    docs: {
      description: {
        story: 'Shows how the component handles an empty document state while still providing context navigation. Useful for testing empty states and initial loading scenarios.'
      }
    }
  },
  args: {
    documents: [],
    contexts: defaultContexts,
  },
}

export const WithSelection: Story = {
  name: 'With Selected Document',
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the component with a pre-selected document (UI Component Library). Shows how selection highlighting works within the knowledge browser.'
      }
    }
  },
  args: {
    documents: sampleDocuments,
    contexts: defaultContexts,
    selectedDocumentId: '2',
  },
}

export const InteractiveDocumentSwitching: Story = {
  name: 'Interactive Document Selection',
  parameters: {
    docs: {
      description: {
        story: `**Interactive Document Selection Demo**

This story demonstrates how document selection works in the KnowledgeView component:

1. Click on any document in the browser to select it
2. The selected document will be highlighted with a different background
3. The onDocumentClick callback will be triggered with the document data
4. You can see the selection state change in the Actions panel below

**Key Features:**
- Visual feedback for selected documents
- Callback handling for document clicks
- State management for selection highlighting
- Integration with the KnowledgeBrowser component

**Use Cases:**
- Document preview interfaces
- Multi-step document workflows
- Document comparison tools
- Knowledge base navigation

The selection state is managed through the \`selectedDocumentId\` prop and updated via the \`onDocumentClick\` callback.`
      }
    }
  },
  render: (args) => {
    const [selectedDocumentId, setSelectedDocumentId] = useState<string | undefined>(args.selectedDocumentId)
    
    const handleDocumentClick = (document: KnowledgeDocument) => {
      setSelectedDocumentId(document.id)
      // Call the original callback for Actions panel
      args.onDocumentClick?.(document)
    }

    return (
      <KnowledgeView
        {...args}
        selectedDocumentId={selectedDocumentId}
        onDocumentClick={handleDocumentClick}
      />
    )
  },
  args: {
    documents: sampleDocuments,
    contexts: defaultContexts,
    selectedDocumentId: '1',
  },
}

export const DocumentSwitchingWithSharing: Story = {
  name: 'Document Selection + Sharing',
  parameters: {
    docs: {
      description: {
        story: `**Document Selection with Sharing Actions**

This story shows how document selection works together with sharing functionality:

1. **Select Documents**: Click any document to select it
2. **Share Documents**: Use sharing actions (if available in the KnowledgeBrowser)
3. **Multiple Interactions**: Both selection and sharing callbacks are demonstrated

**Callback Behavior:**
- \`onDocumentClick\`: Triggers when clicking a document for selection
- \`onDocumentShare\`: Triggers when sharing a document
- Both actions are logged to the Actions panel

**Real-world Usage:**
- Knowledge management systems
- Document collaboration platforms
- Team documentation workflows
- Content sharing interfaces`
      }
    }
  },
  render: (args) => {
    const [selectedDocumentId, setSelectedDocumentId] = useState<string | undefined>(args.selectedDocumentId)
    const [lastSharedDocument, setLastSharedDocument] = useState<KnowledgeDocument | null>(null)
    
    const handleDocumentClick = (document: KnowledgeDocument) => {
      setSelectedDocumentId(document.id)
      args.onDocumentClick?.(document)
    }

    const handleDocumentShare = (document: KnowledgeDocument) => {
      setLastSharedDocument(document)
      args.onDocumentShare?.(document)
    }

    return (
      <div className="space-y-4">
        {lastSharedDocument && (
          <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              📤 Last shared: <strong>{lastSharedDocument.title}</strong>
            </p>
          </div>
        )}
        <KnowledgeView
          {...args}
          selectedDocumentId={selectedDocumentId}
          onDocumentClick={handleDocumentClick}
          onDocumentShare={handleDocumentShare}
        />
      </div>
    )
  },
  args: {
    documents: sampleDocuments,
    contexts: defaultContexts,
  },
}

export const MultiContextDocumentSwitching: Story = {
  name: 'Cross-Context Document Selection',
  parameters: {
    docs: {
      description: {
        story: `**Cross-Context Document Selection**

This advanced example demonstrates how document selection persists across different context views:

1. **Select a Document**: Click any document in the current context
2. **Switch Contexts**: Change to a different context using the tabs
3. **Persistent Selection**: The selected document remains highlighted even in different organizational views
4. **Context-aware Display**: The same document may appear in different locations depending on the context's grouping rules

**Key Behaviors:**
- Selection state persists across context switches
- Documents appear in different groups based on active context
- Selected document is highlighted regardless of its group location
- Useful for maintaining focus while exploring different organizational views

**Technical Implementation:**
- Uses \`selectedDocumentId\` to maintain selection state
- KnowledgeBrowser handles highlighting across different grouping structures
- Context switching doesn't reset selection unless explicitly cleared`
      }
    }
  },
  render: (args) => {
    const [selectedDocumentId, setSelectedDocumentId] = useState<string | undefined>('3')
    
    const handleDocumentClick = (document: KnowledgeDocument) => {
      setSelectedDocumentId(document.id)
      args.onDocumentClick?.(document)
    }

    return (
      <div className="space-y-4">
        <div className="p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            💡 <strong>Try this:</strong> Select a document, then switch between contexts to see how the selection persists across different organizational views.
          </p>
        </div>
        <KnowledgeView
          {...args}
          selectedDocumentId={selectedDocumentId}
          onDocumentClick={handleDocumentClick}
        />
      </div>
    )
  },
  args: {
    documents: sampleDocuments,
    contexts: defaultContexts,
  },
}

export const NoContexts: Story = {
  name: 'No Contexts Available',
  parameters: {
    docs: {
      description: {
        story: 'Shows the fallback state when no contexts are provided. The component gracefully handles this edge case by displaying a message instead of breaking.'
      }
    }
  },
  args: {
    documents: sampleDocuments,
    contexts: [],
  },
}

export const CustomContextExample: Story = {
  name: 'Custom Context Configuration',
  parameters: {
    docs: {
      description: {
        story: `Demonstrates how to create a custom context with specific grouping and sorting rules. 
        
This example shows a "Priority View" that groups documents by difficulty and priority levels, sorted by update time. This is useful for creating workflow-specific views of your documentation.`
      }
    }
  },
  args: {
    documents: sampleDocuments,
    contexts: [
      {
        id: 'priority',
        label: 'Priority View',
        description: 'Documents organized by difficulty and sorted by recent updates',
        icon: <Shield className="h-4 w-4" />,
        menuConfig: {
          groupBy: ['difficulty', 'category'],
          sortBy: 'updatedAt',
          sortOrder: 'desc',
          showDocumentCount: true
        }
      },
      {
        id: 'formats',
        label: 'By Format',
        description: 'Documents grouped by their format type',
        icon: <FileText className="h-4 w-4" />,
        menuConfig: {
          groupBy: ['format', 'team'],
          sortBy: 'title',
          sortOrder: 'asc',
          showDocumentCount: true
        }
      }
    ],
  },
}

export const DocumentSwitchingWithPreview: Story = {
  name: 'Document Selection with Preview',
  parameters: {
    docs: {
      description: {
        story: `**Document Selection with Live Preview**

This story demonstrates a complete document browsing experience with live preview:

1. **Browse Documents**: Use the knowledge browser to explore documents
2. **Select for Preview**: Click any document to see its details in the preview panel
3. **Context Switching**: Change contexts while maintaining the preview
4. **Rich Metadata Display**: See document metadata, tags, and content preview

**Preview Panel Features:**
- Document title and description
- Metadata display (category, team, type, etc.)
- Creation and update dates
- Tag visualization
- Content preview (first few lines)

**Real-world Applications:**
- Knowledge base interfaces
- Document management systems
- Research and reference tools
- Team documentation platforms

This pattern is commonly used in document-heavy applications where users need to quickly preview content before opening the full document.`
      }
    }
  },
  render: (args) => {
    const [selectedDocumentId, setSelectedDocumentId] = useState<string | undefined>()
    const selectedDocument = selectedDocumentId 
      ? sampleDocuments.find(doc => doc.id === selectedDocumentId)
      : null
    
    const handleDocumentClick = (document: KnowledgeDocument) => {
      setSelectedDocumentId(document.id)
      args.onDocumentClick?.(document)
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Knowledge View - Takes up 2/3 of the space */}
        <div className="lg:col-span-2">
          <KnowledgeView
            {...args}
            selectedDocumentId={selectedDocumentId}
            onDocumentClick={handleDocumentClick}
          />
        </div>
        
        {/* Document Preview Panel - Takes up 1/3 of the space */}
        <div className="lg:col-span-1 border border-border rounded-lg bg-card">
          {selectedDocument ? (
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {selectedDocument.title}
                </h3>
                {selectedDocument.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedDocument.description}
                  </p>
                )}
              </div>
              
              {/* Metadata */}
              {selectedDocument.metadata && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Metadata</h4>
                  <div className="grid grid-cols-1 gap-1 text-xs">
                    {Object.entries(selectedDocument.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-muted-foreground capitalize">{key}:</span>
                        <span className="text-foreground font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Tags */}
              {selectedDocument.tags && selectedDocument.tags.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedDocument.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Dates */}
              <div className="space-y-1 text-xs text-muted-foreground">
                <div>Created: {selectedDocument.createdAt.toLocaleDateString()}</div>
                {selectedDocument.updatedAt && (
                  <div>Updated: {selectedDocument.updatedAt.toLocaleDateString()}</div>
                )}
              </div>
              
              {/* Content Preview */}
              {selectedDocument.content && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Preview</h4>
                  <div className="p-3 bg-muted rounded text-xs text-muted-foreground font-mono max-h-32 overflow-y-auto">
                    {selectedDocument.content.split('\n').slice(0, 8).join('\n')}
                    {selectedDocument.content.split('\n').length > 8 && '\n...'}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              <div className="py-8">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Select a document to see its preview</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  },
  args: {
    documents: sampleDocuments,
    contexts: defaultContexts,
  },
}

export const LazyContentLoading: Story = {
  name: 'Lazy Content Loading',
  parameters: {
    docs: {
      description: {
        story: `**Lazy Content Loading Pattern**

This story demonstrates how to implement lazy content loading for better performance:

- Documents loaded with metadata only initially
- Content fetched on-demand when clicked  
- Loading states and caching
- Better performance for large collections

**Use Cases:** 50+ documents, >10KB content, mobile users`
      }
    }
  },
  render: (args) => {
    const [selectedDocumentId, setSelectedDocumentId] = useState<string | undefined>()
    const [loadedContent, setLoadedContent] = useState<Map<string, string>>(new Map())
    const [loadingContent, setLoadingContent] = useState<Set<string>>(new Set())

    // Documents without pre-loaded content
    const documentsWithoutContent = sampleDocuments.map(doc => ({
      ...doc,
      content: undefined
    }))

    // Simulate API loading
    const simulateContentLoading = async (documentId: string): Promise<string> => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const originalDoc = sampleDocuments.find(doc => doc.id === documentId)
      return originalDoc?.content || `# ${originalDoc?.title}\n\nContent loaded dynamically...`
    }

    const handleDocumentClick = async (document: KnowledgeDocument) => {
      setSelectedDocumentId(document.id)
      args.onDocumentClick?.(document)

      if (!loadedContent.has(document.id)) {
        setLoadingContent(prev => new Set(prev).add(document.id))
        try {
          const content = await simulateContentLoading(document.id)
          setLoadedContent(prev => new Map(prev).set(document.id, content))
        } finally {
          setLoadingContent(prev => {
            const newSet = new Set(prev)
            newSet.delete(document.id)
            return newSet
          })
        }
      }
    }

    const selectedDocument = selectedDocumentId 
      ? documentsWithoutContent.find(doc => doc.id === selectedDocumentId)
      : null

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        <div className="lg:col-span-2">
          <KnowledgeView
            {...args}
            documents={documentsWithoutContent}
            selectedDocumentId={selectedDocumentId}
            onDocumentClick={handleDocumentClick}
            onLoadDocumentContent={simulateContentLoading}
          />
        </div>
        
        <div className="lg:col-span-1 border border-border rounded-lg bg-card">
          {selectedDocument ? (
            <div className="p-4 space-y-4">
              <h3 className="text-lg font-semibold">
                {selectedDocument.title}
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Content</h4>
                  {loadingContent.has(selectedDocument.id) && (
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="animate-spin h-3 w-3 border border-current border-t-transparent rounded-full"></div>
                      <span>Loading...</span>
                    </div>
                  )}
                </div>
                
                <div className="p-3 bg-muted rounded text-xs font-mono max-h-40 overflow-y-auto">
                  {loadingContent.has(selectedDocument.id) 
                    ? 'Loading content...'
                    : loadedContent.get(selectedDocument.id) || 'Content not loaded'
                  }
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Cached: {loadedContent.size} documents
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Select a document to load its content</p>
            </div>
          )}
        </div>
      </div>
    )
  },
  args: {
    documents: [],
    contexts: defaultContexts,
  },
}
