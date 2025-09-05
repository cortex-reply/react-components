import React, { use, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Task, Epic, Sprint, DigitalColleague, User } from '../Foundary/types'
import { EditableField } from '../AdvancedComponents/EditableField'
import { CommentSection } from '../AdvancedComponents/CommentSection'
import { TaskSidebar } from './TaskSidebar'
import { Loader2, Check, X } from 'lucide-react'

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
  onUpdateTask: (taskId: string, updates: Partial<Task>) => Promise<Task>
  onDeleteTask: (taskId: string) => Promise<void>
  onAddComment?: ({ content, taskId }: { taskId: string; content: string }) => Promise<Task>
  colleagues: (User | DigitalColleague)[]
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
}) => {
  const [task, setTask] = useState(initialTask)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [updateState, setUpdateState] = useState<UpdateState>('idle')
  const [deleteState, setDeleteState] = useState<UpdateState>('idle')
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

  useEffect(() => {
    setTask(initialTask)
  }, [initialTask])

  const handleFieldUpdate = async (fieldName: string, value: string) => {
    if (value !== task[fieldName as keyof Task]) {
      setUpdateState('loading')
      try {
        const updatedTask = await onUpdateTask(task.id.toString(), { [fieldName]: value })
        setTask(updatedTask)
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
        const updatedTask = await onUpdateTask(task.id.toString(), { [fieldName]: value })
        setTask(updatedTask)
        setLastUpdated(new Date())
        setUpdateState('success')
        // Reset to idle after showing success
        setTimeout(() => setUpdateState('idle'), 1500)
      } catch (error) {
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
      const updatedTask = await onAddComment?.({ content: text, taskId: task.id.toString() })
      setTask(updatedTask)
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
          <DialogTitle className="sr-only">{task.name}</DialogTitle>
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

            {/* Comments Section */}
            <CommentSection
              comments={(task?.comments || []).map((el) => ({
                author: (el as any).author.value.name || '',
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
            teamMembers={colleagues}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
