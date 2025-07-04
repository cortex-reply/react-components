"use client"
import { Bell, Search, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"

interface EnhancedHeaderProps {
  title?: string
  subtitle?: string
  onSearchClick?: () => void
  onNotificationClick?: () => void
  onSettingsClick?: () => void
  hasNotifications?: boolean
  userAvatar?: string
  userFallback?: string
  className?: string
}

export function EnhancedHeader({
  title = "Cortex Reply",
  subtitle = "AI-Powered Assistant",
  onSearchClick,
  onNotificationClick,
  onSettingsClick,
  hasNotifications = false,
  userAvatar,
  userFallback = "You",
  className,
}: EnhancedHeaderProps) {
  return (
    <header className={`sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md ${className || ""}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center ">
              <img src="/headerlogo.png" alt="Header Logo" className="h-14 w-14 object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10" onClick={onSearchClick}>
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 relative" onClick={onNotificationClick}>
              <Bell className="h-4 w-4" />
              {hasNotifications && <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>}
            </Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10" onClick={onSettingsClick}>
              <Settings className="h-4 w-4" />
            </Button>
            <Avatar className="h-10 w-10 border-2 border-border">
              <AvatarImage src={userAvatar || "/placeholder.svg?height=40&width=40&text=You"} />
              <AvatarFallback>{userFallback}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
