"use client"

import { Clock, Edit3, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { BusinessUnit } from "./business-units"

export interface ChatSession {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
}

interface ChatSessionSidebarProps {
  sessions: ChatSession[]
  currentSession?: ChatSession | null
  teams: BusinessUnit[]
  onNewChat: () => void
  onSessionSelect: (session: ChatSession) => void
  onSessionEdit?: (sessionId: string) => void
  onSessionDelete?: (sessionId: string) => void
  className?: string
}

export function ChatSessionSidebar({
  sessions,
  currentSession,
  teams,
  onNewChat,
  onSessionSelect,
  onSessionEdit,
  onSessionDelete,
  className,
}: ChatSessionSidebarProps) {
  const formatRelativeTime = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <div className={`space-y-4 ${className || ""}`}>
      {/* Recent Chats */}
      <Card className="shadow-sm">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recent Chats
            </h3>
            {/* New Chat Button */}
            <Button onClick={onNewChat} size="sm" className="gap-1 h-7 px-2 rounded-lg shadow-sm">
              <Plus className="h-3 w-3" />
              New
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[600px]">
          <div className="p-2">
            {sessions.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">No chat sessions yet</div>
            ) : (
              sessions.map((session) => {
                const team = teams.find((unit) => unit.id === session.teamId)
                return (
                  <div
                    key={session.id}
                    className={cn(
                      "group relative p-3 rounded-xl cursor-pointer transition-all hover:bg-muted/50 mb-2",
                      currentSession?.id === session.id && "bg-muted border",
                    )}
                    onClick={() => onSessionSelect(session)}
                  >
                    <div className="flex items-start gap-3">
                      {/* {team && (
                        <div
                          className={cn(
                            "flex h-6 w-6 items-center justify-center rounded text-white text-xs flex-shrink-0 mt-0.5",
                            team.color,
                          )}
                        >
                          {team.icon}
                        </div>
                      )} */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm truncate">{session.title}</h4>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground flex-shrink-0">
                              {formatRelativeTime(session.timestamp)}
                            </span>
                            {/* Action Buttons */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                              {onSessionEdit && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-5 w-5 rounded"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    onSessionEdit(session.id)
                                  }}
                                >
                                  <Edit3 className="h-3 w-3" />
                                </Button>
                              )}
                              {onSessionDelete && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-5 w-5 rounded text-destructive hover:text-destructive"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    onSessionDelete(session.id)
                                  }}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{session.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  )
}
