import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { KnowledgeBrowser } from './knowledge-browser'
import type { KnowledgeDocument, KnowledgeMenuConfig } from './types'
import { mockKnowledgeDocuments } from '../../../tests/mockKnowledgeDocuments'

// Extended mock data with more variety and content
const extendedMockDocuments: KnowledgeDocument[] = [
  ...mockKnowledgeDocuments.map(doc => ({
    ...doc,
    content: doc.format === 'markdown' 
      ? `# ${doc.title}\n\n${doc.description}\n\n## Introduction\n\nThis document provides comprehensive information about ${doc.title.toLowerCase()}.\n\n### Key Points\n\n- Important concept 1\n- Important concept 2\n- Important concept 3\n\n## Best Practices\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\n### Implementation Details\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n\`\`\`javascript\n// Example code snippet\nfunction example() {\n  return "Hello World";\n}\n\`\`\`\n\n## Conclusion\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
      : `${doc.description}\n\nThis is rich text content for ${doc.title}. It contains detailed information about the topic.\n\nKey benefits:\n• Improved understanding\n• Better implementation\n• Enhanced productivity\n\nFor more information, please refer to the official documentation.`
  })),
  // Additional documents for better categorization
  {
    id: '7',
    title: 'Cloud Architecture Patterns',
    description: 'Modern cloud architecture patterns and deployment strategies',
    format: 'markdown',
    metadata: { 
      category: 'Development', 
      subcategory: 'Cloud',
      difficulty: 'Advanced',
      author: 'Cloud Team',
      department: 'Engineering'
    },
    tags: ['cloud', 'aws', 'azure', 'architecture'],
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-06-10'),
    content: '# Cloud Architecture Patterns\n\nComprehensive guide to cloud architecture...'
  },
  {
    id: '8',
    title: 'Security Best Practices',
    description: 'Essential security practices for modern web applications',
    format: 'markdown',
    metadata: { 
      category: 'Security', 
      difficulty: 'Intermediate',
      author: 'Security Team',
      department: 'Security'
    },
    tags: ['security', 'authentication', 'authorization'],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-05-25'),
    content: '# Security Best Practices\n\nEssential security guidelines...'
  },
  {
    id: '9',
    title: 'Mobile Development Guide',
    description: 'Cross-platform mobile development strategies',
    format: 'richtext',
    metadata: { 
      category: 'Development', 
      subcategory: 'Mobile',
      difficulty: 'Intermediate',
      author: 'Mobile Team',
      department: 'Engineering'
    },
    tags: ['mobile', 'react-native', 'ios', 'android'],
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-06-15'),
    content: 'Mobile Development Guide\n\nComprehensive guide for mobile development...'
  },
  {
    id: '10',
    title: 'Team Onboarding Process',
    description: 'Complete guide for onboarding new team members',
    format: 'markdown',
    metadata: { 
      category: 'Management', 
      subcategory: 'HR',
      difficulty: 'Beginner',
      author: 'HR Team',
      department: 'Human Resources'
    },
    tags: ['onboarding', 'hr', 'process', 'team'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-04-30'),
    content: '# Team Onboarding Process\n\nStep-by-step onboarding guide...'
  },
  {
    id: '11',
    title: 'Performance Optimization',
    description: 'Techniques for optimizing application performance',
    format: 'mdx',
    metadata: { 
      category: 'Development', 
      subcategory: 'Performance',
      difficulty: 'Advanced',
      author: 'Performance Team',
      department: 'Engineering'
    },
    tags: ['performance', 'optimization', 'metrics'],
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-06-05'),
    content: '# Performance Optimization\n\nAdvanced performance optimization techniques...'
  },
  {
    id: '12',
    title: 'Code Review Guidelines',
    description: 'Best practices for conducting effective code reviews',
    format: 'markdown',
    metadata: { 
      category: 'Development', 
      subcategory: 'Process',
      difficulty: 'Beginner',
      author: 'Dev Team',
      department: 'Engineering'
    },
    tags: ['code-review', 'quality', 'collaboration'],
    createdAt: new Date('2024-02-14'),
    updatedAt: new Date('2024-05-10'),
    content: '# Code Review Guidelines\n\nEffective code review practices...'
  }
]

const meta: Meta<typeof KnowledgeBrowser> = {
  title: 'Digital Colleagues/KnowledgeBrowser',
  component: KnowledgeBrowser,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A hierarchical knowledge browser component that allows users to explore and view documents organized in a tree structure with search functionality. Uses DocumentPreview and DocumentEdit components for document display and editing.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    documents: {
      control: false,
      description: 'Array of knowledge documents to display'
    },
    menuConfig: {
      control: false,
      description: 'Configuration for how the menu should be organized and displayed'
    },
    onDocumentClick: {
      action: 'document-clicked',
      description: 'Callback fired when a document is clicked'
    },
    onDocumentShare: {
      action: 'document-shared',
      description: 'Callback fired when a document is shared'
    },
    onDocumentUpdate: {
      action: 'document-updated',
      description: 'Callback fired when a document is updated in edit mode'
    },
    selectedDocumentId: {
      control: { type: 'text' },
      description: 'ID of the currently selected document'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the component'
    },
    editable: {
      control: { type: 'boolean' },
      description: 'Whether documents can be edited',
      defaultValue: true
    }
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Wrapper component to handle state management
const KnowledgeBrowserWrapper = (args: any) => {
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | undefined>(args.selectedDocumentId)
  const [documents, setDocuments] = useState<KnowledgeDocument[]>(args.documents)
  
  const handleDocumentClick = (document: KnowledgeDocument) => {
    setSelectedDocumentId(document.id)
    args.onDocumentClick?.(document)
  }

  const handleDocumentUpdate = (updatedDocument: KnowledgeDocument) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === updatedDocument.id ? updatedDocument : doc
    ))
    args.onDocumentUpdate?.(updatedDocument)
  }

  return (
    <div className="h-screen bg-background">
      <KnowledgeBrowser
        {...args}
        documents={documents}
        selectedDocumentId={selectedDocumentId}
        onDocumentClick={handleDocumentClick}
        onDocumentUpdate={handleDocumentUpdate}
      />
    </div>
  )
}

export const Default: Story = {
  render: KnowledgeBrowserWrapper,
  args: {
    documents: extendedMockDocuments,
    menuConfig: {
      groupBy: ['category'],
      sortBy: 'title',
      sortOrder: 'asc',
      showDocumentCount: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Default knowledge browser with documents grouped by category.'
      }
    }
  }
}

export const GroupedByDepartment: Story = {
  render: KnowledgeBrowserWrapper,
  args: {
    documents: extendedMockDocuments,
    menuConfig: {
      groupBy: ['department'],
      sortBy: 'updatedAt',
      sortOrder: 'desc',
      showDocumentCount: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Knowledge browser grouped by department with recent documents first.'
      }
    }
  }
}

export const HierarchicalGrouping: Story = {
  render: KnowledgeBrowserWrapper,
  args: {
    documents: extendedMockDocuments,
    menuConfig: {
      groupBy: ['category', 'subcategory'],
      sortBy: 'title',
      sortOrder: 'asc',
      showDocumentCount: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Knowledge browser with hierarchical grouping by category and subcategory.'
      }
    }
  }
}

export const GroupedByDifficulty: Story = {
  render: KnowledgeBrowserWrapper,
  args: {
    documents: extendedMockDocuments,
    menuConfig: {
      groupBy: ['difficulty'],
      sortBy: 'createdAt',
      sortOrder: 'desc',
      showDocumentCount: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Knowledge browser grouped by difficulty level.'
      }
    }
  }
}

export const WithoutDocumentCount: Story = {
  render: KnowledgeBrowserWrapper,
  args: {
    documents: extendedMockDocuments,
    menuConfig: {
      groupBy: ['category'],
      sortBy: 'title',
      sortOrder: 'asc',
      showDocumentCount: false
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Knowledge browser without document count badges for a cleaner interface.'
      }
    }
  }
}

export const WithSelectedDocument: Story = {
  render: KnowledgeBrowserWrapper,
  args: {
    documents: extendedMockDocuments,
    selectedDocumentId: '1',
    menuConfig: {
      groupBy: ['category'],
      sortBy: 'title',
      sortOrder: 'asc',
      showDocumentCount: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Knowledge browser with a pre-selected document to demonstrate the preview functionality.'
      }
    }
  }
}

export const SmallDataset: Story = {
  render: KnowledgeBrowserWrapper,
  args: {
    documents: mockKnowledgeDocuments.slice(0, 3).map(doc => ({
      ...doc,
      content: `# ${doc.title}\n\n${doc.description}\n\nThis is sample content for ${doc.title}.`
    })),
    menuConfig: {
      groupBy: ['category'],
      sortBy: 'title',
      sortOrder: 'asc',
      showDocumentCount: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Knowledge browser with a smaller dataset to test with limited content.'
      }
    }
  }
}

