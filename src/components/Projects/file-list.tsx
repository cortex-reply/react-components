'use client'

import { motion } from 'motion/react'
import { MoreHorizontal, Trash2, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { File as FileType, KnowledgeDocument, KnowledgeContext } from '../Foundary/types'
import { Dialog, DialogPortal, DialogOverlay } from '@/components/ui/dialog'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'
import { FileEdit } from '../Foundary/file-edit'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

const formatFileSize = (bytes?: number | null): string => {
  if (!bytes || bytes <= 0) return '0 KB'
  const kilobytes = bytes / 1024
  if (kilobytes < 1024) {
    return `${kilobytes.toFixed(2)} KB`
  }
  const megabytes = kilobytes / 1024
  return `${megabytes.toFixed(2)} MB`
}

interface FileListProps {
  files: FileType[]
  onFileClick?: (file: FileType) => void
  // onFileEdit?: (file: FileType) => void
  onFileUpdate?: (fileId: string, content: string) => void
  onFileDelete?: (file: FileType) => void
  showHeader?: boolean
  className?: string
}

export function FileList({
  files,
  onFileClick,
  // onFileEdit,
  onFileDelete,
  onFileUpdate,
  showHeader = true,
  className,
}: FileListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editingFile, setEditingFile] = useState<FileType | null>(null)

  const handleCancel = () => {
    setIsDialogOpen(false)
    setEditingFile(null)
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)

      setIsDialogOpen(false)
      setEditingFile(null)
    }, 500)
  }

  const handleEdit = (file: FileType) => {
    setEditingFile(file)
    setIsDialogOpen(true)
    // onFileEdit?.(file)
  }

  return (
    <div className={`rounded-3xl border overflow-hidden ${className || ''}`}>
      {showHeader && (
        <div className="bg-muted/50 p-3 hidden md:grid md:grid-cols-10 text-sm font-medium">
          <div className="col-span-6">Name</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-2">Modified</div>
        </div>
      )}
      <div className="divide-y">
        {files.map((file) => (
          <motion.div
            key={file.name}
            whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
            className="p-3 md:grid md:grid-cols-10 items-center flex flex-col md:flex-row gap-3 md:gap-0 cursor-pointer"
            onClick={() => onFileClick?.(file)}
          >
            <div className="col-span-6 flex items-center gap-3 w-full md:w-auto">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">
                {/* {file.icon} */}
              </div>
              <div>
                <p className="font-medium">{file.name}</p>
              </div>
            </div>
            <div className="col-span-2 text-sm md:text-base">{formatFileSize(file.filesize)}</div>
            <div className="col-span-2 flex items-center justify-between w-full md:w-auto">
              <span className="text-sm md:text-base">
                {new Date(file.createdAt).toLocaleDateString()}
              </span>
              <div className="flex gap-1">
                {file.mimeType === 'text/markdown' && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-xl"
                    onClick={(e) => {
                      e.stopPropagation()
                      // onFileEdit?.(file)
                      handleEdit(file)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-xl text-red-500 hover:text-red-600"
                  onClick={(e) => {
                    e.stopPropagation()
                    onFileDelete?.(file)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                {/* <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                  <MoreHorizontal className="h-4 w-4" />
                </Button> */}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => !open && handleCancel()}>
        <DialogPortal>
          <DialogOverlay />
          <DialogPrimitive.Content
            className={cn(
              'fixed inset-0 z-50 bg-background p-0 m-0 border-0',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            )}
          >
            {isSaving && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-50">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {editingFile && (
              <FileEdit
                document={editingFile}
                onSave={handleSave}
                onFileUpdate={onFileUpdate}
                onCancel={handleCancel}
              />
            )}
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </div>
  )
}
