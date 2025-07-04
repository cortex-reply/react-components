"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Info, X, AlertTriangle, Bell, ChevronRight } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "info" | "success" | "warning" | "error"
  actionLabel?: string
  onAction?: () => void
}

interface NotificationsPanelProps {
  notifications: Notification[]
  open: boolean
  onClose: () => void
  onMarkAllAsRead: () => void
  onClearAll: () => void
  className?: string
}

export function NotificationsPanel({
  notifications,
  open,
  onClose,
  onMarkAllAsRead,
  onClearAll,
  className,
}: NotificationsPanelProps) {
  const unreadCount = notifications.filter((notification) => !notification.read).length

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "success":
        return <Check className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={cn(
              "fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l bg-background shadow-lg md:w-96",
              className,
            )}
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Notifications</h2>
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="rounded-full px-2 py-0.5">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between border-b p-2">
                <Button variant="ghost" size="sm" onClick={onMarkAllAsRead} className="text-sm">
                  Mark all as read
                </Button>
                <Button variant="ghost" size="sm" onClick={onClearAll} className="text-sm">
                  Clear all
                </Button>
              </div>

              {/* Notifications List */}
              {notifications.length > 0 ? (
                <ScrollArea className="flex-1">
                  <div className="divide-y">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn("flex gap-3 p-4 transition-colors", !notification.read && "bg-muted/50")}
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{notification.title}</p>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                          {notification.actionLabel && (
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0 text-sm"
                              onClick={notification.onAction}
                            >
                              {notification.actionLabel}
                              <ChevronRight className="ml-1 h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Bell className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No notifications</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    When you receive notifications, they'll appear here.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
