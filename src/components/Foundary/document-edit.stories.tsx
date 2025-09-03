import type { Meta, StoryObj } from '@storybook/react'
import { BookOpen, Code, Users, Server } from 'lucide-react'
import { DocumentEdit } from './document-edit'
import type { KnowledgeDocument, KnowledgeContext } from './types'

const meta: Meta<typeof DocumentEdit> = {
  title: 'Digital Colleagues/DocumentEdit',
  component: DocumentEdit,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A document editing interface that allows users to modify knowledge document properties and content.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    document: {
      control: false,
      description: 'The knowledge document to edit'
    },
    onSave: {
      action: 'document-saved',
      description: 'Callback fired when the document is saved'
    },
    onCancel: {
      action: 'edit-cancelled',
      description: 'Callback fired when editing is cancelled'
    },
    availableDocuments: {
      control: false,
      description: 'Array of available documents to suggest metadata values from'
    },
    knowledgeContexts: {
      control: false,
      description: 'Array of knowledge contexts to suggest metadata keys from'
    }
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample knowledge contexts for metadata suggestions
const sampleKnowledgeContexts: KnowledgeContext[] = [
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
    id: 'development',
    label: 'Development',
    description: 'Development documentation organized by team and difficulty',
    icon: <Code className="h-4 w-4" />,
    menuConfig: {
      groupBy: ['team', 'difficulty'],
      sortBy: 'updatedAt',
      sortOrder: 'desc',
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
  }
]

// Sample documents to provide metadata suggestions
const sampleAvailableDocuments: KnowledgeDocument[] = [
  {
    id: '1',
    title: 'API Authentication Guide',
    description: 'Complete guide for implementing API authentication',
    format: 'markdown',
    metadata: {
      category: 'Development',
      type: 'Guide',
      team: 'Backend',
      difficulty: 'Intermediate',
      project: 'Auth System',
      priority: 'High'
    },
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    title: 'UI Component Library',
    description: 'Design system and component documentation',
    format: 'mdx',
    metadata: {
      category: 'Design',
      type: 'Reference',
      team: 'Frontend',
      difficulty: 'Beginner',
      project: 'Design System',
      priority: 'Medium'
    },
    createdAt: new Date('2024-02-15'),
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
      project: 'Database Migration',
      priority: 'High'
    },
    createdAt: new Date('2024-03-01'),
  }
]

// Sample documents for stories
const sampleMarkdownDocument: KnowledgeDocument = {
  id: '1',
  title: 'React Development Best Practices',
  description: 'Comprehensive guide to React development patterns and practices',
  format: 'markdown',
  metadata: { 
    category: 'Development', 
    difficulty: 'Intermediate',
    author: 'Dev Team',
    lastReviewed: '2024-06-01',
    team: 'Frontend',
    type: 'Guide'
  },
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-06-20'),
  content: `# React Development Best Practices

This comprehensive guide covers the essential patterns and practices for React development.

## Introduction

React is a powerful library for building user interfaces. Following best practices ensures your applications are maintainable, performant, and scalable.

### Key Principles

1. **Component Composition** - Build small, reusable components
2. **State Management** - Keep state as local as possible
3. **Performance** - Use React.memo and useMemo when appropriate
4. **Testing** - Write comprehensive tests for your components

## Code Examples

Here's an example of a well-structured React component:

\`\`\`jsx
import React, { useState, useCallback } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(\`/api/users/\${userId}\`);
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
\`\`\`

## Best Practices Checklist

- [ ] Use functional components with hooks
- [ ] Implement proper error boundaries
- [ ] Optimize renders with React.memo
- [ ] Use TypeScript for better type safety
- [ ] Follow consistent naming conventions
- [ ] Write unit and integration tests

## Conclusion

Following these best practices will help you build robust React applications that are easy to maintain and scale.`
}

const sampleRichTextDocument: KnowledgeDocument = {
  id: '2',
  title: 'Team Communication Guidelines',
  description: 'Essential guidelines for effective team communication',
  format: 'richtext',
  metadata: { 
    category: 'Management', 
    difficulty: 'Beginner',
    department: 'HR',
    type: 'Guidelines',
    team: 'HR'
  },
  createdAt: new Date('2024-02-10'),
  updatedAt: new Date('2024-05-15'),
  content: `Team Communication Guidelines

Effective communication is crucial for team success. These guidelines help ensure clear, respectful, and productive interactions.

Core Principles:
• Be clear and concise in your messaging
• Listen actively and ask clarifying questions
• Respect different communication styles and preferences
• Use appropriate channels for different types of communication

Meeting Guidelines:
• Start and end on time
• Come prepared with agenda items
• Encourage participation from all team members
• Follow up with action items and next steps

Digital Communication:
• Use @mentions when you need someone's attention
• Keep messages focused and actionable
• Use threads to keep conversations organized
• Respond within 24 hours during business days

Remember: Good communication builds trust and improves team productivity.`
}

const emptyDocument: KnowledgeDocument = {
  id: '3',
  title: '',
  description: '',
  format: 'markdown',
  createdAt: new Date(),
  content: ''
}

const documentWithoutTags: KnowledgeDocument = {
  id: '4',
  title: 'Simple Document',
  description: 'A document without tags for testing',
  format: 'mdx',
  metadata: { category: 'Testing' },
  createdAt: new Date('2024-01-01'),
  content: 'Simple content for testing purposes.'
}

