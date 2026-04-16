
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, ChevronDown, FileText, Folder, Plus, Edit2, Trash2 } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  content: string;
  parentId?: string;
  isFolder: boolean;
  children?: Document[];
}

const initialDocuments: Document[] = [
  {
    id: '1',
    title: 'Project Overview',
    content: '# Project Overview\n\nThis is the main project documentation...',
    isFolder: false,
  },
  {
    id: '2',
    title: 'User Guides',
    content: '',
    isFolder: true,
    children: [
      {
        id: '2-1',
        title: 'Getting Started',
        content: '# Getting Started\n\nWelcome to our application...',
        parentId: '2',
        isFolder: false,
      },
      {
        id: '2-2',
        title: 'Advanced Features',
        content: '# Advanced Features\n\nLearn about advanced functionality...',
        parentId: '2',
        isFolder: false,
      },
    ],
  },
  {
    id: '3',
    title: 'API Documentation',
    content: '',
    isFolder: true,
    children: [
      {
        id: '3-1',
        title: 'Authentication',
        content: '# Authentication API\n\nAPI endpoints for user authentication...',
        parentId: '3',
        isFolder: false,
      },
      {
        id: '3-2',
        title: 'Data Management',
        content: '# Data Management API\n\nCRUD operations and data handling...',
        parentId: '3',
        isFolder: false,
      },
    ],
  },
];

export const DocumentationView: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(initialDocuments[0]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['2', '3']));
  const [editingDocument, setEditingDocument] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleDocumentSelect = (document: Document) => {
    if (!document.isFolder) {
      setSelectedDocument(document);
    }
  };

  const handleEditDocument = (document: Document) => {
    setEditingDocument(document.id);
    setEditContent(document.content);
  };

  const handleSaveEdit = () => {
    if (editingDocument && selectedDocument) {
      const updatedDocuments = updateDocumentInTree(documents, editingDocument, { content: editContent });
      setDocuments(updatedDocuments);
      setSelectedDocument({ ...selectedDocument, content: editContent });
      setEditingDocument(null);
    }
  };

  const updateDocumentInTree = (docs: Document[], docId: string, updates: Partial<Document>): Document[] => {
    return docs.map(doc => {
      if (doc.id === docId) {
        return { ...doc, ...updates };
      }
      if (doc.children) {
        return { ...doc, children: updateDocumentInTree(doc.children, docId, updates) };
      }
      return doc;
    });
  };

  const renderDocumentTree = (docs: Document[], level = 0) => {
    return docs.map(doc => (
      <div key={doc.id} className={`ml-${level * 4}`}>
        <div
          className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100 ${
            selectedDocument?.id === doc.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
          }`}
          onClick={() => doc.isFolder ? toggleFolder(doc.id) : handleDocumentSelect(doc)}
        >
          {doc.isFolder ? (
            <>
              {expandedFolders.has(doc.id) ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
              <Folder className="h-4 w-4 text-primary" />
            </>
          ) : (
            <>
              <div className="w-4" />
              <FileText className="h-4 w-4 text-muted-foreground" />
            </>
          )}
          <span className="text-sm font-medium text-gray-700">{doc.title}</span>
        </div>
        {doc.isFolder && doc.children && expandedFolders.has(doc.id) && (
          <div className="ml-4">
            {renderDocumentTree(doc.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex h-full">
      {/* Document Tree Sidebar */}
      <div className="w-80 border-r bg-gray-50">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Documentation</h2>
            <Button size="sm" className="gap-1">
              <Plus className="h-3 w-3" />
              New
            </Button>
          </div>
        </div>
        <div className="p-2 overflow-y-auto h-full">
          {renderDocumentTree(documents)}
        </div>
      </div>

      {/* Document Content */}
      <div className="flex-1 flex flex-col">
        {selectedDocument ? (
          <>
            <div className="p-4 border-b bg-white">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">{selectedDocument.title}</h1>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditDocument(selectedDocument)}
                    className="gap-1"
                  >
                    <Edit2 className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex-1 p-6 bg-white overflow-y-auto">
              {editingDocument === selectedDocument.id ? (
                <div className="space-y-4">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-96 p-4 border rounded-lg font-mono text-sm"
                    placeholder="Write your documentation in Markdown..."
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSaveEdit}>Save</Button>
                    <Button variant="outline" onClick={() => setEditingDocument(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap font-sans">{selectedDocument.content}</pre>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Select a document to view its content</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
