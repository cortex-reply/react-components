import React, { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TaskCard } from './TaskCard'
import { TaskDetailsModal } from './TaskDetailsModal'
import { Plus, Move, Edit2, Trash2, Check, X, Layers } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DashboardHero } from '../Heros/DashboardHero/DashboardHero'
import { Task, Epic, Sprint, Colleague } from '../Foundry/types'
import { extractId } from '@/lib/utils/extract-id'
import { AddEpicModal } from './AddEpicModal'
import { AddTaskModal } from './AddTaskModal'
import { useLocalStorage } from '@/hooks/use-local-storage'

interface EpicsViewProps {
  projectId?: string | number
  tasks: Task[]
  epics: Epic[]
  sprints: Sprint[]
  colleagues?: Colleague[]
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void
  onTaskClick?: (task: Task) => void
  onAddTaskToEpic: (task: Omit<Task, 'id' | 'updatedAt' | 'createdAt'>) => void
  onAddEpic: (epic: Omit<Epic, 'id' | 'updatedAt' | 'createdAt'>) => void
  onUpdateEpic: (epicId: string, updates: Partial<Epic>) => void
  onDeleteEpic: (epicId: string) => void
  onDeleteTask?: (taskId: string) => Promise<void>
  onAddComment?: ({ content, taskId }: { taskId: string; content: string }) => void
  onUploadFile?: (taskId: string, file: FormData) => Promise<void>
  onDeleteFile?: (taskId: string, fileId: string) => Promise<void>
  onFileUpdate?: (fileId: string, content: string) => void
}

