import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DocumentPreview, type DocumentRenderers } from './document-preview'
import { customRenderers } from './document-preview-examples'
import type { KnowledgeDocument } from './types'

// Enhanced markdown renderer example for the story
const enhancedMarkdownRenderer = (content: string) => {
  const renderMarkdown = (text: string) => {
    return text
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-foreground mb-3 mt-6">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-foreground mb-4 mt-8">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-foreground mb-6 mt-8">$1</h1>')
      
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)\n```/g, (match, lang, code) => 
        `<pre class="bg-muted border border-border rounded-lg p-4 my-4 overflow-x-auto"><code class="text-sm font-mono text-foreground">${code.trim()}</code></pre>`
      )
      
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground border">$1</code>')
      
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:text-primary/80 underline">$1</a>')
      
      // Bold and italic
      .replace(/\*\*\*([^*]+)\*\*\*/g, '<strong class="font-bold"><em class="italic">$1</em></strong>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em class="italic text-foreground">$1</em>')
      
      // Lists
      .replace(/^\- (.+$)/gim, '<li class="ml-4 mb-1">• $1</li>')
      .replace(/^(\d+)\. (.+$)/gim, '<li class="ml-4 mb-1">$1. $2</li>')
      
      // Blockquotes
      .replace(/^> (.+$)/gim, '<blockquote class="border-l-4 border-primary/30 pl-4 py-2 my-4 bg-muted/50 italic text-muted-foreground">$1</blockquote>')
      
      // Line breaks
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>')
  }

  const processedContent = renderMarkdown(content)
  
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <div 
        className="text-foreground leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: `<p class="mb-4">${processedContent}</p>`
        }}
      />
    </div>
  )
}

// Story-specific renderers with the enhanced markdown renderer
const storyRenderers: DocumentRenderers = {
  ...customRenderers,
  markdown: enhancedMarkdownRenderer
}

const meta: Meta<typeof DocumentPreview> = {
  title: 'Digital Colleagues/DocumentPreview',
  component: DocumentPreview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A document preview component that displays knowledge documents with optional edit functionality and custom renderers for different file types (Markdown, MDX, RichText, Text). Features an enhanced markdown renderer example.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    document: {
      control: false,
      description: 'The knowledge document to display'
    },
    onDocumentUpdate: {
      action: 'document-updated',
      description: 'Callback fired when a document is updated'
    },
    editable: {
      control: { type: 'boolean' },
      description: 'Whether the document can be edited',
      defaultValue: true
    },
    renderers: {
      control: false,
      description: 'Custom renderers for different file formats (markdown, mdx, richtext, text)'
    }
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Wrapper component for stories
function DocumentPreviewWrapper(args: any) {
  const [document, setDocument] = useState(args.document)
  
  return (
    <div className="h-screen bg-background">
      <DocumentPreview
        {...args}
        document={document}
        onDocumentUpdate={(updatedDoc) => {
          setDocument(updatedDoc)
          args.onDocumentUpdate?.(updatedDoc)
        }}
      />
    </div>
  )
}

// Sample markdown document with comprehensive content to showcase the enhanced renderer
const sampleMarkdownDocument: KnowledgeDocument = {
  id: '1',
  title: 'React Development Best Practices',
  description: 'Comprehensive guide to React development patterns and practices with enhanced markdown rendering',
  format: 'markdown',
  metadata: { 
    category: 'Development', 
    difficulty: 'Intermediate',
    author: 'Dev Team',
    lastReviewed: '2024-06-01'
  },
  tags: ['react', 'javascript', 'frontend'],
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-06-20'),
  content: `# React Development Best Practices

This comprehensive guide covers the essential patterns and practices for React development.

## Introduction

React is a powerful library for building user interfaces. Following **best practices** ensures your applications are *maintainable*, *performant*, and *scalable*.

> "The best code is no code at all. The second best is clean, readable code." - React Team

### Key Principles

1. **Component Composition** - Build small, reusable components
2. **State Management** - Keep state as local as possible  
3. **Performance** - Use React.memo and useMemo when appropriate
4. **Testing** - Write comprehensive tests for your components

## Code Examples

Here is an example of a well-structured React component:

\`\`\`tsx
import React, { useState, useCallback } from 'react';

interface UserProfileProps {
  userId: string;
}

function UserProfile({ userId }: UserProfileProps) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users/' + userId);
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

### Hooks Best Practices

When using hooks, remember these key points:

- Use \`useState\` for component-local state
- Use \`useEffect\` for side effects and cleanup
- Use \`useCallback\` to memoize function references
- Use \`useMemo\` to memoize expensive calculations

## Performance Tips

### Optimization Strategies

- **Lazy Loading**: Use \`React.lazy()\` for code splitting
- **Memoization**: Implement \`React.memo\` for pure components
- **Virtual Scrolling**: For large lists, consider libraries like react-window

### Common Pitfalls

- Avoid creating objects in render methods
- Do not use array indices as keys for dynamic lists
- Be careful with useEffect dependencies

## Useful Links

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Testing Library](https://testing-library.com/)

## Best Practices Checklist

- Use functional components with hooks
- Implement proper error boundaries  
- Optimize renders with React.memo
- Use TypeScript for better type safety
- Follow consistent naming conventions
- Write unit and integration tests

## Conclusion

Following these best practices will help you build ***robust React applications*** that are easy to maintain and scale. Remember to stay updated with the latest React patterns and community best practices.`
}

