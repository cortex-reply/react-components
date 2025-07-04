"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Menu, PanelLeft, Bot, Plus, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "./theme-toggle"
import { NotificationsPanel } from "./notifications-panel"
import type { Notification } from "./notifications-panel"

interface AppHeaderProps {
  title: string
  notifications?: Notification[]
  onToggleSidebar?: () => void
  onToggleMobileMenu?: () => void
  sidebarOpen?: boolean
  className?: string
  activeTab?: string
  onTabChange?: (tab: string) => void
  showTabs?: boolean
}

export function AppHeader({
  title,
  notifications = [],
  onToggleSidebar,
  onToggleMobileMenu,
  sidebarOpen = true,
  className,
  activeTab = "assistant",
  onTabChange,
  showTabs = true,
}: AppHeaderProps) {
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false)
  const [notificationsData, setNotificationsData] = useState<Notification[]>(notifications)

  const unreadCount = notificationsData.filter((notification) => !notification.read).length

  const tabOptions = [
    { value: "home", label: "Home" },
    { value: "chat", label: "Chat" },
    { value: "projects", label: "Projects" },
    { value: "colleagues", label: "Colleagues" },
    { value: "knowledge", label: "Knowledge" },
    { value: "files", label: "Files" },
  ]

  const currentTab = tabOptions.find(tab => tab.value === activeTab)

  const handleMarkAllAsRead = () => {
    setNotificationsData(
      notificationsData.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const handleClearAll = () => {
    setNotificationsData([])
  }

  return (
    <>
      <header
        className={`sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur ${className || ""}`}
      >
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onToggleMobileMenu}>
          <Menu className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:flex" onClick={onToggleSidebar}>
          <PanelLeft className="h-5 w-5" />
        </Button>
        <div className="flex flex-1 items-center">
          {/* Desktop Tabs / Mobile Dropdown */}
          {showTabs && (
            <motion.div 
              className="flex-1 flex justify-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Desktop Tabs */}
              <div className="hidden md:block">
                <Tabs value={activeTab} onValueChange={onTabChange}>
                  <TabsList className="grid w-full max-w-[700px] grid-cols-6 rounded-2xl p-0 h-10">
                    {tabOptions.map((tab) => (
                      <motion.div
                        key={tab.value}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="flex-1 px-2"
                      >
                        <TabsTrigger 
                          value={tab.value}
                          className="w-full h-8 rounded-xl data-[state=active]:rounded-xl transition-all duration-200 hover:border hover:border-accent hover:bg-accent/10 px-4 py-2 text-sm font-medium"
                        >
                          {tab.label}
                        </TabsTrigger>
                      </motion.div>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {/* Mobile Dropdown */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-2xl min-w-[140px] justify-between">
                      {currentTab?.label || "Select"}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-[180px]">
                    {tabOptions.map((tab) => (
                      <DropdownMenuItem
                        key={tab.value}
                        onClick={() => onTabChange?.(tab.value)}
                        className={`cursor-pointer ${activeTab === tab.value ? 'bg-accent' : ''}`}
                      >
                        {tab.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.div>
          )}
          
          <div className="flex items-center gap-3 ml-auto">
              <motion.div 
                className="hidden md:flex gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link href="/ai-assistant">
                    <Button className="rounded-2xl transition-all duration-200 hover:shadow-md">
                      <Bot className="mr-2 h-4 w-4" />
                      Copilot
                    </Button>
                  </Link>
                </motion.div>
                {/* <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button className="rounded-2xl transition-all duration-200 hover:shadow-md">
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                </motion.div> */}
              </motion.div> 
            <ThemeToggle />
            {/* <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-2xl">
                    <Cloud className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Cloud Storage</TooltipContent>
              </Tooltip>
            </TooltipProvider> */}

            {/* <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-2xl">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Messages</TooltipContent>
              </Tooltip>
            </TooltipProvider> */}

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-2xl relative transition-all duration-200"
                      onClick={() => setNotificationsPanelOpen(true)}
                    >
                      <motion.div
                        animate={unreadCount > 0 ? { rotate: [0, -10, 10, -10, 0] } : {}}
                        transition={{ duration: 0.5, repeat: unreadCount > 0 ? Infinity : 0, repeatDelay: 3 }}
                      >
                        <Bell className="h-5 w-5" />
                      </motion.div>
                      {unreadCount > 0 && (
                        <motion.span 
                          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                          {unreadCount}
                        </motion.span>
                      )}
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>Notifications</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Avatar className="h-9 w-9 border-2 border-primary transition-all duration-200 hover:shadow-md cursor-pointer">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </motion.div>
          </div>
        </div>
      </header>

      <NotificationsPanel
        notifications={notificationsData}
        open={notificationsPanelOpen}
        onClose={() => setNotificationsPanelOpen(false)}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearAll={handleClearAll}
      />
    </>
  )
}