export const EditMarkdownDocument: Story = {
  args: {
    document: sampleMarkdownDocument,
    availableDocuments: sampleAvailableDocuments,
    knowledgeContexts: sampleKnowledgeContexts
  },
  parameters: {
    docs: {
      description: {
        story: 'Document editor for a markdown document with comprehensive content and metadata.'
      }
    }
  }
}

export const EditRichTextDocument: Story = {
  args: {
    document: sampleRichTextDocument,
    availableDocuments: sampleAvailableDocuments,
    knowledgeContexts: sampleKnowledgeContexts
  },
  parameters: {
    docs: {
      description: {
        story: 'Document editor for a rich text document with formatted content.'
      }
    }
  }
}

export const EditEmptyDocument: Story = {
  args: {
    document: emptyDocument,
    availableDocuments: sampleAvailableDocuments,
    knowledgeContexts: sampleKnowledgeContexts
  },
  parameters: {
    docs: {
      description: {
        story: 'Document editor starting with an empty document to test creation workflow.'
      }
    }
  }
}

export const EditDocumentWithoutTags: Story = {
  args: {
    document: documentWithoutTags,
    availableDocuments: sampleAvailableDocuments,
    knowledgeContexts: sampleKnowledgeContexts
  },
  parameters: {
    docs: {
      description: {
        story: 'Document editor for a document without tags to test the tags input field.'
      }
    }
  }
}

export const EditLongContent: Story = {
  args: {
    document: {
      ...sampleMarkdownDocument,
      content: sampleMarkdownDocument.content + '\n\n' + 
        'Additional content section with more details. '.repeat(20) + '\n\n' +
        sampleMarkdownDocument.content + '\n\n' +
        'Even more content to test the textarea scrolling behavior. '.repeat(30) + '\n\n' +
        '## Additional Section\n\nMore content here to make it really long and test the editing experience with substantial content.'
    },
    availableDocuments: sampleAvailableDocuments,
    knowledgeContexts: sampleKnowledgeContexts
  },
  parameters: {
    docs: {
      description: {
        story: 'Document editor with very long content to test textarea behavior and scrolling.'
      }
    }
  }
}

export const EditMinimalDocument: Story = {
  args: {
    document: {
      id: '5',
      title: 'Minimal Doc',
      format: 'markdown' as const,
      createdAt: new Date(),
      content: 'Just basic content.'
    },
    availableDocuments: sampleAvailableDocuments,
    knowledgeContexts: sampleKnowledgeContexts
  },
  parameters: {
    docs: {
      description: {
        story: 'Document editor with minimal fields to test the layout with fewer properties.'
      }
    }
  }
}

export const EditMdxDocument: Story = {
  args: {
    document: {
      id: '6',
      title: 'MDX Component Guide',
      description: 'Interactive guide for MDX components',
      format: 'mdx' as const,
      metadata: { 
        category: 'Documentation', 
        interactive: true,
        complexity: 'Advanced',
        type: 'Guide',
        team: 'Frontend'
      },
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-06-15'),
      content: `# MDX Component Guide

This is an interactive MDX document that combines markdown with React components.

## Basic Usage

\`\`\`mdx
import { Button } from './components/Button'

# My Document

Here's a custom component:

<Button variant="primary">Click me!</Button>
\`\`\`

## Advanced Features

MDX allows you to:
- Use React components directly in markdown
- Pass props to components
- Create interactive documentation
- Combine content with functionality

<CustomComponent prop="value" />

## Best Practices

1. Keep components simple and focused
2. Document component props clearly
3. Test interactive elements thoroughly
4. Maintain good performance`
    },
    availableDocuments: sampleAvailableDocuments,
    knowledgeContexts: sampleKnowledgeContexts
  },
  parameters: {
    docs: {
      description: {
        story: 'Document editor for an MDX document with React components and interactive content.'
      }
    }
  }
}

export const EditDocumentWithMetadataSuggestions: Story = {
  name: 'Metadata Suggestions Demo',
  args: {
    document: {
      id: '7',
      title: 'New Project Documentation',
      description: 'Documentation for a new project',
      format: 'markdown' as const,
      metadata: { 
        category: 'Development'
      },
      createdAt: new Date(),
      content: '# New Project\n\nThis is documentation for a new project.'
    },
    availableDocuments: sampleAvailableDocuments,
    knowledgeContexts: sampleKnowledgeContexts
  },
  parameters: {
    docs: {
      description: {
        story: `**Metadata Suggestions Feature Demo**

This story demonstrates the enhanced metadata editing features:

1. **Suggested Keys**: Field names are suggested based on knowledge contexts (category, type, team, difficulty, project)
2. **Suggested Values**: When you select a field name that exists in other documents, common values are suggested
3. **Context-based Hints**: The interface shows which fields are commonly used for organizing documents
4. **Dynamic Interface**: Fields with existing values show a dropdown, while new fields use free text input

Try adding these metadata fields to see the suggestions:
- **category**: Will suggest Development, Design, Management, etc.
- **team**: Will suggest Backend, Frontend, HR, etc.  
- **difficulty**: Will suggest Beginner, Intermediate, Advanced
- **type**: Will suggest Guide, Reference, Best Practice, etc.

The suggestions come from the sample documents and knowledge contexts provided to the component.`
      }
    }
  }
}
