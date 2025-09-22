'use client'

import { motion } from 'motion/react'
import { File, FileText, Edit3, Type } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { DocumentEdit } from './document-edit'
import type { KnowledgeDocument, KnowledgeContext, Knowledge } from './types'
import type { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
// import { RichText } from '../Payload'
import remarkGfm from 'remark-gfm'
import RichText from './RichText'

// Default markdown renderer (can be replaced with react-markdown or similar)
const defaultMarkdownRenderer = (content: string): ReactNode => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
      h2: ({ children }) => <h2 className="text-xl font-bold">{children}</h2>,
      h3: ({ children }) => <h3 className="text-lg font-bold">{children}</h3>,
      h4: ({ children }) => <h4 className="text-base font-bold">{children}</h4>,
      ol: ({ children }) => <ol className="list-decimal">{children}</ol>,
      ul: ({ children }) => <ul className="list-disc">{children}</ul>,
      li: ({ children }) => <li className="ml-4">{children}</li>,
      p: ({ children }) => <p className="mb-4">{children}</p>,
      a: ({ children, href }) => (
        <a href={href} className="text-blue-500">
          {children}
        </a>
      ),
      img: ({ src, alt }) => <img src={src} alt={alt} className="mb-4" />,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 mb-4">{children}</blockquote>
      ),
    }}
  >
    {content}
  </ReactMarkdown> // <div
  //   className="prose prose-slate dark:prose-invert max-w-none"
  //   dangerouslySetInnerHTML={{
  //     __html: content
  //       .replace(/\n/g, '<br>')
  //       .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  //       .replace(/\*(.*?)\*/g, '<em>$1</em>')
  //       .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
  //       .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
  //       .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-3">$1</h2>')
  //       .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mb-2">$1</h3>'),
  //   }}
  // />
)

// Default text renderer
const defaultTextRenderer = (content: string): ReactNode => (
  <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{content}</div>
)

// Default richtext renderer (placeholder for PayloadCMS richtext)
const defaultRichTextRenderer = (content: Knowledge['richTextContent']): ReactNode => (
  <div className="prose prose-slate dark:prose-invert max-w-none">
    {content && (
      <RichText value={JSON.stringify(content)} editable={false} name="richTextContent" />
    )}
    {/* <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
      <p className="text-amber-800 dark:text-amber-200 text-sm">
        <strong>RichText Renderer:</strong> This is a placeholder. Integrate with
        @payloadcms/richtext-lexical for full rendering.
      </p>
    </div>
    <pre className="text-sm">{content}</pre> */}
  </div>
)

// Default MDX renderer (placeholder for @mdx-js/react)
const defaultMDXRenderer = (content: string): ReactNode => (
  <div className="prose prose-slate dark:prose-invert max-w-none">
    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
      <p className="text-blue-800 dark:text-blue-200 text-sm">
        <strong>MDX Renderer:</strong> This is a placeholder. Integrate with @mdx-js/react for full
        MDX rendering.
      </p>
    </div>
    {defaultMarkdownRenderer(content)}
  </div>
)

export interface DocumentRenderers {
  markdown?: (content: string) => ReactNode
  mdx?: (content: string) => ReactNode
  richText?: (content: string) => ReactNode
  text?: (content: string) => ReactNode
}

interface DocumentPreviewProps {
  document: KnowledgeDocument
  onDocumentUpdate?: (document: KnowledgeDocument) => void
  editable?: boolean
  mode?: 'create' | 'view'
  renderers?: DocumentRenderers
  availableDocuments?: KnowledgeDocument[]
  knowledgeContexts?: KnowledgeContext[]
}

export function DocumentPreview({
  document: initialDocument,
  onDocumentUpdate,
  editable = true,
  mode = 'view',
  renderers,
  availableDocuments = [],
  knowledgeContexts = [],
}: DocumentPreviewProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [document, setDocument] = useState<KnowledgeDocument>(initialDocument)

  useEffect(() => {
    setDocument(initialDocument)
  }, [initialDocument])

  const formatIcon = (format: string) => {
    switch (format) {
      case 'markdown':
      case 'mdx':
        return <FileText className="h-6 w-6 text-primary" />
      case 'richText':
        return <File className="h-6 w-6 text-success" />
      case 'text':
        return <Type className="h-6 w-6 text-muted-foreground" />
      default:
        return <File className="h-6 w-6 text-muted-foreground" />
    }
  }

  const formatBadgeColor = (format: string) => {
    switch (format) {
      case 'markdown':
        return 'bg-primary/10 text-primary border-primary/20'
      case 'mdx':
        return 'bg-secondary/10 text-secondary border-secondary/20'
      case 'richText':
        return 'bg-success/10 text-success border-success/20'
      case 'text':
        return 'bg-muted/50 text-muted-foreground border-muted-foreground/20'
      default:
        return 'bg-muted text-muted-foreground border-border'
    }
  }

  const renderContent = (
    content: string | Knowledge['richTextContent'],
    format: string,
  ): ReactNode => {
    const defaultRenderers = {
      markdown: defaultMarkdownRenderer,
      mdx: defaultMDXRenderer,
      // richText: defaultRichTextRenderer,
      text: defaultTextRenderer,
    }

    const renderer =
      renderers?.[format as keyof DocumentRenderers] ||
      defaultRenderers[format as keyof typeof defaultRenderers]

    if (format === 'richText' && typeof content === 'object') {
      return defaultRichTextRenderer(content)
    }

    if (renderer) {
      if (typeof content === 'string') return renderer(content)
    }

    // Fallback to text rendering
    if (typeof content === 'string') {
      return defaultTextRenderer(content)
    }
  }

  const handleSave = (updatedDocument: KnowledgeDocument) => {
    setIsEditing(false)
    onDocumentUpdate?.(updatedDocument)
    setDocument(updatedDocument)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  if (isEditing || mode === 'create') {
    return (
      <DocumentEdit
        mode={mode === 'create' ? 'create' : 'edit'}
        document={document}
        onSave={handleSave}
        onCancel={handleCancel}
        availableDocuments={availableDocuments}
        knowledgeContexts={knowledgeContexts}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="border-b border-border bg-card p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="flex-shrink-0 p-3 rounded-xl bg-muted border border-border">
              {formatIcon(document.format)}
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-foreground mb-2 leading-tight">
                {document.title}
              </h1>

              {document.description && (
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  {document.description}
                </p>
              )}
            </div>
          </div>

          {editable && (
            <div className="flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="gap-2"
              >
                <Edit3 className="h-4 w-4" />
                Edit
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${formatBadgeColor(
              document.format,
            )}`}
          >
            {document.format.toUpperCase()}
          </span>

          {document.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground border border-border"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Metadata Section */}
          {document.metadata && Object.keys(document.metadata).length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-2">Metadata</h3>
              <div className="bg-muted rounded-lg p-3 border border-border">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-1 text-xs">
                  {Object.entries(document.metadata).map(([key, value]) => (
                    <div key={key} className="flex gap-1">
                      <span className="text-muted-foreground font-medium">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-foreground truncate">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Content Preview */}
          <div className="space-y-4">
            {document.content || document.richTextContent ? (
              <div className="relative">
                <div className="bg-card border border-border rounded-xl p-6 overflow-hidden">
                  {renderContent(
                    document.format === 'richText' ? document.richTextContent : document.content,
                    document.format,
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-muted rounded-xl border-2 border-dashed border-border">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background flex items-center justify-center">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h4 className="text-foreground font-medium mb-1">No content available</h4>
                <p className="text-muted-foreground text-sm">
                  This document doesn't have preview content
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
