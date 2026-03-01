'use client'

import { motion } from 'motion/react'
import { File, FileText, Type, Loader2, X, Save } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { EditableField } from '@/components/AdvancedComponents/EditableField'
import type { KnowledgeDocument, File as FileType } from './types'
import RichText from './RichText'
import { Button } from '../ui'

interface FileEditProps {
  document: KnowledgeDocument | FileType
  onCancel: () => void
  onSave: () => void | Promise<void>
  onFileUpdate?: (fileId: string, content: string) => void
}

// Helper function to check if document is FileType
const isFileType = (doc: KnowledgeDocument | FileType): doc is FileType => {
  return 'mimeType' in doc && 'url' in doc && !('format' in doc)
}

// Helper function to convert Lexical JSON to markdown
const lexicalToMarkdown = (lexicalJson: any): string => {
  if (!lexicalJson?.root?.children) {
    return ''
  }

  const lines: string[] = []

  const processNode = (node: any): string => {
    if (!node) return ''

    switch (node.type) {
      case 'heading': {
        const level = node.tag ? parseInt(node.tag.replace('h', '')) : 1
        const text = extractTextFromChildren(node.children || [])
        return '#'.repeat(level) + ' ' + text
      }

      case 'paragraph': {
        // Check if paragraph is empty (no children or only empty text nodes)
        const hasContent =
          node.children &&
          node.children.some((child: any) => {
            if (child.type === 'text') {
              return child.text && child.text.trim().length > 0
            }
            if (child.type === 'linebreak') {
              return true
            }
            return true
          })

        if (!hasContent) {
          // Empty paragraph - return empty string to preserve it
          return ''
        }

        const text = extractTextFromChildren(node.children || [])
        return text
      }

      case 'list': {
        const listItems: string[] = []
        const marker = node.listType === 'number' ? '1.' : '-'
        node.children?.forEach((item: any, index: number) => {
          if (item.type === 'listitem') {
            const itemText = extractTextFromChildren(item.children || [])
            const prefix = node.listType === 'number' ? `${index + 1}.` : marker
            listItems.push(`${prefix} ${itemText}`)
          }
        })
        // Return each list item as a separate line - they'll be split later
        return listItems.join('\n')
      }

      case 'listitem': {
        return extractTextFromChildren(node.children || [])
      }

      case 'text': {
        let text = node.text || ''
        // Handle formatting - check format flags
        // Format flags: IS_BOLD=1, IS_ITALIC=2, IS_STRIKETHROUGH=4, IS_UNDERLINE=8, IS_CODE=16
        if (node.format) {
          const isBold = (node.format & 1) !== 0
          const isItalic = (node.format & 2) !== 0
          const isStrikethrough = (node.format & 4) !== 0
          const isUnderline = (node.format & 8) !== 0
          const isCode = (node.format & 16) !== 0

          if (isCode) {
            text = `\`${text}\``
          } else {
            if (isBold) text = `**${text}**`
            if (isItalic) text = `*${text}*`
            if (isStrikethrough) text = `~~${text}~~`
            if (isUnderline) text = `<u>${text}</u>`
          }
        }
        return text
      }

      default: {
        // For unknown types, try to extract text from children
        if (node.children) {
          return extractTextFromChildren(node.children)
        }
        return ''
      }
    }
  }

  const extractTextFromChildren = (children: any[]): string => {
    return children
      .map((child) => {
        if (child.type === 'text') {
          let text = child.text || ''
          // Handle formatting - check format flags
          // Format flags: IS_BOLD=1, IS_ITALIC=2, IS_STRIKETHROUGH=4, IS_UNDERLINE=8, IS_CODE=16
          if (child.format) {
            const isBold = (child.format & 1) !== 0
            const isItalic = (child.format & 2) !== 0
            const isStrikethrough = (child.format & 4) !== 0
            const isUnderline = (child.format & 8) !== 0
            const isCode = (child.format & 16) !== 0

            if (isCode) {
              text = `\`${text}\``
            } else {
              if (isBold) text = `**${text}**`
              if (isItalic) text = `*${text}*`
              if (isStrikethrough) text = `~~${text}~~`
              if (isUnderline) text = `<u>${text}</u>`
            }
          }
          return text
        } else if (child.type === 'paragraph') {
          return extractTextFromChildren(child.children || [])
        } else if (child.type === 'listitem') {
          return extractTextFromChildren(child.children || [])
        } else if (child.type === 'linebreak') {
          return '\n'
        }
        return processNode(child)
      })
      .filter(Boolean)
      .join('')
  }

  lexicalJson.root.children.forEach((node: any) => {
    const markdown = processNode(node)
    // Always push paragraphs (even if empty) to preserve empty lines
    // For other node types, only push if they have content
    if (node.type === 'paragraph') {
      lines.push(markdown || '')
    } else if (markdown) {
      lines.push(markdown)
    }
  })

  // Join lines: empty strings create empty lines, non-empty lines separated by double newline
  // Simple approach: join with \n\n for non-empty lines, but empty strings will create empty lines
  // When joining ['Line1', '', 'Line2'] with \n, we get 'Line1\n\nLine2' which is correct
  // When joining ['Line1', 'Line2'] with \n, we get 'Line1\nLine2' which needs double newline
  const result: string[] = []
  for (let i = 0; i < lines.length; i++) {
    result.push(lines[i])
    if (i < lines.length - 1) {
      if (lines[i] === '' || lines[i + 1] === '') {
        // If either line is empty, just one newline (empty line is the separator)
        // Don't add anything - the empty string will be joined with \n
      } else {
        // Both non-empty - add one more empty string to create double newline
        result.push('')
      }
    }
  }

  return result.join('\n')
}