export const NoDocuments: Story = {
  render: KnowledgeBrowserWrapper,
  args: {
    documents: [],
    menuConfig: {
      groupBy: ['category'],
      sortBy: 'title',
      sortOrder: 'asc',
      showDocumentCount: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Knowledge browser with no documents to show the empty state.'
      }
    }
  }
}

export const DeepHierarchy: Story = {
  render: KnowledgeBrowserWrapper,
  args: {
    documents: extendedMockDocuments,
    menuConfig: {
      groupBy: ['department', 'category', 'difficulty'],
      sortBy: 'title',
      sortOrder: 'asc',
      showDocumentCount: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Knowledge browser with deep hierarchical grouping (3 levels) to test nested navigation.'
      }
    }
  }
}

export const WithEditMode: Story = {
  render: KnowledgeBrowserWrapper,
  args: {
    documents: extendedMockDocuments.slice(0, 6),
    selectedDocumentId: '1',
    editable: true,
    menuConfig: {
      groupBy: ['category'],
      sortBy: 'title',
      sortOrder: 'asc',
      showDocumentCount: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Knowledge browser with editable documents. Click the Edit button to modify document content.'
      }
    }
  }
}

export const ReadOnlyMode: Story = {
  render: KnowledgeBrowserWrapper,
  args: {
    documents: extendedMockDocuments.slice(0, 6),
    selectedDocumentId: '2',
    editable: false,
    menuConfig: {
      groupBy: ['category'],
      sortBy: 'title',
      sortOrder: 'asc',
      showDocumentCount: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Knowledge browser in read-only mode where documents cannot be edited.'
      }
    }
  }
}

export const CustomStyling: Story = {
  render: KnowledgeBrowserWrapper,
  args: {
    documents: extendedMockDocuments.slice(0, 6),
    className: 'border-2 border-primary/20 rounded-lg shadow-lg',
    menuConfig: {
      groupBy: ['category'],
      sortBy: 'title',
      sortOrder: 'asc',
      showDocumentCount: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Knowledge browser with custom styling applied via className prop.'
      }
    }
  }
}
