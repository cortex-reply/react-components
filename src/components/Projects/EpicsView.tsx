import React, { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
// import { Task, Epic, Sprint } from './'
import { TaskCard } from './TaskCard'
import { Plus, Move, Edit2, Trash2, Check, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DashboardHero } from '../Heros/DashboardHero/DashboardHero'
import { Task, Epic, Sprint } from '../Foundary/types'
import { extractId } from '@/lib/utils/extract-id'
import { AddEpicModal } from './AddEpicModal'
import { AddTaskModal } from './AddTaskModal'

interface EpicsViewProps {
  tasks: Task[]
  epics: Epic[]
  sprints: Sprint[]
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void
  onTaskClick: (task: Task) => void
  onAddTaskToEpic: (task: Omit<Task, 'id' | 'updatedAt' | 'createdAt'>) => void
  onAddEpic: () => void
  onUpdateEpic: (epicId: string, updates: Partial<Epic>) => void
  onDeleteEpic: (epicId: string) => void
}

export const EpicsView: React.FC<EpicsViewProps> = ({
  tasks,
  epics,
  sprints,
  onUpdateTask,
  onTaskClick,
  onAddTaskToEpic,
  onAddEpic,
  onUpdateEpic,
  onDeleteEpic,
}) => {
  const [availableEpics, setAvailableEpics] = useState<Epic[]>(epics)
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [editingEpic, setEditingEpic] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Epic>>({})
  const [heroHeight, setHeroHeight] = useState(0)
  const [isAddEpicModalOpen, setIsAddEpicModalOpen] = useState(false)
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [addTaskEpic, setAddTaskEpic] = useState<Epic | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setAvailableEpics(epics)
  }, [epics])

  // Measure hero height and adjust when it changes
  useEffect(() => {
    const measureHeroHeight = () => {
      if (heroRef.current) {
        const height = heroRef.current.offsetHeight
        setHeroHeight(height)
      }
    }

    // Initial measurement
    measureHeroHeight()

    // Set up ResizeObserver to watch for changes in hero height
    const resizeObserver = new ResizeObserver(measureHeroHeight)
    if (heroRef.current) {
      resizeObserver.observe(heroRef.current)
    }

    // Also listen for storage events in case the minimized state changes in another tab
    const handleStorageChange = () => {
      setTimeout(measureHeroHeight, 100) // Small delay to let the animation complete
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Re-measure when the hero content might change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (heroRef.current) {
        setHeroHeight(heroRef.current.offsetHeight)
      }
    }, 300) // Wait for any animations to complete

    return () => clearTimeout(timer)
  }, [editingEpic]) // Re-measure when editing states change

  const handleDragStart = (task: Task) => {
    setDraggedTask(task)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, epicId: string) => {
    e.preventDefault()
    if (draggedTask && extractId(draggedTask.epic).toString() !== epicId) {
      onUpdateTask(draggedTask.id.toString(), {
        epic: Number(epicId),
      })

      setDraggedTask(null)
    }
  }

  const getTasksByEpic = (epicId: string) => {
    return tasks.filter((task) => extractId(task.epic).toString() === epicId)
  }

  const handleEditEpic = (epic: Epic) => {
    setEditingEpic(epic.id.toString())
    setEditForm({
      name: epic.name,
      description: epic.description,
      confidence: epic.confidence,
      phase: epic.phase,
      // progress: epic.progress || 0, // This is a number, not a string
    })
  }

  const handleSaveEdit = async () => {
    if (editingEpic && editForm.name) {
      await onUpdateEpic(editingEpic.toString(), editForm)
      setAvailableEpics((prev) =>
        prev.map((epic) => {
          if (epic.id.toString() === editingEpic) {
            return { ...epic, ...editForm }
          }
          return epic
        }),
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
            className="h-full overflow-y-auto"
            style={{
              height:
                heroHeight > 0 ? `calc(100vh - ${heroHeight + 120}px)` : 'calc(100vh - 12rem)',
            }}
          >
            {/* Epics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
              {availableEpics.map((epic) => {
                const epicTasks = getTasksByEpic(epic.id.toString())
                const totalPoints = epicTasks.reduce(
                  (sum, task) => sum + (task.storyPoints || 0),
                  0,
                )

                // Calculate dynamic height based on available space
                const availableHeight =
                  heroHeight > 0 ? `calc(100vh - ${heroHeight + 200}px)` : 'calc(100vh - 14rem)'

                return (
                  <Card
                    key={epic.id}
                    className={`flex flex-col ${
                      editingEpic === epic.id.toString() ? 'h-auto' : ''
                    } bg-card shadow-sm`}
                    style={{
                      height: editingEpic === epic.id.toString() ? 'auto' : availableHeight,
                      minHeight: '400px',
                    }}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, epic.id.toString())}
                  >
                    {/* Epic Header */}
                    <div className="p-4 border-b border-border">
                      {editingEpic === epic.id.toString() ? (
                        /* Edit Mode */
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Input
                              value={editForm.name || ''}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              placeholder="Epic name"
                              className="font-semibold"
                            />
                            <div className="flex gap-2 ml-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleSaveEdit}
                                className="p-1 h-8 w-8"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleCancelEdit}
                                className="p-1 h-8 w-8"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <Textarea
                            value={editForm.description || ''}
                            onChange={(e) =>
                              setEditForm({ ...editForm, description: e.target.value })
                            }
                            placeholder="Epic description"
                            className="text-sm min-h-[60px]"
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
                                className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                                className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((phase) => (
                                  <option key={phase} value={phase.toString()}>
                                    Phase {phase}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* <div>
                          <label className="text-xs text-muted-foreground">Progress (%)</label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={editForm.progress || epic.progress || 0}
                            onChange={(e) =>
                              setEditForm({ ...editForm, progress: parseInt(e.target.value) || 0 })
                            }
                            className="text-xs"
                          />
                        </div> */}
                        </div>
                      ) : (
                        /* Display Mode */
                        <>
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-4 h-4 rounded-full ${epic.color}`}></div>
                            <h3 className="font-semibold text-foreground select-none flex-1">
                              {epic.name}
                            </h3>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEditEpic(epic)}
                                className="p-1 h-8 w-8"
                              >
                                <Edit2 className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteEpic(epic.id.toString())}
                                className="p-1 h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className={`text-xs ${getConfidenceColor(epic.confidence)}`}>
                              {epic.confidence} confidence
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Phase {epic.phase}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="text-xs bg-muted text-muted-foreground"
                            >
                              {epicTasks.length} tasks
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="text-xs bg-muted text-muted-foreground"
                            >
                              {totalPoints} pts
                            </Badge>
                          </div>

                          {epic.description && (
                            <p className="text-sm text-muted-foreground mb-3 select-none">
                              {epic.description}
                            </p>
                          )}

                          {/* Progress Bar */}
                          {/* <div className="mb-3">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span className="select-none">Progress</span>
                            <span className="select-none">{epic.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${epic.progress}%` }}
                            ></div>
                          </div>
                        </div> */}

                          <Button
                            onClick={() => {
                              setIsAddTaskModalOpen(true)
                              setAddTaskEpic(epic)
                            }}
                            variant="outline"
                            size="sm"
                            className="w-full gap-2"
                          >
                            <Plus className="h-4 w-4" />
                            Add Task
                          </Button>
                        </>
                      )}
                    </div>

                    {/* Tasks List */}
                    <div className="flex-1 p-4 overflow-y-auto">
                      <div
                        className={`space-y-3 min-h-[200px] border-2 border-dashed rounded p-3 transition-colors ${
                          draggedTask ? 'border-primary bg-primary/10' : 'border-border'
                        }`}
                      >
                        {epicTasks.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground border-2 border-dashed border-border rounded-lg">
                            <Move className="h-8 w-8 mb-2" />
                            <span className="text-sm select-none">Drop tasks here</span>
                          </div>
                        ) : (
                          epicTasks.map((task) => (
                            <TaskCard
                              key={task.id}
                              task={task}
                              epic={epic}
                              onDragStart={handleDragStart}
                              onTaskClick={onTaskClick}
                              isCompact={true}
                            />
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
    </>
  )
}
