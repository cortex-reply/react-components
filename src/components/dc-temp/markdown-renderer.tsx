"use client"

import { cn } from "@/lib/utils"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  // Simple markdown parser for demonstration
  // In a real app, you'd use a library like react-markdown or marked
  const parseMarkdown = (text: string): string => {
    return (
      text
        // Headers
        .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-8 mb-4">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-6">$1</h1>')

        // Bold and italic
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

        // Code blocks
        .replace(
          /```([\s\S]*?)```/g,
          '<pre class="bg-muted p-4 rounded-lg my-4 overflow-x-auto"><code class="text-sm">$1</code></pre>',
        )
        .replace(/`(.*?)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')

        // Links
        .replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" class="text-primary hover:underline">$1</a>')

        // Lists
        .replace(/^\* (.*$)/gim, '<li class="ml-4">• $1</li>')
        .replace(/^- (.*$)/gim, '<li class="ml-4">• $1</li>')
        .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>')

        // Paragraphs
        .replace(/\n\n/g, '</p><p class="mb-4">')

        // Horizontal rules
        .replace(/^---$/gim, '<hr class="my-8 border-border" />')
    )
  }

  const htmlContent = `<p class="mb-4">${parseMarkdown(content)}</p>`

  return (
    <div className={cn("prose prose-sm max-w-none", className)} dangerouslySetInnerHTML={{ __html: htmlContent }} />
  )
}
