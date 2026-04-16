'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  addDays,
  differenceInDays,
  eachMonthOfInterval,
  format,
  isWithinInterval,
} from 'date-fns'
import { BarChart2, Calendar, Maximize2, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DashboardHero } from '../Heros/DashboardHero/DashboardHero'
import { Task, Epic, Sprint, Colleague } from '../Foundry/types'
import { extractId } from '@/lib/utils/extract-id'

const PHASE_LABELS: Record<number, string> = {
  1: 'Plan',
  2: 'Dev',
  3: 'Test',
  4: 'Deploy',
  5: 'Review',
  6: 'Maint.',
  7: 'Complete',
  8: 'Archive',
  9: 'Legacy',
}

const ZOOM_LEVELS = [
  { label: 'Quarter', dayWidth: 3 },
  { label: 'Month', dayWidth: 7 },
  { label: 'Week', dayWidth: 14 },
  { label: 'Day', dayWidth: 40 },
] as const

const ROW_HEIGHT = 48
const TIME_HEADER_HEIGHT = 60

interface GanttViewProps {
  projectId?: string | number
  tasks: Task[]
  epics: Epic[]
  sprints: Sprint[]
  colleagues?: Colleague[]
  onUpdateEpic: (epicId: string, updates: Partial<Epic>) => void
  onTaskClick?: (task: Task) => void
}

