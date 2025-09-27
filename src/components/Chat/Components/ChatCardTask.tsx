import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, CheckCircle2, Clock, RefreshCw } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { TaskData } from '@/common-types'
import { useTask } from '../hooks/useTask'
import { cn } from '@/lib/utils'

interface ChatCardTaskProps {
  data?: {
    id?: number
    system?: string
    // If true, will continously fetch the latest task data from the API
    fetchLatest?: boolean
    taskData?: TaskData
    error?: Error | null
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'backlog':
      return 'bg-gray-200 text-gray-800'
    case 'todo':
      return 'bg-blue-200 text-blue-800'
    case 'inProgress':
      return 'bg-yellow-200 text-yellow-800'
    case 'done':
      return 'bg-green-200 text-green-800'
    case 'cancelled':
      return 'bg-red-200 text-red-800'
    default:
      return 'bg-gray-200 text-gray-800'
  }
}

const formatStatus = (status: string) => {
  switch (status) {
    case 'inProgress':
      return 'In Progress'
    default:
      return status.charAt(0).toUpperCase() + status.slice(1)
  }
}

export function ChatCardTask({
  data,
}: ChatCardTaskProps) {
  const { id, system, fetchLatest: initialFetchLatest, taskData: initialTaskData, error: initialError } = data || {}
  if (!id) {
    return null
  }
  let taskData: TaskData | null = null
  let loading = true
  let error = initialError
  let fetchLatest = initialFetchLatest !== undefined ? initialFetchLatest : true
  taskData = initialTaskData || {
    id,
    name: 'Loading...',
    description: '',
    status: 'todo',
    dateLogged: new Date().toISOString(),
    project: undefined,
  }

  console.log('ChatCardTask', { data, id, initialFetchLatest, system, fetchLatest, taskData, error })
  if (fetchLatest) {
    // Use the external task data if provided, otherwise fallback to initial props
    const { task, loading: taskLoading, error: taskError } = useTask({ taskId: id, system })
    taskData = task
    loading = taskLoading
    error = taskError
  } else {
    loading = false
  }
  const statusColor = getStatusColor(taskData?.status || 'todo')
  const formattedStatus = formatStatus(taskData?.status || 'todo')

  // Try to parse the date, if it's valid use formatDistanceToNow, otherwise use the raw string
  let formattedDate = taskData?.dateLogged || new Date().toISOString()
  try {
    const date = new Date(taskData?.dateLogged || '')
    if (!isNaN(date.getTime())) {
      formattedDate = formatDistanceToNow(date, { addSuffix: true })
    }
  } catch (e) {
    // Keep the original date string if parsing fails
  }

  return (
    <Card className={cn('w-full max-w-md shadow-md', error && 'border border-destructive')}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">
            {loading ? 'Loading...' : taskData?.name || 'Task'}
          </CardTitle>
          <Badge className={`${statusColor}`}>{formattedStatus}</Badge>
        </div>
        {taskData?.project && (
          <CardDescription className="text-sm text-gray-500">
            Project: {taskData.project.name}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pb-2">
        {loading ? (
          <div className="animate-pulse h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        ) : error ? (
          <p className="text-sm text-red-500">Error loading task details</p>
        ) : (
          <p className="text-sm text-foreground">{taskData?.description || '.......'}</p>
        )}
      </CardContent>
      <CardFooter className="pt-2 flex items-center justify-between">
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          <span>Created {formattedDate}</span>
          <span className="mx-2">•</span>
          <span>Task #{id}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