const sampleTextDocument: KnowledgeDocument = {
  id: 'text-1',
  title: 'API Configuration',
  description: 'Environment variables and API endpoint configuration',
  format: 'text',
  content: `API Configuration File
====================

Base URL: https://api.example.com/v1
Timeout: 30000ms
Retry Attempts: 3

Environment Variables:
- API_KEY: your-api-key-here
- API_SECRET: your-secret-here
- DEBUG_MODE: false

Endpoints:
/users        - GET, POST
/users/{id}   - GET, PUT, DELETE
/auth/login   - POST
/auth/logout  - POST

Rate Limits:
- 1000 requests per hour
- 100 requests per minute

Error Codes:
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
429 - Too Many Requests
500 - Internal Server Error`,
  tags: ['api', 'configuration', 'backend'],
  createdAt: new Date('2024-01-10'),
  metadata: {
    environment: 'production',
    lastUpdated: '2024-01-10',
    owner: 'DevOps Team'
  }
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
    priority: 'High'
  },
  tags: ['communication', 'team', 'guidelines'],
  createdAt: new Date('2024-02-10'),
  updatedAt: new Date('2024-05-15'),
  content: JSON.stringify({
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          level: 1,
          children: [{ type: 'text', text: 'Team Communication Guidelines' }]
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'Effective communication is crucial for team success. These guidelines help ensure clear, respectful, and productive interactions.' }
          ]
        },
        {
          type: 'heading',
          level: 2,
          children: [{ type: 'text', text: 'Core Principles' }]
        },
        {
          type: 'list',
          listType: 'bullet',
          children: [
            {
              type: 'listItem',
              children: [{ type: 'text', text: 'Be clear and concise in your messaging' }]
            },
            {
              type: 'listItem',
              children: [{ type: 'text', text: 'Listen actively and ask clarifying questions' }]
            },
            {
              type: 'listItem',
              children: [{ type: 'text', text: 'Respect different communication styles and preferences' }]
            }
          ]
        }
      ]
    }
  })
}

const sampleMDXDocument: KnowledgeDocument = {
  id: 'mdx-1',
  title: 'Interactive Dashboard Guide',
  description: 'How to use the interactive dashboard with embedded components',
  format: 'mdx',
  content: `# Interactive Dashboard Guide

Welcome to the **interactive dashboard**! This guide shows how to use embedded React components in documentation.

## Dashboard Components

The dashboard includes several interactive elements:

<DashboardWidget title="Sales Overview" type="chart" />

### Key Features

1. **Real-time updates** - Data refreshes every 30 seconds
2. **Interactive filters** - Click and drag to filter data
3. **Export functionality** - Download reports in multiple formats

<AlertBox type="info">
  Remember to save your filter preferences for future sessions!
</AlertBox>

## Usage Examples

Here is how to customize your dashboard:

<CodeBlock language="jsx">
{
  title: "Custom Widget",
  type: "metric", 
  value: 1234,
  trend: "up"
}
</CodeBlock>

<ActionButton onClick={() => console.log('Clicked!')}>
  Try Interactive Button
</ActionButton>

## Best Practices

- Set up **alerts** for important metrics
- Use *custom filters* to focus on relevant data
- Regular dashboard reviews improve decision making`,
  tags: ['dashboard', 'interactive', 'mdx'],
  createdAt: new Date('2024-01-18'),
  metadata: {
    category: 'user-guide',
    interactive: true,
    lastReviewed: '2024-01-18'
  }
}

