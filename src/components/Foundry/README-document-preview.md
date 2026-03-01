# Document Preview Component

The `DocumentPreview` component displays knowledge documents with support for multiple file formats and custom renderers.

## Supported Formats

- **Markdown** (`.md`) - Standard markdown with basic formatting
- **MDX** (`.mdx`) - Markdown with embedded React components  
- **RichText** - PayloadCMS rich text content
- **Text** (`.txt`) - Plain text with preserved formatting

## Usage

### Basic Usage

```tsx
import { DocumentPreview } from './document-preview'

const document = {
  id: '1',
  title: 'My Document',
  format: 'markdown',
  content: '# Hello World\n\nThis is **bold** text.',
  createdAt: new Date()
}

<DocumentPreview document={document} />
```

### With Custom Renderers

```tsx
import { DocumentPreview } from './document-preview'
import ReactMarkdown from 'react-markdown'
import { RichText } from '@payloadcms/richtext-lexical/react'

const customRenderers = {
  markdown: (content: string) => (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  ),
  
  richtext: (content: string) => {
    const richTextData = JSON.parse(content)
    return (
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <RichText data={richTextData} />
      </div>
    )
  },
  
  text: (content: string) => (
    <pre className="whitespace-pre-wrap font-mono text-sm">
      {content}
    </pre>
  )
}

<DocumentPreview
  document={document}
  renderers={customRenderers}
  editable={true}
  onDocumentUpdate={(updatedDoc) => console.log('Updated:', updatedDoc)}
/>
```

## Available Dependencies

The project already includes these useful dependencies for rendering:

- `@mdx-js/react` - For MDX rendering
- `@payloadcms/richtext-lexical` - For PayloadCMS RichText
- `@tailwindcss/typography` - For typography styling

## Custom Renderer Examples

### React Markdown

```bash
npm install react-markdown remark-gfm rehype-highlight
```

```tsx
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

const markdownRenderer = (content: string) => (
  <div className="prose prose-slate dark:prose-invert max-w-none">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
    >
      {content}
    </ReactMarkdown>
  </div>
)
```

### MDX with next-mdx-remote

```bash
npm install next-mdx-remote
```

```tsx
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
```

### PayloadCMS RichText

```tsx
import { RichText } from '@payloadcms/richtext-lexical/react'

const richTextRenderer = (content: string) => {
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
```

## Props

### DocumentPreview Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `document` | `KnowledgeDocument` | - | The document to display |
| `editable` | `boolean` | `true` | Whether the document can be edited |
| `renderers` | `DocumentRenderers` | - | Custom renderers for different formats |
| `onDocumentUpdate` | `(doc: KnowledgeDocument) => void` | - | Callback when document is updated |

### DocumentRenderers Type

```tsx
interface DocumentRenderers {
  markdown?: (content: string) => ReactNode
  mdx?: (content: string) => ReactNode
  richtext?: (content: string) => ReactNode
  text?: (content: string) => ReactNode
}
```

### KnowledgeDocument Type

```tsx
interface KnowledgeDocument {
  id: string
  title: string
  description?: string
  metadata?: Record<string, any>
  content?: string
  format: 'markdown' | 'mdx' | 'richtext' | 'text'
  tags?: string[]
  createdAt: Date
  updatedAt?: Date
}
```

## Default Renderers

If no custom renderers are provided, the component uses built-in default renderers:

- **Markdown**: Basic HTML conversion with support for headings, bold, italic, and code
- **Text**: Monospace font with preserved whitespace
- **RichText**: Placeholder with raw content display
- **MDX**: Placeholder with basic markdown rendering

## Styling

The component uses Tailwind CSS classes and supports dark mode through CSS variables. Key styling features:

- Responsive design
- Typography classes from `@tailwindcms/typography`
- Dark mode support
- Smooth animations with Framer Motion
- Consistent spacing and borders

## Examples

Check out the Storybook stories for interactive examples:

- `MarkdownWithCustomRenderer` - Markdown with enhanced rendering
- `TextFormat` - Plain text documents
- `RichTextFormat` - PayloadCMS rich content
- `MDXFormat` - MDX with React components
- `AllFormatsComparison` - Side-by-side format comparison