export const GanttView: React.FC<GanttViewProps> = ({
  tasks,
  epics,
  sprints,
  onTaskClick,
}) => {
  const [dayWidth, setDayWidth] = useState(7)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [heroHeight, setHeroHeight] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (heroRef.current) setHeroHeight(heroRef.current.offsetHeight)
    }
    const observer = new ResizeObserver(measure)
    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  const { timelineStart, timelineEnd, totalDays } = useMemo(() => {
    if (epics.length === 0) {
      const today = new Date()
      const start = addDays(today, -14)
      const end = addDays(today, 76)
      return { timelineStart: start, timelineEnd: end, totalDays: 90 }
    }
    const allDates = epics.flatMap((e) => [new Date(e.startDate), new Date(e.endDate)])
    const minTime = Math.min(...allDates.map((d) => d.getTime()))
    const maxTime = Math.max(...allDates.map((d) => d.getTime()))
    const paddedStart = addDays(new Date(minTime), -14)
    const paddedEnd = addDays(new Date(maxTime), 14)
    return {
      timelineStart: paddedStart,
      timelineEnd: paddedEnd,
      totalDays: differenceInDays(paddedEnd, paddedStart),
    }
  }, [epics])

  // Group epics by name — same-name epics share a row, each phase is a separate bar
  const { groups, sortedKeys } = useMemo(() => {
    const groups: Record<string, Epic[]> = {}
    epics.forEach((epic) => {
      if (!groups[epic.name]) groups[epic.name] = []
      groups[epic.name].push(epic)
    })
    // Sort phases within each group
    Object.values(groups).forEach((list) => list.sort((a, b) => a.phase - b.phase))
    // Sort groups by their earliest startDate
    const sortedKeys = Object.keys(groups).sort((a, b) => {
      const aMin = Math.min(...groups[a].map((e) => new Date(e.startDate).getTime()))
      const bMin = Math.min(...groups[b].map((e) => new Date(e.startDate).getTime()))
      return aMin - bMin
    })
    return { groups, sortedKeys }
  }, [epics])

  // Filter to real sprints only (non-virtual entries)
  const realSprints = useMemo(
    () =>
      sprints.filter((s) => {
        const name = s.name.toLowerCase()
        return name !== 'backlog' && name !== 'all tasks'
      }),
    [sprints],
  )

  const monthHeaders = useMemo(
    () =>
      eachMonthOfInterval({ start: timelineStart, end: timelineEnd }).map((month) => ({
        month,
        left: differenceInDays(month, timelineStart) * dayWidth,
      })),
    [timelineStart, timelineEnd, dayWidth],
  )

  const totalWidth = Math.max(totalDays * dayWidth, 600)

  const scrollToToday = useCallback(() => {
    if (scrollRef.current) {
      const todayOffset = differenceInDays(new Date(), timelineStart) * dayWidth
      scrollRef.current.scrollLeft = Math.max(0, todayOffset - 200)
    }
  }, [timelineStart, dayWidth])

  const todayLeft = differenceInDays(new Date(), timelineStart) * dayWidth

  const getEpicStats = (epic: Epic) => {
    const epicTasks = tasks.filter((t) => extractId(t.epic) === epic.id)
    const done = epicTasks.filter((t) => t.status === 'done').length
    const pct = epicTasks.length > 0 ? Math.round((done / epicTasks.length) * 100) : 0
    return { total: epicTasks.length, done, pct }
  }

  const getGroupStats = (epicList: Epic[]) => {
    const allTasks = epicList.flatMap((e) =>
      tasks.filter((t) => extractId(t.epic) === e.id),
    )
    const done = allTasks.filter((t) => t.status === 'done').length
    const pct = allTasks.length > 0 ? Math.round((done / allTasks.length) * 100) : 0
    return { total: allTasks.length, done, pct }
  }

  const isSprintActive = (sprint: Sprint) => {
    const today = new Date()
    try {
      return isWithinInterval(today, {
        start: new Date(sprint.startDate),
        end: new Date(sprint.endDate),
      })
    } catch {
      return false
    }
  }

  const chartContent = (
    <div className="flex flex-1 min-h-0 overflow-hidden">
      {/* Left sidebar */}
      <div className="w-52 flex-shrink-0 border-r bg-background z-10 flex flex-col">
        {/* Header */}
        <div
          className="border-b flex items-end pb-2 px-3 flex-shrink-0 bg-muted/20"
          style={{ height: TIME_HEADER_HEIGHT }}
        >
          <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
            Epic
          </span>
        </div>
        {/* Epic rows */}
        <div className="overflow-y-auto flex-1">
          {sortedKeys.length === 0 && (
            <div className="flex items-center justify-center h-24 text-sm text-muted-foreground">
              No epics
            </div>
          )}
          {sortedKeys.map((name) => {
            const stats = getGroupStats(groups[name])
            return (
              <div
                key={name}
                className="flex flex-col justify-center px-3 border-b"
                style={{ height: ROW_HEIGHT }}
              >
                <span className="text-sm font-medium truncate" title={name}>
                  {name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {stats.total} task{stats.total !== 1 ? 's' : ''} · {stats.pct}%
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Scrollable timeline */}
      <div className="flex-1 overflow-x-auto overflow-y-auto" ref={scrollRef}>
        <div style={{ width: totalWidth, position: 'relative' }}>
          {/* Time header */}
          <div
            className="sticky top-0 border-b bg-muted/20 z-20 flex-shrink-0"
            style={{ height: TIME_HEADER_HEIGHT, width: totalWidth }}
          >
            {/* Month labels */}
            {monthHeaders.map(({ month, left }) => (
              <div
                key={month.toISOString()}
                className="absolute top-2 text-xs font-semibold text-muted-foreground select-none"
                style={{ left: left + 4 }}
              >
                {format(month, 'MMM yyyy')}
              </div>
            ))}

            {/* Sprint bands in header */}
            {realSprints.map((sprint) => {
              const start = new Date(sprint.startDate)
              const end = new Date(sprint.endDate)
              if (start > timelineEnd || end < timelineStart) return null
              const left = Math.max(0, differenceInDays(start, timelineStart) * dayWidth)
              const right = Math.min(
                totalWidth,
                differenceInDays(end, timelineStart) * dayWidth,
              )
              const width = right - left
              if (width <= 0) return null
              const active = isSprintActive(sprint)
              return (
                <div
                  key={`header-sprint-${sprint.id}`}
                  className={`absolute bottom-0 border-l border-t text-xs px-1 overflow-hidden whitespace-nowrap select-none flex items-center ${
                    active
                      ? 'border-primary/50 bg-primary/10 text-primary font-medium'
                      : 'border-border bg-muted/40 text-muted-foreground'
                  }`}
                  style={{ left, width, height: 22 }}
                  title={sprint.name}
                >
                  {sprint.name}
                </div>
              )
            })}
          </div>

          {/* Rows area */}
          <div style={{ position: 'relative', width: totalWidth }}>
            {/* Sprint background bands */}
            {realSprints.map((sprint) => {
              const start = new Date(sprint.startDate)
              const end = new Date(sprint.endDate)
              if (start > timelineEnd || end < timelineStart) return null
              const left = Math.max(0, differenceInDays(start, timelineStart) * dayWidth)
              const right = Math.min(
                totalWidth,
                differenceInDays(end, timelineStart) * dayWidth,
              )
              const width = right - left
              if (width <= 0 || !isSprintActive(sprint)) return null
              return (
                <div
                  key={`bg-${sprint.id}`}
                  className="absolute inset-y-0 bg-primary/5 pointer-events-none"
                  style={{ left, width }}
                />
              )
            })}

            {/* Sprint vertical lines */}
            {realSprints.map((sprint) => {
              const left = differenceInDays(new Date(sprint.startDate), timelineStart) * dayWidth
              if (left < 0 || left > totalWidth) return null
              const active = isSprintActive(sprint)
              return (
                <div
                  key={`line-${sprint.id}`}
                  className={`absolute inset-y-0 pointer-events-none ${
                    active ? 'border-l border-primary/40' : 'border-l border-dashed border-border/60'
                  }`}
                  style={{ left }}
                />
              )
            })}

            {/* Today line */}
            {todayLeft >= 0 && todayLeft <= totalWidth && (
              <div
                className="absolute inset-y-0 pointer-events-none z-10"
                style={{ left: todayLeft }}
              >
                <div className="absolute inset-y-0 w-0.5 bg-destructive/50" />
                <div className="absolute top-1 -translate-x-1/2 w-2 h-2 rounded-full bg-destructive" />
              </div>
            )}

            {/* Month grid lines */}
            {monthHeaders.map(({ month, left }) => (
              <div
                key={`grid-${month.toISOString()}`}
                className="absolute inset-y-0 border-l border-border/30 pointer-events-none"
                style={{ left }}
              />
            ))}

            {/* Epic group rows */}
            {sortedKeys.map((name) => {
              const epicList = groups[name]
              return (
                <div
                  key={name}
                  className="border-b relative flex items-center"
                  style={{ height: ROW_HEIGHT }}
                >
                  {epicList.map((epic) => {
                    const start = new Date(epic.startDate)
                    const end = new Date(epic.endDate)
                    const left = differenceInDays(start, timelineStart) * dayWidth
                    const width = Math.max(8, differenceInDays(end, start) * dayWidth)
                    const stats = getEpicStats(epic)
                    const phaseLabel = PHASE_LABELS[epic.phase] ?? `Phase ${epic.phase}`
                    const showLabel = width >= 50

                    const tooltip = [
                      `${epic.name} · ${phaseLabel}`,
                      epic.description ? epic.description : null,
                      `${format(start, 'dd MMM yyyy')} → ${format(end, 'dd MMM yyyy')}`,
                      `${stats.total} tasks · ${stats.pct}% complete`,
                    ]
                      .filter(Boolean)
                      .join('\n')

                    return (
                      <div
                        key={epic.id}
                        className="absolute rounded overflow-hidden cursor-pointer hover:ring-2 hover:ring-white/40 transition-all"
                        style={{ left, width, height: 32, top: 8 }}
                        title={tooltip}
                      >
                        {/* Background track */}
                        <div
                          className={`absolute inset-0 ${epic.color}`}
                          style={{ opacity: 0.2 }}
                        />
                        {/* Progress fill */}
                        <div
                          className={`absolute inset-y-0 left-0 ${epic.color} transition-all`}
                          style={{ width: `${stats.pct}%`, opacity: 0.85 }}
                        />
                        {/* Label */}
                        {showLabel && (
                          <div className="absolute inset-0 flex items-center px-2 gap-1.5 z-10">
                            <span className="text-xs font-semibold text-white drop-shadow truncate">
                              {phaseLabel}
                            </span>
                            {stats.total > 0 && (
                              <span className="text-xs text-white/80 drop-shadow shrink-0">
                                {stats.pct}%
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}

            {/* Empty state filler rows */}
            {sortedKeys.length === 0 && (
              <div
                className="flex items-center justify-center text-sm text-muted-foreground"
                style={{ height: 200 }}
              >
                No epics to display on the timeline
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const inner = (
    <div className={`flex flex-col ${isFullscreen ? 'h-screen' : 'h-full'} overflow-hidden`}>
      {/* Hero */}
      <div ref={heroRef} className="flex-shrink-0">
        <DashboardHero
          title="Gantt Chart"
          description="Epic timeline with sprint alignment and phase-based grouping."
          gradient="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600"
          badge={`${sortedKeys.length} epic${sortedKeys.length !== 1 ? 's' : ''}`}
        />
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b bg-background flex-shrink-0">
        <BarChart2 className="h-4 w-4 text-muted-foreground" />
        <div className="flex items-center gap-1">
          {ZOOM_LEVELS.map((z) => (
            <Button
              key={z.label}
              variant={dayWidth === z.dayWidth ? 'default' : 'outline'}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setDayWidth(z.dayWidth)}
            >
              {z.label}
            </Button>
          ))}
        </div>

        <div className="flex-1" />

        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2 text-xs"
          onClick={scrollToToday}
        >
          <Calendar className="h-3 w-3 mr-1" />
          Today
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => setIsFullscreen((v) => !v)}
          title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? (
            <Minimize2 className="h-3.5 w-3.5" />
          ) : (
            <Maximize2 className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>

      {chartContent}
    </div>
  )

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background overflow-hidden">{inner}</div>
    )
  }

  return inner
}