export const EpicsView: React.FC<EpicsViewProps> = ({
  projectId,
  tasks,
  epics,
  sprints,
  colleagues = [],
  onUpdateTask,
  onTaskClick,
  onAddTaskToEpic,
  onAddEpic,
  onUpdateEpic,
  onDeleteEpic,
  onDeleteTask,
  onAddComment,
  onUploadFile,
  onDeleteFile,
  onFileUpdate,
}) => {
  const [availableEpics, setAvailableEpics] = useState<Epic[]>(epics)
  const [availableTasks, setAvailableTasks] = useState<Task[]>(tasks)
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [editingEpic, setEditingEpic] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Epic>>({})
  const [heroHeight, setHeroHeight] = useState(0)
  const [isAddEpicModalOpen, setIsAddEpicModalOpen] = useState(false)
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [addTaskEpic, setAddTaskEpic] = useState<Epic | null>(null)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [selectedEpicIds, setSelectedEpicIds] = useLocalStorage<string[]>(
    `epicsView_selectedEpics${projectId ? `_${projectId}` : ''}`,
    [],
  )
  const [isEpicSelectorOpen, setIsEpicSelectorOpen] = useState(false)

  const heroRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setAvailableEpics(epics)
    // Clean up stale selected IDs
    const validIds = new Set(epics.map((e) => e.id.toString()))
    setSelectedEpicIds((prev) => prev.filter((id) => validIds.has(id)))
  }, [epics])

  useEffect(() => {
    setAvailableTasks(tasks)
    if (selectedTask) {
      setSelectedTask(tasks.find((t) => t.id === selectedTask.id) || null)
    }
  }, [tasks])

  // Measure hero height and adjust when it changes
  useEffect(() => {
    const measureHeroHeight = () => {
      if (heroRef.current) {
        setHeroHeight(heroRef.current.offsetHeight)
      }
    }

    measureHeroHeight()

    const resizeObserver = new ResizeObserver(measureHeroHeight)
    if (heroRef.current) {
      resizeObserver.observe(heroRef.current)
    }

    const handleStorageChange = () => {
      setTimeout(measureHeroHeight, 100)
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (heroRef.current) {
        setHeroHeight(heroRef.current.offsetHeight)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [editingEpic])

  const visibleEpics =
    selectedEpicIds.length === 0
      ? availableEpics
      : availableEpics.filter((e) => selectedEpicIds.includes(e.id.toString()))

  const toggleEpicView = (epicId: string) => {
    setSelectedEpicIds((prev) =>
      prev.includes(epicId) ? prev.filter((id) => id !== epicId) : [...prev, epicId],
    )
  }

  const handleDragStart = (task: Task) => {
    setDraggedTask(task)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, epicId: string) => {
    e.preventDefault()
    if (draggedTask && extractId(draggedTask.epic).toString() !== epicId) {
      onUpdateTask(draggedTask.id.toString(), { epic: Number(epicId) })
      setAvailableTasks((prev) =>
        prev.map((t) => (t.id === draggedTask.id ? { ...t, epic: Number(epicId) } : t)),
      )
      setDraggedTask(null)
    }
  }

  const getTasksByEpic = (epicId: string) => {
    return availableTasks.filter((task) => extractId(task.epic).toString() === epicId)
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    onTaskClick?.(task)
  }

  const handleUpdateTask = async (taskId: string, updates: Partial<Task>) => {
    setAvailableTasks((prev) =>
      prev.map((t) => (t.id === Number(taskId) ? { ...t, ...updates } : t)),
    )
    if (selectedTask?.id === Number(taskId)) {
      setSelectedTask((prev) => (prev ? { ...prev, ...updates } : null))
    }
    await onUpdateTask(taskId, updates)
  }

  const handleDeleteTask = async (taskId: string) => {
    setAvailableTasks((prev) => prev.filter((t) => t.id !== Number(taskId)))
    if (selectedTask?.id === Number(taskId)) {
      setSelectedTask(null)
    }
    await onDeleteTask?.(taskId)
  }

  const handleRemoveFromEpic = (task: Task) => {
    onUpdateTask(task.id.toString(), { epic: null })
    setAvailableTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, epic: null } : t)),
    )
  }

  const handleEditEpic = (epic: Epic) => {
    setEditingEpic(epic.id.toString())
    setEditForm({
      name: epic.name,
      description: epic.description,
      confidence: epic.confidence,
      phase: epic.phase,
    })
  }

  const handleSaveEdit = async () => {
    if (editingEpic && editForm.name) {
      await onUpdateEpic(editingEpic.toString(), editForm)
      setAvailableEpics((prev) =>
        prev.map((epic) =>
          epic.id.toString() === editingEpic ? { ...epic, ...editForm } : epic,
        ),
      )
      setEditingEpic(null)
      setEditForm({})
    }
  }

  const handleCancelEdit = () => {
    setEditingEpic(null)
    setEditForm({})
  }

  const handleDeleteEpic = async (epicId: string) => {
    if (
      window.confirm(
        'Are you sure you want to delete this epic? This will also delete all associated tasks.',
      )
    ) {
      await onDeleteEpic(epicId)
      setAvailableEpics((prev) => prev.filter((epic) => epic.id.toString() !== epicId))
      setSelectedEpicIds((prev) => prev.filter((id) => id !== epicId))
    }
  }

  const getPhaseLabel = (phase: number) => {
    const phases = {
      1: 'Planning',
      2: 'Development',
      3: 'Testing',
      4: 'Review',
      5: 'Deployment',
      6: 'Monitoring',
      7: 'Optimization',
      8: 'Maintenance',
      9: 'Complete',
    }
    return phases[phase as keyof typeof phases] || `Phase ${phase}`
  }

  const getConfidenceColor = (confidence: Epic['confidence']) => {
    switch (confidence) {
      case 'high':
        return 'bg-success/10 text-success'
      case 'medium':
        return 'bg-warning/10 text-warning'
      case 'low':
        return 'bg-destructive/10 text-destructive'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <>
      <div ref={containerRef} className="h-full flex flex-col px-2 md:px-4 py-4">
        <div ref={heroRef} className="flex-shrink-0">
          <DashboardHero
            title="Epic Planning"
            description="Organize and manage your project epics, track progress, and assign tasks."
            gradient="bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600"
            primaryAction={{
              label: 'Add epic',
              onClick: () => setIsAddEpicModalOpen(true),
            }}
          />
        </div>

        <div className="flex-1 min-h-0 mt-8">
          <div
            className="h-full overflow-y-auto no-scrollbar"
            style={{
              height:
                heroHeight > 0 ? `calc(100vh - ${heroHeight + 120}px)` : 'calc(100vh - 12rem)',
            }}
          >
            {/* Epic Selector Bar */}
            <div className="mb-4">
              <Card className="p-3 bg-card shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">Epics</h3>
                      <p className="text-xs text-muted-foreground">
                        {selectedEpicIds.length === 0
                          ? 'All showing'
                          : `${selectedEpicIds.length}/${availableEpics.length} selected`}
                      </p>
                    </div>

                    {selectedEpicIds.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Viewing:</span>
                        <div className="flex flex-wrap gap-1">
                          {visibleEpics.map((epic) => (
                            <div
                              key={epic.id}
                              className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded text-xs"
                            >
                              <div className={`w-2 h-2 rounded-full ${epic.color}`} />
                              <span className="max-w-[80px] truncate">{epic.name}</span>
                              <button
                                onClick={() => toggleEpicView(epic.id.toString())}
                                className="ml-0.5 hover:bg-primary/20 h-8 rounded p-0.5"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => setIsEpicSelectorOpen(!isEpicSelectorOpen)}
                    variant="outline"
                    size="sm"
                    className="gap-1"
                  >
                    <Layers className="h-3 w-3" />
                    {isEpicSelectorOpen ? 'Close' : 'Select'}
                  </Button>
                </div>
              </Card>

              {/* Backdrop */}
              {isEpicSelectorOpen && (
                <div
                  className="fixed inset-0 bg-black/20 z-[5]"
                  onClick={() => setIsEpicSelectorOpen(false)}
                />
              )}

              {/* Sliding Epic Selector Panel */}
              <div
                className={`fixed top-0 right-0 h-full w-80 bg-background border-l shadow-xl z-10 transition-all duration-300 ease-in-out ${
                  isEpicSelectorOpen
                    ? 'translate-x-0 opacity-100 visible'
                    : 'translate-x-full opacity-0 invisible'
                }`}
              >
                <Card className="h-full rounded-none border-0 flex flex-col">
                  <div className="p-4 border-b bg-muted/30 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground text-base">Select Epics</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEpicSelectorOpen(false)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Filter which epics to display. Select none to show all.
                    </p>
                  </div>

                  <div className="flex flex-col flex-1 p-4 min-h-0">
                    <div className="space-y-2 flex-1 overflow-y-auto no-scrollbar">
                      {availableEpics.length > 0 ? (
                        availableEpics.map((epic) => {
                          const isSelected = selectedEpicIds.includes(epic.id.toString())
                          const taskCount = availableTasks.filter(
                            (t) => extractId(t.epic) === epic.id,
                          ).length

                          return (
                            <div
                              key={epic.id}
                              className={`p-3 rounded-lg border transition-all ${
                                isSelected
                                  ? 'bg-primary/10 border-primary/30 ring-1 ring-primary/20'
                                  : 'bg-card border-border'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${epic.color}`} />
                                  <p className="font-medium text-sm text-foreground truncate">
                                    {epic.name}
                                  </p>
                                </div>
                                <div className="ml-2 flex items-center gap-1">
                                  <Badge variant="secondary" className="text-xs">
                                    {taskCount}
                                  </Badge>
                                </div>
                              </div>
                              <Button
                                variant={isSelected ? 'default' : 'outline'}
                                size="sm"
                                className="w-full mt-2 text-xs h-7"
                                onClick={() => toggleEpicView(epic.id.toString())}
                              >
                                {isSelected ? 'Deselect' : 'Select'}
                              </Button>
                            </div>
                          )
                        })
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-8">
                          No epics yet. Add one to get started.
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Epics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 auto-rows-max">
              {visibleEpics.map((epic) => {
                const epicTasks = getTasksByEpic(epic.id.toString())
                const totalPoints = epicTasks.reduce(
                  (sum, task) => sum + (task.storyPoints || 0),
                  0,
                )

                return (
                  <Card
                    key={epic.id}
                    className="flex flex-col bg-card shadow-sm"
                    style={{ maxHeight: '420px' }}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, epic.id.toString())}
                  >
                    {/* Epic Header */}
                    <div className="p-3 border-b border-border flex-shrink-0">
                      {editingEpic === epic.id.toString() ? (
                        /* Edit Mode */
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Input
                              value={editForm.name || ''}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              placeholder="Epic name"
                              className="font-semibold text-sm"
                            />
                            <div className="flex gap-1 ml-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleSaveEdit}
                                className="p-1 h-7 w-7"
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleCancelEdit}
                                className="p-1 h-7 w-7"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <Textarea
                            value={editForm.description || ''}
                            onChange={(e) =>
                              setEditForm({ ...editForm, description: e.target.value })
                            }
                            placeholder="Epic description"
                            className="text-xs min-h-[50px]"
                          />

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs text-muted-foreground">Confidence</label>
                              <select
                                value={editForm.confidence || epic.confidence}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    confidence: e.target.value as Epic['confidence'],
                                  })
                                }
                                className="flex h-7 w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground">Phase</label>
                              <select
                                value={editForm.phase?.toString() || epic.phase.toString()}
                                onChange={(e) =>
                                  setEditForm({ ...editForm, phase: parseInt(e.target.value) })
                                }
                                className="flex h-7 w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((phase) => (
                                  <option key={phase} value={phase.toString()}>
                                    Phase {phase}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Display Mode */
                        <>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${epic.color}`} />
                            <h3 className="font-semibold text-foreground text-sm select-none flex-1 truncate">
                              {epic.name}
                            </h3>
                            <div className="flex gap-0.5">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEditEpic(epic)}
                                className="p-1 h-6 w-6"
                              >
                                <Edit2 className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteEpic(epic.id.toString())}
                                className="p-1 h-6 w-6 hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-2">
                            <Badge className={`text-xs px-1.5 py-0 ${getConfidenceColor(epic.confidence)}`}>
                              {epic.confidence}
                            </Badge>
                            <Badge variant="outline" className="text-xs px-1.5 py-0">
                              {getPhaseLabel(epic.phase)}
                            </Badge>
                            <Badge variant="secondary" className="text-xs px-1.5 py-0 bg-muted text-muted-foreground">
                              {epicTasks.length}t · {totalPoints}pt
                            </Badge>
                          </div>

                          {epic.description && (
                            <p className="text-xs text-muted-foreground mb-2 select-none line-clamp-2">
                              {epic.description}
                            </p>
                          )}

                          <Button
                            onClick={() => {
                              setIsAddTaskModalOpen(true)
                              setAddTaskEpic(epic)
                            }}
                            variant="outline"
                            size="sm"
                            className="w-full gap-1 h-7 text-xs"
                          >
                            <Plus className="h-3 w-3" />
                            Add Task
                          </Button>
                        </>
                      )}
                    </div>

                    {/* Tasks List */}
                    <div className="flex-1 p-2 overflow-y-auto no-scrollbar min-h-0">
                      <div
                        className={`space-y-2 min-h-[80px] border-2 border-dashed rounded p-2 transition-colors ${
                          draggedTask ? 'border-primary bg-primary/10' : 'border-border'
                        }`}
                      >
                        {epicTasks.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-16 text-muted-foreground">
                            <Move className="h-5 w-5 mb-1" />
                            <span className="text-xs select-none">Drop tasks here</span>
                          </div>
                        ) : (
                          epicTasks.map((task) => (
                            <div key={task.id} className="relative group">
                              <TaskCard
                                task={task}
                                epic={epic}
                                onDragStart={handleDragStart}
                                onTaskClick={handleTaskClick}
                                isCompact={true}
                              />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleRemoveFromEpic(task)
                                }}
                                title="Remove from epic"
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-destructive/10 hover:text-destructive rounded p-0.5"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <AddEpicModal
        isOpen={isAddEpicModalOpen}
        onClose={() => setIsAddEpicModalOpen(false)}
        onAddEpic={onAddEpic}
      />
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onAddTask={onAddTaskToEpic}
        assignees={[]}
        epics={[]}
        defaultEpicId={addTaskEpic?.id.toString() || ''}
        sprints={sprints}
      />
      {selectedTask && (
        <TaskDetailsModal
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          initialTask={selectedTask}
          epics={availableEpics}
          sprints={sprints}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onAddComment={onAddComment}
          colleagues={colleagues}
          onUploadFile={onUploadFile}
          onDeleteFile={onDeleteFile}
          onFileUpdate={onFileUpdate}
        />
      )}
    </>
  )
}
