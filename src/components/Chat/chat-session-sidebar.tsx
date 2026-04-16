"use client"

import { Clock, Edit3, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { BusinessUnit } from "../Foundry/types"

export interface ChatSession {
  id: string
  title: string
  lastMessage: string
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
  return (
    <TooltipProvider>
      <div className={`space-y-4 h-full ${className || ""}`}>
        {/* Recent Chats */}
        <Card className="shadow-sm h-full">
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
                sessions.map((session) => (
                  <Tooltip key={session.id}>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          "group relative p-3 rounded-xl cursor-pointer transition-all hover:bg-muted/50 mb-2",
                          currentSession?.id === session.id && "bg-muted border",
                        )}
                        onClick={() => onSessionSelect(session)}
                      >
                        <div className="grid grid-cols-[1fr_auto] gap-2 items-start">
                          <div className="min-w-0 overflow-hidden">
                            <h4 className="font-medium text-sm truncate mb-1">{session.title}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-2">{session.lastMessage}</p>
                          </div>
                          <div className="flex items-start gap-1 pt-0.5">
                            {/* Action Buttons - Always visible */}
                            {onSessionEdit && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded opacity-30 group-hover:opacity-100 transition-opacity"
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
                                className="h-6 w-6 rounded text-destructive hover:text-destructive opacity-30 group-hover:opacity-100 transition-opacity"
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
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{session.title}</p>
                        <p className="text-xs">{session.lastMessage}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </TooltipProvider>
  )
}