// Stories showcasing different renderers and features
export const MarkdownWithEnhancedRenderer: Story = {
  render: DocumentPreviewWrapper,
  args: {
    document: sampleMarkdownDocument,
    editable: true,
    renderers: storyRenderers
  },
  parameters: {
    docs: {
      description: {
        story: 'Markdown document rendered with enhanced custom markdown renderer that supports headings, code blocks, links, lists, bold/italic formatting, and blockquotes with proper Tailwind styling. This demonstrates how to create a practical markdown renderer without external dependencies.'
      }
    }
  }
}

export const TextFormat: Story = {
  render: DocumentPreviewWrapper,
  args: {
    document: sampleTextDocument,
    editable: true,
    renderers: storyRenderers
  },
  parameters: {
    docs: {
      description: {
        story: 'Plain text document with monospace font and preserved whitespace formatting for configuration files and raw text content.'
      }
    }
  }
}

export const RichTextFormat: Story = {
  render: DocumentPreviewWrapper,
  args: {
    document: sampleRichTextDocument,
    editable: true,
    renderers: storyRenderers
  },
  parameters: {
    docs: {
      description: {
        story: 'RichText document from PayloadCMS showing structured content. Includes placeholder for actual PayloadCMS RichText integration with @payloadcms/richtext-lexical.'
      }
    }
  }
}

export const MDXFormat: Story = {
  render: DocumentPreviewWrapper,
  args: {
    document: sampleMDXDocument,
    editable: true,
    renderers: storyRenderers
  },
  parameters: {
    docs: {
      description: {
        story: 'MDX document with embedded React components. Shows placeholder for actual MDX integration with @mdx-js/react for interactive documentation.'
      }
    }
  }
}

export const WithoutCustomRenderers: Story = {
  render: DocumentPreviewWrapper,
  args: {
    document: sampleMarkdownDocument,
    editable: true
    // No custom renderers - will use defaults
  },
  parameters: {
    docs: {
      description: {
        story: 'Document using default renderers when no custom renderers are provided. Compare with the enhanced renderer version to see the difference.'
      }
    }
  }
}

export const ReadOnlyMode: Story = {
  render: DocumentPreviewWrapper,
  args: {
    document: sampleMarkdownDocument,
    editable: false,
    renderers: storyRenderers
  },
  parameters: {
    docs: {
      description: {
        story: 'Document preview in read-only mode without edit functionality. The edit button is hidden when editable is false.'
      }
    }
  }
}

export const AllFormatsComparison: Story = {
  render: () => {
    const [activeDocument, setActiveDocument] = useState(sampleMarkdownDocument)
    
    const documents = [
      { label: 'Markdown', doc: sampleMarkdownDocument },
      { label: 'Text', doc: sampleTextDocument },
      { label: 'RichText', doc: sampleRichTextDocument },
      { label: 'MDX', doc: sampleMDXDocument }
    ]
    
    return (
      <div className="h-screen bg-background p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Document Format Comparison</h2>
          <div className="flex gap-2 mb-4">
            {documents.map(({ label, doc }) => (
              <button
                key={doc.id}
                onClick={() => setActiveDocument(doc)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeDocument.id === doc.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[calc(100vh-10rem)] border rounded-lg overflow-hidden">
          <DocumentPreview
            document={activeDocument}
            editable={true}
            renderers={storyRenderers}
            onDocumentUpdate={(doc) => console.log('Updated:', doc)}
          />
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive comparison of all supported document formats with custom renderers including the enhanced markdown renderer. Click the format buttons to switch between different document types.'
      }
    }
  }
}
