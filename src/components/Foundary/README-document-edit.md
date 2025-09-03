# Document Edit Component

The `DocumentEdit` component provides a comprehensive editing interface for knowledge documents with enhanced metadata management and intelligent suggestions.

## Key Features

### 🏷️ Smart Metadata Management
- **Editable Key-Value Pairs**: Add, edit, and remove metadata fields dynamically
- **Context-based Suggestions**: Field names suggested from knowledge contexts and existing documents
- **Value Autocomplete**: Common values suggested for known metadata fields
- **Visual Guidance**: Shows which fields are commonly used for organization

### 🔗 Knowledge Context Integration
- **Context-aware Fields**: Suggests metadata keys based on knowledge context grouping rules
- **Organizational Alignment**: Helps maintain consistency with existing document organization
- **Cross-document Learning**: Learns from existing documents to suggest appropriate values

### 📝 Enhanced Editing Experience
- **Streamlined Interface**: Clean, intuitive design focused on content creation
- **Rich Metadata**: Support for flexible metadata schemas
- **Format Support**: Works with markdown, MDX, rich text, and plain text formats
- **Real-time Validation**: Immediate feedback on changes

## Usage

### Basic Usage

```tsx
import { DocumentEdit } from './document-edit'

const document = {
  id: '1',
  title: 'My Document',
  description: 'Document description',
  format: 'markdown',
  metadata: { category: 'Development' },
  content: '# Hello World',
  createdAt: new Date()
}

<DocumentEdit
  document={document}
  onSave={(updatedDocument) => console.log('Saved:', updatedDocument)}
  onCancel={() => console.log('Cancelled')}
/>
```

### With Knowledge Context Support

```tsx
import { DocumentEdit } from './document-edit'

const knowledgeContexts = [
  {
    id: 'development',
    label: 'Development Docs',
    menuConfig: {
      groupBy: ['category', 'team', 'difficulty'],
      sortBy: 'updatedAt'
    }
  }
]

const availableDocuments = [
  // ... existing documents for learning metadata patterns
]

<DocumentEdit
  document={document}
  onSave={handleSave}
  onCancel={handleCancel}
  availableDocuments={availableDocuments}
  knowledgeContexts={knowledgeContexts}
/>
```

## Props

### DocumentEditProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `document` | `KnowledgeDocument` | - | The document to edit |
| `onSave` | `(document: KnowledgeDocument) => void` | - | Callback when document is saved |
| `onCancel` | `() => void` | - | Callback when editing is cancelled |
| `availableDocuments` | `KnowledgeDocument[]` | `[]` | Existing documents for metadata suggestions |
| `knowledgeContexts` | `KnowledgeContext[]` | `[]` | Knowledge contexts for field suggestions |

## Metadata Features

### Suggested Fields

The component automatically suggests metadata field names based on:

1. **Knowledge Context Grouping**: Fields used in `menuConfig.groupBy` arrays
2. **Existing Documents**: Fields found in `metadata` of available documents
3. **Common Patterns**: Frequently used organizational fields

Common suggested fields include:
- `category` - Document category (Development, Design, Management, etc.)
- `type` - Document type (Guide, Reference, Tutorial, etc.)
- `team` - Responsible team (Frontend, Backend, DevOps, etc.)
- `difficulty` - Complexity level (Beginner, Intermediate, Advanced)
- `project` - Associated project name
- `priority` - Priority level (High, Medium, Low)

### Value Suggestions

When editing metadata values:
- **Dropdown Selection**: Shows common values for known fields
- **Custom Input**: Option to enter custom values
- **Learning System**: Builds suggestions from existing document metadata

### Visual Feedback

- **Context Hints**: Shows which fields come from knowledge contexts
- **Value Previews**: Displays common values for each field
- **Empty State**: Helpful guidance when no metadata exists yet

## Integration Examples

### With Document Browser

```tsx
function KnowledgeManager() {
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="flex h-screen">
      <KnowledgeBrowser
        documents={documents}
        contexts={knowledgeContexts}
        onDocumentClick={setSelectedDocument}
      />
      
      {isEditing ? (
        <DocumentEdit
          document={selectedDocument}
          availableDocuments={documents}
          knowledgeContexts={knowledgeContexts}
          onSave={(doc) => {
            updateDocument(doc)
            setIsEditing(false)
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <DocumentPreview
          document={selectedDocument}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </div>
  )
}
```

### Custom Metadata Schema

```tsx
// Define your organization's metadata schema
const metadataSchema = {
  category: ['Development', 'Design', 'Management', 'Operations'],
  priority: ['Critical', 'High', 'Medium', 'Low'],
  team: ['Frontend', 'Backend', 'DevOps', 'Design', 'Product'],
  status: ['Draft', 'Review', 'Approved', 'Published', 'Archived']
}

// Use with pre-populated documents that follow your schema
const documentsWithSchema = documents.map(doc => ({
  ...doc,
  metadata: {
    ...doc.metadata,
    category: doc.metadata?.category || 'Development',
    priority: doc.metadata?.priority || 'Medium'
  }
}))
```

## Best Practices

### Metadata Consistency
1. **Define Schema Early**: Establish common metadata fields for your organization
2. **Use Knowledge Contexts**: Align metadata with how documents are organized
3. **Provide Examples**: Include sample documents with good metadata
4. **Regular Review**: Periodically review and standardize metadata usage

### User Experience
1. **Progressive Enhancement**: Start with basic fields, add more as needed
2. **Clear Labels**: Use descriptive field names that users understand
3. **Helpful Defaults**: Pre-populate common fields when possible
4. **Validation**: Provide feedback for required or invalid fields

### Performance
1. **Lazy Loading**: Load available documents only when needed
2. **Debounced Suggestions**: Avoid excessive API calls for suggestions
3. **Efficient Filtering**: Optimize metadata value lookups
4. **Caching**: Cache frequently used metadata patterns

## Migration from Tags

If migrating from a tag-based system:

```tsx
// Convert tags to metadata
function convertTagsToMetadata(document) {
  const metadata = { ...document.metadata }
  
  if (document.tags) {
    // Convert common tag patterns to structured metadata
    document.tags.forEach(tag => {
      if (['beginner', 'intermediate', 'advanced'].includes(tag)) {
        metadata.difficulty = tag
      } else if (['frontend', 'backend', 'devops'].includes(tag)) {
        metadata.team = tag
      } else if (['guide', 'reference', 'tutorial'].includes(tag)) {
        metadata.type = tag
      }
      // Add remaining tags as topics or keywords array
      else {
        metadata.topics = metadata.topics || []
        metadata.topics.push(tag)
      }
    })
  }
  
  return { ...document, metadata }
}
```

## Related Components

- **DocumentPreview**: For viewing documents with metadata display
- **KnowledgeBrowser**: For browsing documents organized by metadata
- **KnowledgeSearch**: For searching documents by metadata fields
- **KnowledgeView**: For complete knowledge management interfaces
