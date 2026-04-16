/**
 * Example usage of DocumentPreview with different renderers
 * This file demonstrates how to integrate real markdown and rendering libraries
 */

import React from 'react'
import { DocumentPreview, type DocumentRenderers } from './document-preview'
import type { KnowledgeDocument } from './types'

// Example with react-markdown (install: npm install react-markdown)
/*
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

const reactMarkdownRenderer = (content: string) => (
  <div className="prose prose-slate dark:prose-invert max-w-none">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
    >
      {content}
    </ReactMarkdown>
  </div>
)
*/

// Example with @mdx-js/react for MDX rendering
/*
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

const mdxRenderer = async (content: string) => {
  const mdxSource = await serialize(content)
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <MDXRemote {...mdxSource} />
    </div>
  )
}
*/

// Example with PayloadCMS RichText
/*
import { RichText } from '@payloadcms/richtext-lexical/react'

const payloadRichTextRenderer = (content: string) => {
  try {
    const richTextData = JSON.parse(content)
    return (
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <RichText data={richTextData} />
      </div>
    )
  } catch (error) {
    return (
      <div className="text-red-500 text-sm">
        Error parsing RichText content: {error.message}
      </div>
    )
  }
}
*/

// Basic example with custom renderers
const customRenderers: DocumentRenderers = {
  markdown: (content: string) => (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <div 
        dangerouslySetInnerHTML={{
          __html: content
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
            .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
            .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-3">$1</h2>')
            .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mb-2">$1</h3>')
        }}
      />
    </div>
  ),
  
  text: (content: string) => (
    <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
      {content}
    </pre>
  ),
  
  richtext: (content: string) => (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
        <p className="text-amber-800 dark:text-amber-200 text-sm">
          <strong>Custom RichText Renderer:</strong> Implement PayloadCMS integration here
        </p>
      </div>
      <pre className="text-sm bg-slate-50 dark:bg-slate-900 p-4 rounded">{content}</pre>
    </div>
  ),
  
  mdx: (content: string) => (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          <strong>Custom MDX Renderer:</strong> Implement @mdx-js/react integration here
        </p>
      </div>
      <div 
        dangerouslySetInnerHTML={{
          __html: content
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
        }}
      />
    </div>
  )
}

// Example documents
const sampleDocuments: KnowledgeDocument[] = [
  {
    id: '1',
    title: 'Markdown Documentation',
    description: 'A sample markdown document with formatting',
    format: 'markdown',
    content: `# Welcome to Markdown

This is a **bold** statement and this is *italic*.

## Code Example

Here's some \`inline code\` and a code block:

\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`

### Lists

- Item 1
- Item 2
- Item 3`,
    tags: ['documentation', 'markdown'],
    createdAt: new Date(),
    metadata: {
      author: 'John Doe',
      version: '1.0'
    }
  },
  {
    id: '2',
    title: 'Plain Text File',
    description: 'A simple text document',
    format: 'text',
    content: `This is a plain text document.
It preserves line breaks and spacing.

No special formatting is applied.
Just raw text content.`,
    tags: ['text', 'simple'],
    createdAt: new Date()
  },
  {
    id: '3',
    title: 'RichText Document',
    description: 'PayloadCMS RichText content',
    format: 'richtext',
    content: '{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"This is RichText content from PayloadCMS"}]}]}}',
    tags: ['richtext', 'payload'],
    createdAt: new Date()
  },
  {
    id: '4',
    title: 'MDX Component',
    description: 'MDX with React components',
    format: 'mdx',
    content: `# MDX Document

This is **MDX** content that can include React components.

<CustomComponent prop="value" />

## Interactive Elements

MDX allows you to embed interactive React components directly in markdown.`,
    tags: ['mdx', 'react'],
    createdAt: new Date()
  }
]

// Example usage components
export function DocumentPreviewExample() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {sampleDocuments.map((document) => (
        <div key={document.id} className="border rounded-lg overflow-hidden">
          <DocumentPreview
            document={document}
            renderers={customRenderers}
            editable={false}
          />
        </div>
      ))}
    </div>
  )
}

export function DocumentPreviewWithReactMarkdown() {
  const document = sampleDocuments[0] // Markdown document
  
  // Uncomment and install react-markdown to use this
  /*
  const reactMarkdownRenderers: DocumentRenderers = {
    markdown: reactMarkdownRenderer
  }
  
  return (
    <DocumentPreview
      document={document}
      renderers={reactMarkdownRenderers}
    />
  )
  */
  
  return (
    <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
      <p className="text-yellow-800 dark:text-yellow-200 text-sm">
        Install react-markdown to see this example: <code>npm install react-markdown remark-gfm rehype-highlight</code>
      </p>
    </div>
  )
}

export function DocumentPreviewWithPayloadRichText() {
  const document = sampleDocuments[2] // RichText document
  
  // Uncomment to use PayloadCMS RichText
  /*
  const payloadRenderers: DocumentRenderers = {
    richtext: payloadRichTextRenderer
  }
  
  return (
    <DocumentPreview
      document={document}
      renderers={payloadRenderers}
    />
  )
  */
  
  return (
    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
      <p className="text-blue-800 dark:text-blue-200 text-sm">
        PayloadCMS RichText renderer is already available via @payloadcms/richtext-lexical dependency
      </p>
    </div>
  )
}

export { customRenderers, sampleDocuments }
