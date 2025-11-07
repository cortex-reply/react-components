import React, { use, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Task,
  Epic,
  Sprint,
  DigitalColleague,
  User,
  Colleague,
  File as FileType,
} from '../Foundary/types'
import { EditableField } from '../AdvancedComponents/EditableField'
import { CommentSection } from '../AdvancedComponents/CommentSection'
import { TaskSidebar } from './TaskSidebar'
import { FileList } from './file-list'
import { AddFileModal } from './AddFileModal'
import { Button } from '@/components/ui/button'
import { Loader2, Check, X, Upload, File as FileIcon } from 'lucide-react'

interface Comment {
  id: string
  text: string
  author: string
  createdAt: Date
}

type UpdateState = 'idle' | 'loading' | 'success' | 'error'

interface TaskDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  initialTask: Task
  epics: Epic[]
  sprints: Sprint[]
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void
  onDeleteTask: (taskId: string) => Promise<void>
  onAddComment?: ({ content, taskId }: { taskId: string; content: string }) => void
  colleagues: Colleague[]
  onUploadFile?: (taskId: string, file: FormData) => Promise<void>
  onDeleteFile?: (taskId: string, fileId: string) => Promise<void>
  onFileUpdate?: (fileId: string, content: string) => void
}

export const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  isOpen,
  onClose,
  initialTask,
  epics,
  sprints,
  onUpdateTask,
  onDeleteTask,
  onAddComment,
  colleagues,
  onUploadFile,
  onDeleteFile,
  onFileUpdate,
}) => {
  const [task, setTask] = useState(initialTask)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [updateState, setUpdateState] = useState<UpdateState>('idle')
  const [deleteState, setDeleteState] = useState<UpdateState>('idle')
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [comments, setComments] = useState<Comment[]>([
    // {
    //   id: '1',
    //   text: 'Initial task created and assigned.',
    //   author: 'System',
    //   createdAt: task.createdAt,
    // },
    // {
    //   id: '2',
    //   text: 'Started working on the implementation.',
    //   author: task.assignee,
    //   createdAt: new Date(task.createdAt.getTime() + 86400000), // +1 day
    // },
  ])
  const [members, setMembers] = useState(colleagues)

  useEffect(() => {
    setTask(initialTask)
  }, [initialTask])

  const handleFieldUpdate = async (fieldName: string, value: string) => {
    if (value !== task[fieldName as keyof Task]) {
      setUpdateState('loading')
      try {
        await onUpdateTask(task.id.toString(), { [fieldName]: value })
        // setTask(updatedTask)
        setLastUpdated(new Date())
        setUpdateState('success')
        // Reset to idle after showing success
        setTimeout(() => setUpdateState('idle'), 1500)
      } catch (error) {
        console.log('error', error)
        setUpdateState('error')
        // Reset to idle after showing error
        setTimeout(() => setUpdateState('idle'), 3000)
      }
    }
  }

  const handleSidebarUpdate = async (fieldName: string, value: string) => {
    if (value !== task[fieldName as keyof Task]) {
      setUpdateState('loading')
      try {
        await onUpdateTask(task.id.toString(), { [fieldName]: value })
        // setTask(updatedTask)
        setLastUpdated(new Date())
        setUpdateState('success')
        // Reset to idle after showing success
        setTimeout(() => setUpdateState('idle'), 1500)
      } catch (error) {
        console.log('error', error)
        setUpdateState('error')
        // Reset to idle after showing error
        setTimeout(() => setUpdateState('idle'), 3000)
      }
    }
  }

  const handleAddComment = async (text: string) => {
    if (!onAddComment) return
    setUpdateState('loading')
    try {
      await onAddComment?.({ content: text, taskId: task.id.toString() })
      // setTask(updatedTask)
      setLastUpdated(new Date())
      setUpdateState('success')
      // Reset to idle after showing success
      setTimeout(() => setUpdateState('idle'), 1500)
    } catch (error) {
      setUpdateState('error')
      // Reset to idle after showing error
      setTimeout(() => setUpdateState('idle'), 3000)
    }
    // const comment: Comment = {
    //   id: Date.now().toString(),
    //   text,
    //   author: 'Current User', // In a real app, this would be the logged-in user
    //   createdAt: new Date(),
    // }
    // setComments([...comments, comment])
  }

  const handleDelete = async () => {
    setDeleteState('loading')
    try {
      await onDeleteTask(task.id.toString())
      setDeleteState('success')
      // Close modal after successful deletion
      setTimeout(() => {
        onClose()
        setDeleteState('idle')
      }, 1000)
    } catch (error) {
      setDeleteState('error')
      // Reset to idle after showing error
      setTimeout(() => setDeleteState('idle'), 3000)
    }
  }

  const handleUploadFile = async (formData: FormData) => {
    if (!onUploadFile) return

    setUpdateState('loading')
    try {
      await onUploadFile(task.id.toString(), formData)
      setLastUpdated(new Date())
      setUpdateState('success')
      setIsUploadModalOpen(false)
      setTimeout(() => setUpdateState('idle'), 1500)
    } catch (error) {
      console.error('Error uploading file:', error)
      setUpdateState('error')
      setTimeout(() => setUpdateState('idle'), 3000)
    }
  }

  const handleDeleteFile = async (file: FileType) => {
    if (!onDeleteFile) return

    setUpdateState('loading')
    try {
      await onDeleteFile(task.id.toString(), file.id.toString())
      setLastUpdated(new Date())
      setUpdateState('success')
      setTimeout(() => setUpdateState('idle'), 1500)
    } catch (error) {
      console.error('Error deleting file:', error)
      setUpdateState('error')
      setTimeout(() => setUpdateState('idle'), 3000)
    }
  }

  // Extract files from task - handle both File objects and file IDs
  const taskFiles: FileType[] = (task.files || [])
    .map((file) => {
      if (typeof file === 'number') {
        // If it's just an ID, we can't display it without fetching
        // For now, return null and filter it out
        return null
      }
      return file as FileType
    })
    .filter((file): file is FileType => file !== null)

  // Prevent closing when operations are in progress
  const canClose = updateState !== 'loading' && deleteState !== 'loading'

  const handleClose = () => {
    if (canClose) {
      onClose()
    }
  }

  const renderStatusIndicator = () => {
    if (updateState === 'loading') {
      return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Updating...</span>
        </div>
      )
    }

    if (updateState === 'success') {
      return (
        <div className="flex items-center gap-2 text-sm text-success">
          <Check className="h-4 w-4" />
          <span>Updated successfully</span>
        </div>
      )
    }

    if (updateState === 'error') {
      return (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <X className="h-4 w-4" />
          <span>Update failed</span>
        </div>
      )
    }

    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle className="sr-only">{task?.name}</DialogTitle>
          <div className="flex items-center justify-between">
            <div className="flex-1">{renderStatusIndicator()}</div>
            {!canClose && <div className="text-xs text-muted-foreground">Please wait...</div>}
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Editable Title in Header */}
            <EditableField
              fieldName="name"
              value={task.name || ''}
              label=""
              onSave={handleFieldUpdate}
              className="border-b border-border pb-3"
              disabled={updateState === 'loading'}
            />

            {/* Description */}
            <EditableField
              fieldName="description"
              value={task.description || ''}
              label="Description"
              multiline
              onSave={handleFieldUpdate}
              disabled={updateState === 'loading'}
            />

            {/* Files Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileIcon className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Files</h3>
                </div>
                {onUploadFile && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsUploadModalOpen(true)}
                    disabled={updateState === 'loading'}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload
                  </Button>
                )}
              </div>
              {taskFiles.length > 0 ? (
                <FileList
                  files={taskFiles}
                  onFileDelete={onDeleteFile ? handleDeleteFile : undefined}
                  onFileUpdate={onFileUpdate}
                  showHeader={false}
                  className="border rounded-lg"
                  viewMode="card"
                />
              ) : (
                <div className="text-sm text-muted-foreground py-4 text-center border border-dashed rounded-lg">
                  No files attached
                </div>
              )}
            </div>

            {/* Comments Section */}
            <CommentSection
              comments={(task?.comments || []).map((el) => ({
                author: (el as any).author?.value.name || '',
                createdAt: new Date(el.timestamp),
                text: el.text,
                id: el.id || '',
              }))}
              onAddComment={handleAddComment}
            />
          </div>

          {/* Sidebar */}
          <TaskSidebar
            task={task}
            epics={epics}
            sprints={sprints}
            lastUpdated={lastUpdated}
            onUpdateTask={handleSidebarUpdate}
            onClose={handleClose}
            onDelete={handleDelete}
            isUpdating={updateState === 'loading'}
            isDeleting={deleteState === 'loading'}
            deleteState={deleteState}
            teamMembers={members}
          />
        </div>
      </DialogContent>

      {/* File Upload Modal */}
      {onUploadFile && (
        <AddFileModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onAddFile={handleUploadFile}
        />
      )}
    </Dialog>
  )
}