// Helper function to parse markdown text and create Lexical text nodes with formatting
// Format flags: IS_BOLD=1, IS_ITALIC=2, IS_STRIKETHROUGH=4, IS_UNDERLINE=8, IS_CODE=16
const parseMarkdownText = (text: string): any[] => {
  const nodes: any[] = []
  let i = 0

  while (i < text.length) {
    // Check for HTML underline tags (<u>text</u>) - handle with or without attributes
    // Must check before other formatting to ensure it's detected
    const underlineMatch = text.slice(i).match(/^<u\s*[^>]*>([\s\S]*?)<\/u>/i)
    if (underlineMatch && underlineMatch[0]) {
      const underlineText = underlineMatch[1] || ''
      // Recursively parse the inner text for nested formatting
      const innerNodes = underlineText ? parseMarkdownText(underlineText) : []
      // Apply underline format to all text nodes
      if (innerNodes.length > 0) {
        innerNodes.forEach((node) => {
          if (node.type === 'text') {
            node.format = (node.format || 0) | 8 // IS_UNDERLINE = 8
          }
        })
        nodes.push(...innerNodes)
      } else if (underlineText === '') {
        // Empty underline tag - create empty text node with underline format
        nodes.push({
          type: 'text',
          text: '',
          format: 8, // IS_UNDERLINE = 8
        })
      }
      i += underlineMatch[0].length
      continue
    }

    // Also check for closing underline tag in case we missed it
    if (text.slice(i).startsWith('</u>')) {
      // Skip closing tag if we're in the middle of parsing
      i += 4
      continue
    }

    // Check for code blocks first (they have highest priority)
    const codeMatch = text.slice(i).match(/^(`+)([^`]+)\1/)
    if (codeMatch) {
      const codeText = codeMatch[2]
      if (codeText) {
        nodes.push({
          type: 'text',
          text: codeText,
          format: 16, // IS_CODE
        })
      }
      i += codeMatch[0].length
      continue
    }

    // Check for strikethrough (~~text~~) - check before bold/italic to avoid conflicts
    const strikethroughMatch = text.slice(i).match(/^(~~)(.+?)\1/)
    if (strikethroughMatch) {
      const strikethroughText = strikethroughMatch[2]
      const innerNodes = parseMarkdownText(strikethroughText)
      innerNodes.forEach((node) => {
        if (node.type === 'text') {
          node.format = (node.format || 0) | 4 // IS_STRIKETHROUGH
        }
      })
      nodes.push(...innerNodes)
      i += strikethroughMatch[0].length
      continue
    }

    // Check for bold (**text** or __text__) - must be double asterisks or double underscores
    const boldMatch = text.slice(i).match(/^(\*\*|__)(.+?)\1/)
    if (boldMatch) {
      const boldText = boldMatch[2]
      // Recursively parse the inner text for nested formatting
      const innerNodes = parseMarkdownText(boldText)
      // Apply bold format to all text nodes
      innerNodes.forEach((node) => {
        if (node.type === 'text') {
          node.format = (node.format || 0) | 1 // IS_BOLD
        }
      })
      nodes.push(...innerNodes)
      i += boldMatch[0].length
      continue
    }

    // Check for italic (*text* or _text_) - single asterisk or single underscore
    // Make sure we don't match if it's part of bold or strikethrough
    const italicMatch = text.slice(i).match(/^(\*|_)([^*_\n]+?)\1(?!\*|_)/)
    if (italicMatch && italicMatch[0].length > 2) {
      const italicText = italicMatch[2]
      const innerNodes = parseMarkdownText(italicText)
      innerNodes.forEach((node) => {
        if (node.type === 'text') {
          node.format = (node.format || 0) | 2 // IS_ITALIC
        }
      })
      nodes.push(...innerNodes)
      i += italicMatch[0].length
      continue
    }

    // Check for newline characters
    if (text[i] === '\n') {
      nodes.push({
        type: 'linebreak',
        version: 1,
      })
      i += 1
      continue
    }

    // Regular text - find the next formatting marker or end of string
    let nextIndex = text.length
    const patterns = [
      { pattern: /<u>/i, offset: 0 },
      { pattern: /\*\*/, offset: 0 },
      { pattern: /__/, offset: 0 },
      { pattern: /~~/, offset: 0 },
      { pattern: /`+/, offset: 0 },
      { pattern: /\*[^*\n]/, offset: 0 },
      { pattern: /_[^_\n]/, offset: 0 },
      { pattern: /\n/, offset: 0 },
    ]

    for (const { pattern } of patterns) {
      const match = text.slice(i + 1).search(pattern)
      if (match !== -1 && match + 1 < nextIndex - i) {
        nextIndex = i + match + 1
      }
    }

    const plainText = text.slice(i, nextIndex)
    if (plainText) {
      nodes.push({
        type: 'text',
        text: plainText,
        format: 0,
      })
    }
    i = nextIndex
  }

  // Merge adjacent text nodes with the same format (but not linebreaks)
  const merged: any[] = []
  for (const node of nodes) {
    if (node.type === 'linebreak') {
      // Always keep linebreak nodes separate
      merged.push(node)
    } else if (
      merged.length > 0 &&
      merged[merged.length - 1].type === 'text' &&
      node.type === 'text' &&
      merged[merged.length - 1].format === node.format
    ) {
      // Merge adjacent text nodes with the same format
      merged[merged.length - 1].text += node.text
    } else {
      merged.push(node)
    }
  }

  return merged.length > 0 ? merged : [{ type: 'text', text: '', format: 0 }]
}

// Helper function to convert markdown to Lexical JSON
const markdownToLexical = (markdown: string): any => {
  // Split markdown into lines for basic parsing
  const lines = markdown.split('\n')
  const children: any[] = []
  let currentParagraph: string[] = []
  let currentListItems: any[] = []
  let currentListType: 'bullet' | 'number' | null = null

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      // Process each line as a separate paragraph to preserve newlines
      // This way each line becomes its own paragraph, preserving spacing
      for (let i = 0; i < currentParagraph.length; i++) {
        const line = currentParagraph[i]
        const textNodes = parseMarkdownText(line)
        // Convert text nodes to Lexical format with required properties
        const lexicalTextNodes =
          textNodes.length > 0
            ? textNodes.map((node) => ({
                ...node,
                mode: 'normal',
                style: '',
                detail: 0,
                version: 1,
              }))
            : [
                {
                  type: 'text',
                  text: '',
                  format: 0,
                  mode: 'normal',
                  style: '',
                  detail: 0,
                  version: 1,
                },
              ]

        children.push({
          type: 'paragraph',
          children: lexicalTextNodes,
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        })
      }
      currentParagraph = []
    }
  }

  const flushList = () => {
    if (currentListItems.length > 0 && currentListType) {
      children.push({
        type: 'list',
        listType: currentListType,
        tag: currentListType === 'number' ? 'ol' : 'ul',
        start: 1,
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: currentListItems,
      })
      currentListItems = []
      currentListType = null
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      // Empty line - flush current paragraph and list, then add empty paragraph
      flushParagraph()
      flushList()
      // Add an empty paragraph to preserve the empty line
      children.push({
        children: [],
        direction: null,
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
        textFormat: 0,
        textStyle: '',
      })
      continue
    }

    // Check for headings
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      flushParagraph()
      flushList()

      const level = headingMatch[1].length
      const headingText = headingMatch[2]
      const textNodes = parseMarkdownText(headingText)
      children.push({
        type: 'heading',
        tag: `h${level}`,
        children: textNodes.length > 0 ? textNodes : [{ type: 'text', text: '', format: 0 }],
      })
      continue
    }

    // Check for ordered list items (numbered lists like "1. ", "2. ", etc.)
    const orderedListMatch = trimmed.match(/^(\d+)\.\s+(.*)$/)
    if (orderedListMatch) {
      flushParagraph()
      // If we were in a bullet list, flush it first
      if (currentListType === 'bullet') {
        flushList()
      }
      // Set list type to number if not already set
      if (currentListType !== 'number') {
        // If we have items from a previous list, flush them first
        if (currentListItems.length > 0) {
          flushList()
        }
        currentListType = 'number'
      }
      const listItemText = orderedListMatch[2] || ''
      const textNodes = parseMarkdownText(listItemText)
      // Convert text nodes to Lexical format with required properties
      const lexicalTextNodes =
        textNodes.length > 0
          ? textNodes.map((node) => ({
              ...node,
              mode: 'normal',
              style: '',
              detail: 0,
              version: 1,
            }))
          : [
              {
                type: 'text',
                text: '',
                format: 0,
                mode: 'normal',
                style: '',
                detail: 0,
                version: 1,
              },
            ]
      currentListItems.push({
        type: 'listitem',
        value: currentListItems.length + 1,
        format: 'start',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          {
            type: 'paragraph',
            children: lexicalTextNodes,
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        ],
      })
      continue
    }

    // Check for unordered list items (bullet lists like "- ", "* ", "+ ")
    const unorderedListMatch = trimmed.match(/^[-*+]\s+(.+)$/)
    if (unorderedListMatch) {
      flushParagraph()
      // If we were in a number list, flush it first
      if (currentListType === 'number') {
        flushList()
      }
      // Set list type to bullet if not already set
      if (currentListType !== 'bullet') {
        // If we have items from a previous list, flush them first
        if (currentListItems.length > 0) {
          flushList()
        }
        currentListType = 'bullet'
      }
      const listItemText = unorderedListMatch[1]
      const textNodes = parseMarkdownText(listItemText)
      // Convert text nodes to Lexical format with required properties
      const lexicalTextNodes =
        textNodes.length > 0
          ? textNodes.map((node) => ({
              ...node,
              mode: 'normal',
              style: '',
              detail: 0,
              version: 1,
            }))
          : [
              {
                type: 'text',
                text: '',
                format: 0,
                mode: 'normal',
                style: '',
                detail: 0,
                version: 1,
              },
            ]
      currentListItems.push({
        type: 'listitem',
        value: currentListItems.length + 1,
        format: 'start',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          {
            type: 'paragraph',
            children: lexicalTextNodes,
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        ],
      })
      continue
    }

    // If we have list items and encounter non-list line, flush the list
    if (currentListItems.length > 0) {
      flushList()
    }

    // Regular paragraph text - use original line to preserve any leading/trailing spaces
    // But we still need to check if it's a list or heading first
    currentParagraph.push(line)
  }

  // Flush any remaining content
  flushParagraph()
  flushList()

  // If no children, add empty paragraph
  if (children.length === 0) {
    children.push({
      type: 'paragraph',
      children: [{ type: 'text', text: '', format: 0 }],
    })
  }

  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

// Helper function to convert FileType to KnowledgeDocument
const convertFileTypeToKnowledgeDocument = async (file: FileType): Promise<KnowledgeDocument> => {
  let content = ''
  let richTextContent: any = undefined
  let format: KnowledgeDocument['format'] = 'text'

  // Fetch content from URL if available
  if (file.url) {
    try {
      // Handle relative URLs by prepending base URL if needed
      let url = file.url
      if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('/')) {
        // If it's a relative path without leading slash, add one
        url = '/' + url
      }

      const response = await fetch(url)

      if (response.ok) {
        content = await response.text()
        console.log('Successfully loaded content, length:', content.length)
      } else {
        console.error('Failed to fetch file content:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Failed to fetch file content:', error)
    }
  } else {
    console.warn('No URL provided for file:', file.name)
  }

  // Determine format based on mimeType
  if (file.mimeType === 'text/markdown') {
    format = 'richText'
    // Convert markdown to Lexical JSON format
    richTextContent = markdownToLexical(content)
  } else if (file.mimeType?.startsWith('text/')) {
    format = 'text'
  }

  return {
    id: file.id.toString(),
    title: file.name,
    description: undefined,
    content: format === 'richText' ? undefined : content,
    richTextContent: format === 'richText' ? richTextContent : undefined,
    format,
    metadata: {},
    createdAt: typeof file.createdAt === 'string' ? new Date(file.createdAt) : file.createdAt,
    updatedAt: new Date(),
  }
}

export function FileEdit({ document, onCancel, onSave, onFileUpdate }: FileEditProps) {
  const [isLoading, setIsLoading] = useState(isFileType(document))
  const [editedDocument, setEditedDocument] = useState<KnowledgeDocument>(
    isFileType(document)
      ? {
          id: document.id.toString(),
          title: document.name,
          description: undefined,
          content: '',
          format: 'text',
          metadata: {},
          createdAt:
            typeof document.createdAt === 'string'
              ? new Date(document.createdAt)
              : document.createdAt,
          updatedAt: new Date(),
          // richTextContent: undefined,
        }
      : {
          ...document,
          updatedAt: new Date(),
        },
  )
  const [richTextContent, setRichTextContent] = useState<any>(
    isFileType(document) ? undefined : editedDocument.richTextContent,
  )
  const [isSaving, setIsSaving] = useState(false)
  const originalFileRef = useRef<FileType | null>(isFileType(document) ? document : null)

  // Load file content when FileType is provided
  useEffect(() => {
    if (isFileType(document)) {
      setIsLoading(true)
      convertFileTypeToKnowledgeDocument(document)
        .then((convertedDoc) => {
          // Only update state if the request wasn't aborted
          setEditedDocument(convertedDoc)
          setRichTextContent(convertedDoc.richTextContent)
          setIsLoading(false)
        })
        .catch((error) => {
          // Don't log or update state if it's an AbortError
          if (error instanceof Error && error.name !== 'AbortError') {
            console.error('Failed to convert file:', error)
            setIsLoading(false)
          }
        })
    } else {
      setEditedDocument({
        ...document,
        updatedAt: new Date(),
      })
      setRichTextContent(document.richTextContent)
    }
  }, [document])

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

  const handleSave = async () => {
    setIsSaving(true)

    try {
      let docToSave: KnowledgeDocument | FileType
      let contentToUpdate: string

      // If original was a markdown FileType, convert richText back to markdown
      if (originalFileRef.current && originalFileRef.current.mimeType === 'text/markdown') {
        const markdownContent = richTextContent ? lexicalToMarkdown(richTextContent) : ''
        docToSave = {
          ...editedDocument,
          format: 'markdown',
          content: markdownContent,
          richTextContent: undefined, // Clear richTextContent since we're saving as markdown
        } as KnowledgeDocument
        contentToUpdate = markdownContent
      } else {
        docToSave = { ...editedDocument, richTextContent } as KnowledgeDocument
        contentToUpdate = editedDocument.content || ''
      }

      // Get the file ID - use original file ID if it was a FileType, otherwise use document ID
      const fileId = originalFileRef.current
        ? originalFileRef.current.id.toString()
        : editedDocument.id

      await Promise.resolve(onSave())
      onFileUpdate?.(fileId, contentToUpdate)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-screen flex flex-col"
    >
      {/* Header */}
      <div className="border-b border-border bg-card p-8 pb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* <div className="flex-shrink-0 p-3 rounded-xl bg-muted border border-border">
              {formatIcon(editedDocument.format)}
            </div> */}

            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-4 mb-0 leading-tight">
                <div className="flex-1 min-w-0">
                  <EditableField
                    fieldName="title"
                    value={editedDocument.title}
                    label=""
                    onSave={(fieldName, value) =>
                      setEditedDocument((prev) => ({ ...prev, title: value }))
                    }
                    className="[&>div:last-child]:text-2xl [&>div:last-child]:font-bold [&>div:last-child]:leading-tight [&>div:last-child]:text-foreground [&>div:last-child]:p-0 [&>div:last-child]:border-0 [&>div:last-child]:hover:bg-muted/30 [&>div:last-child]:min-h-0"
                  />
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${formatBadgeColor(
                    editedDocument.format,
                  )} flex-shrink-0 mt-1`}
                >
                  {editedDocument.format.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="outline" size="sm" onClick={onCancel} className="gap-2">
              <X className="h-4 w-4" />
              Close
            </Button>
            <Button size="sm" onClick={handleSave} className="gap-2" disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div className="flex-1 overflow-hidden">
        <div className="p-8 pt-0 h-full max-h-full overflow-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Loading file content...</p>
              </div>
            </div>
          ) : (
            <>
              {/* <label className="block text-sm font-medium text-foreground mb-4">Content</label> */}
              {editedDocument.format === 'richText' ? (
                <RichText
                  key={`richtext-${editedDocument.id}-${isLoading ? 'loading' : 'loaded'}`}
                  setValue={setRichTextContent}
                  value={richTextContent}
                  name="richTextContent"
                />
              ) : (
                <Textarea
                  value={editedDocument.content || ''}
                  onChange={(e) =>
                    setEditedDocument((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="Document content..."
                  className="min-h-[400px] font-mono text-sm"
                  style={{ resize: 'vertical' }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}
